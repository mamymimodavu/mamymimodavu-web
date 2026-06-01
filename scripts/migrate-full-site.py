#!/usr/bin/env python3
"""Migrate full BaseKit site — all sitemap URLs, products, blog, chrome."""

from __future__ import annotations

import json
import os
import re
import html as html_lib
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from typing import Any

BASE = "https://mamymimodavu.sk"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "src", "data", "site")

ROW_RE = re.compile(
    r'<div class="row row--style-(\w+)\s+row--height-(\w+).*?data-rowtype="([^"]*)"',
    re.S,
)

SITEMAPS = [
    f"{BASE}/sitemap_pages.xml",
    f"{BASE}/sitemap_blog.xml",
    f"{BASE}/sitemap_store.xml",
]

EXTRA_STATIC_PATHS = [
    "/store/cart",
    "/blog/page/2",
    "/terms-and-conditions1",
    "/blog/tags/domškoláci",
]

REDIRECTS = [
    {
        "source": "/Ihriská",
        "destination": "https://mapa.mamymimodavu.sk",
        "permanent": False,
    },
    {
        "source": "/Ihriska",
        "destination": "https://mapa.mamymimodavu.sk",
        "permanent": False,
    },
]


def fetch(path: str) -> str:
    if path.startswith("http"):
        url = path
    else:
        url = urllib.parse.urljoin(BASE + "/", path.lstrip("/"))
    parsed = urllib.parse.urlparse(url)
    encoded_path = "/" + "/".join(
        urllib.parse.quote(segment, safe="") for segment in parsed.path.split("/") if segment
    )
    url = urllib.parse.urlunparse((parsed.scheme, parsed.netloc, encoded_path, "", "", ""))
    req = urllib.request.Request(url, headers={"User-Agent": "MMMD-FullMigration/2.0"})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return resp.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as err:
        raise RuntimeError(f"HTTP {err.code} for {url}") from err


def sitemap_paths(url: str) -> list[str]:
    xml = fetch(url)
    root = ET.fromstring(xml)
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    paths: list[str] = []
    for loc in root.findall("s:url/s:loc", ns):
        if loc is not None and loc.text:
            paths.append(urllib.parse.urlparse(loc.text).path)
    return paths


def discover_all_paths() -> dict[str, list[str]]:
    """Return categorized paths: static, blog_posts, products, blog_tags, blog_pages."""
    all_paths: set[str] = set()
    for sm in SITEMAPS:
        all_paths.update(sitemap_paths(sm))
    all_paths.update(EXTRA_STATIC_PATHS)

    blog_html = fetch("/blog")
    all_paths.update(urllib.parse.unquote(p) for p in re.findall(r'href="(/blog/page/\d+)"', blog_html))
    all_paths.update(urllib.parse.unquote(p) for p in re.findall(r'href="(/blog/tags/[^"]+)"', blog_html))

    static: set[str] = set()
    blog_posts: set[str] = set()
    products: set[str] = set()
    blog_tags: set[str] = set()
    blog_pages: set[str] = set()

    for path in sorted(all_paths):
        if path == "/":
            static.add(path)
        elif path == "/blog" or path.startswith("/blog/page/"):
            blog_pages.add(path)
        elif path.startswith("/blog/tags/"):
            blog_tags.add(path)
        elif path.startswith("/blog/"):
            blog_posts.add(path)
        elif path.startswith("/store/product/"):
            products.add(path)
        elif path.startswith("/store"):
            static.add(path)
        else:
            static.add(path)

    return {
        "static": sorted(static),
        "blog_posts": sorted(blog_posts),
        "products": sorted(products),
        "blog_tags": sorted(blog_tags),
        "blog_pages": sorted(blog_pages),
    }


def normalize_url(url: str) -> str:
    if url.startswith("//"):
        return "https:" + url
    if url.startswith("/"):
        return BASE + url
    return url


def extract_main_zone(page: str) -> str:
    m = re.search(r'id="page-zones__main"(.*?)id="page-zones__footer"', page, re.S)
    if m:
        return m.group(1)
    m = re.search(r'id="page-zones__main"(.*)', page, re.S)
    return m.group(1) if m else page


