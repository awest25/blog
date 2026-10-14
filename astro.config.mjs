// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Public site URL — used for sitemap, RSS, canonical + OG absolute URLs.
  site: 'https://blog.alexanderwest.com',
  // Fully static (Astro's default output). GitHub Pages serves the built files;
  // posts are Markdown edited in Pages CMS (.pages.yml) or by hand, and every
  // commit to main republishes via .github/workflows/deploy.yml.
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      // DECISION: chose a single Shiki theme (github-dark) over dual light/dark themes because dark code blocks read well on both site themes without extra CSS-variable wiring.
      theme: 'github-dark',
      wrap: true,
    },
  },
});
