/**
 * Comportements transverses — toolbar listes, archivage, export, pagination.
 */
import { isoToFr, renderPaginationHtml } from '../components/shared/list-toolbar.js';
import { exportRowsToCsv, printPageAsPdf } from '../components/shared/export-csv.js';
import { withLoading } from '../components/shared/loading-state.js';
import { listNc, archiveNc, restoreNc, hardDeleteNc } from '../data/nc-repository.js';
import { listRc, archiveRc, restoreRc, hardDeleteRc } from '../data/rc-repository.js';

const LIST_CONFIG = {
  nc: {
    list: listNc,
    archive: archiveNc,
    restore: restoreNc,
    hardDelete: hardDeleteNc,
    refreshPage: 'nc-liste',
    filterFn: 'filterNC',
    filename: 'non-conformites.csv',
    pdfTitle: 'Liste des non-conformités',
    columns: [
      { label: 'N°', key: 'n' },
      { label: 'Date', key: 'd' },
      { label: 'Projet', key: 'p' },
      { label: 'Département', key: 'dep' },
      { label: 'Description', key: 'desc' },
      { label: 'Gravité', key: 'g' },
      { label: 'Statut', key: 's' },
      { label: 'Responsable', key: 'r' },
    ],
  },
  rc: {
    list: listRc,
    archive: archiveRc,
    restore: restoreRc,
    hardDelete: hardDeleteRc,
    refreshPage: 'rc-liste',
    filterFn: 'filterRC',
    filename: 'reclamations-clients.csv',
    pdfTitle: 'Réclamations clients',
    columns: [
      { label: 'N°', key: 'n' },
      { label: 'Date', key: 'd' },
      { label: 'Projet', key: 'p' },
      { label: 'Client', key: 'cl' },
      { label: 'Objet', key: 'obj' },
      { label: 'Gravité', key: 'g' },
      { label: 'Statut', key: 's' },
      { label: 'Responsable', key: 'r' },
    ],
  },
};

function getState(prefix) {
  if (!window[`${prefix}ListState`]) {
    window[`${prefix}ListState`] = { archived: false, page: 1, pageSize: 15, dateFrom: '', dateTo: '' };
  }
  return window[`${prefix}ListState`];
}

function buildFilters(prefix) {
  const st = getState(prefix);
  const fq = document.getElementById(`${prefix}-fq`)?.value || '';
  return {
    q: fq,
    status: document.getElementById(`${prefix}-fs`)?.value || document.querySelector(`[data-xm-filter-status="${prefix}"]`)?.value || 'Tous',
    priority: document.getElementById(`${prefix}-fg`)?.value || document.querySelector(`[data-xm-filter-priority="${prefix}"]`)?.value || 'Tous',
    responsible: document.querySelector(`[data-xm-filter-resp="${prefix}"]`)?.value || 'Tous',
    dateFrom: isoToFr(st.dateFrom),
    dateTo: isoToFr(st.dateTo),
    custom: prefix === 'nc' ? window.__ncCustomFilter : window.__rcCustomFilter,
  };
}

export function queryList(prefix) {
  const cfg = LIST_CONFIG[prefix];
  if (!cfg) return { items: [], total: 0 };
  const st = getState(prefix);
  return cfg.list({
    includeArchived: st.archived,
    filters: buildFilters(prefix),
    page: st.page,
    pageSize: st.pageSize,
  });
}

function refreshList(prefix) {
  const cfg = LIST_CONFIG[prefix];
  if (!cfg) return;
  withLoading(async () => {
    if (typeof window[cfg.filterFn] === 'function') window[cfg.filterFn]();
    else if (typeof window.reloadPage === 'function') window.reloadPage(cfg.refreshPage);
    updatePagination(prefix);
  });
}

function updatePagination(prefix) {
  const st = getState(prefix);
  const { total } = queryList(prefix);
  const el = document.querySelector(`[data-xm-pagination="${prefix}"]`);
  if (el) el.innerHTML = renderPaginationHtml(prefix, { page: st.page, pageSize: st.pageSize, total });
}

