"use client"

import { Card, CardContent } from "@/components/ui/card"
import { skills, skillCategories } from "@/lib/data"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from 'react'
import Image from "next/image"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { Database, Brain, BarChart3 } from "lucide-react"

interface Skill {
    name: string;
    logo: string;
    proficiency: number;
    isSvg?: boolean;
}

export function Skills() {
    const ref = useRef<HTMLElement>(null)
    const [activeCategory, setActiveCategory] = useState<string>('dataEngineering')

    return (
        <section ref={ref} id="skills" className="py-24 md:py-32 relative">
            <div className="max-w-6xl mx-auto px-4">
                {/* Section header */}
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <span className="text-primary font-medium text-sm uppercase tracking-wider">
                            Technical Expertise
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                            Skills
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                    </div>
                </ScrollReveal>

                {/* Category tabs */}
                <ScrollReveal delay={0.1}>
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {skillCategories.map((category, index) => {
                            const isActive = activeCategory === category.id
                            return (
                                <motion.button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all duration-300 ${isActive
                                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                                            : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                                        }`}
                                >
                                    <category.icon className={`h-5 w-5 ${isActive ? '' : category.color}`} />
                                    <span className="hidden sm:inline">{category.label}</span>
                                    <span className="sm:hidden">{category.label.split(' ')[0]}</span>
                                </motion.button>
                            )
                        })}
                    </div>
                </ScrollReveal>

                {/* Category description */}
                <ScrollReveal delay={0.2}>
                    <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
                        {skillCategories.find(c => c.id === activeCategory)?.description}
                    </p>
                </ScrollReveal>

                {/* Skills grid with proficiency bars */}
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                >
                    {(skills[activeCategory as keyof typeof skills] as Skill[]).map((skill, index) => (
                        <SkillCard key={skill.name} skill={skill} index={index} />
                    ))}
                </motion.div>

                {/* All categories overview - compact cards */}
                <div className="mt-16 grid md:grid-cols-3 gap-6">
                    {skillCategories.map((category, categoryIndex) => (
                        <ScrollReveal key={category.id} delay={0.1 * categoryIndex}>
                            <Card
                                className={`border-border shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${activeCategory === category.id ? 'ring-2 ring-primary/50' : ''
                                    }`}
                                onClick={() => setActiveCategory(category.id)}
                            >
                                <CardContent className="p-5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`p-2 rounded-lg ${category.id === 'dataEngineering' ? 'bg-blue-500/10' :
                                                category.id === 'ai' ? 'bg-purple-500/10' : 'bg-green-500/10'
                                            }`}>
                                            <category.icon className={`h-5 w-5 ${category.color}`} />
                                        </div>
                                        <h3 className="font-semibold text-sm">{category.label}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {(skills[category.id as keyof typeof skills] as Skill[]).slice(0, 4).map((skill) => (
                                            <span
                                                key={skill.name}
                                                className="text-xs bg-secondary/50 px-2 py-1 rounded"
                                            >
                                                {skill.name}
                                            </span>
                                        ))}
                                        {(skills[category.id as keyof typeof skills] as Skill[]).length > 4 && (
                                            <span className="text-xs text-muted-foreground px-2 py-1">
                                                +{(skills[category.id as keyof typeof skills] as Skill[]).length - 4}
                                            </span>
                                        )}
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

// Individual skill card component
function SkillCard({ skill, index }: { skill: Skill; index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.5 })
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group"
        >
            <Card className="border-border/50 bg-background/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-4 flex flex-col items-center">
                    {/* Logo */}
                    <div className="w-12 h-12 flex items-center justify-center mb-3 bg-secondary/30 rounded-xl p-2 group-hover:bg-secondary/50 transition-colors">
                        <Image
                            src={skill.logo}
                            alt={`${skill.name} logo`}
                            width={32}
                            height={32}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>

                    {/* Name */}
                    <p className="text-center text-sm font-medium mb-2 group-hover:text-primary transition-colors">
                        {skill.name}
                    </p>

                    {/* Proficiency bar */}
                    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.proficiency}%` } : {}}
                            transition={{ delay: 0.3 + index * 0.05, duration: 0.8, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        />
                    </div>

                    {/* Proficiency percentage on hover */}
                    <motion.span
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 5 }}
                        className="text-xs text-muted-foreground mt-1"
                    >
                        {skill.proficiency}%
                    </motion.span>
                </CardContent>
            </Card>
        </motion.div>
    )
}
