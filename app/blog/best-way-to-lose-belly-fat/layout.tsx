import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Best Way to Lose Belly Fat: What Actually Works in 2026',
    description: 'Discover the best way to lose belly fat backed by science. No gimmicks, no expensive supplements. Just proven strategies that actually work.',
    keywords: ['best way to lose belly fat', 'lose belly fat', 'belly fat loss', 'how to lose stomach fat', 'reduce belly fat'],
    openGraph: {
        title: 'Best Way to Lose Belly Fat: Science-Backed Guide',
        description: 'Proven strategies to lose belly fat that actually work.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/best-way-to-lose-belly-fat',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Best Way to Lose Belly Fat [2026]',
        description: 'What actually works for losing belly fat.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/best-way-to-lose-belly-fat',
    },
}

export default function BellyFatLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
