import type React from 'react';

export const metadata = {
  title: 'About BlueVideoSaver – Free Bluesky Video & GIF Downloader',
  description:
    'BlueVideoSaver is a free tool that downloads Bluesky videos and GIFs as MP4 files. No watermark, no signup, server-side processing.'
};

export default function AboutPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 space-y-6">
      <h1 className="text-2xl font-bold">About BlueVideoSaver</h1>

      <p className="text-slate-700">
        BlueVideoSaver is a free web-based tool that lets you download videos and GIF-style posts
        from Bluesky as MP4 files. It works on iPhone, Android, iPad, Windows, Mac, and Chromebook —
        entirely in your browser with no app or extension required.
      </p>

      <h2 className="text-lg font-semibold mt-8">How it works</h2>
      <p className="text-slate-700">
        When you paste a Bluesky post URL, our server resolves the direct MP4 stream from the post.
        If Bluesky stores audio and video separately (common with HLS streams), we merge both into a
        single file so your download includes sound. The original quality is preserved — we never
        re-encode or add watermarks.
      </p>

      <h2 className="text-lg font-semibold mt-8">Privacy</h2>
      <p className="text-slate-700">
        We do not store your URLs, downloaded files, or personal data. All processing happens
        server-side per request and responses are served over HTTPS. We use minimal analytics
        (Google Analytics with anonymized IPs) to understand usage patterns.
      </p>

      <h2 className="text-lg font-semibold mt-8">Legal</h2>
      <p className="text-slate-700">
        BlueVideoSaver is intended for downloading public content for personal use. We respect
        Bluesky&apos;s terms of service and creator rights. Private or restricted posts cannot be
        downloaded. Always credit original creators when sharing downloaded content.
      </p>

      <h2 className="text-lg font-semibold mt-8">Contact</h2>
      <p className="text-slate-700">
        For support, feedback, or takedown requests, please reach out via the project repository or
        contact the maintainer directly.
      </p>
    </div>
  );
}
