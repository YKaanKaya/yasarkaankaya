import { ShowcaseApp } from './components/ShowcaseApp'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Machine Learning Specialization Showcase | Kaan Kaya',
  description: 'Explore my implementation of Andrew Ng\'s Machine Learning Specialization, featuring projects in supervised learning, neural networks, recommender systems, and reinforcement learning.',
  keywords: [
    'machine learning',
    'deep learning', 
    'neural networks', 
    'TensorFlow', 
    'Python', 
    'Andrew Ng',
    'supervised learning',
    'unsupervised learning',
    'reinforcement learning',
    'data science',
    'Coursera specialization',
    'ML projects'
  ],
  openGraph: {
    title: 'Machine Learning Specialization Showcase | Kaan Kaya',
    description: 'View my implementation of Andrew Ng\'s Machine Learning Specialization with interactive demos and code examples.',
    type: 'website',
    url: 'https://kaankaya.dev/showcase/MachineLearning',
    images: [
      {
        url: '/images/hero-bg.jpg', // Using an existing image in your public folder
        width: 1200,
        height: 630,
        alt: 'Machine Learning Specialization by Kaan Kaya'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Machine Learning Specialization | Kaan Kaya',
    description: 'My journey through Andrew Ng\'s ML Specialization with practical implementations and projects.',
    images: ['/images/hero-bg.jpg']
  },
  alternates: {
    canonical: 'https://kaankaya.dev/showcase/MachineLearning'
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function MachineLearningPage() {
  return (
    <article className="machine-learning-showcase" itemScope itemType="https://schema.org/TechArticle">
      <meta itemProp="name" content="Machine Learning Specialization Showcase" />
      <meta itemProp="description" content="My implementation of Andrew Ng's Machine Learning Specialization" />
      <meta itemProp="author" content="Kaan Kaya" />
      <ShowcaseApp />
    </article>
  )
} 