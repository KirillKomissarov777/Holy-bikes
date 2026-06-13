'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface BackButtonProps {
  onClick?: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
  const router = useRouter();

  useEffect(() => {
    const tg = (window as unknown as { Telegram?: { WebApp: { BackButton: { show: () => void; hide: () => void; onClick: (h: () => void) => void; offClick: (h: () => void) => void } } } }).Telegram?.WebApp;
    if (!tg?.BackButton) return;

    const handler = onClick ?? (() => router.back());
    tg.BackButton.show();
    tg.BackButton.onClick(handler);

    return () => {
      tg.BackButton.offClick(handler);
      tg.BackButton.hide();
    };
  }, [router, onClick]);

  return null;
}
