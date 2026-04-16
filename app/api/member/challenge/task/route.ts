import { NextRequest, NextResponse } from "next/server"

import { toggleMissionTask } from "@/lib/member-plan"
import { requireMemberUser } from "@/lib/member-request"

export async function POST(request: NextRequest) {
  try {
    const { uid } = await requireMemberUser(request)
    const body = (await request.json()) as { taskId?: string; completed?: boolean }
    const taskId = String(body.taskId ?? "").trim()
    const completed = body.completed === true

    if (!taskId) {
      return NextResponse.json({ error: "Missing mission task id." }, { status: 400 })
    }

    const challenge = await toggleMissionTask(uid, taskId, completed)
    return NextResponse.json({ challenge })
  } catch (error: any) {
    const message = error?.message ?? "Unable to update the mission task."
    const status = message === "Missing authorization token" ? 401 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
