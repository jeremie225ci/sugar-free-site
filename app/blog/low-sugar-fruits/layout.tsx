import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Low Sugar Fruits: 15 Best Fruits for Weight Loss & Blood Sugar Control',
    description: 'Discover the best low sugar fruits to eat for weight loss and blood sugar control. Complete guide with sugar content, health benefits, and how to include them in your diet.',
    keywords: ['low sugar fruits', 'fruits low in sugar', 'low glycemic fruits', 'best fruits for diabetics', 'sugar free fruits', 'fruits for weight loss'],
    openGraph: {
        title: 'Low Sugar Fruits: Complete Guide for Healthy Eating',
        description: 'The complete guide to low sugar fruits. Learn which fruits have the least sugar and how to enjoy them for better health.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/low-sugar-fruits',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Low Sugar Fruits Guide',
        description: 'Discover which fruits are lowest in sugar and best for your health.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/low-sugar-fruits',
    },
}

export default function LowSugarFruitsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
