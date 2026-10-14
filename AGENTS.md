# blog — Astro 6 + Markdown, on GitHub Pages

Static personal blog at `blog.alexanderwest.com`, deployed to GitHub Pages by
`.github/workflows/deploy.yml`. No server, no adapter.

## Conventions
- **Astro 6** with the Content Layer API: collections live in `src/content.config.ts`,
  use the `glob()` loader, and render via the top-level `render()` (not
  `entry.render()`). Entry identifier is `entry.id` (not `slug`).
- **Posts** are Markdown `.md` files in `src/content/posts/`, written by hand or in
  Pages CMS (`.pages.yml`). Frontmatter keys must match BOTH the zod schema in
  `src/content.config.ts` and the fields in `.pages.yml`.
- **Dates** are calendar days (YYYY-MM-DD) parsed as midnight UTC, so format them
  in UTC (see `FormattedDate.astro`).
- **Code highlighting:** a single Shiki theme via `markdown.shikiConfig` in
  `astro.config.mjs`.
- Astro caches collection data in `node_modules/.astro`. If a deleted post still
  shows up in a local build, remove that folder (CI always builds fresh).

Read the installed Astro docs before changing config — these APIs move fast.
