import { getPostsByTag, getAllTags } from "@/lib/blog"
import { notFound } from "next/navigation"
import BlogCard from "@/components/BlogCard"
import { PenLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"

interface TagPageProps {
  params: { tag: string }
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag)

  return {
    title: `${tag} Articles | This Blog Writes Itself`,
    description: `Browse all articles tagged with ${tag}`,
  }
}

export async function generateStaticParams() {
  const tags = await getAllTags()

  return tags.map((tag) => ({
    tag: tag.toLowerCase(),
  }))
}

export default async function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag)
  const posts = await getPostsByTag(tag)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground mb-4">
            <Link href="/tags">← Back to all tags</Link>
          </Button>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 flex items-center">
            <PenLine className="mr-3 h-8 w-8" style={{ color: "hsl(var(--cyan-accent))" }} />
            Articles tagged with "{tag}"
          </h1>
          <p className="text-lg text-muted-foreground">
            Found {posts.length} article{posts.length !== 1 ? "s" : ""} with this tag.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </main>
  )
}
