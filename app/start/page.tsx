import SiteFooter from "@/components/site-footer"
import SiteHeader from "@/components/site-header"
import StickyDownloadBar from "@/components/StickyDownloadBar"
import WebOnboardingFlow from "@/components/web-onboarding-flow"

type StartPageProps = {
  searchParams?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>
}

export default async function StartPage({ searchParams }: StartPageProps) {
  const params =
    searchParams && typeof (searchParams as Promise<unknown>).then === "function"
      ? await (searchParams as Promise<Record<string, string | string[] | undefined>>)
      : (searchParams ?? {})
  const source = typeof params.source === "string" ? params.source : "direct"
  const from = typeof params.from === "string" ? params.from : "/start"
  const resume = typeof params.resume === "string" ? params.resume : ""

  return (
    <main className="min-h-screen bg-transparent text-[#1f241d]">
      <SiteHeader />
      <WebOnboardingFlow source={source} sourcePath={from} resume={resume} />
      <SiteFooter />
      <StickyDownloadBar />
    </main>
  )
}
