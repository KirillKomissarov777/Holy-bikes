import type { Bike } from '@/types/database';
import type { Translations } from '@/lib/i18n';

interface SpecsTableProps {
  bike: Bike;
  tr: Translations;
}

export function SpecsTable({ bike, tr }: SpecsTableProps) {
  const rows = [
    { label: tr.mileage, value: `${bike.mileage.toLocaleString()} ${tr.km}` },
    { label: tr.power, value: `${bike.power} ${tr.hp}` },
    { label: tr.maxSpeed, value: `${bike.max_speed} ${tr.kmh}` },
    { label: tr.fuelCons, value: `${bike.fuel_cons} ${tr.fuelUnit}` },
  ];

  return (
    <div className="rounded-2xl overflow-hidden border border-[var(--tg-hint)]/20">
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={`flex justify-between px-4 py-3 ${
            i % 2 === 0 ? 'bg-[var(--tg-secondary-bg)]' : 'bg-[var(--tg-bg)]'
          }`}
        >
          <span className="text-[var(--tg-hint)] text-sm">{row.label}</span>
          <span className="text-[var(--tg-text)] text-sm font-medium">{row.value}</span>
        </div>
      ))}
    </div>
  );
}
