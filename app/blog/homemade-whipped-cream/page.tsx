import Image from "next/image"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import StickyDownloadBar from "@/components/StickyDownloadBar"
import AppPromoPopup from "@/components/AppPromoPopup"

export default function HomemadeWhippedCreamPage() {
    const recipeSchema = {
        "@context": "https://schema.org",
        "@type": "Recipe",
        "name": "Sugar-Free Homemade Whipped Cream",
        "description": "Delicious homemade whipped cream with zero added sugar. Perfect for keto, low-carb, and diabetic-friendly desserts.",
        "author": {
            "@type": "Organization",
            "name": "Sukali"
        },
        "datePublished": "2026-01-09",
        "prepTime": "PT3M",
        "cookTime": "PT0M",
        "totalTime": "PT3M",
        "recipeYield": "8 servings",
        "recipeCategory": "Dessert",
        "recipeCuisine": "American",
        "keywords": "sugar-free whipped cream, keto whipped cream, homemade whipped cream",
        "nutrition": {
            "@type": "NutritionInformation",
            "calories": "52 calories",
            "fatContent": "5.5g",
            "carbohydrateContent": "0.4g",
            "sugarContent": "0g added",
            "proteinContent": "0.3g"
        },
        "recipeIngredient": [
            "1 cup heavy whipping cream (cold)",
            "1 teaspoon pure vanilla extract",
            "2 tablespoons powdered erythritol or monk fruit sweetener (optional)"
        ],
        "recipeInstructions": [
            {
                "@type": "HowToStep",
                "text": "Chill your mixing bowl and whisk attachment in the freezer for 10-15 minutes. Cold equipment makes fluffier whipped cream."
            },
            {
                "@type": "HowToStep",
                "text": "Pour cold heavy whipping cream into the chilled bowl."
            },
            {
                "@type": "HowToStep",
                "text": "Start whisking on low speed, then gradually increase to high speed."
            },
            {
                "@type": "HowToStep",
                "text": "After about 1-2 minutes, the cream will start to thicken. Add vanilla extract and sweetener if using."
            },
            {
                "@type": "HowToStep",
                "text": "Continue whisking until stiff peaks form (about 2-3 minutes total). Stop before it becomes butter."
            },
            {
                "@type": "HowToStep",
                "text": "Serve immediately or refrigerate for up to 3 days in an airtight container."
            }
        ],
        "image": "https://www.sugar-frees.com/assets/images/blog-images/homemade-whipped-cream.png"
    }

    return (
        <main className="min-h-screen bg-black">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }}
            />
            <SiteHeader />

            <section className="bg-black pt-24 pb-12 md:pt-32 md:pb-16">
                <div className="mx-auto max-w-4xl px-4">
                    <div className="flex items-center gap-2 text-sm mb-4">
                        <Link href="/blog" className="text-[#8E8E93] hover:text-white">
                            Blog
                        </Link>
                        <span className="text-[#8E8E93]">/</span>
                        <span className="text-[#22c55e]">Recipes</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Homemade Whipped Cream (Sugar-Free): 3 Minutes, 3 Ingredients
                    </h1>
                    <p className="text-xl text-[#8E8E93] mb-8">
                        Fluffy, creamy, and absolutely delicious without any added sugar. This simple recipe is perfect for topping berries, desserts, coffee, and more.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-[#8E8E93] mb-6">
                        <span>Sukali Team</span>
                        <span>•</span>
                        <span>January 9, 2026</span>
                        <span>•</span>
                        <span>5 min read</span>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-6">
                        <span className="px-3 py-1 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm font-medium">Sugar-Free</span>
                        <span className="px-3 py-1 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm font-medium">Keto</span>
                        <span className="px-3 py-1 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm font-medium">3 Minutes</span>
                        <span className="px-3 py-1 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm font-medium">Diabetic-Friendly</span>
                    </div>

                    <div className="bg-gradient-to-r from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-4 mb-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-white font-medium">Love sugar-free recipes? Get 100+ more in the Sukali app.</p>
                            <a
                                href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#22c55e] text-black font-bold rounded-full hover:opacity-90 whitespace-nowrap"
                            >
                                Download Free
                            </a>
                        </div>
                    </div>

                    <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
                        <Image
                            src="/assets/images/blog-images/homemade-whipped-cream.png"
                            alt="Homemade sugar-free whipped cream with fresh berries"
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

                        <p className="text-[#c4c4c4] text-lg mb-8">
                            Store-bought whipped cream is loaded with sugar (or artificial ingredients if you buy the sugar-free version). This homemade recipe uses just 3 simple ingredients, takes only 3 minutes, and tastes infinitely better than anything from a can.
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6 mb-10">
                            <h2 className="text-2xl font-bold text-white mb-4">Recipe at a Glance</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                <div>
                                    <p className="text-[#22c55e] text-2xl font-bold">3</p>
                                    <p className="text-[#8E8E93] text-sm">Minutes</p>
                                </div>
                                <div>
                                    <p className="text-[#22c55e] text-2xl font-bold">3</p>
                                    <p className="text-[#8E8E93] text-sm">Ingredients</p>
                                </div>
                                <div>
                                    <p className="text-[#22c55e] text-2xl font-bold">8</p>
                                    <p className="text-[#8E8E93] text-sm">Servings</p>
                                </div>
                                <div>
                                    <p className="text-[#22c55e] text-2xl font-bold">0g</p>
                                    <p className="text-[#8E8E93] text-sm">Added Sugar</p>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">Ingredients</h2>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6 mb-10">
                            <ul className="space-y-4 text-[#c4c4c4]">
                                <li className="flex items-start gap-3">
                                    <span className="text-[#22c55e] font-bold">1 cup</span>
                                    <span>Heavy whipping cream (cold) - look for one with no added sugars</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#22c55e] font-bold">1 tsp</span>
                                    <span>Pure vanilla extract - avoid imitation vanilla which may contain sugar</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#22c55e] font-bold">2 tbsp</span>
                                    <span>Powdered erythritol or monk fruit sweetener (optional) - for extra sweetness</span>
                                </li>
                            </ul>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">Instructions</h2>

                        <div className="space-y-4 mb-10">
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center text-black font-bold flex-shrink-0">1</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">Chill Your Equipment</h3>
                                        <p className="text-[#8E8E93]">
                                            Place your mixing bowl and whisk attachment in the freezer for 10-15 minutes before starting. Cold equipment is the secret to fluffy, stable whipped cream. This step is optional but highly recommended.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center text-black font-bold flex-shrink-0">2</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">Add the Cream</h3>
                                        <p className="text-[#8E8E93]">
                                            Pour the cold heavy whipping cream into your chilled bowl. Make sure your cream is very cold straight from the refrigerator.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center text-black font-bold flex-shrink-0">3</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">Start Whisking</h3>
                                        <p className="text-[#8E8E93]">
                                            Start on low speed and gradually increase to high. If you go too fast immediately, cream may splatter. You can use an electric mixer, stand mixer, or even a whisk by hand (will take about 5-8 minutes by hand).
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center text-black font-bold flex-shrink-0">4</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">Add Flavorings</h3>
                                        <p className="text-[#8E8E93]">
                                            After about 1-2 minutes, when the cream starts to thicken and hold soft peaks, add the vanilla extract and powdered sweetener if using. Adding them at this stage ensures even distribution.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center text-black font-bold flex-shrink-0">5</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">Whip to Stiff Peaks</h3>
                                        <p className="text-[#8E8E93]">
                                            Continue whisking until stiff peaks form, usually 2-3 minutes total. Stiff peaks mean when you lift the whisk, the cream stands up on its own without flopping over. Do not over-whip or it will become grainy and eventually turn to butter.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center text-black font-bold flex-shrink-0">6</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">Serve or Store</h3>
                                        <p className="text-[#8E8E93]">
                                            Use immediately for best texture. To store, transfer to an airtight container and refrigerate for up to 3 days. It may separate slightly; just give it a quick stir before using.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">Nutrition Information</h2>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6 mb-10">
                            <p className="text-[#8E8E93] mb-4">Per serving (about 2 tablespoons)</p>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                <div className="text-center p-3 bg-black/30 rounded-xl">
                                    <p className="text-white font-bold text-lg">52</p>
                                    <p className="text-[#8E8E93] text-xs">Calories</p>
                                </div>
                                <div className="text-center p-3 bg-black/30 rounded-xl">
                                    <p className="text-white font-bold text-lg">5.5g</p>
                                    <p className="text-[#8E8E93] text-xs">Fat</p>
                                </div>
                                <div className="text-center p-3 bg-black/30 rounded-xl">
                                    <p className="text-white font-bold text-lg">0.4g</p>
                                    <p className="text-[#8E8E93] text-xs">Carbs</p>
                                </div>
                                <div className="text-center p-3 bg-black/30 rounded-xl">
                                    <p className="text-[#22c55e] font-bold text-lg">0g</p>
                                    <p className="text-[#8E8E93] text-xs">Sugar Added</p>
                                </div>
                                <div className="text-center p-3 bg-black/30 rounded-xl">
                                    <p className="text-white font-bold text-lg">0.3g</p>
                                    <p className="text-[#8E8E93] text-xs">Protein</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6 mb-10">
                            <h3 className="text-xl font-bold text-white mb-3">100+ Sugar-Free Recipes</h3>
                            <p className="text-[#c4c4c4] mb-4">
                                Love this recipe? The Sukali app has over 100 more sugar-free recipes for desserts, meals, snacks, and drinks. Plus instant sugar scanning for any food.
                            </p>
                            <a
                                href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#22c55e] text-black font-bold rounded-full hover:opacity-90"
                            >
                                Get the App
                            </a>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">Tips for Perfect Whipped Cream</h2>

                        <div className="space-y-4 mb-10">
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <h4 className="text-lg font-bold text-[#22c55e] mb-2">Use Heavy Whipping Cream</h4>
                                <p className="text-[#8E8E93]">
                                    Regular heavy cream works, but heavy whipping cream (with higher fat content, usually 36%+) creates fluffier, more stable peaks. Avoid light cream or half-and-half which will not whip properly.
                                </p>
                            </div>
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <h4 className="text-lg font-bold text-[#22c55e] mb-2">Everything Must Be Cold</h4>
                                <p className="text-[#8E8E93]">
                                    Warm cream will not whip well. Keep your cream refrigerated until ready to use. On hot days, place your bowl in a larger bowl filled with ice while whipping.
                                </p>
                            </div>
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <h4 className="text-lg font-bold text-[#22c55e] mb-2">Use Powdered Sweetener</h4>
                                <p className="text-[#8E8E93]">
                                    Granulated sweeteners can leave a gritty texture. Use powdered erythritol or monk fruit for smooth results. You can make your own by blending granulated sweetener in a blender until powdery.
                                </p>
                            </div>
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <h4 className="text-lg font-bold text-[#22c55e] mb-2">Do Not Over-Whip</h4>
                                <p className="text-[#8E8E93]">
                                    Stop as soon as you reach stiff peaks. Over-whipping causes the fat to separate, resulting in grainy texture and eventually butter. Better to under-whip slightly than over-whip.
                                </p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">Serving Suggestions</h2>

                        <p className="text-[#c4c4c4] mb-4">This sugar-free whipped cream is perfect for:</p>

                        <ul className="list-disc list-inside text-[#c4c4c4] mb-10 space-y-2">
                            <li>Fresh berries and fruit</li>
                            <li>Sugar-free hot chocolate or coffee</li>
                            <li>Low-carb pancakes or waffles</li>
                            <li>Keto cheesecake or brownies</li>
                            <li>Sugar-free pumpkin pie</li>
                            <li>Eating straight from the bowl (no judgment)</li>
                        </ul>

                        <h2 className="text-3xl font-bold text-white mb-6">Flavor Variations</h2>

                        <div className="overflow-x-auto mb-10">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-[#38383A]">
                                        <th className="py-3 px-4 text-white font-bold">Flavor</th>
                                        <th className="py-3 px-4 text-white font-bold">Add This</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[#c4c4c4]">
                                    <tr className="border-b border-[#38383A]/50">
                                        <td className="py-3 px-4">Chocolate</td>
                                        <td className="py-3 px-4">2 tbsp unsweetened cocoa powder</td>
                                    </tr>
                                    <tr className="border-b border-[#38383A]/50">
                                        <td className="py-3 px-4">Coffee</td>
                                        <td className="py-3 px-4">1 tsp instant espresso powder</td>
                                    </tr>
                                    <tr className="border-b border-[#38383A]/50">
                                        <td className="py-3 px-4">Cinnamon</td>
                                        <td className="py-3 px-4">1/2 tsp ground cinnamon</td>
                                    </tr>
                                    <tr className="border-b border-[#38383A]/50">
                                        <td className="py-3 px-4">Lemon</td>
                                        <td className="py-3 px-4">1 tsp lemon zest + 1/2 tsp lemon extract</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4">Coconut</td>
                                        <td className="py-3 px-4">1/2 tsp coconut extract + shredded coconut topping</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-3">More Sugar-Free Recipes</h3>
                                <p className="text-[#8E8E93] mb-6 max-w-lg mx-auto">
                                    Download Sukali for 100+ sugar-free recipes including desserts, meals, and snacks. Plus scan any food to see its sugar content instantly.
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
                title="Love Sugar-Free Recipes?"
                description="Get 100+ sugar-free recipes for desserts, meals and snacks in the Sukali app."
            />
        </main>
    )
}
