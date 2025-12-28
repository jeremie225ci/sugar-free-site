"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Apple, Smartphone } from "lucide-react"
import { useI18n } from "./i18n-provider"

export default function DownloadButtons({ align = "left" }: { align?: "left" | "center" }) {
  const { t } = useI18n()
  return (
    <div className={`flex flex-wrap gap-3 ${align === "center" ? "justify-center" : ""}`}>
      <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">
        <Link href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303" aria-label={t("cta.ios")}>
          <Apple className="mr-2 size-5" />
          {t("cta.ios")}
        </Link>
      </Button>
      <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
        <Link href="https://play.google.com/store" aria-label={t("cta.android")}>
          <Smartphone className="mr-2 size-5" />
          {t("cta.android")}
        </Link>
      </Button>
    </div>
  )
}
