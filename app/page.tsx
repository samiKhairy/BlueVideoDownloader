'use client';

import { useCallback, useMemo, useState } from 'react';

 type ExtractionResponse = {
  video_url: string;
  thumbnail_url?: string | null;
};

 type StatusVariant = 'success' | 'error' | 'warning' | 'info';

 const statusClasses: Record<StatusVariant, string> = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  error: 'bg-rose-50 border-rose-200 text-rose-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
  info: 'bg-sky-50 border-sky-200 text-sky-800'
};

export default function HomePage(): React.ReactElement {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<{ message: string; variant: StatusVariant } | null>(null);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const hasResults = useMemo(() => Boolean(videoUrl || thumbnailUrl), [videoUrl, thumbnailUrl]);

  const showStatus = useCallback((message: string, variant: StatusVariant = 'info') => {
    setStatus({ message, variant });
  }, []);

  const clearStatus = useCallback(() => setStatus(null), []);

  const copyToClipboard = useCallback(
    async (text: string, onSuccess: string, onFailure: string) => {
      try {
        await navigator.clipboard.writeText(text);
        showStatus(onSuccess, 'success');
      } catch (error) {
        console.error('Clipboard write failed', error);
        showStatus(onFailure, 'warning');
      }
    },
    [showStatus]
  );

  const pasteFromClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text.trim());
        showStatus('URL pasted from clipboard. Ready to fetch.', 'info');
      }
    } catch (error) {
      console.error('Clipboard read failed', error);
      showStatus('Clipboard access blocked. Paste manually.', 'warning');
    }
  }, [showStatus]);

  const requestExtraction = useCallback(
    async (event?: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault();
      clearStatus();
      setLoading(true);

      const normalizedUrl = url.trim();
      if (!normalizedUrl) {
        showStatus('Please enter a Bluesky post URL.', 'error');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/extract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: normalizedUrl })
        });

        const data: ExtractionResponse & { error?: string } = await response.json();
        if (!response.ok || data.error) {
          throw new Error(data.error || 'Unable to process this URL.');
        }

        if (!data.video_url) {
          throw new Error('No video URL found for this post.');
        }

        setVideoUrl(data.video_url);
        setThumbnailUrl(data.thumbnail_url || '');
        showStatus('Links generated successfully. Start your download or copy the URL.', 'success');
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unexpected error';
        showStatus(message, 'error');
        setVideoUrl('');
        setThumbnailUrl('');
      } finally {
        setLoading(false);
      }
    },
    [clearStatus, showStatus, url]
  );

  const startDownload = useCallback(
    (kind: 'video' | 'thumbnail') => {
      const mediaUrl = kind === 'thumbnail' ? thumbnailUrl : videoUrl;
      if (!mediaUrl) {
        const message =
          kind === 'thumbnail'
            ? 'No thumbnail available yet. Try generating links first.'
            : 'No video URL yet. Generate the download link first.';
        showStatus(message, 'warning');
        return;
      }

      const filename = kind === 'thumbnail' ? 'bluesky-thumbnail.jpg' : 'bluesky-video.mp4';
      const proxyUrl = `/api/download?url=${encodeURIComponent(mediaUrl)}&filename=${encodeURIComponent(filename)}`;
      window.location.href = proxyUrl;
      showStatus(`${kind === 'thumbnail' ? 'Thumbnail' : 'Video'} download started.`, 'success');
    },
    [showStatus, thumbnailUrl, videoUrl]
  );

  const handleCopy = useCallback(() => {
    if (!videoUrl) {
      showStatus('No video URL to copy yet. Generate links first.', 'warning');
      return;
    }
    void copyToClipboard(
      videoUrl,
      'Video link copied to clipboard.',
      'Could not copy link. Please copy manually.'
    );
  }, [copyToClipboard, showStatus, videoUrl]);

  return (
    <div className="min-h-screen">
      <header className="border-b border-sky-100 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-124.15 -27.47 486 400"
                className="h-full w-full"
                aria-hidden
              >
                <path d="M0 0 C3.89075652 3.21038878 7.58237528 6.6142431 11.24804688 10.07763672 C13.41693548 12.11932734 15.62475182 14.05065358 17.90820312 15.96044922 C22.85787318 20.24345771 27.92336832 24.37110292 33.16601562 28.45532227 C38.55908762 32.66306857 44.08699752 36.68858745 49.71728516 40.59887695 C52.17704617 42.27185558 54.64853658 43.92948771 57.14550781 45.54101562 C60.48286444 47.74706447 63.84455412 49.89841118 67.23681641 51.99267578 C68.53227659 52.79052475 69.83617773 53.57210455 71.14672852 54.34545898 C75.08997808 56.69141238 79.06255671 58.9840974 83.07641602 61.20825195 C86.66351656 63.14712073 90.27183963 65.05555487 93.91650391 66.89990234 C97.67935679 68.8017467 101.4844655 70.60330341 105.34155273 72.29541016 C107.76582775 73.3730259 110.20719643 74.40646359 112.66308594 75.40820312 C119.36436271 78.14682714 126.16525761 80.57498894 133.03857422 82.78735352 C135.22706667 83.52261046 137.43968035 84.18587269 139.66235352 84.82519531 C146.17203191 86.73626947 152.76789438 88.28408025 159.37963867 89.7019043 C163.28302544 90.42396204 167.20281205 91.06040446 171.12963867 91.67041016 C173.50015408 92.03849383 175.88452224 92.33985845 178.26733398 92.64575195 C184.02747025 93.28726157 189.80197727 93.7312032 195.58129883 94.11352539 C197.73415527 94.25876031 199.88721665 94.39953133 202.04052734 94.52124023 C208.19595934 94.93622515 214.35238601 95.16389012 220.51123047 95.30029297 C222.96054457 95.35431713 225.41591178 95.34744592 227.86572266 95.30419922 C232.579781 95.20303992 237.29007036 94.99678888 242.00097656 94.79345703 C250.9131721 94.42884535 259.83623317 93.66382443 268.68652344 92.44189453 C274.4902035 91.74138907 280.2983527 90.88674432 286.03442383 89.70800781 C291.53507175 88.56018549 297.00907597 87.19612933 302.40966797 85.59301758 C306.7431867 84.31143352 311.0436392 82.83614148 315.25878906 81.15356445 C322.11351641 78.45694666 328.78278964 75.26535189 335.24951172 71.68920898 C337.59631295 70.39620417 339.90903575 69.03619068 342.18066406 67.59887695 C345.50602978 65.4259834 348.74105466 63.11231495 351.88378906 60.64819336 C356.84758877 56.84156444 361.5497571 52.7252072 366.05981445 48.39331055 C367.48811835 47.05740129 368.90891734 45.7106187 370.31103516 44.34545898 C373.46702262 41.22604679 376.52238383 38.01313377 379.51196289 34.74731445 C380.92406637 33.19902063 382.32932314 31.64314931 383.70922852 30.06762695 C385.97552052 27.52874093 388.1618844 24.90949666 390.29589844 22.24414062 C392.14517216 19.97078493 394.00641028 17.74161208 395.77807617 15.44116211 C397.64205375 12.97141151 399.3781332 10.39117657 401.05224609 7.77929688 C402.27867838 5.80651431 403.43131415 3.78988927 404.50463867 1.74145508 C406.35258366 -1.74132476 408.14403546 -5.25012449 409.75439453 -8.82568359" />
                <path d="M0 0 C5.6407371 5.83946225 6.49669913 10.61763219 6.390625 18.58203125 C5.45441191 26.77389581 0.74498454 31.63761938 -5.4375 36.6875 C-6.32308594 37.35136719 -7.20867187 38.01523438 -8.12109375 38.703125 C-12.47133851 42.26978815 -16.99714812 45.61981608 -21.66601562 48.6875 C-28.16273169 52.98242562 -34.83268624 56.91700607 -41.77929688 60.171875 C-44.3541174 61.63209641 -46.94901837 63.01211795 -49.59130859 64.29394531 C-53.34327192 66.10260677 -57.15209732 67.78312361 -61.01708984 69.26513672 C-63.39314906 70.18637721 -65.77681065 71.05470218 -68.19482422 71.84863281 C-71.55998496 72.9437935 -74.97291379 73.87666317 -78.41259766 74.70507812 C-81.02500065 75.35482975 -83.67018282 75.92859171 -86.32080078 76.42285156 C-89.89681578 77.08654306 -93.49894222 77.56833899 -97.11279297 77.98583984 C-100.00932657 78.35856648 -102.9165489 78.6115533 -105.82568359 78.81640625 C-107.33818101 78.92622734 -108.84931523 79.05338974 -110.36279297 79.14501953 C-113.23591137 79.30191755 -116.11044019 79.36156935 -118.98583984 79.38037109 C-120.4086311 79.37982002 -121.83075824 79.34930865 -123.25292969 79.3203125 C-126.9370258 79.28135953 -130.60895182 79.10714296 -134.28173828 78.94580078 C-137.43809794 78.82925858 -140.59475858 78.64488245 -143.74804688 78.44482422 C-146.5733177 78.28301719 -149.39863331 78.12304046 -152.21923828 77.9284668" />
                <path d="M0 0 C10.41620767 7.78056414 15.64671495 20.11906944 19.75 32.0625 C20.15424194 33.21818481 20.15424194 33.21818481 20.56665039 34.3972168 C25.78069417 50.51466596 27.71622811 67.80240241 29.82446289 85.01708984" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-semibold text-sky-800">Bluesky Video Downloader</p>
              <p className="text-sm text-slate-600">Paste a link, grab the video.</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 lg:py-16">
        <section className="grid gap-8 lg:grid-cols-5">
          <div className="glass shadow-2xl rounded-3xl p-7 lg:col-span-3 border border-sky-100 bg-white/80">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">Fast</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">Download Bluesky video in seconds</h1>
                <p className="text-base text-slate-600 mt-3">Drop the post URL and get direct buttons for the video and thumbnail.</p>
              </div>
              <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-sm font-semibold">Instant</span>
            </div>

            <form className="mt-6 space-y-3" onSubmit={requestExtraction}>
              <label className="block text-sm font-semibold text-slate-800" htmlFor="urlInput">Bluesky Post URL</label>
              <div className="flex gap-3 flex-col sm:flex-row">
                <input
                  id="urlInput"
                  type="url"
                  inputMode="url"
                  placeholder="https://bsky.app/profile/handle/post/123..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      void requestExtraction();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => void pasteFromClipboard()}
                  className="sm:w-36 w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 font-semibold shadow-sm hover:border-sky-300 hover:text-sky-800 transition"
                >
                  Paste
                </button>
              </div>
              <p className="text-xs text-slate-500">Example: https://bsky.app/profile/john.example/post/abc123</p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl shadow-lg"
                  disabled={loading}
                >
                  <span>{loading ? 'Working...' : 'Get download links'}</span>
                  {loading && (
                    <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden>
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h3z"
                      />
                    </svg>
                  )}
                </button>
                <button
                  type="button"
                  className="sm:w-44 w-full inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-800 font-semibold py-3 rounded-xl shadow-sm hover:border-sky-300"
                  onClick={handleCopy}
                >
                  Copy video link
                </button>
              </div>

              <div className="mt-6 p-5 bg-white/90 border border-blue-200 rounded-2xl text-center shadow-md">
                <p className="text-sm text-gray-800 font-semibold">⚡ Download slow? Your ISP might be throttling social media.</p>
                <a
                  href="https://nordvpn.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center justify-center gap-1 text-blue-700 font-bold hover:underline"
                >
                  Boost download speed with NordVPN
                  <span aria-hidden>&rarr;</span>
                </a>
              </div>

              {status && (
                <div className={`mt-4 p-4 rounded-xl border text-sm ${statusClasses[status.variant]}`}>
                  {status.message}
                </div>
              )}
            </form>

            {hasResults && (
              <div className="mt-6 p-5 bg-white/90 border border-emerald-200 rounded-2xl shadow-md space-y-3">
                <div className="flex items-center justify-start gap-2">
                  <span className="h-3 w-3 block rounded-full bg-emerald-500" aria-hidden />
                  <p className="text-sm text-gray-800 font-semibold">Download ready</p>
                </div>
                <div className="flex gap-3 flex-col sm:flex-row">
                  <button
                    type="button"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl shadow-lg transition"
                    onClick={() => startDownload('video')}
                  >
                    Download video
                  </button>
                  {thumbnailUrl && (
                    <button
                      type="button"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl shadow-lg transition"
                      onClick={() => startDownload('thumbnail')}
                    >
                      Download thumbnail
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <aside className="lg:col-span-2 space-y-4">
            <div className="p-6 bg-white/80 rounded-3xl border border-slate-100 shadow-xl">
              <p className="text-sm font-semibold text-sky-700 uppercase">Safe</p>
              <h2 className="text-2xl font-bold text-slate-900 mt-2">Private and secure</h2>
              <p className="text-sm text-slate-600 mt-3">
                Processing runs server-side. We do not log your URLs and responses are served via HTTPS.
              </p>
            </div>

            <div className="p-6 bg-white/80 rounded-3xl border border-slate-100 shadow-xl">
              <p className="text-sm font-semibold text-sky-700 uppercase">Reliable</p>
              <h2 className="text-2xl font-bold text-slate-900 mt-2">Direct MP4 links</h2>
              <p className="text-sm text-slate-600 mt-3">
                We resolve progressive MP4 streams first. If unavailable, we fall back to the best available format for quick downloads.
              </p>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
