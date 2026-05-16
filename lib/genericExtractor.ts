import { z } from 'zod';
import { ClientError, ExtractionError } from './errors';
import { ensureBinaryReady, binaryPath } from './ytDlpClient';
import { execFile } from 'node:child_process';

/* ─── Platform definitions ──────────────────────────────────────── */

export type Platform = 'bluesky' | 'twitter' | 'tiktok' | 'unknown';

interface PlatformConfig {
  name: string;
  label: string;
  urlPattern: RegExp;
  formatArgs: string[];
}

const PLATFORM_CONFIGS: Record<Exclude<Platform, 'unknown'>, PlatformConfig> = {
  bluesky: {
    name: 'bluesky',
    label: 'Bluesky',
    urlPattern: /https?:\/\/(?:www\.)?(?:bsky\.app|staging\.bsky\.app)\/profile\/.+/i,
    formatArgs: [
      '--format',
      'bestvideo[ext=mp4][vcodec^=avc]+bestaudio[ext=m4a]/best[ext=mp4]/bv*+ba/bestvideo+bestaudio/best'
    ]
  },
  twitter: {
    name: 'twitter',
    label: 'Twitter/X',
    urlPattern: /https?:\/\/(?:www\.)?(?:twitter\.com|x\.com|fxtwitter\.com|vxtwitter\.com|t\.co)\/.+/i,
    formatArgs: [
      '--format',
      'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best'
    ]
  },
  tiktok: {
    name: 'tiktok',
    label: 'TikTok',
    urlPattern: /https?:\/\/(?:www\.)?(?:tiktok\.com|vm\.tiktok\.com|vt\.tiktok\.com)\/.+/i,
    formatArgs: [
      '--format',
      'best[ext=mp4]/bestvideo[ext=mp4]+bestaudio[ext=m4a]/best'
    ]
  }
};

/* ─── URL detection ─────────────────────────────────────────────── */

export function detectPlatform(url: string): Platform {
  const trimmed = url.trim();
  for (const [platform, config] of Object.entries(PLATFORM_CONFIGS)) {
    if (config.urlPattern.test(trimmed)) {
      return platform as Platform;
    }
  }
  return 'unknown';
}

export function getPlatformLabel(platform: Platform): string {
  if (platform === 'unknown') return 'Unknown';
  return PLATFORM_CONFIGS[platform].label;
}

export function getSupportedPlatformNames(): string[] {
  return Object.values(PLATFORM_CONFIGS).map((c) => c.label);
}

/* ─── Extraction ────────────────────────────────────────────────── */

const extractionSchema = z.object({
  formats: z.array(z.record(z.any())).optional(),
  url: z.string().url().optional(),
  thumbnail: z.string().url().optional(),
  title: z.string().optional()
});

export type ExtractionResult = {
  videoUrl: string;
  thumbnailUrl?: string;
  title?: string;
  platform: Platform;
};

function selectDirectVideo(
  info: z.infer<typeof extractionSchema>,
  platform: Platform
): string | undefined {
  const formats = info.formats ?? [];

  // For TikTok, prefer the direct URL if formats are sparse
  if (platform === 'tiktok' && formats.length === 0 && info.url) {
    return info.url;
  }

  const isProgressive = (fmt: Record<string, unknown>): boolean => {
    const ext = typeof fmt.ext === 'string' ? fmt.ext : '';
    const vcodec = typeof fmt.vcodec === 'string' ? fmt.vcodec : '';
    const acodec = typeof fmt.acodec === 'string' ? fmt.acodec : '';
    const protocol = typeof fmt.protocol === 'string' ? fmt.protocol : '';
    return (
      ext === 'mp4' &&
      vcodec !== 'none' &&
      acodec !== 'none' &&
      !protocol.toLowerCase().includes('m3u8')
    );
  };

  // Try progressive MP4 first (video + audio in one stream)
  const bestProgressive = formats
    .filter(isProgressive)
    .sort((a, b) => (Number(b.height) || 0) - (Number(a.height) || 0))[0];
  if (bestProgressive && typeof bestProgressive.url === 'string') {
    return bestProgressive.url;
  }

  // Fallback: any MP4
  const mp4Formats = formats
    .filter((fmt) => fmt.ext === 'mp4')
    .sort((a, b) => (Number(b.height) || 0) - (Number(a.height) || 0))[0];
  if (mp4Formats && typeof (mp4Formats as Record<string, unknown>).url === 'string') {
    return (mp4Formats as Record<string, string>).url;
  }

  return info.url;
}

export async function extractVideo(url: string): Promise<ExtractionResult> {
  const normalized = url.trim();
  if (!normalized) {
    throw new ClientError('Please provide a video URL.');
  }

  const platform = detectPlatform(normalized);
  if (platform === 'unknown') {
    throw new ClientError(
      'Unsupported URL. We currently support Bluesky, Twitter/X, and TikTok links.'
    );
  }

  const config = PLATFORM_CONFIGS[platform];
  await ensureBinaryReady();

  const args = [
    '--no-warnings',
    '--quiet',
    '--skip-download',
    '--dump-single-json',
    '--flat-playlist',
    '--no-playlist',
    ...config.formatArgs,
    normalized
  ];

  const rawOutput = await new Promise<string>((resolve, reject) => {
    execFile(
      binaryPath,
      args,
      { maxBuffer: 1024 * 1024 * 10, encoding: 'utf8', timeout: 30000 },
      (error, stdout) => {
        if (error) {
          reject(
            new ExtractionError(
              `Failed to extract from ${config.label}: ${error.message}`
            )
          );
          return;
        }
        resolve(stdout);
      }
    );
  });

  const parsed = extractionSchema.safeParse(JSON.parse(rawOutput));
  if (!parsed.success) {
    throw new ExtractionError(`Failed to parse response for ${config.label} video.`);
  }

  const videoUrl = selectDirectVideo(parsed.data, platform);
  if (!videoUrl) {
    throw new ExtractionError('No downloadable video stream found.');
  }

  return {
    videoUrl,
    thumbnailUrl: parsed.data.thumbnail,
    title: parsed.data.title,
    platform
  };
}

/* ─── Backward compatibility wrapper ────────────────────────────── */

export async function extractBluesky(
  url: string
): Promise<{ videoUrl: string; thumbnailUrl?: string }> {
  const result = await extractVideo(url);
  return { videoUrl: result.videoUrl, thumbnailUrl: result.thumbnailUrl };
}
