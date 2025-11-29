"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { personalInfo } from "@/lib/data"
import { motion } from "framer-motion"
import { Mail, Linkedin, Github } from "lucide-react"

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
        setSubmitMessage(`Email ${email} submitted successfully!`)
    }

    return (
        <section id="contact" className="py-20">
            <div className="max-w-6xl mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12 text-center"
                >
                    Get in Touch
                </motion.h2>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <motion.div
                        className="flex-1 w-full"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="border-border shadow-md h-full">
                            <CardContent className="p-8">
                                <h3 className="text-xl font-semibold mb-6">Contact Form</h3>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            placeholder="your@email.com"
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
                                            className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            placeholder="Your message..."
                                        ></textarea>
                                    </div>
                                    <Button type="submit" disabled={isSubmitting} className="w-full">
                                        {isSubmitting ? 'Submitting...' : 'Submit'}
                                    </Button>
                                    {submitMessage && (
                                        <p className="mt-4 text-green-600 dark:text-green-400 text-center">{submitMessage}</p>
                                    )}
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        className="flex-1 w-full"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="border-border shadow-md h-full">
                            <CardContent className="p-8">
                                <h3 className="text-xl font-semibold mb-6">Connect with Me</h3>
                                <p className="text-muted-foreground mb-8 leading-relaxed">
                                    Feel free to reach out for collaborations, job opportunities, or just to say hello. I&apos;m always interested in new projects and connections.
                                </p>
                                <div className="space-y-4">
                                    <a
                                        href={`mailto:${personalInfo.email}`}
                                        className="flex items-center p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group"
                                    >
                                        <Mail className="h-5 w-5 mr-4 text-primary group-hover:scale-110 transition-transform" />
                                        <span>{personalInfo.email}</span>
                                    </a>
                                    <a
                                        href={personalInfo.linkedin}
                                        className="flex items-center p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Linkedin className="h-5 w-5 mr-4 text-primary group-hover:scale-110 transition-transform" />
                                        <span>LinkedIn Profile</span>
                                    </a>
                                    <a
                                        href={personalInfo.github}
                                        className="flex items-center p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Github className="h-5 w-5 mr-4 text-primary group-hover:scale-110 transition-transform" />
                                        <span>GitHub Profile</span>
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
