/** Barre export / refresh compacte pour listes sans archivage NC/RC. */
function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * @param {string} prefix — clé XM_LIST_EXPORTS
 * @param {string} [extra]
 * @param {{ pageId?: string, placeholder?: string }} [search]
 */
export function renderMiniToolbar(prefix, extra = '', search = null) {
  const searchHtml = search
    ? `<input type="search" class="fi xm-page-search-input" placeholder="${esc(search.placeholder || 'Rechercher…')}"
        value="${esc(window[`xm_${prefix.replace(/-/g, '_')}_q`] || '')}" data-xm-page-search="${esc(prefix)}" data-xm-reload-page="${esc(search.pageId || '')}">`
    : '';
  return `
  <div class="xm-page-toolbar card" style="margin-bottom:10px;padding:10px 12px">
    <div class="xm-page-toolbar-row">
      ${searchHtml}
      <button type="button" class="btn bsm" onclick="typeof window.reloadPage==='function'?window.reloadPage(window.STATE?.page):location.reload()">Rafraîchir</button>
      <button type="button" class="btn bsm" data-xm-export-csv="${esc(prefix)}">Excel</button>
      <button type="button" class="btn bsm" data-xm-export-pdf="${esc(prefix)}">PDF</button>
      ${extra}
    </div>
  </div>`;
}
