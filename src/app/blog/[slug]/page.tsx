import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Prose from "@/components/Prose";
import { getAllBlogSlugs, getBlogPost } from "@/lib/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(decodeURIComponent(slug));
  if (!post) return { title: "Článok nenájdený" };

  return {
    title: post.title,
    description: post.description,
    openGraph: post.image ? { images: [{ url: post.image }] } : undefined,
  };
}

function renderParagraphs(body: string) {
  return body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => <p key={index}>{block}</p>);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(decodeURIComponent(slug));
  if (!post) notFound();

  return (
    <div className="page page--narrow">
      <Link href="/blog" className="btn btn-secondary" style={{ marginBottom: "1rem" }}>
        ← Späť na blog
      </Link>
      <article className="page-card">
        {post.image && (
          <Image
            src={post.image}
            alt=""
            width={960}
            height={540}
            className="blog-card-image"
            style={{ borderRadius: "var(--radius-md)", marginBottom: "1rem" }}
          />
        )}
        <h1>{post.title}</h1>
        {post.description && <p className="lead">{post.description}</p>}
        <Prose>{renderParagraphs(post.body)}</Prose>
      </article>
    </div>
  );
}
