import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';
import { SITE } from '../../consts';

// One social card per post, plus a site-level "home" card. Served at
// /open-graph/<key>.png and referenced from each page's og:image meta.
const posts = await getCollection('posts');

const pages: Record<string, { title: string; description: string }> = {
  home: { title: SITE.title, description: SITE.description },
  ...Object.fromEntries(
    posts.map((post) => [
      post.id,
      { title: post.data.title, description: post.data.summary },
    ]),
  ),
};

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',
  pages,
  // Monochrome card: light background, dark text, a thick rule on the leading edge.
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    bgGradient: [
      [255, 255, 255],
      [244, 244, 245],
    ],
    border: { color: [23, 23, 23], width: 14, side: 'inline-start' },
    padding: 64,
    font: {
      title: { color: [23, 23, 23], weight: 'SemiBold' },
      description: { color: [82, 82, 91] },
    },
  }),
});
