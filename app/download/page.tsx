"use client"

import Image from "next/image"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { useState } from "react"

export default function DownloadPage() {
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <main className="min-h-screen bg-black overflow-hidden">
            <SiteHeader />

            {/* Hero Section */}
            <section className="relative pt-24 pb-20 md:pt-32 md:pb-32">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#22c55e]/10 via-transparent to-transparent" />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#22c55e]/20 rounded-full blur-[150px] opacity-50" />

                <div className="relative mx-auto max-w-6xl px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-full mb-6">
                                <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
                                <span className="text-[#22c55e] text-sm font-medium">Free Download</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                Take Control of
                                <span className="block text-[#22c55e]">Your Sugar Intake</span>
                            </h1>

                            <p className="text-xl text-[#8E8E93] mb-8 max-w-lg">
                                Scan any food to reveal hidden sugars. Access 100+ delicious sugar-free recipes. Transform your health in just 14 days.
                            </p>

                            {/* Stats */}
                            <div className="flex flex-wrap justify-center md:justify-start gap-8 mb-10">
                                <div>
                                    <div className="text-3xl font-bold text-white">50K+</div>
                                    <div className="text-[#8E8E93] text-sm">Downloads</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-white">4.9★</div>
                                    <div className="text-[#8E8E93] text-sm">App Store</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-white">100+</div>
                                    <div className="text-[#8E8E93] text-sm">Recipes</div>
                                </div>
                            </div>

                            {/* Download Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <a
                                    href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-4 px-6 py-4 bg-white rounded-2xl hover:bg-gray-100 transition-all hover:scale-105"
                                >
                                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="black">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                    </svg>
                                    <div className="text-left">
                                        <div className="text-xs text-gray-600">Download on the</div>
                                        <div className="text-xl font-semibold text-black">App Store</div>
                                    </div>
                                </a>

                                <div className="relative group flex items-center gap-4 px-6 py-4 bg-[#1C1C1E] border border-[#38383A] rounded-2xl cursor-not-allowed opacity-80">
                                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="white">
                                        <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
                                    </svg>
                                    <div className="text-left">
                                        <div className="text-xs text-[#8E8E93]">Coming Soon</div>
                                        <div className="text-xl font-semibold text-white">Google Play</div>
                                    </div>
                                    <span className="absolute -top-2 -right-2 px-2 py-1 bg-[#22c55e] text-black text-xs font-bold rounded-full">
                                        Soon
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right - Phone Mockup */}
                        <div className="relative flex justify-center">
                            <div className="relative">
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#22c55e]/30 to-transparent blur-3xl scale-150 opacity-50" />

                                {/* Phone Frame */}
                                <div className="relative w-[280px] md:w-[320px] aspect-[9/19] bg-gradient-to-b from-[#2C2C2E] to-[#1C1C1E] rounded-[3rem] p-2 shadow-2xl">
                                    <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                                        {/* Notch */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-10" />

                                        {/* App Content */}
                                        <div className="w-full h-full bg-gradient-to-b from-[#0A0A0A] to-black p-6 pt-12">
                                            <div className="text-center mb-6">
                                                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-2xl flex items-center justify-center">
                                                    <span className="text-3xl">🍃</span>
                                                </div>
                                                <h3 className="text-white font-bold text-lg">Sukali</h3>
                                                <p className="text-[#8E8E93] text-xs">Sugar-Free Life</p>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="bg-[#1C1C1E] rounded-xl p-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-[#22c55e]/20 rounded-lg flex items-center justify-center">
                                                            <span>📷</span>
                                                        </div>
                                                        <div>
                                                            <div className="text-white text-sm font-medium">Scan Foods</div>
                                                            <div className="text-[#8E8E93] text-xs">Reveal hidden sugars</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-[#1C1C1E] rounded-xl p-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-[#22c55e]/20 rounded-lg flex items-center justify-center">
                                                            <span>🍳</span>
                                                        </div>
                                                        <div>
                                                            <div className="text-white text-sm font-medium">100+ Recipes</div>
                                                            <div className="text-[#8E8E93] text-xs">Sugar-free delicious</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-[#1C1C1E] rounded-xl p-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-[#22c55e]/20 rounded-lg flex items-center justify-center">
                                                            <span>📊</span>
                                                        </div>
                                                        <div>
                                                            <div className="text-white text-sm font-medium">Track Progress</div>
                                                            <div className="text-[#8E8E93] text-xs">14-day challenge</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Elements */}
                                <div className="absolute -top-4 -right-4 p-3 bg-[#1C1C1E] border border-[#38383A] rounded-xl shadow-xl animate-bounce">
                                    <span className="text-2xl">🚫🍬</span>
                                </div>
                                <div className="absolute -bottom-4 -left-4 p-3 bg-[#1C1C1E] border border-[#38383A] rounded-xl shadow-xl animate-pulse">
                                    <span className="text-2xl">✨</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-[#0A0A0A]">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Everything You Need to Go Sugar-Free
                        </h2>
                        <p className="text-[#8E8E93] max-w-2xl mx-auto">
                            Sukali gives you all the tools to identify hidden sugars and replace them with healthy alternatives.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 bg-[#1C1C1E] border border-[#38383A] rounded-3xl hover:border-[#22c55e]/50 transition-all group">
                            <div className="w-16 h-16 mb-6 bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <span className="text-3xl">📸</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Instant Food Scan</h3>
                            <p className="text-[#8E8E93]">
                                Point your camera at any product. Get instant analysis of sugar content and hidden ingredients.
                            </p>
                        </div>

                        <div className="p-8 bg-[#1C1C1E] border border-[#38383A] rounded-3xl hover:border-[#22c55e]/50 transition-all group">
                            <div className="w-16 h-16 mb-6 bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <span className="text-3xl">📖</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">100+ Recipes</h3>
                            <p className="text-[#8E8E93]">
                                Delicious sugar-free recipes for every meal. Desserts, snacks, drinks, and more — all without the guilt.
                            </p>
                        </div>

                        <div className="p-8 bg-[#1C1C1E] border border-[#38383A] rounded-3xl hover:border-[#22c55e]/50 transition-all group">
                            <div className="w-16 h-16 mb-6 bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <span className="text-3xl">🎯</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">14-Day Challenge</h3>
                            <p className="text-[#8E8E93]">
                                Follow our proven challenge to break sugar addiction. Daily tips, meal plans, and motivation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-black">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            People Love Sukali
                        </h2>
                        <p className="text-[#8E8E93]">Join thousands who transformed their health</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 bg-[#1C1C1E] border border-[#38383A] rounded-2xl">
                            <div className="flex items-center gap-1 mb-4 text-yellow-400">
                                {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
                            </div>
                            <p className="text-[#c4c4c4] mb-4">
                                "I lost 5kg in 3 weeks just by cutting hidden sugars. This app showed me foods I thought were healthy were loaded with sugar!"
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#22c55e]/20 rounded-full flex items-center justify-center text-[#22c55e] font-bold">S</div>
                                <div>
                                    <div className="text-white font-medium">Sarah M.</div>
                                    <div className="text-[#8E8E93] text-sm">Lost 5kg</div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-[#1C1C1E] border border-[#38383A] rounded-2xl">
                            <div className="flex items-center gap-1 mb-4 text-yellow-400">
                                {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
                            </div>
                            <p className="text-[#c4c4c4] mb-4">
                                "My skin cleared up completely after 2 weeks of following the app's recommendations. Should have done this years ago."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#22c55e]/20 rounded-full flex items-center justify-center text-[#22c55e] font-bold">E</div>
                                <div>
                                    <div className="text-white font-medium">Emma L.</div>
                                    <div className="text-[#8E8E93] text-sm">Clear skin</div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-[#1C1C1E] border border-[#38383A] rounded-2xl">
                            <div className="flex items-center gap-1 mb-4 text-yellow-400">
                                {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
                            </div>
                            <p className="text-[#c4c4c4] mb-4">
                                "The recipes are actually delicious! My kids don't even know they're eating sugar-free. Game changer for our family."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#22c55e]/20 rounded-full flex items-center justify-center text-[#22c55e] font-bold">M</div>
                                <div>
                                    <div className="text-white font-medium">Marie K.</div>
                                    <div className="text-[#8E8E93] text-sm">Family health</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Android Waitlist */}
            <section className="py-20 bg-gradient-to-b from-[#0A0A0A] to-black">
                <div className="mx-auto max-w-2xl px-4 text-center">
                    <div className="p-8 bg-[#1C1C1E] border border-[#38383A] rounded-3xl">
                        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-2xl flex items-center justify-center">
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="black">
                                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Android Coming Soon
                        </h2>
                        <p className="text-[#8E8E93] mb-6">
                            We're working hard to bring Sukali to Android. Join the waitlist to be notified when it launches.
                        </p>

                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="flex-1 px-4 py-3 bg-[#2C2C2E] border border-[#38383A] rounded-xl text-white placeholder:text-[#8E8E93] focus:outline-none focus:border-[#22c55e]"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-[#22c55e] text-black font-bold rounded-xl hover:bg-[#16a34a] transition-colors"
                                >
                                    Notify Me
                                </button>
                            </form>
                        ) : (
                            <div className="flex items-center justify-center gap-2 text-[#22c55e]">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="font-medium">You're on the list! We'll notify you.</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 bg-gradient-to-t from-[#22c55e]/10 to-transparent">
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Start Your Sugar-Free Journey Today
                    </h2>
                    <p className="text-xl text-[#8E8E93] mb-10 max-w-2xl mx-auto">
                        Join 50,000+ people who discovered hidden sugars in their diet and transformed their health with Sukali.
                    </p>
                    <a
                        href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-[#22c55e] text-black text-xl font-bold rounded-2xl hover:bg-[#16a34a] transition-all hover:scale-105"
                    >
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                        Download Free on iOS
                    </a>
                </div>
            </section>

            <SiteFooter />
        </main>
    )
}
