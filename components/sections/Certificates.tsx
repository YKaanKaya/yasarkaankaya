"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { certificates } from "@/lib/data"
import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { ExternalLink, Award, Calendar } from "lucide-react"

// Certificate issuer colors
const issuerColors: Record<string, { bg: string; text: string; border: string }> = {
    'Stanford University': { bg: 'bg-red-500/10', text: 'text-red-600 dark:text-red-400', border: 'border-red-500/20' },
    'DeepLearning.AI': { bg: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500/20' },
    'Google': { bg: 'bg-green-500/10', text: 'text-green-600 dark:text-green-400', border: 'border-green-500/20' },
    'Microsoft': { bg: 'bg-cyan-500/10', text: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-500/20' },
    'Scrum.org': { bg: 'bg-orange-500/10', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-500/20' },
    'Scrum Alliance': { bg: 'bg-purple-500/10', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-500/20' },
}

export function Certificates() {
    return (
        <section id="certificates" className="py-24 md:py-32 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-secondary/50 to-secondary/30" />
                <div className="absolute top-1/3 left-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto px-4">
                {/* Section header */}
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <span className="text-primary font-medium text-sm uppercase tracking-wider">
                            Continuous Learning
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                            Certifications
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                    </div>
                </ScrollReveal>

                {/* Certificates grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert, index) => {
                        const colors = issuerColors[cert.issuer] || {
                            bg: 'bg-primary/10',
                            text: 'text-primary',
                            border: 'border-primary/20'
                        }

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20, rotateX: -10 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{
                                    y: -5,
                                    transition: { duration: 0.2 }
                                }}
                                className="group perspective-1000"
                            >
                                <Card className="h-full border-border bg-background/80 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                                    {/* Top accent */}
                                    <div className={`h-1 ${colors.bg.replace('/10', '')}`} />

                                    <CardContent className="p-6 flex flex-col h-full">
                                        {/* Header */}
                                        <div className="flex items-start gap-4 mb-4">
                                            <motion.div
                                                whileHover={{ rotate: [0, -10, 10, 0] }}
                                                transition={{ duration: 0.5 }}
                                                className={`p-3 rounded-xl ${colors.bg}`}
                                            >
                                                <Award className={`w-6 h-6 ${colors.text}`} />
                                            </motion.div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-base leading-tight mb-1 group-hover:text-primary transition-colors">
                                                    {cert.name}
                                                </h3>
                                                <p className={`text-sm font-medium ${colors.text}`}>
                                                    {cert.issuer}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Year badge */}
                                        <div className="flex items-center gap-2 mb-4">
                                            <Badge variant="outline" className="text-xs bg-secondary/50">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                {cert.year}
                                            </Badge>
                                        </div>

                                        {/* Spacer */}
                                        <div className="flex-grow" />

                                        {/* Action button */}
                                        <Button
                                            variant="outline"
                                            asChild
                                            className={`w-full group/btn ${colors.border} hover:${colors.bg}`}
                                        >
                                            <a href={cert.link} target="_blank" rel="noopener noreferrer">
                                                <span>View Certificate</span>
                                                <ExternalLink className="ml-2 h-4 w-4 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                            </a>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
