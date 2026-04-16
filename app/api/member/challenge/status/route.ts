import { NextRequest, NextResponse } from "next/server"

import {
  normalizeChallengeStatus,
  parseDateKey,
  updateChallengeStatus,
} from "@/lib/member-plan"
import { requireMemberUser } from "@/lib/member-request"

export async function POST(request: NextRequest) {
  try {
    const { uid } = await requireMemberUser(request)
    const body = (await request.json()) as { dateKey?: string; status?: string }
    const dateKey = String(body.dateKey ?? "").trim()
    const rawStatus = String(body.status ?? "").trim()

    if (!dateKey || !parseDateKey(dateKey)) {
      return NextResponse.json({ error: "Invalid date key." }, { status: 400 })
    }

    if (!["success", "fail", "pending"].includes(rawStatus)) {
      return NextResponse.json({ error: "Invalid challenge status." }, { status: 400 })
    }

    const status = normalizeChallengeStatus(rawStatus)
    const result = await updateChallengeStatus(uid, dateKey, status)

    return NextResponse.json(result)
  } catch (error: any) {
    const message = error?.message ?? "Unable to update the challenge day."
    const status = message === "Missing authorization token" ? 401 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
