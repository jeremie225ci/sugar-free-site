import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sugar-Free Toffee and Caramel: Easy 2-3 Ingredient Recipes',
    description: 'Learn how to make delicious sugar-free toffee and caramel at home. Simple keto-friendly recipes that taste like the real thing without the sugar.',
    keywords: ['sugar free toffee', 'sugar free caramel', 'keto toffee', 'keto caramel', 'low carb candy'],
    openGraph: {
        title: 'Sugar-Free Toffee and Caramel Recipes',
        description: 'Make delicious sugar-free candy at home with just 2-3 ingredients.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/sugar-free-toffee-caramel',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sugar-Free Toffee and Caramel',
        description: 'Easy homemade candy without the sugar.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/sugar-free-toffee-caramel',
    },
}

export default function SugarFreeToffeeCaramelLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
