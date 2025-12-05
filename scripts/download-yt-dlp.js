#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const { promises: fs } = require('fs');
const path = require('path');
const YTDlpWrap = require('yt-dlp-wrap').default;

const binaryPath = (() => {
  const envPath = process.env.YTDLP_BINARY_PATH;
  if (envPath && envPath.trim().length > 0) {
    return normalizeForPlatform(envPath);
  }

  const defaultName = process.platform === 'win32' ? 'yt-dlp.exe' : 'yt-dlp';
  return path.join(process.cwd(), 'bin', defaultName);
})();

function normalizeForPlatform(targetPath) {
  const normalized = path.normalize(targetPath);
  if (process.platform !== 'win32') {
    return normalized;
  }

  return normalized.toLowerCase().endsWith('.exe') ? normalized : `${normalized}.exe`;
}

async function fileExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await fs.mkdir(path.dirname(binaryPath), { recursive: true });
  if (await fileExists(binaryPath)) {
    return;
  }

  console.log(`Downloading yt-dlp binary to ${binaryPath}...`);
  await YTDlpWrap.downloadFromGithub(binaryPath, undefined, undefined, selectGithubAsset());
  console.log('yt-dlp ready.');
}

main().catch((error) => {
  console.error('Failed to download yt-dlp binary', error);
  process.exitCode = 1;
});

function selectGithubAsset() {
  const platform = process.platform;
  const arch = process.arch;

  const portableBinary = {
    linux: 'yt-dlp',
    darwin: 'yt-dlp_macos',
    win32: 'yt-dlp.exe'
  };

  if (platform === 'linux') {
    return portableBinary.linux ?? (arch === 'arm64' ? 'yt-dlp_linux_aarch64' : 'yt-dlp_linux');
  }
  if (platform === 'darwin') {
    return portableBinary.darwin ?? (arch === 'arm64' ? 'yt-dlp_macos_aarch64' : 'yt-dlp_macos');
  }
  return portableBinary[platform];
}
