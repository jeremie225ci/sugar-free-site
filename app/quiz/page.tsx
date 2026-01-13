"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

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
        id: 5,
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
        id: 6,
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
        id: 7,
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
        id: 8,
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
        id: 9,
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
        id: 10,
        question: "Have you tried to reduce sugar before but couldn't maintain it?",
        emoji: "🔄",
        options: [
            { text: "No, I've never tried", points: 1 },
            { text: "Yes, once, but gave up", points: 2 },
            { text: "Yes, multiple times without success", points: 3 },
            { text: "No, I successfully reduced and maintained", points: 0 }
        ]
    },
    {
        id: 11,
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
        id: 12,
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
}

function getResult(score: number): Result {
    if (score <= 8) {
        return {
            title: "Sugar Conscious",
            emoji: "🌟",
            description: "Excellent! You have a healthy relationship with sugar. Your body is likely thanking you with stable energy, clear skin, and good digestion.",
            recommendation: "Keep up the amazing work! The Sukali app can help you discover even more sugar-free recipes and maintain your healthy habits.",
            color: "#22c55e"
        }
    } else if (score <= 16) {
        return {
            title: "Sugar Aware",
            emoji: "👀",
            description: "You're doing okay, but there's room for improvement. You may be experiencing some mild symptoms like occasional energy dips or minor skin issues related to sugar.",
            recommendation: "A 14-day sugar challenge could help you feel significantly better. Use Sukali to identify hidden sugars in your diet.",
            color: "#eab308"
        }
    } else if (score <= 26) {
        return {
            title: "Sugar Dependent",
            emoji: "⚠️",
            description: "Sugar is having a significant impact on your life. The symptoms you're experiencing - energy crashes, cravings, digestive issues, or skin problems - are likely connected to your sugar intake.",
            recommendation: "You would benefit greatly from reducing sugar. Your body is showing clear signs that change is needed. Start with our 14-day challenge using Sukali.",
            color: "#f97316"
        }
    } else {
        return {
            title: "Sugar Addicted",
            emoji: "🚨",
            description: "Sugar has a strong hold on your body. Many of the symptoms you're experiencing - fatigue, weight gain, skin issues, digestive problems - are likely caused or worsened by excess sugar consumption.",
            recommendation: "The good news? This is completely reversible. A sugar detox could transform how you feel within just 2 weeks. Download Sukali to start your journey today.",
            color: "#ef4444"
        }
    }
}

const loadingMessages = [
    "Analyzing your responses...",
    "Calculating your sugar profile...",
    "Identifying patterns...",
    "Preparing personalized recommendations...",
    "Almost there..."
]

export default function QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<number[]>([])
    const [showResult, setShowResult] = useState(false)
    const [selectedOption, setSelectedOption] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0)

    const progress = ((currentQuestion) / questions.length) * 100

    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setLoadingProgress(prev => {
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
                setLoadingMessageIndex(prev =>
                    prev < loadingMessages.length - 1 ? prev + 1 : prev
                )
            }, 600)

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
                // Show loading animation before results
                setIsLoading(true)
                setLoadingProgress(0)
                setLoadingMessageIndex(0)
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
        setIsLoading(false)
        setLoadingProgress(0)
    }

    return (
        <main className="min-h-screen bg-black">
            <SiteHeader />

            <section className="pt-24 pb-16 md:pt-32 md:pb-24">
                <div className="mx-auto max-w-2xl px-4">

                    {isLoading ? (
                        /* Loading Animation */
                        <div className="flex flex-col items-center justify-center min-h-[60vh]">
                            <div className="relative w-40 h-40 mb-8">
                                {/* Circular progress */}
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="70"
                                        stroke="#1C1C1E"
                                        strokeWidth="8"
                                        fill="none"
                                    />
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="70"
                                        stroke="#22c55e"
                                        strokeWidth="8"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeDasharray={440}
                                        strokeDashoffset={440 - (440 * loadingProgress) / 100}
                                        className="transition-all duration-100"
                                    />
                                </svg>
                                {/* Percentage in center */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-4xl font-bold text-white">{Math.round(loadingProgress)}%</span>
                                </div>
                            </div>

                            <p className="text-lg text-[#22c55e] font-medium mb-2 animate-pulse">
                                {loadingMessages[loadingMessageIndex]}
                            </p>
                            <p className="text-[#8E8E93] text-sm">
                                Please wait while we analyze your results
                            </p>
                        </div>
                    ) : !showResult ? (
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
                                {questions[currentQuestion].emoji && (
                                    <div className="text-5xl mb-4">{questions[currentQuestion].emoji}</div>
                                )}
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

                            <div className="flex justify-center gap-2 mb-6">
                                <span className="text-[#8E8E93]">Your score:</span>
                                <span className="font-bold" style={{ color: result.color }}>{totalScore}/{questions.length * 3}</span>
                            </div>

                            <p className="text-lg text-[#c4c4c4] mb-6 max-w-lg mx-auto">
                                {result.description}
                            </p>

                            <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6 mb-8 text-left">
                                <h3 className="text-lg font-bold text-white mb-3">💡 Our Recommendation</h3>
                                <p className="text-[#8E8E93]">{result.recommendation}</p>
                            </div>

                            <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6 mb-8">
                                <h3 className="text-xl font-bold text-white mb-3">Ready to Transform Your Health?</h3>
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

            {!showResult && !isLoading && (
                <section className="pb-16">
                    <div className="mx-auto max-w-2xl px-4 text-center">
                        <p className="text-[#8E8E93] text-sm">
                            This quiz takes about 2 minutes. Your answers are confidential and help us provide personalized recommendations.
                        </p>
                    </div>
                </section>
            )}

            <SiteFooter />
        </main>
    )
}
