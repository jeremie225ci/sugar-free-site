import { NextRequest, NextResponse } from "next/server"
import { Timestamp } from "firebase-admin/firestore"

import { adminAuth, adminDb } from "@/lib/firebase-admin"
import { createHostedCheckout, type LemonPlanKey } from "@/lib/lemonsqueezy"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const name = String(body?.name ?? "").trim()
    const source = String(body?.source ?? "direct").trim()
    const sourcePath = String(body?.sourcePath ?? "").trim()
    const requestedPlan = String(body?.plan ?? "monthly").trim().toLowerCase()
    const authHeader = request.headers.get("authorization") ?? ""
    const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : ""
    const plan: LemonPlanKey = requestedPlan === "yearly" ? "yearly" : "monthly"
    const siteUrl = request.nextUrl.origin

    console.log(
      "[checkout:create:start]",
      JSON.stringify({
        source,
        sourcePath,
        requestedPlan,
        plan,
        siteUrl,
        hasAuthHeader: Boolean(authHeader),
        hasIdToken: Boolean(idToken),
      }),
    )

    if (!idToken) {
      return NextResponse.json({ error: "Missing authorization token" }, { status: 401 })
    }

    const decodedToken = await adminAuth.verifyIdToken(idToken)
    const uid = decodedToken.uid
    const email = String(decodedToken.email ?? body?.email ?? "").trim()
    const signInProvider = String(decodedToken.firebase?.sign_in_provider ?? "")

    console.log(
      "[checkout:create:verified]",
      JSON.stringify({
        uid,
        email,
        signInProvider,
        plan,
      }),
    )

    if (!email) {
      return NextResponse.json({ error: "Missing email on the signed-in account" }, { status: 400 })
    }

    if (signInProvider === "anonymous") {
      return NextResponse.json(
        { error: "Claim your account with Google or email before checkout." },
        { status: 403 },
      )
    }

    const { checkoutUrl, plan: resolvedPlan } = await createHostedCheckout({
      uid,
      email,
      name,
      source,
      sourcePath,
      plan,
      siteUrl,
    })

    console.log(
      "[checkout:create:lemonsqueezy]",
      JSON.stringify({
        uid,
        email,
        plan: resolvedPlan.key,
        variantId: resolvedPlan.variantId,
        checkoutUrl,
      }),
    )

    await adminDb.collection("users").doc(uid).set(
      {
        email,
        displayName: name || null,
        lastActivity: Timestamp.now(),
        onboarding_step: "plan_ready",
        checkout: {
          source,
          sourcePath,
          plan: resolvedPlan.key,
          planLabel: resolvedPlan.label,
          variantId: resolvedPlan.variantId,
          status: "started",
          lastCheckoutAt: Timestamp.now(),
        },
      },
      { merge: true },
    )

    console.log(
      "[checkout:create:success]",
      JSON.stringify({
        uid,
        email,
        plan: resolvedPlan.key,
      }),
    )

    return NextResponse.json({
      url: checkoutUrl,
      plan: resolvedPlan.key,
    })
  } catch (error: any) {
    console.error(
      "[checkout:create:error]",
      JSON.stringify({
        message: error?.message ?? "Unable to create checkout",
        code: error?.code ?? "",
        stack: typeof error?.stack === "string" ? error.stack.split("\n").slice(0, 6).join(" | ") : "",
      }),
    )
    return NextResponse.json(
      { error: error?.message ?? "Unable to create checkout" },
      { status: 500 },
    )
  }
}
