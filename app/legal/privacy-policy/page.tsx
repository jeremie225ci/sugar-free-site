"use client"

import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { I18nProvider, useI18n } from "@/components/i18n-provider"

function Content() {
  const { t } = useI18n()

  const useList = ["privacy.use.1", "privacy.use.2", "privacy.use.3", "privacy.use.4", "privacy.use.5", "privacy.use.6"]
  const shareList = ["privacy.share.1", "privacy.share.2", "privacy.share.3", "privacy.share.4", "privacy.share.5"]

  return (
    <article className="prose prose-neutral mx-auto w-full max-w-3xl px-3 py-8 dark:prose-invert sm:px-4 sm:py-10">
      <h1>{t("nav.privacy")}</h1>
      <p>
        <strong>{t("legal.lastUpdated")}</strong>
      </p>

      <p>{t("privacy.intro")}</p>

      <h2>{t("privacy.definitionsTitle")}</h2>
      <p>{t("privacy.definitionsDesc")}</p>

      <h2>{t("privacy.typesTitle")}</h2>
      <h3>{t("privacy.personalDataTitle")}</h3>
      <p>{t("privacy.personalDataDesc")}</p>
      <h3>{t("privacy.usageDataTitle")}</h3>
      <p>{t("privacy.usageDataDesc")}</p>

      <h2>{t("privacy.cookiesTitle")}</h2>
      <p>{t("privacy.cookiesDesc")}</p>

      <h2>{t("privacy.useTitle")}</h2>
      <ul>
        {useList.map((k) => (
          <li key={k}>{t(k)}</li>
        ))}
      </ul>

      <h2>{t("privacy.shareTitle")}</h2>
      <ul>
        {shareList.map((k) => (
          <li key={k}>{t(k)}</li>
        ))}
      </ul>

      <h2>{t("privacy.retentionTitle")}</h2>
      <p>{t("privacy.retentionDesc")}</p>

      <h2>{t("privacy.rightsTitle")}</h2>
      <p>{t("privacy.rightsDesc")}</p>

      <h2>{t("privacy.securityTitle")}</h2>
      <p>{t("privacy.securityDesc")}</p>

      <h2>{t("privacy.childrenTitle")}</h2>
      <p>{t("privacy.childrenDesc")}</p>

      <h2>{t("privacy.linksTitle")}</h2>
      <p>{t("privacy.linksDesc")}</p>

      <h2>{t("privacy.changesTitle")}</h2>
      <p>{t("privacy.changesDesc")}</p>

      <p>
        {t("privacy.contactPrompt")} <a href="/contact">{t("nav.contact")}</a>.
      </p>
    </article>
  )
}

export default function PrivacyPolicyPage() {
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
