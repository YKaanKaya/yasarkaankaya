/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com', 'cdn.jsdelivr.net', 'upload.wikimedia.org', 'cdn.worldvectorlogo.com', 'assets.ngc.nvidia.com'],
  },
  output: 'export',
  eslint: {
    // Disable ESLint during builds for production
    ignoreDuringBuilds: true,
  },
  // Enhanced build options for static export
  trailingSlash: true,
  distDir: 'out',
}

module.exports = nextConfig
