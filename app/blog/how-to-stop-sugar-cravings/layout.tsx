import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'How to Stop Sugar Cravings: 12 Science-Backed Methods That Work',
    description: 'Learn how to stop sugar cravings for good with proven strategies. From protein-rich foods to sleep optimization, discover what actually works.',
    keywords: ['how to stop sugar cravings', 'stop sugar cravings', 'sugar cravings remedies', 'quit sugar', 'reduce sugar cravings'],
    openGraph: {
        title: 'How to Stop Sugar Cravings: 12 Science-Backed Methods',
        description: 'Proven strategies to eliminate sugar cravings and take back control of your eating habits.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/how-to-stop-sugar-cravings',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'How to Stop Sugar Cravings [2026 Guide]',
        description: '12 proven methods to stop sugar cravings for good.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/how-to-stop-sugar-cravings',
    },
}

export default function StopSugarCravingsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
