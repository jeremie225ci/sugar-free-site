import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Intermittent Fasting: Complete Guide to Getting Started',
    description: 'Learn everything about intermittent fasting. How it works, different methods, benefits for weight loss, and how to start your first fast safely.',
    keywords: ['intermittent fasting', 'fasting for weight loss', 'IF diet', '16 8 fasting', 'how to fast', 'fasting benefits'],
    openGraph: {
        title: 'Intermittent Fasting: The Complete Beginner Guide',
        description: 'Everything you need to know about intermittent fasting and how to start.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/intermittent-fasting',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Intermittent Fasting Guide',
        description: 'How intermittent fasting works and how to get started.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/intermittent-fasting',
    },
}

export default function IntermittentFastingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
