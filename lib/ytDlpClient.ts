import { access, mkdir, chmod, stat } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { ReadableStream as NodeReadableStream } from 'node:stream/web';

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

  // 🔥 Key change: on serverless Linux (Vercel) use /tmp
  if (process.platform !== 'win32') {
    const tmpDir = process.env.TMPDIR || '/tmp';
    return path.join(tmpDir, 'yt-dlp'); // no .exe
  }

  // Local dev on Windows: keep old behavior
  const defaultName = 'yt-dlp.exe';
  return path.join(process.cwd(), 'bin', defaultName);
}

export const binaryPath = resolveBinaryPath();
let ensurePromise: Promise<void> | null = null;

async function binaryExists(): Promise<boolean> {
  try {
    await access(binaryPath);
    const metadata = await stat(binaryPath);
    return metadata.isFile() && metadata.size > 0;
  } catch {
    return false;
  }
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

async function downloadBinary(asset: string, targetPath: string): Promise<void> {
  const downloadUrl = `https://github.com/yt-dlp/yt-dlp/releases/latest/download/${asset}`;

  const response = await fetch(downloadUrl, {
    headers: {
      'User-Agent': 'BlueVideoDownloader/1.0 (+https://bluevideosaver.com)'
    }
  });

  if (!response.ok || !response.body) {
    throw new Error(`Failed to download yt-dlp (${response.status} ${response.statusText})`);
  }

  const webStream = response.body as unknown as NodeReadableStream;
  const nodeStream = Readable.fromWeb(webStream);
  const fileStream = createWriteStream(targetPath, { mode: 0o755 });

  try {
    await pipeline(nodeStream, fileStream);
  } catch (error) {
    fileStream.destroy();
    throw new Error(
      `Failed to save yt-dlp binary: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

async function ensureBinaryAvailable(): Promise<void> {
  if (!ensurePromise) {
    ensurePromise = (async () => {
      if (await binaryExists()) {
        try {
          await chmod(binaryPath, 0o755);
        } catch {
          // on some platforms we don't care if chmod fails
        }
        return;
      }

      await mkdir(path.dirname(binaryPath), { recursive: true });

      const asset = selectGithubAsset();
      if (!asset) {
        throw new Error(`Unsupported platform/arch for yt-dlp: ${process.platform}/${process.arch}`);
      }

      // This writes into /tmp on Vercel, which IS writable
      await downloadBinary(asset, binaryPath);
      await chmod(binaryPath, 0o755);
    })();
  }
  return ensurePromise;
}

export async function ensureBinaryReady(): Promise<void> {
  await ensureBinaryAvailable();
}
