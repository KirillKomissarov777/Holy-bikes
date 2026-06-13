import type { Bike } from '@/types/database';
import type { Translations } from '@/lib/i18n';

interface SpecsTableProps {
  bike: Bike;
  tr: Translations;
}

export function SpecsTable({ bike, tr }: SpecsTableProps) {
  const specs = [
    { icon: '📍', label: tr.mileage, value: `${bike.mileage.toLocaleString()} ${tr.km}` },
    { icon: '⚡', label: tr.power, value: `${bike.power} ${tr.hp}` },
    { icon: '🚀', label: tr.maxSpeed, value: `${bike.max_speed} ${tr.kmh}` },
    { icon: '⛽', label: tr.fuelCons, value: `${bike.fuel_cons} ${tr.fuelUnit}` },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="bg-[var(--surface)] rounded-xl px-4 py-3 border border-[var(--border)]"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-base leading-none">{spec.icon}</span>
            <span className="text-[var(--tg-hint)] text-xs uppercase tracking-wider font-medium">
              {spec.label}
            </span>
          </div>
          <p className="text-[var(--tg-text)] font-bold text-base">{spec.value}</p>
        </div>
      ))}
    </div>
  );
}
