// Site-wide constants used across layouts, meta tags, RSS, and OG images.
export const SITE = {
  title: 'Alex West',
  description: 'Writing on homelab, infrastructure, and building things.',
  author: 'Alex West',
  url: 'https://blog.alexanderwest.com',
} as const;

// Top nav. Keep it sparse (mufeed-style). Add entries as sections appear.
export const NAV: { label: string; href: string }[] = [
  { label: 'writing', href: '/' },
  { label: 'rss', href: '/rss.xml' },
];
