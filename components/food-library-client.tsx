'use client';

import { useMemo, useState } from 'react';
import FoodCard from '@/components/FoodCard';
import type { Recipe } from '@/data';

interface FoodLibraryClientProps {
    recipes: Recipe[];
}

export default function FoodLibraryClient({ recipes }: FoodLibraryClientProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredRecipes = useMemo(() => {
        if (searchQuery.trim() === '') {
            return recipes;
        }

        const normalizedQuery = searchQuery.toLowerCase();

        return recipes.filter((recipe) =>
            recipe.recipe_name.toLowerCase().includes(normalizedQuery) ||
            recipe.ingredients.some((ingredient) =>
                ingredient.toLowerCase().includes(normalizedQuery)
            )
        );
    }, [recipes, searchQuery]);

    return (
        <>
            <div className="rounded-[30px] border border-[#ddd1c1] bg-[#fffaf2] p-6 shadow-[0_18px_40px_rgba(52,41,22,0.06)]">
                <label
                    htmlFor="recipe-search"
                    className="mb-3 block text-sm font-semibold uppercase tracking-[0.18em] text-[#7b7468]"
                >
                    Search the library
                </label>
                <input
                    id="recipe-search"
                    type="text"
                    placeholder="Try avocado, salmon, hummus..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="w-full rounded-2xl border border-[#ddd1c1] bg-white px-4 py-3 text-[#1f241d] placeholder:text-[#9d968a] focus:border-[#5c7f57] focus:outline-none"
                />
                <p className="mt-3 text-sm text-[#6f685d]">
                    {filteredRecipes.length} recipes currently match your filters.
                </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredRecipes.map((recipe) => (
                    <FoodCard key={recipe.slug} recipe={recipe} />
                ))}
            </div>

            {filteredRecipes.length === 0 && (
                <div className="mt-12 rounded-[30px] border border-[#ddd1c1] bg-[#fffaf2] px-6 py-14 text-center shadow-[0_18px_40px_rgba(52,41,22,0.06)]">
                    <h3
                        className="text-3xl text-[#1f241d]"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        No recipe matches that search yet.
                    </h3>
                    <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#5f5a51]">
                        Clear the search or try another ingredient. The library stays broad,
                        but the search stays strict.
                    </p>
                    <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="mt-6 rounded-full bg-[#1f241d] px-5 py-3 text-sm font-semibold text-[#fffaf2]"
                    >
                        Clear search
                    </button>
                </div>
            )}
        </>
    );
}
