import { getAllPosts } from "@/lib/blog"
import BlogCard from "@/components/BlogCard"
import Pagination from "@/components/Pagination"
import { PenLine } from "lucide-react"

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string }
}) {
  const currentPage = Number(searchParams.page) || 1
  const category = searchParams.category
  const postsPerPage = 6

  const allPosts = await getAllPosts()

  // Filter by category if provided
  const filteredPosts = category
    ? allPosts.filter((post) => post.category.toLowerCase() === category.toLowerCase())
    : allPosts

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  return (
    <main className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 flex items-center justify-center">
            <PenLine className="mr-3 h-8 w-8" style={{ color: "hsl(var(--cyan-accent))" }} />
            {category ? `${category} Articles` : "All Articles"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of AI-generated articles covering technology, science, culture, and more.
          </p>
        </div>

        {currentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found in this category.</p>
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
  )
}
