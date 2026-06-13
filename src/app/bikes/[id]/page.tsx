'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTelegram } from '@/components/telegram/TelegramProvider';
import { BackButton } from '@/components/telegram/BackButton';
import { BikeGallery } from '@/components/BikeGallery';
import { SpecsTable } from '@/components/SpecsTable';
import { LangSwitch } from '@/components/LangSwitch';
import { t } from '@/lib/i18n';
import type { BikeWithPhotos } from '@/types/database';

export default function BikeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { lang } = useTelegram();
  const tr = t(lang);
  const [bike, setBike] = useState<BikeWithPhotos | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/bikes/${id}`)
      .then((r) => r.json())
      .then((data) => setBike(data.bike ?? null))
      .finally(() => setLoading(false));
  }, [id]);

  function handleBook() {
    const ownerUsername = process.env.NEXT_PUBLIC_OWNER_USERNAME;
    const tg = (window as unknown as { Telegram?: { WebApp: { openTelegramLink: (url: string) => void } } }).Telegram?.WebApp;

    if (ownerUsername) {
      tg?.openTelegramLink(`https://t.me/${ownerUsername}`);
    }
  }

  if (loading) {
    return (
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="rounded-2xl bg-[var(--tg-section-bg)] h-64 animate-pulse mb-4" />
        <div className="h-6 bg-[var(--tg-section-bg)] rounded animate-pulse mb-2 w-2/3" />
        <div className="h-10 bg-[var(--tg-section-bg)] rounded animate-pulse mb-4 w-1/3" />
        <div className="h-40 bg-[var(--tg-section-bg)] rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="flex items-center justify-center min-h-screen text-[var(--tg-hint)]">
        Not found
      </div>
    );
  }

  const name = lang === 'ru' ? bike.name_ru : bike.name_en;
  const desc = lang === 'ru' ? bike.desc_ru : bike.desc_en;
  const isFree = bike.status === 'free';
  const price = Math.round(bike.price_day / 100);

  return (
    <>
      <BackButton />
      <main className="max-w-md mx-auto px-4 pb-28">
        <header className="flex items-center justify-between py-4">
          <span className="text-[var(--tg-hint)] text-sm">🏍 Holy Bikes</span>
          <LangSwitch />
        </header>

        <BikeGallery photos={bike.bike_photos} altName={name} />

        <div className="mt-4 mb-2 flex items-start justify-between gap-2">
          <div>
            <h1 className="text-[var(--tg-text)] font-bold text-2xl">{name}</h1>
            <p className="text-[var(--tg-button)] font-bold text-xl">
              {tr.currency}{price}{' '}
              <span className="text-[var(--tg-hint)] text-sm font-normal">/ {tr.pricePerDay}</span>
            </p>
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium mt-1 shrink-0 ${
              isFree
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {isFree ? tr.free : tr.occupied}
          </span>
        </div>

        {desc && (
          <p className="text-[var(--tg-hint)] text-sm mb-4 leading-relaxed">{desc}</p>
        )}

        <h2 className="text-[var(--tg-text)] font-semibold mb-2">{tr.specs}</h2>
        <SpecsTable bike={bike} tr={tr} />

        {isFree && (
          <button
            onClick={handleBook}
            className="w-full mt-6 py-4 rounded-2xl bg-[var(--tg-button)] text-[var(--tg-button-text)] font-semibold text-base active:opacity-80 transition-opacity"
          >
            {tr.book}
          </button>
        )}

        {!isFree && (
          <button
            onClick={handleBook}
            className="w-full mt-6 py-4 rounded-2xl bg-[var(--tg-secondary-bg)] text-[var(--tg-hint)] font-semibold text-base border border-[var(--tg-hint)]/30 active:opacity-80 transition-opacity"
          >
            {tr.leaveRequest}
          </button>
        )}
      </main>
    </>
  );
}
