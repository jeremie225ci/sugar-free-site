import { sendTransactionalEmail } from "@/lib/resend"

function formatEndDate(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(value)
}

export async function sendSukaliCancellationEmail(params: {
  siteUrl: string
  email: string
  name?: string
  planLabel: string
  accessEndsAt: Date
}) {
  const settingsUrl = new URL("/settings", params.siteUrl).toString()
  const planUrl = new URL("/plan", params.siteUrl).toString()
  const firstName = params.name?.trim() || "there"
  const accessEndLabel = formatEndDate(params.accessEndsAt)
  const subject = `Your Sukali access ends on ${accessEndLabel}`
  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f6f0e6;color:#1f241d;padding:32px;">
      <div style="max-width:600px;margin:0 auto;background:#fffaf2;border:1px solid #ddd1c1;border-radius:28px;padding:32px;">
        <p style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#7b7468;margin:0 0 16px;">Sukali subscription</p>
        <h1 style="font-family:Georgia,serif;font-size:34px;line-height:1.2;margin:0 0 16px;">Your subscription has been cancelled.</h1>
        <p style="font-size:16px;line-height:1.8;color:#5f5a51;margin:0 0 22px;">Hi ${firstName}, your ${params.planLabel} renewal has been stopped. You will keep access to your Sukali plan until <strong>${accessEndLabel}</strong>.</p>
        <div style="background:#efe6d9;border-radius:22px;padding:18px 20px;margin:0 0 24px;">
          <p style="font-size:14px;line-height:1.7;color:#5f5a51;margin:0;"><strong>Important:</strong> after ${accessEndLabel}, your premium web plan and member access will no longer be available unless you reactivate your subscription.</p>
        </div>
        <div style="margin:0 0 16px;">
          <a href="${settingsUrl}" style="display:inline-block;background:#1f241d;color:#fffaf2;text-decoration:none;padding:14px 22px;border-radius:999px;font-weight:600;margin:0 12px 12px 0;">Open account settings</a>
          <a href="${planUrl}" style="display:inline-block;background:#5c7f57;color:#fffaf2;text-decoration:none;padding:14px 22px;border-radius:999px;font-weight:600;margin:0 12px 12px 0;">Open my plan</a>
        </div>
        <p style="font-size:14px;line-height:1.7;color:#7b7468;margin:0;">If this cancellation was a mistake, you can reopen your billing settings and reactivate your plan before your access end date.</p>
      </div>
    </div>
  `
  const text = `Your Sukali subscription has been cancelled.\n\nYou will keep access to ${params.planLabel} until ${accessEndLabel}.\nAfter that date, your premium plan will no longer be available unless you reactivate it.\n\nSettings: ${settingsUrl}\nPlan: ${planUrl}`

  await sendTransactionalEmail({
    to: params.email,
    subject,
    html,
    text,
  })
}
