"use client"

import { useEffect, useMemo, useState, type ComponentType, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  CalendarDays,
  CreditCard,
  House,
  ScanSearch,
  Settings,
  Sparkles,
  UserRound,
  UtensilsCrossed,
} from "lucide-react"

import AccessEmailSync from "@/components/access-email-sync"
import { getCurrentUserIdToken, waitForAuthUser } from "@/lib/auth-client"
import { getClientAuth } from "@/lib/firebase"
import {
  missionBottomNote,
  missionFirstWeekValidatedMessage,
  missionLevels,
  missionValidateLabel,
  type MissionDay,
  type MissionType,
} from "@/lib/member-plan-missions"
import {
  getAllRecipes,
  getCategory,
  getImagePath,
  getSugarVerdict,
  getTotalSugar,
  type Recipe,
} from "@/data"

const IOS_APP_URL = "https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=app.sukali"

type MemberTab = "recipes" | "calendar" | "home" | "scanner" | "profile"
type RecipeCategory = "all" | "recommended" | "breakfast" | "snack" | "dinner"
type ChallengeStatus = "success" | "fail" | "pending"

type ChallengeState = {
  currentStreak: number
  recordStreak: number
  totalSuccessDays: number
  dailyStatuses: Record<string, ChallengeStatus>
  successRate: number
  todayKey: string
  todayNote: string
  dayNotes: Record<string, string>
  firstWeekValidated: boolean
  missionTasksCompleted: Record<string, boolean>
  firstActivityStartedAt: string | null
}

type MemberSession = {
  uid: string
  email: string
  displayName: string
  hasPremium: boolean
  checkoutStatus: string
  planKey: string
  planLabel: string
  selectedSymptoms: string[]
  dependencyScore: number | null
  language: string
  preferences: Record<string, unknown>
  identity: {
    name: string
    age: string
  }
  billing: {
    accessSource: string
    lemonsqueezyStatus: string
    accessEmailSentTo: string
  }
  challenge: ChallengeState
}

type ChallengeUpdateResult = {
  challenge: ChallengeState
  milestone?: "first_week" | "fire_streak" | "full_month" | null
  remainingDays?: number
}

type NoticeTone = "success" | "warning" | "muted"

type NoticeState = {
  tone: NoticeTone
  text: string
}

const tabs: Array<{ key: MemberTab; label: string; icon: ComponentType<{ className?: string }> }> = [
  { key: "recipes", label: "Recipes", icon: UtensilsCrossed },
  { key: "calendar", label: "Calendar", icon: CalendarDays },
  { key: "home", label: "Home", icon: House },
  { key: "scanner", label: "Scanner", icon: ScanSearch },
  { key: "profile", label: "Profile", icon: UserRound },
]

const symptomGoalFallbacks: Record<string, string> = {
  morning_puffiness: "skin",
  sugar_crashes: "energy",
  brain_fog: "focus",
  bloating_after_meals: "digestion",
  bad_sleep_after_sugar: "sleep",
  mood_swings: "anxiety",
  emotional_eating: "cravings",
  guilt_after_eating: "cravings",
  hidden_sugar: "food_education",
  just_one_bite: "cravings",
  constant_snacking: "cravings",
  endless_loop: "freedom",
}

const monthLabelFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
})

const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

function formatDateKey(date: Date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, "0")
  const day = `${date.getDate()}`.padStart(2, "0")
  return `${year}-${month}-${day}`
}

function parseDateKey(dateKey: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateKey)
  if (!match) return null
  const [, year, month, day] = match
  return new Date(Number(year), Number(month) - 1, Number(day))
}

function getAchievementRate(challenge: ChallengeState) {
  const percentage = Math.round((challenge.currentStreak / 30) * 100)
  return Math.max(0, Math.min(100, percentage))
}

function firstNameFromSession(session: MemberSession) {
  const source =
    session.identity.name ||
    session.displayName ||
    session.email.split("@")[0] ||
    "there"
  return source.trim().split(" ")[0] || "there"
}

function getCurrentDayStatus(session: MemberSession, dateKey: string) {
  return session.challenge.dailyStatuses[dateKey] ?? "pending"
}

function buildMonthGrid(month: Date) {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1)
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const cells: Array<Date | null> = []
  const leadingEmpty = (firstDay.getDay() + 6) % 7

  for (let index = 0; index < leadingEmpty; index += 1) {
    cells.push(null)
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(month.getFullYear(), month.getMonth(), day))
  }

  while (cells.length % 7 !== 0) {
    cells.push(null)
  }

  return cells
}

function countMonthSuccessDays(session: MemberSession, month: Date) {
  return Object.entries(session.challenge.dailyStatuses).filter(([dateKey, status]) => {
    if (status !== "success") return false
    const parsed = parseDateKey(dateKey)
    return (
      parsed &&
      parsed.getFullYear() === month.getFullYear() &&
      parsed.getMonth() === month.getMonth()
    )
  }).length
}

function getDietType(preferences: Record<string, unknown>) {
  const candidates = [
    preferences.diet_type,
    preferences.dietType,
    preferences.diet,
  ]
  const dietType = candidates.find((value) => typeof value === "string")
  return typeof dietType === "string" ? dietType.toLowerCase() : ""
}

function getAllergies(preferences: Record<string, unknown>) {
  const source =
    Array.isArray(preferences.allergies)
      ? preferences.allergies
      : Array.isArray(preferences.allergyList)
        ? preferences.allergyList
        : []

  return source
    .map((item) => String(item).toLowerCase())
    .filter(Boolean)
    .filter((value) => value !== "none")
}

function getGoalMap(
  preferences: Record<string, unknown>,
  selectedSymptoms: string[],
) {
  const directGoals = preferences.goals

  if (Array.isArray(directGoals)) {
    return Object.fromEntries(
      directGoals
        .map((goal) => String(goal).trim())
        .filter(Boolean)
        .map((goal) => [goal, true]),
    ) as Record<string, boolean>
  }

  if (directGoals && typeof directGoals === "object") {
    return Object.fromEntries(
      Object.entries(directGoals as Record<string, unknown>).map(([key, value]) => [key, value === true]),
    ) as Record<string, boolean>
  }

  const fallbackGoals = selectedSymptoms
    .map((symptom) => symptomGoalFallbacks[symptom])
    .filter(Boolean)

  return Object.fromEntries(fallbackGoals.map((goal) => [goal, true])) as Record<string, boolean>
}

