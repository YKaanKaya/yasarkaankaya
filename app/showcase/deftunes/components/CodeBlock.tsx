"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, CheckCircle2 } from 'lucide-react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

// Import specific language support
import python from 'react-syntax-highlighter/dist/cjs/languages/hljs/python'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/hljs/typescript'
import bash from 'react-syntax-highlighter/dist/cjs/languages/hljs/bash'
import sql from 'react-syntax-highlighter/dist/cjs/languages/hljs/sql'
import json from 'react-syntax-highlighter/dist/cjs/languages/hljs/json'
import yaml from 'react-syntax-highlighter/dist/cjs/languages/hljs/yaml'
import xml from 'react-syntax-highlighter/dist/cjs/languages/hljs/xml'

// Register languages
SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('sql', sql)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('yaml', yaml)
SyntaxHighlighter.registerLanguage('xml', xml)

// Language mapping
const languageMap: Record<string, string> = {
  'py': 'python',
  'js': 'javascript',
  'ts': 'typescript',
  'sh': 'bash',
  'yml': 'yaml',
  'hcl': 'typescript', // use typescript for HCL
  'tf': 'typescript',  // use typescript for Terraform
  'dockerfile': 'bash'
}

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

  // Get the correct language for syntax highlighting
  const lang = languageMap[language.toLowerCase()] || language.toLowerCase()

  return (
    <motion.div 
      className="w-full rounded-lg overflow-hidden border border-gray-700 mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-center border-b border-gray-700 px-4 py-2 bg-[#282c34]">
        <div className="flex items-center gap-2">
          <div className="flex space-x-1">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
          </div>
          {title && (
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono text-gray-300">{title}</span>
            </div>
          )}
          {language && (
            <span className="text-xs bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-mono">{language}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-gray-200 transition-colors p-1 rounded hover:bg-[#2a2a2a]"
        >
          {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <div className="overflow-x-auto bg-[#282c34]">
        <SyntaxHighlighter
          language={lang}
          style={atomOneDark}
          customStyle={{
            margin: 0,
            padding: '1rem',
            fontSize: '0.875rem',
            backgroundColor: '#282c34',
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1em',
            color: '#636d83',
            textAlign: 'right',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            }
          }}
          lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </motion.div>
  )
}

// Add global CSS in your globals.css file (or a custom CSS file):
// 
// .syntax-highlighter-wrapper pre {
//   margin: 0 !important;
//   border-radius: 0 !important;
//   background: transparent !important;
// }
// 
// .syntax-highlighter-wrapper code {
//   background: transparent !important;
//   color: inherit !important;
//   font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
// }
// 
// .syntax-highlighter-wrapper code span {
//   color: inherit !important;
// } 