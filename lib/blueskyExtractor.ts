import { z } from 'zod';
import { ClientError, ExtractionError } from './errors';
import { getYtDlp } from './ytDlpClient';

const BLSKY_URL_RE = /https?:\/\/(?:www\.)?(?:bsky\.app|staging\.bsky\.app)\/profile\/.+/i;

const extractionSchema = z.object({
  formats: z.array(z.record(z.any())).optional(),
  url: z.string().url().optional(),
  thumbnail: z.string().url().optional()
});

export type ExtractionResult = {
  videoUrl: string;
  thumbnailUrl?: string;
};

function selectDirectVideo(info: z.infer<typeof extractionSchema>): string | undefined {
  const formats = info.formats ?? [];

  const isProgressive = (fmt: Record<string, unknown>): boolean => {
    const ext = typeof fmt.ext === 'string' ? fmt.ext : '';
    const vcodec = typeof fmt.vcodec === 'string' ? fmt.vcodec : '';
    const acodec = typeof fmt.acodec === 'string' ? fmt.acodec : '';
    const protocol = typeof fmt.protocol === 'string' ? fmt.protocol : '';
    return (
      ext === 'mp4' && vcodec !== 'none' && acodec !== 'none' && !protocol.toLowerCase().includes('m3u8')
    );
  };

  const bestProgressive = formats.filter(isProgressive).sort((a, b) => (Number(b.height) || 0) - (Number(a.height) || 0))[0];
  if (bestProgressive && typeof bestProgressive.url === 'string') {
    return bestProgressive.url;
  }

  const mp4Formats = formats.filter((fmt) => fmt.ext === 'mp4').sort((a, b) => (Number(b.height) || 0) - (Number(a.height) || 0))[0];
  if (mp4Formats && typeof (mp4Formats as Record<string, unknown>).url === 'string') {
    return (mp4Formats as Record<string, string>).url;
  }

  return info.url;
}

export async function extractBluesky(url: string): Promise<ExtractionResult> {
  const normalized = url.trim();
  if (!normalized) {
    throw new ClientError('Please provide a Bluesky post URL.');
  }
  if (!BLSKY_URL_RE.test(normalized)) {
    throw new ClientError('Only Bluesky post URLs are supported.');
  }

  const ytdlp = await getYtDlp();
  const args = [
    '--no-warnings',
    '--quiet',
    '--skip-download',
    '--dump-single-json',
    '--flat-playlist',
    '--no-playlist',
    '--format',
    'bestvideo[ext=mp4][vcodec^=avc]+bestaudio[ext=m4a]/best[ext=mp4]/bv*+ba/bestvideo+bestaudio/best',
    normalized
  ];

  const rawOutput = await ytdlp.execPromise(args, {
    // Attempt to disable Python detection in yt-dlp-wrap
    env: { ...process.env, YTDLP_NO_PYTHON: '1' },
  });
  const parsed = extractionSchema.safeParse(JSON.parse(rawOutput));
  if (!parsed.success) {
    throw new ExtractionError('Failed to parse response from yt-dlp.');
  }

  const videoUrl = selectDirectVideo(parsed.data);
  if (!videoUrl) {
    throw new ExtractionError('No downloadable video stream found.');
  }

  const thumbnailUrl = parsed.data.thumbnail;
  return { videoUrl, thumbnailUrl };
}
