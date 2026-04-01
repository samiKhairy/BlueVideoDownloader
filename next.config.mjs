/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    typedRoutes: true
  },
  redirects: async () => [
    // Tier 1: duplicate no-sound page → expanded version
    {
      source: '/blog/bluesky-download-no-sound',
      destination: '/blog/bluesky-download-no-sound-expanded',
      permanent: true
    },
    // Sprint 2: thin de-indexed pages → homepage
    {
      source: '/blog/bluesky-links-wont-copy',
      destination: '/',
      permanent: true
    },
    {
      source: '/blog/where-are-bluesky-downloads-saved',
      destination: '/',
      permanent: true
    }
  ],
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()'
        }
      ]
    }
  ]
};

export default nextConfig;
