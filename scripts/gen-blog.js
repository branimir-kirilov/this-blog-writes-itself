import { Octokit } from "@octokit/rest";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import moment from "moment";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";

dotenv.config();

const openai = new OpenAI();

const octokit = new Octokit({
  auth: process.env.REPO_TOKEN,
});

const REPO_NAME = process.env.REPO_NAME;
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
      model: "gpt-4o-mini",
      input:
        "Suggest a unique, lesser-known software development topic for a blog post.",
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
    Write a 2000-word technical blog post in Markdown (MDX) format on the topic: '${topic}'.
    The content should include the following:

    1. **Front Matter** with the following fields:
        - \`title\`: A catchy title for the blog post.
        - \`date\`: ${todayDate} important - USE THIS DATE.
        - \`tags\`: A list of relevant tags (e.g., ['Tag1', 'Tag2', 'Tag3']).
        - \`draft\`: Set to \`false\`.
        - \`summary\`: A brief one-sentence summary of the blog post.

    2. **Main Content** should have:
        - An introduction to the topic.
        - Sectioned body with relevant headings (e.g., "Introduction", "Challenges", "Future of XYZ").
        - Conclude with a strong closing that wraps up the key points.

    Format it in the following structure:

    ---
    title: "The tile of the blog post"
    date: '${todayDate} important - USE THIS DATE'
    tags: ['a list of tags']
    summary: "<A summary of the blog post>"
    ---

    # Heading 1

    Content

    ## Heading 2

    Content

    ... etc

   You may include code samples and other formatting that markdown supports, but do not start the response with mdx markdown quotes like (\`\`\`mdx or \`\`\`), just the string of the content like the format above. Try to sound
   as a human as possible, not like a robot. Give examples of real life scenarios and real life projects that can be used as examples. Link relevant resources like articles, videos, books, etc if you think it's relevant.
  `;

  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
    // max_tokens: 1500,
    // temperature: 0.7,
  });

  console.log("response is", response);
  return response.output_text;
}

async function createPullRequest(topic, content, usedTopics) {
  const [owner, repo] = REPO_NAME.split("/");

  // Generate branch name
  const timestamp = moment().format("YYYYMMDDHHMMSS");
  const branchName = `auto-blog-${timestamp}`;

  // Get the default branch for repo
  const {
    data: { default_branch },
  } = await octokit.repos.get({
    owner,
    repo,
  });

  // Create new branch
  const {
    data: {
      object: { sha },
    },
  } = await octokit.git.getRef({
    owner,
    repo,
    ref: `heads/${default_branch}`,
  });

  await octokit.git.createRef({
    owner,
    repo,
    ref: `refs/heads/${branchName}`,
    sha,
  });

  const slug = topic
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace("/", "-")
    .substring(0, 50);
  const filename = `${BLOG_POST_PATH}${slug}.mdx`;

  // Save blog post content to a file (for local reference, optional)
  fs.writeFileSync(filename, content);

  // Commit blog post to GitHub
  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: filename,
    message: `Add blog post: ${topic}`,
    content: Buffer.from(content).toString("base64"),
    branch: branchName,
  });

  // Update the used topics list
  usedTopics.push(topic);
  saveUsedTopics(usedTopics);

  // Commit the used topics list file
  const usedTopicsContent = fs.readFileSync(TOPICS_FILE, "utf-8");
  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: TOPICS_FILE,
    message: "Update used topics list",
    content: Buffer.from(usedTopicsContent).toString("base64"),
    branch: branchName,
  });

  // Create Pull Request
  const { data: pr } = await octokit.pulls.create({
    owner,
    repo,
    title: `Add blog post: ${topic}`,
    body: `Auto-generated blog post on **${topic}**.`,
    head: branchName,
    base: default_branch,
  });

  console.log(`✅ PR created: ${pr.html_url}`);
}

// Main workflow
(async () => {
  try {
    const usedTopics = loadUsedTopics();
    const topic = await getUniqueTopic(usedTopics);
    const content = await generateBlogContent(topic);
    await createPullRequest(topic, content, usedTopics);
  } catch (error) {
    console.error("Error:", error);
  }
})();
