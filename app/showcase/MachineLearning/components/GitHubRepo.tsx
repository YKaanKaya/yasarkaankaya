"use client"

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface GitHubRepoProps {
  url: string
  description: string
}

export function GitHubRepo({ url, description }: GitHubRepoProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="bg-secondary h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
            <Github className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">GitHub Repository</h3>
            <p className="text-xs text-muted-foreground mb-3">{description}</p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                <Github className="h-4 w-4" /> View Repository
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 