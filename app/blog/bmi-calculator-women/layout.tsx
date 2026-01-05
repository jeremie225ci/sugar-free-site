import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'BMI Calculator for Women: Calculate Your Body Mass Index Free',
    description: 'Free BMI calculator designed for women. Calculate your Body Mass Index instantly, understand your results, and get personalized tips for reaching a healthy weight.',
    keywords: ['bmi calculator women', 'bmi calculator', 'body mass index calculator', 'healthy weight calculator', 'weight loss calculator', 'bmi chart women'],
    openGraph: {
        title: 'BMI Calculator for Women | Free Online Calculator',
        description: 'Calculate your BMI instantly with our free calculator. Get personalized weight loss recommendations and understand what your BMI means for your health.',
        type: 'website',
        url: 'https://www.sugar-frees.com/blog/bmi-calculator-women',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'BMI Calculator for Women',
        description: 'Calculate your Body Mass Index instantly and get personalized tips for reaching your healthy weight.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/bmi-calculator-women',
    },
}

export default function BMICalculatorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
