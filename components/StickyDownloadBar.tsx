'use client';

import { useEffect, useState } from 'react';

export default function StickyDownloadBar() {
    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden translate-y-0"
        >
            {/* Gradient fade */}
            <div className="absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-black to-transparent pointer-events-none" />

            {/* Bar content */}
            <div className="bg-black/95 backdrop-blur-xl border-t border-[#38383A] px-4 py-3 safe-area-bottom">
                <div className="flex items-center justify-between gap-4">
                    {/* App info */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#22c55e] flex items-center justify-center">
                            <span className="text-black font-bold text-lg">S</span>
                        </div>
                        <div>
                            <p className="text-white font-semibold text-sm">Sukali App</p>
                            <p className="text-[#8E8E93] text-xs">Scan your meals</p>
                        </div>
                    </div>

                    {/* Download button */}
                    <a
                        href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glow-button px-5 py-2.5 bg-[#22c55e] text-black font-bold text-sm rounded-full"
                    >
                        Download
                    </a>
                </div>
            </div>
        </div>
    );
}
