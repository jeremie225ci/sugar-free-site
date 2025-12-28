import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://sukali.app'),
  title: {
    default: 'Sukali - Quit Sugar & Clear Acne: Guide, Recipes & Tips',
    template: '%s | Sukali'
  },
  description: 'Learn how to quit sugar and clear acne with Sukali. 74+ sugar-free recipes, food scanning AI, and tips for skin health.',
  keywords: ['quit sugar', 'acne diet', 'sugar-free recipes', 'skin health', 'sugar scanner', 'sugar-free diet', 'sugar and acne', 'Sukali app'],
  authors: [{ name: 'Sukali Team' }],
  creator: 'Sukali',
  publisher: 'Sukali',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sukali.app',
    siteName: 'Sukali',
    title: 'Sukali - Quit Sugar & Clear Acne',
    description: 'The #1 App to Quit Sugar and Clear Acne. 74+ recipes and AI food analysis.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sukali - Quit Sugar',
    description: 'Learn how to quit sugar and clear acne with Sukali.',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.variable} font-sans min-h-screen bg-black text-white`}>
        {children}
      </body>
    </html>
  )
}
