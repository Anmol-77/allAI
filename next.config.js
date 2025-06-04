/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add output: 'export' for static site generation
  output: 'export',
  distDir: 'out',

  reactStrictMode: true,

  // These are required settings for deploying to Netlify
  skipTrailingSlashRedirect: true,

  // Configure the ESLint plugin
  eslint: {
    // If not using ESLint, set it to false
    ignoreDuringBuilds: true,
  },

  // Avoid TypeScript errors during build
  typescript: {
    // If not using TypeScript, set it to false
    ignoreBuildErrors: true,
  },

  images: {
    domains: [
      "m.media-amazon.com",
      "same-assets.com",
      "via.placeholder.com",
      "placehold.co",
      "unsplash.com",
      "images.unsplash.com",
      "random.imagecdn.app",
      "picsum.photos",
      "loremflickr.com",
      "source.unsplash.com",
      "fastly.picsum.photos",
      "nextui.org",
      "i.pravatar.cc",
      "avatars.githubusercontent.com",
      "cloudflare-ipfs.com",
      "loremflickr.com",
      "tailwindui.com",
      "img.youtube.com",
      "raw.githubusercontent.com",
      "utfs.io",
      "api.dicebear.com",
    ],
    unoptimized: true,
  },
};

export default nextConfig;
