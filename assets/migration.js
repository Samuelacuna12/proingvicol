(() => {
  'use strict';

  const recipient = 'Contacto@proingvicol.com';
  const query = new URLSearchParams(location.search);
  const oldId = query.get('page_id') || query.get('p');
  if (/^\d+$/.test(oldId || '')) {
    fetch('/assets/legacy-routes.json')
      .then(response => response.ok ? response.json() : {})
      .then(routes => {
        if (routes[oldId]) location.replace(routes[oldId] + location.hash);
      })
      .catch(() => {});
  }

  document.addEventListener('submit', event => {
    const form = event.target;
    if (!form.matches('form[data-proing-contact]')) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    const isSubscription = form.dataset.proingContact === 'suscripcion';
    const subject = isSubscription ? 'Solicitud de suscripción' : 'Consulta para Proingvicol';
    const fields = Array.from(form.elements).flatMap(field => {
      if (!field.name || field.disabled || !field.value ||
          ['submit', 'button', 'hidden', 'file'].includes(field.type) ||
          (['checkbox', 'radio'].includes(field.type) && !field.checked)) return [];
      const label = field.labels?.[0]?.textContent.trim() || field.placeholder || field.name;
      return [label + ': ' + field.value.trim()];
    });
    const mail = document.createElement('a');
    mail.href = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(fields.join('\r\n\r\n'));
    mail.textContent = 'Abrir el correo';
    const status = form.querySelector('.proing-form-hint');
    status.replaceChildren('Si tu aplicación de correo no abre, ', mail, '.');
    location.href = mail.href;
  }, true);

  document.addEventListener('click', async event => {
    const link = event.target.closest('a[data-proing-more]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey ||
        event.shiftKey || event.altKey) return;
    const grid = link.closest('.elementor-widget-loop-grid');
    const container = grid?.querySelector('.elementor-loop-container');
    if (!container) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (link.getAttribute('aria-busy') === 'true') return;
    link.setAttribute('aria-busy', 'true');
    try {
      const response = await fetch(link.href);
      if (!response.ok) throw new Error('Pagination unavailable');
      const page = new DOMParser().parseFromString(await response.text(), 'text/html');
      const nextGrid = page.querySelector('.elementor-widget-loop-grid[data-id="' + CSS.escape(grid.dataset.id) + '"]');
      const cards = nextGrid?.querySelectorAll('.elementor-loop-container > .e-loop-item');
      if (!cards?.length) throw new Error('Missing project entries');
      const styles = nextGrid.querySelectorAll('.elementor-loop-container > style');
      container.append(...styles, ...cards);
      const nextLink = nextGrid.querySelector('a[data-proing-more]');
      if (nextLink) link.href = nextLink.getAttribute('href');
      else {
        cards[0].tabIndex = -1;
        cards[0].focus({ preventScroll: true });
        link.hidden = true;
      }
    } catch {
      location.assign(link.href);
    } finally {
      link.removeAttribute('aria-busy');
    }
  }, true);
})();
