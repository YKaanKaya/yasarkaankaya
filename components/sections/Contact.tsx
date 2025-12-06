"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { personalInfo } from "@/lib/data"
import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { Mail, Linkedin, Github, Send, MapPin, Phone, Sparkles } from "lucide-react"
import { GradientMesh } from "@/components/ui/GradientMesh"

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)
        setSubmitMessage('')

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email')

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000))

        setIsSubmitting(false)
        setSubmitMessage(`Thank you! I'll get back to you at ${email} soon.`)
        event.currentTarget.reset()
    }

    const contactMethods = [
        {
            icon: Mail,
            label: 'Email',
            value: personalInfo.email,
            href: `mailto:${personalInfo.email}`,
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
        },
        {
            icon: Linkedin,
            label: 'LinkedIn',
            value: 'yasarkaankaya',
            href: personalInfo.linkedin,
            color: 'text-sky-600',
            bgColor: 'bg-sky-500/10',
        },
        {
            icon: Github,
            label: 'GitHub',
            value: 'YKaanKaya',
            href: personalInfo.github,
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/10',
        },
        {
            icon: MapPin,
            label: 'Location',
            value: personalInfo.location,
            href: null,
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
        },
    ]

    return (
        <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
            {/* Background gradient */}
            <GradientMesh variant="subtle" />

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                {/* Section header */}
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <span className="text-primary font-medium text-sm uppercase tracking-wider">
                            Let's Connect
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                            Get in Touch
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6" />
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Interested in collaboration, job opportunities, or just want to chat about data and AI?
                            I'd love to hear from you.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Contact form */}
                    <ScrollReveal direction="left">
                        <Card className="border-border shadow-xl bg-background/80 backdrop-blur-sm h-full">
                            <CardContent className="p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Send className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold">Send a Message</h3>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-2">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            required
                                            className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                            placeholder="What's this about?"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            required
                                            className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                                            placeholder="Your message..."
                                        ></textarea>
                                    </div>

                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-6 text-base font-medium"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full mr-2"
                                                    />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="mr-2 h-4 w-4" />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>
                                    </motion.div>

                                    {submitMessage && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 dark:text-green-400"
                                        >
                                            <Sparkles className="w-5 h-5" />
                                            <p>{submitMessage}</p>
                                        </motion.div>
                                    )}
                                </form>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* Contact methods */}
                    <ScrollReveal direction="right" delay={0.1}>
                        <div className="space-y-4 h-full flex flex-col">
                            <Card className="border-border shadow-xl bg-background/80 backdrop-blur-sm flex-1">
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <Sparkles className="w-5 h-5 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold">Connect Directly</h3>
                                    </div>

                                    <p className="text-muted-foreground mb-8 leading-relaxed">
                                        I'm always open to discussing new projects, creative ideas,
                                        or opportunities to be part of your visions. Let's build something great together.
                                    </p>

                                    <div className="space-y-3">
                                        {contactMethods.map((method, index) => (
                                            <motion.div
                                                key={method.label}
                                                initial={{ opacity: 0, x: 20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.1 + index * 0.1 }}
                                            >
                                                {method.href ? (
                                                    <a
                                                        href={method.href}
                                                        target={method.href.startsWith('mailto') ? undefined : '_blank'}
                                                        rel={method.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                                                        className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-all group"
                                                    >
                                                        <div className={`p-3 rounded-lg ${method.bgColor}`}>
                                                            <method.icon className={`w-5 h-5 ${method.color}`} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-sm text-muted-foreground">{method.label}</p>
                                                            <p className="font-medium group-hover:text-primary transition-colors">
                                                                {method.value}
                                                            </p>
                                                        </div>
                                                    </a>
                                                ) : (
                                                    <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl">
                                                        <div className={`p-3 rounded-lg ${method.bgColor}`}>
                                                            <method.icon className={`w-5 h-5 ${method.color}`} />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-muted-foreground">{method.label}</p>
                                                            <p className="font-medium">{method.value}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}
