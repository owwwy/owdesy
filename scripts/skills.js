async function loadSkills() {
  const container = document.getElementById('skills-list');
  if (!container) return;

  try {
    const response = await fetch('objects/skills.json', { cache: 'no-store' });
    if (!response.ok) {
      console.error('Не удалось загрузить skills.json', response.status);
      return;
    }

    const skills = await response.json();

    skills.forEach((item) => {
      const { tags = [], description = '' } = item;

      const tagsHtml = tags
        .map((tag) => `<span class="skills-tag">${tag}</span>`)
        .join('');

      const html = `
        <article class="skills-item">
          <div class="skills-item__tags">
            ${tagsHtml}
          </div>
          <p class="skills-item__description">${description}</p>
        </article>
      `;

      container.insertAdjacentHTML('beforeend', html);
    });
  } catch (error) {
    console.error('Ошибка при загрузке навыков:', error);
  }
}

loadSkills();
