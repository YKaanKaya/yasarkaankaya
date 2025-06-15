"use client"

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import Link from 'next/link'
import { Eye, Download } from 'lucide-react'

interface NotebookSectionProps {
  title: string
  description: string
  objectives: string[]
  viewLink?: string
  insightsLink?: string
  downloadLink?: string
}

export function NotebookSection({
  title,
  description,
  objectives,
  viewLink,
  insightsLink,
  downloadLink,
}: NotebookSectionProps) {
  return (
    <Card className="border-border shadow-md card-hover mb-8">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-muted-foreground mb-4">{description}</p>

        {objectives?.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Learning Objectives</h3>
            <ul className="list-disc pl-5 space-y-1">
              {objectives.map((obj, idx) => (
                <li key={idx}>{obj}</li>
              ))}
            </ul>
          </div>
        )}

        {viewLink && (
          <Button asChild className="mr-3">
            <a href={viewLink} className="flex items-center">
              <Eye className="w-4 h-4 mr-2" /> View Notebook
            </a>
          </Button>
        )}

        {insightsLink && (
          <Button asChild variant="secondary" className="mr-3">
            <a href={insightsLink} className="flex items-center">
              <Eye className="w-4 h-4 mr-2" /> Findings & Insights
            </a>
          </Button>
        )}

        {downloadLink && (
          <Button asChild>
            <a
              href={downloadLink}
              download
              className="flex items-center"
            >
              <Download className="w-4 h-4 mr-2" /> Download Notebook
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
