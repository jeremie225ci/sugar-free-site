import { NextRequest, NextResponse } from "next/server"
import { Timestamp } from "firebase-admin/firestore"

import { createEmailHash, createVerificationCodeHash } from "@/lib/server-auth"
import { adminDb } from "@/lib/firebase-admin"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = String(body?.email ?? "").trim().toLowerCase()
    const verificationId = String(body?.verificationId ?? "").trim()
    const code = String(body?.code ?? "").trim()

    if (!email || !verificationId || code.length !== 6) {
      return NextResponse.json({ error: "Missing verification data." }, { status: 400 })
    }

    const emailHash = createEmailHash(email)
    const requestRef = adminDb.collection("email_verification_requests").doc(emailHash)
    const requestSnap = await requestRef.get()

    if (!requestSnap.exists) {
      return NextResponse.json({ error: "No active verification request found." }, { status: 404 })
    }

    const requestData = requestSnap.data() ?? {}
    const expiresAt = requestData?.expiresAt?.toMillis?.() ?? 0

    if (requestData.activeVerificationId !== verificationId) {
      return NextResponse.json({ error: "This verification code is no longer active." }, { status: 400 })
    }

    if (!expiresAt || Date.now() > expiresAt) {
      return NextResponse.json({ error: "This verification code has expired." }, { status: 400 })
    }

    const expectedHash = createVerificationCodeHash(verificationId, email, code)

    if (expectedHash !== requestData.codeHash) {
      await requestRef.set(
        {
          attempts: Number(requestData.attempts ?? 0) + 1,
          updatedAt: Timestamp.now(),
        },
        { merge: true },
      )

      return NextResponse.json({ error: "Incorrect verification code." }, { status: 400 })
    }

    await requestRef.set(
      {
        verified: true,
        verifiedAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      },
      { merge: true },
    )

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? "Unable to verify the code." },
      { status: 500 },
    )
  }
}
