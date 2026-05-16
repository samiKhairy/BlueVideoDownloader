/* eslint-disable @next/next/no-img-element */
'use client';

import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';
import { toast } from 'sonner';

export type ExtractionResponse = {
  video_url: string;
  images?: string[];
  thumbnail_url?: string;
  title?: string;
  platform?: string;
};

type DownloadFormat = 'video' | 'gif' | 'thumbnail' | 'image';



/* ─── Platform configuration ────────────────────────────────────── */

type PlatformKey = 'universal' | 'bluesky' | 'twitter' | 'tiktok';

interface PlatformUi {
  placeholder: string;
  buttonLabel: string;
  downloadPrefix: string;
  accentColor: string;
  accentHover: string;
  accentActive: string;
}

const PLATFORM_UI: Record<PlatformKey, PlatformUi> = {
  universal: {
    placeholder: 'Paste a video link from Bluesky, Twitter/X, or TikTok…',
    buttonLabel: 'Download Video',
    downloadPrefix: 'video',
    accentColor: 'bg-sky-600',
    accentHover: 'hover:bg-sky-700',
    accentActive: 'active:bg-sky-800'
  },
  bluesky: {
    placeholder: 'https://bsky.app/profile/handle/post/abc123',
    buttonLabel: 'Download Bluesky Video or GIF',
    downloadPrefix: 'bluesky',
    accentColor: 'bg-sky-600',
    accentHover: 'hover:bg-sky-700',
    accentActive: 'active:bg-sky-800'
  },
  twitter: {
    placeholder: 'https://x.com/user/status/123456789…',
    buttonLabel: 'Download Twitter/X Video',
    downloadPrefix: 'twitter',
    accentColor: 'bg-slate-900',
    accentHover: 'hover:bg-slate-800',
    accentActive: 'active:bg-slate-700'
  },
  tiktok: {
    placeholder: 'https://www.tiktok.com/@user/video/123456789…',
    buttonLabel: 'Download TikTok Video',
    downloadPrefix: 'tiktok',
    accentColor: 'bg-rose-600',
    accentHover: 'hover:bg-rose-700',
    accentActive: 'active:bg-rose-800'
  }
};

/* ─── Component ─────────────────────────────────────────────────── */

