"use client"

import {
  GoogleAuthProvider,
  getRedirectResult,
  onAuthStateChanged,
  signInAnonymously,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"

import { ensureClientAuthPersistence, getClientAuth, getClientDb, resolveClientAuthDomain } from "@/lib/firebase"

const GOOGLE_REDIRECT_STATE_KEY = "sukali_google_redirect_state_v1"
const GOOGLE_REDIRECT_COMPLETED_KEY = "sukali_google_redirect_completed_v1"
const GOOGLE_RESUME_CHECKOUT_KEY = "sukali_google_resume_checkout_v1"
const AUTH_DEBUG_ENDPOINT = "/api/auth/debug"

type GoogleRedirectState = {
  anonymousUid: string
  source?: string
  sourcePath?: string
}

type EnsureUserOptions = {
  source?: string
  sourcePath?: string
  displayName?: string | null
  email?: string | null
  providerHints?: string[]
}

type GoogleSignInOptions = {
  source?: string
  sourcePath?: string
}

function summarizeUser(user: User | null | undefined) {
  if (!user) return null

  return {
    uid: user.uid,
    isAnonymous: user.isAnonymous,
    email: user.email ?? null,
    providerIds: user.providerData.map((entry) => entry.providerId).filter(Boolean),
  }
}

export function debugAuthEvent(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return

  const body = JSON.stringify({
    event,
    payload: {
      ...payload,
      href: window.location.href,
      pathname: window.location.pathname,
    },
  })

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" })
      navigator.sendBeacon(AUTH_DEBUG_ENDPOINT, blob)
      return
    }
  } catch {
    // Fall back to fetch below.
  }

  void fetch(AUTH_DEBUG_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    keepalive: true,
  }).catch(() => {
    // Ignore debug transport failures.
  })
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string) {
  return new Promise<T>((resolve, reject) => {
    const timer = window.setTimeout(() => {
      reject(new Error(message))
    }, timeoutMs)

    promise.then(
      (value) => {
        window.clearTimeout(timer)
        resolve(value)
      },
      (error) => {
        window.clearTimeout(timer)
        reject(error)
      },
    )
  })
}

function normalizeProviderIds(user: User, providerHints: string[] = []) {
  const providerIds = user.providerData.map((entry) => entry.providerId).filter(Boolean)
  if (user.isAnonymous) providerIds.push("anonymous")
  if (!user.isAnonymous && providerIds.length === 0) providerIds.push("custom")
  providerIds.push(...providerHints.filter(Boolean))
  return Array.from(new Set(providerIds))
}

function isNonBlockingAuthBootstrapError(error: any) {
  const code = String(error?.code ?? "").toLowerCase()
  const message = String(error?.message ?? "").toLowerCase()

  return (
    code.includes("configuration-not-found") ||
    code.includes("operation-not-allowed") ||
    message.includes("configuration-not-found") ||
    message.includes("operation-not-allowed")
  )
}

function shouldUseGoogleRedirectFlow() {
  // Keep prod aligned with dev: always try the popup flow first.
  // If a browser blocks the popup, the existing fallback below switches to
  // redirect automatically, which is safer than forcing redirect up front.
  return false
}

function isGooglePopupBlockedError(error: any) {
  const code = String(error?.code ?? "")
  return code === "auth/popup-blocked"
}

async function dispatchGoogleRedirect(
  auth: ReturnType<typeof getClientAuth>,
  provider: GoogleAuthProvider,
  anonymousUid: string,
  params: GoogleSignInOptions,
  currentUser: User | null,
) {
  setGoogleRedirectState({
    anonymousUid,
    source: params.source,
    sourcePath: params.sourcePath,
  })

  debugAuthEvent("google_redirect_dispatch", {
    mode: currentUser?.isAnonymous ? "signin_with_anonymous_migration" : "signin",
    currentUser: summarizeUser(currentUser),
  })

  await signInWithRedirect(auth, provider)
}

function setGoogleRedirectState(state: GoogleRedirectState) {
  if (typeof window === "undefined") return
  try {
    window.sessionStorage.setItem(GOOGLE_REDIRECT_STATE_KEY, JSON.stringify(state))
  } catch {
    // Ignore storage failures on restrictive browsers.
  }

  try {
    window.localStorage.setItem(GOOGLE_REDIRECT_STATE_KEY, JSON.stringify(state))
  } catch {
    // Ignore storage failures on restrictive browsers.
  }
}

