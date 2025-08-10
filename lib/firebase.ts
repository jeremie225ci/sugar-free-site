import { getApps, initializeApp, type FirebaseApp } from "firebase/app"
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"

let app: FirebaseApp | undefined
let analytics: Analytics | undefined

export function getClientFirebase() {
  if (!app) {
    const config = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    }
    app = getApps()[0] ?? initializeApp(config)
  }
  return app
}

export async function getClientAnalytics() {
  if (typeof window === "undefined") return undefined
  if (!app) getClientFirebase()
  if (!analytics && (await isSupported().catch(() => false))) {
    analytics = getAnalytics(app!)
  }
  return analytics
}

export function getClientDb() {
  if (!app) getClientFirebase()
  return getFirestore(app!)
} 