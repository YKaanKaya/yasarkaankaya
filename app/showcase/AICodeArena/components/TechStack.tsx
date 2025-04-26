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
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' }
      ]
    },
    {
      category: 'Backend',
      technologies: [
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' }
      ]
    },
    {
      category: 'AI & ML',
      technologies: [
        { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'Jupyter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' }
      ]
    },
    {
      category: 'Tools & Deployment',
      technologies: [
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
        { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' }
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
                The AI Code Arena Quest platform was designed with a modern architecture that separates concerns while maintaining optimal performance:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>React Frontend:</strong> Responsive and interactive UI that handles user interactions and presents challenges</li>
                <li><strong>Node.js Backend:</strong> RESTful API that manages user progression, authentication, and serves challenge content</li>
                <li><strong>MongoDB Database:</strong> Stores user data, challenge configurations, and tracks user progress</li>
                <li><strong>ML Evaluation System:</strong> Assesses user code submissions against expected outcomes using TensorFlow</li>
                <li><strong>Cloud Deployment:</strong> Scalable infrastructure on AWS to handle varying loads and ensure consistent performance</li>
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
