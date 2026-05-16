// content.js

function injectButtons() {
  // Query all post elements on the Bluesky timeline/thread
  const posts = document.querySelectorAll('div[data-testid^="feedItem-by-"], div[data-testid^="postThreadItem-by-"]');

  posts.forEach((post) => {
    // Skip if already processed
    if (post.getAttribute('data-bvs-injected') === 'true') return;

    // Check if the post contains a video or GIF
    const hasVideo = post.querySelector('video') !== null;
    const hasGif = post.querySelector('[data-testid*="gif"], img[src*=".gif"], img[src*=".mp4"]') !== null;
    const hasEmbedImages = post.querySelector('div[data-testid="embedImages"]') !== null;

    if (!hasVideo && !hasGif && !hasEmbedImages) return;

    // Find the action bar (where like, repost, reply buttons live)
    // In Bluesky, it's typically a flex container at the bottom of the post content
    // We look for the reply button's container or the general action row.
    const actionBar = post.querySelector('div[aria-label^="Reply"], div[data-testid="replyBtn"]')?.closest('div.css-175oi2r[style*="flex-direction: row"]');
    
    if (!actionBar) return;

    // Mark as processed
    post.setAttribute('data-bvs-injected', 'true');

    // Create the download button
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'bvs-download-btn';
    downloadBtn.setAttribute('title', 'Download with BlueVideoSaver');
    downloadBtn.setAttribute('aria-label', 'Download post media');

    // SVG Icon (Download Arrow)
    downloadBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
    `;

    // Click handler
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Attempt to extract the post permalink URL
      // Look for a link that matches the post profile pattern
      const postLink = Array.from(post.querySelectorAll('a[href*="/profile/"]')).find(a => a.getAttribute('href').includes('/post/'));
      
      let targetUrl = window.location.href; // Fallback to current URL (useful if viewing a single thread)
      
      if (postLink) {
        const path = postLink.getAttribute('href');
        // Construct absolute URL
        targetUrl = \`https://bsky.app\${path}\`;
      }

      // Open BlueVideoSaver in a new tab
      window.open(\`https://bluevideosaver.com/?url=\${encodeURIComponent(targetUrl)}\`, '_blank');
    });

    // We need to insert it into the action bar, preferably at the end or before the share button
    // The action bar is a flex container, so appending is usually fine.
    // Wrap it in a div that mimics Bluesky's button wrapper structure if necessary, or just append directly.
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.appendChild(downloadBtn);

    actionBar.appendChild(wrapper);
  });
}

// Observe the document for dynamic changes (SPAs load content asynchronously)
const observer = new MutationObserver(() => {
  injectButtons();
});

observer.observe(document.body, { childList: true, subtree: true });

// Run initially
injectButtons();
