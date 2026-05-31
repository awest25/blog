import { config, fields, collection } from '@keystatic/core';

// DECISION: switch storage by NODE_ENV. Local (filesystem) for `npm run dev` so
// edits write straight to src/content/posts; GitHub mode in production so the
// deployed /keystatic admin commits to the repo via the GitHub App (phone edits).
// Repo owner/name is overridable via env; falls back to the assumed slug.
const repo = (process.env.KEYSTATIC_GITHUB_REPO ?? 'awest25/blog') as `${string}/${string}`;

export default config({
  storage:
    process.env.NODE_ENV === 'production'
      ? { kind: 'github', repo }
      : { kind: 'local' },
  ui: {
    brand: { name: 'Alex West' },
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      // One .mdoc file per post: src/content/posts/<slug>.mdoc with frontmatter.
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishedAt: fields.date({
          label: 'Published date',
          defaultValue: { kind: 'today' },
        }),
        summary: fields.text({
          label: 'Summary',
          description: 'Shown on the index, in the RSS feed, and on social cards.',
          multiline: true,
        }),
        draft: fields.checkbox({
          label: 'Draft',
          description: 'Hide from the site, feed, and sitemap until unchecked.',
          defaultValue: false,
        }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
});
