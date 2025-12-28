'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Recipe, getImagePath, getCategory, getSugarVerdict, getTotalSugar } from '@/data';

interface FoodCardProps {
    recipe: Recipe;
}

export default function FoodCard({ recipe }: FoodCardProps) {
    const imagePath = getImagePath(recipe.image_id);
    const category = getCategory(recipe);
    const verdict = getSugarVerdict(recipe);
    const totalSugar = getTotalSugar(recipe);

    const categoryEmoji = {
        breakfast: '🌅',
        snack: '🥜',
        dinner: '🍽️'
    }[category];

    return (
        <Link href={`/food/${recipe.slug}`}>
            <article className="group bg-[#1C1C1E] rounded-3xl border border-[#38383A] overflow-hidden card-hover">
                {/* Image container */}
                <div className="relative aspect-square overflow-hidden">
                    <Image
                        src={imagePath}
                        alt={recipe.recipe_name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                            // Fallback to placeholder
                            (e.target as HTMLImageElement).src = '/placeholder.jpg';
                        }}
                    />

                    {/* Sugar verdict badge */}
                    <div
                        className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md"
                        style={{
                            backgroundColor: `${verdict.color}20`,
                            color: verdict.color,
                            border: `1px solid ${verdict.color}40`
                        }}
                    >
                        {totalSugar}g sugar
                    </div>

                    {/* Category badge */}
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium bg-black/60 backdrop-blur-md text-white">
                        {categoryEmoji} {category}
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    <h3 className="font-semibold text-white text-base leading-tight mb-2 line-clamp-2">
                        {recipe.recipe_name}
                    </h3>

                    <div className="flex items-center gap-3 text-sm text-[#8E8E93]">
                        <span className="flex items-center gap-1">
                            <span>⏱️</span>
                            <span>{recipe.total_time} min</span>
                        </span>
                        <span className="flex items-center gap-1">
                            <span>⭐</span>
                            <span>{recipe.rating}</span>
                        </span>
                    </div>

                    {/* Diet type tag */}
                    <div className="mt-3 flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-xs bg-[#2C2C2E] text-[#8E8E93] capitalize">
                            {recipe.diet_type}
                        </span>
                        {recipe.sugar_added_g === 0 && (
                            <span className="px-2 py-0.5 rounded-full text-xs bg-[#22c55e]/15 text-[#22c55e]">
                                No added sugar
                            </span>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    );
}
