import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
    return (
        <main className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center">
            <div className="w-24 h-24 rounded-3xl bg-[#22c55e] flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                <span className="text-black font-extrabold text-4xl">S</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                FOOD NOT FOUND <br />
                <span className="text-[#22c55e]">IN WEB DATABASE</span>
            </h1>

            <p className="text-[#8E8E93] text-xl mb-12 max-w-lg mx-auto leading-relaxed">
                But don’t worry, it’s already analyzed in our mobile app. The web version is just the tip of the iceberg.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <a
                    href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-button flex-1 px-8 py-4 bg-[#22c55e] text-black font-extrabold rounded-2xl text-lg transition-transform hover:scale-105 active:scale-95"
                >
                    Download App to Scan
                </a>
                <Link
                    href="/"
                    className="flex-1 px-8 py-4 bg-[#1C1C1E] text-white font-bold rounded-2xl text-lg border border-[#38383A] hover:bg-[#282828] transition-colors"
                >
                    Back to Home
                </Link>
            </div>

            <p className="mt-12 text-[#38383A] font-mono text-sm uppercase tracking-widest">
                Error 404 • Strategy: Aggressive App Growth
            </p>
        </main>
    );
}
