import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#f6f0e6',
  colorScheme: 'light',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sugar-frees.com'),
  title: {
    default: 'Sukali | Sugar-Free Guides, Recipes, and Daily Support',
    template: '%s | Sukali'
  },
  description: 'Sukali helps you cut sugar with calmer guidance, practical recipes, meal scans, and simple daily support that feels sustainable.',
  keywords: ['quit sugar', 'sugar-free recipes', 'skin health', 'sugar scanner', 'sugar-free diet', 'cravings', 'Sukali app'],
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
    title: 'Sukali | A Calmer Way to Quit Sugar',
    description: 'Sugar-free guidance, practical recipes, and app support for people who want visible, steady progress.',
    images: [{
      url: 'https://www.sugar-frees.com/images/logo.png',
      width: 512,
      height: 512,
      alt: 'Sukali App Logo',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sukali | A Calmer Way to Quit Sugar',
    description: 'Guides, recipes, and app support for cutting sugar without the chaos.',
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
      { rel: 'mask-icon', url: '/images/logo.png', color: '#5c7f57' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        {/* Ahrefs Web Analytics */}
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="V/NVTb3PYFA/RUZ8xNDpPA"
          async
        />
      </head>
      <body className={`${GeistSans.variable} min-h-screen bg-background text-foreground`}>
        {children}
      </body>
    </html>
  )
}