function getRecommendedRecipes(recipes: Recipe[], session: MemberSession) {
  const dietType = getDietType(session.preferences)
  const allergies = getAllergies(session.preferences)
  const goalMap = getGoalMap(session.preferences, session.selectedSymptoms)

  const filtered = recipes.filter((recipe) => {
    if (dietType) {
      if (dietType === "vegan" && recipe.diet_type !== "vegan") return false
      if (
        dietType === "vegetarian" &&
        recipe.diet_type !== "vegan" &&
        recipe.diet_type !== "vegetarian"
      ) {
        return false
      }
      if (
        dietType === "carnivore" &&
        recipe.diet_type !== "carnivore" &&
        recipe.diet_type !== "omnivore"
      ) {
        return false
      }
    }

    if (allergies.length > 0) {
      const recipeAllergies = recipe.allergies.map((item) => item.toLowerCase())
      if (allergies.some((allergy) => recipeAllergies.includes(allergy))) {
        return false
      }
    }

    return true
  })

  filtered.sort((recipeA, recipeB) => {
    const scoreA = Object.entries(goalMap).reduce((total, [goal, active]) => {
      if (!active) return total
      return recipeA[`goal_${goal}` as keyof Recipe] === true ? total + 1 : total
    }, 0)
    const scoreB = Object.entries(goalMap).reduce((total, [goal, active]) => {
      if (!active) return total
      return recipeB[`goal_${goal}` as keyof Recipe] === true ? total + 1 : total
    }, 0)

    if (scoreA === scoreB) {
      return recipeB.rating - recipeA.rating
    }

    return scoreB - scoreA
  })

  return filtered
}

function getNoticeFromStatusUpdate(
  status: ChallengeStatus,
  result: ChallengeUpdateResult,
): NoticeState {
  if (status === "success") {
    if (result.milestone === "first_week") {
      return {
        tone: "success",
        text: "First week completed. Fire Streak is now unlocked.",
      }
    }

    if (result.milestone === "fire_streak") {
      return {
        tone: "success",
        text: `Fire Streak reached. Only ${result.remainingDays ?? 0} days left before the full month.`,
      }
    }

    if (result.milestone === "full_month") {
      return {
        tone: "success",
        text: "Full month completed. You made it through the 30-day sugar-free plan.",
      }
    }

    return {
      tone: "success",
      text: `Day marked sugar-free. ${result.remainingDays ?? 0} days left before the 30-day mark.`,
    }
  }

  if (status === "fail") {
    return {
      tone: "warning",
      text: "The day was marked as failed. Tomorrow is a fresh start.",
    }
  }

  return {
    tone: "muted",
    text: "The day was reset to neutral.",
  }
}

function getMissionCompletion(days: MissionDay[], completedTasks: Record<string, boolean>) {
  return days.every((day) => day.tasks.every((task) => completedTasks[task.id] === true))
}

function getMissionLockState(type: MissionType, completedTasks: Record<string, boolean>) {
  const firstWeekComplete = getMissionCompletion(
    missionLevels.first_week.days,
    completedTasks,
  )
  const fireStreakComplete = getMissionCompletion(
    missionLevels.fire_streak.days,
    completedTasks,
  )

  if (type === "fire_streak") return !firstWeekComplete
  if (type === "full_month") return !firstWeekComplete || !fireStreakComplete
  return false
}

function getMaxUnlockedDay(challenge: ChallengeState) {
  return Math.max(1, Math.min(30, challenge.currentStreak + 1))
}

function isDayUnlocked(
  day: MissionDay,
  days: MissionDay[],
  challenge: ChallengeState,
) {
  if (day.day === 1) return true

  const maxUnlockedDay = getMaxUnlockedDay(challenge)
  if (day.day > maxUnlockedDay) return false

  const previousDay = days.find((item) => item.day === day.day - 1)
  if (!previousDay) return true

  return previousDay.tasks.every((task) => challenge.missionTasksCompleted[task.id] === true)
}

function getTaskLocked(
  day: MissionDay,
  taskIndex: number,
  days: MissionDay[],
  challenge: ChallengeState,
) {
  if (!isDayUnlocked(day, days, challenge)) return true
  if (taskIndex === 0) return false
  const previousTask = day.tasks[taskIndex - 1]
  return challenge.missionTasksCompleted[previousTask.id] !== true
}

function isToday(dateKey: string) {
  return dateKey === formatDateKey(new Date())
}

function getEmptyChallengeState(): ChallengeState {
  return {
    currentStreak: 0,
    recordStreak: 0,
    totalSuccessDays: 0,
    dailyStatuses: {},
    successRate: 0,
    todayKey: formatDateKey(new Date()),
    todayNote: "",
    dayNotes: {},
    firstWeekValidated: false,
    missionTasksCompleted: {},
    firstActivityStartedAt: null,
  }
}

function RecipeCard({ recipe, onSelect, isSelected }: { recipe: Recipe; onSelect: () => void; isSelected: boolean }) {
  const verdict = getSugarVerdict(recipe)
  const totalSugar = getTotalSugar(recipe)
  const category = getCategory(recipe)

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`overflow-hidden rounded-[24px] border text-left transition ${
        isSelected
          ? "border-[#24FF6D] bg-[#11161b] shadow-[0_24px_40px_rgba(6,8,10,0.42)]"
          : "border-white/10 bg-[#0c1116]"
      }`}
    >
      <div className="relative aspect-[1.08] overflow-hidden">
        <Image
          src={getImagePath(recipe.image_id)}
          alt={recipe.recipe_name}
          fill
          sizes="(max-width: 768px) 50vw, 220px"
          className="object-cover"
        />
        <div className="absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-white">
          {totalSugar}g sugar
        </div>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-white/8 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
            {category}
          </span>
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{ backgroundColor: `${verdict.color}22`, color: verdict.color }}
          >
            {verdict.level}
          </span>
        </div>
        <h3 className="text-lg leading-tight text-white">{recipe.recipe_name}</h3>
        <div className="flex items-center gap-3 text-sm text-white/55">
          <span>{recipe.total_time} min</span>
          <span>•</span>
          <span>{recipe.servings} servings</span>
        </div>
      </div>
    </button>
  )
}

function NoticeBanner({ notice }: { notice: NoticeState }) {
  const palette =
    notice.tone === "success"
      ? "border-[#245534] bg-[#0f2215] text-[#9be59f]"
      : notice.tone === "warning"
        ? "border-[#8f4b1f] bg-[#24140d] text-[#f1b68b]"
        : "border-white/10 bg-white/5 text-white/70"

  return <div className={`rounded-[22px] border px-4 py-3 text-sm ${palette}`}>{notice.text}</div>
}

