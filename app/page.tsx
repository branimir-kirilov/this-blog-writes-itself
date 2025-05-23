import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, PenLine, Calendar } from "lucide-react";
import { format } from "date-fns";
import { getFeaturedPost, getRecentPosts } from "@/lib/blog";

export default async function Home() {
  // Get featured and recent posts
  const featuredPost = await getFeaturedPost();
  const recentPosts = await getRecentPosts(4);

  // Filter out the featured post from recent posts
  const filteredRecentPosts = featuredPost
    ? recentPosts.filter((post) => post.slug !== featuredPost.slug).slice(0, 3)
    : recentPosts.slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 gradient-bg"></div>
        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            <span className="gradient-text">This Blog</span> Writes Itself
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            See what the AI comes up with next.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              <Link href="/blog">
                Explore Articles <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10"
            >
              <Link href="/about">
                Learn More <PenLine className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center">
              Latest Article
            </h2>
            <div className="bg-card border-border overflow-hidden hover:border-primary/50 transition-all duration-300 rounded-md border">
              <div className="p-6 lg:p-8">
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar
                      className="mr-2 h-4 w-4"
                      style={{ color: "hsl(var(--pink-accent))" }}
                    />
                    {format(new Date(featuredPost.date), "MMMM d, yyyy")}
                  </div>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  {featuredPost.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {featuredPost.summary}
                </p>
                <Button
                  asChild
                  className="w-fit bg-primary hover:bg-primary/90"
                >
                  <Link href={`/blog/${featuredPost.slug}`}>
                    Read Full Article
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      {filteredRecentPosts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              Recent Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecentPosts.map((post) => (
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
            <div className="mt-12 text-center">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/blog">View All Articles</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
