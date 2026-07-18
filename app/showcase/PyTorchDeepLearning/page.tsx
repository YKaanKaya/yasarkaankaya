import { ShowcaseApp } from './components/ShowcaseApp'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PyTorch for Deep Learning Professional Certificate | Kaan Kaya',
  description: 'Explore my journey through the PyTorch for Deep Learning Professional Certificate by DeepLearning.AI, featuring hands-on projects in computer vision, NLP, model optimization, and deployment.',
  keywords: [
    'PyTorch',
    'deep learning',
    'neural networks',
    'computer vision',
    'NLP',
    'transformers',
    'model optimization',
    'ONNX',
    'MLflow',
    'DeepLearning.AI',
    'AI engineering',
    'machine learning',
    'TorchVision',
    'Hugging Face',
    'model deployment'
  ],
  openGraph: {
    title: 'PyTorch for Deep Learning Professional Certificate | Kaan Kaya',
    description: 'View my implementation of the PyTorch for Deep Learning Professional Certificate with real-world projects and deployment strategies.',
    type: 'website',
    url: 'https://yasarkaankaya.com/showcase/PyTorchDeepLearning'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PyTorch for Deep Learning | Kaan Kaya',
    description: 'My journey through the PyTorch for Deep Learning Professional Certificate with practical implementations.'
  },
  alternates: {
    canonical: 'https://yasarkaankaya.com/showcase/PyTorchDeepLearning'
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function PyTorchDeepLearningPage() {
  return (
    <article className="pytorch-showcase dark" itemScope itemType="https://schema.org/TechArticle">
      <meta itemProp="name" content="PyTorch for Deep Learning Professional Certificate Showcase" />
      <meta itemProp="description" content="My implementation of the PyTorch for Deep Learning Professional Certificate by DeepLearning.AI" />
      <meta itemProp="author" content="Kaan Kaya" />
      <ShowcaseApp />
    </article>
  )
}
