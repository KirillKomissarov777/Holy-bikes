'use client';

import { useTelegram } from './telegram/TelegramProvider';

export function LangSwitch() {
  const { lang, setLang } = useTelegram();

  return (
    <button
      onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
      className="text-xs font-bold px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--tg-hint)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-all duration-150 tracking-widest"
    >
      {lang === 'ru' ? 'EN' : 'RU'}
    </button>
  );
}
