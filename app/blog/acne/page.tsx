import Image from "next/image"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import StickyDownloadBar from "@/components/StickyDownloadBar"
import AppPromoPopup from "@/components/AppPromoPopup"

export default function AcnePage() {
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
                        <span className="text-[#22c55e]">Skin Health</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Acne: The Sugar Connection Nobody Talks About
                    </h1>
                    <p className="text-xl text-[#8E8E93] mb-8">
                        I tried every acne treatment for years. Expensive creams, antibiotics, facials. Nothing worked until I discovered the real cause hiding in my diet.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-[#8E8E93] mb-8">
                        <span>Sukali Team</span>
                        <span>•</span>
                        <span>January 17, 2026</span>
                        <span>•</span>
                        <span>12 min read</span>
                    </div>

                    <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
                        <Image
                            src="/assets/images/blog-images/acne.png"
                            alt="Woman with clear skin after quitting sugar"
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
                            I spent my entire twenties fighting acne. I thought I just had bad skin. I tried everything. Benzoyl peroxide, salicylic acid, retinoids, antibiotics, even Accutane. Some things helped temporarily, but the breakouts always came back. Then I accidentally discovered the real cause when I cut sugar for an unrelated reason. Within two weeks, my skin was clearer than it had been in a decade.
                        </p>

                        <p className="text-[#c4c4c4] text-lg mb-8">
                            If you have been struggling with acne and nothing seems to work, this might be the answer you have been looking for. Let me explain exactly how sugar causes acne and what to do about it.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Why Sugar Causes Acne</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            The connection between sugar and acne is not some alternative health theory. It is backed by solid research. Multiple studies have shown that people who eat more sugar have significantly more acne. But the mechanism is what really matters.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Sugar spikes insulin.</strong> When you eat sugar, your blood glucose rises rapidly. Your pancreas releases insulin to bring it back down. This is normal. But when you eat sugar all day, insulin stays elevated all day. And insulin triggers a cascade of hormonal effects that lead directly to acne.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Insulin increases oil production.</strong> High insulin tells your sebaceous glands to produce more sebum, the oily substance that clogs pores. More oil means more clogged pores. More clogged pores means more acne. This is why people with insulin resistance often have oily skin.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Insulin triggers androgens.</strong> Insulin elevates hormones like IGF-1 and androgens. These hormones are powerfully acne-promoting. They increase skin cell production, stimulate oil glands, and create the perfect environment for breakouts. This is why acne often gets worse during puberty when these hormones are naturally elevated.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Sugar causes inflammation.</strong> Sugar is one of the most inflammatory substances you can eat. And acne is fundamentally an inflammatory condition. Those red, swollen pimples are inflammation made visible. Reduce inflammation and you reduce acne.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">The Research Is Clear</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            This is not speculation. Studies consistently show the sugar-acne link.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            A study in the Journal of the Academy of Nutrition and Dietetics found that participants who ate a low-glycemic diet had significantly fewer acne lesions than those who ate normally. The difference was visible within weeks.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            Research published in the American Journal of Clinical Nutrition showed that high-glycemic foods, meaning foods that spike blood sugar like sugar and refined carbs, directly increase sebum production and acne severity.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            Populations that eat traditional diets with little sugar have almost no acne at all. When they adopt Western diets high in sugar, acne rates skyrocket. This is not coincidence.
                        </p>

                        <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6 mb-8">
                            <h3 className="text-xl font-bold text-white mb-3">Find Hidden Sugar in Your Food</h3>
                            <p className="text-[#c4c4c4] mb-4">
                                Sugar hides in foods you would never expect. 73 percent of packaged foods contain added sugar. Use Sukali to scan any product and discover what is really in your food.
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

                        <h2 className="text-3xl font-bold text-white mb-6">Other Foods That Trigger Acne</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Sugar is the main culprit, but it is not the only dietary factor.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Dairy.</strong> Milk contains hormones and growth factors that can trigger breakouts. Skim milk is the worst because processing concentrates these compounds. Many people see dramatic improvement after eliminating dairy for just a few weeks.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Refined carbohydrates.</strong> White bread, pasta, and white rice convert to sugar in your body almost as fast as candy. They spike blood glucose and insulin the same way. For skin clearing purposes, treat them like sugar.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Processed foods.</strong> They contain hidden sugars, inflammatory oils, and chemicals that affect your skin. The more processed your diet, the more likely you are to have skin problems.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Alcohol.</strong> It is metabolized like sugar and causes inflammation and dehydration. Both make acne worse.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Foods That Clear Acne</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Just as some foods cause acne, others actively help clear your skin.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Fatty fish.</strong> Salmon, mackerel, and sardines contain omega-3 fatty acids that fight inflammation powerfully. Studies show omega-3 supplementation can reduce acne by up to 42 percent. Eat fatty fish two to three times per week.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Leafy greens.</strong> Spinach, kale, and other greens are rich in vitamins A and K that support skin health and healing. They also provide antioxidants that fight inflammation.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Berries.</strong> Packed with antioxidants that reduce inflammation and oxidative stress. They are also low in sugar compared to other fruits.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Zinc-rich foods.</strong> Oysters, pumpkin seeds, beef, and chickpeas contain zinc, which is crucial for skin health. Low zinc levels are associated with worse acne. Many dermatologists recommend zinc supplements.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Water.</strong> Hydration helps your skin function properly and flush toxins. Aim for eight or more glasses daily. Dehydrated skin heals more slowly and looks worse overall.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">The 14-Day Clear Skin Challenge</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Here is exactly what to do for the next two weeks to see if sugar is causing your acne.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Eliminate all added sugar.</strong> Check every label. Sugar hides in bread, sauces, dressings, and yogurt. If it has added sugar, do not eat it.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Cut refined carbohydrates.</strong> No white bread, white pasta, or white rice. Replace with whole grain versions or skip them entirely.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Consider eliminating dairy.</strong> For the clearest picture of what helps your skin, remove dairy too. You can test reintroducing it later.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Eat plenty of vegetables.</strong> Fill half your plate with greens at every meal. Add fatty fish two to three times per week.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Drink lots of water.</strong> At least eight glasses daily. More if you exercise.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Take photos.</strong> Photograph your skin on day one and day fourteen. The difference often surprises people.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">What to Expect</h2>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Days 1 to 3.</strong> You might not see changes yet. Sugar withdrawal can cause headaches and cravings. Your skin might even look worse initially as toxins clear.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Days 4 to 7.</strong> Inflammation starts decreasing. New breakouts slow down. Existing pimples may still be healing.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Days 8 to 14.</strong> This is where the magic happens. Most people see noticeably fewer breakouts. Skin looks calmer, less red, less oily. Existing acne heals faster.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">One month.</strong> Dramatic improvement for most people. Skin is clearer than it has been in years. Texture improves. Redness fades.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Three months.</strong> Transformation is complete. People will comment on your skin. Scars start fading. You look younger and healthier.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Why This Works Better Than Products</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Skincare products treat the surface. Diet treats the root cause. When you apply a cream, you are fighting symptoms. When you change your diet, you are eliminating the source of the problem.
                        </p>

                        <p className="text-[#c4c4c4] mb-6">
                            Products can help manage acne, but if you keep eating sugar, you are constantly pouring fuel on the fire while trying to put it out. Remove the fuel and the fire dies on its own.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            I am not saying throw away all your skincare. But if you have been fighting acne for years with products alone, addressing your diet might finally give you the results you have been looking for.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">The Bottom Line</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Sugar causes acne through multiple pathways. It spikes insulin which increases oil production. It triggers acne-promoting hormones. It causes inflammation that makes breakouts worse. Every one of these effects is supported by research.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            If you have tried everything else, try cutting sugar for 14 days. It costs nothing. There are no side effects except feeling better overall. And it might finally give you the clear skin you have been searching for.
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-3">Ready to Clear Your Skin?</h3>
                                <p className="text-[#8E8E93] mb-6 max-w-lg mx-auto">
                                    Download Sukali to scan foods for hidden sugars and get 100 plus sugar-free recipes. Your skin will thank you.
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
                title="Struggling with Acne?"
                description="Sugar causes breakouts. Scan foods to find hidden sugars and clear your skin from within."
            />
        </main>
    )
}
