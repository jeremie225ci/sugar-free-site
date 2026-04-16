import { Timestamp } from "firebase-admin/firestore"

import { sendSukaliAccessEmail } from "@/lib/access-email"
import { adminDb } from "@/lib/firebase-admin"
import { getLemonConfig, listRecentLemonOrders, type LemonPlanKey } from "@/lib/lemonsqueezy"

type ReconcilePremiumParams = {
  uid: string
  siteUrl: string
  decodedEmail?: string | null
  decodedName?: string | null
  sendAccessEmail?: boolean
}

type ReconcilePremiumResult = {
  email: string
  hasPremium: boolean
  accessEmailSent: boolean
  matchedOrderId: string
}

function normalizeEmail(value: unknown) {
  return String(value ?? "").trim().toLowerCase()
}

function asObject(value: unknown) {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {}
}

function timestampToMs(value: unknown) {
  const maybeTimestamp = value as { toMillis?: () => number } | null | undefined
  if (maybeTimestamp?.toMillis) return maybeTimestamp.toMillis()

  const maybeDate = value instanceof Date ? value : null
  if (maybeDate) return maybeDate.getTime()

  return 0
}

function resolvePlanKey(variantId: string, fallback: string): LemonPlanKey {
  const config = getLemonConfig()

  if (variantId && variantId === config.yearlyVariantId) {
    return "yearly"
  }

  if (variantId && variantId === config.monthlyVariantId) {
    return "monthly"
  }

  return fallback === "yearly" ? "yearly" : "monthly"
}

function resolvePlanLabel(planKey: LemonPlanKey, fallback: string) {
  if (fallback.trim()) return fallback.trim()
  return planKey === "yearly" ? "Sukali Premium Yearly" : "Sukali Premium Monthly"
}

