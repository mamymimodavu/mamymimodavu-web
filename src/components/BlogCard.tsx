import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/posts";

type Props = {
  post: BlogPost;
};

export default function BlogCard({ post }: Props) {
  return (
    <article className="blog-card">
      {post.image && (
        <Link href={`/blog/${encodeURIComponent(post.slug)}`} className="blog-card-image-link">
          <Image
            src={post.image}
            alt=""
            width={640}
            height={360}
            className="blog-card-image"
          />
        </Link>
      )}
      <div className="blog-card-body">
        <h2 className="blog-card-title">
          <Link href={`/blog/${encodeURIComponent(post.slug)}`}>{post.title}</Link>
        </h2>
        <p className="blog-card-excerpt">{post.description}</p>
        <Link href={`/blog/${encodeURIComponent(post.slug)}`} className="blog-card-more">
          Čítajte viac
        </Link>
      </div>
    </article>
  );
}
