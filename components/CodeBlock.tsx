"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Check, Copy } from "lucide-react"

interface CodeBlockProps {
  language: string
  value: string
}

// Basic syntax highlighting function
function highlightCode(code: string, language: string): string {
  // This is a very basic implementation
  // Replace with more sophisticated highlighting if needed

  // Keywords
  const keywords = [
    "function",
    "const",
    "let",
    "var",
    "return",
    "if",
    "else",
    "for",
    "while",
    "class",
    "import",
    "export",
    "from",
    "try",
    "catch",
    "async",
    "await",
    "void",
    "int",
    "float",
    "double",
    "boolean",
    "string",
    "true",
    "false",
    "null",
    "undefined",
    "this",
    "super",
    "new",
    "delete",
    "typeof",
    "instanceof",
  ]

  // Replace HTML special characters
  let highlighted = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

  // Highlight strings
  highlighted = highlighted.replace(/(["'`])(.*?)\1/g, '<span class="token string">$1$2$1</span>')

  // Highlight numbers
  highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="token number">$1</span>')

  // Highlight comments (basic)
  highlighted = highlighted.replace(/(\/\/.*$)/gm, '<span class="token comment">$1</span>')

  // Highlight multiline comments (very basic)
  highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="token comment">$1</span>')

  // Highlight keywords
  keywords.forEach((keyword) => {
    const regex = new RegExp(`\\b(${keyword})\\b`, "g")
    highlighted = highlighted.replace(regex, '<span class="token keyword">$1</span>')
  })

  // Highlight functions (basic)
  highlighted = highlighted.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="token function">$1</span>(')

  return highlighted
}

export default function CodeBlock({ language, value }: CodeBlockProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Normalize language name
  const normalizedLanguage = language?.toLowerCase() || "text"

  if (!mounted) return null

  const isDark = theme === "dark"
  const highlightedCode = highlightCode(value, normalizedLanguage)

  return (
    <div className="relative my-6 rounded-md overflow-hidden border border-border">
      <div className="flex items-center justify-between bg-muted px-4 py-2 text-sm border-b border-border">
        <span className="font-mono text-muted-foreground">{normalizedLanguage || "text"}</span>
        <button
          onClick={handleCopy}
          className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <pre className={`p-4 overflow-auto ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
        <code className="text-sm font-mono" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    </div>
  )
}
