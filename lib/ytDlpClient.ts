import { access, mkdir, chmod, readFile } from 'node:fs/promises';
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

async function isPythonScript(filePath: string): Promise<boolean> {
  try {
    const buf = await readFile(filePath, { encoding: 'utf8' });
    const firstLine = buf.split('\n')[0] ?? '';
    return firstLine.includes('python');
  } catch {
    return false;
  }
}

async function ensureBinaryAvailable(): Promise<void> {
  if (!ensurePromise) {
    ensurePromise = (async () => {
      const exists = await binaryExists();
      const pythonScript = exists && await isPythonScript(binaryPath);

      if (exists && !pythonScript) {
        try {
          await chmod(binaryPath, 0o755);
        } catch { }
        return;
      }

      // If it's missing OR it's a python script, download the correct binary
      await mkdir(path.dirname(binaryPath), { recursive: true });

      const asset = selectGithubAsset();
      if (!asset) {
        throw new Error(`Unsupported platform/arch for yt-dlp: ${process.platform}/${process.arch}`);
      }

      await YTDlpWrap.downloadFromGithub(binaryPath, asset /* , optional version */);
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
