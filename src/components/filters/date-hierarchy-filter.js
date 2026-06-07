/**
 * Filtre hiérarchique date (style Power BI) — Année / Trimestre / Mois / Semaine / Jour.
 */
import {
  DATE_FILTER_LEVELS,
  buildDateFilterOptions as buildRcDateFilterOptions,
  ensureRcDateFilter,
  getDefaultRcDateFilter,
} from '../../data/rc-date.utils.js';
import {
  buildNcDateFilterOptions,
  ensureNcDateFilter,
  getDefaultNcDateFilter,
} from '../../data/nc-date.utils.js';

const MODULE_CONFIG = {
  rc: {
    ensure: ensureRcDateFilter,
    build: buildRcDateFilterOptions,
    reload: 'rc-liste',
    filter: () => window.filterRC?.(),
    filterAttr: 'data-rc-filter',
  },
  nc: {
    ensure: ensureNcDateFilter,
    build: buildNcDateFilterOptions,
    reload: 'nc-liste',
    filter: () => window.filterNC?.(),
    filterAttr: 'data-nc-filter',
  },
};

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function cfg(prefix) {
  return MODULE_CONFIG[prefix] || MODULE_CONFIG.rc;
}

/**
 * @param {object[]} data
 * @param {{ prefix?: string }} [opts]
 */
export function renderDateHierarchyFilter(data, opts = {}) {
  const prefix = opts.prefix || 'rc';
  const c = cfg(prefix);
  const state = c.ensure();
  const levelDef = DATE_FILTER_LEVELS.find((l) => l.id === state.level) || DATE_FILTER_LEVELS[0];
  const options = c.build(data, state.level);
  const value = options.some((o) => o.value === state.value) ? state.value : 'Tous';

  return `<div class="date-hier-filter" data-date-hier="${esc(prefix)}">
    <div class="date-hier-level-wrap">
      <button type="button" class="date-hier-trigger" data-date-hier-toggle="${esc(prefix)}" aria-expanded="false" aria-haspopup="listbox">
        <span class="date-hier-trigger-title">Date de création</span>
        <span class="date-hier-trigger-level">${esc(levelDef.label)}</span>
        <span class="date-hier-caret" aria-hidden="true">▾</span>
      </button>
      <div class="date-hier-menu" data-date-hier-menu="${esc(prefix)}" hidden role="listbox">
        <div class="date-hier-menu-head">Date de création</div>
        ${DATE_FILTER_LEVELS.map(
          (l) => `<button type="button" role="option" class="date-hier-level-opt${state.level === l.id ? ' active' : ''}"
            data-date-hier-level="${esc(prefix)}" data-level="${l.id}">
            <span class="date-hier-check">${state.level === l.id ? '✓' : ''}</span>
            ${esc(l.label)}
          </button>`
        ).join('')}
      </div>
    </div>
    <select class="sel date-hier-value" id="${esc(prefix)}-date-value" data-date-hier-value="${esc(prefix)}" ${c.filterAttr}>
      <option value="Tous">Toutes</option>
      ${options
        .map(
          (o) =>
            `<option value="${esc(o.value)}"${o.value === value ? ' selected' : ''}>${esc(o.label)} (${o.count})</option>`
        )
        .join('')}
    </select>
  </div>`;
}

const boundPrefixes = new Set();

function closeMenus(except) {
  document.querySelectorAll('[data-date-hier-menu]').forEach((m) => {
    if (m.dataset.dateHierMenu !== except) {
      m.hidden = true;
      m.closest('.date-hier-level-wrap')
        ?.querySelector('[data-date-hier-toggle]')
        ?.setAttribute('aria-expanded', 'false');
    }
  });
}

function bindGlobalHandlers() {
  if (window.__dateHierBound) return;
  window.__dateHierBound = true;

  document.addEventListener('click', (e) => {
    const toggle = e.target.closest('[data-date-hier-toggle]');
    if (toggle) {
      const p = toggle.dataset.dateHierToggle;
      const menu = document.querySelector(`[data-date-hier-menu="${p}"]`);
      if (!menu) return;
      const open = menu.hidden;
      closeMenus(p);
      menu.hidden = !open;
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      return;
    }

    const levelBtn = e.target.closest('[data-date-hier-level]');
    if (levelBtn) {
      const p = levelBtn.dataset.dateHierLevel;
      const c = cfg(p);
      const state = c.ensure();
      state.level = levelBtn.dataset.level;
      state.value = 'Tous';
      closeMenus(null);
      window.reloadPage?.(c.reload) ?? c.filter();
      return;
    }

    if (!e.target.closest('.date-hier-filter')) closeMenus(null);
  });

  document.addEventListener('change', (e) => {
    const sel = e.target.closest('[data-date-hier-value]');
    if (!sel) return;
    const p = sel.dataset.dateHierValue;
    cfg(p).ensure().value = sel.value;
    cfg(p).filter();
  });
}

export function bindDateHierarchyFilter(prefix = 'rc') {
  bindGlobalHandlers();
  if (boundPrefixes.has(prefix)) return;
  boundPrefixes.add(prefix);
}

export function refreshDateHierarchyValues(data, prefix = 'rc') {
  const c = cfg(prefix);
  const state = c.ensure();
  const sel = document.getElementById(`${prefix}-date-value`);
  if (!sel) return;
  const options = c.build(data, state.level);
  const cur = options.some((o) => o.value === state.value) ? state.value : 'Tous';
  state.value = cur;
  sel.innerHTML =
    `<option value="Tous">Toutes</option>` +
    options.map((o) => `<option value="${esc(o.value)}">${esc(o.label)} (${o.count})</option>`).join('');
  sel.value = cur;
}

export { getDefaultRcDateFilter, getDefaultNcDateFilter };
