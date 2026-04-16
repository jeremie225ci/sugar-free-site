import SiteFooter from "@/components/site-footer"
import SiteHeader from "@/components/site-header"
import StickyDownloadBar from "@/components/StickyDownloadBar"
import LoginPageContent from "@/components/login-page-content"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-transparent text-[#1f241d]">
      <SiteHeader />
      <section className="pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="mx-auto max-w-4xl px-4">
          <LoginPageContent />
        </div>
      </section>
      <SiteFooter />
      <StickyDownloadBar />
    </main>
  )
}
