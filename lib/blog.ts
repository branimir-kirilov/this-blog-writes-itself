import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Post } from "./types"

const postsDirectory = path.join(process.cwd(), "content/blog")

// Helper function to read a markdown file and parse frontmatter
async function getPostData(filename: string): Promise<Post | null> {
  try {
    const slug = filename.replace(/\.md$/, "")
    const fullPath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    // Parse the frontmatter
    const { data, content } = matter(fileContents)

    // Validate required fields
    if (!data.title || !data.date || !data.excerpt) {
      console.warn(`Missing required fields in ${filename}`)
      return null
    }

    // Return the post data
    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      content,
      coverImage: data.coverImage || "/placeholder.svg",
      readingTime: data.readingTime || calculateReadingTime(content),
      category: data.category || "Uncategorized",
      tags: data.tags || [],
      featured: data.featured || false,
    }
  } catch (error) {
    console.error(`Error reading post ${filename}:`, error)
    return null
  }
}

// Calculate reading time based on content length
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Get all posts
export async function getAllPosts(): Promise<Post[]> {
  // Create the directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })

    // Create sample posts if directory is empty
    await createSamplePosts()
  }

  const filenames = fs.readdirSync(postsDirectory)
  const allPostsData = await Promise.all(
    filenames.filter((filename) => filename.endsWith(".md")).map(async (filename) => await getPostData(filename)),
  )

  // Filter out any null values and sort by date
  return allPostsData
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    return await getPostData(`${slug}.md`)
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error)
    return null
  }
}

// Get featured posts
export async function getFeaturedPost(): Promise<Post | null> {
  const posts = await getAllPosts()
  const featuredPosts = posts.filter((post) => post.featured)

  return featuredPosts.length > 0 ? featuredPosts[0] : posts.length > 0 ? posts[0] : null
}

// Get recent posts
export async function getRecentPosts(count: number): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.slice(0, count)
}

// Get related posts
export async function getRelatedPosts(currentSlug: string, count: number): Promise<Post[]> {
  const allPosts = await getAllPosts()
  const currentPost = await getPostBySlug(currentSlug)

  if (!currentPost) return []

  return allPosts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => post.category === currentPost.category || post.tags.some((tag) => currentPost.tags.includes(tag)))
    .slice(0, count)
}

