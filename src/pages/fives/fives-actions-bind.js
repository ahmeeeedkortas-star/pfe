/**
 * Bindings — Kanban actions 5S (drag & drop, filtres, fiche).
 */
import { persistFivesV11 } from './fives-persist.js';

function reload() {
  window.reloadPage?.('5s-actions');
}

export function bindFivesActionsPage() {
  const root = document.getElementById('ss5-actions-root');
  if (!root || root.dataset.bound) return;
  root.dataset.bound = '1';

  let dragId = null;

  root.addEventListener('dragstart', (e) => {
    const card = e.target.closest('.ss5-kanban-card');
    if (!card) return;
    dragId = card.dataset.actionId;
    card.classList.add('is-dragging');
    e.dataTransfer?.setData('text/plain', dragId);
    e.dataTransfer.effectAllowed = 'move';
  });

  root.addEventListener('dragend', (e) => {
    e.target.closest('.ss5-kanban-card')?.classList.remove('is-dragging');
    root.querySelectorAll('.ss5-kanban-col__body').forEach((z) => z.classList.remove('is-drag-over'));
    dragId = null;
  });

  root.querySelectorAll('[data-drop-zone]').forEach((zone) => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('is-drag-over');
    });
    zone.addEventListener('dragleave', () => zone.classList.remove('is-drag-over'));
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('is-drag-over');
      const id = dragId || e.dataTransfer?.getData('text/plain');
      const newStatus = zone.dataset.dropZone;
      if (!id || !newStatus) return;
      const a = (window.SS5_ACTIONS || []).find((x) => x.id === id);
      if (!a || a.statut === newStatus) return;
      a.statut = newStatus;
      if (newStatus === 'Clôturée') a.prog = 100;
      if (newStatus === 'À faire' && a.prog === 100) a.prog = 0;
      persistFivesV11();
      window.ss5Notify?.('Statut mis à jour', `${a.action.slice(0, 40)} → ${newStatus}`, 'success');
      reload();
    });
  });

  root.addEventListener('click', (e) => {
    const viewBtn = e.target.closest('[data-ss5-act-view]');
    if (viewBtn) {
      window.ss5ActView = viewBtn.dataset.ss5ActView;
      reload();
      return;
    }

    if (e.target.closest('[data-ss5-act-new]')) {
      window.ss5ActPresetStatus = 'À faire';
      window.ss5NewAction?.();
      return;
    }

    if (e.target.closest('[data-ss5-act-export]')) {
      window.ss5Export?.('actions');
      return;
    }

    if (e.target.closest('[data-ss5-act-reset]')) {
      window.ss5ActFZ = 'Tous';
      window.ss5ActFS = 'Tous';
      window.ss5ActFP = 'Tous';
      window.ss5ActFQ = '';
      reload();
      return;
    }

    const addCol = e.target.closest('[data-ss5-act-add]');
    if (addCol) {
      window.ss5ActPresetStatus = addCol.dataset.ss5ActAdd;
      window.ss5NewAction?.();
      return;
    }

    const del = e.target.closest('[data-ss5-act-delete]');
    if (del) {
      if (confirm('Supprimer cette action ?')) {
        window.SS5_ACTIONS = (window.SS5_ACTIONS || []).filter((x) => x.id !== del.dataset.ss5ActDelete);
        persistFivesV11();
        window.ss5Notify?.('Action supprimée', del.dataset.ss5ActDelete, 'warn');
        reload();
      }
      return;
    }

    const edit = e.target.closest('[data-ss5-act-edit]');
    if (edit) {
      window.ss5EditAction?.(edit.dataset.ss5ActEdit);
      return;
    }

    const card = e.target.closest('.ss5-kanban-card');
    if (card && !e.target.closest('[data-ss5-act-delete]')) {
      window.ss5EditAction?.(card.dataset.actionId);
    }
  });

  root.addEventListener('change', (e) => {
    const sel = e.target.closest('[data-ss5-act-filter]');
    if (sel) {
      const k = sel.dataset.ss5ActFilter;
      if (k === 'zone') window.ss5ActFZ = sel.value;
      if (k === 'statut') window.ss5ActFS = sel.value;
      if (k === 'prio') window.ss5ActFP = sel.value;
      reload();
    }
  });

  const search = root.querySelector('[data-ss5-act-search]');
  if (search) {
    let timer;
    search.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        window.ss5ActFQ = search.value;
        reload();
      }, 300);
    });
  }
}

export function installFivesActionsGlobals() {
  const wrapReload = (pageId) => {
    const orig = window.reloadPage;
    window.reloadPage = (pid) => {
      if (typeof orig === 'function') orig(pid || pageId);
      else window.goPage?.(pageId);
    };
  };

  const origEdit = window.ss5EditAction;
  window.ss5EditAction = function (id) {
    wrapReload('5s-actions');
    const origSave = window.ss5Modal;
    origEdit?.(id);
    setTimeout(() => persistFivesV11(), 500);
  };

  const origNew = window.ss5NewAction;
  window.ss5NewAction = function () {
    wrapReload('5s-actions');
    origNew?.();
    setTimeout(() => persistFivesV11(), 500);
  };
}
