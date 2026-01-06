import Image from "next/image"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import StickyDownloadBar from "@/components/StickyDownloadBar"
import AppPromoPopup from "@/components/AppPromoPopup"

export default function AspartamePage() {
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Aspartame: The Complete Guide to This Controversial Sweetener",
        "description": "Everything you need to know about aspartame: safety, WHO classification, side effects, and healthier alternatives.",
        "author": {
            "@type": "Organization",
            "name": "Sukali"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Sukali",
            "url": "https://www.sugar-frees.com"
        },
        "datePublished": "2026-01-06",
        "dateModified": "2026-01-06",
        "image": "https://www.sugar-frees.com/assets/images/blog-images/aspartame.png"
    }

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Is aspartame safe to consume?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Regulatory agencies including the FDA and EFSA consider aspartame safe at current consumption levels. The ADI (Acceptable Daily Intake) is 40mg per kg of body weight. For a 70kg person, this equals about 14 cans of diet soda daily."
                }
            },
            {
                "@type": "Question",
                "name": "Did the WHO say aspartame causes cancer?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "In July 2023, IARC classified aspartame as 'possibly carcinogenic to humans' (Group 2B). However, JECFA maintained the safe daily intake level, concluding that the evidence does not indicate concern at typical consumption levels."
                }
            },
            {
                "@type": "Question",
                "name": "What are the side effects of aspartame?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Some people report headaches, dizziness, and digestive issues. People with phenylketonuria (PKU) must avoid aspartame as they cannot metabolize phenylalanine. Scientific evidence for other reported effects remains inconclusive."
                }
            },
            {
                "@type": "Question",
                "name": "What are healthier alternatives to aspartame?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Natural alternatives include stevia (from plant leaves), monk fruit (zero calories, no blood sugar impact), and erythritol (sugar alcohol with minimal calories). Reducing overall sweetener consumption is the healthiest long-term approach."
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
                        <span className="text-[#22c55e]">Health & Science</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Aspartame: The Complete Guide to This Controversial Sweetener
                    </h1>
                    <p className="text-xl text-[#8E8E93] mb-8">
                        Is aspartame safe? What did the WHO really say? We break down the science, the controversy, and what it means for your health.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-[#8E8E93] mb-6">
                        <span>Sukali Team</span>
                        <span>•</span>
                        <span>January 6, 2026</span>
                        <span>•</span>
                        <span>15 min read</span>
                    </div>

                    {/* Top CTA */}
                    <div className="bg-gradient-to-r from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-4 mb-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-white font-medium">Want to quit sugar and artificial sweeteners for good?</p>
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
                            src="/assets/images/blog-images/aspartame.png"
                            alt="Aspartame guide - understanding artificial sweeteners"
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
                            Aspartame is one of the most studied and controversial food additives in history. Found in over 6,000 products worldwide, from diet sodas to sugar-free gum, it has been at the center of health debates for decades. In July 2023, headlines exploded when the WHO classified aspartame as &quot;possibly carcinogenic.&quot; But what does this really mean for you?
                        </p>

                        <p className="text-[#c4c4c4] text-lg mb-8">
                            This comprehensive guide examines the science, separates fact from fear, and helps you make informed decisions about aspartame and your health.
                        </p>

                        {/* Table of Contents */}
                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6 mb-10">
                            <h3 className="text-xl font-bold text-white mb-4">In This Article</h3>
                            <ul className="space-y-2 text-[#8E8E93]">
                                <li>• What is Aspartame?</li>
                                <li>• The WHO Classification Explained</li>
                                <li>• How Much Aspartame is Safe?</li>
                                <li>• Common Side Effects</li>
                                <li>• Who Should Avoid Aspartame</li>
                                <li>• Healthier Alternatives</li>
                                <li>• The Bottom Line</li>
                            </ul>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">What is Aspartame?</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Aspartame is an artificial sweetener discovered in 1965 by chemist James Schlatter. It is approximately 200 times sweeter than sugar, which means very small amounts can provide significant sweetness without adding calories.
                        </p>

                        <p className="text-[#c4c4c4] mb-6">
                            Chemically, aspartame is made of two amino acids: aspartic acid and phenylalanine. When you consume aspartame, your body breaks it down into these amino acids plus a small amount of methanol. All three substances occur naturally in many foods you already eat.
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6 mb-10">
                            <h3 className="text-xl font-bold text-white mb-4">Common Products Containing Aspartame</h3>
                            <div className="grid grid-cols-2 gap-4 text-[#8E8E93]">
                                <div>
                                    <p className="font-semibold text-white mb-2">Beverages</p>
                                    <ul className="space-y-1 text-sm">
                                        <li>• Diet Coke, Coke Zero</li>
                                        <li>• Diet Pepsi</li>
                                        <li>• Crystal Light</li>
                                        <li>• Sugar-free iced tea</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-semibold text-white mb-2">Foods</p>
                                    <ul className="space-y-1 text-sm">
                                        <li>• Sugar-free gum</li>
                                        <li>• Sugar-free yogurt</li>
                                        <li>• Sugar-free candy</li>
                                        <li>• Protein bars</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-semibold text-white mb-2">Tabletop Sweeteners</p>
                                    <ul className="space-y-1 text-sm">
                                        <li>• Equal</li>
                                        <li>• NutraSweet</li>
                                        <li>• Canderel</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-semibold text-white mb-2">Other Products</p>
                                    <ul className="space-y-1 text-sm">
                                        <li>• Some medications</li>
                                        <li>• Vitamins</li>
                                        <li>• Cough drops</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">The WHO Classification: What It Really Means</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            In July 2023, the International Agency for Research on Cancer (IARC), part of the WHO, classified aspartame as &quot;possibly carcinogenic to humans&quot; (Group 2B). This made headlines worldwide and understandably caused concern. But the full story is more nuanced.
                        </p>

                        <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 rounded-2xl border border-yellow-500/30 p-6 mb-8">
                            <h3 className="text-xl font-bold text-white mb-3">⚠️ Understanding Group 2B Classification</h3>
                            <p className="text-[#c4c4c4] mb-4">
                                Group 2B means there is &quot;limited evidence&quot; of cancer risk in humans. This is the same category as:
                            </p>
                            <ul className="text-[#8E8E93] space-y-2">
                                <li>• Aloe vera (whole leaf extract)</li>
                                <li>• Pickled vegetables (traditional Asian)</li>
                                <li>• Radiofrequency electromagnetic fields (mobile phones)</li>
                                <li>• Caffeic acid (found in coffee)</li>
                            </ul>
                            <p className="text-[#c4c4c4] mt-4">
                                This classification describes hazard (could it cause cancer under any circumstances) not risk (how likely is it to cause cancer at normal consumption levels).
                            </p>
                        </div>

                        <p className="text-[#c4c4c4] mb-6">
                            Importantly, on the exact same day as the IARC announcement, another WHO body called JECFA (Joint FAO/WHO Expert Committee on Food Additives) released their own review. They <strong className="text-white">maintained the existing safe daily intake level</strong>, concluding there was no convincing evidence that aspartame is unsafe at typical consumption levels.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            In other words: The classification says aspartame might potentially be harmful in some theoretical scenario, but the actual risk assessment says current consumption levels appear to be safe.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">How Much Aspartame is Safe?</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            The Acceptable Daily Intake (ADI) for aspartame, established by regulatory agencies worldwide, is <strong className="text-white">40 mg per kilogram of body weight</strong>. This limit has been maintained for decades and was reaffirmed by JECFA in 2023.
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6 mb-10">
                            <h3 className="text-xl font-bold text-white mb-4">What Does This Mean in Practice?</h3>
                            <p className="text-[#c4c4c4] mb-4">For a 70 kg (154 lb) person, the daily limit is 2,800 mg of aspartame.</p>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-[#38383A]">
                                        <th className="text-left text-white py-3">Product</th>
                                        <th className="text-right text-white py-3">Aspartame</th>
                                        <th className="text-right text-white py-3">Daily Limit</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[#8E8E93]">
                                    <tr className="border-b border-[#38383A]">
                                        <td className="py-3">Diet soda (12 oz can)</td>
                                        <td className="text-right">~180 mg</td>
                                        <td className="text-right text-[#22c55e]">~15 cans</td>
                                    </tr>
                                    <tr className="border-b border-[#38383A]">
                                        <td className="py-3">Sugar-free gum (1 piece)</td>
                                        <td className="text-right">~6-8 mg</td>
                                        <td className="text-right text-[#22c55e]">~350 pieces</td>
                                    </tr>
                                    <tr className="border-b border-[#38383A]">
                                        <td className="py-3">Tabletop sweetener packet</td>
                                        <td className="text-right">~35 mg</td>
                                        <td className="text-right text-[#22c55e]">~80 packets</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3">Sugar-free yogurt</td>
                                        <td className="text-right">~100 mg</td>
                                        <td className="text-right text-[#22c55e]">~28 servings</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="text-[#8E8E93] text-sm mt-4">
                                Most people consume far below these levels. Studies show average consumption is typically 5-15% of the ADI.
                            </p>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">Common Side Effects and Concerns</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            While aspartame is approved as safe, some people report experiencing side effects. Here is what the science says about the most common concerns.
                        </p>

                        <div className="space-y-6 mb-10">
                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h4 className="text-xl font-bold text-white mb-3">Headaches</h4>
                                <p className="text-[#8E8E93] mb-3">
                                    One of the most frequently reported complaints. Some clinical trials have found a small subset of people who appear genuinely sensitive to aspartame-triggered headaches. However, larger controlled studies have not found aspartame to cause headaches more than placebo.
                                </p>
                                <p className="text-[#c4c4c4]">
                                    <strong>Recommendation:</strong> If you consistently get headaches after consuming aspartame, you may be among those who are sensitive. Consider eliminating it and monitoring your symptoms.
                                </p>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h4 className="text-xl font-bold text-white mb-3">Digestive Issues</h4>
                                <p className="text-[#8E8E93] mb-3">
                                    Some people report bloating, gas, or diarrhea. This is more commonly associated with sugar alcohols (like sorbitol or maltitol) that often appear alongside aspartame in products.
                                </p>
                                <p className="text-[#c4c4c4]">
                                    <strong>Recommendation:</strong> Check ingredient labels. If a product contains multiple sweeteners, it may be another ingredient causing the issue.
                                </p>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h4 className="text-xl font-bold text-white mb-3">Weight Gain Paradox</h4>
                                <p className="text-[#8E8E93] mb-3">
                                    Surprisingly, some studies suggest artificial sweeteners may not help with weight loss and could potentially contribute to weight gain. The theories include:
                                </p>
                                <ul className="text-[#8E8E93] space-y-1 mb-3">
                                    <li>• Disruption of gut bacteria</li>
                                    <li>• Altered taste preferences leading to more sweet cravings</li>
                                    <li>• Psychological compensation (eating more because drink is diet)</li>
                                    <li>• Effects on insulin response</li>
                                </ul>
                                <p className="text-[#c4c4c4]">
                                    <strong>Recommendation:</strong> Artificial sweeteners should not be viewed as a free pass. Reducing overall sweetness in your diet is the best long-term strategy.
                                </p>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <h4 className="text-xl font-bold text-white mb-3">Gut Microbiome Effects</h4>
                                <p className="text-[#8E8E93] mb-3">
                                    Emerging research suggests artificial sweeteners may alter gut bacteria composition. A 2022 study in Cell found that some people&apos;s blood sugar responses were affected by artificial sweeteners, potentially through gut microbiome changes.
                                </p>
                                <p className="text-[#c4c4c4]">
                                    <strong>Recommendation:</strong> This research is still developing. If gut health is a priority, limiting all artificial sweeteners may be prudent.
                                </p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">Who Should Definitely Avoid Aspartame</h2>

                        <div className="bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-2xl border border-red-500/30 p-6 mb-10">
                            <h3 className="text-xl font-bold text-white mb-4">⛔ People with Phenylketonuria (PKU)</h3>
                            <p className="text-[#c4c4c4] mb-4">
                                This is the only group that absolutely must avoid aspartame. PKU is a rare genetic condition where the body cannot properly process phenylalanine, one of the amino acids in aspartame.
                            </p>
                            <p className="text-[#8E8E93]">
                                PKU affects about 1 in 10,000-15,000 newborns. If you have PKU, you already know to avoid aspartame. All products containing aspartame must carry a warning label: &quot;Phenylketonurics: Contains Phenylalanine.&quot;
                            </p>
                        </div>

                        <p className="text-[#c4c4c4] mb-6">
                            Beyond PKU, certain groups may want to be more cautious:
                        </p>

                        <div className="space-y-3 mb-10">
                            <div className="flex items-start gap-4">
                                <span className="text-yellow-400 text-xl">⚠️</span>
                                <div>
                                    <p className="text-white font-semibold">Pregnant Women</p>
                                    <p className="text-[#8E8E93]">While considered safe, some women prefer to minimize artificial additives during pregnancy. Consult your healthcare provider.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-yellow-400 text-xl">⚠️</span>
                                <div>
                                    <p className="text-white font-semibold">Children</p>
                                    <p className="text-[#8E8E93]">The ADI is weight-based, so children reach limits at lower amounts. Water and milk remain the best beverage choices.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-yellow-400 text-xl">⚠️</span>
                                <div>
                                    <p className="text-white font-semibold">People with Chronic Conditions</p>
                                    <p className="text-[#8E8E93]">If you have ongoing health concerns, discuss sweetener choices with your doctor.</p>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">Healthier Alternatives to Aspartame</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            If you want to reduce or eliminate aspartame but still enjoy some sweetness, here are science-backed alternatives ranked from most to least natural:
                        </p>

                        <div className="space-y-6 mb-10">
                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#22c55e]/30 p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="px-3 py-1 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm font-medium">Best Choice</span>
                                    <h4 className="text-xl font-bold text-white">Stevia</h4>
                                </div>
                                <p className="text-[#8E8E93] mb-3">
                                    Extracted from the leaves of the Stevia rebaudiana plant. Zero calories, zero blood sugar impact. 200-300 times sweeter than sugar.
                                </p>
                                <p className="text-[#c4c4c4]">
                                    <strong>Best for:</strong> Coffee, tea, baking (with adjustments). Look for pure stevia without additives.
                                </p>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#22c55e]/30 p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="px-3 py-1 bg-[#22c55e]/20 text-[#22c55e] rounded-full text-sm font-medium">Excellent</span>
                                    <h4 className="text-xl font-bold text-white">Monk Fruit (Luo Han Guo)</h4>
                                </div>
                                <p className="text-[#8E8E93] mb-3">
                                    A natural sweetener from a fruit native to Southeast Asia. Zero calories, no blood sugar impact. 150-200 times sweeter than sugar.
                                </p>
                                <p className="text-[#c4c4c4]">
                                    <strong>Best for:</strong> Beverages, desserts, smoothies. Often combined with erythritol for better texture.
                                </p>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="px-3 py-1 bg-[#8E8E93]/20 text-[#8E8E93] rounded-full text-sm font-medium">Good</span>
                                    <h4 className="text-xl font-bold text-white">Erythritol</h4>
                                </div>
                                <p className="text-[#8E8E93] mb-3">
                                    A sugar alcohol that occurs naturally in some fruits. About 70% as sweet as sugar with only 0.2 calories per gram. Does not affect blood sugar.
                                </p>
                                <p className="text-[#c4c4c4]">
                                    <strong>Best for:</strong> Baking, where you need bulk. Easier digestive tolerance than other sugar alcohols.
                                </p>
                            </div>

                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="px-3 py-1 bg-[#8E8E93]/20 text-[#8E8E93] rounded-full text-sm font-medium">Moderate</span>
                                    <h4 className="text-xl font-bold text-white">Allulose</h4>
                                </div>
                                <p className="text-[#8E8E93] mb-3">
                                    A rare sugar found naturally in figs and raisins. Tastes and behaves like sugar but with only 0.4 calories per gram. Minimal blood sugar impact.
                                </p>
                                <p className="text-[#c4c4c4]">
                                    <strong>Best for:</strong> Baking and cooking where you want sugar-like results.
                                </p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">The Real Solution: Reducing Sweetness Overall</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Here is the truth that neither the sugar industry nor the artificial sweetener industry wants you to hear: the best approach is to gradually reduce your overall consumption of sweet-tasting foods and drinks.
                        </p>

                        <p className="text-[#c4c4c4] mb-6">
                            When you constantly consume sweet substances, whether sugar, aspartame, or even stevia, you maintain a high sweetness threshold. You continue to crave sweet foods. Your taste buds never reset.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            Research shows that after 2-4 weeks of reduced sugar consumption, taste sensitivity increases. Foods that once seemed boring become satisfying. Natural sweetness in fruits becomes more pronounced. Cravings decrease.
                        </p>

                        <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6 mb-10">
                            <h3 className="text-xl font-bold text-white mb-3">Track Your Sweetener Intake</h3>
                            <p className="text-[#c4c4c4] mb-4">
                                The Sukali app helps you identify hidden sugars and artificial sweeteners in your food. Scan any product to see exactly what is in it, track your daily intake, and gradually reduce your dependence on sweet foods.
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

                        <h2 className="text-3xl font-bold text-white mb-6">The Bottom Line</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Aspartame is one of the most studied food additives in history. At normal consumption levels, major regulatory agencies consider it safe. The WHO&apos;s 2023 classification as &quot;possibly carcinogenic&quot; was a hazard assessment, not a finding that typical consumption causes cancer.
                        </p>

                        <p className="text-[#c4c4c4] mb-6">
                            That said, science is evolving. New research on gut microbiome effects and metabolic impacts is emerging. If you are concerned about aspartame, there are natural alternatives like stevia and monk fruit that may offer acceptable sweetness with fewer uncertainties.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            The wisest long-term strategy is not to find the perfect sugar substitute but to gradually reduce your overall consumption of sweet foods. Your taste buds will adapt, your cravings will diminish, and your health will benefit.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>

                        <div className="space-y-6 mb-10">
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <h3 className="text-lg font-bold text-white mb-2">Is aspartame safe to consume?</h3>
                                <p className="text-[#8E8E93]">
                                    Regulatory agencies including the FDA and EFSA consider aspartame safe at current consumption levels. The ADI is 40mg per kg of body weight. For a 70kg person, this equals about 14 cans of diet soda daily, far more than most people consume.
                                </p>
                            </div>
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <h3 className="text-lg font-bold text-white mb-2">Did the WHO say aspartame causes cancer?</h3>
                                <p className="text-[#8E8E93]">
                                    In July 2023, IARC classified aspartame as &quot;possibly carcinogenic to humans&quot; (Group 2B). This indicates limited evidence and describes potential hazard, not actual risk at normal consumption. Notably, JECFA simultaneously reaffirmed the safe daily intake level.
                                </p>
                            </div>
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <h3 className="text-lg font-bold text-white mb-2">What are the most common side effects?</h3>
                                <p className="text-[#8E8E93]">
                                    Some people report headaches, dizziness, and digestive issues. People with phenylketonuria (PKU) must avoid aspartame as they cannot metabolize phenylalanine. Scientific evidence for other reported effects remains inconclusive in controlled studies.
                                </p>
                            </div>
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <h3 className="text-lg font-bold text-white mb-2">What are healthier alternatives?</h3>
                                <p className="text-[#8E8E93]">
                                    Natural alternatives include stevia (from plant leaves), monk fruit (zero calories, no blood sugar impact), and erythritol (sugar alcohol with minimal calories). The healthiest approach is gradually reducing overall sweetener consumption.
                                </p>
                            </div>
                        </div>

                        {/* Bottom CTA */}
                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-3">Ready to Quit Sugar & Artificial Sweeteners?</h3>
                                <p className="text-[#8E8E93] mb-6 max-w-lg mx-auto">
                                    Download Sukali to scan foods for hidden sugars and sweeteners, track your intake, and get personalized guidance on your journey to better health.
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
                title="Want to Quit Sugar for Good?"
                description="Download Sukali to track hidden sugars and artificial sweeteners in your food. Start your journey to better health today."
            />
        </main>
    )
}
