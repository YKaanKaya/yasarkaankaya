import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Github, ExternalLink, FolderGit2, BookOpen, Code2 } from 'lucide-react'

export function GitHubRepo() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">GitHub Repository</h2>
        <p className="text-muted-foreground">
          Explore the complete codebase with all projects, assignments, and implementations from the certificate.
        </p>
      </div>

      <Card className="border-2">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3">
              <Github className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold">deeplearning-ai-pytorch</h3>
                <Badge variant="secondary">Public</Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                PyTorch for Deep Learning Professional Certificate - DeepLearning.AI
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">PyTorch</Badge>
                <Badge variant="outline">Deep Learning</Badge>
                <Badge variant="outline">Computer Vision</Badge>
                <Badge variant="outline">NLP</Badge>
                <Badge variant="outline">MLOps</Badge>
              </div>
              <Button asChild className="gap-2">
                <a href="https://github.com/YKaanKaya/deeplearning-ai-pytorch" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" /> View on GitHub
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-3">
              <FolderGit2 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Repository Structure</h3>
                <p className="text-sm text-muted-foreground">
                  Organized by course with clear module separation for easy navigation
                </p>
              </div>
            </div>
            <div className="ml-8 space-y-1 text-sm font-mono">
              <div>├── Course-1-PyTorch-Exploration/</div>
              <div>├── Course-2-Techniques-and-Ecosystem/</div>
              <div>├── Course-3-Advanced-Architectures/</div>
              <div>└── README.md</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-3">
              <BookOpen className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Comprehensive README</h3>
                <p className="text-sm text-muted-foreground">
                  Detailed documentation covering course structure, projects, and learning outcomes
                </p>
              </div>
            </div>
            <ul className="ml-8 space-y-1 text-sm">
              <li>• Course overviews and descriptions</li>
              <li>• Technologies and tools used</li>
              <li>• Hands-on project listings</li>
              <li>• Professional background context</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Code2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">What's Inside</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <strong className="text-primary">Course 1:</strong>
                  <ul className="ml-4 mt-1 space-y-1 text-muted-foreground">
                    <li>• Neural network implementations</li>
                    <li>• Image classification projects</li>
                    <li>• PyTorch fundamentals notebooks</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-primary">Course 2:</strong>
                  <ul className="ml-4 mt-1 space-y-1 text-muted-foreground">
                    <li>• Model optimization techniques</li>
                    <li>• Hyperparameter tuning labs</li>
                    <li>• Transfer learning examples</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-primary">Course 3:</strong>
                  <ul className="ml-4 mt-1 space-y-1 text-muted-foreground">
                    <li>• Transformer implementations</li>
                    <li>• ONNX deployment examples</li>
                    <li>• Model compression techniques</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-primary">Additional:</strong>
                  <ul className="ml-4 mt-1 space-y-1 text-muted-foreground">
                    <li>• Requirements and dependencies</li>
                    <li>• Helper utilities and functions</li>
                    <li>• Unit tests for assignments</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button asChild variant="outline" size="lg" className="gap-2">
          <a href="https://learn.deeplearning.ai/specializations/pytorch-for-deep-learning-professional-certificate/overview" target="_blank" rel="noopener noreferrer">
            View Certificate Program
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  )
}
