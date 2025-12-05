import { access, mkdir, chmod } from 'node:fs/promises';
import path from 'node:path';
import YTDlpWrap from 'yt-dlp-wrap'; // Retain for download only

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

async function ensureBinaryAvailable(): Promise<void> {
  if (!ensurePromise) {
    ensurePromise = (async () => {
      if (await binaryExists()) {
        // Ensure permissions are set on Vercel deployment, even if already downloaded
        try {
          await chmod(binaryPath, 0o755);
        } catch { }
        return;
      }
      await mkdir(path.dirname(binaryPath), { recursive: true });

      const asset = selectGithubAsset();
      // Revert download arguments to 3 (which compiled) and ensure permissions.
      // Corrected argument mismatch by placing the asset string in the second (version) slot.
      await YTDlpWrap.downloadFromGithub(binaryPath, asset);
      await chmod(binaryPath, 0o755);
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

export async function ensureBinaryReady(): Promise<void> {
  await ensureBinaryAvailable();
}
