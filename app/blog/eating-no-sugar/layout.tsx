import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Eating No Sugar: What Happens to Your Body + How to Start',
    description: 'Discover what happens when you stop eating sugar. Complete guide to eating no sugar including benefits, challenges, meal ideas, and tips for success.',
    keywords: ['eating no sugar', 'stop eating sugar', 'no sugar lifestyle', 'quit eating sugar', 'zero sugar diet'],
    openGraph: {
        title: 'Eating No Sugar: Complete Guide',
        description: 'What happens when you stop eating sugar and how to make it work.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/eating-no-sugar',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Eating No Sugar Guide',
        description: 'Everything that happens when you eliminate sugar from your diet.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/eating-no-sugar',
    },
}

export default function EatingNoSugarLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
