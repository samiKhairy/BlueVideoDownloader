# BlueVideoSaver Chrome Extension

A minimal, privacy-friendly Chrome extension that injects a download button directly into Bluesky (bsky.app) posts, allowing users to download videos, GIFs, and images with a single click.

## How to install locally (Unpacked)
1. Open Chrome and navigate to `chrome://extensions`.
2. Turn on **Developer mode** in the top right corner.
3. Click **Load unpacked** in the top left.
4. Select this `chrome-extension` folder.
5. The extension is now installed and active!

## How to test
1. Open [bsky.app](https://bsky.app) in your browser.
2. Scroll through your feed or search for a video/GIF.
3. Look at the action bar (where the reply, repost, and like buttons are) on any post containing media.
4. You should see a small download icon. Click it!
5. It will automatically open BlueVideoSaver in a new tab with the URL pre-filled.

## How to publish to the Chrome Web Store
1. Go to the [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole/).
2. Pay the $5 one-time developer registration fee if you haven't already.
3. Zip this entire folder: `zip -r bluevideosaver-extension.zip chrome-extension/`
4. Click **New Item** and upload the `.zip` file.
5. Fill out the store listing details, provide a promotional image, and submit for review!

### Privacy & Security Constraints
This extension is designed to easily pass Chrome Web Store review:
- **No data collection:** It does not track, store, or transmit user data.
- **No remote code:** It does not use `eval()` or fetch remote scripts.
- **Scoped permissions:** It only requests permission for `bsky.app`.
- **Zero background processing:** It only acts when you click the download button.
