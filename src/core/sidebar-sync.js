/**
 * Synchronise l'état actif de la sidebar (classe + icônes).
 */
export function syncSidebarActive({ module, page } = {}) {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  sidebar.querySelectorAll('.s-item').forEach((el) => {
    el.classList.remove('active');
  });

  let activeId = null;
  if (page === 'accueil' || module === 'accueil') activeId = 'sb-accueil';
  else if (page === 'settings') activeId = 'sb-settings';
  else if (module) activeId = `sb-${module}`;

  const activeEl = activeId ? document.getElementById(activeId) : null;
  if (activeEl) activeEl.classList.add('active');
}
