import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sugar Type: Understanding the Different Types of Sugar',
    description: 'Learn about the different types of sugar: white sugar, brown sugar, honey, maple syrup, and more. Which ones are healthier and which to avoid.',
    keywords: ['sugar type', 'types of sugar', 'white sugar', 'brown sugar', 'natural sugar', 'added sugar'],
    openGraph: {
        title: 'Sugar Types Explained: Which Are Healthy?',
        description: 'Complete guide to understanding different types of sugar.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/sugar-type',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Types of Sugar Explained',
        description: 'Not all sugars are the same. Learn the difference.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/sugar-type',
    },
}

export default function SugarTypeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
