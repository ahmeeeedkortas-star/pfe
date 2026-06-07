/**
 * Plans d'actions 5S — Kanban moderne + liste.
 */
import { esc } from './fives-utils.js';

const COLUMNS = [
  { s: 'À faire', col: '#64748b', bg: '#f8fafc', border: '#e2e8f0' },
  { s: 'En cours', col: '#ea580c', bg: '#fff7ed', border: '#fed7aa' },
  { s: 'En retard', col: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
  { s: 'Clôturée', col: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
];

function prioClass(p) {
  if (p === 'Critique') return 'ss5-prio ss5-prio--crit';
  if (p === 'Haute') return 'ss5-prio ss5-prio--high';
  return 'ss5-prio ss5-prio--norm';
}

function filterActions() {
  const ACT = window.SS5_ACTIONS || [];
  const fZ = window.ss5ActFZ || 'Tous';
  const fS = window.ss5ActFS || 'Tous';
  const fP = window.ss5ActFP || 'Tous';
  const fQ = (window.ss5ActFQ || '').toLowerCase();
  return ACT.filter(
    (a) =>
      (fZ === 'Tous' || a.zone === fZ) &&
      (fS === 'Tous' || a.statut === fS) &&
      (fP === 'Tous' || a.prio === fP) &&
      (!fQ || [a.action, a.zone, a.resp, a.id].join(' ').toLowerCase().includes(fQ))
  );
}

function renderCard(a) {
  const id = esc(a.id);
  const initials = (a.resp || '?')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const overdue = a.statut === 'En retard';
  return `<article class="ss5-kanban-card" draggable="true" data-action-id="${id}" data-action-status="${esc(a.statut)}">
    <div class="ss5-kanban-card__top">
      <span class="${prioClass(a.prio)}">${esc(a.prio)}</span>
      <button type="button" class="ss5-kanban-card__del" data-ss5-act-delete="${id}" title="Supprimer">×</button>
    </div>
    <h4 class="ss5-kanban-card__title">${esc(a.action)}</h4>
    <p class="ss5-kanban-card__zone">${esc(a.zone)} · ${esc(a.type)}</p>
    <div class="ss5-kanban-card__prog">
      <div class="ss5-kanban-card__prog-bar" style="width:${a.prog}%"></div>
    </div>
    <div class="ss5-kanban-card__foot">
      <span class="ss5-kanban-card__avatar" title="${esc(a.resp)}">${initials}</span>
      <span class="ss5-kanban-card__due${overdue ? ' is-late' : ''}">${esc(a.fin)}</span>
      <span class="ss5-kanban-card__pct">${a.prog}%</span>
    </div>
  </article>`;
}

function renderKanban(filtered) {
  return COLUMNS.map((col) => {
    const items = filtered.filter((a) => a.statut === col.s);
    return `<div class="ss5-kanban-col" data-kanban-col="${esc(col.s)}" style="--col:${col.col};--col-bg:${col.bg};--col-border:${col.border}">
      <header class="ss5-kanban-col__head">
        <span>${col.s}</span>
        <span class="ss5-kanban-col__count">${items.length}</span>
      </header>
      <div class="ss5-kanban-col__body" data-drop-zone="${esc(col.s)}">
        ${items.map(renderCard).join('')}
      </div>
      <button type="button" class="ss5-kanban-col__add" data-ss5-act-add="${esc(col.s)}">+ Ajouter</button>
    </div>`;
  }).join('');
}

function renderList(filtered) {
  const rows = filtered
    .map((a) => {
      const id = esc(a.id);
      return `<tr data-action-id="${id}">
        <td><strong>${esc(a.action)}</strong></td>
        <td>${esc(a.zone)}</td>
        <td><span class="${prioClass(a.prio)}">${esc(a.prio)}</span></td>
        <td>${esc(a.resp)}</td>
        <td>${esc(a.fin)}</td>
        <td><span class="ss5-badge">${esc(a.statut)}</span></td>
        <td><div class="ss5-mini-prog"><div style="width:${a.prog}%"></div></div> ${a.prog}%</td>
        <td>
          <button type="button" class="ss5-btn ss5-btn--sm" data-ss5-act-edit="${id}">Modifier</button>
          <button type="button" class="ss5-btn ss5-btn--sm ss5-btn--ghost" data-ss5-act-delete="${id}">Supprimer</button>
        </td>
      </tr>`;
    })
    .join('');

  return `<div class="card ss5-panel">
    <table class="tbl ss5-tbl">
      <thead><tr><th>Action</th><th>Zone</th><th>Priorité</th><th>Responsable</th><th>Échéance</th><th>Statut</th><th>Prog.</th><th></th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`;
}

export function renderFivesActionsPage() {
  const ACT = window.SS5_ACTIONS || [];
  const view = window.ss5ActView || 'kanban';
  const filtered = filterActions();
  const zones = [...new Set(ACT.map((a) => a.zone))].sort();

  const kpis = COLUMNS.map((col) => {
    const n = ACT.filter((a) => a.statut === col.s).length;
    return `<div class="ss5-kpi" style="--ss5-kpi:${col.col};--ss5-kpi-bg:${col.bg}">
      <span class="ss5-kpi__lbl">${col.s}</span>
      <span class="ss5-kpi__val">${n}</span>
    </div>`;
  }).join('');

  const zOpts = zones.map((z) => `<option value="${esc(z)}"${window.ss5ActFZ === z ? ' selected' : ''}>${esc(z)}</option>`).join('');

  return `<div class="fives-page content" id="ss5-actions-root">
    <header class="ss5-page-hero">
      <div>
        <h2 class="ss5-page-hero__title">Plans d'actions 5S</h2>
        <p class="ss5-page-hero__sub">Kanban · suivi · priorités · échéances</p>
      </div>
      <div class="ss5-page-hero__actions">
        <button type="button" class="ss5-btn ss5-btn--primary" data-ss5-act-new>+ Nouvelle action</button>
        <button type="button" class="ss5-btn" data-ss5-act-export>Exporter</button>
      </div>
    </header>

    <div class="ss5-kpi-row ss5-kpi-row--4">${kpis}</div>

    <div class="ss5-filter-bar">
      <div class="ss5-filter-search">
        <input type="search" class="fi" placeholder="Rechercher…" value="${esc(window.ss5ActFQ || '')}" data-ss5-act-search>
      </div>
      <select class="fi ss5-filter-sel" data-ss5-act-filter="zone">
        <option value="Tous">Toutes zones</option>${zOpts}
      </select>
      <select class="fi ss5-filter-sel" data-ss5-act-filter="statut">
        <option value="Tous">Tous statuts</option>
        ${['À faire', 'En cours', 'En retard', 'Clôturée'].map((s) => `<option value="${s}"${window.ss5ActFS === s ? ' selected' : ''}>${s}</option>`).join('')}
      </select>
      <select class="fi ss5-filter-sel" data-ss5-act-filter="prio">
        <option value="Tous">Toutes priorités</option>
        ${['Critique', 'Haute', 'Normale'].map((p) => `<option value="${p}"${window.ss5ActFP === p ? ' selected' : ''}>${p}</option>`).join('')}
      </select>
      <button type="button" class="ss5-btn ss5-btn--ghost ss5-btn--sm" data-ss5-act-reset>Reset</button>
      <span class="ss5-filter-count">${filtered.length} action${filtered.length > 1 ? 's' : ''}</span>
      <div class="ss5-view-toggle">
        <button type="button" class="ss5-view-tab${view === 'kanban' ? ' is-active' : ''}" data-ss5-act-view="kanban">Kanban</button>
        <button type="button" class="ss5-view-tab${view === 'liste' ? ' is-active' : ''}" data-ss5-act-view="liste">Liste</button>
      </div>
    </div>

    ${view === 'kanban' ? `<div class="ss5-kanban-board">${renderKanban(filtered)}</div>` : renderList(filtered)}
  </div>`;
}
