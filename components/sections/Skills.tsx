"use client"

import { Card, CardContent } from "@/components/ui/card"
import { skills } from "@/lib/data"
import { motion } from "framer-motion"
import Image from "next/image"
import { Database, BarChart3, CircuitBoard } from "lucide-react"

interface Skill {
    name: string;
    logo: string;
    isSvg?: boolean;
}

export function Skills() {
    const skillCategories = [
        { id: 'dataEngineering', label: 'Data Engineering', icon: Database, color: 'text-blue-600 dark:text-blue-400' },
        { id: 'bi', label: 'Business Intelligence', icon: BarChart3, color: 'text-purple-600 dark:text-purple-400' },
        { id: 'ml', label: 'ML & Software Dev', icon: CircuitBoard, color: 'text-green-600 dark:text-green-400' },
    ]

    return (
        <section id="skills" className="py-20">
            <div className="max-w-6xl mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12 text-center"
                >
                    Skills
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full border-border shadow-sm hover:shadow-md transition-all duration-300">
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-6">
                                        <category.icon className={`h-6 w-6 ${category.color} mr-3`} />
                                        <h3 className="text-xl font-semibold">{category.label}</h3>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {(skills[category.id as keyof typeof skills] as Skill[]).map((skill) => (
                                            <div key={skill.name} className="flex flex-col items-center group">
                                                <div className="w-12 h-12 flex items-center justify-center mb-2 bg-secondary/50 rounded-xl p-2 group-hover:bg-secondary transition-colors">
                                                    <Image
                                                        src={skill.logo}
                                                        alt={`${skill.name} logo`}
                                                        width={32}
                                                        height={32}
                                                        className="max-w-full max-h-full object-contain"
                                                    />
                                                </div>
                                                <p className="text-center text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                                    {skill.name}
                                                </p>
                                            </div>
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
