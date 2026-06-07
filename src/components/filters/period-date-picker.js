/**
 * Filtre période moderne — Jour / Semaine / Mois / Année avec pickers natifs (calendrier).
 */
import {
  ACTION_PERIOD_LEVELS,
  collectActionYears,
  ensureActionPeriodFilter,
  formatPeriodSummary,
  resetActionPeriodFilter,
} from '../../data/action-date.utils.js';
import { renderIcon } from '../icons/icon-render.js';

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function pickerInputs(prefix, state, years) {
  return ACTION_PERIOD_LEVELS.map((l) => {
    const hidden = state.level !== l.id;
    if (l.id === 'annee') {
      return `<div class="period-picker-input" data-period-input="${l.id}"${hidden ? ' hidden' : ''}>
        <select class="period-native sel" data-period-value="${esc(prefix)}" aria-label="Année">
          <option value="">Choisir une année…</option>
          ${years.map((y) => `<option value="${y}"${state.value === String(y) ? ' selected' : ''}>${y}</option>`).join('')}
        </select>
      </div>`;
    }
    const val = state.level === l.id ? state.value : '';
    return `<div class="period-picker-input" data-period-input="${l.id}"${hidden ? ' hidden' : ''}>
      <input type="${l.inputType}" class="period-native fi" data-period-value="${esc(prefix)}"
        value="${esc(val)}" aria-label="${esc(l.label)}" />
    </div>`;
  }).join('');
}

/**
 * @param {string} prefix — `rc` | `nc`
 * @param {{ actions?: object[], dateLabel?: string }} [opts]
 */
export function renderPeriodDatePicker(prefix, opts = {}) {
  const state = ensureActionPeriodFilter(prefix);
  const actions = opts.actions || [];
  const years = collectActionYears(actions, state.field);
  const summary = formatPeriodSummary(state);

  return `<div class="period-date-picker" data-period-prefix="${esc(prefix)}">
    <div class="period-date-head">
      <span class="period-date-icon">${renderIcon('calendar', { size: 16 })}</span>
      <div class="period-date-titles">
        <span class="period-date-title">Filtrer par période</span>
        <span class="period-date-summary" data-period-summary="${esc(prefix)}">${esc(summary)}</span>
      </div>
      ${state.enabled ? `<button type="button" class="period-clear-btn" data-period-clear="${esc(prefix)}" title="Toutes les périodes">×</button>` : ''}
    </div>
    <div class="period-date-body">
      <div class="period-level-tabs" role="tablist">
        ${ACTION_PERIOD_LEVELS.map(
          (l) =>
            `<button type="button" role="tab" class="period-level-tab${state.level === l.id ? ' active' : ''}"
              data-period-level="${esc(prefix)}" data-level="${l.id}" aria-selected="${state.level === l.id}">
              ${esc(l.label)}
            </button>`
        ).join('')}
      </div>
      <div class="period-picker-wrap">
        ${pickerInputs(prefix, state, years)}
        <select class="sel period-field-sel" data-period-field="${esc(prefix)}" title="Champ date">
          <option value="fin"${state.field === 'fin' ? ' selected' : ''}>Échéance</option>
          <option value="debut"${state.field === 'debut' ? ' selected' : ''}>Début</option>
        </select>
      </div>
    </div>
  </div>`;
}

const bound = new Set();

/**
 * @param {string} prefix
 * @param {() => void} onChange
 */
export function bindPeriodDatePicker(prefix, onChange) {
  if (bound.has(prefix)) return;
  bound.add(prefix);

  const reload = () => onChange?.();

  document.addEventListener('click', (e) => {
    const levelBtn = e.target.closest(`[data-period-level="${prefix}"]`);
    if (levelBtn) {
      const state = ensureActionPeriodFilter(prefix);
      state.level = levelBtn.dataset.level;
      state.value = '';
      state.enabled = false;
      reload();
      return;
    }
    const clear = e.target.closest(`[data-period-clear="${prefix}"]`);
    if (clear) {
      resetActionPeriodFilter(prefix);
      reload();
    }
  });

  document.addEventListener('change', (e) => {
    const fieldSel = e.target.closest(`[data-period-field="${prefix}"]`);
    if (fieldSel) {
      const state = ensureActionPeriodFilter(prefix);
      state.field = fieldSel.value;
      if (state.enabled && state.value) reload();
      else reload();
      return;
    }
    const valEl = e.target.closest(`[data-period-value="${prefix}"]`);
    if (valEl) {
      const state = ensureActionPeriodFilter(prefix);
      state.value = valEl.value || '';
      state.enabled = Boolean(state.value);
      reload();
    }
  });

  document.addEventListener('focusin', (e) => {
    const inp = e.target.closest(`[data-period-value="${prefix}"]`);
    if (inp && ['date', 'week', 'month'].includes(inp.type)) {
      try {
        inp.showPicker?.();
      } catch {
        /* navigateur sans showPicker */
      }
    }
  });
}

export { resetActionPeriodFilter, ensureActionPeriodFilter, matchActionPeriodFilter } from '../../data/action-date.utils.js';
