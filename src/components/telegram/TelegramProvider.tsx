'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { applyTelegramTheme, listenThemeChanges } from '@/lib/theme';
import type { Lang } from '@/lib/i18n';

interface TelegramContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  ready: boolean;
  error: string | null;
}

const Ctx = createContext<TelegramContextValue>({
  lang: 'ru',
  setLang: () => {},
  ready: false,
  error: null,
});

export function useTelegram() {
  return useContext(Ctx);
}

export function TelegramProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLangState] = useState<Lang>('ru');

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang | null;
    if (stored === 'ru' || stored === 'en') setLangState(stored);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem('lang', l);
  }

  useEffect(() => {
    const tg = (window as unknown as { Telegram?: { WebApp: { ready: () => void; expand: () => void; initData: string } } }).Telegram?.WebApp;

    if (!tg) {
      setError('Откройте через Telegram / Open via Telegram');
      setReady(true);
      return;
    }

    tg.ready();
    tg.expand();
    applyTelegramTheme();
    listenThemeChanges();
    setReady(true);
  }, []);

  return (
    <Ctx.Provider value={{ lang, setLang, ready, error }}>
      {children}
    </Ctx.Provider>
  );
}
