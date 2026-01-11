import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sugar Free: The Complete Guide to Living Without Added Sugar',
    description: 'Everything you need to know about going sugar free. Benefits, how to start, what to eat, and how to make it sustainable long-term.',
    keywords: ['sugar free', 'no sugar', 'sugar free diet', 'quit sugar', 'sugar free lifestyle'],
    openGraph: {
        title: 'Sugar Free: Complete Guide to a Sugar-Free Life',
        description: 'Learn how to go sugar free and transform your health.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/sugar-free',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sugar Free Living Guide',
        description: 'Everything you need to go sugar free.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/sugar-free',
    },
}

export default function SugarFreeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
