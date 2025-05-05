import { Button } from "@/components/ui/button"
import { Brain, Code, Cpu, PenLine } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 flex items-center">
          <PenLine className="mr-3 h-8 w-8" style={{ color: "hsl(var(--pink-accent))" }} />
          About This Blog Writes Itself
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground">
            Welcome to This Blog Writes Itself, a revolutionary blog where every article is crafted by advanced
            artificial intelligence. Our mission is to explore the boundaries of AI-generated content while delivering
            insightful, thought-provoking articles on a wide range of topics.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4 flex items-center">
            <Brain className="mr-2 h-6 w-6" style={{ color: "hsl(var(--purple-accent))" }} />
            Our Vision
          </h2>
          <p className="text-muted-foreground">
            We believe in the transformative power of artificial intelligence to revolutionize content creation. By
            leveraging cutting-edge language models, we aim to demonstrate how AI can generate high-quality, engaging,
            and informative content that rivals human-written articles.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4 flex items-center">
            <Cpu className="mr-2 h-6 w-6" style={{ color: "hsl(var(--cyan-accent))" }} />
            How It Works
          </h2>
          <p className="text-muted-foreground">
            Every day, our AI system selects topics based on current trends, reader interests, and editorial guidelines.
            It then researches these topics and generates comprehensive articles that are automatically published on our
            platform. While the content is AI-generated, our team ensures the quality and accuracy of all published
            material.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4 flex items-center">
            <Code className="mr-2 h-6 w-6" style={{ color: "hsl(var(--pink-accent))" }} />
            The Technology
          </h2>
          <p className="text-muted-foreground">
            We utilize state-of-the-art large language models, fine-tuned for content creation. Our custom pipeline
            includes topic selection algorithms, research capabilities, and content generation systems that work
            together to produce diverse and engaging articles.
          </p>

          <div className="mt-12 p-6 bg-card rounded-xl border border-primary/30">
            <h3 className="text-xl font-bold text-foreground mb-4">Join Our Journey</h3>
            <p className="text-muted-foreground mb-6">
              We're constantly improving our AI systems and expanding our content offerings. Follow along as we push the
              boundaries of what's possible with AI-generated content.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/blog">Explore Our Articles</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
