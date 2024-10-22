/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com', 'cdn.jsdelivr.net', 'upload.wikimedia.org', 'cdn.worldvectorlogo.com'],
  },
  output: 'export',
}

module.exports = nextConfig
