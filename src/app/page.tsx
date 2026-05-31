import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/lib/posts";
import { MAP_URL, SITE_TAGLINE } from "@/lib/site";

export default function HomePage() {
  const featured = blogPosts.slice(0, 3);

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-card">
          <h1>mamy mimo davu</h1>
          <p>{SITE_TAGLINE}</p>
          <div className="hero-actions">
            <Link href="/blog" className="btn">
              Prečítaj si blog
            </Link>
            <a href={MAP_URL} className="btn btn-secondary" target="_blank" rel="noreferrer">
              Mapa ihrísk
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="latest-posts">
        <div className="section-head">
          <h2 id="latest-posts">Najnovšie z blogu</h2>
          <Link href="/blog">Všetky články</Link>
        </div>
        <div className="blog-grid">
          {featured.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
