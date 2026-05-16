// popup.js

document.addEventListener('DOMContentLoaded', () => {
  const urlInput = document.getElementById('urlInput');
  const downloadBtn = document.getElementById('downloadBtn');
  const homeLink = document.getElementById('homeLink');

  // Try to pre-fill the input if the active tab is a Bluesky post
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    if (currentTab && currentTab.url && currentTab.url.includes('bsky.app/profile/') && currentTab.url.includes('/post/')) {
      urlInput.value = currentTab.url;
    }
  });

  // Handle download button click
  downloadBtn.addEventListener('click', () => {
    const url = urlInput.value.trim();
    if (url) {
      const target = \`https://bluevideosaver.com/?url=\${encodeURIComponent(url)}\`;
      chrome.tabs.create({ url: target });
    }
  });

  // Handle enter key
  urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      downloadBtn.click();
    }
  });

  // Handle home link click
  homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: 'https://bluevideosaver.com/' });
  });
});
