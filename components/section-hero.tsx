"use client"

import Link from "next/link"
import Image from "next/image"
import { getAllRecipes, getImagePath, getTotalSugar } from "@/data"

export default function SectionHero() {
  const recipes = getAllRecipes().slice(0, 4)

  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-24">
      {/* Green glow effect */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#22c55e]/20 blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content - SEO Optimized */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#22c55e]/15 text-[#22c55e] text-sm font-medium mb-6">
              🚫 Stop Sugar
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Quit Sugar:<br />
              <span className="text-[#22c55e]">The Complete Guide</span>
            </h1>

            <p className="text-lg text-[#8E8E93] mb-8 max-w-md">
              Discover the dangers of sugar and how to break free. 74+ sugar-free recipes, expert articles, and practical tips for a healthier life.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#22c55e]">74+</div>
                <div className="text-xs md:text-sm text-[#8E8E93]">Recipes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#22c55e]">0g</div>
                <div className="text-xs md:text-sm text-[#8E8E93]">Added Sugar</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#22c55e]">100%</div>
                <div className="text-xs md:text-sm text-[#8E8E93]">Free</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/blog"
                className="glow-button inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#22c55e] text-black font-bold rounded-full text-lg"
              >
                📖 Read Articles
              </Link>
              <Link
                href="/food"
                className="inline-flex items-center justify-center px-8 py-4 border border-[#38383A] text-white font-bold rounded-full text-lg hover:border-[#22c55e] transition-colors"
              >
                🍽️ View Recipes
              </Link>
            </div>
          </div>

          {/* Right - Recipe Preview Cards */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {recipes.map((recipe, i) => (
                <Link
                  key={recipe.slug}
                  href={`/food/${recipe.slug}`}
                  className={`relative rounded-3xl overflow-hidden bg-[#1C1C1E] border border-[#38383A] transition-transform hover:scale-105 ${i === 0 ? 'col-span-2 aspect-[2/1]' : 'aspect-square'
                    }`}
                >
                  <Image
                    src={getImagePath(recipe.image_id)}
                    alt={recipe.recipe_name}
                    fill
                    className="object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-semibold text-sm line-clamp-1">{recipe.recipe_name}</p>
                    <span className="text-[#22c55e] text-xs">{getTotalSugar(recipe)}g sugar</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
