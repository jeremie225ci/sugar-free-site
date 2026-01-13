import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Clear Skin Diet: Foods That Transform Your Skin From Within',
    description: 'Discover the best diet for clear, glowing skin. Learn which foods cause acne, what to eat for better skin, and how sugar affects your complexion.',
    keywords: ['clear skin diet', 'diet for acne', 'foods for clear skin', 'skin diet', 'acne diet'],
    openGraph: {
        title: 'Clear Skin Diet: Transform Your Skin With Food',
        description: 'The complete guide to eating for clear, glowing skin.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/clear-skin-diet',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Clear Skin Diet Guide',
        description: 'Foods that clear acne and give you glowing skin.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/clear-skin-diet',
    },
}

export default function ClearSkinDietLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
