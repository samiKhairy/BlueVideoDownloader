import { access, mkdir } from 'node:fs/promises';
import path from 'node:path';
import YTDlpWrap from 'yt-dlp-wrap';

function withWindowsExtension(targetPath: string): string {
  if (process.platform !== 'win32') {
    return targetPath;
  }

  return targetPath.toLowerCase().endsWith('.exe') ? targetPath : `${targetPath}.exe`;
}

function resolveBinaryPath(): string {
  const envPath = process.env.YTDLP_BINARY_PATH;
  if (envPath && envPath.trim().length > 0) {
    return withWindowsExtension(path.normalize(envPath));
  }

  const defaultName = process.platform === 'win32' ? 'yt-dlp.exe' : 'yt-dlp';
  return path.join(process.cwd(), 'bin', defaultName);
}

const binaryPath = resolveBinaryPath();
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
      await YTDlpWrap.downloadFromGithub(binaryPath, selectGithubAsset());
    })();
  }
  return ensurePromise;
}

type PlatformKey = 'linux' | 'darwin' | 'win32';
type ArchKey = 'x64' | 'arm64';

function selectGithubAsset(): string | undefined {
  const platform = process.platform as PlatformKey;
  const arch = process.arch as ArchKey;

  const linuxAsset = arch === 'arm64' ? 'yt-dlp_linux_aarch64' : 'yt-dlp_linux';
  const darwinAsset = arch === 'arm64' ? 'yt-dlp_macos_aarch64' : 'yt-dlp_macos';

  const explicitAsset: Partial<Record<PlatformKey, string>> = {
    linux: linuxAsset,
    darwin: darwinAsset,
    win32: 'yt-dlp.exe',
  };

  return explicitAsset[platform];
}

export async function getYtDlp(): Promise<YTDlpWrap> {
  await ensureBinaryAvailable();
  if (!client) {
    client = new YTDlpWrap(binaryPath);
  }
  return client;
}
