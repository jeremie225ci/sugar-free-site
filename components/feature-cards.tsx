"use client"

import { getAllRecipes, getImagePath, getTotalSugar, getCategory } from "@/data"
import Image from "next/image"
import Link from "next/link"

export default function FeatureCards() {
  const recipes = getAllRecipes()
  const breakfastRecipes = recipes.filter(r => getCategory(r) === 'breakfast').slice(0, 3)
  const dinnerRecipes = recipes.filter(r => getCategory(r) === 'dinner').slice(0, 3)

  return (
    <section id="features" className="bg-black py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Recipes for Every Moment
          </h2>
          <p className="text-[#8E8E93] max-w-2xl mx-auto">
            Each recipe is analyzed for sugar content and acne risk, so you can make informed choices.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Feature 1 */}
          <div className="bg-[#1C1C1E] rounded-3xl border border-[#38383A] p-6">
            <div className="w-12 h-12 rounded-2xl bg-[#22c55e]/15 flex items-center justify-center mb-4">
              <span className="text-2xl">📸</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">AI Food Scanner</h3>
            <p className="text-[#8E8E93] text-sm">
              Take a photo of any meal. Our AI instantly calculates sugar content and acne risk.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-[#1C1C1E] rounded-3xl border border-[#38383A] p-6">
            <div className="w-12 h-12 rounded-2xl bg-[#22c55e]/15 flex items-center justify-center mb-4">
              <span className="text-2xl">🔥</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Daily Streaks</h3>
            <p className="text-[#8E8E93] text-sm">
              Build healthy habits with streak tracking. Stay motivated on your sugar-free journey.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#1C1C1E] rounded-3xl border border-[#38383A] p-6">
            <div className="w-12 h-12 rounded-2xl bg-[#22c55e]/15 flex items-center justify-center mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Clear Skin Tips</h3>
            <p className="text-[#8E8E93] text-sm">
              Personalized advice based on your diet. See how food affects your skin health.
            </p>
          </div>
        </div>

        {/* Recipe Categories */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Breakfast */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">🌅 Breakfast</h3>
              <Link href="/food?category=breakfast" className="text-[#22c55e] text-sm font-medium">
                View all →
              </Link>
            </div>
            <div className="space-y-3">
              {breakfastRecipes.map(recipe => (
                <Link
                  key={recipe.slug}
                  href={`/food/${recipe.slug}`}
                  className="flex items-center gap-4 bg-[#1C1C1E] rounded-2xl p-3 border border-[#38383A] hover:border-[#22c55e] transition-colors"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={getImagePath(recipe.image_id)}
                      alt={recipe.recipe_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">{recipe.recipe_name}</p>
                    <p className="text-[#8E8E93] text-xs">{recipe.total_time} min</p>
                  </div>
                  <span className="text-[#22c55e] text-sm font-medium">{getTotalSugar(recipe)}g</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Dinner */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">🍽️ Dinner</h3>
              <Link href="/food?category=dinner" className="text-[#22c55e] text-sm font-medium">
                View all →
              </Link>
            </div>
            <div className="space-y-3">
              {dinnerRecipes.map(recipe => (
                <Link
                  key={recipe.slug}
                  href={`/food/${recipe.slug}`}
                  className="flex items-center gap-4 bg-[#1C1C1E] rounded-2xl p-3 border border-[#38383A] hover:border-[#22c55e] transition-colors"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={getImagePath(recipe.image_id)}
                      alt={recipe.recipe_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">{recipe.recipe_name}</p>
                    <p className="text-[#8E8E93] text-xs">{recipe.total_time} min</p>
                  </div>
                  <span className="text-[#22c55e] text-sm font-medium">{getTotalSugar(recipe)}g</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
