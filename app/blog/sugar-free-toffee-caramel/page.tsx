import Image from "next/image"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import StickyDownloadBar from "@/components/StickyDownloadBar"
import AppPromoPopup from "@/components/AppPromoPopup"

export default function SugarFreeToffeeCaramelPage() {
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
                        <span className="text-[#22c55e]">Recipes</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Sugar-Free Toffee and Caramel: Simple Homemade Candy
                    </h1>
                    <p className="text-xl text-[#8E8E93] mb-8">
                        You can make incredible toffee with just two ingredients and rich buttery caramel with only three. No sugar needed. Here is exactly how to do it.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-[#8E8E93] mb-8">
                        <span>Sukali Team</span>
                        <span>•</span>
                        <span>January 16, 2026</span>
                        <span>•</span>
                        <span>8 min read</span>
                    </div>

                    <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
                        <Image
                            src="/assets/images/blog-images/sugar-free-toffee-caramel.png"
                            alt="Homemade sugar-free toffee and caramel candy"
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
                            I never thought I would be able to enjoy toffee or caramel again after cutting sugar. These were my absolute favorites, those crunchy English toffee bars and chewy caramel squares that melt in your mouth. Turns out, you can make both at home without any sugar at all, and they taste exactly like the real thing.
                        </p>

                        <p className="text-[#c4c4c4] text-lg mb-8">
                            The toffee has that satisfying crack when you bite into it. The caramel is smooth and chewy. And the best part is how simple they are. We are talking two ingredients for toffee, three for caramel. Let me walk you through both recipes in detail.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Sugar-Free Toffee Recipe</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            This toffee is almost too easy. It takes about 10 minutes from start to finish, not counting cooling time. You can dip the pieces in dark chocolate to make heath bar style treats, or eat them plain. Either way, nobody will believe these do not have sugar.
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6 mb-8">
                            <h3 className="text-xl font-bold text-white mb-4">What You Need</h3>
                            <ul className="space-y-2 text-[#c4c4c4]">
                                <li><strong className="text-white">1 cup (2 sticks) salted butter</strong> - The salt is important, it brings out the sweetness and adds depth of flavor</li>
                                <li><strong className="text-white">1 cup granulated erythritol blend sweetener</strong> - You need a sweetener with erythritol because that is what gives the toffee its crack</li>
                                <li><strong className="text-white">Optional: 1 teaspoon vanilla extract</strong> - This gives it that English toffee flavor but adds a third ingredient</li>
                            </ul>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-4">Step by Step Instructions</h3>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Step 1: Prepare your pan.</strong> You will need a silicone mold or a parchment-lined baking pan. A loaf pan works perfectly. The silicone makes unmolding much easier.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Step 2: Melt the butter.</strong> Put a medium saucepan over medium heat and add both sticks of butter. Let it melt completely, stirring occasionally.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Step 3: Add the sweetener.</strong> Once the butter is melted, add the cup of granulated sweetener. Stir to combine. If you are using vanilla, add it now.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Step 4: Cook until golden brown.</strong> Keep the mixture at a medium simmer, stirring regularly. This is where you need patience. You are waiting for two things to happen. First, the mixture needs to reach 300 degrees Fahrenheit. Second, it needs to turn a nice golden brown color. This takes about 5 to 7 minutes.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Step 5: Watch it carefully.</strong> Keep your eyes on the pan and stir frequently. Butter and sweetener are not cheap, and you do not want to burn this. The color change from pale to golden brown tells you it is ready even if you do not have a thermometer.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Step 6: Pour immediately.</strong> Once it reaches 300 degrees and has that beautiful amber color, take it off the heat right away. Pour it into your prepared pan or mold. Scrape out every last bit because this is the good stuff.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Step 7: Cool completely.</strong> Let it sit at room temperature until firm, then transfer to the fridge. Once cold, unmold and break or cut into pieces. Store in the refrigerator.
                        </p>

                        <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6 mb-8">
                            <h3 className="text-xl font-bold text-white mb-3">100+ Sugar-Free Desserts</h3>
                            <p className="text-[#c4c4c4] mb-4">
                                Love this recipe? The Sukali app has over 100 sugar-free recipes for every craving. Desserts, snacks, main dishes, and more.
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

                        <h2 className="text-3xl font-bold text-white mb-6">Sugar-Free Caramel Recipe</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            If you prefer the chewy, smooth texture of caramel over the snap of toffee, this recipe is for you. The secret is using allulose instead of erythritol. Allulose does not crystallize like other sweeteners, so you get that soft, stretchy caramel texture instead of a hard candy.
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6 mb-8">
                            <h3 className="text-xl font-bold text-white mb-4">What You Need</h3>
                            <ul className="space-y-2 text-[#c4c4c4]">
                                <li><strong className="text-white">1 cup (2 sticks) salted butter</strong> - Again, salted is key for flavor</li>
                                <li><strong className="text-white">1 cup allulose</strong> - This is what keeps it soft and chewy</li>
                                <li><strong className="text-white">2 tablespoons heavy cream</strong> - Adds richness and helps the texture</li>
                                <li><strong className="text-white">Optional: 1 teaspoon vanilla extract</strong> - For extra flavor</li>
                            </ul>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-4">Step by Step Instructions</h3>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Step 1: Prepare your dish.</strong> Line a small glass dish, about 4 by 6 inches, with parchment paper. Here is a tip that makes this easier. Ball up the parchment paper first, then unfold it. The creases help it conform to the dish shape.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Step 2: Brown the butter.</strong> This is an optional step that adds incredible depth of flavor. Put the butter in a saucepan over medium heat. Let it melt completely, then keep cooking. After 5 to 6 minutes it will start to smell nutty and turn a golden brown color. You will see brown bits at the bottom. This is browned butter and it has a rich, almost caramelized flavor.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Step 3: Add the allulose.</strong> Stir in the cup of allulose until it is fully incorporated. The mixture will bubble and foam, that is normal.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Step 4: Add the cream.</strong> Stir in the two tablespoons of heavy cream. If you are using vanilla, add it now.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Step 5: Cook to 250 degrees.</strong> Unlike the toffee which goes to 300, caramel only needs to reach 250 degrees. This keeps it soft instead of hard. Use a candy thermometer if you have one. If not, test by dropping a small amount in cold water. It should form a firm ball but still be pliable.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Step 6: Pour into the prepared dish.</strong> Once you hit temperature, pour immediately into your parchment-lined dish. Let it cool to room temperature first, then refrigerate until firm.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Step 7: Cut into squares.</strong> Once completely chilled, lift the caramel out using the parchment paper. Cut into small squares with a sharp knife. Store in the refrigerator.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Tips for Perfect Results</h2>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Use a candy thermometer.</strong> While you can do this by color and feel, a thermometer takes the guesswork out. 300 degrees for toffee, 250 for caramel.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Do not walk away.</strong> Both recipes can go from perfect to burned in seconds. Stay at the stove and keep stirring.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Use quality butter.</strong> This is basically butter and sweetener, so the butter flavor really comes through. Good butter makes a noticeable difference.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Store in the fridge.</strong> Without sugar, these candies are more temperature sensitive. Keep them cold for the best texture.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Watch the Video Tutorial</h2>

                        <p className="text-[#c4c4c4] mb-8">
                            These recipes were inspired by Southern Keto. You can watch the full video tutorial here: <a href="https://www.youtube.com/watch?v=nzD-5VM2Rzk" target="_blank" rel="noopener noreferrer" className="text-[#22c55e] hover:underline">Sugar-Free Toffee and Caramel Video</a>
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-3">Want More Sugar-Free Recipes?</h3>
                                <p className="text-[#8E8E93] mb-6 max-w-lg mx-auto">
                                    Download Sukali for 100 plus delicious sugar-free recipes. Desserts, snacks, main dishes, and more.
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
                title="Craving Sugar-Free Sweets?"
                description="Get 100+ delicious sugar-free dessert recipes. Satisfy your sweet tooth without the sugar."
            />
        </main>
    )
}
