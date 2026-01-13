"use client"

import { useState } from "react"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

interface Question {
    id: number
    question: string
    options: {
        text: string
        points: number
    }[]
}

const questions: Question[] = [
    {
        id: 1,
        question: "How often do you crave something sweet during the day?",
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
        options: [
            { text: "No problem at all", points: 0 },
            { text: "I feel a bit tired", points: 1 },
            { text: "I get headaches and irritable", points: 2 },
            { text: "I can't make it through the day", points: 3 }
        ]
    },
    {
        id: 3,
        question: "How often do you drink sugary beverages (soda, juice, sweetened coffee)?",
        options: [
            { text: "Never", points: 0 },
            { text: "A few times a week", points: 1 },
            { text: "Once a day", points: 2 },
            { text: "Multiple times a day", points: 3 }
        ]
    },
    {
        id: 4,
        question: "Do you read nutrition labels to check sugar content?",
        options: [
            { text: "Always", points: 0 },
            { text: "Sometimes", points: 1 },
            { text: "Rarely", points: 2 },
            { text: "Never", points: 3 }
        ]
    },
    {
        id: 5,
        question: "How do you typically feel 1-2 hours after eating a sugary snack?",
        options: [
            { text: "I don't eat sugary snacks", points: 0 },
            { text: "Normal, no change", points: 1 },
            { text: "Tired or sluggish", points: 2 },
            { text: "Hungry again and craving more", points: 3 }
        ]
    },
    {
        id: 6,
        question: "How often do you eat dessert or sweet snacks?",
        options: [
            { text: "Special occasions only", points: 0 },
            { text: "A few times a week", points: 1 },
            { text: "Daily", points: 2 },
            { text: "Multiple times a day", points: 3 }
        ]
    },
    {
        id: 7,
        question: "What's your main motivation for reducing sugar?",
        options: [
            { text: "Lose weight", points: 1 },
            { text: "More energy", points: 1 },
            { text: "Better health", points: 1 },
            { text: "I don't want to reduce sugar", points: 3 }
        ]
    },
    {
        id: 8,
        question: "How confident are you that you could go sugar-free for 14 days?",
        options: [
            { text: "Very confident - I've done it before", points: 0 },
            { text: "Somewhat confident", points: 1 },
            { text: "Not very confident", points: 2 },
            { text: "Not confident at all", points: 3 }
        ]
    }
]

interface Result {
    title: string
    emoji: string
    description: string
    recommendation: string
    color: string
}

function getResult(score: number): Result {
    if (score <= 5) {
        return {
            title: "Sugar Conscious",
            emoji: "🌟",
            description: "Great news! You already have a healthy relationship with sugar. You're aware of what you eat and don't rely on sugar for energy or comfort.",
            recommendation: "Keep up the good work! The Sukali app can help you maintain your healthy habits and discover new sugar-free recipes.",
            color: "#22c55e"
        }
    } else if (score <= 10) {
        return {
            title: "Sugar Aware",
            emoji: "👀",
            description: "You have some awareness about sugar but there's room for improvement. You occasionally give in to cravings and might not always check labels.",
            recommendation: "A 14-day sugar challenge could help you reset your habits. Use Sukali to scan foods and identify hidden sugars you might be missing.",
            color: "#eab308"
        }
    } else if (score <= 17) {
        return {
            title: "Sugar Dependent",
            emoji: "⚠️",
            description: "Sugar plays a significant role in your daily life. You experience cravings regularly and may feel withdrawal symptoms when you try to cut back.",
            recommendation: "You would benefit greatly from reducing sugar. Start with our 14-day challenge and use Sukali to track progress and find alternatives.",
            color: "#f97316"
        }
    } else {
        return {
            title: "Sugar Addicted",
            emoji: "🚨",
            description: "Sugar has a strong hold on you. You likely experience energy crashes, frequent cravings, and difficulty going without sweets. The good news? This is very common and completely reversible.",
            recommendation: "A sugar detox could transform your energy and health. Download Sukali to start your journey - the first 2 weeks are the hardest, but it gets so much easier.",
            color: "#ef4444"
        }
    }
}

