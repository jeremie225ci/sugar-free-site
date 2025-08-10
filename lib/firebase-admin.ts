import { cert, getApps, initializeApp, type App } from "firebase-admin/app"
import { getFirestore, Timestamp } from "firebase-admin/firestore"

// Lazily initialize Firebase Admin using environment variables.
// Expects the private key to be stored with \n escaped newlines.
function initAdminApp(): App {
  const existing = getApps()[0]
  if (existing) return existing

  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase Admin env vars: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY",
    )
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  })
}

const adminApp = initAdminApp()
export const adminDb = getFirestore(adminApp)
export { Timestamp } 