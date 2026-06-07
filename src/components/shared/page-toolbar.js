/**
 * Barre d'outils unifiée — recherche, filtres optionnels, export Excel/PDF.
 */
function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

/**
 * @param {object} opts
 * @param {string} opts.exportKey — clé XM_LIST_EXPORTS
 * @param {string} [opts.searchKey] — préfixe window xm_{key}_q
 * @param {string} [opts.pageId] — page pour reloadPage
 * @param {string} [opts.placeholder]
 * @param {string} [opts.extraHtml]
 * @param {string} [opts.filtersHtml]
 */
export function renderPageToolbar(opts) {
  const {
    exportKey,
    searchKey = exportKey,
    pageId = '',
    placeholder = 'Rechercher…',
    extraHtml = '',
    filtersHtml = '',
  } = opts;
  const q = window[`xm_${searchKey}_q`] || '';

  return `<div class="xm-page-toolbar card">
    <div class="xm-page-toolbar-row">
      <div class="xm-page-search">
        <input type="search" class="fi" placeholder="${esc(placeholder)}" value="${esc(q)}"
          data-xm-page-search="${esc(searchKey)}" data-xm-reload-page="${esc(pageId)}">
      </div>
      ${filtersHtml}
      <div class="xm-page-toolbar-actions">
        <button type="button" class="btn bsm" data-xm-export-csv="${esc(exportKey)}">Excel</button>
        <button type="button" class="btn bsm" data-xm-export-pdf="${esc(exportKey)}">PDF</button>
        ${extraHtml}
      </div>
    </div>
  </div>`;
}
