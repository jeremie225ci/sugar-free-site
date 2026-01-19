import Image from "next/image"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import StickyDownloadBar from "@/components/StickyDownloadBar"
import AppPromoPopup from "@/components/AppPromoPopup"

export default function SymptomsOfTooMuchSugarPage() {
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
                        <span className="text-[#22c55e]">Health</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Symptoms of Too Much Sugar in Your Body: 15 Warning Signs
                    </h1>
                    <p className="text-xl text-[#8E8E93] mb-8">
                        Your body is constantly sending you signals. These are the symptoms that tell you sugar is causing damage behind the scenes.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-[#8E8E93] mb-8">
                        <span>Sukali Team</span>
                        <span>•</span>
                        <span>January 20, 2026</span>
                        <span>•</span>
                        <span>12 min read</span>
                    </div>

                    <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
                        <Image
                            src="/assets/images/blog-images/symptoms-of-too-much-sugar.png"
                            alt="Symptoms of too much sugar in the body"
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
                            I did not think I had a sugar problem. I was not overweight. I did not eat candy every day. But I had this constant fatigue, brain fog, and my skin kept breaking out. When I finally tracked my sugar intake, I was shocked. I was eating 80+ grams of sugar daily without realizing it. Hidden in bread, sauces, yogurt, and drinks.
                        </p>

                        <p className="text-[#c4c4c4] text-lg mb-8">
                            Once I cut sugar, every single symptom disappeared within two weeks. Here are the warning signs that your body is overloaded with sugar.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">1. Constant Fatigue</h2>

                        <p className="text-[#c4c4c4] mb-8">
                            This is the most common symptom. Sugar gives you a quick burst of energy followed by a crash. When you eat sugar throughout the day, you ride a rollercoaster of energy spikes and crashes. The result is feeling tired all the time, even after sleeping 8 hours. If you need caffeine to function and crash every afternoon, sugar is likely the cause.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">2. Intense Cravings</h2>

                        <p className="text-[#c4c4c4] mb-8">
                            Sugar is addictive. The more you eat, the more you want. If you constantly crave sweets, carbs, or feel like you need something sweet after every meal, your body has become dependent on sugar. These cravings are not about willpower. They are a biological response to sugar addiction.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">3. Brain Fog</h2>

                        <p className="text-[#c4c4c4] mb-8">
                            Sugar causes inflammation in the brain and disrupts the stable glucose supply your brain needs to function. If you have trouble concentrating, forget things easily, or feel mentally cloudy, excess sugar could be the reason. Many people report dramatic improvements in mental clarity within days of cutting sugar.
                        </p>

                        <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6 mb-8">
                            <h3 className="text-xl font-bold text-white mb-3">Track Your Sugar Intake</h3>
                            <p className="text-[#c4c4c4] mb-4">
                                Most people underestimate how much sugar they eat. Use Sukali to scan any food and discover hidden sugars causing your symptoms.
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

                        <h2 className="text-3xl font-bold text-white mb-6">4. Skin Breakouts</h2>

                        <p className="text-[#c4c4c4] mb-8">
                            Sugar spikes insulin, which triggers oil production and inflammation in your skin. If you have acne, especially along your jawline and cheeks, sugar is often the culprit. Many people see their skin clear up completely within two weeks of cutting sugar.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">5. Weight Gain (Especially Belly Fat)</h2>

                        <p className="text-[#c4c4c4] mb-8">
                            Excess sugar gets stored as fat, particularly around your midsection. If you are gaining weight despite exercising, or if you carry most of your weight in your belly, high sugar intake is a likely cause. Belly fat is the most dangerous type because it surrounds your organs.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">6. Frequent Hunger</h2>

                        <p className="text-[#c4c4c4] mb-8">
                            Sugar does not satisfy hunger. It spikes blood sugar, then crashes, leaving you hungry again within an hour or two. If you feel hungry all the time even after eating, or if you need to snack constantly, your diet is probably too high in sugar.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">7. Mood Swings</h2>

                        <p className="text-[#c4c4c4] mb-8">
                            Blood sugar spikes and crashes directly affect your mood. High sugar intake is linked to irritability, anxiety, and depression. If your mood fluctuates throughout the day, especially getting cranky before meals, sugar instability is the cause.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">8. Puffy Face</h2>

                        <p className="text-[#c4c4c4] mb-8">
                            Sugar causes inflammation and water retention. This shows up most visibly in your face. If your face looks puffy, bloated, or swollen, especially in the morning, excess sugar could be responsible. Many people notice their face slims down within days of cutting sugar.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">9. Bloating and Digestive Issues</h2>

                        <p className="text-[#c4c4c4] mb-8">
                            Sugar feeds harmful bacteria in your gut, causing gas, bloating, and irregular bowel movements. If you feel bloated after eating or have digestive issues, reducing sugar often provides quick relief.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">10. Frequent Illness</h2>

                        <p className="text-[#c4c4c4] mb-8">
                            Sugar suppresses your immune system. Studies show that consuming sugar reduces your white blood cells' ability to kill bacteria by up to 50% for hours after eating. If you catch every cold going around, high sugar intake may be weakening your immune defenses.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">11. Joint Pain</h2>

                        <p className="text-[#c4c4c4] mb-8">
                            Sugar causes inflammation throughout your body, including your joints. If you have unexplained aches and pains, stiffness in the morning, or joint issues that seem to get worse, sugar-related inflammation could be the cause.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">12. Cavities and Dental Problems</h2>

                        <p className="text-[#c4c4c4] mb-8">
                            This one is obvious but often ignored. Sugar feeds the bacteria in your mouth that cause cavities. If you have frequent dental issues despite brushing and flossing, your sugar intake is too high.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">13. Poor Sleep</h2>

                        <p className="text-[#c4c4c4] mb-8">
                            Sugar affects sleep quality even if it does not keep you awake. High sugar intake is associated with lighter, less restorative sleep. If you wake up tired even after sleeping enough hours, sugar may be disrupting your sleep cycles.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">14. Dark Circles Under Eyes</h2>

                        <p className="text-[#c4c4c4] mb-8">
                            Sugar dehydrates your skin and breaks down collagen. This shows up as dark circles and bags under your eyes. Many people notice their under-eye area improves significantly after reducing sugar.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">15. Premature Aging</h2>

                        <p className="text-[#c4c4c4] mb-8">
                            Sugar binds to proteins in your skin through a process called glycation, creating compounds that damage collagen and elastin. This leads to wrinkles, sagging, and dull skin. If you look older than your age, sugar could be aging you faster than time.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">What to Do About It</h2>

                        <p className="text-[#c4c4c4] mb-4">
                            If you recognize several of these symptoms, the solution is straightforward. Reduce your sugar intake. Start by eliminating obvious sources like soda, candy, and desserts. Then address hidden sugars in bread, sauces, and processed foods.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            Most people notice significant improvements within one to two weeks. Energy stabilizes, cravings decrease, skin clears, and that constant brain fog lifts. Your body wants to heal. You just need to stop poisoning it with sugar.
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-3">Ready to Fix These Symptoms?</h3>
                                <p className="text-[#8E8E93] mb-6 max-w-lg mx-auto">
                                    Download Sukali to find hidden sugars in your food and get 100 plus sugar-free recipes. Feel better in weeks.
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
                title="Noticing These Sugar Symptoms?"
                description="Scan foods to find hidden sugars causing your fatigue, brain fog, and skin issues."
            />
        </main>
    )
}