function readGoogleRedirectState() {
  if (typeof window === "undefined") return null

  try {
    const raw = window.sessionStorage.getItem(GOOGLE_REDIRECT_STATE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as GoogleRedirectState
  } catch {
    // Ignore storage failures on restrictive browsers.
  }

  try {
    const raw = window.localStorage.getItem(GOOGLE_REDIRECT_STATE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as GoogleRedirectState
  } catch {
    return null
  }
}

function clearGoogleRedirectState() {
  if (typeof window === "undefined") return
  try {
    window.sessionStorage.removeItem(GOOGLE_REDIRECT_STATE_KEY)
  } catch {
    // Ignore storage failures on restrictive browsers.
  }

  try {
    window.localStorage.removeItem(GOOGLE_REDIRECT_STATE_KEY)
  } catch {
    // Ignore storage failures on restrictive browsers.
  }
}

function markGoogleRedirectCompleted() {
  if (typeof window === "undefined") return
  try {
    window.sessionStorage.setItem(GOOGLE_REDIRECT_COMPLETED_KEY, "1")
  } catch {
    // Ignore storage failures on restrictive browsers.
  }

  try {
    window.localStorage.setItem(GOOGLE_REDIRECT_COMPLETED_KEY, "1")
  } catch {
    // Ignore storage failures on restrictive browsers.
  }
}

function setGoogleResumeCheckoutRequested() {
  if (typeof window === "undefined") return

  try {
    window.sessionStorage.setItem(GOOGLE_RESUME_CHECKOUT_KEY, "1")
  } catch {
    // Ignore storage failures on restrictive browsers.
  }

  try {
    window.localStorage.setItem(GOOGLE_RESUME_CHECKOUT_KEY, "1")
  } catch {
    // Ignore storage failures on restrictive browsers.
  }
}

export function consumeGoogleResumeCheckoutRequested() {
  if (typeof window === "undefined") return false

  let value = false

  try {
    value = window.sessionStorage.getItem(GOOGLE_RESUME_CHECKOUT_KEY) === "1" || value
    window.sessionStorage.removeItem(GOOGLE_RESUME_CHECKOUT_KEY)
  } catch {
    // Ignore storage failures on restrictive browsers.
  }

  try {
    value = window.localStorage.getItem(GOOGLE_RESUME_CHECKOUT_KEY) === "1" || value
    window.localStorage.removeItem(GOOGLE_RESUME_CHECKOUT_KEY)
  } catch {
    // Ignore storage failures on restrictive browsers.
  }

  return value
}

export function clearGoogleResumeCheckoutRequested() {
  if (typeof window === "undefined") return

  try {
    window.sessionStorage.removeItem(GOOGLE_RESUME_CHECKOUT_KEY)
  } catch {
    // Ignore storage failures on restrictive browsers.
  }

  try {
    window.localStorage.removeItem(GOOGLE_RESUME_CHECKOUT_KEY)
  } catch {
    // Ignore storage failures on restrictive browsers.
  }
}

export function consumeGoogleRedirectCompleted() {
  if (typeof window === "undefined") return false

  let value = false

  try {
    value = window.sessionStorage.getItem(GOOGLE_REDIRECT_COMPLETED_KEY) === "1" || value
    window.sessionStorage.removeItem(GOOGLE_REDIRECT_COMPLETED_KEY)
  } catch {
    // Ignore storage failures on restrictive browsers.
  }

  try {
    value = window.localStorage.getItem(GOOGLE_REDIRECT_COMPLETED_KEY) === "1" || value
    window.localStorage.removeItem(GOOGLE_REDIRECT_COMPLETED_KEY)
  } catch {
    // Ignore storage failures on restrictive browsers.
  }

  return value
}

function isClaimedUser(user: User | null | undefined) {
  return Boolean(user && !user.isAnonymous)
}

export function waitForNonAnonymousUser(timeoutMs = 4000) {
  const auth = getClientAuth()

  if (isClaimedUser(auth.currentUser)) {
    return Promise.resolve(auth.currentUser)
  }

  return new Promise<User | null>((resolve) => {
    let unsubscribe = () => {}

    const timeout = window.setTimeout(() => {
      unsubscribe()
      resolve(isClaimedUser(auth.currentUser) ? auth.currentUser : null)
    }, timeoutMs)

    unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!isClaimedUser(user)) {
        return
      }

      window.clearTimeout(timeout)
      resolve(user)
      window.setTimeout(() => {
        unsubscribe()
      }, 0)
    })
  })
}

