// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
  // Public site URL — used for sitemap, RSS, canonical + OG absolute URLs.
  site: 'https://blog.alexanderwest.com',
  // Blog pages stay prerendered (Astro's default 'static' output); only
  // Keystatic's injected /keystatic + /api/keystatic routes render on demand,
  // which is what makes phone editing work.
  // DECISION: chose Vercel over self-hosting on the home server because the server is now private (Tailscale-only), and Vercel redeploys on every Keystatic commit with no cron.
  adapter: vercel(),
  integrations: [react(), markdoc(), sitemap(), keystatic()],
});
