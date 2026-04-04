"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const nav = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Journal" },
    { href: "/food", label: "Recipes" },
    { href: "/quiz", label: "Quiz" },
    { href: "/download", label: "Download" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#dfd2c2] bg-[#f6f0e6]/92 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#dccfbd] bg-white shadow-[0_12px_30px_rgba(54,43,22,0.08)]">
            <span className="text-lg font-semibold text-[#5c7f57]">S</span>
          </div>
          <div className="flex flex-col">
            <span
              className="text-[1.75rem] leading-none text-[#1f241d]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Sukali
            </span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#7b7468]">
              Sugar-free rituals
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#6b655b] hover:text-[#1f241d]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[#cfc2b0] bg-white px-5 py-2.5 text-sm font-semibold text-[#1f241d] shadow-[0_10px_24px_rgba(54,43,22,0.08)] hover:border-[#5c7f57] hover:text-[#5c7f57]"
          >
            Get the app
          </a>
        </div>

        <button
          className="rounded-full border border-[#ddd1c1] bg-white p-2 text-[#1f241d] shadow-sm md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-[#dfd2c2] bg-[#f9f3ea] md:hidden">
          <div className="space-y-4 px-4 py-5">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-2xl bg-white px-4 py-3 text-base font-medium text-[#1f241d] shadow-[0_10px_20px_rgba(54,43,22,0.05)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block w-full rounded-full bg-[#5c7f57] px-5 py-3 text-center font-semibold text-[#fffaf2]"
            >
              Download the app
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
