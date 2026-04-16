import type { Metadata } from "next"

import MemberSettingsScreen from "@/components/member-settings-screen"
import SiteHeader from "@/components/site-header"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your Sukali account settings and subscription from the web.",
  robots: "noindex, nofollow",
}

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-[#f6f0e6] text-[#1f241d]">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <MemberSettingsScreen />
      </div>
    </main>
  )
}