export default function WebMemberApp() {
  const searchParams = useSearchParams()
  const initialTab = (searchParams.get("tab") as MemberTab | null) ?? "home"

  const [activeTab, setActiveTab] = useState<MemberTab>(
    tabs.some((tab) => tab.key === initialTab) ? initialTab : "home",
  )
  const [session, setSession] = useState<MemberSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<NoticeState | null>(null)
  const [recipeCategory, setRecipeCategory] = useState<RecipeCategory>("recommended")
  const [recipeSearch, setRecipeSearch] = useState("")
  const [selectedRecipeSlug, setSelectedRecipeSlug] = useState<string | null>(null)
  const [focusedMonth, setFocusedMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1))
  const [calendarHeroSlide, setCalendarHeroSlide] = useState<"streak" | "note">("streak")
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null)
  const [noteDraft, setNoteDraft] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOpeningSubscriptionPortal, setIsOpeningSubscriptionPortal] = useState(false)
  const [activeMission, setActiveMission] = useState<MissionType | null>(null)
  const [expandedMissionDays, setExpandedMissionDays] = useState<Record<number, boolean>>({})

  const recipes = useMemo(() => getAllRecipes(), [])

  useEffect(() => {
    if (!tabs.some((tab) => tab.key === initialTab)) return
    setActiveTab(initialTab)
  }, [initialTab])

  async function authorizedJsonFetch<T>(input: string, init?: RequestInit): Promise<T> {
    const idToken = await getCurrentUserIdToken()
    const response = await fetch(input, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        ...(init?.headers ?? {}),
      },
    })
    const payload = await response.json()

    if (!response.ok) {
      throw new Error(payload?.error ?? "Request failed.")
    }

    return payload as T
  }

  async function loadSession() {
    setError(null)
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
        if (!isMounted) return
        await loadSession()
      } catch (nextError: any) {
        if (!isMounted) return
        setError(nextError?.message ?? "Unable to load your web plan.")
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    void boot()

    return () => {
      isMounted = false
    }
  }, [])

  const challenge = session?.challenge ?? getEmptyChallengeState()
  const shouldSyncAccessEmail = Boolean(session?.hasPremium && !session.billing.accessEmailSentTo)

  const recommendedRecipes = useMemo(() => {
    if (!session) return recipes
    return getRecommendedRecipes(recipes, session)
  }, [recipes, session])

  const filteredRecipes = useMemo(() => {
    const source = recipeCategory === "recommended" ? recommendedRecipes : recipes
    const query = recipeSearch.trim().toLowerCase()

    return source.filter((recipe) => {
      const matchesCategory =
        recipeCategory === "all" ||
        recipeCategory === "recommended" ||
        getCategory(recipe) === recipeCategory

      const matchesSearch =
        !query ||
        recipe.recipe_name.toLowerCase().includes(query) ||
        recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(query))

      return matchesCategory && matchesSearch
    })
  }, [recipeCategory, recipeSearch, recommendedRecipes, recipes])

  const selectedRecipe = useMemo(() => {
    if (selectedRecipeSlug) {
      return (
        filteredRecipes.find((recipe) => recipe.slug === selectedRecipeSlug) ??
        recommendedRecipes.find((recipe) => recipe.slug === selectedRecipeSlug) ??
        recipes.find((recipe) => recipe.slug === selectedRecipeSlug) ??
        null
      )
    }

    return filteredRecipes[0] ?? recommendedRecipes[0] ?? recipes[0] ?? null
  }, [filteredRecipes, recipes, recommendedRecipes, selectedRecipeSlug])

  useEffect(() => {
    if (!selectedRecipeSlug && selectedRecipe) {
      setSelectedRecipeSlug(selectedRecipe.slug)
    }
  }, [selectedRecipe, selectedRecipeSlug])

  useEffect(() => {
    if (!selectedDateKey || !session) return
    setNoteDraft(session.challenge.dayNotes[selectedDateKey] ?? "")
  }, [selectedDateKey, session])

  function applyChallenge(nextChallenge: ChallengeState) {
    setSession((current) => (current ? { ...current, challenge: nextChallenge } : current))
  }

  async function handleRefreshAccess() {
    try {
      setIsLoading(true)
      await loadSession()
    } catch (nextError: any) {
      setError(nextError?.message ?? "Unable to refresh your plan.")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleOpenSubscriptionPortal() {
    try {
      setError(null)
      setIsOpeningSubscriptionPortal(true)
      const payload = await authorizedJsonFetch<{ portalUrl: string }>(
        "/api/member/subscription/portal",
        { method: "POST" },
      )
      window.location.href = payload.portalUrl
    } catch (nextError: any) {
      setError(nextError?.message ?? "Unable to open the subscription manager.")
    } finally {
      setIsOpeningSubscriptionPortal(false)
    }
  }

  async function handleDayStatus(dateKey: string, status: ChallengeStatus) {
    try {
      setIsSubmitting(true)
      const payload = await authorizedJsonFetch<ChallengeUpdateResult>(
        "/api/member/challenge/status",
        {
          method: "POST",
          body: JSON.stringify({ dateKey, status }),
        },
      )
      applyChallenge(payload.challenge)
      setNotice(getNoticeFromStatusUpdate(status, payload))
      setSelectedDateKey(null)
    } catch (nextError: any) {
      setError(nextError?.message ?? "Unable to update the challenge day.")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleSaveNote() {
    if (!selectedDateKey) return

    try {
      setIsSubmitting(true)
      const payload = await authorizedJsonFetch<{ challenge: ChallengeState }>(
        "/api/member/challenge/note",
        {
          method: "POST",
          body: JSON.stringify({ dateKey: selectedDateKey, note: noteDraft }),
        },
      )
      applyChallenge(payload.challenge)
      setNotice({
        tone: "muted",
        text: isToday(selectedDateKey)
          ? "Today's note was saved."
          : `Your note for ${longDateFormatter.format(parseDateKey(selectedDateKey) ?? new Date())} was saved.`,
      })
      setSelectedDateKey(null)
    } catch (nextError: any) {
      setError(nextError?.message ?? "Unable to save the note.")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleMissionTask(taskId: string, completed: boolean) {
    try {
      const payload = await authorizedJsonFetch<{ challenge: ChallengeState }>(
        "/api/member/challenge/task",
        {
          method: "POST",
          body: JSON.stringify({ taskId, completed }),
        },
      )
      applyChallenge(payload.challenge)
    } catch (nextError: any) {
      setError(nextError?.message ?? "Unable to update the mission task.")
    }
  }

  async function handleFirstWeekValidation() {
    try {
      const payload = await authorizedJsonFetch<{ challenge: ChallengeState }>(
        "/api/member/challenge/validate",
        {
          method: "POST",
          body: JSON.stringify({ missionType: "first_week" }),
        },
      )
      applyChallenge(payload.challenge)
      setNotice({
        tone: "success",
        text: missionFirstWeekValidatedMessage,
      })
    } catch (nextError: any) {
      setError(nextError?.message ?? "Unable to validate the first week.")
    }
  }

  async function handleMarkTodaySuccess() {
    if (!session) return
    await handleDayStatus(session.challenge.todayKey, "success")
  }

  async function handleSignOut() {
    await getClientAuth().signOut()
    window.location.href = "/login?next=/plan"
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f6f0e6] px-4 py-10 text-[#1f241d]">
        <div className="mx-auto max-w-[460px] rounded-[38px] border border-[#ddd1c1] bg-[#fffaf2] p-8 text-center shadow-[0_20px_44px_rgba(52,41,22,0.08)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7b7468]">Loading plan</p>
          <h1 className="mt-4 text-4xl leading-tight" style={{ fontFamily: "var(--font-display)" }}>
            Opening your plan.
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#5f5a51]">
            We are checking your premium access and loading the shared data from your app.
          </p>
        </div>
      </main>
    )
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-[#f6f0e6] px-4 py-10 text-[#1f241d]">
        <div className="mx-auto max-w-[460px] rounded-[38px] border border-[#ddd1c1] bg-[#fffaf2] p-8 text-center shadow-[0_20px_44px_rgba(52,41,22,0.08)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7b7468]">Login required</p>
          <h1 className="mt-4 text-4xl leading-tight" style={{ fontFamily: "var(--font-display)" }}>
            Sign in to open your plan.
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#5f5a51]">
            Use the same Google account or verified email you used during checkout.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Link href="/login?next=/plan" className="rounded-full bg-[#1f241d] px-6 py-4 text-sm font-semibold text-[#fffaf2]">
              Go to secure login
            </Link>
            <a
              href={IOS_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#d3c7b8] bg-white px-6 py-4 text-sm font-semibold text-[#1f241d]"
            >
              Download the app
            </a>
          </div>
        </div>
      </main>
    )
  }

  const pendingUnlock =
    !session.hasPremium &&
    ["started", "paid"].includes(session.checkoutStatus.toLowerCase())

  if (!session.hasPremium) {
    return (
      <main className="min-h-screen bg-[#f6f0e6] px-4 py-10 text-[#1f241d]">
        <div className="mx-auto max-w-[460px] rounded-[38px] border border-[#ddd1c1] bg-[#fffaf2] p-8 text-center shadow-[0_20px_44px_rgba(52,41,22,0.08)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7b7468]">
            {pendingUnlock ? "Unlock in progress" : "Premium required"}
          </p>
          <h1 className="mt-4 text-4xl leading-tight" style={{ fontFamily: "var(--font-display)" }}>
            {pendingUnlock ? "We are finishing the unlock." : "Your web plan is still locked."}
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#5f5a51]">
            {pendingUnlock
              ? "The payment came through and we are syncing your account. Refresh once the unlock finishes."
              : "This account does not have premium access yet. Finish checkout first, then come back here with the same login."}
          </p>
          {error ? <p className="mt-4 text-sm text-[#b85c38]">{error}</p> : null}
          <div className="mt-8 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => void handleRefreshAccess()}
              className="rounded-full bg-[#1f241d] px-6 py-4 text-sm font-semibold text-[#fffaf2]"
            >
              Refresh access
            </button>
            <Link href="/start" className="rounded-full border border-[#d3c7b8] bg-white px-6 py-4 text-sm font-semibold text-[#1f241d]">
              Go back to onboarding
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const displayName = firstNameFromSession(session)
  const currentMonthSuccess = countMonthSuccessDays(session, focusedMonth)
  const selectedDate = selectedDateKey ? parseDateKey(selectedDateKey) : null
  const selectedStatus = selectedDateKey ? getCurrentDayStatus(session, selectedDateKey) : "pending"
  const monthGrid = buildMonthGrid(focusedMonth)
  const achievementRate = getAchievementRate(challenge)
  const calendarTitle = monthLabelFormatter.format(focusedMonth)

  return (
    <main className="min-h-screen bg-[#f6f0e6] px-2 py-3 text-white sm:px-4 sm:py-6">
      <AccessEmailSync enabled={shouldSyncAccessEmail} />
      <div className="mx-auto max-w-[460px] overflow-hidden rounded-[34px] border border-[#182027] bg-[#050608] shadow-[0_30px_80px_rgba(6,8,10,0.35)]">
        <div className="border-b border-white/6 bg-[radial-gradient(circle_at_top,_rgba(36,255,109,0.18),_transparent_42%),linear-gradient(180deg,#0a0f14_0%,#050608_100%)] px-5 pb-5 pt-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Sukali plan</p>
              <h1 className="mt-3 text-[34px] leading-none text-white" style={{ fontFamily: "var(--font-display)" }}>
                Hello {displayName}
              </h1>
              <p className="mt-3 text-sm leading-6 text-white/60">
                Your web plan is connected to the same Firebase data as the app.
              </p>
            </div>
            <span className="rounded-full bg-[#24FF6D] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#041109]">
              {session.planKey}
            </span>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={IOS_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80"
            >
              Download app
            </a>
            <button
              type="button"
              onClick={() => setActiveTab("home")}
              className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#050608]"
            >
              Open today
            </button>
          </div>
        </div>

        <div className="space-y-4 px-4 pb-32 pt-4">
          {notice ? <NoticeBanner notice={notice} /> : null}
          {error ? (
            <div className="rounded-[22px] border border-[#8f4b1f] bg-[#24140d] px-4 py-3 text-sm text-[#f1b68b]">
              {error}
            </div>
          ) : null}

          {activeTab === "home" ? (
            <div className="space-y-4">
              <section className="rounded-[30px] bg-[radial-gradient(circle_at_top,_rgba(36,255,109,0.16),_transparent_54%),linear-gradient(180deg,#10291A_0%,#08140D_65%,#050608_100%)] px-6 py-8 shadow-[0_28px_64px_rgba(6,8,10,0.48)]">
                <p className="text-center text-xl font-bold text-white">Your challenge</p>
                <div className="mt-8 text-center">
                  <div className="text-[120px] font-black leading-none tracking-[-0.08em] text-[#24FF6D]">
                    {challenge.currentStreak}
                  </div>
                  <p className="mt-4 text-sm text-white/75">Consecutive sugar-free days.</p>
                  <p className="mt-1 text-sm text-white/45">Keep it up!</p>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-[20px] border border-white/10 bg-[#0B1014] px-4 py-4">
                    <div className="text-xl">🏆</div>
                    <p className="mt-3 text-sm text-white/55">Record</p>
                    <p className="mt-1 text-lg font-bold text-[#24FF6D]">{challenge.recordStreak} days</p>
                  </div>
                  <div className="rounded-[20px] border border-white/10 bg-[#0B1014] px-4 py-4">
                    <div className="text-xl">✨</div>
                    <p className="mt-3 text-sm text-white/55">Total</p>
                    <p className="mt-1 text-lg font-bold text-[#FFA726]">{challenge.totalSuccessDays} days</p>
                  </div>
                </div>
              </section>

              <button
                type="button"
                onClick={() => void handleMarkTodaySuccess()}
                disabled={isSubmitting}
                className="w-full rounded-[24px] bg-[linear-gradient(90deg,#FF7E1F_0%,#FF4E11_100%)] px-5 py-5 text-center text-base font-bold text-white shadow-[0_20px_40px_rgba(255,126,31,0.35)] transition disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Updating your day..." : "I completed my day"}
              </button>

              <div className="rounded-[24px] border border-white/10 bg-[#0B0F14] px-5 py-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Today note</p>
                    <p className="mt-2 text-sm leading-6 text-white/65">
                      {challenge.todayNote || "Write how you feel today in Calendar to keep your streak grounded in reality."}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDateKey(challenge.todayKey)
                      setActiveTab("calendar")
                    }}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70"
                  >
                    Open calendar
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {activeTab === "calendar" ? (
            <div className="space-y-4">
              <section className="rounded-[30px] bg-[#050608]">
                <div>
                  <p className="text-[28px] font-bold text-white">My calendar</p>
                  <p className="mt-1 text-sm text-white/55">Track your sugar-free days</p>
                </div>
                <div className="mt-5 overflow-hidden rounded-[22px] bg-[#24FF6D]">
                  <div className="flex items-center justify-center gap-2 px-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setCalendarHeroSlide("streak")}
                      className={`h-2 rounded-full transition ${calendarHeroSlide === "streak" ? "w-8 bg-white" : "w-2 bg-white/45"}`}
                      aria-label="Show streak card"
                    />
                    <button
                      type="button"
                      onClick={() => setCalendarHeroSlide("note")}
                      className={`h-2 rounded-full transition ${calendarHeroSlide === "note" ? "w-8 bg-white" : "w-2 bg-white/45"}`}
                      aria-label="Show note card"
                    />
                  </div>
                  <div className="px-5 pb-5 pt-3">
                    {calendarHeroSlide === "streak" ? (
                      <div className="flex min-h-[112px] items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-white">Current streak</p>
                          <div className="mt-3 flex items-end gap-2">
                            <span className="text-[54px] font-black leading-none text-white">{challenge.currentStreak}</span>
                            <span className="pb-2 text-3xl">🔥</span>
                          </div>
                          <p className="mt-2 text-sm text-white">consecutive sugar-free days</p>
                        </div>
                        <div className="text-4xl">🎯</div>
                      </div>
                    ) : (
                      <div className="min-h-[112px]">
                        <p className="text-sm font-semibold text-white">{longDateFormatter.format(new Date())}</p>
                        <div className="mt-4 text-sm leading-6 text-white">
                          {challenge.todayNote || "Write how you feel today. It helps track your progress and spot patterns."}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              <section className="rounded-[24px] border border-white/10 bg-[#0B0F14] p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setFocusedMonth(new Date(focusedMonth.getFullYear(), focusedMonth.getMonth() - 1, 1))}
                    className="rounded-[14px] bg-white/5 px-3 py-2 text-sm text-white/70"
                    aria-label="Previous month"
                  >
                    ←
                  </button>
                  <p className="text-base font-semibold text-white">{calendarTitle}</p>
                  <button
                    type="button"
                    onClick={() => setFocusedMonth(new Date(focusedMonth.getFullYear(), focusedMonth.getMonth() + 1, 1))}
                    className="rounded-[14px] bg-white/5 px-3 py-2 text-sm text-white/70"
                    aria-label="Next month"
                  >
                    →
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                  {["M", "T", "W", "T", "F", "S", "S"].map((weekday) => (
                    <div key={weekday}>{weekday}</div>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-7 gap-x-2 gap-y-3">
                  {monthGrid.map((date, index) => {
                    if (!date) {
                      return <div key={`empty-${index}`} className="h-12" />
                    }

                    const dateKey = formatDateKey(date)
                    const status = getCurrentDayStatus(session, dateKey)
                    const todayKey = formatDateKey(new Date())
                    const isCurrentDay = dateKey === todayKey
                    const isFuture = dateKey > todayKey
                    const canSelect = !isFuture

                    let background = "bg-white/10"
                    let border = "border-transparent"
                    let textColor = "text-white"
                    let emoji = ""

                    if (status === "success") {
                      background = "bg-[#24FF6D]"
                      textColor = "text-[#041109]"
                      emoji = "✨"
                    } else if (status === "fail") {
                      background = "bg-[#8B4513]"
                      border = "border-[#FF6D1F]"
                      emoji = "😟"
                    } else if (status === "pending") {
                      background = "bg-white/12"
                      border = "border-white/15"
                      textColor = "text-white/75"
                      emoji = "⚪"
                    } else if (isCurrentDay) {
                      background = "bg-[#FF6D1F]"
                    } else if (isFuture) {
                      background = "bg-white/6"
                      textColor = "text-white/35"
                    }

                    return (
                      <button
                        key={dateKey}
                        type="button"
                        disabled={!canSelect}
                        onClick={() => {
                          setSelectedDateKey(dateKey)
                          setNoteDraft(session.challenge.dayNotes[dateKey] ?? "")
                        }}
                        className={`relative flex h-12 flex-col items-center justify-center rounded-full border ${background} ${border} ${textColor} transition disabled:cursor-not-allowed`}
                      >
                        <span className="text-sm font-bold">{date.getDate()}</span>
                        {emoji ? <span className="text-[9px]">{emoji}</span> : null}
                        {status === "success" ? (
                          <span className="absolute bottom-[2px] right-[2px] h-2.5 w-2.5 rounded-full bg-yellow-300" />
                        ) : null}
                      </button>
                    )
                  })}
                </div>
              </section>

              <div className="flex items-center justify-center gap-4 text-xs text-white/60">
                <Legend color="bg-[#24FF6D]" label="Success" />
                <Legend color="bg-[#8B4513]" label="Failed" />
                <Legend color="bg-white/15" label="Upcoming" />
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedDateKey(challenge.todayKey)
                  setNoteDraft(challenge.todayNote)
                }}
                className="w-full rounded-[22px] bg-[linear-gradient(135deg,#FF6D1F_0%,#FF3D00_100%)] px-5 py-5 text-base font-bold text-white shadow-[0_20px_40px_rgba(255,109,31,0.28)]"
              >
                Add a note for today
              </button>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-[20px] border border-white/10 bg-[#0B0F14] px-4 py-5 text-center">
                  <p className="text-2xl font-bold text-[#24FF6D]">{currentMonthSuccess}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/45">Days this month</p>
                </div>
                <div className="rounded-[20px] border border-white/10 bg-[#0B0F14] px-4 py-5 text-center">
                  <p className="text-2xl font-bold text-[#FF6D1F]">{Math.round(challenge.successRate)}%</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/45">Success rate</p>
                </div>
              </div>
            </div>
          ) : null}

          {activeTab === "recipes" ? (
            <div className="space-y-4">
              <section className="rounded-[28px] border border-white/10 bg-[#0B0F14] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Recipes</p>
                <h2 className="mt-3 text-[30px] leading-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
                  Sugar-free meals that stay aligned with your plan.
                </h2>
                <div className="mt-5 grid gap-3">
                  <input
                    type="text"
                    value={recipeSearch}
                    onChange={(event) => setRecipeSearch(event.target.value)}
                    placeholder="Search salmon, yogurt, avocado..."
                    className="rounded-[18px] border border-white/10 bg-[#050608] px-4 py-3 text-sm text-white outline-none transition focus:border-[#24FF6D]"
                  />
                  <div className="flex flex-wrap gap-2">
                    {(["recommended", "all", "breakfast", "snack", "dinner"] as RecipeCategory[]).map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setRecipeCategory(category)}
                        className={`rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                          recipeCategory === category
                            ? "bg-[#24FF6D] text-[#041109]"
                            : "border border-white/10 bg-white/5 text-white/65"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {selectedRecipe ? (
                <section className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0B0F14]">
                  <div className="relative aspect-[1.2] overflow-hidden">
                    <Image
                      src={getImagePath(selectedRecipe.image_id)}
                      alt={selectedRecipe.recipe_name}
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-4 p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#1D2A1F] px-3 py-1.5 text-xs font-semibold text-[#98E3A0]">
                        {getSugarVerdict(selectedRecipe).message}
                      </span>
                      <span className="rounded-full bg-white/8 px-3 py-1.5 text-xs font-semibold text-white/65">
                        {selectedRecipe.total_time} min
                      </span>
                      <span className="rounded-full bg-white/8 px-3 py-1.5 text-xs font-semibold text-white/65">
                        {selectedRecipe.diet_type}
                      </span>
                    </div>
                    <h3 className="text-3xl leading-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
                      {selectedRecipe.recipe_name}
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Ingredients</p>
                        <ul className="mt-3 space-y-2 text-sm leading-6 text-white/70">
                          {selectedRecipe.ingredients.slice(0, 6).map((ingredient) => (
                            <li key={ingredient}>• {ingredient}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Directions</p>
                        <ol className="mt-3 space-y-2 text-sm leading-6 text-white/70">
                          {selectedRecipe.directions.slice(0, 3).map((step) => (
                            <li key={step}>• {step}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </section>
              ) : null}

              <div className="grid grid-cols-2 gap-4">
                {filteredRecipes.slice(0, 8).map((recipe) => (
                  <RecipeCard
                    key={recipe.slug}
                    recipe={recipe}
                    onSelect={() => setSelectedRecipeSlug(recipe.slug)}
                    isSelected={selectedRecipe?.slug === recipe.slug}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {activeTab === "scanner" ? (
            <section className="rounded-[30px] border border-[#183326] bg-[linear-gradient(180deg,#0d1711_0%,#08110b_100%)] p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8cc595]">Mobile only</p>
              <h2 className="mt-3 text-3xl leading-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
                Food scanner stays in the app.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#c9d8cc]">
                The scanner and visual evolution tools stay exclusive to mobile. Your plan, calendar, recipes, and missions stay synced here on the web.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={IOS_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#24FF6D] px-5 py-4 text-center text-sm font-semibold text-[#041109]"
                >
                  Download on the App Store
                </a>
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-4 text-center text-sm font-semibold text-white/80"
                >
                  Download on Google Play
                </a>
              </div>
            </section>
          ) : null}

          {activeTab === "profile" ? (
            <div className="space-y-4">
              <section className="rounded-[28px] border border-white/10 bg-[#0B0F14] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#24FF6D] bg-white/5 text-lg font-bold text-white">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Profile</p>
                      <h2 className="mt-1 text-2xl text-white" style={{ fontFamily: "var(--font-display)" }}>
                        Hello {displayName}
                      </h2>
                      <p className="mt-1 text-sm text-white/55">Your SugarFree Profile</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => void handleSignOut()}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70"
                  >
                    Sign out
                  </button>
                </div>
              </section>

              <div className="grid grid-cols-3 gap-3">
                <ProfileStatCard emoji="🔥" value={`${challenge.currentStreak}`} label="Days" color="#24FF6D" />
                <ProfileStatCard emoji="🏆" value={`${challenge.recordStreak}`} label="Record" color="#FFA726" />
                <ProfileStatCard emoji="⚡" value={`${achievementRate}%`} label="Rate" color="#24FF6D" />
              </div>

              <section className="rounded-[28px] border border-white/10 bg-[#0B0F14] p-5">
                <p className="text-xl font-bold text-white">Your achievements</p>
                <div className="mt-4 space-y-3">
                  <AchievementCard
                    icon="🏆"
                    title="First week"
                    subtitle="7 consecutive days without sugar"
                    isUnlocked={true}
                    onClick={() => {
                      setActiveMission("first_week")
                      setExpandedMissionDays({ 1: true })
                    }}
                  />
                  <AchievementCard
                    icon="🔥"
                    title="Fire streak"
                    subtitle="12 days in a row"
                    isUnlocked={challenge.currentStreak >= 7}
                    onClick={
                      challenge.currentStreak >= 7
                        ? () => {
                            setActiveMission("fire_streak")
                            setExpandedMissionDays({ 8: true })
                          }
                        : undefined
                    }
                  />
                  <AchievementCard
                    icon="📅"
                    title="Full month"
                    subtitle="30 days - Soon to be unlocked"
                    isUnlocked={challenge.currentStreak >= 12}
                    onClick={
                      challenge.currentStreak >= 12
                        ? () => {
                            setActiveMission("full_month")
                            setExpandedMissionDays({ 13: true })
                          }
                        : undefined
                    }
                  />
                </div>
              </section>

              <section className="rounded-[22px] bg-[#1A4D2E] p-5">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">💡</div>
                  <div>
                    <p className="text-lg font-bold text-[#24FF6D]">Tip</p>
                    <p className="mt-2 text-sm leading-6 text-white/90">
                      Keep marking your days, your notes, and your missions. The web version mirrors the same progress data as the app so you can move between both without losing your streak.
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-[22px] border border-white/10 bg-[#0B0F14] p-5">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-white/70" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Settings</p>
                </div>
                <p className="mt-3 text-sm leading-7 text-white/70">
                  Connected as {session.email}. Your plan is {session.planLabel}. You can manage your subscription from here without leaving your profile.
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => void handleOpenSubscriptionPortal()}
                    disabled={isOpeningSubscriptionPortal}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#24FF6D]/30 bg-[#24FF6D]/10 px-5 py-4 text-center text-sm font-semibold text-[#d8ffe5] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <CreditCard className="h-4 w-4" />
                    {isOpeningSubscriptionPortal ? "Opening subscription manager..." : "Manage my subscription"}
                  </button>
                  <a
                    href={IOS_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white px-5 py-4 text-center text-sm font-semibold text-[#050608]"
                  >
                    Download the app
                  </a>
                  <button
                    type="button"
                    onClick={() => void handleRefreshAccess()}
                    className="rounded-full border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white/80"
                  >
                    Refresh my sync
                  </button>
                </div>
              </section>
            </div>
          ) : null}
        </div>

        <nav className="sticky bottom-0 border-t border-white/8 bg-[rgba(5,6,8,0.95)] px-2 pb-3 pt-2 backdrop-blur">
          <div className="grid grid-cols-5 gap-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key
              const isHome = tab.key === "home"
              const Icon = tab.icon

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex flex-col items-center justify-center gap-1 rounded-[18px] px-2 py-2 text-center transition ${
                    isActive
                      ? isHome
                        ? "bg-[#24FF6D] text-[#041109]"
                        : "bg-white/10 text-white"
                      : "text-white/40"
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">
                    {tab.label}
                  </span>
                </button>
              )
            })}
          </div>
        </nav>
      </div>

      {selectedDate && selectedDateKey ? (
        <ModalOverlay onClose={() => setSelectedDateKey(null)}>
          <div className="space-y-4 rounded-[28px] border border-white/10 bg-[#141920] p-5">
            <div>
              <p className="text-lg font-bold text-white">{longDateFormatter.format(selectedDate)}</p>
              <p className="mt-1 text-sm text-white/50">Choose the status for this day and add a note if needed.</p>
            </div>
            <div className="space-y-3">
              <StatusButton
                emoji="✨"
                label="Success"
                tone="success"
                active={selectedStatus === "success"}
                onClick={() => void handleDayStatus(selectedDateKey, "success")}
                disabled={isSubmitting}
              />
              <StatusButton
                emoji="😟"
                label="Failed"
                tone="warning"
                active={selectedStatus === "fail"}
                onClick={() => void handleDayStatus(selectedDateKey, "fail")}
                disabled={isSubmitting}
              />
              <StatusButton
                emoji="⚪"
                label="Neutral"
                tone="muted"
                active={selectedStatus === "pending"}
                onClick={() => void handleDayStatus(selectedDateKey, "pending")}
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="day-note" className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                Daily note
              </label>
              <textarea
                id="day-note"
                value={noteDraft}
                onChange={(event) => setNoteDraft(event.target.value)}
                placeholder="Write how you feel today. It helps track your progress."
                className="min-h-[110px] w-full rounded-[18px] border border-white/10 bg-[#0B0F14] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#24FF6D]"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedDateKey(null)}
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/75"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void handleSaveNote()}
                disabled={isSubmitting}
                className="flex-1 rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#050608] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Saving..." : "Save note"}
              </button>
            </div>
          </div>
        </ModalOverlay>
      ) : null}

      {activeMission ? (
        <ModalOverlay onClose={() => setActiveMission(null)} align="bottom">
          <MissionSheet
            type={activeMission}
            challenge={challenge}
            expandedDays={expandedMissionDays}
            onToggleDay={(day) =>
              setExpandedMissionDays((current) => ({
                ...current,
                [day]: !current[day],
              }))
            }
            onToggleTask={(taskId, completed) => void handleMissionTask(taskId, completed)}
            onValidateFirstWeek={() => void handleFirstWeekValidation()}
          />
        </ModalOverlay>
      ) : null}
    </main>
  )
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3.5 w-3.5 rounded-full ${color}`} />
      <span>{label}</span>
    </div>
  )
}

function ProfileStatCard({
  emoji,
  value,
  label,
  color,
}: {
  emoji: string
  value: string
  label: string
  color: string
}) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-[#0B0F14] px-3 py-4 text-center">
      <div className="text-xl">{emoji}</div>
      <p className="mt-3 text-2xl font-bold" style={{ color }}>
        {value}
      </p>
      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/45">{label}</p>
    </div>
  )
}

function AchievementCard({
  icon,
  title,
  subtitle,
  isUnlocked,
  onClick,
}: {
  icon: string
  title: string
  subtitle: string
  isUnlocked: boolean
  onClick?: () => void
}) {
  const content = (
    <div
      className={`rounded-[20px] border px-4 py-4 ${
        isUnlocked ? "border-[#24FF6D]/35 bg-[#0f1710]" : "border-white/10 bg-white/[0.04]"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-11 w-11 items-center justify-center rounded-full text-xl ${
            isUnlocked ? "bg-[#24FF6D]/18" : "bg-white/5"
          }`}>
            {icon}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{title}</p>
            <p className="mt-1 text-sm text-white/55">{subtitle}</p>
          </div>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
            isUnlocked ? "bg-[#24FF6D] text-[#041109]" : "bg-white/10 text-white/45"
          }`}
        >
          {isUnlocked ? "Open" : "Locked"}
        </span>
      </div>
    </div>
  )

  if (!onClick) return content

  return (
    <button type="button" onClick={onClick} className="w-full text-left">
      {content}
    </button>
  )
}

function ModalOverlay({
  children,
  onClose,
  align = "center",
}: {
  children: ReactNode
  onClose: () => void
  align?: "center" | "bottom"
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 px-3 py-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className={`mx-auto flex min-h-full max-w-[460px] ${
          align === "bottom" ? "items-end" : "items-center"
        }`}
      >
        <div className="w-full" onClick={(event) => event.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  )
}

function StatusButton({
  emoji,
  label,
  tone,
  active,
  onClick,
  disabled,
}: {
  emoji: string
  label: string
  tone: NoticeTone
  active: boolean
  onClick: () => void
  disabled?: boolean
}) {
  const palette =
    tone === "success"
      ? active
        ? "border-[#24FF6D] bg-[#1E8E46] text-white"
        : "border-[#245534] bg-[#102217] text-white"
      : tone === "warning"
        ? active
          ? "border-[#FF6D1F] bg-[#C62828] text-white"
          : "border-[#6a2f12] bg-[#25120d] text-white"
        : active
          ? "border-white/30 bg-white/15 text-white"
          : "border-white/10 bg-white/[0.04] text-white/80"

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full items-center gap-3 rounded-[18px] border px-4 py-4 text-left transition disabled:cursor-not-allowed disabled:opacity-60 ${palette}`}
    >
      <span className="text-2xl">{emoji}</span>
      <span className="text-base font-semibold">{label}</span>
    </button>
  )
}

function MissionSheet({
  type,
  challenge,
  expandedDays,
  onToggleDay,
  onToggleTask,
  onValidateFirstWeek,
}: {
  type: MissionType
  challenge: ChallengeState
  expandedDays: Record<number, boolean>
  onToggleDay: (day: number) => void
  onToggleTask: (taskId: string, completed: boolean) => void
  onValidateFirstWeek: () => void
}) {
  const level = missionLevels[type]
  const missionLocked = getMissionLockState(type, challenge.missionTasksCompleted)
  const maxUnlockedDay = getMaxUnlockedDay(challenge)
  const availableDays = level.days.filter((day) => day.day <= maxUnlockedDay)

  if (missionLocked) {
    return (
      <div className="rounded-t-[30px] border border-white/10 bg-[linear-gradient(180deg,#1A1A2E_0%,#16213E_100%)] px-6 pb-10 pt-5 text-center">
        <div className="mx-auto h-1.5 w-12 rounded-full bg-white/25" />
        <div className="mx-auto mt-8 flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-5xl">
          🔒
        </div>
        <h3 className="mt-6 text-2xl text-white" style={{ fontFamily: "var(--font-display)" }}>
          Locked for now
        </h3>
        <p className="mt-4 text-sm leading-7 text-white/70">{level.lockMessage}</p>
      </div>
    )
  }

  return (
    <div className="max-h-[88vh] overflow-hidden rounded-t-[30px] border border-white/10 bg-[linear-gradient(180deg,#0E1319_0%,#050608_100%)]">
      <div className="px-6 pb-4 pt-4">
        <div className="mx-auto h-1.5 w-12 rounded-full bg-white/25" />
      </div>
      <div className="space-y-4 px-6 pb-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#24FF6D]">Mission</p>
          <h3 className="mt-3 text-[30px] leading-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
            {level.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/65">{level.subtitle}</p>
        </div>
      </div>
      <div className="max-h-[60vh] overflow-y-auto px-4 pb-6">
        <div className="space-y-3">
          {availableDays.map((day, index) => {
            const isExpanded = expandedDays[day.day] ?? index === 0
            const completedCount = day.tasks.filter(
              (task) => challenge.missionTasksCompleted[task.id] === true,
            ).length
            const unlocked = isDayUnlocked(day, level.days, challenge)

            return (
              <div key={day.day} className="rounded-[18px] border border-white/10 bg-white/[0.05]">
                <button
                  type="button"
                  onClick={() => onToggleDay(day.day)}
                  className="flex w-full items-center gap-4 px-4 py-4 text-left"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white">
                    {day.day}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white">{day.title}</p>
                    <p className="mt-1 text-sm text-white/55">{day.subtitle}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/35">
                      {completedCount}/{day.tasks.length} tasks
                    </p>
                  </div>
                  <div className="text-white/70">{isExpanded ? "−" : "+"}</div>
                </button>

                {isExpanded ? (
                  <div className="space-y-2 px-4 pb-4">
                    <div className="rounded-[16px] border border-[#24FF6D]/25 bg-[#0d1811] p-4">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-[#24FF6D] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#041109]">
                          Day {day.day}
                        </span>
                        <span className="text-sm text-[#24FF6D]">💡</span>
                      </div>
                      <p className="mt-3 text-base font-semibold text-white">{day.title}</p>
                      <p className="mt-2 text-sm text-white/75">{day.subtitle}</p>
                    </div>

                    {day.tasks.map((task, taskIndex) => {
                      const completed = challenge.missionTasksCompleted[task.id] === true
                      const locked = getTaskLocked(day, taskIndex, level.days, challenge) || !unlocked

                      return (
                        <button
                          key={task.id}
                          type="button"
                          disabled={locked}
                          onClick={() => onToggleTask(task.id, !completed)}
                          className={`w-full rounded-[16px] border px-4 py-4 text-left transition ${
                            completed
                              ? "border-[#24FF6D]/35 bg-[#24FF6D]/12"
                              : "border-white/8 bg-white/[0.04]"
                          } disabled:cursor-not-allowed disabled:opacity-70`}
                        >
                          <div className="flex items-start gap-3">
                            {locked ? (
                              <div className="mt-0.5 text-white/35">🔒</div>
                            ) : (
                              <div
                                className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border ${
                                  completed ? "border-[#24FF6D] bg-[#24FF6D]" : "border-white/25"
                                }`}
                              >
                                {completed ? <span className="text-[12px] text-[#041109]">✓</span> : null}
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start gap-3">
                                <span className="text-xl">{task.emoji}</span>
                                <p className={`text-sm font-medium ${locked ? "text-white/35" : "text-white"}`}>
                                  {task.label}
                                </p>
                              </div>
                              {!locked ? (
                                <p className="mt-2 pl-8 text-xs italic leading-5 text-white/55">{task.why}</p>
                              ) : null}
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>

        <div className="mt-5 rounded-[16px] border border-white/10 bg-white/[0.04] p-4 text-center text-sm leading-6 text-white/60">
          {missionBottomNote}
        </div>

        {type === "first_week" && challenge.currentStreak >= 7 && !challenge.firstWeekValidated ? (
          <button
            type="button"
            onClick={onValidateFirstWeek}
            className="mt-5 w-full rounded-full bg-[#24FF6D] px-5 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#041109]"
          >
            {missionValidateLabel}
          </button>
        ) : null}
      </div>
    </div>
  )
}
