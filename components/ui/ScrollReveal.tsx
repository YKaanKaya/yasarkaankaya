"use client"

import React, { Children } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface ScrollRevealProps {
    children: ReactNode
    className?: string
    delay?: number
    duration?: number
    direction?: 'up' | 'down' | 'left' | 'right' | 'none'
    distance?: number
    once?: boolean
    threshold?: number
}

const getVariants = (direction: string, distance: number): Variants => {
    const directions: Record<string, { x?: number; y?: number }> = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
        none: {},
    }

    return {
        hidden: {
            opacity: 0,
            ...directions[direction],
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
        },
    }
}

export function ScrollReveal({
    children,
    className = '',
    delay = 0,
    duration = 0.6,
    direction = 'up',
    distance = 50,
    once = true,
    threshold = 0.1,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once, amount: threshold })

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={getVariants(direction, distance)}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Staggered children reveal
interface StaggerRevealProps {
    children: ReactNode
    className?: string
    staggerDelay?: number
    once?: boolean
}

export function StaggerReveal({
    children,
    className = '',
    staggerDelay = 0.1,
    once = true,
}: StaggerRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once, amount: 0.1 })

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
            },
        },
    }

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className={className}
        >
            {React.Children.map(children, (child, index) => (
                <motion.div key={index} variants={itemVariants}>
                    {child}
                </motion.div>
            ))}
        </motion.div>
    )
}
