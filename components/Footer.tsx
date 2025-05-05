import Link from "next/link"
import { PenLine, Github, Twitter, Rss } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <PenLine className="h-6 w-6" style={{ color: "hsl(var(--purple-accent))" }} />
              <span className="text-xl font-bold gradient-text">This Blog Writes Itself</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Exploring the frontiers of AI-generated content. Daily articles on technology, science, culture, and more.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Rss className="h-5 w-5" />
                <span className="sr-only">RSS Feed</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog?category=technology"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/blog?category=science"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Science
                </Link>
              </li>
              <li>
                <Link
                  href="/blog?category=ai"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Artificial Intelligence
                </Link>
              </li>
              <li>
                <Link
                  href="/blog?category=future"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Future Trends
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} This Blog Writes Itself. All content is AI-generated.
          </p>
        </div>
      </div>
    </footer>
  )
}
