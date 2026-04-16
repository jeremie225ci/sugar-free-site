import { createHash, createHmac, randomBytes, randomInt, timingSafeEqual } from "crypto"

import { Timestamp } from "firebase-admin/firestore"

import { adminAuth, adminDb } from "@/lib/firebase-admin"

type SignedStatePayload = {
  anonymousUid?: string
  origin: string
  source?: string
  sourcePath?: string
  ts: number
}

function getWebAuthStateSecret() {
  return process.env.WEB_AUTH_STATE_SECRET || process.env.FIREBASE_PRIVATE_KEY || "sukali-web-auth"
}

function base64UrlEncode(value: string) {
  return Buffer.from(value, "utf8").toString("base64url")
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8")
}

function signString(value: string) {
  return createHmac("sha256", getWebAuthStateSecret()).update(value).digest("base64url")
}

export function createSignedState(payload: Omit<SignedStatePayload, "ts">) {
  const json = JSON.stringify({
    ...payload,
    ts: Date.now(),
  } satisfies SignedStatePayload)
  const encodedPayload = base64UrlEncode(json)
  const signature = signString(encodedPayload)
  return `${encodedPayload}.${signature}`
}

export function parseSignedState(state: string | null) {
  if (!state || !state.includes(".")) {
    throw new Error("Missing or invalid state.")
  }

  const [encodedPayload, signature] = state.split(".", 2)
  const expectedSignature = signString(encodedPayload)

  if (
    signature.length !== expectedSignature.length ||
    !timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
  ) {
    throw new Error("Invalid auth state signature.")
  }

  const parsed = JSON.parse(base64UrlDecode(encodedPayload)) as SignedStatePayload
  const ageMs = Date.now() - parsed.ts

  if (ageMs < 0 || ageMs > 15 * 60 * 1000) {
    throw new Error("Auth state expired.")
  }

  return parsed
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

export function createEmailHash(email: string) {
  return createHash("sha256").update(normalizeEmail(email)).digest("hex")
}

export function createVerificationCode() {
  return String(randomInt(0, 1000000)).padStart(6, "0")
}

export function createVerificationId() {
  return randomBytes(16).toString("hex")
}

export function createVerificationCodeHash(verificationId: string, email: string, code: string) {
  return createHash("sha256")
    .update(`${verificationId}:${normalizeEmail(email)}:${code}:${getWebAuthStateSecret()}`)
    .digest("hex")
}

export function maskEmail(email: string) {
  const normalized = normalizeEmail(email)
  const [local, domain] = normalized.split("@")

  if (!local || !domain) return normalized

  const visibleLocal = local.length <= 2 ? `${local[0] ?? ""}*` : `${local.slice(0, 2)}${"*".repeat(Math.max(1, local.length - 2))}`
  return `${visibleLocal}@${domain}`
}

export async function upsertFirebaseUserFromGoogle(email: string) {
  const normalizedEmail = normalizeEmail(email)

  try {
    return await adminAuth.getUserByEmail(normalizedEmail)
  } catch (error: any) {
    if (error?.code !== "auth/user-not-found") throw error

    return adminAuth.createUser({
      email: normalizedEmail,
      emailVerified: true,
    })
  }
}

export async function upsertFirebaseUserFromVerifiedEmail(params: {
  email: string
  displayName?: string
  password?: string
}) {
  const normalizedEmail = normalizeEmail(params.email)
  const password = typeof params.password === "string" ? params.password.trim() : ""

  try {
    const existing = await adminAuth.getUserByEmail(normalizedEmail)
    const updates: {
      displayName?: string
      emailVerified?: boolean
    } = {}

    if (params.displayName && !existing.displayName) {
      updates.displayName = params.displayName
    }

    if (!existing.emailVerified) {
      updates.emailVerified = true
    }

    if (Object.keys(updates).length > 0) {
      await adminAuth.updateUser(existing.uid, updates)
      return adminAuth.getUser(existing.uid)
    }

    return existing
  } catch (error: any) {
    if (error?.code !== "auth/user-not-found") throw error

    return adminAuth.createUser({
      email: normalizedEmail,
      emailVerified: true,
      displayName: params.displayName || undefined,
      ...(password.length >= 6 ? { password } : {}),
    })
  }
}

export async function migrateAnonymousProgress(anonymousUid: string, targetUid: string) {
  if (!anonymousUid || anonymousUid === targetUid) return

  const anonymousRef = adminDb.collection("users").doc(anonymousUid)
  const targetRef = adminDb.collection("users").doc(targetUid)
  const [anonymousSnap, targetSnap, anonymousSymptomsSnap, targetSymptomsSnap] = await Promise.all([
    anonymousRef.get(),
    targetRef.get(),
    anonymousRef.collection("symptoms").doc("user_symptoms").get(),
    targetRef.collection("symptoms").doc("user_symptoms").get(),
  ])

  if (!anonymousSnap.exists) return

  const anonymousData = anonymousSnap.data() ?? {}
  const targetData = targetSnap.data() ?? {}
  const anonymousWeb = (anonymousData.webOnboarding as Record<string, unknown> | undefined) ?? {}
  const targetWeb = (targetData.webOnboarding as Record<string, unknown> | undefined) ?? {}
  const anonymousSelectedSymptoms = Array.isArray(anonymousSymptomsSnap.data()?.selected)
    ? (anonymousSymptomsSnap.data()?.selected as string[])
    : []
  const targetSelectedSymptoms = Array.isArray(targetSymptomsSnap.data()?.selected)
    ? (targetSymptomsSnap.data()?.selected as string[])
    : []

  const mergedSymptoms = Array.from(new Set([...targetSelectedSymptoms, ...anonymousSelectedSymptoms]))

  await targetRef.set(
    {
      displayName: targetData.displayName || anonymousData.displayName || null,
      email: targetData.email || "",
      lastSource: targetData.lastSource || anonymousData.lastSource || null,
      lastSourcePath: targetData.lastSourcePath || anonymousData.lastSourcePath || null,
      onboarding_step: targetData.onboarding_step || anonymousData.onboarding_step || "web_onboarding",
      lastActivity: Timestamp.now(),
      anonymousMigration: {
        fromUid: anonymousUid,
        migratedAt: Timestamp.now(),
      },
      webOnboarding: {
        ...anonymousWeb,
        ...targetWeb,
        migratedFromAnonymousUid: anonymousUid,
        updatedAt: Timestamp.now(),
      },
    },
    { merge: true },
  )

  if (mergedSymptoms.length > 0) {
    await targetRef.collection("symptoms").doc("user_symptoms").set(
      {
        selected: mergedSymptoms,
        updatedAt: Timestamp.now(),
      },
      { merge: true },
    )
  }

  await anonymousRef.set(
    {
      mergedIntoUid: targetUid,
      mergedAt: Timestamp.now(),
      lastActivity: Timestamp.now(),
    },
    { merge: true },
  )
}
