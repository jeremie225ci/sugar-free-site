import Image from "next/image"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import StickyDownloadBar from "@/components/StickyDownloadBar"
import AppPromoPopup from "@/components/AppPromoPopup"

export default function DailyConsumptionOfSugarPage() {
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
                        Daily Consumption of Sugar: How Much Is Too Much?
                    </h1>
                    <p className="text-xl text-[#8E8E93] mb-8">
                        Most people have no idea how much sugar they eat each day. The number is usually shocking.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-[#8E8E93] mb-8">
                        <span>Sukali Team</span>
                        <span>•</span>
                        <span>January 12, 2026</span>
                        <span>•</span>
                        <span>10 min read</span>
                    </div>

                    <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
                        <Image
                            src="/assets/images/blog-images/sukali-app-scan.jpg"
                            alt="Sukali app showing sugar content breakdown of a meal"
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
                            How much sugar did you eat today? If you are like most people, you probably have no idea. And that is exactly the problem.
                        </p>

                        <p className="text-[#c4c4c4] text-lg mb-8">
                            Sugar hides everywhere. That seemingly healthy salad might have 15 grams in the dressing. Your morning coffee could have 30 grams before you even get to breakfast. By the end of the day, you have consumed far more than you realize.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">How Much Sugar Should You Eat Daily?</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            The World Health Organization recommends that added sugars should make up no more than 10% of your daily calories. Ideally, they say, it should be below 5%.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            For the average adult, that means:
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Maximum recommended:</strong> About 50 grams (12 teaspoons) per day
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Ideal target:</strong> About 25 grams (6 teaspoons) per day
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            The American Heart Association is even stricter, recommending no more than 36 grams for men and 25 grams for women of added sugar daily.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">What Are People Actually Consuming?</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Here is the scary part: the average American consumes about 77 grams of added sugar per day. That is more than triple the recommended amount.
                        </p>

                        <p className="text-[#c4c4c4] mb-6">
                            Over a year, that adds up to about 60 pounds of added sugar. Just from sugar alone, that is consuming about 100,000 extra calories.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            And most people do not even know they are doing it. They think they are eating reasonably healthy because they avoid obvious sweets. But the hidden sugars in everyday foods add up fast.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Where Is All This Sugar Coming From?</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Most of the sugar people consume does not come from the sugar bowl. It comes from processed foods where sugar is added during manufacturing.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Drinks</strong> are the biggest source. A single can of soda has about 39 grams of sugar. Fruit juice is often just as bad. Sports drinks, energy drinks, and fancy coffee drinks can have even more.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Sauces and condiments</strong> are sneaky offenders. Ketchup, BBQ sauce, pasta sauce, salad dressings, and teriyaki sauce all contain significant amounts of sugar.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Bread and baked goods</strong> often contain sugar even when they do not taste sweet. Check the label on your sandwich bread.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Flavored yogurt</strong> can have as much sugar as a candy bar. Same with granola bars and "healthy" breakfast cereals.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Ready meals and fast food</strong> almost always contain added sugar to enhance flavor and shelf life.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">The Difference Between Natural and Added Sugar</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Not all sugar is the same. There is an important distinction between natural sugars and added sugars.
                        </p>

                        <p className="text-[#c4c4c4] mb-6">
                            <strong className="text-white">Natural sugars</strong> are found in whole foods like fruits, vegetables, and dairy. These come packaged with fiber, vitamins, minerals, and water, which slow absorption and provide nutritional benefits.
                        </p>

                        <p className="text-[#c4c4c4] mb-6">
                            <strong className="text-white">Added sugars</strong> are sugars that manufacturers add to processed foods. These have no nutritional value beyond calories and are quickly absorbed, causing blood sugar spikes.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            When tracking daily sugar consumption, focus on added sugars. The sugar in an apple is not the same as the sugar in apple juice, even if the numbers on the label look similar.
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6 mb-8">
                            <h3 className="text-xl font-bold text-white mb-4">Example: A Typical Meal</h3>
                            <p className="text-[#c4c4c4] mb-4">
                                Take a chicken wrap with fries, something many people would consider a normal lunch. Here is what the sugar breakdown might look like:
                            </p>
                            <div className="flex flex-wrap gap-4 mb-4">
                                <div className="bg-black/40 rounded-xl p-4 text-center">
                                    <p className="text-red-400 text-2xl font-bold">28g</p>
                                    <p className="text-[#8E8E93] text-sm">Total Sugar</p>
                                </div>
                                <div className="bg-black/40 rounded-xl p-4 text-center">
                                    <p className="text-orange-400 text-2xl font-bold">25g</p>
                                    <p className="text-[#8E8E93] text-sm">Added Sugar</p>
                                </div>
                                <div className="bg-black/40 rounded-xl p-4 text-center">
                                    <p className="text-[#22c55e] text-2xl font-bold">3g</p>
                                    <p className="text-[#8E8E93] text-sm">Natural Sugar</p>
                                </div>
                            </div>
                            <p className="text-[#c4c4c4]">
                                That single meal already hits your entire recommended daily limit of added sugar. And most people do not even realize it.
                            </p>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">Why Does This Matter?</h2>

                        <p className="text-[#c4c4c4] mb-4">
                            Excessive sugar consumption is linked to a long list of health problems:
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Weight gain</strong> is the most obvious. Sugar provides empty calories that do not satisfy hunger, leading you to eat more overall.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Type 2 diabetes</strong> risk increases significantly with high sugar intake. Your body becomes less sensitive to insulin over time.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Heart disease</strong> is also linked to high sugar consumption. It increases inflammation, triglycerides, and blood pressure.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Fatty liver disease</strong> can develop when the liver is overwhelmed by fructose and starts converting it to fat.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Mental health</strong> is affected too. High sugar diets are associated with increased rates of depression and anxiety.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">How to Track Your Daily Sugar Consumption</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            The first step to reducing sugar is knowing how much you are actually eating. This is harder than it sounds because sugar hides under so many names on food labels.
                        </p>

                        <p className="text-[#c4c4c4] mb-6">
                            You could read every label and do the math yourself. But that is time-consuming and easy to get wrong.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            The easier way is to use an app that does it for you. Scan your food and instantly see exactly how much sugar it contains, with a breakdown of natural versus added sugars.
                        </p>

                        <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6 mb-8">
                            <h3 className="text-xl font-bold text-white mb-3">Know Your Daily Sugar Intake</h3>
                            <p className="text-[#c4c4c4] mb-4">
                                Want to know exactly how much sugar is in your food? Download Sukali and scan any meal or product. You will see the total sugar, added sugar, and natural sugar in seconds, plus dietary advice to help you make better choices.
                            </p>
                            <div className="relative aspect-[9/16] max-w-[200px] mx-auto rounded-2xl overflow-hidden mb-4">
                                <Image
                                    src="/assets/images/blog-images/sukali-app-scan.jpg"
                                    alt="Sukali app sugar scanning feature"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="text-center">
                                <a
                                    href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#22c55e] text-black font-bold rounded-full hover:opacity-90"
                                >
                                    Download Free
                                </a>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">How to Reduce Your Daily Sugar Intake</h2>

                        <p className="text-[#c4c4c4] mb-4">
                            Once you start tracking, reducing becomes much easier. Here are some practical strategies:
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Cut sugary drinks first.</strong> This is the single biggest change you can make. Switch to water, unsweetened tea, or black coffee.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Check sauces and condiments.</strong> Make your own dressings or choose low-sugar options..
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Choose plain versions.</strong> Plain yogurt instead of flavored. Plain oatmeal instead of instant packets. Add your own fruit for sweetness.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Cook more at home.</strong> When you cook, you control what goes in. Restaurant and packaged foods almost always contain more sugar.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Read labels religiously.</strong> Sugar has over 50 different names on labels. If it ends in -ose (sucrose, fructose, maltose) or includes words like syrup, nectar, or juice concentrate, it is sugar.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">The Bottom Line</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Most people consume two to three times more sugar than they should, and they do not even know it. The sugar is hidden in everyday foods that do not even taste sweet.
                        </p>

                        <p className="text-[#c4c4c4] mb-6">
                            The first step to reducing your daily consumption of sugar is awareness. Track what you eat for a week and you will probably be shocked at the numbers.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            Once you know where your sugar is coming from, cutting back becomes much easier. And the health benefits, from weight loss to better energy to reduced disease risk, are well worth the effort.
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-3">Start Tracking Your Sugar Today</h3>
                                <p className="text-[#8E8E93] mb-6 max-w-lg mx-auto">
                                    Download Sukali to scan any food and see exactly how much sugar it contains. Know your daily consumption and take control of your health.
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
                title="Know Your Daily Sugar Intake"
                description="Scan any food to see total, added, and natural sugar. Track your consumption easily."
            />
        </main>
    )
}
