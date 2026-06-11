import React from 'react';
import type { Metadata } from 'next';
import { Download, Shield, Volume2, Smartphone } from 'lucide-react';
import { DownloadTool } from './components/DownloadTool';
import { ScrollAnimationInit } from './components/ScrollAnimationInit';
import { BlueskyIcon, XIcon, TikTokIcon } from './components/BrandIcons';

// Homepage-specific metadata. Overrides the generic site default from layout.tsx
// to lead with the high-opportunity "Bluesky video downloader" / GIF queries.
// metadataBase, canonical and hreflang alternates are inherited from layout.tsx.
export const metadata: Metadata = {
  title: 'Bluesky Video Downloader — Save Videos & GIFs Free (2026)',
  description:
    'Download Bluesky videos and GIFs as MP4 — free, no signup, no watermark. Paste any post link and save in seconds on iPhone, Android, or desktop.',
  openGraph: {
    title: 'Bluesky Video Downloader — Save Videos & GIFs Free',
    description:
      'Paste any Bluesky post link and save the video or GIF as MP4. Free, no watermark, no signup. Works on iPhone, Android, and desktop.',
    url: 'https://bluevideosaver.com/',
    siteName: 'BlueVideoSaver'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bluesky Video Downloader — Save Videos & GIFs Free',
    description:
      'Save Bluesky videos and GIFs as MP4. Free, no watermark, no signup. Works on all devices.'
  }
};

/* ─── Structured data ───────────────────────────────────────────── */

const homepageFaqs = [
  {
    question: 'How do I download Bluesky videos on iPhone?',
    answer:
      'Copy the post link, open bluevideosaver.com in Safari, paste it into the box, tap Download, then save the MP4 to Files or Photos.'
  },
  {
    question: 'How do I download Bluesky videos on Android?',
    answer:
      'Copy the post link, open Chrome or Firefox to bluevideosaver.com, paste the link, and tap Download. The file saves to your Downloads folder.'
  },
  {
    question: 'Can I download Twitter/X videos?',
    answer:
      'Yes. Paste any tweet URL from twitter.com or x.com and BlueVideoSaver will download the video as an MP4 with audio included.'
  },
  {
    question: 'Can I download TikTok videos without watermark?',
    answer:
      'Yes. Paste any TikTok link and the video downloads as a clean MP4 without the TikTok watermark overlay.'
  },
  {
    question: 'Can I download Bluesky GIFs?',
    answer:
      'Yes. Bluesky serves GIF-style posts as short video loops. BlueVideoSaver downloads them as MP4 files that play like GIFs on any device.'
  },
  {
    question: 'Why does my downloaded video have no sound?',
    answer:
      'Some tools skip the audio stream. BlueVideoSaver detects and merges audio + video when both exist so your MP4 keeps the soundtrack.'
  },
  {
    question: 'Is BlueVideoSaver free to use?',
    answer:
      'Yes. It is free, requires no signup, and runs in your browser with server-side processing.'
  }
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homepageFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer }
  }))
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to download videos from Bluesky, Twitter, and TikTok',
  description:
    'Save any public video from Bluesky, Twitter/X, or TikTok as an MP4 file using BlueVideoSaver.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Copy the video link',
      text: 'Open Bluesky, Twitter/X, or TikTok and find the post with the video. Copy the link from the share menu.'
    },
    {
      '@type': 'HowToStep',
      name: 'Paste the link',
      text: 'Go to bluevideosaver.com and paste the link into the download box.'
    },
    {
      '@type': 'HowToStep',
      name: 'Download the MP4',
      text: 'Click Download and save the MP4 file to your device.'
    }
  ]
};

/* ─── Page ──────────────────────────────────────────────────────── */

