import { defineDocumentType, makeSource } from "contentlayer/source-files"
import readingTime from "reading-time"
import rehypeSlug from "rehype-slug"
import rehypeCodeTitles from "rehype-code-titles"
import rehypePrismPlus from "rehype-prism-plus"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import remarkGfm from "remark-gfm"

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      default: [],
    },
    draft: {
      type: "boolean",
      default: false,
    },
    summary: {
      type: "string",
      required: true,
    },
    category: {
      type: "string",
      default: "Uncategorized",
    },
    featured: {
      type: "boolean",
      default: false,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw),
    },
    excerpt: {
      type: "string",
      resolve: (doc) => doc.summary || "",
    },
  },
}))

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      [rehypePrismPlus, { showLineNumbers: true }],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
})
