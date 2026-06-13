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
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden active:scale-[0.97] transition-transform duration-150">
        {/* Photo */}
        {cover ? (
          <img
            src={cover.storage_url}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[var(--surface-raised)] flex items-center justify-center">
            <span className="text-4xl opacity-30">🏍</span>
          </div>
        )}

        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md border ${
              isFree
                ? 'bg-green-500/15 text-green-400 border-green-500/30'
                : 'bg-red-500/15 text-red-400 border-red-500/30'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isFree ? 'bg-green-400' : 'bg-red-400'}`} />
            {isFree ? tr.free : tr.occupied}
          </span>
        </div>

        {/* Text overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-lg leading-tight truncate mb-1">{name}</h3>
          <div className="flex items-center justify-between">
            <p className="text-[var(--accent)] font-bold text-xl leading-none">
              {tr.currency}{price.toLocaleString()}
              <span className="text-white/50 text-xs font-normal ml-1">/ {tr.pricePerDay}</span>
            </p>
            <p className="text-white/50 text-xs">
              {bike.power} {tr.hp} · {bike.max_speed} {tr.kmh}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
