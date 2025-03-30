"use client"

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'

interface WeekContent {
  title: string
  topics: string[]
  labs: string[]
}

interface CourseContentProps {
  title: string
  description: string
  weeks: WeekContent[]
}

export function CourseContent({ title, description, weeks }: CourseContentProps) {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {weeks.map((week, index) => (
          <AccordionItem key={index} value={`week-${index}`}>
            <AccordionTrigger className="hover:bg-secondary/30 px-4">
              <h3 className="text-md font-medium text-left">{week.title}</h3>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <Card>
                <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Key Topics</h4>
                    <ul className="space-y-2">
                      {week.topics.map((topic, i) => (
                        <li key={i} className="flex items-start">
                          <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                            {i + 1}
                          </span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Lab Exercises</h4>
                    <div className="flex flex-wrap gap-2">
                      {week.labs.map((lab, i) => (
                        <Badge key={i} variant="outline" className="bg-secondary/50">
                          {lab}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
} 