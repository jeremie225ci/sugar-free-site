import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Healthy Sugar: The Complete Guide to Smart Sugar Choices',
    description: 'Learn which sugars are healthiest, how to choose better alternatives, and how to reduce sugar intake while still enjoying sweet foods. Science-backed guide.',
    keywords: ['healthy sugar', 'good sugar', 'natural sugar', 'sugar alternatives', 'healthy sweeteners'],
    openGraph: {
        title: 'Healthy Sugar: Smart Sugar Choices for Better Health',
        description: 'Which sugars are actually healthy? Complete guide to making better sugar choices.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/healthy-sugar',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Healthy Sugar Guide',
        description: 'Learn which sugars are healthiest and how to make smarter choices.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/healthy-sugar',
    },
}

export default function HealthySugarLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
