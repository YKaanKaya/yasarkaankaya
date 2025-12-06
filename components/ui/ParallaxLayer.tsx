"use client"

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface ParallaxLayerProps {
    children: ReactNode
    className?: string
    speed?: number
    direction?: 'up' | 'down'
    offset?: [string, string]
}

export function ParallaxLayer({
    children,
    className = '',
    speed = 0.5,
    direction = 'up',
    offset = ['start end', 'end start'],
}: ParallaxLayerProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: offset as any,
    })

    const factor = direction === 'up' ? -1 : 1
    const y = useTransform(scrollYProgress, [0, 1], [0, 200 * speed * factor])

    return (
        <div ref={ref} className={`relative ${className}`}>
            <motion.div style={{ y }}>
                {children}
            </motion.div>
        </div>
    )
}

// Floating animation component
interface FloatingElementProps {
    children: ReactNode
    className?: string
    duration?: number
    distance?: number
    delay?: number
}

export function FloatingElement({
    children,
    className = '',
    duration = 3,
    distance = 10,
    delay = 0,
}: FloatingElementProps) {
    return (
        <motion.div
            className={className}
            animate={{
                y: [-distance, distance, -distance],
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay,
            }}
        >
            {children}
        </motion.div>
    )
}

// Mouse-following parallax
interface MouseParallaxProps {
    children: ReactNode
    className?: string
    strength?: number
}

export function MouseParallax({
    children,
    className = '',
    strength = 20,
}: MouseParallaxProps) {
    const x = useRef(0)
    const y = useRef(0)

    return (
        <motion.div
            className={className}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                x.current = (e.clientX - rect.left - rect.width / 2) / rect.width
                y.current = (e.clientY - rect.top - rect.height / 2) / rect.height
            }}
            style={{
                x: x.current * strength,
                y: y.current * strength,
            }}
        >
            {children}
        </motion.div>
    )
}
