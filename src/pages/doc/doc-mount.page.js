/**
 * Montage du module Documentation (React) dans #content de la plateforme QHSE.
 * IDs alignés qhse_v11.html + IDs modernes (doc-dash, doc-liste, …).
 */

/** Routes React (MemoryRouter) par id de page plateforme */
export const DOC_PAGE_ROUTES = {
  /* IDs modernes */
  'doc-dash': '/',
  'doc-liste': '/bibliotheque',
  'doc-recherche': '/recherche',
  'doc-validation': '/bibliotheque',
  'doc-admin': '/admin',
  'doc-kpi': '/kpi',
  'doc-new': '/documents/nouveau',

  /* IDs qhse_v11.html */
  'doc-tb': '/',
  'doc-biblio': '/bibliotheque',
  'doc-create': '/documents/nouveau',
  'doc-history': '/recherche',
};

/** Tous les ids qui montent le chunk React Documentation */
export const DOC_PAGE_IDS = Object.keys(DOC_PAGE_ROUTES);

export function isDocPageId(pageId) {
  return DOC_PAGE_IDS.includes(pageId) || pageId.startsWith('doc-');
}

let disposeModule = null;

export function renderDocModule(pageId = 'doc-liste') {
  void pageId;
  return `<div id="doc-react-root" class="doc-module-root">
    <div class="card" style="margin:24px;text-align:center;padding:32px;color:var(--muted)">
      <div style="font-size:22px;margin-bottom:8px">⏳</div>
      <div style="font-size:11px">Chargement du module Documentation…</div>
    </div>
  </div>`;
}

export async function bindDocModule(pageId = 'doc-liste') {
  const path = DOC_PAGE_ROUTES[pageId] || '/bibliotheque';
  const el = document.getElementById('doc-react-root');
  if (!el) return;

  if (disposeModule && typeof window.__DOC_NAV__ === 'function') {
    window.__DOC_NAV__(path);
    return;
  }

  if (disposeModule) {
    disposeModule();
    disposeModule = null;
  }

  try {
    const { mountDocumentationModule } = await import('../../documentation/embed.tsx');
    disposeModule = await mountDocumentationModule(el, path);
  } catch (err) {
    console.error('[doc-module]', err);
    el.innerHTML = `<div class="card" style="margin:16px;color:var(--red)">
      <strong>Module Documentation</strong>
      <p style="margin-top:8px;font-size:12px">Erreur de chargement : ${String(err.message).replace(/</g, '&lt;')}</p>
    </div>`;
  }
}

export function unmountDocModule() {
  if (disposeModule) {
    disposeModule();
    disposeModule = null;
  }
}
