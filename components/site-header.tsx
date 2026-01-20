"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const nav = [
    { href: "/", label: "Home" },
    { href: "/quiz", label: "Quiz" },
    { href: "/food", label: "Recipes" },
    { href: "/blog", label: "Blog" },
    { href: "/download", label: "Download" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#38383A] bg-black/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#22c55e] flex items-center justify-center">
            <span className="text-black font-bold text-lg">S</span>
          </div>
          <span className="text-white font-bold text-xl">Sugar Free <span className="text-[#22c55e]">AI</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[#8E8E93] hover:text-white transition-colors text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA - Subtle */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-[#38383A] text-[#8E8E93] font-medium text-sm rounded-full hover:border-[#22c55e] hover:text-white transition-colors"
          >
            📱 Sukali App
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-[#38383A]">
          <div className="px-4 py-4 space-y-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-white text-lg font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-5 py-3 border border-[#22c55e] text-[#22c55e] font-bold rounded-full mt-4"
            >
              📱 Download Sukali
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
