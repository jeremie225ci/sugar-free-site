"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"

interface AppPromoPopupProps {
    title?: string
    description?: string
}

export default function AppPromoPopup({
    title = "Is sugar really a problem in your life?",
    description = "Take our quick quiz to see whether sugar is affecting your cravings, your habits, and the way you feel every day."
}: AppPromoPopupProps) {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const onboardingHref = `/start?source=article-popup&from=${encodeURIComponent(pathname || "/")}`

    useEffect(() => {
        const dismissed = localStorage.getItem("sukali-popup-dismissed")
        if (!dismissed) {
            const timer = setTimeout(() => {
                setIsOpen(true)
            }, 3500)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleDontShowAgain = () => {
        localStorage.setItem("sukali-popup-dismissed", "true")
        setIsOpen(false)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-[#2b251d]/30 backdrop-blur-sm"
                onClick={handleClose}
            />

            <div className="relative w-full max-w-md rounded-[32px] border border-[#ddcfbe] bg-[#fffaf2] p-8 text-[#1f241d] shadow-[0_32px_80px_rgba(55,43,23,0.18)] animate-in zoom-in-95 fade-in duration-300">
                <button
                    onClick={handleClose}
                    className="absolute right-4 top-4 rounded-full border border-[#e4d7c7] p-2 text-[#6b655b] hover:text-[#1f241d]"
                    aria-label="Close"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="relative mb-6 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-[28px] border border-[#d8ccb9] bg-white shadow-[0_18px_40px_rgba(54,43,22,0.1)]">
                        <span className="text-3xl font-semibold text-[#5c7f57]">S</span>
                    </div>
                </div>

                <div className="relative text-center">
                    <p className="mb-3 text-[11px] uppercase tracking-[0.26em] text-[#7b7468]">
                        Sukali quiz
                    </p>
                    <h2
                        className="mb-3 text-3xl leading-tight text-[#1f241d]"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        {title}
                    </h2>
                    <p className="mb-6 text-sm leading-7 text-[#5f5a51]">
                        {description}
                    </p>

                    <div className="flex flex-col gap-3">
                        <Link
                            href={onboardingHref}
                            className="glow-button inline-flex items-center justify-center gap-3 rounded-full bg-[#1f241d] px-6 py-4 text-lg font-semibold text-[#fffaf2]"
                        >
                            Take the quiz
                        </Link>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="inline-flex items-center justify-center gap-3 rounded-full border border-[#d8ccb9] bg-white px-6 py-4 font-semibold text-[#1f241d] hover:border-[#5c7f57] hover:text-[#5c7f57]"
                        >
                            Keep reading
                        </button>
                    </div>

                    <button
                        onClick={handleDontShowAgain}
                        className="mt-6 text-sm text-[#7b7468] underline underline-offset-4 hover:text-[#1f241d]"
                    >
                        Don&apos;t show again
                    </button>
                </div>
            </div>
        </div>
    )
}
