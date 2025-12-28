"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export default function AppPromoPopup() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        // Check if user has already dismissed the popup
        const dismissed = localStorage.getItem("sukali-popup-dismissed")
        if (!dismissed) {
            // Show popup after a small delay for better UX
            const timer = setTimeout(() => {
                setIsOpen(true)
            }, 1500)
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
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative bg-[#1C1C1E] rounded-3xl border border-[#38383A] max-w-md w-full p-8 animate-in zoom-in-95 fade-in duration-300">
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 text-[#8E8E93] hover:text-white transition-colors"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Green glow effect */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#22c55e]/30 rounded-full blur-[80px] pointer-events-none" />

                {/* App icon */}
                <div className="relative flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-[22px] bg-gradient-to-br from-[#22c55e] to-[#16a34a] flex items-center justify-center shadow-lg shadow-[#22c55e]/30">
                        <span className="text-black font-bold text-3xl">S</span>
                    </div>
                </div>

                {/* Content */}
                <div className="relative text-center">
                    <h2 className="text-2xl font-bold text-white mb-3">
                        Want to quit sugar?
                    </h2>
                    <p className="text-[#8E8E93] mb-6">
                        Download <span className="text-[#22c55e] font-semibold">Sukali</span>, the app that scans your meals and helps you reduce sugar for clearer skin.
                    </p>

                    {/* Download buttons */}
                    <div className="flex flex-col gap-3">
                        <a
                            href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glow-button inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#22c55e] text-black font-bold rounded-full text-lg"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                            </svg>
                            Download on iOS
                        </a>
                        <a
                            href="https://play.google.com/store/apps/details?id=app.sukali"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 px-6 py-4 border border-[#38383A] text-white font-semibold rounded-full hover:border-[#22c55e] transition-colors"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                            </svg>
                            Download on Android
                        </a>
                    </div>

                    {/* Don't show again */}
                    <button
                        onClick={handleDontShowAgain}
                        className="mt-6 text-sm text-[#8E8E93] hover:text-white transition-colors underline"
                    >
                        Don&apos;t show again
                    </button>
                </div>
            </div>
        </div>
    )
}
