"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Github, ExternalLink } from 'lucide-react'

export function ProjectDemo() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Project Demonstrations</h2>
        <p className="text-muted-foreground">
          The Machine Learning Specialization includes practical implementations and demo projects through Jupyter notebooks. 
          These assignments cover a wide range of machine learning concepts from basic regression to advanced reinforcement learning.
        </p>
      </div>

      <Tabs defaultValue="course1" className="mb-8">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="course1">Supervised Learning</TabsTrigger>
          <TabsTrigger value="course2">Advanced Algorithms</TabsTrigger>
          <TabsTrigger value="course3">Unsupervised & RL</TabsTrigger>
        </TabsList>
        
        <TabsContent value="course1">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Course 1: Supervised Machine Learning</h3>
            <p className="text-muted-foreground">
              This course covers the fundamentals of supervised learning, focusing on regression and classification.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Week 1 Assignment */}
            <Card className="card-hover transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Linear Regression
                  <Badge variant="outline" className="ml-2">Week 1</Badge>
                </CardTitle>
                <CardDescription>
                  Implementing linear regression from scratch with gradient descent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-r from-blue-400 to-teal-500 flex items-center justify-center text-white p-4 text-center">
                    <div>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-16 w-16 mx-auto mb-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <h3 className="text-xl font-bold">Linear Regression</h3>
                      <p className="mt-2 text-sm">Gradient Descent Optimization</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm mb-3">
                  This assignment implements linear regression with one variable to predict profits for a food truck business.
                  The implementation includes:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Computing the cost function</li>
                  <li>Implementing gradient descent optimization</li>
                  <li>Visualizing the learning process</li>
                  <li>Making predictions on new data</li>
                </ul>
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full flex items-center gap-2">
                    <a href="https://github.com/YKaanKaya/Machine-learning/blob/main/C1%20-%20Supervised%20Machine%20Learning/week1/C1_W1_Lab03_Model_Representation_Soln.ipynb" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" /> View Notebook
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Week 2 Assignment */}
            <Card className="card-hover transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Multiple Linear Regression
                  <Badge variant="outline" className="ml-2">Week 2</Badge>
                </CardTitle>
                <CardDescription>
                  Linear regression with multiple features and feature engineering
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-r from-green-400 to-cyan-500 flex items-center justify-center text-white p-4 text-center">
                    <div>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-16 w-16 mx-auto mb-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                      <h3 className="text-xl font-bold">Multiple Linear Regression</h3>
                      <p className="mt-2 text-sm">Feature Engineering & Normalization</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm mb-3">
                  This assignment extends linear regression to handle multiple features for house price prediction.
                  Key implementations include:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Vectorized cost function computation</li>
                  <li>Feature normalization</li>
                  <li>Polynomial feature generation</li>
                  <li>Regularization techniques</li>
                </ul>
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full flex items-center gap-2">
                    <a href="https://github.com/YKaanKaya/Machine-learning/blob/main/C1%20-%20Supervised%20Machine%20Learning/week2/C1_W2_Linear_Regression.ipynb" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" /> View Notebook
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Week 3 Assignment */}
            <Card className="card-hover transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Logistic Regression
                  <Badge variant="outline" className="ml-2">Week 3</Badge>
                </CardTitle>
                <CardDescription>
                  Binary classification with logistic regression
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white p-4 text-center">
                    <div>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-16 w-16 mx-auto mb-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <h3 className="text-xl font-bold">Logistic Regression</h3>
                      <p className="mt-2 text-sm">Binary Classification</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm mb-3">
                  This assignment implements logistic regression for binary classification to predict whether a student will be admitted to university.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Sigmoid function implementation</li>
                  <li>Cross-entropy loss function</li>
                  <li>Decision boundary visualization</li>
                  <li>Regularization to prevent overfitting</li>
                </ul>
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full flex items-center gap-2">
                    <a href="https://github.com/YKaanKaya/Machine-learning/blob/main/C1%20-%20Supervised%20Machine%20Learning/week3/C1_W3_Logistic_Regression.ipynb" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" /> View Notebook
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="course2">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Course 2: Advanced Learning Algorithms</h3>
            <p className="text-muted-foreground">
              This course focuses on neural networks, decision trees, and practical ML advice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Week 1 Assignment - Neural Networks */}
            <Card className="card-hover transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Neural Networks
                  <Badge variant="outline" className="ml-2">Week 1</Badge>
                </CardTitle>
                <CardDescription>
                  Building and implementing neural networks from scratch and with TensorFlow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-r from-pink-500 to-orange-400 flex items-center justify-center text-white p-4 text-center">
                    <div>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-16 w-16 mx-auto mb-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                      </svg>
                      <h3 className="text-xl font-bold">Neural Networks</h3>
                      <p className="mt-2 text-sm">Building Deep Learning Models</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm mb-3">
                  This assignment implements neural networks for binary classification, including a coffee roasting example.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>TensorFlow model implementation</li>
                  <li>Forward propagation calculations</li>
                  <li>Neural network architecture design</li>
                  <li>Binary classification with neural networks</li>
                </ul>
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full flex items-center gap-2">
                    <a href="https://github.com/YKaanKaya/Machine-learning/blob/main/C2%20-%20Advanced%20Learning%20Algorithms/week1/C2W1A1/C2_W1_Assignment.ipynb" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" /> View Notebook
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Week 2 Assignment - Neural Network Training */}
            <Card className="card-hover transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Neural Network Training
                  <Badge variant="outline" className="ml-2">Week 2</Badge>
                </CardTitle>
                <CardDescription>
                  Training techniques for neural networks and multiclass classification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-500 flex items-center justify-center text-white p-4 text-center">
                    <div>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-16 w-16 mx-auto mb-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <h3 className="text-xl font-bold">Neural Network Training</h3>
                      <p className="mt-2 text-sm">Backpropagation & Optimization</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm mb-3">
                  This assignment focuses on training neural networks effectively and implementing multiclass classification.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Backpropagation algorithm</li>
                  <li>TensorFlow training loops</li>
                  <li>Softmax activation for multiclass problems</li>
                  <li>Training and validation monitoring</li>
                </ul>
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full flex items-center gap-2">
                    <a href="https://github.com/YKaanKaya/Machine-learning/blob/main/C2%20-%20Advanced%20Learning%20Algorithms/week2/C2W2A1/C2_W2_Assignment.ipynb" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" /> View Notebook
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Week 3 Assignment - Machine Learning Advice */}
            <Card className="card-hover transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ML Best Practices
                  <Badge variant="outline" className="ml-2">Week 3</Badge>
                </CardTitle>
                <CardDescription>
                  Advice for applying machine learning and diagnosing issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-r from-teal-400 to-green-500 flex items-center justify-center text-white p-4 text-center">
                    <div>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-16 w-16 mx-auto mb-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-xl font-bold">ML Best Practices</h3>
                      <p className="mt-2 text-sm">Bias, Variance & Error Analysis</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm mb-3">
                  This assignment covers practical advice for diagnosing and fixing issues in machine learning systems.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Bias and variance analysis</li>
                  <li>Learning curves interpretation</li>
                  <li>Error analysis techniques</li>
                  <li>Improving model performance</li>
                </ul>
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full flex items-center gap-2">
                    <a href="https://github.com/YKaanKaya/Machine-learning/blob/main/C2%20-%20Advanced%20Learning%20Algorithms/week3/C2W3A1/C2_W3_Assignment.ipynb" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" /> View Notebook
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Week 4 Assignment - Decision Trees */}
            <Card className="card-hover transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Decision Trees
                  <Badge variant="outline" className="ml-2">Week 4</Badge>
                </CardTitle>
                <CardDescription>
                  Implementation of decision trees and ensemble methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-lime-600 flex items-center justify-center text-white p-4 text-center">
                    <div>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-16 w-16 mx-auto mb-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                      </svg>
                      <h3 className="text-xl font-bold">Decision Trees</h3>
                      <p className="mt-2 text-sm">Classification & Ensemble Methods</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm mb-3">
                  This assignment teaches decision tree algorithms and ensemble methods like random forests.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Decision tree learning</li>
                  <li>Information gain calculation</li>
                  <li>Tree visualization and interpretation</li>
                  <li>Random forests implementation</li>
                </ul>
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full flex items-center gap-2">
                    <a href="https://github.com/YKaanKaya/Machine-learning/blob/main/C2%20-%20Advanced%20Learning%20Algorithms/week4/C2W4A1/C2_W4_Decision_Tree_with_Markdown.ipynb" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" /> View Notebook
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="course3">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Course 3: Unsupervised, Recommender Systems & Reinforcement Learning</h3>
            <p className="text-muted-foreground">
              This course covers more advanced topics including clustering, recommendation systems, and reinforcement learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Week 1 Assignment - Unsupervised Learning */}
            <Card className="card-hover transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Clustering Algorithms
                  <Badge variant="outline" className="ml-2">Week 1</Badge>
                </CardTitle>
                <CardDescription>
                  K-means clustering and anomaly detection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
                  <Image 
                    src="https://miro.medium.com/v2/resize:fit:1100/1*tWaaZX75oumVwBMcKN-eHA.png" 
                    alt="K-means Clustering"
                    width={500}
                    height={281}
                    className="rounded-md object-cover"
                    unoptimized={true}
                  />
                </div>
                <p className="text-sm mb-3">
                  This assignment implements unsupervised learning algorithms for clustering and anomaly detection.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>K-means algorithm implementation</li>
                  <li>Centroid assignment and update steps</li>
                  <li>Gaussian models for anomaly detection</li>
                  <li>Evaluating clustering performance</li>
                </ul>
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full flex items-center gap-2">
                    <a href="https://github.com/YKaanKaya/Machine-learning/blob/main/C3%20-%20Unsupervised%20Learning%2C%20Recommenders%2C%20Reinforcement%20Learning/week1/C3W1A1/C3_W1_KMeans_Assignment.ipynb" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" /> View Notebook
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Week 2 Assignment - Recommender Systems */}
            <Card className="card-hover transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Recommender Systems
                  <Badge variant="outline" className="ml-2">Week 2</Badge>
                </CardTitle>
                <CardDescription>
                  Building movie recommendation engines with collaborative filtering
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 aspect-video bg-muted rounded-md overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white p-4 text-center">
                    <div>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-16 w-16 mx-auto mb-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h18M3 16h18" />
                      </svg>
                      <h3 className="text-xl font-bold">Movie Recommender System</h3>
                      <p className="mt-2 text-sm">Collaborative Filtering & Content-Based Approaches</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm mb-3">
                  This assignment implements a movie recommender system using collaborative filtering algorithms.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Collaborative filtering cost function</li>
                  <li>Content-based recommendation approaches</li>
                  <li>Matrix factorization techniques</li>
                  <li>Evaluating recommendation quality</li>
                </ul>
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full flex items-center gap-2">
                    <a href="https://github.com/YKaanKaya/Machine-learning/blob/main/C3%20-%20Unsupervised%20Learning%2C%20Recommenders%2C%20Reinforcement%20Learning/week2/C3W2A1/C3_W2_Collaborative_RecSys_Assignment.ipynb" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" /> View Notebook
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Week 3 Assignment - Reinforcement Learning */}
            <Card className="card-hover transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Reinforcement Learning
                  <Badge variant="outline" className="ml-2">Week 3</Badge>
                </CardTitle>
                <CardDescription>
                  Deep Q-Learning for training the Lunar Lander
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 aspect-video bg-muted rounded-md flex items-center justify-center">
                  <Image 
                    src="https://gymnasium.farama.org/_images/lunar_lander.gif" 
                    alt="Lunar Lander Simulation"
                    width={600}
                    height={338}
                    className="rounded-md"
                    unoptimized={true}
                  />
                </div>
                <p className="text-sm mb-3">
                  This assignment implements reinforcement learning algorithms to train an agent to land a lunar module safely.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Deep Q-Network (DQN) implementation</li>
                  <li>Experience replay buffer</li>
                  <li>Target network for stable learning</li>
                  <li>ε-greedy policy for exploration</li>
                </ul>
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full flex items-center gap-2">
                    <a href="https://github.com/YKaanKaya/Machine-learning/blob/main/C3%20-%20Unsupervised%20Learning%2C%20Recommenders%2C%20Reinforcement%20Learning/week3/C3W3A1/C3_W3_A1_Assignment.ipynb" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" /> View Notebook
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="p-4 bg-secondary/20 rounded-lg mt-8">
        <h3 className="font-medium mb-2 flex items-center">
          <Github className="mr-2 h-5 w-5" /> Complete Repository Access
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          All Jupyter notebooks, code implementations, and assignments are available in the GitHub repository.
          Browse the full collection to see detailed implementations of machine learning algorithms and techniques.
        </p>
        <Button asChild variant="default" className="w-full sm:w-auto">
          <a href="https://github.com/YKaanKaya/Machine-learning" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <Github className="h-4 w-4" /> Visit Full Repository
          </a>
        </Button>
      </div>
    </div>
  )
} 