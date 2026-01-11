import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Daily Consumption of Sugar: How Much Is Too Much?',
    description: 'Discover how much sugar you really eat daily and why it matters. Learn the recommended limits and how to track your intake easily.',
    keywords: ['daily consumption of sugar', 'daily sugar intake', 'how much sugar per day', 'sugar intake limit', 'recommended sugar intake'],
    openGraph: {
        title: 'Daily Sugar Consumption: How Much Is Safe?',
        description: 'Find out how much sugar you should really be eating each day.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/daily-consumption-of-sugar',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Daily Sugar Intake Guide',
        description: 'How much sugar is too much? The science explained.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/daily-consumption-of-sugar',
    },
}

export default function DailySugarLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
