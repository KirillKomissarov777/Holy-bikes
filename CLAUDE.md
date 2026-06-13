@AGENTS.md

# Holy Bikes Bot — Telegram MiniApp

## Обзор
Каталог байков для аренды. Пользователь открывает MiniApp из бота,
видит список с вкладками Свободные/Занятые, карточку байка с галереей фото
и характеристиками, нажимает "Забронировать" → открывается чат с владельцем.

## Стек
- Next.js 16 (App Router, Turbopack), TypeScript strict, Tailwind v4
- Supabase (PostgreSQL + Storage для фото)
- Vercel (деплой), Telegram Bot API (webhook)

## Архитектура
```
src/
├── app/
│   ├── layout.tsx              # TelegramProvider + Telegram SDK script
│   ├── page.tsx                # Каталог (вкладки free/occupied)
│   ├── bikes/[id]/page.tsx     # Карточка байка + галерея + кнопка бронь
│   └── api/
│       ├── bikes/route.ts      # GET ?status=free|occupied
│       ├── bikes/[id]/route.ts # GET одного байка
│       └── webhook/route.ts    # Telegram bot webhook (/start)
├── components/
│   ├── telegram/               # TelegramProvider, BackButton
│   ├── BikeCard.tsx            # Карточка в списке
│   ├── BikeGallery.tsx         # Свайп-галерея фото
│   ├── SpecsTable.tsx          # Таблица характеристик
│   └── LangSwitch.tsx          # Кнопка RU/EN
├── lib/
│   ├── supabase/server.ts      # Service role client
│   ├── supabase/client.ts      # Browser client
│   ├── auth.ts                 # verifyInitData HMAC-SHA256
│   ├── i18n.ts                 # Переводы RU/EN
│   └── theme.ts                # Telegram themeParams → CSS vars
└── types/database.ts           # Bike, BikePhoto, BikeWithPhotos
```

## Telegram MiniApp правила
- Mobile-first: max-w-md mx-auto px-4, без md:/lg:
- Тема через CSS vars (--tg-bg, --tg-text и т.д.) — не хардкодить цвета
- BackButton cleanup в useEffect (offClick + hide)
- initData верифицировать только серверно через verifyInitData в lib/auth.ts

## Домен
- Цены хранятся в integer (копейки: 350000 = 3500₽), вывод: price_day / 100
- Язык: localStorage('lang') = 'ru' | 'en', default 'ru'
- Фото: Supabase Storage, URL в bike_photos.storage_url, sorted by position

## Env переменные
- TELEGRAM_BOT_TOKEN — в webhook и отправке сообщений
- SUPABASE_SERVICE_ROLE_KEY — только server-side (API routes)
- NEXT_PUBLIC_OWNER_USERNAME — username владельца для кнопки "Забронировать"
- Никогда не добавлять service role key в NEXT_PUBLIC_*

## Команды
- npm run dev — разработка
- npm run build — сборка
- npx supabase db push — применить миграции
