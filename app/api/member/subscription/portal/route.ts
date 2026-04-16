import { NextRequest, NextResponse } from "next/server"

import { getSubscriptionPortal, listRecentLemonSubscriptions } from "@/lib/lemonsqueezy"
import { requireMemberUser } from "@/lib/member-request"

function asObject(value: unknown) {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {}
}

async function resolvePortal(request: NextRequest) {
  const { userRef } = await requireMemberUser(request)
  const userSnap = await userRef.get()
  const userData = userSnap.data() ?? {}
  const billing = asObject(userData.billing)
  const checkout = asObject(userData.checkout)
  const subscriptionId = String(billing.lemonsqueezySubscriptionId ?? "").trim()
  const customerId = String(billing.lemonsqueezyCustomerId ?? "").trim()
  const variantId = String(
    billing.lemonsqueezyVariantId ?? checkout.variantId ?? "",
  ).trim()
  const email = String(userData.email ?? "").trim().toLowerCase()
  const planLabel = String(
    checkout.planLabel ??
      billing.lemonsqueezyPlan ??
      "Sukali Premium",
  ).trim()
  let portal =
    subscriptionId
      ? await getSubscriptionPortal(subscriptionId).catch((error) => {
          if (String(error?.message ?? "").includes("404")) {
            return null
          }
          throw error
        })
      : null
  let resolvedSubscriptionId = portal?.subscriptionId ?? subscriptionId

  if (!portal) {
    const subscriptions = await listRecentLemonSubscriptions(100)
    const match = subscriptions
      .filter((entry) => {
        const customerMatch = customerId && entry.customerId === customerId
        const emailMatch = email && entry.email === email
        if (!customerMatch && !emailMatch) return false
        if (variantId && entry.variantId && entry.variantId !== variantId) return false
        return true
      })
      .sort((a, b) => {
        const activeA = ["active", "on_trial", "past_due", "cancelled"].includes(a.status) ? 1 : 0
        const activeB = ["active", "on_trial", "past_due", "cancelled"].includes(b.status) ? 1 : 0
        if (activeB !== activeA) return activeB - activeA
        return Date.parse(b.createdAt) - Date.parse(a.createdAt)
      })[0]

    if (!match) {
      return NextResponse.json(
        { error: "No active Lemon Squeezy subscription was found for this account." },
        { status: 404 },
      )
    }

    resolvedSubscriptionId = match.id
    portal = {
      subscriptionId: match.id,
      status: match.status,
      customerPortalUrl: match.customerPortalUrl,
      updatePaymentMethodUrl: match.updatePaymentMethodUrl || match.customerPortalUpdateSubscriptionUrl,
      customerId: match.customerId,
      endsAt: match.endsAt,
      renewsAt: match.renewsAt,
    }

    await userRef.set(
      {
        billing: {
          lemonsqueezySubscriptionId: match.id,
          lemonsqueezyCustomerId: match.customerId || customerId || null,
          lemonsqueezyVariantId: match.variantId || variantId || null,
          lemonsqueezyStatus: match.status || billing.lemonsqueezyStatus || null,
        },
      },
      { merge: true },
    )
  }

  const portalUrl = portal.customerPortalUrl || portal.updatePaymentMethodUrl

  if (!portalUrl) {
    return NextResponse.json(
      { error: "We could not open the subscription portal for this account yet." },
      { status: 502 },
    )
  }

  return NextResponse.json({
    portalUrl,
    subscriptionId: resolvedSubscriptionId,
    customerPortalUrl: portal.customerPortalUrl,
    updatePaymentMethodUrl: portal.updatePaymentMethodUrl,
    status: portal.status,
    endsAt: portal.endsAt,
    renewsAt: portal.renewsAt,
    planLabel,
  })
}

export async function GET(request: NextRequest) {
  try {
    return await resolvePortal(request)
  } catch (error: any) {
    const message = error?.message ?? "Unable to open the subscription portal."
    const status = message === "Missing authorization token" ? 401 : 500
    return NextResponse.json({ error: message }, { status })
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
