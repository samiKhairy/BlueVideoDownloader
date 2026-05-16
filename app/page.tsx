import React from 'react';
import { Download, Shield, Volume2, Smartphone } from 'lucide-react';
import { DownloadTool } from './components/DownloadTool';
import { ScrollAnimationInit } from './components/ScrollAnimationInit';

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
      {/* Hero */}
      <section className="px-4 pt-12 pb-8">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-500">Video &amp; GIF</span> Downloader — Bluesky, Twitter/X &amp; TikTok
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Paste any video link from Bluesky, Twitter/X, or TikTok to download it as MP4.
            Free, no watermark, works on every device.
          </p>
        </div>
      </section>

      {/* Trust banner */}
      <div className="max-w-2xl mx-auto mb-6 px-4 text-center text-sm font-medium text-slate-600 dark:text-slate-400 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
        <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Free to use — no account required</span>
        <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
        <span>Works on iPhone, Android, Windows, Mac</span>
        <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
        <span>No watermark · Audio included</span>
      </div>

      {/* Tool */}
      <section className="px-4 pb-10">
        <React.Suspense fallback={<div className="text-center py-20">Loading tool...</div>}>
          <DownloadTool platform="universal" />
        </React.Suspense>
      </section>

      {/* Supported platforms */}
      <section className="px-4 pb-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            {([
              { href: '/twitter-video-downloader' as const, label: 'Twitter/X', icon: '𝕏' },
              { href: '/tiktok-video-downloader' as const, label: 'TikTok', icon: '♪' },
              { href: '/' as const, label: 'Bluesky', icon: '🦋', active: true as const }
            ] as const).map((p) => (
              <a
                key={p.href}
                href={p.href}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border transition font-medium ${
                  'active' in p && p.active
                    ? 'bg-sky-50 border-sky-200 text-sky-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-sky-200 hover:text-sky-700'
                }`}
              >
                <span>{p.icon}</span>
                {p.label}
              </a>
            ))}
          </div>
        </div>
      </section>



      {/* How it works */}
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-5">
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
                <span className="shrink-0 w-8 h-8 rounded-full bg-sky-100 text-sky-700 text-sm font-semibold flex items-center justify-center">
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
      <section className="px-4 pb-12 animate-on-scroll">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-5 dark:text-white">
            Why choose BlueVideoSaver
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              {
                title: 'Multi-platform support',
                desc: 'Download videos from Bluesky, Twitter/X, and TikTok — all from one tool. No switching between sites.',
                icon: <Download className="w-5 h-5 text-sky-600" />
              },
              {
                title: 'Audio + video merged',
                desc: 'Many tools return silent files because platforms split audio and video. We merge both streams automatically.',
                icon: <Volume2 className="w-5 h-5 text-sky-600" />
              },
              {
                title: 'No watermark or re-encoding',
                desc: 'The original stream is saved directly — no overlays, no quality loss, no branding added to your file.',
                icon: <Shield className="w-5 h-5 text-sky-600" />
              },
              {
                title: 'Works on every device',
                desc: 'iPhone, Android, iPad, Windows, Mac, Chromebook — everything runs in your browser, no app needed.',
                icon: <Smartphone className="w-5 h-5 text-sky-600" />
              }
            ].map((f) => (
              <div key={f.title} className="p-4 rounded-xl bg-white shadow-sm ring-1 ring-slate-900/5 hover:-translate-y-1 hover:shadow-md transition-all duration-200 dark:bg-slate-900 dark:ring-slate-800">
                <div className="rounded-xl bg-sky-50 dark:bg-sky-900/30 p-2 w-fit mb-3">
                  {f.icon}
                </div>
                <p className="font-medium text-slate-900 text-sm dark:text-white">{f.title}</p>
                <p className="text-sm text-slate-600 mt-1 dark:text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate — clean placement below the fold */}
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="px-5 py-4 rounded-xl bg-sky-50 border border-sky-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-800">
                Download slow? Your ISP might be throttling social media.
              </p>
              <p className="text-xs text-slate-500 mt-0.5">A VPN can bypass ISP throttling for faster downloads.</p>
            </div>
            <a
              href="https://nordvpn.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-lg transition"
            >
              Try NordVPN &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="px-4 pb-12 animate-on-scroll">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Download tools &amp; guides</h2>
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
                className="px-4 py-3 rounded-lg border border-slate-100 bg-white text-slate-700 hover:border-sky-200 hover:text-sky-700 transition"
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
          <h2 className="text-xl font-semibold mb-5">Frequently asked questions</h2>
          <dl className="space-y-4">
            {homepageFaqs.map((faq) => (
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <ScrollAnimationInit />
    </>
  );
}
