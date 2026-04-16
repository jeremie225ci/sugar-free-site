import type { Metadata } from "next"

import MemberSettingsScreen from "@/components/member-settings-screen"
import SiteHeader from "@/components/site-header"

export const metadata: Metadata = {
  title: "Manage my subscription",
  description: "Open the secure Sukali subscription manager to cancel or edit your plan.",
  robots: "noindex, nofollow",
}

export default function ManageSubscriptionPage() {
  return (
    <main className="min-h-screen bg-[#f6f0e6] text-[#1f241d]">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <MemberSettingsScreen autoOpenPortal />
      </div>
    </main>
  )
}
