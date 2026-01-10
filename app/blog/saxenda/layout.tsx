import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Saxenda for Weight Loss: What You Need to Know Before Starting',
    description: 'Complete guide to Saxenda (liraglutide) for weight loss. How it works, side effects, cost, and whether natural alternatives might work better for you.',
    keywords: ['saxenda', 'saxenda weight loss', 'liraglutide', 'weight loss injection', 'GLP-1 weight loss'],
    openGraph: {
        title: 'Saxenda for Weight Loss: Complete Guide',
        description: 'Everything you need to know about Saxenda before starting treatment.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/saxenda',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Saxenda Weight Loss Guide',
        description: 'How Saxenda works, side effects, and natural alternatives.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/saxenda',
    },
}

export default function SaxendaLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
