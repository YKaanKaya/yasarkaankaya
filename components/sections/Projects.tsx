"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { projects } from "@/lib/data"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

export function Projects() {
    return (
        <section id="projects" className="py-20 bg-secondary/30">
            <div className="max-w-6xl mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12 text-center"
                >
                    Projects
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => {
                        const isGithub = (url: string) => url.includes('github.com');

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-full flex flex-col border-border hover:border-primary/50 transition-colors duration-300">
                                    <CardHeader>
                                        <CardTitle className="text-xl">{project.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-muted-foreground mb-6 leading-relaxed">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag, i) => (
                                                <Badge key={i} variant="outline" className="bg-background">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex gap-3 pt-6">
                                        <Button variant="outline" size="sm" asChild className="flex-1">
                                            <a href={project.link} target={project.link.startsWith('http') ? "_blank" : undefined} rel={project.link.startsWith('http') ? "noopener noreferrer" : undefined}>
                                                {isGithub(project.link) ? <Github className="mr-2 h-4 w-4" /> : <ExternalLink className="mr-2 h-4 w-4" />}
                                                {isGithub(project.link) ? 'Code' : 'View Project'}
                                            </a>
                                        </Button>
                                        {project.demoLink && (
                                            <Button size="sm" asChild className="flex-1">
                                                <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                                                    {isGithub(project.demoLink) ? <Github className="mr-2 h-4 w-4" /> : <ExternalLink className="mr-2 h-4 w-4" />}
                                                    {isGithub(project.demoLink) ? 'Code' : 'Demo'}
                                                </a>
                                            </Button>
                                        )}
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
