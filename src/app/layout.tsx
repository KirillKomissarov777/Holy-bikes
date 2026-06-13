import type { Metadata } from 'next';
import Script from 'next/script';
import { TelegramProvider } from '@/components/telegram/TelegramProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Holy Bikes',
  description: 'Каталог байков для аренды',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>
        {/* Background photo — place your image at /public/bg.jpg to enable */}
        <div
          aria-hidden
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: -2,
            backgroundImage: 'url(/bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: -1, background: 'rgba(0,0,0,0.6)' }} />
        <TelegramProvider>{children}</TelegramProvider>
      </body>
    </html>
  );
}
