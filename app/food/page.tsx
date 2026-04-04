'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getAllRecipes, getCategory } from '@/data';
import FoodCard from '@/components/FoodCard';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import StickyDownloadBar from '@/components/StickyDownloadBar';

type Category = 'all' | 'breakfast' | 'snack' | 'dinner';

function FoodListContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category') as Category;

    const [selectedCategory, setSelectedCategory] = useState<Category>('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (categoryParam && ['breakfast', 'snack', 'dinner'].includes(categoryParam)) {
            setSelectedCategory(categoryParam);
        }
    }, [categoryParam]);

    const recipes = getAllRecipes();

    const filteredRecipes = useMemo(() => {
        return recipes.filter((recipe) => {
            const matchesCategory = selectedCategory === 'all' || getCategory(recipe) === selectedCategory;
            const matchesSearch =
                searchQuery === '' ||
                recipe.recipe_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                recipe.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [recipes, selectedCategory, searchQuery]);

    const categories: { id: Category; label: string }[] = [
        { id: 'all', label: 'All recipes' },
        { id: 'breakfast', label: 'Breakfast' },
        { id: 'snack', label: 'Snacks' },
        { id: 'dinner', label: 'Dinner' },
    ];

    return (
        <main className="min-h-screen bg-transparent pb-24 text-[#1f241d] md:pb-12">
            <SiteHeader />

            <section className="border-b border-[#e2d7ca] pb-10 pt-14 md:pb-14 md:pt-18">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
                        <div className="max-w-2xl">
                            <span className="inline-flex rounded-full border border-[#d8ccb9] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#7b7468] shadow-sm">
                                Recipes
                            </span>
                            <h1
                                className="mt-5 text-4xl leading-tight text-[#1f241d] md:text-5xl"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                A recipe library that finally feels connected to the rest of the site.
                            </h1>
                            <p className="mt-4 text-lg leading-8 text-[#5f5a51]">
                                Search by ingredient, filter by moment of day, and keep the sugar-free part practical instead of chaotic.
                            </p>
                        </div>

                        <div className="rounded-[30px] border border-[#ddd1c1] bg-[#fffaf2] p-6 shadow-[0_18px_40px_rgba(52,41,22,0.06)]">
                            <label htmlFor="recipe-search" className="mb-3 block text-sm font-semibold uppercase tracking-[0.18em] text-[#7b7468]">
                                Search the library
                            </label>
                            <input
                                id="recipe-search"
                                type="text"
                                placeholder="Try avocado, salmon, hummus..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-2xl border border-[#ddd1c1] bg-white px-4 py-3 text-[#1f241d] placeholder:text-[#9d968a] focus:border-[#5c7f57] focus:outline-none"
                            />
                            <p className="mt-3 text-sm text-[#6f685d]">
                                {filteredRecipes.length} recipes currently match your filters.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-10 md:py-14">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="mb-8 flex flex-wrap gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`category-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <div className="mb-8 flex items-center justify-between gap-4">
                        <div>
                            <h2
                                className="text-3xl text-[#1f241d]"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                {selectedCategory === 'all' ? 'All recipes' : `${selectedCategory.charAt(0).toUpperCase()}${selectedCategory.slice(1)} recipes`}
                            </h2>
                            <p className="mt-2 text-sm text-[#6f685d]">
                                Built for people trying to eat better without overcomplicating every meal.
                            </p>
                        </div>
                        <Link
                            href="/download"
                            className="hidden rounded-full border border-[#d3c7b8] bg-white px-5 py-3 text-sm font-semibold text-[#1f241d] hover:border-[#5c7f57] hover:text-[#5c7f57] md:inline-flex"
                        >
                            Get the app
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                                Clear the filters or try another ingredient. The recipe library is broad, but the search stays strict.
                            </p>
                            <button
                                onClick={() => {
                                    setSelectedCategory('all');
                                    setSearchQuery('');
                                }}
                                className="mt-6 rounded-full bg-[#1f241d] px-5 py-3 text-sm font-semibold text-[#fffaf2]"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <SiteFooter />
            <StickyDownloadBar />
        </main>
    );
}

export default function FoodListPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-transparent" />}>
            <FoodListContent />
        </Suspense>
    );
}
