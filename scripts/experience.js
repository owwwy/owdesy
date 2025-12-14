async function loadExperience() {
  const container = document.getElementById('experience-list');
  if (!container) return;

  try {
    const response = await fetch('objects/experience.json', { cache: 'no-store' });
    if (!response.ok) {
      console.error('Не удалось загрузить experience.json', response.status);
      return;
    }

    const items = await response.json();

    items.forEach((item) => {
      const {
        company,
        siteLabel,
        siteUrl,
        dateFrom,
        dateTo
      } = item;

      const siteHtml = siteLabel
        ? (siteUrl
            ? `<a class="experience-item__site" href="${siteUrl}" target="_blank" rel="noreferrer noopener">${siteLabel}</a>`
            : `<div class="experience-item__site">${siteLabel}</div>`
          )
        : '';

      const html = `
        <article class="experience-item">
          <header class="experience-item__header">
            <div class="experience-item__company">${company}</div>
            ${siteHtml}
          </header>
          <div class="experience-item__dates">
            <span class="experience-item__date">${dateFrom}</span>
            <span class="experience-item__dash" aria-hidden="true"></span>
            <span class="experience-item__date">${dateTo}</span>
          </div>
        </article>
      `;

      container.insertAdjacentHTML('beforeend', html);
    });
  } catch (error) {
    console.error('Ошибка при загрузке опыта:', error);
  }
}

loadExperience();
