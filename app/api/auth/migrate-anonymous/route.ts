import { NextRequest, NextResponse } from "next/server"

import { adminAuth } from "@/lib/firebase-admin"
import { migrateAnonymousProgress } from "@/lib/server-auth"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization") ?? ""
    const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : ""

    if (!idToken) {
      return NextResponse.json({ error: "Missing authorization token." }, { status: 401 })
    }

    const body = await request.json()
    const anonymousUid = String(body?.anonymousUid ?? "").trim()

    if (!anonymousUid) {
      return NextResponse.json({ error: "Missing anonymous user id." }, { status: 400 })
    }

    const decodedToken = await adminAuth.verifyIdToken(idToken)
    await migrateAnonymousProgress(anonymousUid, decodedToken.uid)

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? "Unable to migrate anonymous progress." },
      { status: 500 },
    )
  }
}
