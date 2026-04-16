import { sendTransactionalEmail } from "@/lib/resend"

const IOS_APP_URL = "https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=app.sukali"

export async function sendSukaliAccessEmail(params: {
  siteUrl: string
  email: string
  name?: string
  planLabel: string
}) {
  const webPlanUrl = new URL("/plan", params.siteUrl).toString()
  const firstName = params.name?.trim() || "there"
  const subject = "Your Sukali plan is ready"
  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f6f0e6;color:#1f241d;padding:32px;">
      <div style="max-width:600px;margin:0 auto;background:#fffaf2;border:1px solid #ddd1c1;border-radius:28px;padding:32px;">
        <p style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#7b7468;margin:0 0 16px;">Sukali premium</p>
        <h1 style="font-family:Georgia,serif;font-size:34px;line-height:1.2;margin:0 0 16px;">Your plan is active.</h1>
        <p style="font-size:16px;line-height:1.8;color:#5f5a51;margin:0 0 22px;">Hi ${firstName}, your ${params.planLabel} access is now live. Download the app, then sign in with the same Google account or email you used on the site to open your plan.</p>
        <div style="background:#efe6d9;border-radius:22px;padding:18px 20px;margin:0 0 24px;">
          <p style="font-size:14px;line-height:1.7;color:#5f5a51;margin:0;"><strong>Important:</strong> do not buy again in the app. Just use the same login and your access should unlock there.</p>
        </div>
        <div style="margin:0 0 16px;">
          <a href="${webPlanUrl}" style="display:inline-block;background:#5c7f57;color:#fffaf2;text-decoration:none;padding:14px 22px;border-radius:999px;font-weight:600;margin:0 12px 12px 0;">Access my plan on the web</a>
          <a href="${IOS_APP_URL}" style="display:inline-block;background:#1f241d;color:#fffaf2;text-decoration:none;padding:14px 22px;border-radius:999px;font-weight:600;margin:0 12px 12px 0;">Download on iPhone</a>
          <a href="${PLAY_STORE_URL}" style="display:inline-block;background:#ffffff;color:#1f241d;text-decoration:none;padding:14px 22px;border-radius:999px;font-weight:600;border:1px solid #d8ccb9;margin:0 12px 12px 0;">Download on Android</a>
        </div>
        <p style="font-size:14px;line-height:1.7;color:#7b7468;margin:0;">If you already have the app, open it and choose the sign-in option instead of purchasing again. If you want to start right away on the web, use the web plan button above.</p>
      </div>
    </div>
  `
  const text = `Your Sukali plan is active.\n\nAccess your plan on the web: ${webPlanUrl}\n\nDownload the app:\niPhone: ${IOS_APP_URL}\nAndroid: ${PLAY_STORE_URL}\n\nThen sign in with the same Google account or email you used on the site. Do not buy again in the app.`

  await sendTransactionalEmail({
    to: params.email,
    subject,
    html,
    text,
  })
}
