import type { Metadata } from 'next'
import Image from 'next/image'
import { 
  ArrowRight, 
  Book, 
  Brain, 
  Code, 
  ExternalLink,
  GraduationCap, 
  Layers, 
  Rocket, 
  Trophy 
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { NotebookSection } from './components/NotebookSection'

// Custom NVIDIA colors
const nvidiaGreen = '#76b900'
const nvidiaDark = '#1a1a1a'

export const metadata: Metadata = {
  title: 'NVIDIA Multimodal AI Agents Showcase | Kaan Kaya',
  description: 'Showcase of NVIDIA\'s "Building AI Agents with Multimodal Models" course featuring hands-on projects, key learnings, and certification details.',
  keywords: [
    'NVIDIA',
    'Multimodal AI',
    'AI Agents',
    'Deep Learning',
    'Contrastive Learning',
    'Vector Search Systems',
    'Graph RAG',
    'OCR Pipelines',
    'Multimodal Fusion'
  ],
  openGraph: {
    title: 'NVIDIA Multimodal AI Agents Showcase | Kaan Kaya',
    description: 'Comprehensive showcase of NVIDIA\'s "Building AI Agents with Multimodal Models" course featuring projects, technologies, and certification.',
    type: 'website',
    url: 'https://kaankaya.dev/showcase/NvidiaMultimodalAI',
    images: [
      {
        url: '/notebooks/nvidia-multimodal/images/nvidia-tensorrt-llm-enhancements-deliver-massive-large-language-model-speedups-on-nvidia-h200.png',
        width: 1200,
        height: 630,
        alt: 'NVIDIA Multimodal AI Agents Course'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NVIDIA Multimodal AI Agents Showcase',
    description: 'Explore my journey through NVIDIA\'s "Building AI Agents with Multimodal Models" course featuring projects and certification.',
    images: ['/notebooks/nvidia-multimodal/images/nvidia-tensorrt-llm-enhancements-deliver-massive-large-language-model-speedups-on-nvidia-h200.png']
  },
  alternates: {
    canonical: 'https://kaankaya.dev/showcase/NvidiaMultimodalAI'
  }
}

export default function NvidiaMultimodalAIShowcase() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-black to-green-950 text-white rounded-xl overflow-hidden mb-8 pb-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-[url('/nvidia-logo-outline.svg')] bg-contain bg-no-repeat opacity-5"></div>
        
        <div className="relative z-10 p-8 pt-6 pb-12 space-y-6 text-center">
          <div className="inline-block bg-[#76b900] text-black font-medium px-3 py-1 rounded-full text-sm">
            NVIDIA DLI Course
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300 px-4 mb-4 leading-relaxed">
            Building AI Agents with Multimodal Models
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive showcase of advanced multimodal techniques for<br />
            combining vision, language, and structured data
          </p>
          
          <div className="flex justify-center gap-4 pt-4 pb-2">
            <a href="https://learn.nvidia.com/certificates?id=kpMpsOlPTBKph9g3PLBXpw#" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#76b900] hover:bg-[#86c900] text-black font-medium px-6">
                <ExternalLink className="mr-2 h-4 w-4" /> View Certification
              </Button>
            </a>
            
            <a href="#course-overview">
              <Button variant="outline" className="border-[#76b900] bg-transparent text-white hover:bg-white/80">
                Course Overview <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          {/* Background pattern with CSS grid */}
          <div className="absolute inset-0 opacity-10" style={{ 
            background: 'linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>
          
          {/* NVIDIA Logo watermark */}
          <div className="absolute -right-20 top-1/2 transform -translate-y-1/2">
            <svg className="w-64 h-64 text-[#76b900] opacity-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.95 8.6h6.08v6.07h-6.08V8.6z"/>
              <path d="M0 0v24h24V0H0zm22.89 22.89H1.11V1.11h21.78v21.78z"/>
            </svg>
          </div>
        </div>
      </section>
      
      {/* Course Notebooks Section - Moved to top for immediate accessibility */}
      <section className="space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold flex items-center">
            <Book className="mr-2 h-6 w-6 text-[#76b900]" /> Course Notebooks
          </h2>
          <Button variant="outline" className="flex items-center border-[#76b900] text-[#76b900] hover:bg-[#76b900]/10">
            <Rocket className="mr-2 h-4 w-4" /> View All Projects
          </Button>
        </div>
        
        <Tabs defaultValue="foundations" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-black/5">
            <TabsTrigger value="foundations" className="data-[state=active]:bg-[#76b900] data-[state=active]:text-white">Foundations</TabsTrigger>
            <TabsTrigger value="intermediate" className="data-[state=active]:bg-[#76b900] data-[state=active]:text-white">Intermediate</TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-[#76b900] data-[state=active]:text-white">Advanced</TabsTrigger>
            <TabsTrigger value="applications" className="data-[state=active]:bg-[#76b900] data-[state=active]:text-white">Applications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="foundations" className="mt-6 space-y-6">
            <NotebookSection
              title="1a. Early and Late Fusion"
              description="Multimodal models are a simple concept with a surprisingly complex practice. This notebook compares different data types and demonstrates early-vs-late fusion techniques using a robotics use-case."
              objectives={[
                'Explore the properties of LiDAR data',
                'Construct and compare single-modal RGB and LiDAR models',
                'Build a late-fusion multimodal model',
                'Build an early-fusion multimodal model',
              ]}
              viewLink="/showcase/NvidiaMultimodalAI/notebook/01a-early-and-late-fusion"
              insightsLink="/showcase/NvidiaMultimodalAI/notebook/01a-early-and-late-fusion/insights"
            />
            
            <NotebookSection
              title="1b. Exploring Modalities"
              description="Investigate individual sensor streams (RGB, depth and text) and learn how to encode and align them into a shared embedding space."
              objectives={[
                'Visualise and pre-process RGB, depth and text data',
                'Train modality-specific encoders',
                'Align embeddings with a contrastive loss',
                'Evaluate cross-modal retrieval performance',
              ]}
              viewLink="/showcase/NvidiaMultimodalAI/notebook/01b-exploring-modalities"
              insightsLink="/showcase/NvidiaMultimodalAI/notebook/01b-exploring-modalities/insights"
            />
          </TabsContent>
          
          <TabsContent value="intermediate" className="mt-6 space-y-6">
            <NotebookSection
              title="2a. Intermediate Fusion"
              description="Learn more advanced multimodal fusion techniques that combine features at the intermediate level, allowing models to better capture cross-modal interactions."
              objectives={[
                'Implement intermediate fusion architectures',
                'Compare performance with early and late fusion models',
                'Visualize feature interactions across modalities',
                'Optimize fusion points for specific tasks',
              ]}
              viewLink="/showcase/NvidiaMultimodalAI/notebook/02a-intermediate-fusion"
              insightsLink="/showcase/NvidiaMultimodalAI/notebook/02a-intermediate-fusion/insights"
            />
            
            <NotebookSection
              title="2b. Contrastive Pretraining"
              description="Explore contrastive learning techniques to build robust multimodal representations that align information across different modalities."
              objectives={[
                'Implement contrastive learning objectives',
                'Create paired datasets for cross-modal training',
                'Design effective data augmentation strategies',
                'Evaluate model performance on zero-shot tasks',
              ]}
              viewLink="/showcase/NvidiaMultimodalAI/notebook/02b-contrastive-pretraining"
              insightsLink="/showcase/NvidiaMultimodalAI/notebook/02b-contrastive-pretraining/insights"
            />
          </TabsContent>
          
          <TabsContent value="advanced" className="mt-6 space-y-6">
            <NotebookSection
              title="3a. Projection"
              description="Learn about projection techniques that map multimodal data into shared embedding spaces for cross-modal understanding and retrieval."
              objectives={[
                'Implement different projection methods',
                'Analyze embedding space alignment',
                'Perform dimensionality reduction on multimodal data',
                'Evaluate retrieval quality across modalities',
              ]}
              viewLink="/showcase/NvidiaMultimodalAI/notebook/03a-projection"
              insightsLink="/showcase/NvidiaMultimodalAI/notebook/03a-projection/insights"
            />
            
            <NotebookSection
              title="3b. OCR Pipelines"
              description="Build and optimize Optical Character Recognition (OCR) pipelines for extracting text from images, a critical component in multimodal applications."
              objectives={[
                'Implement end-to-end OCR workflows',
                'Pre-process images for improved text detection',
                'Extract structured information from documents',
                'Handle various document formats and layouts',
              ]}
              viewLink="/showcase/NvidiaMultimodalAI/notebook/03b-ocr-pipelines"
              insightsLink="/showcase/NvidiaMultimodalAI/notebook/03b-ocr-pipelines/insights"
            />
          </TabsContent>
          
          <TabsContent value="applications" className="mt-6 space-y-6">
            <NotebookSection
              title="4a. Vector Search Systems"
              description="Explore vector search systems for efficient retrieval and matching of multimodal embeddings at scale."
              objectives={[
                'Build vector indexes for fast similarity search',
                'Implement approximate nearest neighbor algorithms',
                'Optimize query performance for large datasets',
                'Compare different vector database solutions',
              ]}
              viewLink="/showcase/NvidiaMultimodalAI/notebook/04a-vss"
              insightsLink="/showcase/NvidiaMultimodalAI/notebook/04a-vss/insights"
            />
            
            <NotebookSection
              title="4b. VSS with Graph RAG"
              description="Integrate Vector Search Systems with Graph-based Retrieval Augmented Generation for advanced multimodal reasoning and knowledge retrieval."
              objectives={[
                'Build knowledge graphs from multimodal data',
                'Combine vector search with graph traversal algorithms',
                'Implement multi-hop reasoning over multimodal content',
                'Evaluate retrieval relevance and contextual awareness',
              ]}
              viewLink="/showcase/NvidiaMultimodalAI/notebook/04b-vss-graphrag"
              insightsLink="/showcase/NvidiaMultimodalAI/notebook/04b-vss-graphrag/insights"
            />
          </TabsContent>
        </Tabs>
      </section>
      
      {/* Course Overview */}
      <section id="course-overview" className="mb-8">
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <Layers className="mr-2 h-6 w-6 text-[#76b900]" /> Course Overview
        </h2>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed mb-4">
              This comprehensive NVIDIA Deep Learning Institute course explores the cutting-edge intersection of multiple data modalities in AI systems. Through hands-on notebooks and practical exercises, I've gained expertise in building systems that can process, understand, and generate across text, images, audio, and other data types.
            </p>
            <p className="text-lg leading-relaxed">
              The course progresses from foundational fusion techniques to advanced vector search systems with graph-based retrieval augmented generation, providing both theoretical understanding and practical implementation skills for building sophisticated multimodal AI agents.            
            </p>
          </CardContent>
        </Card>
        
        <div className="relative pl-6 border-l-2 border-[#76b900] mb-6">
          <h3 className="text-xl font-semibold mb-2">Course Progression</h3>
          <ol className="space-y-3 list-decimal list-inside">
            <li><span className="font-medium">Fundamentals of Multimodal Fusion</span> - Early and late fusion techniques</li>
            <li><span className="font-medium">Modality Exploration</span> - Understanding different data types</li>
            <li><span className="font-medium">Advanced Integration</span> - Intermediate fusion and contrastive learning</li>
            <li><span className="font-medium">Specialized Techniques</span> - Projection methods and OCR pipelines</li>
            <li><span className="font-medium">Production Systems</span> - Vector search and Graph RAG implementation</li>
          </ol>
        </div>
      </section>
      
      {/* Course Info Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Book className="mr-2 h-5 w-5 text-[#76b900]" /> Course Structure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">8 comprehensive notebooks spanning theory and practical implementation</p>
            <Progress value={100} className="h-2 mt-4 bg-gray-200 [&>div]:bg-[#76b900]" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Code className="mr-2 h-5 w-5 text-[#76b900]" /> Technologies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">PyTorch, TensorRT, NVIDIA NeMo, Triton Inference Server</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-5 w-5 text-[#76b900]" /> Key Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Multimodal fusion, LLM integration, vector search, Graph RAG</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <GraduationCap className="mr-2 h-5 w-5 text-[#76b900]" /> Certification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">NVIDIA Deep Learning Institute certified - June 2025</p>
          </CardContent>
        </Card>
      </section>
      
      {/* Skills Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <Trophy className="mr-2 h-6 w-6 text-[#76b900]" /> Skills Acquired
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-[#76b900]">
            <CardHeader>
              <CardTitle className="text-lg">Multimodal Fusion Techniques</CardTitle>
              <CardDescription>Early, Late, and Intermediate approaches</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-l-4 border-l-[#76b900]">
            <CardHeader>
              <CardTitle className="text-lg">Contrastive Learning</CardTitle>
              <CardDescription>Cross-modal representation alignment</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-l-4 border-l-[#76b900]">
            <CardHeader>
              <CardTitle className="text-lg">Vector Search Systems</CardTitle>
              <CardDescription>Fast similarity search for multimodal data</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-l-4 border-l-[#76b900]">
            <CardHeader>
              <CardTitle className="text-lg">Graph RAG Integration</CardTitle>
              <CardDescription>Knowledge graphs with retrieval augmentation</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-l-4 border-l-[#76b900]">
            <CardHeader>
              <CardTitle className="text-lg">OCR Pipelines</CardTitle>
              <CardDescription>Text extraction from visual data</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-l-4 border-l-[#76b900]">
            <CardHeader>
              <CardTitle className="text-lg">Projection Methods</CardTitle>
              <CardDescription>Dimensionality reduction for multimodal data</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
      

      

      
      {/* Certificate Section */}
      <section className="relative rounded-xl overflow-hidden bg-gradient-to-br from-green-800 to-green-950 text-white p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-2/3 space-y-4">
            <h2 className="text-3xl font-bold">NVIDIA DLI Certification</h2>
            <p className="text-lg">Successfully completed NVIDIA's Deep Learning Institute certification in "Building AI Agents with Multimodal Models" with hands-on expertise in multimodal fusion, vector search systems, and graph-based RAG.</p>
            <Button size="lg" className="bg-white text-[#1a1a1a] hover:bg-white/90 border border-white" asChild>
              <a href="https://learn.nvidia.com/certificates?id=kpMpsOlPTBKph9g3PLBXpw#" target="_blank" rel="noopener noreferrer">
                View Certificate
              </a>
            </Button>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="w-48 h-48 rounded-full bg-white/20 flex items-center justify-center p-2">
              <GraduationCap className="w-24 h-24 text-white" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
