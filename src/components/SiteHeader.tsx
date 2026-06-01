"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import { MAIN_NAV, SITE_NAME } from "@/lib/site";
import { applyTheme, readTheme, type Theme } from "@/lib/theme";

export default function SiteHeader() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>("light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-header-brand" aria-label={`${SITE_NAME} — domov`}>
          <BrandLogo />
          <span className="site-header-name">{SITE_NAME}</span>
        </Link>

        <button
          type="button"
          className="site-nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          Menu
        </button>

        <nav
          id="site-nav"
          className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
          aria-label="Hlavná navigácia"
        >
          {MAIN_NAV.map((item) => {
            const active =
              !item.external &&
              (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href));
            const className = `site-nav-link ${active ? "site-nav-link--active" : ""}`;

            if (item.external) {
              return (
                <a key={item.href} href={item.href} className={className} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              );
            }

            return (
              <Link key={item.href} href={item.href} className={className}>
                {item.label}
              </Link>
            );
          })}

          <Link href="/store/cart" className="site-nav-link site-nav-link--cart">
            Košík
          </Link>

          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Prepnúť na svetlý režim" : "Prepnúť na tmavý režim"}
            title={theme === "dark" ? "Svetlý režim" : "Tmavý režim"}
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" aria-hidden className="theme-toggle-icon">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden className="theme-toggle-icon theme-toggle-icon--moon">
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
