import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Posts are Markdown (.md) files in src/content/posts, written in Pages CMS or
// by hand. The file name (minus .md) is the post's URL slug.
// Frontmatter keys here MUST match the fields in .pages.yml.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    // Written as YYYY-MM-DD; coerced to a Date for sorting.
    publishedAt: z.coerce.date(),
    summary: z.string().default(''),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
