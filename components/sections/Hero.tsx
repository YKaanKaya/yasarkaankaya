"use client"

import { ArrowDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { personalInfo } from "@/lib/data"
import { motion } from "framer-motion"

export function Hero() {
    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section id="profile" className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-20 relative overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-blue-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl -z-10" />

            <div className="text-center max-w-4xl mx-auto px-4 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
                        {personalInfo.name}
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-3 mb-8"
                >
                    {personalInfo.roles.map((role, index) => (
                        <Badge
                            key={index}
                            variant="outline"
                            className={`text-md py-1.5 px-4 bg-${role.color}-100 dark:bg-${role.color}-900/30 text-${role.color}-700 dark:text-${role.color}-300 border-${role.color}-200 dark:border-${role.color}-800`}
                        >
                            <role.icon className="mr-2 h-4 w-4" />
                            {role.label}
                        </Badge>
                    ))}
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                    Building data-driven solutions with code and creativity
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Button
                        onClick={scrollToAbout}
                        size="lg"
                        className="rounded-full px-8 animate-bounce shadow-lg shadow-blue-500/20"
                    >
                        <ArrowDown className="mr-2 h-4 w-4" /> Learn More
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
