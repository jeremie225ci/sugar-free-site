import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    getAllRecipes,
    getRecipeBySlug,
    getImagePath,
    getCategory,
    getSugarVerdict,
    getTotalSugar,
    getGlycemicIndex,
    Recipe
} from '@/data';
import SugarVerdict from '@/components/SugarVerdict';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import StickyDownloadBar from '@/components/StickyDownloadBar';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const recipes = getAllRecipes();
    return recipes.map((recipe) => ({
        slug: recipe.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const recipe = getRecipeBySlug(slug);

    if (!recipe) {
        return { title: 'Recipe Not Found' };
    }

    const verdict = getSugarVerdict(recipe);
    const totalSugar = getTotalSugar(recipe);
    const glycemicIndex = getGlycemicIndex(recipe);
    const foodName = recipe.recipe_name;

    const semanticKeywords = totalSugar > 10
        ? ['insulin spike', 'sebum production', 'inflammation trigger', 'hormonal acne']
        : ['skin-safe', 'low glycemic', 'clear skin diet', 'anti-inflammatory'];

    return {
        title: `${foodName}: Sugar & Acne Analysis`,
        description: `Is ${foodName} safe for acne? GI: ${glycemicIndex}, Sugar: ${totalSugar}g. ${verdict.message}`,
        keywords: [
            `${foodName} acne`,
            `${foodName} glycemic index`,
            `does ${foodName} clog pores`,
            `sugar in ${foodName}`,
            'skincare diet',
            ...semanticKeywords
        ],
        alternates: {
            canonical: `https://www.sugar-frees.com/food/${slug}`,
        },
        openGraph: {
            title: `Does ${foodName} Cause Acne? Dermatologist Verdict`,
            description: `Glycemic index: ${glycemicIndex} | Total sugar: ${totalSugar}g. ${verdict.message}`,
            type: 'article',
            url: `https://www.sugar-frees.com/food/${slug}`,
            images: [
                {
                    url: `https://www.sugar-frees.com${getImagePath(recipe.image_id)}`,
                    width: 1200,
                    height: 630,
                    alt: `Analysis of ${foodName} for acne triggers`,
                }
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `Does ${foodName} Cause Acne?`,
            description: verdict.message,
            images: [`https://www.sugar-frees.com${getImagePath(recipe.image_id)}`],
        }
    };
}

function generateJsonLd(recipe: Recipe) {
    const verdict = getSugarVerdict(recipe);
    const totalSugar = getTotalSugar(recipe);
    const category = getCategory(recipe);

    const medicalSchema = {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "name": `Sugar Analysis: ${recipe.recipe_name}`,
        "description": `Clinical overview of sugar content in ${recipe.recipe_name} and its impact on acne.`,
        "mainEntity": {
            "@type": "MedicalCondition",
            "name": "Acne Vulgaris",
            "associatedAnatomy": { "@type": "AnatomicalStructure", "name": "Skin" }
        },
        "reviewedBy": {
            "@type": "Organization",
            "name": "Sukali Health Lab"
        }
    };

    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Sukali",
        "operatingSystem": "iOS",
        "applicationCategory": "HealthApplication",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "1250"
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.sugar-frees.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Foods",
                "item": "https://www.sugar-frees.com/food"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": category,
                "item": `https://www.sugar-frees.com/food?category=${category}`
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": recipe.recipe_name,
                "item": `https://www.sugar-frees.com/food/${recipe.slug}`
            }
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `Is ${recipe.recipe_name} good for a sugar-free diet?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": recipe.sugar_added_g === 0
                        ? `Yes. ${recipe.recipe_name} contains 0g of added sugar and only ${recipe.sugar_natural_g}g of natural sugars.`
                        : `${recipe.recipe_name} contains ${recipe.sugar_added_g}g of added sugar. ${verdict.level === 'safe' ? 'It can still fit into a balanced approach.' : 'Consider reducing portion sizes or finding alternatives.'}`
                }
            },
            {
                "@type": "Question",
                "name": `Does ${recipe.recipe_name} cause acne?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": verdict.level === 'safe'
                        ? `${recipe.recipe_name} is unlikely to cause acne. With only ${totalSugar}g of total sugar and ${recipe.sugar_added_g}g added sugar, it is a skin-friendly choice.`
                        : `${recipe.recipe_name} may contribute to acne due to its sugar content (${totalSugar}g total). High-sugar foods can trigger inflammation and breakouts.`
                }
            }
        ]
    };

    const recipeSchema = {
        "@context": "https://schema.org",
        "@type": "Recipe",
        "name": recipe.recipe_name,
        "description": `${recipe.recipe_name} - A ${recipe.diet_type} recipe with ${totalSugar}g sugar. ${verdict.message}`,
        "image": `https://www.sugar-frees.com${getImagePath(recipe.image_id)}`,
        "prepTime": `PT${recipe.prep_time}M`,
        "cookTime": `PT${recipe.cook_time}M`,
        "totalTime": `PT${recipe.total_time}M`,
        "recipeYield": recipe.yield,
        "recipeCategory": category,
        "recipeCuisine": recipe.origin.split('/')[0].trim(),
        "nutrition": {
            "@type": "NutritionInformation",
            "sugarContent": `${totalSugar}g`
        },
        "recipeIngredient": recipe.ingredients,
        "recipeInstructions": recipe.directions.map((step, i) => ({
            "@type": "HowToStep",
            "position": i + 1,
            "text": step.replace(/^\d️⃣\s*/, '')
        }))
    };

    return [medicalSchema, softwareSchema, breadcrumbSchema, faqSchema, recipeSchema];
}

