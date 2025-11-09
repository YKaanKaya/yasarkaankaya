import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function TechStack() {
  const techCategories = [
    {
      title: "Deep Learning Framework",
      technologies: [
        { name: "PyTorch", description: "Core deep learning framework" },
        { name: "TorchVision", description: "Computer vision models and datasets" },
        { name: "torch.nn", description: "Neural network modules and layers" },
        { name: "torch.optim", description: "Optimization algorithms" }
      ]
    },
    {
      title: "NLP & Transformers",
      technologies: [
        { name: "Hugging Face", description: "Pretrained language models" },
        { name: "Transformers", description: "Transformer architectures" },
        { name: "GloVe/FastText", description: "Word embeddings" },
        { name: "DistilBERT", description: "Efficient BERT models" }
      ]
    },
    {
      title: "MLOps & Deployment",
      technologies: [
        { name: "ONNX", description: "Model export and deployment format" },
        { name: "MLflow", description: "Experiment tracking and model registry" },
        { name: "Optuna", description: "Hyperparameter optimization" },
        { name: "TorchScript", description: "Model serialization" }
      ]
    },
    {
      title: "Optimization Techniques",
      technologies: [
        { name: "Pruning", description: "Model compression via weight removal" },
        { name: "Quantization", description: "Reduced precision inference" },
        { name: "QAT", description: "Quantization-aware training" },
        { name: "Profiling", description: "Performance analysis tools" }
      ]
    },
    {
      title: "Development Tools",
      technologies: [
        { name: "Python", description: "Primary programming language" },
        { name: "Jupyter", description: "Interactive notebooks" },
        { name: "NumPy", description: "Numerical computing" },
        { name: "Matplotlib", description: "Visualization" }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Technologies & Tools</h2>
        <p className="text-muted-foreground">
          A comprehensive toolkit for building, optimizing, and deploying deep learning models with PyTorch.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {techCategories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.technologies.map((tech, techIndex) => (
                  <div key={techIndex} className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-0.5 flex-shrink-0">
                      {tech.name}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {tech.description}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-900">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-3 text-orange-900 dark:text-orange-100">Why PyTorch?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Research & Industry Standard</h4>
              <p className="text-muted-foreground">
                Most widely adopted framework in both academic research and production AI systems
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Pythonic & Intuitive</h4>
              <p className="text-muted-foreground">
                Clean, readable code with dynamic computational graphs for debugging and experimentation
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Production Ready</h4>
              <p className="text-muted-foreground">
                Comprehensive deployment options with ONNX, TorchScript, and mobile optimization
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Rich Ecosystem</h4>
              <p className="text-muted-foreground">
                Extensive libraries for vision, NLP, and specialized domains like robotics and audio
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
