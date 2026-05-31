import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Články o férovom rodičovstve, spánku, učení a každodennom živote s deťmi.",
};

export default function BlogPage() {
  return (
    <div className="page">
      <div className="page-card" style={{ marginBottom: "1.25rem" }}>
        <h1>Blog</h1>
        <p className="lead">Príbehy, tipy a postrehy z cesty rodičovstva mimo davu.</p>
      </div>
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
