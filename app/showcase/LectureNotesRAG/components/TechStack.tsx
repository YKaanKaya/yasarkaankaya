import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function TechStack() {
  const techCategories = [
    {
      title: "Core Technologies",
      description: "Foundation of the RAG system",
      technologies: [
        { name: "Python 3.8+", description: "Primary programming language" },
        { name: "FAISS", description: "GPU-accelerated vector database" },
        { name: "PyTorch", description: "Deep learning framework with CUDA support" },
        { name: "CUDA 11.8+", description: "GPU acceleration framework" },
      ]
    },
    {
      title: "ML/NLP Stack",
      description: "Machine learning and natural language processing",
      technologies: [
        { name: "Sentence Transformers", description: "State-of-the-art embedding generation" },
        { name: "BAAI/bge-large-en-v1.5", description: "1024-dimensional embedding model" },
        { name: "LangChain", description: "Document processing and chunking" },
        { name: "Tiktoken", description: "Token counting and text splitting" },
      ]
    },
    {
      title: "Document Processing",
      description: "Multi-format document support",
      technologies: [
        { name: "PyPDF2", description: "PDF text extraction" },
        { name: "python-docx", description: "DOCX document parsing" },
        { name: "Markdown Parser", description: "Markdown file support" },
        { name: "Custom Chunking", description: "Intelligent text splitting with overlap" },
      ]
    },
    {
      title: "Interface & Integration",
      description: "User interface and external integrations",
      technologies: [
        { name: "Streamlit", description: "Web-based user interface" },
        { name: "LM Studio API", description: "Local LLM inference integration" },
        { name: "REST API", description: "HTTP communication with LM Studio" },
        { name: "Pickle", description: "Persistent storage serialization" },
      ]
    }
  ]

  return (
    <div className="space-y-6">
      {techCategories.map((category, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{category.title}</CardTitle>
            <CardDescription>{category.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.technologies.map((tech, techIndex) => (
                <div key={techIndex} className="flex flex-col space-y-1">
                  <div className="font-medium">{tech.name}</div>
                  <div className="text-sm text-muted-foreground">{tech.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle>Architecture Diagram</CardTitle>
          <CardDescription>System component flow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-6 rounded-lg font-mono text-sm">
            <pre className="whitespace-pre-wrap">
{`┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Document       │────▶│  Text            │────▶│  Embedding      │
│  Loader         │     │  Processor       │     │  Generator      │
│  (PDF/DOCX/TXT) │     │  (Chunking)      │     │  (GPU-powered)  │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                                                          │
                                                          ▼
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  LM Studio      │◀────│  Context         │◀────│  FAISS Vector   │
│  (Generation)   │     │  Builder         │     │  Database       │
└─────────────────┘     └──────────────────┘     └─────────────────┘`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}