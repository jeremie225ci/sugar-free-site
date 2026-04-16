import { NextRequest, NextResponse } from "next/server"

import { validateFirstWeek } from "@/lib/member-plan"
import { requireMemberUser } from "@/lib/member-request"

export async function POST(request: NextRequest) {
  try {
    const { uid } = await requireMemberUser(request)
    const body = (await request.json()) as { missionType?: string }
    const missionType = String(body.missionType ?? "first_week").trim()

    if (missionType !== "first_week") {
      return NextResponse.json({ error: "Unsupported mission validation." }, { status: 400 })
    }

    const challenge = await validateFirstWeek(uid)
    return NextResponse.json({ challenge })
  } catch (error: any) {
    const message = error?.message ?? "Unable to validate the mission."
    const status = message === "Missing authorization token" ? 401 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
