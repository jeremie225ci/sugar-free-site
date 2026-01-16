import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Pimple Treatment: The Diet Fix That Works Better Than Products',
    description: 'Learn the most effective pimple treatment that dermatologists rarely mention. Discover how changing what you eat clears skin faster than expensive creams.',
    keywords: ['pimple treatment', 'how to treat pimples', 'pimple cure', 'get rid of pimples', 'pimple remedy', 'clear pimples fast'],
    openGraph: {
        title: 'Pimple Treatment: The Diet Solution',
        description: 'The pimple treatment that actually works from the inside out.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/pimple-treatment',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Pimple Treatment That Works',
        description: 'Clear pimples by treating the root cause in your diet.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/pimple-treatment',
    },
}

export default function PimpleTreatmentLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
