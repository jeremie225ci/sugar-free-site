import Link from "next/link"
import Image from "next/image"
import { useI18n } from "./i18n-provider"

export default function SiteFooter({}: {}) {
  const { t } = useI18n()
  return (
    <footer className="border-t">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="SugarFree logo" width={24} height={24} className="rounded" />
              <span className="text-sm font-semibold">{t("appName")}</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{t("hero.subtitle")}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">{t("footer.links")}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/#features" className="text-muted-foreground hover:text-foreground">
                  {t("nav.features")}
                </Link>
              </li>
              <li>
                <Link href="/#download" className="text-muted-foreground hover:text-foreground">
                  {t("nav.download")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">{t("footer.legal")}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/legal/privacy-policy" className="text-muted-foreground hover:text-foreground">
                  {t("nav.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-muted-foreground hover:text-foreground">
                  {t("nav.terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {t("appName")}. {t("footer.allRights")}
        </div>
      </div>
    </footer>
  )
}
