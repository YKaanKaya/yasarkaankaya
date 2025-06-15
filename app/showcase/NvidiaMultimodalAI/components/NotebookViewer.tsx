"use client"

import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
// Removed Image import as we're using standard img tags
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python'
import github from 'react-syntax-highlighter/dist/esm/styles/hljs/github'

SyntaxHighlighter.registerLanguage('python', python)

interface NotebookViewerProps {
  /**
   * Path to the .ipynb file relative to public folder, e.g. "/notebooks/foo.ipynb"
   */
  src: string
}

export function NotebookViewer({ src }: NotebookViewerProps) {
  const [cells, setCells] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadNotebook() {
      try {
        const res = await fetch(src)
        if (!res.ok) {
          throw new Error(`Failed to fetch notebook: ${res.status}`)
        }
        const nb = await res.json()
        // Attachments replacement in markdown
        const processed = (nb.cells || []).map((cell: any) => {
          if (cell.cell_type === 'markdown' && cell.attachments) {
            let src = cell.source.join('')
            for (const [cid, data] of Object.entries<any>(cell.attachments)) {
              const mime = Object.keys(data)[0]
              const base64 = data[mime]
              const dataUri = `data:${mime};base64,${base64}`
              src = src.replace(new RegExp(`attachment:${cid}`, 'g'), dataUri)
            }
            return { ...cell, source: [src] }
          }
          return cell
        })
        setCells(processed)
      } catch (err: any) {
        setError(err.message)
      }
    }
    loadNotebook()
  }, [src])

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  if (!cells.length) {
    return <p className="text-muted-foreground">Loading notebook…</p>
  }

  return (
    <div className="space-y-6">
      {cells.map((cell, idx) => {
        const execCount = cell.execution_count ?? idx + 1;
        if (cell.cell_type === 'markdown') {
          // Process markdown content
          let markdownContent = cell.source.join('');
          
          // Fix image paths for Jupyter notebook format
          markdownContent = markdownContent.replace(/src="images\//g, 'src="/notebooks/nvidia-multimodal/images/');
          markdownContent = markdownContent.replace(/src=\"images\//g, 'src=\"/notebooks/nvidia-multimodal/images/');
          
          // Handle image references in markdown format ![alt](images/file.png)
          markdownContent = markdownContent.replace(/!\[(.*?)\]\(images\/(.*?)\)/g, '![$1](/notebooks/nvidia-multimodal/images/$2)');
          
          // Handle <center><img src="images/file.png"...</center> pattern
          markdownContent = markdownContent.replace(/<img([^>]*)src="images\/(.*?)"([^>]*)>/g, '<img$1src="/notebooks/nvidia-multimodal/images/$2"$3>');
          
          // Remove any absolute file paths that might have been accidentally added
          markdownContent = markdownContent.replace(/src=".*?\\.*?\.png/g, (match: string) => {
            const filename = match.split('\\').pop();
            return `src="/notebooks/nvidia-multimodal/images/${filename}`;
          });
          
          // Special handling for missing resources
          
          // Handle missing VSS CA-RAG Diagram
          if (markdownContent.includes('VSS CA-RAG Diagram')) {
            return (
              <div key={idx} className="prose dark:prose-invert max-w-none">
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw as any]}
                >
                  {markdownContent.replace('VSS CA-RAG Diagram', '')}
                </ReactMarkdown>
                
                {/* Add the missing VSS CA-RAG Diagram */}
                <div className="my-4">
                  <p className="font-semibold text-base">VSS CA-RAG Diagram:</p>
                  <div className="flex justify-center my-4 border border-slate-300 p-4 bg-white">
                    <img 
                      src="https://assets.ngc.nvidia.com/products/api-catalog/video-search-and-summarization/diagram.png" 
                      alt="VSS CA-RAG Diagram" 
                      className="max-w-full"
                    />
                  </div>
                </div>
              </div>
            );
          }
          
          // Handle references to graph_neo4j.png
          if (markdownContent.includes('graph_neo4j.png')) {
            return (
              <div key={idx} className="prose dark:prose-invert max-w-none">
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw as any]}
                >
                  {markdownContent.replace(/!\[.*\]\(.*graph_neo4j\.png.*\)/g, '')}
                </ReactMarkdown>
                
                {/* Add a placeholder for the Neo4j graph */}
                <div className="my-4">
                  <p className="font-semibold text-base">Neo4j Graph Database Visualization:</p>
                  <div className="flex justify-center my-4 border border-slate-300 p-4 bg-gray-50">
                    <div className="p-4 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                      </svg>
                      <p className="mt-4 text-sm text-gray-600">This is a visualization of a knowledge graph in Neo4j that represents video data. The graph contains nodes for entities and relations between them.</p>
                      <p className="mt-2 text-xs text-gray-500">Original image reference: graph_neo4j.png</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          
          // Regular markdown render
          return (
            <ReactMarkdown
              key={idx}
              className="prose dark:prose-invert max-w-none"
              rehypePlugins={[rehypeRaw as any]}
            >
              {markdownContent}
            </ReactMarkdown>
          )
        }
        if (cell.cell_type === 'code') {
          return (
            <div key={idx} className="my-6">
              <div className="rounded-md border border-slate-300 overflow-hidden">
                <div className="bg-slate-100 px-3 py-1 text-xs font-mono text-slate-600">
                  In [{execCount}]:
                </div>
                <SyntaxHighlighter
                  language="python"
                  style={github}
                  customStyle={{ margin: 0, padding: '1rem', background: 'var(--background)' }}
                >
                  {cell.source.join('')}
                </SyntaxHighlighter>
              </div>


              {/* Render outputs */}
              {cell.outputs?.map((out: any, oIdx: number) => {
                if (out.output_type === 'stream') {
                  return (
                      <div key={oIdx} className="rounded-md border border-slate-300 mt-1 overflow-hidden">
                        <div className="bg-slate-50 px-3 py-1 text-xs font-mono text-slate-600">Out [{execCount}]:</div>
                        <pre className="px-3 py-2 whitespace-pre-wrap text-sm">
                          {Array.isArray(out.text) ? out.text.join('') : out.text}
                        </pre>
                      </div>
                    )
                }
                if (out.output_type === 'execute_result' || out.output_type === 'display_data') {
                  const data = out.data || {}
                  
                  // Handle HTML content first (may contain audio, video, interactive elements)
                  // This takes priority as it's often the richest representation
                  if (data['text/html']) {
                    const htmlRaw = Array.isArray(data['text/html']) ? data['text/html'].join('') : (data['text/html'] as string)
                                       // Fix video paths that might be causing 404s
                    let processedHtml = htmlRaw;
                    
                    // Check for various video patterns
                    const hasVideo = (
                      htmlRaw.includes('warehouse.mp4') || 
                      htmlRaw.includes('blob:') ||
                      htmlRaw.includes('<video') ||
                      (htmlRaw.includes('player') && htmlRaw.includes('controls'))
                    );
                    
                    // Generic video element detector
                    if (hasVideo) {
                      // Use a demo video from NVIDIA's public assets as a replacement
                      const demoVideoUrl = "https://assets.ngc.nvidia.com/assets/Services-NVIDIA-AI-Enterprise-3.1-Demo-WMV-536526088.mp4";
                      
                      return (
                        <div key={oIdx} className="rounded-md border border-slate-300 mt-1 overflow-hidden">
                          <div className="bg-slate-50 px-3 py-1 text-xs font-mono text-slate-600">Out [{execCount}]:</div>
                          <div className="p-4">
                            {/* Show a replacement NVIDIA demo video */}
                            <div className="my-4">
                              <p className="font-medium text-gray-700 mb-2">NVIDIA Video Demonstration:</p>
                              <div className="rounded-md overflow-hidden">
                                <video 
                                  controls 
                                  className="w-full max-h-[400px]" 
                                  poster="https://assets.ngc.nvidia.com/products/api-catalog/video-search-and-summarization/social.jpg">
                                  <source src={demoVideoUrl} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">Note: This is a replacement demo video from NVIDIA's public assets.</p>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    
                    return (
                      <div key={oIdx} className="rounded-md border border-slate-300 mt-1 overflow-hidden">
                        <div className="bg-slate-50 px-3 py-1 text-xs font-mono text-slate-600">Out [{execCount}]:</div>
                        <div 
                          className="p-4 w-full overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: processedHtml }}
                        />
                      </div>
                    )
                  }

                  // Video content (base64-encoded)
                  if (data['video/mp4'] || data['video/webm']) {
                    const videoData = data['video/mp4'] || data['video/webm']
                    const mime = data['video/mp4'] ? 'video/mp4' : 'video/webm'
                    return (
                      <div key={oIdx} className="rounded-md border border-slate-300 mt-1 overflow-hidden">
                        <div className="bg-slate-50 px-3 py-1 text-xs font-mono text-slate-600">Out [{execCount}]:</div>
                        <div className="flex justify-center py-4">
                          <video
                            controls
                            src={`data:${mime};base64,${videoData}`}
                            style={{ maxWidth: '100%' }}
                            className="mx-auto my-2"
                          >
                            Your browser does not support the video element.
                          </video>
                        </div>
                      </div>
                    )
                  }
                  
                  // Audio (base64-encoded)
                  if (data['audio/wav'] || data['audio/mp3'] || data['audio/mpeg']) {
                    const audioData = data['audio/wav'] || data['audio/mp3'] || data['audio/mpeg']
                    const mime = data['audio/wav'] ? 'audio/wav' : data['audio/mp3'] ? 'audio/mp3' : 'audio/mpeg'
                    return (
                      <div key={oIdx} className="rounded-md border border-slate-300 mt-1 overflow-hidden">
                        <div className="bg-slate-50 px-3 py-1 text-xs font-mono text-slate-600">Out [{execCount}]:</div>
                        <div className="flex justify-center py-4">
                          <audio
                            controls
                            src={`data:${mime};base64,${audioData}`}
                            className="block mx-auto"
                          >
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      </div>
                    )
                  }
                  
                  // Handle SVG diagrams and other vector graphics specifically
                  if (data['image/svg+xml']) {
                    const svgData = data['image/svg+xml']
                    return (
                      <div key={oIdx} className="rounded-md border border-slate-300 mt-1 overflow-hidden">
                        <div className="bg-slate-50 px-3 py-1 text-xs font-mono text-slate-600">Out [{execCount}]:</div>
                        <div className="flex justify-center py-4 w-full overflow-x-auto">
                          {/* For SVG, we use dangerouslySetInnerHTML to properly render vector graphics */}
                          {typeof svgData === 'string' && svgData.startsWith('<svg') ? (
                            <div dangerouslySetInnerHTML={{ __html: svgData }} className="mx-auto" />
                          ) : (
                            <img
                              src={`data:image/svg+xml;base64,${svgData}`}
                              alt="SVG diagram"
                              style={{ maxWidth: '100%' }}
                              className="mx-auto"
                            />
                          )}
                        </div>
                      </div>
                    )
                  }
                  
                  // Other image types
                  if (data['image/png'] || data['image/jpeg'] || data['image/gif']) {
                    const imgData = data['image/png'] || data['image/jpeg'] || data['image/gif']
                    const mime = data['image/png'] ? 'image/png' : data['image/jpeg'] ? 'image/jpeg' : 'image/gif'
                    return (
                      <div key={oIdx} className="rounded-md border border-slate-300 mt-1 overflow-hidden">
                        <div className="bg-slate-50 px-3 py-1 text-xs font-mono text-slate-600">Out [{execCount}]:</div>
                        <div className="flex justify-center py-4">
                          <img
                            src={`data:${mime};base64,${imgData}`}
                            alt="notebook output"
                            style={{ maxWidth: '100%', maxHeight: '600px' }}
                            className="mx-auto"
                          />
                        </div>
                      </div>
                    )
                  } else if (data['text/plain']) {
                    return (
                      <div key={oIdx} className="rounded-md border border-slate-300 mt-1 overflow-hidden">
                        <div className="bg-slate-50 px-3 py-1 text-xs font-mono text-slate-600">Out [{execCount}]:</div>
                        <pre className="px-3 py-2 whitespace-pre-wrap text-sm">
                          {Array.isArray(data['text/plain']) ? data['text/plain'].join('') : data['text/plain']}
                        </pre>
                      </div>
                    )
                  }
                }
                return null
              })}
            </div>
          )
        }
        return null
      })}
    </div>
  )
}
