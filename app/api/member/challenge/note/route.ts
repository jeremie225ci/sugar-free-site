import { NextRequest, NextResponse } from "next/server"

import { parseDateKey, saveDayNote } from "@/lib/member-plan"
import { requireMemberUser } from "@/lib/member-request"

export async function POST(request: NextRequest) {
  try {
    const { uid } = await requireMemberUser(request)
    const body = (await request.json()) as { dateKey?: string; note?: string }
    const dateKey = String(body.dateKey ?? "").trim()
    const note = String(body.note ?? "")

    if (!dateKey || !parseDateKey(dateKey)) {
      return NextResponse.json({ error: "Invalid date key." }, { status: 400 })
    }

    const challenge = await saveDayNote(uid, dateKey, note)
    return NextResponse.json({ challenge })
  } catch (error: any) {
    const message = error?.message ?? "Unable to save the note."
    const status = message === "Missing authorization token" ? 401 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
