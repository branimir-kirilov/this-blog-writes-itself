import type { Blog } from "contentlayer/generated";
import { allBlogs } from "contentlayer/generated";

// Function to get a single post by slug
export async function getPostBySlug(slug: string): Promise<Blog | null> {
  try {
    return allBlogs.find((post) => post.slug === slug) || null;
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error);
    return null;
  }
}

// Function to get the featured post (most recent)
export async function getFeaturedPost(): Promise<Blog | null> {
  const featuredPost = allBlogs.find((post) => post.featured);
  return featuredPost || (allBlogs.length > 0 ? allBlogs[0] : null);
}

// Function to get recent posts
export async function getRecentPosts(count: number): Promise<Blog[]> {
  return allBlogs.slice(0, count);
}

// Function to get related posts
export async function getRelatedPosts(
  currentSlug: string,
  count: number
): Promise<Blog[]> {
  const currentPost = await getPostBySlug(currentSlug);

  if (!currentPost) return [];

  return allBlogs
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => post.tags.some((tag) => currentPost.tags.includes(tag)))
    .slice(0, count);
}

// Function to get all unique tags
export async function getAllTags(): Promise<string[]> {
  const tags = new Set<string>();

  allBlogs.forEach((post) => {
    post.tags.forEach((tag) => {
      tags.add(tag);
    });
  });

  return Array.from(tags).sort();
}

// Function to get posts by tag
export async function getPostsByTag(tag: string): Promise<Blog[]> {
  // Make the comparison case-insensitive
  return allBlogs.filter((post) =>
    post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
  );
}
