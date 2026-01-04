"use client"

import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft, Github, ArrowRight, ExternalLink, ChevronDown, ChevronRight,
  Brain, Zap, Layers, Sparkles, Code2, Eye, Target, Lightbulb, BookOpen,
  CheckCircle2, Play, FileCode, Cpu, Network, BarChart3, Wrench, Rocket,
  TrendingUp, Award, Timer, List, Clock, Sun, Moon, Copy, Check
} from 'lucide-react'
import Link from 'next/link'
import Script from 'next/script'

// ============================================================================
// SCROLLYTELLING COMPONENTS
// ============================================================================

// ScrollSection: Wrapper with scroll-triggered reveal and staggered children
function ScrollSection({
  children,
  className = "",
  staggerChildren = true,
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  staggerChildren?: boolean;
  delay?: number;
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: staggerChildren ? 0.1 : 0,
        delayChildren: delay
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return (
            <motion.div variants={staggerChildren ? itemVariants : undefined}>
              {child}
            </motion.div>
          )
        }
        return child
      })}
    </motion.div>
  )
}

// TypewriterCode: Animated code typing effect
function TypewriterCode({
  code,
  language = "python",
  typingSpeed = 20,
  startDelay = 0
}: {
  code: string;
  language?: string;
  typingSpeed?: number;
  startDelay?: number;
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [displayedCode, setDisplayedCode] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!isInView) return

    let currentIndex = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < code.length) {
          setDisplayedCode(code.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          setIsComplete(true)
          clearInterval(interval)
        }
      }, typingSpeed)

      return () => clearInterval(interval)
    }, startDelay)

    return () => clearTimeout(timeout)
  }, [isInView, code, typingSpeed, startDelay])

  return (
    <div ref={ref} className="rounded-lg bg-zinc-950 border border-zinc-800 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 bg-zinc-900 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-zinc-400" />
          <span className="text-xs text-zinc-400">{language}</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>
      </div>
      <pre className="p-4 text-xs overflow-x-auto min-h-[100px]">
        <code className="text-emerald-400 font-mono leading-relaxed whitespace-pre">
          {displayedCode}
          {!isComplete && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-emerald-400 ml-0.5"
            />
          )}
        </code>
      </pre>
    </div>
  )
}

// ParallaxContainer: Creates depth effect on scroll
function ParallaxContainer({
  children,
  speed = 0.5,
  className = ""
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

// RevealText: Animated text reveal with gradient sweep
function RevealText({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Confetti celebration effect for CTA section
function ConfettiCelebration({ trigger }: { trigger: boolean }) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    color: string;
    delay: number;
    duration: number;
  }>>([])

  useEffect(() => {
    if (trigger) {
      const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899']
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2
      }))
      setParticles(newParticles)
    }
  }, [trigger])

  if (!trigger || particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ y: -20, x: `${particle.x}vw`, opacity: 1, scale: 1 }}
          animate={{
            y: '110vh',
            opacity: 0,
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
            scale: 0.5
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeIn"
          }}
          style={{ backgroundColor: particle.color }}
          className="absolute w-3 h-3 rounded-sm"
        />
      ))}
    </div>
  )
}

// ============================================================================
// END SCROLLYTELLING COMPONENTS
// ============================================================================

// Simple code display (removed complex highlighting that was breaking)

// Floating Table of Contents
function FloatingTOC({ activeSection }: { activeSection: string }) {
  const sections = [
    { id: 'hero', label: 'Overview', icon: Sparkles },
    { id: 'concepts', label: 'Concepts', icon: Brain },
    { id: 'results', label: 'Results', icon: TrendingUp },
    { id: 'journey', label: 'Journey', icon: Rocket },
    { id: 'cta', label: 'Explore', icon: Github },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-2"
    >
      {sections.map((section) => {
        const Icon = section.icon
        const isActive = activeSection === section.id
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`group flex items-center gap-3 py-2 px-3 rounded-full transition-all duration-300 ${isActive
              ? 'bg-white/10 backdrop-blur-sm'
              : 'hover:bg-white/5'
              }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isActive
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25'
              : 'bg-zinc-800 group-hover:bg-zinc-700'
              }`}>
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
            </div>
            <span className={`text-sm font-medium transition-all duration-300 ${isActive ? 'text-white opacity-100' : 'text-zinc-500 opacity-0 group-hover:opacity-100'
              }`}>
              {section.label}
            </span>
          </a>
        )
      })}
    </motion.nav>
  )
}

// Mobile Bottom Navigation
function MobileBottomNav({ activeSection }: { activeSection: string }) {
  const sections = [
    { id: 'hero', label: 'Top', icon: Sparkles },
    { id: 'concepts', label: 'Concepts', icon: Brain },
    { id: 'results', label: 'Results', icon: TrendingUp },
    { id: 'journey', label: 'Journey', icon: Rocket },
    { id: 'cta', label: 'Code', icon: Github },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-40 xl:hidden bg-zinc-900/95 backdrop-blur-xl border-t border-white/10 safe-area-pb"
    >
      <div className="flex justify-around items-center py-2 px-2">
        {sections.map((section) => {
          const Icon = section.icon
          const isActive = activeSection === section.id
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200 min-w-[60px] ${isActive ? 'bg-white/10' : 'active:bg-white/5'
                }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-zinc-400'}`} />
              <span className={`text-[10px] font-medium ${isActive ? 'text-white' : 'text-zinc-500'}`}>
                {section.label}
              </span>
            </a>
          )
        })}
      </div>
    </motion.nav>
  )
}

