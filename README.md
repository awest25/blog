# blog

Personal blog for `blog.alexanderwest.com` — Astro (static) + Markdoc content +
Keystatic (git-backed editor), self-hosted in the farallon homelab.

## Stack
- **Astro 6** with the Content Layer API, Node standalone adapter.
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
Built into a Node container (see `Dockerfile`) listening on `:3001`, deployed onto
the acquisition VM and proxied at `blog.alexanderwest.com` by Nginx Proxy Manager
(TLS via Let's Encrypt). Wiring lives in the `farallon-infra` repo.

### Keystatic GitHub mode (production editing)
Create a GitHub App for this repo (https://keystatic.com/docs/github-mode) with the
OAuth callback `https://blog.alexanderwest.com/api/keystatic/github/oauth/callback`,
then provide these to the container via `blog.env` (never commit it):

```sh
NODE_ENV=production
KEYSTATIC_GITHUB_REPO=<owner>/blog
KEYSTATIC_GITHUB_CLIENT_ID=...
KEYSTATIC_GITHUB_CLIENT_SECRET=...
KEYSTATIC_SECRET=...                       # 64-char random hex
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=...       # the GitHub App slug
```

`/keystatic` is publicly reachable but write-gated by GitHub OAuth — only
collaborators on this repo can commit. The server never holds push credentials;
the admin commits to GitHub directly.
