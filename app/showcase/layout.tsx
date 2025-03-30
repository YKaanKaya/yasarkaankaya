import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project Showcases | Kaan KAYA',
  description: 'Interactive showcases of my data and development projects',
}

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="showcase-layout">
      {children}
    </div>
  )
} 