async function consumeGoogleRedirectResult(source?: string, sourcePath?: string) {
  const auth = await ensureClientAuthPersistence()
  const redirectState = readGoogleRedirectState()
  debugAuthEvent("redirect_result_start", {
    source,
    sourcePath,
    redirectStatePresent: Boolean(redirectState),
    currentUser: summarizeUser(auth.currentUser),
  })

  try {
    const result = await getRedirectResult(auth)

    if (!result?.user) {
      if (!redirectState) {
        debugAuthEvent("redirect_result_empty_without_state", {
          currentUser: summarizeUser(auth.currentUser),
        })
        return null
      }

      const restoredUser = isClaimedUser(auth.currentUser)
        ? auth.currentUser
        : await waitForNonAnonymousUser(4000)

      if (!restoredUser) {
        debugAuthEvent("redirect_result_empty_without_restored_user", {
          currentUser: summarizeUser(auth.currentUser),
        })
        clearGoogleRedirectState()
        return null
      }

      try {
        await ensureUserDocument(restoredUser, {
          displayName: restoredUser.displayName,
          email: restoredUser.email,
          source: redirectState.source ?? source,
          sourcePath: redirectState.sourcePath ?? sourcePath,
          providerHints: ["google.com"],
        })
      } catch {
        // Do not block the redirect completion on a Firestore sync write.
      }

      markGoogleRedirectCompleted()
      clearGoogleRedirectState()
      debugAuthEvent("redirect_result_restored_user", {
        user: summarizeUser(restoredUser),
      })
      return restoredUser
    }

    const user = result.user
    debugAuthEvent("redirect_result_user", {
      operationType: result.operationType,
      user: summarizeUser(user),
    })

    if (redirectState?.anonymousUid && redirectState.anonymousUid !== user.uid) {
      try {
        const idToken = await user.getIdToken()
        await fetch("/api/auth/migrate-anonymous", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            anonymousUid: redirectState.anonymousUid,
          }),
        })
      } catch {
        // Keep the UI moving even if background migration needs to be retried later.
      }
    }

    try {
      await ensureUserDocument(user, {
        displayName: user.displayName,
        email: user.email,
        source: redirectState?.source ?? source,
        sourcePath: redirectState?.sourcePath ?? sourcePath,
        providerHints: ["google.com"],
      })
    } catch {
      // Do not block the redirect completion on a Firestore sync write.
    }

    markGoogleRedirectCompleted()
    clearGoogleRedirectState()
    debugAuthEvent("redirect_result_complete", {
      user: summarizeUser(user),
    })
    return user
  } catch (error) {
    debugAuthEvent("redirect_result_error", {
      message: String((error as any)?.message ?? "Unknown redirect error"),
      code: String((error as any)?.code ?? ""),
    })
    clearGoogleRedirectState()
    throw error
  }
}

export async function restoreClaimedWebSession(source?: string, sourcePath?: string) {
  const auth = await ensureClientAuthPersistence()
  debugAuthEvent("restore_claimed_session_start", {
    source,
    sourcePath,
    currentUser: summarizeUser(auth.currentUser),
  })

  const redirectUser = await consumeGoogleRedirectResult(source, sourcePath)
  if (redirectUser) {
    debugAuthEvent("restore_claimed_session_redirect_user", {
      user: summarizeUser(redirectUser),
    })
    return redirectUser
  }

  if (isClaimedUser(auth.currentUser)) {
    try {
      await ensureUserDocument(auth.currentUser, { source, sourcePath })
    } catch {
      // Keep the browser session usable even if Firestore sync fails.
    }

    debugAuthEvent("restore_claimed_session_existing_user", {
      user: summarizeUser(auth.currentUser),
    })
    return auth.currentUser
  }

  const restoredUser = await waitForNonAnonymousUser(2500)
  if (restoredUser) {
    try {
      await ensureUserDocument(restoredUser, { source, sourcePath })
    } catch {
      // Keep the browser session usable even if Firestore sync fails.
    }

    debugAuthEvent("restore_claimed_session_restored_user", {
      user: summarizeUser(restoredUser),
    })
    return restoredUser
  }

  debugAuthEvent("restore_claimed_session_none", {
    source,
    sourcePath,
    currentUser: summarizeUser(auth.currentUser),
  })
  return null
}

