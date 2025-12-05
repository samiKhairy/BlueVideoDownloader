'use client';

import type React from 'react';
import { useCallback, useMemo, useState } from 'react';

export type ExtractionResponse = {
  video_url: string;
  thumbnail_url?: string | null;
};

export type StatusVariant = 'success' | 'error' | 'warning' | 'info';

const statusClasses: Record<StatusVariant, string> = {
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

  const hasResults = useMemo(() => Boolean(videoUrl || thumbnailUrl), [videoUrl, thumbnailUrl]);

  const showStatus = useCallback((message: string, variant: StatusVariant = 'info') => {
    setStatus({ message, variant });
  }, []);

  const clearStatus = useCallback(() => setStatus(null), []);

  const copyToClipboard = useCallback(
    async (text: string, onSuccess: string, onFailure: string) => {
      try {
        await navigator.clipboard.writeText(text);
        showStatus(onSuccess, 'success');
      } catch (error) {
        console.error('Clipboard write failed', error);
        showStatus(onFailure, 'warning');
      }
    },
    [showStatus]
  );

  const pasteFromClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text.trim());
        showStatus('URL pasted from clipboard. Ready to fetch.', 'info');
      }
    } catch (error) {
      console.error('Clipboard read failed', error);
      showStatus('Clipboard access blocked. Paste manually.', 'warning');
    }
  }, [showStatus]);

  const requestExtraction = useCallback(
    async (event?: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault();
      clearStatus();
      setLoading(true);

      const normalizedUrl = url.trim();
      if (!normalizedUrl) {
        showStatus('Please enter a Bluesky post URL.', 'error');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/extract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: normalizedUrl })
        });

        const data: ExtractionResponse & { error?: string } = await response.json();
        if (!response.ok || data.error) {
          throw new Error(data.error || 'Unable to process this URL.');
        }

        if (!data.video_url) {
          throw new Error('No video URL found for this post.');
        }

        setVideoUrl(data.video_url);
        setThumbnailUrl(data.thumbnail_url || '');
        showStatus('Links generated successfully. Start your download or copy the URL.', 'success');
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unexpected error';
        showStatus(message, 'error');
        setVideoUrl('');
        setThumbnailUrl('');
      } finally {
        setLoading(false);
      }
    },
    [clearStatus, showStatus, url]
  );

  const startDownload = useCallback(
    (kind: 'video' | 'thumbnail') => {
      const mediaUrl = kind === 'thumbnail' ? thumbnailUrl : videoUrl;
      if (!mediaUrl) {
        const message =
          kind === 'thumbnail'
            ? 'No thumbnail available yet. Try generating links first.'
            : 'No video URL yet. Generate the download link first.';
        showStatus(message, 'warning');
        return;
      }

      const filename = kind === 'thumbnail' ? 'bluesky-thumbnail.jpg' : 'bluesky-video.mp4';
      const proxyUrl = `/api/download?url=${encodeURIComponent(mediaUrl)}&filename=${encodeURIComponent(filename)}`;
      window.location.href = proxyUrl;
      showStatus(`${kind === 'thumbnail' ? 'Thumbnail' : 'Video'} download started.`, 'success');
    },
    [showStatus, thumbnailUrl, videoUrl]
  );

  const handleCopy = useCallback(() => {
    if (!videoUrl) {
      showStatus('No video URL to copy yet. Generate links first.', 'warning');
      return;
    }
    void copyToClipboard(
      videoUrl,
      'Video link copied to clipboard.',
      'Could not copy link. Please copy manually.'
    );
  }, [copyToClipboard, showStatus, videoUrl]);

  return (
    <section className="grid gap-8 lg:grid-cols-5">
      <div className="glass shadow-2xl rounded-3xl p-7 lg:col-span-3 border border-sky-100 bg-white/80">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">Fast</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              Bluesky Video Downloader – Download Bluesky Videos &amp; GIFs (Free)
            </h1>
            <p className="text-base text-slate-600 mt-3">
              Paste a Bluesky post URL to grab the video or GIF as an MP4 file. Works on iPhone, Android, and desktop.
            </p>
          </div>
          <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-sm font-semibold">
            Instant
          </span>
        </div>

        <form className="mt-6 space-y-3" onSubmit={requestExtraction}>
          <label className="block text-sm font-semibold text-slate-800" htmlFor="urlInput">
            Bluesky Post URL
          </label>
          <div className="flex gap-3 flex-col sm:flex-row">
            <input
              id="urlInput"
              type="url"
              inputMode="url"
              placeholder="Paste Bluesky post URL here"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  void requestExtraction();
                }
              }}
            />
            <button
              type="button"
              onClick={() => void pasteFromClipboard()}
              className="sm:w-36 w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 font-semibold shadow-sm hover:border-sky-300 hover:text-sky-800 transition"
            >
              Paste
            </button>
          </div>
          <p className="text-xs text-slate-500">Example: https://bsky.app/profile/handle/post/abc123</p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl shadow-lg"
              disabled={loading}
            >
              <span>{loading ? 'Working...' : 'Download'}</span>
              {loading && (
                <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden>
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h3z"
                  />
                </svg>
              )}
            </button>
            <button
              type="button"
              className="sm:w-44 w-full inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-800 font-semibold py-3 rounded-xl shadow-sm hover:border-sky-300"
              onClick={handleCopy}
            >
              Copy video link
            </button>
          </div>

          <div className="mt-6 p-5 bg-white/90 border border-blue-200 rounded-2xl text-center shadow-md">
            <p className="text-sm text-gray-800 font-semibold">
              ⚡ Download slow? Your ISP might be throttling social media.
            </p>
            <a
              href="https://nordvpn.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-1 text-blue-700 font-bold hover:underline"
            >
              Boost download speed with NordVPN
              <span aria-hidden>&rarr;</span>
            </a>
          </div>

          {status && (
            <div className={`mt-4 p-4 rounded-xl border text-sm ${statusClasses[status.variant]}`}>
              {status.message}
            </div>
          )}
        </form>

        {hasResults && (
          <div className="mt-6 p-5 bg-white/90 border border-emerald-200 rounded-2xl shadow-md space-y-3">
            <div className="flex items-center justify-start gap-2">
              <span className="h-3 w-3 block rounded-full bg-emerald-500" aria-hidden />
              <p className="text-sm text-gray-800 font-semibold">Download ready</p>
            </div>
            <div className="flex gap-3 flex-col sm:flex-row">
              <button
                type="button"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl shadow-lg transition"
                onClick={() => startDownload('video')}
              >
                Download video
              </button>
              {thumbnailUrl && (
                <button
                  type="button"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl shadow-lg transition"
                  onClick={() => startDownload('thumbnail')}
                >
                  Download thumbnail
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <aside className="lg:col-span-2 space-y-4">
        <div className="p-6 bg-white/80 rounded-3xl border border-slate-100 shadow-xl">
          <p className="text-sm font-semibold text-sky-700 uppercase">Safe</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">Private and secure</h2>
          <p className="text-sm text-slate-600 mt-3">
            Processing runs server-side. We do not log your URLs and responses are served via HTTPS.
          </p>
        </div>

        <div className="p-6 bg-white/80 rounded-3xl border border-slate-100 shadow-xl">
          <p className="text-sm font-semibold text-sky-700 uppercase">Reliable</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">Direct MP4 links</h2>
          <p className="text-sm text-slate-600 mt-3">
            We resolve progressive MP4 streams first. If unavailable, we fall back to the best available format for quick downloads.
          </p>
        </div>
      </aside>
    </section>
  );
}
