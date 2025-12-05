import { access, mkdir } from 'node:fs/promises';
import path from 'node:path';
import YTDlpWrap from 'yt-dlp-wrap';

const binaryPath = process.env.YTDLP_BINARY_PATH || path.join(process.cwd(), 'bin', 'yt-dlp');
let client: YTDlpWrap | null = null;
let ensurePromise: Promise<void> | null = null;

async function binaryExists(): Promise<boolean> {
  try {
    await access(binaryPath);
    return true;
  } catch {
    return false;
  }
}

async function ensureBinaryAvailable(): Promise<void> {
  if (!ensurePromise) {
    ensurePromise = (async () => {
      if (await binaryExists()) {
        return;
      }
      await mkdir(path.dirname(binaryPath), { recursive: true });
      await YTDlpWrap.downloadFromGithub(binaryPath);
    })();
  }
  return ensurePromise;
}

export async function getYtDlp(): Promise<YTDlpWrap> {
  await ensureBinaryAvailable();
  if (!client) {
    client = new YTDlpWrap(binaryPath);
  }
  return client;
}
