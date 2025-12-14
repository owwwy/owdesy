function setCurrentYear(root = document) {
  const year = new Date().getFullYear();
  const nodes = root.querySelectorAll('[data-year]');

  // дебаг: покажет, нашлось ли вообще
  console.log('[year] found:', nodes.length);

  nodes.forEach((el) => {
    el.textContent = year;
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const slots = document.querySelectorAll('[data-module]');

  for (const slot of slots) {
    const url = slot.getAttribute('data-module');
    if (!url) continue;

    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) {
        console.error('Не удалось загрузить модуль:', url, res.status);
        continue;
      }

      slot.innerHTML = await res.text();

      // 🔥 важно: сразу инициализируем то, что появилось внутри этого слота
      setCurrentYear(slot);

    } catch (err) {
      console.error('Ошибка при загрузке модуля:', url, err);
    }
  }

  // Иконки
  if (typeof window.loadIcons === 'function') {
    window.loadIcons();
  }

  // 🔥 и на всякий — глобально
  setCurrentYear();
});
