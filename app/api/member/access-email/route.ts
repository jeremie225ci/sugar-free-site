import { NextRequest, NextResponse } from "next/server"
import { Timestamp } from "firebase-admin/firestore"

import { sendSukaliAccessEmail } from "@/lib/access-email"
import { adminAuth, adminDb } from "@/lib/firebase-admin"
import { reconcileMemberPremium } from "@/lib/member-premium"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization") ?? ""
    const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : ""

    if (!idToken) {
      return NextResponse.json({ error: "Missing authorization token" }, { status: 401 })
    }

    const decodedToken = await adminAuth.verifyIdToken(idToken)
    const uid = decodedToken.uid
    const siteUrl = request.nextUrl.origin
    const userRef = adminDb.collection("users").doc(uid)
    await reconcileMemberPremium({
      uid,
      siteUrl,
      decodedEmail: decodedToken.email ?? null,
      decodedName: decodedToken.name ?? null,
      sendAccessEmail: true,
    })
    const userSnap = await userRef.get()
    const userData = userSnap.data() ?? {}
    const billing = (userData.billing as Record<string, unknown> | undefined) ?? {}
    const checkout = (userData.checkout as Record<string, unknown> | undefined) ?? {}

    const email = String(userData.email ?? decodedToken.email ?? "").trim()
    const displayName = String(userData.displayName ?? decodedToken.name ?? "").trim()
    const planLabel = String(checkout.planLabel ?? "Sukali Premium")
    const orderId = String(billing.lemonsqueezyOrderId ?? "")
    const hasPremium =
      userData.hasPremium === true ||
      userData.premium === true ||
      userData.sugarFreePremium === true ||
      billing.lemonsqueezyActive === true ||
      billing.revenueCatActive === true

    if (!hasPremium) {
      return NextResponse.json({ error: "Premium access is not active yet." }, { status: 403 })
    }

    if (!email) {
      return NextResponse.json({ error: "No email is attached to this account." }, { status: 400 })
    }

    const alreadySentTo = String(billing.accessEmailSentTo ?? "")
    const lastOrderId = String(billing.lastAccessEmailOrderId ?? "")

    if (alreadySentTo === email && (!orderId || lastOrderId === orderId)) {
      return NextResponse.json({ ok: true, alreadySent: true })
    }

    await sendSukaliAccessEmail({
      siteUrl,
      email,
      name: displayName,
      planLabel,
    })

    await userRef.set(
      {
        billing: {
          accessEmailSentAt: Timestamp.now(),
          accessEmailSentTo: email,
          lastAccessEmailOrderId: orderId || null,
        },
      },
      { merge: true },
    )

    console.log(
      "[member:access_email:sent]",
      JSON.stringify({
        uid,
        email,
        orderId,
        planLabel,
      }),
    )

    return NextResponse.json({ ok: true, sent: true })
  } catch (error: any) {
    console.error(
      "[member:access_email:failed]",
      JSON.stringify({
        message: error?.message ?? "Unable to send access email.",
      }),
    )

    return NextResponse.json(
      { error: error?.message ?? "Unable to send access email." },
      { status: 500 },
    )
  }
}
