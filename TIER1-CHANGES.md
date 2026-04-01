# Tier 1 Emergency Fixes — Deploy Checklist

## Files Changed (4 files)

### 1. app/layout.tsx
- **FIX:** Canonical tag `/https://bluevideosaver.com` → `/`
  - Was creating phantom 404 at `https://bluevideosaver.com/https:/bluevideosaver.com` (confirmed in GSC)
- **FIX:** Uncommented SoftwareApplication JSON-LD schema
  - Was defined but wrapped in {/* */} — never shipped to production

### 2. app/page.tsx  
- **ADD:** FAQPage JSON-LD schema (5 Q&A pairs) for homepage rich results
- **ADD:** HowTo JSON-LD schema (3-step download process) for rich results
- **REFACTOR:** FAQ section now renders from data array (DRY with schema)
- **FIX:** Internal link `/blog/bluesky-download-no-sound` → `/blog/bluesky-download-no-sound-expanded`
  (short version is de-indexed by Google; expanded version is the one ranking)

### 3. app/blog/posts.tsx
- **FIX:** "(2025 Guide)" → "(2026 Guide)" in iPhone post title
- **FIX:** "(2025 Comparison)" → "(2026 Comparison)" in best-downloader post title  
- **FIX:** "quick 2025 look" → "quick 2026 look" in best-downloader body

### 4. next.config.mjs
- **ADD:** 301 permanent redirect `/blog/bluesky-download-no-sound` → `/blog/bluesky-download-no-sound-expanded`
  (consolidates link equity from duplicate no-sound pages)

## Deploy Steps
1. Copy these 4 files into your repo, replacing the originals
2. Run `npm run build` locally to verify no errors
3. Push to your Vercel branch
4. After deploy, verify:
   - View source on homepage → search for "application/ld+json" (should find 3: software, faq, howto)
   - Check `<link rel="canonical">` in head → should be `https://bluevideosaver.com/`
   - Visit `/blog/bluesky-download-no-sound` → should 301 to expanded version
5. In GSC: Request re-indexing of homepage via URL Inspection tool
6. In GSC: Request removal of the 404 URL `https://bluevideosaver.com/https:/bluevideosaver.com`

## Expected Impact
- **Canonical fix:** Stops Google from crawling a phantom 404, consolidates homepage authority
- **JSON-LD schemas:** Enables FAQ rich snippets + HowTo rich snippets in search results
- **Year update:** Signals freshness to Google and users (stale dates hurt CTR)
- **301 redirect:** Stops keyword cannibalization between two no-sound pages
