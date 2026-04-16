import { NextRequest, NextResponse } from "next/server"
import { Timestamp } from "firebase-admin/firestore"

import { adminAuth, adminDb } from "@/lib/firebase-admin"
import {
  createEmailHash,
  migrateAnonymousProgress,
  upsertFirebaseUserFromVerifiedEmail,
} from "@/lib/server-auth"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = String(body?.email ?? "").trim().toLowerCase()
    const displayName = String(body?.displayName ?? "").trim()
    const password = String(body?.password ?? "")
    const verificationId = String(body?.verificationId ?? "").trim()
    const source = String(body?.source ?? "direct").trim()
    const sourcePath = String(body?.sourcePath ?? "/start").trim()
    const anonymousUid = String(body?.anonymousUid ?? "").trim()

    if (!EMAIL_REGEX.test(email) || !verificationId) {
      return NextResponse.json({ error: "Missing verified email data." }, { status: 400 })
    }

    if (password.trim().length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 })
    }

    const requestRef = adminDb.collection("email_verification_requests").doc(createEmailHash(email))
    const requestSnap = await requestRef.get()

    if (!requestSnap.exists) {
      return NextResponse.json({ error: "No verified email request was found." }, { status: 404 })
    }

    const requestData = requestSnap.data() ?? {}
    const expiresAt = requestData?.expiresAt?.toMillis?.() ?? 0

    if (requestData.activeVerificationId !== verificationId) {
      return NextResponse.json({ error: "This verification request is no longer active." }, { status: 400 })
    }

    if (!requestData.verified) {
      return NextResponse.json({ error: "Confirm your email code before continuing." }, { status: 400 })
    }

    if (!expiresAt || Date.now() > expiresAt) {
      return NextResponse.json({ error: "This verification code has expired." }, { status: 400 })
    }

    const firebaseUser = await upsertFirebaseUserFromVerifiedEmail({
      email,
      displayName,
      password,
    })

    await migrateAnonymousProgress(anonymousUid, firebaseUser.uid)

    await adminDb.collection("users").doc(firebaseUser.uid).set(
      {
        uid: firebaseUser.uid,
        email,
        displayName: displayName || firebaseUser.displayName || null,
        authProviders: ["email_verified_code"],
        emailVerified: true,
        lastSource: source || "email",
        lastSourcePath: sourcePath || "/start",
        lastActivity: Timestamp.now(),
        updatedAt: Timestamp.now(),
        emailVerification: {
          method: "resend_code",
          verificationId,
          verifiedAt: requestData.verifiedAt ?? Timestamp.now(),
          completedAt: Timestamp.now(),
        },
      },
      { merge: true },
    )

    await requestRef.set(
      {
        completedAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      },
      { merge: true },
    )

    const customToken = await adminAuth.createCustomToken(firebaseUser.uid)

    return NextResponse.json({
      ok: true,
      customToken,
      uid: firebaseUser.uid,
      email,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? "Unable to continue with email." },
      { status: 500 },
    )
  }
}
