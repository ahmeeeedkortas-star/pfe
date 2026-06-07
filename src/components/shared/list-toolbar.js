/**
 * Barre d'outils listes — filtres étendus, archivage, pagination, export, refresh.
 */
function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * @param {object} opts
 */
export function renderListToolbar(opts) {
  const {
    prefix,
    showArchiveToggle = true,
    showDateRange = true,
    showStatus = true,
    showResponsible = false,
    showPriority = false,
    statusOptions = ['Tous', 'En cours', 'Ouvert', 'Clôturé'],
    responsibleOptions = [],
    priorityOptions = ['Tous', 'Critique', 'Majeure', 'Mineure'],
    extraButtons = '',
    archived = false,
  } = opts;

  const state = window[`${prefix}ListState`] || (window[`${prefix}ListState`] = {
    archived: false,
    page: 1,
    pageSize: 15,
    dateFrom: '',
    dateTo: '',
    responsible: 'Tous',
    priority: 'Tous',
  });

  return `
  <div class="card xm-list-toolbar" data-xm-toolbar="${esc(prefix)}">
    <div class="xm-list-toolbar-row">
      ${showArchiveToggle ? `<button type="button" class="btn bsm ${state.archived ? 'bp' : ''}" data-xm-archive-toggle="${esc(prefix)}">${state.archived ? '📂 Archives' : '📋 Actifs'}</button>` : ''}
      ${showDateRange ? `
      <input type="date" class="fi xm-date-input" data-xm-date-from="${esc(prefix)}" title="Date début" value="${state.dateFrom}">
      <input type="date" class="fi xm-date-input" data-xm-date-to="${esc(prefix)}" title="Date fin" value="${state.dateTo}">
      ` : ''}
      ${showStatus ? `<select class="sel" data-xm-filter-status="${esc(prefix)}">${statusOptions.map((s) => `<option${s === 'Tous' ? ' selected' : ''}>${esc(s)}</option>`).join('')}</select>` : ''}
      ${showResponsible && responsibleOptions.length ? `<select class="sel" data-xm-filter-resp="${esc(prefix)}"><option>Tous</option>${responsibleOptions.map((r) => `<option>${esc(r)}</option>`).join('')}</select>` : ''}
      ${showPriority ? `<select class="sel" data-xm-filter-priority="${esc(prefix)}">${priorityOptions.map((p) => `<option>${esc(p)}</option>`).join('')}</select>` : ''}
      <button type="button" class="btn bsm" data-xm-reset-filters="${esc(prefix)}">↺ Réinitialiser</button>
      <button type="button" class="btn bsm" data-xm-refresh="${esc(prefix)}">🔄 Rafraîchir</button>
      <button type="button" class="btn bsm" data-xm-export-csv="${esc(prefix)}">📥 CSV</button>
      <button type="button" class="btn bsm" data-xm-export-pdf="${esc(prefix)}">📄 PDF</button>
      ${extraButtons}
    </div>
    <div class="xm-list-pagination" data-xm-pagination="${esc(prefix)}"></div>
  </div>`;
}

export function renderPaginationHtml(prefix, { page, pageSize, total }) {
  const pages = pageSize > 0 ? Math.max(1, Math.ceil(total / pageSize)) : 1;
  if (pages <= 1) return `<span class="xm-page-info">${total} élément(s)</span>`;
  return `
  <span class="xm-page-info">${total} élément(s) — page ${page}/${pages}</span>
  <button type="button" class="btn bsm" data-xm-page-prev="${esc(prefix)}" ${page <= 1 ? 'disabled' : ''}>‹</button>
  <button type="button" class="btn bsm" data-xm-page-next="${esc(prefix)}" ${page >= pages ? 'disabled' : ''}>›</button>
  <select class="sel" data-xm-page-size="${esc(prefix)}" style="width:auto;font-size:10px">
    ${[10, 15, 25, 50].map((n) => `<option value="${n}"${n === pageSize ? ' selected' : ''}>${n}/page</option>`).join('')}
  </select>`;
}

/** ISO date → jj/mm/aaaa pour filtre repo */
export function isoToFr(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return d && m && y ? `${d}/${m}/${y}` : '';
}
