import { notFound } from "next/navigation";
import { PenLine, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";
import { format } from "date-fns";
import { getPostsByTag, getAllTags } from "@/lib/blog";

interface TagPageProps {
  params: { tag: string };
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);

  return {
    title: `${tag} Articles | This Blog Writes Itself`,
    description: `Browse all articles tagged with ${tag}`,
  };
}

export async function generateStaticParams() {
  const tags = await getAllTags();

  return tags.map((tag) => ({
    tag: encodeURIComponent(tag.toLowerCase()),
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag);

  // Get posts with this tag
  const posts = await getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Button
            asChild
            variant="ghost"
            className="text-muted-foreground hover:text-foreground mb-4"
          >
            <Link href="/tags">← Back to all tags</Link>
          </Button>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 flex items-center">
            Articles tagged with&nbsp;
            <span className="gradient-text"> {tag}</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Found {posts.length} article{posts.length !== 1 ? "s" : ""} with
            this tag.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
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
                  {post.summary}
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
      </div>
    </main>
  );
}
