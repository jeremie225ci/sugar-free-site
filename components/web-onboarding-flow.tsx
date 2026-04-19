"use client"

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import Link from "next/link"
import { onAuthStateChanged } from "firebase/auth"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import type { User } from "firebase/auth"

import AccountAccessCard from "@/components/account-access-card"
import {
  clearGoogleResumeCheckoutRequested,
  consumeGoogleResumeCheckoutRequested,
  debugAuthEvent,
  consumeGoogleRedirectCompleted,
  ensureAnonymousWebSession,
  ensureUserDocument,
  getCurrentUserIdToken,
} from "@/lib/auth-client"
import { getClientAuth, getClientDb } from "@/lib/firebase"
import {
  alertSlides,
  analysisMessages,
  checkoutPlanOptions,
  expertCards,
  premiumBenefits,
  quizQuestions,
  ratingTestimonials,
  solutionSlides,
  symptomGroups,
  userStories,
  type CheckoutPlanKey,
  type NarrativeSlide,
  type QuizQuestion,
} from "@/lib/web-onboarding-content"

type WebOnboardingFlowProps = {
  source?: string
  sourcePath?: string
  resume?: string
}

type MemberSession = {
  hasPremium: boolean
  checkoutStatus: string
  planKey: string
  planLabel: string
}

type Stage =
  | { key: string; type: "intro" }
  | { key: string; type: "quiz"; question: QuizQuestion }
  | { key: string; type: "analysis" }
  | { key: string; type: "results" }
  | { key: string; type: "symptoms" }
  | { key: string; type: "alert"; slide: NarrativeSlide; position: number }
  | { key: string; type: "solution"; slide: NarrativeSlide; position: number }
  | { key: string; type: "experts-intro" }
  | { key: string; type: "social-experts" }
  | { key: string; type: "social-testimonials" }
  | { key: string; type: "social-recovery" }
  | { key: string; type: "rating" }
  | { key: string; type: "account" }
  | { key: string; type: "week-preview" }
  | { key: string; type: "checkout" }

const averageDependencyScore = 41
const LOCAL_DRAFT_KEY = "sukali_web_onboarding_draft_v3"
const weekProgressSlides = [
  { day: "Day 1", imageSrc: "/assets/images/onboarding-progress/day-1.png" },
  { day: "Day 2", imageSrc: "/assets/images/onboarding-progress/day-2.png" },
  { day: "Day 3", imageSrc: "/assets/images/onboarding-progress/day-3.png" },
  { day: "Day 4", imageSrc: "/assets/images/onboarding-progress/day-4.png" },
  { day: "Day 5", imageSrc: "/assets/images/onboarding-progress/day-5.png" },
  { day: "Day 6", imageSrc: "/assets/images/onboarding-progress/day-6.png" },
  { day: "Day 7", imageSrc: "/assets/images/onboarding-progress/day-7.png" },
] as const

type LocalOnboardingDraft = {
  stageIndex: number
  quizAnswers: Record<string, string>
  profile: {
    name: string
    age: string
  }
  selectedSymptoms: string[]
  selectedPlan: CheckoutPlanKey
  updatedAt: number
}

function readLocalDraft() {
  if (typeof window === "undefined") return null

  try {
    const raw = window.localStorage.getItem(LOCAL_DRAFT_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as Partial<LocalOnboardingDraft>
    return {
      stageIndex: typeof parsed.stageIndex === "number" ? parsed.stageIndex : 0,
      quizAnswers: parsed.quizAnswers && typeof parsed.quizAnswers === "object" ? parsed.quizAnswers : {},
      profile: {
        name: typeof parsed.profile?.name === "string" ? parsed.profile.name : "",
        age: typeof parsed.profile?.age === "string" ? parsed.profile.age : "",
      },
      selectedSymptoms: Array.isArray(parsed.selectedSymptoms)
        ? parsed.selectedSymptoms.filter((entry): entry is string => typeof entry === "string")
        : [],
      selectedPlan: parsed.selectedPlan === "yearly" ? "yearly" : "monthly",
      updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : Date.now(),
    } satisfies LocalOnboardingDraft
  } catch {
    return null
  }
}

function writeLocalDraft(draft: LocalOnboardingDraft) {
  if (typeof window === "undefined") return

  try {
    window.localStorage.setItem(LOCAL_DRAFT_KEY, JSON.stringify(draft))
  } catch {
    // Ignore storage failures on restrictive browsers.
  }
}

function splitParagraphs(paragraphs: string[]) {
  return paragraphs.map((paragraph) => paragraph.split("\n").filter(Boolean))
}

function getQuestionNumber(questionId: string) {
  return quizQuestions.findIndex((question) => question.id === questionId) + 1
}

function setResumeCheckoutUrlFlag() {
  if (typeof window === "undefined") return

  const url = new URL(window.location.href)
  url.searchParams.set("resume", "checkout")
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`)
}

function clearResumeCheckoutUrlFlag() {
  if (typeof window === "undefined") return

  const url = new URL(window.location.href)
  if (url.searchParams.get("resume") !== "checkout") return
  url.searchParams.delete("resume")
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`)
}

function redirectToCheckout(url: string) {
  if (typeof window === "undefined") return

  const normalizedUrl = String(url ?? "").trim()
  if (!normalizedUrl) {
    throw new Error("Missing checkout URL")
  }

  const anchor = window.document.createElement("a")
  anchor.href = normalizedUrl
  anchor.target = "_self"
  anchor.rel = "noopener noreferrer"
  anchor.style.display = "none"
  window.document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()

  window.location.assign(normalizedUrl)
}

