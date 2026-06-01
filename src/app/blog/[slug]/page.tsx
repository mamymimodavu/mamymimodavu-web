import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BaseKitPage from "@/components/basekit/BaseKitPage";
import { getAllSiteBlogSlugs, getSiteBlogPost } from "@/lib/site-content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSiteBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getSiteBlogPost(decodeURIComponent(slug));
  if (!post) return { title: "Článok nenájdený" };
  return {
    title: post.title,
    description: post.description,
    openGraph: post.image ? { images: [{ url: post.image }] } : undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getSiteBlogPost(decodeURIComponent(slug));
  if (!post || post.rows.length === 0) notFound();
  return <BaseKitPage rows={post.rows} />;
}
