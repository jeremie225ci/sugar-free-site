"use client"

import { useEffect } from "react"

type StartErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function StartErrorPage({ error, reset }: StartErrorPageProps) {
  useEffect(() => {
    console.error("Start page crashed", error)
  }, [error])

  return (
    <main className="min-h-screen bg-[#f6f0e6] px-4 py-12 text-[#1f241d]">
      <div className="mx-auto max-w-2xl rounded-[32px] border border-[#ddd1c1] bg-[#fffaf2] p-8 text-center shadow-[0_18px_40px_rgba(52,41,22,0.08)] md:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7b7468]">Sukali</p>
        <h1
          className="mt-5 text-4xl leading-tight text-[#1f241d] md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          The quiz hit a loading error.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-[#5f5a51]">
          The design and content are still intact, but one client-side step failed while opening this page.
        </p>

        <div className="mt-8 rounded-[24px] bg-[#efe6d9] px-5 py-5 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7b7468]">Error details</p>
          <p className="mt-3 break-words text-sm leading-7 text-[#5f5a51]">
            {error.message || "Unknown client-side exception."}
          </p>
          {error.digest ? (
            <p className="mt-2 text-xs leading-6 text-[#8a8276]">Digest: {error.digest}</p>
          ) : null}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-full bg-[#1f241d] px-7 py-3 text-sm font-semibold text-[#fffaf2]"
          >
            Try again
          </button>
          <a
            href="/start"
            className="inline-flex items-center justify-center rounded-full border border-[#d8ccb9] bg-white px-7 py-3 text-sm font-semibold text-[#1f241d]"
          >
            Reload the quiz
          </a>
        </div>
      </div>
    </main>
  )
}
