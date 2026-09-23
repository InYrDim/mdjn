import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Posts live under src/content/blog/en/ and src/content/blog/id/ — the
// subfolder is just for your own organization; `lang` in the frontmatter
// below is what the site actually reads. A post does NOT need a matching
// translation in the other language — write in whichever language fits.
// If you ever add a same-filename post in both folders, the site
// automatically links them together as translations of each other.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
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

export const collections = { blog };
