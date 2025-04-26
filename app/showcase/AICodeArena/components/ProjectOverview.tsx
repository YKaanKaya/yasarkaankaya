"use client"

import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

export function ProjectOverview() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold mb-4">Project Overview</h2>
        <Card>
          <CardContent className="p-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg mb-4">
                <strong>AI Code Arena Quest</strong> (PractAI.life) is an educational platform designed to help people practice Machine Learning and AI concepts through interactive exercises and challenges. The project bridges the gap between theoretical knowledge and practical application in AI education.
              </p>
              
              <p className="mb-4">
                The platform offers a structured learning environment where users can:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Work through progressive challenges that build their machine learning and AI skills</li>
                <li>Apply theoretical concepts to practical coding exercises</li>
                <li>Get immediate feedback on their solutions</li>
                <li>Track their progress through different AI and ML topics</li>
                <li>Access resources that enhance their understanding of complex concepts</li>
              </ul>
              
              <p className="mb-4">
                The project was born from the recognition that while there are many theoretical resources for learning AI and machine learning, there's a shortage of hands-on practice platforms specifically designed for reinforcing these concepts through coding exercises.
              </p>
              
              <div className="bg-muted p-4 rounded-md border border-border mb-6">
                <h3 className="text-xl font-semibold mb-2">Project Objectives:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Create an accessible platform for AI and ML practice</li>
                  <li>Provide interactive challenges that reinforce theoretical knowledge</li>
                  <li>Support users at different skill levels in their AI learning journey</li>
                  <li>Build a community of AI and ML practitioners</li>
                  <li>Make advanced AI concepts approachable through practice</li>
                </ul>
              </div>
              
              <p>
                Through PractAI.life, I aimed to create a resource that I wish had existed when I was learning these concepts - a place where theory meets practice in a structured, engaging way.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
      
      <section>
        <h2 className="text-3xl font-bold mb-4">Key Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-border shadow-md card-hover">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Progressive Learning Path</h3>
              <p className="text-muted-foreground">
                Carefully designed learning paths that gradually increase in complexity, allowing users to build on previously learned concepts.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-border shadow-md card-hover">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Interactive Challenges</h3>
              <p className="text-muted-foreground">
                Hands-on coding exercises that apply theoretical AI and ML concepts to practical problems, reinforcing learning through application.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-border shadow-md card-hover">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Instant Feedback</h3>
              <p className="text-muted-foreground">
                Immediate evaluation of submitted solutions, providing users with feedback to help them understand where they went wrong and how to improve.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-border shadow-md card-hover">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Resource Integration</h3>
              <p className="text-muted-foreground">
                Contextual resources and references integrated directly into challenges, allowing users to deepen their understanding without leaving the platform.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
