"use client"

import Link from "next/link"
import Image from "next/image"

export default function SectionHero() {
  const ritualPoints = [
    "Read practical sugar-free guidance without the fake wellness tone.",
    "Use recipes that feel normal enough to cook on a weekday.",
    "Start on the site, then unlock the app with the same account when you want scans and visible progress.",
  ]

  return (
    <section className="relative overflow-hidden pb-16 pt-8 md:pb-24 md:pt-14">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[440px] bg-[radial-gradient(circle_at_top_left,rgba(201,122,90,0.16),transparent_36%),radial-gradient(circle_at_78%_12%,rgba(92,127,87,0.18),transparent_28%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="max-w-xl">
            <span className="inline-flex rounded-full border border-[#d8ccb9] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#7b7468] shadow-sm">
              Sukali
            </span>

            <h1
              className="mt-6 text-[clamp(3.3rem,7vw,6.4rem)] leading-[0.94] tracking-[-0.045em] text-[#1f241d]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Quit sugar without turning your life into a punishment.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-[#5f5a51]">
              Sukali is a calmer home for people who want sugar-free guidance, real recipes, and an app that keeps the change visible when motivation starts to wobble.
            </p>

            <div className="mt-8 space-y-3">
              {ritualPoints.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-2xl border border-[#e2d7ca] bg-white/70 px-4 py-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#5c7f57]" />
                  <p className="text-sm leading-6 text-[#4f4a41]">{point}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/start"
                className="glow-button inline-flex items-center justify-center rounded-full bg-[#1f241d] px-8 py-4 text-base font-semibold text-[#fffaf2]"
              >
                Quit sugar now
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center justify-center rounded-full border border-[#d3c7b8] bg-white px-8 py-4 text-base font-semibold text-[#1f241d] hover:border-[#5c7f57] hover:text-[#5c7f57]"
              >
                Explore free tools
              </Link>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-6 text-left">
              <div>
                <div className="text-2xl font-semibold text-[#1f241d]">74+</div>
                <div className="mt-1 text-sm text-[#6b655b]">recipes that feel usable</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-[#1f241d]">30 days</div>
                <div className="mt-1 text-sm text-[#6b655b]">reset path inside Sukali</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-[#1f241d]">Food scan</div>
                <div className="mt-1 text-sm text-[#6b655b]">for hidden sugar moments</div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[620px]">
            <div className="absolute -right-6 top-10 h-40 w-40 rounded-full bg-[#d6e0d1] blur-3xl" />
            <div className="absolute -left-6 bottom-12 h-32 w-32 rounded-full bg-[#ead9ca] blur-3xl" />

            <div className="relative rounded-[34px] border border-[#ddd1c1] bg-[#fffaf2]/95 p-5 shadow-[0_28px_70px_rgba(55,43,23,0.12)]">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.26em] text-[#7b7468]">Inside Sukali</p>
                  <p className="mt-1 text-sm text-[#5f5a51]">A site for onboarding and checkout, an app for daily support.</p>
                </div>
                <span className="rounded-full bg-[#efe5d7] px-3 py-1 text-xs font-medium text-[#5f5a51]">
                  Meals, progress, routine
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-[0.7fr_0.3fr]">
                <div className="rounded-[30px] bg-[#1c1b18] p-3">
                  <div className="relative mx-auto aspect-[9/18] max-w-[240px] overflow-hidden rounded-[28px]">
                    <Image
                      src="/assets/images/blog-images/sukali-app-scan.jpg"
                      alt="Sukali app meal scan"
                      fill
                      sizes="(min-width: 768px) 240px, 70vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="rounded-[24px] border border-[#ded3c6] bg-[#f4ebde] p-4">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#7b7468]">Site-to-app handoff</p>
                    <div className="relative mt-3 aspect-[4/5] overflow-hidden rounded-[18px]">
                      <Image
                        src="/assets/images/blog-images/face-transformation-jawline.png"
                        alt="Example before and after sugar-free facial transformation"
                        fill
                        sizes="(min-width: 768px) 180px, 44vw"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-[#ded3c6] bg-white px-4 py-4">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#7b7468]">Why it sticks</p>
                    <div className="mt-3 space-y-3">
                      <div className="flex items-center justify-between text-sm text-[#4f4a41]">
                        <span>Free tools</span>
                        <span className="font-semibold text-[#1f241d]">rank and convert</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-[#4f4a41]">
                        <span>Web onboarding</span>
                        <span className="font-semibold text-[#1f241d]">stays on-site</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-[#4f4a41]">
                        <span>App unlock</span>
                        <span className="font-semibold text-[#1f241d]">same login, no re-buy</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
