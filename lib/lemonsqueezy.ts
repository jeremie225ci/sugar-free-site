import crypto from "node:crypto"

export type LemonPlanKey = "monthly" | "yearly"

export type LemonCheckoutPayload = {
  uid: string
  email: string
  name?: string
  source?: string
  sourcePath?: string
  plan?: LemonPlanKey
  planLabel?: string
  siteUrl?: string
}

export type ResolvedLemonPlan = {
  key: LemonPlanKey
  variantId: string
  label: string
}

export type LemonOrderLookup = {
  id: string
  orderNumber: string
  email: string
  name: string
  status: string
  createdAt: string
  customerId: string
  variantId: string
  productName: string
}

export type LemonSubscriptionPortalLookup = {
  subscriptionId: string
  status: string
  customerPortalUrl: string
  updatePaymentMethodUrl: string
  customerId: string
  endsAt: string
  renewsAt: string
}

export type LemonSubscriptionLookup = {
  id: string
  customerId: string
  orderId: string
  email: string
  name: string
  status: string
  variantId: string
  createdAt: string
  customerPortalUrl: string
  updatePaymentMethodUrl: string
  customerPortalUpdateSubscriptionUrl: string
  endsAt: string
  renewsAt: string
}

function normalizeEnvValue(value: string | undefined) {
  const trimmed = value?.trim() ?? ""

  if (
    trimmed.length >= 2 &&
    ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'")))
  ) {
    return trimmed.slice(1, -1).trim()
  }

  return trimmed
}

function required(name: string) {
  const value = normalizeEnvValue(process.env[name])
  if (!value) {
    throw new Error(`Missing required env var: ${name}`)
  }
  return value
}

function optional(name: string) {
  return normalizeEnvValue(process.env[name])
}

function maskIdentifier(value: string) {
  if (!value) return "(empty)"
  if (value.length <= 6) return "*".repeat(value.length)
  return `${value.slice(0, 3)}…${value.slice(-3)}`
}

function getLemonHeaders() {
  return {
    Accept: "application/vnd.api+json",
    Authorization: `Bearer ${required("LEMONSQUEEZY_API_KEY")}`,
  }
}

export function getLemonConfig() {
  return {
    apiKey: required("LEMONSQUEEZY_API_KEY"),
    storeId: required("LEMONSQUEEZY_STORE_ID"),
    legacyVariantId: optional("LEMONSQUEEZY_VARIANT_ID"),
    monthlyVariantId: optional("LEMONSQUEEZY_MONTHLY_VARIANT_ID"),
    yearlyVariantId: optional("LEMONSQUEEZY_YEARLY_VARIANT_ID"),
    webhookSecret: normalizeEnvValue(process.env.LEMONSQUEEZY_WEBHOOK_SECRET),
    siteUrl: normalizeEnvValue(process.env.NEXT_PUBLIC_SITE_URL) || "https://www.sugar-frees.com",
    testMode: normalizeEnvValue(process.env.LEMONSQUEEZY_TEST_MODE).toLowerCase() === "true",
  }
}

export function resolveLemonPlan(plan: LemonPlanKey = "monthly"): ResolvedLemonPlan {
  const config = getLemonConfig()

  if (plan === "monthly" && config.monthlyVariantId) {
    return {
      key: "monthly",
      variantId: config.monthlyVariantId,
      label: "Sukali Premium Monthly",
    }
  }

  if (plan === "yearly" && config.yearlyVariantId) {
    return {
      key: "yearly",
      variantId: config.yearlyVariantId,
      label: "Sukali Premium Yearly",
    }
  }

  if (config.legacyVariantId) {
    return {
      key: plan,
      variantId: config.legacyVariantId,
      label: plan === "yearly" ? "Sukali Premium Yearly" : "Sukali Premium Monthly",
    }
  }

  throw new Error(
    plan === "yearly"
      ? "Missing required env var: LEMONSQUEEZY_YEARLY_VARIANT_ID"
      : "Missing required env var: LEMONSQUEEZY_MONTHLY_VARIANT_ID",
  )
}

