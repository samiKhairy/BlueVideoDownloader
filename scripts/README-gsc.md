# Google Search Console report script

Pulls Search Analytics data for `sc-domain:bluevideosaver.com` via the
Search Console API. Read-only.

## One-time setup

### 1. Google Cloud project + API
1. Go to https://console.cloud.google.com/ (use the same Google account that owns the GSC property).
2. Create or pick a project.
3. **APIs & Services → Library →** search **"Google Search Console API" → Enable**.

### 2. Service account + key
1. **APIs & Services → Credentials → Create credentials → Service account.**
2. Name it (e.g. `gsc-reader`), create. No roles needed.
3. Open the service account → **Keys → Add key → Create new key → JSON**. A `.json` file downloads.
4. Save it as `secrets/gsc-key.json` in this repo (the `secrets/` folder is git-ignored — see below).
5. Copy the service account **email** (looks like `gsc-reader@your-project.iam.gserviceaccount.com`).

### 3. Grant it access in Search Console
1. Open https://search.google.com/search-console
2. **Settings → Users and permissions → Add user.**
3. Paste the service-account email, permission **Restricted** (read) is enough. Add.

### 4. Install the client library
```
npm install googleapis
```

## Usage

```bash
# default: last 28 days, top 25 queries
npm run gsc

# top 50 pages, last 90 days
node scripts/gsc-report.mjs --dimension page --limit 50 --days 90

# explicit date range
node scripts/gsc-report.mjs --start 2026-05-01 --end 2026-05-31

# export CSV
node scripts/gsc-report.mjs --dimension query --csv > queries.csv

# other dimensions: query | page | country | device | date | searchAppearance
```

Override defaults with env vars: `GSC_KEY_FILE`, `GSC_SITE_URL`.

## Security
- Never commit `secrets/gsc-key.json`. It's a credential.
- Add `secrets/` to `.gitignore` (done automatically by setup).
