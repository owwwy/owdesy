async function loadPrinciples() {
  const container = document.getElementById('principles-list');
  if (!container) return;

  try {
    const response = await fetch('objects/principles.json', { cache: 'no-store' });
    if (!response.ok) {
      console.error('Не удалось загрузить principles.json', response.status);
      return;
    }

    const principles = await response.json();

    principles.forEach((item) => {
      const { title = '', description = '' } = item;

      const html = `
        <article class="principle-item">
          <h3 class="principle-item__title">${title}</h3>
          <p class="principle-item__description">${description}</p>
        </article>
      `;

      container.insertAdjacentHTML('beforeend', html);
    });
  } catch (error) {
    console.error('Ошибка при загрузке принципов:', error);
  }
}

loadPrinciples();
