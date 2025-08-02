/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: [
      'images.pexels.com',
      'avatars.githubusercontent.com',
      'thumbs.dreamstime.com',
      'c4.wallpaperflare.com',
      'miro.medium.com',
      'www.freevector.com',
      'easy-peasy.ai',
      'img.freepik.com',
      'www.sketchappsources.com'
    ],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    serverComponentsExternalPackages: ['resend'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/login',
        permanent: false,
        has: [
          {
            type: 'cookie',
            key: 'next-auth.session-token',
            value: undefined,
          },
        ],
      },
    ];
  },
  poweredByHeader: false,
  compress: true,
};

module.exports = nextConfig;
