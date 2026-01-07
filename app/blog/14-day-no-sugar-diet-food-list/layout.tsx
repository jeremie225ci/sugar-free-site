import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: '14-Day No Sugar Diet Food List: Free PDF + 50 Recipes [2026]',
    description: 'Download your FREE 14-day no sugar diet food list PDF with 50 sugar-free recipes. Breakfast, lunch, dinner & snacks included. Plus get 100+ more in our app.',
    keywords: ['14 day no sugar diet', 'no sugar diet food list', 'sugar free meal plan', 'no sugar foods', 'quit sugar diet', 'sugar free recipes pdf'],
    openGraph: {
        title: '14-Day No Sugar Diet Food List: Free PDF Download',
        description: 'Get your free PDF with 50 sugar-free recipes. Complete meal plan for 14 days.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/14-day-no-sugar-diet-food-list',
    },
    twitter: {
        card: 'summary_large_image',
        title: '14-Day No Sugar Diet Food List [Free PDF]',
        description: 'Download 50 sugar-free recipes. Complete meal plan for your no-sugar journey.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/14-day-no-sugar-diet-food-list',
    },
}

export default function NoSugarDietLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
