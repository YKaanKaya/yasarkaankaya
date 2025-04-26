"use client"

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Code, 
  BarChart, 
  BookOpen, 
  CheckCircle, 
  Users, 
  Trophy, 
  Database, 
  Lightbulb 
} from 'lucide-react'

export function Features() {
  const features = [
    {
      title: "ML Challenge Categories",
      description: "Diverse categories including regression, classification, clustering, NLP, reinforcement learning, and explainable AI.",
      icon: <Code className="h-8 w-8 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Interactive Code Editor",
      description: "Built-in Python code editor with syntax highlighting and real-time execution for machine learning experiments.",
      icon: <Trophy className="h-8 w-8 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Real-world Datasets",
      description: "Access to industry-standard datasets like California Housing, MNIST, and 20 Newsgroups for practical model training.",
      icon: <Database className="h-8 w-8 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Performance Metrics",
      description: "Automatic evaluation using key ML metrics such as accuracy, RMSE, silhouette scores, and precision/recall metrics.",
      icon: <BarChart className="h-8 w-8 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Difficulty Progression",
      description: "Challenges categorized by difficulty (Easy, Medium, Hard) to support learning at all experience levels.",
      icon: <CheckCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Algorithm Exploration",
      description: "Deep dives into fundamental ML algorithms with interactive examples to visualize how they work.",
      icon: <Lightbulb className="h-8 w-8 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Modern User Interface",
      description: "Sleek, responsive design with dark mode support and intuitive navigation for a seamless learning experience.",
      icon: <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Learning Resources",
      description: "Integrated reference materials and documentation to support understanding of complex ML concepts.",
      icon: <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
    }
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-6">Key Features</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border-border shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="mr-4 mt-1">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6">User Experience</h2>
        <Card>
          <CardContent className="p-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg mb-4">
                The AI Code Arena Quest platform has been designed with user experience at its core, providing a seamless learning journey:
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Learning Flow</h3>
              <ol className="list-decimal pl-6 mb-6 space-y-2">
                <li><strong>Exploration of Categories:</strong> Users browse through different ML challenge categories like regression, classification, clustering, and NLP</li>
                <li><strong>Challenge Selection:</strong> Challenges are selected based on difficulty level and ML category of interest</li>
                <li><strong>Interactive Playground:</strong> Users experiment with ML concepts in the code playground before tackling full challenges</li>
                <li><strong>Code Implementation:</strong> Solutions are implemented in the integrated Python editor with ML library support</li>
                <li><strong>Instant Evaluation:</strong> Code execution provides immediate feedback with relevant ML metrics and visualizations</li>
                <li><strong>Progressive Learning:</strong> Users advance through increasingly complex ML concepts and techniques</li>
              </ol>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Platform Features</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Dark mode support with a modern UI built on Tailwind CSS</li>
                <li>High-contrast mode for better readability</li>
                <li>Keyboard navigation for all features</li>
                <li>Alternative text descriptions for visualizations</li>
                <li>Customizable learning pace and difficulty levels</li>
              </ul>
              
              <p>
                By combining these features with a clean, intuitive interface, AI Code Arena Quest creates an engaging environment that keeps users motivated through their AI learning journey.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
