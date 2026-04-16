import { NextRequest, NextResponse } from "next/server"
import { Timestamp } from "firebase-admin/firestore"

import { sendSukaliAccessEmail } from "@/lib/access-email"
import { sendSukaliCancellationEmail } from "@/lib/cancellation-email"
import { adminDb } from "@/lib/firebase-admin"
import { verifyLemonSignature } from "@/lib/lemonsqueezy"

function parseLemonDate(value: unknown) {
  const raw = String(value ?? "").trim()
  if (!raw) return null

  const date = new Date(raw)
  return Number.isNaN(date.getTime()) ? null : date
}

function toTimestampOrNull(value: Date | null) {
  return value ? Timestamp.fromDate(value) : null
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text()
  const siteUrl = request.nextUrl.origin

  if (!verifyLemonSignature(rawBody, request.headers.get("X-Signature"))) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
  }

  const payload = JSON.parse(rawBody)
  const eventName = payload?.meta?.event_name as string | undefined
  const customData = payload?.meta?.custom_data ?? {}
  const data = payload?.data?.attributes ?? {}
  const rawUid = String(customData?.firebase_uid ?? "").trim()
  const status = String(data?.status ?? "").toLowerCase()
  const orderId = String(payload?.data?.id ?? "")
  const subscriptionId = String(data?.subscription_id ?? payload?.data?.id ?? "")
  const customerId = String(data?.customer_id ?? "")
  const customerEmail = String(data?.user_email ?? data?.customer_email ?? "")
  const customerName = String(data?.user_name ?? "")
  const candidateEmail = String(customData?.account_email ?? customerEmail ?? "").trim().toLowerCase()
  const endsAt = parseLemonDate(data?.ends_at)
  const renewsAt = parseLemonDate(data?.renews_at)
  const trialEndsAt = parseLemonDate(data?.trial_ends_at)
  const cancelledAt = parseLemonDate(data?.cancelled_at)
  const now = Date.now()

  let uid = rawUid

  if (!uid && candidateEmail) {
    const matchingUsersSnap = await adminDb
      .collection("users")
      .where("email", "==", candidateEmail)
      .get()

    const matchingUsers = matchingUsersSnap.docs
      .map((doc) => {
        const docData = doc.data() ?? {}
        const checkout = (docData.checkout as Record<string, unknown> | undefined) ?? {}
        const lastActivityMs = docData.lastActivity?.toMillis?.() ?? 0
        const updatedAtMs = docData.updatedAt?.toMillis?.() ?? 0
        const premium = docData.hasPremium === true || docData.premium === true || docData.sugarFreePremium === true
        const checkoutStatus = String(checkout.status ?? "")

        return {
          uid: doc.id,
          lastActivityMs,
          updatedAtMs,
          premium,
          checkoutStatus,
        }
      })
      .sort((a, b) => {
        const aScore = (a.checkoutStatus === "started" ? 10 : 0) + (a.premium ? 5 : 0)
        const bScore = (b.checkoutStatus === "started" ? 10 : 0) + (b.premium ? 5 : 0)

        if (bScore !== aScore) return bScore - aScore
        if (b.lastActivityMs !== a.lastActivityMs) return b.lastActivityMs - a.lastActivityMs
        return b.updatedAtMs - a.updatedAtMs
      })

    uid = matchingUsers[0]?.uid ?? ""

    console.log(
      "[lemonsqueezy:webhook:uid_fallback_lookup]",
      JSON.stringify({
        eventName,
        orderId,
        candidateEmail,
        rawUid,
        resolvedUid: uid,
        matchingUsers,
      }),
    )
  }

  if (!uid) {
    console.log(
      "[lemonsqueezy:webhook:missing_uid]",
      JSON.stringify({
        eventName,
        orderId,
        rawUid,
        candidateEmail,
        customerEmail,
        customAccountEmail: String(customData?.account_email ?? ""),
      }),
    )
    return NextResponse.json({ ok: true })
  }

  const activeStatuses = new Set(["active", "on_trial", "paid", "trialing"])
  const activatingEvents = new Set([
    "order_created",
    "subscription_created",
    "subscription_resumed",
    "subscription_updated",
  ])
  const deactivatingEvents = new Set([
    "subscription_cancelled",
    "subscription_expired",
    "subscription_paused",
  ])

  const currentSnap = await adminDb.collection("users").doc(uid).get()
  const currentData = currentSnap.data() ?? {}
  const currentBilling = (currentData.billing as Record<string, unknown> | undefined) ?? {}
  const accountEmail = String(customData?.account_email ?? customerEmail ?? currentData.email ?? "").trim()
  const accountName = String(customData?.account_name ?? currentData.displayName ?? customerName ?? "").trim()
  const revenueCatActive = currentBilling.revenueCatActive === true
  const planKey = String(customData?.plan_key ?? currentData?.checkout?.plan ?? "monthly")
  const planLabel = String(customData?.plan_label ?? currentData?.checkout?.planLabel ?? "Sukali Premium")
  const variantId = String(customData?.variant_id ?? currentBilling.lemonsqueezyVariantId ?? "")
  const cancellationScheduled = status === "cancelled" && !!endsAt && endsAt.getTime() > now

  let lemonsqueezyActive = currentBilling.lemonsqueezyActive === true

  if (activatingEvents.has(eventName ?? "")) {
    lemonsqueezyActive =
      activeStatuses.has(status) || eventName === "order_created" || cancellationScheduled
  }

  if (deactivatingEvents.has(eventName ?? "")) {
    lemonsqueezyActive = cancellationScheduled ? true : false
  }

  const hasPremium = revenueCatActive || lemonsqueezyActive
  const checkoutStatus = cancellationScheduled
    ? "cancelled_pending_expiry"
    : lemonsqueezyActive
      ? "paid"
      : status || "inactive"
  const shouldSendAccessEmail =
    lemonsqueezyActive &&
    !!accountEmail &&
    activatingEvents.has(eventName ?? "") &&
    (
      String(currentBilling.accessEmailSentTo ?? "") !== accountEmail ||
      String(currentBilling.lastAccessEmailOrderId ?? "") !== orderId
    )
  const previousCancellationEndsAtMs = currentBilling.cancellationEmailEndsAt?.toMillis?.() ?? 0
  const nextCancellationEndsAtMs = endsAt?.getTime() ?? 0
  const shouldSendCancellationEmail =
    eventName === "subscription_cancelled" &&
    cancellationScheduled &&
    !!accountEmail &&
    (
      String(currentBilling.cancellationEmailSentTo ?? "") !== accountEmail ||
      String(currentBilling.lastCancellationEmailSubscriptionId ?? "") !== subscriptionId ||
      previousCancellationEndsAtMs !== nextCancellationEndsAtMs
    )

  console.log(
    "[lemonsqueezy:webhook:email_resolution]",
    JSON.stringify({
      eventName,
      uid,
      orderId,
      status,
      cancellationScheduled,
      endsAt: endsAt?.toISOString() ?? null,
      renewsAt: renewsAt?.toISOString() ?? null,
      customerEmail,
      currentEmail: String(currentData.email ?? ""),
      customAccountEmail: String(customData?.account_email ?? ""),
      resolvedAccountEmail: accountEmail,
      shouldSendAccessEmail,
      shouldSendCancellationEmail,
    }),
  )

  await adminDb.collection("users").doc(uid).set(
    {
      uid,
      email: accountEmail || customerEmail || currentData.email || "",
      displayName: accountName || customerName || currentData.displayName || null,
      hasPremium,
      premium: hasPremium,
      sugarFreePremium: hasPremium,
      onboarding_completed: hasPremium ? true : currentData.onboarding_completed ?? false,
      onboarding_step: hasPremium ? "done" : currentData.onboarding_step ?? "plan_ready",
      premiumStatusUpdated: Timestamp.now(),
      lastActivity: Timestamp.now(),
      billing: {
        ...currentBilling,
        accessSource: hasPremium
          ? revenueCatActive && lemonsqueezyActive
            ? "multi"
            : lemonsqueezyActive
              ? "lemonsqueezy"
              : "revenuecat"
          : "none",
        lemonsqueezyActive,
        lemonsqueezyStatus: status || null,
        lemonsqueezyEvent: eventName ?? null,
        lemonsqueezyCustomerId: customerId || currentBilling.lemonsqueezyCustomerId || null,
        lemonsqueezyOrderId: orderId || currentBilling.lemonsqueezyOrderId || null,
        lemonsqueezySubscriptionId: subscriptionId || currentBilling.lemonsqueezySubscriptionId || null,
        lemonsqueezyVariantId: variantId || currentBilling.lemonsqueezyVariantId || null,
        lemonsqueezyPlan: planKey || currentBilling.lemonsqueezyPlan || null,
        lemonsqueezyUpdatedAt: Timestamp.now(),
        lemonsqueezyEndsAt: toTimestampOrNull(endsAt),
        lemonsqueezyRenewsAt: toTimestampOrNull(renewsAt),
        lemonsqueezyTrialEndsAt: toTimestampOrNull(trialEndsAt),
        lemonsqueezyCancelledAt: toTimestampOrNull(cancelledAt),
        lemonsqueezyCancelScheduled: cancellationScheduled,
        accessEmailSentAt: currentBilling.accessEmailSentAt ?? null,
        accessEmailSentTo: currentBilling.accessEmailSentTo ?? null,
        lastAccessEmailOrderId: currentBilling.lastAccessEmailOrderId ?? null,
        cancellationEmailSentAt: currentBilling.cancellationEmailSentAt ?? null,
        cancellationEmailSentTo: currentBilling.cancellationEmailSentTo ?? null,
        lastCancellationEmailSubscriptionId:
          currentBilling.lastCancellationEmailSubscriptionId ?? null,
        cancellationEmailEndsAt: currentBilling.cancellationEmailEndsAt ?? null,
        revenueCatActive,
      },
      checkout: {
        source: customData?.source ?? currentData?.checkout?.source ?? "direct",
        sourcePath: customData?.source_path ?? currentData?.checkout?.sourcePath ?? "",
        plan: planKey,
        planLabel,
        variantId: variantId || currentData?.checkout?.variantId || null,
        status: checkoutStatus,
        completedAt: lemonsqueezyActive
          ? currentData?.checkout?.completedAt ?? Timestamp.now()
          : currentData?.checkout?.completedAt ?? null,
      },
    },
    { merge: true },
  )

  if (shouldSendAccessEmail) {
    try {
      await sendSukaliAccessEmail({
        siteUrl,
        email: accountEmail,
        name: accountName || currentData.displayName || "",
        planLabel,
      })

      console.log(
        "[lemonsqueezy:webhook:access_email_sent]",
        JSON.stringify({
          eventName,
          uid,
          orderId,
          email: accountEmail,
          planLabel,
        }),
      )

      await adminDb.collection("users").doc(uid).set(
        {
          billing: {
            accessEmailSentAt: Timestamp.now(),
            accessEmailSentTo: accountEmail,
            lastAccessEmailOrderId: orderId || null,
          },
        },
        { merge: true },
      )
    } catch (error) {
      console.error(
        "[lemonsqueezy:webhook:access_email_failed]",
        JSON.stringify({
          eventName,
          uid,
          orderId,
          email: accountEmail,
          message: error instanceof Error ? error.message : String(error),
        }),
      )
    }
  }

  if (shouldSendCancellationEmail && endsAt) {
    try {
      await sendSukaliCancellationEmail({
        siteUrl,
        email: accountEmail,
        name: accountName || currentData.displayName || "",
        planLabel,
        accessEndsAt: endsAt,
      })

      console.log(
        "[lemonsqueezy:webhook:cancellation_email_sent]",
        JSON.stringify({
          eventName,
          uid,
          subscriptionId,
          email: accountEmail,
          accessEndsAt: endsAt.toISOString(),
        }),
      )

      await adminDb.collection("users").doc(uid).set(
        {
          billing: {
            cancellationEmailSentAt: Timestamp.now(),
            cancellationEmailSentTo: accountEmail,
            lastCancellationEmailSubscriptionId: subscriptionId || null,
            cancellationEmailEndsAt: Timestamp.fromDate(endsAt),
          },
        },
        { merge: true },
      )
    } catch (error) {
      console.error(
        "[lemonsqueezy:webhook:cancellation_email_failed]",
        JSON.stringify({
          eventName,
          uid,
          subscriptionId,
          email: accountEmail,
          message: error instanceof Error ? error.message : String(error),
        }),
      )
    }
  }

  return NextResponse.json({ ok: true })
}
