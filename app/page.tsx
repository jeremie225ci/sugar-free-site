import SectionHero from "@/components/section-hero"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import StickyDownloadBar from "@/components/StickyDownloadBar"
import Link from "next/link"
import Image from "next/image"
import { getAllRecipes, getImagePath, getTotalSugar } from "@/data"
import { getAllPosts } from "@/data/blog"

export default function Page() {
  const recipes = getAllRecipes().slice(0, 4)
  const posts = getAllPosts().slice(0, 3)
  const featuredRecipe = recipes[0]

  const formatDate = (value: string) =>
    new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })

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
  }

  return (
    <main className="min-h-screen bg-transparent text-[#1f241d]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <SiteHeader />
      <SectionHero />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 max-w-2xl">
            <span className="inline-flex rounded-full border border-[#d8ccb9] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#7b7468] shadow-sm">
              Start here
            </span>
            <h2
              className="mt-5 text-4xl leading-tight text-[#1f241d] md:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Use the site in three clear ways.
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#5f5a51]">
              The site should help people move from curiosity to action, not overwhelm them with loud promises.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Link
              href="/blog"
              className="card-hover group overflow-hidden rounded-[32px] border border-[#ddd1c1] bg-[#fffaf2] shadow-[0_18px_40px_rgba(52,41,22,0.06)]"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={posts[0].image}
                  alt={posts[0].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#7b7468]">Journal</p>
                <h3
                  className="mt-3 text-2xl text-[#1f241d] group-hover:text-[#5c7f57]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Read calm, practical writing.
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#5f5a51]">
                  Articles on cravings, skin, labels, and the real-life friction of cutting sugar.
                </p>
                <p className="mt-6 text-sm font-semibold text-[#1f241d]">Open the journal</p>
              </div>
            </Link>

            <Link
              href="/food"
              className="card-hover group overflow-hidden rounded-[32px] border border-[#ddd1c1] bg-[#fffaf2] shadow-[0_18px_40px_rgba(52,41,22,0.06)]"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={getImagePath(featuredRecipe.image_id)}
                  alt={featuredRecipe.recipe_name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#7b7468]">Recipes</p>
                <h3
                  className="mt-3 text-2xl text-[#1f241d] group-hover:text-[#5c7f57]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Start with food that feels doable.
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#5f5a51]">
                  Keep the routine grounded with sugar-aware meals that do not feel like punishment food.
                </p>
                <p className="mt-6 text-sm font-semibold text-[#1f241d]">Browse recipes</p>
              </div>
            </Link>

            <a
              href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover group overflow-hidden rounded-[32px] border border-[#ddd1c1] bg-[#1f241d] text-[#fffaf2] shadow-[0_18px_40px_rgba(52,41,22,0.1)]"
            >
              <div className="relative aspect-[16/10] bg-[#161410]">
                <Image
                  src="/assets/images/blog-images/sukali-app-scan.jpg"
                  alt="Sukali app meal scan screen"
                  fill
                  className="object-cover opacity-90"
                />
              </div>
              <div className="p-6">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#c8bba8]">App</p>
                <h3
                  className="mt-3 text-2xl group-hover:text-[#dce9d7]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Use the app when you need daily support.
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#d7cec2]">
                  Scan meals, keep a day-zero photo, and make the invisible part of progress feel visible again.
                </p>
                <p className="mt-6 text-sm font-semibold text-[#fffaf2]">Download Sukali</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e2d7ca] bg-white/45 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full border border-[#d8ccb9] bg-[#fffaf2] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#7b7468] shadow-sm">
                Journal
              </span>
              <h2
                className="mt-5 text-4xl leading-tight text-[#1f241d] md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Recent articles, without the AI-template energy.
              </h2>
              <p className="mt-4 text-lg leading-8 text-[#5f5a51]">
                Writing on sugar, cravings, food labels, and what tends to change first when people stay consistent.
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden rounded-full border border-[#d3c7b8] bg-[#fffaf2] px-6 py-3 text-sm font-semibold text-[#1f241d] hover:border-[#5c7f57] hover:text-[#5c7f57] md:inline-flex"
            >
              Open the journal
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card-hover group overflow-hidden rounded-[30px] border border-[#ddd1c1] bg-[#fffaf2] shadow-[0_18px_40px_rgba(52,41,22,0.06)]"
              >
                <article className="h-full">
                  <div className="relative aspect-[16/10]">
                    <Image src={post.image} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-[#7b7468]">
                      <span>{post.category}</span>
                      <span className="h-1 w-1 rounded-full bg-[#bcae9a]" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <h3
                      className="mt-3 line-clamp-2 text-2xl leading-snug text-[#1f241d] group-hover:text-[#5c7f57]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#5f5a51]">
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
              className="inline-flex rounded-full border border-[#d3c7b8] bg-[#fffaf2] px-6 py-3 text-sm font-semibold text-[#1f241d] hover:border-[#5c7f57] hover:text-[#5c7f57]"
            >
              Open the journal
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full border border-[#d8ccb9] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#7b7468] shadow-sm">
                Recipes
              </span>
              <h2
                className="mt-5 text-4xl leading-tight text-[#1f241d] md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Recipes that make the sugar-free part feel normal.
              </h2>
              <p className="mt-4 text-lg leading-8 text-[#5f5a51]">
                Use the recipe library when you want fewer decisions, less sugar, and meals that still feel generous.
              </p>
            </div>
            <Link
              href="/food"
              className="hidden rounded-full border border-[#d3c7b8] bg-white px-6 py-3 text-sm font-semibold text-[#1f241d] hover:border-[#5c7f57] hover:text-[#5c7f57] md:inline-flex"
            >
              Browse recipes
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {recipes.map((recipe) => (
              <Link
                key={recipe.slug}
                href={`/food/${recipe.slug}`}
                className="card-hover group overflow-hidden rounded-[30px] border border-[#ddd1c1] bg-[#fffaf2] shadow-[0_18px_40px_rgba(52,41,22,0.06)]"
              >
                <article>
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={getImagePath(recipe.image_id)}
                      alt={recipe.recipe_name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="rounded-full bg-[#1f241d] px-2.5 py-1 text-xs font-semibold text-[#fffaf2]">
                        {getTotalSugar(recipe)}g
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3
                      className="text-xl leading-snug text-[#1f241d] group-hover:text-[#5c7f57]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {recipe.recipe_name}
                    </h3>
                    <p className="mt-2 text-sm text-[#5f5a51]">
                      Sugar-aware recipe idea for everyday cooking.
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/food"
              className="inline-flex rounded-full border border-[#d3c7b8] bg-white px-6 py-3 text-sm font-semibold text-[#1f241d] hover:border-[#5c7f57] hover:text-[#5c7f57]"
            >
              Browse recipes
            </Link>
          </div>
        </div>
      </section>

      <section id="download" className="pb-20 pt-4 md:pb-24">
        <div className="mx-auto max-w-5xl px-4">
          <div className="overflow-hidden rounded-[40px] bg-[#1f241d] px-8 py-10 text-center text-[#fffaf2] shadow-[0_30px_80px_rgba(55,43,23,0.18)] md:px-12 md:py-14">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/8">
              <span className="text-2xl font-semibold text-[#dce9d7]">S</span>
            </div>
            <h2
              className="mx-auto mt-6 max-w-3xl text-4xl leading-tight md:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Keep the site calm. Let the app handle the daily friction.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#d7cec2]">
              Sukali is strongest when it helps with the moments that usually derail people: hidden sugar, routine fatigue, and the feeling that progress is too slow to notice.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                target="_blank"
                rel="noopener noreferrer"
                className="glow-button inline-flex items-center gap-2 rounded-full bg-[#fffaf2] px-8 py-4 text-lg font-semibold text-[#1f241d]"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Download for iPhone
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=app.sukali"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-lg font-semibold text-[#fffaf2] hover:border-[#dce9d7]"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
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
    </main>
  )
}
