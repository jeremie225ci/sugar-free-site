import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Redirecting to the Sukali assessment',
    description: 'Legacy quiz route redirected to the full Sukali onboarding experience.',
    robots: {
        index: false,
        follow: true,
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/start',
    },
}

export default function QuizLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
