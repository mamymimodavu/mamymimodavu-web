import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BaseKitSitePage from "@/components/basekit/BaseKitSitePage";
import { getAllBlogListPageNumbers, getSitePage } from "@/lib/site-content";

type Props = {
  params: Promise<{ page: string }>;
};

export function generateStaticParams() {
  return getAllBlogListPageNumbers().map((page) => ({ page }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  const sitePage = getSitePage(`/blog/page/${page}`);
  if (!sitePage) return { title: "Blog" };
  return {
    title: sitePage.meta.title,
    description: sitePage.meta.description || undefined,
  };
}

export default async function BlogPaginatedPage({ params }: Props) {
  const { page } = await params;
  const path = `/blog/page/${page}`;
  if (!getSitePage(path)) notFound();
  return <BaseKitSitePage path={path} />;
}
