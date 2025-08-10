"use client"

import { Camera, ChefHat, MessageSquare } from "lucide-react"
import Image from "next/image"
import { useI18n } from "./i18n-provider"

export default function FeatureCards({}: {}) {
  const { t } = useI18n()
  const features = [
    {
      title: t("feature.camera.title"),
      desc: t("feature.camera.desc"),
      icon: Camera,
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      title: t("feature.recipes.title"),
      desc: t("feature.recipes.desc"),
      icon: ChefHat,
      color: "bg-orange-100 text-orange-700",
    },
    {
      title: t("feature.ai.title"),
      desc: t("feature.ai.desc"),
      icon: MessageSquare,
      color: "bg-purple-100 text-purple-700",
    },
  ]

  return (
    <section id="features" className="mx-auto w-full max-w-6xl px-3 py-12 md:px-4 md:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("features.title")}</h2>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">{t("features.subtitle")}</p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className={`mb-4 inline-flex size-10 items-center justify-center rounded-xl ${f.color}`}>
              <f.icon className="size-5" />
            </div>
            <h3 className="text-base font-semibold sm:text-lg">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid items-center gap-6 md:grid-cols-2">
        <div className="rounded-2xl border p-3">
          <Image
            src="/images/sugarfree-app-screen.png"
            alt="SugarFree app screen"
            width={414}
            height={896}
            className="mx-auto h-auto w-full max-w-[320px] rounded-xl shadow"
            priority
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold sm:text-2xl">Tips y métricas</h3>
          <p className="mt-2 text-muted-foreground">{t("features.subtitle")}</p>
        </div>
      </div>
    </section>
  )
}
