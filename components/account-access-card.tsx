"use client"

import { useEffect, useMemo, useState } from "react"
import type { User } from "firebase/auth"

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { signInOrCreateWithEmail, signInOrLinkWithGoogle, signInWithEmailPassword } from "@/lib/auth-client"

type AccountAccessMode = "signup" | "signin"

type AccountAccessCardProps = {
  source?: string
  sourcePath?: string
  title?: string
  subtitle?: string
  initialName?: string
  onSuccess?: (user: User) => void | Promise<void>
  compact?: boolean
  googleSignInEnabled?: boolean
  mode?: AccountAccessMode
}

function GoogleLogo() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
      <path
        d="M21.8 12.23c0-.77-.07-1.51-.2-2.23H12v4.22h5.49a4.7 4.7 0 0 1-2.04 3.09v2.57h3.3c1.93-1.78 3.05-4.4 3.05-7.65Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.75 0 5.06-.91 6.75-2.47l-3.3-2.57c-.91.61-2.08.97-3.45.97-2.65 0-4.9-1.79-5.7-4.2H2.89v2.65A10 10 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.3 13.73a5.99 5.99 0 0 1 0-3.46V7.62H2.89a10 10 0 0 0 0 8.76l3.41-2.65Z"
        fill="#FBBC05"
      />
      <path
        d="M12 6.07c1.5 0 2.86.52 3.92 1.53l2.94-2.94C17.05 2.98 14.74 2 12 2a10 10 0 0 0-9.11 5.62l3.41 2.65c.8-2.41 3.05-4.2 5.7-4.2Z"
        fill="#EA4335"
      />
    </svg>
  )
}

