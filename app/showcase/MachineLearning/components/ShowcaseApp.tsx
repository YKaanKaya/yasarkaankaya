"use client"

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Github } from 'lucide-react'
import Link from 'next/link'
import { CourseContent } from './CourseContent'
import { TechStack } from './TechStack'
import { ProjectDemo } from './ProjectDemo'
import { GitHubRepo } from './GitHubRepo'

export function ShowcaseApp() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" className="mr-2">
            <Link href="/"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <h1 className="text-3xl font-bold">Machine Learning Specialization</h1>
        </div>
        <Button asChild variant="outline" size="sm" className="gap-2">
          <a href="https://github.com/YKaanKaya/Machine-learning" target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4" /> View on GitHub
          </a>
        </Button>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <p className="text-lg text-muted-foreground mb-6">
            This showcase presents my journey through the Machine Learning Specialization courses by Andrew Ng on Coursera.
            It includes notes, implementations, and demonstrations of core machine learning concepts, from fundamental 
            supervised learning algorithms to advanced techniques in reinforcement learning.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card className="bg-secondary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">3 Comprehensive Courses</h3>
                <p className="text-sm text-muted-foreground">
                  From regression and classification to advanced neural networks and reinforcement learning
                </p>
              </CardContent>
            </Card>
            <Card className="bg-secondary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Practical Implementations</h3>
                <p className="text-sm text-muted-foreground">
                  Hands-on code examples and projects built using Python, NumPy, TensorFlow, and scikit-learn
                </p>
              </CardContent>
            </Card>
            <Card className="bg-secondary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Interactive Demos</h3>
                <p className="text-sm text-muted-foreground">
                  See machine learning algorithms in action with demonstrations like the Lunar Lander
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="course1">Course 1</TabsTrigger>
          <TabsTrigger value="course2">Course 2</TabsTrigger>
          <TabsTrigger value="course3">Course 3</TabsTrigger>
          <TabsTrigger value="demos">Project Demos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Machine Learning Specialization</h2>
                  <p className="mb-4">
                    This specialization covers a broad range of machine learning topics, 
                    from basic algorithms to advanced techniques. The curriculum is designed by 
                    Andrew Ng and offered through Coursera, consisting of three courses:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Course 1:</strong> Supervised Machine Learning: Regression and Classification</li>
                    <li><strong>Course 2:</strong> Advanced Learning Algorithms</li>
                    <li><strong>Course 3:</strong> Unsupervised Learning, Recommenders, Reinforcement Learning</li>
                  </ul>
                  <p>
                    The specialization provides both theoretical knowledge and practical skills through 
                    programming assignments and projects. This showcase demonstrates key concepts and 
                    implementations from each course.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div>
              <TechStack />
              <GitHubRepo 
                url="https://github.com/YKaanKaya/Machine-learning" 
                description="Repository containing all course materials, implementations, and notes" 
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="course1">
          <CourseContent 
            title="Supervised Machine Learning: Regression and Classification"
            description="This course introduces fundamental concepts of machine learning, focusing on supervised learning algorithms for regression and classification problems."
            weeks={[
              {
                title: "Week 1: Introduction to Machine Learning",
                topics: ["Linear Regression with One Variable", "Cost Function", "Gradient Descent"],
                labs: ["Model Representation", "Cost Function", "Gradient Descent"]
              },
              {
                title: "Week 2: Linear Regression with Multiple Variables",
                topics: ["Multiple Features", "Feature Scaling", "Polynomial Regression", "Normal Equation"],
                labs: ["Multiple Linear Regression", "Feature Engineering", "Scikit-Learn Implementation"]
              },
              {
                title: "Week 3: Logistic Regression and Regularization",
                topics: ["Classification Problems", "Logistic Regression", "Decision Boundary", "Overfitting", "Regularization"],
                labs: ["Logistic Regression", "Decision Boundaries", "Regularization Techniques"]
              }
            ]}
          />
        </TabsContent>
        
        <TabsContent value="course2">
          <CourseContent 
            title="Advanced Learning Algorithms"
            description="This course builds on the fundamentals, diving into neural networks, decision trees, and practical advice for building machine learning systems."
            weeks={[
              {
                title: "Week 1: Neural Networks",
                topics: ["Neural Network Intuition", "TensorFlow Implementation", "Activation Functions"],
                labs: ["Building Neural Networks", "Coffee Roasting Example", "Binary Classification"]
              },
              {
                title: "Week 2: Neural Network Training",
                topics: ["Training Process", "Activation Functions", "Multiclass Classification", "Backpropagation"],
                labs: ["ReLU Implementation", "Softmax Function", "Handwritten Digit Recognition"]
              },
              {
                title: "Week 3: Advice for Applied Machine Learning",
                topics: ["Evaluating Models", "Bias and Variance", "Learning Curves", "Error Analysis"],
                labs: ["Diagnosing Bias/Variance Issues", "Improving Model Performance"]
              },
              {
                title: "Week 4: Decision Trees",
                topics: ["Decision Tree Learning", "Information Gain", "Tree Ensembles", "Random Forests"],
                labs: ["Decision Tree Implementation", "Random Forest Models"]
              }
            ]}
          />
        </TabsContent>
        
        <TabsContent value="course3">
          <CourseContent 
            title="Unsupervised Learning, Recommenders, Reinforcement Learning"
            description="This course explores advanced topics including clustering, recommender systems, and reinforcement learning."
            weeks={[
              {
                title: "Week 1: Unsupervised Learning",
                topics: ["Clustering Algorithms", "K-means Clustering", "Anomaly Detection", "Gaussian Models"],
                labs: ["K-means Implementation", "Anomaly Detection Systems"]
              },
              {
                title: "Week 2: Recommender Systems",
                topics: ["Collaborative Filtering", "Content-based Filtering", "Deep Learning for Recommendations"],
                labs: ["Building a Movie Recommender", "Neural Network Recommenders"]
              },
              {
                title: "Week 3: Reinforcement Learning",
                topics: ["Markov Decision Processes", "Q-Learning", "State-Action Value Function", "Deep Q-Learning"],
                labs: ["Deep Q-Learning - Lunar Lander Application"]
              }
            ]}
          />
        </TabsContent>
        
        <TabsContent value="demos">
          <ProjectDemo />
        </TabsContent>
      </Tabs>
    </div>
  )
} 