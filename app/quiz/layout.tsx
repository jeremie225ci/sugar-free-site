import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sugar Quiz: Discover Your Sugar Profile | Free Assessment',
    description: 'Take our free sugar quiz to discover your relationship with sugar. Get personalized insights and learn how to reduce your sugar intake effectively.',
    keywords: ['sugar quiz', 'sugar assessment', 'sugar addiction test', 'how much sugar do I eat'],
    openGraph: {
        title: 'Sugar Quiz: What is Your Sugar Profile?',
        description: 'Take our free 2-minute quiz to discover your sugar habits.',
        type: 'website',
        url: 'https://www.sugar-frees.com/quiz',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sugar Quiz - Free Assessment',
        description: 'Find out your relationship with sugar in 2 minutes.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/quiz',
    },
}

export default function QuizLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
