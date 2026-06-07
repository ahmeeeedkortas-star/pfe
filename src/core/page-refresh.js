/**
 * Rafraîchissement in-place des pages legacy (Kanban actions, filtres, etc.)
 * sans repasser par goPage / animatePageSwap.
 */
import { renderPage } from './page-registry.js';
import { isInteractivePage } from '../app/xm-motion.js';
import { enhanceV11Page, isV11Page, clearV11PageClasses } from '../patches/v11-ux-enhance.js';

/** Enlève opacity/transform laissés par animatePageSwap sur #content. */
export function clearContentMotionStyles(container) {
  const c = container || document.getElementById('content');
  if (!c) return;
  c.classList.remove('is-page-exit', 'is-page-enter', 'pg-morph');
  c.style.opacity = '';
  c.style.transform = '';
  c.style.filter = '';
  c.style.pointerEvents = '';
  c.querySelectorAll?.('.stagger-in').forEach((el) => {
    el.classList.remove('stagger-in');
    el.style.animation = '';
    el.style.animationDelay = '';
    el.style.opacity = '';
    el.style.transform = '';
  });
  c.querySelectorAll?.('.card-3d').forEach((card) => {
    card.classList.remove('card-3d');
    card.style.transform = '';
    delete card.dataset.tiltBound;
    card.querySelector('.card-shine')?.remove();
  });
}

/** Après filtre tableau RC/NC — évite lignes bloquées en opacity 0. */
export function clearTableRowMotion(root) {
  const scope = root || document;
  scope.querySelectorAll?.('.tbl tbody tr').forEach((tr) => {
    tr.classList.remove('stagger-in');
    tr.style.animation = '';
    tr.style.animationDelay = '';
    tr.style.opacity = '';
    tr.style.transform = '';
  });
}

/**
 * Re-rend une page legacy déjà chargée (rc-actions, sec-actions, …).
 * @param {string} [pageId]
 */
export async function reloadPage(pageId) {
  const page = pageId || window.STATE?.page;
  const c = document.getElementById('content');
  if (!c || !page) return;

  clearContentMotionStyles(c);

  try {
    const html = await renderPage(page);
    if (html === null) {
      console.warn('[reloadPage] Page introuvable:', page);
      return;
    }
    if (isInteractivePage(page)) c.classList.add('is-interactive-page');
    if (isV11Page(page)) {
      c.classList.add('xm-v11-reload');
      c.classList.remove('xm-v11-ready');
    } else {
      clearV11PageClasses();
    }
    c.innerHTML = html;
    clearContentMotionStyles(c);
    clearTableRowMotion(c);
    if (page === 'cst-politique') {
      import('../components/cst/cst-politique-actions.js').then((m) => {
        m.bindPolitiqueActions();
      });
    }
    if (isV11Page(page)) enhanceV11Page(c);
    if (isV11Page(page)) {
      requestAnimationFrame(() => c.classList.remove('xm-v11-reload'));
    }
    if (page.startsWith('sec-cl-')) {
      const { clInitView } = await import('../components/qhse/dynamic-checklist.js');
      const { SEC_CHECKLIST_PAGES } = await import('../data/sec-checklist-configs.js');
      let clKey = SEC_CHECKLIST_PAGES[page];
      if (clKey === '__custom__') clKey = window.currentCustomCL;
      if (clKey === '__instance__') clKey = window.currentCLKey;
      if (clKey && window.CL_DATA?.[clKey]) requestAnimationFrame(() => clInitView(clKey, page));
    }
  } catch (err) {
    console.error('[reloadPage]', page, err);
    if (window.xmToast) {
      window.xmToast('Erreur', 'Impossible de rafraîchir la page', '⚠️', '#dc2626');
    }
  }
}

/** Proxy PAGES : chaque rendu legacy nettoie les styles de transition. */
export function installPagesProxy() {
  const target = window.PAGES || {};
  if (target.__pagesProxy) return;

  const proxy = new Proxy(target, {
    get(t, prop) {
      if (prop === '__pagesProxy') return true;
      const val = t[prop];
      if (typeof val === 'function') {
        return (...args) => {
          clearContentMotionStyles();
          const html = val.apply(t, args);
          const c = document.getElementById('content');
          const page = window.STATE?.page;
          if (c && page && isInteractivePage(page)) {
            c.classList.add('is-interactive-page');
          }
          return html;
        };
      }
      return val;
    },
  });

  window.PAGES = proxy;
  globalThis.PAGES = proxy;
}
