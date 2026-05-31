#!/usr/bin/env python3
"""Stiahne blog a produkty z mamymimodavu.sk do src/data/."""

import json
import re
import html as h
import os
import urllib.request
from urllib.parse import unquote

BASE = "https://mamymimodavu.sk"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "src", "data")


def fetch(path: str) -> str:
    url = BASE + path if path.startswith("/") else path
    req = urllib.request.Request(url, headers={"User-Agent": "MMMD-Migration/1.0"})
    with urllib.request.urlopen(req, timeout=20) as response:
        return response.read().decode("utf-8", errors="replace")


def strip_html(text: str) -> str:
    text = re.sub(r"<br\s*/?>", "\n", text, flags=re.I)
    text = re.sub(r"</p>", "\n\n", text, flags=re.I)
    text = re.sub(r"</h[1-6]>", "\n\n", text, flags=re.I)
    text = re.sub(r"<li[^>]*>", "\n- ", text, flags=re.I)
    text = re.sub(r"<[^>]+>", "", text)
    text = h.unescape(text)
    return re.sub(r"\n{3,}", "\n\n", text).strip()


def extract_meta(page: str) -> dict:
    title = re.search(r"<title>([^<]+)</title>", page)
    desc = re.search(r'<meta name="description" content="([^"]*)"', page)
    og = re.search(r'<meta property="og:image" content="([^"]*)"', page)
    return {
        "title": h.unescape(title.group(1).strip()) if title else "",
        "description": h.unescape(desc.group(1).strip()) if desc else "",
        "image": og.group(1).replace("http://", "https://") if og else None,
    }


def extract_body(page: str) -> str:
    match = re.search(r'itemprop="articleBody"[^>]*>(.*?)</div>', page, re.S | re.I)
    return strip_html(match.group(1)) if match else ""


def collect_blog_urls() -> list[str]:
    urls = set()
    for page_num in (1, 2):
        suffix = "" if page_num == 1 else f"/page/{page_num}"
        page = fetch(f"/blog{suffix}")
        for href in re.findall(r'href="(/blog/[^"]+)"', page):
            if "/page/" in href:
                continue
            urls.add(href)
    return sorted(urls)


def migrate_posts() -> None:
    posts = []
    for href in collect_blog_urls():
        page = fetch(href)
        meta = extract_meta(page)
        posts.append(
            {
                "slug": unquote(href.rsplit("/", 1)[-1]),
                "title": meta["title"],
                "description": meta["description"],
                "image": meta["image"],
                "body": extract_body(page),
            }
        )
    os.makedirs(DATA, exist_ok=True)
    with open(os.path.join(DATA, "blog-posts.json"), "w", encoding="utf-8") as handle:
        json.dump(posts, handle, ensure_ascii=False, indent=2)
    print(f"Saved {len(posts)} blog posts")


def migrate_products() -> None:
    products = []
    for href in [
        "/store/product/f%C3%A9rov%C3%A9-rodi%C4%8Dovstvo",
        "/store/product/na-k%C3%A1vi%C4%8Dku-s-belkou",
    ]:
        page = fetch(href)
        meta = extract_meta(page)
        body = re.search(r'itemprop="description"[^>]*content="([^"]*)"', page)
        products.append(
            {
                "slug": href.rsplit("/", 1)[-1],
                "title": meta["title"],
                "description": meta["description"],
                "image": meta["image"],
                "body": h.unescape(body.group(1)) if body else "",
            }
        )
    with open(os.path.join(DATA, "products.json"), "w", encoding="utf-8") as handle:
        json.dump(products, handle, ensure_ascii=False, indent=2)
    print(f"Saved {len(products)} products")


if __name__ == "__main__":
    migrate_posts()
    migrate_products()
