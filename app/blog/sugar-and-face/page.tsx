import Image from "next/image"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import StickyDownloadBar from "@/components/StickyDownloadBar"
import AppPromoPopup from "@/components/AppPromoPopup"

export default function SugarAndFacePage() {
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
                        Sugar and Face: How Sugar Destroys Your Appearance
                    </h1>
                    <p className="text-xl text-[#8E8E93] mb-8">
                        That puffy look, those breakouts, the premature wrinkles. Your face is showing what you eat. Here is how sugar ruins your appearance and how to reverse the damage.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-[#8E8E93] mb-8">
                        <span>Sukali Team</span>
                        <span>•</span>
                        <span>January 20, 2026</span>
                        <span>•</span>
                        <span>10 min read</span>
                    </div>

                    <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
                        <Image
                            src="/assets/images/blog-images/sugar-and-face.png"
                            alt="Sugar effects on face and skin"
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
                            I used to spend hundreds on skincare products trying to fix my face. Serums, moisturizers, treatments. Nothing worked. Then I cut sugar and within two weeks, the puffiness in my face went down, my breakouts cleared, and people started asking what I was doing differently. The answer was not a cream. It was removing a poison from my diet.
                        </p>

                        <p className="text-[#c4c4c4] text-lg mb-8">
                            Your face shows what is happening inside your body. And sugar causes damage you can literally see in the mirror.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Sugar Face: What It Looks Like</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Dermatologists and aestheticians have a term for the facial changes caused by high sugar consumption. They call it sugar face. It has recognizable characteristics.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Puffy, bloated appearance.</strong> Sugar causes inflammation and water retention that shows up as puffiness, especially around the eyes and cheeks.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Lines and wrinkles on the forehead.</strong> Sugar damages collagen, and the forehead often shows this first.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Sagging under the eyes.</strong> Weakened collagen leads to loss of elasticity and sagging skin.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Acne, especially on the chin and jawline.</strong> Sugar spikes hormones that cause breakouts in these areas.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Dull, grayish complexion.</strong> Poor circulation and glycation give skin a tired, lifeless appearance.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">How Sugar Damages Your Face</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Sugar affects your face through several mechanisms.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Glycation.</strong> When you eat sugar, it binds to proteins in your skin through a process called glycation. This creates harmful compounds called AGEs (advanced glycation end products). AGEs directly damage collagen and elastin, the proteins that keep your skin firm and bouncy. Once damaged, these proteins become stiff and malformed, leading to wrinkles and sagging.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Inflammation.</strong> Sugar triggers inflammatory responses throughout your body, including your skin. Inflammation causes redness, puffiness, and accelerates breakdown of healthy tissue.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Hormonal spikes.</strong> Sugar spikes insulin and IGF-1, hormones that increase oil production and skin cell turnover. This leads directly to clogged pores and acne.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Dehydration.</strong> Sugar pulls water from cells, leaving skin dry and less plump. This makes fine lines more visible and contributes to a tired appearance.
                        </p>

                        <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6 mb-8">
                            <h3 className="text-xl font-bold text-white mb-3">Want to Fix Your Sugar Face?</h3>
                            <p className="text-[#c4c4c4] mb-4">
                                The first step is knowing how much sugar you actually eat. Use Sukali to scan foods and find hidden sugars destroying your appearance.
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

                        <h2 className="text-3xl font-bold text-white mb-6">Sugar and Acne</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            The link between sugar and acne is well-established in research. Multiple studies show that people who eat more sugar have significantly more acne.
                        </p>

                        <p className="text-[#c4c4c4] mb-6">
                            When you eat sugar, insulin spikes. High insulin increases oil production in your skin, triggers inflammation, and stimulates skin cell growth. All of these contribute to clogged pores and breakouts.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            Acne from sugar typically appears along the jawline and chin, but can occur anywhere. Many people who have tried every acne treatment finally get clear skin when they cut sugar.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Sugar and Puffy Face</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            If you wake up looking bloated, sugar is a likely cause. Sugar triggers inflammation and causes your body to retain water. This shows up most visibly in your face because facial skin is thinner and more susceptible to swelling.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            Many people notice their face looks slimmer and more defined within just a few days of cutting sugar. The puffiness that you might blame on genetics or aging is often just inflammation from what you eat.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Sugar and Premature Aging</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Glycation is one of the main causes of skin aging. Every time you eat sugar, you create AGEs that damage the structure of your skin. This damage accumulates over time, leading to wrinkles, sagging, and loss of elasticity.
                        </p>

                        <p className="text-[#c4c4c4] mb-6">
                            Research shows that people with higher blood sugar levels look older than their actual age. The difference is visible. High sugar consumption can add years to your appearance while cutting sugar can reverse some of this damage.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            Your body can repair some collagen damage when you stop creating new AGEs. This is why people often notice their skin looks younger and more vibrant after cutting sugar for a few months.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">How to Reverse Sugar Face</h2>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Cut added sugars.</strong> This is the most impactful change. Eliminate obvious sugars and read labels to find hidden ones.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Reduce refined carbohydrates.</strong> White bread, pasta, and rice convert quickly to sugar and cause the same damage.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Stay hydrated.</strong> Water helps flush out toxins and keeps skin plump.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Eat anti-inflammatory foods.</strong> Fatty fish, leafy greens, and berries contain compounds that fight inflammation and support skin health.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Get adequate sleep.</strong> Sleep is when your skin repairs itself. Poor sleep plus high sugar is a recipe for aging.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">What to Expect</h2>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Days 3-5:</strong> Puffiness starts to decrease. Your face may look slightly slimmer.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Week 1-2:</strong> Breakouts slow down. Skin starts to look less inflamed and more even-toned.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Week 3-4:</strong> Skin texture improves. You may notice a healthy glow returning.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Months 2-3:</strong> Collagen repair becomes visible. Fine lines may soften. Skin overall looks more youthful.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">The Bottom Line</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Your face reflects your diet. Sugar causes puffy skin, acne, wrinkles, and premature aging through inflammation and glycation. No amount of expensive skincare can fully counteract these effects while you keep eating sugar.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            The good news is that cutting sugar shows results quickly. Your face can start looking better within days, and significant improvements happen within weeks to months. If you want to look your best, start with what you put in your body.
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-3">Ready to Fix Your Face?</h3>
                                <p className="text-[#8E8E93] mb-6 max-w-lg mx-auto">
                                    Download Sukali to find hidden sugars and get 100 plus sugar-free recipes. See the difference in your mirror.
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
                title="Want a Better Face?"
                description="Sugar causes puffy face, acne, and wrinkles. Find hidden sugars and transform your appearance."
            />
        </main>
    )
}
