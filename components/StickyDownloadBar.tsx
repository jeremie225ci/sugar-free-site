'use client';

export default function StickyDownloadBar() {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 translate-y-0 md:hidden">
            <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-[#f6f0e6] to-transparent" />

            <div className="border-t border-[#ddd1c1] bg-[#fffaf2]/96 px-4 py-3 backdrop-blur-xl safe-area-bottom">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#d8ccbb] bg-white shadow-sm">
                            <span className="text-lg font-semibold text-[#5c7f57]">S</span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-[#1f241d]">Sukali</p>
                            <p className="text-xs text-[#6b655b]">Scan meals. Stay consistent.</p>
                        </div>
                    </div>

                    <a
                        href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-[#1f241d] px-5 py-2.5 text-sm font-semibold text-[#fffaf2]"
                    >
                        Download
                    </a>
                </div>
            </div>
        </div>
    );
}