export async function ensureUserDocument(user: User, options: EnsureUserOptions = {}) {
  const db = getClientDb()
  const displayName = options.displayName ?? user.displayName ?? null
  const email = options.email ?? user.email ?? null

  await setDoc(
    doc(db, "users", user.uid),
    {
      uid: user.uid,
      email: email ?? "",
      displayName,
      language: typeof navigator !== "undefined" ? navigator.language.slice(0, 2).toLowerCase() : "en",
      authProviders: normalizeProviderIds(user, options.providerHints),
      lastSource: options.source ?? null,
      lastSourcePath: options.sourcePath ?? null,
      lastActivity: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  )
}

export async function ensureAnonymousWebSession(source?: string, sourcePath?: string) {
  const auth = await ensureClientAuthPersistence()
  debugAuthEvent("ensure_session_start", {
    source,
    sourcePath,
    currentUser: summarizeUser(auth.currentUser),
  })

  const redirectUser = await consumeGoogleRedirectResult(source, sourcePath)
  if (redirectUser) {
    debugAuthEvent("ensure_session_redirect_user", {
      user: summarizeUser(redirectUser),
    })
    return redirectUser
  }

  if (auth.currentUser) {
    try {
      await ensureUserDocument(auth.currentUser, { source, sourcePath })
    } catch {
      // Keep the browser session usable even if Firestore sync fails.
    }
    debugAuthEvent("ensure_session_existing_user", {
      user: summarizeUser(auth.currentUser),
    })
    return auth.currentUser
  }

  const restoredUser = await waitForAuthUser(1500)
  if (restoredUser) {
    try {
      await ensureUserDocument(restoredUser, { source, sourcePath })
    } catch {
      // Keep the browser session usable even if Firestore sync fails.
    }
    debugAuthEvent("ensure_session_restored_user", {
      user: summarizeUser(restoredUser),
    })
    return restoredUser
  }

  try {
    const result = await signInAnonymously(auth)

    try {
      await ensureUserDocument(result.user, { source, sourcePath })
    } catch {
      // Keep the browser session usable even if Firestore sync fails.
    }

    debugAuthEvent("ensure_session_anonymous_created", {
      user: summarizeUser(result.user),
    })
    return result.user
  } catch (error: any) {
    if (isNonBlockingAuthBootstrapError(error)) {
      debugAuthEvent("ensure_session_nonblocking_error", {
        message: String(error?.message ?? ""),
        code: String(error?.code ?? ""),
      })
      return null
    }

    throw error
  }
}

export async function signInOrCreateWithEmail(params: {
  email: string
  password: string
  verificationId: string
  displayName?: string
  source?: string
  sourcePath?: string
}) {
  const auth = await ensureClientAuthPersistence()
  const currentUser = auth.currentUser
  const requestBody = {
    email: params.email,
    password: params.password,
    verificationId: params.verificationId,
    displayName: params.displayName,
    source: params.source,
    sourcePath: params.sourcePath,
    anonymousUid: currentUser?.isAnonymous ? currentUser.uid : "",
  }

  let response = await fetch("/api/auth/email/complete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })

  let payload = await response.json()

  if (!response.ok && String(payload?.error ?? "").includes("Confirm your email code before continuing.")) {
    await new Promise((resolve) => window.setTimeout(resolve, 350))
    response = await fetch("/api/auth/email/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
    payload = await response.json()
  }

  if (!response.ok || !payload?.customToken) {
    throw new Error(payload?.error ?? "Email sign-in failed.")
  }

  const signedIn = await withTimeout(
    signInWithCustomToken(auth, String(payload.customToken)),
    15_000,
    "Firebase is taking too long to finish email sign-in. Refresh and try again.",
  )
  const user = signedIn.user

  if (params.displayName && !user.displayName) {
    await updateProfile(user, { displayName: params.displayName })
  }

  try {
    await ensureUserDocument(user, {
      displayName: params.displayName,
      email: params.email,
      source: params.source,
      sourcePath: params.sourcePath,
      providerHints: ["email_verified_code"],
    })
  } catch {
    // Don't block the checkout transition on a profile sync write.
  }

  return user
}

export async function signInWithEmailPassword(params: {
  email: string
  password: string
  source?: string
  sourcePath?: string
}) {
  const auth = await ensureClientAuthPersistence()
  const email = params.email.trim().toLowerCase()

  debugAuthEvent("email_signin_start", {
    source: params.source,
    sourcePath: params.sourcePath,
    email,
    currentUser: summarizeUser(auth.currentUser),
  })

  const signedIn = await withTimeout(
    signInWithEmailAndPassword(auth, email, params.password),
    15_000,
    "Email sign-in is taking too long. Refresh and try again.",
  )

  const user = signedIn.user

  try {
    await ensureUserDocument(user, {
      displayName: user.displayName,
      email: user.email ?? email,
      source: params.source,
      sourcePath: params.sourcePath,
      providerHints: ["password"],
    })
  } catch {
    // Don't block the redirect transition on a sync write.
  }

  debugAuthEvent("email_signin_success", {
    source: params.source,
    sourcePath: params.sourcePath,
    user: summarizeUser(user),
  })

  return user
}

export async function signInOrLinkWithGoogle(params: {
  source?: string
  sourcePath?: string
  preferExistingAccount?: boolean
}) {
  const auth = getClientAuth()
  void ensureClientAuthPersistence().catch(() => {
    // Keep the Google click path synchronous enough to avoid popup blockers.
  })
  let currentUser = auth.currentUser

  if (params.preferExistingAccount && currentUser?.isAnonymous) {
    debugAuthEvent("google_signin_drop_anonymous_for_login", {
      source: params.source,
      sourcePath: params.sourcePath,
      currentUser: summarizeUser(currentUser),
    })
    await signOut(auth)
    currentUser = null
  }

  const anonymousUid = currentUser?.isAnonymous ? currentUser.uid : ""
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: "select_account" })
  const useRedirect = shouldUseGoogleRedirectFlow()

  setGoogleResumeCheckoutRequested()

  debugAuthEvent("google_signin_start", {
    source: params.source,
    sourcePath: params.sourcePath,
    useRedirect,
    authDomain: resolveClientAuthDomain(),
    currentUser: summarizeUser(currentUser),
  })

  try {
    if (useRedirect) {
      try {
        await dispatchGoogleRedirect(auth, provider, anonymousUid, params, currentUser)
      } catch (error: any) {
        debugAuthEvent("google_redirect_dispatch_error", {
          message: String(error?.message ?? ""),
          code: String(error?.code ?? ""),
        })
        throw error
      }
      return null
    }

    let user: User

    if (currentUser?.isAnonymous) {
      let signedIn
      try {
        signedIn = await withTimeout(
          signInWithPopup(auth, provider),
          20_000,
          "Google sign-in took too long to respond. Try again.",
        )
      } catch (error: any) {
        if (isGooglePopupBlockedError(error)) {
          debugAuthEvent("google_popup_blocked_popup_only", {
            currentUser: summarizeUser(currentUser),
            source: params.source,
            sourcePath: params.sourcePath,
            mode: "signin_anonymous_single_popup",
          })
          throw new Error("Google sign-in popup was blocked. Please allow popups and try again.")
        }

        throw error
      }

      user = signedIn.user

      if (anonymousUid && anonymousUid !== user.uid) {
        const idToken = await user.getIdToken()
        void fetch("/api/auth/migrate-anonymous", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            anonymousUid,
          }),
        }).catch(() => {
          // Keep the UI moving even if the background migration retries later.
        })
      }
    } else {
      let signedIn
      try {
        signedIn = await withTimeout(
          signInWithPopup(auth, provider),
          20_000,
          "Google sign-in took too long to respond. Try again.",
        )
      } catch (error: any) {
        if (isGooglePopupBlockedError(error)) {
          debugAuthEvent("google_popup_blocked_popup_only", {
            currentUser: summarizeUser(currentUser),
            source: params.source,
            sourcePath: params.sourcePath,
            mode: "signin_existing_user",
          })
          throw new Error("Google sign-in popup was blocked. Please allow popups and try again.")
        }

        throw error
      }
      user = signedIn.user
    }

    try {
      await ensureUserDocument(user, {
        displayName: user.displayName,
        email: user.email,
        source: params.source,
        sourcePath: params.sourcePath,
        providerHints: ["google.com"],
      })
    } catch {
      // Don't block the checkout transition on a profile sync write.
    }

    return user
  } catch (error) {
    debugAuthEvent("google_signin_error", {
      source: params.source,
      sourcePath: params.sourcePath,
      message: String((error as any)?.message ?? "Unknown Google sign-in error"),
      code: String((error as any)?.code ?? ""),
      currentUser: summarizeUser(currentUser),
    })
    clearGoogleResumeCheckoutRequested()
    throw error
  }
}

export function waitForAuthUser(timeoutMs = 2500) {
  const auth = getClientAuth()

  return new Promise<User | null>((resolve) => {
    const timeout = window.setTimeout(() => {
      unsubscribe()
      resolve(auth.currentUser ?? null)
    }, timeoutMs)

    let unsubscribe = () => {}

    unsubscribe = onAuthStateChanged(auth, (user) => {
      window.clearTimeout(timeout)
      resolve(user)
      window.setTimeout(() => {
        unsubscribe()
      }, 0)
    })
  })
}

export async function getCurrentUserIdToken() {
  const auth = await ensureClientAuthPersistence()
  const currentUser = auth.currentUser ?? (await waitForAuthUser())

  if (!currentUser) {
    throw new Error("No authenticated user is available.")
  }

  return currentUser.getIdToken()
}