def split_rows(main_html: str) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    for match in ROW_RE.finditer(main_html):
        style, height, rowtype = match.groups()
        start = match.start()
        next_row = ROW_RE.search(main_html, match.end())
        end = next_row.start() if next_row else len(main_html)
        chunk = main_html[start:end]
        rows.append(
            {
                "style": style,
                "height": height,
                "rowType": rowtype or "default",
                "html": clean_chunk_html(chunk),
            }
        )
    return rows


def clean_chunk_html(chunk: str) -> str:
    chunk = re.sub(r"<script[^>]*>.*?</script>", "", chunk, flags=re.S | re.I)
    chunk = re.sub(r'\sdata-uniqueid="[^"]*"', "", chunk)
    chunk = re.sub(r'\sdata-parentuniqueid="[^"]*"', "", chunk)
    chunk = re.sub(r'\sdata-name="[^"]*"', "", chunk)
    chunk = re.sub(r'\sdata-uniqueHTMLId="[^"]*"', "", chunk)
    chunk = re.sub(r'\sdata-ref="[^"]*"', "", chunk)
    chunk = re.sub(r'\sdata-rowtype="[^"]*"', "", chunk)
    chunk = re.sub(r'\sclass="widget widget--zone-widget js-widget[^"]*"', "", chunk)
    chunk = re.sub(r"//files\.", "https://files.", chunk)
    chunk = re.sub(r'src="//', 'src="https://', chunk)
    chunk = re.sub(r"href='//", "href='https://", chunk)
    chunk = re.sub(r'href="//', 'href="https://', chunk)
    chunk = re.sub(r"url\(//", "url(https://", chunk)
    chunk = re.sub(r"http:https://", "https://", chunk)
    return chunk.strip()


def extract_meta(page: str) -> dict[str, str]:
    title = re.search(r"<title>([^<]+)</title>", page)
    desc = re.search(r'<meta name="description" content="([^"]*)"', page)
    return {
        "title": html_lib.unescape(title.group(1).strip()) if title else "",
        "description": html_lib.unescape(desc.group(1).strip()) if desc else "",
    }


def extract_chrome(page: str) -> dict[str, str]:
    header_match = re.search(
        r'(<section\s+id="page-zones__header".*?)<section\s+id="page-zones__main"',
        page,
        re.S,
    )
    footer_match = re.search(
        r'(<section\s+id="page-zones__footer".*?</section>)',
        page,
        re.S,
    )
    header_html = clean_chunk_html(header_match.group(1) + "</section>") if header_match else ""
    footer_html = clean_chunk_html(footer_match.group(1)) if footer_match else ""
    return {"headerHtml": header_html, "footerHtml": footer_html}


def extract_head_assets(page: str) -> dict[str, Any]:
    favicon = re.search(r'<link rel="(?:shortcut )?icon"[^>]*href="([^"]+)"', page, re.I)
    stylesheet = re.search(r'class="js-initial-stylesheet"[^>]*href="([^"]+)"', page)
    return {
        "favicon": normalize_url(favicon.group(1)) if favicon else None,
        "stylesheet": normalize_url(stylesheet.group(1)) if stylesheet else None,
        "scripts": [
            "https://55b558c7-resources.vlastnawebstranka.websupport.sk/0df2651/sk/translations.js?sections=widgets,mobile,shared_views,shared_components",
            "https://55b558c7-resources.vlastnawebstranka.websupport.sk/25b750331a/compiled/published-v10-site-libs.js",
            "https://55b558c7-resources.vlastnawebstranka.websupport.sk/25b750331a/compiled/published-v8-site.js",
            "https://55b558c7-resources.vlastnawebstranka.websupport.sk/25b750331a/compiled/twig-widget-views-v2.js",
            "https://55b558c7-resources.vlastnawebstranka.websupport.sk/25b750331a/compiled/scroll-out.js",
        ],
    }


