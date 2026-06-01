import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Články o férovom rodičovstve, spánku, učení a každodennom živote s deťmi.",
};

export default function BlogPage() {
  return (
    <section className="home-blog">
      <div className="home-blog-inner">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} post={post} layout="list" />
        ))}
      </div>
    </section>
  );
}
