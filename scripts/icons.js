window.loadIcons = async function loadIcons() {
  const placeholders = document.querySelectorAll('[data-icon]');
  const cache = window.__iconCache || (window.__iconCache = new Map());

  for (const placeholder of placeholders) {
    // если уже обработано — пропускаем
    if (placeholder.dataset.iconLoaded === '1') continue;

    const url = placeholder.getAttribute('data-icon');
    if (!url) continue;

    try {
      let svgText = cache.get(url);

      if (!svgText) {
        const res = await fetch(url, { cache: 'force-cache' });
        if (!res.ok) {
          console.error('Не удалось загрузить иконку:', url, res.status);
          continue;
        }
        svgText = await res.text();
        cache.set(url, svgText);
      }

      const doc = new DOMParser().parseFromString(svgText, 'image/svg+xml');
      const svg = doc.querySelector('svg');
      if (!svg) continue;

      svg.removeAttribute('width');
      svg.removeAttribute('height');

      svg.classList.add('icon');
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');

      svg.querySelectorAll('[fill]').forEach((n) => {
        const val = n.getAttribute('fill');
        if (val && val !== 'none') n.setAttribute('fill', 'currentColor');
      });

      placeholder.innerHTML = '';
      placeholder.appendChild(svg);

      // помечаем как обработанный
      placeholder.dataset.iconLoaded = '1';
    } catch (err) {
      console.error('Ошибка при загрузке иконки:', url, err);
    }
  }
};

// авто-запуск для иконок в самой странице
document.addEventListener('DOMContentLoaded', () => {
  window.loadIcons();
});
