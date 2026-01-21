import Image from "next/image"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import StickyDownloadBar from "@/components/StickyDownloadBar"
import AppPromoPopup from "@/components/AppPromoPopup"

export default function ProcessedSugarPage() {
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
                        <span className="text-[#22c55e]">Nutrition</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Processed Sugar: What It Is and Why You Should Avoid It
                    </h1>
                    <p className="text-xl text-[#8E8E93] mb-8">
                        That white powder in your kitchen has been stripped of everything natural. Here is what processed sugar really is and why it is destroying your health.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-[#8E8E93] mb-8">
                        <span>Sukali Team</span>
                        <span>•</span>
                        <span>January 21, 2026</span>
                        <span>•</span>
                        <span>10 min read</span>
                    </div>

                    <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
                        <Image
                            src="/assets/images/blog-images/processed-sugar.png"
                            alt="Processed sugar and white refined sugar cubes"
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
                            I never thought much about what sugar actually was. It came in a bag, it tasted sweet, I used it. Then I learned how processed sugar is made, and it changed everything. What ends up in your coffee or baked goods has been through a chemical process that strips away anything remotely natural.
                        </p>

                        <p className="text-[#c4c4c4] text-lg mb-8">
                            Understanding the difference between processed sugar and natural sugar is the first step to making better choices for your health.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">What Is Processed Sugar?</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Processed sugar, also called refined sugar, starts as sugarcane or sugar beets. But what ends up in your kitchen is nothing like the original plant.
                        </p>

                        <p className="text-[#c4c4c4] mb-6">
                            The plants are crushed to extract juice, which is then bleached, heated, filtered, and crystallized. Every vitamin, mineral, and nutrient is removed. What remains is pure sucrose, a chemical compound of glucose and fructose with zero nutritional value.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            That white powder is not food. It is an industrial product designed for one purpose: to make things taste sweet.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">How Sugar Is Processed</h2>

                        <p className="text-[#c4c4c4] mb-4">
                            Here is what happens to turn a plant into white sugar:
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Step 1: Extraction.</strong> Sugarcane is crushed and the juice is extracted. Sugar beets are sliced and soaked to pull out the sugar.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Step 2: Clarification.</strong> The juice is mixed with lime and heated to remove impurities. This also removes most nutrients.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Step 3: Evaporation.</strong> Water is boiled off to create a thick syrup.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Step 4: Crystallization.</strong> The syrup is spun in centrifuges to form crystals. Raw sugar is produced at this stage.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Step 5: Refining.</strong> Raw sugar is melted, filtered through bone char or activated carbon, and recrystallized. This is what makes sugar white.
                        </p>

                        <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6 mb-8">
                            <h3 className="text-xl font-bold text-white mb-3">Spot Processed Sugar in Foods</h3>
                            <p className="text-[#c4c4c4] mb-4">
                                Processed sugar hides under 60+ different names. Use Sukali to scan any product and see exactly what type of sugar is inside.
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

                        <h2 className="text-3xl font-bold text-white mb-6">Processed Sugar vs Natural Sugar</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            People sometimes ask if all sugar is the same. Chemically, yes. Sucrose is sucrose. But context matters enormously.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Natural sugar in fruit</strong> comes packaged with fiber, water, vitamins, and antioxidants. The fiber slows absorption, preventing blood sugar spikes. You also cannot eat unlimited fruit because fiber makes you feel full.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Processed sugar</strong> enters your bloodstream immediately with nothing to slow it down. There is no fiber, no nutrients, nothing to signal fullness. You can consume massive amounts without your body telling you to stop.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            This is why you can easily drink three glasses of orange juice but you would struggle to eat six whole oranges. The processing removes everything that keeps consumption in check.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Where Processed Sugar Hides</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            You know candy and soda contain processed sugar. But manufacturers add it to almost everything.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Bread.</strong> Most commercial bread contains 2-4 grams of sugar per slice.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Pasta sauce.</strong> A half cup can contain as much sugar as two cookies.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Yogurt.</strong> Flavored yogurt often has more sugar than ice cream.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Salad dressing.</strong> Many dressings are essentially sugar sauces.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Sports drinks.</strong> Marketed as healthy but loaded with processed sugar.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Granola bars.</strong> Often contain as much sugar as candy bars.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Health Effects of Processed Sugar</h2>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Weight gain.</strong> Processed sugar provides calories with no nutrition or satiety. It is the easiest way to overconsume calories without realizing it.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Insulin resistance.</strong> Constant sugar spikes force your pancreas to pump out insulin. Over time, cells become resistant, leading to type 2 diabetes.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Fatty liver disease.</strong> Fructose, which is half of processed sugar, goes straight to your liver. Excess fructose causes fat buildup leading to non-alcoholic fatty liver disease.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Inflammation.</strong> Processed sugar triggers inflammatory responses throughout your body.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Heart disease.</strong> Research links high sugar intake to increased heart disease risk, independent of weight.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Addiction.</strong> Sugar activates the same brain pathways as cocaine. It is genuinely addictive.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Names for Processed Sugar</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Manufacturers use many names to hide sugar on ingredient lists:
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            Sucrose, high-fructose corn syrup, dextrose, maltose, corn syrup, cane sugar, beet sugar, invert sugar, malt syrup, rice syrup, corn sweetener, crystalline fructose, evaporated cane juice, and many more.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            If an ingredient ends in "ose" or contains "syrup," it is likely sugar.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">How to Avoid Processed Sugar</h2>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Read every label.</strong> Most people are shocked when they start checking how much sugar is in everyday foods.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Cook from scratch.</strong> When you make your own food, you control the ingredients.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Choose whole foods.</strong> Meat, vegetables, eggs, and unprocessed grains contain no added sugar.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Use natural sweeteners.</strong> Stevia, monk fruit, and erythritol provide sweetness without the health effects of processed sugar.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Reduce gradually.</strong> Your taste buds adapt. After a few weeks without sugar, foods that once tasted normal will seem too sweet.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">The Bottom Line</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Processed sugar is not food. It is an industrial product with zero nutritional value that your body was never designed to consume in large amounts. It has been engineered to taste irresistible while causing metabolic damage.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            The less processed sugar you eat, the better you will feel. Your energy will stabilize, cravings will decrease, and your risk of chronic disease will drop. Cutting processed sugar is one of the single most impactful changes you can make for your health.
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-3">Ready to Quit Processed Sugar?</h3>
                                <p className="text-[#8E8E93] mb-6 max-w-lg mx-auto">
                                    Download Sukali to scan foods for hidden processed sugars and get 100 plus sugar-free recipes.
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
                title="Eating Processed Sugar?"
                description="Scan any food to find hidden processed sugars. Get healthier alternatives instantly."
            />
        </main>
    )
}
