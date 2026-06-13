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
      <div className="w-full aspect-video bg-[var(--surface)] flex items-center justify-center">
        <span className="text-6xl opacity-20">🏍</span>
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
      <div className="relative w-full aspect-video overflow-hidden bg-[var(--surface)]">
        <img
          src={sorted[current].storage_url}
          alt={`${altName} ${current + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Counter badge */}
        {sorted.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white/80 text-xs font-medium px-2.5 py-1 rounded-full">
            {current + 1} / {sorted.length}
          </div>
        )}

        {/* Arrow buttons */}
        {sorted.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center text-lg active:scale-95 transition-transform"
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center text-lg active:scale-95 transition-transform"
              aria-label="Next photo"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {sorted.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {sorted.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === current
                  ? 'w-5 bg-[var(--accent)]'
                  : 'w-1.5 bg-[var(--tg-hint)]/40'
              }`}
              aria-label={`Photo ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
