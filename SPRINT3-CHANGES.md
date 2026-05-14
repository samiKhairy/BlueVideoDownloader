# Sprint 3 — Multi-Language Pages

## New files (3)
- `app/pt/page.tsx` — Full Portuguese landing page (targeting Brazil: 180 impressions, 1 click)
- `app/es/page.tsx` — Full Spanish landing page (targeting Spain: 58 impr + Mexico: 35 impr)
- `app/sitemap.xml/route.ts` — Updated with /pt, /es routes + xhtml:link hreflang tags

## Modified files (1)
- `app/layout.tsx` — Added hreflang alternates (en, pt, es) to metadata

## What each language page includes
- Fully translated H1, descriptions, trust signals, how-to steps, features, FAQs
- FAQPage JSON-LD schema (in the target language)
- HowTo JSON-LD schema (in the target language, with `inLanguage` set)
- Proper `<meta>` alternates + canonical pointing to itself
- Language switcher (English | Português | Español) at the top
- Same DownloadTool component (button text stays English — users know "Download")

## SEO impact
- **Hreflang signals** tell Google to show /pt to Portuguese searchers, /es to Spanish
- **No competitor** has Portuguese or Spanish pages — you own this niche
- **Brazilian traffic** (180 impressions) should start clicking — the page now speaks their language
- **Spanish traffic** (Spain 58 + Mexico 35 + Argentina 16 + Chile 16 = 125 impressions) same story
- **Sitemap** includes xhtml:link hreflang for proper cross-language discovery

## Deploy steps
1. Copy all files into your repo:
   ```
   app/
     pt/page.tsx          (new)
     es/page.tsx          (new)
     layout.tsx           (replace — adds hreflang to existing Sprint 1 layout)
     sitemap.xml/route.ts (replace)
   ```
2. `npm run build` → verify
3. Push to Vercel
4. After deploy:
   - Visit /pt — should show Portuguese content
   - Visit /es — should show Spanish content
   - Visit /sitemap.xml — should show /pt and /es entries with hreflang links
   - Language switcher links should work on all 3 pages
5. In GSC: Request indexing for /pt and /es

## Data backing this decision (from GSC)
| Country | Impressions | Clicks | CTR | Language |
|---------|------------|--------|-----|----------|
| Brazil | 180 | 1 | 0.56% | Portuguese |
| Spain | 58 | 4 | 6.9% | Spanish |
| Mexico | 35 | 2 | 5.7% | Spanish |
| Portugal | 28 | 3 | 10.7% | Portuguese |
| Argentina | 16 | 0 | 0% | Spanish |
| Chile | 16 | 0 | 0% | Spanish |
| Colombia | 4 | 0 | 0% | Spanish |
| **Total PT** | **208** | **4** | **1.9%** | |
| **Total ES** | **129** | **6** | **4.7%** | |

337 combined impressions being served English content. With native language pages, expect CTR to at least double.

## Bot hosting (for later)
Best free option: **Fly.io** — 3 free shared-cpu VMs, perfect for a lightweight Node.js bot.
- Sign up at fly.io (no credit card needed for free tier)
- Deploy a simple Node.js process that monitors @bluevideosaver.bsky.social mentions
- Bot replies with download links pointing to bluevideosaver.com
- This bypasses SEO entirely — direct traffic at the moment users want to download
