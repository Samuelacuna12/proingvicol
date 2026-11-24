(async () => {
  const query = new URLSearchParams(location.search).get('s')?.trim();
  if (!query) return;
  document.getElementById('site-search').value = query;
  const status = document.getElementById('search-status');
  const normalize = value => value.toLocaleLowerCase('es').normalize('NFD').replace(/\p{M}/gu, '');
  const words = normalize(query).split(/\s+/);
  try {
    const response = await fetch('/assets/search-index.json');
    if (!response.ok) throw new Error('Search index unavailable');
    const entries = await response.json();
    const matches = entries.filter(entry => {
      const text = normalize(entry.title + ' ' + entry.description);
      return words.every(word => text.includes(word));
    });
    status.textContent = matches.length ? matches.length + ' resultados' : 'No se encontraron resultados.';
    const list = document.getElementById('search-results');
    for (const entry of matches) {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = entry.path;
      link.textContent = entry.title;
      li.append(link);
      list.append(li);
    }
  } catch {
    status.textContent = 'La búsqueda no está disponible. Vuelve a intentarlo.';
  }
})();
