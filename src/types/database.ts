export type BikeStatus = 'free' | 'occupied';

export interface Bike {
  id: string;
  status: BikeStatus;
  price_day: number;
  mileage: number;
  power: number;
  max_speed: number;
  fuel_cons: number;
  name_ru: string;
  name_en: string;
  desc_ru: string | null;
  desc_en: string | null;
  created_at: string;
}

export interface BikePhoto {
  id: string;
  bike_id: string;
  storage_url: string;
  position: number;
  created_at: string;
}

export interface BikeWithPhotos extends Bike {
  bike_photos: BikePhoto[];
}
