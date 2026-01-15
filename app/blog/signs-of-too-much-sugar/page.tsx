import Image from "next/image"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import StickyDownloadBar from "@/components/StickyDownloadBar"
import AppPromoPopup from "@/components/AppPromoPopup"

export default function SignsOfTooMuchSugarPage() {
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
                        <span className="text-[#22c55e]">Health</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Signs of Too Much Sugar in Your Body
                    </h1>
                    <p className="text-xl text-[#8E8E93] mb-8">
                        Your body is constantly sending you signals. Here are 12 warning signs that you might be eating too much sugar without even realizing it.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-[#8E8E93] mb-8">
                        <span>Sukali Team</span>
                        <span>•</span>
                        <span>January 16, 2026</span>
                        <span>•</span>
                        <span>10 min read</span>
                    </div>

                    <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
                        <Image
                            src="/assets/images/blog-images/signs-of-too-much-sugar.png"
                            alt="Warning signs of too much sugar consumption"
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
                            I used to think I was eating pretty healthy. Yogurt for breakfast, a sandwich for lunch, pasta for dinner. What I did not realize was that I was consuming nearly triple the recommended daily amount of sugar. My body was trying to tell me, but I was not listening.
                        </p>

                        <p className="text-[#c4c4c4] text-lg mb-8">
                            If any of the following signs sound familiar, your body might be trying to send you the same message. Here are the warning signs that sugar is taking a toll on your health.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">1. You Are Constantly Tired</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            This was my biggest sign and I completely missed it. I thought I was just busy or not sleeping enough. But here is the thing about sugar. It gives you a quick burst of energy followed by a crash. When you eat sugar all day, you spend all day on this rollercoaster. Up, down, up, down. By 3pm you are exhausted and reaching for another sugary snack to get through the afternoon.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            If you feel tired despite getting enough sleep, if you need sugar or caffeine to get through the day, that is a major red flag. Your body is telling you it is burning fuel inefficiently.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">2. You Crave Sweet Foods</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            This one seems obvious but people often do not connect the dots. The more sugar you eat, the more you crave it. Sugar activates the same reward pathways in your brain as addictive drugs. Your brain literally becomes dependent on it.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            If you feel like you need something sweet after every meal, if you cannot walk past a candy bowl without grabbing something, if you think about dessert all day, those cravings are a sign of too much sugar.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">3. Your Skin Is Breaking Out</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Sugar causes inflammation throughout your body, and that inflammation shows up on your face. Acne that will not go away despite trying every product. Redness and puffiness. Premature wrinkles. A dull, tired looking complexion.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            There is also a process called glycation where sugar molecules attach to collagen in your skin, making it stiff and damaged. If you have persistent skin problems that nothing seems to fix, look at your sugar intake before buying another expensive serum.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">4. You Cannot Lose Weight</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            You are eating less, exercising more, and still the scale will not budge. This is incredibly frustrating, and sugar is often the culprit. Here is why.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            Sugar spikes your insulin levels. Insulin tells your body to store fat. When insulin is constantly elevated from eating sugar all day, your body is in fat storing mode all day. It does not matter how many calories you cut or how hard you work out. The hormonal environment is working against you.
                        </p>

                        <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6 mb-8">
                            <h3 className="text-xl font-bold text-white mb-3">How Much Sugar Are You Really Eating?</h3>
                            <p className="text-[#c4c4c4] mb-4">
                                Most people underestimate their sugar intake by 50 percent or more. Use Sukali to scan any food and see exactly how much sugar is hiding inside.
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

                        <h2 className="text-3xl font-bold text-white mb-6">5. You Have Brain Fog</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Trouble concentrating. Difficulty remembering things. Feeling like you are thinking through molasses. This is brain fog and sugar is a major cause.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            Sugar causes inflammation in the brain that affects cognitive function. Studies have shown that high sugar consumption is linked to reduced memory and learning ability. Your brain runs better on stable blood glucose, not the spikes and crashes that come from eating sugar.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">6. You Feel Bloated</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Sugar feeds the bad bacteria in your gut, leading to an imbalance in your microbiome. This shows up as bloating, gas, and digestive discomfort. Many people accept this as normal, but it is not.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            If you feel bloated after meals, if your stomach is distended by the end of the day, if you have irregular digestion, check your sugar intake. The gut is directly connected to how much sugar you eat.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">7. Your Face Looks Puffy</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            This was another sign I completely missed. I thought I just had a round face. But sugar causes water retention, especially in your face. That puffy look in the morning, the double chin that seems worse some days than others, the loss of definition in your jawline.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            Within days of cutting sugar, many people notice their face looks slimmer and more defined. The puffiness goes away surprisingly quickly once you stop the inflammation.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">8. You Get Frequent Headaches</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Blood sugar spikes and crashes can trigger headaches and migraines. If you get headaches regularly, especially in the afternoon or when you miss a meal, unstable blood sugar is likely the cause.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            The pattern often looks like this. You eat sugar, blood glucose spikes, then crashes. Your body responds with stress hormones. These trigger a headache. You eat more sugar to feel better. The cycle continues.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">9. Your Mood Swings Are Intense</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            That blood sugar rollercoaster affects your mood just as much as your energy. When blood sugar crashes, you feel irritable, anxious, even depressed. When it spikes, you might feel almost manic. This instability creates emotional chaos that you might attribute to stress or personality.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            People who quit sugar often report that their moods stabilize significantly. They feel more emotionally even, less reactive, calmer overall. The constant anxiety fades.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">10. You Get Sick Often</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Sugar suppresses your immune system. Studies show that eating sugar can reduce your white blood cells ability to kill germs by up to 50 percent for several hours after consumption. If you eat sugar all day, your immune system is suppressed all day.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            If you catch every cold that goes around, if infections seem to linger longer than they should, if you feel like you are always fighting something off, your sugar intake might be undermining your immune defenses.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">11. You Have Joint Pain</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Sugar causes inflammation, and inflammation shows up in joints as pain and stiffness. If your joints ache and you cannot figure out why, if you feel older than you should, chronic inflammation from sugar could be the cause.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            Many people with joint pain see improvement within weeks of cutting sugar. The inflammation decreases and with it the pain.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">12. Nothing Tastes Sweet Enough</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            When you eat a lot of sugar, your taste buds become desensitized. Fruit does not taste sweet. You need more and more sugar to get the same satisfaction. This is a clear sign that your palate has adapted to an unnatural level of sweetness.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            The good news is that taste buds reset quickly. After about two weeks of reduced sugar, an apple will taste incredibly sweet again. Natural foods become satisfying in ways they could not before.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">What to Do If You Recognize These Signs</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            If several of these signs describe your experience, your body is clearly telling you that sugar is affecting your health. The good news is that most of these symptoms reverse quickly once you reduce your sugar intake.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Start tracking your sugar intake.</strong> Most people have no idea how much they are actually consuming. Reading labels is the first step to awareness.
                        </p>

                        <p className="text-[#c4c4c4] mb-4">
                            <strong className="text-white">Try a 14-day sugar challenge.</strong> Two weeks is enough time to reset your taste buds and see how much better you can feel. Most people are shocked by the difference.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            <strong className="text-white">Replace, do not just eliminate.</strong> Find sugar-free alternatives that satisfy you. Cutting sugar does not mean giving up sweet things entirely. It means finding better sources.
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-3">Ready to Reduce Your Sugar Intake?</h3>
                                <p className="text-[#8E8E93] mb-6 max-w-lg mx-auto">
                                    Download Sukali to scan foods for hidden sugars and get 100 plus sugar-free recipes. See how much better you can feel.
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
                title="Noticing These Sugar Signs?"
                description="Track your sugar intake and discover healthier alternatives. Your body will thank you."
            />
        </main>
    )
}
