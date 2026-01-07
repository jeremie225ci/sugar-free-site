import Image from "next/image"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import StickyDownloadBar from "@/components/StickyDownloadBar"
import AppPromoPopup from "@/components/AppPromoPopup"

export default function HealthyDietPage() {
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Healthy Diet: The Complete 2026 Guide to Eating Well",
        "description": "Learn how to build a healthy diet that works with science-backed nutrition tips and meal ideas.",
        "author": {
            "@type": "Organization",
            "name": "Sukali"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Sukali",
            "url": "https://www.sugar-frees.com"
        },
        "datePublished": "2026-01-07",
        "dateModified": "2026-01-07",
        "image": "https://www.sugar-frees.com/assets/images/blog-images/healthy-diet.png"
    }

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is the healthiest diet to follow?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The healthiest diet focuses on whole foods: vegetables, fruits, lean proteins, whole grains, and healthy fats. The Mediterranean diet is consistently ranked #1 by nutrition experts for overall health and longevity."
                }
            },
            {
                "@type": "Question",
                "name": "What foods should I eat every day?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Aim to eat daily: leafy greens, colorful vegetables, lean protein (fish, chicken, legumes), whole grains, berries or low-sugar fruits, nuts/seeds, and plenty of water. These provide essential nutrients your body needs."
                }
            },
            {
                "@type": "Question",
                "name": "How do I start eating healthy?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Start by adding more vegetables to each meal, replacing processed foods with whole foods, cooking at home more often, reducing added sugar intake, and drinking more water. Make small changes that you can maintain long-term."
                }
            }
        ]
    }

    return (
        <main className="min-h-screen bg-black">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
                        <span className="text-[#22c55e]">Nutrition</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Healthy Diet: The Complete 2026 Guide to Eating Well
                    </h1>
                    <p className="text-xl text-[#8E8E93] mb-8">
                        Everything you need to know about building a healthy diet that actually works. Science-backed advice, real food examples, and practical meal ideas.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-[#8E8E93] mb-6">
                        <span>Sukali Team</span>
                        <span>•</span>
                        <span>January 7, 2026</span>
                        <span>•</span>
                        <span>14 min read</span>
                    </div>

                    {/* Top CTA */}
                    <div className="bg-gradient-to-r from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-4 mb-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-white font-medium">Get hundreds of healthy recipes and meal plans in our app.</p>
                            <a
                                href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#22c55e] text-black font-bold rounded-full hover:opacity-90 whitespace-nowrap"
                            >
                                Download Sukali Free
                            </a>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
                        <Image
                            src="/assets/images/blog-images/healthy-diet.png"
                            alt="Healthy balanced meal with salmon, vegetables, and quinoa"
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
                            A healthy diet is the foundation of good health, energy, and longevity. But with so much conflicting advice out there, it can be overwhelming to know where to start. This guide cuts through the noise and gives you a clear, science-backed approach to eating well.
                        </p>

                        <p className="text-[#c4c4c4] text-lg mb-8">
                            The good news? Healthy eating does not have to be complicated, expensive, or boring. By the end of this article, you will know exactly what to eat, what to avoid, and how to build meals that nourish your body and taste amazing.
                        </p>

                        {/* Table of Contents */}
                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6 mb-10">
                            <h3 className="text-xl font-bold text-white mb-4">In This Article</h3>
                            <ul className="space-y-2 text-[#8E8E93]">
                                <li>• What Is a Healthy Diet?</li>
                                <li>• The 5 Pillars of Healthy Eating</li>
                                <li>• Complete Healthy Food List</li>
                                <li>• Foods to Avoid or Limit</li>
                                <li>• Sample Meal Plans</li>
                                <li>• How to Start Eating Healthy</li>
                            </ul>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">What Is a Healthy Diet?</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            A healthy diet provides your body with the nutrients it needs to function properly while maintaining a healthy weight and reducing the risk of chronic diseases. It is not about perfect eating or strict rules. It is about making better choices most of the time.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            Research consistently shows that the healthiest populations in the world share common eating patterns: they eat mostly whole foods, plenty of plants, moderate amounts of fish and poultry, and very little processed food or added sugar.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">The 5 Pillars of Healthy Eating</h2>

                        <div className="space-y-6 mb-10">
                            <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6">
                                <h3 className="text-xl font-bold text-white mb-3">1. Eat Whole Foods</h3>
                                <p className="text-[#c4c4c4] mb-4">
                                    Whole foods are foods that have been minimally processed and are as close to their natural state as possible. They contain more nutrients and fiber than processed alternatives.
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-black/30 rounded-xl p-4">
                                        <p className="text-[#22c55e] font-semibold mb-2">✓ Choose These</p>
                                        <ul className="text-[#8E8E93] text-sm space-y-1">
                                            <li>• Fresh vegetables and fruits</li>
                                            <li>• Whole grains (brown rice, oats)</li>
                                            <li>• Fresh fish, poultry, meat</li>
                                            <li>• Eggs</li>
                                            <li>• Nuts and seeds</li>
                                            <li>• Legumes (beans, lentils)</li>
                                        </ul>
                                    </div>
                                    <div className="bg-black/30 rounded-xl p-4">
                                        <p className="text-red-400 font-semibold mb-2">✗ Avoid These</p>
                                        <ul className="text-[#8E8E93] text-sm space-y-1">
                                            <li>• Packaged snacks</li>
                                            <li>• Fast food</li>
                                            <li>• Processed meats</li>
                                            <li>• Frozen meals</li>
                                            <li>• Sugary cereals</li>
                                            <li>• Chips and crackers</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h3 className="text-xl font-bold text-white mb-3">2. Fill Half Your Plate with Vegetables</h3>
                                <p className="text-[#c4c4c4] mb-4">
                                    Vegetables are the most nutrient-dense foods on the planet. They provide vitamins, minerals, fiber, and antioxidants with very few calories. Aim for variety and color.
                                </p>
                                <p className="text-[#8E8E93]">
                                    <strong className="text-white">Daily goal:</strong> At least 5 servings of vegetables. One serving = 1 cup raw or 1/2 cup cooked.
                                </p>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h3 className="text-xl font-bold text-white mb-3">3. Choose Quality Protein</h3>
                                <p className="text-[#c4c4c4] mb-4">
                                    Protein is essential for muscle maintenance, immune function, and satiety. Choose lean, high-quality sources and include protein at every meal.
                                </p>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    <span className="px-3 py-1 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm">Fish</span>
                                    <span className="px-3 py-1 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm">Chicken</span>
                                    <span className="px-3 py-1 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm">Turkey</span>
                                    <span className="px-3 py-1 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm">Eggs</span>
                                    <span className="px-3 py-1 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm">Legumes</span>
                                    <span className="px-3 py-1 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm">Greek Yogurt</span>
                                    <span className="px-3 py-1 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm">Tofu</span>
                                </div>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h3 className="text-xl font-bold text-white mb-3">4. Include Healthy Fats</h3>
                                <p className="text-[#c4c4c4] mb-4">
                                    Fat is not the enemy. Healthy fats support brain function, hormone production, and nutrient absorption. The key is choosing the right types.
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[#22c55e] font-semibold mb-2">Good Fats</p>
                                        <ul className="text-[#8E8E93] text-sm space-y-1">
                                            <li>• Olive oil</li>
                                            <li>• Avocados</li>
                                            <li>• Nuts (almonds, walnuts)</li>
                                            <li>• Fatty fish (salmon, sardines)</li>
                                            <li>• Chia and flax seeds</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="text-red-400 font-semibold mb-2">Bad Fats</p>
                                        <ul className="text-[#8E8E93] text-sm space-y-1">
                                            <li>• Trans fats (hydrogenated oils)</li>
                                            <li>• Fried foods</li>
                                            <li>• Processed vegetable oils</li>
                                            <li>• Margarine</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h3 className="text-xl font-bold text-white mb-3">5. Minimize Added Sugar</h3>
                                <p className="text-[#c4c4c4] mb-4">
                                    Added sugar is one of the biggest threats to health. It contributes to obesity, diabetes, heart disease, and even skin aging. The average person consumes 17 teaspoons daily when the limit should be 6-9.
                                </p>
                                <p className="text-[#8E8E93]">
                                    <strong className="text-white">Hidden sugar sources:</strong> Sauces, dressings, bread, yogurt, granola bars, and &quot;healthy&quot; snacks often contain surprising amounts of added sugar.
                                </p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">Complete Healthy Food List</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Use this comprehensive list when shopping or planning meals. These foods form the foundation of a healthy diet.
                        </p>

                        {/* Vegetables */}
                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6 mb-6">
                            <h3 className="text-xl font-bold text-white mb-4">🥦 Vegetables (Unlimited)</h3>
                            <div className="grid md:grid-cols-3 gap-4 text-[#8E8E93]">
                                <div>
                                    <p className="text-[#22c55e] font-semibold mb-2">Leafy Greens</p>
                                    <ul className="text-sm space-y-1">
                                        <li>• Spinach</li>
                                        <li>• Kale</li>
                                        <li>• Arugula</li>
                                        <li>• Swiss chard</li>
                                        <li>• Romaine lettuce</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-[#22c55e] font-semibold mb-2">Cruciferous</p>
                                    <ul className="text-sm space-y-1">
                                        <li>• Broccoli</li>
                                        <li>• Cauliflower</li>
                                        <li>• Brussels sprouts</li>
                                        <li>• Cabbage</li>
                                        <li>• Bok choy</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-[#22c55e] font-semibold mb-2">Other Favorites</p>
                                    <ul className="text-sm space-y-1">
                                        <li>• Bell peppers</li>
                                        <li>• Zucchini</li>
                                        <li>• Tomatoes</li>
                                        <li>• Carrots</li>
                                        <li>• Asparagus</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Proteins */}
                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6 mb-6">
                            <h3 className="text-xl font-bold text-white mb-4">🍗 Proteins</h3>
                            <div className="grid md:grid-cols-3 gap-4 text-[#8E8E93]">
                                <div>
                                    <p className="text-[#22c55e] font-semibold mb-2">Fish & Seafood</p>
                                    <ul className="text-sm space-y-1">
                                        <li>• Salmon (wild-caught)</li>
                                        <li>• Sardines</li>
                                        <li>• Mackerel</li>
                                        <li>• Cod</li>
                                        <li>• Shrimp</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-[#22c55e] font-semibold mb-2">Poultry & Eggs</p>
                                    <ul className="text-sm space-y-1">
                                        <li>• Chicken breast</li>
                                        <li>• Turkey</li>
                                        <li>• Whole eggs</li>
                                        <li>• Duck</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-[#22c55e] font-semibold mb-2">Plant-Based</p>
                                    <ul className="text-sm space-y-1">
                                        <li>• Lentils</li>
                                        <li>• Chickpeas</li>
                                        <li>• Black beans</li>
                                        <li>• Tofu</li>
                                        <li>• Tempeh</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Healthy Fats & Carbs */}
                        <div className="grid md:grid-cols-2 gap-6 mb-10">
                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h3 className="text-xl font-bold text-white mb-4">🥑 Healthy Fats</h3>
                                <ul className="text-[#8E8E93] space-y-2">
                                    <li>• Extra virgin olive oil</li>
                                    <li>• Avocados</li>
                                    <li>• Almonds & walnuts</li>
                                    <li>• Chia seeds</li>
                                    <li>• Flaxseeds</li>
                                    <li>• Coconut oil (in moderation)</li>
                                </ul>
                            </div>
                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h3 className="text-xl font-bold text-white mb-4">🌾 Complex Carbs</h3>
                                <ul className="text-[#8E8E93] space-y-2">
                                    <li>• Quinoa</li>
                                    <li>• Brown rice</li>
                                    <li>• Oats (steel-cut)</li>
                                    <li>• Sweet potatoes</li>
                                    <li>• Whole grain bread</li>
                                    <li>• Buckwheat</li>
                                </ul>
                            </div>
                        </div>

                        {/* App CTA */}
                        <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6 mb-10">
                            <h3 className="text-xl font-bold text-white mb-3">Not Sure What to Cook?</h3>
                            <p className="text-[#c4c4c4] mb-4">
                                The Sukali app has hundreds of healthy recipes using real, whole food ingredients. Scan any food to check its nutritional value and get personalized meal ideas based on what you have at home.
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

                        <h2 className="text-3xl font-bold text-white mb-6">Foods to Avoid or Limit</h2>

                        <div className="bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-2xl border border-red-500/30 p-6 mb-10">
                            <p className="text-[#c4c4c4] mb-4">
                                These foods contribute to inflammation, weight gain, and chronic disease. Minimize or eliminate them from your diet.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-red-400 font-semibold mb-3">Eliminate Completely</p>
                                    <ul className="text-[#8E8E93] space-y-2">
                                        <li>❌ Trans fats / hydrogenated oils</li>
                                        <li>❌ Sugary sodas and drinks</li>
                                        <li>❌ Processed meats (hot dogs, bologna)</li>
                                        <li>❌ Deep-fried foods</li>
                                        <li>❌ Artificial sweeteners in excess</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-yellow-400 font-semibold mb-3">Limit Significantly</p>
                                    <ul className="text-[#8E8E93] space-y-2">
                                        <li>⚠️ Refined sugar and sweets</li>
                                        <li>⚠️ White bread and pasta</li>
                                        <li>⚠️ Packaged snacks</li>
                                        <li>⚠️ Alcohol</li>
                                        <li>⚠️ Fast food</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">Sample Healthy Meal Plan</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Here is what a day of healthy eating looks like in practice:
                        </p>

                        <div className="space-y-4 mb-10">
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <p className="text-[#22c55e] font-semibold mb-2">🌅 Breakfast</p>
                                <p className="text-white font-medium">Greek Yogurt Bowl</p>
                                <p className="text-[#8E8E93] text-sm">Plain Greek yogurt + mixed berries + walnuts + chia seeds + drizzle of honey</p>
                                <p className="text-[#8E8E93] text-xs mt-2">~350 calories | 25g protein | 12g fiber</p>
                            </div>
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <p className="text-[#22c55e] font-semibold mb-2">☀️ Lunch</p>
                                <p className="text-white font-medium">Mediterranean Salad</p>
                                <p className="text-[#8E8E93] text-sm">Mixed greens + grilled chicken + cucumber + tomatoes + olives + feta + olive oil dressing</p>
                                <p className="text-[#8E8E93] text-xs mt-2">~450 calories | 35g protein | 8g fiber</p>
                            </div>
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <p className="text-[#22c55e] font-semibold mb-2">🌙 Dinner</p>
                                <p className="text-white font-medium">Baked Salmon with Vegetables</p>
                                <p className="text-[#8E8E93] text-sm">Wild salmon + roasted broccoli + quinoa + lemon-herb sauce</p>
                                <p className="text-[#8E8E93] text-xs mt-2">~500 calories | 40g protein | 6g fiber</p>
                            </div>
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <p className="text-[#22c55e] font-semibold mb-2">🍎 Snacks</p>
                                <p className="text-[#8E8E93] text-sm">Apple with almond butter | Handful of mixed nuts | Carrot sticks with hummus</p>
                                <p className="text-[#8E8E93] text-xs mt-2">~300 calories total</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">How to Start Eating Healthy</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            The key to lasting change is starting small. Here is a 4-week plan to transition to healthier eating:
                        </p>

                        <div className="space-y-4 mb-10">
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-10 h-10 bg-[#22c55e] text-black font-bold rounded-full flex items-center justify-center">1</span>
                                <div>
                                    <p className="text-white font-semibold">Week 1: Add More Vegetables</p>
                                    <p className="text-[#8E8E93]">Add one extra serving of vegetables to each meal. Keep everything else the same.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-10 h-10 bg-[#22c55e] text-black font-bold rounded-full flex items-center justify-center">2</span>
                                <div>
                                    <p className="text-white font-semibold">Week 2: Cut Sugary Drinks</p>
                                    <p className="text-[#8E8E93]">Replace soda, juice, and sweetened coffee with water, unsweetened tea, or black coffee.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-10 h-10 bg-[#22c55e] text-black font-bold rounded-full flex items-center justify-center">3</span>
                                <div>
                                    <p className="text-white font-semibold">Week 3: Cook More at Home</p>
                                    <p className="text-[#8E8E93]">Prepare at least 4 dinners at home this week. Use simple recipes with whole ingredients.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-10 h-10 bg-[#22c55e] text-black font-bold rounded-full flex items-center justify-center">4</span>
                                <div>
                                    <p className="text-white font-semibold">Week 4: Upgrade Your Proteins</p>
                                    <p className="text-[#8E8E93]">Replace processed meats with fish, chicken, or plant-based proteins like lentils.</p>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>

                        <div className="space-y-6 mb-10">
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <h3 className="text-lg font-bold text-white mb-2">What is the healthiest diet to follow?</h3>
                                <p className="text-[#8E8E93]">
                                    The Mediterranean diet is consistently ranked #1 by nutrition experts. It focuses on vegetables, olive oil, fish, whole grains, and moderate amounts of poultry and dairy. It is associated with lower rates of heart disease, diabetes, and cognitive decline.
                                </p>
                            </div>
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <h3 className="text-lg font-bold text-white mb-2">What foods should I eat every day?</h3>
                                <p className="text-[#8E8E93]">
                                    Aim to eat daily: leafy greens, colorful vegetables, lean protein, whole grains, berries or low-sugar fruits, nuts or seeds, and plenty of water. These provide the essential nutrients your body needs to thrive.
                                </p>
                            </div>
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <h3 className="text-lg font-bold text-white mb-2">Is healthy eating expensive?</h3>
                                <p className="text-[#8E8E93]">
                                    It does not have to be. Focus on affordable staples: eggs, canned beans, frozen vegetables, oats, and seasonal produce. Cooking at home is almost always cheaper than eating out or buying processed foods.
                                </p>
                            </div>
                        </div>

                        {/* Bottom CTA */}
                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-3">Ready to Eat Healthier?</h3>
                                <p className="text-[#8E8E93] mb-6 max-w-lg mx-auto">
                                    Download Sukali fo get hundreds of healthy recipes, meal plans, and the tools to track your nutrition. Start your health journey today.
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
                title="Want to Eat Healthier?"
                description="Get hundreds of nutritious recipes and personalized meal plans in the Sukali app. Start your health journey today."
            />
        </main>
    )
}