export default async function FoodPage({ params }: PageProps) {
    const { slug } = await params;
    const recipe = getRecipeBySlug(slug);

    if (!recipe) {
        notFound();
    }

    const imagePath = getImagePath(recipe.image_id);
    const category = getCategory(recipe);
    const verdict = getSugarVerdict(recipe);
    const totalSugar = getTotalSugar(recipe);
    const jsonLd = generateJsonLd(recipe);

    const allRecipes = getAllRecipes();
    const relatedRecipes = allRecipes
        .filter((r) => r.slug !== recipe.slug && getCategory(r) === category)
        .slice(0, 3);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <main className="min-h-screen bg-transparent pb-24 text-[#1f241d] md:pb-12">
                <SiteHeader />

                <div className="mx-auto max-w-6xl px-4 pb-12 pt-10 md:pt-14">
                    <div className="mb-8 flex items-center gap-2 text-sm text-[#7b7468]">
                        <Link href="/" className="hover:text-[#1f241d] transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/food" className="hover:text-[#1f241d] transition-colors">Recipes</Link>
                        <span>/</span>
                        <Link href={`/food?category=${category}`} className="capitalize hover:text-[#1f241d] transition-colors">{category}</Link>
                    </div>

                    <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                        <div className="space-y-6">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-[34px] border border-[#ddd1c1] shadow-[0_20px_50px_rgba(52,41,22,0.12)]">
                                <Image
                                    src={imagePath}
                                    alt={`Photo of ${recipe.recipe_name} showing sugar content for acne analysis`}
                                    fill
                                    priority
                                    className="object-cover"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1f241d]/75 to-transparent p-5">
                                    <span
                                        className="inline-flex rounded-full px-3 py-1.5 text-sm font-semibold"
                                        style={{ backgroundColor: `${verdict.color}26`, color: '#fffaf2' }}
                                    >
                                        {verdict.message}
                                    </span>
                                </div>
                            </div>

                            <SugarVerdict recipe={recipe} />
                        </div>

                        <div>
                            <span className="inline-flex rounded-full border border-[#d8ccb9] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#7b7468] shadow-sm">
                                {category}
                            </span>
                            <h1
                                className="mt-5 text-4xl leading-tight text-[#1f241d] md:text-5xl"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                {recipe.recipe_name}
                            </h1>
                            <p className="mt-4 text-lg leading-8 text-[#5f5a51]">
                                A calmer look at this recipe: how much sugar it contains, how it fits into a skin-conscious routine, and whether it belongs in a more stable sugar-free week.
                            </p>

                            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                                <div className="rounded-2xl border border-[#ddd1c1] bg-[#fffaf2] p-4 text-center">
                                    <div className="text-2xl font-semibold text-[#1f241d]">{recipe.total_time}m</div>
                                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[#7b7468]">Total time</div>
                                </div>
                                <div className="rounded-2xl border border-[#ddd1c1] bg-[#fffaf2] p-4 text-center">
                                    <div className="text-2xl font-semibold text-[#1f241d]">{recipe.rating}</div>
                                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[#7b7468]">Rating</div>
                                </div>
                                <div className="rounded-2xl border border-[#ddd1c1] bg-[#fffaf2] p-4 text-center">
                                    <div className="text-2xl font-semibold text-[#1f241d]">{recipe.servings}</div>
                                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[#7b7468]">Servings</div>
                                </div>
                                <div className="rounded-2xl border border-[#ddd1c1] bg-[#fffaf2] p-4 text-center">
                                    <div className="text-2xl font-semibold text-[#1f241d]">{totalSugar}g</div>
                                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[#7b7468]">Sugar</div>
                                </div>
                            </div>

                            <div className="mt-8 rounded-[30px] border border-[#ddd1c1] bg-[#fffaf2] p-6 shadow-[0_18px_40px_rgba(52,41,22,0.06)]">
                                <h2
                                    className="text-2xl text-[#1f241d]"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    What to know
                                </h2>
                                <div className="mt-5 space-y-3 text-sm leading-7 text-[#5f5a51]">
                                    <p><span className="font-semibold text-[#1f241d]">Origin:</span> {recipe.origin}</p>
                                    <p><span className="font-semibold text-[#1f241d]">Diet type:</span> {recipe.diet_type}</p>
                                    <p><span className="font-semibold text-[#1f241d]">Yield:</span> {recipe.yield}</p>
                                    <p><span className="font-semibold text-[#1f241d]">Added sugar:</span> {recipe.sugar_added_g}g</p>
                                    <p><span className="font-semibold text-[#1f241d]">Natural sugar:</span> {recipe.sugar_natural_g}g</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                        <section className="rounded-[30px] border border-[#ddd1c1] bg-[#fffaf2] p-6 shadow-[0_18px_40px_rgba(52,41,22,0.06)]">
                            <h2
                                className="text-2xl text-[#1f241d]"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                Ingredients
                            </h2>
                            <ul className="mt-5 space-y-3">
                                {recipe.ingredients.map((ingredient, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#5c7f57]" />
                                        <span className="text-sm leading-7 text-[#4f4a41]">{ingredient}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="rounded-[30px] border border-[#ddd1c1] bg-[#fffaf2] p-6 shadow-[0_18px_40px_rgba(52,41,22,0.06)]">
                            <h2
                                className="text-2xl text-[#1f241d]"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                Directions
                            </h2>
                            <ol className="mt-5 space-y-4">
                                {recipe.directions.map((step, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#5c7f57] text-sm font-semibold text-[#fffaf2]">
                                            {i + 1}
                                        </div>
                                        <p className="pt-1 text-sm leading-7 text-[#4f4a41]">
                                            {step.replace(/^\d️⃣\s*/, '')}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </section>
                    </div>

                    {relatedRecipes.length > 0 && (
                        <section className="mt-12">
                            <div className="mb-6 flex items-end justify-between gap-4">
                                <div>
                                    <h2
                                        className="text-3xl text-[#1f241d]"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        More {category} recipes
                                    </h2>
                                    <p className="mt-2 text-sm text-[#6f685d]">
                                        Keep browsing without dropping out of the site shell.
                                    </p>
                                </div>
                                <Link
                                    href={`/food?category=${category}`}
                                    className="hidden rounded-full border border-[#d3c7b8] bg-white px-5 py-3 text-sm font-semibold text-[#1f241d] hover:border-[#5c7f57] hover:text-[#5c7f57] md:inline-flex"
                                >
                                    View all
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                {relatedRecipes.map((r) => (
                                    <Link
                                        key={r.slug}
                                        href={`/food/${r.slug}`}
                                        className="card-hover overflow-hidden rounded-[28px] border border-[#ddd1c1] bg-[#fffaf2] shadow-[0_18px_40px_rgba(52,41,22,0.06)]"
                                    >
                                        <div className="relative aspect-square">
                                            <Image
                                                src={getImagePath(r.image_id)}
                                                alt={r.recipe_name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <p
                                                className="text-xl leading-snug text-[#1f241d]"
                                                style={{ fontFamily: "var(--font-display)" }}
                                            >
                                                {r.recipe_name}
                                            </p>
                                            <p className="mt-2 text-sm text-[#5f5a51]">{getTotalSugar(r)}g sugar</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="mt-12 rounded-[34px] bg-[#1f241d] px-8 py-8 text-center text-[#fffaf2] shadow-[0_24px_60px_rgba(52,41,22,0.16)]">
                        <h3
                            className="text-3xl"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Want help beyond the recipe list?
                        </h3>
                        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#d7cec2]">
                            Use Sukali when you want food scans, day-zero tracking, and a more visible sense of progress from one meal to the next.
                        </p>
                        <a
                            href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                            className="glow-button mt-6 inline-flex rounded-full bg-[#fffaf2] px-6 py-3 text-sm font-semibold text-[#1f241d]"
                        >
                            Download the app
                        </a>
                    </div>
                </div>

                <SiteFooter />
                <StickyDownloadBar />
            </main>
        </>
    );
}
