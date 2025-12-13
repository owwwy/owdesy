document.addEventListener('DOMContentLoaded', async () => {
  const placeholders = document.querySelectorAll('[data-icon]');
  const cache = new Map();

  for (const placeholder of placeholders) {
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

      // размеры убираем — будет рулить CSS
      svg.removeAttribute('width');
      svg.removeAttribute('height');

      svg.classList.add('icon');
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');

      // фикс фиолетового: если в файле fill="#AF52DE", прибиваем к currentColor
      svg.querySelectorAll('[fill]').forEach((n) => {
        const val = n.getAttribute('fill');
        if (val && val !== 'none') n.setAttribute('fill', 'currentColor');
      });

      // чистим placeholder и вставляем svg внутрь
      placeholder.innerHTML = '';
      placeholder.appendChild(svg);
    } catch (err) {
      console.error('Ошибка при загрузке иконки:', url, err);
    }
  }
});
