import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NVIDIA Multimodal AI Agents Showcase | Kaan Kaya',
  description: 'Placeholder page for the NVIDIA course "Building AI Agents with Multimodal Models". Notebooks, images, and certification details will be added soon.',
  keywords: [
    'NVIDIA',
    'Multimodal',
    'AI Agents',
    'Deep Learning',
    'Course Showcase',
  ],
  openGraph: {
    title: 'NVIDIA Multimodal AI Agents Showcase | Kaan Kaya',
    description: 'Showcase for NVIDIA\'s "Building AI Agents with Multimodal Models" course. Content coming soon.',
    type: 'website',
    url: 'https://kaankaya.dev/showcase/NvidiaMultimodalAI',
    images: [
      {
        url: '/images/hero-bg.jpg', // Placeholder image; replace once provided
        width: 1200,
        height: 630,
        alt: 'NVIDIA Multimodal AI Agents Course'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NVIDIA Multimodal AI Agents Showcase',
    description: 'Showcase for NVIDIA\'s "Building AI Agents with Multimodal Models" course. Coming soon.',
    images: ['/images/hero-bg.jpg']
  },
  alternates: {
    canonical: 'https://kaankaya.dev/showcase/NvidiaMultimodalAI'
  }
}

import { NotebookSection } from './components/NotebookSection'

export default function NvidiaMultimodalAIShowcase() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Building AI Agents with Multimodal Models</h1>
      <p className="text-muted-foreground mb-8">
        Below are summaries of course notebooks. Click "View Notebook" to open the full Jupyter view.
      </p>

      <NotebookSection
        title="1a. Early and Late Fusion"
        description="Multimodal models are a simple concept with a surprisingly complex practice. This notebook compares different data types and demonstrates early-vs-late fusion techniques using a robotics use-case."
        objectives={[
          'Explore the properties of LiDAR data',
          'Construct and compare single-modal RGB and LiDAR models',
          'Build a late-fusion multimodal model',
          'Build an early-fusion multimodal model',
        ]}
        viewLink="/showcase/NvidiaMultimodalAI/notebook/01a-early-and-late-fusion"
        insightsLink="/showcase/NvidiaMultimodalAI/notebook/01a-early-and-late-fusion/insights"
      />


      <NotebookSection
        title="1b. Exploring Modalities"
        description="Investigate individual sensor streams (RGB, depth and text) and learn how to encode and align them into a shared embedding space."
        objectives={[
          'Visualise and pre-process RGB, depth and text data',
          'Train modality-specific encoders',
          'Align embeddings with a contrastive loss',
          'Evaluate cross-modal retrieval performance',
        ]}
        viewLink="/showcase/NvidiaMultimodalAI/notebook/01b-exploring-modalities"
        insightsLink="/showcase/NvidiaMultimodalAI/notebook/01b-exploring-modalities/insights"
      />

      <NotebookSection
        title="2a. Intermediate Fusion"
        description="Learn more advanced multimodal fusion techniques that combine features at the intermediate level, allowing models to better capture cross-modal interactions."
        objectives={[
          'Implement intermediate fusion architectures',
          'Compare performance with early and late fusion models',
          'Visualize feature interactions across modalities',
          'Optimize fusion points for specific tasks',
        ]}
        viewLink="/showcase/NvidiaMultimodalAI/notebook/02a-intermediate-fusion"
        insightsLink="/showcase/NvidiaMultimodalAI/notebook/02a-intermediate-fusion/insights"
      />

      <NotebookSection
        title="2b. Contrastive Pretraining"
        description="Explore contrastive learning techniques to build robust multimodal representations that align information across different modalities."
        objectives={[
          'Implement contrastive learning objectives',
          'Create paired datasets for cross-modal training',
          'Design effective data augmentation strategies',
          'Evaluate model performance on zero-shot tasks',
        ]}
        viewLink="/showcase/NvidiaMultimodalAI/notebook/02b-contrastive-pretraining"
        insightsLink="/showcase/NvidiaMultimodalAI/notebook/02b-contrastive-pretraining/insights"
      />

      <NotebookSection
        title="3a. Projection"
        description="Learn about projection techniques that map multimodal data into shared embedding spaces for cross-modal understanding and retrieval."
        objectives={[
          'Implement different projection methods',
          'Analyze embedding space alignment',
          'Perform dimensionality reduction on multimodal data',
          'Evaluate retrieval quality across modalities',
        ]}
        viewLink="/showcase/NvidiaMultimodalAI/notebook/03a-projection"
        insightsLink="/showcase/NvidiaMultimodalAI/notebook/03a-projection/insights"
      />

      <NotebookSection
        title="3b. OCR Pipelines"
        description="Build and optimize Optical Character Recognition (OCR) pipelines for extracting text from images, a critical component in multimodal applications."
        objectives={[
          'Implement end-to-end OCR workflows',
          'Pre-process images for improved text detection',
          'Extract structured information from documents',
          'Handle various document formats and layouts',
        ]}
        viewLink="/showcase/NvidiaMultimodalAI/notebook/03b-ocr-pipelines"
        insightsLink="/showcase/NvidiaMultimodalAI/notebook/03b-ocr-pipelines/insights"
      />

      <NotebookSection
        title="4a. Vector Search Systems"
        description="Explore vector search systems for efficient retrieval and matching of multimodal embeddings at scale."
        objectives={[
          'Build vector indexes for fast similarity search',
          'Implement approximate nearest neighbor algorithms',
          'Optimize query performance for large datasets',
          'Compare different vector database solutions',
        ]}
        viewLink="/showcase/NvidiaMultimodalAI/notebook/04a-vss"
        insightsLink="/showcase/NvidiaMultimodalAI/notebook/04a-vss/insights"
      />

      <NotebookSection
        title="4b. VSS with Graph RAG"
        description="Integrate Vector Search Systems with Graph-based Retrieval Augmented Generation for advanced multimodal reasoning and knowledge retrieval."
        objectives={[
          'Build knowledge graphs from multimodal data',
          'Combine vector search with graph traversal algorithms',
          'Implement multi-hop reasoning over multimodal content',
          'Evaluate retrieval relevance and contextual awareness',
        ]}
        viewLink="/showcase/NvidiaMultimodalAI/notebook/04b-vss-graphrag"
        insightsLink="/showcase/NvidiaMultimodalAI/notebook/04b-vss-graphrag/insights"
      />
    </div>
  )
}
