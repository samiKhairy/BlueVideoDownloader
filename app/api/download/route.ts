import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { ClientError } from '@/lib/errors';

const paramsSchema = z.object({
  url: z.string().url(),
  filename: z.string().optional()
});

function sanitizeFilename(name: string | undefined): string {
  const fallback = 'media';
  if (!name) return fallback;
  return name.replace(/[^a-zA-Z0-9._-]/g, '') || fallback;
}

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = paramsSchema.safeParse({
      url: searchParams.get('url'),
      filename: searchParams.get('filename') || undefined
    });

    if (!parsed.success) {
      throw new ClientError('A valid url query parameter is required.');
    }

    const upstream = await fetch(parsed.data.url, { cache: 'no-store' });
    if (!upstream.ok || !upstream.body) {
      throw new ClientError('Unable to fetch media right now.', upstream.status || 502);
    }

    const filename = sanitizeFilename(parsed.data.filename);
    const headers = new Headers();
    headers.set('Content-Type', upstream.headers.get('content-type') || 'application/octet-stream');
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);

    return new Response(upstream.body, {
      status: 200,
      headers
    });
  } catch (error) {
    if (error instanceof ClientError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    console.error('Download proxy error', error);
    return NextResponse.json({ error: 'Download proxy failed.' }, { status: 500 });
  }
}
