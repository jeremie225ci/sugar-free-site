"use client"

import Link from "next/link"

export default function SiteFooter() {
  return (
    <footer className="bg-black border-t border-[#38383A] py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#22c55e] flex items-center justify-center">
                <span className="text-black font-bold text-xl">S</span>
              </div>
              <span className="text-white font-bold text-2xl">Sugar Free <span className="text-[#22c55e]">AI</span></span>
            </div>
            <p className="text-[#8E8E93] text-sm max-w-xs">
              Your complete guide to quitting sugar. Recipes, articles, and tips for a healthier life.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-[#8E8E93] hover:text-white text-sm">Home</Link></li>
              <li><Link href="/food" className="text-[#8E8E93] hover:text-white text-sm">Recipes</Link></li>
              <li><Link href="/blog" className="text-[#8E8E93] hover:text-white text-sm">Blog</Link></li>
              <li><Link href="/contact" className="text-[#8E8E93] hover:text-white text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/legal/privacy-policy" className="text-[#8E8E93] hover:text-white text-sm">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="text-[#8E8E93] hover:text-white text-sm">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#38383A] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#8E8E93] text-sm">
            © {new Date().getFullYear()} Sugar Free AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 border border-[#22c55e] text-[#22c55e] font-medium text-sm rounded-full hover:bg-[#22c55e] hover:text-black transition-colors"
            >
              📱 Sukali App
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
