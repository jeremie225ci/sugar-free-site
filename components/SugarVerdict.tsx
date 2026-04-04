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
        <div className="rounded-[30px] border border-[#ddd1c1] bg-[#fffaf2] p-6 shadow-[0_18px_40px_rgba(52,41,22,0.06)]">
            <div className="flex items-center justify-between mb-4">
                <h3
                    className="text-2xl text-[#1f241d]"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    Sugar Analysis
                </h3>
                <div
                    className="flex items-center gap-2 rounded-full px-4 py-2 font-semibold"
                    style={{
                        backgroundColor: `${verdict.color}16`,
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
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="rounded-2xl bg-[#f3eadf] p-4 text-center">
                            <div className="text-2xl font-bold text-[#5c7f57]">{totalSugar}g</div>
                            <div className="mt-1 text-xs text-[#6f685d]">Total Sugar</div>
                        </div>
                        <div className="rounded-2xl bg-[#f3eadf] p-4 text-center">
                            <div className="text-2xl font-bold text-[#1f241d]">{recipe.sugar_natural_g}g</div>
                            <div className="mt-1 text-xs text-[#6f685d]">Natural</div>
                        </div>
                        <div className="rounded-2xl bg-[#f3eadf] p-4 text-center">
                            <div className="text-2xl font-bold" style={{ color: recipe.sugar_added_g === 0 ? '#5c7f57' : '#b85c38' }}>
                                {recipe.sugar_added_g}g
                            </div>
                            <div className="mt-1 text-xs text-[#6f685d]">Added</div>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-[#f3eadf] p-4">
                        <p className="text-sm leading-relaxed text-[#5f5a51]">
                            {verdict.level === 'safe' && (
                                <>
                                    <span className="font-medium text-[#5c7f57]">Great choice.</span> This recipe contains minimal sugar
                                    and is unlikely to trigger acne or blood sugar spikes. The natural sugars come from whole food sources.
                                </>
                            )}
                            {verdict.level === 'moderate' && (
                                <>
                                    <span className="font-medium text-[#c97a5a]">Enjoy in moderation.</span> This recipe has moderate sugar
                                    content. Consider pairing with protein or fiber to slow glucose absorption.
                                </>
                            )}
                            {verdict.level === 'high' && (
                                <>
                                    <span className="font-medium text-[#b85c38]">Caution advised.</span> High sugar content may
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
