"use client"

import Image from "next/image"
import DownloadButtons from "./download-buttons"
import { useI18n } from "./i18n-provider"

export default function SectionHero({}: {}) {
  const { t } = useI18n()
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50 to-white" aria-hidden />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-6 px-3 py-10 md:grid-cols-2 md:gap-10 md:px-4 md:py-16">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">{t("hero.title")}</h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">{t("hero.subtitle")}</p>
          <div className="mt-6">
            <DownloadButtons />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{t("comingSoon")}</p>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-xl ring-1 ring-black/10">
            <video
              className="h-full w-full"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/source-3-Fj1RP0MqrgW6lXaUgaHJrdLzCSJNN3.mp4"
              poster="/images/hero-poster.png"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
            />
          </div>
          <div
            className="pointer-events-none absolute -bottom-6 -left-6 -z-10 size-40 rounded-full bg-emerald-200 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-6 -top-6 -z-10 size-40 rounded-full bg-purple-200 blur-3xl"
            aria-hidden
          />
          <div className="sr-only">
            <Image src="/images/sugarfree-app-screen.png" alt="App screen" width={414} height={896} />
          </div>
        </div>
      </div>
    </section>
  )
}
