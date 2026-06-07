/**
 * Panneau de contrôle type Odoo — recherche, favoris, filtres, regroupement.
 */
import { getOdooState } from '../../core/odoo-list-engine.js';
import { renderIcon } from '../icons/icon-render.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * @param {object} opts
 * @param {string} opts.prefix — rc | nc
 * @param {string} opts.title
 * @param {string} [opts.subtitle]
 * @param {string} opts.searchId — ex. rc-fq
 * @param {string} opts.searchPlaceholder
 * @param {string} opts.dataFilterAttr — data-rc-filter | data-nc-filter
 * @param {Array<{id:string,label:string,desc?:string}>} opts.presets
 * @param {Array<{id:string,label:string,field?:string}>} opts.groupByOptions
 * @param {string} [opts.filtersHtml] — selects + date hierarchy
 * @param {string} [opts.actionsHtml] — boutons droite
 * @param {string} [opts.countId] — rc-cnt
 */
export function renderOdooControlPanel(opts) {
  const {
    prefix,
    title,
    subtitle = '',
    searchId,
    searchPlaceholder,
    dataFilterAttr,
    presets,
    groupByOptions,
    filtersHtml = '',
    actionsHtml = '',
    countId,
  } = opts;

  const st = getOdooState(prefix);
  const presetLabel = presets.find((p) => p.id === st.preset)?.label ?? 'Tous';

  const presetMenu = presets
    .map(
      (p) => `
    <button type="button" class="odoo-dd-item${st.preset === p.id ? ' odoo-dd-item-active' : ''}"
      data-odoo-preset="${esc(prefix)}" data-odoo-preset-id="${esc(p.id)}">
      <span class="odoo-dd-label">${esc(p.label)}</span>
      ${p.desc ? `<span class="odoo-dd-desc">${esc(p.desc)}</span>` : ''}
    </button>`
    )
    .join('');

  const groupMenu = groupByOptions
    .map(
      (g) => `
    <button type="button" class="odoo-dd-item${st.groupBy === g.id ? ' odoo-dd-item-active' : ''}"
      data-odoo-group="${esc(prefix)}" data-odoo-group-id="${esc(g.id)}">
      ${esc(g.label)}
    </button>`
    )
    .join('');

  return `
  <div class="odoo-cp" data-odoo-cp="${esc(prefix)}">
    <div class="odoo-cp-bar card" style="padding:10px 12px;margin-bottom:0;border-radius:12px 12px 0 0">
      <div class="odoo-cp-title-row">
        <div>
          <h2 class="odoo-cp-title">${esc(title)}</h2>
          ${subtitle ? `<p class="odoo-cp-sub">${esc(subtitle)}</p>` : ''}
        </div>
        <div class="odoo-cp-actions">${actionsHtml}</div>
      </div>
      <div class="odoo-cp-toolbar">
        <div class="odoo-search">
          ${renderIcon('search', { size: 14 })}
          <input id="${esc(searchId)}" type="search" placeholder="${esc(searchPlaceholder)}"
            ${dataFilterAttr} class="odoo-search-input" />
        </div>
        <div class="odoo-cp-dropdown" data-odoo-dd="preset-${esc(prefix)}">
          <button type="button" class="odoo-cp-btn" data-odoo-dd-toggle="preset-${esc(prefix)}">
            Favoris: ${esc(presetLabel)} ▾
          </button>
          <div class="odoo-dd-menu" hidden data-odoo-dd-menu="preset-${esc(prefix)}">${presetMenu}</div>
        </div>
        <div class="odoo-cp-dropdown" data-odoo-dd="filters-${esc(prefix)}">
          <button type="button" class="odoo-cp-btn" data-odoo-dd-toggle="filters-${esc(prefix)}">
            Filtres ▾
          </button>
          <div class="odoo-dd-menu odoo-dd-menu-wide" hidden data-odoo-dd-menu="filters-${esc(prefix)}">
            <p class="odoo-dd-heading">Filtres avancés</p>
            ${filtersHtml}
          </div>
        </div>
        <div class="odoo-cp-dropdown" data-odoo-dd="group-${esc(prefix)}">
          <button type="button" class="odoo-cp-btn" data-odoo-dd-toggle="group-${esc(prefix)}">
            Regrouper ▾
          </button>
          <div class="odoo-dd-menu" hidden data-odoo-dd-menu="group-${esc(prefix)}">${groupMenu}</div>
        </div>
        <button type="button" class="odoo-cp-btn" id="${esc(prefix)}-reset-filters">↺ Réinitialiser</button>
        ${countId ? `<span id="${esc(countId)}" class="odoo-cp-count"></span>` : ''}
      </div>
    </div>
    <div class="odoo-cp-chips card" data-odoo-chips="${esc(prefix)}" style="padding:6px 12px;border-radius:0;border-top:0"></div>
  </div>`;
}

