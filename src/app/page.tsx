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
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center gap-3">
        <span className="text-5xl">🏍</span>
        <p className="text-[var(--tg-hint)] text-sm">{error}</p>
      </div>
    );
  }

  return (
    <main className="max-w-md mx-auto px-4 pb-10">
      {/* Header */}
      <header className="flex items-center justify-between pt-5 pb-4">
        <div>
          <h1 className="font-black text-2xl tracking-tight leading-none">
            <span className="text-[var(--tg-text)]">HOLY </span>
            <span className="text-[var(--accent)]">BIKES</span>
          </h1>
          <p className="text-[var(--tg-hint)] text-xs mt-0.5 tracking-wide uppercase">
            {lang === 'ru' ? 'Аренда мотоциклов' : 'Motorcycle rental'}
          </p>
        </div>
        <LangSwitch />
      </header>

      {/* Tab switcher */}
      <div className="flex rounded-xl bg-[var(--surface-raised)] p-1 mb-5 gap-1">
        {(['free', 'occupied'] as Tab[]).map((s) => (
          <button
            key={s}
            onClick={() => setTab(s)}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
              tab === s
                ? 'bg-[var(--accent)] text-[var(--accent-fg)] shadow-sm'
                : 'text-[var(--tg-hint)] hover:text-[var(--tg-text)]'
            }`}
          >
            {s === 'free' ? tr.free : tr.occupied}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl bg-[var(--surface)] aspect-[4/3] animate-pulse"
            />
          ))}
        </div>
      ) : bikes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <span className="text-5xl opacity-30">🏍</span>
          <p className="text-[var(--tg-hint)] text-sm">{tr.noBikes}</p>
        </div>
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
