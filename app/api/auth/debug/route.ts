import { NextRequest, NextResponse } from "next/server"

function maskEmail(email: string) {
  const value = email.trim().toLowerCase()
  const atIndex = value.indexOf("@")

  if (atIndex <= 1) return value

  return `${value.slice(0, 2)}***${value.slice(atIndex)}`
}

function sanitizePayload(payload: Record<string, unknown>) {
  const nextPayload: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(payload)) {
    if (value == null) {
      nextPayload[key] = value
      continue
    }

    if (key.toLowerCase().includes("token")) continue
    if (key.toLowerCase().includes("password")) continue
    if (key.toLowerCase().includes("code")) continue

    if (typeof value === "string" && key.toLowerCase().includes("email")) {
      nextPayload[key] = maskEmail(value)
      continue
    }

    if (typeof value === "object" && !Array.isArray(value)) {
      nextPayload[key] = sanitizePayload(value as Record<string, unknown>)
      continue
    }

    nextPayload[key] = value
  }

  return nextPayload
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>
    const event = String(body.event ?? "unknown")
    const payload =
      typeof body.payload === "object" && body.payload && !Array.isArray(body.payload)
        ? sanitizePayload(body.payload as Record<string, unknown>)
        : {}

    console.log(
      "[auth-debug]",
      JSON.stringify({
        event,
        payload,
        path: request.nextUrl.pathname,
        userAgent: request.headers.get("user-agent") ?? "",
        timestamp: new Date().toISOString(),
      }),
    )

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    console.error("[auth-debug:error]", error?.message ?? "Unknown auth debug error")
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
