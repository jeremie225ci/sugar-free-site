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
  metadataBase: new URL('https://www.sugar-frees.com'),
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
  verification: {
    google: 'TEcMMwHrrfKXl4v4xkumaxpRUNdoufDnJLks3Ezg60Q',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.sugar-frees.com',
    siteName: 'Sukali',
    title: 'Sukali - Quit Sugar & Clear Acne',
    description: 'The #1 App to Quit Sugar and Clear Acne. 74+ recipes and AI food analysis.',
    images: [{
      url: 'https://www.sugar-frees.com/images/logo.png',
      width: 512,
      height: 512,
      alt: 'Sukali App Logo',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sukali - Quit Sugar',
    description: 'Learn how to quit sugar and clear acne with Sukali.',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/images/logo.png', color: '#22c55e' },
    ],
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
        {/* Ahrefs Web Analytics */}
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="V/NVTb3PYFA/RUZ8xNDpPA"
          async
        />
      </head>
      <body className={`${inter.variable} font-sans min-h-screen bg-black text-white`}>
        {children}
      </body>
    </html>
  )
}
