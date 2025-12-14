async function loadProjects() {
  const container = document.getElementById('project-list');
  if (!container) return;

  try {
    const response = await fetch('/objects/projects.json');
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
        link
      } = project;

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
