import { notFound } from "next/navigation";
import BaseKitPage from "@/components/basekit/BaseKitPage";
import { getSitePage } from "@/lib/site-content";

type Props = {
  path: string;
};

export default function BaseKitSitePage({ path }: Props) {
  const page = getSitePage(path);
  if (!page) notFound();
  return <BaseKitPage rows={page.rows} />;
}
