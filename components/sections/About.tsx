"use client"

import { Card, CardContent } from "@/components/ui/card"
import { personalInfo } from "@/lib/data"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from 'react'
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { TextReveal } from "@/components/ui/TextReveal"
import { Globe, Music, Flower2 } from 'lucide-react'

const hobbyIcons: Record<string, typeof Globe> = {
    'Gardening': Flower2,
    'Electric Guitars': Music,
    'Piano': Music,
}

export function About() {
    const ref = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

    return (
        <section ref={ref} id="about" className="py-24 md:py-32 relative overflow-hidden">
            {/* Parallax background element */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 -z-10"
            >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-secondary/50 via-secondary/30 to-transparent" />
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
            </motion.div>

            <div className="max-w-5xl mx-auto px-4">
                {/* Section header */}
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <span className="text-primary font-medium text-sm uppercase tracking-wider">
                            Get to know me
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                            About Me
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                    </div>
                </ScrollReveal>

                {/* Main content card */}
                <ScrollReveal delay={0.2}>
                    <Card className="border-none shadow-2xl bg-background/80 backdrop-blur-sm overflow-hidden">
                        <CardContent className="p-8 md:p-12">
                            <div className="space-y-6">
                                {personalInfo.bio.map((paragraph, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + index * 0.15 }}
                                    >
                                        <p className="text-lg text-muted-foreground leading-relaxed">
                                            <TextReveal
                                                text={paragraph}
                                                delay={index * 0.1}
                                                staggerDelay={0.01}
                                                highlightWords={['data platforms', 'GenAI', 'AWS', 'Spark', 'Airflow', 'dbt', 'risk', 'compliance', 'AI']}
                                                highlightClassName="text-foreground font-medium"
                                            />
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </ScrollReveal>

                {/* Languages & Hobbies */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    {/* Languages */}
                    <ScrollReveal delay={0.4} direction="left">
                        <Card className="border-none shadow-lg bg-background/60 backdrop-blur-sm h-full">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                        <Globe className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <h3 className="text-lg font-semibold">Languages</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {personalInfo.languages.map((lang, index) => (
                                        <motion.div
                                            key={lang.name}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.5 + index * 0.1 }}
                                            className="group relative"
                                        >
                                            <div className="px-3 py-2 bg-secondary/50 rounded-lg text-sm hover:bg-secondary transition-colors cursor-default">
                                                <span className="font-medium">{lang.name}</span>
                                                <span className="text-muted-foreground ml-1">• {lang.level}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* Hobbies */}
                    <ScrollReveal delay={0.5} direction="right">
                        <Card className="border-none shadow-lg bg-background/60 backdrop-blur-sm h-full">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-purple-500/10 rounded-lg">
                                        <Music className="w-5 h-5 text-purple-500" />
                                    </div>
                                    <h3 className="text-lg font-semibold">Beyond Work</h3>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {personalInfo.hobbies.map((hobby, index) => {
                                        const Icon = hobbyIcons[hobby] || Music
                                        return (
                                            <motion.div
                                                key={hobby}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.6 + index * 0.1 }}
                                                whileHover={{ scale: 1.05 }}
                                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full border border-purple-500/20"
                                            >
                                                <Icon className="w-4 h-4 text-purple-500" />
                                                <span className="text-sm font-medium">{hobby}</span>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}
