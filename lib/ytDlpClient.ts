import { access, mkdir, chmod } from 'node:fs/promises';
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
    return true;
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
      await YTDlpWrap.downloadFromGithub(binaryPath, asset);
      await chmod(binaryPath, 0o755);
    })();
  }
  return ensurePromise;
}

export async function ensureBinaryReady(): Promise<void> {
  await ensureBinaryAvailable();
}
