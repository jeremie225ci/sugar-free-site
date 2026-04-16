import Link from "next/link"

import AccessEmailSync from "@/components/access-email-sync"
import SiteFooter from "@/components/site-footer"
import SiteHeader from "@/components/site-header"
import StickyDownloadBar from "@/components/StickyDownloadBar"

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-transparent text-[#1f241d]">
      <AccessEmailSync enabled />
      <SiteHeader />
      <section className="pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-[36px] border border-[#ddd1c1] bg-[#fffaf2] p-8 shadow-[0_18px_40px_rgba(52,41,22,0.06)] md:p-10">
            <span className="inline-flex rounded-full border border-[#d8ccb9] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#7b7468] shadow-sm">
              Premium active
            </span>
            <h1
              className="mt-5 text-5xl leading-tight text-[#1f241d] md:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Payment complete. The next step is simple.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#5f5a51]">
              Your payment is complete. You can either open the app with the same login you used on the site, or continue right away on the web with your unlocked plan.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-[24px] border border-[#ddd1c1] bg-white p-5">
                <p className="text-sm font-semibold text-[#1f241d]">1. Download the app</p>
                <p className="mt-2 text-sm leading-7 text-[#5f5a51]">If it is not already installed, get Sukali on iPhone.</p>
              </div>
              <div className="rounded-[24px] border border-[#ddd1c1] bg-white p-5">
                <p className="text-sm font-semibold text-[#1f241d]">2. Access your plan on the web</p>
                <p className="mt-2 text-sm leading-7 text-[#5f5a51]">The same premium account can now open a web version of your plan with the main app sections.</p>
              </div>
              <div className="rounded-[24px] border border-[#ddd1c1] bg-white p-5">
                <p className="text-sm font-semibold text-[#1f241d]">3. Use the same login</p>
                <p className="mt-2 text-sm leading-7 text-[#5f5a51]">Your premium access should follow that account automatically on web and app.</p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/plan"
                className="inline-flex items-center rounded-full bg-[#5c7f57] px-8 py-4 text-base font-semibold text-[#fffaf2]"
              >
                Access my plan on the web
              </Link>
              <a
                href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#1f241d] px-8 py-4 text-base font-semibold text-[#fffaf2]"
              >
                Download Sukali
              </a>
              <Link
                href="/login?next=/plan"
                className="inline-flex items-center rounded-full border border-[#d3c7b8] px-6 py-4 text-sm font-semibold text-[#1f241d]"
              >
                Review login options
              </Link>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
      <StickyDownloadBar />
    </main>
  )
}
