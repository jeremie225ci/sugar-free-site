import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sugar and the Effects on the Body: What Really Happens Inside',
    description: 'Learn what sugar does to your body. Discover the effects of sugar on your brain, liver, heart, skin, and metabolism, and how to reverse the damage.',
    keywords: ['sugar and the effects on the body', 'effects of sugar', 'what sugar does to your body', 'sugar effects on health', 'sugar metabolism'],
    openGraph: {
        title: 'Sugar Effects on the Body Explained',
        description: 'What happens when you eat sugar and how it affects every organ.',
        type: 'article',
        url: 'https://www.sugar-frees.com/blog/sugar-effects-on-body',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sugar Effects on Your Body',
        description: 'The complete breakdown of how sugar damages your health.',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/blog/sugar-effects-on-body',
    },
}

export default function SugarEffectsOnBodyLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
