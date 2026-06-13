export type Lang = 'ru' | 'en';

export const translations = {
  ru: {
    free: 'Свободные',
    occupied: 'Занятые',
    pricePerDay: 'в день',
    mileage: 'Пробег',
    power: 'Мощность',
    maxSpeed: 'Макс. скорость',
    fuelCons: 'Расход',
    km: 'км',
    hp: 'л.с.',
    kmh: 'км/ч',
    fuelUnit: 'л/100км',
    book: 'Забронировать',
    leaveRequest: 'Оставить заявку',
    noBikes: 'Байков нет',
    photos: 'Фото',
    specs: 'Характеристики',
    backToList: 'Назад',
    currency: '₽',
  },
  en: {
    free: 'Available',
    occupied: 'Occupied',
    pricePerDay: 'per day',
    mileage: 'Mileage',
    power: 'Power',
    maxSpeed: 'Max speed',
    fuelCons: 'Fuel',
    km: 'km',
    hp: 'hp',
    kmh: 'km/h',
    fuelUnit: 'L/100km',
    book: 'Book now',
    leaveRequest: 'Leave request',
    noBikes: 'No bikes',
    photos: 'Photos',
    specs: 'Specs',
    backToList: 'Back',
    currency: '$',
  },
} as const;

export type Translations = typeof translations[Lang];

export function t(lang: Lang): Translations {
  return translations[lang];
}
