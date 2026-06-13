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
      <div className="max-w-md mx-auto pb-28">
        <div className="w-full aspect-video bg-[var(--surface)] animate-pulse" />
        <div className="px-4 pt-4">
          <div className="h-7 bg-[var(--surface)] rounded-lg animate-pulse mb-2 w-2/3" />
          <div className="h-8 bg-[var(--surface)] rounded-lg animate-pulse mb-5 w-1/2" />
          <div className="grid grid-cols-2 gap-2">
            {[1,2,3,4].map((i) => (
              <div key={i} className="h-20 bg-[var(--surface)] rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3">
        <span className="text-5xl opacity-30">🏍</span>
        <p className="text-[var(--tg-hint)] text-sm">Not found</p>
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
      <main className="max-w-md mx-auto pb-28">
        {/* Header — sits above gallery */}
        <header className="flex items-center justify-between px-4 pt-4 pb-3">
          <span className="font-black text-sm tracking-tight">
            <span className="text-[var(--tg-hint)]">HOLY </span>
            <span className="text-[var(--accent)]">BIKES</span>
          </span>
          <LangSwitch />
        </header>

        {/* Full-width gallery */}
        <BikeGallery photos={bike.bike_photos} altName={name} />

        {/* Info block */}
        <div className="px-4 pt-5">
          {/* Name + status */}
          <div className="flex items-start justify-between gap-3 mb-1">
            <h1 className="text-white font-black text-2xl leading-tight flex-1">{name}</h1>
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full mt-1 shrink-0 border ${
                isFree
                  ? 'bg-green-500/15 text-green-400 border-green-500/30'
                  : 'bg-red-500/15 text-red-400 border-red-500/30'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isFree ? 'bg-green-400' : 'bg-red-400'}`} />
              {isFree ? tr.free : tr.occupied}
            </span>
          </div>

          {/* Price */}
          <p className="text-[var(--accent)] font-black text-3xl mb-4">
            {tr.currency}{price.toLocaleString()}
            <span className="text-[var(--tg-hint)] text-sm font-normal ml-2">/ {tr.pricePerDay}</span>
          </p>

          {/* Description */}
          {desc && (
            <p className="text-[var(--tg-hint)] text-sm mb-5 leading-relaxed">{desc}</p>
          )}

          {/* Specs */}
          <h2 className="text-[var(--tg-text)] font-bold text-sm uppercase tracking-widest mb-3 opacity-50">
            {tr.specs}
          </h2>
          <SpecsTable bike={bike} tr={tr} />

          {/* CTA */}
          {isFree ? (
            <button
              onClick={handleBook}
              className="w-full mt-6 py-4 rounded-2xl bg-[var(--accent)] text-[var(--accent-fg)] font-bold text-base active:scale-[0.98] transition-transform"
            >
              {tr.book}
            </button>
          ) : (
            <button
              onClick={handleBook}
              className="w-full mt-6 py-4 rounded-2xl bg-[var(--surface)] text-[var(--tg-hint)] font-semibold text-base border border-[var(--border)] active:scale-[0.98] transition-transform"
            >
              {tr.leaveRequest}
            </button>
          )}
        </div>
      </main>
    </>
  );
}
