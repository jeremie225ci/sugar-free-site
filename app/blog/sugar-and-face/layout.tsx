import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sugar and Face: How Sugar Destroys Your Facial Appearance',
    description: 'Learn how sugar affects your face. Discover why sugar causes puffy face, acne, wrinkles, and premature aging, and how cutting sugar transforms your look.',
    keywords: ['sugar and face', 'sugar face', 'does sugar cause acne', 'sugar puffy face', 'sugar aging face', 'sugar wrinkles'],
    openGraph: {
        title: 'Sugar and Face: How Sugar Ruins Your Looks',
        description: 'The surprising ways sugar damages your facial appearance.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/sugar-and-face',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sugar and Your Face',
        description: 'How sugar causes puffy face, acne, and premature aging.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/sugar-and-face',
    },
}

export default function SugarAndFaceLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
