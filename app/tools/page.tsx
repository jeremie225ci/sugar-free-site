import Link from "next/link"

import SiteFooter from "@/components/site-footer"
import SiteHeader from "@/components/site-header"
import StickyDownloadBar from "@/components/StickyDownloadBar"

const tools = [
  {
    href: "/quiz",
    label: "Sugar Pattern Quiz",
    type: "Assessment",
    description: "Quick top-of-funnel tool for cravings, crashes, and sugar friction.",
  },
  {
    href: "/blog/bmi-calculator-women",
    label: "BMI Calculator",
    type: "Calculator",
    description: "Existing calculator with strong conversion potential into the broader Sukali funnel.",
  },
  {
    href: "/blog/maintenance-calorie-calculator",
    label: "Maintenance Calories",
    type: "Calculator",
    description: "Useful if you want more practical nutrition intent than a pure article page.",
  },
  {
    href: "/start",
    label: "Web Onboarding",
    type: "Conversion flow",
    description: "The new route that turns SEO traffic into a saved account, checkout, and app handoff.",
  },
]

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-transparent text-[#1f241d]">
      <SiteHeader />
      <section className="pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="mx-auto max-w-5xl px-4">
          <span className="inline-flex rounded-full border border-[#d8ccb9] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#7b7468] shadow-sm">
            Tools
          </span>
          <h1
            className="mt-5 text-5xl leading-tight text-[#1f241d] md:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Free tools that should keep people on the site longer.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#5f5a51]">
            This page gives Sukali one place for quizzes, calculators, and the new web onboarding flow instead of scattering them across isolated article pages.
          </p>

          <div className="mt-10 grid gap-5">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="card-hover rounded-[30px] border border-[#ddd1c1] bg-[#fffaf2] p-6 shadow-[0_18px_40px_rgba(52,41,22,0.06)]"
              >
                <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-[#7b7468]">
                  <span>{tool.type}</span>
                </div>
                <h2
                  className="mt-3 text-3xl text-[#1f241d]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {tool.label}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#5f5a51]">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
      <StickyDownloadBar />
    </main>
  )
}
