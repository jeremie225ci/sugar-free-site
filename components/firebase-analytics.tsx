"use client"

import { useEffect } from "react"
import { getClientAnalytics, getClientFirebase } from "@/lib/firebase"

export default function FirebaseAnalytics() {
  useEffect(() => {
    // Ensure app is initialized; then try analytics (if supported)
    getClientFirebase()
    getClientAnalytics().catch(() => {})
  }, [])
  return null
} 