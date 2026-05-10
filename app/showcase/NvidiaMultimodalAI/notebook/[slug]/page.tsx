import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import NotebookClientWrapper from './NotebookClientWrapper'

// Map slug to notebook details
const notebooks: Record<string, { title: string; file: string }> = {
  '01a-early-and-late-fusion': {
    title: '1a. Early and Late Fusion',
    file: '/notebooks/nvidia-multimodal/01a_Early_and_Late_Fusion.ipynb',
  },
  '01b-exploring-modalities': {
    title: '1b. Exploring Modalities',
    file: '/notebooks/nvidia-multimodal/01b_Exploring_Modalities.ipynb',
  },
  '02a-intermediate-fusion': {
    title: '2a. Intermediate Fusion',
    file: '/notebooks/nvidia-multimodal/02a_Intermediate_Fusion.ipynb',
  },
  '02b-contrastive-pretraining': {
    title: '2b. Contrastive Pretraining',
    file: '/notebooks/nvidia-multimodal/02b_Contrastive_Pretraining.ipynb',
  },
  '03a-projection': {
    title: '3a. Projection',
    file: '/notebooks/nvidia-multimodal/03a_Projection.ipynb',
  },
  '03b-ocr-pipelines': {
    title: '3b. OCR Pipelines',
    file: '/notebooks/nvidia-multimodal/03b_OCR_Pipelines.ipynb',
  },
  '04a-vss': {
    title: '4a. Vector Search Systems',
    file: '/notebooks/nvidia-multimodal/04a_VSS.ipynb',
  },
  '04b-vss-graphrag': {
    title: '4b. VSS with Graph RAG',
    file: '/notebooks/nvidia-multimodal/04b_VSS_GraphRAG.ipynb',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata | undefined> {
  const { slug } = await params
  const nb = notebooks[slug]
  if (!nb) return {}
  return {
    title: `${nb.title} | NVIDIA Multimodal AI Agents Notebook`,
  }
}

// This function tells Next.js which routes to pre-generate at build time
export function generateStaticParams() {
  console.log('Generating static params for NVIDIA notebooks')
  const params = Object.keys(notebooks).map((slug) => ({ slug }))
  console.log('Generated params:', params)
  return params
}

export default async function NotebookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const nb = notebooks[slug]
  if (!nb) {
    notFound()
  }

  return (
    <NotebookClientWrapper
      slug={slug}
      title={nb.title}
      file={nb.file}
    />
  )
}
