import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sugar-Free Chocolate: How to Make Homemade Chocolate Bars',
    description: 'Learn how to make delicious sugar-free chocolate bars at home with just 3 ingredients. Perfect for diabetics and anyone avoiding sugar. Easy step-by-step recipe.',
    keywords: ['sugar free chocolate', 'homemade chocolate', 'keto chocolate', 'diabetic chocolate', 'chocolate without sugar'],
    openGraph: {
        title: 'Sugar-Free Chocolate: Homemade Chocolate Bars',
        description: 'Make delicious chocolate at home without any sugar.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/sugar-free-chocolate',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sugar-Free Chocolate Recipe',
        description: 'Homemade chocolate bars without sugar.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/sugar-free-chocolate',
    },
}

export default function SugarFreeChocolateLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
