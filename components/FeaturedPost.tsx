import type { Post } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"

interface FeaturedPostProps {
  post: Post
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Card className="bg-card border-border overflow-hidden hover:border-primary/50 transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative h-64 lg:h-full w-full">
          <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        </div>
        <CardContent className="p-6 lg:p-8 flex flex-col justify-center">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" style={{ color: "hsl(var(--pink-accent))" }} />
              {post.date}
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" style={{ color: "hsl(var(--cyan-accent))" }} />
              {post.readingTime} min read
            </div>
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">{post.title}</h3>
          <p className="text-muted-foreground mb-6">{post.excerpt}</p>
          <Button asChild className="w-fit bg-primary hover:bg-primary/90">
            <Link href={`/blog/${post.slug}`}>Read Full Article</Link>
          </Button>
        </CardContent>
      </div>
    </Card>
  )
}
