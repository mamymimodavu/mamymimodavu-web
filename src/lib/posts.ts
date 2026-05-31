import postsData from "@/data/blog-posts.json";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  image: string | null;
  body: string;
};

export const blogPosts = postsData as BlogPost[];

export function getBlogPost(slug: string): BlogPost | undefined {
  const decoded = decodeURIComponent(slug);
  return blogPosts.find((post) => post.slug === slug || post.slug === decoded);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}
