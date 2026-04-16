import { FieldValue, Timestamp } from "firebase-admin/firestore"

import { adminDb } from "@/lib/firebase-admin"

export type ChallengeStatus = "success" | "fail" | "pending"

export type MissionTasksMap = Record<string, boolean>
export type DayNotesMap = Record<string, string>

export type ChallengeSnapshot = {
  currentStreak: number
  recordStreak: number
  totalSuccessDays: number
  dailyStatuses: Record<string, ChallengeStatus>
  successRate: number
  todayKey: string
  todayNote: string
  dayNotes: DayNotesMap
  firstWeekValidated: boolean
  missionTasksCompleted: MissionTasksMap
  firstActivityStartedAt: string | null
}

export type ChallengeUpdateResult = {
  challenge: ChallengeSnapshot
  milestone: "first_week" | "fire_streak" | "full_month" | null
  remainingDays: number
}

const CHALLENGE_COLLECTION = "challenge"
const CHALLENGE_DOCUMENT = "progress"

function asObject(value: unknown) {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {}
}

export function formatDateKey(date: Date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, "0")
  const day = `${date.getDate()}`.padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function parseDateKey(dateKey: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateKey)
  if (!match) return null

  const [, year, month, day] = match
  return new Date(Number(year), Number(month) - 1, Number(day))
}

export function normalizeChallengeStatus(value: unknown): ChallengeStatus {
  if (value === "success" || value === "fail" || value === "pending") {
    return value
  }

  return "pending"
}

export function normalizeChallengeStatuses(raw: unknown) {
  const source = asObject(raw)
  const entries = Object.entries(source).map(([key, value]) => [
    key,
    normalizeChallengeStatus(value),
  ] as const)

  return Object.fromEntries(entries) as Record<string, ChallengeStatus>
}

export function normalizeMissionTasks(raw: unknown) {
  const source = asObject(raw)
  const entries = Object.entries(source).map(([key, value]) => [key, value === true] as const)
  return Object.fromEntries(entries) as MissionTasksMap
}

export function calculateCurrentStreak(
  statuses: Record<string, ChallengeStatus>,
  referenceDate = new Date(),
) {
  let streak = 0
  const cursor = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate(),
  )

  while (true) {
    const key = formatDateKey(cursor)
    if (statuses[key] !== "success") break
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }

  return streak
}

export function calculateSuccessRate(statuses: Record<string, ChallengeStatus>) {
  const successCount = Object.values(statuses).filter((status) => status === "success").length
  const failCount = Object.values(statuses).filter((status) => status === "fail").length

  if (successCount === 0 && failCount === 0) return 0
  if (failCount === 0) return 100

  return (successCount / (successCount + failCount)) * 100
}

export function countMonthSuccessDays(statuses: Record<string, ChallengeStatus>, month: Date) {
  return Object.entries(statuses).filter(([dateKey, status]) => {
    if (status !== "success") return false
    const parsed = parseDateKey(dateKey)
    return (
      parsed &&
      parsed.getFullYear() === month.getFullYear() &&
      parsed.getMonth() === month.getMonth()
    )
  }).length
}

function serializeTimestamp(value: unknown) {
  const maybeTimestamp = value as { toDate?: () => Date } | null | undefined
  if (maybeTimestamp?.toDate) {
    return maybeTimestamp.toDate().toISOString()
  }

  return null
}

async function getChallengeProgressRef(uid: string) {
  return adminDb
    .collection("users")
    .doc(uid)
    .collection(CHALLENGE_COLLECTION)
    .doc(CHALLENGE_DOCUMENT)
}

async function ensureChallengeProgress(uid: string) {
  const ref = await getChallengeProgressRef(uid)
  const snapshot = await ref.get()

  if (!snapshot.exists) {
    await ref.set({
      currentStreak: 0,
      recordStreak: 0,
      totalSuccessDays: 0,
      calendarStatus: {},
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    })
    return { ref, data: {} as Record<string, unknown> }
  }

  return { ref, data: snapshot.data() ?? {} }
}

async function getAllDayNotes(uid: string) {
  const notesSnapshot = await adminDb.collection("users").doc(uid).collection("day_notes").get()
  const notes: DayNotesMap = {}

  notesSnapshot.forEach((doc) => {
    const data = doc.data()
    const note = String(data.note ?? "")
    if (note.trim()) {
      notes[doc.id] = note
    }
  })

  return notes
}

