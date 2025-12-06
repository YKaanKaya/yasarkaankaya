"use client"

import { motion } from 'framer-motion'

interface GradientMeshProps {
    className?: string
    variant?: 'hero' | 'subtle' | 'vibrant'
}

export function GradientMesh({ className = '', variant = 'hero' }: GradientMeshProps) {
    const variants = {
        hero: {
            colors: [
                'rgba(59, 130, 246, 0.15)', // blue
                'rgba(139, 92, 246, 0.15)', // purple
                'rgba(236, 72, 153, 0.1)',  // pink
                'rgba(34, 197, 94, 0.1)',   // green
            ],
            sizes: ['800px', '600px', '700px', '500px'],
        },
        subtle: {
            colors: [
                'rgba(59, 130, 246, 0.08)',
                'rgba(139, 92, 246, 0.08)',
                'rgba(236, 72, 153, 0.05)',
                'rgba(34, 197, 94, 0.05)',
            ],
            sizes: ['600px', '500px', '550px', '400px'],
        },
        vibrant: {
            colors: [
                'rgba(59, 130, 246, 0.25)',
                'rgba(139, 92, 246, 0.25)',
                'rgba(236, 72, 153, 0.2)',
                'rgba(34, 197, 94, 0.15)',
            ],
            sizes: ['900px', '700px', '800px', '600px'],
        },
    }

    const config = variants[variant]

    return (
        <div className={`absolute inset-0 overflow-hidden -z-10 ${className}`}>
            {/* Top left blob */}
            <motion.div
                className="absolute rounded-full blur-3xl"
                style={{
                    background: config.colors[0],
                    width: config.sizes[0],
                    height: config.sizes[0],
                    top: '-20%',
                    left: '-10%',
                }}
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Top right blob */}
            <motion.div
                className="absolute rounded-full blur-3xl"
                style={{
                    background: config.colors[1],
                    width: config.sizes[1],
                    height: config.sizes[1],
                    top: '-10%',
                    right: '-5%',
                }}
                animate={{
                    x: [0, -40, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 2,
                }}
            />

            {/* Bottom left blob */}
            <motion.div
                className="absolute rounded-full blur-3xl"
                style={{
                    background: config.colors[2],
                    width: config.sizes[2],
                    height: config.sizes[2],
                    bottom: '-15%',
                    left: '10%',
                }}
                animate={{
                    x: [0, 60, 0],
                    y: [0, -40, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 4,
                }}
            />

            {/* Bottom right blob */}
            <motion.div
                className="absolute rounded-full blur-3xl"
                style={{
                    background: config.colors[3],
                    width: config.sizes[3],
                    height: config.sizes[3],
                    bottom: '10%',
                    right: '5%',
                }}
                animate={{
                    x: [0, -30, 0],
                    y: [0, 40, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                }}
            />

            {/* Center accent */}
            <motion.div
                className="absolute rounded-full blur-3xl opacity-50"
                style={{
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
                    width: '100%',
                    height: '100%',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </div>
    )
}

// Animated gradient border
export function GradientBorder({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`relative p-[1px] rounded-xl overflow-hidden ${className}`}>
            <motion.div
                className="absolute inset-0 rounded-xl"
                style={{
                    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
                    backgroundSize: '300% 100%',
                }}
                animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
            <div className="relative bg-background rounded-xl">
                {children}
            </div>
        </div>
    )
}
