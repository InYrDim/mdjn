// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// IMPORTANT: replace with your real production domain before deploying.
// Astro needs this to generate correct canonical URLs, Open Graph tags,
// and the sitemap.xml file that Google/Bing crawl.
const SITE_URL = 'https://mdjn.my.id';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],
});