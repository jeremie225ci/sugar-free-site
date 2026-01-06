import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Natural Sweeteners: The Complete 2026 Guide to Healthy Sugar Alternatives',
    description: 'Discover the best natural sweeteners to replace sugar: stevia, monk fruit, allulose, erythritol & more. Compare benefits, taste, and which is best for you.',
    keywords: ['natural sweeteners', 'sugar alternatives', 'healthy sweeteners', 'stevia', 'monk fruit', 'allulose', 'erythritol', 'sugar free', 'sugar substitute'],
    openGraph: {
        title: 'Natural Sweeteners: The Complete Guide to Sugar Alternatives',
        description: 'Find the perfect natural sweetener for you. Compare stevia, monk fruit, allulose, and more.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/natural-sweeteners',
        images: [
            {
                url: 'https://www.sugar-frees.com/assets/images/blog-images/natural-sweeteners.png',
                width: 1200,
                height: 630,
                alt: 'Natural Sweeteners Guide',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Natural Sweeteners: 2026 Complete Guide',
        description: 'The best natural sugar alternatives compared. Find your perfect match.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/natural-sweeteners',
    },
}

export default function NaturalSweetenersLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
