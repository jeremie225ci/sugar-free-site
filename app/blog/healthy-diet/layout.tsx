import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Healthy Diet: The Complete 2026 Guide to Eating Well',
    description: 'Learn how to build a healthy diet that works. Science-backed nutrition tips, meal ideas, and a complete food list for better health and energy.',
    keywords: ['healthy diet', 'healthy eating', 'balanced diet', 'nutrition guide', 'healthy food', 'clean eating', 'diet plan'],
    openGraph: {
        title: 'Healthy Diet: Complete Guide to Eating Well in 2026',
        description: 'Build a healthy diet that actually works. Get meal ideas, food lists, and science-backed tips.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/healthy-diet',
        images: [
            {
                url: 'https://www.sugar-frees.com/assets/images/blog-images/healthy-diet.png',
                width: 1200,
                height: 630,
                alt: 'Healthy Diet Guide',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Healthy Diet: The Complete 2026 Guide',
        description: 'Science-backed nutrition tips, meal ideas, and food lists for better health.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/healthy-diet',
    },
}

export default function HealthyDietLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
