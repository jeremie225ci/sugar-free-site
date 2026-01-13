"use client"

import Link from "next/link"
import Image from "next/image"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import AppPromoPopup from "@/components/AppPromoPopup"
import StickyDownloadBar from "@/components/StickyDownloadBar"

export default function ClearSkinDietPage() {

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Clear Skin Diet: Foods That Transform Your Skin From Within",
        "author": { "@type": "Organization", "name": "Sukali" },
        "datePublished": "2026-01-13"
    }

    return (
        <main className="min-h-screen bg-black">
            <SiteHeader />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />

            {/* Hero Section */}
            <section className="pt-24 pb-12 md:pt-32 md:pb-16 border-b border-[#38383A]">
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <span className="inline-block px-4 py-1 bg-[#22c55e]/10 text-[#22c55e] rounded-full text-sm font-medium mb-6">
                        Skin Health
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Clear Skin Diet: Transform Your Skin From Within
                    </h1>
                    <p className="text-xl text-[#8E8E93] max-w-2xl mx-auto">
                        Tired of acne, breakouts, and dull skin? What you eat matters more than any skincare product. Here's the diet that actually works.
                    </p>
                </div>
            </section>

            {/* Article Content */}
            <article className="py-12 md:py-16">
                <div className="mx-auto max-w-3xl px-4">

                    <div className="prose prose-invert prose-lg max-w-none">

                        <p className="text-xl text-[#c4c4c4] leading-relaxed">
                            I spent years trying every skincare product on the market. Expensive serums, prescription creams, professional treatments - nothing worked long-term. Then I changed my diet, and within 3 weeks my skin transformed. Here's what I learned about the connection between food and clear skin.
                        </p>

                        <h2 className="text-3xl font-bold text-white mt-12 mb-6">The #1 Skin Enemy: Sugar</h2>

                        <p className="text-[#c4c4c4] leading-relaxed">
                            If there's one thing that destroys skin, it's sugar. I'm not exaggerating. Sugar causes inflammation, triggers acne, accelerates aging, and makes your face puffy. Let me explain exactly how:
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#ef4444]/30 p-6 my-8">
                            <h3 className="text-xl font-bold text-[#ef4444] mb-4">How Sugar Damages Your Skin:</h3>
                            <ul className="space-y-3 text-[#c4c4c4]">
                                <li><strong className="text-white">Glycation:</strong> Sugar molecules attach to collagen and elastin, making them stiff and dysfunctional. This causes wrinkles and sagging.</li>
                                <li><strong className="text-white">Inflammation:</strong> Sugar spikes insulin, which triggers inflammatory hormones that cause redness and breakouts.</li>
                                <li><strong className="text-white">Oil Production:</strong> High insulin = more oil production = more clogged pores = more acne.</li>
                                <li><strong className="text-white">Water Retention:</strong> Sugar causes your face to hold water, creating that puffy, bloated look.</li>
                            </ul>
                        </div>

                        <p className="text-[#c4c4c4] leading-relaxed">
                            Within 72 hours of cutting sugar, you can see a difference in skin inflammation. After 2 weeks, many people see a dramatic reduction in acne. After a month? The transformation is undeniable.
                        </p>

                        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Foods That Cause Breakouts</h2>

                        <p className="text-[#c4c4c4] leading-relaxed">
                            Based on research and my personal experience, these are the worst foods for your skin:
                        </p>

                        <h3 className="text-2xl font-bold text-white mt-8 mb-4">1. Sugary Foods & Drinks</h3>
                        <p className="text-[#c4c4c4] leading-relaxed">
                            Soda, candy, pastries, ice cream, sweetened coffee - anything with added sugar. These spike your blood sugar rapidly, triggering a cascade of hormones that lead to breakouts. Studies show people who consume more sugar have significantly more acne.
                        </p>

                        <h3 className="text-2xl font-bold text-white mt-8 mb-4">2. Dairy (Especially Milk)</h3>
                        <p className="text-[#c4c4c4] leading-relaxed">
                            Dairy contains hormones that can interfere with your own hormone balance. Skim milk is the worst because the processing concentrates these hormones. Many people see dramatic improvement after eliminating dairy for just 2 weeks.
                        </p>

                        <h3 className="text-2xl font-bold text-white mt-8 mb-4">3. Refined Carbohydrates</h3>
                        <p className="text-[#c4c4c4] leading-relaxed">
                            White bread, pasta, crackers, white rice - these convert to sugar quickly in your body, causing the same insulin spikes as eating straight sugar. Swap for whole grain versions.
                        </p>

                        <h3 className="text-2xl font-bold text-white mt-8 mb-4">4. Processed Foods</h3>
                        <p className="text-[#c4c4c4] leading-relaxed">
                            Most packaged foods contain hidden sugars, inflammatory oils, and additives that wreak havoc on skin. Check labels - sugar hides behind 56+ names.
                        </p>

                        {/* CTA Box */}
                        <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-8 my-12">
                            <h3 className="text-2xl font-bold text-white mb-4">Want to Find Hidden Sugars in Your Food?</h3>
                            <p className="text-[#c4c4c4] mb-6">
                                Use the Sukali app to scan any food product and instantly see its sugar content. Stop eating skin-damaging sugars without realizing it.
                            </p>
                            <a
                                href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#22c55e] text-black font-bold rounded-full hover:opacity-90"
                            >
                                Download Sukali Free →
                            </a>
                        </div>

                        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Foods That Clear Skin</h2>

                        <p className="text-[#c4c4c4] leading-relaxed">
                            Now for the good news - these foods actively help your skin look better:
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#22c55e]/30 p-6 my-8">
                            <h3 className="text-xl font-bold text-[#22c55e] mb-4">🥬 Leafy Greens</h3>
                            <p className="text-[#c4c4c4]">Spinach, kale, swiss chard - loaded with vitamins A and K that reduce inflammation and help skin heal. Eat them daily.</p>
                        </div>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#22c55e]/30 p-6 my-8">
                            <h3 className="text-xl font-bold text-[#22c55e] mb-4">🐟 Fatty Fish</h3>
                            <p className="text-[#c4c4c4]">Salmon, mackerel, sardines - omega-3 fatty acids reduce inflammation dramatically. Studies show omega-3s significantly reduce acne severity.</p>
                        </div>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#22c55e]/30 p-6 my-8">
                            <h3 className="text-xl font-bold text-[#22c55e] mb-4">🥑 Avocados</h3>
                            <p className="text-[#c4c4c4]">Healthy fats + vitamin E = glowing skin. Avocados help your skin stay hydrated and supple from within.</p>
                        </div>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#22c55e]/30 p-6 my-8">
                            <h3 className="text-xl font-bold text-[#22c55e] mb-4">🫐 Berries</h3>
                            <p className="text-[#c4c4c4]">Blueberries, strawberries, raspberries - antioxidant powerhouses that fight free radical damage and keep skin youthful.</p>
                        </div>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#22c55e]/30 p-6 my-8">
                            <h3 className="text-xl font-bold text-[#22c55e] mb-4">🥜 Nuts & Seeds</h3>
                            <p className="text-[#c4c4c4]">Almonds, walnuts, chia seeds, flaxseeds - zinc and vitamin E for skin repair and protection.</p>
                        </div>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#22c55e]/30 p-6 my-8">
                            <h3 className="text-xl font-bold text-[#22c55e] mb-4">💧 Water</h3>
                            <p className="text-[#c4c4c4]">The most underrated skin treatment. Drink 8+ glasses daily. Hydrated cells = plump, glowing skin.</p>
                        </div>

                        <h2 className="text-3xl font-bold text-white mt-12 mb-6">The 14-Day Clear Skin Protocol</h2>

                        <p className="text-[#c4c4c4] leading-relaxed">
                            Here's exactly what to do for 14 days to see a visible difference in your skin:
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6 my-8">
                            <h3 className="text-xl font-bold text-white mb-4">Days 1-3: Elimination</h3>
                            <ul className="space-y-2 text-[#c4c4c4]">
                                <li>• Cut all added sugar (check every label)</li>
                                <li>• Eliminate dairy</li>
                                <li>• No alcohol</li>
                                <li>• Drink 3 liters of water daily</li>
                            </ul>
                        </div>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6 my-8">
                            <h3 className="text-xl font-bold text-white mb-4">Days 4-7: Rebuild</h3>
                            <ul className="space-y-2 text-[#c4c4c4]">
                                <li>• Eat leafy greens with every meal</li>
                                <li>• Add fatty fish 3x per week</li>
                                <li>• Snack on berries and nuts</li>
                                <li>• Continue avoiding sugar and dairy</li>
                            </ul>
                        </div>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6 my-8">
                            <h3 className="text-xl font-bold text-white mb-4">Days 8-14: Optimize</h3>
                            <ul className="space-y-2 text-[#c4c4c4]">
                                <li>• Notice reduced inflammation and fewer breakouts</li>
                                <li>• Introduce probiotic foods (sauerkraut, kimchi)</li>
                                <li>• Add bone broth for collagen</li>
                                <li>• Maintain all healthy habits</li>
                            </ul>
                        </div>

                        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Why This Works Better Than Products</h2>

                        <p className="text-[#c4c4c4] leading-relaxed">
                            Skincare products only treat the surface. Diet treats the root cause. Think about it - your skin is an organ, and like all organs, it's built from the nutrients you eat. Feed it junk, it looks like junk. Feed it clean, whole foods, it glows.
                        </p>

                        <p className="text-[#c4c4c4] leading-relaxed">
                            The most expensive serum in the world can't undo the damage from a high-sugar diet. But a clean diet can give you better results than any product - for free.
                        </p>

                        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Real Results Timeline</h2>

                        <ul className="space-y-3 text-[#c4c4c4] my-6">
                            <li><strong className="text-white">3 Days:</strong> Reduced puffiness and bloating in face</li>
                            <li><strong className="text-white">1 Week:</strong> Less oiliness, fewer new breakouts</li>
                            <li><strong className="text-white">2 Weeks:</strong> Existing acne starts healing, skin tone evens out</li>
                            <li><strong className="text-white">1 Month:</strong> Dramatic improvement, clearer and more radiant</li>
                            <li><strong className="text-white">3 Months:</strong> Transformation - people will ask what you're doing</li>
                        </ul>

                        {/* Final CTA */}
                        <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-8 my-12 text-center">
                            <h3 className="text-2xl font-bold text-white mb-4">Start Your Clear Skin Journey Today</h3>
                            <p className="text-[#c4c4c4] mb-6">
                                The 14-day no sugar challenge is the fastest way to clear skin. Download Sukali to track your progress and discover sugar-free foods.
                            </p>
                            <div className="flex flex-wrap justify-center gap-3">
                                <a
                                    href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#22c55e] text-black font-bold rounded-full hover:opacity-90"
                                >
                                    Start 14-Day Challenge →
                                </a>
                            </div>
                        </div>

                    </div>

                    {/* Author & Share */}
                    <div className="mt-12 pt-8 border-t border-[#38383A]">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-[#22c55e] flex items-center justify-center">
                                    <span className="text-black font-bold">S</span>
                                </div>
                                <div>
                                    <p className="text-white font-medium">Sukali Team</p>
                                    <p className="text-[#8E8E93] text-sm">Sugar-Free Living Experts</p>
                                </div>
                            </div>
                            <Link href="/blog" className="text-[#22c55e] hover:underline">
                                ← Back to Blog
                            </Link>
                        </div>
                    </div>

                </div>
            </article>

            <AppPromoPopup />
            <StickyDownloadBar />
            <SiteFooter />
        </main>
    )
}
