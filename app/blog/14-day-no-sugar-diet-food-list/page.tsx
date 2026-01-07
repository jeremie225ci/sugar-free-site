import Image from "next/image"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import StickyDownloadBar from "@/components/StickyDownloadBar"
import AppPromoPopup from "@/components/AppPromoPopup"

export default function NoSugarDietFoodListPage() {
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "14-Day No Sugar Diet Food List: Free PDF + 50 Recipes",
        "description": "Download your free PDF with 50 sugar-free recipes for a complete 14-day no sugar diet.",
        "author": {
            "@type": "Organization",
            "name": "Sukali"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Sukali",
            "url": "https://www.sugar-frees.com"
        },
        "datePublished": "2025-01-01",
        "dateModified": "2026-01-06"
    }

    return (
        <main className="min-h-screen bg-black">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <SiteHeader />

            {/* Hero Section */}
            <section className="bg-black pt-24 pb-12 md:pt-32 md:pb-16">
                <div className="mx-auto max-w-4xl px-4">
                    <div className="flex items-center gap-2 text-sm mb-4">
                        <Link href="/blog" className="text-[#8E8E93] hover:text-white">
                            Blog
                        </Link>
                        <span className="text-[#8E8E93]">/</span>
                        <span className="text-[#22c55e]">Diet Plans</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        14-Day No Sugar Diet Food List: Free PDF + 50 Recipes
                    </h1>
                    <p className="text-xl text-[#8E8E93] mb-8">
                        Download your complete food list with 50 sugar-free recipes. Everything organized by meal type for your 14-day sugar detox.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-[#8E8E93] mb-6">
                        <span>Sukali Team</span>
                        <span>•</span>
                        <span>January 2026</span>
                        <span>•</span>
                        <span>12 min read</span>
                    </div>

                    {/* Download Section - PROMINENT */}
                    <div className="bg-gradient-to-r from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border-2 border-[#22c55e] p-6 mb-8">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div>
                                <h2 className="text-xl font-bold text-white mb-2">📄 Download Your Free PDF</h2>
                                <p className="text-[#c4c4c4] text-sm">50 sugar-free recipes organized by meal type. Print it, save it, use it daily.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                <a
                                    href="/downloads/14-day-no-sugar-diet-food-list.pdf"
                                    download
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#22c55e] text-black font-bold rounded-full hover:opacity-90 whitespace-nowrap"
                                >
                                    ⬇️ Download PDF
                                </a>
                                <a
                                    href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#22c55e] text-white font-bold rounded-full hover:bg-[#22c55e]/10 whitespace-nowrap"
                                >
                                    📱 Get 100+ in App
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
                        <Image
                            src="/assets/images/blog-images/sugar-free-foods.png"
                            alt="Sugar-free foods for a 14-day no sugar diet"
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="bg-[#0A0A0A] py-16 md:py-24">
                <article className="mx-auto max-w-3xl px-4">
                    <div className="prose prose-invert prose-lg max-w-none">

                        <p className="text-[#c4c4c4] text-lg mb-8">
                            Starting a no sugar diet can feel overwhelming. What can you actually eat? What should you avoid? This is your complete 14-day no sugar diet food list. We have organized everything by meal type and included links to our favorite recipes to make your journey easier.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Foods You CAN Eat</h2>

                        <h3 className="text-2xl font-bold text-white mb-4">Proteins (Eat Freely)</h3>

                        <div className="space-y-6 mb-10">
                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h4 className="text-xl font-bold text-[#22c55e] mb-2">Chicken</h4>
                                <p className="text-[#8E8E93]">
                                    A lean protein powerhouse with zero sugar. Chicken breast contains about 31 grams of protein per serving and keeps you full for hours. Avoid pre-marinated versions which often contain hidden sugars. Grill, bake, or sautee with olive oil and herbs.
                                </p>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h4 className="text-xl font-bold text-[#22c55e] mb-2">Fish</h4>
                                <p className="text-[#8E8E93] mb-3">
                                    Salmon is one of the best proteins you can eat. It contains zero sugar, high omega-3 fatty acids that reduce inflammation, and keeps your brain sharp. Wild-caught is ideal but any fresh fish works. Cod and tuna are also excellent choices.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <Link href="/food/herb-baked-salmon" className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm hover:bg-[#22c55e]/30 transition">
                                        → Herb Baked Salmon
                                    </Link>
                                    <Link href="/food/garlic-shrimp-skillet" className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm hover:bg-[#22c55e]/30 transition">
                                        → Garlic Shrimp Skillet
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h4 className="text-xl font-bold text-[#22c55e] mb-2">Eggs</h4>
                                <p className="text-[#8E8E93] mb-3">
                                    The perfect no sugar food. One egg has 6 grams of protein, essential vitamins, and exactly zero grams of sugar. They keep you full until lunch and prevent mid-morning cravings.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <Link href="/food/egg-and-spinach-scramble" className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm hover:bg-[#22c55e]/30 transition">
                                        → Egg & Spinach Scramble
                                    </Link>
                                    <Link href="/food/veggie-omelette" className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm hover:bg-[#22c55e]/30 transition">
                                        → Veggie Omelette
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h4 className="text-xl font-bold text-[#22c55e] mb-2">Turkey</h4>
                                <p className="text-[#8E8E93]">
                                    Leaner than chicken with the same zero sugar content. Ground turkey works great for burgers and meatballs. Turkey breast is perfect for meal prep. Even turkey bacon is an option, though check labels for added sugars in some brands.
                                </p>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h4 className="text-xl font-bold text-[#22c55e] mb-2">Beef</h4>
                                <p className="text-[#8E8E93] mb-3">
                                    Red meat contains no sugar and is packed with iron, B12, and zinc. Grass-fed beef has better omega-3 ratios. Great for steaks, stir-fries, and slow-cooked dishes.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <Link href="/food/beef-and-broccoli-stir-fry" className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm hover:bg-[#22c55e]/30 transition">
                                        → Beef & Broccoli Stir-Fry
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h4 className="text-xl font-bold text-[#22c55e] mb-2">Tofu</h4>
                                <p className="text-[#8E8E93] mb-3">
                                    An excellent protein source for vegetarians with less than 1 gram of sugar per serving. Firm tofu works best for stir-fries and grilling. It absorbs flavors beautifully.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <Link href="/food/spicy-tofu-stir-fry" className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm hover:bg-[#22c55e]/30 transition">
                                        → Spicy Tofu Stir-Fry
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-4">Vegetables (Eat Unlimited)</h3>

                        <div className="space-y-6 mb-10">
                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h4 className="text-xl font-bold text-[#22c55e] mb-2">Leafy Greens</h4>
                                <p className="text-[#8E8E93]">
                                    Spinach, kale, arugula, and lettuce have virtually zero sugar and are packed with fiber. They fill your stomach without adding calories. The fiber slows digestion and helps maintain stable blood sugar levels throughout the day.
                                </p>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h4 className="text-xl font-bold text-[#22c55e] mb-2">Cruciferous Vegetables</h4>
                                <p className="text-[#8E8E93] mb-3">
                                    Broccoli, cauliflower, cabbage, and Brussels sprouts are nutritional powerhouses. They contain compounds that support liver detoxification, which is especially important when quitting sugar.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <Link href="/food/roasted-vegetable-medley" className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm hover:bg-[#22c55e]/30 transition">
                                        → Roasted Vegetable Medley
                                    </Link>
                                    <Link href="/food/stuffed-bell-peppers" className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm hover:bg-[#22c55e]/30 transition">
                                        → Stuffed Bell Peppers
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-4">Healthy Fats</h3>

                        <div className="space-y-6 mb-10">
                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h4 className="text-xl font-bold text-[#22c55e] mb-2">Avocado</h4>
                                <p className="text-[#8E8E93] mb-3">
                                    Perhaps the best food for a no sugar diet. Avocados contain healthy monounsaturated fats that keep you satisfied, fiber that aids digestion, and potassium for energy. They help your body absorb nutrients from vegetables and calm sugar cravings.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <Link href="/food/avocado-power-toast" className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm hover:bg-[#22c55e]/30 transition">
                                        → Avocado Power Toast
                                    </Link>
                                    <Link href="/food/chicken-avocado-salad" className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm hover:bg-[#22c55e]/30 transition">
                                        → Chicken Avocado Salad
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h4 className="text-xl font-bold text-[#22c55e] mb-2">Olive Oil</h4>
                                <p className="text-[#8E8E93]">
                                    Extra virgin olive oil is liquid gold for no sugar eating. Use it for cooking at medium heat and for homemade salad dressings. It adds richness to meals without any sugar.
                                </p>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h4 className="text-xl font-bold text-[#22c55e] mb-2">Nuts</h4>
                                <p className="text-[#8E8E93]">
                                    Almonds, walnuts, pecans, and macadamia nuts are perfect snacks. They provide healthy fats, protein, and fiber to keep hunger at bay. Watch portions as they are calorie-dense. Avoid honey-roasted or flavored varieties which contain added sugar.
                                </p>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-4">Complex Carbohydrates</h3>

                        <div className="space-y-6 mb-10">
                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h4 className="text-xl font-bold text-[#22c55e] mb-2">Quinoa</h4>
                                <p className="text-[#8E8E93] mb-3">
                                    A complete protein containing all nine essential amino acids. Quinoa has a low glycemic index meaning it releases energy slowly without spiking blood sugar. Perfect base for bowls and salads.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <Link href="/food/mediterranean-quinoa-bowl" className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm hover:bg-[#22c55e]/30 transition">
                                        → Mediterranean Quinoa Bowl
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h4 className="text-xl font-bold text-[#22c55e] mb-2">Sweet Potato</h4>
                                <p className="text-[#8E8E93] mb-3">
                                    Naturally sweet without added sugar. Sweet potatoes are rich in fiber, vitamin A, and antioxidants. Their natural sweetness satisfies cravings while the fiber prevents blood sugar spikes.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <Link href="/food/baked-sweet-potato-fries" className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm hover:bg-[#22c55e]/30 transition">
                                        → Baked Sweet Potato Fries
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h4 className="text-xl font-bold text-[#22c55e] mb-2">Lentils</h4>
                                <p className="text-[#8E8E93] mb-3">
                                    High in fiber and protein, lentils are incredibly filling. One cup provides 16 grams of fiber, which is more than half your daily needs. They stabilize blood sugar and keep you satisfied for hours.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <Link href="/food/lentil-and-veggie-soup" className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm hover:bg-[#22c55e]/30 transition">
                                        → Lentil & Veggie Soup
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">14-Day Meal Plan</h2>

                        <div className="space-y-8 mb-10">
                            <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6">
                                <h3 className="text-xl font-bold text-white mb-4">Day 1-3: Getting Started</h3>
                                <div className="space-y-3">
                                    <p className="text-[#c4c4c4]"><strong className="text-white">Breakfast:</strong> <Link href="/food/egg-and-spinach-scramble" className="text-[#22c55e] hover:underline">Egg & Spinach Scramble</Link> or <Link href="/food/green-detox-smoothie" className="text-[#22c55e] hover:underline">Green Detox Smoothie</Link></p>
                                    <p className="text-[#c4c4c4]"><strong className="text-white">Lunch:</strong> <Link href="/food/greek-salad-bowl" className="text-[#22c55e] hover:underline">Greek Salad Bowl</Link> or <Link href="/food/chicken-avocado-salad" className="text-[#22c55e] hover:underline">Chicken Avocado Salad</Link></p>
                                    <p className="text-[#c4c4c4]"><strong className="text-white">Dinner:</strong> <Link href="/food/herb-baked-salmon" className="text-[#22c55e] hover:underline">Herb Baked Salmon</Link> with steamed vegetables</p>
                                    <p className="text-[#c4c4c4]"><strong className="text-white">Snack:</strong> <Link href="/food/beetroot-hummus" className="text-[#22c55e] hover:underline">Beetroot Hummus</Link> with raw veggies</p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6">
                                <h3 className="text-xl font-bold text-white mb-4">Day 4-7: Building Momentum</h3>
                                <div className="space-y-3">
                                    <p className="text-[#c4c4c4]"><strong className="text-white">Breakfast:</strong> <Link href="/food/almond-flour-pancakes" className="text-[#22c55e] hover:underline">Almond Flour Pancakes</Link> or <Link href="/food/veggie-omelette" className="text-[#22c55e] hover:underline">Veggie Omelette</Link></p>
                                    <p className="text-[#c4c4c4]"><strong className="text-white">Lunch:</strong> <Link href="/food/mediterranean-quinoa-bowl" className="text-[#22c55e] hover:underline">Mediterranean Quinoa Bowl</Link> or <Link href="/food/avocado-tuna-salad" className="text-[#22c55e] hover:underline">Avocado Tuna Salad</Link></p>
                                    <p className="text-[#c4c4c4]"><strong className="text-white">Dinner:</strong> <Link href="/food/zucchini-noodles-with-pesto" className="text-[#22c55e] hover:underline">Zucchini Noodles with Pesto</Link> or <Link href="/food/chickpea-curry" className="text-[#22c55e] hover:underline">Chickpea Curry</Link></p>
                                    <p className="text-[#c4c4c4]"><strong className="text-white">Snack:</strong> Mixed nuts or <Link href="/food/cucumber-mint-water" className="text-[#22c55e] hover:underline">Cucumber Mint Water</Link></p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6">
                                <h3 className="text-xl font-bold text-white mb-4">Day 8-11: Hitting Your Stride</h3>
                                <div className="space-y-3">
                                    <p className="text-[#c4c4c4]"><strong className="text-white">Breakfast:</strong> <Link href="/food/coconut-chia-pudding" className="text-[#22c55e] hover:underline">Coconut Chia Pudding</Link> or <Link href="/food/greek-yogurt-parfait" className="text-[#22c55e] hover:underline">Greek Yogurt Parfait</Link></p>
                                    <p className="text-[#c4c4c4]"><strong className="text-white">Lunch:</strong> <Link href="/food/cauliflower-rice-bowl" className="text-[#22c55e] hover:underline">Cauliflower Rice Bowl</Link> or <Link href="/food/kale-and-quinoa-power-salad" className="text-[#22c55e] hover:underline">Kale & Quinoa Power Salad</Link></p>
                                    <p className="text-[#c4c4c4]"><strong className="text-white">Dinner:</strong> <Link href="/food/garlic-shrimp-skillet" className="text-[#22c55e] hover:underline">Garlic Shrimp Skillet</Link> or <Link href="/food/stuffed-bell-peppers" className="text-[#22c55e] hover:underline">Stuffed Bell Peppers</Link></p>
                                    <p className="text-[#c4c4c4]"><strong className="text-white">Snack:</strong> <Link href="/food/zucchini-fritters" className="text-[#22c55e] hover:underline">Zucchini Fritters</Link></p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6">
                                <h3 className="text-xl font-bold text-white mb-4">Day 12-14: Finishing Strong</h3>
                                <div className="space-y-3">
                                    <p className="text-[#c4c4c4]"><strong className="text-white">Breakfast:</strong> <Link href="/food/mushroom-and-spinach-frittata" className="text-[#22c55e] hover:underline">Mushroom & Spinach Frittata</Link> or <Link href="/food/protein-power-bowl" className="text-[#22c55e] hover:underline">Protein Power Bowl</Link></p>
                                    <p className="text-[#c4c4c4]"><strong className="text-white">Lunch:</strong> <Link href="/food/spinach-detox-soup" className="text-[#22c55e] hover:underline">Spinach Detox Soup</Link> or <Link href="/food/tuna-and-white-bean-salad" className="text-[#22c55e] hover:underline">Tuna & White Bean Salad</Link></p>
                                    <p className="text-[#c4c4c4]"><strong className="text-white">Dinner:</strong> <Link href="/food/zesty-lemon-chicken" className="text-[#22c55e] hover:underline">Zesty Lemon Chicken</Link> or <Link href="/food/coconut-curry-vegetables" className="text-[#22c55e] hover:underline">Coconut Curry Vegetables</Link></p>
                                    <p className="text-[#c4c4c4]"><strong className="text-white">Snack:</strong> Hard boiled eggs or raw vegetables</p>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">Foods To AVOID</h2>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-red-500/30 p-6 mb-10">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-red-400 text-xl">✗</span>
                                    <div>
                                        <p className="text-white font-semibold">Obvious sugars</p>
                                        <p className="text-[#8E8E93]">Candy, cookies, cakes, ice cream, donuts.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-red-400 text-xl">✗</span>
                                    <div>
                                        <p className="text-white font-semibold">Hidden sugars</p>
                                        <p className="text-[#8E8E93]">Bread, pasta sauce, salad dressings, ketchup, BBQ sauce.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-red-400 text-xl">✗</span>
                                    <div>
                                        <p className="text-white font-semibold">Drinks</p>
                                        <p className="text-[#8E8E93]">Soda, fruit juice, sweetened coffee, energy drinks.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-red-400 text-xl">✗</span>
                                    <div>
                                        <p className="text-white font-semibold">Breakfast foods</p>
                                        <p className="text-[#8E8E93]">Most cereals, granola bars, flavored yogurt, pancake syrup.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">Tips For Success</h2>

                        <div className="space-y-4 mb-10">
                            <div className="flex items-start gap-4">
                                <span className="text-[#22c55e] text-2xl">✓</span>
                                <div>
                                    <p className="text-white font-semibold">Read every label</p>
                                    <p className="text-[#8E8E93]">Sugar hides in foods you would never expect.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-[#22c55e] text-2xl">✓</span>
                                <div>
                                    <p className="text-white font-semibold">Prep meals in advance</p>
                                    <p className="text-[#8E8E93]">When you are hungry you make bad decisions.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-[#22c55e] text-2xl">✓</span>
                                <div>
                                    <p className="text-white font-semibold">Drink lots of water</p>
                                    <p className="text-[#8E8E93]">Often when you think you are hungry you are actually thirsty.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-[#22c55e] text-2xl">✓</span>
                                <div>
                                    <p className="text-white font-semibold">Use the Sukali app</p>
                                    <p className="text-[#8E8E93]">Scan foods and track your sugar intake. It makes everything so much easier.</p>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">Track Your Progress</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            The hardest part of a no sugar diet is knowing which foods secretly contain sugar. The Sukali app makes this easy. Just scan your food with your phone camera. The AI tells you exactly how much sugar is in it.
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6 mb-8">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-3">Start Your 14-Day Challenge</h3>
                                    <p className="text-[#8E8E93] mb-4">
                                        Download Sukali to scan foods, track your sugar intake, and complete your 14-day no sugar challenge successfully.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <a
                                            href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#22c55e] text-black font-bold rounded-full hover:opacity-90"
                                        >
                                            Download iOS
                                        </a>
                                        <a
                                            href="https://play.google.com/store/apps/details?id=app.sukali"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#38383A] text-white font-medium rounded-full hover:border-[#22c55e]"
                                        >
                                            Android
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </article>
            </section>

            <SiteFooter />
            <StickyDownloadBar />
            <AppPromoPopup
                title="Get All Recipes + Personal Meal Plan"
                description="Download the Sukali app to access all our sugar-free recipes, personalized meal plans, and a step-by-step guide to quit sugar for good."
            />
        </main>
    )
}
