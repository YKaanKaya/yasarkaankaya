"use client"

import React, { createContext, useContext, ReactNode } from 'react'
import { useScroll, useMotionValue, MotionValue } from 'framer-motion'

interface ScrollytellingContextType {
    scrollY: MotionValue<number>
    scrollYProgress: MotionValue<number>
}

const ScrollytellingContext = createContext<ScrollytellingContextType | null>(null)

export function useScrollytelling() {
    const context = useContext(ScrollytellingContext)
    if (!context) {
        throw new Error('useScrollytelling must be used within a ScrollytellingProvider')
    }
    return context
}

interface ScrollytellingProviderProps {
    children: ReactNode
}

export function ScrollytellingProvider({ children }: ScrollytellingProviderProps) {
    const { scrollY, scrollYProgress } = useScroll()

    return (
        <ScrollytellingContext.Provider value={{ scrollY, scrollYProgress }}>
            {children}
        </ScrollytellingContext.Provider>
    )
}

// Scroll Progress Indicator Component
export function ScrollProgressIndicator() {
    const { scrollYProgress } = useScrollytelling()

    return (
        <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-transparent">
            <div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left"
                style={{
                    scaleX: scrollYProgress as unknown as number,
                    transform: `scaleX(var(--scroll-progress, 0))`,
                }}
            />
        </div>
    )
}
