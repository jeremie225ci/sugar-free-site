import { NextRequest, NextResponse } from "next/server"
import { Timestamp } from "firebase-admin/firestore"

import {
  createEmailHash,
  createVerificationCode,
  createVerificationCodeHash,
  createVerificationId,
  maskEmail,
} from "@/lib/server-auth"
import { adminDb } from "@/lib/firebase-admin"
import { sendTransactionalEmail } from "@/lib/resend"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CODE_TTL_MS = 10 * 60 * 1000
const RATE_LIMIT_MS = 60 * 1000

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = String(body?.email ?? "").trim().toLowerCase()
    const displayName = String(body?.displayName ?? "").trim()
    const source = String(body?.source ?? "direct").trim()
    const sourcePath = String(body?.sourcePath ?? "").trim()

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 })
    }

    const emailHash = createEmailHash(email)
    const requestRef = adminDb.collection("email_verification_requests").doc(emailHash)
    const requestSnap = await requestRef.get()
    const now = Date.now()
    const existingData = requestSnap.data()
    const lastSentAt = existingData?.lastSentAt?.toMillis?.() ?? 0

    if (lastSentAt && now - lastSentAt < RATE_LIMIT_MS) {
      return NextResponse.json(
        { error: "A code was just sent. Wait a few seconds before trying again." },
        { status: 429 },
      )
    }

    const verificationId = createVerificationId()
    const code = createVerificationCode()
    const codeHash = createVerificationCodeHash(verificationId, email, code)
    const expiresAt = new Date(now + CODE_TTL_MS)

    await requestRef.set(
      {
        email,
        displayName: displayName || null,
        source,
        sourcePath,
        activeVerificationId: verificationId,
        codeHash,
        verified: false,
        attempts: 0,
        expiresAt: Timestamp.fromDate(expiresAt),
        lastSentAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      },
      { merge: true },
    )

    const subject = "Your Sukali verification code"
    const html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f6f0e6;color:#1f241d;padding:32px;">
        <div style="max-width:560px;margin:0 auto;background:#fffaf2;border:1px solid #ddd1c1;border-radius:28px;padding:32px;">
          <p style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#7b7468;margin:0 0 16px;">Sukali verification</p>
          <h1 style="font-family:Georgia,serif;font-size:32px;line-height:1.2;margin:0 0 16px;">Confirm your email to unlock your sugar-free plan.</h1>
          <p style="font-size:16px;line-height:1.7;color:#5f5a51;margin:0 0 24px;">Use this code in the Sukali checkout step. It expires in 10 minutes.</p>
          <div style="font-size:36px;font-weight:700;letter-spacing:0.28em;text-align:center;padding:20px 24px;border-radius:22px;background:#edf3ea;color:#2d4a2a;margin-bottom:24px;">${code}</div>
          <p style="font-size:14px;line-height:1.6;color:#7b7468;margin:0;">If you did not request this code, you can ignore this email.</p>
        </div>
      </div>
    `
    const text = `Your Sukali verification code is ${code}. It expires in 10 minutes.`

    await sendTransactionalEmail({
      to: email,
      subject,
      html,
      text,
    })

    return NextResponse.json({
      ok: true,
      verificationId,
      maskedEmail: maskEmail(email),
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? "Unable to send verification code." },
      { status: 500 },
    )
  }
}
