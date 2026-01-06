import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Aspartame: The Complete Guide to This Controversial Sweetener (2026)',
    description: 'Everything you need to know about aspartame: Is it safe? What did the WHO say? Side effects, research, and healthier alternatives explained by experts.',
    keywords: ['aspartame', 'aspartame safety', 'aspartame cancer', 'aspartame side effects', 'artificial sweeteners', 'diet soda', 'sugar free', 'WHO aspartame'],
    openGraph: {
        title: 'Aspartame: Complete Guide & What Science Really Says',
        description: 'Is aspartame safe? What did the WHO really say? Get the facts, research, and healthier alternatives.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/aspartame',
        images: [
            {
                url: 'https://www.sugar-frees.com/assets/images/blog-images/aspartame.png',
                width: 1200,
                height: 630,
                alt: 'Aspartame Guide',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Aspartame: The Complete 2026 Guide',
        description: 'Is aspartame safe? What the WHO really said, side effects, and better alternatives.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/aspartame',
    },
}

export default function AspartameLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
