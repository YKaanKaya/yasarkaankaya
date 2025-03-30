"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'

export function ProjectDemo() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Project Demonstrations</h2>
        <p className="text-muted-foreground">
          The Machine Learning Specialization includes practical implementations and demo projects. 
          Here are some of the highlight projects from the courses.
        </p>
      </div>

      <Tabs defaultValue="lunar-lander" className="mb-8">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="lunar-lander">Lunar Lander</TabsTrigger>
          <TabsTrigger value="movie-recommender">Movie Recommender</TabsTrigger>
          <TabsTrigger value="neural-networks">Neural Networks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lunar-lander">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Deep Q-Learning: Lunar Lander</CardTitle>
                <CardDescription>
                  A reinforcement learning project using Deep Q-Learning to train an AI agent to land a lunar module
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 aspect-video bg-muted rounded-md flex items-center justify-center">
                  <Image 
                    src="https://miro.medium.com/v2/resize:fit:1400/1*mdUPKzrfJFuXa4-ntzMBww.png" 
                    alt="Lunar Lander Simulation"
                    width={600}
                    height={338}
                    className="rounded-md"
                  />
                </div>
                <p className="text-sm mb-3">
                  The Lunar Lander is a classic reinforcement learning environment where an agent must learn to 
                  land a spacecraft safely on a landing pad. Using Deep Q-Learning, this agent was trained over many
                  episodes to:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Control thrust and rotation of the lander</li>
                  <li>Navigate to the landing zone</li>
                  <li>Land gently while maintaining correct orientation</li>
                  <li>Maximize fuel efficiency</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Implementation Details</CardTitle>
                <CardDescription>
                  Key technical aspects of the Lunar Lander reinforcement learning model
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Neural Network Architecture</h4>
                  <p className="text-sm text-muted-foreground">
                    The agent uses a deep neural network with:
                  </p>
                  <ul className="text-sm list-disc pl-6 space-y-1">
                    <li>Input layer matching the state space dimensions</li>
                    <li>Two hidden layers with ReLU activation</li>
                    <li>Output layer for Q-values of each possible action</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Training Strategy</h4>
                  <p className="text-sm text-muted-foreground">
                    The model was trained using:
                  </p>
                  <ul className="text-sm list-disc pl-6 space-y-1">
                    <li>Experience replay to improve sample efficiency</li>
                    <li>ε-greedy policy for exploration/exploitation balance</li>
                    <li>Target network for stable learning</li>
                    <li>Learning rate decay to fine-tune late-stage learning</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Performance</h4>
                  <p className="text-sm text-muted-foreground">
                    After training, the agent successfully:
                  </p>
                  <ul className="text-sm list-disc pl-6 space-y-1">
                    <li>Achieves consistent safe landings</li>
                    <li>Adapts to slight variations in starting conditions</li>
                    <li>Remains stable during descent</li>
                    <li>Demonstrates human-like piloting behavior</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="movie-recommender">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Movie Recommender System</CardTitle>
                <CardDescription>
                  Building recommendation systems using collaborative filtering and content-based approaches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 aspect-video bg-muted rounded-md flex items-center justify-center">
                  <Image 
                    src="https://miro.medium.com/v2/resize:fit:1200/1*K8hxFECrDtLzXRMJsEoWkA.jpeg" 
                    alt="Movie Recommender System"
                    width={600}
                    height={338}
                    className="rounded-md"
                  />
                </div>
                <p className="text-sm mb-3">
                  The movie recommender system demonstrates how to build personalized recommendation engines.
                  The system combines multiple techniques to provide accurate movie suggestions based on:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>User viewing and rating history</li>
                  <li>Movie content attributes (genre, actors, directors)</li>
                  <li>Similarity between user preferences</li>
                  <li>Trending and popularity metrics</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recommendation Algorithms</CardTitle>
                <CardDescription>
                  The system implements multiple recommendation techniques
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Collaborative Filtering</h4>
                  <p className="text-sm text-muted-foreground">
                    This approach finds similar users and recommends movies they enjoyed:
                  </p>
                  <ul className="text-sm list-disc pl-6 space-y-1">
                    <li>User-user collaborative filtering</li>
                    <li>Matrix factorization to identify latent factors</li>
                    <li>Handling cold-start problems for new users</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Content-Based Filtering</h4>
                  <p className="text-sm text-muted-foreground">
                    These algorithms recommend movies similar to ones you've enjoyed:
                  </p>
                  <ul className="text-sm list-disc pl-6 space-y-1">
                    <li>Feature extraction from movie metadata</li>
                    <li>TF-IDF vectorization of movie descriptions</li>
                    <li>Cosine similarity calculations</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Neural Network Implementation</h4>
                  <p className="text-sm text-muted-foreground">
                    Advanced recommender using deep learning:
                  </p>
                  <ul className="text-sm list-disc pl-6 space-y-1">
                    <li>Embedding layers for users and movies</li>
                    <li>Neural collaborative filtering architecture</li>
                    <li>Hybrid model combining collaborative and content signals</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="neural-networks">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Neural Network Applications</CardTitle>
                <CardDescription>
                  Exploring various neural network architectures and applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 aspect-video bg-muted rounded-md flex items-center justify-center">
                  <Image 
                    src="https://www.researchgate.net/publication/336805909/figure/fig1/AS:817888827023360@1572011300751/Convolutional-Neural-Network-CNN-architecture.png" 
                    alt="Neural Network Architecture"
                    width={600}
                    height={338}
                    className="rounded-md"
                  />
                </div>
                <p className="text-sm mb-3">
                  Throughout the specialization, several neural network architectures are implemented 
                  for different applications, including:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Binary classification for simple yes/no predictions</li>
                  <li>Multiclass classification for handwritten digit recognition</li>
                  <li>Regularization techniques to prevent overfitting</li>
                  <li>Custom activation functions for specialized tasks</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Implementation Highlights</CardTitle>
                <CardDescription>
                  Key neural network implementations from the specialization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Handwritten Digit Recognition</h4>
                  <p className="text-sm text-muted-foreground">
                    A neural network model that recognizes handwritten digits with high accuracy:
                  </p>
                  <ul className="text-sm list-disc pl-6 space-y-1">
                    <li>Preprocessing of the MNIST dataset</li>
                    <li>Implementation of softmax output layer</li>
                    <li>Gradient descent optimization</li>
                    <li>Accuracy evaluation and confusion matrix analysis</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Coffee Roasting Example</h4>
                  <p className="text-sm text-muted-foreground">
                    A binary classification model to determine optimal coffee roasting parameters:
                  </p>
                  <ul className="text-sm list-disc pl-6 space-y-1">
                    <li>Feature engineering for temperature and duration</li>
                    <li>Neural network implementation from scratch</li>
                    <li>Decision boundary visualization</li>
                    <li>Model training and evaluation</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">TensorFlow Implementation</h4>
                  <p className="text-sm text-muted-foreground">
                    Modern TensorFlow implementations of neural networks:
                  </p>
                  <ul className="text-sm list-disc pl-6 space-y-1">
                    <li>Sequential API for straightforward architectures</li>
                    <li>Custom callbacks for training monitoring</li>
                    <li>Model saving and loading</li>
                    <li>Performance optimization techniques</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 