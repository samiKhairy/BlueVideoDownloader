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

  // Trimmer state
  const [showTrimmer, setShowTrimmer] = useState(false);
  const [trimStart, setTrimStart] = useState<number>(0);
  const [trimEnd, setTrimEnd] = useState<number>(0);
  const [trimmerLoading, setTrimmerLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const handleExportClip = useCallback(async (exportFormat: 'mp4' | 'gif' = 'mp4') => {
    if (!videoUrl) return;
    setTrimmerLoading(true);
    const toastId = toast.loading(exportFormat === 'gif' ? 'Converting to GIF...' : 'Trimming your clip...');
    try {
      const { FFmpeg } = await import('@ffmpeg/ffmpeg');
      const { fetchFile } = await import('@ffmpeg/util');

      const ffmpeg = new FFmpeg();
      await ffmpeg.load({
        coreURL: '/ffmpeg/ffmpeg-core.js',
        wasmURL: '/ffmpeg/ffmpeg-core.wasm'
      });

      const videoData = await fetchFile(videoUrl);
      await ffmpeg.writeFile('input.mp4', videoData);

      const outputName = exportFormat === 'gif' ? 'output.gif' : 'output.mp4';
      const ffmpegArgs = ['-i', 'input.mp4', '-ss', trimStart.toString(), '-to', trimEnd.toString()];
      
      if (exportFormat === 'gif') {
        ffmpegArgs.push('-vf', 'fps=10,scale=480:-1', '-f', 'gif');
      } else {
        ffmpegArgs.push('-c', 'copy');
      }
      ffmpegArgs.push(outputName);

      await ffmpeg.exec(ffmpegArgs);
      
      const fileData = await ffmpeg.readFile(outputName);
      const data = new Uint8Array(fileData as ArrayBuffer);
      
      const blob = new Blob([data.buffer], { type: exportFormat === 'gif' ? 'image/gif' : 'video/mp4' });
      const objectUrl = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = `${filePrefix}-clip.${exportFormat}`;
      a.click();
      
      URL.revokeObjectURL(objectUrl);
      toast.success(exportFormat === 'gif' ? 'GIF saved!' : 'Clip saved!', { id: toastId });
      setShowTrimmer(false);
    } catch (err) {
      console.error(err);
      toast.error('Export failed — download the full video instead', { id: toastId });
      setShowTrimmer(false);
    } finally {
      setTrimmerLoading(false);
    }
  }, [videoUrl, trimStart, trimEnd, filePrefix]);

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
            className={`flex-1 px-4 py-4 min-h-[52px] rounded-2xl border-0 ring-1 ring-ink/10 bg-surface shadow-soft focus:ring-2 focus:ring-brand outline-none transition-all duration-200 text-sm placeholder:text-muted/70 dark:bg-night-surface dark:text-slate-100 dark:ring-white/10 dark:shadow-none dark:focus:ring-brand ${loading ? 'ring-2 ring-brand animate-pulse' : ''}`}
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
            className="px-5 min-h-[52px] rounded-2xl border border-ink/10 bg-surface text-ink text-sm font-semibold hover:border-brand/40 hover:bg-brand-soft/60 transition shrink-0 shadow-soft dark:bg-night-surface dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
          >
            Paste
          </button>
        </div>

        <button
          type="submit"
          className={`w-full inline-flex items-center justify-center gap-2 bg-gradient-to-b from-brand to-brand-deep hover:-translate-y-0.5 hover:shadow-glow shadow-lift transition-all duration-150 text-white font-semibold py-4 min-h-[52px] rounded-2xl text-[0.95rem] group`}
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
        <div className="rounded-3xl border border-ink/[0.06] bg-surface shadow-lift overflow-hidden dark:bg-night-surface dark:border-white/5">
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
              <p className="text-xs font-semibold text-muted mb-2 uppercase tracking-wider">Format</p>
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
                    className={`flex-1 py-2 px-3 rounded-xl text-sm font-semibold transition border ${
                      selectedFormat === key
                        ? 'bg-brand-soft border-brand/30 text-brand-deep dark:bg-brand/15 dark:text-brand'
                        : 'bg-surface border-ink/10 text-muted hover:border-brand/30 dark:bg-night-surface dark:border-white/10 dark:text-slate-300'
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
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-success hover:bg-[#0c8f57] text-white font-semibold py-3.5 rounded-2xl shadow-soft transition text-sm"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download {selectedFormat === 'thumbnail' ? 'thumbnail' : selectedFormat === 'gif' ? 'GIF' : 'video'}
                </button>
                <button
                  type="button"
                  onClick={() => void copyVideoUrl()}
                  className="px-4 py-3 rounded-2xl border border-ink/10 bg-surface text-ink text-sm font-medium hover:border-brand/40 hover:bg-brand-soft/50 transition dark:bg-night-surface dark:border-white/10 dark:text-slate-200"
                  title="Copy direct link"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
              </div>
            )}

            {selectedFormat === 'video' && videoUrl && !showTrimmer && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowTrimmer(true)}
                  className="w-full py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-medium transition dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  ✂️ Trim clip
                </button>
              </div>
            )}

            {showTrimmer && (
              <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4 dark:bg-slate-800 dark:border-slate-700">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Trim Video</h3>
                  <button type="button" onClick={() => setShowTrimmer(false)} className="text-slate-500 hover:text-slate-700 dark:text-slate-400">✕</button>
                </div>
                <video
                  ref={videoRef}
                  src={videoUrl}
                  controls
                  className="w-full rounded-lg bg-black max-h-64"
                  onLoadedMetadata={(e) => {
                    if (trimEnd === 0) setTrimEnd(Number(e.currentTarget.duration.toFixed(2)));
                  }}
                />
                <div className="flex gap-4">
                  <div className="flex-1 space-y-1">
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Start (seconds)</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min={0}
                        step="0.1"
                        value={trimStart}
                        onChange={(e) => setTrimStart(Number(e.target.value))}
                        className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded-md dark:bg-slate-900 dark:border-slate-600 dark:text-slate-100 outline-none focus:border-sky-500"
                      />
                      <button
                        type="button"
                        onClick={() => videoRef.current && setTrimStart(Number(videoRef.current.currentTime.toFixed(2)))}
                        className="px-2 py-1 text-xs bg-slate-200 hover:bg-slate-300 rounded-md font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 transition"
                        title="Set to current time"
                      >
                        Set
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300">End (seconds)</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min={0}
                        step="0.1"
                        value={trimEnd}
                        onChange={(e) => setTrimEnd(Number(e.target.value))}
                        className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded-md dark:bg-slate-900 dark:border-slate-600 dark:text-slate-100 outline-none focus:border-sky-500"
                      />
                      <button
                        type="button"
                        onClick={() => videoRef.current && setTrimEnd(Number(videoRef.current.currentTime.toFixed(2)))}
                        className="px-2 py-1 text-xs bg-slate-200 hover:bg-slate-300 rounded-md font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 transition"
                        title="Set to current time"
                      >
                        Set
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => void handleExportClip('mp4')}
                    disabled={trimmerLoading}
                    className="flex-1 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-sm font-semibold transition disabled:opacity-50 flex items-center justify-center"
                  >
                    {trimmerLoading ? 'Exporting...' : 'Export Clip'}
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleExportClip('gif')}
                    disabled={trimmerLoading}
                    className="flex-1 py-2.5 border border-sky-600 text-sky-700 hover:bg-sky-50 rounded-lg text-sm font-semibold transition disabled:opacity-50 flex items-center justify-center dark:border-sky-500 dark:text-sky-400 dark:hover:bg-sky-900/30"
                  >
                    {trimmerLoading ? 'Converting...' : 'Export as GIF'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
