import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Post } from "./types"

// Function to get all blog posts
export async function getAllPosts(): Promise<Post[]> {
  // This function is only used at build time, so it's safe to use fs
  const postsDirectory = path.join(process.cwd(), "data/blog")
  const filenames = fs.readdirSync(postsDirectory)

  const allPostsData = filenames
    .filter((filename) => {
      // Only include .md and .mdx files
      return filename.endsWith(".md") || filename.endsWith(".mdx")
    })
    .map((filename) => {
      // Remove the file extension to get the slug
      const slug = filename.replace(/\.mdx?$/, "")

      // Read the markdown file as string
      const fullPath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(fullPath, "utf8")

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents)

      // Combine the data with the slug
      return {
        slug,
        title: matterResult.data.title,
        date: matterResult.data.date,
        tags: matterResult.data.tags || [],
        excerpt: matterResult.data.summary,
        content: matterResult.content,
        coverImage: matterResult.data.image || "/placeholder.svg?height=800&width=1200",
        readingTime: calculateReadingTime(matterResult.content),
        category:
          matterResult.data.tags && matterResult.data.tags.length > 0 ? matterResult.data.tags[0] : "Uncategorized",
        featured: false, // We'll determine this based on date
      } as Post
    })

  // Sort posts by date
  const sortedPosts = allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1
    } else {
      return -1
    }
  })

  // Mark the most recent post as featured
  if (sortedPosts.length > 0) {
    sortedPosts[0].featured = true
  }

  return sortedPosts
}

// Function to get a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const posts = await getAllPosts()
    return posts.find((post) => post.slug === slug) || null
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error)
    return null
  }
}

// Function to get the featured post (most recent)
export async function getFeaturedPost(): Promise<Post | null> {
  const posts = await getAllPosts()
  return posts.length > 0 ? posts[0] : null
}

// Function to get recent posts
export async function getRecentPosts(count: number): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.slice(0, count)
}

// Function to get related posts
export async function getRelatedPosts(currentSlug: string, count: number): Promise<Post[]> {
  const allPosts = await getAllPosts()
  const currentPost = await getPostBySlug(currentSlug)

  if (!currentPost) return []

  return allPosts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => post.category === currentPost.category || post.tags.some((tag) => currentPost.tags.includes(tag)))
    .slice(0, count)
}

// Function to get all unique tags
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tags = new Set<string>()

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tags.add(tag)
    })
  })

  return Array.from(tags).sort()
}

// Function to get posts by tag
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.tags.includes(tag))
}

// Helper function to calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}
