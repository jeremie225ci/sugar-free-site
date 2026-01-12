import Image from "next/image"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import StickyDownloadBar from "@/components/StickyDownloadBar"
import AppPromoPopup from "@/components/AppPromoPopup"

export default function CuttingOutSugarPage() {
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
                        <span className="text-[#22c55e]">Lifestyle</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Cutting Out Sugar: The Complete Guide to Quitting Sugar
                    </h1>
                    <p className="text-xl text-[#8E8E93] mb-8">
                        Ready to cut out sugar? Here is exactly what to expect and how to make it stick.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-[#8E8E93] mb-8">
                        <span>Sukali Team</span>
                        <span>•</span>
                        <span>January 12, 2026</span>
                        <span>•</span>
                        <span>13 min read</span>
                    </div>

                    <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
                        <Image
                            src="/assets/images/blog-images/cutting-out-sugar.png"
                            alt="Choosing healthy foods over sugary treats"
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
                            Cutting out sugar is one of the best things you can do for your health. It is also one of the hardest, at least for the first couple of weeks. But once you get through that initial period, everything changes.
                        </p>

                        <p className="text-[#c4c4c4] text-lg mb-8">
                            This guide will walk you through exactly what happens when you cut out sugar, how to handle the tough parts, and what benefits you can expect on the other side.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Why Cut Out Sugar?</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            You probably already know sugar is not great for you. But understanding exactly why can help motivate you through the difficult moments.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">It is addictive.</strong> Sugar activates the same reward pathways in your brain as drugs like cocaine. This is not an exaggeration. Studies show sugar can be more addictive than some recreational drugs. That is why cutting it out is so hard.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">It causes weight gain.</strong> Sugar provides empty calories that do not fill you up. It spikes insulin, which promotes fat storage. And the blood sugar crashes that follow make you hungry again faster.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">It damages your health.</strong> Excess sugar is linked to type 2 diabetes, heart disease, fatty liver disease, inflammation, and even cognitive decline. The more you eat, the higher your risk.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">It ages you.</strong> Sugar accelerates a process called glycation, which damages collagen and elastin in your skin. People who eat less sugar tend to look younger.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">What Counts as Sugar?</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            When we talk about cutting out sugar, we mean added sugars, not the natural sugars in whole fruits and vegetables. The distinction matters.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Cut these out:</strong>
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            Table sugar, brown sugar, honey, maple syrup, and agave in cooking and drinks. Sodas, fruit juices, sweetened coffee, and energy drinks. Candy, cookies, cakes, ice cream, and desserts. Processed foods with added sugars (check labels).
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">These are fine:</strong>
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            Whole fruits (the fiber makes a difference). Plain dairy (milk has lactose but no added sugar). Vegetables. These contain natural sugars but also fiber, vitamins, and minerals that slow absorption.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">The Timeline: What to Expect</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Knowing what is coming makes it easier to push through. Here is a typical timeline when cutting out sugar:
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Days 1-2:</strong> You might feel fine, even optimistic. The sugar is still in your system. Enjoy this grace period.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Days 3-5:</strong> This is the hard part. Withdrawal symptoms hit: headaches, fatigue, irritability, intense cravings, maybe even flu-like symptoms. Your brain is literally adjusting to life without its favorite drug.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Days 6-10:</strong> Symptoms start to ease. Cravings become more manageable. You might notice your energy stabilizing instead of going up and down.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Days 11-14:</strong> Most people turn a corner here. Cravings diminish significantly. Natural foods start tasting sweeter. You feel noticeably better.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Week 3 and beyond:</strong> This becomes your new normal. Cravings are rare. Energy is stable. You cannot imagine going back.
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6 mb-8">
                            <h3 className="text-xl font-bold text-white mb-4">The 14-Day Challenge</h3>
                            <p className="text-[#c4c4c4] mb-4">
                                Commit to 14 days. That is all it takes to get through the hardest part and start feeling the benefits. After two weeks, you can decide if you want to continue, but most people do.
                            </p>
                            <p className="text-[#c4c4c4]">
                                Two weeks is short enough to be mentally manageable, but long enough to reset your taste buds and break the addiction cycle.
                            </p>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">How to Handle Cravings</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Cravings will happen, especially in the first week. Here is how to get through them:
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Eat enough food.</strong> Do not try to cut sugar and calories at the same time. Eat filling meals with plenty of protein and healthy fats. Hunger makes cravings worse.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Drink water.</strong> Sometimes what feels like a craving is actually thirst. Drink a full glass of water and wait 10 minutes.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Go for a walk.</strong> Physical activity can reduce cravings. Even a 10-minute walk helps.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Have alternatives ready.</strong> Keep berries, dark chocolate (85%+), or nuts on hand. When you need something, reach for these instead.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Ride it out.</strong> Cravings peak and then pass. They usually only last 15-20 minutes. Distract yourself and wait.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">What to Eat Instead</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Cutting out sugar does not mean eating bland, boring food. It means eating real food that actually nourishes you.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Proteins:</strong> Eggs, chicken, fish, beef, tofu, tempeh. Protein keeps you full and stabilizes blood sugar.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Healthy fats:</strong> Avocados, olive oil, nuts, seeds, coconut oil. Fat satisfies hunger and tastes good.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Vegetables:</strong> All of them, in any quantity. Load up on greens, cruciferous vegetables, and colorful produce.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Fruits:</strong> Berries are lowest in sugar. Apples, citrus, and stone fruits are fine in moderation. Eat them whole, not juiced.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Complex carbs:</strong> Sweet potatoes, quinoa, brown rice, oats. These provide sustained energy without the spike.
                        </p>

                        <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6 mb-8">
                            <h3 className="text-xl font-bold text-white mb-3">100+ Sugar-Free Recipes</h3>
                            <p className="text-[#c4c4c4] mb-4">
                                Need meal ideas? The Sukali app has over 100 delicious sugar-free recipes for breakfast, lunch, dinner, and snacks. Plus you can scan any food to check for hidden sugars.
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

                        <h2 className="text-3xl font-bold text-white mb-6">Hidden Sugar Traps</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            The obvious sugary foods are easy to avoid. The hidden ones are trickier. Watch out for:
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Sauces and condiments:</strong> Ketchup, BBQ sauce, teriyaki, pasta sauce, and salad dressings often contain significant sugar.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Bread:</strong> Even "healthy" whole grain bread often has added sugar. Check the label.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Flavored yogurt:</strong> Can have as much sugar as a candy bar. Choose plain and add your own fruit.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Granola and breakfast cereals:</strong> Most are basically candy disguised as health food.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Restaurant food:</strong> Sugar is added to almost everything to enhance flavor. Cook at home when possible.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">The Benefits You Will Notice</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Once you get past the initial withdrawal, the benefits start stacking up:
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Stable energy.</strong> No more 3pm crashes. No more needing sugar to wake up or power through. Just consistent energy all day.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Reduced cravings.</strong> This one is counterintuitive, but true. When you stop eating sugar, you stop craving it. Your taste buds reset.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Clearer skin.</strong> Many people notice improvements in acne, inflammation, and overall skin quality within weeks.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Better sleep.</strong> Blood sugar swings can disrupt sleep. Stable blood sugar means deeper, more restful nights.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Weight loss.</strong> Even without counting calories, most people lose weight when they cut sugar simply because they stop overeating.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Mental clarity.</strong> The brain fog lifts. Thinking becomes sharper. Focus improves.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Common Mistakes to Avoid</h2>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Going too extreme too fast.</strong> If you try to cut sugar, cut carbs, and cut calories all at once, you will probably fail. Focus on sugar first.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Replacing with artificial sweeteners.</strong> These can maintain your sweet tooth and may have their own issues. Use sparingly if at all.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Not eating enough.</strong> Hunger makes everything harder. Eat satisfying meals so you are not fighting cravings on an empty stomach.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Expecting perfection.</strong> If you slip up, do not quit. Just get back on track with your next meal. One mistake does not erase your progress.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">The Bottom Line</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Cutting out sugar is hard for about two weeks. Then it gets dramatically easier. And the benefits, more energy, less weight, clearer skin, better health, are worth every difficult moment.
                        </p>

                        <p className="text-[#c4c4c4] mb-6">
                            Start with a 14-day commitment. Get through those first two weeks and you will see for yourself. Your taste buds will reset, your cravings will fade, and you will feel like a different person.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            The only question is: are you ready to start?
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-3">Start Cutting Out Sugar Today</h3>
                                <p className="text-[#8E8E93] mb-6 max-w-lg mx-auto">
                                    Download Sukali to scan foods for hidden sugars and get 100+ sugar-free recipes. It makes cutting out sugar so much easier.
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
                title="Ready to Cut Out Sugar?"
                description="Scan any food for hidden sugars. Get 100+ sugar-free recipes to make it easy."
            />
        </main>
    )
}
