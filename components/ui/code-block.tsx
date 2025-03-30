"use client"

import React, { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  code: string
  language: string
  title?: string
}

export function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Language specific styling can be expanded
  const getLanguageColor = () => {
    switch (language) {
      case 'python':
      case 'py':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-300'
      case 'typescript':
      case 'ts':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-300'
      case 'bash':
      case 'sh':
        return 'bg-green-500/10 text-green-600 dark:text-green-300'
      case 'sql':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-300'
      case 'yaml':
      case 'yml':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-300'
      case 'hcl':
        return 'bg-violet-500/10 text-violet-600 dark:text-violet-300'
      case 'dockerfile':
        return 'bg-red-500/10 text-red-600 dark:text-red-300'
      default:
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-300'
    }
  }

  return (
    <div className="w-full rounded-lg overflow-hidden border border-border">
      <div className="flex justify-between items-center bg-muted px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          
          {title && (
            <div className="text-xs font-medium text-foreground truncate">
              {title}
            </div>
          )}
          
          {language && (
            <span className={cn("text-xs px-2 py-0.5 rounded font-mono", getLanguageColor())}>
              {language}
            </span>
          )}
        </div>
        
        <button
          onClick={handleCopy}
          className="text-muted-foreground hover:text-foreground p-1.5 rounded-md hover:bg-muted transition-colors"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
      
      <div className="overflow-x-auto bg-muted/20">
        <pre className="p-4 text-sm font-mono">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
} 