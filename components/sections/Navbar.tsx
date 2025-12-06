"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { personalInfo } from "@/lib/data"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Menu, X, Github, Linkedin, Mail, ChevronUp } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"

const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Contact', href: '#contact' },
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    const { scrollYProgress, scrollY } = useScroll()
    const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

    // Handle scroll visibility
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (currentScrollY < 100) {
                setIsVisible(true)
            } else if (currentScrollY > lastScrollY) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    // Track active section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { rootMargin: '-50% 0px -50% 0px' }
        )

        navItems.forEach((item) => {
            const element = document.querySelector(item.href)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <>
            {/* Main navbar */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: isVisible ? 0 : -100 }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 right-0 z-50"
            >
                {/* Progress bar */}
                <motion.div
                    style={{ width: progressWidth }}
                    className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                />

                <nav className="backdrop-blur-md bg-background/80 border-b border-border/50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo */}
                            <motion.button
                                onClick={scrollToTop}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="font-bold text-lg"
                            >
                                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                                    KK
                                </span>
                            </motion.button>

                            {/* Desktop navigation */}
                            <div className="hidden md:flex items-center gap-1">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`relative px-3 py-2 text-sm font-medium transition-colors ${activeSection === item.href.slice(1)
                                                ? 'text-primary'
                                                : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        {item.name}
                                        {activeSection === item.href.slice(1) && (
                                            <motion.div
                                                layoutId="activeSection"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </Link>
                                ))}
                            </div>

                            {/* Right side actions */}
                            <div className="flex items-center gap-2">
                                {/* Social links - desktop only */}
                                <div className="hidden md:flex items-center gap-1">
                                    <Button variant="ghost" size="icon" asChild className="h-9 w-9">
                                        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                                            <Github className="h-4 w-4" />
                                        </a>
                                    </Button>
                                    <Button variant="ghost" size="icon" asChild className="h-9 w-9">
                                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                                            <Linkedin className="h-4 w-4" />
                                        </a>
                                    </Button>
                                </div>

                                <ThemeToggle />

                                {/* Mobile menu button */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                                </Button>
                            </div>
                        </div>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        <div
                            className="absolute inset-0 bg-background/95 backdrop-blur-md"
                            onClick={() => setIsOpen(false)}
                        />
                        <nav className="relative pt-20 px-6">
                            <div className="space-y-1">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`block py-3 text-lg font-medium transition-colors ${activeSection === item.href.slice(1)
                                                    ? 'text-primary'
                                                    : 'text-muted-foreground'
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Social links in mobile menu */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="flex gap-4 mt-8 pt-8 border-t border-border"
                            >
                                <Button variant="outline" size="icon" asChild>
                                    <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                                        <Github className="h-5 w-5" />
                                    </a>
                                </Button>
                                <Button variant="outline" size="icon" asChild>
                                    <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                                        <Linkedin className="h-5 w-5" />
                                    </a>
                                </Button>
                                <Button variant="outline" size="icon" asChild>
                                    <a href={`mailto:${personalInfo.email}`}>
                                        <Mail className="h-5 w-5" />
                                    </a>
                                </Button>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll to top button */}
            <AnimatePresence>
                {lastScrollY > 500 && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={scrollToTop}
                        className="fixed bottom-6 right-6 z-40 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <ChevronUp className="h-5 w-5" />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    )
}
