/**
 * Contexte de l'organisme + Analyse SWOT (interface fusionnée).
 */
import { seedCst, getCstSwot, getCstContexte } from '../../data/cst.data.js';
import { esc, cstNewBadge } from '../../components/cst/cst-utils.js';
import { downloadCstCsv } from '../../components/cst/cst-export.js';
import { applyTraceFilters } from '../../components/cst/cst-entity-revisions.js';
import {
  getTraceFilter,
  renderItemTraceMeta,
  renderModuleHistoryPanel,
  renderTraceHistoryBtn,
  renderTraceToolbar,
} from '../../components/cst/cst-trace-ui.js';

const QUADS = [
  { key: 'forces', title: 'Forces', ic: '💪', col: '#16a34a', bg: '#f0fdf4' },
  { key: 'faiblesses', title: 'Faiblesses', ic: '⚠', col: '#dc2626', bg: '#fef2f2' },
  { key: 'opportunites', title: 'Opportunités', ic: '🚀', col: '#2563eb', bg: '#eff6ff' },
  { key: 'menaces', title: 'Menaces', ic: '⚡', col: '#f59e0b', bg: '#fffbeb' },
];

function filterSwotItems(items, q, trace) {
  let list = items;
  if (q) {
    const lq = q.toLowerCase();
    list = list.filter(
      (it) =>
        it.texte?.toLowerCase().includes(lq) ||
        it.processus?.toLowerCase().includes(lq) ||
        it.categorie?.toLowerCase().includes(lq)
    );
  }
  return applyTraceFilters(list, trace, { userField: 'updatedBy', respField: 'processus' });
}

export function renderCstSwot() {
  seedCst();
  const swot = getCstSwot();
  const ctx = getCstContexte();
  const q = (window.cst_swotQ || '').toLowerCase();
  const trace = getTraceFilter('cst-swot');

  const cells = QUADS.map((quad) => {
    const items = filterSwotItems(swot[quad.key] || [], q, trace);
    const list = items
      .map(
        (it, i) => `<li class="cst-swot-item cst-swot-item--rich">
          <span class="cst-swot-num" style="background:${quad.col}">${i + 1}</span>
          <div class="cst-swot-item-body">
            <div class="cst-swot-item-top">${cstNewBadge(it)}<span class="cst-swot-item-text">${esc(it.texte)}</span></div>
            <div class="cst-swot-item-meta">
              ${it.processus ? `<span class="cst-tag">Proc. ${esc(it.processus)}</span>` : ''}
              ${it.categorie ? `<span class="cst-tag cst-tag--cat">${esc(it.categorie)}</span>` : ''}
              ${renderItemTraceMeta(it)}
            </div>
          </div>
          <div class="cst-swot-item-actions">
            ${renderTraceHistoryBtn('swot', it.id)}
            <button type="button" class="btn bsm cst-swot-edit" data-cst-swot-edit="${quad.key}" data-cst-swot-id="${esc(it.id)}" title="Modifier">✏</button>
          </div>
        </li>`
      )
      .join('');
    return `<div class="cst-swot-quad" style="border-color:${quad.col}40;background:${quad.bg}">
      <div class="cst-swot-quad-head" style="color:${quad.col}"><span>${quad.ic}</span><span>${quad.title}</span><span class="cst-swot-count">${items.length}</span></div>
      <ul class="cst-swot-list">${list || '<li class="cst-swot-empty">Aucun élément</li>'}</ul>
      <button type="button" class="btn bsm" style="color:${quad.col};border-color:${quad.col}50" data-cst-swot-add="${quad.key}">+ Ajouter</button>
    </div>`;
  }).join('');

  const ctxUser = ctx.updatedBy || ctx.createdBy || '—';

  return `<div data-page="cst-swot" class="xm-register xm-register--cst cst-contexte-swot-page">
    <div class="card cst-contexte-card">
      <div class="ch">
        <span class="ct">Contexte de l'organisme</span>
        <div class="cst-toolbar-actions">
          ${renderTraceHistoryBtn('contexte', 'ctx')}
          <button type="button" class="btn bsm bp" data-cst-contexte-edit>✏ Modifier le contexte</button>
        </div>
      </div>
      <p class="cst-page-lead">Mission, vision et périmètre du SMI · ISO 9001 §4.1 — §4.3</p>
      <div class="cst-contexte-grid">
        <div class="cst-contexte-block"><h3>Mission</h3><p>${esc(ctx.mission)}</p></div>
        <div class="cst-contexte-block"><h3>Vision</h3><p>${esc(ctx.vision)}</p></div>
        <div class="cst-contexte-block cst-contexte-block--full"><h3>Périmètre SMI</h3><p>${esc(ctx.perimetre)}</p></div>
        <div class="cst-contexte-block cst-contexte-block--full"><h3>Activités couvertes</h3><p>${esc(ctx.activites)}</p></div>
      </div>
      <div class="cst-contexte-dates">
        <span>Création : <strong>${esc(ctx.dateCreation)}</strong></span>
        <span>Mise à jour : <strong>${esc(ctx.dateMaj)}</strong></span>
        <span>Modifié par : <strong>${esc(ctxUser)}</strong></span>
        <span>Version : <strong>${esc(ctx.version || 'V1')}</strong></span>
      </div>
    </div>

    <div class="card" style="margin-top:12px">
      <div class="ch">
        <span class="ct">Analyse SWOT</span>
        <div class="cst-toolbar-actions">
          <input type="search" class="fi cst-search-input" placeholder="Filtrer SWOT…" data-cst-search="swot" value="${esc(window.cst_swotQ || '')}">
          <button type="button" class="btn bsm" data-cst-export-csv="swot">Excel</button>
        </div>
      </div>
      <p class="cst-page-lead">Traçabilité ISO — dates, auteurs, révisions · filtres par période et responsable (processus)</p>
      ${renderTraceToolbar('cst-swot', { responsableLabel: 'Processus / responsable', statuts: ['Actif', 'En révision', 'Obsolète'] })}
      <div class="cst-swot-grid">${cells}</div>
    </div>
    ${renderModuleHistoryPanel('cst-swot')}
  </div>`;
}

export function exportCstSwotCsv() {
  const swot = getCstSwot();
  const rows = [];
  for (const q of QUADS) {
    for (const it of swot[q.key] || []) {
      rows.push([q.title, it.texte, it.processus, it.categorie, it.createdAt || '', it.dateMaj || '', it.updatedBy || '']);
    }
  }
  downloadCstCsv('swot-contexte', ['Quadrant', 'Élément', 'Processus', 'Catégorie', 'Création', 'MAJ', 'Auteur'], rows);
}
