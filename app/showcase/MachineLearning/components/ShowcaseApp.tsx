"use client"

import React, { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Github, Award, BookOpen, Code, Sparkles, Brain, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import { CourseContent } from './CourseContent'
import { TechStack } from './TechStack'
import { ProjectDemo } from './ProjectDemo'
import { GitHubRepo } from './GitHubRepo'
import { CodeShowcase } from './CodeShowcase'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Script from 'next/script'

export function ShowcaseApp() {
  const [activeTab, setActiveTab] = useState("overview")
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Animate progress bar on load
    const timer = setTimeout(() => setProgress(100), 100)
    const loadTimer = setTimeout(() => setIsLoaded(true), 300)
    return () => {
      clearTimeout(timer)
      clearTimeout(loadTimer)
    }
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  // Schema.org structured data for rich results
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Machine Learning Specialization",
    "description": "Comprehensive showcase of implementations from Andrew Ng's Machine Learning Specialization covering supervised learning, neural networks, and reinforcement learning.",
    "provider": {
      "@type": "Organization",
      "name": "Coursera and Stanford University",
      "sameAs": "https://www.coursera.org/specializations/machine-learning-introduction"
    },
    "author": {
      "@type": "Person",
      "name": "Kaan Kaya"
    },
    "hasCourseInstance": [
      {
        "@type": "CourseInstance",
        "name": "Supervised Machine Learning",
        "description": "Regression and classification algorithms implementation"
      },
      {
        "@type": "CourseInstance",
        "name": "Advanced Learning Algorithms",
        "description": "Neural networks and decision trees implementation"
      },
      {
        "@type": "CourseInstance",
        "name": "Unsupervised Learning and Reinforcement Learning",
        "description": "Clustering, recommender systems, and reinforcement learning implementation"
      }
    ],
    "keywords": "machine learning, neural networks, deep learning, Python, TensorFlow, reinforcement learning",
    "skillLevel": "Intermediate"
  }

  return (
    <>
      {/* Structured Data for Rich Results */}
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>

      <div className="container mx-auto py-8 px-4 md:px-6 max-w-7xl">
        {/* Top Navigation */}
        <nav className="flex justify-between items-center mb-4" aria-label="Showcase navigation">
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon" className="mr-2" aria-label="Back to home">
              <Link href="/"><ArrowLeft className="h-5 w-5" /></Link>
            </Button>
            <h1 id="machine-learning-title" className="text-2xl md:text-3xl font-bold">Machine Learning Specialization</h1>
          </div>
          <Button asChild variant="outline" size="sm" className="gap-2">
            <a href="https://github.com/YKaanKaya/Machine-learning" target="_blank" rel="noopener noreferrer" aria-label="View source code on GitHub">
              <Github className="h-4 w-4" /> <span>View on GitHub</span>
            </a>
          </Button>
        </nav>

        {/* Progress Indicator */}
        <div className="mb-6">
          <Progress value={progress} className="h-1" aria-label="Page loading progress" />
        </div>

        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 relative overflow-hidden rounded-xl"
          aria-labelledby="hero-heading"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-xl" />
          <div className="relative z-10 p-8 md:p-12">
            <Badge variant="outline" className="mb-4 border-white/20 backdrop-blur-sm bg-white/10 text-primary-foreground">
              Andrew Ng's Coursera Specialization
            </Badge>
            <h2 id="hero-heading" className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
              Machine Learning Journey
            </h2>
            <p className="text-lg md:text-xl max-w-3xl text-primary-foreground/80 mb-6">
              A comprehensive showcase of my learning path through supervised learning, neural networks, 
              unsupervised learning, and reinforcement learning algorithms.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="sm" className="gap-2">
                <a href="#demos" onClick={() => setActiveTab("demos")}>
                  <Code className="h-4 w-4" /> Explore Projects
                </a>
              </Button>
              <Button asChild variant="secondary" size="sm" className="gap-2">
                <a href="https://github.com/YKaanKaya/Machine-learning" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" /> Browse Repository
                </a>
              </Button>
            </div>
          </div>
          <div className="absolute inset-0 bg-[url('/images/ml-patterns.svg')] opacity-10 bg-repeat z-0" />
        </motion.section>

        {/* Key Benefits */}
        <motion.section 
          variants={container}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          aria-label="Key benefits"
        >
          <motion.div variants={item}>
            <Card className="border-none shadow-sm bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 w-12 h-12 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">3 Comprehensive Courses</h3>
                <p className="text-sm text-muted-foreground">
                  From regression and classification to advanced neural networks and reinforcement learning
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="border-none shadow-sm bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 w-12 h-12 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Practical Implementations</h3>
                <p className="text-sm text-muted-foreground">
                  Hands-on code examples and projects built using Python, NumPy, TensorFlow, and scikit-learn
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="border-none shadow-sm bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/20 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="rounded-full bg-green-100 dark:bg-green-900/30 w-12 h-12 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Interactive Demos</h3>
                <p className="text-sm text-muted-foreground">
                  See machine learning algorithms in action with demonstrations like the Lunar Lander
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="border-none shadow-sm bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 w-12 h-12 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Core ML Concepts</h3>
                <p className="text-sm text-muted-foreground">
                  Deep understanding of fundamental algorithms and advanced techniques in machine learning
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        {/* Main Content Tabs */}
        <Card className="border shadow-sm mb-8">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 h-auto flex-wrap" role="tablist">
                <TabsTrigger 
                  value="overview" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 h-auto"
                  role="tab"
                  aria-selected={activeTab === "overview"}
                  aria-controls="panel-overview"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Overview</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="demos" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 h-auto"
                  role="tab"
                  aria-selected={activeTab === "demos"}
                  aria-controls="panel-demos"
                  id="demos"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Project Demos</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="code" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 h-auto"
                  role="tab"
                  aria-selected={activeTab === "code"}
                  aria-controls="panel-code"
                >
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    <span>Code Examples</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="course1" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 h-auto"
                  role="tab"
                  aria-selected={activeTab === "course1"}
                  aria-controls="panel-course1"
                >
                  <div className="flex items-center gap-2">
                    <span>Course 1</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="course2" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 h-auto"
                  role="tab"
                  aria-selected={activeTab === "course2"}
                  aria-controls="panel-course2"
                >
                  <div className="flex items-center gap-2">
                    <span>Course 2</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="course3" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 h-auto"
                  role="tab"
                  aria-selected={activeTab === "course3"}
                  aria-controls="panel-course3"
                >
                  <div className="flex items-center gap-2">
                    <span>Course 3</span>
                  </div>
                </TabsTrigger>
              </TabsList>
              
              <div className="p-6">
                <TabsContent value="overview" className="m-0" role="tabpanel" id="panel-overview">
                  <div className="space-y-6">
                    <article className="flex flex-col lg:flex-row gap-8">
                      <div className="lg:w-2/3">
                        <h2 className="text-2xl font-bold mb-4">About This Specialization</h2>
                        <div className="prose prose-sm dark:prose-invert max-w-none mb-6">
                          <p>
                            The Machine Learning Specialization is a comprehensive program developed by Andrew Ng, 
                            covering the theoretical foundations and practical applications of machine learning algorithms.
                            This showcase presents my journey through all three courses, featuring completed 
                            assignments, code implementations, and projects.
                          </p>
                          <p>
                            Throughout this specialization, I gained hands-on experience implementing various machine learning 
                            algorithms from scratch, starting with basic regression models and advancing to complex 
                            neural networks and reinforcement learning agents.
                          </p>
                        </div>

                        <h3 className="text-xl font-semibold mb-3">Skills Acquired</h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                          <Badge variant="secondary" className="px-3 py-1">Machine Learning</Badge>
                          <Badge variant="secondary" className="px-3 py-1">Neural Networks</Badge>
                          <Badge variant="secondary" className="px-3 py-1">Deep Learning</Badge>
                          <Badge variant="secondary" className="px-3 py-1">Python</Badge>
                          <Badge variant="secondary" className="px-3 py-1">TensorFlow</Badge>
                          <Badge variant="secondary" className="px-3 py-1">Linear Regression</Badge>
                          <Badge variant="secondary" className="px-3 py-1">Logistic Regression</Badge>
                          <Badge variant="secondary" className="px-3 py-1">Gradient Descent</Badge>
                          <Badge variant="secondary" className="px-3 py-1">Backpropagation</Badge>
                          <Badge variant="secondary" className="px-3 py-1">Decision Trees</Badge>
                          <Badge variant="secondary" className="px-3 py-1">Clustering</Badge>
                          <Badge variant="secondary" className="px-3 py-1">Recommender Systems</Badge>
                          <Badge variant="secondary" className="px-3 py-1">Reinforcement Learning</Badge>
                        </div>
                      </div>

                      <aside className="lg:w-1/3">
                        <Card className="border bg-secondary/10">
                          <CardContent className="p-6">
                            <h3 className="text-lg font-medium mb-4 flex items-center">
                              <Award className="mr-2 h-5 w-5 text-primary" /> Certification Details
                            </h3>
                            <dl className="space-y-4">
                              <div>
                                <dt className="text-sm font-medium text-muted-foreground">Provider</dt>
                                <dd className="mt-1">Coursera</dd>
                              </div>
                              <div>
                                <dt className="text-sm font-medium text-muted-foreground">Instructor</dt>
                                <dd className="mt-1">Andrew Ng, Stanford University</dd>
                              </div>
                              <div>
                                <dt className="text-sm font-medium text-muted-foreground">Duration</dt>
                                <dd className="mt-1">3 months</dd>
                              </div>
                              <div>
                                <dt className="text-sm font-medium text-muted-foreground">Courses</dt>
                                <dd className="mt-1">3 courses with practical assignments</dd>
                              </div>
                            </dl>
                          </CardContent>
                        </Card>
                      </aside>
                    </article>

                    <section className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">Course Structure</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="p-4 border shadow-sm relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                          <div className="pl-4">
                            <Badge className="mb-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20">Course 1</Badge>
                            <h4 className="text-lg font-medium mb-2">Supervised Machine Learning</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                              Regression and classification algorithms, including linear regression, 
                              logistic regression, and gradient descent.
                            </p>
                            <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab("course1")}>
                              View Course
                            </Button>
                          </div>
                        </Card>
                        
                        <Card className="p-4 border shadow-sm relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                          <div className="pl-4">
                            <Badge className="mb-2 bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-purple-500/20">Course 2</Badge>
                            <h4 className="text-lg font-medium mb-2">Advanced Learning Algorithms</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                              Neural networks, decision trees, and practical machine learning advice 
                              on bias, variance, and error analysis.
                            </p>
                            <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab("course2")}>
                              View Course
                            </Button>
                          </div>
                        </Card>
                        
                        <Card className="p-4 border shadow-sm relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                          <div className="pl-4">
                            <Badge className="mb-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">Course 3</Badge>
                            <h4 className="text-lg font-medium mb-2">Unsupervised & RL</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                              Clustering, anomaly detection, recommender systems, and 
                              reinforcement learning techniques.
                            </p>
                            <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab("course3")}>
                              View Course
                            </Button>
                          </div>
                        </Card>
                      </div>
                    </section>
                  </div>
                </TabsContent>
                
                <TabsContent value="demos" className="m-0" role="tabpanel" id="panel-demos">
                  <ProjectDemo />
                </TabsContent>

                <TabsContent value="code" className="m-0" role="tabpanel" id="panel-code">
                  <CodeShowcase />
                </TabsContent>
                
                <TabsContent value="course1" className="m-0" role="tabpanel" id="panel-course1">
                  <CourseContent 
                    title="Supervised Machine Learning: Regression and Classification"
                    description="This course introduces fundamental concepts of machine learning, focusing on supervised learning algorithms for regression and classification problems."
                    weeks={[
                      {
                        title: "Week 1: Introduction to Machine Learning",
                        topics: ["Linear Regression with One Variable", "Cost Function", "Gradient Descent"],
                        labs: ["Model Representation", "Cost Function", "Gradient Descent"],
                        codeSnippets: [
                          {
                            title: "Computing Cost Function",
                            language: "python",
                            code: `def compute_cost(x, y, w, b):
    """
    Computes the cost function for linear regression.
    
    Args:
        x (ndarray): Shape (m,) Input to the model (Population of cities) 
        y (ndarray): Shape (m,) Label (Actual profits of cities)
        w, b (scalar): Parameters of the model
    
    Returns
        total_cost (float): The cost of using w,b as the parameters for linear regression
    """
    # Number of training examples
    m = x.shape[0] 
    
    # Calculate cost
    total_cost = 0
    for i in range(m):
        f_wb = w * x[i] + b
        cost = (f_wb - y[i]) ** 2
        total_cost += cost
    total_cost = total_cost / (2 * m)
    
    return total_cost`
                          },
                          {
                            title: "Gradient Descent Implementation",
                            language: "python",
                            code: `def gradient_descent(x, y, w_in, b_in, alpha, num_iters, cost_function, gradient_function):
    """
    Performs gradient descent to fit w,b. Updates w,b by taking 
    num_iters gradient steps with learning rate alpha
    
    Args:
      x (ndarray):    Data, shape (m,)
      y (ndarray):    Target values, shape (m,)
      w_in,b_in (scalar): Initial values of parameters
      alpha (float):  Learning rate
      num_iters (int): Number of iterations to run gradient descent
      
    Returns:
      w (scalar):     Updated value of parameter after running gradient descent
      b (scalar):     Updated value of parameter after running gradient descent
      J_history (list): History of cost values
      p_history (list): History of parameters [w,b] 
    """
    w = copy.deepcopy(w_in)
    b = b_in
    
    # An array to store cost values at each iteration
    J_history = []
    p_history = []
    
    for i in range(num_iters):
        # Calculate the gradient and update the parameters
        dj_dw, dj_db = gradient_function(x, y, w, b)
        
        # Update Parameters using gradient descent update
        w = w - alpha * dj_dw
        b = b - alpha * dj_db
        
        # Save cost J and parameters at each iteration
        if i < 100000:  # prevent resource exhaustion
            J_history.append(cost_function(x, y, w, b))
            p_history.append([w, b])
        
        # Print cost every at 10% intervals
        if i % math.ceil(num_iters / 10) == 0:
            print(f"Iteration {i:4d}: Cost {J_history[-1]:8.2f}   ")
            
    return w, b, J_history, p_history`
                          }
                        ]
                      }
                    ]}
                  />
                </TabsContent>
                
                <TabsContent value="course2" className="m-0" role="tabpanel" id="panel-course2">
                  <CourseContent 
                    title="Advanced Learning Algorithms"
                    description="This course focuses on neural networks, decision trees, and practical advice for applying machine learning in real-world scenarios."
                    weeks={[
                      {
                        title: "Week 1: Neural Networks",
                        topics: ["Neural Network Model", "TensorFlow Implementation", "Activation Functions"],
                        labs: ["TensorFlow Introduction", "Coffee Roasting Example", "Binary Classification"],
                        codeSnippets: []
                      }
                    ]}
                  />
                </TabsContent>
                
                <TabsContent value="course3" className="m-0" role="tabpanel" id="panel-course3">
                  <CourseContent 
                    title="Unsupervised Learning, Recommenders, Reinforcement Learning"
                    description="This course covers unsupervised learning algorithms, recommender systems, and introduces reinforcement learning techniques."
                    weeks={[
                      {
                        title: "Week 1: Unsupervised Learning",
                        topics: ["K-means Clustering", "Anomaly Detection", "Principal Component Analysis"],
                        labs: ["K-means Implementation", "Anomaly Detection System", "Dimensionality Reduction"],
                        codeSnippets: []
                      }
                    ]}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer Section */}
        <footer className="rounded-lg bg-muted/50 p-6 text-center">
          <h3 className="font-medium mb-2 flex items-center justify-center">
            <HelpCircle className="mr-2 h-5 w-5" /> Need Help or Have Questions?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Feel free to reach out if you have any questions about my machine learning journey or these implementations.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild variant="default" size="sm">
              <a href="https://github.com/YKaanKaya/Machine-learning/issues" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Github className="h-4 w-4" /> Open an Issue
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/contact" className="flex items-center gap-2">
                Contact Me
              </Link>
            </Button>
          </div>
        </footer>
      </div>
    </>
  )
} 