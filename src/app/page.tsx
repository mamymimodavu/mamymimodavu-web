import BlogCard from "@/components/BlogCard";
import HomeSections from "@/components/HomeSections";
import { homeSections } from "@/lib/homepage";
import { blogPosts } from "@/lib/posts";

export default function HomePage() {
  return (
    <>
      <HomeSections sections={homeSections} />

      <section className="home-blog">
        <div className="home-blog-inner">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} layout="list" />
          ))}
        </div>
      </section>
    </>
  );
}
