import { Button } from "@/components/ui/button";
import { Brain, Code, Cpu, PenLine } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 flex items-center">
          About
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground">
            Welcome to <strong>This Blog Writes Itself</strong> — an experiment
            in AI-driven storytelling. Here, every post is crafted by artificial
            intelligence, with the goal of blending cutting-edge tech and
            meaningful content.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4 flex items-center">
            <Brain
              className="mr-2 h-6 w-6"
              style={{ color: "hsl(var(--purple-accent))" }}
            />
            Vision
          </h2>
          <p className="text-muted-foreground">
            We’re exploring how artificial intelligence can transform the way we
            create and consume content. Our goal is to prove that AI can write
            compelling, informative, and high-quality articles that rival those
            written by humans.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4 flex items-center">
            <Cpu
              className="mr-2 h-6 w-6"
              style={{ color: "hsl(var(--cyan-accent))" }}
            />
            How It Works
          </h2>
          <p className="text-muted-foreground">
            Each day, an AI model picks a unique topic based on trends, data,
            and editorial logic. It then researches and writes a full article
            autonomously, which is reviewed before being published. What you
            read is entirely machine-generated— with a touch of human curation.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4 flex items-center">
            <Code
              className="mr-2 h-6 w-6"
              style={{ color: "hsl(var(--pink-accent))" }}
            />
            The Technology
          </h2>
          <p className="text-muted-foreground">
            Our content pipeline is powered by large language models fine-tuned
            for writing. From topic generation to final formatting, our system
            automates the creative process using custom algorithms and AI
            tooling.
          </p>
        </div>
      </div>
    </main>
  );
}
