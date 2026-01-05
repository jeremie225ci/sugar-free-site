"use client"

import { useState } from "react"

type UnitSystem = "metric" | "imperial"
type BMICategory = "underweight" | "healthy" | "overweight" | "obese" | null

interface BMIResult {
    bmi: number
    category: BMICategory
    categoryLabel: string
}

export default function BMICalculatorWidget() {
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

    return (
        <div className="my-8">
            {/* Calculator Card */}
            <div className="bg-gradient-to-br from-[#0d9488] to-[#0369a1] rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#0d9488] to-[#0369a1] px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">Adult BMI Calculator</h2>
                </div>

                <div className="bg-[#1C1C1E] p-6">
                    {!showResult ? (
                        <>
                            {/* Unit Toggle */}
                            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                                <div className="flex items-center gap-4 md:gap-6 flex-wrap">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="unit"
                                            checked={unitSystem === "imperial"}
                                            onChange={() => setUnitSystem("imperial")}
                                            className="w-4 h-4 accent-[#0d9488]"
                                        />
                                        <span className="text-white text-sm md:text-base">US Units</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="unit"
                                            checked={unitSystem === "metric"}
                                            onChange={() => setUnitSystem("metric")}
                                            className="w-4 h-4 accent-[#0d9488]"
                                        />
                                        <span className="text-white text-sm md:text-base">Metric</span>
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
                                            className="w-28 md:w-32 px-4 py-3 bg-[#2C2C2E] border border-[#38383A] rounded-lg text-white text-lg focus:border-[#0d9488] focus:outline-none"
                                        />
                                        <span className="text-[#8E8E93]">cm</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <input
                                            type="number"
                                            value={heightFt}
                                            onChange={(e) => setHeightFt(e.target.value)}
                                            placeholder="5"
                                            className="w-20 md:w-24 px-4 py-3 bg-[#2C2C2E] border border-[#38383A] rounded-lg text-white text-lg focus:border-[#0d9488] focus:outline-none"
                                        />
                                        <span className="text-[#8E8E93]">ft</span>
                                        <input
                                            type="number"
                                            value={heightIn}
                                            onChange={(e) => setHeightIn(e.target.value)}
                                            placeholder="7"
                                            className="w-20 md:w-24 px-4 py-3 bg-[#2C2C2E] border border-[#38383A] rounded-lg text-white text-lg focus:border-[#0d9488] focus:outline-none"
                                        />
                                        <span className="text-[#8E8E93]">in</span>
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
                                        className="w-28 md:w-32 px-4 py-3 bg-[#2C2C2E] border border-[#38383A] rounded-lg text-white text-lg focus:border-[#0d9488] focus:outline-none"
                                    />
                                    <span className="text-[#8E8E93]">
                                        {unitSystem === "metric" ? "kg" : "lbs"}
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
                                        <p className={`text-2xl md:text-3xl font-bold ${getCategoryColor(result?.category || null)}`}>
                                            {result?.categoryLabel}
                                        </p>
                                        <p className="text-[#8E8E93] text-sm mt-1">BMI CATEGORY</p>
                                    </div>
                                </div>
                            </div>

                            {/* Information Entered */}
                            <div className="mb-8">
                                <h4 className="text-xl font-bold text-white mb-4">Information Entered</h4>
                                <div className="flex gap-6 md:gap-12 flex-wrap">
                                    <div>
                                        <span className="text-[#8E8E93]">Height: </span>
                                        <span className="text-white font-medium">
                                            {unitSystem === "metric"
                                                ? `${heightCm} cm`
                                                : `${heightFt}' ${heightIn}"`
                                            }
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-[#8E8E93]">Weight: </span>
                                        <span className="text-white font-medium">
                                            {weight} {unitSystem === "metric" ? "kg" : "lbs"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-[#38383A] mb-8" />

                            {/* Detailed Results */}
                            <div>
                                <h4 className="text-xl font-bold text-white mb-4">Detailed Results</h4>
                                <div className="flex flex-col gap-8">
                                    <div>
                                        <p className="text-[#8E8E93]">
                                            Based on the information entered, your body mass index (BMI) is{" "}
                                            <span className="text-white font-bold">{result?.bmi}</span>, indicating your weight is in the{" "}
                                            <span className={`font-bold ${getCategoryColor(result?.category || null)}`}>
                                                {result?.categoryLabel}
                                            </span>{" "}
                                            category for adults of your height.
                                        </p>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[280px]">
                                            <thead>
                                                <tr className="bg-gradient-to-r from-[#0d9488] to-[#0369a1]">
                                                    <th className="px-4 py-2 text-left text-white font-semibold">BMI Category</th>
                                                    <th className="px-4 py-2 text-left text-white font-semibold">BMI Range</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className={`border-b border-[#38383A] ${result?.category === "underweight" ? "bg-[#38383A]" : ""}`}>
                                                    <td className="px-4 py-3 text-white">
                                                        {result?.category === "underweight" && <span className="mr-2">▶</span>}
                                                        Underweight
                                                    </td>
                                                    <td className="px-4 py-3 text-white">Below 18.5</td>
                                                </tr>
                                                <tr className={`border-b border-[#38383A] ${result?.category === "healthy" ? "bg-[#38383A]" : ""}`}>
                                                    <td className="px-4 py-3 text-white">
                                                        {result?.category === "healthy" && <span className="mr-2">▶</span>}
                                                        Healthy Weight
                                                    </td>
                                                    <td className="px-4 py-3 text-white">18.5 to 24.9</td>
                                                </tr>
                                                <tr className={`border-b border-[#38383A] ${result?.category === "overweight" ? "bg-[#38383A]" : ""}`}>
                                                    <td className="px-4 py-3 text-white">
                                                        {result?.category === "overweight" && <span className="mr-2">▶</span>}
                                                        Overweight
                                                    </td>
                                                    <td className="px-4 py-3 text-white">25.0 to 29.9</td>
                                                </tr>
                                                <tr className={`${result?.category === "obese" ? "bg-[#38383A]" : ""}`}>
                                                    <td className="px-4 py-3 text-white">
                                                        {result?.category === "obese" && <span className="mr-2">▶</span>}
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
                This calculator is not a substitute for professional medical advice.
            </p>
        </div>
    )
}
