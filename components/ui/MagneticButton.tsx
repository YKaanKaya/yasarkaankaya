"use client"

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface MagneticButtonProps {
    children: ReactNode
    className?: string
    strength?: number
    onClick?: () => void
}

export function MagneticButton({
    children,
    className = '',
    strength = 0.3,
    onClick,
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const springConfig = { damping: 15, stiffness: 150 }
    const springX = useSpring(x, springConfig)
    const springY = useSpring(y, springConfig)

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return

        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const distanceX = (e.clientX - centerX) * strength
        const distanceY = (e.clientY - centerY) * strength

        x.set(distanceX)
        y.set(distanceY)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.button
            ref={ref}
            className={className}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.button>
    )
}

// Ripple effect button
interface RippleButtonProps {
    children: ReactNode
    className?: string
    onClick?: () => void
}

export function RippleButton({ children, className = '', onClick }: RippleButtonProps) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget
        const rect = button.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const ripple = document.createElement('span')
        ripple.style.left = `${x}px`
        ripple.style.top = `${y}px`
        ripple.className = 'absolute rounded-full bg-white/30 animate-ripple pointer-events-none'
        ripple.style.width = ripple.style.height = `${Math.max(rect.width, rect.height) * 2}px`
        ripple.style.transform = 'translate(-50%, -50%) scale(0)'

        button.appendChild(ripple)

        setTimeout(() => ripple.remove(), 600)

        onClick?.()
    }

    return (
        <button
            className={`relative overflow-hidden ${className}`}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}
