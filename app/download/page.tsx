"use client"

import { useState } from "react"
import Image from "next/image"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import StickyDownloadBar from "@/components/StickyDownloadBar"

export default function DownloadPage() {
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <main className="min-h-screen bg-transparent text-[#1f241d]">
            <SiteHeader />

            <section className="pb-16 pt-12 md:pb-24 md:pt-16">
                <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                    <div className="max-w-xl">
                        <span className="inline-flex rounded-full border border-[#d8ccb9] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#7b7468] shadow-sm">
                            Download
                        </span>
                        <h1
                            className="mt-5 text-[clamp(3.3rem,7vw,5.8rem)] leading-[0.95] tracking-[-0.04em] text-[#1f241d]"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            The app page now feels like the same brand.
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-[#5f5a51]">
                            Sukali helps people scan meals, notice hidden sugar faster, and stay consistent long enough to actually feel the difference.
                        </p>

                        <div className="mt-8 grid grid-cols-3 gap-4">
                            <div>
                                <div className="text-2xl font-semibold text-[#1f241d]">50k+</div>
                                <div className="mt-1 text-sm text-[#6f685d]">downloads</div>
                            </div>
                            <div>
                                <div className="text-2xl font-semibold text-[#1f241d]">4.9</div>
                                <div className="mt-1 text-sm text-[#6f685d]">App Store rating</div>
                            </div>
                            <div>
                                <div className="text-2xl font-semibold text-[#1f241d]">Day 0</div>
                                <div className="mt-1 text-sm text-[#6f685d]">progress ritual</div>
                            </div>
                        </div>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <a
                                href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glow-button inline-flex items-center justify-center gap-3 rounded-full bg-[#1f241d] px-8 py-4 text-base font-semibold text-[#fffaf2]"
                            >
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                </svg>
                                Download for iPhone
                            </a>

                            <div className="rounded-full border border-[#d3c7b8] bg-white px-8 py-4 text-base font-semibold text-[#1f241d]">
                                Android coming soon
                            </div>
                        </div>

                        <div className="mt-6 rounded-[24px] border border-[#ddd1c1] bg-[#fffaf2] p-4 shadow-[0_18px_40px_rgba(52,41,22,0.06)]">
                            <p className="text-sm leading-7 text-[#5f5a51]">
                                If someone opens this in TikTok or Instagram, the cleanest path is still to use the browser menu and open the page in Safari before downloading.
                            </p>
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-[620px]">
                        <div className="absolute -right-8 top-8 h-40 w-40 rounded-full bg-[#d6e0d1] blur-3xl" />
                        <div className="absolute -left-8 bottom-8 h-40 w-40 rounded-full bg-[#ead9ca] blur-3xl" />

                        <div className="relative rounded-[36px] border border-[#ddd1c1] bg-[#fffaf2] p-5 shadow-[0_28px_70px_rgba(55,43,23,0.12)]">
                            <div className="grid gap-4 md:grid-cols-[0.62fr_0.38fr]">
                                <div className="rounded-[30px] bg-[#1c1b18] p-3">
                                    <div className="relative mx-auto aspect-[9/18] max-w-[250px] overflow-hidden rounded-[30px]">
                                        <Image
                                            src="/images/sugarfree-app-screen.png"
                                            alt="Sukali home screen on iPhone"
                                            fill
                                            sizes="(min-width: 768px) 250px, 70vw"
                                            className="object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <div className="rounded-[24px] border border-[#ddd1c1] bg-[#f4ebde] p-4">
                                        <p className="text-[11px] uppercase tracking-[0.22em] text-[#7b7468]">Meal scan</p>
                                        <div className="relative mt-3 aspect-[3/4] overflow-hidden rounded-[18px]">
                                            <Image
                                                src="/assets/images/blog-images/sukali-app-scan.jpg"
                                                alt="Sukali app scan result"
                                                fill
                                                sizes="(min-width: 768px) 220px, 40vw"
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>

                                    <div className="rounded-[24px] border border-[#ddd1c1] bg-white p-4">
                                        <p className="text-[11px] uppercase tracking-[0.22em] text-[#7b7468]">What the app does well</p>
                                        <div className="mt-4 space-y-3 text-sm text-[#4f4a41]">
                                            <div className="flex items-center justify-between">
                                                <span>Hidden sugar</span>
                                                <span className="font-semibold text-[#1f241d]">clearer fast</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>Food choices</span>
                                                <span className="font-semibold text-[#1f241d]">less guesswork</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>Progress</span>
                                                <span className="font-semibold text-[#1f241d]">more visible</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-[24px] bg-[#1f241d] p-4 text-[#fffaf2]">
                                        <p className="text-[11px] uppercase tracking-[0.22em] text-[#d7cec2]">For later</p>
                                        <p className="mt-2 text-sm leading-7 text-[#d7cec2]">
                                            Join the Android waitlist if you want a launch email when it is ready.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y border-[#e2d7ca] bg-white/45 py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="mb-10 max-w-2xl">
                        <span className="inline-flex rounded-full border border-[#d8ccb9] bg-[#fffaf2] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#7b7468] shadow-sm">
                            Why people keep it
                        </span>
                        <h2
                            className="mt-5 text-4xl leading-tight text-[#1f241d] md:text-5xl"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            The app is strongest when it makes small daily choices easier.
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            ["Scan foods", "Reveal hidden sugar without decoding every label by hand."],
                            ["Track routines", "Keep a visible thread between meals, cravings, and progress."],
                            ["Stay practical", "Use the recipe library and simple suggestions when motivation drops."],
                        ].map(([title, body]) => (
                            <div key={title} className="rounded-[30px] border border-[#ddd1c1] bg-[#fffaf2] p-6 shadow-[0_18px_40px_rgba(52,41,22,0.06)]">
                                <h3
                                    className="text-2xl text-[#1f241d]"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    {title}
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-[#5f5a51]">{body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-20">
                <div className="mx-auto max-w-5xl px-4">
                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            ['Sarah M.', 'Lost 5kg', 'I thought I was eating healthy until the scans showed how much sugar was sneaking into everyday foods.'],
                            ['Emma L.', 'Skin looked calmer', 'The combination of food scans and consistency made the progress feel more real week by week.'],
                            ['Marie K.', 'Family routine', 'The recipes feel normal enough to cook for everyone, which matters more than motivational slogans.'],
                        ].map(([name, label, quote]) => (
                            <div key={name} className="rounded-[30px] border border-[#ddd1c1] bg-[#fffaf2] p-6 shadow-[0_18px_40px_rgba(52,41,22,0.06)]">
                                <div className="mb-4 text-[#c97a5a]">★★★★★</div>
                                <p className="text-sm leading-7 text-[#5f5a51]">"{quote}"</p>
                                <div className="mt-5">
                                    <p className="font-semibold text-[#1f241d]">{name}</p>
                                    <p className="text-sm text-[#6f685d]">{label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="pb-20 pt-4 md:pb-24">
                <div className="mx-auto max-w-4xl px-4">
                    <div className="rounded-[36px] border border-[#ddd1c1] bg-[#fffaf2] p-8 text-center shadow-[0_24px_60px_rgba(52,41,22,0.08)] md:p-10">
                        <span className="inline-flex rounded-full bg-[#efe5d7] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#7b7468]">
                            Android waitlist
                        </span>
                        <h2
                            className="mt-5 text-4xl leading-tight text-[#1f241d]"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Leave your email and I’ll notify you when Android is ready.
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#5f5a51]">
                            This keeps the page useful even before the Android launch, without turning it into a neon landing page.
                        </p>

                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="flex-1 rounded-2xl border border-[#ddd1c1] bg-white px-4 py-3 text-[#1f241d] placeholder:text-[#9d968a] focus:border-[#5c7f57] focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="rounded-2xl bg-[#1f241d] px-6 py-3 font-semibold text-[#fffaf2]"
                                >
                                    Notify me
                                </button>
                            </form>
                        ) : (
                            <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#dce9d7] px-5 py-3 text-sm font-semibold text-[#355338]">
                                <span>✓</span>
                                <span>You’re on the list. I’ll send the Android launch update there.</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <SiteFooter />
            <StickyDownloadBar />
        </main>
    )
}
