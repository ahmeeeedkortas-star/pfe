/**
 * UX Documentation & 5S — typographie Odoo, cartes, filtres, transitions au rechargement.
 */

export function isV11Page(pageId) {
  const p = pageId || window.STATE?.page || '';
  return p.startsWith('doc-') || p.startsWith('5s-') || p.startsWith('audit-') || p === 'doc' || p === '5s' || p === 'audit';
}

export function isV11Module(mod) {
  return mod === 'doc' || mod === 'fives' || mod === '5s' || mod === 'audit';
}

/**
 * Post-traitement DOM après rendu (filtres, boutons, cartes, tableaux).
 * @param {HTMLElement} [root]
 */
export function enhanceV11Page(root) {
  const c = root || document.getElementById('content');
  if (!c || !isV11Page(window.STATE?.page)) return;

  c.classList.add('xm-v11-surface');
  document.body.classList.toggle('xm-v11-active', true);

  c.querySelectorAll('.card').forEach((card) => {
    card.classList.add('xm-v11-card');
    if (!card.querySelector('.xm-card-shine')) {
      const shine = document.createElement('div');
      shine.className = 'xm-card-shine';
      shine.setAttribute('aria-hidden', 'true');
      if (getComputedStyle(card).position === 'static') card.style.position = 'relative';
      card.appendChild(shine);
    }
  });

  c.querySelectorAll('.filter-bar').forEach((bar) => bar.classList.add('xm-filter-bar'));

  c.querySelectorAll('.filter-sel, .fi, select.fi').forEach((el) => {
    el.classList.add('xm-field');
  });

  c.querySelectorAll('.btn').forEach((btn) => {
    btn.classList.add('xm-btn');
    if (!btn.type) btn.setAttribute('type', 'button');
  });

  c.querySelectorAll('.tbl').forEach((tbl) => tbl.classList.add('xm-v11-table'));

  c.querySelectorAll('table.tbl tbody tr').forEach((tr, i) => {
    tr.style.setProperty('--row-i', String(i));
    tr.classList.add('xm-v11-row');
  });

  c.querySelectorAll('[style*="display:grid"][style*="repeat("]').forEach((grid) => {
    if (grid.querySelector('[style*="font-size:24px"]')) grid.classList.add('xm-kpi-grid');
  });

  requestAnimationFrame(() => {
    c.classList.add('xm-v11-ready');
  });
}

export function clearV11PageClasses() {
  document.body.classList.remove('xm-v11-active');
  const c = document.getElementById('content');
  if (!c) return;
  c.classList.remove('xm-v11-surface', 'xm-v11-ready', 'xm-v11-reload');
}

let reloadPatched = false;

/** Placeholder — extensions UX v11 centralisées dans page-refresh / router. */
export function installV11Ux() {
  reloadPatched = true;
}
