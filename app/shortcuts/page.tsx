import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bluesky Video Downloader iOS Shortcut — Save Videos From Share Sheet (2026)',
  description: 'Download the free BlueVideoSaver iOS Shortcut to instantly save Bluesky videos and GIFs directly from the iPhone share sheet. No app required.',
  alternates: {
    canonical: '/shortcuts'
  }
};

export default function ShortcutsPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 mb-2">
            <Download className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Bluesky Downloader iOS Shortcut
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Save Bluesky videos straight from the iOS share sheet without opening your browser manually.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm ring-1 ring-slate-900/5 dark:ring-slate-800 overflow-hidden">
          <div className="p-6 md:p-8 space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">How to install & use</h2>
              <ol className="space-y-4 list-none pl-0">
                <li className="flex gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 font-semibold flex items-center justify-center">1</span>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">Download the shortcut</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Tap the button below to add the BlueVideoSaver Shortcut to your iPhone&apos;s Shortcuts app.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 font-semibold flex items-center justify-center">2</span>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">Find a video on Bluesky</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Open the Bluesky app, find a video or GIF you want to save, and tap the Share icon.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 font-semibold flex items-center justify-center">3</span>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">Tap BlueVideoSaver</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Scroll down in the share sheet and tap &quot;BlueVideoSaver&quot;. Safari will instantly open with your download ready!</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <a
                href="/bluevideosaver.shortcut"
                download
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-8 rounded-xl shadow-sm transition text-base"
              >
                <Download className="w-5 h-5" />
                Download Shortcut
              </a>
              <Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-300">
                Back to website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
