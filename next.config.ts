import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'ALLOWALL' },
          { key: 'Permissions-Policy', value: 'fullscreen=*' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://telegram.org",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://*.supabase.co https://api.telegram.org",
              "frame-src https://telegram.org",
              "media-src 'self' blob: https://*.supabase.co",
              "worker-src 'self' blob:",
              "frame-ancestors https://web.telegram.org https://telegram.org",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
