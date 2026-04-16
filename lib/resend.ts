const RESEND_API_URL = "https://api.resend.com/emails"

function getResendApiKey() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY")
  }
  return apiKey
}

export function getResendFromEmail() {
  return process.env.RESEND_FROM_EMAIL || "Sukali <onboarding@resend.dev>"
}

export async function sendTransactionalEmail(params: {
  to: string
  subject: string
  html: string
  text: string
}) {
  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getResendApiKey()}`,
      "Content-Type": "application/json",
      "User-Agent": "sukali-site/1.0",
    },
    body: JSON.stringify({
      from: getResendFromEmail(),
      to: [params.to],
      subject: params.subject,
      html: params.html,
      text: params.text,
    }),
  })

  if (!response.ok) {
    const payload = await response.text()
    throw new Error(`Resend request failed: ${payload}`)
  }

  return response.json()
}
