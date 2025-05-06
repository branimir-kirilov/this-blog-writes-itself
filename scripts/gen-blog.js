import OpenAI from "openai";
import fs from "fs";
import dotenv from "dotenv";
import moment from "moment";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";

dotenv.config();

const openai = new OpenAI();

const MODEL = "gpt-4o-mini";
const BLOG_POST_PATH = process.env.BLOG_POST_PATH || "content/posts/";
const TOPICS_FILE = "used_topics.json";

const MAX_RETRIES = 3;

function loadUsedTopics() {
  if (fs.existsSync(TOPICS_FILE)) {
    return JSON.parse(fs.readFileSync(TOPICS_FILE, "utf-8"));
  }
  return [];
}

function saveUsedTopics(topics) {
  fs.writeFileSync(TOPICS_FILE, JSON.stringify(topics, null, 2));
}

async function getUniqueTopic(usedTopics) {
  for (let i = 0; i < MAX_RETRIES; i++) {
    const BlogTopic = z.object({
      topic: z.string(),
    });

    const response = await openai.responses.parse({
      model: MODEL,
      temperature: 0.7,
      input:
        "Suggest a unique and underexplored topic in software development suitable for a technical blog post.",
      text: {
        format: zodTextFormat(BlogTopic, "suggestion"),
      },
    });

    console.log(response.output_parsed);
    const topic = response.output_parsed.topic;
    if (!usedTopics.includes(topic)) {
      return topic;
    }
  }

  throw new Error("Failed to generate a unique topic after several attempts.");
}

async function generateBlogContent(topic) {
  const todayDate = moment().format("YYYY-MM-DD");

  const prompt = `
    Write a comprehensive technical blog post (2000–3000 words) in Markdown (MDX) format on the topic: '${topic}'.

    Requirements:

    1. Front Matter (YAML format) at the top of the document:
      - title: A compelling, human-friendly title that draws interest.
      - authors: [${MODEL.split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")}].
      - date: ${todayDate}
      - tags: A relevant, well-curated list of 3–6 tags (e.g., ['cloud computing', 'Kubernetes', 'DevOps']).
      - summary: A clear, concise one-sentence overview of the post.
      - category: A category for the post (e.g., 'Software Development', 'Cloud Computing', 'DevOps', 'AI', 'Cybersecurity', 'Cloud Computing', 'Kubernetes', 'DevOps').

    2. Main Content Structure:

    The body of the post should be well-structured, logically organized, and easy to navigate, using appropriate markdown headings and formatting.

    - Start with a hook-driven introduction: Briefly define the topic and why it matters now. Include a real-world scenario to ground the topic.
    - Include sectioned content using headings (e.g., "## What is XYZ?", "## Real-World Challenges", "## Best Practices", "## Future Trends", etc.).
    - Support your points with:
      - Code samples (formatted in Markdown).
      - Visual metaphors, analogies, or case studies from real-life projects or industries.
      - References to credible sources: articles, books, tools, tutorials, YouTube videos, or conference talks.
    - Conclude with a strong summary: Reiterate the key takeaways, why they matter, and how readers can apply the insights.

    3. Tone and Style:
    - Write like a human, not a robot.
    - Be engaging, educational, and authoritative—like you're teaching an eager learner.
    - Avoid fluff, but feel free to inject personality or storytelling if it enhances understanding.

    4. Formatting Guidelines:
    - Use standard Markdown headings (##, ###, etc.) and lists.
    - Do NOT include markdown code fences like \`\`\`mdx around the full response.
    - You MAY include code blocks where necessary.
    - Follow the structure:

    ---
    title: "Your Catchy Blog Post Title"
    authors: ["${MODEL.split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")}"]
    date: '${todayDate}'
    tags: ['relevant', 'tags', 'here']
    summary: "A one-sentence summary of what this post delivers."
    category: "Software Development"
    ---

    ## Introduction

    Engaging intro with context...

    ## Main Section 1

    Informative content...

    ## Main Section 2

    More insights...

    ## Conclusion

    Wrap-up with clear takeaways.
  `;

  const response = await openai.responses.create({
    model: MODEL,
    input: prompt,
    temperature: 0.7,
  });

  console.log("response is", response);
  return response.output_text;
}

async function saveBlogPost(topic, content, usedTopics) {
  const slug = topic
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace("/", "-")
    .substring(0, 50);
  const filename = `${BLOG_POST_PATH}${slug}.mdx`;

  // Save blog post content to a file (for local reference, optional)
  fs.writeFileSync(filename, content);

  // Update the used topics list
  usedTopics.push(topic);
  saveUsedTopics(usedTopics);
}

// Main workflow
(async () => {
  try {
    const usedTopics = loadUsedTopics();
    const topic = await getUniqueTopic(usedTopics);
    const content = await generateBlogContent(topic);
    await saveBlogPost(topic, content, usedTopics);
  } catch (error) {
    console.error("Error:", error);
  }
})();
