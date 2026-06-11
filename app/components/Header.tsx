'use client';

import Link from 'next/link';
import type React from 'react';
import { useState } from 'react';
import { Logo } from './Logo';

export function Header(): React.ReactElement {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/[0.06] dark:border-white/10 bg-dawn/70 dark:bg-night/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-ink dark:text-[#eceef1] hover:text-brand transition-colors">
          <Logo />
          <span className="font-display font-bold text-base tracking-tight hidden sm:inline">BlueVideoSaver</span>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-muted dark:text-slate-300">
          <Link href="/twitter-video-downloader" className="hover:text-brand transition-colors">Twitter/X</Link>
          <Link href="/tiktok-video-downloader" className="hover:text-brand transition-colors">TikTok</Link>
          <Link href="/blog" className="hover:text-brand transition-colors">Guides</Link>
          <Link href="/blog/bluesky-gif-downloader" className="hover:text-brand transition-colors">GIF Downloader</Link>
          <Link href="/about" className="hover:text-brand transition-colors">About</Link>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-muted dark:text-slate-300 hover:text-ink dark:hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden border-t border-ink/[0.06] dark:border-white/10 bg-dawn dark:bg-night px-4 py-3 space-y-2 text-sm font-medium text-muted dark:text-slate-300">
          <Link href="/twitter-video-downloader" className="block py-2 hover:text-brand" onClick={() => setMenuOpen(false)}>Twitter/X Downloader</Link>
          <Link href="/tiktok-video-downloader" className="block py-2 hover:text-brand" onClick={() => setMenuOpen(false)}>TikTok Downloader</Link>
          <Link href="/blog" className="block py-2 hover:text-brand" onClick={() => setMenuOpen(false)}>Guides</Link>
          <Link href="/blog/bluesky-gif-downloader" className="block py-2 hover:text-brand" onClick={() => setMenuOpen(false)}>GIF Downloader</Link>
          <Link href="/blog/best-bluesky-video-downloader" className="block py-2 hover:text-brand" onClick={() => setMenuOpen(false)}>Compare Tools</Link>
          <Link href="/about" className="block py-2 hover:text-brand" onClick={() => setMenuOpen(false)}>About</Link>
        </div>
      )}
    </header>
  );
}
