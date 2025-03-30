"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeDebug() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed left-4 top-4 z-50 bg-secondary p-2 rounded-lg text-xs">
      <p>Theme: {theme}</p>
      <p>Resolved Theme: {resolvedTheme}</p>
    </div>
  )
} 