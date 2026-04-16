"use client"

import { useEffect } from "react"

import { getCurrentUserIdToken } from "@/lib/auth-client"

type AccessEmailSyncProps = {
  enabled: boolean
}

export default function AccessEmailSync({ enabled }: AccessEmailSyncProps) {
  useEffect(() => {
    if (!enabled) return

    let cancelled = false

    async function syncAccessEmail() {
      try {
        const idToken = await getCurrentUserIdToken()

        if (cancelled) return

        await fetch("/api/member/access-email", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        })
      } catch {
        // Keep the UI silent; this is only a delivery fallback.
      }
    }

    void syncAccessEmail()

    return () => {
      cancelled = true
    }
  }, [enabled])

  return null
}
