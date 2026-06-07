/**
 * Parties intéressées — historique des changements ISO.
 */
import { seedCst, getCstParties } from '../../data/cst.data.js';
import { esc, influenceBadge, starsHtml, cstNewBadge } from '../../components/cst/cst-utils.js';
import { downloadCstCsv } from '../../components/cst/cst-export.js';
import { applyTraceFilters } from '../../components/cst/cst-entity-revisions.js';
import {
  getTraceFilter,
  renderItemTraceMeta,
  renderModuleHistoryPanel,
  renderTraceHistoryBtn,
  renderTraceToolbar,
} from '../../components/cst/cst-trace-ui.js';

function filterParties(list) {
  const q = (window.cst_partiesQ || '').toLowerCase();
  let items = list;
  if (q) {
    items = items.filter((p) =>
      [p.nom, p.besoin, p.exigences, p.com, p.influence].join(' ').toLowerCase().includes(q)
    );
  }
  return applyTraceFilters(items, getTraceFilter('cst-parties'), { statutField: 'influence' });
}

export function renderCstParties() {
  seedCst();
  const all = getCstParties();
  const filtered = filterParties(all);

  const rows = filtered
    .map(
      (p) => `<tr class="${cstIsNewRow(p)}">
      <td style="font-weight:700">${cstNewBadge(p)}${esc(p.nom)}</td>
      <td style="font-size:var(--fs-sm)">${esc(p.besoin)}</td>
      <td style="font-size:var(--fs-sm)">${esc(p.exigences || '—')}</td>
      <td>${influenceBadge(p.influence)}</td>
      <td style="font-size:var(--fs-sm);color:var(--muted)">${esc(p.com)}</td>
      <td>${starsHtml(p.sat)}</td>
      <td style="font-size:var(--fs-xs)">${renderItemTraceMeta(p)}</td>
      <td style="white-space:nowrap">
        ${renderTraceHistoryBtn('partie', p.id)}
        <button type="button" class="btn bsm" data-cst-partie-edit="${esc(p.id)}">✏</button>
      </td>
    </tr>`
    )
    .join('');

  return `<div data-page="cst-parties" class="xm-register xm-register--cst">
    <div class="card">
      <div class="ch">
        <span class="ct">Parties intéressées</span>
        <div class="cst-toolbar-actions">
          <input type="search" class="fi cst-search-input" placeholder="Rechercher…" data-cst-search="parties" value="${esc(window.cst_partiesQ || '')}">
          <button type="button" class="btn bsm bp" data-cst-partie-add>+ Ajouter</button>
          <button type="button" class="btn bsm" data-cst-export-csv="parties">Excel</button>
        </div>
      </div>
      <p class="cst-page-lead">Suivi des modifications des besoins et attentes — historique et filtres ISO</p>
      ${renderTraceToolbar('cst-parties', { responsableLabel: 'Auteur', statuts: ['Élevé', 'Moyen', 'Faible'] })}
      <div class="cst-table-scroll">
        <table class="tbl cst-export-table"><thead><tr>
          <th>Partie</th><th>Besoins / Attentes</th><th>Exigences</th><th>Influence</th><th>Communication</th><th>Satisfaction</th><th>Traçabilité</th><th></th>
        </tr></thead>
        <tbody>${rows || '<tr><td colspan="8" style="text-align:center;color:var(--muted)">Aucune partie</td></tr>'}</tbody></table>
      </div>
      <p class="cst-table-foot">${filtered.length} / ${all.length} parties</p>
    </div>
    ${renderModuleHistoryPanel('cst-parties')}
  </div>`;
}

function cstIsNewRow(p) {
  return p.createdAt && String(p.createdAt).includes('2026') ? 'cst-row-new' : '';
}

export function exportCstPartiesCsv() {
  const rows = getCstParties().map((p) => [
    p.nom, p.besoin, p.exigences || '', p.influence, p.com, p.sat, p.dateMaj, p.updatedBy,
  ]);
  downloadCstCsv('parties-interessees', ['Partie', 'Besoins', 'Exigences', 'Influence', 'Communication', 'Satisfaction', 'MAJ', 'Auteur'], rows);
}
