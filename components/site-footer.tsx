"use client"

import Link from "next/link"

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#ddcfbe] bg-[#efe6d9] py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d8ccb9] bg-white shadow-[0_12px_30px_rgba(54,43,22,0.08)]">
                <span className="text-xl font-semibold text-[#5c7f57]">S</span>
              </div>
              <div className="flex flex-col">
                <span
                  className="text-[1.9rem] leading-none text-[#1f241d]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Sukali
                </span>
                <span className="text-[11px] uppercase tracking-[0.24em] text-[#7b7468]">
                  Sugar-free rituals
                </span>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-7 text-[#5f5a51]">
              A calmer home for people who want to cut sugar without turning their life into a punishment.
            </p>
            <a
              href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-[#1f241d] px-5 py-3 text-sm font-semibold text-[#fffaf2] hover:bg-[#5c7f57]"
            >
              Download the app
            </a>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#7b7468]">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-[#4f4a41] hover:text-[#5c7f57]">Home</Link></li>
              <li><Link href="/blog" className="text-sm text-[#4f4a41] hover:text-[#5c7f57]">Journal</Link></li>
              <li><Link href="/food" className="text-sm text-[#4f4a41] hover:text-[#5c7f57]">Recipes</Link></li>
              <li><Link href="/quiz" className="text-sm text-[#4f4a41] hover:text-[#5c7f57]">Quiz</Link></li>
              <li><Link href="/contact" className="text-sm text-[#4f4a41] hover:text-[#5c7f57]">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#7b7468]">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/legal/privacy-policy" className="text-sm text-[#4f4a41] hover:text-[#5c7f57]">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="text-sm text-[#4f4a41] hover:text-[#5c7f57]">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#ddcfbe] pt-8 text-center md:flex-row md:text-left">
          <p className="text-sm text-[#5f5a51]">
            © {new Date().getFullYear()} Sukali. Sugar-free guidance for everyday life.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#bcae9a] px-5 py-2 text-sm font-medium text-[#1f241d] hover:border-[#5c7f57] hover:text-[#5c7f57]"
            >
              App Store
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
