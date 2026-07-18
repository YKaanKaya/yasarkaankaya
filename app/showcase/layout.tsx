import React from 'react'
import type { Metadata } from 'next'
import { ShowcaseChrome } from '@/components/sections/ShowcaseChrome'

export const metadata: Metadata = {
  title: 'Project Case Files | Kaan Kaya',
  description: 'Detailed case files covering data platforms, machine learning, deep learning, and applied AI projects by Kaan Kaya.',
}

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="showcase-layout">
      <ShowcaseChrome>{children}</ShowcaseChrome>
    </div>
  )
}
