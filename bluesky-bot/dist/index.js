import { BskyAgent, RichText } from '@atproto/api';
import dotenv from 'dotenv';
dotenv.config();
const BSKY_HANDLE = process.env.BSKY_HANDLE;
const BSKY_PASSWORD = process.env.BSKY_PASSWORD;
const SITE_URL = process.env.SITE_URL || 'https://bluevideosaver.com';
const POLL_INTERVAL_MS = Number(process.env.POLL_INTERVAL_MS || 30000);
if (!BSKY_HANDLE || !BSKY_PASSWORD) {
    console.error('BSKY_HANDLE and BSKY_PASSWORD are required. Set them in env vars or .env.');
    process.exit(1);
}
const agent = new BskyAgent({ service: 'https://bsky.social' });
const repliedSet = new Set();
const MAX_REPLIED_CACHE = 1000;
function addReplied(uri) {
    repliedSet.add(uri);
    if (repliedSet.size > MAX_REPLIED_CACHE) {
        const toKeep = Array.from(repliedSet).slice(-500);
        repliedSet.clear();
        toKeep.forEach((x) => repliedSet.add(x));
    }
}
function hasVideoEmbed(record) {
    if (!record)
        return false;
    const embeds = [];
    if (record.embed) {
        embeds.push(record.embed);
    }
    if (Array.isArray(record.embeds)) {
        embeds.push(...record.embeds);
    }
    for (const e of embeds) {
        if (!e || typeof e !== 'object')
            continue;
        if (e['$type'] === 'app.bsky.embed.video#view' || e['$type'] === 'app.bsky.embed.video') {
            return true;
        }
        if (e['$type'] === 'app.bsky.embed.recordWithMedia' && e.record?.embed) {
            const nested = e.record.embed;
            if (nested['$type'] === 'app.bsky.embed.video#view' || nested['$type'] === 'app.bsky.embed.video')
                return true;
        }
    }
    return false;
}
function buildDownloadReply(postUrl) {
    return `🎬 Download this video:\n${SITE_URL}?url=${encodeURIComponent(postUrl)}\n\nPaste that link on bluevideosaver.com to save the MP4.\nFree, no watermark, no signup.`;
}
function buildNoVideoReply() {
    return "I couldn't find a video in that post. Make sure you're replying to a post that contains a video or GIF.";
}
async function login() {
    while (true) {
        try {
            const success = await agent.login({ identifier: BSKY_HANDLE, password: BSKY_PASSWORD });
            console.log('Bot logged in as', success.data.handle || BSKY_HANDLE);
            return;
        }
        catch (err) {
            console.error('Login failed, retrying in 60s', err);
            await new Promise((resolve) => setTimeout(resolve, 60000));
        }
    }
}
async function markAllNotificationsSeen() {
    try {
        const notifications = await agent.listNotifications({ limit: 20 });
        if (notifications.data?.cursor) {
            await agent.updateSeenNotifications(new Date().toISOString());
        }
    }
    catch (err) {
        console.warn('Could not mark notifications seen on startup', err);
    }
}
function extractPostUrlFromUri(uri, authorHandle) {
    // at://did:plc:xxxxx/app.bsky.feed.post/rkey
    const parts = uri.split('/');
    const rkey = parts[parts.length - 1];
    return `https://bsky.app/profile/${authorHandle}/post/${rkey}`;
}
async function processNotifications() {
    try {
        const response = await agent.listNotifications({ limit: 20 });
        const notifications = response.data?.notifications ?? [];
        if (notifications.length === 0)
            return;
        const mentions = notifications.filter((n) => n.reason === 'mention');
        let repliesThisCycle = 0;
        for (const mention of mentions) {
            if (repliesThisCycle >= 10)
                break;
            try {
                const mentionUri = mention.uri;
                if (!mentionUri)
                    continue;
                if (mention.indexedAt && new Date().getTime() - new Date(mention.indexedAt).getTime() > 1000 * 60 * 60) {
                    continue; // skip old mention
                }
                if (mention.author?.handle === BSKY_HANDLE)
                    continue; // ignore self
                const replyRecord = mention.record;
                const parentUri = replyRecord?.reply?.parent?.uri;
                if (!parentUri) {
                    continue;
                }
                if (repliedSet.has(parentUri))
                    continue;
                const parentThread = await agent.getPostThread({ uri: parentUri, depth: 0 });
                const parentPost = parentThread.data?.thread;
                if (!parentPost || parentPost.$type?.endsWith('NotFound') || parentPost.$type?.endsWith('Blocked'))
                    continue;
                const targetPost = parentPost;
                const hasVid = hasVideoEmbed(targetPost.record);
                const targetPostUrl = extractPostUrlFromUri(targetPost.uri, targetPost.author.handle);
                const replyText = hasVid ? buildDownloadReply(targetPostUrl) : buildNoVideoReply();
                const richText = new RichText({ text: replyText });
                await richText.detectFacets(agent);
                await agent.post({
                    text: richText.text,
                    facets: richText.facets,
                    reply: {
                        root: mentionUri,
                        parent: mentionUri
                    }
                });
                if (hasVid) {
                    console.log('Replied with download link for', parentUri);
                }
                else {
                    console.log('Replied with no video notice for', parentUri);
                }
                addReplied(parentUri);
                repliesThisCycle += 1;
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
            catch (err) {
                const status = err?.status;
                if (status === 429) {
                    console.warn('Rate limited, backing off 60s');
                    await new Promise((resolve) => setTimeout(resolve, 60000));
                }
                console.error('Error handling mention', err);
            }
        }
        await agent.updateSeenNotifications(new Date().toISOString());
    }
    catch (err) {
        console.error('Notification polling failed', err);
    }
}
async function main() {
    await login();
    await markAllNotificationsSeen();
    console.log(`Bot started, polling every ${POLL_INTERVAL_MS}ms`);
    const interval = setInterval(() => {
        void processNotifications();
    }, POLL_INTERVAL_MS);
    const shutdown = () => {
        console.log('Shutting down...');
        clearInterval(interval);
        process.exit(0);
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
}
main().catch((error) => {
    console.error('Fatal startup error:', error);
    process.exit(1);
});
