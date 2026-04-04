"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface AppPromoPopupProps {
    title?: string
    description?: string
}

export default function AppPromoPopup({
    title = "Want a calmer way to cut sugar?",
    description = "Download Sukali to scan meals, spot hidden sugar, and keep a routine that actually sticks."
}: AppPromoPopupProps) {
    const [isOpen, setIsOpen] = useState(false)

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
                        Sukali app
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
                        <a
                            href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glow-button inline-flex items-center justify-center gap-3 rounded-full bg-[#1f241d] px-6 py-4 text-lg font-semibold text-[#fffaf2]"
                        >
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                            </svg>
                            Download on iOS
                        </a>
                        <a
                            href="https://play.google.com/store/apps/details?id=app.sukali"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 rounded-full border border-[#d8ccb9] bg-white px-6 py-4 font-semibold text-[#1f241d] hover:border-[#5c7f57] hover:text-[#5c7f57]"
                        >
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                            </svg>
                            Download on Android
                        </a>
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
