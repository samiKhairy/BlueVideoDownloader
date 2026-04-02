import Link from 'next/link';
import type React from 'react';
import { DownloadTool } from './components/DownloadTool';

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
    question: 'Can I download Bluesky GIFs?',
    answer:
      'Yes. Bluesky serves GIF-style posts as short video loops. BlueVideoSaver downloads them as MP4 files that play like GIFs on any device.'
  },
  {
    question: 'Why does my downloaded Bluesky video have no sound?',
    answer:
      'Some tools skip the audio stream. BlueVideoSaver detects and merges audio + video when both exist so your MP4 keeps the soundtrack.'
  },
  {
    question: 'Can I download videos from private Bluesky accounts?',
    answer:
      'No. BlueVideoSaver works with public posts only and does not bypass privacy settings or permissions.'
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
  name: 'How to download Bluesky videos and GIFs',
  description:
    'Save any public Bluesky video or GIF as an MP4 file using BlueVideoSaver.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Copy the Bluesky link',
      text: 'Open Bluesky and go to the post with the video or GIF. Tap the three dots and copy the link.'
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
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Bluesky Video &amp; GIF Downloader
          </h1>
          <p className="text-base text-slate-600 max-w-lg mx-auto">
            Paste any public Bluesky post link to download the video or GIF as an MP4.
            Free, no watermark, works on every device.
          </p>
        </div>
      </section>

      {/* Tool */}
      <section className="px-4 pb-10">
        <DownloadTool />
      </section>

      {/* Trust signals */}
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto grid grid-cols-3 gap-3 text-center">
          {[
            { label: 'No watermark', detail: 'Original quality preserved' },
            { label: 'No signup', detail: 'Works instantly in your browser' },
            { label: 'Audio included', detail: 'Merges audio + video streams' }
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
            How to download Bluesky videos and GIFs
          </h2>
          <ol className="space-y-4">
            {[
              {
                step: '1',
                title: 'Copy the post link',
                desc: 'Open Bluesky, find the post with the video or GIF, tap the three dots and copy the link.'
              },
              {
                step: '2',
                title: 'Paste and extract',
                desc: 'Paste the link above and click Download. BlueVideoSaver finds the best video stream.'
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
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-5">
            Why choose BlueVideoSaver
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              {
                title: 'GIF-style posts supported',
                desc: 'Bluesky serves GIFs as short video loops. We download them as clean MP4 files that play everywhere.'
              },
              {
                title: 'Audio + video merged',
                desc: 'Many tools return silent files because Bluesky splits audio and video. We merge both streams automatically.'
              },
              {
                title: 'No watermark or re-encoding',
                desc: 'The original stream is saved directly — no overlays, no quality loss, no branding added to your file.'
              },
              {
                title: 'Works on every device',
                desc: 'iPhone, Android, iPad, Windows, Mac, Chromebook — everything runs in your browser, no app needed.'
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
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Guides by device</h2>
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            {[
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
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href as any}
                className="px-4 py-3 rounded-lg border border-slate-100 bg-white text-slate-700 hover:border-sky-200 hover:text-sky-700 transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-16">
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
    </>
  );
}
