import type { ReactNode } from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/data/blog";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import StickyDownloadBar from "@/components/StickyDownloadBar";
import AppPromoPopup from "@/components/AppPromoPopup";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts
        .filter((post) => post.content.trim().length > 0)
        .map((post) => ({
            slug: post.slug,
        }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post || post.content.trim().length === 0) {
        return { title: "Post Not Found" };
    }

    const semanticKeywordsByCategory: Record<string, string[]> = {
        "Skin Health": ["skin health", "diet and skin", "acne triggers", "added sugar"],
        "Health": ["metabolic health", "blood sugar", "health risks", "nutrition habits"],
        "Health & Science": ["prediabetes", "blood sugar", "insulin resistance", "metabolic health"],
        "Diet Guide": ["healthy eating", "added sugar", "meal planning", "nutrition"],
        "Diet Plans": ["meal planning", "healthy eating", "weight management", "nutrition"],
        "Nutrition": ["nutrition", "sugar intake", "food choices", "healthy eating"],
        "Recipes": ["healthy recipes", "low sugar recipes", "meal ideas", "home cooking"],
        "Lifestyle": ["healthy habits", "daily routine", "wellness", "sugar reduction"],
        "Fitness & Health": ["health goals", "body metrics", "activity", "metabolic health"],
        "Tools": ["health tools", "calculators", "nutrition tools", "wellness support"],
        "App Reviews": ["app review", "health apps", "nutrition apps", "tracking tools"],
    };

    const semanticKeywords = semanticKeywordsByCategory[post.category] ?? [
        "healthy lifestyle",
        "sugar reduction",
        "nutrition",
        "Sukali app",
    ];

    return {
        title: post.title,
        description: post.excerpt.length > 155 ? post.excerpt.slice(0, 152) + '...' : post.excerpt,
        keywords: [post.category, "Sukali", "nutrition", ...semanticKeywords],
        alternates: {
            canonical: `https://www.sugar-frees.com/blog/${slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            images: [post.image],
        },
    };
}

function generateJsonLd(post: any) {
    const canonicalUrl = `https://www.sugar-frees.com/blog/${post.slug}`;
    const imageUrl = post.image.startsWith("http")
        ? post.image
        : `https://www.sugar-frees.com${post.image}`;

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt,
        "image": [imageUrl],
        "author": {
            "@type": "Organization",
            "name": post.author,
        },
        "publisher": {
            "@type": "Organization",
            "name": "Sukali",
            "url": "https://www.sugar-frees.com",
        },
        "datePublished": post.date,
        "dateModified": post.date,
        "mainEntityOfPage": canonicalUrl,
        "articleSection": post.category,
        "inLanguage": "en-US",
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
                "name": "Blog",
                "item": "https://www.sugar-frees.com/blog"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": post.category,
                "item": `https://www.sugar-frees.com/blog?category=${post.category}`
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": post.title,
                "item": canonicalUrl
            }
        ]
    };

    return [articleSchema, breadcrumbSchema];
}

