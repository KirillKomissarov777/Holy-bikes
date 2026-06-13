'use client';

import { useState } from 'react';
import type { BikePhoto } from '@/types/database';

interface BikeGalleryProps {
  photos: BikePhoto[];
  altName: string;
}

export function BikeGallery({ photos, altName }: BikeGalleryProps) {
  const [current, setCurrent] = useState(0);

  if (photos.length === 0) {
    return (
      <div className="w-full aspect-video bg-[var(--tg-secondary-bg)] rounded-2xl flex items-center justify-center text-[var(--tg-hint)]">
        No photo
      </div>
    );
  }

  const sorted = [...photos].sort((a, b) => a.position - b.position);

  function prev() {
    setCurrent((c) => (c - 1 + sorted.length) % sorted.length);
  }
  function next() {
    setCurrent((c) => (c + 1) % sorted.length);
  }

  return (
    <div className="relative w-full">
      <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-[var(--tg-secondary-bg)]">
        <img
          src={sorted[current].storage_url}
          alt={`${altName} ${current + 1}`}
          className="w-full h-full object-cover"
        />

        {sorted.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center"
            >
              ›
            </button>
          </>
        )}
      </div>

      {sorted.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-2">
          {sorted.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === current ? 'bg-[var(--tg-button)]' : 'bg-[var(--tg-hint)]'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
