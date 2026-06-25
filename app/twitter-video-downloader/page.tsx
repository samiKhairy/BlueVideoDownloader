import React from 'react';
import type { Metadata } from 'next';
import { DownloadTool } from '../components/DownloadTool';

/* ─── SEO metadata ──────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Twitter Video Downloader — Download X/Twitter Videos Free (2026)',
  description:
    'Download Twitter and X videos as MP4 for free. No watermark, no login required. Works on iPhone, Android, and desktop. Fast and HD quality.',
  alternates: {
    canonical: '/twitter-video-downloader'
  },
  openGraph: {
    title: 'Twitter/X Video Downloader — Free, No Watermark',
    description:
      'Paste any tweet URL and save the video as MP4. HD quality, no watermark, no login. Works on all devices.',
    url: 'https://bluevideosaver.com/twitter-video-downloader',
    siteName: 'BlueVideoSaver'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twitter/X Video Downloader — Free, No Watermark',
    description:
      'Save Twitter and X videos as MP4. No watermark, no login. Works on all devices.'
  }
};

/* ─── Structured data ───────────────────────────────────────────── */

const faqs = [
  {
    question: 'How do I download a video from Twitter/X?',
    answer:
      'Copy the tweet URL, paste it into the download box on this page, and click Download. The video saves as an MP4 file to your device.'
  },
  {
    question: 'Can I download Twitter videos on iPhone?',
    answer:
      'Yes. Open this page in Safari, paste the tweet link, tap Download, and save the MP4 to your Files or Photos app.'
  },
  {
    question: 'Can I download Twitter videos on Android?',
    answer:
      'Yes. Open Chrome or your preferred browser, paste the tweet URL here, and tap Download. The MP4 saves to your Downloads folder.'
  },
  {
    question: 'Does this work with X.com links?',
    answer:
      'Yes. We support both twitter.com and x.com URLs. Just paste either link format and the downloader will handle it.'
  },
  {
    question: 'Are downloaded Twitter videos in HD?',
    answer:
      'Yes. We download the highest quality version available — typically 720p or 1080p depending on what the uploader posted.'
  },
  {
    question: 'Is this free? Do I need to sign up?',
    answer:
      'Completely free with no signup, no login, and no watermark added to your downloads.'
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

export default function TwitterDownloaderPage(): React.ReactElement {
  return (
    <>
      {/* Hero */}
      <section className="px-4 pt-12 pb-8">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Twitter/X Video Downloader
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Download Twitter/X Videos — Free, HD, No Watermark
          </h1>
          <p className="text-base text-slate-600 max-w-lg mx-auto">
            Paste any tweet link to download the video as MP4. No login, no watermark, works on every device.
          </p>
        </div>
      </section>

      {/* Tool */}
      <section className="px-4 pb-10">
        <React.Suspense fallback={<div className="text-center py-20">Loading tool...</div>}>
          <DownloadTool platform="twitter" />
        </React.Suspense>
      </section>

      {/* Trust signals */}
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto grid grid-cols-3 gap-3 text-center">
          {[
            { label: 'No watermark', detail: 'Original HD quality preserved' },
            { label: 'No login', detail: 'Works instantly, no account needed' },
            { label: 'All devices', detail: 'iPhone, Android, PC, Mac' }
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
            How to download Twitter/X videos
          </h2>
          <ol className="space-y-4">
            {[
              {
                step: '1',
                title: 'Copy the tweet URL',
                desc: 'Open Twitter or X, find the tweet with the video, tap the share icon and select "Copy link".'
              },
              {
                step: '2',
                title: 'Paste and extract',
                desc: 'Paste the link above and click Download. We find the highest quality video stream available.'
              },
              {
                step: '3',
                title: 'Save to your device',
                desc: 'The MP4 file downloads directly to your device. Choose Video, GIF, or Thumbnail format.'
              }
            ].map((item) => (
              <li key={item.step} className="flex gap-4 items-start">
                <span className="shrink-0 w-8 h-8 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold flex items-center justify-center">
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
            Why use our Twitter video downloader
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              {
                title: 'HD quality downloads',
                desc: 'We grab the highest resolution available — up to 1080p. No quality loss, no re-encoding.'
              },
              {
                title: 'Audio always included',
                desc: 'Some tools return silent files. We merge audio and video streams so your MP4 has sound.'
              },
              {
                title: 'Works with X.com and Twitter.com',
                desc: 'Both old twitter.com links and new x.com URLs are fully supported. Just paste either format.'
              },
              {
                title: 'No login or API key needed',
                desc: 'No Twitter/X account required. Just paste the tweet link and download — completely free.'
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
              { href: '/tiktok-video-downloader', label: 'TikTok Video Downloader' },
              { href: '/blog/bluesky-gif-downloader', label: 'GIF Downloader' }
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-3 rounded-lg border border-slate-100 bg-white text-slate-700 hover:border-sky-200 hover:text-sky-700 transition text-center"
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
