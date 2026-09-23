// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// IMPORTANT: replace with your real production domain before deploying.
// Astro needs this to generate correct canonical URLs, Open Graph tags,
// and the sitemap.xml file that Google/Bing crawl.
const SITE_URL = 'https://yourdomain.com';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,

  // Code blocks render with two Shiki themes at build time; global.css swaps
  // them via CSS variables under [data-theme="dark"].
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },

  // English is the default locale and stays unprefixed at "/".
  // Indonesian lives under "/id/". See src/i18n/ for the translation dictionary.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          id: 'id-ID',
        },
      },
    }),
  ],
});