import Link from "next/link";
import { PenLine, Github } from "lucide-react";
import siteMetadata from "@/data/siteMetadata";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-full justify-center items-center md:justify-between md:items-start">
          <div className="flex flex-col gap-4 justify-center items-center md:items-start md:justify-start">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <PenLine
                className="h-6 w-6"
                style={{ color: "hsl(var(--purple-accent))" }}
              />
              <span className="text-xl font-bold gradient-text">
                This Blog Writes Itself
              </span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md text-center md:text-left">
              Exploring the frontiers of AI-generated content. Daily articles on
              technology, science, culture, and more.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center md:items-start md:justify-start">
            <h3 className="text-foreground font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center md:text-left">
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
            © {new Date().getFullYear()} This Blog Writes Itself. All content is
            AI-generated.
            <Link
              href={siteMetadata.siteRepo}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
