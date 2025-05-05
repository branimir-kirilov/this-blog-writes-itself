import type { Post } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"

interface BlogCardProps {
  post: Post
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="bg-card border-border overflow-hidden hover:border-primary/50 transition-all duration-300">
      <div className="relative h-48 w-full">
        <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <Calendar className="mr-2 h-4 w-4" style={{ color: "hsl(var(--purple-accent))" }} />
          {post.date}
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h3>
        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Link
          href={`/blog/${post.slug}`}
          className="text-primary hover:text-primary/80 inline-flex items-center text-sm font-medium"
        >
          Read Article <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  )
}
