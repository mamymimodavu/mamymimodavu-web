import { rewriteBaseKitLinks } from "@/lib/site-content";

type Props = {
  html: string;
  className?: string;
};

export default function BaseKitHtml({ html, className }: Props) {
  if (!html) return null;
  return (
    <div
      className={className}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: rewriteBaseKitLinks(html) }}
    />
  );
}
