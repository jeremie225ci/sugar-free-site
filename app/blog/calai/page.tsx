import Image from "next/image"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import StickyDownloadBar from "@/components/StickyDownloadBar"
import AppPromoPopup from "@/components/AppPromoPopup"

export default function CalaiPage() {
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
                        <span className="text-[#22c55e]">App Reviews</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Calai App Review 2026: Is This AI Calorie Counter Worth It?
                    </h1>
                    <p className="text-xl text-[#8E8E93] mb-8">
                        I tested Calai for 30 days to see if their AI-powered calorie tracking actually works. Here is my honest review and whether there is a better option.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-[#8E8E93] mb-8">
                        <span>Sukali Team</span>
                        <span>•</span>
                        <span>January 22, 2026</span>
                        <span>•</span>
                        <span>12 min read</span>
                    </div>

                    <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
                        <Image
                            src="/assets/images/blog-images/calai.png"
                            alt="Calai app review - AI calorie counter"
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
                            Calai is one of the newer calorie tracking apps that uses AI to identify food from photos. Take a picture of your meal, and the app estimates calories. Sounds convenient. But does it actually work for weight loss?
                        </p>

                        <p className="text-[#c4c4c4] text-lg mb-8">
                            I used Calai daily for a month to test its accuracy, features, and whether it helped me lose weight. Here is everything you need to know before downloading.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">What Is Calai?</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Calai is an AI-powered calorie counting app that uses your phone camera to identify foods and estimate their nutritional content. The idea is simple: instead of manually searching for every food item, you snap a photo and let the AI do the work.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            The app also tracks macros (protein, carbs, fat), provides meal suggestions, and shows your daily progress toward calorie goals. It is available on both iOS and Android.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">How Calai Works</h2>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Photo recognition.</strong> Point your camera at food, and the AI identifies what it is. It then pulls nutritional data from its database to estimate calories.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Portion estimation.</strong> The app tries to estimate portion sizes from the photo. This is where things get tricky, which I will discuss later.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Manual logging.</strong> You can also search for foods manually or scan barcodes, like other calorie apps.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Daily tracking.</strong> The app shows your total calories, remaining budget, and macro breakdown throughout the day.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">What I Liked About Calai</h2>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Speed.</strong> Taking a photo is faster than searching through a database. For simple meals like a banana or sandwich, it works quickly.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Clean interface.</strong> The app looks modern and is easy to navigate. Setting up took about two minutes.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">AI is improving.</strong> The technology seems better than earlier versions I tried. It correctly identified most common foods.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">No manual calculation.</strong> You do not need to weigh food or do math. Just snap and log.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Where Calai Falls Short</h2>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Portion accuracy is a guess.</strong> This is the biggest problem. The AI cannot accurately judge how much food is on your plate from a photo. A serving could be 300 calories or 600 depending on actual size, but the app cannot tell the difference.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Mixed dishes are problematic.</strong> Salads, stir-fries, and multi-ingredient meals often get incorrect estimations. The AI struggles to identify individual components.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Still requires manual correction.</strong> I found myself editing entries more often than expected. At that point, manually logging might be faster.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Subscription cost.</strong> The premium features require a paid subscription. Free version is limited.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Only tracks calories.</strong> Weight loss is not just about calories. Sugar, in particular, affects your hunger, cravings, and metabolism in ways that calorie counting does not capture.
                        </p>

                        <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6 mb-8">
                            <h3 className="text-xl font-bold text-white mb-3">Want a Better Approach to Weight Loss?</h3>
                            <p className="text-[#c4c4c4] mb-4">
                                Sukali focuses on sugar instead of calories. Cut hidden sugars, reduce cravings, and lose weight without obsessive calorie counting.
                            </p>
                            <a
                                href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#22c55e] text-black font-bold rounded-full hover:opacity-90"
                            >
                                Try Sukali Free
                            </a>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">Calai Pricing</h2>

                        <p className="text-[#c4c4c4] mb-4">
                            Calai offers a free version with basic features and a premium subscription for full access.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Free tier:</strong> Limited photo scans per day, basic tracking, ads.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Premium:</strong> Unlimited scans, detailed insights, no ads. Pricing varies but typically runs around 8 to 12 euros per month or less with annual subscription.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            For what the app offers, this pricing is reasonable but not cheap. You are paying for the AI technology convenience.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Does Calai Work for Weight Loss?</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Here is my honest take after 30 days: Calai can help with awareness, but it has fundamental limitations.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            The accuracy issues mean your calorie counts are estimates at best. I found discrepancies of 200 to 400 calories on some days compared to when I weighed food and logged manually.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            More importantly, calorie counting itself has limitations. It treats all calories equally. 300 calories from a candy bar affects your body very differently than 300 calories from eggs and vegetables. Sugar spikes insulin, triggers cravings, and makes you hungrier. These effects are invisible in a calorie tracker.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            I lost some weight using Calai, but I was constantly hungry and thinking about food. The calorie restriction felt unsustainable.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">The Problem With Calorie Counting</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            After testing numerous calorie apps, I have come to believe the approach is flawed. Here is why:
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Estimates are always wrong.</strong> Even with weighing and measuring, calorie counts are approximations. The difference can be hundreds of calories daily.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">It ignores hormones.</strong> Weight loss is hormonal, not just mathematical. Insulin, leptin, and ghrelin drive hunger and fat storage. Calorie counting ignores these.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Sugar is the real problem.</strong> For most people, hidden sugar is what causes weight gain, cravings, and the inability to feel satisfied. Cut sugar, and calories often take care of themselves because your hunger normalizes.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">It is exhausting.</strong> Logging every bite long-term is mentally draining. Most people quit within weeks.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">A Better Alternative: Focus on Sugar</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Instead of counting every calorie, what if you focused on one thing that matters most? Sugar.
                        </p>

                        <p className="text-[#c4c4c4] mb-6">
                            Sugar drives hunger, cravings, and fat storage. Cut sugar, and your appetite naturally decreases. You feel satisfied with less food. Weight loss happens without obsessive tracking.
                        </p>

                        <p className="text-[#c4c4c4] mb-6">
                            This is why I switched to Sukali. Instead of tracking calories, I scan foods for hidden sugars. The app shows me what to avoid and suggests sugar-free alternatives. No calorie counting, no weighing food, no exhausting daily logging.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            After using Sukali for the same 30 days, I actually lost more weight with less effort. My cravings decreased, energy stabilized, and I was not constantly hungry like with calorie restriction.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Calai vs Sukali: Which Is Better?</h2>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Use Calai if:</strong> You believe in calorie counting and want AI-assisted logging. Just know the limitations and be prepared to make corrections.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Use Sukali if:</strong> You want sustainable weight loss without obsessive tracking. Focus on cutting sugar, reduce cravings naturally, and let your body regulate calories on its own.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">The Bottom Line</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Calai is a decent calorie tracking app with interesting AI features. For people committed to calorie counting, it offers convenience over manual logging. But the accuracy issues and fundamental limitations of calorie counting remain.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            If you have struggled with calorie counting apps in the past, consider a different approach. Focusing on sugar rather than calories has worked better for me and many others. Less tracking, more results, and actually sustainable long-term.
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-3">Try the Sugar-Free Approach</h3>
                                <p className="text-[#8E8E93] mb-6 max-w-lg mx-auto">
                                    Download Sukali to scan foods for hidden sugars, get 100+ sugar-free recipes, and lose weight without counting every calorie.
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
                title="Tired of Calorie Counting?"
                description="Try a different approach. Scan foods for sugar and lose weight without tracking every bite."
            />
        </main>
    )
}
