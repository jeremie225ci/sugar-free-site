"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import StickyDownloadBar from "@/components/StickyDownloadBar"

interface Question {
    id: number
    question: string
    emoji?: string
    options: {
        text: string
        points: number
    }[]
}

const questions: Question[] = [
    {
        id: 1,
        question: "How often do you crave something sweet during the day?",
        emoji: "🍬",
        options: [
            { text: "Rarely or never", points: 0 },
            { text: "Once or twice a day", points: 1 },
            { text: "Multiple times a day", points: 2 },
            { text: "Almost constantly", points: 3 }
        ]
    },
    {
        id: 2,
        question: "What happens when you try to go a full day without sugar?",
        emoji: "😰",
        options: [
            { text: "No problem at all", points: 0 },
            { text: "I feel a bit tired", points: 1 },
            { text: "I get headaches and irritable", points: 2 },
            { text: "I can't make it through the day", points: 3 }
        ]
    },
    {
        id: 3,
        question: "Do you experience acne or skin problems that you can't explain?",
        emoji: "😔",
        options: [
            { text: "No, my skin is clear", points: 0 },
            { text: "Occasionally, minor breakouts", points: 1 },
            { text: "Yes, recurring acne issues", points: 2 },
            { text: "Yes, severe and persistent skin problems", points: 3 }
        ]
    },
    {
        id: 4,
        question: "Do you notice puffiness or bloating in your face, especially in the morning?",
        emoji: "😮",
        options: [
            { text: "No, my face looks normal", points: 0 },
            { text: "Sometimes, after eating certain foods", points: 1 },
            { text: "Yes, my face often looks puffy", points: 2 },
            { text: "Yes, my face is constantly bloated", points: 3 }
        ]
    },
    {
        id: 5,
        question: "Do you experience bloating, gas, or acid reflux after eating?",
        emoji: "🤢",
        options: [
            { text: "Never or rarely", points: 0 },
            { text: "Sometimes after heavy meals", points: 1 },
            { text: "Frequently, especially after sweets", points: 2 },
            { text: "Almost every day", points: 3 }
        ]
    },
    {
        id: 6,
        question: "How would you describe your current weight situation?",
        emoji: "⚖️",
        options: [
            { text: "I'm at a healthy weight", points: 0 },
            { text: "I've gained a few pounds recently", points: 1 },
            { text: "I struggle to lose weight despite trying", points: 2 },
            { text: "I've been gaining weight consistently", points: 3 }
        ]
    },
    {
        id: 7,
        question: "Do you carry excess weight around your belly area?",
        emoji: "🎯",
        options: [
            { text: "No, my weight is evenly distributed", points: 0 },
            { text: "A little bit", points: 1 },
            { text: "Yes, most of my weight is in my belly", points: 2 },
            { text: "Yes, and it's getting worse", points: 3 }
        ]
    },
    {
        id: 8,
        question: "How often do you drink sugary beverages (soda, juice, sweetened coffee)?",
        emoji: "🥤",
        options: [
            { text: "Never", points: 0 },
            { text: "A few times a week", points: 1 },
            { text: "Once a day", points: 2 },
            { text: "Multiple times a day", points: 3 }
        ]
    },
    {
        id: 9,
        question: "Do you experience energy crashes during the day?",
        emoji: "😴",
        options: [
            { text: "No, my energy is stable", points: 0 },
            { text: "Occasionally in the afternoon", points: 1 },
            { text: "Frequently, especially after meals", points: 2 },
            { text: "Multiple times every day", points: 3 }
        ]
    },
    {
        id: 10,
        question: "How do you feel 1-2 hours after eating a sugary snack?",
        emoji: "🍩",
        options: [
            { text: "I don't eat sugary snacks", points: 0 },
            { text: "Normal, no change", points: 1 },
            { text: "Tired or sluggish", points: 2 },
            { text: "Hungry again and craving more", points: 3 }
        ]
    },
    {
        id: 11,
        question: "Do you read nutrition labels to check sugar content?",
        emoji: "🏷️",
        options: [
            { text: "Always", points: 0 },
            { text: "Sometimes", points: 1 },
            { text: "Rarely", points: 2 },
            { text: "Never", points: 3 }
        ]
    },
    {
        id: 12,
        question: "Have you tried to reduce sugar before but couldn't maintain it?",
        emoji: "🔄",
        options: [
            { text: "No, I successfully reduced and maintained", points: 0 },
            { text: "No, I've never tried", points: 1 },
            { text: "Yes, once, but gave up", points: 2 },
            { text: "Yes, multiple times without success", points: 3 }
        ]
    },
    {
        id: 13,
        question: "Do you often feel tired even after sleeping enough?",
        emoji: "😩",
        options: [
            { text: "No, I wake up refreshed", points: 0 },
            { text: "Sometimes", points: 1 },
            { text: "Often, I feel exhausted", points: 2 },
            { text: "Always, no matter how much I sleep", points: 3 }
        ]
    },
    {
        id: 14,
        question: "What's your main motivation for improving your diet?",
        emoji: "💪",
        options: [
            { text: "Lose weight", points: 1 },
            { text: "More energy and focus", points: 1 },
            { text: "Better health and longevity", points: 1 },
            { text: "I'm not really motivated to change", points: 3 }
        ]
    }
]

