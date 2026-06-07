/** Barre recherche + export pour registres CST. */
import { esc } from './cst-utils.js';

export function renderCstToolbar(pageId, opts = {}) {
  const ph = opts.placeholder || 'Rechercher…';
  return `<div class="cst-register-toolbar">
    <input type="search" class="fi cst-search-input" data-cst-search="${esc(pageId)}" placeholder="${esc(ph)}" aria-label="Rechercher">
    <button type="button" class="btn bsm" data-cst-export-csv="${esc(pageId)}">⬇ Excel</button>
    <button type="button" class="btn bsm" data-cst-export-pdf="${esc(pageId)}">🖨 PDF</button>
  </div>`;
}

export function filterTableRows(root, q) {
  if (!root) return;
  const query = (q || '').trim().toLowerCase();
  root.querySelectorAll('tbody tr[data-cst-row]').forEach((tr) => {
    const text = tr.textContent.toLowerCase();
    tr.hidden = query ? !text.includes(query) : false;
  });
}

export function bindCstToolbar() {
  if (window.__cstToolbarBound) return;
  window.__cstToolbarBound = true;

  document.addEventListener('input', (e) => {
    const inp = e.target.closest('[data-cst-search]');
    if (!inp) return;
    const page = document.querySelector(`[data-page="${inp.dataset.cstSearch}"]`);
    const tbl = page?.querySelector('.tbl');
    filterTableRows(tbl?.closest('.card') || page, inp.value);
  });

  document.addEventListener('click', (e) => {
    const csv = e.target.closest('[data-cst-export-csv]');
    if (csv) {
      import('./cst-export.js').then((m) => m.exportCstTableCsv(csv.dataset.cstExportCsv));
      return;
    }
    const pdf = e.target.closest('[data-cst-export-pdf]');
    if (pdf) {
      import('./cst-export.js').then((m) => m.exportCstPrintPdf(pdf.dataset.cstExportPdf));
    }
  });
}