export default function QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<number[]>([])
    const [showResult, setShowResult] = useState(false)
    const [selectedOption, setSelectedOption] = useState<number | null>(null)

    const progress = ((currentQuestion) / questions.length) * 100

    const handleAnswer = (points: number, index: number) => {
        setSelectedOption(index)

        setTimeout(() => {
            const newAnswers = [...answers, points]
            setAnswers(newAnswers)

            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1)
                setSelectedOption(null)
            } else {
                setShowResult(true)
            }
        }, 300)
    }

    const totalScore = answers.reduce((a, b) => a + b, 0)
    const result = getResult(totalScore)

    const restartQuiz = () => {
        setCurrentQuestion(0)
        setAnswers([])
        setShowResult(false)
        setSelectedOption(null)
    }

    return (
        <main className="min-h-screen bg-black">
            <SiteHeader />

            <section className="pt-24 pb-16 md:pt-32 md:pb-24">
                <div className="mx-auto max-w-2xl px-4">

                    {!showResult ? (
                        <>
                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="flex justify-between text-sm text-[#8E8E93] mb-2">
                                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                                    <span>{Math.round(progress)}% complete</span>
                                </div>
                                <div className="h-2 bg-[#1C1C1E] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#22c55e] transition-all duration-500 ease-out"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Question */}
                            <div className="bg-[#1C1C1E] rounded-3xl border border-[#38383A] p-8 md:p-10">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                                    {questions[currentQuestion].question}
                                </h2>

                                <div className="space-y-3">
                                    {questions[currentQuestion].options.map((option, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswer(option.points, index)}
                                            className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${selectedOption === index
                                                    ? 'bg-[#22c55e] border-[#22c55e] text-black'
                                                    : 'bg-black/50 border-[#38383A] text-white hover:border-[#22c55e]/50'
                                                }`}
                                        >
                                            <span className="font-medium">{option.text}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Back button */}
                            {currentQuestion > 0 && (
                                <button
                                    onClick={() => {
                                        setCurrentQuestion(currentQuestion - 1)
                                        setAnswers(answers.slice(0, -1))
                                        setSelectedOption(null)
                                    }}
                                    className="mt-6 text-[#8E8E93] hover:text-white transition-colors"
                                >
                                    ← Back to previous question
                                </button>
                            )}
                        </>
                    ) : (
                        /* Result */
                        <div className="text-center">
                            <div
                                className="text-8xl mb-6"
                                style={{ filter: `drop-shadow(0 0 20px ${result.color}40)` }}
                            >
                                {result.emoji}
                            </div>

                            <h1
                                className="text-4xl md:text-5xl font-bold mb-4"
                                style={{ color: result.color }}
                            >
                                {result.title}
                            </h1>

                            <p className="text-lg text-[#c4c4c4] mb-6 max-w-lg mx-auto">
                                {result.description}
                            </p>

                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6 mb-8 text-left">
                                <h3 className="text-lg font-bold text-white mb-3">Our Recommendation</h3>
                                <p className="text-[#8E8E93]">{result.recommendation}</p>
                            </div>

                            <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6 mb-8">
                                <h3 className="text-xl font-bold text-white mb-3">Ready to Transform Your Relationship with Sugar?</h3>
                                <p className="text-[#c4c4c4] mb-6">
                                    Download Sukali to scan any food for hidden sugars, get 100+ sugar-free recipes, and track your progress.
                                </p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    <a
                                        href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#22c55e] text-black font-bold rounded-full hover:opacity-90"
                                    >
                                        Download on iOS
                                    </a>
                                    <a
                                        href="https://play.google.com/store/apps/details?id=app.sukali"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 border border-[#38383A] text-white font-medium rounded-full hover:border-[#22c55e]"
                                    >
                                        Get it on Android
                                    </a>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4">
                                <button
                                    onClick={restartQuiz}
                                    className="text-[#8E8E93] hover:text-white transition-colors"
                                >
                                    Take quiz again
                                </button>
                                <Link
                                    href="/blog"
                                    className="text-[#22c55e] hover:underline"
                                >
                                    Read our sugar guides →
                                </Link>
                            </div>
                        </div>
                    )}

                </div>
            </section>

            {!showResult && (
                <section className="pb-16">
                    <div className="mx-auto max-w-2xl px-4 text-center">
                        <p className="text-[#8E8E93] text-sm">
                            This quiz takes about 2 minutes. Your answers help us provide personalized recommendations.
                        </p>
                    </div>
                </section>
            )}

            <SiteFooter />
        </main>
    )
}
