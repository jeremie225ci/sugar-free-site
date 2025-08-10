export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, message } = body ?? {}

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ ok: false, error: "Missing fields" }), { status: 400 })
    }

    // Persist to Firestore (server-side) using Firebase Admin
    const { adminDb, Timestamp } = await import("@/lib/firebase-admin")
    const doc = {
      name,
      email,
      message,
      createdAt: Timestamp.now(),
      userAgent: req.headers.get("user-agent") ?? null,
      ip: req.headers.get("x-forwarded-for") ?? null,
    }
    await adminDb.collection("contact_messages").add(doc)

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: "Invalid request" }), { status: 400 })
  }
}
