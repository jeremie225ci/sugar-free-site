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
  async redirects() {
    return [
      {
        source: "/sitemap",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/sitemap_index.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/food/egg-spinach-scramble",
        destination: "/food/egg-and-spinach-scramble",
        permanent: true,
      },
      {
        source: "/food/lentil-veggie-soup",
        destination: "/food/lentil-and-veggie-soup",
        permanent: true,
      },
      {
        source: "/food/beef-broccoli-stir-fry",
        destination: "/food/beef-and-broccoli-stir-fry",
        permanent: true,
      },
      {
        source: "/food/kale-quinoa-power-salad",
        destination: "/food/kale-and-quinoa-power-salad",
        permanent: true,
      },
      {
        source: "/food/mushroom-spinach-frittata",
        destination: "/food/mushroom-and-spinach-frittata",
        permanent: true,
      },
      {
        source: "/food/tuna-white-bean-salad",
        destination: "/food/tuna-and-white-bean-salad",
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: "/__/auth/:path*",
        destination: "https://sugarfree-5cf78.firebaseapp.com/__/auth/:path*",
      },
      {
        source: "/__/firebase/:path*",
        destination: "https://sugarfree-5cf78.firebaseapp.com/__/firebase/:path*",
      },
    ]
  },
}

export default nextConfig
