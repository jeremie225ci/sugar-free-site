import type { NextRequest } from "next/server"

import { adminAuth, adminDb } from "@/lib/firebase-admin"

export async function requireMemberUser(request: NextRequest) {
  const authHeader = request.headers.get("authorization") ?? ""
  const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : ""

  if (!idToken) {
    throw new Error("Missing authorization token")
  }

  const decodedToken = await adminAuth.verifyIdToken(idToken)

  return {
    uid: decodedToken.uid,
    decodedToken,
    userRef: adminDb.collection("users").doc(decodedToken.uid),
  }
}
