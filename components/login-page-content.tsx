"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { User } from "firebase/auth"

import AccountAccessCard from "@/components/account-access-card"
import { getCurrentUserIdToken, restoreClaimedWebSession, waitForAuthUser } from "@/lib/auth-client"

type MemberSessionResponse = {
  hasPremium: boolean
}

export default function LoginPageContent() {
  const router = useRouter()
  const [isBooting, setIsBooting] = useState(true)
  const nextPath =
    typeof window !== "undefined"
      ? window.location.search
        ? new URLSearchParams(window.location.search).get("next") || "/plan"
        : "/plan"
      : "/plan"
  const signupPath = "/start?source=signup&from=/signup&resume=checkout"

  async function resolvePostSignInDestination() {
    const idToken = await getCurrentUserIdToken()
    const response = await fetch("/api/member/session", {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    })
    const payload = (await response.json().catch(() => ({}))) as Partial<MemberSessionResponse> & { error?: string }

    if (!response.ok) {
      throw new Error(payload.error ?? "Unable to verify your Sukali access.")
    }

    return payload.hasPremium ? nextPath : signupPath
  }

  useEffect(() => {
    let mounted = true

    async function boot() {
      try {
        const user = await restoreClaimedWebSession("login", "/login")
        if (!mounted || !user || user.isAnonymous || !user.email) return
        const destination = await resolvePostSignInDestination()
        if (!mounted) return
        router.replace(destination)
        return
      } catch {
        // Fall back to a passive auth wait below.
      } finally {
        if (mounted) setIsBooting(false)
      }

      try {
        const user = await waitForAuthUser()
        if (!mounted || !user || user.isAnonymous || !user.email) return
        const destination = await resolvePostSignInDestination()
        if (!mounted) return
        router.replace(destination)
      } catch {
        // Keep the login form visible if the session check cannot complete yet.
      }
    }

    void boot()

    return () => {
      mounted = false
    }
  }, [nextPath, router])

  async function handleSuccess(_: User) {
    const destination = await resolvePostSignInDestination()
    router.push(destination)
  }

  if (isBooting) {
    return (
      <div className="mx-auto max-w-[720px] rounded-[36px] border border-[#ddd1c1] bg-[#fffaf2] p-10 text-center shadow-[0_20px_44px_rgba(52,41,22,0.08)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7b7468]">Secure Access</p>
        <h1
          className="mt-4 text-3xl leading-tight text-[#1f241d] md:text-4xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Restoring your Sukali access.
        </h1>
        <p className="mt-4 text-sm leading-7 text-[#5f5a51]">
          Checking whether you already have a valid login session before showing the access form.
        </p>
      </div>
    )
  }

  return (
    <AccountAccessCard
      compact
      mode="signin"
      source="login"
      sourcePath="/login"
      title="Access your Sukali plan."
      subtitle="Use Google or the same verified email you used on the site so premium access stays attached to the right account."
      googleSignInEnabled
      onSuccess={handleSuccess}
    />
  )
}
