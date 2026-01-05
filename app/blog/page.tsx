import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/data/blog";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import StickyDownloadBar from "@/components/StickyDownloadBar";

export const metadata = {
    title: "Blog - Sugar-Free Lifestyle & Skin Health Tips",
    description: "Expert articles on the dangers of sugar, how to quit, and sugar-free tips for a healthier life.",
};


export default function BlogPage() {
    const posts = getAllPosts();
    const featuredPost = posts[0];
    const otherPosts = posts.slice(1);

    return (
        <main className="min-h-screen bg-black">
            <SiteHeader />

            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Sugar Free AI Blog
                    </h1>
                    <p className="text-[#8E8E93] text-lg max-w-2xl mx-auto">
                        Discover the dangers of sugar, how to quit, and tips for a healthier life.
                    </p>
                </div>

                {/* Featured Post */}
                <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="block mb-12 group"
                >
                    <article className="grid md:grid-cols-2 gap-6 bg-[#1C1C1E] rounded-3xl border border-[#38383A] overflow-hidden hover:border-[#22c55e] transition-colors">
                        <div className="relative aspect-[4/3] md:aspect-auto">
                            <Image
                                src={featuredPost.image}
                                alt={featuredPost.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-6 md:p-8 flex flex-col justify-center">
                            <span className="inline-block px-3 py-1 rounded-full bg-[#22c55e]/15 text-[#22c55e] text-sm font-medium mb-4 w-fit">
                                {featuredPost.category}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#22c55e] transition-colors">
                                {featuredPost.title}
                            </h2>
                            <p className="text-[#8E8E93] mb-4">
                                {featuredPost.excerpt}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-[#8E8E93]">
                                <span>{featuredPost.author}</span>
                                <span>•</span>
                                <span>{featuredPost.readTime} min read</span>
                            </div>
                        </div>
                    </article>
                </Link>

                {/* Other Posts Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {otherPosts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group"
                        >
                            <article className="bg-[#1C1C1E] rounded-3xl border border-[#38383A] overflow-hidden hover:border-[#22c55e] transition-colors h-full">
                                <div className="relative aspect-[16/10]">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-5">
                                    <span className="inline-block px-2.5 py-1 rounded-full bg-[#22c55e]/15 text-[#22c55e] text-xs font-medium mb-3">
                                        {post.category}
                                    </span>
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#22c55e] transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-[#8E8E93] text-sm mb-3 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-3 text-xs text-[#8E8E93]">
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

