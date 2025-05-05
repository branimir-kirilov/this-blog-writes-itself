export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  coverImage: string
  readingTime: number
  category: string
  tags: string[]
  featured?: boolean
}
