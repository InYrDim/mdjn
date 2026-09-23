---
title: "What building BlobMania's scraper taught me about messy data"
description: "Notes on building a comic reader with no public API to pull from, and the data-quality tradeoffs that came with scraping instead."
lang: "en"
pubDate: 2026-08-18
tags: ["Next.js", "Web scraping", "Devlog"]
---

When I started building BlobMania, the plan was simple: a fast, full-stack comic reader in Next.js. The part I underestimated was where the data would actually come from.

There's no public API for comic listings — at least not one I could find that was reliable and free. So the catalog needed its own pipeline. I split that out into a separate project, a scraper that pulls listings and chapter data from bato.to and feeds it into BlobMania's catalog.

## The part nobody tells you about scraping

Writing the scraper itself was the easy part — fetch a page, parse the HTML, extract what you need. The harder part was accepting that the data would never be perfectly clean, because it wasn't mine to begin with.

Source listings come from user uploads, which means:

- The same title can show up more than once under slightly different names
- Tags and categories aren't always consistent between entries
- Metadata occasionally goes stale between a scrape and a page load

None of that is a bug in the scraper. It's just what happens when you build on top of data you don't control.

## What I'd do differently

If I rebuilt this today, I'd add a normalization pass before anything hits the database — fuzzy-matching titles to catch near-duplicates, instead of trusting the source to be internally consistent. Something roughly like:

```ts
function normalizeTitle(raw: string) {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}
```

It's a small function, but it would have saved a handful of duplicate entries that are still sitting in the catalog today.

The bigger lesson wasn't really about scraping — it was about designing for data you can't fully trust, which turns out to be most data, most of the time.
