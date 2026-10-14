# blog

Personal blog for `blog.alexanderwest.com`: a static Astro site with Markdown
posts, hosted on GitHub Pages. Reskinned to match
[alexanderwest.com](https://github.com/awest25/alexanderwest.com): monochrome
film-grain field, DM Sans / IBM Plex Mono, the AW signature mark, and the same
header/post anatomy.

## Stack
- **Astro 6** with the Content Layer API, fully static output.
- **Markdown** posts (`src/content/posts/*.md`), code highlighted by Shiki.
- **Pages CMS** for editing in the browser, phone included (`.pages.yml`).
- RSS (`/rss.xml`), sitemap, per-post Open Graph images (`astro-og-canvas`), and a
  light/dark theme toggle.

## Writing a post
- **In the browser:** open [app.pagescms.org](https://app.pagescms.org), sign in
  with GitHub, and pick this repo. Saving commits the post to `main`, which
  publishes it within a couple of minutes.
- **By hand:** add `src/content/posts/<slug>.md` (the file name is the URL) and push:

```md
---
title: My post
publishedAt: 2026-10-13
summary: One or two sentences.
draft: false
---

The post, in Markdown.
```

`draft: true` keeps a post off the site. The frontmatter keys must match both
`src/content.config.ts` (the schema) and `.pages.yml` (the editor's fields).

## Develop
```sh
npm install
npm run dev          # http://localhost:4321
npm run build        # static site in dist/
```

## Deployment
GitHub Pages. `.github/workflows/deploy.yml` builds on every push and PR, and
deploys `dist/` from `main`. The custom domain is set in the repo's Pages
settings, and `blog` is a `CNAME` to `awest25.github.io` at GoDaddy.
