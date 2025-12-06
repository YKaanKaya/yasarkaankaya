"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { projects } from "@/lib/data"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from 'react'
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { ExternalLink, Github, Star, ArrowRight } from "lucide-react"
import { GradientBorder } from "@/components/ui/GradientMesh"

export function Projects() {
    const ref = useRef<HTMLElement>(null)
    const horizontalRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: horizontalRef,
        offset: ["start end", "end start"]
    })

    // Get featured and regular projects
    const featuredProjects = projects.filter(p => p.featured)
    const regularProjects = projects.filter(p => !p.featured)

    const isGithub = (url: string) => url.includes('github.com')

    return (
        <section ref={ref} id="projects" className="py-24 md:py-32 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-secondary/50 to-secondary/30" />
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4">
                {/* Section header */}
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <span className="text-primary font-medium text-sm uppercase tracking-wider">
                            Featured Work
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                            Projects
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                    </div>
                </ScrollReveal>

                {/* Featured projects - Full width cards */}
                <div className="space-y-8 mb-16">
                    {featuredProjects.map((project, index) => (
                        <ScrollReveal key={index} delay={index * 0.1}>
                            <GradientBorder>
                                <Card className="border-none bg-background/80 backdrop-blur-sm overflow-hidden">
                                    <CardContent className="p-8 md:p-10">
                                        <div className="flex flex-col md:flex-row gap-8">
                                            {/* Content */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                                    <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                                                        Featured Project
                                                    </span>
                                                </div>
                                                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                                    {project.title}
                                                </h3>
                                                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                                                    {project.description}
                                                </p>
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {project.tags.map((tag, i) => (
                                                        <Badge
                                                            key={i}
                                                            variant="outline"
                                                            className="bg-primary/5 border-primary/20"
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <div className="flex gap-3">
                                                    <Button asChild className="group">
                                                        <a
                                                            href={project.link}
                                                            target={project.link.startsWith('http') ? "_blank" : undefined}
                                                            rel={project.link.startsWith('http') ? "noopener noreferrer" : undefined}
                                                        >
                                                            {isGithub(project.link) ? (
                                                                <>
                                                                    <Github className="mr-2 h-4 w-4" />
                                                                    View Code
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <ExternalLink className="mr-2 h-4 w-4" />
                                                                    Explore
                                                                </>
                                                            )}
                                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                        </a>
                                                    </Button>
                                                    {project.demoLink && (
                                                        <Button variant="outline" asChild>
                                                            <a
                                                                href={project.demoLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                {isGithub(project.demoLink) ? (
                                                                    <Github className="mr-2 h-4 w-4" />
                                                                ) : (
                                                                    <ExternalLink className="mr-2 h-4 w-4" />
                                                                )}
                                                                {isGithub(project.demoLink) ? 'Code' : 'Live Demo'}
                                                            </a>
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </GradientBorder>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Regular projects - Grid with 3D hover effect */}
                <div ref={horizontalRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularProjects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group"
                        >
                            <Card className="h-full flex flex-col border-border bg-background/60 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                        {project.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tags.slice(0, 4).map((tag, i) => (
                                            <Badge
                                                key={i}
                                                variant="secondary"
                                                className="text-xs"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                        {project.tags.length > 4 && (
                                            <Badge variant="secondary" className="text-xs">
                                                +{project.tags.length - 4}
                                            </Badge>
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex gap-2 pt-4">
                                    <Button variant="ghost" size="sm" asChild className="flex-1">
                                        <a
                                            href={project.link}
                                            target={project.link.startsWith('http') ? "_blank" : undefined}
                                            rel={project.link.startsWith('http') ? "noopener noreferrer" : undefined}
                                        >
                                            {isGithub(project.link) ? (
                                                <Github className="mr-2 h-4 w-4" />
                                            ) : (
                                                <ExternalLink className="mr-2 h-4 w-4" />
                                            )}
                                            {isGithub(project.link) ? 'Code' : 'View'}
                                        </a>
                                    </Button>
                                    {project.demoLink && (
                                        <Button variant="ghost" size="sm" asChild className="flex-1">
                                            <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                Demo
                                            </a>
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
