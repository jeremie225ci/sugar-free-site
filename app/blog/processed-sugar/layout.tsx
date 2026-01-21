import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Processed Sugar: What It Is and Why It\'s So Dangerous',
    description: 'Learn what processed sugar is and why it\'s harmful. Discover how processed sugar differs from natural sugar and how to avoid it in your diet.',
    keywords: ['processed sugar', 'refined sugar', 'added sugar', 'sugar processing', 'white sugar dangers'],
    openGraph: {
        title: 'Processed Sugar: The Hidden Danger in Your Food',
        description: 'What processed sugar is and why you should avoid it.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/processed-sugar',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Processed Sugar Explained',
        description: 'The truth about processed sugar and your health.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/processed-sugar',
    },
}

export default function ProcessedSugarLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
