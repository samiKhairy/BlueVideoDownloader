import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const INDEXABLE_PATHS = ['/', '/about'];

export async function GET(request: Request): Promise<NextResponse> {
  const today = new Date().toISOString().split('T')[0];
  const baseUrl = process.env.SITE_URL || new URL(request.url).origin;

  const urlEntries = INDEXABLE_PATHS.map((path) => {
    const loc = `${baseUrl}${path}`;
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      '  </url>'
    ].join('\n');
  }).join('\n');

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