function renderInlineContent(text: string, keyPrefix: string): ReactNode[] {
    const nodes: ReactNode[] = [];
    const tokenRegex = /(\*\*.*?\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let tokenIndex = 0;

    while ((match = tokenRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            nodes.push(text.slice(lastIndex, match.index));
        }

        const token = match[0];

        if (token.startsWith("**") && token.endsWith("**")) {
            nodes.push(
                <span key={`${keyPrefix}-bold-${tokenIndex}`} className="font-semibold text-[#1f241d]">
                    {token.slice(2, -2)}
                </span>
            );
        } else if (match[2] && match[3]) {
            const label = match[2];
            const href = match[3];
            const isInternal = href.startsWith("/");

            nodes.push(
                isInternal ? (
                    <Link
                        key={`${keyPrefix}-link-${tokenIndex}`}
                        href={href}
                        className="font-semibold text-[#5c7f57] underline underline-offset-4"
                    >
                        {label}
                    </Link>
                ) : (
                    <a
                        key={`${keyPrefix}-link-${tokenIndex}`}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#5c7f57] underline underline-offset-4"
                    >
                        {label}
                    </a>
                )
            );
        }

        lastIndex = tokenRegex.lastIndex;
        tokenIndex += 1;
    }

    if (lastIndex < text.length) {
        nodes.push(text.slice(lastIndex));
    }

    return nodes;
}

function parseImageCaption(altText: string) {
    const parts = altText
        .split("|")
        .map((part) => part.trim())
        .filter(Boolean);

    if (parts.length === 0) {
        return { title: "", description: "" };
    }

    if (parts.length === 1) {
        return { title: parts[0], description: "" };
    }

    return {
        title: parts[0],
        description: parts.slice(1).join(" | "),
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post || post.content.trim().length === 0) {
        notFound();
    }

    const allPosts = getAllPosts();
    const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);
    const jsonLd = generateJsonLd(post);
    const usePortraitHero = post.image.includes("quit-sugar-weight-loss-cover");

    return (
        <main className="blog-modern min-h-screen bg-transparent text-[#1f241d]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <SiteHeader />

            <article className="mx-auto max-w-5xl px-4 py-12 md:py-16">
                <div className="mb-6 flex items-center gap-2 text-sm text-[#7b7468]">
                    <Link href="/blog" className="hover:text-[#1f241d]">
                        Journal
                    </Link>
                    <span>/</span>
                    <span>{post.category}</span>
                </div>

                <div className="mb-8 rounded-[28px] border border-[#ddd1c1] bg-[#fffaf2] p-4 shadow-[0_18px_40px_rgba(52,41,22,0.06)] sm:flex sm:items-center sm:justify-between sm:gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#5c7f57] text-sm font-semibold text-[#fffaf2]">
                            S
                        </div>
                        <p className="text-sm leading-7 text-[#5f5a51]">
                            Use the quiz to see if sugar is really affecting your cravings, habits, and progress before you change anything.
                        </p>
                    </div>
                    <Link
                        href={`/quiz?source=article-top&from=/blog/${post.slug}`}
                        className="mt-4 inline-flex rounded-full bg-[#1f241d] px-5 py-2.5 text-sm font-semibold text-[#fffaf2] sm:mt-0"
                    >
                        Take the quiz
                    </Link>
                </div>

                <header className="mb-10 max-w-4xl">
                    <span className="inline-flex rounded-full border border-[#d8ccb9] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#7b7468] shadow-sm">
                        {post.category}
                    </span>
                    <h1
                        className="mt-5 text-4xl leading-tight text-[#1f241d] md:text-6xl"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        {post.title}
                    </h1>
                    <p className="mt-5 text-lg leading-8 text-[#5f5a51]">
                        {post.excerpt}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#7b7468]">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                        <span>•</span>
                        <span>{post.readTime} min read</span>
                    </div>
                </header>

                <div
                    className={`relative mb-12 overflow-hidden rounded-[34px] border border-[#ddd1c1] shadow-[0_20px_50px_rgba(52,41,22,0.12)] ${
                        usePortraitHero
                            ? "mx-auto aspect-[9/16] max-w-xl bg-[#f7f2e8]"
                            : "aspect-[16/9]"
                    }`}
                >
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        priority
                        className={usePortraitHero ? "object-contain p-3" : "object-cover"}
                    />
                </div>

                <div className="rounded-[34px] border border-[#ddd1c1] bg-[#fffaf2] px-6 py-8 shadow-[0_18px_40px_rgba(52,41,22,0.06)] md:px-10">
                    <div className="max-w-none">
                        {post.content.split('\n').map((paragraph, i) => {
                            const imageMatch = paragraph.match(/^!\[(.*?)\]\((.*?)\)$/);
                            if (imageMatch) {
                                const altText = imageMatch[1];
                                const src = imageMatch[2];
                                const { title, description } = parseImageCaption(altText);
                                return (
                                    <div
                                        key={i}
                                        className="mx-auto my-10 max-w-xl overflow-hidden rounded-[30px] border border-[#ddd1c1] bg-white shadow-[0_20px_50px_rgba(52,41,22,0.12)]"
                                    >
                                        <div className="relative h-[560px] bg-[#f7f2e8] sm:h-[680px]">
                                            <Image
                                                src={src}
                                                alt={title || altText}
                                                fill
                                                className="object-contain p-3"
                                            />
                                            {(title || description) && (
                                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1f241d]/92 via-[#1f241d]/74 to-transparent px-5 pb-5 pt-20 text-[#fffaf2]">
                                                    {title && (
                                                        <p className="text-xl font-semibold leading-tight">
                                                            {title}
                                                        </p>
                                                    )}
                                                    {description && (
                                                        <p className="mt-2 text-sm leading-6 text-[#f2e8d8]">
                                                            {description}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            }
                            if (paragraph.startsWith('## ')) {
                                return (
                                    <h2
                                        key={i}
                                        className="mt-12 text-3xl leading-tight text-[#1f241d] first:mt-0"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        {paragraph.replace('## ', '')}
                                    </h2>
                                );
                            }
                            if (paragraph.startsWith('### ')) {
                                return (
                                    <h3
                                        key={i}
                                        className="mt-8 text-2xl leading-tight text-[#1f241d]"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        {paragraph.replace('### ', '')}
                                    </h3>
                                );
                            }
                            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                                return <p key={i} className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#5c7f57]">{paragraph.replace(/\*\*/g, '')}</p>;
                            }
                            if (paragraph.startsWith('- ')) {
                                return (
                                    <li key={i} className="ml-6 mb-3 text-base leading-8 text-[#5f5a51]">
                                        {renderInlineContent(paragraph.replace('- ', ''), `list-${i}`)}
                                    </li>
                                );
                            }
                            if (paragraph.match(/^\d+\. /)) {
                                return (
                                    <li key={i} className="ml-6 mb-3 text-base leading-8 text-[#5f5a51]">
                                        {renderInlineContent(paragraph.replace(/^\d+\. /, ''), `ordered-${i}`)}
                                    </li>
                                );
                            }
                            if (paragraph.trim()) {
                                return (
                                    <p key={i} className="mb-6 text-base leading-8 text-[#5f5a51]">
                                        {renderInlineContent(paragraph, `paragraph-${i}`)}
                                    </p>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>

                <div className="mt-12 rounded-[34px] bg-[#1f241d] px-8 py-8 text-center text-[#fffaf2] shadow-[0_24px_60px_rgba(52,41,22,0.16)]">
                    <h3
                        className="text-3xl"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Conclusion
                    </h3>
                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#d7cec2]">
                        Reducing sugar can help you lose weight faster, feel better, and take back control of your eating habits. But the first step is understanding whether sugar is truly affecting your daily life. If you are wondering whether sugar may be a problem for you, take our quiz to find out. It is a simple way to identify your habits, understand your cravings, and see where you stand before starting your journey toward a healthier lifestyle.
                    </p>
                    <Link
                        href={`/quiz?source=article-bottom&from=/blog/${post.slug}`}
                        className="mt-6 inline-flex rounded-full bg-[#fffaf2] px-8 py-4 text-sm font-semibold text-[#1f241d]"
                    >
                        Take the quiz
                    </Link>
                </div>

                {relatedPosts.length > 0 && (
                    <section className="mt-12">
                        <h3
                            className="mb-6 text-3xl text-[#1f241d]"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Related articles
                        </h3>
                        <div className="grid gap-6 md:grid-cols-2">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost.slug}
                                    href={`/blog/${relatedPost.slug}`}
                                    className="card-hover overflow-hidden rounded-[28px] border border-[#ddd1c1] bg-[#fffaf2] shadow-[0_18px_40px_rgba(52,41,22,0.06)]"
                                >
                                    <div className="relative aspect-[16/9]">
                                        <Image
                                            src={relatedPost.image}
                                            alt={relatedPost.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <h4
                                            className="text-2xl leading-tight text-[#1f241d]"
                                            style={{ fontFamily: "var(--font-display)" }}
                                        >
                                            {relatedPost.title}
                                        </h4>
                                        <span className="mt-3 block text-sm text-[#6f685d]">{relatedPost.readTime} min read</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </article>

            <SiteFooter />
            <StickyDownloadBar />
            <AppPromoPopup />
        </main>
    );
}
