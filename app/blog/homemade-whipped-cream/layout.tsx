import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Homemade Whipped Cream (Sugar-Free Recipe): 3 Minutes, 3 Ingredients',
    description: 'Learn how to make delicious homemade whipped cream without sugar. This easy 3-ingredient recipe takes just 3 minutes. Perfect for keto, low-carb, and diabetic-friendly desserts.',
    keywords: ['homemade whipped cream', 'sugar free whipped cream', 'whipped cream recipe', 'keto whipped cream', 'low carb whipped cream'],
    openGraph: {
        title: 'Homemade Sugar-Free Whipped Cream Recipe',
        description: 'Quick and easy sugar-free whipped cream in just 3 minutes.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/homemade-whipped-cream',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Homemade Whipped Cream (No Sugar)',
        description: '3 ingredients, 3 minutes, zero sugar.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/homemade-whipped-cream',
    },
}

export default function WhippedCreamLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
