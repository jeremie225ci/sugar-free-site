"use client"

import SectionHero from "@/components/section-hero"
import FeatureCards from "@/components/feature-cards"
import DownloadButtons from "@/components/download-buttons"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { I18nProvider, useI18n } from "@/components/i18n-provider"

function DownloadSection() {
  const { t } = useI18n()
  return (
    <section id="download" className="mx-auto w-full max-w-6xl px-3 pb-16 md:px-4 md:pb-20">
      <div className="rounded-2xl border bg-muted/30 p-6 text-center sm:p-8">
        <h2 className="text-xl font-semibold sm:text-2xl">{t("download.title")}</h2>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">{t("download.subtitle")}</p>
        <div className="mt-6">
          <DownloadButtons align="center" />
        </div>
      </div>
    </section>
  )
}

export default function Page() {
  return (
    <I18nProvider>
      <main className="min-h-screen">
        <SiteHeader />
        <SectionHero />
        <FeatureCards />
        <DownloadSection />
        <SiteFooter />
      </main>
    </I18nProvider>
  )
}
