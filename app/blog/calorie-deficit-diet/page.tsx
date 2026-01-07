import Image from "next/image"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import StickyDownloadBar from "@/components/StickyDownloadBar"
import AppPromoPopup from "@/components/AppPromoPopup"

export default function CalorieDeficitDietPage() {
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Calorie Deficit Diet: The Science-Backed Guide to Weight Loss",
        "description": "Master the calorie deficit diet for sustainable weight loss. Calculate your deficit, meal plans, and avoid common mistakes.",
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
        "image": "https://www.sugar-frees.com/assets/images/blog-images/calorie-deficit-diet.png"
    }

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How many calories should I eat to lose weight?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "To lose weight, you need to eat fewer calories than you burn. A deficit of 500 calories per day leads to about 0.5kg (1lb) of fat loss per week. Calculate your TDEE and subtract 300-500 calories for sustainable weight loss."
                }
            },
            {
                "@type": "Question",
                "name": "What is a safe calorie deficit?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A safe calorie deficit is typically 300-500 calories below your maintenance level. This allows for steady weight loss of 0.5-1kg per week while preserving muscle mass and avoiding metabolic adaptation."
                }
            },
            {
                "@type": "Question",
                "name": "What foods should I eat in a calorie deficit?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Focus on high-protein, high-fiber, low-calorie density foods: lean meats, fish, eggs, vegetables, fruits, legumes, and whole grains. These keep you full while staying within your calorie budget."
                }
            },
            {
                "@type": "Question",
                "name": "How long should I stay in a calorie deficit?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most experts recommend dieting for 8-16 weeks followed by a maintenance phase. Extended deficits can lead to metabolic adaptation, muscle loss, and hormonal issues. Take diet breaks every 3-4 months."
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
                        <span className="text-[#22c55e]">Weight Loss</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Calorie Deficit Diet: The Science-Backed Guide to Weight Loss
                    </h1>
                    <p className="text-xl text-[#8E8E93] mb-8">
                        The only proven method for fat loss. Learn how to calculate your deficit, what to eat, and avoid the mistakes that sabotage your progress.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-[#8E8E93] mb-6">
                        <span>Sukali Team</span>
                        <span>•</span>
                        <span>January 7, 2026</span>
                        <span>•</span>
                        <span>15 min read</span>
                    </div>

                    {/* Top CTA */}
                    <div className="bg-gradient-to-r from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-4 mb-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-white font-medium">Track calories and get low-cal recipes in our app.</p>
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
                            src="/assets/images/blog-images/calorie-deficit-diet.png"
                            alt="Calorie deficit diet meal with portion control"
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
                            Here is the truth that the diet industry does not want you to know: every single diet that has ever worked, from keto to vegan to intermittent fasting, works because it creates a calorie deficit. That is it. There is no magic food combination or meal timing trick. If you eat fewer calories than you burn, you will lose weight.
                        </p>

                        <p className="text-[#c4c4c4] text-lg mb-8">
                            This guide will teach you exactly how to create a sustainable calorie deficit that leads to lasting fat loss without extreme restriction, constant hunger, or losing muscle. Let&apos;s get started.
                        </p>

                        {/* Key Takeaway */}
                        <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6 mb-10">
                            <h3 className="text-xl font-bold text-white mb-3">💡 The Bottom Line</h3>
                            <p className="text-[#c4c4c4]">
                                A calorie deficit of <strong className="text-white">300-500 calories per day</strong> leads to fat loss of <strong className="text-white">0.5-1 kg (1-2 lbs) per week</strong>. This is the sweet spot for sustainable weight loss that preserves muscle and keeps you sane.
                            </p>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">What Is a Calorie Deficit?</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            A calorie deficit means you are consuming fewer calories than your body burns. When this happens, your body has to get energy from somewhere, so it taps into stored body fat.
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6 mb-8">
                            <p className="text-center text-white text-lg mb-4">The Weight Loss Equation</p>
                            <div className="flex items-center justify-center gap-4 text-center">
                                <div className="bg-black/50 rounded-xl p-4">
                                    <p className="text-[#22c55e] font-bold text-2xl">Calories In</p>
                                    <p className="text-[#8E8E93] text-sm">Food & drinks</p>
                                </div>
                                <span className="text-white text-3xl">&lt;</span>
                                <div className="bg-black/50 rounded-xl p-4">
                                    <p className="text-[#22c55e] font-bold text-2xl">Calories Out</p>
                                    <p className="text-[#8E8E93] text-sm">Metabolism + activity</p>
                                </div>
                                <span className="text-white text-3xl">=</span>
                                <div className="bg-[#22c55e]/20 rounded-xl p-4">
                                    <p className="text-[#22c55e] font-bold text-2xl">Fat Loss</p>
                                    <p className="text-[#8E8E93] text-sm">Guaranteed</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-[#c4c4c4] mb-8">
                            Your &quot;Calories Out&quot; is called your Total Daily Energy Expenditure (TDEE). It includes your Basal Metabolic Rate (calories burned at rest), exercise, and daily activities like walking, fidgeting, and digesting food.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">How to Calculate Your Calorie Deficit</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Follow these steps to find your personal calorie target for weight loss:
                        </p>

                        <div className="space-y-6 mb-10">
                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h3 className="text-xl font-bold text-white mb-4">Step 1: Calculate Your TDEE</h3>
                                <p className="text-[#c4c4c4] mb-4">
                                    Use this formula as a starting point (Mifflin-St Jeor equation):
                                </p>
                                <div className="bg-black/50 rounded-xl p-4 mb-4 font-mono text-sm">
                                    <p className="text-[#22c55e]">Men: (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5</p>
                                    <p className="text-[#22c55e] mt-2">Women: (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161</p>
                                </div>
                                <p className="text-[#8E8E93] text-sm">Then multiply by your activity level:</p>
                                <ul className="text-[#8E8E93] text-sm mt-2 space-y-1">
                                    <li>• Sedentary (desk job): × 1.2</li>
                                    <li>• Lightly active (1-2 workouts/week): × 1.375</li>
                                    <li>• Moderately active (3-5 workouts/week): × 1.55</li>
                                    <li>• Very active (6-7 workouts/week): × 1.725</li>
                                </ul>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h3 className="text-xl font-bold text-white mb-4">Step 2: Create Your Deficit</h3>
                                <p className="text-[#c4c4c4] mb-4">
                                    Subtract 300-500 calories from your TDEE. This is your daily calorie target for weight loss.
                                </p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-[#38383A]">
                                                <th className="text-left text-white py-3">Deficit Size</th>
                                                <th className="text-center text-white py-3">Weekly Loss</th>
                                                <th className="text-center text-white py-3">Best For</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-[#8E8E93]">
                                            <tr className="border-b border-[#38383A]">
                                                <td className="py-3">250 cal/day (small)</td>
                                                <td className="text-center text-[#22c55e]">~0.25 kg</td>
                                                <td className="text-center">Maintenance phase, athletes</td>
                                            </tr>
                                            <tr className="border-b border-[#38383A]">
                                                <td className="py-3 text-white font-medium">500 cal/day (moderate)</td>
                                                <td className="text-center text-[#22c55e]">~0.5 kg</td>
                                                <td className="text-center">Most people (recommended)</td>
                                            </tr>
                                            <tr className="border-b border-[#38383A]">
                                                <td className="py-3">750 cal/day (aggressive)</td>
                                                <td className="text-center text-yellow-400">~0.75 kg</td>
                                                <td className="text-center">Short-term only</td>
                                            </tr>
                                            <tr>
                                                <td className="py-3">1000+ cal/day (extreme)</td>
                                                <td className="text-center text-red-400">~1+ kg</td>
                                                <td className="text-center">Not recommended</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h3 className="text-xl font-bold text-white mb-4">Step 3: Real World Example</h3>
                                <div className="bg-black/50 rounded-xl p-4">
                                    <p className="text-white font-medium mb-2">Sarah, 30 years old, 70 kg, 165 cm, moderately active</p>
                                    <ul className="text-[#8E8E93] space-y-1">
                                        <li>BMR: (10 × 70) + (6.25 × 165) - (5 × 30) - 161 = <span className="text-white">1,420 cal</span></li>
                                        <li>TDEE: 1,420 × 1.55 = <span className="text-white">2,200 cal</span> (maintenance)</li>
                                        <li>Weight loss target: 2,200 - 500 = <span className="text-[#22c55e] font-bold">1,700 cal/day</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">Best Foods for a Calorie Deficit</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            In a calorie deficit, every calorie counts. You want foods that are filling, nutritious, and low in calorie density. Here are the best choices:
                        </p>

                        {/* High Volume Low Cal Foods */}
                        <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6 mb-8">
                            <h3 className="text-xl font-bold text-white mb-4">🥗 High Volume, Low Calorie (Eat Freely)</h3>
                            <p className="text-[#c4c4c4] mb-4">These foods let you eat large portions while staying in deficit:</p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <ul className="text-[#8E8E93] space-y-2">
                                        <li>✓ Leafy greens (spinach, lettuce, kale)</li>
                                        <li>✓ Cucumber, celery, zucchini</li>
                                        <li>✓ Tomatoes, bell peppers</li>
                                        <li>✓ Mushrooms</li>
                                        <li>✓ Broccoli, cauliflower</li>
                                    </ul>
                                </div>
                                <div>
                                    <ul className="text-[#8E8E93] space-y-2">
                                        <li>✓ Berries (strawberries, raspberries)</li>
                                        <li>✓ Watermelon</li>
                                        <li>✓ Egg whites</li>
                                        <li>✓ Clear soups</li>
                                        <li>✓ Sugar-free gelatin</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* High Protein Foods */}
                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6 mb-8">
                            <h3 className="text-xl font-bold text-white mb-4">🍗 High Protein (Essential for Muscle)</h3>
                            <p className="text-[#c4c4c4] mb-4">Protein keeps you full and preserves muscle during weight loss. Aim for 1.6-2.2g per kg of body weight.</p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-[#38383A]">
                                            <th className="text-left text-white py-2">Food</th>
                                            <th className="text-center text-white py-2">Calories</th>
                                            <th className="text-center text-white py-2">Protein</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[#8E8E93]">
                                        <tr className="border-b border-[#38383A]">
                                            <td className="py-2">Chicken breast (100g)</td>
                                            <td className="text-center">165 cal</td>
                                            <td className="text-center text-[#22c55e]">31g</td>
                                        </tr>
                                        <tr className="border-b border-[#38383A]">
                                            <td className="py-2">Greek yogurt 0% (200g)</td>
                                            <td className="text-center">130 cal</td>
                                            <td className="text-center text-[#22c55e]">20g</td>
                                        </tr>
                                        <tr className="border-b border-[#38383A]">
                                            <td className="py-2">Egg whites (4)</td>
                                            <td className="text-center">68 cal</td>
                                            <td className="text-center text-[#22c55e]">14g</td>
                                        </tr>
                                        <tr className="border-b border-[#38383A]">
                                            <td className="py-2">Cod fillet (100g)</td>
                                            <td className="text-center">82 cal</td>
                                            <td className="text-center text-[#22c55e]">18g</td>
                                        </tr>
                                        <tr className="border-b border-[#38383A]">
                                            <td className="py-2">Cottage cheese 1% (150g)</td>
                                            <td className="text-center">108 cal</td>
                                            <td className="text-center text-[#22c55e]">18g</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2">Turkey breast (100g)</td>
                                            <td className="text-center">135 cal</td>
                                            <td className="text-center text-[#22c55e]">30g</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Smart Carb Choices */}
                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6 mb-10">
                            <h3 className="text-xl font-bold text-white mb-4">🍠 Smart Carb Choices</h3>
                            <p className="text-[#c4c4c4] mb-4">Choose carbs that provide fiber and sustained energy:</p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-black/30 rounded-xl p-4">
                                    <p className="text-[#22c55e] font-semibold mb-2">Best Choices</p>
                                    <ul className="text-[#8E8E93] text-sm space-y-1">
                                        <li>• Oats (high fiber, filling)</li>
                                        <li>• Sweet potato (moderate cal)</li>
                                        <li>• Quinoa (complete protein)</li>
                                        <li>• Brown rice (in moderation)</li>
                                        <li>• Legumes (protein + fiber)</li>
                                    </ul>
                                </div>
                                <div className="bg-black/30 rounded-xl p-4">
                                    <p className="text-red-400 font-semibold mb-2">Limit or Avoid</p>
                                    <ul className="text-[#8E8E93] text-sm space-y-1">
                                        <li>• White bread</li>
                                        <li>• Pasta (calorie-dense)</li>
                                        <li>• White rice (low satiety)</li>
                                        <li>• Sugary cereals</li>
                                        <li>• Baked goods</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* App CTA */}
                        <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6 mb-10">
                            <h3 className="text-xl font-bold text-white mb-3">Track Your Calories Easily</h3>
                            <p className="text-[#c4c4c4] mb-4">
                                The Sukali app makes calorie tracking simple. Scan any food to see calories and macros instantly, access hundreds of low-calorie recipes, and stay on track with your deficit.
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

                        <h2 className="text-3xl font-bold text-white mb-6">Sample 1500 Calorie Meal Plan</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Here is what a day at 1500 calories looks like with high protein and volume:
                        </p>

                        <div className="space-y-4 mb-10">
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-[#22c55e] font-semibold">🌅 Breakfast (350 cal)</p>
                                    <span className="text-[#8E8E93] text-sm">30g protein</span>
                                </div>
                                <p className="text-white font-medium">Protein Oatmeal Bowl</p>
                                <p className="text-[#8E8E93] text-sm">40g oats + 1 scoop protein powder + 100g berries + 1 tbsp almond butter</p>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-[#22c55e] font-semibold">☀️ Lunch (400 cal)</p>
                                    <span className="text-[#8E8E93] text-sm">40g protein</span>
                                </div>
                                <p className="text-white font-medium">Giant Chicken Salad</p>
                                <p className="text-[#8E8E93] text-sm">150g chicken breast + unlimited leafy greens + cucumber + tomato + 1 tbsp olive oil + balsamic</p>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-[#22c55e] font-semibold">🍎 Snack (150 cal)</p>
                                    <span className="text-[#8E8E93] text-sm">15g protein</span>
                                </div>
                                <p className="text-white font-medium">Greek Yogurt with Berries</p>
                                <p className="text-[#8E8E93] text-sm">200g 0% Greek yogurt + 50g strawberries</p>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-[#22c55e] font-semibold">🌙 Dinner (500 cal)</p>
                                    <span className="text-[#8E8E93] text-sm">45g protein</span>
                                </div>
                                <p className="text-white font-medium">Salmon with Roasted Vegetables</p>
                                <p className="text-[#8E8E93] text-sm">150g salmon + 200g roasted broccoli + 100g sweet potato + lemon-dill sauce</p>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-[#22c55e] font-semibold">🍫 Evening Snack (100 cal)</p>
                                    <span className="text-[#8E8E93] text-sm">10g protein</span>
                                </div>
                                <p className="text-white font-medium">Cottage Cheese Bowl</p>
                                <p className="text-[#8E8E93] text-sm">100g cottage cheese + cinnamon</p>
                            </div>
                        </div>

                        <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-4 mb-10">
                            <p className="text-white font-semibold text-center">Daily Total: 1,500 cal | 140g protein | 150g carbs | 45g fat</p>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">Common Calorie Deficit Mistakes</h2>

                        <div className="space-y-4 mb-10">
                            <div className="bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-xl border border-red-500/30 p-5">
                                <h4 className="text-lg font-bold text-white mb-2">❌ Mistake #1: Cutting Too Many Calories</h4>
                                <p className="text-[#8E8E93]">
                                    Going below 1200 calories leads to muscle loss, metabolic slowdown, and inevitable bingeing. A moderate deficit is more sustainable and effective long-term.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-xl border border-red-500/30 p-5">
                                <h4 className="text-lg font-bold text-white mb-2">❌ Mistake #2: Not Eating Enough Protein</h4>
                                <p className="text-[#8E8E93]">
                                    In a deficit, your body can break down muscle for energy. High protein intake (1.6-2.2g/kg) prevents this and keeps you feeling full.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-xl border border-red-500/30 p-5">
                                <h4 className="text-lg font-bold text-white mb-2">❌ Mistake #3: Ignoring Liquid Calories</h4>
                                <p className="text-[#8E8E93]">
                                    Sodas, juices, lattes, and alcohol can add 500+ calories daily. Stick to water, black coffee, and unsweetened tea.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-xl border border-red-500/30 p-5">
                                <h4 className="text-lg font-bold text-white mb-2">❌ Mistake #4: Weekend Blowouts</h4>
                                <p className="text-[#8E8E93]">
                                    A 500 cal/day deficit creates a 3,500 cal weekly deficit. One big Saturday can erase the entire week. Consistency matters more than perfection.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-xl border border-red-500/30 p-5">
                                <h4 className="text-lg font-bold text-white mb-2">❌ Mistake #5: Not Taking Diet Breaks</h4>
                                <p className="text-[#8E8E93]">
                                    Extended deficits cause metabolic adaptation. After 8-12 weeks of dieting, spend 2-4 weeks eating at maintenance to reset hormones.
                                </p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">How Long Should You Stay in a Deficit?</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Your body adapts to prolonged dieting by reducing energy expenditure. This is why weight loss stalls and why &quot;starvation mode&quot; feels real. Here is the smart approach:
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6 mb-10">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <span className="flex-shrink-0 w-24 text-[#22c55e] font-bold">Weeks 1-12</span>
                                    <p className="text-[#8E8E93]">Active diet phase. Stay in your calculated deficit.</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="flex-shrink-0 w-24 text-yellow-400 font-bold">Weeks 13-16</span>
                                    <p className="text-[#8E8E93]">Diet break. Eat at maintenance (TDEE). This resets hormones and metabolism.</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="flex-shrink-0 w-24 text-[#22c55e] font-bold">Week 17+</span>
                                    <p className="text-[#8E8E93]">Resume deficit if needed, or maintain your new weight.</p>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>

                        <div className="space-y-6 mb-10">
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <h3 className="text-lg font-bold text-white mb-2">How many calories should I eat to lose weight?</h3>
                                <p className="text-[#8E8E93]">
                                    Calculate your TDEE and subtract 300-500 calories. For most women, this is 1200-1600 calories. For most men, 1500-2000 calories. Never go below 1200 calories without medical supervision.
                                </p>
                            </div>
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <h3 className="text-lg font-bold text-white mb-2">What is a safe calorie deficit?</h3>
                                <p className="text-[#8E8E93]">
                                    A deficit of 300-500 calories per day is considered safe and sustainable. This leads to weight loss of 0.25-0.5 kg per week while preserving muscle mass.
                                </p>
                            </div>
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <h3 className="text-lg font-bold text-white mb-2">Can I exercise in a calorie deficit?</h3>
                                <p className="text-[#8E8E93]">
                                    Yes, and you should. Resistance training is especially important to preserve muscle. Cardio can increase your deficit but do not use it as an excuse to eat more.
                                </p>
                            </div>
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <h3 className="text-lg font-bold text-white mb-2">Why am I not losing weight in a calorie deficit?</h3>
                                <p className="text-[#8E8E93]">
                                    Common reasons: underestimating calories (weigh your food), water retention (especially for women), building muscle while losing fat, or your deficit is not as big as you think. Give it 2-3 weeks of accurate tracking before adjusting.
                                </p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">The Bottom Line</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            A calorie deficit is the only scientifically proven way to lose fat. You do not need to buy special foods, follow complicated meal timing, or eliminate entire food groups. You just need to consistently eat fewer calories than you burn.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            Start with a moderate deficit of 500 calories, prioritize protein at every meal, fill up on vegetables, and be patient. One kilogram of fat contains about 7,700 calories. Slow progress is real progress. And remember: the best diet is the one you can stick to.
                        </p>

                        {/* Bottom CTA */}
                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-3">Ready to Start Your Calorie Deficit?</h3>
                                <p className="text-[#8E8E93] mb-6 max-w-lg mx-auto">
                                    Download Sukali to track your calories, access low-calorie recipes, and get personalized meal plans for weight loss.
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
                title="Want to Lose Weight Faster?"
                description="Track your calories with ease and get low-calorie recipes tailored for weight loss in the Sukali app."
            />
        </main>
    )
}
