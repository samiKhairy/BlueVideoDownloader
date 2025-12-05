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
        <p className="mt-4">Follow these steps to download Bluesky videos on Android with BlueVideoSaver.</p>
        <ol className="list-decimal pl-5 space-y-2 mt-4">
          <li>Open Bluesky, tap the three dots on the post, and copy the link.</li>
          <li>Open Chrome or your mobile browser and visit bluevideosaver.com.</li>
          <li>Paste the link, tap Download, and save the MP4 file when prompted.</li>
        </ol>
        <p className="mt-4 text-sm text-gray-600">Downloads save to your device’s Files/Downloads folder by default.</p>
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
          Bluesky often stores audio and video separately. If a downloader only fetches the video stream, you’ll get a silent
          MP4. BlueVideoSaver detects both streams and merges them when audio is available.
        </p>
        <p className="mt-4">
          If you still get silence, the post may have been uploaded without audio or may be restricted in your region.
        </p>
      </>
    )
  }
];

export const BLOG_POST_MAP = new Map(BLOG_POSTS.map((post) => [post.slug, post]));
