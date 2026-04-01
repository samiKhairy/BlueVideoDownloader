/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    typedRoutes: true
  },
  redirects: async () => [
    {
      source: '/blog/bluesky-download-no-sound',
      destination: '/blog/bluesky-download-no-sound-expanded',
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
