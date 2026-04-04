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

    const semanticKeywords = post.category === "Skin Health"
        ? ['insulin spike', 'sebum production', 'dermatology help', 'acne cure']
        : ['healthy lifestyle', 'no sugar diet', 'skin glowing', 'Sukali app'];

    return {
        title: post.title,
        description: post.excerpt.length > 155 ? post.excerpt.slice(0, 152) + '...' : post.excerpt,
        keywords: [post.category, 'acne-free', 'sugar analysis', ...semanticKeywords],
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
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `How does ${post.title.toLowerCase()} relate to acne?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": post.excerpt
                }
            }
        ]
    };

    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Sukali",
        "operatingSystem": "iOS",
        "applicationCategory": "HealthApplication"
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
                "item": `https://www.sugar-frees.com/blog/${post.slug}`
            }
        ]
    };

    const medicalSchema = post.category === "Skin Health" ? {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "name": post.title,
        "description": post.excerpt,
        "mainEntity": {
            "@type": "MedicalCondition",
            "name": "Acne Vulgaris",
            "associatedAnatomy": { "@type": "AnatomicalStructure", "name": "Skin" }
        }
    } : null;

    return [faqSchema, softwareSchema, breadcrumbSchema, medicalSchema].filter(Boolean);
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
                            Use the app when you want the daily part of this article to become practical.
                        </p>
                    </div>
                    <a
                        href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex rounded-full bg-[#1f241d] px-5 py-2.5 text-sm font-semibold text-[#fffaf2] sm:mt-0"
                    >
                        Download the app
                    </a>
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

                <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-[34px] border border-[#ddd1c1] shadow-[0_20px_50px_rgba(52,41,22,0.12)]">
                    <Image
                        src={post.image}
                        alt={`Educational image for ${post.title} regarding acne and sugar health`}
                        fill
                        priority
                        className="object-cover"
                    />
                </div>

                <div className="rounded-[34px] border border-[#ddd1c1] bg-[#fffaf2] px-6 py-8 shadow-[0_18px_40px_rgba(52,41,22,0.06)] md:px-10">
                    <div className="max-w-none">
                        {post.content.split('\n').map((paragraph, i) => {
                            const imageMatch = paragraph.match(/^!\[(.*?)\]\((.*?)\)$/);
                            if (imageMatch) {
                                const altText = imageMatch[1];
                                const src = imageMatch[2];
                                return (
                                    <div key={i} className="relative my-8 aspect-video overflow-hidden rounded-[24px]">
                                        <Image
                                            src={src}
                                            alt={altText}
                                            fill
                                            className="object-contain"
                                        />
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
                                        {paragraph.replace('- ', '')}
                                    </li>
                                );
                            }
                            if (paragraph.match(/^\d+\. /)) {
                                return (
                                    <li key={i} className="ml-6 mb-3 text-base leading-8 text-[#5f5a51]">
                                        {paragraph.replace(/^\d+\. /, '')}
                                    </li>
                                );
                            }
                            if (paragraph.trim()) {
                                if (paragraph.includes('**')) {
                                    const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                                    return (
                                        <p key={i} className="mb-6 text-base leading-8 text-[#5f5a51]">
                                            {parts.map((part, j) => {
                                                if (part.startsWith('**') && part.endsWith('**')) {
                                                    return <span key={j} className="font-semibold text-[#1f241d]">{part.replace(/\*\*/g, '')}</span>;
                                                }
                                                return part;
                                            })}
                                        </p>
                                    );
                                }
                                return <p key={i} className="mb-6 text-base leading-8 text-[#5f5a51]">{paragraph}</p>;
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
                        Keep this useful after you close the article.
                    </h3>
                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#d7cec2]">
                        Sukali works best when it turns the theory into daily choices: food scans, steadier meals, and visible progress over time.
                    </p>
                    <a
                        href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                        className="mt-6 inline-flex rounded-full bg-[#fffaf2] px-8 py-4 text-sm font-semibold text-[#1f241d]"
                    >
                        Download Sukali
                    </a>
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
