import { notFound } from "next/navigation";
import { Calendar, Clock, Tag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { MDXLayoutRenderer } from "pliny/mdx-components.js";
import { components } from "@/components/MDXComponents";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | This Blog Writes Itself`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      authors: ["AI Author"],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = format(new Date(post.date), "MMMM d, yyyy");

  // Get related posts
  const relatedPosts = await getRelatedPosts(slug, 3);

  return (
    <main className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button
            asChild
            variant="ghost"
            className="text-muted-foreground hover:text-foreground mb-4"
          >
            <Link href="/blog">← Back to all articles</Link>
          </Button>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-center">
              <Calendar
                className="mr-2 h-4 w-4"
                style={{ color: "hsl(var(--purple-accent))" }}
              />
              {formattedDate}
            </div>
            <div className="flex items-center">
              <Clock
                className="mr-2 h-4 w-4"
                style={{ color: "hsl(var(--cyan-accent))" }}
              />
              {post.readingTime.text}
            </div>
            <div className="flex items-center">
              <User
                className="mr-2 h-4 w-4"
                style={{ color: "hsl(var(--blue-accent))" }}
              />
              {post.authors?.map((author) => author).join(", ")}
            </div>
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <Tag
                className="h-4 w-4 mr-2 mt-1"
                style={{ color: "hsl(var(--pink-accent))" }}
              />
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                >
                  <Badge variant="secondary" className="hover:bg-secondary/80">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MDXLayoutRenderer
            components={components}
            code={post.body.code}
            toc={post.toc}
          />
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto mt-20 pt-12 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((post) => (
              <div
                key={post.slug}
                className="bg-card border-border overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col h-full rounded-md border"
              >
                <div className="p-6 flex-grow">
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Calendar
                      className="mr-2 h-4 w-4"
                      style={{ color: "hsl(var(--purple-accent))" }}
                    />
                    {format(new Date(post.date), "MMMM d, yyyy")}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                </div>
                <div className="px-6 pb-6 pt-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary hover:text-primary/80 inline-flex items-center text-sm font-medium"
                  >
                    Read Article →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
