"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { experience } from "@/lib/data"
import { motion } from "framer-motion"

export function Experience() {
    return (
        <section id="experience" className="py-20">
            <div className="max-w-4xl mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12 text-center"
                >
                    Experience
                </motion.h2>

                <div className="space-y-8">
                    {experience.map((job, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="border-border shadow-sm hover:shadow-md transition-shadow duration-300">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                                            <p className="text-primary font-medium">{job.company}</p>
                                        </div>
                                        <p className="text-muted-foreground text-sm mt-1 md:mt-0 bg-secondary px-3 py-1 rounded-full">
                                            {job.period}
                                        </p>
                                    </div>

                                    <p className="text-muted-foreground mb-6 leading-relaxed">
                                        {job.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {job.tags.map((tag, i) => (
                                            <Badge key={i} variant="secondary" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