export async function reconcileMemberPremium({
  uid,
  siteUrl,
  decodedEmail,
  decodedName,
  sendAccessEmail = false,
}: ReconcilePremiumParams): Promise<ReconcilePremiumResult> {
  const userRef = adminDb.collection("users").doc(uid)
  const userSnap = await userRef.get()
  const userData = userSnap.data() ?? {}
  const billing = asObject(userData.billing)
  const checkout = asObject(userData.checkout)
  const currentEmail = normalizeEmail(userData.email)
  const accountEmail = normalizeEmail(decodedEmail || userData.email)
  const accountName = String(userData.displayName ?? decodedName ?? "").trim()
  const revenueCatActive = billing.revenueCatActive === true
  const currentHasPremium =
    userData.hasPremium === true ||
    userData.premium === true ||
    userData.sugarFreePremium === true ||
    billing.lemonsqueezyActive === true ||
    revenueCatActive
  const currentOrderId = String(billing.lemonsqueezyOrderId ?? "")
  const currentPlanKey = String(checkout.plan ?? billing.lemonsqueezyPlan ?? "monthly")
  const currentPlanLabel = String(checkout.planLabel ?? "")
  const requestedVariantId = String(checkout.variantId ?? billing.lemonsqueezyVariantId ?? "")
  const lastCheckoutMs = timestampToMs(checkout.lastCheckoutAt)

  if (accountEmail && accountEmail !== currentEmail) {
    await userRef.set(
      {
        email: accountEmail,
        displayName: accountName || userData.displayName || null,
        lastActivity: Timestamp.now(),
      },
      { merge: true },
    )
  }

  if (currentHasPremium) {
    const alreadySentTo = normalizeEmail(billing.accessEmailSentTo)
    const lastAccessEmailOrderId = String(billing.lastAccessEmailOrderId ?? "")
    const shouldSendAccessEmail =
      sendAccessEmail &&
      !!accountEmail &&
      (alreadySentTo !== accountEmail || (currentOrderId && lastAccessEmailOrderId !== currentOrderId))

    if (shouldSendAccessEmail) {
      await sendSukaliAccessEmail({
        siteUrl,
        email: accountEmail,
        name: accountName,
        planLabel: resolvePlanLabel(resolvePlanKey(requestedVariantId, currentPlanKey), currentPlanLabel),
      })

      await userRef.set(
        {
          billing: {
            accessEmailSentAt: Timestamp.now(),
            accessEmailSentTo: accountEmail,
            lastAccessEmailOrderId: currentOrderId || null,
          },
        },
        { merge: true },
      )
    }

    return {
      email: accountEmail,
      hasPremium: true,
      accessEmailSent: shouldSendAccessEmail,
      matchedOrderId: currentOrderId,
    }
  }

  if (!accountEmail) {
    return {
      email: "",
      hasPremium: false,
      accessEmailSent: false,
      matchedOrderId: "",
    }
  }

  const paidOrders = (await listRecentLemonOrders())
    .filter((order) => order.email === accountEmail && order.status === "paid")
    .map((order) => ({
      ...order,
      createdMs: Date.parse(order.createdAt) || 0,
      variantMatches: !requestedVariantId || order.variantId === requestedVariantId,
      recentEnough: !lastCheckoutMs || (Date.parse(order.createdAt) || 0) >= lastCheckoutMs - 1000 * 60 * 60 * 24,
    }))
    .filter((order) => order.recentEnough)
    .sort((a, b) => {
      if (a.variantMatches !== b.variantMatches) {
        return a.variantMatches ? -1 : 1
      }
      return b.createdMs - a.createdMs
    })

  const matchedOrder = paidOrders[0]

  console.log(
    "[member:reconcile:order_lookup]",
    JSON.stringify({
      uid,
      accountEmail,
      requestedVariantId,
      lastCheckoutMs,
      matchedOrderId: matchedOrder?.id ?? "",
      candidateOrderIds: paidOrders.map((order) => order.id),
    }),
  )

  if (!matchedOrder) {
    return {
      email: accountEmail,
      hasPremium: false,
      accessEmailSent: false,
      matchedOrderId: "",
    }
  }

  const planKey = resolvePlanKey(matchedOrder.variantId, currentPlanKey)
  const planLabel = resolvePlanLabel(planKey, currentPlanLabel)

  await userRef.set(
    {
      uid,
      email: accountEmail,
      displayName: accountName || matchedOrder.name || userData.displayName || null,
      hasPremium: true,
      premium: true,
      sugarFreePremium: true,
      onboarding_completed: true,
      onboarding_step: "done",
      premiumStatusUpdated: Timestamp.now(),
      lastActivity: Timestamp.now(),
      billing: {
        ...billing,
        accessSource: revenueCatActive ? "multi" : "lemonsqueezy",
        lemonsqueezyActive: true,
        lemonsqueezyStatus: matchedOrder.status,
        lemonsqueezyEvent: "order_lookup_reconciled",
        lemonsqueezyCustomerId: matchedOrder.customerId || billing.lemonsqueezyCustomerId || null,
        lemonsqueezyOrderId: matchedOrder.id,
        lemonsqueezySubscriptionId: billing.lemonsqueezySubscriptionId ?? null,
        lemonsqueezyVariantId: matchedOrder.variantId || requestedVariantId || null,
        lemonsqueezyPlan: planKey,
        lemonsqueezyUpdatedAt: Timestamp.now(),
        revenueCatActive,
        accessEmailSentAt: billing.accessEmailSentAt ?? null,
        accessEmailSentTo: billing.accessEmailSentTo ?? null,
        lastAccessEmailOrderId: billing.lastAccessEmailOrderId ?? null,
      },
      checkout: {
        source: checkout.source ?? "direct",
        sourcePath: checkout.sourcePath ?? "",
        plan: planKey,
        planLabel,
        variantId: matchedOrder.variantId || requestedVariantId || null,
        status: "paid",
        lastCheckoutAt: checkout.lastCheckoutAt ?? Timestamp.now(),
        completedAt: Timestamp.now(),
      },
    },
    { merge: true },
  )

  let accessEmailSent = false
  const alreadySentTo = normalizeEmail(billing.accessEmailSentTo)
  const lastAccessEmailOrderId = String(billing.lastAccessEmailOrderId ?? "")
  const shouldSendAccessEmail =
    sendAccessEmail &&
    (alreadySentTo !== accountEmail || lastAccessEmailOrderId !== matchedOrder.id)

  if (shouldSendAccessEmail) {
    await sendSukaliAccessEmail({
      siteUrl,
      email: accountEmail,
      name: accountName || matchedOrder.name,
      planLabel,
    })

    await userRef.set(
      {
        billing: {
          accessEmailSentAt: Timestamp.now(),
          accessEmailSentTo: accountEmail,
          lastAccessEmailOrderId: matchedOrder.id,
        },
      },
      { merge: true },
    )

    accessEmailSent = true
  }

  console.log(
    "[member:reconcile:success]",
    JSON.stringify({
      uid,
      accountEmail,
      matchedOrderId: matchedOrder.id,
      planKey,
      accessEmailSent,
    }),
  )

  return {
    email: accountEmail,
    hasPremium: true,
    accessEmailSent,
    matchedOrderId: matchedOrder.id,
  }
}
