import Image from "next/image"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import StickyDownloadBar from "@/components/StickyDownloadBar"
import AppPromoPopup from "@/components/AppPromoPopup"

export default function ClearSkinDietPage() {
    return (
        <main className="min-h-screen bg-black">
            <SiteHeader />

            <section className="bg-black pt-24 pb-12 md:pt-32 md:pb-16">
                <div className="mx-auto max-w-4xl px-4">
                    <div className="flex items-center gap-2 text-sm mb-4">
                        <Link href="/blog" className="text-[#8E8E93] hover:text-white">
                            Blog
                        </Link>
                        <span className="text-[#8E8E93]">/</span>
                        <span className="text-[#22c55e]">Skin Health</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Clear Skin Diet: Transform Your Skin From Within
                    </h1>
                    <p className="text-xl text-[#8E8E93] mb-8">
                        Tired of acne, breakouts, and dull skin? What you eat matters more than any skincare product. Here is the diet that actually works.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-[#8E8E93] mb-8">
                        <span>Sukali Team</span>
                        <span>•</span>
                        <span>January 13, 2026</span>
                        <span>•</span>
                        <span>11 min read</span>
                    </div>

                    <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
                        <Image
                            src="/assets/images/blog-images/clear-skin-diet.png"
                            alt="Healthy foods for clear skin including salmon, avocado, and leafy greens"
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="bg-[#0A0A0A] py-16 md:py-24">
                <article className="mx-auto max-w-3xl px-4">
                    <div className="prose prose-invert prose-lg max-w-none">

                        <p className="text-[#c4c4c4] text-lg mb-6">
                            I spent years trying every skincare product on the market. Expensive serums, prescription creams, professional treatments. Nothing worked long-term. Then I changed my diet, and within 3 weeks my skin transformed. Here is what I learned about the connection between food and clear skin.
                        </p>

                        <p className="text-[#c4c4c4] text-lg mb-8">
                            This is not about expensive supplements or complicated routines. It is about understanding which foods cause problems, which foods heal, and making simple changes that produce dramatic results.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">The Number One Skin Enemy: Sugar</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            If there is one thing that destroys skin, it is sugar. I am not exaggerating. Sugar causes inflammation, triggers acne, accelerates aging, and makes your face look puffy. Let me explain exactly how.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Glycation</strong> happens when sugar molecules attach to collagen and elastin in your skin. These proteins are what keep your skin firm and elastic. When sugar damages them, they become stiff and dysfunctional. The result is wrinkles and sagging skin that ages you prematurely.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Inflammation</strong> is triggered when sugar spikes your insulin levels. High insulin triggers inflammatory hormones that cause redness, puffiness, and breakouts. This is why your skin looks worse after a weekend of eating junk.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Oil production</strong> increases when insulin is high. More oil means more clogged pores, which means more acne. People who eat more sugar consistently have more acne than those who do not.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Water retention</strong> happens because sugar causes your body to hold onto water. This is why your face looks bloated and puffy, especially in the morning after eating sugary food the night before.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            Within 72 hours of cutting sugar, you can see a difference in skin inflammation. After 2 weeks, many people see a dramatic reduction in acne. After a month, the transformation is undeniable.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Foods That Cause Breakouts</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Based on research and personal experience, these are the worst foods for your skin.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Sugary foods and drinks</strong> are the biggest offenders. Soda, candy, pastries, ice cream, sweetened coffee. Anything with added sugar. These spike your blood sugar rapidly, triggering a cascade of hormones that lead directly to breakouts. Multiple studies show people who consume more sugar have significantly more acne.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Dairy products</strong> contain hormones that can interfere with your own hormone balance. Skim milk is the worst because the processing concentrates these hormones. Many people see dramatic improvement after eliminating dairy for just 2 weeks. If you do not want to give it up entirely, try switching to full-fat versions which seem to be less problematic.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Refined carbohydrates</strong> like white bread, pasta, crackers, and white rice convert to sugar quickly in your body. They cause the same insulin spikes as eating straight sugar. Swap for whole grain versions which digest more slowly.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Processed foods</strong> contain hidden sugars, inflammatory oils, and additives that wreak havoc on skin. Sugar hides behind more than 50 different names on ingredient lists. If you cannot pronounce what is in the food, your skin probably will not thank you for eating it.
                        </p>

                        <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6 mb-8">
                            <h3 className="text-xl font-bold text-white mb-3">Stop Eating Hidden Sugars</h3>
                            <p className="text-[#c4c4c4] mb-4">
                                Hidden sugars in everyday foods damage your skin without you realizing it. Use Sukali to scan any product and see exactly how much sugar is inside. Stop the damage before it happens.
                            </p>
                            <a
                                href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#22c55e] text-black font-bold rounded-full hover:opacity-90"
                            >
                                Download Free
                            </a>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">Foods That Clear Skin</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Now for the good news. These foods actively help your skin look better.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Leafy greens</strong> like spinach, kale, and swiss chard are loaded with vitamins A and K that reduce inflammation and help skin heal. Vitamin A specifically helps regulate oil production. Eat them daily, raw or cooked.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Fatty fish</strong> such as salmon, mackerel, and sardines contain omega-3 fatty acids that reduce inflammation dramatically. Studies show omega-3s significantly reduce acne severity. Aim for fatty fish 2 to 3 times per week.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Avocados</strong> provide healthy fats plus vitamin E, which keeps your skin hydrated and supple from within. The fats in avocado also help you absorb vitamins from other vegetables.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Berries</strong> like blueberries, strawberries, and raspberries are antioxidant powerhouses that fight free radical damage and keep skin youthful. They are also low in sugar compared to other fruits.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Nuts and seeds</strong> including almonds, walnuts, chia seeds, and flaxseeds provide zinc and vitamin E for skin repair and protection. Zinc is especially important for acne-prone skin.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Water</strong> is the most underrated skin treatment. Drink 8 or more glasses daily. Hydrated cells mean plump, glowing skin. Dehydrated cells lead to dull, tired-looking skin that shows every line.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">The 14-Day Clear Skin Protocol</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Here is exactly what to do for 14 days to see a visible difference in your skin.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Days 1 through 3:</strong> Cut all added sugar. Check every label. Eliminate dairy. No alcohol. Drink 3 liters of water daily. This is the detox phase where your body starts clearing out inflammation.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Days 4 through 7:</strong> Eat leafy greens with every meal. Add fatty fish 3 times this week. Snack on berries and nuts. Continue avoiding sugar and dairy. You might notice skin looking a bit worse before it gets better as toxins clear out.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Days 8 through 14:</strong> Notice reduced inflammation and fewer breakouts. Introduce probiotic foods like sauerkraut or kimchi for gut health. Add bone broth for collagen if you want extra benefits. Maintain all healthy habits. By now your skin should be visibly improving.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            After 14 days, you can decide what to reintroduce. Most people find that keeping sugar low permanently gives them the best results.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Why This Works Better Than Products</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Skincare products only treat the surface. Diet treats the root cause. Think about it. Your skin is an organ, and like all organs, it is built from the nutrients you eat. Feed it junk, it looks like junk. Feed it clean whole foods, it glows.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            The most expensive serum in the world cannot undo the damage from a high-sugar diet. But a clean diet can give you better results than any product. For free.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">What to Expect and When</h2>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">3 days:</strong> Reduced puffiness and bloating in your face. The water retention from sugar starts to clear.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">1 week:</strong> Less oiliness, fewer new breakouts starting. Existing acne may still be healing.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">2 weeks:</strong> Existing acne starts healing faster. Skin tone evens out. Redness decreases.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">1 month:</strong> Dramatic improvement. Clearer and more radiant skin. You will start getting compliments.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">3 months:</strong> Transformation complete. People will ask what you are doing differently. Your skin will be the best it has looked in years.
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-3">Start Your Clear Skin Journey Today</h3>
                                <p className="text-[#8E8E93] mb-6 max-w-lg mx-auto">
                                    The 14-day no sugar challenge is the fastest way to clear skin. Download Sukali to track your progress and find sugar-free foods easily.
                                </p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    <a
                                        href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#22c55e] text-black font-bold rounded-full hover:opacity-90"
                                    >
                                        Download on iOS
                                    </a>
                                    <a
                                        href="https://play.google.com/store/apps/details?id=app.sukali"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 border border-[#38383A] text-white font-medium rounded-full hover:border-[#22c55e]"
                                    >
                                        Get it on Android
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </article>
            </section>

            <SiteFooter />
            <StickyDownloadBar />
            <AppPromoPopup
                title="Want Clear, Glowing Skin?"
                description="Sugar causes acne, inflammation, and aging. Scan foods to find hidden sugars damaging your skin."
            />
        </main>
    )
}
