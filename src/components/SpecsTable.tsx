import type { Bike } from '@/types/database';
import type { Translations } from '@/lib/i18n';

interface SpecsTableProps {
  bike: Bike;
  tr: Translations;
}

export function SpecsTable({ bike, tr }: SpecsTableProps) {
  const specs = [
    { label: tr.mileage, value: `${bike.mileage.toLocaleString()} ${tr.km}` },
    { label: tr.power, value: `${bike.power} ${tr.hp}` },
    { label: tr.maxSpeed, value: `${bike.max_speed} ${tr.kmh}` },
    { label: tr.fuelCons, value: `${bike.fuel_cons} ${tr.fuelUnit}` },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="bg-[var(--surface)] rounded-xl px-4 py-3 border border-[var(--border)]"
        >
          <span className="text-[var(--tg-hint)] text-xs uppercase tracking-wider font-medium block mb-1">
            {spec.label}
          </span>
          <p className="text-white font-bold text-base">{spec.value}</p>
        </div>
      ))}
    </div>
  );
}
