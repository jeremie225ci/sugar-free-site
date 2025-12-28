"use client"

import SectionHero from "@/components/section-hero"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import StickyDownloadBar from "@/components/StickyDownloadBar"
import AppPromoPopup from "@/components/AppPromoPopup"
import Link from "next/link"
import Image from "next/image"
import { getAllRecipes, getImagePath, getTotalSugar } from "@/data"
import { getAllPosts } from "@/data/blog"

export default function Page() {
  const recipes = getAllRecipes().slice(0, 6)
  const posts = getAllPosts().slice(0, 3)

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Sukali",
    "operatingSystem": "iOS",
    "applicationCategory": "HealthApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1250"
    }
  };

  return (
    <main className="min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <SiteHeader />
      <SectionHero />

      {/* Dangers of Sugar Section */}
      <section className="bg-black py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The Dangers of Sugar on Your Body
            </h2>
            <p className="text-[#8E8E93] text-lg max-w-2xl mx-auto">
              Sugar is everywhere and its effects are devastating. Discover why you need to quit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#1C1C1E] rounded-3xl border border-[#38383A] p-6 hover:border-[#22c55e] transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-red-500/15 flex items-center justify-center mb-4">
                <span className="text-3xl">🩸</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Diabetes</h3>
              <p className="text-[#8E8E93]">
                Excessive consumption increases the risk of type 2 diabetes by 26%.
              </p>
            </div>

            <div className="bg-[#1C1C1E] rounded-3xl border border-[#38383A] p-6 hover:border-[#22c55e] transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/15 flex items-center justify-center mb-4">
                <span className="text-3xl">😤</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Acne & Skin</h3>
              <p className="text-[#8E8E93]">
                Sugar causes inflammation and promotes skin breakouts.
              </p>
            </div>

            <div className="bg-[#1C1C1E] rounded-3xl border border-[#38383A] p-6 hover:border-[#22c55e] transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/15 flex items-center justify-center mb-4">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Fatigue</h3>
              <p className="text-[#8E8E93]">
                Blood sugar spikes cause energy and concentration crashes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-[#0A0A0A] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Recent Articles
              </h2>
              <p className="text-[#8E8E93]">
                Tips and information to help you quit sugar
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden md:inline-flex px-6 py-3 border border-[#38383A] text-white font-medium rounded-full hover:border-[#22c55e] transition-colors"
            >
              View all articles →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article className="bg-[#1C1C1E] rounded-3xl border border-[#38383A] overflow-hidden hover:border-[#22c55e] transition-colors h-full">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-[#22c55e]/15 text-[#22c55e] text-xs font-medium mb-3">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#22c55e] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-[#8E8E93] text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/blog"
              className="inline-flex px-6 py-3 border border-[#38383A] text-white font-medium rounded-full hover:border-[#22c55e] transition-colors"
            >
              View all articles →
            </Link>
          </div>
        </div>
      </section>

      {/* Recipes Section */}
      <section className="bg-black py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Sugar-Free Recipes
              </h2>
              <p className="text-[#8E8E93]">
                Delicious recipes analyzed for their sugar content
              </p>
            </div>
            <Link
              href="/food"
              className="hidden md:inline-flex px-6 py-3 border border-[#38383A] text-white font-medium rounded-full hover:border-[#22c55e] transition-colors"
            >
              View all recipes →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {recipes.map((recipe) => (
              <Link
                key={recipe.slug}
                href={`/food/${recipe.slug}`}
                className="group"
              >
                <article className="bg-[#1C1C1E] rounded-3xl border border-[#38383A] overflow-hidden hover:border-[#22c55e] transition-colors">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={getImagePath(recipe.image_id)}
                      alt={recipe.recipe_name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 rounded-full bg-black/70 backdrop-blur text-[#22c55e] text-xs font-bold">
                        {getTotalSugar(recipe)}g
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold group-hover:text-[#22c55e] transition-colors line-clamp-1">
                      {recipe.recipe_name}
                    </h3>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/food"
              className="inline-flex px-6 py-3 border border-[#38383A] text-white font-medium rounded-full hover:border-[#22c55e] transition-colors"
            >
              View all recipes →
            </Link>
          </div>
        </div>
      </section>

      {/* App Promo Section - Subtle */}
      <section id="download" className="bg-[#0A0A0A] py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-3xl border border-[#22c55e]/30 p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#22c55e] mb-6">
              <span className="text-black font-bold text-2xl">S</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Scan your meals with the Sukali app
            </h2>
            <p className="text-[#8E8E93] text-lg mb-8 max-w-xl mx-auto">
              Our AI instantly analyzes your meals and tells you exactly how much sugar is hiding on your plate.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                target="_blank"
                rel="noopener noreferrer"
                className="glow-button inline-flex items-center gap-2 px-8 py-4 bg-[#22c55e] text-black font-bold rounded-full text-lg"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Download iOS
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=app.sukali"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[#38383A] text-white font-bold rounded-full text-lg hover:border-[#22c55e] transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                Android
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <StickyDownloadBar />
      <AppPromoPopup />
    </main>
  )
}
