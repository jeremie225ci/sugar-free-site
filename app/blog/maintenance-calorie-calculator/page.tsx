import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import StickyDownloadBar from "@/components/StickyDownloadBar"
import AppPromoPopup from "@/components/AppPromoPopup"
import CalorieCalculatorWidget from "@/components/CalorieCalculatorWidget"

export default function MaintenanceCalorieCalculatorPage() {
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
                        <span className="text-[#22c55e]">Fitness & Health</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Maintenance Calorie Calculator
                    </h1>
                    <p className="text-xl text-[#8E8E93] mb-8">
                        Calculate your daily calorie needs to maintain, lose, or gain weight. Based on the Mifflin-St Jeor equation used by nutrition professionals.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-[#8E8E93] mb-8">
                        <span>Sukali Team</span>
                        <span>•</span>
                        <span>Updated January 17, 2026</span>
                        <span>•</span>
                        <span>Calculator + Guide</span>
                    </div>
                </div>
            </section>

            <section className="bg-[#0A0A0A] py-16 md:py-24">
                <div className="mx-auto max-w-4xl px-4">

                    {/* Calculator Widget */}
                    <div className="mb-16">
                        <CalorieCalculatorWidget />
                    </div>

                    {/* Article Content */}
                    <article className="mx-auto max-w-3xl">
                        <div className="prose prose-invert prose-lg max-w-none">

                            <h2 className="text-3xl font-bold text-white mb-6">How This Calculator Works</h2>

                            <p className="text-[#c4c4c4] mb-6">
                                This maintenance calorie calculator uses the Mifflin-St Jeor equation, which is considered the most accurate formula for estimating basal metabolic rate (BMR). Your BMR is then multiplied by an activity factor to determine your total daily energy expenditure (TDEE).
                            </p>

                            <p className="text-[#c4c4c4] mb-4">
                                <strong className="text-white">For men:</strong> BMR = 10 × weight (kg) + 6.25 × height (cm) - 5 × age + 5
                            </p>

                            <p className="text-[#c4c4c4] mb-8">
                                <strong className="text-white">For women:</strong> BMR = 10 × weight (kg) + 6.25 × height (cm) - 5 × age - 161
                            </p>

                            <h2 className="text-3xl font-bold text-white mb-6">Understanding Your Results</h2>

                            <p className="text-[#c4c4c4] mb-4">
                                <strong className="text-white">Maintain weight:</strong> This is your TDEE, the number of calories needed to maintain your current weight with your activity level.
                            </p>

                            <p className="text-[#c4c4c4] mb-4">
                                <strong className="text-white">Mild weight loss (0.25 kg/week):</strong> About a 250 calorie daily deficit. Sustainable and minimal muscle loss.
                            </p>

                            <p className="text-[#c4c4c4] mb-4">
                                <strong className="text-white">Weight loss (0.5 kg/week):</strong> About a 500 calorie daily deficit. This is considered a healthy rate of weight loss.
                            </p>

                            <p className="text-[#c4c4c4] mb-8">
                                <strong className="text-white">Extreme weight loss (1 kg/week):</strong> About a 1000 calorie daily deficit. This may require eating below 1500 calories, which is not recommended without medical supervision.
                            </p>

                            <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6 mb-8">
                                <h3 className="text-xl font-bold text-white mb-3">Track Your Food Intake</h3>
                                <p className="text-[#c4c4c4] mb-4">
                                    Knowing your calorie target is just the first step. Use Sukali to scan foods and find hidden sugars that add empty calories.
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

                            <h2 className="text-3xl font-bold text-white mb-6">What Is Zigzag Calorie Cycling?</h2>

                            <p className="text-[#c4c4c4] mb-6">
                                When you eat the same number of calories every day, your body eventually adapts by slowing down metabolism. This leads to weight loss plateaus that frustrate many dieters.
                            </p>

                            <p className="text-[#c4c4c4] mb-6">
                                Zigzag calorie cycling prevents this adaptation by varying your daily intake while maintaining the same weekly average. Some days you eat more, some days less. Your body never fully adapts because the calorie intake keeps changing.
                            </p>

                            <p className="text-[#c4c4c4] mb-8">
                                The calculator provides two schedules. Schedule 1 alternates between higher weekend calories and lower weekday calories. Schedule 2 gradually increases and decreases calories throughout the week.
                            </p>

                            <h2 className="text-3xl font-bold text-white mb-6">Activity Level Definitions</h2>

                            <p className="text-[#c4c4c4] mb-4">
                                <strong className="text-white">Sedentary:</strong> Desk job with little or no exercise.
                            </p>

                            <p className="text-[#c4c4c4] mb-4">
                                <strong className="text-white">Light:</strong> Light exercise 1-3 days per week, or job with some walking.
                            </p>

                            <p className="text-[#c4c4c4] mb-4">
                                <strong className="text-white">Moderate:</strong> Moderate exercise 4-5 days per week, 30-60 minutes each session.
                            </p>

                            <p className="text-[#c4c4c4] mb-4">
                                <strong className="text-white">Active:</strong> Hard exercise 6-7 days per week, or physically demanding job.
                            </p>

                            <p className="text-[#c4c4c4] mb-8">
                                <strong className="text-white">Very Active:</strong> Very hard exercise daily, or highly physical job plus exercise.
                            </p>

                            <h2 className="text-3xl font-bold text-white mb-6">Tips for Using Your Calorie Target</h2>

                            <p className="text-[#c4c4c4] mb-4">
                                <strong className="text-white">Start conservative.</strong> Begin with the mild weight loss target. You can always reduce calories later if needed.
                            </p>

                            <p className="text-[#c4c4c4] mb-4">
                                <strong className="text-white">Track for a week.</strong> See how your body responds before making adjustments. Weight fluctuates daily due to water retention.
                            </p>

                            <p className="text-[#c4c4c4] mb-4">
                                <strong className="text-white">Focus on protein.</strong> When reducing calories, prioritize protein to maintain muscle mass. Aim for 1.6-2.2g per kg of body weight.
                            </p>

                            <p className="text-[#c4c4c4] mb-4">
                                <strong className="text-white">Cut sugar first.</strong> Sugar provides empty calories without nutrition or satiety. Eliminating added sugar is the easiest way to reduce calories without feeling deprived.
                            </p>

                            <p className="text-[#c4c4c4] mb-8">
                                <strong className="text-white">Recalculate as you lose weight.</strong> As your weight changes, your calorie needs change too. Recalculate every 5-10 kg lost.
                            </p>

                            <h2 className="text-3xl font-bold text-white mb-6">Common Mistakes</h2>

                            <p className="text-[#c4c4c4] mb-4">
                                <strong className="text-white">Underestimating portions.</strong> Most people underestimate how much they eat by 30-50%. Use a food scale initially.
                            </p>

                            <p className="text-[#c4c4c4] mb-4">
                                <strong className="text-white">Forgetting liquid calories.</strong> Sodas, juice, and alcohol add significant calories that are easy to overlook.
                            </p>

                            <p className="text-[#c4c4c4] mb-4">
                                <strong className="text-white">Overestimating exercise.</strong> Be honest about your activity level. Most people are less active than they think.
                            </p>

                            <p className="text-[#c4c4c4] mb-8">
                                <strong className="text-white">Going too low too fast.</strong> Extreme calorie restriction leads to muscle loss, metabolic slowdown, and eventual binge eating.
                            </p>

                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-white mb-3">Track Your Calories Easily</h3>
                                    <p className="text-[#8E8E93] mb-6 max-w-lg mx-auto">
                                        Download Sukali to scan foods and see exactly what you are eating. Find hidden sugars and stay on track with your calorie goals.
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
                </div>
            </section>

            <SiteFooter />
            <StickyDownloadBar />
            <AppPromoPopup
                title="Know Your Calorie Target?"
                description="Now track your food intake. Scan products to find hidden sugars adding empty calories."
            />
        </main>
    )
}
