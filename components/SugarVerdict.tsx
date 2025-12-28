'use client';

import { Recipe, getSugarVerdict, getTotalSugar } from '@/data';

interface SugarVerdictProps {
    recipe: Recipe;
    showDetails?: boolean;
}

export default function SugarVerdict({ recipe, showDetails = true }: SugarVerdictProps) {
    const verdict = getSugarVerdict(recipe);
    const totalSugar = getTotalSugar(recipe);

    return (
        <div className="bg-[#1C1C1E] rounded-3xl border border-[#38383A] p-6">
            {/* Main verdict */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Sugar Analysis</h3>
                <div
                    className="flex items-center gap-2 px-4 py-2 rounded-full font-bold"
                    style={{
                        backgroundColor: `${verdict.color}15`,
                        color: verdict.color
                    }}
                >
                    {verdict.level === 'safe' && '✓'}
                    {verdict.level === 'moderate' && '⚠️'}
                    {verdict.level === 'high' && '⚠️'}
                    <span>{verdict.message}</span>
                </div>
            </div>

            {showDetails && (
                <>
                    {/* Sugar breakdown */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-[#2C2C2E] rounded-2xl">
                            <div className="text-2xl font-bold text-[#22c55e]">{totalSugar}g</div>
                            <div className="text-xs text-[#8E8E93] mt-1">Total Sugar</div>
                        </div>
                        <div className="text-center p-4 bg-[#2C2C2E] rounded-2xl">
                            <div className="text-2xl font-bold text-white">{recipe.sugar_natural_g}g</div>
                            <div className="text-xs text-[#8E8E93] mt-1">Natural 🍎</div>
                        </div>
                        <div className="text-center p-4 bg-[#2C2C2E] rounded-2xl">
                            <div className="text-2xl font-bold" style={{ color: recipe.sugar_added_g === 0 ? '#22c55e' : '#ef4444' }}>
                                {recipe.sugar_added_g}g
                            </div>
                            <div className="text-xs text-[#8E8E93] mt-1">Added 🍬</div>
                        </div>
                    </div>

                    {/* Explanation */}
                    <div className="p-4 bg-[#2C2C2E] rounded-2xl">
                        <p className="text-sm text-[#8E8E93] leading-relaxed">
                            {verdict.level === 'safe' && (
                                <>
                                    <span className="text-[#22c55e] font-medium">Great choice!</span> This recipe contains minimal sugar
                                    and is unlikely to trigger acne or blood sugar spikes. The natural sugars come from whole food sources.
                                </>
                            )}
                            {verdict.level === 'moderate' && (
                                <>
                                    <span className="text-[#f59e0b] font-medium">Enjoy in moderation.</span> This recipe has moderate sugar
                                    content. Consider pairing with protein or fiber to slow glucose absorption.
                                </>
                            )}
                            {verdict.level === 'high' && (
                                <>
                                    <span className="text-[#ef4444] font-medium">Caution advised.</span> High sugar content may
                                    contribute to inflammation and acne. Consider reducing portion size or finding alternatives.
                                </>
                            )}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}