// Animated counter with count-up effect
function AnimatedCounter({
  value,
  label,
  sublabel,
  delay = 0
}: {
  value: string;
  label: string;
  sublabel: string;
  delay?: number;
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    if (isInView) {
      // Extract numeric part and suffix (e.g., "100+" -> 100, "+")
      const match = value.match(/^(\d+)(.*)$/)
      if (!match) {
        setDisplayValue(value)
        return
      }

      const numericValue = parseInt(match[1], 10)
      const suffix = match[2] || ''
      const duration = 1500
      const steps = 60
      let current = 0
      const increment = numericValue / steps

      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          current += increment
          if (current >= numericValue) {
            setDisplayValue(value)
            clearInterval(interval)
          } else {
            setDisplayValue(Math.floor(current).toString() + suffix)
          }
        }, duration / steps)

        return () => clearInterval(interval)
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [isInView, value, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: delay / 1000, duration: 0.5 }}
      className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
    >
      <div className="text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent tabular-nums">
        {displayValue}
      </div>
      <div className="text-white/80 font-medium">{label}</div>
      <div className="text-white/40 text-sm">{sublabel}</div>
    </motion.div>
  )
}

// Keyboard navigation hint
function KeyboardHint() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Hide hint after first navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'j' || e.key === 'k') {
        setIsVisible(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 2 }}
      className="fixed bottom-24 right-6 text-xs text-zinc-500 hidden xl:flex items-center gap-2 bg-zinc-900/80 backdrop-blur-sm px-3 py-2 rounded-full border border-zinc-800"
    >
      <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono">j</kbd>
      <span>/</span>
      <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono">k</kbd>
      <span className="text-zinc-400">navigate</span>
    </motion.div>
  )
}

// Section reading time estimates
const sectionReadingTimes: Record<string, string> = {
  concepts: "5 min read",
  results: "3 min read",
  journey: "8 min read"
}

// Real Results from Notebooks
const projectResults = [
  {
    title: "DenseNet Transfer Learning",
    metric: "Accuracy",
    before: "76.53%",
    after: "90.91%",
    improvement: "+14.38%",
    description: "21-class land use classification with only 100 images per class",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "MNIST Classifier",
    metric: "Accuracy",
    before: "~85%",
    after: "99%",
    improvement: "+14%",
    description: "Digit recognition with fully connected neural network",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Optuna HPO",
    metric: "Search Speed",
    before: "Grid Search",
    after: "10x Faster",
    improvement: "Bayesian",
    description: "Automated hyperparameter optimization with pruning",
    color: "from-emerald-500 to-teal-500"
  }
]