export default function HomePage(): React.ReactElement {
  return (
    <>
      {/* Hero — the paste box is the thesis: paste a link, get your video. */}
      <section className="dawn-sky px-4 pt-14 pb-12 sm:pt-20 sm:pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <span className="animate-rise inline-flex items-center gap-1.5 rounded-full bg-brand-soft/70 dark:bg-brand/15 px-3 py-1 text-xs font-semibold text-brand-deep dark:text-brand ring-1 ring-brand/15">
            <span className="text-sm leading-none">🦋</span> The calm way to save Bluesky media
          </span>
          <h1 className="animate-rise mt-5 text-[2.6rem] leading-[1.05] sm:text-6xl font-extrabold tracking-tight text-ink dark:text-white" style={{ animationDelay: '60ms' }}>
            Save any Bluesky video
            <br className="hidden sm:block" /> in two taps.
          </h1>
          <p className="animate-rise mt-4 text-base sm:text-lg text-muted dark:text-slate-400 max-w-lg mx-auto" style={{ animationDelay: '120ms' }}>
            Paste a link and get a clean MP4 or GIF — free, no watermark, no sign-up.
            Works the same on iPhone, Android, and desktop.
          </p>

          {/* Tool — floats on the dawn gradient */}
          <div className="animate-rise mt-9" style={{ animationDelay: '180ms' }}>
            <React.Suspense fallback={<div className="text-center py-20 text-muted">Loading tool…</div>}>
              <DownloadTool platform="universal" />
            </React.Suspense>
          </div>

          {/* Trust line — the one honey spark */}
          <div className="animate-rise mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-muted dark:text-slate-400" style={{ animationDelay: '240ms' }}>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-honey"></span> Free, no account
            </span>
            <span className="hidden sm:inline text-ink/15 dark:text-white/15">·</span>
            <span>No watermark, audio kept</span>
            <span className="hidden sm:inline text-ink/15 dark:text-white/15">·</span>
            <span>Also Twitter/X &amp; TikTok</span>
          </div>
        </div>
      </section>

      {/* Supported platforms */}
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            {([
              { href: '/twitter-video-downloader' as const, label: 'Twitter/X', Icon: XIcon },
              { href: '/tiktok-video-downloader' as const, label: 'TikTok', Icon: TikTokIcon },
              { href: '/' as const, label: 'Bluesky', Icon: BlueskyIcon, active: true as const }
            ] as const).map((p) => (
              <a
                key={p.href}
                href={p.href}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border transition font-medium ${
                  'active' in p && p.active
                    ? 'bg-brand-soft border-brand/30 text-brand-deep dark:bg-brand/15 dark:text-brand'
                    : 'bg-surface border-ink/10 text-muted hover:border-brand/30 hover:text-brand dark:bg-night-surface dark:border-white/10 dark:text-slate-300'
                }`}
              >
                <p.Icon className="w-3.5 h-3.5" />
                {p.label}
              </a>
            ))}
          </div>
        </div>
      </section>



      {/* How it works */}
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-ink dark:text-white">
            How to download videos from social media
          </h2>
          <ol className="space-y-4">
            {[
              {
                step: '1',
                title: 'Copy the post link',
                desc: 'Open Bluesky, Twitter/X, or TikTok. Find the post with the video and copy the link from the share menu.'
              },
              {
                step: '2',
                title: 'Paste and extract',
                desc: 'Paste the link above and click Download. BlueVideoSaver auto-detects the platform and finds the best video stream.'
              },
              {
                step: '3',
                title: 'Save to your device',
                desc: 'Pick your format — Video, GIF, or Thumbnail — and download the file.'
              }
            ].map((item) => (
              <li key={item.step} className="flex gap-4 items-start">
                <span className="shrink-0 w-9 h-9 rounded-full bg-brand-soft text-brand-deep text-sm font-bold flex items-center justify-center ring-1 ring-brand/15 dark:bg-brand/15 dark:text-brand dark:ring-brand/20">
                  {item.step}
                </span>
                <div>
                  <p className="font-semibold text-ink dark:text-white">{item.title}</p>
                  <p className="text-sm text-muted mt-0.5 dark:text-slate-400">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 pb-12 animate-on-scroll">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-ink dark:text-white">
            Why choose BlueVideoSaver
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              {
                title: 'Multi-platform support',
                desc: 'Download videos from Bluesky, Twitter/X, and TikTok — all from one tool. No switching between sites.',
                icon: <Download className="w-5 h-5 text-brand" />
              },
              {
                title: 'Audio + video merged',
                desc: 'Many tools return silent files because platforms split audio and video. We merge both streams automatically.',
                icon: <Volume2 className="w-5 h-5 text-brand" />
              },
              {
                title: 'No watermark or re-encoding',
                desc: 'The original stream is saved directly — no overlays, no quality loss, no branding added to your file.',
                icon: <Shield className="w-5 h-5 text-brand" />
              },
              {
                title: 'Works on every device',
                desc: 'iPhone, Android, iPad, Windows, Mac, Chromebook — everything runs in your browser, no app needed.',
                icon: <Smartphone className="w-5 h-5 text-brand" />
              }
            ].map((f) => (
              <div key={f.title} className="p-5 rounded-2xl bg-surface shadow-soft ring-1 ring-ink/[0.04] hover:-translate-y-1 hover:shadow-lift transition-all duration-200 dark:bg-night-surface dark:ring-white/5">
                <div className="rounded-xl bg-brand-soft dark:bg-brand/15 p-2.5 w-fit mb-3">
                  {f.icon}
                </div>
                <p className="font-semibold text-ink text-[0.95rem] dark:text-white">{f.title}</p>
                <p className="text-sm text-muted mt-1 dark:text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate — clean placement below the fold */}
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="px-5 py-4 rounded-2xl bg-brand-soft/60 ring-1 ring-brand/15 dark:bg-brand/10 dark:ring-brand/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-ink dark:text-white">
                Download slow? Your ISP might be throttling social media.
              </p>
              <p className="text-xs text-muted mt-0.5 dark:text-slate-400">A VPN can bypass ISP throttling for faster downloads.</p>
            </div>
            <a
              href="https://nordvpn.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-4 py-2 bg-brand hover:bg-brand-deep text-white text-sm font-semibold rounded-xl shadow-soft transition"
            >
              Try NordVPN &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="px-4 pb-12 animate-on-scroll">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-ink dark:text-white">Download tools &amp; guides</h2>
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            {[
              { href: '/twitter-video-downloader', label: 'Twitter/X Video Downloader' },
              { href: '/tiktok-video-downloader', label: 'TikTok Video Downloader' },
              { href: '/blog/download-bluesky-video-iphone', label: 'Download on iPhone' },
              { href: '/blog/download-bluesky-video-android', label: 'Download on Android' },
              { href: '/blog/download-bluesky-videos-windows', label: 'Download on Windows' },
              { href: '/blog/download-bluesky-video-mac', label: 'Download on Mac' },
              { href: '/blog/bluesky-video-downloader-ipad', label: 'Download on iPad' },
              { href: '/blog/download-bluesky-video-chromebook', label: 'Download on Chromebook' },
              { href: '/blog/bluesky-gif-downloader', label: 'Save Bluesky GIFs as MP4' },
              { href: '/blog/bluesky-download-no-sound-expanded', label: 'Fix: no sound on downloads' },
              { href: '/blog/down-blue-alternative', label: 'Down.blue alternative' },
              { href: '/blog/best-bluesky-video-downloader', label: 'Compare Bluesky downloaders' }
            ].map((link: { href: string; label: string }) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-3 rounded-xl border border-ink/[0.06] bg-surface text-muted hover:border-brand/30 hover:text-brand hover:shadow-soft transition dark:bg-night-surface dark:border-white/5 dark:text-slate-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-16 animate-on-scroll">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-ink dark:text-white">Frequently asked questions</h2>
          <dl className="space-y-4">
            {homepageFaqs.map((faq) => (
              <div
                key={faq.question}
                className="pb-4 border-b border-ink/[0.06] dark:border-white/10 last:border-0 last:pb-0"
              >
                <dt className="font-semibold text-[0.95rem] text-ink dark:text-white">{faq.question}</dt>
                <dd className="mt-1 text-sm text-muted dark:text-slate-400">{faq.answer}</dd>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <ScrollAnimationInit />
    </>
  );
}
