import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/data/blog";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import StickyDownloadBar from "@/components/StickyDownloadBar";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return { title: "Post Not Found" };
    }

    // Point 3: Semantic Injection
    const semanticKeywords = post.category === "Skin Health"
        ? ['insulin spike', 'sebum production', 'dermatology help', 'acne cure']
        : ['healthy lifestyle', 'no sugar diet', 'skin glowing', 'Sukali app'];

    return {
        title: `${post.title} | Dermatologist Approved Advice`,
        description: `${post.excerpt} ${semanticKeywords.join(', ')}.`,
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

// JSON-LD Schema (Point 4 & 5)
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

    if (!post) {
        notFound();
    }

    const allPosts = getAllPosts();
    const relatedPosts = allPosts.filter(p => p.slug !== post.slug).slice(0, 2);
    const jsonLd = generateJsonLd(post);

    return (
        <main className="min-h-screen bg-black">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <SiteHeader />

            <article className="max-w-4xl mx-auto px-4 py-12">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm mb-8">
                    <Link href="/blog" className="text-[#8E8E93] hover:text-white">
                        Blog
                    </Link>
                    <span className="text-[#8E8E93]">/</span>
                    <span className="text-[#22c55e]">{post.category}</span>
                </div>

                {/* Header */}
                <header className="mb-8">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#22c55e]/15 text-[#22c55e] text-sm font-medium mb-4">
                        {post.category}
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        {post.title}
                    </h1>
                    <p className="text-xl text-[#8E8E93] mb-6">
                        {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-[#8E8E93]">
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

                {/* Featured Image */}
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl">
                    <Image
                        src={post.image}
                        alt={`Educational image for ${post.title} regarding acne and sugar health`} // Point 7: Alt Text
                        fill
                        priority
                        className="object-cover"
                    />
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none mb-16
          prose-headings:text-white prose-headings:font-bold
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-[#8E8E93] prose-p:leading-relaxed
          prose-strong:text-white
          prose-ul:text-[#8E8E93]
          prose-li:text-[#8E8E93]
          prose-table:text-[#8E8E93]
          prose-th:text-white prose-th:bg-[#1C1C1E] prose-th:p-3
          prose-td:p-3 prose-td:border-[#38383A]
        ">
                    {post.content.split('\n').map((paragraph, i) => {
                        if (paragraph.startsWith('## ')) {
                            return <h2 key={i}>{paragraph.replace('## ', '')}</h2>;
                        }
                        if (paragraph.startsWith('### ')) {
                            return <h3 key={i}>{paragraph.replace('### ', '')}</h3>;
                        }
                        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                            return <p key={i}><strong>{paragraph.replace(/\*\*/g, '')}</strong></p>;
                        }
                        if (paragraph.startsWith('- ')) {
                            return <li key={i}>{paragraph.replace('- ', '')}</li>;
                        }
                        if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ') || paragraph.startsWith('4. ') || paragraph.startsWith('5. ')) {
                            return <li key={i}>{paragraph.replace(/^\d+\. /, '')}</li>;
                        }
                        if (paragraph.trim()) {
                            return <p key={i}>{paragraph}</p>;
                        }
                        return null;
                    })}
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-3xl border border-[#22c55e]/30 p-8 text-center mb-16">
                    <h3 className="text-2xl font-bold text-white mb-3">
                        Track Your Sugar-Free Journey
                    </h3>
                    <p className="text-[#8E8E93] mb-6">
                        Download Sukali to scan your food and get personalized skin health advice.
                    </p>
                    <a
                        href="https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#22c55e] text-black font-bold rounded-full"
                    >
                        Download Sukali Free
                    </a>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section>
                        <h3 className="text-2xl font-bold text-white mb-6">Related Articles</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost.slug}
                                    href={`/blog/${relatedPost.slug}`}
                                    className="group"
                                >
                                    <article className="bg-[#1C1C1E] rounded-2xl border border-[#38383A] overflow-hidden hover:border-[#22c55e] transition-colors">
                                        <div className="relative aspect-[16/9]">
                                            <Image
                                                src={relatedPost.image}
                                                alt={relatedPost.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h4 className="text-white font-semibold group-hover:text-[#22c55e] transition-colors line-clamp-2">
                                                {relatedPost.title}
                                            </h4>
                                            <span className="text-[#8E8E93] text-sm">{relatedPost.readTime} min read</span>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </article>

            <SiteFooter />
            <StickyDownloadBar />
        </main>
    );
}
