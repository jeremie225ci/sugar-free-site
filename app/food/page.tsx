'use client';

import { useState, useMemo } from 'react';
import { getAllRecipes, getCategory, Recipe } from '@/data';
import FoodCard from '@/components/FoodCard';
import StickyDownloadBar from '@/components/StickyDownloadBar';
import Link from 'next/link';

type Category = 'all' | 'breakfast' | 'snack' | 'dinner';

export default function FoodListPage() {
    const [selectedCategory, setSelectedCategory] = useState<Category>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const recipes = getAllRecipes();

    const filteredRecipes = useMemo(() => {
        return recipes.filter((recipe) => {
            const matchesCategory = selectedCategory === 'all' || getCategory(recipe) === selectedCategory;
            const matchesSearch = searchQuery === '' ||
                recipe.recipe_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                recipe.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [recipes, selectedCategory, searchQuery]);

    const categories: { id: Category; label: string; emoji: string }[] = [
        { id: 'all', label: 'All', emoji: '🍽️' },
        { id: 'breakfast', label: 'Breakfast', emoji: '🌅' },
        { id: 'snack', label: 'Snack', emoji: '🥜' },
        { id: 'dinner', label: 'Dinner', emoji: '🍝' },
    ];

    return (
        <main className="min-h-screen bg-black pb-24 md:pb-12">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-[#38383A]">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-[#22c55e] flex items-center justify-center">
                                <span className="text-black font-bold">S</span>
                            </div>
                            <span className="text-xl font-bold text-white">Sugar Free <span className="text-[#22c55e]">AI</span></span>
                        </Link>
                        <a
                            href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                            className="hidden md:block px-4 py-2 border border-[#38383A] text-[#8E8E93] font-medium text-sm rounded-full hover:border-[#22c55e] hover:text-white transition-colors"
                        >
                            📱 Sukali App
                        </a>
                    </div>

                    {/* Search */}
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Search for a recipe..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-3 pl-11 bg-[#1C1C1E] border border-[#38383A] rounded-2xl text-white placeholder:text-[#8E8E93] focus:outline-none focus:border-[#22c55e]"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E8E93]">🔍</span>
                    </div>

                    {/* Category filters */}
                    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`category-chip whitespace-nowrap flex items-center gap-2 ${selectedCategory === cat.id ? 'active' : ''
                                    }`}
                            >
                                <span>{cat.emoji}</span>
                                <span>{cat.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 py-6">
                {/* Title */}
                <div className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        Sugar-Free Recipes
                    </h1>
                    <p className="text-[#8E8E93]">
                        {filteredRecipes.length} recipes analyzed for their sugar content
                    </p>
                </div>

                {/* Recipe grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredRecipes.map((recipe) => (
                        <FoodCard key={recipe.slug} recipe={recipe} />
                    ))}
                </div>

                {filteredRecipes.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-[#8E8E93] text-lg">No recipes found</p>
                        <button
                            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                            className="mt-4 px-4 py-2 bg-[#1C1C1E] text-white rounded-full"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>

            <StickyDownloadBar />
        </main>
    );
}
