"use client"

import Link from "next/link"
import { useState, type ComponentType } from "react"
import {
  BookOpen,
  Download,
  Home,
  LogIn,
  Menu,
  MessageCircle,
  Sparkles,
  UserPlus,
  UtensilsCrossed,
  Wrench,
  X,
} from "lucide-react"

type NavItem = {
  href: string
  label: string
  icon: ComponentType<{ className?: string }>
  description?: string
}

const exploreNav: NavItem[] = [
  { href: "/", label: "Home", icon: Home, description: "Main brand page" },
  { href: "/start", label: "Start", icon: Sparkles, description: "Open the onboarding" },
  { href: "/tools", label: "Tools", icon: Wrench, description: "Free calculators and tests" },
  { href: "/blog", label: "Journal", icon: BookOpen, description: "Science-backed articles" },
  { href: "/food", label: "Recipes", icon: UtensilsCrossed, description: "Sugar-free meal ideas" },
]

const accountNav: NavItem[] = [
  { href: "/login?next=/plan", label: "Sign in", icon: LogIn, description: "Open your web plan" },
  {
    href: "/start?source=signup&from=/signup&resume=checkout",
    label: "Sign up",
    icon: UserPlus,
    description: "Create your account",
  },
  { href: "/contact", label: "Contact", icon: MessageCircle, description: "Talk to the team" },
]

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

        <nav className="hidden items-center gap-4 lg:flex">
          {exploreNav.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[#6b655b] transition hover:bg-white hover:text-[#1f241d]"
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login?next=/plan"
            className="rounded-full border border-[#cfc2b0] bg-white px-5 py-2.5 text-sm font-semibold text-[#1f241d] shadow-[0_10px_24px_rgba(54,43,22,0.08)] hover:border-[#5c7f57] hover:text-[#5c7f57]"
          >
            Sign in
          </Link>
          <Link
            href="/start?source=signup&from=/signup&resume=checkout"
            className="rounded-full border border-[#cfc2b0] bg-white px-5 py-2.5 text-sm font-semibold text-[#1f241d] shadow-[0_10px_24px_rgba(54,43,22,0.08)] hover:border-[#5c7f57] hover:text-[#5c7f57]"
          >
            Sign up
          </Link>
          <Link
            href="/download"
            className="rounded-full border border-[#cfc2b0] bg-white px-5 py-2.5 text-sm font-semibold text-[#1f241d] shadow-[0_10px_24px_rgba(54,43,22,0.08)] hover:border-[#5c7f57] hover:text-[#5c7f57]"
          >
            Download the app
          </Link>
          <Link
            href="/start"
            className="rounded-full bg-[#1f241d] px-5 py-2.5 text-sm font-semibold text-[#fffaf2] shadow-[0_10px_24px_rgba(54,43,22,0.08)] hover:bg-[#5c7f57]"
          >
            Quit sugar now
          </Link>
        </div>

        <button
          className="rounded-full border border-[#ddd1c1] bg-white p-2 text-[#1f241d] shadow-sm md:hidden"
          onClick={() => setMobileMenuOpen((current) => !current)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-[#dfd2c2] bg-[#f9f3ea] md:hidden">
          <div className="space-y-5 px-4 py-5">
            <section>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7b7468]">
                Explore
              </p>
              <div className="grid grid-cols-2 gap-3">
                {exploreNav.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-[24px] border border-[#e3d8c8] bg-white p-4 shadow-[0_12px_24px_rgba(54,43,22,0.06)]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef2e8] text-[#5c7f57]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="mt-4 text-sm font-semibold text-[#1f241d]">{item.label}</p>
                      <p className="mt-1 text-xs leading-5 text-[#7b7468]">{item.description}</p>
                    </Link>
                  )
                })}
              </div>
            </section>

            <section>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7b7468]">
                Account
              </p>
              <div className="space-y-3">
                {accountNav.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 rounded-[22px] border border-[#e3d8c8] bg-white px-4 py-3.5 shadow-[0_12px_24px_rgba(54,43,22,0.06)]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f3eee5] text-[#1f241d]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#1f241d]">{item.label}</p>
                        <p className="text-xs leading-5 text-[#7b7468]">{item.description}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>

            <div className="grid gap-3 pt-1">
              <Link
                href="/start"
                className="block w-full rounded-full bg-[#5c7f57] px-5 py-3 text-center font-semibold text-[#fffaf2]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Quit sugar now
              </Link>
              <Link
                href="/download"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d8ccb9] bg-white px-5 py-3 text-center font-semibold text-[#1f241d]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Download className="h-4 w-4" />
                Download the app
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
