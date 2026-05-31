import Link from "next/link";
import { INSTAGRAM_URL, MAP_URL, SITE_NAME } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p className="site-footer-copy">© {new Date().getFullYear()} {SITE_NAME}</p>
        <div className="site-footer-links">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <Link href="/blog">Blog</Link>
          <a href={MAP_URL} target="_blank" rel="noreferrer">
            Mapa ihrísk
          </a>
        </div>
      </div>
    </footer>
  );
}