export async function getChallengeSnapshot(uid: string): Promise<ChallengeSnapshot> {
  const [{ data }, notes, userSnapshot] = await Promise.all([
    ensureChallengeProgress(uid),
    getAllDayNotes(uid),
    adminDb.collection("users").doc(uid).get(),
  ])

  const userData = userSnapshot.data() ?? {}
  const dailyStatuses = normalizeChallengeStatuses(data.calendarStatus ?? data.calendar_status)
  const totalSuccessDays =
    typeof data.totalSuccessDays === "number"
      ? data.totalSuccessDays
      : Object.values(dailyStatuses).filter((status) => status === "success").length
  const todayKey = formatDateKey(new Date())

  return {
    currentStreak:
      typeof data.currentStreak === "number"
        ? data.currentStreak
        : calculateCurrentStreak(dailyStatuses, new Date()),
    recordStreak:
      typeof data.recordStreak === "number"
        ? data.recordStreak
        : typeof data.currentStreak === "number"
          ? data.currentStreak
          : calculateCurrentStreak(dailyStatuses, new Date()),
    totalSuccessDays,
    dailyStatuses,
    successRate: calculateSuccessRate(dailyStatuses),
    todayKey,
    todayNote: notes[todayKey] ?? "",
    dayNotes: notes,
    firstWeekValidated: userData.first_week_validated === true,
    missionTasksCompleted: normalizeMissionTasks(userData.mission_tasks_completed),
    firstActivityStartedAt: serializeTimestamp(userData.firstActivityStartedAt),
  }
}

export async function updateChallengeStatus(
  uid: string,
  dateKey: string,
  nextStatus: ChallengeStatus,
): Promise<ChallengeUpdateResult> {
  const { ref, data } = await ensureChallengeProgress(uid)
  const dailyStatuses = normalizeChallengeStatuses(data.calendarStatus ?? data.calendar_status)
  const previousTotalSuccessDays = Object.values(dailyStatuses).filter(
    (status) => status === "success",
  ).length

  dailyStatuses[dateKey] = nextStatus

  const currentStreak = calculateCurrentStreak(dailyStatuses, new Date())
  const previousRecord =
    typeof data.recordStreak === "number"
      ? data.recordStreak
      : typeof data.currentStreak === "number"
        ? data.currentStreak
        : 0
  const recordStreak = Math.max(previousRecord, currentStreak)
  const totalSuccessDays = Object.values(dailyStatuses).filter(
    (status) => status === "success",
  ).length

  await ref.set(
    {
      calendarStatus: dailyStatuses,
      currentStreak,
      recordStreak,
      totalSuccessDays,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  )

  let milestone: ChallengeUpdateResult["milestone"] = null

  if (previousTotalSuccessDays < 7 && totalSuccessDays >= 7) {
    milestone = "first_week"
  } else if (previousTotalSuccessDays < 12 && totalSuccessDays >= 12) {
    milestone = "fire_streak"
  } else if (previousTotalSuccessDays < 30 && totalSuccessDays >= 30) {
    milestone = "full_month"
  }

  return {
    challenge: await getChallengeSnapshot(uid),
    milestone,
    remainingDays: Math.max(0, 30 - totalSuccessDays),
  }
}

export async function saveDayNote(uid: string, dateKey: string, note: string) {
  await adminDb.collection("users").doc(uid).collection("day_notes").doc(dateKey).set(
    {
      note,
      date: dateKey,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  )

  return getChallengeSnapshot(uid)
}

export async function toggleMissionTask(uid: string, taskId: string, completed: boolean) {
  const userRef = adminDb.collection("users").doc(uid)
  const userSnapshot = await userRef.get()
  const userData = userSnapshot.data() ?? {}
  const nextPayload: Record<string, unknown> = {
    mission_tasks_completed: {
      ...(asObject(userData.mission_tasks_completed) as Record<string, unknown>),
      [taskId]: completed,
    },
  }

  if (completed && !userData.firstActivityStartedAt) {
    nextPayload.firstActivityStartedAt = Timestamp.now()
  }

  await userRef.set(nextPayload, { merge: true })

  return getChallengeSnapshot(uid)
}

export async function validateFirstWeek(uid: string) {
  await adminDb.collection("users").doc(uid).set(
    {
      first_week_validated: true,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  )

  return getChallengeSnapshot(uid)
}
