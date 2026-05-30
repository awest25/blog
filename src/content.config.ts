import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Posts are Markdoc (.mdoc) files authored by hand or via Keystatic. The glob
// loader + @astrojs/markdoc give us render() + <Content /> for each entry.
// Frontmatter keys here MUST match the fields written by keystatic.config.ts.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    // Keystatic's date field writes YYYY-MM-DD; coerce to a Date for sorting.
    publishedAt: z.coerce.date(),
    summary: z.string().default(''),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
