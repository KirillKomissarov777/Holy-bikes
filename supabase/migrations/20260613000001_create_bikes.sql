-- Bikes catalog
CREATE TABLE public.bikes (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  status       text NOT NULL CHECK (status IN ('free', 'occupied')) DEFAULT 'free',
  price_day    integer NOT NULL DEFAULT 0,
  mileage      integer NOT NULL DEFAULT 0,
  power        integer NOT NULL DEFAULT 0,
  max_speed    integer NOT NULL DEFAULT 0,
  fuel_cons    numeric(4,1) NOT NULL DEFAULT 0,
  name_ru      text NOT NULL DEFAULT '',
  name_en      text NOT NULL DEFAULT '',
  desc_ru      text,
  desc_en      text,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- Bike photos
CREATE TABLE public.bike_photos (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bike_id      uuid NOT NULL REFERENCES public.bikes(id) ON DELETE CASCADE,
  storage_url  text NOT NULL,
  position     integer NOT NULL DEFAULT 0,
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_bike_photos_bike_id ON public.bike_photos(bike_id);
CREATE INDEX idx_bikes_status ON public.bikes(status);

-- RLS
ALTER TABLE public.bikes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bike_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_all_bikes"
  ON public.bikes FOR ALL TO service_role USING (true);

CREATE POLICY "deny_anon_bikes"
  ON public.bikes FOR ALL TO anon USING (false);

CREATE POLICY "service_role_all_photos"
  ON public.bike_photos FOR ALL TO service_role USING (true);

CREATE POLICY "deny_anon_photos"
  ON public.bike_photos FOR ALL TO anon USING (false);

-- Sample data
INSERT INTO public.bikes (status, price_day, mileage, power, max_speed, fuel_cons, name_ru, name_en, desc_ru, desc_en)
VALUES
  ('free',     350000, 12000, 125, 180, 4.5, 'Honda CBR 600', 'Honda CBR 600',
   'Спортивный мотоцикл в отличном состоянии. Идеален для поездок по городу и трассе.',
   'Sport motorcycle in excellent condition. Perfect for city and highway rides.'),
  ('free',     200000,  8500,  50, 120, 3.2, 'Yamaha YZF-R3', 'Yamaha YZF-R3',
   'Лёгкий и манёвренный байк. Отличный выбор для новичков и города.',
   'Light and agile bike. Great choice for beginners and city riding.'),
  ('occupied', 450000,  5200, 160, 220, 5.8, 'Kawasaki Z900', 'Kawasaki Z900',
   'Мощный нейкед-байк. В данный момент забронирован.',
   'Powerful naked bike. Currently reserved.');
