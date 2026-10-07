# blog

Personal blog for `blog.alexanderwest.com` — Astro (static) + Markdoc content +
Keystatic (git-backed editor), hosted on Vercel. Reskinned to
match [alexanderwest.com](https://github.com/awest25/alexanderwest.com): monochrome
film-grain field, DM Sans / IBM Plex Mono, the AW signature mark, and the same
header/post anatomy.

## Stack
- **Astro 6** with the Content Layer API, Vercel adapter.
- **Markdoc** posts (`src/content/posts/*.mdoc`), rendered with `@astrojs/markdoc`.
- **Keystatic** for editing — local filesystem in dev, GitHub mode in production
  (so the deployed `/keystatic` admin commits to this repo, including from a phone).
- RSS (`/rss.xml`), sitemap, per-post Open Graph images (`astro-og-canvas`), and a
  light/dark theme toggle.

## Develop
```sh
npm install
npm run dev          # site at http://localhost:4321, editor at /keystatic
```
In dev, Keystatic writes posts straight to `src/content/posts/`.

## Build / preview
```sh
npm run build
npm run preview
```

## Content model
Each post is one `.mdoc` file with frontmatter: `title`, `publishedAt` (YYYY-MM-DD),
`summary`, `draft`. The body is Markdoc. Keep the frontmatter in sync with both
`src/content.config.ts` (zod schema) and `keystatic.config.ts` (Keystatic fields).

## Deployment
Hosted on Vercel, connected to this repo: every push to `main` (including the
commits Keystatic makes when you publish from `/keystatic`) builds and deploys,
and pull requests get preview URLs. Blog pages are prerendered static files;
only Keystatic's `/keystatic` + `/api/keystatic` routes run as a function.

`blog.alexanderwest.com` is a `CNAME` to Vercel at GoDaddy (Vercel shows the
exact target when you add the domain to the project).

### Keystatic GitHub mode (production editing)
Create a GitHub App for this repo (https://keystatic.com/docs/github-mode) with the
OAuth callback `https://blog.alexanderwest.com/api/keystatic/github/oauth/callback`,
then set these in the Vercel project (Settings > Environment Variables, Production):

```sh
KEYSTATIC_GITHUB_REPO=awest25/blog
KEYSTATIC_GITHUB_CLIENT_ID=...
KEYSTATIC_GITHUB_CLIENT_SECRET=...
KEYSTATIC_SECRET=...                       # 64-char random hex
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=...       # the GitHub App slug
```

Vercel sets `NODE_ENV=production` itself, which switches Keystatic to GitHub mode.
`PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` is inlined at build time, so redeploy after
changing it.

`/keystatic` is publicly reachable but write-gated by GitHub OAuth — only
collaborators on this repo can commit. The server never holds push credentials;
the admin commits to GitHub directly.
