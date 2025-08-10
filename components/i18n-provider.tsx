"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

type Messages = Record<string, string>
type Locale = "en" | "es" | "it" | "pt"

type I18nContextType = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string) => string
  ready: boolean
}

const I18nContext = createContext<I18nContextType | null>(null)

const SUPPORTED: Locale[] = ["en", "es", "it", "pt"]

function normalizeLocale(input?: string): Locale {
  if (!input) return "es"
  const lc = input.toLowerCase()
  for (const l of SUPPORTED) {
    if (lc === l || lc.startsWith(l + "-")) return l
  }
  return "es"
}

async function loadMessages(locale: Locale): Promise<Messages> {
  try {
    const res = await fetch(`/locales/${locale}.json`, { cache: "force-cache" })
    if (!res.ok) throw new Error("not ok")
    return (await res.json()) as Messages
  } catch {
    // Fallback to ES if something goes wrong
    const res = await fetch(`/locales/es.json`, { cache: "force-cache" })
    return (await res.json()) as Messages
  }
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es")
  const [messages, setMessages] = useState<Messages>({})
  const [ready, setReady] = useState(false)

  // Detect device/browser language once
  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("sf_locale") as Locale | null) : null
    const detected = stored ?? normalizeLocale(navigator?.language || (navigator as any)?.userLanguage)
    setLocale(detected)
  }, [])

  // Load messages whenever locale changes
  useEffect(() => {
    let active = true
    setReady(false)
    loadMessages(locale).then((m) => {
      if (!active) return
      setMessages(m)
      setReady(true)
    })
    return () => {
      active = false
    }
  }, [locale])

  // Persist manual overrides
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sf_locale", locale)
      // Update html lang for accessibility/SEO
      document.documentElement.lang = locale
    }
  }, [locale])

  const t = useMemo(() => {
    return (key: string) => messages[key] ?? key
  }, [messages])

  const value = useMemo(() => ({ locale, setLocale, t, ready }), [locale, t, ready])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
