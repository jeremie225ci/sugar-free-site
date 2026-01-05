"use client"

import { useState } from "react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import StickyDownloadBar from "@/components/StickyDownloadBar"
import Link from "next/link"

type UnitSystem = "metric" | "imperial"
type BMICategory = "underweight" | "healthy" | "overweight" | "obese" | null

interface BMIResult {
    bmi: number
    category: BMICategory
    categoryLabel: string
}

export default function BMICalculatorPage() {
    const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric")
    const [heightCm, setHeightCm] = useState("")
    const [heightFt, setHeightFt] = useState("")
    const [heightIn, setHeightIn] = useState("")
    const [weight, setWeight] = useState("")
    const [result, setResult] = useState<BMIResult | null>(null)
    const [showResult, setShowResult] = useState(false)

    const calculateBMI = () => {
        let heightInMeters: number
        let weightInKg: number

        if (unitSystem === "metric") {
            heightInMeters = parseFloat(heightCm) / 100
            weightInKg = parseFloat(weight)
        } else {
            const totalInches = (parseFloat(heightFt) * 12) + parseFloat(heightIn || "0")
            heightInMeters = totalInches * 0.0254
            weightInKg = parseFloat(weight) * 0.453592
        }

        if (isNaN(heightInMeters) || isNaN(weightInKg) || heightInMeters <= 0 || weightInKg <= 0) {
            return
        }

        const bmi = weightInKg / (heightInMeters * heightInMeters)
        let category: BMICategory
        let categoryLabel: string

        if (bmi < 18.5) {
            category = "underweight"
            categoryLabel = "Underweight"
        } else if (bmi < 25) {
            category = "healthy"
            categoryLabel = "Healthy Weight"
        } else if (bmi < 30) {
            category = "overweight"
            categoryLabel = "Overweight"
        } else {
            category = "obese"
            categoryLabel = "Obese"
        }

        setResult({ bmi: Math.round(bmi * 10) / 10, category, categoryLabel })
        setShowResult(true)
    }

    const resetCalculator = () => {
        setHeightCm("")
        setHeightFt("")
        setHeightIn("")
        setWeight("")
        setResult(null)
        setShowResult(false)
    }

    const getCategoryColor = (category: BMICategory) => {
        switch (category) {
            case "underweight": return "text-blue-400"
            case "healthy": return "text-[#22c55e]"
            case "overweight": return "text-yellow-400"
            case "obese": return "text-red-400"
            default: return "text-white"
        }
    }

    const bmiSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "BMI Calculator for Women",
        "description": "Free BMI calculator designed for women. Calculate your Body Mass Index instantly and get personalized weight loss recommendations.",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        }
    }

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is a healthy BMI for women?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A healthy BMI for women is between 18.5 and 24.9. This range indicates a weight that is proportional to height and is associated with the lowest health risks."
                }
            },
            {
                "@type": "Question",
                "name": "How accurate is BMI for women?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "BMI is a useful screening tool but does not account for muscle mass, bone density, or fat distribution. Women naturally have higher body fat percentages than men, so BMI should be considered alongside other health indicators."
                }
            },
            {
                "@type": "Question",
                "name": "How can I lower my BMI?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The most effective way to lower your BMI is through a combination of reducing sugar intake, eating whole foods, and regular physical activity. Cutting sugar reduces inflammation and helps your body burn stored fat."
                }
            }
        ]
    }

    return (
        <main className="min-h-screen bg-black">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(bmiSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <SiteHeader />

            {/* BMI Calculator Section */}
            <section className="bg-black pt-24 pb-12 md:pt-32 md:pb-16">
                <div className="mx-auto max-w-3xl px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
                        BMI Calculator for Women
                    </h1>
                    <p className="text-[#8E8E93] text-lg text-center mb-10 max-w-2xl mx-auto">
                        Calculate your Body Mass Index instantly. Discover your healthy weight range and get personalized tips for reaching your goals.
                    </p>

                    {/* Calculator Card */}
                    <div className="bg-gradient-to-br from-[#0d9488] to-[#0369a1] rounded-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-[#0d9488] to-[#0369a1] px-6 py-4">
                            <h2 className="text-2xl font-bold text-white">Adult BMI Calculator</h2>
                        </div>

                        <div className="bg-[#1C1C1E] p-6">
                            {!showResult ? (
                                <>
                                    {/* Unit Toggle */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-6">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="unit"
                                                    checked={unitSystem === "imperial"}
                                                    onChange={() => setUnitSystem("imperial")}
                                                    className="w-4 h-4 accent-[#0d9488]"
                                                />
                                                <span className="text-white">US Customary Units</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="unit"
                                                    checked={unitSystem === "metric"}
                                                    onChange={() => setUnitSystem("metric")}
                                                    className="w-4 h-4 accent-[#0d9488]"
                                                />
                                                <span className="text-white">Metric Units</span>
                                            </label>
                                        </div>
                                        <button
                                            onClick={resetCalculator}
                                            className="text-[#0d9488] hover:underline text-sm font-medium"
                                        >
                                            RESET
                                        </button>
                                    </div>

                                    {/* Height Input */}
                                    <div className="mb-6">
                                        <label className="block text-white font-semibold mb-3">HEIGHT</label>
                                        {unitSystem === "metric" ? (
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="number"
                                                    value={heightCm}
                                                    onChange={(e) => setHeightCm(e.target.value)}
                                                    placeholder="170"
                                                    className="w-32 px-4 py-3 bg-[#2C2C2E] border border-[#38383A] rounded-lg text-white text-lg focus:border-[#0d9488] focus:outline-none"
                                                />
                                                <span className="text-[#8E8E93]">centimeters (cm)</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="number"
                                                    value={heightFt}
                                                    onChange={(e) => setHeightFt(e.target.value)}
                                                    placeholder="5"
                                                    className="w-24 px-4 py-3 bg-[#2C2C2E] border border-[#38383A] rounded-lg text-white text-lg focus:border-[#0d9488] focus:outline-none"
                                                />
                                                <span className="text-[#8E8E93]">feet (ft)</span>
                                                <input
                                                    type="number"
                                                    value={heightIn}
                                                    onChange={(e) => setHeightIn(e.target.value)}
                                                    placeholder="7"
                                                    className="w-24 px-4 py-3 bg-[#2C2C2E] border border-[#38383A] rounded-lg text-white text-lg focus:border-[#0d9488] focus:outline-none"
                                                />
                                                <span className="text-[#8E8E93]">inches (in)</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Weight Input */}
                                    <div className="mb-8">
                                        <label className="block text-white font-semibold mb-3">WEIGHT</label>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="number"
                                                value={weight}
                                                onChange={(e) => setWeight(e.target.value)}
                                                placeholder={unitSystem === "metric" ? "65" : "140"}
                                                className="w-32 px-4 py-3 bg-[#2C2C2E] border border-[#38383A] rounded-lg text-white text-lg focus:border-[#0d9488] focus:outline-none"
                                            />
                                            <span className="text-[#8E8E93]">
                                                {unitSystem === "metric" ? "kilograms (kg)" : "pounds (lbs)"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Calculate Button */}
                                    <button
                                        onClick={calculateBMI}
                                        className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-[#0d9488] to-[#0369a1] text-white font-bold text-lg rounded-lg hover:opacity-90 transition-opacity"
                                    >
                                        Calculate
                                    </button>
                                </>
                            ) : (
                                <>
                                    {/* Results View */}
                                    <div className="text-right mb-4">
                                        <button
                                            onClick={resetCalculator}
                                            className="text-[#0d9488] hover:underline font-medium"
                                        >
                                            ← Back to Calculator
                                        </button>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-6">Calculated Results</h3>

                                    {/* BMI Display */}
                                    <div className="bg-[#2C2C2E] border-2 border-[#FFD700] rounded-xl p-6 mb-8">
                                        <div className="flex items-center justify-around">
                                            <div className="text-center">
                                                <p className="text-4xl font-bold text-white">{result?.bmi}</p>
                                                <p className="text-[#8E8E93] text-sm mt-1">BMI</p>
                                            </div>
                                            <div className="text-center">
                                                <p className={`text-3xl font-bold ${getCategoryColor(result?.category || null)}`}>
                                                    {result?.categoryLabel}
                                                </p>
                                                <p className="text-[#8E8E93] text-sm mt-1">BMI CATEGORY</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Information Entered */}
                                    <div className="mb-8">
                                        <h4 className="text-xl font-bold text-white mb-4">Information Entered</h4>
                                        <div className="flex gap-12">
                                            <div>
                                                <span className="text-[#8E8E93]">Height: </span>
                                                <span className="text-white font-medium">
                                                    {unitSystem === "metric"
                                                        ? `${heightCm} centimeters`
                                                        : `${heightFt}' ${heightIn}"`
                                                    }
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-[#8E8E93]">Weight: </span>
                                                <span className="text-white font-medium">
                                                    {weight} {unitSystem === "metric" ? "kilograms" : "pounds"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="border-[#38383A] mb-8" />

                                    {/* Detailed Results */}
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-4">Detailed Results</h4>
                                        <div className="flex flex-col md:flex-row gap-8">
                                            <div className="flex-1">
                                                <p className="text-[#8E8E93]">
                                                    Based on the information entered, your body mass index (BMI) is{" "}
                                                    <span className="text-white font-bold">{result?.bmi}</span>, indicating your weight is in the{" "}
                                                    <span className={`font-bold ${getCategoryColor(result?.category || null)}`}>
                                                        {result?.categoryLabel}
                                                    </span>{" "}
                                                    category for adults of your height.
                                                </p>
                                            </div>
                                            <div className="flex-1">
                                                <table className="w-full">
                                                    <thead>
                                                        <tr className="bg-gradient-to-r from-[#0d9488] to-[#0369a1]">
                                                            <th className="px-4 py-2 text-left text-white font-semibold">BMI Category</th>
                                                            <th className="px-4 py-2 text-left text-white font-semibold">BMI Range</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className={`border-b border-[#38383A] ${result?.category === "underweight" ? "bg-[#38383A]" : ""}`}>
                                                            <td className="px-4 py-3 text-white flex items-center gap-2">
                                                                {result?.category === "underweight" && <span>▶</span>}
                                                                Underweight
                                                            </td>
                                                            <td className="px-4 py-3 text-white">Below 18.5</td>
                                                        </tr>
                                                        <tr className={`border-b border-[#38383A] ${result?.category === "healthy" ? "bg-[#38383A]" : ""}`}>
                                                            <td className="px-4 py-3 text-white flex items-center gap-2">
                                                                {result?.category === "healthy" && <span>▶</span>}
                                                                Healthy Weight
                                                            </td>
                                                            <td className="px-4 py-3 text-white">18.5 to 24.9</td>
                                                        </tr>
                                                        <tr className={`border-b border-[#38383A] ${result?.category === "overweight" ? "bg-[#38383A]" : ""}`}>
                                                            <td className="px-4 py-3 text-white flex items-center gap-2">
                                                                {result?.category === "overweight" && <span>▶</span>}
                                                                Overweight
                                                            </td>
                                                            <td className="px-4 py-3 text-white">25.0 to 29.9</td>
                                                        </tr>
                                                        <tr className={`${result?.category === "obese" ? "bg-[#38383A]" : ""}`}>
                                                            <td className="px-4 py-3 text-white flex items-center gap-2">
                                                                {result?.category === "obese" && <span>▶</span>}
                                                                Obesity
                                                            </td>
                                                            <td className="px-4 py-3 text-white">30.0 or greater</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <p className="text-[#8E8E93] text-sm text-center mt-4">
                        This calculator is not a substitute for professional medical advice. Consult your healthcare provider for personalized guidance.
                    </p>
                </div>
            </section>

            {/* Article Content */}
            <section className="bg-[#0A0A0A] py-16 md:py-24">
                <article className="mx-auto max-w-3xl px-4">
                    <div className="prose prose-invert prose-lg max-w-none">

                        <h2 className="text-3xl font-bold text-white mb-6">What Is BMI and Why Does It Matter for Women</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Body Mass Index, or BMI, is a simple calculation that uses your height and weight to estimate whether you are at a healthy weight. For women, understanding your BMI is the first step toward taking control of your health and making informed decisions about nutrition and lifestyle.
                        </p>

                        <p className="text-[#c4c4c4] mb-6">
                            The formula is straightforward. Your weight in kilograms divided by your height in meters squared. The result places you in one of four categories: underweight, healthy weight, overweight, or obese. Each category carries different health implications and risk factors.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            While BMI is not perfect and does not account for muscle mass or body composition, it remains a valuable screening tool. Research consistently shows that BMI outside the healthy range correlates with increased risk of diabetes, heart disease, and certain cancers.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Understanding BMI Ranges for Women</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            The BMI categories are the same for men and women, but the interpretation differs slightly because women naturally carry more body fat. Here is what each category means for your health.
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6 mb-8">
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <span className="text-blue-400 text-2xl">○</span>
                                    <div>
                                        <p className="text-white font-semibold">Underweight (Below 18.5)</p>
                                        <p className="text-[#8E8E93]">May indicate nutritional deficiency. Consider speaking with a healthcare provider about healthy ways to gain weight.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <span className="text-[#22c55e] text-2xl">●</span>
                                    <div>
                                        <p className="text-white font-semibold">Healthy Weight (18.5 to 24.9)</p>
                                        <p className="text-[#8E8E93]">Your weight is proportional to your height. Focus on maintaining this range through balanced nutrition.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <span className="text-yellow-400 text-2xl">●</span>
                                    <div>
                                        <p className="text-white font-semibold">Overweight (25.0 to 29.9)</p>
                                        <p className="text-[#8E8E93]">Increased risk of health problems. Small lifestyle changes can help you move toward a healthier range.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <span className="text-red-400 text-2xl">●</span>
                                    <div>
                                        <p className="text-white font-semibold">Obese (30.0 or greater)</p>
                                        <p className="text-[#8E8E93]">Higher risk of serious health conditions. Consider consulting a healthcare provider for a comprehensive plan.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">The Hidden Factor Most People Miss: Sugar</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            If you just calculated your BMI and discovered you are in the overweight or obese category, you are probably wondering what to do next. Most advice focuses on eating less and exercising more. But there is a hidden factor that sabotages weight loss for millions of women: sugar.
                        </p>

                        <p className="text-[#c4c4c4] mb-6">
                            Sugar is everywhere in our modern diet. It hides in bread, pasta sauce, salad dressings, and even foods marketed as healthy. The average person consumes 160 to 200 grams of sugar per day without realizing it. This constant sugar intake keeps your insulin levels elevated, and when insulin is high, your body physically cannot burn fat.
                        </p>

                        <p className="text-[#c4c4c4] mb-6">
                            Think of insulin as a storage hormone. Every time you eat sugar, your blood glucose spikes, and your body releases insulin to bring it down. The problem is that insulin tells your body to store energy as fat instead of burning it. If you want to lower your BMI, you need to break this cycle.
                        </p>

                        <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl border border-[#22c55e]/30 p-6 mb-8">
                            <h3 className="text-xl font-bold text-white mb-3">The Sugar Weight Connection</h3>
                            <ul className="text-[#c4c4c4] space-y-2">
                                <li>• Sugar spikes insulin, blocking fat burning</li>
                                <li>• Hidden sugars add hundreds of calories daily</li>
                                <li>• Sugar causes inflammation and water retention</li>
                                <li>• Cutting sugar can reduce BMI by 2 to 3 points in 30 days</li>
                            </ul>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">How to Lower Your BMI Naturally</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Reducing your BMI does not require extreme diets or hours at the gym. The most effective approach is making sustainable changes to what you eat. Here are strategies that work.
                        </p>

                        <p className="text-[#c4c4c4] mb-6">
                            First, cut added sugars from your diet. This single change can produce dramatic results. When you stop flooding your body with sugar, your insulin levels normalize, and your body finally accesses its fat stores for energy. Many women report losing several pounds in the first two weeks just by eliminating sugary drinks and snacks.
                        </p>

                        <p className="text-[#c4c4c4] mb-6">
                            Second, focus on whole foods. Vegetables, fruits, lean proteins, and healthy fats should form the foundation of your meals. These foods keep you satisfied without the blood sugar spikes that lead to cravings and overeating. Try our{" "}
                            <Link href="/food/greek-salad-bowl" className="text-[#22c55e] hover:underline">Greek Salad Bowl</Link> or{" "}
                            <Link href="/food/herb-baked-salmon" className="text-[#22c55e] hover:underline">Herb Baked Salmon</Link> for delicious low-sugar meal ideas.
                        </p>

                        <p className="text-[#c4c4c4] mb-8">
                            Third, read labels carefully. Sugar hides under many names: high fructose corn syrup, dextrose, maltose, sucrose. If a product contains any of these in the first few ingredients, it is best avoided. The easiest way to track hidden sugars is using the Sukali app to scan your food before you buy it.
                        </p>

                        <h2 className="text-3xl font-bold text-white mb-6">Track Your Progress with Sukali</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            Knowing your BMI is the starting point. But real transformation happens when you understand exactly what you are putting into your body every day. The Sukali app makes this simple.
                        </p>

                        <p className="text-[#c4c4c4] mb-6">
                            Scan any food with your phone camera and see the sugar content instantly. No more guessing. No more accidentally eating foods that spike your insulin and keep your BMI high. When you can see the numbers, making healthy choices becomes effortless.
                        </p>

                        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] p-6 mb-8">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-3">Start Your Transformation</h3>
                                    <p className="text-[#8E8E93] mb-4">
                                        Download Sukali to scan foods, track your sugar intake, and get personalized recommendations for reaching your healthy BMI.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <a
                                            href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#22c55e] text-black font-bold rounded-full hover:opacity-90"
                                        >
                                            Download iOS
                                        </a>
                                        <a
                                            href="https://play.google.com/store/apps/details?id=app.sukali"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#38383A] text-white font-medium rounded-full hover:border-[#22c55e]"
                                        >
                                            Android
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>

                        <div className="space-y-6 mb-8">
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <h3 className="text-lg font-bold text-white mb-2">What is a healthy BMI for women?</h3>
                                <p className="text-[#8E8E93]">
                                    A healthy BMI for women is between 18.5 and 24.9. This range indicates a weight that is proportional to height and is associated with the lowest health risks.
                                </p>
                            </div>
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <h3 className="text-lg font-bold text-white mb-2">How accurate is BMI for women?</h3>
                                <p className="text-[#8E8E93]">
                                    BMI is a useful screening tool but does not account for muscle mass, bone density, or fat distribution. Women naturally have higher body fat percentages than men, so BMI should be considered alongside other health indicators.
                                </p>
                            </div>
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <h3 className="text-lg font-bold text-white mb-2">How quickly can I lower my BMI?</h3>
                                <p className="text-[#8E8E93]">
                                    A safe rate of weight loss is 0.5 to 1 kg per week. By cutting sugar and eating whole foods, many women see their BMI drop by 1 to 2 points within the first month.
                                </p>
                            </div>
                            <div className="bg-[#1C1C1E] rounded-xl border border-[#38383A] p-5">
                                <h3 className="text-lg font-bold text-white mb-2">Does BMI differ based on age?</h3>
                                <p className="text-[#8E8E93]">
                                    The standard BMI categories apply to adults of all ages. However, body composition changes with age, and some experts suggest slightly higher BMI ranges may be acceptable for older adults.
                                </p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-6">Take the First Step Today</h2>

                        <p className="text-[#c4c4c4] mb-6">
                            You have calculated your BMI. You understand what it means. Now it is time to take action. The path to a healthier weight starts with awareness of what you eat, especially the hidden sugars that keep so many women stuck.
                        </p>

                        <p className="text-[#c4c4c4] mb-6">
                            Explore our collection of{" "}
                            <Link href="/food" className="text-[#22c55e] hover:underline">sugar-free recipes</Link>{" "}
                            designed to help you lose weight without feeling deprived. Read our guide on{" "}
                            <Link href="/blog/healthy-meal-plans-for-weight-loss" className="text-[#22c55e] hover:underline">healthy meal plans for weight loss</Link>{" "}
                            to create a sustainable eating routine.
                        </p>

                        <p className="text-[#c4c4c4]">
                            Your healthy BMI is within reach. Download Sukali, start tracking your sugar intake, and watch your body transform.
                        </p>

                    </div>
                </article>
            </section>

            <SiteFooter />
            <StickyDownloadBar />
        </main>
    )
}
