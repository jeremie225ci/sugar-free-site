import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Calai App Review 2026: Is This AI Calorie Counter Worth It?',
    description: 'Honest Calai app review. Does this AI calorie counter work for weight loss? Features, pricing, pros and cons, and the best alternative for 2026.',
    keywords: ['calai', 'calai app', 'calai review', 'calai calorie counter', 'ai calorie tracker', 'calai app review'],
    openGraph: {
        title: 'Calai App Review: AI Calorie Counter for Weight Loss',
        description: 'Complete review of the Calai app for calorie tracking and weight loss.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/calai',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Calai App Review 2026',
        description: 'Is this AI calorie counter worth using for weight loss?',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/calai',
    },
}

export default function CalaiLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
