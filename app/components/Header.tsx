'use client';

import Link from 'next/link';
import type React from 'react';
import { useState } from 'react';
import { Logo } from './Logo';

export function Header(): React.ReactElement {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-slate-900 hover:text-sky-700 transition-colors">
          <Logo />
          <span className="font-semibold text-base hidden sm:inline">BlueVideoSaver</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/blog" className="hover:text-sky-700 transition-colors">Guides</Link>
          <Link href="/blog/bluesky-gif-downloader" className="hover:text-sky-700 transition-colors">GIF Downloader</Link>
          <Link href="/blog/best-bluesky-video-downloader" className="hover:text-sky-700 transition-colors">Compare Tools</Link>
          <Link href="/about" className="hover:text-sky-700 transition-colors">About</Link>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-slate-600 hover:text-slate-900"
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
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-2 text-sm font-medium text-slate-600">
          <Link href="/blog" className="block py-2 hover:text-sky-700" onClick={() => setMenuOpen(false)}>Guides</Link>
          <Link href="/blog/bluesky-gif-downloader" className="block py-2 hover:text-sky-700" onClick={() => setMenuOpen(false)}>GIF Downloader</Link>
          <Link href="/blog/best-bluesky-video-downloader" className="block py-2 hover:text-sky-700" onClick={() => setMenuOpen(false)}>Compare Tools</Link>
          <Link href="/about" className="block py-2 hover:text-sky-700" onClick={() => setMenuOpen(false)}>About</Link>
        </div>
      )}
    </header>
  );
}
