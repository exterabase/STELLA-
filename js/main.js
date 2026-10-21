/* ============================================================
   НАСТРОЙКИ — вставьте ссылки сюда
   ============================================================ */
const CONFIG = {
  // Ссылка на APK (raw GitHub), например:
  // https://raw.githubusercontent.com/ИМЯ/РЕПО/main/Stella-1.0.0.apk
  APK_URL: '',
  // Канал в Telegram
  CHANNEL_URL: 'https://t.me/LuPlugins',
};
/* ============================================================ */

(() => {
  'use strict';

  document.querySelectorAll('[data-apk]').forEach((a) => {
    if (CONFIG.APK_URL) {
      a.href = CONFIG.APK_URL;
      a.setAttribute('download', '');
    }
  });
  document.querySelectorAll('[data-channel]').forEach((a) => { a.href = CONFIG.CHANNEL_URL; });

  // Копирование адресов кошельков
  const status = document.getElementById('copy-status');
  const defaultNote = status ? status.textContent : '';
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    const label = btn.querySelector('span');
    btn.addEventListener('click', async () => {
      const text = document.getElementById(btn.dataset.copy).textContent.trim();
      let ok = false;
      try { await navigator.clipboard.writeText(text); ok = true; }
      catch (e) {
        const r = document.createRange();
        r.selectNodeContents(document.getElementById(btn.dataset.copy));
        const s = getSelection(); s.removeAllRanges(); s.addRange(r);
        try { ok = document.execCommand('copy'); } catch (_) {}
      }
      label.textContent = ok ? 'Скопировано' : 'Выделено, скопируйте';
      if (status) status.textContent = ok ? 'Адрес скопирован.' : 'Не удалось скопировать автоматически, адрес выделен.';
      setTimeout(() => { label.textContent = 'Копировать'; if (status) status.textContent = defaultNote; }, 2500);
    });
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
