import Link from 'next/link';
import type React from 'react';

export function Footer(): React.ReactElement {
  return (
    <footer className="mt-auto border-t border-slate-200/60 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Download tools</h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li><Link href="/" className="hover:text-sky-700 transition-colors">Bluesky Downloader</Link></li>
              <li><Link href="/twitter-video-downloader" className="hover:text-sky-700 transition-colors">Twitter/X Downloader</Link></li>
              <li><Link href="/tiktok-video-downloader" className="hover:text-sky-700 transition-colors">TikTok Downloader</Link></li>
              <li><Link href="/blog/bluesky-gif-downloader" className="hover:text-sky-700 transition-colors">GIF Downloader</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Device guides</h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li><Link href="/blog/download-bluesky-video-iphone" className="hover:text-sky-700 transition-colors">iPhone</Link></li>
              <li><Link href="/blog/download-bluesky-video-android" className="hover:text-sky-700 transition-colors">Android</Link></li>
              <li><Link href="/blog/download-bluesky-videos-windows" className="hover:text-sky-700 transition-colors">Windows</Link></li>
              <li><Link href="/blog/download-bluesky-video-mac" className="hover:text-sky-700 transition-colors">Mac</Link></li>
              <li><Link href="/blog/bluesky-video-downloader-ipad" className="hover:text-sky-700 transition-colors">iPad</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Troubleshooting</h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li><Link href="/blog/bluesky-download-no-sound-expanded" className="hover:text-sky-700 transition-colors">No sound fix</Link></li>
              <li><Link href="/blog/bluesky-video-not-saving" className="hover:text-sky-700 transition-colors">Video not saving</Link></li>
              <li><Link href="/blog/download-private-bluesky-videos" className="hover:text-sky-700 transition-colors">Private accounts</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Compare</h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li><Link href="/blog/best-bluesky-video-downloader" className="hover:text-sky-700 transition-colors">Best downloaders</Link></li>
              <li><Link href="/blog/down-blue-alternative" className="hover:text-sky-700 transition-colors">Down.blue alternative</Link></li>
              <li><Link href="/about" className="hover:text-sky-700 transition-colors">About us</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-500">
          <p>&copy; {new Date().getFullYear()} BlueVideoSaver. Not affiliated with Bluesky, Twitter/X, or TikTok.</p>
          <p>Free video downloader for Bluesky, Twitter/X &amp; TikTok. No watermark, no signup.</p>
        </div>
      </div>
    </footer>
  );
}
