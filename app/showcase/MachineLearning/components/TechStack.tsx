"use client"

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

export function TechStack() {
  const technologies = [
    {
      name: 'Python',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      description: 'Primary programming language'
    },
    {
      name: 'NumPy',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
      description: 'Scientific computing library'
    },
    {
      name: 'TensorFlow',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg',
      description: 'Deep learning framework'
    },
    {
      name: 'scikit-learn',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg',
      description: 'Machine learning library'
    },
    {
      name: 'Jupyter',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg',
      description: 'Interactive computing'
    }
  ]

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <h3 className="font-semibold mb-4">Technologies</h3>
        <div className="space-y-3">
          {technologies.map((tech, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-secondary rounded-md p-1">
                <Image
                  src={tech.icon}
                  alt={`${tech.name} logo`}
                  width={24}
                  height={24}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-medium">{tech.name}</p>
                <p className="text-xs text-muted-foreground">{tech.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 