// Results Section Component
function ResultsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="results" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Badge variant="outline" className="border-white/20">
              <TrendingUp className="w-4 h-4 mr-2" />
              Real Results
            </Badge>
            <Badge className="bg-zinc-800/80 text-zinc-300 border-zinc-700">
              <Clock className="w-3 h-3 mr-1" />
              {sectionReadingTimes.results}
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Measurable
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> Impact</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Actual metrics from my notebook experiments — not theoretical, but proven
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projectResults.map((result, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
            >
              <Card className="h-full bg-zinc-900/70 border-zinc-700 overflow-hidden group hover:border-zinc-500 transition-all duration-500">
                <div className={`h-2 bg-gradient-to-r ${result.color}`} />
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">{result.title}</h3>
                  <p className="text-zinc-400 text-sm mb-6">{result.description}</p>

                  <div className="flex items-center justify-between gap-4">
                    <div className="text-center">
                      <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Before</div>
                      <div className="text-lg font-mono text-zinc-300">{result.before}</div>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                        className={`px-3 py-1 rounded-full bg-gradient-to-r ${result.color} text-white text-xs font-bold`}
                      >
                        {result.improvement}
                      </motion.div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1">After</div>
                      <div className="text-lg font-mono text-emerald-400 font-bold">{result.after}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Lessons Learned */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 grid md:grid-cols-2 gap-6"
        >
          <Card className="p-6 bg-zinc-900/80 border-amber-500/30">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/30 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-amber-400">Biggest Challenge</h4>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Understanding why my gradients kept exploding in deep networks — until I realized BatchNorm wasn't just optional. The moment skip connections clicked, everything changed.
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-zinc-900/80 border-blue-500/30">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-blue-400">What I'd Do Differently</h4>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Start with transfer learning from day one. I spent weeks training from scratch before discovering that a pre-trained backbone + small head gets you 90% of the way in 5 minutes.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

const GITHUB_BASE = "https://github.com/YKaanKaya/deeplearning-ai-pytorch/tree/main"

// Concept Relationship Flow Diagram
function ConceptFlowDiagram() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const flowSteps = [
    { label: "Tensors", sublabel: "Foundation", color: "from-blue-500 to-indigo-500", icon: "📐" },
    { label: "Networks", sublabel: "Building Blocks", color: "from-emerald-500 to-teal-500", icon: "🧠" },
    { label: "Training", sublabel: "Core Pattern", color: "from-amber-500 to-orange-500", icon: "⚡" },
    { label: "Transfer", sublabel: "Technique", color: "from-purple-500 to-pink-500", icon: "🔄" },
    { label: "Production", sublabel: "MLOps", color: "from-cyan-500 to-blue-500", icon: "🚀" },
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-12 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800"
    >
      <h3 className="text-center text-sm font-medium text-zinc-400 mb-6 uppercase tracking-wider">
        Learning Progression
      </h3>

      {/* Desktop horizontal flow */}
      <div className="hidden md:flex items-center justify-between gap-2">
        {flowSteps.map((step, i) => (
          <React.Fragment key={i}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex-1 text-center group"
            >
              <a href="#concepts" className="block">
                <div className={`mx-auto w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-2xl mb-2 shadow-lg group-hover:scale-110 transition-transform`}>
                  {step.icon}
                </div>
                <div className="font-semibold text-white text-sm">{step.label}</div>
                <div className="text-xs text-zinc-500">{step.sublabel}</div>
              </a>
            </motion.div>

            {i < flowSteps.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
                className="flex-shrink-0 w-8 h-0.5 bg-gradient-to-r from-zinc-600 to-zinc-700 origin-left"
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile vertical flow */}
      <div className="flex md:hidden flex-col gap-3">
        {flowSteps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-xl shadow-lg flex-shrink-0`}>
              {step.icon}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white text-sm">{step.label}</div>
              <div className="text-xs text-zinc-500">{step.sublabel}</div>
            </div>
            {i < flowSteps.length - 1 && (
              <ChevronDown className="w-4 h-4 text-zinc-600 absolute left-6 -bottom-2" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Animated gradient background - theme aware
function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Background uses the theme's background variable */}
      <div className="absolute inset-0 bg-background transition-colors duration-300" />
      {/* Gradient blobs */}
      <motion.div
        className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/20 dark:bg-blue-600/20 rounded-full blur-[120px]"
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/20 dark:bg-purple-600/20 rounded-full blur-[120px]"
        animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
      />
    </div>
  )
}

// Concept Card with visual diagram and enhanced interactions
function ConceptCard({ concept, delay = 0 }: { concept: typeof concepts[0]; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [isHovered, setIsHovered] = useState(false)
  const [showPlayground, setShowPlayground] = useState(false)
  const [editableCode, setEditableCode] = useState(concept.code)

  // Expected outputs for each concept (mock)
  const expectedOutputs: Record<string, string> = {
    "Tensor Operations": "tensor([2., 4.])",
    "Neural Network Architecture": "torch.Size([1, 64, 112, 112])",
    "Training Loop Mastery": "Epoch 1: loss=0.234",
    "Transfer Learning": "Parameters to train: 2048 * num_classes",
    "Optuna Hyperparameter Tuning": "Best params: {'lr': 0.001, 'batch_size': 32}",
    "Skip Connections (ResNet)": "torch.Size([1, 64, 224, 224])"
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.02 : 1,
          y: isHovered ? -4 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card className={`h-full bg-zinc-900/50 border-zinc-800 transition-all duration-500 overflow-hidden ${isHovered ? 'border-zinc-600 shadow-xl shadow-blue-500/10' : ''
          }`}>
          {/* Visual header with animated glow */}
          <div className={`h-48 relative overflow-hidden ${concept.bgGradient}`}>
            {/* Animated glow effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: isHovered ? '200%' : '-100%' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className={isInView ? "svg-animate" : ""}
                style={{
                  // GPU acceleration hints for smooth animations
                  willChange: isHovered ? 'transform' : 'auto'
                }}
              >
                {concept.visual}
              </motion.div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <Badge className={concept.badgeClass}>{concept.category}</Badge>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
              {concept.title}
            </h3>
            <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
              {concept.description}
            </p>

            {/* Key insight with reveal animation */}
            <motion.div
              className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 mb-4 overflow-hidden"
              animate={{ borderColor: isHovered ? 'rgba(245, 158, 11, 0.3)' : 'rgba(63, 63, 70, 0.5)' }}
            >
              <div className="flex items-start gap-3">
                <motion.div
                  animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                </motion.div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Key Insight</div>
                  <p className="text-sm text-white/80">{concept.insight}</p>
                </div>
              </div>
            </motion.div>

            {/* Code snippet - clean styling */}
            <div className="rounded-lg bg-zinc-950 border border-zinc-800 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 bg-zinc-900 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-zinc-400" />
                  <span className="text-xs text-zinc-400">Python</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
              </div>
              <pre className="p-4 text-xs overflow-x-auto">
                <code className="text-emerald-400 font-mono leading-relaxed whitespace-pre">
                  {concept.code}
                </code>
              </pre>
            </div>

            {/* Try It Button */}
            <div className="mt-3 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-zinc-400 hover:text-white hover:bg-zinc-800"
                onClick={() => setShowPlayground(!showPlayground)}
              >
                <Play className="w-3 h-3 mr-1" />
                {showPlayground ? 'Hide Editor' : 'Try It'}
              </Button>
            </div>

            {/* Interactive Code Playground */}
            <AnimatePresence>
              {showPlayground && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 rounded-lg bg-zinc-950 border border-blue-500/30 overflow-hidden">
                    <div className="px-3 py-2 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-blue-400">Interactive Editor</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs h-6 px-2 text-emerald-400 hover:text-emerald-300"
                        onClick={() => setEditableCode(concept.code)}
                      >
                        Reset
                      </Button>
                    </div>
                    <textarea
                      value={editableCode}
                      onChange={(e) => setEditableCode(e.target.value)}
                      className="w-full p-4 bg-transparent text-emerald-400 font-mono text-xs resize-none focus:outline-none min-h-[150px] leading-relaxed"
                      spellCheck={false}
                      placeholder="Edit the code here..."
                    />
                    <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-900/50">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-xs text-zinc-500">Expected Output:</span>
                      </div>
                      <pre className="text-xs text-cyan-400 font-mono bg-zinc-950 p-2 rounded">
                        {expectedOutputs[concept.title] || 'Run to see output'}
                      </pre>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}

// Learning Module with deep content
function LearningModule({ module, index }: { module: typeof learningPath[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Timeline connector */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-700 to-transparent hidden lg:block" />

      <Card className={`relative overflow-hidden transition-all duration-500 ${isExpanded ? 'bg-gradient-to-br ' + module.gradient : 'bg-zinc-900/70'
        } border-zinc-800 hover:border-zinc-700`}>
        {/* Header */}
        <div
          className="p-6 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-start gap-6">
            {/* Module number indicator */}
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isExpanded
              ? 'bg-gradient-to-br from-white/30 to-white/10 shadow-lg'
              : 'bg-gradient-to-br from-zinc-700 to-zinc-800 border border-zinc-700'
              }`}>
              <span className={`text-3xl font-bold transition-colors duration-300 ${isExpanded ? 'text-white' : 'text-zinc-400'
                }`}>
                {index + 1}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className={`${isExpanded ? 'border-white/30 text-white' : 'border-zinc-600 text-zinc-300'}`}>
                  {module.course}
                </Badge>
                {module.status === 'completed' && (
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Complete
                  </Badge>
                )}
                {module.status === 'in-progress' && (
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mr-2 animate-pulse" /> In Progress
                  </Badge>
                )}
              </div>

              <h3 className={`text-2xl font-bold mb-2 text-white`}>
                {module.title}
              </h3>
              <p className={`${isExpanded ? 'text-zinc-200' : 'text-zinc-400'}`}>
                {module.description}
              </p>

              {/* Quick stats */}
              <div className="flex gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm text-zinc-400">{module.notebooks} notebooks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm text-zinc-400">{module.projects} projects</span>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0"
            >
              <ChevronRight className={`w-6 h-6 ${isExpanded ? 'text-white' : 'text-zinc-500'}`} />
            </motion.div>
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-6 pb-6 space-y-6">
                {/* What I Learned */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-white/60" />
                    What I Learned
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {module.learnings.map((learning, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-black/20"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/90">{learning}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Technical Deep Dive */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-white/60" />
                    Technical Deep Dive
                  </h4>
                  <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                    <p className="text-white/80 mb-4">{module.deepDive}</p>
                    <pre className="bg-zinc-950 rounded-lg p-4 overflow-x-auto">
                      <code className="text-sm text-emerald-400">{module.codeExample}</code>
                    </pre>
                  </div>
                </div>

                {/* Projects */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-white/60" />
                    Projects Built
                  </h4>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {module.projectsList.map((project, i) => (
                      <a
                        key={i}
                        href={`${GITHUB_BASE}/${project.path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-xl bg-black/20 border border-white/10 hover:border-white/30 transition-all group/project"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium group-hover/project:text-blue-400 transition-colors">
                            {project.name}
                          </span>
                          <ExternalLink className="w-4 h-4 text-white/40 group-hover/project:text-blue-400" />
                        </div>
                        <p className="text-sm text-white/50">{project.description}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}

// Core concepts data
const concepts = [
  {
    title: "Tensor Operations",
    category: "Foundation",
    description: "PyTorch tensors are the foundation - n-dimensional arrays with GPU acceleration and automatic differentiation support.",
    insight: "The key breakthrough: tensors track their computational history, enabling automatic gradient calculation through the entire network.",
    code: `# Tensors with autograd
x = torch.tensor([1.0, 2.0], requires_grad=True)
y = x.pow(2).sum()  # y = x₁² + x₂²
y.backward()        # Compute gradients
print(x.grad)       # tensor([2., 4.]) = [2x₁, 2x₂]`,
    bgGradient: "bg-gradient-to-br from-blue-600/30 to-indigo-600/30",
    badgeClass: "bg-blue-500/20 text-blue-400",
    visual: (
      <svg viewBox="0 0 200 120" className="w-48 h-28">
        <defs>
          <linearGradient id="tensorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        {/* 3D tensor cube */}
        <g transform="translate(70, 30)">
          <path d="M0,30 L30,15 L60,30 L30,45 Z" fill="url(#tensorGrad)" opacity="0.8" />
          <path d="M0,30 L0,60 L30,75 L30,45 Z" fill="url(#tensorGrad)" opacity="0.6" />
          <path d="M30,45 L60,30 L60,60 L30,75 Z" fill="url(#tensorGrad)" opacity="0.4" />
          <text x="30" y="55" textAnchor="middle" className="fill-white text-xs font-mono">[B, C, H, W]</text>
        </g>
      </svg>
    )
  },
  {
    title: "Neural Network Architecture",
    category: "Building Blocks",
    description: "Layer composition using nn.Module - the elegant abstraction that makes complex networks simple to build and train.",
    insight: "nn.Sequential chains layers linearly, but real power comes from custom forward() methods where you control data flow.",
    code: `class CNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 64, 3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2)
        )
    
    def forward(self, x):
        return self.features(x)`,
    bgGradient: "bg-gradient-to-br from-emerald-600/30 to-teal-600/30",
    badgeClass: "bg-emerald-500/20 text-emerald-400",
    visual: (
      <svg viewBox="0 0 200 100" className="w-48 h-24">
        {/* Network layers visualization */}
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${30 + i * 40}, 20)`}>
            <rect x="0" y="0" width="25" height={60 - i * 10} rx="4" fill={`rgba(16, 185, 129, ${0.3 + i * 0.15})`} />
            {i < 3 && <line x1="25" y1="25" x2="40" y2="25" stroke="#10b981" strokeWidth="2" strokeDasharray="4" />}
          </g>
        ))}
        <text x="100" y="95" textAnchor="middle" className="fill-white/60 text-xs">Layer Stack</text>
      </svg>
    )
  },
  {
    title: "Training Loop Mastery",
    category: "Core Pattern",
    description: "The training loop is where theory meets practice - forward pass, loss computation, backward pass, and optimization step.",
    insight: "zero_grad() before backward() is crucial - PyTorch accumulates gradients by default, which is useful for gradient accumulation but dangerous if forgotten.",
    code: `for epoch in range(epochs):
    for batch_x, batch_y in dataloader:
        optimizer.zero_grad()       # Clear gradients
        predictions = model(batch_x) # Forward pass
        loss = criterion(predictions, batch_y)
        loss.backward()             # Compute gradients
        optimizer.step()            # Update weights`,
    bgGradient: "bg-gradient-to-br from-amber-600/30 to-orange-600/30",
    badgeClass: "bg-amber-500/20 text-amber-400",
    visual: (
      <svg viewBox="0 0 200 100" className="w-48 h-24">
        {/* Circular training loop */}
        <circle cx="100" cy="50" r="35" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="8 4" />
        <circle cx="100" cy="15" r="8" fill="#f59e0b" />
        <circle cx="135" cy="50" r="8" fill="#f59e0b" />
        <circle cx="100" cy="85" r="8" fill="#f59e0b" />
        <circle cx="65" cy="50" r="8" fill="#f59e0b" />
        <text x="100" y="19" textAnchor="middle" className="fill-white text-[8px]">fwd</text>
        <text x="135" y="54" textAnchor="middle" className="fill-white text-[8px]">loss</text>
        <text x="100" y="89" textAnchor="middle" className="fill-white text-[8px]">bwd</text>
        <text x="65" y="54" textAnchor="middle" className="fill-white text-[8px]">opt</text>
      </svg>
    )
  },
  {
    title: "Transfer Learning",
    category: "Production Technique",
    description: "Leverage pre-trained models to achieve state-of-the-art results with minimal data. Fine-tune the final layers while freezing earlier features.",
    insight: "Early layers learn universal features (edges, textures). Only fine-tune later layers for your specific task to avoid catastrophic forgetting.",
    code: `# Load pre-trained ResNet
model = models.resnet50(pretrained=True)

# Freeze early layers
for param in model.parameters():
    param.requires_grad = False

# Replace final layer for your task
model.fc = nn.Linear(2048, num_classes)

# Only train the new layer
optimizer = optim.Adam(model.fc.parameters())`,
    bgGradient: "bg-gradient-to-br from-purple-600/30 to-pink-600/30",
    badgeClass: "bg-purple-500/20 text-purple-400",
    visual: (
      <svg viewBox="0 0 200 100" className="w-48 h-24">
        {/* Transfer learning visualization */}
        <rect x="20" y="30" width="70" height="40" rx="6" fill="#7c3aed" opacity="0.3" />
        <text x="55" y="52" textAnchor="middle" className="fill-white text-[8px]">Frozen</text>
        <line x1="90" y1="50" x2="110" y2="50" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)" />
        <rect x="110" y="30" width="70" height="40" rx="6" fill="#a855f7" opacity="0.6" />
        <text x="145" y="52" textAnchor="middle" className="fill-white text-[8px]">Trainable</text>
      </svg>
    )
  },
  {
    title: "Optuna Hyperparameter Tuning",
    category: "MLOps",
    description: "Automated hyperparameter optimization using Bayesian search - finds optimal configurations that human intuition would miss.",
    insight: "Optuna's pruning feature stops unpromising trials early, making hyperparameter search 10x faster than grid search.",
    code: `def objective(trial):
    lr = trial.suggest_float('lr', 1e-5, 1e-1, log=True)
    batch = trial.suggest_int('batch_size', 16, 128)
    layers = trial.suggest_int('n_layers', 1, 5)
    
    model = build_model(layers)
    accuracy = train_and_eval(model, lr, batch)
    return accuracy

study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=100)`,
    bgGradient: "bg-gradient-to-br from-cyan-600/30 to-blue-600/30",
    badgeClass: "bg-cyan-500/20 text-cyan-400",
    visual: (
      <svg viewBox="0 0 200 100" className="w-48 h-24">
        {/* Optimization landscape */}
        <path d="M20,70 Q50,20 80,60 Q110,90 140,40 Q170,10 180,50" fill="none" stroke="#06b6d4" strokeWidth="2" />
        <circle cx="140" cy="40" r="6" fill="#06b6d4" />
        <text x="140" y="30" textAnchor="middle" className="fill-white text-[8px]">optimal</text>
      </svg>
    )
  },
  {
    title: "Skip Connections (ResNet)",
    category: "Advanced Architecture",
    description: "Residual connections allow gradients to flow directly through the network, enabling training of 100+ layer networks.",
    insight: "The identity mapping (x + F(x)) means the network only needs to learn the residual - much easier than learning the full transformation.",
    code: `class ResidualBlock(nn.Module):
    def __init__(self, channels):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(channels, channels, 3, padding=1),
            nn.BatchNorm2d(channels),
            nn.ReLU(),
            nn.Conv2d(channels, channels, 3, padding=1),
            nn.BatchNorm2d(channels)
        )
    
    def forward(self, x):
        return F.relu(x + self.conv(x))  # Skip!`,
    bgGradient: "bg-gradient-to-br from-rose-600/30 to-red-600/30",
    badgeClass: "bg-rose-500/20 text-rose-400",
    visual: (
      <svg viewBox="0 0 200 100" className="w-48 h-24">
        {/* Skip connection visualization */}
        <rect x="30" y="35" width="40" height="30" rx="4" fill="#f43f5e" opacity="0.5" />
        <rect x="90" y="35" width="40" height="30" rx="4" fill="#f43f5e" opacity="0.5" />
        <line x1="70" y1="50" x2="90" y2="50" stroke="#f43f5e" strokeWidth="2" />
        <path d="M30,50 Q30,20 90,20 L130,20 Q150,20 150,50" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4" />
        <circle cx="150" cy="50" r="8" fill="#f43f5e" />
        <text x="150" y="54" textAnchor="middle" className="fill-white text-[8px]">+</text>
      </svg>
    )
  }
]

// Learning path data
const learningPath: Array<{
  title: string;
  course: string;
  description: string;
  status: "completed" | "in-progress";
  gradient: string;
  icon: React.ReactNode;
  notebooks: number;
  projects: number;
  learnings: string[];
  deepDive: string;
  codeExample: string;
  projectsList: Array<{ name: string; description: string; path: string }>;
}> = [
    {
      title: "Neural Network Fundamentals",
      course: "Course 1",
      description: "Built my first neural networks from scratch, understanding how tensors, gradients, and optimization work together.",
      status: "completed" as const,
      gradient: "from-blue-600/80 to-indigo-700/80",
      icon: <Brain className="w-8 h-8 text-blue-400" />,
      notebooks: 12,
      projects: 4,
      learnings: [
        "PyTorch tensors and GPU acceleration",
        "Automatic differentiation with autograd",
        "Building networks with nn.Module",
        "Training loops and batch processing",
        "MNIST digit classification (99% accuracy)",
        "Data augmentation strategies"
      ],
      deepDive: "The biggest revelation was understanding how autograd tracks operations to build a computational graph. When you call .backward(), PyTorch walks this graph in reverse, computing gradients via the chain rule. This elegant design is what makes PyTorch so flexible for research.",
      codeExample: `# The magic of autograd
x = torch.randn(100, 10, requires_grad=True)
W = torch.randn(10, 5, requires_grad=True)
b = torch.randn(5, requires_grad=True)

# Forward: PyTorch builds computation graph
y = x @ W + b
loss = y.pow(2).mean()

# Backward: gradients computed automatically
loss.backward()
# W.grad now contains ∂loss/∂W`,
      projectsList: [
        { name: "MNIST Classifier", description: "Fully connected network achieving 99% accuracy", path: "Course-1-PyTorch-Exploration/Module%202" },
        { name: "Letter Detective", description: "Extended MNIST with letter recognition", path: "Course-1-PyTorch-Exploration/Module%202" },
        { name: "Nature CNN", description: "CIFAR-100 multi-class classification", path: "Course-1-PyTorch-Exploration/Module%204" },
        { name: "Robust CNN", description: "Data augmentation and regularization", path: "Course-1-PyTorch-Exploration/Module%204" }
      ]
    },
    {
      title: "Production Optimization",
      course: "Course 2",
      description: "Moved beyond accuracy to production concerns: hyperparameter tuning, transfer learning, NLP, and performance profiling.",
      status: "completed" as const,
      gradient: "from-emerald-600/80 to-teal-700/80",
      icon: <Zap className="w-8 h-8 text-emerald-400" />,
      notebooks: 19,
      projects: 5,
      learnings: [
        "Optuna for automated hyperparameter search",
        "Learning rate schedulers (Cosine, OneCycle)",
        "Transfer learning with frozen layers",
        "Text tokenization and embeddings",
        "PyTorch Profiler for bottleneck detection",
        "DataLoader optimization (workers, pinning)"
      ],
      deepDive: "Optuna completely changed how I approach model development. Instead of manually tuning, I define a search space and let Bayesian optimization find configurations I never would have tried. The pruning feature stops bad trials early, making 100-trial searches practical.",
      codeExample: `# Optuna finds what intuition misses
def objective(trial):
    # Search space definition
    lr = trial.suggest_float('lr', 1e-5, 1e-1, log=True)
    optimizer = trial.suggest_categorical('opt', ['Adam', 'SGD'])
    
    # Early stopping for unpromising trials
    for epoch in range(100):
        accuracy = train_epoch(model, lr, optimizer)
        trial.report(accuracy, epoch)
        if trial.should_prune():
            raise optuna.TrialPruned()
    
    return accuracy`,
      projectsList: [
        { name: "Hyperparameter Search", description: "Optuna-optimized model configuration", path: "Course-2-Techniques-and-Ecosystem/Module_1" },
        { name: "Transfer Learning", description: "Fine-tuned ResNet for custom dataset", path: "Course-2-Techniques-and-Ecosystem/Module_2" },
        { name: "Text Classifier", description: "Sentiment analysis with embeddings", path: "Course-2-Techniques-and-Ecosystem/Module_3" },
        { name: "Fine-tuned BERT", description: "Pre-trained transformer fine-tuning", path: "Course-2-Techniques-and-Ecosystem/Module_3" },
        { name: "Performance Profiling", description: "Optimized training pipeline", path: "Course-2-Techniques-and-Ecosystem/Module_4" }
      ]
    },
    {
      title: "Advanced Architectures",
      course: "Course 3",
      description: "State-of-the-art architectures, transformers, generative AI, and production deployment with MLOps.",
      status: "completed" as const,
      gradient: "from-purple-600/80 to-pink-700/80",
      icon: <Layers className="w-8 h-8 text-purple-400" />,
      notebooks: 13,
      projects: 8,
      learnings: [
        "Siamese networks for similarity learning",
        "Skip connections and residual learning",
        "Dense connections for feature reuse",
        "Model interpretation & saliency maps",
        "Stable Diffusion with Hugging Face Diffusers",
        "Transformer architecture from scratch",
        "Self-attention & multi-head attention",
        "MLflow experiment tracking",
        "ONNX export for production",
        "Model pruning & quantization"
      ],
      deepDive: "This course covered the full modern deep learning stack: from advanced architectures (Siamese, ResNet, DenseNet) through model interpretation and generative AI (Stable Diffusion), to transformers built from scratch (attention, encoder, decoder), and finally production MLOps (MLflow, ONNX, pruning, quantization).",
      codeExample: `# Self-attention mechanism
class SelfAttention(nn.Module):
    def forward(self, Q, K, V):
        scores = torch.matmul(Q, K.transpose(-2, -1))
        scores = scores / math.sqrt(self.d_k)
        attn = F.softmax(scores, dim=-1)
        return torch.matmul(attn, V)`,
      projectsList: [
        { name: "Siamese Networks", description: "Similarity learning for verification", path: "Course-3-Advanced-Architectures/Module%201" },
        { name: "ResNet & DenseNet", description: "Advanced CNN architectures", path: "Course-3-Advanced-Architectures/Module%201" },
        { name: "Model Interpretation", description: "Saliency maps & visualization", path: "Course-3-Advanced-Architectures/Module%202" },
        { name: "Stable Diffusion", description: "Generative AI with diffusion models", path: "Course-3-Advanced-Architectures/Module%202" },
        { name: "Transformer Encoder", description: "Self-attention from scratch", path: "Course-3-Advanced-Architectures/Module%203" },
        { name: "Transformer Decoder", description: "Complete transformer architecture", path: "Course-3-Advanced-Architectures/Module%203" },
        { name: "MLflow Tracking", description: "Experiment versioning & logging", path: "Course-3-Advanced-Architectures/Module%204" },
        { name: "ONNX & Optimization", description: "Pruning, quantization, export", path: "Course-3-Advanced-Architectures/Module%204" }
      ]
    }
  ]

// Stats for hero
const stats = [
  { value: "3", label: "Courses", sublabel: "Professional Certificate" },
  { value: "44", label: "Notebooks", sublabel: "Hands-on Practice" },
  { value: "17", label: "Projects", sublabel: "Real Applications" },
  { value: "100+", label: "Hours", sublabel: "Deep Learning" }
]

export function ShowcaseApp() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const smoothProgress = useSpring(scrollYProgress, { damping: 20 })
  const [activeSection, setActiveSection] = useState('hero')
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const ctaRef = useRef<HTMLDivElement>(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" })

  // Trigger confetti when CTA section comes into view
  useEffect(() => {
    if (ctaInView && !showConfetti) {
      setShowConfetti(true)
    }
  }, [ctaInView, showConfetti])

  // Expanded modules state with localStorage persistence
  const [expandedModules, setExpandedModules] = useState<Set<number>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pytorch-expanded-modules')
      return saved ? new Set(JSON.parse(saved)) : new Set()
    }
    return new Set()
  })

  // Hydration fix for theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Save expanded modules to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('pytorch-expanded-modules', JSON.stringify(Array.from(expandedModules)))
    }
  }, [expandedModules, mounted])

  // Restore scroll position on mount
  useEffect(() => {
    const savedSection = localStorage.getItem('pytorch-active-section')
    if (savedSection && mounted) {
      setTimeout(() => {
        document.getElementById(savedSection)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [mounted])

  // Save active section with debounce
  useEffect(() => {
    if (mounted) {
      const timeout = setTimeout(() => {
        localStorage.setItem('pytorch-active-section', activeSection)
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [activeSection, mounted])

  // Track active section for floating TOC
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'concepts', 'results', 'journey', 'cta']
      const scrollPosition = window.scrollY + 200

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Keyboard navigation (j/k or arrow keys)
  useEffect(() => {
    const sections = ['hero', 'concepts', 'results', 'journey', 'cta']
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      const currentIndex = sections.indexOf(activeSection)
      if (e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault()
        const nextIndex = Math.min(currentIndex + 1, sections.length - 1)
        document.getElementById(sections[nextIndex])?.scrollIntoView({ behavior: 'smooth' })
      } else if (e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault()
        const prevIndex = Math.max(currentIndex - 1, 0)
        document.getElementById(sections[prevIndex])?.scrollIntoView({ behavior: 'smooth' })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSection])

  // Share/copy URL handler
  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}/showcase/PyTorchDeepLearning#${activeSection}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [activeSection])

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "PyTorch for Deep Learning Professional Certificate",
    "description": "Comprehensive deep learning mastery from neural network fundamentals to advanced architectures.",
    "provider": { "@type": "Organization", "name": "DeepLearning.AI" },
    "author": { "@type": "Person", "name": "Kaan Kaya" }
  }

  return (
    <>
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>

      <GradientBackground />
      <FloatingTOC activeSection={activeSection} />
      <MobileBottomNav activeSection={activeSection} />
      <KeyboardHint />

      <div ref={containerRef} className="relative text-foreground transition-colors duration-300">
        {/* Progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500 z-50 origin-left"
          style={{ scaleX: smoothProgress }}
        />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-black/50 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 transition-colors">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="icon" className="rounded-full hover:bg-slate-200 dark:hover:bg-white/10">
                <Link href="/"><ArrowLeft className="h-5 w-5" /></Link>
              </Button>
              <span className="font-medium hidden sm:inline">PyTorch Deep Learning Journey</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="hidden sm:flex border-slate-300 dark:border-white/20">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
                3/3 Complete
              </Badge>
              {/* Theme toggle */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-slate-200 dark:hover:bg-white/10"
                  onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                  aria-label="Toggle theme"
                >
                  {resolvedTheme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              )}
              {/* Share button */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-white/10"
                onClick={handleShare}
                aria-label="Copy link"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button asChild size="sm" className="rounded-full bg-white text-black hover:bg-white/90">
                <a href="https://github.com/YKaanKaya/deeplearning-ai-pytorch" target="_blank">
                  <Github className="h-4 w-4 mr-2" />
                  Code
                </a>
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 px-4 py-2 bg-white/5 border-white/10">
                <Sparkles className="w-4 h-4 mr-2 text-amber-400" />
                DeepLearning.AI Professional Certificate
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
            >
              From Tensors to
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
                Production AI
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              A deep dive into PyTorch — building neural networks, optimizing for production, and implementing state-of-the-art architectures
            </motion.p>

            {/* Stats with animated counters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, i) => (
                <AnimatedCounter
                  key={i}
                  value={stat.value}
                  label={stat.label}
                  sublabel={stat.sublabel}
                  delay={i * 150}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button asChild size="lg" className="rounded-full px-8 bg-white text-black hover:bg-white/90">
                <a href="#concepts">
                  Explore the Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-16"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChevronDown className="w-8 h-8 mx-auto text-white/30" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Core Concepts */}
        <section id="concepts" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Badge variant="outline" className="border-white/20">Core Concepts</Badge>
                <Badge className="bg-zinc-800/80 text-zinc-300 border-zinc-700">
                  <Clock className="w-3 h-3 mr-1" />
                  {sectionReadingTimes.concepts}
                </Badge>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                The Building Blocks of
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Deep Learning</span>
              </h2>
              <p className="text-white/50 text-lg max-w-2xl mx-auto">
                Each concept builds on the last — from tensors to production-ready architectures
              </p>
            </motion.div>

            {/* Flow diagram showing concept relationships */}
            <ConceptFlowDiagram />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {concepts.map((concept, i) => (
                <ConceptCard key={i} concept={concept} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* Results Section with real metrics */}
        <ResultsSection />

        {/* Learning Path */}
        <section id="journey" className="py-32 px-6 bg-zinc-950/50">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Badge variant="outline" className="border-zinc-600 text-zinc-300">Learning Path</Badge>
                <Badge className="bg-zinc-800/80 text-zinc-300 border-zinc-700">
                  <Clock className="w-3 h-3 mr-1" />
                  {sectionReadingTimes.journey}
                </Badge>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                The Complete
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Journey</span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                Click each module to explore what I learned, built, and discovered
              </p>
            </motion.div>

            <div className="space-y-6">
              {learningPath.map((module, i) => (
                <LearningModule key={i} module={module} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA - Celebration Finale */}
        <section id="cta" ref={ctaRef} className="py-32 px-6 relative overflow-hidden">
          <ConfettiCelebration trigger={showConfetti} />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            {/* Animated Certificate Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={ctaInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Award className="w-8 h-8 text-emerald-400" />
                </motion.div>
                <div className="text-left">
                  <div className="text-sm text-emerald-400 font-medium">Certificate Completed</div>
                  <div className="text-white font-bold">January 2026</div>
                </div>
                <a
                  href="https://learn.deeplearning.ai/certificates/2a9c2778-7424-4379-b34a-384272c9303c"
                  target="_blank"
                  className="ml-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            <RevealText delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Explore the
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Code</span>
              </h2>
            </RevealText>

            <RevealText delay={0.3}>
              <p className="text-zinc-400 text-lg mb-8">
                All 44 notebooks, implementations, and experiments are open source
              </p>
            </RevealText>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button asChild size="lg" className="rounded-full px-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg shadow-blue-500/25">
                <a href="https://github.com/YKaanKaya/deeplearning-ai-pytorch" target="_blank">
                  <Github className="mr-2 w-5 h-5" />
                  View Repository
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-zinc-600 text-white hover:bg-zinc-800">
                <Link href="/">
                  <ArrowLeft className="mr-2 w-5 h-5" />
                  Back to Portfolio
                </Link>
              </Button>
            </motion.div>

            {/* Floating achievement badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={ctaInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-12 flex flex-wrap justify-center gap-3"
            >
              {['PyTorch', 'Deep Learning', 'Transformers', 'MLOps', 'ONNX'].map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700 text-sm text-zinc-300"
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
