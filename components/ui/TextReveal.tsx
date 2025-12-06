"use client"

import { motion, useInView, Variants } from 'framer-motion'
import { useRef } from 'react'

interface TextRevealProps {
    text: string
    className?: string
    delay?: number
    once?: boolean
    type?: 'words' | 'chars' | 'lines'
    staggerDelay?: number
    highlightWords?: string[]
    highlightClassName?: string
}

export function TextReveal({
    text,
    className = '',
    delay = 0,
    once = true,
    type = 'words',
    staggerDelay = 0.05,
    highlightWords = [],
    highlightClassName = 'text-primary font-semibold',
}: TextRevealProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once, amount: 0.3 })

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        },
    }

    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: 'blur(4px)',
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    }

    const getElements = () => {
        if (type === 'words') {
            return text.split(' ').map((word, i) => (
                <motion.span
                    key={i}
                    variants={itemVariants}
                    className={`inline-block ${highlightWords.some(hw => word.toLowerCase().includes(hw.toLowerCase())) ? highlightClassName : ''}`}
                    style={{ marginRight: '0.25em' }}
                >
                    {word}
                </motion.span>
            ))
        }
        if (type === 'chars') {
            return text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    variants={itemVariants}
                    className="inline-block"
                    style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                    {char}
                </motion.span>
            ))
        }
        // lines
        return text.split('\n').map((line, i) => (
            <motion.span key={i} variants={itemVariants} className="block">
                {line}
            </motion.span>
        ))
    }

    return (
        <motion.span
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className={className}
        >
            {getElements()}
        </motion.span>
    )
}

// Typewriter effect
interface TypewriterProps {
    text: string
    className?: string
    delay?: number
    speed?: number
    cursor?: boolean
}

export function Typewriter({
    text,
    className = '',
    delay = 0,
    speed = 0.05,
    cursor = true,
}: TypewriterProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.5 })

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: speed,
                delayChildren: delay,
            },
        },
    }

    const charVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    }

    return (
        <motion.span
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className={className}
        >
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    variants={charVariants}
                    style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                    {char}
                </motion.span>
            ))}
            {cursor && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: delay + text.length * speed }}
                    className="inline-block ml-1 w-[2px] h-[1em] bg-current align-middle"
                />
            )}
        </motion.span>
    )
}
