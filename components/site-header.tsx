"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Apple, Smartphone, FileText, Mail } from "lucide-react"
import LanguageSwitcher from "./language-switcher"
import { useI18n } from "./i18n-provider"

export default function SiteHeader({}: {}) {
  const [open, setOpen] = useState(false)
  const { t, locale } = useI18n()
  const hideHome = locale === "es" || locale === "pt"

  const nav = [
    ...(!hideHome ? [{ href: "/", label: t("nav.home") }] : []),
    { href: "/#features", label: t("nav.features") },
    { href: "/#download", label: t("nav.download") },
    { href: "/contact", label: t("nav.contact") },
    { href: "/legal/privacy-policy", label: t("nav.privacy") },
    { href: "/legal/terms", label: t("nav.terms") },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-3 sm:h-16 sm:px-4">
        {/* Marca: solo logo, sin texto visible */}
        <Link href="/" className="flex items-center gap-0">
          <Image
            src="/images/logo.png"
            alt="SugarFree logo"
            width={32}
            height={32}
            priority
            className="h-7 w-7 rounded-md sm:h-8 sm:w-8"
          />
          <span className="sr-only">{t("appName")}</span>
        </Link>

        {/* Nav desktop grande */}
        <nav className={`hidden items-center gap-3 whitespace-nowrap lg:flex ${hideHome ? "lg:-ml-8 xl:-ml-10" : ""}`}>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <div className={`${hideHome ? "ml-0" : "ml-1"} flex items-center gap-2`}>
            <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/#download">
                <Apple className="mr-2 size-4" />
                {t("cta.ios")}
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="/#download">
                <Smartphone className="mr-2 size-4" />
                {t("cta.android")}
              </Link>
            </Button>
            <LanguageSwitcher />
          </div>
        </nav>

        {/* CTAs compactos en tablet/portátil */}
        <div className="hidden items-center gap-2 md:flex lg:hidden">
          <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            <Link href="/#download">
              <Apple className="mr-2 size-4" />
              {t("cta.ios")}
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href="/#download">
              <Smartphone className="mr-2 size-4" />
              {t("cta.android")}
            </Link>
          </Button>
          <LanguageSwitcher />
        </div>

        {/* Menú móvil */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader className="text-left">
                <SheetTitle>{t("appName")}</SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex flex-col gap-3">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                    <Link href="/#download">
                      <Apple className="mr-2 size-4" />
                      {t("cta.ios")}
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/#download">
                      <Smartphone className="mr-2 size-4" />
                      {t("cta.android")}
                    </Link>
                  </Button>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="size-4" />
                  <span>{t("footer.legal")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="size-4" />
                  <span>{t("nav.contact")}</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
