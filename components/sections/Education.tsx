"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { education } from "@/lib/data"
import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { GraduationCap, Calendar, MapPin } from 'lucide-react'

export function Education() {
    return (
        <section id="education" className="py-24 md:py-32 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
            </div>

            <div className="max-w-5xl mx-auto px-4">
                {/* Section header */}
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <span className="text-primary font-medium text-sm uppercase tracking-wider">
                            Academic Background
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                            Education
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                    </div>
                </ScrollReveal>

                {/* Education cards */}
                <div className="space-y-6">
                    {education.map((edu, index) => (
                        <ScrollReveal key={index} delay={index * 0.15}>
                            <Card className={`border-border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${edu.current ? 'ring-2 ring-primary/30' : ''
                                }`}>
                                {/* Gradient accent for current */}
                                {edu.current && (
                                    <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                                )}

                                <CardContent className="p-8">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Icon */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ type: "spring", delay: 0.2 }}
                                            className="flex-shrink-0"
                                        >
                                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${edu.current
                                                    ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20'
                                                    : 'bg-secondary/50'
                                                }`}>
                                                <GraduationCap className={`w-8 h-8 ${edu.current ? 'text-primary' : 'text-muted-foreground'
                                                    }`} />
                                            </div>
                                        </motion.div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="text-xl md:text-2xl font-bold">
                                                            {edu.degree}
                                                        </h3>
                                                        {edu.current && (
                                                            <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                                                                In Progress
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-primary font-medium text-lg">
                                                        {edu.school}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2 text-muted-foreground bg-secondary/50 px-4 py-2 rounded-full">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{edu.period}</span>
                                                </div>
                                            </div>

                                            <p className="text-muted-foreground leading-relaxed mb-6">
                                                {edu.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                {edu.tags.map((tag, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: 0.3 + i * 0.05 }}
                                                    >
                                                        <Badge variant="secondary" className="text-sm">
                                                            {tag}
                                                        </Badge>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
