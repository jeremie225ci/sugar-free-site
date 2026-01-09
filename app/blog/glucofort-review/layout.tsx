import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Glucofort Review 2026: Does This Blood Sugar Supplement Work?',
    description: 'Honest Glucofort review with ingredient analysis, benefits, side effects, and user experiences. Find out if this blood sugar supplement is worth trying.',
    keywords: ['glucofort', 'glucofort review', 'blood sugar supplement', 'glucofort ingredients', 'natural blood sugar support'],
    openGraph: {
        title: 'Glucofort Review: Complete Blood Sugar Supplement Analysis',
        description: 'In-depth review of Glucofort ingredients, benefits, and real user experiences.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/glucofort-review',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Glucofort Review 2026',
        description: 'Complete analysis of this popular blood sugar supplement.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/glucofort-review',
    },
}

export default function GlucofortReviewLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
