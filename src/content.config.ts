import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Posts live under src/content/blog/en/ and src/content/blog/id/ — the
// subfolder is just for your own organization; `lang` in the frontmatter
// below is what the site actually reads. A post does NOT need a matching
// translation in the other language — write in whichever language fits.
// If you ever add a same-filename post in both folders, the site
// automatically links them together as translations of each other.
const blog = defineCollection({
  // README.md files inside the folder are documentation, not entries.
  loader: glob({ pattern: ['**/*.md', '!**/README.md'], base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(['en', 'id']),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // Set true to keep a post out of listings, RSS, and the sitemap while you draft it.
    draft: z.boolean().default(false),
  }),
});

// Downloadable resources (ISOs, documents, cheatsheets, tools...). Same
// en/id subfolder convention as blog: write once in whichever language fits,
// and matching filenames across folders are linked as translations.
//
// `url` points at either a file committed under /public/artifacts/ (small
// files) or an external mirror (large files like ISOs — never commit those).
const artifacts = defineCollection({
  // README.md is the format guide for this collection, not an entry.
  loader: glob({ pattern: ['**/*.md', '!**/README.md'], base: './src/content/artifacts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(['en', 'id']),
    // Broad category shown as a badge and used to group the listing page.
    type: z.enum(['iso', 'document', 'cheatsheet', 'tool', 'other']),
    tags: z.array(z.string()).default([]),
    // Human-readable size shown in listings, e.g. "4.7 GB" or "1.2 MB".
    size: z.string().optional(),
    // Either an absolute external URL (mirrors, releases), a site-relative
    // path to a file committed under public/artifacts/ ("/artifacts/foo.pdf"),
    // or omitted entirely for read-only cheatsheets rendered on the page.
    url: z
      .string()
      .refine(
        (u) => /^https?:\/\//.test(u) || u.startsWith('/'),
        'url must be an http(s) URL or a site-relative path starting with "/"',
      )
      .optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // Set true to keep an artifact out of listings and the sitemap.
    draft: z.boolean().default(false),
  }),
});

export const collections = { artifacts, blog };
