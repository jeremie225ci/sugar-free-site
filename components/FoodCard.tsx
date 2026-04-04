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
            <article className="card-hover group overflow-hidden rounded-[30px] border border-[#ddd1c1] bg-[#fffaf2] shadow-[0_18px_40px_rgba(52,41,22,0.06)]">
                <div className="relative aspect-square overflow-hidden">
                    <Image
                        src={imagePath}
                        alt={recipe.recipe_name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.jpg';
                        }}
                    />

                    <div
                        className="absolute right-3 top-3 rounded-full border px-2.5 py-1 text-xs font-semibold backdrop-blur-md"
                        style={{
                            backgroundColor: `${verdict.color}18`,
                            color: verdict.color,
                            borderColor: `${verdict.color}28`
                        }}
                    >
                        {totalSugar}g sugar
                    </div>

                    <div className="absolute bottom-3 left-3 rounded-full bg-[#fffaf2]/90 px-2.5 py-1 text-xs font-medium text-[#4f4a41] backdrop-blur-md">
                        {categoryEmoji} {category}
                    </div>
                </div>

                <div className="p-4">
                    <h3
                        className="mb-2 line-clamp-2 text-xl leading-tight text-[#1f241d] group-hover:text-[#5c7f57]"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        {recipe.recipe_name}
                    </h3>

                    <div className="flex items-center gap-3 text-sm text-[#6f685d]">
                        <span className="flex items-center gap-1">
                            <span>⏱️</span>
                            <span>{recipe.total_time} min</span>
                        </span>
                        <span className="flex items-center gap-1">
                            <span>⭐</span>
                            <span>{recipe.rating}</span>
                        </span>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                        <span className="rounded-full bg-[#efe5d7] px-2.5 py-1 text-xs capitalize text-[#5f5a51]">
                            {recipe.diet_type}
                        </span>
                        {recipe.sugar_added_g === 0 && (
                            <span className="rounded-full bg-[#dce9d7] px-2.5 py-1 text-xs text-[#5c7f57]">
                                No added sugar
                            </span>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    );
}
