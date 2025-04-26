"use client"

import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

export function TechStack() {
  const techStack = [
    {
      category: 'Frontend',
      technologies: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'Tailwind CSS', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' },
        { name: 'Vite', icon: 'https://vitejs.dev/logo.svg' }
      ]
    },
    {
      category: 'Backend',
      technologies: [
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'FastAPI', icon: 'https://cdn.worldvectorlogo.com/logos/fastapi-1.svg' },
        { name: 'Supabase', icon: 'https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png' }
      ]
    },
    {
      category: 'AI & ML',
      technologies: [
        { name: 'scikit-learn', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg' },
        { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
        { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' }
      ]
    },
    {
      category: 'Tools & Deployment',
      technologies: [
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'Netlify', icon: 'https://www.netlify.com/v3/img/components/logomark.png' },
        { name: 'Vite', icon: 'https://vitejs.dev/logo.svg' }
      ]
    }
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-6">Technology Stack</h2>
      <p className="text-lg mb-8">
        AI Code Arena Quest was built using modern web technologies and AI/ML frameworks. Each technology was chosen to create an optimal learning environment that balances performance with educational value.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {techStack.map((category, index) => (
          <Card key={index} className="border-border shadow-md">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {category.technologies.map((tech, techIndex) => (
                  <div key={techIndex} className="flex flex-col items-center justify-center">
                    <div className="h-16 w-16 relative bg-background rounded-full p-3 mb-2 flex items-center justify-center">
                      <Image
                        src={tech.icon}
                        alt={`${tech.name} icon`}
                        width={40}
                        height={40}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <span className="text-sm text-center">{tech.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Architecture Overview</h2>
        <Card>
          <CardContent className="p-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="mb-4">
                The AI Code Arena Quest platform was built with a modern architecture that separates concerns while ensuring optimal performance and user experience:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>React + TypeScript Frontend:</strong> Responsive and interactive UI built with modern React patterns, TypeScript for type safety, and Tailwind CSS for styling</li>
                <li><strong>Python Backend:</strong> FastAPI service that handles code execution, evaluation of ML solutions, and provides challenge data</li>
                <li><strong>Supabase Integration:</strong> Handles authentication, user progress tracking, and data storage with PostgreSQL</li>
                <li><strong>Interactive Code Editor:</strong> Custom code editor with syntax highlighting and execution capabilities for Python ML code</li>
                <li><strong>ML Evaluation System:</strong> Evaluates user code submissions against expected outcomes using scikit-learn and TensorFlow</li>
                <li><strong>Netlify Deployment:</strong> Continuous deployment pipeline that ensures the latest features are always available</li>
              </ul>
              
              <p>
                This architecture enables a seamless learning experience where users can focus on the challenges without being hindered by technical limitations.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
