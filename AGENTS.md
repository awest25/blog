# blog — Astro 6 + Markdoc + Keystatic

Static personal blog, self-hosted in the farallon homelab at `blog.alexanderwest.com`.

## Conventions
- **Astro 6** with the Content Layer API: collections live in `src/content.config.ts`,
  use the `glob()` loader, and render via the top-level `render()` (not
  `entry.render()`). Entry identifier is `entry.id` (not `slug`).
- **Posts** are Markdoc `.mdoc` files in `src/content/posts/`, authored by hand or
  via Keystatic at `/keystatic`. Frontmatter keys must match BOTH the zod schema in
  `src/content.config.ts` and the fields in `keystatic.config.ts`.
- **Node standalone adapter** so Keystatic's admin/API routes render on-demand;
  every other page is prerendered (Astro's default `static` output).
- **Storage:** Keystatic uses local filesystem in dev and GitHub mode in production
  (switched on `NODE_ENV`). GitHub mode needs the env vars in the README.
- **Code highlighting:** single Shiki theme via `markdoc.config.mjs`.

Read the installed Astro/Keystatic docs before changing config — these APIs move fast.
