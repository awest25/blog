// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
  // Public site URL — used for sitemap, RSS, canonical + OG absolute URLs.
  site: 'https://blog.alexanderwest.com',
  // DECISION: node standalone adapter (not pure static) so Keystatic's /keystatic
  // admin + /api/keystatic routes can render on-demand for phone editing. Blog
  // pages stay prerendered (Astro's default 'static' output); only Keystatic's
  // injected routes are server-rendered.
  adapter: node({ mode: 'standalone' }),
  integrations: [react(), markdoc(), sitemap(), keystatic()],
});
