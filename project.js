async function loadProjects() {
  const container = document.getElementById('project-list');
  if (!container) return;

  try {
    const response = await fetch('project.json');
    if (!response.ok) {
      console.error('Не удалось загрузить projects.json', response.status);
      return;
    }

    const projects = await response.json();

    projects.forEach((project) => {
      const {
        image,
        title,
        subtitle,
        link,
        tags = []
      } = project;

      const tagsHtml = tags.length
        ? `
          <div class="project-card__tags">
            ${tags
              .map(
                (tag) => `<span class="project-card__tag">${tag}</span>`
              )
              .join('')}
          </div>
        `
        : '';

      const cardHtml = `
        <article class="project-card">
          <div class="project-card__image-wrapper">
            ${link
              ? `<a href="${link}" target="_blank" rel="noreferrer noopener">`
              : ''
            }
              <img
                class="project-card__image"
                src="${image}"
                alt="${title}"
              />
            ${link ? '</a>' : ''}
          </div>
          <div class="project-card__body">
            <h3 class="project-card__title">${title}</h3>
            <p class="project-card__subtitle">${subtitle}</p>
            ${tagsHtml}
          </div>
        </article>
      `;

      container.insertAdjacentHTML('beforeend', cardHtml);
    });
  } catch (error) {
    console.error('Ошибка при загрузке проектов:', error);
  }
}

loadProjects();
