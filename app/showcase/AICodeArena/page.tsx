import { ShowcaseApp } from './components/ShowcaseApp'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Code Arena Quest Showcase | Kaan Kaya',
  description: 'Explore the AI Code Arena Quest educational platform designed to help people practice Machine Learning and AI concepts through interactive exercises and challenges.',
  keywords: [
    'AI education',
    'machine learning', 
    'interactive learning', 
    'coding challenges', 
    'AI practice',
    'educational platform',
    'React',
    'JavaScript',
    'AI concepts',
    'learning platform',
    'PractAI.life'
  ],
  openGraph: {
    title: 'AI Code Arena Quest Showcase | Kaan Kaya',
    description: 'Discover PractAI.life, an educational platform for practicing Machine Learning and AI concepts through interactive exercises.',
    type: 'website',
    url: 'https://yasarkaankaya.com/showcase/AICodeArena'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Code Arena Quest | Kaan Kaya',
    description: 'An educational platform for practicing AI and ML concepts with interactive challenges.'
  },
  alternates: {
    canonical: 'https://yasarkaankaya.com/showcase/AICodeArena'
  }
}

export default function AICodeArenaShowcase() {
  return <ShowcaseApp />
}
