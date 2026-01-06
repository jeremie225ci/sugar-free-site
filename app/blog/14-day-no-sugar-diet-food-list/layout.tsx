import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: '14-Day No Sugar Diet Food List: Complete Meal Plan With Recipes',
    description: 'Your complete 14-day no sugar diet food list with breakfast, lunch, dinner and snack ideas. Plus links to our favorite sugar-free recipes.',
    keywords: ['14 day no sugar diet', 'no sugar diet food list', 'sugar free meal plan', 'no sugar foods', 'quit sugar diet'],
    openGraph: {
        title: '14-Day No Sugar Diet Food List: Complete Meal Plan',
        description: 'Your complete 14-day no sugar diet food list with breakfast, lunch, dinner and snack ideas.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/14-day-no-sugar-diet-food-list',
    },
    twitter: {
        card: 'summary_large_image',
        title: '14-Day No Sugar Diet Food List',
        description: 'Complete meal plan with sugar-free recipes for 14 days.',
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
