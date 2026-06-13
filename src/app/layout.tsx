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
        <TelegramProvider>{children}</TelegramProvider>
      </body>
    </html>
  );
}
