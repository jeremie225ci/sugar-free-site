import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Maintenance Calorie Calculator: Find Your Daily Calorie Needs',
    description: 'Use our free maintenance calorie calculator to find how many calories you need per day. Calculate calories to maintain, lose, or gain weight based on your stats.',
    keywords: ['maintenance calorie calculator', 'calorie calculator', 'TDEE calculator', 'daily calorie needs', 'calories to maintain weight', 'BMR calculator'],
    openGraph: {
        title: 'Maintenance Calorie Calculator',
        description: 'Calculate your daily calorie needs for weight maintenance, loss, or gain.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/maintenance-calorie-calculator',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Maintenance Calorie Calculator',
        description: 'Find out exactly how many calories you need per day.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/maintenance-calorie-calculator',
    },
}

export default function MaintenanceCalorieCalculatorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
