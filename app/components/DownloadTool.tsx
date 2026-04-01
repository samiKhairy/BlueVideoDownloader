'use client';

import type React from 'react';
import { useCallback, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

export type ExtractionResponse = {
  video_url: string;
  thumbnail_url?: string | null;
};

type DownloadFormat = 'video' | 'gif' | 'thumbnail';

type StatusVariant = 'success' | 'error' | 'warning' | 'info';

const variantStyles: Record<StatusVariant, string> = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  error: 'bg-rose-50 border-rose-200 text-rose-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
  info: 'bg-sky-50 border-sky-200 text-sky-800'
};

export function DownloadTool(): React.ReactElement {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<{ message: string; variant: StatusVariant } | null>(null);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<DownloadFormat>('video');

  const showStatus = useCallback((message: string, variant: StatusVariant = 'info') => {
    setStatus({ message, variant });
  }, []);

  const pasteFromClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setUrl(text.trim());
    } catch {
      showStatus('Clipboard access blocked. Paste manually.', 'warning');
    }
  }, [showStatus]);

  const requestExtraction = useCallback(
    async (event?: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault();
      setStatus(null);
      setLoading(true);
      setVideoUrl('');
      setThumbnailUrl('');
      trackEvent('download_start', { event_category: 'engagement', event_label: 'bluesky_video' });

      const trimmed = url.trim();
      if (!trimmed) {
        showStatus('Paste a Bluesky post URL first.', 'error');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/extract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: trimmed })
        });
        const data: ExtractionResponse & { error?: string } = await res.json();

        if (!res.ok || data.error) throw new Error(data.error || 'Unable to process this URL.');
        if (!data.video_url) throw new Error('No video found in this post.');

        setVideoUrl(data.video_url);
        setThumbnailUrl(data.thumbnail_url || '');
        showStatus('Ready to download.', 'success');
        trackEvent('download_success', { event_category: 'engagement', event_label: 'bluesky_video' });
      } catch (error) {
        const msg = error instanceof Error ? error.message : 'Unexpected error';
        showStatus(msg, 'error');
        trackEvent('download_error', { event_category: 'engagement', event_label: 'bluesky_video' });
      } finally {
        setLoading(false);
      }
    },
    [url, showStatus]
  );

  const startDownload = useCallback(() => {
    if (!videoUrl) {
      showStatus('Extract the video first.', 'warning');
      return;
    }

    if (selectedFormat === 'thumbnail') {
      if (!thumbnailUrl) {
        showStatus('No thumbnail available for this post.', 'warning');
        return;
      }
      window.location.href = `/api/download?url=${encodeURIComponent(thumbnailUrl)}&filename=bluesky-thumbnail.jpg`;
      return;
    }

    // Both 'video' and 'gif' download the MP4 — Bluesky GIFs are already MP4
    const filename = selectedFormat === 'gif' ? 'bluesky-gif.mp4' : 'bluesky-video.mp4';
    window.location.href = `/api/download?url=${encodeURIComponent(videoUrl)}&filename=${encodeURIComponent(filename)}`;
    showStatus('Download started.', 'success');
  }, [videoUrl, thumbnailUrl, selectedFormat, showStatus]);

  const copyVideoUrl = useCallback(async () => {
    if (!videoUrl) {
      showStatus('Extract the video first.', 'warning');
      return;
    }
    try {
      await navigator.clipboard.writeText(videoUrl);
      showStatus('Video URL copied.', 'success');
    } catch {
      showStatus('Could not copy. Try again.', 'warning');
    }
  }, [videoUrl, showStatus]);

  const hasResults = Boolean(videoUrl);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5">
      {/* Input area */}
      <form onSubmit={requestExtraction} className="space-y-3">
        <div className="flex gap-2">
          <input
            id="urlInput"
            type="url"
            inputMode="url"
            placeholder="https://bsky.app/profile/handle/post/abc123"
            className="flex-1 px-4 py-3 min-h-[48px] rounded-xl border border-slate-200 bg-white shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition text-sm"
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
            className="px-4 min-h-[48px] rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:border-sky-300 hover:bg-sky-50 transition shrink-0"
          >
            Paste
          </button>
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-semibold py-3 min-h-[48px] rounded-xl shadow-sm transition text-sm"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h3z" />
              </svg>
              Extracting...
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Bluesky Video or GIF
            </>
          )}
        </button>
      </form>

      {/* Status message */}
      {status && (
        <div className={`px-4 py-3 rounded-xl border text-sm ${variantStyles[status.variant]}`}>
          {status.message}
        </div>
      )}

      {/* Results area */}
      {hasResults && (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {/* Preview */}
          {thumbnailUrl && (
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

          <div className="p-4 space-y-4">
            {/* Format selector */}
            <div>
              <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Format</p>
              <div className="flex gap-2">
                {([
                  { key: 'video' as const, label: 'Video (MP4)', icon: '▶' },
                  { key: 'gif' as const, label: 'GIF loop', icon: '◎' },
                  ...(thumbnailUrl ? [{ key: 'thumbnail' as const, label: 'Thumbnail', icon: '◻' }] : [])
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
                  Bluesky serves GIF-style posts as short MP4 loops. The download preserves full quality.
                </p>
              )}
            </div>

            {/* Download actions */}
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
          </div>
        </div>
      )}
    </div>
  );
}