export function DownloadTool({
  platform = 'universal'
}: {
  platform?: PlatformKey;
}): React.ReactElement {
  const ui = PLATFORM_UI[platform];
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [detectedPlatform, setDetectedPlatform] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<DownloadFormat>('video');

  const pasteFromClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setUrl(text.trim());
    } catch {
      toast.warning('Clipboard access blocked. Paste manually.');
    }
  }, []);

  const requestExtraction = useCallback(
    async (event?: React.FormEvent<HTMLFormElement>, initialUrl?: string) => {
      event?.preventDefault();
      
      const trimmed = (initialUrl ?? url).trim();
      if (!trimmed) {
        toast.error('Paste a video URL first.');
        return;
      }

      const toastId = toast.loading('Extracting video...');
      setLoading(true);
      setVideoUrl('');
      setImages([]);
      setThumbnailUrl('');
      setDetectedPlatform('');
      trackEvent('download_start', { event_category: 'engagement', event_label: platform });

      try {
        const res = await fetch('/api/extract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: trimmed })
        });
        const data: ExtractionResponse & { error?: string } = await res.json();

        if (!res.ok || data.error) throw new Error(data.error || 'Unable to process this URL.');
        if (!data.video_url && (!data.images || data.images.length === 0)) throw new Error('No media found at this URL.');

        setVideoUrl(data.video_url || '');
        setImages(data.images || []);
        setThumbnailUrl(data.thumbnail_url || '');
        setDetectedPlatform(data.platform || '');
        if (!data.video_url && data.images?.length) {
          setSelectedFormat('image');
        } else {
          setSelectedFormat('video');
        }
        toast.success('Ready to download.', { id: toastId });
        trackEvent('download_success', {
          event_category: 'engagement',
          event_label: data.platform || platform
        });
      } catch (error) {
        const msg = error instanceof Error ? error.message : 'Unexpected error';
        toast.error(msg, { id: toastId });
        trackEvent('download_error', { event_category: 'engagement', event_label: platform });
      } finally {
        setLoading(false);
      }
    },
    [url, platform]
  );

  const searchParams = useSearchParams();
  const autoExtractionTriggeredRef = useRef(false);

  useEffect(() => {
    const paramUrl = searchParams?.get('url')?.trim();

    if (!autoExtractionTriggeredRef.current && paramUrl) {
      autoExtractionTriggeredRef.current = true;
      setUrl(paramUrl);
      void requestExtraction(undefined, paramUrl);
    }
  }, [searchParams, requestExtraction]);

  const filePrefix = detectedPlatform || ui.downloadPrefix;

  const startDownload = useCallback(() => {
    if (!videoUrl) {
      toast.warning('Extract the video first.');
      return;
    }

    if (selectedFormat === 'thumbnail') {
      if (!thumbnailUrl) {
        toast.warning('No thumbnail available for this post.');
        return;
      }
      window.location.href = `/api/download?url=${encodeURIComponent(thumbnailUrl)}&filename=${filePrefix}-thumbnail.jpg`;
      return;
    }

    // Both 'video' and 'gif' download the MP4
    const filename =
      selectedFormat === 'gif' ? `${filePrefix}-gif.mp4` : `${filePrefix}-video.mp4`;
    window.location.href = `/api/download?url=${encodeURIComponent(videoUrl)}&filename=${encodeURIComponent(filename)}`;
    toast.success('Download started.');
  }, [videoUrl, thumbnailUrl, selectedFormat, filePrefix]);

  const copyVideoUrl = useCallback(async () => {
    if (!videoUrl) {
      toast.warning('Extract the video first.');
      return;
    }
    try {
      await navigator.clipboard.writeText(videoUrl);
      toast.success('Video URL copied.');
    } catch {
      toast.error('Could not copy. Try again.');
    }
  }, [videoUrl]);

  const hasResults = Boolean(videoUrl) || images.length > 0;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5">
      {/* Input area */}
      <form onSubmit={requestExtraction} className="space-y-3">
        <div className="flex gap-2">
          <input
            id="urlInput"
            type="url"
            inputMode="url"
            placeholder={ui.placeholder}
            className={`flex-1 px-4 py-4 min-h-[48px] rounded-xl border-0 ring-1 ring-slate-200 shadow-lg shadow-slate-200/60 focus:ring-2 focus:ring-sky-500 focus:shadow-sky-100/60 outline-none transition-all duration-200 text-sm dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-800 dark:shadow-none dark:focus:ring-sky-500 ${loading ? 'ring-2 ring-sky-400 shadow-sky-200 animate-pulse' : ''}`}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                void requestExtraction();
              }
            }}
          />
          <button
            type="button"
            onClick={() => void pasteFromClipboard()}
            className="px-4 min-h-[48px] rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:border-sky-300 hover:bg-sky-50 transition shrink-0 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Paste
          </button>
        </div>

        <button
          type="submit"
          className={`w-full inline-flex items-center justify-center gap-2 bg-gradient-to-b from-sky-500 to-sky-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/25 transition-all duration-150 text-white font-semibold py-3 min-h-[48px] rounded-xl text-sm group`}
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h3z" />
              </svg>
              Extracting…
            </>
          ) : (
            <>
              <svg className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {ui.buttonLabel}
            </>
          )}
        </button>
      </form>

      {/* Platform badge (universal mode) */}
      {platform === 'universal' && detectedPlatform && (
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-slate-600 font-medium capitalize">
            {detectedPlatform === 'twitter' ? 'Twitter/X' : detectedPlatform}
          </span>
          <span>video detected</span>
        </div>
      )}

      {/* Skeleton loading state */}
      {loading && !hasResults && (
        <div className="p-4 rounded-xl border border-slate-100 bg-white animate-pulse flex gap-4 mt-6 dark:bg-slate-900 dark:border-slate-800">
          <div className="w-24 h-24 bg-slate-200 rounded-lg dark:bg-slate-800"></div>
          <div className="flex-1 space-y-3 py-2">
            <div className="h-4 bg-slate-200 rounded w-3/4 dark:bg-slate-800"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2 dark:bg-slate-800"></div>
          </div>
        </div>
      )}

      {/* Results area */}
      {hasResults && !loading && (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden dark:bg-slate-900 dark:border-slate-800">
          {/* Preview for video/gif/thumbnail */}
          {thumbnailUrl && selectedFormat !== 'image' && (
            <div className="relative bg-slate-900">
              <img
                src={thumbnailUrl}
                alt="Video preview"
                className="w-full h-auto max-h-64 object-contain mx-auto"
                loading="lazy"
              />
              <div className="absolute bottom-2 left-2 flex gap-1.5">
                <span className="px-2 py-0.5 bg-black/70 text-white text-xs rounded-md font-medium">
                  MP4
                </span>
              </div>
            </div>
          )}

          {/* Preview for images */}
          {selectedFormat === 'image' && images.length > 0 && (
            <div className="bg-slate-100 p-4 dark:bg-slate-950">
              <div className={`grid gap-2 ${images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {images.slice(0, 4).map((img, idx) => (
                  <div key={idx} className="relative group rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-white">
                    <img src={img} alt={`Image ${idx + 1}`} className="w-full h-48 object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <a
                        href={`/api/download?url=${encodeURIComponent(img)}&filename=${filePrefix}-img${idx+1}.jpg`}
                        className="bg-white text-slate-900 px-4 py-2 rounded-lg font-medium text-sm shadow-lg hover:bg-sky-50 transition"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 space-y-4">
            {/* Format selector */}
            <div>
              <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Format</p>
              <div className="flex gap-2">
                {([
                  ...(videoUrl ? [{ key: 'video' as const, label: 'Video (MP4)', icon: '▶' }] : []),
                  ...(videoUrl ? [{ key: 'gif' as const, label: 'GIF loop', icon: '◎' }] : []),
                  ...(images.length > 0 ? [{ key: 'image' as const, label: `Images (${images.length})`, icon: '🖼' }] : []),
                  ...(thumbnailUrl && videoUrl ? [{ key: 'thumbnail' as const, label: 'Thumbnail', icon: '◻' }] : [])
                ]).map(({ key, label, icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedFormat(key)}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition border ${
                      selectedFormat === key
                        ? 'bg-sky-50 border-sky-300 text-sky-800'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span className="mr-1.5">{icon}</span>
                    {label}
                  </button>
                ))}
              </div>
              {selectedFormat === 'gif' && (
                <p className="text-xs text-slate-500 mt-2">
                  GIF-style posts are saved as short MP4 loops. The download preserves full quality.
                </p>
              )}
            </div>

            {/* Download actions for non-image formats */}
            {selectedFormat !== 'image' && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={startDownload}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition text-sm"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download {selectedFormat === 'thumbnail' ? 'thumbnail' : selectedFormat === 'gif' ? 'GIF' : 'video'}
                </button>
                <button
                  type="button"
                  onClick={() => void copyVideoUrl()}
                  className="px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:border-sky-300 transition"
                  title="Copy direct link"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
