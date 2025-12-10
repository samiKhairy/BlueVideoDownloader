import { NextResponse } from 'next/server';

import { BLOG_POSTS } from '../blog/posts';

export const dynamic = 'force-dynamic';

type SitemapEntry = {
  path: string;
  priority: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
};

const STATIC_ENTRIES: SitemapEntry[] = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/about', priority: '0.5', changefreq: 'monthly' },
  { path: '/blog', priority: '0.6', changefreq: 'weekly' }
];

const BLOG_ENTRIES: SitemapEntry[] = BLOG_POSTS.map((post) => ({
  path: `/blog/${post.slug}`,
  priority: '0.4',
  changefreq: 'monthly'
}));

export async function GET(request: Request): Promise<NextResponse> {
  const today = new Date().toISOString().split('T')[0];
  const baseUrl = process.env.SITE_URL || new URL(request.url).origin;

  const urlEntries = [...STATIC_ENTRIES, ...BLOG_ENTRIES]
    .map((entry) => {
      const loc = `${baseUrl}${entry.path}`;
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <changefreq>${entry.changefreq}</changefreq>`,
        `    <priority>${entry.priority}</priority>`,
        '  </url>'
      ].join('\n');
    })
    .join('\n');

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlEntries,
    '</urlset>'
  ].join('\n');

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}
