import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Post } from "./types"

// Function to check if contentlayer is available
const isContentLayerAvailable = () => {
  try {
    // This will throw an error if the file doesn't exist
    require.resolve("contentlayer/generated")
    return true
  } catch (error) {
    return false
  }
}

// Function to get all blog posts
export async function getAllPosts(): Promise<Post[]> {
  // Try to use contentlayer if available
  if (isContentLayerAvailable()) {
    try {
      const { allPosts } = require("contentlayer/generated")
      return allPosts.map((post: any) => ({
        slug: post.slug,
        title: post.title,
        date: post.date,
        tags: post.tags || [],
        excerpt: post.summary,
        content: post.body.raw,
        coverImage: "/placeholder.svg?height=800&width=1200",
        readingTime: Math.ceil(post.readingTime.minutes),
        category: post.category || (post.tags && post.tags.length > 0 ? post.tags[0] : "Uncategorized"),
        featured: post.featured || false,
      }))
    } catch (error) {
      console.warn("Error loading contentlayer data:", error)
      // Fall back to file system if contentlayer fails
    }
  }

  // Fall back to reading files directly
  try {
    const postsDirectory = path.join(process.cwd(), "data/blog")

    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
      return getDummyPosts() // Return dummy data if directory doesn't exist
    }

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
          featured: matterResult.data.featured || false,
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

    // Mark the most recent post as featured if none are marked
    if (sortedPosts.length > 0 && !sortedPosts.some((post) => post.featured)) {
      sortedPosts[0].featured = true
    }

    return sortedPosts
  } catch (error) {
    console.error("Error reading blog posts from file system:", error)
    return getDummyPosts() // Return dummy data if file reading fails
  }
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
  const featuredPost = posts.find((post) => post.featured)
  return featuredPost || (posts.length > 0 ? posts[0] : null)
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
  // Make the comparison case-insensitive
  return posts.filter((post) => post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase()))
}

// Helper function to calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Function to get dummy posts when no real posts are available
function getDummyPosts(): Post[] {
  return [
    {
      slug: "future-of-ai-neural-networks",
      title: "The Future of AI: How Neural Networks Are Reshaping Industries",
      date: "2025-05-03",
      excerpt:
        "Explore how advanced neural networks are transforming various industries and what this means for the future of work and innovation.",
      content:
        "Artificial intelligence, particularly neural networks, has seen exponential growth in capabilities over the past decade. These sophisticated systems are now capable of tasks that were once thought to be exclusively human domains.\n\nFrom healthcare to finance, transportation to creative arts, neural networks are reshaping how industries operate. In healthcare, AI systems can now diagnose certain conditions with accuracy rivaling that of experienced physicians. Financial institutions use neural networks for fraud detection, risk assessment, and algorithmic trading at scales impossible for human analysts.\n\nPerhaps most fascinating is how these systems are beginning to demonstrate creative capabilities. AI-generated art, music, and writing are becoming increasingly sophisticated, raising profound questions about the nature of creativity itself.\n\nAs these technologies continue to evolve, we're likely to see even more dramatic transformations across all sectors of the economy. The implications for employment are significant, with routine cognitive tasks increasingly automated. However, history suggests that technological revolutions tend to create new categories of work even as they eliminate others.\n\nThe key challenge for society will be ensuring that the benefits of this AI revolution are broadly shared, and that we develop these powerful tools in ways that augment human capabilities rather than simply replacing them. This will require thoughtful policy approaches, investment in education and training, and a commitment to developing AI systems that align with human values and needs.",
      coverImage: "/placeholder.svg?height=800&width=1200",
      readingTime: 8,
      category: "Technology",
      tags: ["AI", "Neural Networks", "Future of Work", "Technology Trends"],
      featured: true,
    },
    {
      slug: "quantum-computing-basics",
      title: "Quantum Computing: Breaking Down the Basics",
      date: "2025-05-01",
      excerpt:
        "A beginner-friendly guide to understanding quantum computing and its potential impact on computational problems previously thought unsolvable.",
      content:
        "Quantum computing represents one of the most exciting frontiers in computer science today. Unlike classical computers that use bits (0s and 1s), quantum computers leverage quantum bits or 'qubits' that can exist in multiple states simultaneously thanks to the principles of quantum mechanics.\n\nThis fundamental difference gives quantum computers the potential to solve certain problems exponentially faster than even the most powerful classical supercomputers. Problems like factoring large numbers, which forms the basis of much of our current encryption technology, or simulating complex molecular interactions for drug discovery, become tractable with sufficient quantum computing power.\n\nThe core quantum mechanical properties that enable this computational advantage are superposition and entanglement. Superposition allows qubits to exist in multiple states at once, while entanglement creates correlations between qubits that can be leveraged for computation.\n\nHowever, building practical quantum computers faces enormous engineering challenges. Qubits are extremely fragile and susceptible to environmental interference, requiring sophisticated error correction techniques and often extreme cooling to near absolute zero temperatures.\n\nDespite these challenges, companies like IBM, Google, and a host of startups are making remarkable progress. In 2019, Google claimed to achieve 'quantum supremacy' by performing a calculation that would be practically impossible on classical hardware.\n\nAs quantum computing continues to mature, we can expect transformative applications across fields ranging from cryptography and materials science to optimization problems in logistics and finance. While a quantum computer isn't likely to replace your laptop anytime soon, its impact on specific computational domains will be profound.",
      coverImage: "/placeholder.svg?height=800&width=1200",
      readingTime: 10,
      category: "Science",
      tags: ["Quantum Computing", "Computer Science", "Technology", "Physics"],
      featured: false,
    },
  ]
}
