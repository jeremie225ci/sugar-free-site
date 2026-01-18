import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Reduce Sugar: Simple Steps to Cut Sugar From Your Diet',
    description: 'Learn how to reduce sugar intake with practical tips. Discover easy ways to cut sugar without feeling deprived and improve your health fast.',
    keywords: ['reduce sugar', 'reduce sugar intake', 'cut sugar', 'less sugar', 'lower sugar consumption', 'how to eat less sugar'],
    openGraph: {
        title: 'Reduce Sugar: Simple Steps to Cut Sugar',
        description: 'Practical tips to reduce sugar intake without feeling deprived.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/reduce-sugar',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'How to Reduce Sugar',
        description: 'Easy ways to cut sugar and feel better fast.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/reduce-sugar',
    },
}

export default function ReduceSugarLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
