'use client';

import { useEffect, useState } from 'react';
import { useTelegram } from '@/components/telegram/TelegramProvider';
import { BikeCard } from '@/components/BikeCard';
import { LangSwitch } from '@/components/LangSwitch';
import { t } from '@/lib/i18n';
import type { BikeStatus, BikeWithPhotos } from '@/types/database';

type Tab = BikeStatus;

export default function CatalogPage() {
  const { lang, ready, error } = useTelegram();
  const tr = t(lang);
  const [tab, setTab] = useState<Tab>('free');
  const [bikes, setBikes] = useState<BikeWithPhotos[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready) return;
    setLoading(true);
    fetch(`/api/bikes?status=${tab}`)
      .then((r) => r.json())
      .then((data) => setBikes(data.bikes ?? []))
      .finally(() => setLoading(false));
  }, [tab, ready]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 text-center text-[var(--tg-hint)]">
        {error}
      </div>
    );
  }

  return (
    <main className="max-w-md mx-auto px-4 pb-8">
      <header className="flex items-center justify-between py-4">
        <h1 className="text-[var(--tg-text)] font-bold text-xl">🏍 Holy Bikes</h1>
        <LangSwitch />
      </header>

      <div className="flex rounded-2xl bg-[var(--tg-secondary-bg)] p-1 mb-5">
        {(['free', 'occupied'] as Tab[]).map((s) => (
          <button
            key={s}
            onClick={() => setTab(s)}
            className={`flex-1 py-2 text-sm font-medium rounded-xl transition-colors ${
              tab === s
                ? 'bg-[var(--tg-button)] text-[var(--tg-button-text)]'
                : 'text-[var(--tg-hint)]'
            }`}
          >
            {s === 'free' ? tr.free : tr.occupied}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl bg-[var(--tg-section-bg)] h-48 animate-pulse"
            />
          ))}
        </div>
      ) : bikes.length === 0 ? (
        <div className="text-center py-16 text-[var(--tg-hint)]">{tr.noBikes}</div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {bikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} lang={lang} tr={tr} />
          ))}
        </div>
      )}
    </main>
  );
}
