# Sprint 2 — Content Overhaul

## Files changed (2)

### app/blog/posts.tsx — Title rewrites + comparison page rewrite
**Title rewrites for 0-click pages:**
| Page | Old Title | New Title | Why |
|------|-----------|-----------|-----|
| iPad | "Bluesky Video Downloader for iPad" | "Download Bluesky Videos on iPad — Free, No App Needed (2026)" | pos 5.3, 151 impr, 0 clicks |
| Down.blue | "Down.blue Alternative: ..." | "Down.blue Not Working? Try BlueVideoSaver — Free..." | pos 7.9, 288 impr, 1 click |
| Windows | "How to Download Bluesky Videos on Windows" | "...Windows — Chrome, Edge, Firefox (2026)" | pos 29.6, 142 impr, 0 clicks |
| Comparison | "Best Bluesky Video Downloaders (2026 Comparison)" | "...Compared — Features, Audio, Speed (2026)" | pos 4.7, 79 impr, 0 clicks |
| Android | "How to Download Bluesky Videos on Android" | added "(2026)" | missing year |
| GIF | "How to Save Bluesky GIFs as MP4" | "Bluesky GIF Downloader — Save... (Free, 2026)" | match ranking keywords |

**Comparison page body rewrite:**
- OLD: 3 bullet points saying "BlueVideoSaver wins" (embarrassing)
- NEW: Real competitor analysis with 5 tools:
  - BlueVideoSaver (server-side, audio merge, device guides)
  - down.blue/notx.blue (open source, Bluesky bot, WASM conversion, GIF export, iOS Shortcut)
  - BskySaver (multiple resolutions)
  - BskyDownloader (MP4/TS formats, progress bar)
  - Publer (part of social media suite)
- Includes "which one should you use?" decision guide
- Honest about competitor strengths (down.blue bot, real GIF export)

### next.config.mjs — Additional 301 redirects
Added 2 new redirects for thin de-indexed pages:
- `/blog/bluesky-links-wont-copy` → `/` (homepage)
- `/blog/where-are-bluesky-downloads-saved` → `/` (homepage)
(Tier 1 redirect for no-sound duplicate is preserved)

## Deploy steps
1. Copy `app/blog/posts.tsx` over your current version
2. Copy `next.config.mjs` over your current version
3. `npm run build` → verify
4. Push to Vercel
5. After deploy:
   - Check that `/blog/bluesky-links-wont-copy` redirects to homepage
   - Check that `/blog/where-are-bluesky-downloads-saved` redirects to homepage
   - View the comparison page — should have real competitor data
   - Check the iPad page title in view-source

## Expected SEO impact
- **0-click pages get compelling titles** → CTR should improve for 500+ monthly impressions
- **Comparison page** has real content → may earn backlinks and featured snippets
- **GIF title** now matches ranking keywords → reinforces topical relevance
- **301 redirects** consolidate link equity from thin pages → cleaner crawl profile
- **Year tags (2026)** signal freshness → affects click-through in SERPs

## What's next (Sprint 3)
- Build Bluesky bot (@bluevideosaver.bsky.social)
- Add Portuguese/Spanish homepage variants
- Apply for Google AdSense
- Add GIF format conversion backend (ffmpeg-static)
- Expand GIF guide to 1200+ words with screenshots
