"use client"

import { Card, CardContent } from "@/components/ui/card"
import { personalInfo } from "@/lib/data"
import { motion } from "framer-motion"

export function About() {
    return (
        <section id="about" className="py-20 bg-secondary/30">
            <div className="max-w-4xl mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12 text-center"
                >
                    About Me
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="border-none shadow-lg bg-background/50 backdrop-blur-sm">
                        <CardContent className="p-8 md:p-12">
                            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                                {personalInfo.bio.map((paragraph, index) => (
                                    <p key={index}>
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}
