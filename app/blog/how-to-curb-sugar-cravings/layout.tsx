import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'How to Curb Sugar Cravings: 15 Quick Tips That Work Instantly',
    description: 'Discover how to curb sugar cravings fast with these 15 proven tips. From healthy swaps to mindset tricks, beat your sweet tooth today.',
    keywords: ['how to curb sugar cravings', 'curb sugar cravings', 'reduce sugar cravings', 'sweet tooth remedies', 'stop craving sweets'],
    openGraph: {
        title: 'How to Curb Sugar Cravings: 15 Quick Tips',
        description: 'Beat your sweet tooth with these instant craving-busting strategies.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/how-to-curb-sugar-cravings',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'How to Curb Sugar Cravings [Quick Guide]',
        description: '15 proven tips to curb sugar cravings instantly.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/how-to-curb-sugar-cravings',
    },
}

export default function CurbSugarCravingsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