export async function createHostedCheckout(payload: LemonCheckoutPayload) {
  const config = getLemonConfig()
  const resolvedPlan = resolveLemonPlan(payload.plan ?? "monthly")
  const baseSiteUrl = payload.siteUrl?.trim() || config.siteUrl
  const successUrl = new URL("/checkout/success", baseSiteUrl)
  successUrl.searchParams.set("source", payload.source ?? "direct")
  successUrl.searchParams.set("plan", resolvedPlan.key)

  const cancelUrl = new URL("/start", baseSiteUrl)
  if (payload.source) cancelUrl.searchParams.set("source", payload.source)
  if (payload.sourcePath) cancelUrl.searchParams.set("from", payload.sourcePath)
  cancelUrl.searchParams.set("plan", resolvedPlan.key)

  const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
    method: "POST",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            email: payload.email,
            name: payload.name ?? "",
            custom: {
              firebase_uid: payload.uid,
              account_email: payload.email,
              account_name: payload.name ?? "",
              source: payload.source ?? "direct",
              source_path: payload.sourcePath ?? "",
              plan_key: resolvedPlan.key,
              plan_label: payload.planLabel ?? resolvedPlan.label,
              variant_id: resolvedPlan.variantId,
            },
          },
          checkout_options: {
            embed: false,
            media: true,
            logo: true,
          },
          product_options: {
            redirect_url: successUrl.toString(),
            receipt_link_url: successUrl.toString(),
          },
          test_mode: config.testMode,
        },
        relationships: {
          store: {
            data: { type: "stores", id: config.storeId },
          },
          variant: {
            data: { type: "variants", id: resolvedPlan.variantId },
          },
        },
      },
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Lemon Squeezy checkout creation failed: ${response.status} ${errorText} (plan=${resolvedPlan.key}, store=${maskIdentifier(config.storeId)}, variant=${maskIdentifier(resolvedPlan.variantId)}, testMode=${String(config.testMode)})`,
    )
  }

  const json = await response.json()
  const checkoutUrl = json?.data?.attributes?.url as string | undefined

  if (!checkoutUrl) {
    throw new Error("Lemon Squeezy did not return a checkout URL")
  }

  return {
    checkoutUrl,
    plan: resolvedPlan,
  }
}

export async function listRecentLemonOrders() {
  const response = await fetch("https://api.lemonsqueezy.com/v1/orders?page[size]=20&sort=-createdAt", {
    headers: getLemonHeaders(),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Lemon Squeezy order lookup failed: ${response.status} ${errorText}`)
  }

  const json = await response.json()
  const rows = Array.isArray(json?.data) ? json.data : []

  return rows.map((row: any): LemonOrderLookup => ({
    id: String(row?.id ?? ""),
    orderNumber: String(row?.attributes?.order_number ?? ""),
    email: String(row?.attributes?.user_email ?? "").trim().toLowerCase(),
    name: String(row?.attributes?.user_name ?? "").trim(),
    status: String(row?.attributes?.status ?? "").trim().toLowerCase(),
    createdAt: String(row?.attributes?.created_at ?? ""),
    customerId: String(row?.attributes?.customer_id ?? ""),
    variantId: String(row?.attributes?.first_order_item?.variant_id ?? ""),
    productName: String(row?.attributes?.first_order_item?.product_name ?? ""),
  }))
}

function pickString(...values: unknown[]) {
  for (const value of values) {
    const normalized = String(value ?? "").trim()
    if (normalized) return normalized
  }

  return ""
}

export async function getSubscriptionPortal(subscriptionId: string): Promise<LemonSubscriptionPortalLookup> {
  const normalizedSubscriptionId = String(subscriptionId ?? "").trim()

  if (!normalizedSubscriptionId) {
    throw new Error("Missing Lemon subscription id")
  }

  const response = await fetch(`https://api.lemonsqueezy.com/v1/subscriptions/${normalizedSubscriptionId}`, {
    headers: getLemonHeaders(),
    cache: "no-store",
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Lemon subscription lookup failed: ${response.status} ${errorText}`)
  }

  const json = await response.json()
  const attributes = (json?.data?.attributes ?? {}) as Record<string, any>
  const urls = (attributes.urls ?? {}) as Record<string, any>

  const customerPortalUrl = pickString(
    urls.customer_portal,
    urls.customerPortal,
    urls.customer_portal_url,
    attributes.customer_portal,
    attributes.customerPortal,
    attributes.customer_portal_url,
  )

  const updatePaymentMethodUrl = pickString(
    urls.update_payment_method,
    urls.updatePaymentMethod,
    urls.update_payment_method_url,
    attributes.update_payment_method,
    attributes.updatePaymentMethod,
    attributes.update_payment_method_url,
  )

  return {
    subscriptionId: String(json?.data?.id ?? normalizedSubscriptionId),
    status: String(attributes.status ?? ""),
    customerPortalUrl,
    updatePaymentMethodUrl,
    customerId: String(attributes.customer_id ?? ""),
    endsAt: String(attributes.ends_at ?? ""),
    renewsAt: String(attributes.renews_at ?? ""),
  }
}

export async function listRecentLemonSubscriptions(pageSize = 20): Promise<LemonSubscriptionLookup[]> {
  const response = await fetch(
    `https://api.lemonsqueezy.com/v1/subscriptions?page[size]=${pageSize}&sort=-createdAt`,
    {
      headers: getLemonHeaders(),
      cache: "no-store",
    },
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Lemon subscription list failed: ${response.status} ${errorText}`)
  }

  const json = await response.json()
  const rows = Array.isArray(json?.data) ? json.data : []

  return rows.map((row: any): LemonSubscriptionLookup => {
    const attributes = (row?.attributes ?? {}) as Record<string, any>
    const urls = (attributes.urls ?? {}) as Record<string, any>

    return {
      id: String(row?.id ?? ""),
      customerId: String(attributes.customer_id ?? ""),
      orderId: String(attributes.order_id ?? ""),
      email: String(attributes.user_email ?? "").trim().toLowerCase(),
      name: String(attributes.user_name ?? "").trim(),
      status: String(attributes.status ?? "").trim().toLowerCase(),
      variantId: String(attributes.variant_id ?? ""),
      createdAt: String(attributes.created_at ?? ""),
      customerPortalUrl: String(urls.customer_portal ?? "").trim(),
      updatePaymentMethodUrl: String(urls.update_payment_method ?? "").trim(),
      customerPortalUpdateSubscriptionUrl: String(urls.customer_portal_update_subscription ?? "").trim(),
      endsAt: String(attributes.ends_at ?? ""),
      renewsAt: String(attributes.renews_at ?? ""),
    }
  })
}

export function verifyLemonSignature(rawBody: string, signatureHeader: string | null) {
  const secret = required("LEMONSQUEEZY_WEBHOOK_SECRET")
  const signature = Buffer.from(signatureHeader ?? "", "hex")

  if (signature.length === 0 || rawBody.length === 0) {
    return false
  }

  const digest = Buffer.from(crypto.createHmac("sha256", secret).update(rawBody).digest("hex"), "hex")

  if (digest.length !== signature.length) {
    return false
  }

  return crypto.timingSafeEqual(digest, signature)
}
