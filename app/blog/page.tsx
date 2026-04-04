import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/data/blog";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import StickyDownloadBar from "@/components/StickyDownloadBar";

export const metadata = {
    title: "Journal - Sugar-Free Lifestyle & Skin Health Tips",
    description: "Practical articles on sugar, cravings, skin, labels, and the habits that make a sugar-free life easier.",
};


export default function BlogPage() {
    const posts = getAllPosts();
    const featuredPost = posts[0];
    const otherPosts = posts.slice(1);
    const formatDate = (value: string) =>
        new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });

    return (
        <main className="blog-modern min-h-screen bg-transparent text-[#1f241d]">
            <SiteHeader />

            <div className="mx-auto max-w-6xl px-4 py-14 md:py-18">
                <div className="mb-14 max-w-3xl">
                    <span className="inline-flex rounded-full border border-[#d8ccb9] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#7b7468] shadow-sm">
                        Journal
                    </span>
                    <h1
                        className="mt-5 text-5xl leading-tight text-[#1f241d] md:text-6xl"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Writing that makes sugar feel understandable again.
                    </h1>
                    <p className="mt-4 text-lg leading-8 text-[#5f5a51]">
                        Practical articles on cravings, labels, skin, puffiness, and the real reasons people stay stuck.
                    </p>
                </div>

                <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="card-hover group mb-14 block overflow-hidden rounded-[36px] border border-[#ddd1c1] bg-[#fffaf2] shadow-[0_24px_60px_rgba(52,41,22,0.08)]"
                >
                    <article className="grid gap-6 md:grid-cols-2">
                        <div className="relative aspect-[4/3] md:aspect-auto">
                            <Image
                                src={featuredPost.image}
                                alt={featuredPost.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-center p-6 md:p-8">
                            <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#7b7468]">
                                <span>{featuredPost.category}</span>
                                <span className="h-1 w-1 rounded-full bg-[#bcae9a]" />
                                <span>{formatDate(featuredPost.date)}</span>
                            </div>
                            <h2
                                className="mt-4 text-3xl leading-tight text-[#1f241d] group-hover:text-[#5c7f57] md:text-4xl"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                {featuredPost.title}
                            </h2>
                            <p className="mb-5 mt-4 text-base leading-8 text-[#5f5a51]">
                                {featuredPost.excerpt}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-[#6b655b]">
                                <span>{featuredPost.author}</span>
                                <span>•</span>
                                <span>{featuredPost.readTime} min read</span>
                            </div>
                        </div>
                    </article>
                </Link>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {otherPosts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="card-hover group overflow-hidden rounded-[30px] border border-[#ddd1c1] bg-[#fffaf2] shadow-[0_18px_40px_rgba(52,41,22,0.06)]"
                        >
                            <article className="h-full">
                                <div className="relative aspect-[16/10]">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-5">
                                    <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-[#7b7468]">
                                        <span>{post.category}</span>
                                        <span className="h-1 w-1 rounded-full bg-[#bcae9a]" />
                                        <span>{formatDate(post.date)}</span>
                                    </div>
                                    <h3
                                        className="mt-3 line-clamp-2 text-2xl leading-snug text-[#1f241d] group-hover:text-[#5c7f57]"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        {post.title}
                                    </h3>
                                    <p className="mb-3 mt-3 line-clamp-3 text-sm leading-7 text-[#5f5a51]">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-3 text-xs text-[#6b655b]">
                                        <span>{post.readTime} min read</span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>

            <SiteFooter />
            <StickyDownloadBar />
        </main>
    );
}
