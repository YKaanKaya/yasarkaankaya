"use client"

import { ArrowDown, MapPin } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { personalInfo } from "@/lib/data"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from 'react'
import { GradientMesh } from "@/components/ui/GradientMesh"
import { TextReveal, Typewriter } from "@/components/ui/TextReveal"
import { MagneticButton } from "@/components/ui/MagneticButton"

export function Hero() {
    const ref = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    })

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section
            ref={ref}
            id="profile"
            className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        >
            {/* Animated gradient mesh background */}
            <GradientMesh variant="hero" />

            {/* Main content with scroll effects */}
            <motion.div
                style={{ opacity, scale, y }}
                className="text-center max-w-5xl mx-auto px-4 z-10"
            >
                {/* Location badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex items-center justify-center gap-2 mb-6"
                >
                    <Badge variant="outline" className="px-4 py-2 bg-background/50 backdrop-blur-sm border-primary/20">
                        <MapPin className="w-4 h-4 mr-2 text-primary" />
                        {personalInfo.location}
                    </Badge>
                </motion.div>

                {/* Name with dramatic reveal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight">
                        <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text">
                            {personalInfo.name}
                        </span>
                    </h1>
                </motion.div>

                {/* Title with typewriter */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-8"
                >
                    <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium">
                        <Typewriter
                            text={personalInfo.title}
                            delay={0.5}
                            speed={0.03}
                            cursor={true}
                        />
                    </p>
                </motion.div>

                {/* Role badges with stagger */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-wrap justify-center gap-3 mb-10"
                >
                    {personalInfo.roles.map((role, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 1 + index * 0.15 }}
                        >
                            <Badge
                                variant="outline"
                                className={`text-sm py-2 px-4 bg-${role.color}-500/10 border-${role.color}-500/30 hover:bg-${role.color}-500/20 transition-colors cursor-default`}
                            >
                                <role.icon className={`mr-2 h-4 w-4 text-${role.color}-500`} />
                                {role.label}
                            </Badge>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Tagline with text reveal */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                    className="mb-12"
                >
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        <TextReveal
                            text={personalInfo.tagline}
                            delay={1.6}
                            highlightWords={['data-driven', 'code', 'creativity']}
                            highlightClassName="text-primary font-medium"
                        />
                    </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 2 }}
                >
                    <MagneticButton
                        onClick={scrollToAbout}
                        className="rounded-full px-8 py-4 bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
                        strength={0.2}
                    >
                        <span className="flex items-center gap-2">
                            <ArrowDown className="h-4 w-4 animate-bounce" />
                            Explore My Journey
                        </span>
                    </MagneticButton>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
                >
                    <motion.div
                        animate={{ height: ['20%', '40%', '20%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1 bg-muted-foreground/50 rounded-full"
                    />
                </motion.div>
            </motion.div>
        </section>
    )
}