interface Result {
    title: string
    emoji: string
    description: string
    recommendation: string
    color: string
    alertLevel: string
}

function getResult(score: number): Result {
    if (score <= 10) {
        return {
            title: "Low Sugar Friction",
            emoji: "🌿",
            description: "Your answers suggest that sugar is not dominating your routine right now. You still may benefit from better label awareness and a more stable meal structure.",
            recommendation: "Use Sukali for the hidden-sugar checks and recipes that make staying consistent easier when life gets busy.",
            color: "#5c7f57",
            alertLevel: "Stable baseline"
        }
    }

    if (score <= 24) {
        return {
            title: "Moderate Sugar Drift",
            emoji: "🧭",
            description: "Your answers suggest that sugar shows up often enough to affect energy, cravings, or skin. The issue is probably not one dramatic habit, but repetition.",
            recommendation: "Focus on meal scans, fewer sugary drinks, and a simpler weekly food routine before trying anything extreme.",
            color: "#c97a5a",
            alertLevel: "Needs consistency"
        }
    }

    return {
        title: "High Sugar Load",
        emoji: "⚠️",
        description: "Your answers suggest that sugar may be driving a meaningful share of your cravings, crashes, puffiness, or weight friction. A calmer structure could help quickly.",
        recommendation: "Start with the basics: scan meals, remove the obvious daily sugar hits, and use a simple recipe routine for two focused weeks.",
        color: "#b85c38",
        alertLevel: "Needs action now"
    }
}

const loadingMessages = [
    "Reviewing your answers...",
    "Mapping your sugar patterns...",
    "Estimating where friction shows up...",
    "Preparing your next step...",
]

