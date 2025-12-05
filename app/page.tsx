import Link from 'next/link';
import type React from 'react';

import { DownloadTool } from './components/DownloadTool';

export default function HomePage(): React.ReactElement {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-10">
      <section className="w-full max-w-5xl text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">
          Bluesky Video Downloader – Download Bluesky Videos &amp; GIFs (Free)
        </h1>

        <p className="text-sm md:text-base text-gray-700 max-w-3xl mx-auto">
          Paste any public Bluesky post link and download the video or GIF as an MP4 file. Works on iPhone, Android, and desktop
          – no signup, no watermark.
        </p>

        <div className="mt-8">
          <DownloadTool showHeading={false} />
        </div>
      </section>

      <section className="w-full max-w-3xl mt-12 space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold">How to download Bluesky videos</h2>
        <ol className="list-decimal pl-5 space-y-2 text-sm md:text-base text-gray-700 text-left">
          <li>Open Bluesky and go to the post with the video or GIF you want.</li>
          <li>Tap the three dots on the post and copy the link.</li>
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
        <h2 className="text-xl md:text-2xl font-semibold">Why some Bluesky downloads have no sound</h2>
        <p className="text-sm md:text-base text-gray-700 text-left">
          Platforms often store audio and video separately. Some downloaders only capture the video stream, which leaves you with
          a silent file. BlueVideoSaver detects and combines both streams into a single MP4 whenever audio is available, so your
          saved videos include sound.
        </p>
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
    </main>
  );
}
