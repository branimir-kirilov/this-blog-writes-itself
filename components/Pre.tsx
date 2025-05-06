"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Copy, Check } from "lucide-react"

interface PreProps {
  children: React.ReactNode
}

const Pre = ({ children, ...props }: PreProps) => {
  const textInput = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  const onCopy = () => {
    if (textInput.current) {
      // Get text content from pre element
      const text = textInput.current.textContent || ""
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }

  return (
    <div className="relative group">
      <pre ref={textInput} {...props}>
        {children}
      </pre>
      <button
        aria-label="Copy code"
        onClick={onCopy}
        className="absolute right-2 top-2 h-8 w-8 rounded border bg-muted p-1 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-muted/80"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  )
}

export default Pre
