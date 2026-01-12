import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Cutting Out Sugar: The Complete Guide to Quitting Sugar',
    description: 'Everything you need to know about cutting out sugar. What to expect, how to handle cravings, and the benefits you will experience.',
    keywords: ['cutting out sugar', 'quit sugar', 'stop eating sugar', 'sugar detox', 'no sugar diet'],
    openGraph: {
        title: 'Cutting Out Sugar: Complete Guide',
        description: 'How to successfully cut out sugar and transform your health.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/cutting-out-sugar',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'How to Cut Out Sugar',
        description: 'Your complete guide to quitting sugar for good.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/cutting-out-sugar',
    },
}

export default function CuttingOutSugarLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
