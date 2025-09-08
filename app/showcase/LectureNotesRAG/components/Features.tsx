import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Cpu, Database, FileText, Zap, Lock, Settings } from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: <Cpu className="h-8 w-8 text-primary" />,
      title: "GPU Acceleration",
      description: "Leverages NVIDIA RTX 5090 for blazing-fast embedding generation and vector operations",
      details: [
        "~1000 chunks/second processing speed",
        "CUDA-optimized operations",
        "Automatic GPU detection and fallback",
        "Batch processing for efficiency"
      ]
    },
    {
      icon: <Database className="h-8 w-8 text-primary" />,
      title: "FAISS Vector Database",
      description: "High-performance similarity search with persistent storage",
      details: [
        "Sub-10ms search latency",
        "Supports millions of vectors",
        "Multiple index types (Flat, IVF, HNSW)",
        "Save/load functionality for instant startup"
      ]
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Multi-Format Support",
      description: "Process various document formats seamlessly",
      details: [
        "PDF document parsing",
        "DOCX file support",
        "Plain text and Markdown",
        "Automatic format detection"
      ]
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Smart Chunking",
      description: "Intelligent text splitting that preserves context",
      details: [
        "Configurable chunk size (default 500 tokens)",
        "Overlapping chunks for context preservation",
        "Respects document structure",
        "Metadata preservation for citations"
      ]
    },
    {
      icon: <Lock className="h-8 w-8 text-primary" />,
      title: "Local LLM Integration",
      description: "Private, offline inference with LM Studio",
      details: [
        "No data leaves your machine",
        "Support for various local models",
        "Configurable generation parameters",
        "REST API integration"
      ]
    },
    {
      icon: <Settings className="h-8 w-8 text-primary" />,
      title: "Flexible Configuration",
      description: "Customize every aspect of the RAG pipeline",
      details: [
        "Environment-based configuration",
        "Multiple embedding models support",
        "Adjustable retrieval parameters",
        "Hybrid search capabilities"
      ]
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {features.map((feature, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              {feature.icon}
              <div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {feature.details.map((detail, detailIndex) => (
                <li key={detailIndex} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-sm text-muted-foreground">{detail}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}