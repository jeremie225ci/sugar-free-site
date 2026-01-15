import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Signs of Too Much Sugar in Your Body: 12 Warning Signals',
    description: 'Learn the warning signs that you are eating too much sugar. From fatigue to skin problems, discover what your body is telling you about sugar consumption.',
    keywords: ['signs of too much sugar', 'sugar symptoms', 'too much sugar signs', 'sugar overload symptoms', 'effects of too much sugar'],
    openGraph: {
        title: 'Signs of Too Much Sugar in Your Body',
        description: '12 warning signs your body gives when you eat too much sugar.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/signs-of-too-much-sugar',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Signs of Too Much Sugar',
        description: 'Warning signs your body is getting too much sugar.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/signs-of-too-much-sugar',
    },
}

export default function SignsOfTooMuchSugarLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
