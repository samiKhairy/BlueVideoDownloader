import { NextResponse } from 'next/server';

import { BLOG_POSTS } from '../blog/posts';

export const dynamic = 'force-dynamic';

const STATIC_PATHS = ['/', '/about', '/blog', '/pt', '/es'];

const BLOG_PATHS = BLOG_POSTS.map((post) => `/blog/${post.slug}`);

// Pages with language alternates
const HREFLANG_PAGES = [
  { path: '/', langs: { en: '/', pt: '/pt', es: '/es' } },
  { path: '/pt', langs: { en: '/', pt: '/pt', es: '/es' } },
  { path: '/es', langs: { en: '/', pt: '/pt', es: '/es' } }
];

export async function GET(request: Request): Promise<NextResponse> {
  const today = new Date().toISOString().split('T')[0];
  const baseUrl = process.env.SITE_URL || new URL(request.url).origin;

  const hreflangMap = new Map(HREFLANG_PAGES.map((p) => [p.path, p.langs]));

  const urlEntries = [...STATIC_PATHS, ...BLOG_PATHS]
    .map((path) => {
      const loc = `${baseUrl}${path}`;
      const langs = hreflangMap.get(path);
      const langLinks = langs
        ? Object.entries(langs)
            .map(
              ([lang, langPath]) =>
                `    <xhtml:link rel="alternate" hreflang="${lang}" href="${baseUrl}${langPath}" />`
            )
            .join('\n')
        : '';

      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        langLinks,
        '  </url>'
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urlEntries,
    '</urlset>'
  ].join('\n');

  return new NextResponse(sitemap, {
    status: 200,
    headers: { 'Content-Type': 'application/xml' }
  });
}
