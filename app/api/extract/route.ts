import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { extractVideo } from '@/lib/genericExtractor';
import { ClientError, ExtractionError } from '@/lib/errors';

const requestSchema = z.object({
  url: z.string()
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      throw new ClientError('Please provide a video URL.');
    }

    const result = await extractVideo(parsed.data.url);
    return NextResponse.json({
      video_url: result.videoUrl,
      thumbnail_url: result.thumbnailUrl,
      title: result.title,
      platform: result.platform
    });
  } catch (error) {
    if (error instanceof ClientError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    if (error instanceof ExtractionError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.error('Unhandled extraction error', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: `Internal Error: ${errorMessage}` }, { status: 500 });
  }
}
