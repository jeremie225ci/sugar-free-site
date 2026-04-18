import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllRecipes, getCategory } from '@/data';
import FoodLibraryClient from '@/components/food-library-client';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import StickyDownloadBar from '@/components/StickyDownloadBar';

type Category = 'all' | 'breakfast' | 'snack' | 'dinner';

const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'All recipes' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'snack', label: 'Snacks' },
    { id: 'dinner', label: 'Dinner' },
];

function normalizeCategory(value?: string): Category {
    if (value === 'breakfast' || value === 'snack' || value === 'dinner') {
        return value;
    }

    return 'all';
}

function getCategoryHref(category: Category) {
    return category === 'all' ? '/food' : `/food?category=${category}`;
}

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>;
}): Promise<Metadata> {
    const params = await searchParams;
    const selectedCategory = normalizeCategory(params.category);

    return {
        title:
            selectedCategory === 'all'
                ? 'Sugar-Free Recipes Library | Sukali'
                : `${selectedCategory.charAt(0).toUpperCase()}${selectedCategory.slice(1)} Recipes | Sukali`,
        description:
            'Browse practical sugar-free recipes, search by ingredient, and keep daily meals simple without losing momentum.',
        alternates: {
            canonical: 'https://www.sugar-frees.com/food',
        },
        robots:
            selectedCategory === 'all'
                ? { index: true, follow: true }
                : { index: false, follow: true },
    };
}

export default async function FoodListPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>;
}) {
    const params = await searchParams;
    const selectedCategory = normalizeCategory(params.category);
    const recipes = getAllRecipes();
    const filteredRecipes =
        selectedCategory === 'all'
            ? recipes
            : recipes.filter((recipe) => getCategory(recipe) === selectedCategory);

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
                                Search by ingredient, browse by moment of day, and keep the
                                sugar-free part practical instead of chaotic.
                            </p>
                        </div>

                        <div className="rounded-[30px] border border-[#ddd1c1] bg-[#fffaf2] p-6 shadow-[0_18px_40px_rgba(52,41,22,0.06)]">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7b7468]">
                                Browse by category
                            </p>
                            <div className="mt-4 flex flex-wrap gap-3">
                                {categories.map((category) => {
                                    const isActive = selectedCategory === category.id;

                                    return (
                                        <Link
                                            key={category.id}
                                            href={getCategoryHref(category.id)}
                                            className={`category-chip ${isActive ? 'active' : ''}`}
                                            aria-current={isActive ? 'page' : undefined}
                                        >
                                            {category.label}
                                        </Link>
                                    );
                                })}
                            </div>
                            <p className="mt-4 text-sm text-[#6f685d]">
                                {filteredRecipes.length} recipes currently match this section.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-10 md:py-14">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="mb-8 flex items-center justify-between gap-4">
                        <div>
                            <h2
                                className="text-3xl text-[#1f241d]"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                {selectedCategory === 'all'
                                    ? 'All recipes'
                                    : `${selectedCategory.charAt(0).toUpperCase()}${selectedCategory.slice(1)} recipes`}
                            </h2>
                            <p className="mt-2 text-sm text-[#6f685d]">
                                Built for people trying to eat better without overcomplicating
                                every meal.
                            </p>
                        </div>
                        <Link
                            href="/download"
                            className="hidden rounded-full border border-[#d3c7b8] bg-white px-5 py-3 text-sm font-semibold text-[#1f241d] hover:border-[#5c7f57] hover:text-[#5c7f57] md:inline-flex"
                        >
                            Get the app
                        </Link>
                    </div>

                    <FoodLibraryClient recipes={filteredRecipes} />
                </div>
            </section>

            <SiteFooter />
            <StickyDownloadBar />
        </main>
    );
}
