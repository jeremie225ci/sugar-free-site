import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Acne: How Sugar Is Destroying Your Skin (And How to Fix It)',
    description: 'Discover the hidden link between sugar and acne. Learn why cutting sugar clears skin better than expensive products, and how to start seeing results in days.',
    keywords: ['acne', 'acne causes', 'acne treatment', 'sugar and acne', 'how to get rid of acne', 'acne diet', 'clear skin'],
    openGraph: {
        title: 'Acne: The Sugar Connection Nobody Talks About',
        description: 'Why sugar causes acne and how cutting it transforms your skin.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/acne',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Acne and Sugar: The Hidden Connection',
        description: 'How sugar is causing your breakouts and what to do about it.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/acne',
    },
}

export default function AcneLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
