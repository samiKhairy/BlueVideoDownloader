export const metadata = {
  title: 'About - Bluesky Video Downloader',
  description: 'Learn about the Bluesky video downloader service.'
};

export default function AboutPage(): React.ReactElement {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 space-y-4 text-slate-900">
      <h1 className="text-3xl font-bold">About Bluesky Video Downloader</h1>
      <p className="text-slate-700">
        This tool resolves direct MP4 links from public Bluesky posts so you can save videos and thumbnails for personal
        use. Processing happens server-side and we never store your URLs.
      </p>
      <p className="text-slate-700">
        For support or feedback, open an issue on the repository or contact the maintainer.
      </p>
    </main>
  );
}
