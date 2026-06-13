import Link from 'next/link';
import type { BikeWithPhotos } from '@/types/database';
import type { Lang, Translations } from '@/lib/i18n';

interface BikeCardProps {
  bike: BikeWithPhotos;
  lang: Lang;
  tr: Translations;
}

export function BikeCard({ bike, lang, tr }: BikeCardProps) {
  const name = lang === 'ru' ? bike.name_ru : bike.name_en;
  const isFree = bike.status === 'free';
  const cover = [...bike.bike_photos].sort((a, b) => a.position - b.position)[0];
  const price = Math.round(bike.price_day / 100);

  return (
    <Link href={`/bikes/${bike.id}`} className="block">
      <div className="rounded-2xl overflow-hidden bg-[var(--tg-section-bg)] active:scale-[0.98] transition-transform">
        <div className="relative w-full aspect-video bg-[var(--tg-secondary-bg)]">
          {cover ? (
            <img
              src={cover.storage_url}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--tg-hint)] text-sm">
              No photo
            </div>
          )}
          <span
            className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-medium ${
              isFree
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {isFree ? tr.free : tr.occupied}
          </span>
        </div>

        <div className="p-3">
          <h3 className="text-[var(--tg-text)] font-semibold text-base truncate">{name}</h3>
          <p className="text-[var(--tg-button)] font-bold text-lg">
            {tr.currency}{price}{' '}
            <span className="text-[var(--tg-hint)] text-sm font-normal">
              / {tr.pricePerDay}
            </span>
          </p>
          <p className="text-[var(--tg-hint)] text-xs mt-1">
            {bike.power} {tr.hp} · {bike.max_speed} {tr.kmh}
          </p>
        </div>
      </div>
    </Link>
  );
}