def page_from_path(path: str) -> dict[str, Any]:
    html_page = fetch(path)
    return {"meta": extract_meta(html_page), "rows": split_rows(extract_main_zone(html_page))}


def extract_blog_posts(paths: list[str]) -> list[dict[str, Any]]:
    posts: list[dict[str, Any]] = []
    for path in paths:
        slug = urllib.parse.unquote(path.rsplit("/", 1)[-1])
        article = fetch(path)
        meta = extract_meta(article)
        rows = split_rows(extract_main_zone(article))
        og = re.search(r'<meta property="og:image" content="([^"]*)"', article)
        date = re.search(r'<time[^>]*datetime="([^"]+)"', article)
        posts.append(
            {
                "slug": slug,
                "path": path,
                "title": meta["title"],
                "description": meta["description"],
                "image": normalize_url(og.group(1)) if og else None,
                "publishedAt": date.group(1) if date else None,
                "rows": rows,
            }
        )
        print("blog", slug, len(rows), "rows")
    return posts


def extract_products(paths: list[str]) -> list[dict[str, Any]]:
    products: list[dict[str, Any]] = []
    for path in paths:
        slug = urllib.parse.unquote(path.rsplit("/", 1)[-1])
        try:
            page = fetch(path)
        except RuntimeError as err:
            print("skip product", slug, err)
            continue
        meta = extract_meta(page)
        og = re.search(r'<meta property="og:image" content="([^"]*)"', page)
        price = re.search(r'itemprop="price"[^>]*content="([^"]+)"', page)
        currency = re.search(r'itemprop="priceCurrency"[^>]*content="([^"]+)"', page)
        rows = split_rows(extract_main_zone(page))
        products.append(
            {
                "slug": slug,
                "path": path,
                "title": meta["title"],
                "description": meta["description"],
                "image": normalize_url(og.group(1)) if og else None,
                "price": price.group(1) if price else None,
                "currency": currency.group(1) if currency else "EUR",
                "rows": rows,
            }
        )
        print("product", slug, len(rows), "rows")
    return products


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    discovered = discover_all_paths()
    home = fetch("/")
    chrome = extract_chrome(home)
    head = extract_head_assets(home)

    pages: dict[str, Any] = {}
    for path in discovered["static"] + discovered["blog_pages"] + discovered["blog_tags"]:
        try:
            pages[path] = page_from_path(path)
            print("page", path, len(pages[path]["rows"]), "rows")
        except RuntimeError as err:
            print("skip page", path, err)

    posts = extract_blog_posts(discovered["blog_posts"])
    products = extract_products(discovered["products"])

    manifest = {
        "staticPaths": discovered["static"],
        "blogPages": discovered["blog_pages"],
        "blogTags": discovered["blog_tags"],
        "blogPosts": [p["path"] for p in posts],
        "products": [p["path"] for p in products],
    }

    with open(os.path.join(OUT, "chrome.json"), "w", encoding="utf-8") as f:
        json.dump(chrome, f, ensure_ascii=False, indent=2)
    with open(os.path.join(OUT, "head.json"), "w", encoding="utf-8") as f:
        json.dump(head, f, ensure_ascii=False, indent=2)
    with open(os.path.join(OUT, "redirects.json"), "w", encoding="utf-8") as f:
        json.dump(REDIRECTS, f, ensure_ascii=False, indent=2)
    with open(os.path.join(OUT, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    with open(os.path.join(OUT, "pages.json"), "w", encoding="utf-8") as f:
        json.dump(pages, f, ensure_ascii=False, indent=2)
    with open(os.path.join(OUT, "blog-posts.json"), "w", encoding="utf-8") as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)
    with open(os.path.join(OUT, "products.json"), "w", encoding="utf-8") as f:
        json.dump(products, f, ensure_ascii=False, indent=2)

    print(
        f"Done: {len(pages)} pages, {len(posts)} posts, {len(products)} products, "
        f"{len(discovered['blog_tags'])} tags"
    )


if __name__ == "__main__":
    main()
