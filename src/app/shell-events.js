/**
 * Événements du shell (topbar) — remplace les onclick inline.
 */
export function bindShellEvents({ goHome, goPage }) {
  document.querySelector('[data-action="home"]')?.addEventListener('click', goHome);

  document.getElementById('notif-btn')?.addEventListener('click', () => window.toggleNotif?.());
  document.getElementById('notif-close')?.addEventListener('click', () => {
    const panel = document.getElementById('notif-panel');
    if (panel) {
      panel.hidden = true;
      document.getElementById('notif-btn')?.setAttribute('aria-expanded', 'false');
    }
  });
  document.getElementById('notif-mark-all')?.addEventListener('click', () => window.markAllRead?.());
  document.getElementById('notif-view-all')?.addEventListener('click', () => {
    goPage('rc-liste');
    const panel = document.getElementById('notif-panel');
    if (panel) panel.hidden = true;
  });

  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');

  searchInput?.addEventListener('input', (e) => {
    const q = e.target.value;
    if (searchClear) {
      searchClear.hidden = !q.trim();
      searchClear.classList.toggle('is-visible', !!q.trim());
    }
    window.doSearch?.(q);
  });

  searchInput?.addEventListener('keydown', (e) => window.searchKeydown?.(e));

  searchInput?.addEventListener('focus', () => {
    const q = searchInput.value.trim();
    if (q) window.doSearch?.(q);
    searchInput.setAttribute('aria-expanded', 'true');
  });

  searchClear?.addEventListener('click', () => window.clearSearch?.());

  document.addEventListener('click', (e) => {
    const wrap = document.getElementById('search-wrap');
    if (!wrap?.contains(e.target)) window.closeSearch?.();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeSearch?.();
  });
}
