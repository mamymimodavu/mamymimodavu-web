import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BaseKitSitePage from "@/components/basekit/BaseKitSitePage";
import { getAllBlogTagSlugs, getSitePage } from "@/lib/site-content";

type Props = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  return getAllBlogTagSlugs().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const page = getSitePage(`/blog/tags/${decodeURIComponent(tag)}`);
  if (!page) return { title: "Blog" };
  return {
    title: page.meta.title,
    description: page.meta.description || undefined,
  };
}

export default async function BlogTagPage({ params }: Props) {
  const { tag } = await params;
  const path = `/blog/tags/${decodeURIComponent(tag)}`;
  if (!getSitePage(path)) notFound();
  return <BaseKitSitePage path={path} />;
}
