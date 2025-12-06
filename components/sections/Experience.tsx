"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { experience } from "@/lib/data"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from 'react'
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { MapPin, ChevronDown, ChevronUp, Briefcase } from 'lucide-react'

export function Experience() {
    const ref = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const lineHeight = useTransform(scrollYProgress, [0, 0.8], ['0%', '100%'])

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

    return (
        <section ref={ref} id="experience" className="py-24 md:py-32 relative">
            <div className="max-w-5xl mx-auto px-4">
                {/* Section header */}
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <span className="text-primary font-medium text-sm uppercase tracking-wider">
                            Career Journey
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                            Experience
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                    </div>
                </ScrollReveal>

                {/* Timeline */}
                <div className="relative">
                    {/* Animated timeline line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2">
                        <motion.div
                            style={{ height: lineHeight }}
                            className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-green-500"
                        />
                    </div>

                    {/* Experience items */}
                    <div className="space-y-8 md:space-y-12">
                        {experience.map((job, index) => {
                            const isExpanded = expandedIndex === index
                            const isEven = index % 2 === 0

                            return (
                                <div
                                    key={index}
                                    className={`relative flex items-start gap-6 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                >
                                    {/* Timeline dot */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2, type: "spring" }}
                                        className="absolute left-8 md:left-1/2 w-4 h-4 bg-background border-4 border-primary rounded-full md:-translate-x-1/2 z-10"
                                    />

                                    {/* Content card */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1, duration: 0.5 }}
                                        className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${isEven ? 'md:pr-8' : 'md:pl-8'
                                            }`}
                                    >
                                        <Card
                                            className={`border-border shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden ${isExpanded ? 'ring-2 ring-primary/50' : ''
                                                }`}
                                            onClick={() => setExpandedIndex(isExpanded ? null : index)}
                                        >
                                            <CardContent className="p-6">
                                                {/* Header */}
                                                <div className="flex items-start justify-between gap-4 mb-3">
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-semibold text-foreground leading-tight">
                                                            {job.title}
                                                        </h3>
                                                        <p className="text-primary font-medium mt-1">
                                                            {job.company}
                                                        </p>
                                                    </div>
                                                    <motion.div
                                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                                        className="text-muted-foreground"
                                                    >
                                                        <ChevronDown className="w-5 h-5" />
                                                    </motion.div>
                                                </div>

                                                {/* Meta info */}
                                                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                                                    <span className="bg-secondary px-3 py-1 rounded-full">
                                                        {job.period}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {job.location}
                                                    </span>
                                                </div>

                                                {/* Description */}
                                                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                                    {job.description}
                                                </p>

                                                {/* Expandable highlights */}
                                                <motion.div
                                                    initial={false}
                                                    animate={{
                                                        height: isExpanded ? 'auto' : 0,
                                                        opacity: isExpanded ? 1 : 0
                                                    }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="pt-4 border-t border-border space-y-3">
                                                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                            Key Achievements
                                                        </p>
                                                        <ul className="space-y-2">
                                                            {job.highlights.map((highlight, i) => (
                                                                <motion.li
                                                                    key={i}
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
                                                                    transition={{ delay: i * 0.1 }}
                                                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                                                >
                                                                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                                                    {highlight}
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </motion.div>

                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-2 mt-4">
                                                    {job.tags.map((tag, i) => (
                                                        <Badge
                                                            key={i}
                                                            variant="secondary"
                                                            className="text-xs"
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>

                                    {/* Spacer for alternating layout */}
                                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
