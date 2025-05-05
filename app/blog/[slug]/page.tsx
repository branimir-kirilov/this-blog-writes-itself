import { getPostBySlug, getRelatedPosts } from "@/lib/blog"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Calendar, Clock, Tag } from "lucide-react"
import BlogCard from "@/components/BlogCard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"
import { MDXRemote } from "next-mdx-remote/rsc"

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${post.title} | This Blog Writes Itself`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["AI Author"],
      images: [
        {
          url: post.coverImage || "/placeholder.svg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post.slug, 3)

  return (
    <main className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground mb-4">
            <Link href="/blog">← Back to all articles</Link>
          </Button>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">{post.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" style={{ color: "hsl(var(--purple-accent))" }} />
              {post.date}
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" style={{ color: "hsl(var(--cyan-accent))" }} />
              {post.readingTime} min read
            </div>
            <div className="flex items-center">
              <Tag className="mr-2 h-4 w-4" style={{ color: "hsl(var(--pink-accent))" }} />
              {post.category}
            </div>
          </div>
        </div>

        <div className="relative w-full h-[400px] mb-10 rounded-xl overflow-hidden">
          <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto mt-20 pt-12 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
