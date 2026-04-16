import { NextRequest, NextResponse } from "next/server"
import { Timestamp } from "firebase-admin/firestore"

import { adminAuth, adminDb } from "@/lib/firebase-admin"

export async function POST(request: NextRequest) {
  try {
    const functionUrl = process.env.GLOWUP_FUNCTION_URL

    if (!functionUrl) {
      return NextResponse.json(
        { error: "Glowup function is not configured yet." },
        { status: 503 },
      )
    }

    const body = await request.json()
    const imageUrl = String(body?.imageUrl ?? "").trim()
    const authHeader = request.headers.get("authorization") ?? ""
    const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : ""

    if (!idToken) {
      return NextResponse.json({ error: "Missing authorization token" }, { status: 401 })
    }

    if (!imageUrl) {
      return NextResponse.json({ error: "Missing imageUrl" }, { status: 400 })
    }

    const decodedToken = await adminAuth.verifyIdToken(idToken)
    const uid = decodedToken.uid

    const response = await fetch(functionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          userId: uid,
          imageUrl,
        },
      }),
    })

    const payload = await response.json()

    if (!response.ok) {
      const message =
        payload?.error?.message ??
        payload?.message ??
        "Unable to generate your sugar-free preview right now."

      return NextResponse.json({ error: message }, { status: response.status })
    }

    const transformedImageUrl = payload?.data?.transformedImageUrl as string | undefined

    if (transformedImageUrl) {
      await adminDb.collection("users").doc(uid).set(
        {
          lastActivity: Timestamp.now(),
          glowup_preview_url: transformedImageUrl,
          glowup_preview_updated_at: Timestamp.now(),
        },
        { merge: true },
      )
    }

    return NextResponse.json(payload)
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message ?? "Unable to generate your sugar-free preview right now.",
      },
      { status: 500 },
    )
  }
}
