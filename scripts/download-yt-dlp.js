#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const { promises: fs } = require('fs');
const path = require('path');
const YTDlpWrap = require('yt-dlp-wrap').default;

const binaryPath = process.env.YTDLP_BINARY_PATH || path.join(process.cwd(), 'bin', 'yt-dlp');

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
  await YTDlpWrap.downloadFromGithub(binaryPath);
  console.log('yt-dlp ready.');
}

main().catch((error) => {
  console.error('Failed to download yt-dlp binary', error);
  process.exitCode = 1;
});
