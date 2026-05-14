# BLUESKY DOWNLOAD BOT — FULL SPECIFICATION

## Give this entire file to GitHub Copilot as a prompt

---

## Overview

Build a Bluesky bot using the AT Protocol (`@atproto/api` npm package) that:
1. Monitors notifications for mentions of its own handle
2. When mentioned in a reply to a post that contains a video, replies with a download link
3. Runs as a long-polling Node.js process (not serverless)
4. Deploys to Fly.io free tier via Dockerfile

## Tech stack

- Runtime: Node.js 20+ with TypeScript
- Package: `@atproto/api` (Bluesky's official AT Protocol SDK)
- No framework needed — this is a simple polling script
- Environment variables for credentials

## Project structure

```
bluesky-bot/
├── src/
│   └── index.ts          # Main bot logic
├── Dockerfile            # For Fly.io deployment
├── fly.toml              # Fly.io config
├── package.json
├── tsconfig.json
└── .env.example
```

## Environment variables (.env.example)

```
BSKY_HANDLE=bluevideosaver.bsky.social
BSKY_PASSWORD=your-app-password-here
SITE_URL=https://bluevideosaver.com
POLL_INTERVAL_MS=30000
```

IMPORTANT: Use a Bluesky "App Password" (Settings → App Passwords → Add), NOT the main 
account password. App passwords are scoped and revocable.

## Main bot logic (src/index.ts)

### 1. Authentication

```
- Import BskyAgent from @atproto/api
- Create agent with service: 'https://bsky.social'
- Login with BSKY_HANDLE and BSKY_PASSWORD
- Log "Bot logged in as {handle}"
- Handle auth errors gracefully — retry login after 60 seconds if it fails
```

### 2. Polling loop

```
- Keep track of last seen notification timestamp (seenAt cursor)
- Every POLL_INTERVAL_MS (default 30 seconds):
  1. Call agent.listNotifications({ limit: 20 })
  2. Filter for notifications where:
     - reason === 'mention'
     - isRead === false (or indexedAt > lastSeenTimestamp)
  3. For each unread mention:
     a. Get the mention post's record (the reply that mentions the bot)
     b. Check if the mention post has a reply.parent reference
     c. If yes, fetch the parent post using agent.getPostThread({ uri: parentUri, depth: 0 })
     d. Check if the parent post has an embed of type 'app.bsky.embed.video#view'
        OR 'app.bsky.embed.video' in the record
     e. If the parent post has a video:
        - Extract the post's web URL from the URI:
          URI format: at://did:plc:xxxxx/app.bsky.feed.post/rkey
          Web URL: https://bsky.app/profile/{handle}/post/{rkey}
          Get the handle from the parent post's author.handle
        - Build download URL: {SITE_URL}?url={encoded_bsky_web_url}
        - Reply to the mention with the download link
     f. If no video found, reply with a polite message saying the parent post
        doesn't contain a video
  4. After processing, mark notifications as read using agent.updateSeenNotifications()
  5. Update lastSeenTimestamp
```

### 3. Reply format

When a video IS found, reply with:
```
🎬 Download this video:
{SITE_URL}?url={encoded_post_url}

Paste that link on bluevideosaver.com to save the MP4.
Free, no watermark, no signup.
```

When NO video is found, reply with:
```
I couldn't find a video in that post. 
Make sure you're replying to a post that contains a video or GIF.
```

### 4. Reply implementation

```
- Use agent.post() to create the reply
- Set the reply reference: { root: rootRef, parent: parentRef }
  where parentRef is the mention post (so the reply threads correctly)
- Include a facet (richtext link) for the download URL so it's clickable
- Use RichText from @atproto/api to handle facet creation:
  const rt = new RichText({ text: replyText })
  await rt.detectFacets(agent)
  Then use rt.text and rt.facets in the post
```

### 5. Rate limiting and safety

```
- Maximum 10 replies per polling cycle (prevent spam if flooded)
- 2-second delay between replies (don't hammer the API)
- Skip posts older than 1 hour (don't reply to ancient mentions on startup)
- Track replied-to URIs in a Set (in-memory) to avoid double replies
  - Clear the Set when it exceeds 1000 entries (keep only recent 500)
- Catch and log all errors per notification — don't let one bad notification crash the loop
- If the API returns a rate limit error (429), back off for 60 seconds
- Wrap the entire poll cycle in try/catch — log errors and continue
```

### 6. Startup

```
- Load env vars (use dotenv for local dev, real env vars in production)
- Validate that BSKY_HANDLE and BSKY_PASSWORD are set
- Login to Bluesky
- Mark all current notifications as seen (don't reply to historical mentions)
- Start the polling loop with setInterval
- Log "Bot started, polling every {POLL_INTERVAL_MS}ms"
```

### 7. Graceful shutdown

```
- Listen for SIGTERM and SIGINT
- Log "Shutting down..."
- Clear the polling interval
- Process.exit(0)
```

## package.json

```json
{
  "name": "bluevideosaver-bot",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsx src/index.ts"
  },
  "dependencies": {
    "@atproto/api": "^0.13.0",
    "dotenv": "^16.4.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "tsx": "^4.0.0",
    "typescript": "^5.5.0"
  }
}
```

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

## Dockerfile (for Fly.io)

```dockerfile
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --production=false
COPY . .
RUN npm run build
RUN npm prune --production
CMD ["node", "dist/index.js"]
```

## fly.toml (Fly.io config)

```toml
app = "bluevideosaver-bot"
primary_region = "iad"

[build]

[env]
  NODE_ENV = "production"
  POLL_INTERVAL_MS = "30000"
  SITE_URL = "https://bluevideosaver.com"

# No HTTP service needed — this is a worker, not a web server
# Fly keeps it alive as a "machine" without needing to bind a port
```

NOTE: Secrets (BSKY_HANDLE, BSKY_PASSWORD) are set via Fly CLI:
  fly secrets set BSKY_HANDLE=bluevideosaver.bsky.social
  fly secrets set BSKY_PASSWORD=your-app-password

## Fly.io deployment steps

1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
   (or on Windows: `powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"`)
2. Sign up: `fly auth signup` (free, no credit card)
3. From the bot project directory: `fly launch`
   - It will detect the Dockerfile
   - Choose region: iad (US East) or any nearby
   - Say NO to database, NO to Redis
4. Set secrets:
   `fly secrets set BSKY_HANDLE=bluevideosaver.bsky.social BSKY_PASSWORD=your-app-password`
5. Deploy: `fly deploy`
6. Check logs: `fly logs`

The bot will run as a "machine" (not a web service) — Fly keeps it alive 24/7.
If it crashes, Fly restarts it automatically.

## Testing locally

1. Create a Bluesky account for the bot (e.g., bluevideosaver.bsky.social)
2. Go to Settings → App Passwords → create one
3. Copy .env.example to .env and fill in credentials
4. `npm install && npm run dev`
5. From another Bluesky account, reply to a video post and mention @bluevideosaver.bsky.social
6. The bot should reply within 30 seconds with a download link

## Edge cases to handle

- Mention is in a thread but the immediate parent has no video → walk up to the root
  post and check that too, but only 1 level up (don't crawl entire threads)
- Post has multiple embeds → check for video in any embed type  
- Post uses app.bsky.embed.recordWithMedia (quote post with video) → extract
  the video from the media portion
- Bot gets mentioned in its own reply thread → ignore (check if author is self)
- Duplicate mentions (same user mentions bot twice) → skip if already replied
  to that parent post URI