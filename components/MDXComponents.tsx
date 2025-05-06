"use client"

import Link from "next/link"
import { useMDXContent } from "@/lib/contentlayer-utils"

const CustomLink = (props) => {
  const href = props.href

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
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

interface MDXComponentProps {
  code: string
}

export function MDXComponent({ code }: MDXComponentProps) {
  const Component = useMDXContent(code)
  return <Component components={components} />
}