export default function QuizPage() {
    const [started, setStarted] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<number[]>([])
    const [showResult, setShowResult] = useState(false)
    const [selectedOption, setSelectedOption] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0)

    const progress = (currentQuestion / questions.length) * 100

    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setLoadingProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval)
                        setIsLoading(false)
                        setShowResult(true)
                        return 100
                    }
                    return prev + 2
                })
            }, 60)

            const messageInterval = setInterval(() => {
                setLoadingMessageIndex((prev) =>
                    prev < loadingMessages.length - 1 ? prev + 1 : prev
                )
            }, 700)

            return () => {
                clearInterval(interval)
                clearInterval(messageInterval)
            }
        }
    }, [isLoading])

    const handleAnswer = (points: number, index: number) => {
        setSelectedOption(index)

        setTimeout(() => {
            const newAnswers = [...answers, points]
            setAnswers(newAnswers)

            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1)
                setSelectedOption(null)
            } else {
                setIsLoading(true)
                setLoadingProgress(0)
                setLoadingMessageIndex(0)
            }
        }, 250)
    }

    const totalScore = answers.reduce((a, b) => a + b, 0)
    const result = getResult(totalScore)
    const maxScore = questions.length * 3

    const restartQuiz = () => {
        setStarted(false)
        setCurrentQuestion(0)
        setAnswers([])
        setShowResult(false)
        setSelectedOption(null)
        setIsLoading(false)
        setLoadingProgress(0)
        setLoadingMessageIndex(0)
    }

    return (
        <main className="min-h-screen bg-transparent text-[#1f241d]">
            <SiteHeader />

            <section className="pb-16 pt-12 md:pb-24 md:pt-16">
                <div className="mx-auto max-w-3xl px-4">
                    {!started ? (
                        <div className="text-center">
                            <span className="inline-flex rounded-full border border-[#d8ccb9] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#7b7468] shadow-sm">
                                Quiz
                            </span>

                            <h1
                                className="mt-5 text-5xl leading-tight text-[#1f241d] md:text-6xl"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                A quick check on how sugar is showing up in your routine.
                            </h1>

                            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#5f5a51]">
                                This is not a medical diagnosis. It is a short self-check to spot patterns around cravings, energy, food habits, and the kind of friction that usually makes people drift.
                            </p>

                            <div className="mx-auto mt-10 max-w-2xl rounded-[32px] border border-[#ddd1c1] bg-[#fffaf2] p-8 text-left shadow-[0_18px_40px_rgba(52,41,22,0.06)]">
                                <h2
                                    className="text-3xl text-[#1f241d]"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    What this helps with
                                </h2>
                                <ul className="mt-6 space-y-3 text-sm leading-7 text-[#5f5a51]">
                                    <li className="flex gap-3">
                                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#5c7f57]" />
                                        <span>Spot whether cravings and crashes are isolated or part of a repeating pattern.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#5c7f57]" />
                                        <span>See whether sugar may be influencing skin, appetite, puffiness, or energy more than you realize.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#5c7f57]" />
                                        <span>Get a calmer next step instead of a dramatic detox pitch.</span>
                                    </li>
                                </ul>

                                <div className="mt-8 rounded-[24px] bg-[#efe5d7] p-4 text-sm leading-7 text-[#5f5a51]">
                                    14 questions. About 2 minutes. Better results if you answer honestly instead of optimistically.
                                </div>
                            </div>

                            <button
                                onClick={() => setStarted(true)}
                                className="glow-button mt-8 rounded-full bg-[#1f241d] px-8 py-4 text-base font-semibold text-[#fffaf2]"
                            >
                                Start the quiz
                            </button>

                            <p className="mt-4 text-sm text-[#7b7468]">
                                {questions.length} questions • confidential • no account needed
                            </p>
                        </div>
                    ) : isLoading ? (
                        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                            <div className="relative mb-8 h-40 w-40">
                                <svg className="h-full w-full -rotate-90 transform">
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="70"
                                        stroke="#e2d7ca"
                                        strokeWidth="8"
                                        fill="none"
                                    />
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="70"
                                        stroke="#5c7f57"
                                        strokeWidth="8"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeDasharray={440}
                                        strokeDashoffset={440 - (440 * loadingProgress) / 100}
                                        className="transition-all duration-100"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-4xl font-semibold text-[#1f241d]">{Math.round(loadingProgress)}%</span>
                                </div>
                            </div>

                            <p className="text-lg font-medium text-[#5c7f57]">
                                {loadingMessages[loadingMessageIndex]}
                            </p>
                            <p className="mt-2 text-sm text-[#6f685d]">
                                Building a more useful next step than “just try harder”.
                            </p>
                        </div>
                    ) : !showResult ? (
                        <>
                            <div className="mb-8 flex items-end justify-between gap-4">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.18em] text-[#7b7468]">
                                        Question {currentQuestion + 1} of {questions.length}
                                    </p>
                                    <p className="mt-2 text-sm text-[#6f685d]">
                                        Move fast. First instincts are usually the most honest.
                                    </p>
                                </div>
                                <p className="text-sm font-semibold text-[#1f241d]">
                                    {Math.round(progress)}%
                                </p>
                            </div>

                            <div className="mb-8 h-2 overflow-hidden rounded-full bg-[#e2d7ca]">
                                <div
                                    className="h-full bg-[#5c7f57] transition-all duration-500 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <div className="rounded-[34px] border border-[#ddd1c1] bg-[#fffaf2] p-8 shadow-[0_18px_40px_rgba(52,41,22,0.06)] md:p-10">
                                {questions[currentQuestion].emoji && (
                                    <div className="mb-4 text-5xl">{questions[currentQuestion].emoji}</div>
                                )}
                                <h2
                                    className="text-3xl leading-tight text-[#1f241d] md:text-4xl"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    {questions[currentQuestion].question}
                                </h2>

                                <div className="mt-8 space-y-3">
                                    {questions[currentQuestion].options.map((option, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswer(option.points, index)}
                                            className={`w-full rounded-[22px] border px-5 py-4 text-left text-sm font-medium transition-all duration-200 ${
                                                selectedOption === index
                                                    ? 'border-[#5c7f57] bg-[#5c7f57] text-[#fffaf2]'
                                                    : 'border-[#ddd1c1] bg-white text-[#1f241d] hover:border-[#5c7f57] hover:bg-[#f7f2ea]'
                                            }`}
                                        >
                                            {option.text}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {currentQuestion > 0 && (
                                <button
                                    onClick={() => {
                                        setCurrentQuestion(currentQuestion - 1)
                                        setAnswers(answers.slice(0, -1))
                                        setSelectedOption(null)
                                    }}
                                    className="mt-6 text-sm text-[#6f685d] hover:text-[#1f241d]"
                                >
                                    ← Back to previous question
                                </button>
                            )}
                        </>
                    ) : (
                        <div className="text-center">
                            <span
                                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                                style={{ backgroundColor: `${result.color}18`, color: result.color }}
                            >
                                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: result.color }} />
                                {result.alertLevel}
                            </span>

                            <div className="mt-6 text-7xl">{result.emoji}</div>

                            <h1
                                className="mt-6 text-5xl leading-tight"
                                style={{ color: result.color, fontFamily: "var(--font-display)" }}
                            >
                                {result.title}
                            </h1>

                            <div className="mx-auto mt-8 inline-flex rounded-[24px] border border-[#ddd1c1] bg-[#fffaf2] p-6 shadow-[0_18px_40px_rgba(52,41,22,0.06)]">
                                <div className="flex items-center gap-6">
                                    <div className="text-center">
                                        <p className="text-sm text-[#7b7468]">Your score</p>
                                        <p className="mt-1 text-3xl font-semibold text-[#1f241d]">{totalScore}/{maxScore}</p>
                                    </div>
                                    <div className="h-12 w-px bg-[#ddd1c1]" />
                                    <div className="text-center">
                                        <p className="text-sm text-[#7b7468]">Intensity</p>
                                        <p className="mt-1 text-3xl font-semibold text-[#1f241d]">
                                            {Math.round((totalScore / maxScore) * 100)}%
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[#5f5a51]">
                                {result.description}
                            </p>

                            <div
                                className="mx-auto mt-8 max-w-2xl rounded-[28px] border p-6 text-left"
                                style={{
                                    backgroundColor: `${result.color}10`,
                                    borderColor: `${result.color}35`
                                }}
                            >
                                <h3
                                    className="text-2xl"
                                    style={{ color: result.color, fontFamily: "var(--font-display)" }}
                                >
                                    Recommended next step
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-[#4f4a41]">
                                    {result.recommendation}
                                </p>
                            </div>

                            <div className="mx-auto mt-8 max-w-2xl rounded-[32px] bg-[#1f241d] p-8 text-[#fffaf2] shadow-[0_24px_60px_rgba(52,41,22,0.16)]">
                                <h3
                                    className="text-3xl"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    Use the app for the part that gets hard in real life.
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-[#d7cec2]">
                                    Scan foods, cut the hidden stuff first, and keep the routine practical enough to survive an ordinary week.
                                </p>
                                <div className="mt-6 flex flex-wrap justify-center gap-3">
                                    <a
                                        href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full bg-[#fffaf2] px-6 py-3 text-sm font-semibold text-[#1f241d]"
                                    >
                                        Download on iPhone
                                    </a>
                                    <Link
                                        href="/blog"
                                        className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-[#fffaf2]"
                                    >
                                        Read the journal
                                    </Link>
                                </div>
                            </div>

                            <button
                                onClick={restartQuiz}
                                className="mt-8 text-sm text-[#6f685d] hover:text-[#1f241d]"
                            >
                                Take the quiz again
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <SiteFooter />
            <StickyDownloadBar />
        </main>
    )
}
