"use client"
import ReactMarkdown from "react-markdown"
import type React from "react"

import remarkGfm from "remark-gfm"
import CodeBlock from "./CodeBlock"
import { useMDXComponent } from "next-contentlayer/hooks"
import { useState, useEffect } from "react"

interface MarkdownProps {
  content: string
  mdxCode?: string
}

const CustomLink = (props: any) => {
  const href = props.href

  if (href.startsWith("/")) {
    return (
      <a href={href} {...props}>
        {props.children}
      </a>
    )
  }

  if (href.startsWith("#")) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

const components = {
  a: CustomLink,
}

export default function Markdown({ content, mdxCode }: MarkdownProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [MDXComponent, setMDXComponent] = useState<React.FC<any> | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (mdxCode && isMounted) {
      try {
        const Component = useMDXComponent(mdxCode)
        setMDXComponent(() => Component)
      } catch (error) {
        console.warn("Error rendering MDX, falling back to markdown:", error)
        // Fall back to regular markdown if MDX fails
        setMDXComponent(null)
      }
    }
  }, [mdxCode, isMounted])

  // If we have MDX code and we're client-side, try to use it
  if (MDXComponent) {
    return <MDXComponent components={components} />
  }

  // Otherwise use regular markdown
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
        h4: ({ node, ...props }) => <h4 className="text-lg font-bold mt-6 mb-2" {...props} />,
        p: ({ node, ...props }) => <p className="mb-4" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
        a: ({ node, ...props }) => <a className="text-primary hover:underline" {...props} />,
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-primary pl-4 italic my-4" {...props} />
        ),
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "")
          const language = match ? match[1] : ""

          return !inline ? (
            <CodeBlock language={language} value={String(children).replace(/\n$/, "")} />
          ) : (
            <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono" {...props}>
              {children}
            </code>
          )
        },
        pre: ({ node, ...props }) => <div className="overflow-auto" {...props} />,
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full divide-y divide-border" {...props} />
          </div>
        ),
        thead: ({ node, ...props }) => <thead className="bg-muted" {...props} />,
        th: ({ node, ...props }) => (
          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" {...props} />
        ),
        td: ({ node, ...props }) => <td className="px-4 py-3 text-sm" {...props} />,
        tr: ({ node, ...props }) => <tr className="border-b border-border" {...props} />,
        img: ({ node, ...props }) => (
          <img className="max-w-full h-auto my-6 rounded-md" {...props} alt={props.alt || ""} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
