import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Download Sukali - Free Sugar Tracking App | iOS & Android',
    description: 'Download Sukali for free. Scan foods for hidden sugars, get 100+ sugar-free recipes, and transform your health. Available on iOS, Android coming soon.',
    keywords: ['download sukali', 'sugar tracking app', 'no sugar app', 'sugar free app', 'healthy eating app'],
    openGraph: {
        title: 'Download Sukali - Free Sugar Tracking App',
        description: 'Scan foods for hidden sugars and transform your health.',
        type: 'website',
        url: 'https://www.sugar-frees.com/download',
    },
    alternates: {
        canonical: 'https://www.sugar-frees.com/download',
    },
}

export default function DownloadLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
