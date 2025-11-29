"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { certificates } from "@/lib/data"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

export function Certificates() {
    return (
        <section id="certificates" className="py-20 bg-secondary/30">
            <div className="max-w-6xl mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12 text-center"
                >
                    Certificates
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full flex flex-col border-border shadow-sm hover:shadow-md transition-all duration-300">
                                <CardContent className="p-6 flex flex-col h-full">
                                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{cert.name}</h3>
                                    <p className="text-muted-foreground text-sm mb-6">Issued by: {cert.issuer}</p>
                                    <div className="mt-auto">
                                        <Button variant="outline" asChild className="w-full group">
                                            <a href={cert.link} target="_blank" rel="noopener noreferrer">
                                                View Certificate
                                                <ExternalLink className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
