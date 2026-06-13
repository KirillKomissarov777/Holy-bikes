export function applyTelegramTheme() {
  const tg = (window as unknown as { Telegram?: { WebApp: { themeParams: Record<string, string>; colorScheme: string } } }).Telegram?.WebApp;
  if (!tg) return;

  const t = tg.themeParams ?? {};
  const root = document.documentElement;

  const vars: Record<string, string> = {
    '--tg-bg': t.bg_color ?? '#0F1114',
    '--tg-text': t.text_color ?? '#E5E7EB',
    '--tg-hint': t.hint_color ?? '#9CA3AF',
    '--tg-link': t.link_color ?? '#0F8AD2',
    '--tg-button': t.button_color ?? '#0F8AD2',
    '--tg-button-text': t.button_text_color ?? '#FFFFFF',
    '--tg-secondary-bg': t.secondary_bg_color ?? '#1A1C1F',
    '--tg-section-bg': t.section_bg_color ?? '#1A1C1F',
    '--tg-destructive': t.destructive_text_color ?? '#EF4444',
  };

  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
  root.classList.toggle('dark', tg.colorScheme === 'dark');
}

export function listenThemeChanges() {
  const tg = (window as unknown as { Telegram?: { WebApp: { onEvent: (e: string, cb: () => void) => void } } }).Telegram?.WebApp;
  tg?.onEvent('themeChanged', applyTelegramTheme);
}