/** Met à jour les jetons de filtres actifs */
export function refreshOdooChips(prefix, chips) {
  const el = document.querySelector(`[data-odoo-chips="${prefix}"]`);
  if (!el) return;
  const st = getOdooState(prefix);
  const parts = [];
  if (st.preset && st.preset !== 'all') {
    const p = chips.presetLabel ?? st.preset;
    parts.push(`<span class="odoo-chip">Favori: ${esc(p)}</span>`);
  }
  if (st.groupBy) {
    parts.push(`<span class="odoo-chip">Groupe: ${esc(chips.groupLabel ?? st.groupBy)}</span>`);
  }
  (chips.fields ?? []).forEach((f) => {
    parts.push(`<span class="odoo-chip">${esc(f)}</span>`);
  });
  const q = document.getElementById(chips.searchId)?.value?.trim();
  if (q) parts.push(`<span class="odoo-chip">Recherche: « ${esc(q)} »</span>`);
  el.innerHTML =
    parts.length > 0
      ? `<span class="odoo-chip-meta">${chips.total ?? 0} enregistrement(s)</span> ${parts.join('')}`
      : `<span class="odoo-chip-meta">${chips.total ?? 0} enregistrement(s)</span>`;
}

/**
 * @param {string} prefix
 * @param {{ onApply: () => void, onReset: () => void, presets: Array, groupByOptions: Array, searchId: string }} hooks
 */
export function bindOdooControlPanel(prefix, hooks) {
  const st = getOdooState(prefix);

  document.querySelectorAll(`[data-odoo-preset="${prefix}"]`).forEach((btn) => {
    btn.addEventListener('click', () => {
      st.preset = btn.getAttribute('data-odoo-preset-id') || 'all';
      closeAllOdooDropdowns();
      hooks.onApply?.();
    });
  });

  document.querySelectorAll(`[data-odoo-group="${prefix}"]`).forEach((btn) => {
    btn.addEventListener('click', () => {
      st.groupBy = btn.getAttribute('data-odoo-group-id') || '';
      closeAllOdooDropdowns();
      hooks.onApply?.();
    });
  });

  document.querySelectorAll('[data-odoo-dd-toggle]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-odoo-dd-toggle');
      const menu = document.querySelector(`[data-odoo-dd-menu="${id}"]`);
      if (!menu) return;
      const open = menu.hidden;
      closeAllOdooDropdowns();
      menu.hidden = !open;
    });
  });

  if (!window.__odooCpDocClick) {
    window.__odooCpDocClick = true;
    document.addEventListener('click', (e) => {
      if (e.target.closest('.odoo-cp-dropdown')) return;
      closeAllOdooDropdowns();
    });
  }

  document.getElementById(`${prefix}-reset-filters`)?.addEventListener('click', () => {
    st.preset = 'all';
    st.groupBy = '';
    hooks.onReset?.();
  });
}

function closeAllOdooDropdowns() {
  document.querySelectorAll('[data-odoo-dd-menu]').forEach((m) => {
    m.hidden = true;
  });
}
