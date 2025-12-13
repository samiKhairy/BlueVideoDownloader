import Link from 'next/link';
import type React from 'react';

import type { FaqEntry } from '@/lib/schema/faq';
import { buildFaqPageSchema } from '@/lib/schema/faq';
import { DownloadTool } from './components/DownloadTool';
import { LogoHeader } from './components/LogoHeader';

const homepageFaqs: FaqEntry[] = [
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
    question: 'Why does my downloaded Bluesky video have no sound?',
    answer:
      'Some tools skip the audio stream. BlueVideoSaver detects and merges audio + video when both exist so your MP4 keeps the soundtrack.'
  },
  {
    question: 'Can I download videos from private Bluesky accounts?',
    answer:
      'No. BlueVideoSaver works with public posts and does not bypass privacy settings or permissions.'
  },
  {
    question: 'Is BlueVideoSaver free to use?',
    answer: 'Yes. It’s free, requires no signup, and runs in your browser with server-side processing.'
  }
];

const faqJsonLd = buildFaqPageSchema(homepageFaqs);
export default function HomePage(): React.ReactElement {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-10 gap-6">
      <section className="w-full max-w-5xl text-center space-y-6">
        <div className="flex items-center justify-center gap-4 md:gap-6">
          <LogoHeader className="mt-1" />

          <h1 className="text-3xl md:text-4xl font-bold text-left md:text-center">
            Bluesky Video Downloader – Download Bluesky Videos &amp; GIFs (Free)
          </h1>
        </div>

        <p className="text-sm md:text-base text-gray-700 max-w-3xl mx-auto">
          Paste any public Bluesky post link and download the video or GIF as an MP4 file. Works on iPhone, Android, and desktop
          – no signup, no watermark.
        </p>

        <div className="mt-8">
          <DownloadTool showHeading={false} />
        </div>
      </section>

      <section className="w-full max-w-3xl mt-10 space-y-4 rounded-2xl border border-sky-100 bg-sky-50 p-6 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-900">
          <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden />
          Fixes no sound issues
        </div>
        <h2 className="text-xl md:text-2xl font-semibold">How to Download Bluesky Videos WITH Sound (Audio Fix)</h2>
        <p className="text-sm md:text-base text-gray-700 text-left">
          Many Bluesky downloaders skip the audio track and give you a silent MP4. BlueVideoSaver automatically downloads audio
          and video when they are split and merges them into one file, so your saved videos keep the soundtrack.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-gray-700 text-left">
          <li>Detects separate audio/video streams and grabs both when available.</li>
          <li>Merges the tracks server-side to deliver a single MP4 with sound.</li>
          <li>Shows a quick note if the original upload is truly silent.</li>
        </ul>
      </section>

      <section className="w-full max-w-3xl mt-12 space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold">How to download Bluesky videos</h2>
        <ol className="list-decimal pl-5 space-y-2 text-sm md:text-base text-gray-700 text-left">
          <li>
            Open Bluesky and go to the post with the video or GIF you want.{' '}
            <Link href="/blog/download-bluesky-video-android" className="underline font-semibold text-sky-700">
              Using Android? Read the full guide.
            </Link>
          </li>
          <li>
            Tap the three dots on the post and copy the link.{' '}
            <Link href="/blog/download-bluesky-video-iphone" className="underline font-semibold text-sky-700">
              On iPhone? Get the iOS steps.
            </Link>
          </li>
          <li>Paste the link above and click “Download”.</li>
          <li>Save the MP4 file to your device.</li>
        </ol>
      </section>

      <section className="w-full max-w-3xl mt-10 space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold">Features of BlueVideoSaver</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-gray-700 text-left">
          <li>Download Bluesky videos and GIFs as MP4 files with no watermark.</li>
          <li>Optimized for mobile: full-width controls and 52px+ hit targets on phones.</li>
          <li>Server-rendered HTML so bots and users see the tool immediately.</li>
          <li>Backend merges audio and video when needed to avoid silent downloads.</li>
        </ul>
      </section>

      <section className="w-full max-w-3xl mt-10 space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold">Is it safe and legal to download Bluesky videos?</h2>
        <p className="text-sm md:text-base text-gray-700 text-left">
          BlueVideoSaver runs in the browser with server-side processing—no extensions or installs required. Always respect
          creators’ rights and Bluesky’s terms: download only the content you have permission to save.
        </p>
        <p className="text-sm md:text-base text-gray-700 text-left">
          Private or restricted posts cannot be downloaded if you do not have access to them on Bluesky.
        </p>
      </section>

      <section className="w-full max-w-3xl mt-10 space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold">Guides &amp; tutorials</h2>
        <p className="text-sm md:text-base text-gray-700 text-left">
          Learn how to use BlueVideoSaver on different devices and fix common issues.
        </p>
        <ul className="list-disc pl-5 text-sm md:text-base text-sky-700 text-left">
          <li>
            <Link href="/blog/download-bluesky-video-iphone" className="underline font-semibold">
              How to download Bluesky videos on iPhone
            </Link>
          </li>
          <li>
            <Link href="/blog/download-bluesky-video-android" className="underline font-semibold">
              How to download Bluesky videos on Android
            </Link>
          </li>
          <li>
            <Link href="/blog/bluesky-download-no-sound" className="underline font-semibold">
              Why your Bluesky download has no sound
            </Link>
          </li>
          <li>
            <Link href="/blog/download-private-bluesky-videos" className="underline font-semibold">
              Can you download videos from private Bluesky accounts?
            </Link>
          </li>
          <li>
            <Link href="/blog/down-blue-alternative" className="underline font-semibold">
              Down.blue alternative
            </Link>
          </li>
          <li>
            <Link href="/blog/bluesky-gif-downloader" className="underline font-semibold">
              Save Bluesky GIF-style posts as MP4
            </Link>
          </li>
          <li>
            <Link href="/blog/download-bluesky-videos-windows" className="underline font-semibold">
              Download Bluesky videos on Windows
            </Link>
          </li>
          <li>
            <Link href="/blog/download-bluesky-video-mac" className="underline font-semibold">
              Download Bluesky videos on Mac
            </Link>
          </li>
          <li>
            <Link href="/blog/download-bluesky-video-chromebook" className="underline font-semibold">
              Download Bluesky videos on Chromebook
            </Link>
          </li>
          <li>
            <Link href="/blog/save-bluesky-video-offline" className="underline font-semibold">
              Save Bluesky videos for offline viewing
            </Link>
          </li>
          <li>
            <Link href="/blog/best-bluesky-video-downloader" className="underline font-semibold">
              Compare the best Bluesky downloaders
            </Link>
          </li>
        </ul>
      </section>

      <section className="w-full max-w-3xl mt-10 space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold">Frequently asked questions</h2>
        <dl className="space-y-4 text-left text-sm md:text-base text-gray-700">
          <div>
            <dt className="font-semibold">How do I download Bluesky videos on iPhone?</dt>
            <dd className="mt-1">Copy the post link, open bluevideosaver.com in Safari, paste it into the box, tap Download, then save the MP4 to Files or Photos.</dd>
          </div>
          <div>
            <dt className="font-semibold">How do I download Bluesky videos on Android?</dt>
            <dd className="mt-1">Copy the post link, open Chrome or Firefox to bluevideosaver.com, paste the link, and tap Download. The file saves to your Downloads folder.</dd>
          </div>
          <div>
            <dt className="font-semibold">Why does my downloaded Bluesky video have no sound?</dt>
            <dd className="mt-1">Some tools skip the audio stream. BlueVideoSaver detects and merges audio + video when both exist so your MP4 keeps the soundtrack.</dd>
          </div>
          <div>
            <dt className="font-semibold">Can I download videos from private Bluesky accounts?</dt>
            <dd className="mt-1">No. BlueVideoSaver works with public posts and does not bypass privacy settings or permissions.</dd>
          </div>
          <div>
            <dt className="font-semibold">Is BlueVideoSaver free to use?</dt>
            <dd className="mt-1">Yes. It’s free, requires no signup, and runs in your browser with server-side processing.</dd>
          </div>
        </dl>
      </section>
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
    </main>
  );
}
