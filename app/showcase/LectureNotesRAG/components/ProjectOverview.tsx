import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function ProjectOverview() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Project Overview</CardTitle>
          <CardDescription>
            GPU-accelerated Retrieval-Augmented Generation for Academic Documents
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            LectureNotes RAG System is a high-performance question-answering system designed specifically for 
            academic documents and lecture notes. Built with GPU acceleration in mind, it leverages NVIDIA's 
            RTX 5090 to deliver lightning-fast semantic search across thousands of documents.
          </p>
          
          <p className="text-muted-foreground leading-relaxed">
            The system implements a complete RAG pipeline: from multi-format document ingestion (PDF, DOCX, TXT, MD) 
            to intelligent text chunking, high-dimensional embedding generation, and efficient vector search using 
            FAISS. It integrates seamlessly with LM Studio for local, private LLM inference, ensuring data privacy 
            while providing intelligent responses.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">1000+</div>
              <div className="text-sm text-muted-foreground">Chunks/Second</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">&lt;10ms</div>
              <div className="text-sm text-muted-foreground">Search Latency</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">1024</div>
              <div className="text-sm text-muted-foreground">Dimensions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">4</div>
              <div className="text-sm text-muted-foreground">File Formats</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Technologies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Python</Badge>
            <Badge variant="default">FAISS</Badge>
            <Badge variant="default">PyTorch</Badge>
            <Badge variant="default">CUDA</Badge>
            <Badge variant="secondary">Sentence Transformers</Badge>
            <Badge variant="secondary">LangChain</Badge>
            <Badge variant="secondary">Streamlit</Badge>
            <Badge variant="outline">LM Studio</Badge>
            <Badge variant="outline">BAAI/bge-large-en-v1.5</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Use Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-primary mr-2">▸</span>
              <span className="text-muted-foreground">
                <strong>Academic Study:</strong> Query lecture notes and textbooks for quick revision
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">▸</span>
              <span className="text-muted-foreground">
                <strong>Research Assistant:</strong> Search through research papers and extract key insights
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">▸</span>
              <span className="text-muted-foreground">
                <strong>Documentation Q&A:</strong> Interactive exploration of technical documentation
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">▸</span>
              <span className="text-muted-foreground">
                <strong>Knowledge Management:</strong> Build and query personal knowledge bases
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}