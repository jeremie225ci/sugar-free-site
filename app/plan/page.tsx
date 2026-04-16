import { Suspense } from "react"
import type { Metadata } from "next"

import WebMemberApp from "@/components/web-member-app"

export const metadata: Metadata = {
  title: "Your Plan",
  description: "Access your Sukali premium plan on the web.",
  robots: "noindex, nofollow",
}

export default function PlanPage() {
  return (
    <Suspense fallback={null}>
      <WebMemberApp />
    </Suspense>
  )
}
