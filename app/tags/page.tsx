import { getAllTags } from "@/lib/blog"
import Link from "next/link"
import { PenLine } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Tags | This Blog Writes Itself",
  description: "Browse articles by tag",
}

export default async function TagsPage() {
  const tags = await getAllTags()

  return (
    <main className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 flex items-center">
          <PenLine className="mr-3 h-8 w-8" style={{ color: "hsl(var(--pink-accent))" }} />
          Browse by Tag
        </h1>

        <p className="text-muted-foreground mb-12">Select a tag to view all related articles.</p>

        <div className="flex flex-wrap gap-4">
          {tags.map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}>
              <Badge
                variant="outline"
                className="text-base py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
