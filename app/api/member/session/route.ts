import { NextRequest, NextResponse } from "next/server"

import { reconcileMemberPremium } from "@/lib/member-premium"
import { getChallengeSnapshot } from "@/lib/member-plan"
import { requireMemberUser } from "@/lib/member-request"

function asObject(value: unknown) {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {}
}

export async function GET(request: NextRequest) {
  try {
    const { uid, decodedToken, userRef } = await requireMemberUser(request)
    const siteUrl = request.nextUrl.origin
    const firstSnap = await userRef.get()
    const firstData = firstSnap.data() ?? {}
    const firstBilling = asObject(firstData.billing)
    const firstCheckout = asObject(firstData.checkout)
    const firstHasPremium =
      firstData.hasPremium === true ||
      firstData.premium === true ||
      firstData.sugarFreePremium === true ||
      firstBilling.lemonsqueezyActive === true ||
      firstBilling.revenueCatActive === true
    const firstCheckoutStatus = String(firstCheckout.status ?? "").toLowerCase()

    if (!firstHasPremium && ["started", "paid"].includes(firstCheckoutStatus)) {
      await reconcileMemberPremium({
        uid,
        siteUrl,
        decodedEmail: decodedToken.email ?? null,
        decodedName: decodedToken.name ?? null,
        sendAccessEmail: false,
      })
    }

    const userSnap = await userRef.get()
    const userData = userSnap.data() ?? {}
    const billing = asObject(userData.billing)
    const checkout = asObject(userData.checkout)
    const webOnboarding = asObject(userData.webOnboarding)
    const identity = asObject(webOnboarding.identity)
    const preferences = asObject(userData.preferences)
    const challenge = await getChallengeSnapshot(uid)

    const hasPremium =
      userData.hasPremium === true ||
      userData.premium === true ||
      userData.sugarFreePremium === true ||
      billing.lemonsqueezyActive === true ||
      billing.revenueCatActive === true

    return NextResponse.json({
      uid,
      email: String(userData.email ?? decodedToken.email ?? ""),
      displayName: String(userData.displayName ?? decodedToken.name ?? ""),
      hasPremium,
      checkoutStatus: String(checkout.status ?? ""),
      planKey: String(checkout.plan ?? webOnboarding.selectedPlan ?? "monthly"),
      planLabel: String(checkout.planLabel ?? billing.lemonsqueezyPlan ?? "Sukali Premium"),
      selectedSymptoms: Array.isArray(webOnboarding.selectedSymptoms)
        ? webOnboarding.selectedSymptoms.filter((entry): entry is string => typeof entry === "string")
        : [],
      dependencyScore:
        typeof webOnboarding.dependencyScore === "number" ? webOnboarding.dependencyScore : null,
      language: String(userData.language ?? "en"),
      preferences,
      identity: {
        name: String(identity.name ?? userData.displayName ?? decodedToken.name ?? ""),
        age: String(identity.age ?? ""),
      },
      billing: {
        accessSource: String(billing.accessSource ?? ""),
        lemonsqueezyStatus: String(billing.lemonsqueezyStatus ?? ""),
        accessEmailSentTo: String(billing.accessEmailSentTo ?? ""),
      },
      challenge,
    })
  } catch (error: any) {
    const message = error?.message ?? "Unable to load the member session."
    const status = message === "Missing authorization token" ? 401 : 500
    return NextResponse.json(
      { error: message },
      { status },
    )
  }
}
