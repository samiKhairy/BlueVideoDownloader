import type React from 'react';

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  body: () => React.ReactElement;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'download-bluesky-video-iphone',
    title: 'How to Download Bluesky Videos on iPhone (2025 Guide)',
    description: 'Step-by-step guide to saving Bluesky videos from Bluesky to your iPhone using BlueVideoSaver.',
    excerpt: 'Save Bluesky videos to your iPhone Photos or Files app with BlueVideoSaver in a few taps.',
    body: () => (
      <>
        <p className="mt-4">
          This guide shows you how to save Bluesky videos to your iPhone using Safari and BlueVideoSaver. It works on iOS 17+
          without installing anything.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Step 1: Copy the Bluesky link</h2>
        <ol className="list-decimal pl-5 space-y-2 mt-2">
          <li>Open the Bluesky app and find the post with the video.</li>
          <li>Tap the three dots icon on the post.</li>
          <li>Select <strong>Copy link</strong>.</li>
        </ol>

        <h2 className="mt-6 text-xl font-semibold">Step 2: Open BlueVideoSaver in Safari</h2>
        <ol className="list-decimal pl-5 space-y-2 mt-2">
          <li>
            Open Safari and go to{' '}
            <a href="https://bluevideosaver.com" className="underline" rel="noreferrer">
              bluevideosaver.com
            </a>
            .
          </li>
          <li>Paste the link into the box at the top of the page.</li>
          <li>Tap <strong>Download</strong>.</li>
        </ol>

        <h2 className="mt-6 text-xl font-semibold">Step 3: Save the video to Photos or Files</h2>
        <p className="mt-2">
          When the download starts, Safari may ask where to save the file. Choose either the <strong>Files</strong> app or
          download it and then move it to <strong>Photos</strong> if you want it in your Camera Roll.
        </p>

        <p className="mt-6 text-sm text-gray-600">
          Tip: Add BlueVideoSaver to your Home Screen from Safari’s share menu to use it like an app.
        </p>

        <p className="mt-6 text-sm text-gray-600">
          Need Android steps? Read the{' '}
          <a href="/blog/download-bluesky-video-android" className="underline" rel="noreferrer">
            Android guide
          </a>
          . If your file has no audio, see{' '}
          <a href="/blog/bluesky-download-no-sound" className="underline" rel="noreferrer">
            why some downloads are silent
          </a>
          .
        </p>
      </>
    )
  },
  {
    slug: 'download-bluesky-video-android',
    title: 'How to Download Bluesky Videos on Android',
    description: 'Use your mobile browser with BlueVideoSaver to save Bluesky videos to your Android device.',
    excerpt: 'Quick steps for downloading Bluesky videos on Android with BlueVideoSaver in Chrome.',
    body: () => (
      <>
        <p className="mt-4">
          Use your Android browser with BlueVideoSaver to grab Bluesky videos as MP4 files—no installs or signups.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Step 1: Copy the link from the Bluesky app</h2>
        <ol className="list-decimal pl-5 space-y-2 mt-2">
          <li>Open the Bluesky app and find the post with the video or GIF.</li>
          <li>Tap the three dots on the post.</li>
          <li>Select <strong>Copy link</strong>.</li>
        </ol>

        <h2 className="mt-6 text-xl font-semibold">Step 2: Open BlueVideoSaver in your browser</h2>
        <ol className="list-decimal pl-5 space-y-2 mt-2">
          <li>Open Chrome, Firefox, or your preferred mobile browser.</li>
          <li>
            Go to{' '}
            <a href="https://bluevideosaver.com" className="underline" rel="noreferrer">
              bluevideosaver.com
            </a>
            .
          </li>
        </ol>

        <h2 className="mt-6 text-xl font-semibold">Step 3: Paste and download</h2>
        <ol className="list-decimal pl-5 space-y-2 mt-2">
          <li>Paste the link into the box at the top.</li>
          <li>Tap <strong>Download</strong>.</li>
          <li>Choose where to save the MP4 if your browser prompts you.</li>
        </ol>

        <h2 className="mt-6 text-xl font-semibold">Step 4: Find your file</h2>
        <p className="mt-2">
          Most Android browsers save to the <strong>Downloads</strong> folder. Check your Files app or gallery; some gallery apps
          show recent downloads automatically.
        </p>

        <h3 className="mt-6 text-lg font-semibold">Tips</h3>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>Add BlueVideoSaver to your Home Screen from your browser menu for faster access.</li>
          <li>Use Wi‑Fi for large files to avoid heavy data usage.</li>
          <li>
            If you get no audio, read{' '}
            <a href="/blog/bluesky-download-no-sound" className="underline" rel="noreferrer">
              our sound troubleshooting guide
            </a>
            .
          </li>
        </ul>

        <p className="mt-6 text-sm text-gray-600">
          Ready to download? Paste your link on the{' '}
          <a href="/" className="underline" rel="noreferrer">
            homepage
          </a>{' '}
          to start.
        </p>
      </>
    )
  },
  {
    slug: 'bluesky-download-no-sound',
    title: 'Why Your Bluesky Download Has No Sound (And How to Fix It)',
    description: 'Understand why some Bluesky downloads are silent and how BlueVideoSaver merges audio + video streams.',
    excerpt: 'Some tools miss the audio track. BlueVideoSaver merges audio and video so you get sound.',
    body: () => (
      <>
        <p className="mt-4">
          Some tools return MP4 files with no audio because they only grab the video stream. Bluesky often splits video and
          audio into separate tracks (HLS). If the downloader skips the audio track, the final file is silent.
        </p>

        <h2 className="mt-6 text-xl font-semibold">How BlueVideoSaver fixes it</h2>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>Detects when audio and video are separate.</li>
          <li>Downloads both streams when available.</li>
          <li>Merges them into a single MP4 so you keep the soundtrack.</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">When there still might be no sound</h2>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>The original post has no audio track or was uploaded muted.</li>
          <li>A network hiccup caused a partial download; try again on Wi‑Fi.</li>
          <li>On iPhone, check the mute switch or system volume if playback is muted.</li>
        </ul>

        <p className="mt-6 text-sm text-gray-700">
          Need device help? See the{' '}
          <a href="/blog/download-bluesky-video-iphone" className="underline" rel="noreferrer">
            iPhone guide
          </a>{' '}
          and{' '}
          <a href="/blog/download-bluesky-video-android" className="underline" rel="noreferrer">
            Android guide
          </a>
          . Or start a fresh download on the{' '}
          <a href="/" className="underline" rel="noreferrer">
            homepage
          </a>
          .
        </p>
      </>
    )
  },
  {
    slug: 'download-private-bluesky-videos',
    title: 'Can You Download Videos from Private Bluesky Accounts? [Honest Answer]',
    description:
      'Understand the limits of downloading private Bluesky posts and what BlueVideoSaver can and cannot do.',
    excerpt: 'Private Bluesky posts cannot be downloaded without access—BlueVideoSaver works with public content only.',
    body: () => (
      <>
        <p className="mt-4">
          If you do not have access to a private Bluesky account, you cannot download its videos. Tools that promise otherwise
          are risky or misleading.
        </p>

        <h2 className="mt-6 text-xl font-semibold">What BlueVideoSaver does</h2>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>Downloads videos and GIFs from public Bluesky posts.</li>
          <li>Does not bypass permissions, brute-force links, or scrape private content.</li>
          <li>Respects Bluesky’s terms of service and creator rights.</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">FAQ</h2>
        <p className="mt-2">
          <strong>Can others download my private posts?</strong> No—only people who can already view your private post could
          attempt a download. If you revoke access or delete the post, new downloads stop.
        </p>
        <p className="mt-2">
          <strong>If I delete a post, can it still be downloaded?</strong> Once removed from Bluesky, the original media is no
          longer available through BlueVideoSaver.
        </p>

        <p className="mt-6 text-sm text-gray-700">
          Use BlueVideoSaver for public posts by pasting your link on the{' '}
          <a href="/" className="underline" rel="noreferrer">
            homepage
          </a>
          . For sound issues, see{' '}
          <a href="/blog/bluesky-download-no-sound" className="underline" rel="noreferrer">
            the no-sound guide
          </a>
          .
        </p>
      </>
    )
  },
  {
    slug: 'down-blue-alternative',
    title: 'Down.blue Alternative: A More Reliable Bluesky Video Downloader',
    description: 'See how BlueVideoSaver compares to down.blue with better reliability, audio handling, and guides.',
    excerpt: 'BlueVideoSaver focuses on reliability, audio merging, and mobile UX as a down.blue alternative.',
    body: () => (
      <>
        <p className="mt-4">
          Down.blue is a simple Bluesky downloader. If it fails on certain posts or returns silent videos, try BlueVideoSaver
          for a more reliable experience.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Common pain points with down.blue</h2>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>Some posts may fail to download.</li>
          <li>Audio may be missing if the tool skips separate audio tracks.</li>
          <li>Minimal guidance if something goes wrong.</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">Why choose BlueVideoSaver</h2>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>Detects and merges audio + video for files with sound.</li>
          <li>Mobile-friendly controls and guides for iPhone and Android.</li>
          <li>Troubleshooting content for issues like silent downloads.</li>
        </ul>

        <p className="mt-6 text-sm text-gray-700">
          Start by pasting your link on the{' '}
          <a href="/" className="underline" rel="noreferrer">
            homepage
          </a>{' '}
          and, if you hit audio issues, check the{' '}
          <a href="/blog/bluesky-download-no-sound" className="underline" rel="noreferrer">
            no-sound guide
          </a>
          . For device-specific tips, see the{' '}
          <a href="/blog/download-bluesky-video-iphone" className="underline" rel="noreferrer">
            iPhone
          </a>{' '}
          and{' '}
          <a href="/blog/download-bluesky-video-android" className="underline" rel="noreferrer">
            Android
          </a>{' '}
          guides.
        </p>
      </>
    )
  }
];

export const BLOG_POST_MAP = new Map(BLOG_POSTS.map((post) => [post.slug, post]));
