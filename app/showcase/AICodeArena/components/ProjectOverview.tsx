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
                <strong>AI Code Arena Quest</strong> (PractAI.life) is an educational platform designed to help people practice Machine Learning and AI concepts through interactive coding challenges with real-world datasets. The project transforms abstract ML theory into hands-on practice while providing immediate feedback through performance metrics.
              </p>
              
              <p className="mb-4">
                The platform provides a comprehensive learning environment where users can:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Tackle diverse ML challenges across regression, classification, clustering, NLP, and more</li>
                <li>Write and execute Python code in an integrated development environment</li>
                <li>Work with industry-standard datasets like California Housing, MNIST, and 20 Newsgroups</li>
                <li>Receive automated evaluation using relevant ML metrics (RMSE, accuracy, silhouette scores)</li>
                <li>Progress through difficulty levels from beginner to advanced ML concepts</li>
                <li>Experiment in a dedicated ML playground before taking on structured challenges</li>
              </ul>
              
              <p className="mb-4">
                The project was developed to address the gap between theoretical machine learning education and practical implementation skills. While many resources teach the math and concepts behind ML algorithms, AI Code Arena Quest focuses on building the coding proficiency needed to apply these concepts effectively.
              </p>
              
              <div className="bg-muted p-4 rounded-md border border-border mb-6">
                <h3 className="text-xl font-semibold mb-2">Project Objectives:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Create a code-first platform for applied machine learning practice</li>
                  <li>Develop an interactive editor with real-time Python code execution</li>
                  <li>Implement automated evaluation of ML model performance</li>
                  <li>Provide learning paths across major ML paradigms (supervised, unsupervised, reinforcement)</li>
                  <li>Showcase best practices in ML model implementation and evaluation</li>
                  <li>Make advanced ML concepts tangible through hands-on implementation</li>
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
              <h3 className="text-xl font-semibold mb-2">ML Algorithm Categories</h3>
              <p className="text-muted-foreground">
                Comprehensive coverage of major ML paradigms including regression, classification, clustering, NLP, reinforcement learning, and explainable AI, each with tailored challenges.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-border shadow-md card-hover">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Interactive Python Execution</h3>
              <p className="text-muted-foreground">
                Built-in code editor with Python execution capabilities, allowing users to write, test, and refine ML code with immediate execution results.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-border shadow-md card-hover">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Performance Metrics</h3>
              <p className="text-muted-foreground">
                Automatic evaluation of ML models using industry-standard metrics like RMSE, R-squared, accuracy, precision, recall, and silhouette scores.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-border shadow-md card-hover">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Curated ML Datasets</h3>
              <p className="text-muted-foreground">
                Access to carefully selected ML datasets like California Housing, MNIST digits, clustering datasets, and text corpora to practice with realistic data.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
