"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { useToast } from "@/hooks/use-toast"
import { I18nProvider, useI18n } from "@/components/i18n-provider"
import { getClientDb } from "@/lib/firebase"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"

function ContactForm() {
  const { toast } = useToast()
  const { t } = useI18n()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      // Try server API first (if Admin envs are present). If it fails, fall back to client Firestore write.
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        // Fallback: write directly to Firestore from the client
        const db = getClientDb()
        await addDoc(collection(db, "contact_messages"), {
          ...form,
          createdAt: serverTimestamp(),
          source: "web-client",
        })
      }

      toast({ title: "✓", description: t("contact.sent") })
      setForm({ name: "", email: "", message: "" })
    } catch (e) {
      try {
        // If fetch throws (e.g. network), ensure we still try Firestore client write
        const db = getClientDb()
        await addDoc(collection(db, "contact_messages"), {
          ...form,
          createdAt: serverTimestamp(),
          source: "web-client",
        })
        toast({ title: "✓", description: t("contact.sent") })
        setForm({ name: "", email: "", message: "" })
      } catch (err) {
        toast({ title: "X", description: t("contact.error"), variant: "destructive" })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto w-full max-w-3xl px-3 py-10 md:px-4 md:py-12">
      <h1 className="text-2xl font-bold sm:text-3xl">{t("contact.title")}</h1>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">{t("contact.subtitle")}</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            {t("contact.name")}
          </label>
          <Input
            id="name"
            placeholder={t("contact.placeholder.name")}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            {t("contact.email")}
          </label>
          <Input
            id="email"
            type="email"
            placeholder={t("contact.placeholder.email")}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="text-sm font-medium">
            {t("contact.message")}
          </label>
          <Textarea
            id="message"
            placeholder={t("contact.placeholder.message")}
            className="min-h-[120px]"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <Button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-700">
            {loading ? t("contact.sending") : t("contact.submit")}
          </Button>
          <a
            href={`mailto:hola@sugarfree.app?subject=Contacto&body=${encodeURIComponent(form.message)}`}
            className="text-sm text-muted-foreground underline underline-offset-2"
          >
            {t("contact.emailLink")}
          </a>
        </div>
      </form>
    </section>
  )
}

export default function ContactPage() {
  return (
    <I18nProvider>
      <main>
        <SiteHeader />
        <ContactForm />
        <SiteFooter />
      </main>
    </I18nProvider>
  )
}
