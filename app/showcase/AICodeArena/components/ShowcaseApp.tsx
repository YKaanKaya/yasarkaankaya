"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Code, BookOpen, Layers, ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import { ProjectOverview } from './ProjectOverview'
import { TechStack } from './TechStack'
import { Features } from './Features'
import { GitHubRepo } from './GitHubRepo'

export function ShowcaseApp() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8">
        <Link href="/#projects" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-4xl font-bold">AI Code Arena Quest</h1>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" asChild>
              <a 
                href="https://github.com/YKaanKaya/ai-code-arena-quest" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Github className="mr-2 h-4 w-4" /> GitHub Repo
              </a>
            </Button>
            <Button asChild>
              <a 
                href="https://www.practai.life/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
              </a>
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="tech-stack" className="flex items-center">
            <Layers className="mr-2 h-4 w-4" /> Tech Stack
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center">
            <Code className="mr-2 h-4 w-4" /> Features
          </TabsTrigger>
          <TabsTrigger value="github" className="flex items-center">
            <Github className="mr-2 h-4 w-4" /> GitHub
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 animate-fade-in">
          <ProjectOverview />
        </TabsContent>

        <TabsContent value="tech-stack" className="space-y-6 animate-fade-in">
          <TechStack />
        </TabsContent>

        <TabsContent value="features" className="space-y-6 animate-fade-in">
          <Features />
        </TabsContent>

        <TabsContent value="github" className="space-y-6 animate-fade-in">
          <GitHubRepo />
        </TabsContent>
      </Tabs>
    </div>
  )
}
