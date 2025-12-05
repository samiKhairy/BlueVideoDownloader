import { NextResponse } from 'next/server';

const ROBOTS_TXT = `User-agent: *
Allow: /

Sitemap: https://bluevideosaver.com/sitemap.xml`;

export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse> {
  return new NextResponse(ROBOTS_TXT, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
