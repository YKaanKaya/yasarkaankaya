"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ChevronDown, Copy, Check, Coffee } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"

import { PipelineTabs } from "./PipelineTabs"
import { TechStack } from "./TechStack"
import { ETLExamples } from "./ETLExamples"
import { InfrastructureCode } from "./InfrastructureCode"
import { OrchestratorComponent } from "./OrchestratorComponent"
import { DocumentationSection } from "./DocumentationSection"

export function ShowcaseApp() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const copyRepoLink = () => {
    navigator.clipboard.writeText("https://github.com/YKaanKaya/deftunes-data-pipeline")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSectionToggle = (section: string) => {
    setActiveSection(activeSection === section ? null : section)
  }

  const Section = ({ title, id, children }: { title: string, id: string, children: React.ReactNode }) => (
    <motion.div 
      className="mt-10 first:mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div 
        className="flex items-center justify-between p-4 bg-muted/50 rounded-t-lg cursor-pointer"
        onClick={() => handleSectionToggle(id)}
      >
        <h2 className="text-xl font-semibold flex items-center gap-2">
          {title}
          {id === "tech-stack" && (
            <Badge variant="outline" className="ml-2 text-xs py-0">
              Technologies
            </Badge>
          )}
        </h2>
        <ChevronDown 
          className={`h-5 w-5 transition-transform duration-200 ${activeSection === id ? 'rotate-180' : ''}`} 
        />
      </div>
      <AnimatePresence>
        {(activeSection === id || activeSection === null) && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border border-t-0 border-border rounded-b-lg overflow-hidden"
          >
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )

  return (
    <div className="container px-4 py-6 mx-auto max-w-7xl">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <Link href="/projects" className="inline-flex items-center hover:text-muted-foreground text-sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Portfolio
        </Link>
        <button 
          onClick={copyRepoLink}
          className="flex items-center text-sm hover:bg-muted p-2 rounded-md transition-colors"
        >
          {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
          {copied ? "Copied!" : "Copy Repo Link"}
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="mt-8 relative overflow-hidden rounded-xl border shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50" />
          <div className="relative p-6 md:p-10 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <Badge className="mb-2" variant="outline">Data Engineering Project</Badge>
              <h1 className="text-3xl font-bold mb-3">DeFtunes Data Pipeline</h1>
              <p className="text-muted-foreground mb-6">
                A comprehensive data pipeline for a fictional music streaming service, built with AWS services, Apache Airflow, and modern data engineering practices.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary">AWS</Badge>
                <Badge variant="secondary">Terraform</Badge>
                <Badge variant="secondary">Airflow</Badge>
                <Badge variant="secondary">Python</Badge>
                <Badge variant="secondary">Data Lakehouse</Badge>
                <Badge variant="secondary">ETL</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Coffee className="h-4 w-4" />
                <span>Built by Kaan Kaya</span>
              </div>
            </div>
            <div className="flex-shrink-0 flex items-center justify-center">
              <div className="relative h-[180px] w-[300px] rounded-lg overflow-hidden border">
                <Image
                  src="/images/Capstone-diagram2.png"
                  alt="DeFtunes Architecture"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <Section title="Technology Stack" id="tech-stack">
        <TechStack />
      </Section>

      <Section title="Pipeline Architecture" id="pipeline">
        <PipelineTabs />
      </Section>

      <Section title="ETL Code Examples" id="etl-code">
        <ETLExamples />
      </Section>

      <Section title="Infrastructure Code" id="infrastructure">
        <InfrastructureCode />
      </Section>

      <Section title="Orchestration" id="orchestration">
        <OrchestratorComponent />
      </Section>

      <Section title="Documentation" id="documentation">
        <DocumentationSection />
      </Section>
    </div>
  )
} 