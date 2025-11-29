"use client"

import { useState, useEffect } from 'react'
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { cn } from "@/lib/utils"

const navItems = [
    { id: 'profile', label: 'Profile' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'biPlayground', label: 'BI Playground' },
    { id: 'contact', label: 'Contact' },
]

export function Navbar() {
    const [activeSection, setActiveSection] = useState('profile')
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            setActiveSection(sectionId)
        }
    }

    return (
        <nav className={cn(
            "sticky top-0 z-50 transition-all duration-300 border-b border-transparent",
            scrolled ? "bg-background/80 backdrop-blur-md border-border shadow-sm" : "bg-transparent"
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div
                        className="font-bold text-xl text-blue-600 dark:text-blue-400 cursor-pointer"
                        onClick={() => scrollToSection('profile')}
                    >
                        Kaan KAYA
                    </div>

                    <div className="flex items-center gap-4">
                        <ul className="hidden lg:flex space-x-1">
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => scrollToSection(item.id)}
                                        className={cn(
                                            "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                            activeSection === item.id
                                                ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                                                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                        )}
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    )
}
