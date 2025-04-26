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
      title: "Interactive Coding Challenges",
      description: "Hands-on practice with interactive coding exercises that test understanding of AI and ML concepts.",
      icon: <Code className="h-8 w-8 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Progressive Learning Path",
      description: "Structured learning progression from fundamental concepts to advanced AI applications.",
      icon: <Trophy className="h-8 w-8 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Real-time Feedback",
      description: "Immediate evaluation of submissions with detailed feedback to accelerate learning.",
      icon: <CheckCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Visualization Tools",
      description: "Interactive visualizations that help understand complex AI algorithms and their outputs.",
      icon: <BarChart className="h-8 w-8 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Reference Materials",
      description: "Integrated resources and documentation to support understanding of theoretical concepts.",
      icon: <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Community Features",
      description: "Discussion forums and collaborative learning opportunities for connecting with peers.",
      icon: <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Dataset Exploration",
      description: "Access to real-world datasets for practical application of ML techniques.",
      icon: <Database className="h-8 w-8 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Concept Explanations",
      description: "Clear explanations of complex AI and ML concepts with practical examples.",
      icon: <Lightbulb className="h-8 w-8 text-blue-600 dark:text-blue-400" />
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
                <li><strong>Concept Introduction:</strong> Each challenge begins with a clear explanation of the AI or ML concept being taught</li>
                <li><strong>Interactive Example:</strong> Users can interact with examples that demonstrate the concept in action</li>
                <li><strong>Challenge Presentation:</strong> A coding challenge is presented with clear requirements and expected outcomes</li>
                <li><strong>Code Submission:</strong> Users write and submit their solution in an integrated coding environment</li>
                <li><strong>Feedback Loop:</strong> Immediate evaluation with detailed feedback on what works and what needs improvement</li>
                <li><strong>Knowledge Reinforcement:</strong> Additional resources and extension challenges to deepen understanding</li>
              </ol>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Accessibility Features</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Responsive design that works across devices</li>
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
