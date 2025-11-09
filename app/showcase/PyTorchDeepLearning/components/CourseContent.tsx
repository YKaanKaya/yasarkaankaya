import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Circle } from 'lucide-react'

export function CourseContent() {
  const courses = [
    {
      id: 1,
      title: "Course 1: PyTorch Exploration",
      status: "completed",
      description: "Building foundational neural networks and image classification models with PyTorch",
      modules: [
        "Introduction to PyTorch tensors and autograd",
        "Building neural networks with nn.Module",
        "Training loops and optimization",
        "Image classification projects (MNIST, CIFAR, Nature)"
      ]
    },
    {
      id: 2,
      title: "Course 2: Techniques and Ecosystem Tools",
      status: "in-progress",
      description: "Advanced model optimization and MLOps ecosystem tools",
      modules: [
        "Optimizers and learning rate scheduling",
        "Hyperparameter tuning with Optuna",
        "Model profiling and performance optimization",
        "Transfer learning and fine-tuning pretrained models"
      ]
    },
    {
      id: 3,
      title: "Course 3: Advanced Architectures and Deployment",
      status: "upcoming",
      description: "Modern architectures and production deployment strategies",
      modules: [
        "Transformer architectures and attention mechanisms",
        "Generative models and diffusion techniques",
        "Model export with ONNX",
        "MLflow experiment tracking and deployment",
        "Pruning and quantization for edge devices"
      ]
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Professional Certificate Structure</h2>
        <p className="text-muted-foreground">
          A 3-course professional certificate focused on building production-ready deep learning systems with PyTorch.
        </p>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <Card key={course.id} className={course.status === "completed" ? "border-green-200 dark:border-green-900" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {course.status === "completed" && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                    {course.status === "in-progress" && <Circle className="h-5 w-5 text-orange-600 fill-orange-600" />}
                    {course.status === "upcoming" && <Circle className="h-5 w-5 text-gray-400" />}
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">{course.description}</p>
                </div>
                <Badge variant={
                  course.status === "completed" ? "default" :
                  course.status === "in-progress" ? "secondary" :
                  "outline"
                }>
                  {course.status === "completed" ? "Completed" :
                   course.status === "in-progress" ? "In Progress" :
                   "Upcoming"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {course.modules.map((module, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-1">•</span>
                    <span>{module}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-3">Key Learning Outcomes</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Building and training deep neural networks with PyTorch</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Implementing computer vision models with TorchVision</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Natural language processing with Hugging Face and PyTorch</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Model optimization through pruning, quantization, and profiling</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Production deployment with ONNX and MLflow</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
