/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Public Firebase config (safe to expose)
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyDlI5h7KUavC5QhCw7q961PyaJ5xvZFNgg",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "sugarfreeweb-9a695.firebaseapp.com",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: "sugarfreeweb-9a695",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "sugarfreeweb-9a695.firebasestorage.app",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "250743404343",
    NEXT_PUBLIC_FIREBASE_APP_ID: "1:250743404343:web:9aba157ad5388d65a78cb2",
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: "G-YD1CCGBPJZ",
  },
}

export default nextConfig
