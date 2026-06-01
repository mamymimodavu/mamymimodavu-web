import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/posts";

type Props = {
  post: BlogPost;
  layout?: "grid" | "list";
};

export default function BlogCard({ post, layout = "list" }: Props) {
  const href = `/blog/${encodeURIComponent(post.slug)}`;

  return (
    <article className={`blog-card blog-card--${layout}`}>
      {post.image && (
        <Link href={href} className="blog-card-image-link">
          <Image
            src={post.image}
            alt=""
            width={960}
            height={540}
            className="blog-card-image"
          />
        </Link>
      )}
      <div className="blog-card-body">
        <h2 className="blog-card-title">
          <Link href={href}>{post.title}</Link>
        </h2>
        <p className="blog-card-excerpt">{post.description}</p>
        <Link href={href} className="blog-card-more">
          Čítajte viac
        </Link>
      </div>
    </article>
  );
}