export function installPlatformEnhancements() {
  document.addEventListener('click', (e) => {
    const archToggle = e.target.closest('[data-xm-archive-toggle]');
    if (archToggle) {
      const prefix = archToggle.dataset.xmArchiveToggle;
      const st = getState(prefix);
      st.archived = !st.archived;
      st.page = 1;
      refreshList(prefix);
      return;
    }
    const reset = e.target.closest('[data-xm-reset-filters]');
    if (reset) {
      const prefix = reset.dataset.xmResetFilters;
      const st = getState(prefix);
      st.dateFrom = '';
      st.dateTo = '';
      st.page = 1;
      document.querySelector(`[data-xm-date-from="${prefix}"]`) && (document.querySelector(`[data-xm-date-from="${prefix}"]`).value = '');
      document.querySelector(`[data-xm-date-to="${prefix}"]`) && (document.querySelector(`[data-xm-date-to="${prefix}"]`).value = '');
      document.getElementById(`${prefix}-reset-filters`)?.click();
      refreshList(prefix);
      return;
    }
    const refresh = e.target.closest('[data-xm-refresh]');
    if (refresh) {
      refreshList(refresh.dataset.xmRefresh);
      return;
    }
    const csv = e.target.closest('[data-xm-export-csv]');
    if (csv) {
      const prefix = csv.dataset.xmExportCsv;
      const cfg = LIST_CONFIG[prefix];
      if (cfg) {
        const { items } = queryList(prefix);
        exportRowsToCsv(cfg.filename, items, cfg.columns);
      } else {
        window.xmExportList?.(prefix);
      }
      return;
    }
    const pdf = e.target.closest('[data-xm-export-pdf]');
    if (pdf) {
      const prefix = pdf.dataset.xmExportPdf;
      if (LIST_CONFIG[prefix]) printPageAsPdf(LIST_CONFIG[prefix]?.pdfTitle);
      else window.xmPrintList?.(prefix);
      return;
    }
    const genExport = e.target.closest('[data-xm-export]');
    if (genExport) {
      window.xmExportList?.(genExport.dataset.xmExport);
      return;
    }
    const genPdf = e.target.closest('[data-xm-print]');
    if (genPdf) {
      window.xmPrintList?.(genPdf.dataset.xmPrint);
      return;
    }
    const prev = e.target.closest('[data-xm-page-prev]');
    if (prev) {
      const st = getState(prev.dataset.xmPagePrev);
      st.page = Math.max(1, st.page - 1);
      refreshList(prev.dataset.xmPagePrev);
      return;
    }
    const next = e.target.closest('[data-xm-page-next]');
    if (next) {
      const st = getState(next.dataset.xmPageNext);
      st.page += 1;
      refreshList(next.dataset.xmPageNext);
      return;
    }
    const arch = e.target.closest('[data-xm-archive-item]');
    if (arch) {
      const prefix = arch.dataset.xmArchivePrefix;
      const id = arch.dataset.xmArchiveId;
      const cfg = LIST_CONFIG[prefix];
      if (!cfg || !id) return;
      if (confirm('Archiver cet élément ?')) cfg.archive(id);
      refreshList(prefix);
      return;
    }
    const restore = e.target.closest('[data-xm-restore-item]');
    if (restore) {
      const prefix = restore.dataset.xmArchivePrefix;
      const id = restore.dataset.xmArchiveId;
      const cfg = LIST_CONFIG[prefix];
      if (cfg && id && confirm('Restaurer cet élément ?')) cfg.restore(id);
      refreshList(prefix);
      return;
    }
    const hardDel = e.target.closest('[data-xm-hard-delete-item]');
    if (hardDel) {
      const prefix = hardDel.dataset.xmArchivePrefix;
      const id = hardDel.dataset.xmArchiveId;
      const cfg = LIST_CONFIG[prefix];
      if (cfg && id && confirm('Suppression définitive — irréversible. Continuer ?')) cfg.hardDelete(id);
      refreshList(prefix);
      return;
    }
  });

  document.addEventListener('input', (e) => {
    const search = e.target.closest('[data-xm-page-search]');
    if (!search) return;
    const key = search.dataset.xmPageSearch.replace(/-/g, '_');
    window[`xm_${key}_q`] = search.value;
    const pageId = search.dataset.xmReloadPage || window.STATE?.page;
    if (pageId && typeof window.reloadPage === 'function') window.reloadPage(pageId);
  });

  document.addEventListener('change', (e) => {
    const ps = e.target.closest('[data-xm-page-size]');
    if (ps) {
      const st = getState(ps.dataset.xmPageSize);
      st.pageSize = parseInt(ps.value, 10) || 15;
      st.page = 1;
      refreshList(ps.dataset.xmPageSize);
      return;
    }
    const df = e.target.closest('[data-xm-date-from]');
    if (df) {
      getState(df.dataset.xmDateFrom).dateFrom = df.value;
      refreshList(df.dataset.xmDateFrom);
      return;
    }
    const dt = e.target.closest('[data-xm-date-to]');
    if (dt) {
      getState(dt.dataset.xmDateTo).dateTo = dt.value;
      refreshList(dt.dataset.xmDateTo);
    }
  });

  window.xmRefreshList = refreshList;
  window.xmUpdatePagination = updatePagination;
}
