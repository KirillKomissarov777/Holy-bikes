'use client';

import { useTelegram } from './telegram/TelegramProvider';

export function LangSwitch() {
  const { lang, setLang } = useTelegram();

  return (
    <button
      onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
      className="text-sm font-medium px-3 py-1 rounded-full border border-[var(--tg-hint)] text-[var(--tg-hint)] hover:text-[var(--tg-text)] hover:border-[var(--tg-text)] transition-colors"
    >
      {lang === 'ru' ? 'EN' : 'RU'}
    </button>
  );
}