// Create sample posts if none exist
async function createSamplePosts() {
  const samplePosts = [
    {
      filename: "future-of-ai-neural-networks.md",
      content: `---
title: "The Future of AI: How Neural Networks Are Reshaping Industries"
date: "May 3, 2025"
excerpt: "Explore how advanced neural networks are transforming various industries and what this means for the future of work and innovation."
coverImage: "/placeholder.svg?height=800&width=1200"
category: "Technology"
tags: ["AI", "Neural Networks", "Future of Work", "Technology Trends"]
featured: true
---

# The Future of AI: How Neural Networks Are Reshaping Industries

Artificial intelligence, particularly neural networks, has seen exponential growth in capabilities over the past decade. These sophisticated systems are now capable of tasks that were once thought to be exclusively human domains.

## Transforming Industries

From healthcare to finance, transportation to creative arts, neural networks are reshaping how industries operate. In healthcare, AI systems can now diagnose certain conditions with accuracy rivaling that of experienced physicians. Financial institutions use neural networks for fraud detection, risk assessment, and algorithmic trading at scales impossible for human analysts.

Perhaps most fascinating is how these systems are beginning to demonstrate creative capabilities. AI-generated art, music, and writing are becoming increasingly sophisticated, raising profound questions about the nature of creativity itself.

## The Employment Question

As these technologies continue to evolve, we're likely to see even more dramatic transformations across all sectors of the economy. The implications for employment are significant, with routine cognitive tasks increasingly automated. However, history suggests that technological revolutions tend to create new categories of work even as they eliminate others.

## The Path Forward

The key challenge for society will be ensuring that the benefits of this AI revolution are broadly shared, and that we develop these powerful tools in ways that augment human capabilities rather than simply replacing them. This will require thoughtful policy approaches, investment in education and training, and a commitment to developing AI systems that align with human values and needs.`,
    },
    {
      filename: "quantum-computing-basics.md",
      content: `---
title: "Quantum Computing: Breaking Down the Basics"
date: "May 1, 2025"
excerpt: "A beginner-friendly guide to understanding quantum computing and its potential impact on computational problems previously thought unsolvable."
coverImage: "/placeholder.svg?height=800&width=1200"
category: "Science"
tags: ["Quantum Computing", "Computer Science", "Technology", "Physics"]
---

# Quantum Computing: Breaking Down the Basics

Quantum computing represents one of the most exciting frontiers in computer science today. Unlike classical computers that use bits (0s and 1s), quantum computers leverage quantum bits or 'qubits' that can exist in multiple states simultaneously thanks to the principles of quantum mechanics.

## The Quantum Advantage

This fundamental difference gives quantum computers the potential to solve certain problems exponentially faster than even the most powerful classical supercomputers. Problems like factoring large numbers, which forms the basis of much of our current encryption technology, or simulating complex molecular interactions for drug discovery, become tractable with sufficient quantum computing power.

## How It Works

The core quantum mechanical properties that enable this computational advantage are superposition and entanglement. Superposition allows qubits to exist in multiple states at once, while entanglement creates correlations between qubits that can be leveraged for computation.

## Engineering Challenges

However, building practical quantum computers faces enormous engineering challenges. Qubits are extremely fragile and susceptible to environmental interference, requiring sophisticated error correction techniques and often extreme cooling to near absolute zero temperatures.

## Progress and Potential

Despite these challenges, companies like IBM, Google, and a host of startups are making remarkable progress. In 2019, Google claimed to achieve 'quantum supremacy' by performing a calculation that would be practically impossible on classical hardware.

As quantum computing continues to mature, we can expect transformative applications across fields ranging from cryptography and materials science to optimization problems in logistics and finance. While a quantum computer isn't likely to replace your laptop anytime soon, its impact on specific computational domains will be profound.`,
    },
    {
      filename: "ethics-autonomous-vehicles.md",
      content: `---
title: "The Ethics of Autonomous Vehicles: Navigating Moral Dilemmas"
date: "April 28, 2025"
excerpt: "Examining the complex ethical questions surrounding self-driving cars and how programmers are addressing impossible moral choices."
coverImage: "/placeholder.svg?height=800&width=1200"
category: "Ethics"
tags: ["Autonomous Vehicles", "Ethics", "AI Ethics", "Transportation"]
---

# The Ethics of Autonomous Vehicles: Navigating Moral Dilemmas

As autonomous vehicles move from science fiction to reality, they bring with them a host of complex ethical dilemmas that have no easy answers. Perhaps the most discussed is the modern version of the trolley problem: how should a self-driving car be programmed to respond in an unavoidable accident scenario?

## The Trolley Problem on Wheels

Imagine a situation where a self-driving car must choose between swerving to avoid pedestrians but endangering its passengers, or protecting its passengers at the cost of harming others. Who should the car be programmed to prioritize? Should it minimize total casualties? Protect the most vulnerable? Always save its passengers?

## Programmed Ethics

Unlike human drivers who make split-second, instinctive decisions in emergencies, autonomous vehicles will follow pre-programmed ethics. This means engineers and policymakers must explicitly codify moral judgments in software—a responsibility with profound implications.

## Beyond Crash Scenarios

Beyond crash scenarios, autonomous vehicles raise questions about data privacy, liability for accidents, potential job displacement for professional drivers, and how these vehicles might reshape our cities and transportation systems.

## Cultural Variations

Different cultures may also have varying perspectives on the right ethical framework. A study by MIT called the Moral Machine gathered data from millions of people worldwide, revealing significant cultural variations in ethical priorities for autonomous vehicles.

## The Path Forward

As we navigate these challenging questions, it's crucial that the development of autonomous vehicle ethics involves diverse stakeholders—not just engineers and companies, but ethicists, policymakers, and the broader public. The decisions we make will not only determine how these vehicles behave on our roads but also set precedents for how we approach ethics in other autonomous systems.`,
    },
  ]

  // Create the sample posts
  for (const post of samplePosts) {
    const fullPath = path.join(postsDirectory, post.filename)
    fs.writeFileSync(fullPath, post.content)
  }
}
