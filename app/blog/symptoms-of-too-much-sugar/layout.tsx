import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Symptoms of Too Much Sugar in Your Body: 15 Warning Signs',
    description: 'Discover the symptoms of too much sugar in your body. Learn the 15 warning signs that your sugar intake is too high and what to do about it.',
    keywords: ['symptoms of too much sugar in your body', 'too much sugar symptoms', 'signs of high sugar intake', 'sugar overload symptoms'],
    openGraph: {
        title: 'Symptoms of Too Much Sugar in Your Body',
        description: '15 warning signs that you are eating too much sugar.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/symptoms-of-too-much-sugar',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Too Much Sugar Symptoms',
        description: 'Warning signs your body is overloaded with sugar.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/symptoms-of-too-much-sugar',
    },
}

export default function SymptomsOfTooMuchSugarLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
