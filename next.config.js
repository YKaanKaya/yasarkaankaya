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
  // Define the paths that should be generated during static export
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/showcase/NvidiaMultimodalAI': { page: '/showcase/NvidiaMultimodalAI' },
      '/showcase/NvidiaMultimodalAI/notebook/01a-early-and-late-fusion': { page: '/showcase/NvidiaMultimodalAI/notebook/[slug]', query: { slug: '01a-early-and-late-fusion' } },
      '/showcase/NvidiaMultimodalAI/notebook/01b-exploring-modalities': { page: '/showcase/NvidiaMultimodalAI/notebook/[slug]', query: { slug: '01b-exploring-modalities' } },
      '/showcase/NvidiaMultimodalAI/notebook/02a-intermediate-fusion': { page: '/showcase/NvidiaMultimodalAI/notebook/[slug]', query: { slug: '02a-intermediate-fusion' } },
      '/showcase/NvidiaMultimodalAI/notebook/02b-contrastive-pretraining': { page: '/showcase/NvidiaMultimodalAI/notebook/[slug]', query: { slug: '02b-contrastive-pretraining' } },
      '/showcase/NvidiaMultimodalAI/notebook/03a-projection': { page: '/showcase/NvidiaMultimodalAI/notebook/[slug]', query: { slug: '03a-projection' } },
      '/showcase/NvidiaMultimodalAI/notebook/03b-ocr-pipelines': { page: '/showcase/NvidiaMultimodalAI/notebook/[slug]', query: { slug: '03b-ocr-pipelines' } },
      '/showcase/NvidiaMultimodalAI/notebook/04a-vss': { page: '/showcase/NvidiaMultimodalAI/notebook/[slug]', query: { slug: '04a-vss' } },
      '/showcase/NvidiaMultimodalAI/notebook/04b-vss-graphrag': { page: '/showcase/NvidiaMultimodalAI/notebook/[slug]', query: { slug: '04b-vss-graphrag' } }
    };
  }
}

module.exports = nextConfig
