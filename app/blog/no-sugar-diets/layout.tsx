import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'No Sugar Diets: Complete Guide to Sugar-Free Eating',
    description: 'Everything you need to know about no sugar diets. What they are, how to start, what to eat, and the health benefits of eliminating sugar from your diet.',
    keywords: ['no sugar diets', 'sugar free diet', 'no sugar diet plan', 'quit sugar diet', 'sugar elimination diet'],
    openGraph: {
        title: 'No Sugar Diets: The Complete Guide',
        description: 'Learn how to start a no sugar diet and transform your health.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/no-sugar-diets',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'No Sugar Diets Guide',
        description: 'Everything you need to know about eliminating sugar from your diet.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/no-sugar-diets',
    },
}

export default function NoSugarDietsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
