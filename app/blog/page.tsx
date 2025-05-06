import Pagination from "@/components/Pagination";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { allBlogs } from "contentlayer/generated";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string };
}) {
  const { category, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const postsPerPage = 6;

  const filteredPosts = category
    ? allBlogs.filter(
        (post) => post.category.toLowerCase() === category.toLowerCase()
      )
    : allBlogs;

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  return (
    <main className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 flex items-center justify-center">
            {category ? `${category} Articles` : "All Articles"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of AI-generated articles covering technology,
            science, culture, and more.
          </p>
        </div>

        {currentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => (
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

                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Link
                          key={tag}
                          href={`/tags/${encodeURIComponent(
                            tag.toLowerCase()
                          )}`}
                          className="text-xs font-medium text-primary hover:text-primary/80 uppercase"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  )}
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
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No articles found in this category.
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-16">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl={category ? `/blog?category=${category}` : "/blog"}
            />
          </div>
        )}
      </div>
    </main>
  );
}
