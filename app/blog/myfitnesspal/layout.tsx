import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'MyFitnessPal Review 2026: Still the Best Calorie Counter?',
    description: 'Honest MyFitnessPal review after years of use. Is this calorie tracker still worth it in 2026? Features, pricing, problems, and the best alternative.',
    keywords: ['myfitnesspal', 'myfitnesspal review', 'myfitnesspal app', 'calorie counter', 'food diary app', 'myfitnesspal 2026'],
    openGraph: {
        title: 'MyFitnessPal Review: The Complete 2026 Guide',
        description: 'Full review of MyFitnessPal for calorie tracking and weight loss.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/myfitnesspal',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'MyFitnessPal Review 2026',
        description: 'Is MyFitnessPal still the best calorie tracking app?',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/myfitnesspal',
    },
}

export default function MyFitnessPalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
