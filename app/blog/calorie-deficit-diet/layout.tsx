import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Calorie Deficit Diet: The Science-Backed Guide to Weight Loss (2026)',
    description: 'Master the calorie deficit diet for sustainable weight loss. Calculate your deficit, learn what to eat, meal plans, and avoid common mistakes.',
    keywords: ['calorie deficit diet', 'calorie deficit', 'weight loss diet', 'how to lose weight', 'calorie counting', 'diet for weight loss', 'fat loss'],
    openGraph: {
        title: 'Calorie Deficit Diet: Science-Backed Weight Loss Guide',
        description: 'The only diet method proven by science. Learn to create a calorie deficit that works.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/calorie-deficit-diet',
        images: [
            {
                url: 'https://www.sugar-frees.com/assets/images/blog-images/calorie-deficit-diet.png',
                width: 1200,
                height: 630,
                alt: 'Calorie Deficit Diet Guide',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Calorie Deficit Diet: Complete 2026 Guide',
        description: 'How to lose weight with a calorie deficit. Calculator, meal plans, and tips.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/calorie-deficit-diet',
    },
}

export default function CalorieDeficitLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
