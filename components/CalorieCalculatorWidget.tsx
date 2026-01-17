"use client"

import { useState } from "react"

interface CalorieResults {
    maintain: number
    mildLoss: number
    weightLoss: number
    extremeLoss: number
    mildGain: number
    weightGain: number
}

interface ZigzagSchedule {
    day: string
    mildLoss: number
    weightLoss: number
}

export default function CalorieCalculatorWidget() {
    const [age, setAge] = useState<number>(25)
    const [gender, setGender] = useState<"male" | "female">("male")
    const [height, setHeight] = useState<number>(175)
    const [weight, setWeight] = useState<number>(70)
    const [activity, setActivity] = useState<number>(1.55)
    const [results, setResults] = useState<CalorieResults | null>(null)
    const [showResults, setShowResults] = useState(false)
    const [showGain, setShowGain] = useState(false)

    const activityLevels = [
        { value: 1.2, label: "Sedentary (little or no exercise)" },
        { value: 1.375, label: "Light (exercise 1-3 days/week)" },
        { value: 1.55, label: "Moderate (exercise 4-5 days/week)" },
        { value: 1.725, label: "Active (exercise 6-7 days/week)" },
        { value: 1.9, label: "Very Active (hard exercise daily)" },
    ]

    const calculateCalories = () => {
        // Mifflin-St Jeor Equation
        let bmr: number
        if (gender === "male") {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161
        }

        const tdee = Math.round(bmr * activity)

        setResults({
            maintain: tdee,
            mildLoss: Math.round(tdee * 0.9), // 0.25 kg/week
            weightLoss: Math.round(tdee * 0.79), // 0.5 kg/week
            extremeLoss: Math.round(tdee * 0.59), // 1 kg/week
            mildGain: Math.round(tdee * 1.1), // 0.25 kg/week
            weightGain: Math.round(tdee * 1.21), // 0.5 kg/week
        })
        setShowResults(true)
    }

    const clearResults = () => {
        setResults(null)
        setShowResults(false)
        setAge(25)
        setGender("male")
        setHeight(175)
        setWeight(70)
        setActivity(1.55)
    }

    const getZigzagSchedule1 = (): ZigzagSchedule[] => {
        if (!results) return []
        return [
            { day: "Sunday", mildLoss: results.maintain, weightLoss: results.maintain },
            { day: "Monday", mildLoss: results.mildLoss - 100, weightLoss: results.weightLoss - 200 },
            { day: "Tuesday", mildLoss: results.mildLoss - 100, weightLoss: results.weightLoss - 200 },
            { day: "Wednesday", mildLoss: results.mildLoss - 100, weightLoss: results.weightLoss - 200 },
            { day: "Thursday", mildLoss: results.mildLoss - 100, weightLoss: results.weightLoss - 200 },
            { day: "Friday", mildLoss: results.mildLoss - 100, weightLoss: results.weightLoss - 200 },
            { day: "Saturday", mildLoss: results.maintain, weightLoss: results.maintain },
        ]
    }

    const getZigzagSchedule2 = (): ZigzagSchedule[] => {
        if (!results) return []
        const base = results.mildLoss
        return [
            { day: "Sunday", mildLoss: Math.round(base * 0.88), weightLoss: Math.round(results.weightLoss * 0.78) },
            { day: "Monday", mildLoss: Math.round(base * 0.96), weightLoss: Math.round(results.weightLoss * 0.93) },
            { day: "Tuesday", mildLoss: Math.round(base * 1.04), weightLoss: Math.round(results.weightLoss * 1.07) },
            { day: "Wednesday", mildLoss: results.maintain, weightLoss: Math.round(results.weightLoss * 1.22) },
            { day: "Thursday", mildLoss: Math.round(base * 1.08), weightLoss: Math.round(results.weightLoss * 1.15) },
            { day: "Friday", mildLoss: results.mildLoss, weightLoss: results.weightLoss },
            { day: "Saturday", mildLoss: Math.round(base * 0.92), weightLoss: Math.round(results.weightLoss * 0.85) },
        ]
    }

    return (
        <div className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] p-4">
                <h2 className="text-xl font-bold text-black">Maintenance Calorie Calculator</h2>
                <p className="text-black/70 text-sm">Calculate your daily calorie needs</p>
            </div>

            {/* Form */}
            <div className="p-6 space-y-5">
                {/* Age */}
                <div className="flex items-center gap-4">
                    <label className="text-[#8E8E93] w-20">Age</label>
                    <div className="flex-1 flex items-center gap-2">
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                            min={15}
                            max={80}
                            className="w-24 bg-[#2C2C2E] border border-[#38383A] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#22c55e]"
                        />
                        <span className="text-[#8E8E93] text-sm">ages 15 - 80</span>
                    </div>
                </div>

                {/* Gender */}
                <div className="flex items-center gap-4">
                    <label className="text-[#8E8E93] w-20">Gender</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="gender"
                                checked={gender === "male"}
                                onChange={() => setGender("male")}
                                className="w-4 h-4 accent-[#22c55e]"
                            />
                            <span className="text-white">Male</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="gender"
                                checked={gender === "female"}
                                onChange={() => setGender("female")}
                                className="w-4 h-4 accent-[#22c55e]"
                            />
                            <span className="text-white">Female</span>
                        </label>
                    </div>
                </div>

                {/* Height */}
                <div className="flex items-center gap-4">
                    <label className="text-[#8E8E93] w-20">Height</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(Number(e.target.value))}
                            className="w-24 bg-[#2C2C2E] border border-[#38383A] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#22c55e]"
                        />
                        <span className="text-[#8E8E93]">cm</span>
                    </div>
                </div>

                {/* Weight */}
                <div className="flex items-center gap-4">
                    <label className="text-[#8E8E93] w-20">Weight</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))}
                            className="w-24 bg-[#2C2C2E] border border-[#38383A] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#22c55e]"
                        />
                        <span className="text-[#8E8E93]">kg</span>
                    </div>
                </div>

                {/* Activity */}
                <div className="flex items-center gap-4">
                    <label className="text-[#8E8E93] w-20">Activity</label>
                    <select
                        value={activity}
                        onChange={(e) => setActivity(Number(e.target.value))}
                        className="flex-1 bg-[#2C2C2E] border border-[#38383A] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#22c55e]"
                    >
                        {activityLevels.map((level) => (
                            <option key={level.value} value={level.value}>
                                {level.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                    <button
                        onClick={calculateCalories}
                        className="flex-1 bg-[#22c55e] text-black font-bold py-3 px-6 rounded-xl hover:bg-[#16a34a] transition-colors"
                    >
                        Calculate
                    </button>
                    <button
                        onClick={clearResults}
                        className="bg-[#2C2C2E] text-white font-medium py-3 px-6 rounded-xl hover:bg-[#38383A] transition-colors"
                    >
                        Clear
                    </button>
                </div>
            </div>

            {/* Results */}
            {showResults && results && (
                <div className="border-t border-[#38383A] p-6">
                    <div className="bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-xl p-4 mb-6">
                        <h3 className="text-lg font-bold text-white mb-1">Results</h3>
                        <p className="text-[#8E8E93] text-sm">
                            Daily calorie estimates based on your stats
                        </p>
                    </div>

                    {/* Calorie Cards */}
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between bg-[#2C2C2E] rounded-xl p-4">
                            <div>
                                <div className="text-white font-medium">Maintain weight</div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-white">{results.maintain.toLocaleString()}</div>
                                <div className="text-[#8E8E93] text-sm">Calories/day</div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between bg-[#2C2C2E] rounded-xl p-4">
                            <div>
                                <div className="text-white font-medium">Mild weight loss</div>
                                <div className="text-[#8E8E93] text-sm">0.25 kg/week</div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-[#22c55e]">{results.mildLoss.toLocaleString()}</div>
                                <div className="text-[#8E8E93] text-sm">90% • Calories/day</div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between bg-[#2C2C2E] rounded-xl p-4">
                            <div>
                                <div className="text-white font-medium">Weight loss</div>
                                <div className="text-[#8E8E93] text-sm">0.5 kg/week</div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-[#22c55e]">{results.weightLoss.toLocaleString()}</div>
                                <div className="text-[#8E8E93] text-sm">79% • Calories/day</div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between bg-[#2C2C2E] rounded-xl p-4 border border-yellow-500/30">
                            <div>
                                <div className="text-white font-medium">Extreme weight loss</div>
                                <div className="text-[#8E8E93] text-sm">1 kg/week</div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-yellow-500">{results.extremeLoss.toLocaleString()}</div>
                                <div className="text-[#8E8E93] text-sm">59% • Calories/day</div>
                            </div>
                        </div>
                    </div>

                    <p className="text-yellow-500 text-sm mb-6">
                        ⚠️ Please consult with a doctor when losing 1 kg or more per week since it requires consuming less than the minimum recommendation of 1,500 calories a day.
                    </p>

                    {/* Show weight gain */}
                    <button
                        onClick={() => setShowGain(!showGain)}
                        className="text-[#22c55e] text-sm mb-4 hover:underline"
                    >
                        {showGain ? "Hide" : "Show"} info for weight gain
                    </button>

                    {showGain && (
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center justify-between bg-[#2C2C2E] rounded-xl p-4">
                                <div>
                                    <div className="text-white font-medium">Mild weight gain</div>
                                    <div className="text-[#8E8E93] text-sm">0.25 kg/week</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-blue-400">{results.mildGain.toLocaleString()}</div>
                                    <div className="text-[#8E8E93] text-sm">110% • Calories/day</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between bg-[#2C2C2E] rounded-xl p-4">
                                <div>
                                    <div className="text-white font-medium">Weight gain</div>
                                    <div className="text-[#8E8E93] text-sm">0.5 kg/week</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-blue-400">{results.weightGain.toLocaleString()}</div>
                                    <div className="text-[#8E8E93] text-sm">121% • Calories/day</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Zigzag Diet */}
                    <div className="mt-6">
                        <h3 className="text-xl font-bold text-white mb-3">Zigzag Calorie Cycling</h3>
                        <p className="text-[#8E8E93] text-sm mb-4">
                            Zigzag calorie cycling can help you overcome weight loss plateaus by preventing your body from adapting to a constant calorie deficit.
                        </p>

                        {/* Schedule 1 */}
                        <div className="mb-6">
                            <h4 className="text-white font-medium mb-3">Schedule 1</h4>
                            <div className="bg-[#2C2C2E] rounded-xl overflow-hidden">
                                <div className="grid grid-cols-3 bg-[#38383A] p-3 text-sm font-medium">
                                    <div className="text-[#8E8E93]">Day</div>
                                    <div className="text-[#22c55e] text-center">Mild Loss</div>
                                    <div className="text-[#22c55e] text-center">Weight Loss</div>
                                </div>
                                {getZigzagSchedule1().map((row) => (
                                    <div key={row.day} className="grid grid-cols-3 p-3 border-t border-[#38383A] text-sm">
                                        <div className="text-white">{row.day}</div>
                                        <div className="text-[#c4c4c4] text-center">{row.mildLoss.toLocaleString()} Cal</div>
                                        <div className="text-[#c4c4c4] text-center">{row.weightLoss.toLocaleString()} Cal</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Schedule 2 */}
                        <div>
                            <h4 className="text-white font-medium mb-3">Schedule 2 (Gradual)</h4>
                            <div className="bg-[#2C2C2E] rounded-xl overflow-hidden">
                                <div className="grid grid-cols-3 bg-[#38383A] p-3 text-sm font-medium">
                                    <div className="text-[#8E8E93]">Day</div>
                                    <div className="text-[#22c55e] text-center">Mild Loss</div>
                                    <div className="text-[#22c55e] text-center">Weight Loss</div>
                                </div>
                                {getZigzagSchedule2().map((row) => (
                                    <div key={row.day} className="grid grid-cols-3 p-3 border-t border-[#38383A] text-sm">
                                        <div className="text-white">{row.day}</div>
                                        <div className="text-[#c4c4c4] text-center">{row.mildLoss.toLocaleString()} Cal</div>
                                        <div className="text-[#c4c4c4] text-center">{row.weightLoss.toLocaleString()} Cal</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
