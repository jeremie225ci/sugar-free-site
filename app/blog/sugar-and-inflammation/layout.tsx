import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sugar and Inflammation: How Sugar Causes Chronic Inflammation',
    description: 'Learn how sugar causes inflammation in your body. Discover the link between sugar consumption and chronic diseases, joint pain, and how to reduce inflammation.',
    keywords: ['sugar and inflammation', 'sugar causes inflammation', 'inflammation diet', 'anti-inflammatory diet', 'reduce inflammation'],
    openGraph: {
        title: 'Sugar and Inflammation: The Hidden Connection',
        description: 'How sugar triggers inflammation and what to do about it.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/sugar-and-inflammation',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sugar and Inflammation',
        description: 'The link between sugar and chronic inflammation explained.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/sugar-and-inflammation',
    },
}

export default function SugarAndInflammationLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
