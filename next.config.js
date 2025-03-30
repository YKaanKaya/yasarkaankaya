/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com', 'cdn.jsdelivr.net', 'upload.wikimedia.org', 'cdn.worldvectorlogo.com'],
  },
  output: 'export',
  eslint: {
    // Disable ESLint during builds for production
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
