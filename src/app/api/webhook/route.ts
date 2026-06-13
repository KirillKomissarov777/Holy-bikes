import { NextRequest, NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'node:crypto';

export async function POST(req: NextRequest) {
  const secretToken = req.headers.get('x-telegram-bot-api-secret-token');
  const expected = process.env.TELEGRAM_WEBHOOK_SECRET;

  if (expected) {
    if (!secretToken) {
      return new NextResponse(null, { status: 401 });
    }
    const expBuf = Buffer.from(expected);
    const recBuf = Buffer.from(secretToken);
    if (expBuf.length !== recBuf.length || !timingSafeEqual(expBuf, recBuf)) {
      return new NextResponse(null, { status: 401 });
    }
  }

  const update = await req.json();
  const message = update?.message;

  if (message?.text === '/start') {
    const chatId = message.chat.id;
    const appUrl = process.env.MINIAPP_URL;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if (appUrl && botToken) {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: '🏍 Holy Bikes — каталог байков для аренды',
          reply_markup: {
            inline_keyboard: [[
              { text: '🏍 Открыть каталог', web_app: { url: appUrl } }
            ]]
          }
        }),
      });
    }
  }

  return NextResponse.json({ ok: true });
}

export const runtime = 'nodejs';
