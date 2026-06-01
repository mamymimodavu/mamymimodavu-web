import BaseKitHtml from "@/components/basekit/BaseKitHtml";
import type { SiteRow } from "@/lib/site-content";

type Props = {
  rows: SiteRow[];
};

export default function BaseKitPage({ rows }: Props) {
  return (
    <section id="page-zones__main" className="bk-zone column">
      {rows.map((row, index) => (
        <BaseKitHtml key={`${row.rowType}-${index}`} html={row.html} />
      ))}
    </section>
  );
}
