"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { education } from "@/lib/data"
import { motion } from "framer-motion"

export function Education() {
    return (
        <section id="education" className="py-20 bg-secondary/30">
            <div className="max-w-4xl mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12 text-center"
                >
                    Education
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Card className="border-border shadow-sm hover:shadow-md transition-shadow duration-300">
                        <CardContent className="p-8">
                            <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-semibold">{education.degree}</h3>
                                    <p className="text-primary font-medium text-lg">{education.school}</p>
                                </div>
                                <p className="text-muted-foreground mt-2 md:mt-0 bg-secondary px-4 py-1 rounded-full">
                                    {education.period}
                                </p>
                            </div>

                            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                                {education.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {education.tags.map((tag, i) => (
                                    <Badge key={i} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}
