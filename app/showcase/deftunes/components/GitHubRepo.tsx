"use client"

import React from 'react'
import { Github } from 'lucide-react'

export function GitHubRepo() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <a
        href="https://github.com/YKaanKaya/deftunes-data-pipeline"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full shadow-lg transition-all hover:bg-slate-800"
      >
        <Github className="w-5 h-5" />
        <span className="text-sm hidden md:inline">View on GitHub</span>
      </a>
      <div className="text-xs text-slate-500 mt-1 text-center">
        YKaanKaya/deftunes-data-pipeline
      </div>
    </div>
  )
} 