import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllRecipes, getRecipeBySlug, getImagePath, getCategory, getSugarVerdict, getTotalSugar, getGlycemicIndex, Recipe } from '@/data';
import SugarVerdict from '@/components/SugarVerdict';
import StickyDownloadBar from '@/components/StickyDownloadBar';

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Generate static params for all recipes
export async function generateStaticParams() {
    const recipes = getAllRecipes();
    return recipes.map((recipe) => ({
        slug: recipe.slug,
    }));
}

// Generate metadata for SEO (Point 2 & 3)
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

    // Point 3: Semantic Entity Injection logic
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

// JSON-LD Schema (Point 4)
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
                        ? `Yes! ${recipe.recipe_name} contains 0g of added sugar and only ${recipe.sugar_natural_g}g of natural sugars, making it an excellent choice for a sugar-free diet.`
                        : `${recipe.recipe_name} contains ${recipe.sugar_added_g}g of added sugar. ${verdict.level === 'safe' ? 'It can be part of a balanced diet.' : 'Consider reducing portion sizes or finding alternatives.'}`
                }
            },
            {
                "@type": "Question",
                "name": `Does ${recipe.recipe_name} cause acne?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": verdict.level === 'safe'
                        ? `${recipe.recipe_name} is unlikely to cause acne. With only ${totalSugar}g of total sugar and ${recipe.sugar_added_g}g added sugar, it's a skin-friendly choice.`
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
        "image": getImagePath(recipe.image_id),
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

    // Get related recipes
    const allRecipes = getAllRecipes();
    const relatedRecipes = allRecipes
        .filter(r => r.slug !== recipe.slug && getCategory(r) === category)
        .slice(0, 3);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <main className="min-h-screen bg-black pb-24 md:pb-12">
                {/* Header */}
                <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-[#38383A]">
                    <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                        <Link
                            href="/food"
                            className="w-10 h-10 rounded-full bg-[#1C1C1E] flex items-center justify-center"
                        >
                            <span className="text-white">←</span>
                        </Link>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-semibold truncate">{recipe.recipe_name}</p>
                            <p className="text-[#8E8E93] text-sm">{category} • {recipe.diet_type}</p>
                        </div>
                    </div>
                </header>

                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-2 text-sm text-[#8E8E93]">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/food" className="hover:text-white transition-colors">Foods</Link>
                    <span>/</span>
                    <span className="text-white truncate">{category}</span>
                    <span>/</span>
                    <span className="text-white truncate">{recipe.recipe_name}</span>
                </div>

                <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
                    {/* Hero Image (Point 7) */}
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                        <Image
                            src={imagePath}
                            alt={`Photo of ${recipe.recipe_name} showing sugar content for acne analysis`}
                            fill
                            priority
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                            <span
                                className="inline-block px-3 py-1.5 rounded-full text-sm font-bold mb-2"
                                style={{ backgroundColor: verdict.color, color: '#000' }}
                            >
                                {verdict.message}
                            </span>
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Does {recipe.recipe_name} cause acne? Sugar Analysis
                        </h1>
                        <p className="text-[#8E8E93]">
                            {recipe.origin} • {recipe.total_time} min • {recipe.servings} servings
                        </p>
                    </div>

                    {/* Sugar Verdict */}
                    <SugarVerdict recipe={recipe} />

                    {/* Ingredients */}
                    <section className="bg-[#1C1C1E] rounded-3xl border border-[#38383A] p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">🥗 Ingredients</h2>
                        <ul className="space-y-3">
                            {recipe.ingredients.map((ingredient, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-md border border-[#38383A] flex-shrink-0 mt-0.5" />
                                    <span className="text-white">{ingredient}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Directions */}
                    <section className="bg-[#1C1C1E] rounded-3xl border border-[#38383A] p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">👨‍🍳 Directions</h2>
                        <ol className="space-y-4">
                            {recipe.directions.map((step, i) => (
                                <li key={i} className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[#22c55e] text-black font-bold text-sm flex items-center justify-center flex-shrink-0">
                                        {i + 1}
                                    </div>
                                    <p className="text-white flex-1 pt-1">{step.replace(/^\d️⃣\s*/, '')}</p>
                                </li>
                            ))}
                        </ol>
                    </section>

                    {/* Related Recipes */}
                    {relatedRecipes.length > 0 && (
                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">More {category} recipes</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {relatedRecipes.map((r) => (
                                    <Link
                                        key={r.slug}
                                        href={`/food/${r.slug}`}
                                        className="bg-[#1C1C1E] rounded-2xl overflow-hidden border border-[#38383A]"
                                    >
                                        <div className="relative aspect-square">
                                            <Image
                                                src={getImagePath(r.image_id)}
                                                alt={r.recipe_name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-3">
                                            <p className="text-white text-sm font-medium line-clamp-2">{r.recipe_name}</p>
                                            <p className="text-[#22c55e] text-xs mt-1">{getTotalSugar(r)}g sugar</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-[#22c55e]/20 to-[#22c55e]/5 rounded-3xl border border-[#22c55e]/30 p-6 text-center">
                        <h3 className="text-xl font-bold text-white mb-2">Get personalized recipes</h3>
                        <p className="text-[#8E8E93] mb-4">
                            Download Sukali for AI-powered meal planning and acne analysis
                        </p>
                        <a
                            href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                            className="inline-block glow-button px-6 py-3 bg-[#22c55e] text-black font-bold rounded-full"
                        >
                            Download Free
                        </a>
                    </div>
                </div>

                <StickyDownloadBar />
            </main>
        </>
    );
}
