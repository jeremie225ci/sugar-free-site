"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import {
  ArrowUpRight,
  CreditCard,
  Download,
  Loader2,
  LogOut,
  Settings,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import { getCurrentUserIdToken, waitForAuthUser } from "@/lib/auth-client"
import { getClientAuth } from "@/lib/firebase"

const IOS_APP_URL = "https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=app.sukali"

type MemberSession = {
  uid: string
  email: string
  displayName: string
  hasPremium: boolean
  checkoutStatus: string
  planKey: string
  planLabel: string
  billing: {
    accessSource: string
    lemonsqueezyStatus: string
    accessEmailSentTo: string
  }
}

type SubscriptionPortalPayload = {
  portalUrl: string
  customerPortalUrl: string
  updatePaymentMethodUrl: string
  status: string
  endsAt: string
  renewsAt: string
  planLabel: string
}

type Props = {
  autoOpenPortal?: boolean
}

function formatStatus(value: string) {
  return value
    .replace(/_/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase()) || "Not synced yet"
}

export default function MemberSettingsScreen({ autoOpenPortal = false }: Props) {
  const [session, setSession] = useState<MemberSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [portalError, setPortalError] = useState<string | null>(null)
  const [portalMeta, setPortalMeta] = useState<SubscriptionPortalPayload | null>(null)
  const [isOpeningPortal, setIsOpeningPortal] = useState(false)
  const [autoOpenAttempted, setAutoOpenAttempted] = useState(false)

  const firstName = useMemo(() => {
    if (!session) return "there"
    const raw = session.displayName || session.email.split("@")[0] || "there"
    return raw.trim().split(" ")[0] || "there"
  }, [session])

  async function authorizedJsonFetch<T>(input: string, init?: RequestInit): Promise<T> {
    const idToken = await getCurrentUserIdToken()
    const response = await fetch(input, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        ...(init?.headers ?? {}),
      },
      cache: "no-store",
    })
    const payload = await response.json()

    if (!response.ok) {
      throw new Error(payload?.error ?? "Request failed.")
    }

    return payload as T
  }

  async function loadSession() {
    setPortalError(null)
    const user = await waitForAuthUser(3000)

    if (!user || user.isAnonymous || !user.email) {
      setSession(null)
      setIsLoading(false)
      return
    }

    const payload = await authorizedJsonFetch<MemberSession>("/api/member/session")
    setSession(payload)
  }

  useEffect(() => {
    let isMounted = true

    async function boot() {
      try {
        await loadSession()
      } catch (nextError: any) {
        if (!isMounted) return
        setError(nextError?.message ?? "Unable to load your account settings.")
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    void boot()

    return () => {
      isMounted = false
    }
  }, [])

  async function handleOpenPortal() {
    try {
      setPortalError(null)
      setIsOpeningPortal(true)
      const payload = await authorizedJsonFetch<SubscriptionPortalPayload>("/api/member/subscription/portal", {
        method: "POST",
      })
      setPortalMeta(payload)
      window.location.href = payload.portalUrl
    } catch (nextError: any) {
      setPortalError(nextError?.message ?? "Unable to open the subscription manager.")
    } finally {
      setIsOpeningPortal(false)
    }
  }

  useEffect(() => {
    if (
      !autoOpenPortal ||
      !session ||
      !session.hasPremium ||
      portalMeta ||
      isOpeningPortal ||
      autoOpenAttempted
    ) {
      return
    }
    setAutoOpenAttempted(true)
    void handleOpenPortal()
  }, [autoOpenAttempted, autoOpenPortal, isOpeningPortal, portalMeta, session])

  async function handleSignOut() {
    await getClientAuth().signOut()
    window.location.href = "/login?next=/plan"
  }

  if (isLoading) {
    return (
      <section className="rounded-[34px] border border-[#ddd1c1] bg-[#fffaf2] p-8 text-center shadow-[0_20px_44px_rgba(52,41,22,0.08)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eef2e8] text-[#5c7f57]">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7b7468]">
          Loading account
        </p>
        <h1 className="mt-3 text-4xl leading-tight text-[#1f241d]" style={{ fontFamily: "var(--font-display)" }}>
          Opening your subscription settings.
        </h1>
      </section>
    )
  }

  if (!session) {
    return (
      <section className="rounded-[34px] border border-[#ddd1c1] bg-[#fffaf2] p-8 text-center shadow-[0_20px_44px_rgba(52,41,22,0.08)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eef2e8] text-[#5c7f57]">
          <Settings className="h-6 w-6" />
        </div>
        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7b7468]">
          Sign in required
        </p>
        <h1 className="mt-3 text-4xl leading-tight text-[#1f241d]" style={{ fontFamily: "var(--font-display)" }}>
          Open your Sukali account first.
        </h1>
        <p className="mt-4 text-sm leading-7 text-[#5f5a51]">
          Sign in with the same Google account or email you used during checkout.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/login?next=/settings"
            className="rounded-full bg-[#1f241d] px-6 py-4 text-sm font-semibold text-[#fffaf2]"
          >
            Go to secure login
          </Link>
          <Link
            href="/start?source=signup&from=/settings&resume=checkout"
            className="rounded-full border border-[#d3c7b8] bg-white px-6 py-4 text-sm font-semibold text-[#1f241d]"
          >
            Start the onboarding
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="rounded-[34px] border border-[#ddd1c1] bg-[#fffaf2] p-6 shadow-[0_20px_44px_rgba(52,41,22,0.08)] sm:p-8">
      <div className="flex flex-col gap-6">
        <div className="rounded-[28px] border border-[#e1d6c7] bg-[#f8f1e8] p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7b7468]">
                Account settings
              </p>
              <h1 className="mt-3 text-4xl leading-tight text-[#1f241d]" style={{ fontFamily: "var(--font-display)" }}>
                Hi {firstName}, manage your plan from here.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5f5a51]">
                Open your secure billing portal to cancel your subscription, update your payment method, or review your plan details without leaving Sukali.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-[#d8ccb9] bg-white px-3 py-1.5 text-xs font-semibold text-[#1f241d]">
                {session.planLabel || "Sukali Premium"}
              </span>
              <span className="rounded-full border border-[#d8ccb9] bg-white px-3 py-1.5 text-xs font-semibold text-[#6b655b]">
                {formatStatus(session.billing.lemonsqueezyStatus || session.checkoutStatus)}
              </span>
            </div>
          </div>
        </div>

        {error ? (
          <div className="rounded-[22px] border border-[#c97a5a]/30 bg-[#fff4ef] px-4 py-3 text-sm text-[#8d4d35]">
            {error}
          </div>
        ) : null}

        {portalError ? (
          <div className="rounded-[22px] border border-[#c97a5a]/30 bg-[#fff4ef] px-4 py-3 text-sm text-[#8d4d35]">
            {portalError}
          </div>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-[1.35fr_0.95fr]">
          <div className="rounded-[28px] border border-[#e1d6c7] bg-white p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef2e8] text-[#5c7f57]">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1f241d]">Manage my subscription</p>
                <p className="mt-1 text-sm leading-6 text-[#5f5a51]">
                  Cancel your plan, update your payment details, or review the current renewal status from the secure Lemon Squeezy portal.
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => void handleOpenPortal()}
                disabled={isOpeningPortal || !session.hasPremium}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1f241d] px-5 py-3 text-sm font-semibold text-[#fffaf2] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isOpeningPortal ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUpRight className="h-4 w-4" />}
                {isOpeningPortal ? "Opening secure portal..." : "Open secure subscription manager"}
              </button>
              <Link
                href="/plan"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d3c7b8] bg-white px-5 py-3 text-sm font-semibold text-[#1f241d]"
              >
                <Sparkles className="h-4 w-4" />
                Go to my web plan
              </Link>
            </div>
            {!session.hasPremium ? (
              <p className="mt-4 text-sm leading-6 text-[#8d4d35]">
                This account does not have an active premium plan yet. Finish the onboarding to unlock checkout.
              </p>
            ) : null}
          </div>

          <div className="rounded-[28px] border border-[#e1d6c7] bg-[#fbf7f0] p-5 sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7b7468]">Profile</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="rounded-[20px] border border-[#e7ddcf] bg-white px-4 py-3">
                <dt className="text-[#7b7468]">Email</dt>
                <dd className="mt-1 font-semibold text-[#1f241d]">{session.email}</dd>
              </div>
              <div className="rounded-[20px] border border-[#e7ddcf] bg-white px-4 py-3">
                <dt className="text-[#7b7468]">Access source</dt>
                <dd className="mt-1 font-semibold text-[#1f241d]">{formatStatus(session.billing.accessSource || "web")}</dd>
              </div>
              <div className="rounded-[20px] border border-[#e7ddcf] bg-white px-4 py-3">
                <dt className="text-[#7b7468]">Plan access email</dt>
                <dd className="mt-1 font-semibold text-[#1f241d]">
                  {session.billing.accessEmailSentTo || session.email}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <a
            href={IOS_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[24px] border border-[#e1d6c7] bg-white p-5 transition hover:border-[#5c7f57]"
          >
            <Download className="h-5 w-5 text-[#5c7f57]" />
            <p className="mt-4 text-base font-semibold text-[#1f241d]">Download the app</p>
            <p className="mt-2 text-sm leading-6 text-[#5f5a51]">
              Open the iPhone app with the same account to keep your plan and streak synced.
            </p>
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[24px] border border-[#e1d6c7] bg-white p-5 transition hover:border-[#5c7f57]"
          >
            <ShieldCheck className="h-5 w-5 text-[#5c7f57]" />
            <p className="mt-4 text-base font-semibold text-[#1f241d]">Open Android download</p>
            <p className="mt-2 text-sm leading-6 text-[#5f5a51]">
              Use the same Google account or email after checkout to open your mobile plan.
            </p>
          </a>
          <button
            type="button"
            onClick={() => void handleSignOut()}
            className="rounded-[24px] border border-[#e1d6c7] bg-white p-5 text-left transition hover:border-[#c97a5a]"
          >
            <LogOut className="h-5 w-5 text-[#c97a5a]" />
            <p className="mt-4 text-base font-semibold text-[#1f241d]">Sign out</p>
            <p className="mt-2 text-sm leading-6 text-[#5f5a51]">
              Switch account if you want to open another Sukali plan from the web.
            </p>
          </button>
        </div>
      </div>
    </section>
  )
}
