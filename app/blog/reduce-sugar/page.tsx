import Image from "next/image"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import StickyDownloadBar from "@/components/StickyDownloadBar"
import AppPromoPopup from "@/components/AppPromoPopup"

export default function ReduceSugarPage() {
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
                        <span className="text-[#22c55e]">Diet Guide</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Reduce Sugar: Simple Steps That Actually Work
                    </h1>
                    <p className="text-xl text-[#8E8E93] mb-8">
                        You do not need willpower. You need a strategy. Here are practical ways to reduce sugar without feeling deprived or miserable.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-[#8E8E93] mb-8">
                        <span>Sukali Team</span>
                        <span>•</span>
                        <span>January 18, 2026</span>
                        <span>•</span>
                        <span>10 min read</span>
                    </div>

                    <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
                        <Image
                            src="/assets/images/blog-images/reduce-sugar.png"
                            alt="Reducing sugar from your diet"
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
                            I tried to quit sugar cold turkey multiple times. Every time I failed. The cravings were too intense, and I would end up bingeing on candy or ice cream within a week. Then I tried a different approach. Instead of eliminating sugar overnight, I gradually reduced it. That made all the difference.
                        </p>

                        <p className="text-[#c4c4c4] text-lg mb-8">
                            If you want to reduce sugar but past attempts have failed, these strategies will help you succeed without the suffering.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Why Reducing Sugar Is So Hard</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Sugar is not just a habit. It is physically addictive. Studies show that sugar activates the same reward pathways in the brain as cocaine. When you eat sugar, dopamine floods your brain, creating pleasure. Over time, you need more sugar to get the same effect.
                        </p>

                        <p className="text-[#c4c4c4] mb-6">
                            When you suddenly stop eating sugar, your brain protests. You get cravings, headaches, irritability, and fatigue. This is withdrawal. It is real, and it is why most people fail when they try to quit sugar abruptly.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            The solution is to reduce sugar gradually. Your brain adjusts slowly, cravings decrease over time, and the entire process becomes manageable.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Step 1: Know Where Sugar Hides</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            The first step to reduce sugar is knowing where it is. Sugar hides in foods you would never expect.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Bread.</strong> A single slice can contain 3-4 grams of added sugar.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Sauces.</strong> Ketchup, BBQ sauce, and marinara are loaded with sugar. Some have more sugar per serving than candy.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Yogurt.</strong> Flavored yogurts often contain 20+ grams of sugar per container.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Granola and cereals.</strong> Most breakfast cereals are basically candy marketed as health food.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Drinks.</strong> Juice, smoothies, sports drinks, and coffee beverages are among the biggest sugar sources in most diets.
                        </p>

                        <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6 mb-8">
                            <h3 className="text-xl font-bold text-white mb-3">Scan Foods for Hidden Sugar</h3>
                            <p className="text-[#c4c4c4] mb-4">
                                73 percent of packaged foods contain added sugar under 60+ different names. Use Sukali to scan any product and see the truth.
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

                        <h2 className="text-3xl font-bold text-white mb-6">Step 2: Reduce Sugary Drinks First</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Liquid calories are the easiest to eliminate because they do not make you feel full. A single soda contains 39 grams of sugar. That is more than a day is worth.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Week 1:</strong> Replace one sugary drink per day with water or sparkling water.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Week 2:</strong> Replace half your sugary drinks.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Week 3:</strong> Drink only water, black coffee, or unsweetened tea.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            This single change can eliminate 50-100+ grams of sugar per day for some people.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Step 3: Fix Breakfast</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Most breakfast foods are sugar bombs. Cereal, pastries, flavored yogurt, pancakes with syrup. Starting your day with sugar sets you up for cravings all day.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Good breakfast options:</strong> Eggs, avocado, plain Greek yogurt with berries, oatmeal without added sugar, or just skip breakfast entirely.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            When you start your day with protein and fat instead of sugar, cravings throughout the day decrease significantly.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Step 4: Make Smart Swaps</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            You do not have to give up everything you love. You just need to find lower-sugar alternatives.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Instead of candy:</strong> Dark chocolate (85%+ cacao) or fresh berries.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Instead of ice cream:</strong> Frozen bananas blended, or sugar-free ice cream.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Instead of flavored yogurt:</strong> Plain Greek yogurt with a few berries.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Instead of soda:</strong> Sparkling water with lemon or lime.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Instead of store-bought sauces:</strong> Make your own or choose low-sugar versions.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Step 5: Eat More Protein and Fat</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Sugar cravings often come from unstable blood sugar. When you eat carbs and sugar, your blood sugar spikes and then crashes. The crash triggers cravings.
                        </p>

                        <p className="text-[#c4c4c4] mb-6">
                            Protein and healthy fats stabilize blood sugar. They keep you feeling full longer and reduce the intensity of cravings.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            At every meal, include a source of protein like eggs, meat, fish, or legumes. Add healthy fats like avocado, olive oil, or nuts. This combination keeps cravings at bay.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Step 6: Handle Cravings</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Cravings will happen, especially in the first two weeks. Here is how to handle them.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Wait 15 minutes.</strong> Most cravings pass within 15-20 minutes. Distract yourself with a walk, call a friend, or drink water.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Eat something else.</strong> Sometimes cravings are just hunger. Eat some protein or a handful of nuts.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Drink water.</strong> Thirst often masquerades as sugar cravings.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Get enough sleep.</strong> Sleep deprivation increases sugar cravings dramatically. Prioritize 7-8 hours.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">What to Expect</h2>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Days 1-3:</strong> Cravings peak. You may feel irritable, tired, or headachy. This is normal withdrawal.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Days 4-7:</strong> Cravings start to decrease. Energy begins to improve.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Week 2:</strong> You will notice food tastes sweeter. Things that used to taste normal now seem too sweet.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Week 3-4:</strong> Cravings become occasional rather than constant. Your taste buds have adjusted.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">The Bottom Line</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Reducing sugar is not about willpower. It is about strategy. Start with drinks, fix breakfast, make smart swaps, and eat enough protein and fat. Handle cravings when they come and be patient with the process.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            Within a few weeks, your cravings will decrease, your energy will increase, and you will wonder why you ever ate so much sugar in the first place. The benefits are worth the temporary discomfort of adjustment.
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-3">Start Reducing Sugar Today</h3>
                                <p className="text-[#8E8E93] mb-6 max-w-lg mx-auto">
                                    Download Sukali to scan foods for hidden sugars and find 100 plus sugar-free alternatives for your favorite foods.
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
                title="Want to Reduce Sugar?"
                description="Scan any food to find hidden sugars. Get 100+ sugar-free recipes to make cutting sugar easy."
            />
        </main>
    )
}
