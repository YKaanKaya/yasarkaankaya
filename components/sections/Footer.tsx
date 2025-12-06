"use client"

import { motion } from "framer-motion"
import { personalInfo } from "@/lib/data"
import { Heart } from "lucide-react"

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="py-8 border-t border-border/50 bg-secondary/20">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-sm text-muted-foreground"
                    >
                        © {currentYear} {personalInfo.name}. All rights reserved.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-sm text-muted-foreground flex items-center gap-1"
                    >
                        Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by {personalInfo.name}
                    </motion.p>
                </div>
            </div>
        </footer>
    )
}