export default function WebOnboardingFlow({
  source = "direct",
  sourcePath = "/start",
  resume = "",
}: WebOnboardingFlowProps) {
  const [stageIndex, setStageIndex] = useState(0)
  const [user, setUser] = useState<User | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [profile, setProfile] = useState({ name: "", age: "" })
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [selectedPlan, setSelectedPlan] = useState<CheckoutPlanKey>("monthly")
  const [isBooting, setIsBooting] = useState(true)
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisMessageIndex, setAnalysisMessageIndex] = useState(0)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [manualCheckoutUrl, setManualCheckoutUrl] = useState<string | null>(null)
  const [shouldResumeCheckoutAfterAuth, setShouldResumeCheckoutAfterAuth] = useState(false)
  const [memberSession, setMemberSession] = useState<MemberSession | null>(null)
  const [weekPreviewIndex, setWeekPreviewIndex] = useState(0)

  const db = useMemo(() => getClientDb(), [])
  const advanceTimerRef = useRef<number | null>(null)
  const checkoutFallbackTimerRef = useRef<number | null>(null)
  const weekPreviewScrollRef = useRef<HTMLDivElement | null>(null)

  const stages = useMemo<Stage[]>(
    () => [
      { key: "intro", type: "intro" },
      ...quizQuestions.map((question) => ({
        key: `quiz:${question.id}`,
        type: "quiz" as const,
        question,
      })),
      { key: "analysis", type: "analysis" },
      { key: "results", type: "results" },
      { key: "symptoms", type: "symptoms" },
      ...alertSlides.map((slide, position) => ({
        key: `alert:${slide.id}`,
        type: "alert" as const,
        slide,
        position,
      })),
      ...solutionSlides.map((slide, position) => ({
        key: `solution:${slide.id}`,
        type: "solution" as const,
        slide,
        position,
      })),
      { key: "experts-intro", type: "experts-intro" },
      { key: "social-experts", type: "social-experts" },
      { key: "social-testimonials", type: "social-testimonials" },
      { key: "social-recovery", type: "social-recovery" },
      { key: "rating", type: "rating" },
      { key: "account", type: "account" },
      { key: "week-preview", type: "week-preview" },
      { key: "checkout", type: "checkout" },
    ],
    [],
  )

  const currentStage = stages[stageIndex] ?? stages[0]
  const isIntroStage = currentStage.type === "intro"
  const totalStages = stages.length
  const symptomsStageIndex = stages.findIndex((stage) => stage.type === "symptoms")
  const accountStageIndex = stages.findIndex((stage) => stage.type === "account")
  const weekPreviewStageIndex = stages.findIndex((stage) => stage.type === "week-preview")
  const checkoutStageIndex = stages.findIndex((stage) => stage.type === "checkout")
  const isLoggedInUser = Boolean(user && !user.isAnonymous && user.email)

  const dependencyScore = useMemo(() => {
    const scores = quizQuestions
      .filter((question) => question.type !== "form" && question.options?.length)
      .map((question) => {
        const selectedOption = question.options?.find((option) => option.id === quizAnswers[question.id])
        return selectedOption?.score
      })
      .filter((score): score is number => typeof score === "number")

    if (scores.length === 0) return 65

    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length
    return Math.max(64, Math.min(86, Math.round(averageScore)))
  }, [quizAnswers])

  useEffect(() => {
    let mounted = true

    async function boot() {
      const savedDraft = readLocalDraft()
      const resumeCheckoutRequested = consumeGoogleResumeCheckoutRequested()
      debugAuthEvent("flow_boot_start", {
        savedDraftStageIndex: savedDraft?.stageIndex ?? null,
        resumeCheckoutRequested,
        source,
        sourcePath,
      })

      if (savedDraft && mounted) {
        setStageIndex(savedDraft.stageIndex)
        setQuizAnswers(savedDraft.quizAnswers)
        setProfile(savedDraft.profile)
        setSelectedSymptoms(savedDraft.selectedSymptoms)
        setSelectedPlan(savedDraft.selectedPlan)
      }

      try {
        const currentUser = await ensureAnonymousWebSession(source, sourcePath)
        if (!mounted) return
        setUser(currentUser)

        const redirectCompleted = consumeGoogleRedirectCompleted()

        if (currentUser && !currentUser.isAnonymous && currentUser.email) {
          const shouldResumeCheckout =
            resume === "checkout" ||
            redirectCompleted ||
            resumeCheckoutRequested ||
            Boolean(savedDraft && savedDraft.stageIndex >= accountStageIndex)

          debugAuthEvent("flow_boot_user_ready", {
            user: currentUser
              ? {
                  uid: currentUser.uid,
                  isAnonymous: currentUser.isAnonymous,
                  email: currentUser.email ?? null,
                }
              : null,
            redirectCompleted,
            resumeCheckoutRequested,
            shouldResumeCheckout,
            savedDraftStageIndex: savedDraft?.stageIndex ?? null,
            resume,
          })

          if (shouldResumeCheckout) {
            clearGoogleResumeCheckoutRequested()
            clearResumeCheckoutUrlFlag()
            setStageIndex(weekPreviewStageIndex)
          }
        } else if (resume === "checkout" || redirectCompleted || resumeCheckoutRequested) {
          setShouldResumeCheckoutAfterAuth(true)
          debugAuthEvent("flow_boot_resume_checkout_pending_auth", {
            resume,
            redirectCompleted,
            resumeCheckoutRequested,
            savedDraftStageIndex: savedDraft?.stageIndex ?? null,
          })
        }
      } catch (err: any) {
        if (!mounted) return
        setError(err?.message ?? "Unable to start the onboarding right now.")
      } finally {
        if (mounted) setIsBooting(false)
      }
    }

    void boot()

    return () => {
      mounted = false
    }
  }, [accountStageIndex, resume, source, sourcePath, weekPreviewStageIndex])

  useEffect(() => {
    const auth = getClientAuth()
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      debugAuthEvent("flow_auth_state_changed", {
        nextUser: nextUser
          ? {
              uid: nextUser.uid,
              isAnonymous: nextUser.isAnonymous,
              email: nextUser.email ?? null,
            }
          : null,
      })

      setUser((currentUser) => {
        const currentUid = currentUser?.uid ?? ""
        const nextUid = nextUser?.uid ?? ""
        const currentEmail = currentUser?.email ?? ""
        const nextEmail = nextUser?.email ?? ""

        if (
          currentUid === nextUid &&
          currentEmail === nextEmail &&
          Boolean(currentUser?.isAnonymous) === Boolean(nextUser?.isAnonymous)
        ) {
          return currentUser
        }

        return nextUser
      })
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.scrollTo({ top: 0, behavior: stageIndex === 0 ? "auto" : "smooth" })
  }, [stageIndex])

  useEffect(() => {
    if (currentStage.type !== "analysis") return

    setAnalysisProgress(0)
    setAnalysisMessageIndex(0)

    const duration = 7000
    const start = Date.now()

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - start
      const nextProgress = Math.min(elapsed / duration, 1)

      setAnalysisProgress(nextProgress)
      setAnalysisMessageIndex(
        Math.min(Math.floor(nextProgress * analysisMessages.length), analysisMessages.length - 1),
      )

      if (nextProgress >= 1) {
        window.clearInterval(interval)
        window.setTimeout(() => {
          setStageIndex((current) => Math.min(current + 1, totalStages - 1))
        }, 300)
      }
    }, 90)

    return () => window.clearInterval(interval)
  }, [currentStage.type, totalStages])

  useEffect(() => {
    if (isBooting) return

    writeLocalDraft({
      stageIndex,
      quizAnswers,
      profile,
      selectedSymptoms,
      selectedPlan,
      updatedAt: Date.now(),
    })

    if (!user) return

    const timeout = window.setTimeout(() => {
      void saveProgress()
    }, 250)

    return () => window.clearTimeout(timeout)
  }, [
    user,
    isBooting,
    stageIndex,
    currentStage.key,
    quizAnswers,
    profile.name,
    profile.age,
    selectedSymptoms,
    selectedPlan,
  ])

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) {
        window.clearTimeout(advanceTimerRef.current)
      }

      if (checkoutFallbackTimerRef.current) {
        window.clearTimeout(checkoutFallbackTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!shouldResumeCheckoutAfterAuth) return
    if (!isLoggedInUser) return

    debugAuthEvent("flow_resume_checkout_after_auth", {
      email: user?.email ?? null,
      stageIndex,
    })
    clearGoogleResumeCheckoutRequested()
    setShouldResumeCheckoutAfterAuth(false)
    clearResumeCheckoutUrlFlag()
    setStageIndex(weekPreviewStageIndex)
  }, [isLoggedInUser, shouldResumeCheckoutAfterAuth, stageIndex, user?.email, weekPreviewStageIndex])

  useEffect(() => {
    let cancelled = false

    async function loadMemberSession() {
      if (!isLoggedInUser) {
        setMemberSession(null)
        return
      }

      try {
        const idToken = await getCurrentUserIdToken()
        const response = await fetch("/api/member/session", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        })
        const payload = await response.json()

        if (!response.ok) {
          throw new Error(payload?.error ?? "Unable to load your plan.")
        }

        if (cancelled) return

        const nextSession = payload as MemberSession
        setMemberSession(nextSession)

        if (nextSession.hasPremium) {
          debugAuthEvent("flow_premium_user_redirect_plan", {
            email: user?.email ?? null,
            planKey: nextSession.planKey,
            checkoutStatus: nextSession.checkoutStatus,
          })
          window.location.assign("/plan")
        }
      } catch (err: any) {
        if (cancelled) return
        debugAuthEvent("flow_member_session_error", {
          message: err?.message ?? "Unable to load your plan.",
        })
      }
    }

    void loadMemberSession()

    return () => {
      cancelled = true
    }
  }, [isLoggedInUser, user?.email])

  useEffect(() => {
    if (currentStage.type !== "account") return
    if (!isLoggedInUser) return

    debugAuthEvent("flow_account_auto_advance_checkout", {
      email: user?.email ?? null,
      stageIndex,
    })

    const timer = window.setTimeout(() => {
      clearResumeCheckoutUrlFlag()
      setStageIndex(weekPreviewStageIndex)
    }, 180)

    return () => window.clearTimeout(timer)
  }, [currentStage.type, isLoggedInUser, weekPreviewStageIndex])

  useEffect(() => {
    if (currentStage.type !== "week-preview") return

    setWeekPreviewIndex(0)
    weekPreviewScrollRef.current?.scrollTo({ left: 0, behavior: "auto" })
  }, [currentStage.type])

  async function saveProgress() {
    if (!user) return

    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        email: user.email ?? "",
        displayName: profile.name || user.displayName || null,
        lastSource: source,
        lastSourcePath: sourcePath,
        lastActivity: serverTimestamp(),
        onboarding_step: stageIndex >= accountStageIndex ? "plan_ready" : "web_onboarding",
        webOnboarding: {
          source,
          sourcePath,
          stageIndex,
          stageKey: currentStage.key,
          totalStages,
          quizAnswers,
          identity: profile,
          selectedSymptoms,
          selectedPlan,
          dependencyScore,
          averageScore: averageDependencyScore,
          version: "app-aligned-v2",
          updatedAt: serverTimestamp(),
        },
      },
      { merge: true },
    )
  }

  function goBack() {
    setError(null)
    setStatusMessage(null)
    setManualCheckoutUrl(null)
    setStageIndex((current) => Math.max(current - 1, 0))
  }

  function goNext(nextIndex?: number) {
    setError(null)
    setStatusMessage(null)
    setManualCheckoutUrl(null)
    setStageIndex((current) => {
      if (typeof nextIndex === "number") return Math.max(0, Math.min(nextIndex, totalStages - 1))
      return Math.min(current + 1, totalStages - 1)
    })
  }

  function scrollWeekPreviewTo(index: number) {
    const nextIndex = Math.max(0, Math.min(index, weekProgressSlides.length - 1))
    setWeekPreviewIndex(nextIndex)

    const scroller = weekPreviewScrollRef.current
    if (!scroller) return

    scroller.scrollTo({
      left: scroller.clientWidth * nextIndex,
      behavior: "smooth",
    })
  }

  function handleQuestionAnswer(questionId: string, optionId: string) {
    setError(null)
    setQuizAnswers((current) => ({
      ...current,
      [questionId]: optionId,
    }))

    if (advanceTimerRef.current) {
      window.clearTimeout(advanceTimerRef.current)
    }

    advanceTimerRef.current = window.setTimeout(() => {
      goNext()
    }, 180)
  }

  async function handleSymptomsContinue() {
    if (!user) {
      goNext()
      return
    }

    try {
      await setDoc(
        doc(db, "users", user.uid, "symptoms", "user_symptoms"),
        {
          selected: selectedSymptoms,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      )
    } catch {
      // Keep the onboarding moving even if this write fails.
    }

    goNext()
  }

  async function handleAccountSuccess(currentUser: User) {
    debugAuthEvent("flow_account_success", {
      user: {
        uid: currentUser.uid,
        isAnonymous: currentUser.isAnonymous,
        email: currentUser.email ?? null,
      },
    })

    setUser(currentUser)
    setError(null)
    setStatusMessage(null)
    setManualCheckoutUrl(null)
    clearGoogleResumeCheckoutRequested()
    setShouldResumeCheckoutAfterAuth(false)

    try {
      await ensureUserDocument(currentUser, {
        displayName: profile.name,
        email: currentUser.email,
        source,
        sourcePath,
      })
      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          accountClaimedAt: serverTimestamp(),
          lastActivity: serverTimestamp(),
        },
        { merge: true },
      )
    } catch {
      // Keep moving into checkout even if remote sync is briefly unavailable.
    }

    clearResumeCheckoutUrlFlag()
    setStageIndex(weekPreviewStageIndex)
  }

  async function handleCheckout() {
    if (!user || user.isAnonymous || !user.email) {
      setError("Claim your account with Google or email before checkout.")
      return
    }

    if (memberSession?.hasPremium) {
      window.location.assign("/plan")
      return
    }

    try {
      debugAuthEvent("checkout_start", {
        user: {
          uid: user.uid,
          email: user.email,
          isAnonymous: user.isAnonymous,
        },
        selectedPlan,
      })
      setError(null)
      setManualCheckoutUrl(null)
      setStatusMessage("Preparing secure checkout...")
      setIsCreatingCheckout(true)
      const idToken = await getCurrentUserIdToken()

      void setDoc(
        doc(db, "users", user.uid),
        {
          readyForCheckoutAt: serverTimestamp(),
          lastActivity: serverTimestamp(),
          checkout: {
            plan: selectedPlan,
            source,
            sourcePath,
            updatedAt: serverTimestamp(),
          },
        },
        { merge: true },
      ).catch(() => {
        // The server route writes checkout state too. Do not block redirect on client Firestore.
      })

      const response = await fetch("/api/checkout/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          email: user.email,
          name: profile.name || user.displayName || "",
          source,
          sourcePath,
          plan: selectedPlan,
        }),
      })

      const payload = (await response.json().catch(() => null)) as { error?: string; url?: string } | null

      if (!response.ok || !payload?.url) {
        debugAuthEvent("checkout_error_response", {
          selectedPlan,
          status: response.status,
          error: payload?.error ?? null,
        })
        throw new Error(payload?.error ?? "Unable to open checkout.")
      }

      debugAuthEvent("checkout_redirect", {
        selectedPlan,
        checkoutUrl: payload.url,
      })
      setManualCheckoutUrl(payload.url)
      setStatusMessage("Redirecting to secure checkout... If nothing opens, use the manual button below.")

      if (checkoutFallbackTimerRef.current) {
        window.clearTimeout(checkoutFallbackTimerRef.current)
      }

      checkoutFallbackTimerRef.current = window.setTimeout(() => {
        setIsCreatingCheckout(false)
        setStatusMessage("Checkout is ready. If it did not open automatically, use the manual button below.")
      }, 1800)

      redirectToCheckout(payload.url)
    } catch (err: any) {
      debugAuthEvent("checkout_client_error", {
        selectedPlan,
        error: err?.message ?? "Unable to open checkout.",
      })
      setError(err?.message ?? "Unable to open checkout.")
      setIsCreatingCheckout(false)
    }
  }

  if (isBooting) {
    return (
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-[36px] border border-[#ddd1c1] bg-[#fffaf2] p-10 text-center shadow-[0_18px_40px_rgba(52,41,22,0.06)]">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#7b7468]">Preparing</p>
            <h1
              className="mt-4 text-4xl text-[#1f241d]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Loading the full Sukali onboarding.
            </h1>
            <p className="mt-4 text-sm leading-7 text-[#5f5a51]">
              Starting a safe session so the same account can move from web to app without losing progress.
            </p>
          </div>
        </div>
      </section>
    )
  }

  const progressPercent = ((stageIndex + 1) / totalStages) * 100
  const resultsDifference = dependencyScore - averageDependencyScore
  const selectedPlanDetails = checkoutPlanOptions.find((plan) => plan.key === selectedPlan) ?? checkoutPlanOptions[0]

  return (
    <section className={isIntroStage ? "pb-16 pt-8 md:pb-24 md:pt-10" : "pb-16 pt-10 md:pb-24 md:pt-14"}>
      <div className={`mx-auto px-4 ${isIntroStage ? "max-w-5xl" : "max-w-6xl"}`}>
        {!isIntroStage ? (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="inline-flex rounded-full border border-[#d8ccb9] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#7b7468] shadow-sm">
                  Sukali Assessment
                </span>
                <h1
                  className="mt-4 text-3xl leading-tight text-[#1f241d] md:text-5xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Your glow-up plan without sugar.
                </h1>
              </div>
              <div className="rounded-full border border-[#ddd1c1] bg-[#fffaf2] px-5 py-3 text-sm font-semibold text-[#5f5a51] shadow-sm">
                Screen {stageIndex + 1} / {totalStages}
              </div>
            </div>

            <div className="mb-8 h-2 overflow-hidden rounded-full bg-[#e6dbcf]">
              <div
                className="h-full rounded-full bg-[#5c7f57] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </>
        ) : null}

        {currentStage.type === "intro" ? (
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full border border-[#d8ccb9] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7b7468] shadow-sm">
              Quiz
            </span>
            <h1
              className="mx-auto mt-8 max-w-[12ch] text-5xl leading-[1.05] text-[#1f241d] md:text-7xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              A quick check on how sugar is showing up in your routine.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-[#5f5a51] md:text-xl">
              This is not a medical diagnosis. It is a short self-check to spot patterns around cravings, energy, food habits, and the kind of friction that usually makes people drift.
            </p>

            <div className="mx-auto mt-10 max-w-3xl rounded-[34px] border border-[#ddd1c1] bg-[#fffaf2] p-5 text-left shadow-[0_18px_40px_rgba(52,41,22,0.06)] md:p-8">
              <h2
                className="text-3xl leading-tight text-[#1f241d] md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                What this helps with
              </h2>
              <div className="mt-6 grid gap-5 text-base leading-8 text-[#5f5a51] md:text-lg">
                {[
                  "Spot whether cravings and crashes are isolated or part of a repeating pattern.",
                  "See whether sugar may be influencing skin, appetite, puffiness, or energy more than you realize.",
                  "Get a calmer next step instead of a dramatic detox pitch.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-4">
                    <span className="mt-3 h-3 w-3 shrink-0 rounded-full bg-[#6f8b67]" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[24px] bg-[#ebe2d4] px-5 py-5 text-base leading-8 text-[#6a645b] md:text-lg">
                <strong>About 3 minutes</strong> to answer all the questions. Better results if you answer honestly instead of optimistically.
              </div>
            </div>

            <div className="mt-10">
              <button
                type="button"
                onClick={() => goNext()}
                className="inline-flex items-center justify-center rounded-full bg-[#1f241d] px-9 py-4 text-base font-semibold text-[#fffaf2] shadow-[0_14px_34px_rgba(31,36,29,0.18)] transition hover:bg-[#2a3128]"
              >
                Start the quiz
              </button>
              <p className="mt-5 text-sm leading-7 text-[#8a8276]">
                About 3 minutes • confidential • no account needed
              </p>
            </div>
          </div>
        ) : null}

        {currentStage.type === "quiz" ? (
          currentStage.question.type === "form" ? (
            <QuestionShell
              emoji={currentStage.question.emoji}
              eyebrow={`Question ${getQuestionNumber(currentStage.question.id)} of ${quizQuestions.length}`}
              title={currentStage.question.title}
              subtitle={currentStage.question.subtitle}
              onBack={goBack}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-[#4d493f]">First name</span>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))}
                    placeholder="Your first name"
                    className="rounded-[22px] border border-[#ddd1c1] bg-white px-5 py-4 text-base text-[#1f241d] outline-none transition focus:border-[#5c7f57]"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-[#4d493f]">Age</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={profile.age}
                    onChange={(event) => setProfile((current) => ({ ...current, age: event.target.value }))}
                    placeholder="Your age"
                    className="rounded-[22px] border border-[#ddd1c1] bg-white px-5 py-4 text-base text-[#1f241d] outline-none transition focus:border-[#5c7f57]"
                  />
                </label>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => goNext()}
                  disabled={!profile.name.trim() || !profile.age.trim()}
                  className="glow-button rounded-full bg-[#1f241d] px-7 py-3.5 text-sm font-semibold text-[#fffaf2] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Continue
                </button>
                <p className="text-sm text-[#6c665c]">Your plan and checkout will stay linked to this identity later.</p>
              </div>
            </QuestionShell>
          ) : (
            <QuestionShell
              emoji={currentStage.question.emoji}
              eyebrow={`Question ${getQuestionNumber(currentStage.question.id)} of ${quizQuestions.length}`}
              title={currentStage.question.title}
              subtitle={currentStage.question.subtitle}
              onBack={goBack}
            >
              <div className="grid gap-4 md:grid-cols-2">
                {currentStage.question.options?.map((option) => {
                  const selected = quizAnswers[currentStage.question.id] === option.id
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleQuestionAnswer(currentStage.question.id, option.id)}
                      className={`card-hover rounded-[26px] border px-5 py-5 text-left transition-all duration-300 ${
                        selected
                          ? "border-[#5c7f57] bg-[#edf3ea] shadow-[0_12px_30px_rgba(72,99,66,0.12)]"
                          : "border-[#ddd1c1] bg-white hover:border-[#5c7f57]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-lg font-semibold leading-7 text-[#1f241d]">{option.label}</p>
                        <span
                          className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                            selected ? "bg-[#5c7f57] text-[#fffaf2]" : "bg-[#f2eadf] text-[#6c665c]"
                          }`}
                        >
                          ✓
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
              <p className="mt-5 text-sm text-[#6c665c]">Tap the answer that feels closest. The next screen will move automatically.</p>
            </QuestionShell>
          )
        ) : null}

        {currentStage.type === "analysis" ? (
          <div className="overflow-hidden rounded-[40px] border border-[#2a3128] bg-[#1f241d] p-8 text-[#fffaf2] shadow-[0_22px_54px_rgba(32,27,18,0.16)] md:p-12">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#d8ccbc]">Analyzing</p>
              <div className="mx-auto mt-8 flex h-60 w-60 items-center justify-center rounded-full border border-white/10 bg-[#151914] shadow-[inset_0_0_0_16px_rgba(255,255,255,0.02)] onboarding-pattern">
                <div
                  className="relative flex h-52 w-52 items-center justify-center rounded-full"
                  style={{
                    background: `conic-gradient(#c97a5a ${analysisProgress * 360}deg, rgba(255,255,255,0.08) 0deg)`,
                  }}
                >
                  <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full bg-[#1f241d]">
                    <p className="text-5xl font-semibold text-white">{Math.round(analysisProgress * 100)}%</p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-[#d8ccbc]">Calculating</p>
                  </div>
                </div>
              </div>
              <h2
                className="mt-10 text-4xl leading-tight text-white md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {analysisMessages[analysisMessageIndex]}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#d8ccbc]">
                Pulling together your answers, cravings profile, symptom pattern, and likely sugar dependency level.
              </p>
            </div>
          </div>
        ) : null}

        {currentStage.type === "results" ? (
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <StagePanel tone="light">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#7b7468]">Analysis complete</p>
              <h2
                className="mt-4 text-4xl leading-tight text-[#1f241d] md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                We have something important to tell you.
              </h2>
              <div className="mt-6 rounded-[28px] border border-[#efc2b4] bg-[#fff0eb] p-6">
                <p className="text-lg font-semibold text-[#8d3d21]">
                  Your responses indicate a clear sugar dependency problem.
                </p>
                <p className="mt-3 text-sm leading-7 text-[#8d5b48]">
                  This is not a medical diagnosis, but it is a serious signal that your cravings, bloating, focus, and mood are already being driven by sugar.
                </p>
              </div>

              <div className="mt-8 rounded-[28px] border border-[#ddd1c1] bg-white p-6">
                <div className="flex items-end gap-4">
                  <ScoreBar
                    label="Your score"
                    value={dependencyScore}
                    accentClass="bg-[#c97a5a]"
                    subtleClass="bg-[#f7e3da]"
                  />
                  <ScoreBar
                    label="Average"
                    value={averageDependencyScore}
                    accentClass="bg-[#5c7f57]"
                    subtleClass="bg-[#e6efe3]"
                  />
                </div>
                <p className="mt-5 text-sm font-semibold text-[#8d3d21]">{resultsDifference}% higher sugar dependency</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => goNext(symptomsStageIndex)}
                  className="glow-button rounded-full bg-[#1f241d] px-7 py-3.5 text-sm font-semibold text-[#fffaf2]"
                >
                  Review your symptoms
                </button>
                <button
                  type="button"
                  onClick={goBack}
                  className="rounded-full border border-[#d8ccb9] bg-white px-7 py-3.5 text-sm font-semibold text-[#1f241d]"
                >
                  Back
                </button>
              </div>
            </StagePanel>

            <div className="overflow-hidden rounded-[38px] border border-[#2a3128] bg-[#1f241d] p-6 text-[#fffaf2] shadow-[0_22px_54px_rgba(32,27,18,0.16)]">
              <div className="onboarding-pattern rounded-[28px] border border-white/10 bg-white/5 p-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#d8ccbc]">What this usually means</p>
                <div className="mt-5 grid gap-3 text-sm leading-7 text-[#f0e7dc]">
                  <div className="rounded-[22px] border border-white/10 bg-[#161a15] px-4 py-3">🍬 Cravings are running on autopilot.</div>
                  <div className="rounded-[22px] border border-white/10 bg-[#161a15] px-4 py-3">😵 Post-meal crashes are already visible in your energy and focus.</div>
                  <div className="rounded-[22px] border border-white/10 bg-[#161a15] px-4 py-3">🌫️ Puffiness, brain fog, and bloating are not random.</div>
                  <div className="rounded-[22px] border border-white/10 bg-[#161a15] px-4 py-3">📉 Willpower alone is probably not enough anymore.</div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {currentStage.type === "symptoms" ? (
          <StagePanel tone="light">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-3xl">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#7b7468]">Symptoms</p>
                <h2
                  className="mt-4 text-4xl leading-tight text-[#1f241d] md:text-5xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Most people do not realize sugar is quietly ruining their glow.
                </h2>
                <p className="mt-4 text-base leading-8 text-[#5f5a51]">
                  Recognize your symptoms and select anything that already feels familiar.
                </p>
              </div>
              <div className="rounded-full border border-[#d8ccb9] bg-white px-5 py-3 text-sm font-semibold text-[#5f5a51] shadow-sm">
                {selectedSymptoms.length} selected
              </div>
            </div>

            <div className="mt-8 grid gap-5">
              {symptomGroups.map((group) => (
                <div key={group.id} className="rounded-[30px] border border-[#ddd1c1] bg-white p-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#f3ebdf] text-2xl">
                      {group.emoji}
                    </span>
                    <div>
                      <p className="text-lg font-semibold text-[#1f241d]">{group.title}</p>
                      <p className="text-sm text-[#6c665c]">Tap every symptom that feels real for you.</p>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {group.items.map((item) => {
                      const selected = selectedSymptoms.includes(item.id)
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() =>
                            setSelectedSymptoms((current) =>
                              selected ? current.filter((entry) => entry !== item.id) : [...current, item.id],
                            )
                          }
                          className={`card-hover rounded-[24px] border px-5 py-5 text-left transition ${
                            selected
                              ? "border-[#5c7f57] bg-[#edf3ea]"
                              : "border-[#ddd1c1] bg-[#fffaf2] hover:border-[#5c7f57]"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-base font-semibold text-[#1f241d]">
                                {item.emoji} {item.label}
                              </p>
                              <p className="mt-2 text-sm leading-7 text-[#5f5a51]">{item.description}</p>
                            </div>
                            <span
                              className={`mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                                selected ? "bg-[#5c7f57] text-[#fffaf2]" : "bg-white text-[#81796f]"
                              }`}
                            >
                              ✓
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => void handleSymptomsContinue()}
                className="glow-button rounded-full bg-[#1f241d] px-7 py-3.5 text-sm font-semibold text-[#fffaf2]"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={goBack}
                className="rounded-full border border-[#d8ccb9] bg-white px-7 py-3.5 text-sm font-semibold text-[#1f241d]"
              >
                Back
              </button>
            </div>
          </StagePanel>
        ) : null}

        {currentStage.type === "alert" ? (
          <NarrativeStage
            tone="danger"
            emoji={currentStage.slide.emoji}
            eyebrow={`Alert ${currentStage.position + 1} of ${alertSlides.length}`}
            title={currentStage.slide.title}
            paragraphs={currentStage.slide.paragraphs}
            onBack={goBack}
            onNext={() => goNext()}
            nextLabel={currentStage.position === alertSlides.length - 1 ? "Show me the solution" : "Continue"}
          />
        ) : null}

        {currentStage.type === "solution" ? (
          <NarrativeStage
            tone="solution"
            emoji={currentStage.slide.emoji}
            eyebrow={`Solution ${currentStage.position + 1} of ${solutionSlides.length}`}
            title={currentStage.slide.title}
            paragraphs={currentStage.slide.paragraphs}
            onBack={goBack}
            onNext={() => goNext()}
            nextLabel={currentStage.position === solutionSlides.length - 1 ? "Continue with experts" : "Continue"}
          />
        ) : null}

        {currentStage.type === "experts-intro" ? (
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="overflow-hidden rounded-[38px] border border-[#2a3128] bg-[#1f241d] p-8 text-[#fffaf2] shadow-[0_22px_54px_rgba(32,27,18,0.16)]">
              <div className="onboarding-pattern rounded-[30px] border border-white/10 bg-[#151914] p-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#d8ccbc]">Created with experts</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Badge text="🧬 Endocrinology" dark />
                  <Badge text="🥗 Functional nutrition" dark />
                  <Badge text="🧠 Wellbeing coaching" dark />
                </div>
                <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-6">
                  <p className="text-sm leading-7 text-[#f0e7dc]">
                    A science-based method to stop sugar, reduce inflammation and naturally de-bloat your face in the first week.
                  </p>
                </div>
              </div>
            </div>

            <StagePanel tone="light">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#7b7468]">Expert intro</p>
              <h2
                className="mt-4 text-4xl leading-tight text-[#1f241d] md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Created with experts. Designed for real transformation.
              </h2>
              <p className="mt-5 text-base leading-8 text-[#5f5a51]">
                The next screens mirror the credibility block from the app: medical framing, user stories, and the recovery curve people can expect when they finally remove industrial sugar.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => goNext()}
                  className="glow-button rounded-full bg-[#1f241d] px-7 py-3.5 text-sm font-semibold text-[#fffaf2]"
                >
                  Meet the experts
                </button>
                <button
                  type="button"
                  onClick={goBack}
                  className="rounded-full border border-[#d8ccb9] bg-white px-7 py-3.5 text-sm font-semibold text-[#1f241d]"
                >
                  Back
                </button>
              </div>
            </StagePanel>
          </div>
        ) : null}

        {currentStage.type === "social-experts" ? (
          <StagePanel tone="ink">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#d8ccbc]">Experts who contributed to Sukali</p>
                <h2
                  className="mt-4 text-4xl leading-tight text-white md:text-5xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Developed with medical and nutrition expertise.
                </h2>
              </div>
              <Badge text="3 expert voices" dark />
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {expertCards.map((expert) => (
                <div key={expert.name} className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={expert.imageSrc}
                      alt={expert.name}
                      className="h-14 w-14 rounded-full border border-white/10 object-cover"
                    />
                    <div>
                      <p className="text-lg font-semibold text-white">{expert.name}</p>
                      <p className="mt-1 text-sm text-[#d8ccbc]">{expert.title}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-base font-semibold leading-7 text-[#f5ede1]">"{expert.quote}"</p>
                  <p className="mt-4 text-sm leading-7 text-[#d8ccbc]">{expert.body}</p>
                </div>
              ))}
            </div>
            <StageNav onBack={goBack} onNext={() => goNext()} nextLabel="Show user stories" dark />
          </StagePanel>
        ) : null}

        {currentStage.type === "social-testimonials" ? (
          <StagePanel tone="ink">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#d8ccbc]">Real story of our users</p>
                <h2
                  className="mt-4 text-4xl leading-tight text-white md:text-5xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Thousands of people have already transformed their lives.
                </h2>
              </div>
              <div className="grid gap-2 text-right text-sm text-[#d8ccbc]">
                <span>10K+ active users</span>
                <span>4.9 average rating</span>
                <span>-7kg average lost</span>
              </div>
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {userStories.map((story) => (
                <div key={story.name} className="rounded-[28px] border border-white/10 bg-[#2a2218] p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={story.imageSrc}
                        alt={story.name}
                        className="h-16 w-16 rounded-full border border-white/10 object-cover"
                      />
                      <div>
                        <p className="text-lg font-semibold text-white">{story.name}</p>
                        <p className="mt-1 text-sm text-[#d8ccbc]">{story.age}</p>
                      </div>
                    </div>
                    <Badge text={story.weight} dark accent />
                  </div>
                  <div className="mt-5 flex gap-1 text-lg text-[#f0bb5b]">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[#f5ede1]">"{story.quote}"</p>
                </div>
              ))}
            </div>
            <StageNav onBack={goBack} onNext={() => goNext()} nextLabel="See the recovery curve" dark />
          </StagePanel>
        ) : null}

        {currentStage.type === "social-recovery" ? (
          <StagePanel tone="ink">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#d8ccbc]">30-day recovery</p>
                <h2
                  className="mt-4 text-4xl leading-tight text-white md:text-5xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Your 30-day face and body reset.
                </h2>
              </div>
              <Badge text="Based on 25,000+ journeys" dark />
            </div>
            <div className="mt-8 rounded-[30px] border border-white/10 bg-white/5 p-5 md:p-8">
              <RecoveryGraph />
            </div>
            <p className="mt-6 max-w-4xl text-base leading-8 text-[#d8ccbc]">
              People who stop industrial sugar for 30 days see visible facial slimming, reduced bloating and sharper features. Sukali guides you through it step by step.
            </p>
            <StageNav onBack={goBack} onNext={() => goNext()} nextLabel="Continue" dark />
          </StagePanel>
        ) : null}

        {currentStage.type === "rating" ? (
          <StagePanel tone="light">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#7b7468]">Rate us</p>
              <h2
                className="mt-4 text-4xl leading-tight text-[#1f241d] md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                This app was designed for people like you.
              </h2>
              <p className="mt-4 text-base leading-8 text-[#5f5a51]">
                The app shows a native rating prompt here. On the site, we keep the same social proof before moving to your plan.
              </p>
              <div className="mt-8 flex justify-center gap-2 text-4xl text-[#f0bb5b]">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#7b7468]">25,000+ people already improving their habits</p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {ratingTestimonials.map((testimonial) => (
                <div key={testimonial.handle} className="rounded-[28px] border border-[#ddd1c1] bg-white p-6 shadow-[0_16px_34px_rgba(52,41,22,0.04)]">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.imageSrc}
                        alt={testimonial.name}
                        className="h-14 w-14 rounded-full border border-[#e6dbcf] object-cover"
                      />
                      <div>
                        <p className="text-lg font-semibold text-[#1f241d]">{testimonial.name}</p>
                        <p className="mt-1 text-sm text-[#6c665c]">{testimonial.handle}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 text-lg text-[#f0bb5b]">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[#5f5a51]">{testimonial.text}</p>
                </div>
              ))}
            </div>

            <StageNav onBack={goBack} onNext={() => goNext()} nextLabel="Continue to my plan" />
          </StagePanel>
        ) : null}

        {currentStage.type === "account" ? (
          isLoggedInUser ? (
            <StagePanel tone="light">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#7b7468]">Account linked</p>
              <h2
                className="mt-4 text-4xl leading-tight text-[#1f241d] md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Your account is already ready for checkout.
              </h2>
              <p className="mt-5 text-base leading-8 text-[#5f5a51]">
                This session is attached to <strong>{user?.email}</strong>. The same login can unlock the app after payment, while anonymous users inside the app keep working normally.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => goNext(weekPreviewStageIndex)}
                  className="glow-button rounded-full bg-[#1f241d] px-7 py-3.5 text-sm font-semibold text-[#fffaf2]"
                >
                  Continue
                </button>
                <button
                  type="button"
                  onClick={goBack}
                  className="rounded-full border border-[#d8ccb9] bg-white px-7 py-3.5 text-sm font-semibold text-[#1f241d]"
                >
                  Back
                </button>
              </div>
            </StagePanel>
          ) : (
            <AccountAccessCard
              source={source}
              sourcePath={sourcePath}
              initialName={profile.name}
              title="Access your plan to quit sugar now."
              subtitle="Use Google or your verified email to unlock your plan, secure the checkout, and keep everything attached to one real identity."
              beforeGoogleAuthStart={setResumeCheckoutUrlFlag}
              googleSignInEnabled
              onSuccess={handleAccountSuccess}
            />
          )
        ) : null}

        {currentStage.type === "week-preview" ? (
          <StagePanel tone="light">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
              <h2
                className="max-w-3xl text-center text-4xl leading-tight text-[#1f241d] md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                A sugar-free week can change more than cravings.
              </h2>

              <div className="mt-8 w-full overflow-hidden rounded-[38px] border border-[#2a3128] bg-[#1f241d] p-4 text-[#fffaf2] shadow-[0_22px_54px_rgba(32,27,18,0.16)] md:p-5">
                <div
                  ref={weekPreviewScrollRef}
                  onScroll={(event) => {
                    const target = event.currentTarget
                    if (!target.clientWidth) return
                    const nextIndex = Math.round(target.scrollLeft / target.clientWidth)
                    if (nextIndex !== weekPreviewIndex) {
                      setWeekPreviewIndex(nextIndex)
                    }
                  }}
                  className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
                >
                  {weekProgressSlides.map((slide) => (
                    <div key={slide.day} className="min-w-full snap-center">
                      <div className="flex h-[58vh] min-h-[440px] items-center justify-center rounded-[28px] bg-[#101311] p-4 md:min-h-[520px]">
                        <img
                          src={slide.imageSrc}
                          alt={`${slide.day} without sugar`}
                          className="max-h-full max-w-full rounded-[22px] object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollWeekPreviewTo(weekPreviewIndex - 1)}
                  disabled={weekPreviewIndex === 0}
                  className="rounded-full border border-[#d8ccb9] bg-white px-6 py-3 text-sm font-semibold text-[#1f241d] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() =>
                    weekPreviewIndex === weekProgressSlides.length - 1
                      ? goNext(checkoutStageIndex)
                      : scrollWeekPreviewTo(weekPreviewIndex + 1)
                  }
                  className="glow-button rounded-full bg-[#1f241d] px-6 py-3 text-sm font-semibold text-[#fffaf2]"
                >
                  Next day
                </button>
              </div>
            </div>
          </StagePanel>
        ) : null}

        {currentStage.type === "checkout" ? (
          <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
            <StagePanel tone="light">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#7b7468]">
                {profile.name ? `Hi ${profile.name} 👋` : "Your plan is ready"}
              </p>
              <h2
                className="mt-4 text-4xl leading-tight text-[#1f241d] md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Unlock your plan to be definitively sugar-free and live better.
              </h2>
              <p className="mt-5 text-base leading-8 text-[#5f5a51]">
                The onboarding is done. Your premium access can now be tied to {user?.email ?? "your login"} and used to continue your sugar-free plan with a cleaner, more stable daily routine.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {checkoutPlanOptions.map((plan) => {
                  const selected = selectedPlan === plan.key
                  return (
                    <button
                      key={plan.key}
                      type="button"
                      onClick={() => {
                        setSelectedPlan(plan.key)
                        setManualCheckoutUrl(null)
                      }}
                      className={`card-hover rounded-[28px] border px-5 py-5 text-left transition ${
                        selected
                          ? "border-[#5c7f57] bg-[#edf3ea]"
                          : "border-[#ddd1c1] bg-white hover:border-[#5c7f57]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-lg font-semibold text-[#1f241d]">{plan.title}</p>
                          <p className="mt-2 text-2xl font-semibold text-[#1f241d]">{plan.price}</p>
                          <p className="mt-2 text-sm leading-7 text-[#5f5a51]">{plan.description}</p>
                        </div>
                        {plan.badge ? (
                          <span className="rounded-full bg-[#5c7f57] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#fffaf2]">
                            {plan.badge}
                          </span>
                        ) : null}
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="mt-8 rounded-[28px] border border-[#ddd1c1] bg-white p-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#7b7468]">What unlocks after payment</p>
                <div className="mt-4 grid gap-3">
                  {premiumBenefits.map((benefit) => (
                    <div key={benefit} className="rounded-[20px] border border-[#ece2d4] bg-[#fffaf2] px-4 py-3 text-sm font-medium text-[#3e4138]">
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => void handleCheckout()}
                  disabled={isCreatingCheckout}
                  className="glow-button rounded-full bg-[#1f241d] px-7 py-3.5 text-sm font-semibold text-[#fffaf2] disabled:cursor-not-allowed disabled:opacity-55"
                >
                  {isCreatingCheckout ? "Opening checkout..." : "Open secure checkout"}
                </button>
                <button
                  type="button"
                  onClick={goBack}
                  className="rounded-full border border-[#d8ccb9] bg-white px-7 py-3.5 text-sm font-semibold text-[#1f241d]"
                >
                  Back
                </button>
                {manualCheckoutUrl ? (
                  <a
                    href={manualCheckoutUrl}
                    target="_self"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-[#5c7f57] bg-[#edf3ea] px-7 py-3.5 text-sm font-semibold text-[#1f241d]"
                  >
                    Open checkout manually
                  </a>
                ) : null}
              </div>
            </StagePanel>

            <div className="overflow-hidden rounded-[38px] border border-[#2a3128] bg-[#1f241d] p-6 text-[#fffaf2] shadow-[0_22px_54px_rgba(32,27,18,0.16)]">
              <div className="onboarding-pattern rounded-[28px] border border-white/10 bg-[#151914] p-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#d8ccbc]">Checkout summary</p>
                <div className="mt-5 grid gap-4">
                  <SummaryRow label="Dependency score" value={`${dependencyScore}%`} />
                  <SummaryRow label="Symptoms selected" value={selectedSymptoms.length ? String(selectedSymptoms.length) : "0"} />
                  <SummaryRow label="Plan" value={selectedPlan === "yearly" ? "Yearly" : "Monthly"} />
                  <SummaryRow label="Price" value={selectedPlanDetails.price} />
                  <SummaryRow label="Account" value={user?.email ?? "Google or email required"} />
                </div>

                <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm leading-7 text-[#f0e7dc]">
                    After payment, you can open the app and sign in with the same Google account or email. Existing anonymous app users keep their current path. This only adds web-paid access on top.
                  </p>
                </div>

                <Link
                  href="/download"
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-[#fffaf2]"
                >
                  Get the app after checkout
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        {statusMessage ? <p className="mt-6 text-sm text-[#5f5a51]">{statusMessage}</p> : null}
        {error ? <p className="mt-3 text-sm text-[#b85c38]">{error}</p> : null}
      </div>
    </section>
  )
}

function StagePanel({
  children,
  tone,
}: {
  children: ReactNode
  tone: "light" | "ink"
}) {
  if (tone === "ink") {
    return (
      <div className="overflow-hidden rounded-[40px] border border-[#2a3128] bg-[#1f241d] p-8 text-[#fffaf2] shadow-[0_22px_54px_rgba(32,27,18,0.16)] md:p-10">
        {children}
      </div>
    )
  }

  return (
    <div className="rounded-[40px] border border-[#ddd1c1] bg-[#fffaf2] p-8 shadow-[0_18px_40px_rgba(52,41,22,0.06)] md:p-10">
      {children}
    </div>
  )
}

function QuestionShell({
  emoji,
  eyebrow,
  title,
  subtitle,
  onBack,
  children,
}: {
  emoji: string
  eyebrow: string
  title: string
  subtitle: string
  onBack: () => void
  children: ReactNode
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="overflow-hidden rounded-[38px] border border-[#2a3128] bg-[#1f241d] p-6 text-[#fffaf2] shadow-[0_22px_54px_rgba(32,27,18,0.16)]">
        <div className="onboarding-pattern flex h-full min-h-[320px] flex-col rounded-[30px] border border-white/10 bg-[#151914] p-6">
          <span className="inline-flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5 text-4xl onboarding-float">
            {emoji}
          </span>
          <p className="mt-6 text-[11px] uppercase tracking-[0.24em] text-[#d8ccbc]">{eyebrow}</p>
          <p className="mt-4 text-2xl leading-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
            Move fast. Answer instinctively.
          </p>
          <p className="mt-4 text-sm leading-7 text-[#d8ccbc]">
            This is the same emotional sequence as the app: one question at a time, fast selections, then an immediate diagnostic.
          </p>
        </div>
      </div>

      <div className="rounded-[38px] border border-[#ddd1c1] bg-[#fffaf2] p-8 shadow-[0_18px_40px_rgba(52,41,22,0.06)] md:p-10">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-[#d8ccb9] bg-white px-4 py-2 text-sm font-semibold text-[#1f241d]"
        >
          <span>←</span>
          <span>Back</span>
        </button>
        <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-[#7b7468]">{eyebrow}</p>
        <h2
          className="mt-4 text-4xl leading-tight text-[#1f241d] md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h2>
        <p className="mt-4 text-base leading-8 text-[#5f5a51]">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  )
}

function NarrativeStage({
  tone,
  emoji,
  eyebrow,
  title,
  paragraphs,
  onBack,
  onNext,
  nextLabel,
}: {
  tone: "danger" | "solution"
  emoji: string
  eyebrow: string
  title: string
  paragraphs: string[]
  onBack: () => void
  onNext: () => void
  nextLabel: string
}) {
  const containerClass =
    tone === "danger"
      ? "border-[#ca6a58] bg-[linear-gradient(135deg,#e56a53_0%,#c94a3f_100%)] text-white"
      : "border-[#4e714a] bg-[linear-gradient(135deg,#5c7f57_0%,#3f5f3b_100%)] text-white"

  const cardClass =
    tone === "danger"
      ? "border-white/18 bg-white/10 text-white"
      : "border-white/18 bg-white/10 text-white"

  const secondaryTextClass = tone === "danger" ? "text-white/90" : "text-[#f0f5ed]"
  const buttonPrimaryClass = tone === "danger" ? "bg-white text-[#af4032]" : "bg-white text-[#355131]"
  const buttonSecondaryClass = tone === "danger" ? "border-white/30 text-white" : "border-white/30 text-white"
  const orbClass =
    tone === "danger"
      ? "border-white/20 bg-black/10 text-white"
      : "border-white/20 bg-black/10 text-white"

  return (
    <div className={`overflow-hidden rounded-[40px] border p-8 shadow-[0_22px_54px_rgba(32,27,18,0.12)] md:p-10 ${containerClass}`}>
      <div className="grid gap-6 lg:grid-cols-[0.84fr_1.16fr]">
        <div className={`rounded-[30px] border p-6 ${cardClass}`}>
          <p className="text-[11px] uppercase tracking-[0.22em] opacity-80">{eyebrow}</p>
          <div className={`mt-6 inline-flex h-24 w-24 items-center justify-center rounded-full border text-5xl onboarding-float ${orbClass}`}>
            {emoji}
          </div>
          <p className={`mt-6 text-sm leading-7 ${secondaryTextClass}`}>
            One emotional punchline at a time, just like the mobile flow.
          </p>
        </div>

        <div>
          <h2
            className="text-4xl leading-tight md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h2>
          <div className="mt-6 space-y-5">
            {splitParagraphs(paragraphs).map((paragraph, index) => (
              <div key={`${title}-${index}`} className={index === 0 ? "" : "pt-1"}>
                {paragraph.map((line) => (
                  <p key={line} className={`text-lg leading-8 ${secondaryTextClass}`}>
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onNext}
              className={`glow-button rounded-full px-7 py-3.5 text-sm font-semibold ${buttonPrimaryClass}`}
            >
              {nextLabel}
            </button>
            <button
              type="button"
              onClick={onBack}
              className={`rounded-full border px-7 py-3.5 text-sm font-semibold ${buttonSecondaryClass}`}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function StageNav({
  onBack,
  onNext,
  nextLabel,
  dark = false,
}: {
  onBack: () => void
  onNext: () => void
  nextLabel: string
  dark?: boolean
}) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={onNext}
        className={`glow-button rounded-full px-7 py-3.5 text-sm font-semibold ${
          dark ? "bg-[#fffaf2] text-[#1f241d]" : "bg-[#1f241d] text-[#fffaf2]"
        }`}
      >
        {nextLabel}
      </button>
      <button
        type="button"
        onClick={onBack}
        className={`rounded-full border px-7 py-3.5 text-sm font-semibold ${
          dark ? "border-white/18 text-white" : "border-[#d8ccb9] text-[#1f241d]"
        }`}
      >
        Back
      </button>
    </div>
  )
}

function FeatureCard({ emoji, title, body }: { emoji: string; title: string; body: string }) {
  return (
    <div className="rounded-[26px] border border-[#ddd1c1] bg-white p-5 shadow-[0_16px_32px_rgba(52,41,22,0.04)]">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#f3ebdf] text-2xl">
        {emoji}
      </span>
      <p className="mt-4 text-lg font-semibold text-[#1f241d]">{title}</p>
      <p className="mt-2 text-sm leading-7 text-[#5f5a51]">{body}</p>
    </div>
  )
}

function Badge({
  text,
  dark = false,
  accent = false,
}: {
  text: string
  dark?: boolean
  accent?: boolean
}) {
  const className = dark
    ? accent
      ? "border-transparent bg-[#5c7f57] text-[#fffaf2]"
      : "border-white/10 bg-white/5 text-[#f4ecdf]"
    : "border-[#d8ccb9] bg-white text-[#5f5a51]"

  return <span className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${className}`}>{text}</span>
}

function ScoreBar({
  label,
  value,
  accentClass,
  subtleClass,
}: {
  label: string
  value: number
  accentClass: string
  subtleClass: string
}) {
  return (
    <div className="flex flex-1 flex-col items-center">
      <div className={`flex h-72 w-full max-w-[148px] items-end overflow-hidden rounded-[28px] ${subtleClass}`}>
        <div
          className={`w-full rounded-[28px] transition-all duration-1000 ease-out ${accentClass}`}
          style={{ height: `${Math.max(24, value)}%` }}
        />
      </div>
      <p className="mt-4 text-3xl font-semibold text-[#1f241d]">{value}%</p>
      <p className="mt-1 text-sm text-[#6c665c]">{label}</p>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[18px] border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-sm text-[#d8ccbc]">{label}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  )
}

function RecoveryGraph() {
  const width = 820
  const height = 280
  const padding = 32
  const months = ["Day 1", "Day 7", "Day 14", "Day 21", "Day 30"]
  const recovery = [14, 32, 55, 78, 93]
  const conventional = [16, 28, 24, 35, 30]

  const xForIndex = (index: number) => padding + (index * (width - padding * 2)) / (months.length - 1)
  const yForValue = (value: number) => height - padding - ((height - padding * 2) * value) / 100

  const toPath = (values: number[]) =>
    values
      .map((value, index) => `${index === 0 ? "M" : "L"} ${xForIndex(index)} ${yForValue(value)}`)
      .join(" ")

  const relapses = [
    { x: xForIndex(1.2), y: yForValue(40) },
    { x: xForIndex(2.45), y: yForValue(47) },
    { x: xForIndex(3.5), y: yForValue(53) },
  ]

  return (
    <div className="w-full overflow-hidden">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-3 text-[#d8ccbc]">
          <span className="h-0.5 w-6 rounded-full bg-[#5c7f57]" />
          <span>Sobriety</span>
        </div>
        <div className="flex items-center gap-3 text-[#d8ccbc]">
          <span className="h-0.5 w-6 rounded-full bg-[#e36a57]" />
          <span>Conventional methods</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        <defs>
          <linearGradient id="recoveryLine" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#5c7f57" />
            <stop offset="100%" stopColor="#9cc38f" />
          </linearGradient>
          <linearGradient id="conventionalLine" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#e36a57" />
            <stop offset="100%" stopColor="#ffb6a8" />
          </linearGradient>
        </defs>

        {[0, 25, 50, 75, 100].map((tick) => (
          <g key={tick}>
            <line
              x1={padding}
              x2={width - padding}
              y1={yForValue(tick)}
              y2={yForValue(tick)}
              stroke="rgba(255,255,255,0.08)"
              strokeDasharray="4 8"
            />
            <text x={4} y={yForValue(tick) + 4} fill="rgba(216,204,188,0.8)" fontSize="12">
              {tick}
            </text>
          </g>
        ))}

        {months.map((month, index) => (
          <text
            key={month}
            x={xForIndex(index)}
            y={height - 8}
            fill="rgba(216,204,188,0.88)"
            fontSize="12"
            textAnchor="middle"
          >
            {month}
          </text>
        ))}

        <path d={toPath(conventional)} fill="none" stroke="url(#conventionalLine)" strokeWidth="4" />
        <path d={toPath(recovery)} fill="none" stroke="url(#recoveryLine)" strokeWidth="5" />

        {recovery.map((value, index) => (
          <circle key={`recovery-${index}`} cx={xForIndex(index)} cy={yForValue(value)} r="6" fill="#9cc38f" />
        ))}
        {conventional.map((value, index) => (
          <circle key={`conventional-${index}`} cx={xForIndex(index)} cy={yForValue(value)} r="5" fill="#ffb6a8" />
        ))}

        {relapses.map((point, index) => (
          <text key={`relapse-${index}`} x={point.x} y={point.y} fill="#e36a57" fontSize="18" textAnchor="middle">
            ×
          </text>
        ))}
      </svg>
    </div>
  )
}
