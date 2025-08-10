"use client"

import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { I18nProvider, useI18n } from "@/components/i18n-provider"

function Content() {
  const { t } = useI18n()
  return (
    <article className="prose prose-neutral mx-auto w-full max-w-3xl px-3 py-8 dark:prose-invert sm:px-4 sm:py-10">
      <h1>{t("nav.terms")}</h1>
      <p>
        <strong>{t("legal.lastUpdated")}</strong>
      </p>

      <p>{t("terms.intro")}</p>
      <h2>{t("terms.acceptTitle")}</h2>
      <p>{t("terms.accept")}</p>
      <h2>{t("terms.linksTitle")}</h2>
      <p>{t("terms.links")}</p>
      <h2>{t("terms.terminationTitle")}</h2>
      <p>{t("terms.termination")}</p>
      <h2>{t("terms.liabilityTitle")}</h2>
      <p>{t("terms.liability")}</p>
      <h2>{t("terms.disclaimerTitle")}</h2>
      <p>{t("terms.disclaimer")}</p>
      <h2>{t("terms.governingLawTitle")}</h2>
      <p>{t("terms.governingLaw")}</p>
      <p>
        {t("terms.contactPrompt")} <a href="/contact">{t("nav.contact")}</a>.
      </p>
    </article>
  )
}

export default function TermsPage() {
  return (
    <I18nProvider>
      <main>
        <SiteHeader />
        <Content />
        <SiteFooter />
      </main>
    </I18nProvider>
  )
}
