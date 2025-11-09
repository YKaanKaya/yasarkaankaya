"use client"

import React, { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Github, BookOpen, Code, Sparkles, Brain, Cpu, Zap } from 'lucide-react'
import Link from 'next/link'
import { CourseContent } from './CourseContent'
import { TechStack } from './TechStack'
import { GitHubRepo } from './GitHubRepo'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Script from 'next/script'

export function ShowcaseApp() {
  const [activeTab, setActiveTab] = useState("overview")
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "PyTorch for Deep Learning Professional Certificate",
    "description": "Comprehensive showcase of implementations from the PyTorch for Deep Learning Professional Certificate by DeepLearning.AI, covering neural networks, computer vision, NLP, and model deployment.",
    "provider": {
      "@type": "Organization",
      "name": "DeepLearning.AI",
      "sameAs": "https://learn.deeplearning.ai"
    },
    "author": {
      "@type": "Person",
      "name": "Kaan Kaya"
    },
    "hasCourseInstance": [
      {
        "@type": "CourseInstance",
        "name": "PyTorch Exploration",
        "description": "Building neural networks and image classification models with PyTorch"
      },
      {
        "@type": "CourseInstance",
        "name": "Techniques and Ecosystem Tools",
        "description": "Model optimization, hyperparameter tuning, and MLOps tools"
      },
      {
        "@type": "CourseInstance",
        "name": "Advanced Architectures and Deployment",
        "description": "Transformers, generative models, and production deployment"
      }
    ],
    "keywords": "PyTorch, deep learning, neural networks, computer vision, NLP, transformers, model deployment, ONNX, MLflow",
    "skillLevel": "Intermediate to Advanced"
  }

  return (
    <>
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
            <h1 id="pytorch-title" className="text-2xl md:text-3xl font-bold">PyTorch for Deep Learning</h1>
          </div>
          <Button asChild variant="outline" size="sm" className="gap-2">
            <a href="https://github.com/YKaanKaya/deeplearning-ai-pytorch" target="_blank" rel="noopener noreferrer" aria-label="View source code on GitHub">
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
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-xl" />
          <div className="relative z-10 p-8 md:p-12">
            <Badge variant="outline" className="mb-4 border-white/20 backdrop-blur-sm bg-white/10 text-primary-foreground">
              DeepLearning.AI Professional Certificate
            </Badge>
            <h2 id="hero-heading" className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
              PyTorch Deep Learning Journey
            </h2>
            <p className="text-lg md:text-xl max-w-3xl text-primary-foreground/80 mb-6">
              Building production-ready deep learning systems with PyTorch. From neural network fundamentals
              to advanced architectures, model optimization, and real-world deployment strategies.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="sm" className="gap-2">
                <a href="#content" onClick={() => setActiveTab("overview")}>
                  <Code className="h-4 w-4" /> Explore Courses
                </a>
              </Button>
              <Button asChild variant="secondary" size="sm" className="gap-2">
                <a href="https://github.com/YKaanKaya/deeplearning-ai-pytorch" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" /> Browse Repository
                </a>
              </Button>
            </div>
          </div>
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
            <Card className="border-none shadow-sm bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/40 dark:to-orange-900/20 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="rounded-full bg-orange-100 dark:bg-orange-900/30 w-12 h-12 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">3-Course Certificate</h3>
                <p className="text-sm text-muted-foreground">
                  From PyTorch fundamentals to advanced architectures and production deployment
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="border-none shadow-sm bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/20 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="rounded-full bg-red-100 dark:bg-red-900/30 w-12 h-12 flex items-center justify-center mb-4">
                  <Cpu className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Hands-on Projects</h3>
                <p className="text-sm text-muted-foreground">
                  Real-world applications in computer vision, NLP, and model optimization
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="border-none shadow-sm bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 w-12 h-12 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Production MLOps</h3>
                <p className="text-sm text-muted-foreground">
                  Model deployment with ONNX, MLflow, pruning, and quantization techniques
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="border-none shadow-sm bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950/40 dark:to-rose-900/20 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="rounded-full bg-rose-100 dark:bg-rose-900/30 w-12 h-12 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Modern Architectures</h3>
                <p className="text-sm text-muted-foreground">
                  Transformers, attention mechanisms, and generative models with PyTorch
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
                  id="content"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Course Content</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="tech"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 h-auto"
                  role="tab"
                >
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    <span>Tech Stack</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="github"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 h-auto"
                  role="tab"
                >
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    <span>Repository</span>
                  </div>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="p-6">
                <CourseContent />
              </TabsContent>

              <TabsContent value="tech" className="p-6">
                <TechStack />
              </TabsContent>

              <TabsContent value="github" className="p-6">
                <GitHubRepo />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Certificate Badge */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center py-8"
        >
          <Badge variant="outline" className="text-lg px-6 py-2">
            Professional Certificate • DeepLearning.AI
          </Badge>
        </motion.section>
      </div>
    </>
  )
}
