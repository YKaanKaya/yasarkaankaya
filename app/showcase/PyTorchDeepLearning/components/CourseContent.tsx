"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Circle, ChevronDown, ChevronUp, ExternalLink, BookOpen, Code, Brain, Zap, Layers, Database, BarChart3 } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Module {
  title: string
  description: string
  keyConceptsTitle: string
  keyConcepts: string[]
  notebooks: { name: string; path: string; description: string }[]
  codeHighlight?: string
}

interface Course {
  id: number
  title: string
  status: "completed" | "in-progress" | "upcoming"
  description: string
  icon: React.ReactNode
  modules: Module[]
}

const GITHUB_BASE = "https://github.com/YKaanKaya/deeplearning-ai-pytorch/tree/main"

export function CourseContent() {
  const [expandedCourse, setExpandedCourse] = useState<number | null>(1)
  const [expandedModule, setExpandedModule] = useState<string | null>(null)

  const courses: Course[] = [
    {
      id: 1,
      title: "Course 1: PyTorch Exploration",
      status: "completed",
      description: "Master PyTorch fundamentals from tensors to CNNs through hands-on projects",
      icon: <Brain className="h-5 w-5" />,
      modules: [
        {
          title: "Module 1: Introduction to PyTorch",
          description: "Build your foundation with PyTorch tensors, operations, and basic neural network concepts.",
          keyConceptsTitle: "What You'll Learn",
          keyConcepts: [
            "PyTorch tensors and GPU acceleration",
            "Autograd for automatic differentiation",
            "Building a simple linear regression model",
            "Activation functions (ReLU, Sigmoid)"
          ],
          notebooks: [
            { name: "Tensors Example", path: "Course-1-PyTorch-Exploration/Module 1/Module_1_Code_Example_Tensors", description: "Understanding tensor operations" },
            { name: "Bike Prediction", path: "Course-1-PyTorch-Exploration/Module 1/Module_1_Code_Example_Bike", description: "Linear regression with PyTorch" },
            { name: "ReLU Activation", path: "Course-1-PyTorch-Exploration/Module 1/Module_1_Code_Example_Bike_With_Relu", description: "Adding non-linearity" }
          ],
          codeHighlight: `# Creating a tensor and moving to GPU
x = torch.tensor([1, 2, 3])
x = x.to('cuda')  # GPU acceleration`
        },
        {
          title: "Module 2: Building Neural Networks",
          description: "Construct and train neural networks for image classification using the MNIST dataset.",
          keyConceptsTitle: "What You'll Learn",
          keyConcepts: [
            "nn.Module class for building networks",
            "Fully connected (Linear) layers",
            "Cross-entropy loss & optimization",
            "Training loops with batched data"
          ],
          notebooks: [
            { name: "MNIST Classifier", path: "Course-1-PyTorch-Exploration/Module 2/Lab_1_mnist_classifier", description: "Digit recognition neural network" },
            { name: "Letter Detective", path: "Course-1-PyTorch-Exploration/Module 2/Assignment_1_Mnist_letter_detective", description: "Extended MNIST with letters" }
          ],
          codeHighlight: `# Simple neural network
class Net(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 128)
        self.fc2 = nn.Linear(128, 10)`
        },
        {
          title: "Module 3: Data Management",
          description: "Master PyTorch's data loading pipeline for efficient model training.",
          keyConceptsTitle: "What You'll Learn",
          keyConcepts: [
            "Creating custom Dataset classes",
            "DataLoader for batching & shuffling",
            "Image transformations & augmentation",
            "Handling corrupted or missing data"
          ],
          notebooks: [
            { name: "Data Management Lab", path: "Course-1-PyTorch-Exploration/Module 3/C1_M3_Lab_data_management", description: "DataLoaders & transforms" },
            { name: "Plant Classification", path: "Course-1-PyTorch-Exploration/Module 3/C1_M3_Assignment", description: "Custom dataset project" }
          ],
          codeHighlight: `# Custom Dataset
class CustomDataset(Dataset):
    def __getitem__(self, idx):
        return self.data[idx], self.labels[idx]`
        },
        {
          title: "Module 4: Convolutional Neural Networks",
          description: "Build CNNs for image classification with advanced techniques for robustness.",
          keyConceptsTitle: "What You'll Learn",
          keyConcepts: [
            "Conv2d, MaxPool2d, BatchNorm layers",
            "Feature extraction with convolutions",
            "Multi-class classification (CIFAR-100)",
            "Building robust CNN architectures"
          ],
          notebooks: [
            { name: "Nature Classifier", path: "Course-1-PyTorch-Exploration/Module 4/C1_M4_Lab_1_cnn_nature_classifier", description: "CIFAR-100 classification" },
            { name: "CNN Lab 2", path: "Course-1-PyTorch-Exploration/Module 4/C1_M4_Lab_2", description: "Advanced CNN techniques" },
            { name: "Robust CNN", path: "Course-1-PyTorch-Exploration/Module 4/Robost_CNN_Programming_Assignment", description: "Building robust models" }
          ],
          codeHighlight: `# CNN layer
self.conv1 = nn.Conv2d(3, 32, kernel_size=3)
self.pool = nn.MaxPool2d(2, 2)`
        }
      ]
    },
    {
      id: 2,
      title: "Course 2: Techniques and Ecosystem Tools",
      status: "completed",
      description: "Master optimization, transfer learning, NLP, and production techniques",
      icon: <Zap className="h-5 w-5" />,
      modules: [
        {
          title: "Module 1: Tuning & Optimization",
          description: "Deep dive into optimizers, learning rate scheduling, and hyperparameter tuning with Optuna.",
          keyConceptsTitle: "What You'll Learn",
          keyConcepts: [
            "Optimizers: SGD, Adam, AdamW comparison",
            "Learning rate schedulers (Step, Cosine, OneCycle)",
            "Automated hyperparameter tuning with Optuna",
            "Performance metrics & model evaluation"
          ],
          notebooks: [
            { name: "Tuning & Metrics", path: "Course-2-Techniques-and-Ecosystem/Module_1/C2_M1_Lab_1_tuning_and_metrics", description: "Understanding optimizer behavior" },
            { name: "LR Schedulers", path: "Course-2-Techniques-and-Ecosystem/Module_1/C2_M1_Lab_2_Schedulers", description: "Dynamic learning rate" },
            { name: "Optuna HPO", path: "Course-2-Techniques-and-Ecosystem/Module_1/C2_M1_Lab_3_Optuna", description: "Automated hyperparameter optimization" },
            { name: "Optimization Lab", path: "Course-2-Techniques-and-Ecosystem/Module_1/C2_M1_Lab_4_Optimization", description: "Advanced optimization techniques" }
          ],
          codeHighlight: `# Optuna hyperparameter search
def objective(trial):
    lr = trial.suggest_float('lr', 1e-5, 1e-1, log=True)
    optimizer = optim.Adam(model.parameters(), lr=lr)`
        },
        {
          title: "Module 2: TorchVision & Transfer Learning",
          description: "Leverage pre-trained models and TorchVision for powerful image classification.",
          keyConceptsTitle: "What You'll Learn",
          keyConcepts: [
            "TorchVision models & transforms",
            "Feature extraction vs fine-tuning",
            "Freezing/unfreezing layers",
            "Data augmentation strategies"
          ],
          notebooks: [
            { name: "TorchVision Basics", path: "Course-2-Techniques-and-Ecosystem/Module_2/C2_M2_Lab_1_torchvision_1.ipynb", description: "Pre-trained models" },
            { name: "TorchVision Advanced", path: "Course-2-Techniques-and-Ecosystem/Module_2/C2_M2_Lab_2_torchvision_2 (1).ipynb", description: "Model customization" },
            { name: "Transfer Learning", path: "Course-2-Techniques-and-Ecosystem/Module_2/C2_M2_Lab_4_transfer_learning.ipynb", description: "Fine-tuning pre-trained models" }
          ],
          codeHighlight: `# Transfer learning
model = models.resnet18(pretrained=True)
for param in model.parameters():
    param.requires_grad = False  # Freeze layers`
        },
        {
          title: "Module 3: NLP with PyTorch",
          description: "Build text classifiers from tokenization to fine-tuning transformer models.",
          keyConceptsTitle: "What You'll Learn",
          keyConcepts: [
            "Text tokenization techniques",
            "Word embeddings (Word2Vec, GloVe concepts)",
            "Building text classifiers from scratch",
            "Fine-tuning pre-trained language models"
          ],
          notebooks: [
            { name: "Tokenization", path: "Course-2-Techniques-and-Ecosystem/Module_3/C2_M3_Lab_1_basic_tokenization.ipynb", description: "Text preprocessing" },
            { name: "Embeddings", path: "Course-2-Techniques-and-Ecosystem/Module_3/C2_M3_Lab_2_embeddings.ipynb", description: "Word representations" },
            { name: "Text Classifier", path: "Course-2-Techniques-and-Ecosystem/Module_3/C2_M3_Lab_3_build_text_classifier.ipynb", description: "Building from scratch" },
            { name: "Fine-tuned Classifier", path: "Course-2-Techniques-and-Ecosystem/Module_3/C2_M3_Lab_4_finetuned_text_classifier.ipynb", description: "Using pre-trained models" }
          ],
          codeHighlight: `# Embedding layer for NLP
self.embedding = nn.Embedding(vocab_size, embed_dim)
self.lstm = nn.LSTM(embed_dim, hidden_dim, batch_first=True)`
        },
        {
          title: "Module 4: Performance Optimization",
          description: "Optimize training speed and memory usage for production-ready models.",
          keyConceptsTitle: "What You'll Learn",
          keyConcepts: [
            "Optimizing DataLoader (num_workers, pin_memory)",
            "PyTorch Profiler for bottleneck detection",
            "Memory optimization strategies",
            "Mixed precision training"
          ],
          notebooks: [
            { name: "DataLoader Optimization", path: "Course-2-Techniques-and-Ecosystem/Module_4/C2_M4_Lab_1_optimizing_dataloaders.ipynb", description: "Faster data loading" },
            { name: "Profiling", path: "Course-2-Techniques-and-Ecosystem/Module_4/C2_M4_Lab_2_profiling.ipynb", description: "Finding bottlenecks" },
            { name: "Optimization", path: "Course-2-Techniques-and-Ecosystem/Module_4/C2_M4_Lab_3_optimization.ipynb", description: "Memory & speed improvements" }
          ],
          codeHighlight: `# Optimized DataLoader
DataLoader(dataset, batch_size=32, 
           num_workers=4, pin_memory=True)`
        }
      ]
    },
    {
      id: 3,
      title: "Course 3: Advanced Architectures and Deployment",
      status: "completed",
      description: "Modern architectures, generative models, and production deployment strategies",
      icon: <Layers className="h-5 w-5" />,
      modules: [
        {
          title: "Module 1: Advanced Network Architectures",
          description: "Implement state-of-the-art architectures: Siamese Networks, ResNet, and DenseNet.",
          keyConceptsTitle: "What You'll Learn",
          keyConcepts: [
            "Siamese Networks for similarity learning",
            "Skip connections in ResNet",
            "Dense connections in DenseNet",
            "When to use which architecture"
          ],
          notebooks: [
            { name: "Siamese Networks", path: "Course-3-Advanced-Architectures/Module 1/C3_M1_Lab_1_siamese_network.ipynb", description: "Learning similarity with twin networks" },
            { name: "ResNet", path: "Course-3-Advanced-Architectures/Module 1/C3_M1_Lab_2_resnet.ipynb", description: "Residual connections for deep networks" },
            { name: "DenseNet", path: "Course-3-Advanced-Architectures/Module 1/C3_M1_Lab_3_densenet.ipynb", description: "Dense feature reuse" }
          ],
          codeHighlight: `# ResNet skip connection
class ResidualBlock(nn.Module):
    def forward(self, x):
        identity = x
        out = self.layers(x)
        return out + identity  # Skip connection`
        },
        {
          title: "Module 2: Generative Models & Deployment",
          description: "Generative AI with Stable Diffusion, model export with ONNX, and production deployment.",
          keyConceptsTitle: "What You'll Learn",
          keyConcepts: [
            "Stable Diffusion architecture",
            "Hugging Face Diffusers library",
            "Model export with ONNX",
            "Production deployment strategies"
          ],
          notebooks: [
            { name: "Stable Diffusion", path: "Course-3-Advanced-Architectures/Module 2/C3_M2_Lab_1_stable_diffusion.ipynb", description: "Generative AI with diffusion models" },
            { name: "ONNX Export", path: "Course-3-Advanced-Architectures/Module 2/C3_M2_Lab_2_onnx_export.ipynb", description: "Model export for production" }
          ],
          codeHighlight: `# ONNX export for production
torch.onnx.export(model, dummy_input, "model.onnx",
                  input_names=['input'],
                  output_names=['output'],
                  dynamic_axes={'input': {0: 'batch'}})`
        }
      ]
    }
  ]

  const toggleCourse = (courseId: number) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId)
    setExpandedModule(null)
  }

  const toggleModule = (moduleKey: string) => {
    setExpandedModule(expandedModule === moduleKey ? null : moduleKey)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Learning Guide</h2>
        <p className="text-muted-foreground">
          A comprehensive walkthrough of the PyTorch Professional Certificate with hands-on notebooks and key concepts.
        </p>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <Card
            key={course.id}
            className={`transition-all duration-300 ${course.status === "completed"
                ? "border-green-200 dark:border-green-900"
                : course.status === "in-progress"
                  ? "border-orange-200 dark:border-orange-900"
                  : ""
              }`}
          >
            <CardHeader
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleCourse(course.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${course.status === "completed"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-600"
                        : course.status === "in-progress"
                          ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600"
                          : "bg-gray-100 dark:bg-gray-900/30 text-gray-600"
                      }`}>
                      {course.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        {course.title}
                        {course.status === "completed" && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                        {course.status === "in-progress" && <Circle className="h-5 w-5 text-orange-600 fill-orange-600" />}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={
                    course.status === "completed" ? "default" :
                      course.status === "in-progress" ? "secondary" : "outline"
                  }>
                    {course.status === "completed" ? "Completed" :
                      course.status === "in-progress" ? "In Progress" : "Upcoming"}
                  </Badge>
                  {expandedCourse === course.id ?
                    <ChevronUp className="h-5 w-5 text-muted-foreground" /> :
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  }
                </div>
              </div>
            </CardHeader>

            <AnimatePresence>
              {expandedCourse === course.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {course.modules.map((module, idx) => {
                        const moduleKey = `${course.id}-${idx}`
                        const isExpanded = expandedModule === moduleKey

                        return (
                          <div
                            key={idx}
                            className="border rounded-lg overflow-hidden bg-muted/30"
                          >
                            <div
                              className="p-4 cursor-pointer hover:bg-muted/50 transition-colors flex items-center justify-between"
                              onClick={() => toggleModule(moduleKey)}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                                  {idx + 1}
                                </div>
                                <div>
                                  <h4 className="font-semibold">{module.title}</h4>
                                  <p className="text-sm text-muted-foreground">{module.description}</p>
                                </div>
                              </div>
                              {isExpanded ?
                                <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" /> :
                                <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              }
                            </div>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="border-t"
                                >
                                  <div className="p-4 space-y-4">
                                    {/* Key Concepts */}
                                    <div>
                                      <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                                        <BookOpen className="h-4 w-4 text-primary" />
                                        {module.keyConceptsTitle}
                                      </h5>
                                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {module.keyConcepts.map((concept, i) => (
                                          <li key={i} className="flex items-start gap-2 text-sm">
                                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                            <span>{concept}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    {/* Code Highlight */}
                                    {module.codeHighlight && (
                                      <div>
                                        <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                                          <Code className="h-4 w-4 text-primary" />
                                          Code Pattern
                                        </h5>
                                        <pre className="bg-zinc-900 text-zinc-100 p-3 rounded-lg text-xs overflow-x-auto">
                                          <code>{module.codeHighlight}</code>
                                        </pre>
                                      </div>
                                    )}

                                    {/* Notebooks */}
                                    {module.notebooks.length > 0 && (
                                      <div>
                                        <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                                          <Database className="h-4 w-4 text-primary" />
                                          Notebooks
                                        </h5>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                          {module.notebooks.map((nb, i) => (
                                            <a
                                              key={i}
                                              href={`${GITHUB_BASE}/${nb.path}`}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="flex items-center gap-2 p-2 rounded-md bg-background border hover:border-primary hover:bg-primary/5 transition-colors group"
                                            >
                                              <div className="flex-1 min-w-0">
                                                <div className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                                                  {nb.name}
                                                </div>
                                                <div className="text-xs text-muted-foreground truncate">
                                                  {nb.description}
                                                </div>
                                              </div>
                                              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary flex-shrink-0" />
                                            </a>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>

      {/* Learning Outcomes Summary */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Skills Developed
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { skill: "Neural Networks", level: 95 },
              { skill: "Computer Vision", level: 90 },
              { skill: "NLP/Text", level: 85 },
              { skill: "MLOps", level: 75 }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-primary">{item.level}%</div>
                <div className="text-sm text-muted-foreground">{item.skill}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
