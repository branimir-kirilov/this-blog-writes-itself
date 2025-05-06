import { getAllTags, getPostsByTag } from "@/lib/blog"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const tag = url.searchParams.get("tag")

  const allTags = await getAllTags()

  if (tag) {
    const posts = await getPostsByTag(tag)
    return NextResponse.json({
      tag,
      postsCount: posts.length,
      posts: posts.map((p) => ({ slug: p.slug, title: p.title, tags: p.tags })),
      allTags,
    })
  }

  return NextResponse.json({
    tags: allTags,
    encodedTags: allTags.map((tag) => ({
      original: tag,
      lowercase: tag.toLowerCase(),
      encoded: encodeURIComponent(tag.toLowerCase()),
    })),
  })
}
