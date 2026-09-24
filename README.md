# Portfolio starter (Astro + Tailwind + Cloudflare Pages)

A minimal, fast portfolio built for SEO out of the box: every page is static
HTML at build time (nothing waits on client-side JS to render), with proper
meta tags, Open Graph/Twitter cards, JSON-LD structured data, and an
auto-generated sitemap.

## Quick start

```bash
npm install
npm run dev       # http://localhost:4321
```

```bash
npm run build      # outputs to ./dist
npm run preview    # preview the production build locally
```

## Before you deploy — 3 things to change

1. **Set your real domain.** Open `astro.config.mjs` and replace
   `SITE_URL`. This feeds every canonical URL, Open Graph tag, and the
   sitemap — it's the single most important SEO setting in this project.
2. **Update `public/robots.txt`** so the `Sitemap:` line points at your real
   domain too.
3. **Replace the placeholder content**: your name/role in
   `src/pages/index.astro`, your bio in `src/pages/about.astro`, your real
   projects in `src/data/projects.js`, and the social links in
   `src/components/SiteFooter.astro`.

## Project structure

```
src/
├── components/
│   ├── SEO.astro         # <head> tags: title, description, canonical, OG, Twitter
│   ├── SiteHeader.astro
│   ├── SiteFooter.astro
│   └── PresentationMode.astro  # slide-deck overlay for markdown pages
├── data/
│   └── projects.js       # your projects — edit this array, pages generate automatically
├── layouts/
│   └── Layout.astro       # shared HTML shell, wires up SEO.astro on every page
├── pages/
│   ├── index.astro        # hero + project index
│   ├── about.astro
│   └── projects/
│       └── [slug].astro   # one static page per project, built from data/projects.js
└── styles/
    └── global.css          # Tailwind v4 theme tokens — colors, fonts
public/
├── favicon.svg
└── robots.txt
```

## Blog

Posts are Markdown files using Astro Content Collections — no CMS needed.

```
src/content/
├── blog/
│   ├── en/*.md   # English posts
│   └── id/*.md   # Indonesian posts
src/content.config.ts  # frontmatter schema (title, description, lang, pubDate, tags, draft)
```

- **A post belongs to one language.** Unlike the static pages, blog posts
  are *not* required to exist in both `en` and `id` — write in whichever
  language fits that post. `/blog` only lists English posts, `/id/blog`
  only lists Indonesian ones.
- **To link two posts as translations of each other, give them the same
  filename** in `en/` and `id/` (e.g. `en/fokus-paper.md` +
  `id/fokus-paper.md`, as in the sample posts). The site detects the match
  and wires up the hreflang tag between them automatically — nothing else
  to configure. For a post that only exists in one language, the header's
  language toggle falls back to that language's blog index instead of a
  dead link.
- **Drafts**: set `draft: true` in frontmatter to keep a post out of
  listings, RSS, and the sitemap while you're still writing it.
- **RSS**: `/rss.xml` (English) and `/id/rss.xml` (Indonesian), linked from
  every page's `<head>` automatically.
- To add a post: drop a new `.md` file in the right locale folder with the
  required frontmatter fields — a page, sitemap entry, and RSS item are all
  generated automatically at build time.

## Presentation mode

Blog posts and artifact pages have a slide-deck overlay built from their
content at click time. Open the screen icon (bottom-right, under the share
button) or the page's content is turned into slides: title cover → each
`h2`/`h3` starts a slide → `hr` renders a divider → long lists are chunked.
Follows the site theme and works with mermaid diagrams and code blocks.

Controls (keyboard-first, per the html-ppt conventions):

- `←` `→` / Space / PgUp / PgDn / Home / End — navigate
- `F` — fullscreen; `Esc` — exit; swipe on touch devices
- `#/N` deep-link — open a deck directly at slide N (e.g. `/blog/fokus-paper#/2`)

To enable it on another page, render the reusable component with a selector
for that page's markdown container:

```astro
import PresentationMode from '../components/PresentationMode.astro';

<PresentationMode contentSelector="article .prose" title={someTitle} lang={lang} />
```

UI strings live under the `presentation.*` keys in `src/i18n/ui.ts`.

## Internationalization (i18n)

The site ships in English (default, unprefixed at `/`) and Indonesian
(`/id/`), using Astro's native i18n routing.

```
src/i18n/
├── ui.ts       # every UI string, keyed by locale — edit copy here
└── utils.ts    # useTranslations(lang), translatePath(path, lang)
```

- **Page content** (hero copy, nav labels, about bio, footer) comes from
  `t('some.key')` via `useTranslations(lang)`.
- **Project copy** (title stays shared; description/content/role/year are
  per-locale) lives directly in `src/data/projects.js` under `en`/`id` keys
  on each project object.
- **Routing**: each route has a thin file per locale — `src/pages/about.astro`
  (English) and `src/pages/id/about.astro` (Indonesian) — that both render
  the same shared component from `src/components/views/`, just with a
  different `lang` prop. Add a new page once in `views/`, then two ~3-line
  route files.
- **hreflang tags, `og:locale`, and the sitemap's language alternates** are
  generated automatically by `SEO.astro` and `@astrojs/sitemap` — nothing to
  maintain by hand as long as every page passes a `path` prop to `Layout`.

### Adding a third language

1. Add the locale code to `astro.config.mjs` (`i18n.locales` and the
   sitemap's `i18n.locales` map).
2. Add a matching block to `src/i18n/ui.ts`.
3. Add an `<code>` key to every project in `src/data/projects.js`.
4. Duplicate `src/pages/id/` as `src/pages/<code>/`, changing `lang="id"` to
   `lang="<code>"` in each file.

## How the SEO pieces fit together

- **Static output** — Astro renders every route to plain HTML at build time
  (`output: "static"`, the default). Crawlers see full content immediately,
  no JS execution required.
- **`SEO.astro`** — every page passes `title` + `description` to `Layout`,
  which renders the canonical URL, Open Graph, and Twitter Card tags for
  you. Pass an `image` prop (a 1200×630 image path in `/public`) once you
  have a real Open Graph image.
- **JSON-LD structured data** — the homepage embeds a `Person` schema;
  each project page embeds a `CreativeWork` schema. This is what lets
  Google build rich results / knowledge panels.
- **`@astrojs/sitemap`** — generates `sitemap-index.xml` automatically on
  every build, listing every page. Nothing to maintain by hand.
- **Adding a new project** — add an object to `src/data/projects.js`.
  Astro's `getStaticPaths()` in `projects/[slug].astro` turns it into a
  real, crawlable page automatically — no new file needed.

## Design tokens

Colors and fonts live in one place: the `@theme` block in
`src/styles/global.css`. Change `--color-accent` or the font stacks there
and it cascades through the whole site (Tailwind v4's CSS-first config —
there's no separate `tailwind.config.js` in this project).

## Deploying to Cloudflare Pages

1. Push this project to a GitHub/GitLab repo.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect
   to Git**, pick the repo.
3. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy. Every push to your main branch redeploys automatically.

(Netlify and Vercel work the same way — same build command and output
directory — if you'd rather use one of those instead.)

## After launch

- Submit your sitemap (`https://yourdomain.com/sitemap-index.xml`) in
  [Google Search Console](https://search.google.com/search-console) and
  Bing Webmaster Tools.
- Run [PageSpeed Insights](https://pagespeed.web.dev) against your live URL
  to check Core Web Vitals — this starter should score well by default
  since it ships almost no JavaScript.
