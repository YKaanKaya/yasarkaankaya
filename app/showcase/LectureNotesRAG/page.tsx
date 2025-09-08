import { ShowcaseApp } from './components/ShowcaseApp'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LectureNotes RAG System Showcase | Kaan Kaya',
  description: 'GPU-accelerated Retrieval-Augmented Generation system for intelligent Q&A over lecture notes and academic documents. Features FAISS vector search, multi-format support, and LM Studio integration.',
  keywords: [
    'RAG',
    'Retrieval-Augmented Generation',
    'FAISS',
    'vector database',
    'GPU acceleration',
    'NLP',
    'machine learning',
    'PyTorch',
    'embeddings',
    'semantic search',
    'LM Studio',
    'Python',
    'CUDA',
    'RTX 5090'
  ],
  openGraph: {
    title: 'LectureNotes RAG System | Kaan Kaya',
    description: 'GPU-accelerated RAG system for intelligent Q&A over academic documents with FAISS vector search.',
    type: 'website',
    url: 'https://kaankaya.dev/showcase/LectureNotesRAG',
    images: [
      {
        url: '/images/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'LectureNotes RAG System by Kaan Kaya'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LectureNotes RAG System | Kaan Kaya',
    description: 'GPU-accelerated RAG system for intelligent Q&A over academic documents.',
    images: ['/images/hero-bg.jpg']
  },
  alternates: {
    canonical: 'https://kaankaya.dev/showcase/LectureNotesRAG'
  }
}

export default function LectureNotesRAGShowcase() {
  return <ShowcaseApp />
}