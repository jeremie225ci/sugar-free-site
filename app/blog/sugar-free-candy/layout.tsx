import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sugar Free Candy: Easy Homemade Toffee & Caramel Recipes',
    description: 'Learn how to make delicious sugar free candy at home. Simple recipes for keto toffee and caramel that taste like the real thing without any sugar.',
    keywords: ['sugar free candy', 'sugar free toffee', 'sugar free caramel', 'keto candy', 'low carb candy', 'homemade candy without sugar'],
    openGraph: {
        title: 'Sugar Free Candy: Homemade Toffee & Caramel',
        description: 'Make delicious sugar free candy at home with just 2-3 ingredients.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/sugar-free-candy',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sugar Free Candy Recipes',
        description: 'Easy homemade candy without the sugar.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/sugar-free-candy',
    },
}

export default function SugarFreeCandyLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
