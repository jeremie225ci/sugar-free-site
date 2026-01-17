import Image from "next/image"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import StickyDownloadBar from "@/components/StickyDownloadBar"
import AppPromoPopup from "@/components/AppPromoPopup"

export default function IntermittentFastingPage() {
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
                        Intermittent Fasting: The Complete Beginner Guide
                    </h1>
                    <p className="text-xl text-[#8E8E93] mb-8">
                        I thought fasting meant starving myself. Then I tried intermittent fasting and realized I had been doing it wrong my whole life. Here is everything you need to know.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-[#8E8E93] mb-8">
                        <span>Sukali Team</span>
                        <span>•</span>
                        <span>January 17, 2026</span>
                        <span>•</span>
                        <span>14 min read</span>
                    </div>

                    <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
                        <Image
                            src="/assets/images/blog-images/intermittent-fasting.png"
                            alt="Intermittent fasting clock with healthy foods"
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
                            I had tried every diet imaginable. Low carb, low fat, calorie counting, meal replacements. Nothing stuck. Then a friend mentioned intermittent fasting and I thought it sounded extreme. Stop eating for 16 hours? I can barely go 4 hours without a snack.
                        </p>

                        <p className="text-[#c4c4c4] text-lg mb-8">
                            But I tried it anyway. Within a week, I understood why so many people swear by it. It was not about starving myself. It was about giving my body time to do what it naturally wants to do. If you have ever been curious about intermittent fasting, here is everything I wish I knew before I started.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">What Is Intermittent Fasting?</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Intermittent fasting is not a diet. It is an eating pattern. You are not changing what you eat. You are changing when you eat. The idea is simple. You cycle between periods of eating and periods of fasting.
                        </p>

                        <p className="text-[#c4c4c4] mb-6">
                            Humans have actually been fasting throughout history. Our ancestors did not have refrigerators, supermarkets, or food available 24/7. Sometimes food was scarce and humans evolved to function without it for extended periods.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            The modern idea that we need to eat every few hours to keep our metabolism running is actually backwards. Your body functions incredibly well during a fast. In many ways, it functions better.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">The Different Methods</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            There are several popular ways to do intermittent fasting. The best one is whichever fits your lifestyle.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">16:8 Method.</strong> This is the most popular and the one I use. You fast for 16 hours and eat during an 8-hour window. Most people skip breakfast and eat from noon to 8pm. You are asleep for most of the fasting period which makes it easier than it sounds.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">5:2 Method.</strong> You eat normally five days a week. On two non-consecutive days, you restrict calories to 500-600. This is not true fasting but it achieves similar effects.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Eat-Stop-Eat.</strong> You do a full 24-hour fast once or twice per week. This is more advanced and most people start with 16:8 before attempting this.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">OMAD (One Meal A Day).</strong> You eat all your daily calories in a single meal. This is the most extreme form and definitely not for beginners.
                        </p>

                        <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6 mb-8">
                            <h3 className="text-xl font-bold text-white mb-3">Track Your Fasting and Food</h3>
                            <p className="text-[#c4c4c4] mb-4">
                                The Sukali app helps you find hidden sugars in foods and provides 100 plus sugar-free recipes perfect for breaking your fast.
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

                        <h2 className="text-3xl font-bold text-white mb-6">What Happens During a Fast</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            When you stop eating, several things happen in your body.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Insulin drops.</strong> When you eat, especially carbohydrates and sugar, your insulin spikes. Between meals, it drops. During a fast, insulin stays low for extended periods. This allows your body to access stored fat for energy.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Human growth hormone increases.</strong> Studies show that fasting can increase HGH by as much as 5 times. This hormone helps with fat loss and muscle gain.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Cellular repair happens.</strong> When you are not digesting food, your body can focus on cleaning up. Cells remove waste material and repair damage. This process is called autophagy.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Gene expression changes.</strong> Fasting triggers changes in genes related to longevity and disease protection. This is one reason intermittent fasting is associated with longer lifespan in studies.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Benefits of Intermittent Fasting</h2>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Weight loss.</strong> By limiting your eating window, you naturally eat fewer calories. You also have low insulin for longer periods, which means your body burns fat instead of storing it. Most people lose weight on intermittent fasting without counting calories.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Mental clarity.</strong> Many people report feeling sharper and more focused during a fast. Without the blood sugar fluctuations from constant eating, your brain gets a steady supply of energy from ketones.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">More energy.</strong> This sounds counterintuitive but fasting gives you energy. Your body is not spending resources digesting food. You are running on clean-burning fat instead of a sugar rollercoaster.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Simplicity.</strong> You do not have to plan, prepare, or think about as many meals. Life gets simpler when you are not constantly eating or thinking about eating.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Reduced inflammation.</strong> Studies show that fasting reduces markers of inflammation in the body. This may explain why it helps with conditions from arthritis to acne.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">How to Start</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            The best way to start is gradually. Do not jump straight into a 16-hour fast if you currently eat every few hours.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Week 1: Delay breakfast.</strong> Just push your first meal back by an hour or two. If you normally eat at 7am, try 9am. This is a 12-hour fast and most people can do it easily.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Week 2: Push to 14 hours.</strong> Have your last meal by 8pm and your first meal at 10am. You will start feeling the benefits at this point.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Week 3: Aim for 16 hours.</strong> Finish eating by 8pm and break your fast at noon. This is the sweet spot for most people.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Drink plenty of water.</strong> During your fast, you can have water, black coffee, and plain tea. These do not break your fast. Stay hydrated because hunger is often actually thirst.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">What to Eat When You Break Your Fast</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Intermittent fasting works best when combined with good nutrition. You can technically eat anything during your eating window, but what you eat affects how you feel.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Start with something gentle.</strong> After 16 hours of fasting, do not hit your stomach with a huge meal. Start with something light like vegetables, soup, or a small portion of protein.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Prioritize protein.</strong> Protein keeps you full and helps preserve muscle mass. Aim for protein at every meal during your eating window.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Include healthy fats.</strong> Fats provide sustained energy and help you stay full longer. Avocados, nuts, olive oil, and fatty fish are excellent choices.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Minimize sugar.</strong> Sugar spikes insulin and makes you hungry again quickly. It also makes fasting harder because sugar cravings carry over. The less sugar you eat during your eating window, the easier fasting becomes.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Common Mistakes</h2>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Eating too much during your window.</strong> Just because you fasted does not mean you can eat unlimited food. If you consume 3000 calories in 8 hours, you will not lose weight.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Not drinking enough water.</strong> Dehydration causes headaches and fatigue that people blame on fasting. Drink water throughout your fasting period.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Starting too aggressively.</strong> Jumping straight into 20-hour fasts makes the whole thing feel miserable. Build up gradually.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Giving up after one bad day.</strong> Some days are harder than others. One difficult fast does not mean the whole approach is wrong. Give it at least two weeks before deciding if it works for you.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Who Should Not Fast</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Intermittent fasting is safe for most healthy adults, but some people should avoid it or consult a doctor first.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Pregnant or breastfeeding women.</strong> You need consistent nutrition for your baby.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">People with eating disorders.</strong> Fasting can trigger unhealthy patterns.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Diabetics on medication.</strong> Fasting affects blood sugar and may require medication adjustments.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Underweight individuals.</strong> If you need to gain weight, fasting is not appropriate.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">The Bottom Line</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Intermittent fasting is one of the simplest approaches to improving your health. You do not need to buy special foods, count calories, or follow complex rules. You just eat during certain hours and fast during others.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            Start with the 16:8 method, build up gradually, stay hydrated, and eat quality food during your eating window. Give it two weeks. Most people find that once they adapt, they never want to go back to eating all day long.
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-3">Ready to Start Fasting?</h3>
                                <p className="text-[#8E8E93] mb-6 max-w-lg mx-auto">
                                    Download Sukali to find sugar-free foods for breaking your fast and get 100 plus healthy recipes.
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
                title="Starting Intermittent Fasting?"
                description="Find sugar-free foods to break your fast and get 100+ healthy recipes in the Sukali app."
            />
        </main>
    )
}
