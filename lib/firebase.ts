import { getApps, initializeApp, type FirebaseApp } from "firebase/app"
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics"
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  type Auth,
} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

let app: FirebaseApp | undefined
let analytics: Analytics | undefined
let auth: Auth | undefined
let authPersistenceConfigured = false
let authPersistencePromise: Promise<void> | null = null

export function resolveClientAuthDomain() {
  return process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!
}

export function getClientFirebase() {
  if (!app) {
    const config = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
      authDomain: resolveClientAuthDomain(),
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

export function getClientStorage() {
  if (!app) getClientFirebase()
  return getStorage(app!)
}

export function getClientAuth() {
  if (!app) getClientFirebase()
  auth ??= getAuth(app!)

  if (typeof window !== "undefined" && !authPersistenceConfigured) {
    authPersistenceConfigured = true
    authPersistencePromise ??= setPersistence(auth, browserLocalPersistence)
      .then(() => {})
      .catch(() => {
        authPersistenceConfigured = false
        authPersistencePromise = null
      })
  }

  return auth
}

export async function ensureClientAuthPersistence() {
  const clientAuth = getClientAuth()

  if (typeof window === "undefined") {
    return clientAuth
  }

  if (!authPersistenceConfigured) {
    authPersistenceConfigured = true
    authPersistencePromise ??= setPersistence(clientAuth, browserLocalPersistence)
      .then(() => {})
      .catch(() => {
        authPersistenceConfigured = false
        authPersistencePromise = null
      })
  }

  if (authPersistencePromise) {
    await authPersistencePromise
  }

  return clientAuth
}
