import React from 'react';
import type { Metadata } from 'next';
import { DownloadTool } from '../components/DownloadTool';

/* ─── SEO metadata ──────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'TikTok Video Downloader — Download TikTok Without Watermark (2026)',
  description:
    'Download TikTok videos without watermark as MP4 for free. No login, no app needed. Works on iPhone, Android, and desktop. HD quality.',
  alternates: {
    canonical: '/tiktok-video-downloader'
  },
  openGraph: {
    title: 'TikTok Video Downloader — No Watermark, Free',
    description:
      'Paste any TikTok link and save the video as MP4 without watermark. HD quality, no login. Works on all devices.',
    url: 'https://bluevideosaver.com/tiktok-video-downloader',
    siteName: 'BlueVideoSaver'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TikTok Video Downloader — No Watermark, Free',
    description:
      'Save TikTok videos without watermark as MP4. No login, no app needed. Works on all devices.'
  }
};

/* ─── Structured data ───────────────────────────────────────────── */

const faqs = [
  {
    question: 'How do I download TikTok videos without watermark?',
    answer:
      'Copy the TikTok video link, paste it into the download box on this page, and click Download. The video saves as a clean MP4 without the TikTok watermark.'
  },
  {
    question: 'Can I download TikTok videos on iPhone?',
    answer:
      'Yes. Open this page in Safari, paste the TikTok link, tap Download, and save the MP4 to your Files or Photos app. No app install needed.'
  },
  {
    question: 'Can I download TikTok videos on Android?',
    answer:
      'Yes. Open Chrome or your browser, paste the TikTok URL here, and tap Download. The MP4 saves to your Downloads folder.'
  },
  {
    question: 'Is this free? Do I need a TikTok account?',
    answer:
      'Completely free. No TikTok login required, no signup, and no watermark is added to your downloads.'
  },
  {
    question: 'What quality are the downloaded TikTok videos?',
    answer:
      'We download the highest quality version available, typically 720p or 1080p. The original resolution is preserved.'
  },
  {
    question: 'Can I download TikTok Slideshows?',
    answer:
      'Yes. TikTok slideshows (photo carousels with music) are downloaded as MP4 video files that play the slideshow with the original audio.'
  }
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer }
  }))
};

/* ─── Page ──────────────────────────────────────────────────────── */

export default function TikTokDownloaderPage(): React.ReactElement {
  return (
    <>
      {/* Hero */}
      <section className="px-4 pt-12 pb-8">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 text-rose-600 text-xs font-medium">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.17a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.6z" />
            </svg>
            TikTok Video Downloader
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Download TikTok Videos — No Watermark, Free
          </h1>
          <p className="text-base text-slate-600 max-w-lg mx-auto">
            Paste any TikTok link to download the video as a clean MP4 without watermark.
            No app needed, works on every device.
          </p>
        </div>
      </section>

      {/* Tool */}
      <section className="px-4 pb-10">
        <React.Suspense fallback={<div className="text-center py-20">Loading tool...</div>}>
          <DownloadTool platform="tiktok" />
        </React.Suspense>
      </section>

      {/* Trust signals */}
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto grid grid-cols-3 gap-3 text-center">
          {[
            { label: 'No watermark', detail: 'Clean MP4 without TikTok logo' },
            { label: 'No app needed', detail: 'Works in your browser instantly' },
            { label: 'HD quality', detail: 'Up to 1080p, original resolution' }
          ].map((item) => (
            <div
              key={item.label}
              className="py-4 px-3 rounded-xl bg-white border border-slate-100"
            >
              <p className="text-sm font-semibold text-slate-900">{item.label}</p>
              <p className="text-xs text-slate-500 mt-1">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-5">
            How to download TikTok videos without watermark
          </h2>
          <ol className="space-y-4">
            {[
              {
                step: '1',
                title: 'Copy the TikTok link',
                desc: 'Open TikTok, find the video you want, tap Share and select "Copy link".'
              },
              {
                step: '2',
                title: 'Paste and extract',
                desc: 'Paste the link above and click Download. We find the best quality version without the watermark.'
              },
              {
                step: '3',
                title: 'Save to your device',
                desc: 'The clean MP4 file downloads to your device. No watermark, no quality loss.'
              }
            ].map((item) => (
              <li key={item.step} className="flex gap-4 items-start">
                <span className="shrink-0 w-8 h-8 rounded-full bg-rose-50 text-rose-600 text-sm font-semibold flex items-center justify-center">
                  {item.step}
                </span>
                <div>
                  <p className="font-medium text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-600 mt-0.5">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-5">
            Why use our TikTok downloader
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              {
                title: 'No watermark',
                desc: 'Download clean videos without the TikTok username watermark overlay. Perfect for reposts and editing.'
              },
              {
                title: 'Audio preserved',
                desc: 'The original audio, music, and voiceover are kept in the downloaded MP4 file.'
              },
              {
                title: 'Slideshows supported',
                desc: 'TikTok photo slideshows with music download as MP4 video files with the original soundtrack.'
              },
              {
                title: 'No app or login',
                desc: 'Everything runs in your browser. No TikTok account, no app download, completely free.'
              }
            ].map((f) => (
              <div key={f.title} className="p-4 rounded-xl bg-white border border-slate-100">
                <p className="font-medium text-slate-900 text-sm">{f.title}</p>
                <p className="text-sm text-slate-600 mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links to other tools */}
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Download from other platforms</h2>
          <div className="grid sm:grid-cols-3 gap-2 text-sm">
            {[
              { href: '/', label: 'Bluesky Video Downloader' },
              { href: '/twitter-video-downloader', label: 'Twitter/X Video Downloader' },
              { href: '/blog/bluesky-gif-downloader', label: 'GIF Downloader' }
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-3 rounded-lg border border-slate-100 bg-white text-slate-700 hover:border-rose-200 hover:text-rose-700 transition text-center"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-5">Frequently asked questions</h2>
          <dl className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="pb-4 border-b border-slate-100 last:border-0 last:pb-0"
              >
                <dt className="font-medium text-sm text-slate-900">{faq.question}</dt>
                <dd className="mt-1 text-sm text-slate-600">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