export default function AccountAccessCard({
  source,
  sourcePath,
  title = "Access your plan to quit sugar now.",
  subtitle = "Choose the fastest secure route to unlock your personalized plan, protect it from spam, and keep it attached to one real account.",
  initialName = "",
  onSuccess,
  compact = false,
  googleSignInEnabled = false,
  mode = "signup",
}: AccountAccessCardProps) {
  const [name, setName] = useState(initialName)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [verificationId, setVerificationId] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [maskedEmail, setMaskedEmail] = useState("")
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [authMethod, setAuthMethod] = useState<"google" | "email">(googleSignInEnabled ? "google" : "email")
  const [isLoading, setIsLoading] = useState(false)
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [isVerifyingCode, setIsVerifyingCode] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)

  const emailReady = useMemo(() => /\S+@\S+\.\S+/.test(email.trim()), [email])
  const passwordReady = useMemo(() => password.trim().length >= 6, [password])
  const passwordsMatch = useMemo(
    () => password.trim().length > 0 && password === confirmPassword,
    [confirmPassword, password],
  )
  const requiresPasswordConfirmation = mode === "signup"
  const emailDisabled = useMemo(
    () =>
      mode === "signup"
        ? !emailReady || !isEmailVerified || !passwordReady || !passwordsMatch
        : !emailReady || !passwordReady,
    [emailReady, isEmailVerified, mode, passwordReady, passwordsMatch],
  )

  useEffect(() => {
    setVerificationId("")
    setVerificationCode("")
    setMaskedEmail("")
    setIsEmailVerified(false)
    setInfo(null)
  }, [email])

  async function handleGoogle() {
    try {
      setAuthMethod("google")
      setError(null)
      setInfo(null)
      setIsLoading(true)
      const user = await signInOrLinkWithGoogle({
        source,
        sourcePath,
        preferExistingAccount: mode === "signin",
      })
      if (!user) {
        return
      }
      await onSuccess?.(user)
    } catch (err: any) {
      setError(err?.message ?? "Google sign-in failed.")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSendCode() {
    try {
      setAuthMethod("email")
      setError(null)
      setInfo(null)
      setIsSendingCode(true)

      const response = await fetch("/api/auth/email/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          displayName: name,
          source,
          sourcePath,
        }),
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload?.error ?? "Unable to send verification code.")
      }

      setVerificationId(String(payload.verificationId))
      setMaskedEmail(String(payload.maskedEmail ?? email))
      setInfo(`Verification code sent to ${String(payload.maskedEmail ?? email)}.`)
    } catch (err: any) {
      setError(err?.message ?? "Unable to send verification code.")
    } finally {
      setIsSendingCode(false)
    }
  }

  async function handleVerifyCode() {
    try {
      setError(null)
      setInfo(null)
      setIsVerifyingCode(true)

      const response = await fetch("/api/auth/email/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          verificationId,
          code: verificationCode,
        }),
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload?.error ?? "Unable to verify your code.")
      }

      setIsEmailVerified(true)
      setInfo("Email confirmed. You can continue to unlock your plan.")
    } catch (err: any) {
      setError(err?.message ?? "Unable to verify your code.")
    } finally {
      setIsVerifyingCode(false)
    }
  }

  async function handleEmail() {
    try {
      if (!passwordReady) {
        throw new Error(mode === "signup" ? "Choose a password with at least 6 characters." : "Enter your password.")
      }

      if (mode === "signup" && !isEmailVerified) {
        throw new Error("Confirm your email with the 6-digit code before continuing.")
      }

      if (requiresPasswordConfirmation && !passwordsMatch) {
        throw new Error("Your passwords do not match.")
      }

      setAuthMethod("email")
      setError(null)
      setInfo(null)
      setIsLoading(true)
      const user =
        mode === "signup"
          ? await signInOrCreateWithEmail({
              email,
              password,
              verificationId,
              displayName: name,
              source,
              sourcePath,
            })
          : await signInWithEmailPassword({
              email,
              password,
              source,
              sourcePath,
            })
      await onSuccess?.(user)
    } catch (err: any) {
      setError(err?.message ?? "Email sign-in failed.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`mx-auto w-full ${compact ? "max-w-[560px]" : "max-w-[720px]"}`}>
      <div className="overflow-hidden rounded-[36px] border border-[#ddd1c1] bg-[#fffaf2] shadow-[0_20px_44px_rgba(52,41,22,0.08)]">
        <div className="border-b border-[#e6d8c7] bg-[linear-gradient(180deg,#fffaf2_0%,#f3eadf_100%)] px-6 py-8 text-center md:px-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d7cab8] bg-white shadow-[0_14px_30px_rgba(54,43,22,0.08)]">
            <span className="text-xl font-semibold text-[#5c7f57]">S</span>
          </div>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7b7468]">Secure Access</p>
          <h2
            className="mt-4 text-3xl leading-tight text-[#1f241d] md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#5f5a51] md:text-base">{subtitle}</p>
        </div>

        <div className="px-6 py-6 md:px-10 md:py-8">
          {googleSignInEnabled ? (
            <>
              <button
                type="button"
                onClick={handleGoogle}
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[#d7cab8] bg-white px-5 py-4 text-base font-semibold text-[#1f241d] shadow-[0_10px_24px_rgba(54,43,22,0.05)] transition hover:border-[#5c7f57] hover:bg-[#faf6ef] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <GoogleLogo />
                <span>{isLoading && authMethod === "google" ? "Opening Google..." : "Continue with Google"}</span>
              </button>

              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#e4d6c5]" />
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a8276]">or continue with email</span>
                <div className="h-px flex-1 bg-[#e4d6c5]" />
              </div>
            </>
          ) : null}

          <div className="rounded-[28px] border border-[#e4d6c5] bg-white p-5 md:p-6">
            <div className="grid gap-4">
              <div className={compact ? "grid gap-4" : "grid gap-4 md:grid-cols-2"}>
                {mode === "signup" ? (
                  <label className="grid gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7b7468]">First name</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Your first name"
                      className="rounded-2xl border border-[#ddd1c1] bg-[#fffaf2] px-4 py-3 text-sm text-[#1f241d] outline-none transition focus:border-[#5c7f57]"
                    />
                  </label>
                ) : null}

                <label className="grid gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7b7468]">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="rounded-2xl border border-[#ddd1c1] bg-[#fffaf2] px-4 py-3 text-sm text-[#1f241d] outline-none transition focus:border-[#5c7f57]"
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7b7468]">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 6 characters"
                  className="rounded-2xl border border-[#ddd1c1] bg-[#fffaf2] px-4 py-3 text-sm text-[#1f241d] outline-none transition focus:border-[#5c7f57]"
                />
              </label>

              {requiresPasswordConfirmation ? (
                <label className="grid gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7b7468]">Confirm password</span>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Retype your password"
                    className="rounded-2xl border border-[#ddd1c1] bg-[#fffaf2] px-4 py-3 text-sm text-[#1f241d] outline-none transition focus:border-[#5c7f57]"
                  />
                </label>
              ) : null}

              <p className="text-sm leading-6 text-[#6c665c]">
                {mode === "signup"
                  ? "We verify the inbox first, then attach the plan to that email. This password will be the one you reuse later if you come back with email."
                  : "Use the same email and password you already attached to your Sukali account."}
              </p>

              {!passwordReady && password.length > 0 ? (
                <p className="text-sm text-[#b85c38]">Password must be at least 6 characters.</p>
              ) : null}

              {requiresPasswordConfirmation && confirmPassword.length > 0 && !passwordsMatch ? (
                <p className="text-sm text-[#b85c38]">Passwords must match exactly.</p>
              ) : null}

              {mode === "signup" ? (
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <button
                    type="button"
                    onClick={handleSendCode}
                    disabled={isSendingCode || !emailReady}
                    className="inline-flex items-center justify-center rounded-full border border-[#d8ccb9] bg-[#fffaf2] px-5 py-3 text-sm font-semibold text-[#1f241d] transition hover:border-[#5c7f57] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSendingCode ? "Sending code..." : "Send verification code"}
                  </button>
                  {maskedEmail ? <p className="text-sm text-[#6c665c]">Code sent to {maskedEmail}</p> : null}
                </div>
              ) : null}

              {mode === "signup" && verificationId ? (
                <div className="rounded-[24px] border border-[#dce9d8] bg-[#f7fbf5] p-4 md:p-5">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#1f241d]">Enter the 6-digit code</p>
                      <p className="mt-1 text-sm leading-6 text-[#5f5a51]">
                        This confirms the inbox before we unlock your plan.
                      </p>
                    </div>
                    {isEmailVerified ? (
                      <span className="inline-flex items-center rounded-full bg-[#e4f0e0] px-4 py-2 text-sm font-semibold text-[#456042]">
                        Verified
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-4">
                    <InputOTP
                      maxLength={6}
                      value={verificationCode}
                      onChange={setVerificationCode}
                      containerClassName="justify-start"
                      className="gap-0"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="h-12 w-12 rounded-l-2xl border-[#cfdcc8] bg-white text-base" />
                        <InputOTPSlot index={1} className="h-12 w-12 border-[#cfdcc8] bg-white text-base" />
                        <InputOTPSlot index={2} className="h-12 w-12 border-[#cfdcc8] bg-white text-base" />
                        <InputOTPSlot index={3} className="h-12 w-12 border-[#cfdcc8] bg-white text-base" />
                        <InputOTPSlot index={4} className="h-12 w-12 border-[#cfdcc8] bg-white text-base" />
                        <InputOTPSlot index={5} className="h-12 w-12 rounded-r-2xl border-[#cfdcc8] bg-white text-base" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <button
                    type="button"
                    onClick={handleVerifyCode}
                    disabled={isVerifyingCode || verificationCode.length !== 6}
                    className="mt-4 inline-flex items-center justify-center rounded-full bg-[#5c7f57] px-5 py-3 text-sm font-semibold text-[#fffaf2] transition hover:bg-[#4c6c47] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isVerifyingCode ? "Checking..." : isEmailVerified ? "Email confirmed" : "Verify code"}
                  </button>
                </div>
              ) : null}

              <button
                type="button"
                onClick={handleEmail}
                disabled={isLoading || emailDisabled}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#1f241d] px-6 py-3.5 text-sm font-semibold text-[#fffaf2] transition hover:bg-[#273024] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading && authMethod === "email"
                  ? "Opening your plan..."
                  : mode === "signup"
                    ? "Continue with email"
                    : "Sign in with email"}
              </button>
            </div>
          </div>

          {info ? <p className="mt-4 text-sm text-[#4c6c47]">{info}</p> : null}
          {error ? <p className="mt-4 text-sm text-[#b85c38]">{error}</p> : null}
        </div>
      </div>
    </div>
  )
}
