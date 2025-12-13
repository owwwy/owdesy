document.addEventListener('DOMContentLoaded', async () => {
  const placeholders = document.querySelectorAll('[data-icon]');

  for (const placeholder of placeholders) {
    const url = placeholder.getAttribute('data-icon');
    if (!url) continue;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error('Не удалось загрузить иконку:', url, res.status);
        continue;
      }

      const svgText = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgText, 'image/svg+xml');
      const svg = doc.querySelector('svg');
      if (!svg) continue;

      svg.removeAttribute('width');
      svg.removeAttribute('height');

      svg.classList.add('icon');
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');

      placeholder.replaceWith(svg);
    } catch (err) {
      console.error('Ошибка при загрузке иконки:', url, err);
    }
  }
});
