/**
 * Objectifs stratégiques — suivi des révisions ISO.
 */
import { seedCst, getCstObjectifs } from '../../data/cst.data.js';
import { esc, objEtatBadge, progBar, cstNewBadge } from '../../components/cst/cst-utils.js';
import { applyTraceFilters } from '../../components/cst/cst-entity-revisions.js';
import {
  getTraceFilter,
  renderItemTraceMeta,
  renderModuleHistoryPanel,
  renderTraceHistoryBtn,
  renderTraceToolbar,
} from '../../components/cst/cst-trace-ui.js';

function filterObjectifs(list) {
  const q = (window.xm_cst_objectifs_q || '').toLowerCase();
  let items = list;
  if (q) {
    items = items.filter((o) =>
      [o.objectif, o.indicateur, o.cible, o.resp, o.etat].join(' ').toLowerCase().includes(q)
    );
  }
  return applyTraceFilters(items, getTraceFilter('cst-objectifs'), { respField: 'resp', statutField: 'etat' });
}

export function renderCstObjectifs() {
  seedCst();
  const all = getCstObjectifs();
  const filtered = filterObjectifs(all);
  const rows = filtered
    .map(
      (o) => `<tr>
      <td style="font-weight:700">${cstNewBadge(o)}${esc(o.objectif)}</td>
      <td>${esc(o.indicateur)}</td>
      <td style="font-weight:800;color:var(--blue)">${esc(o.cible)}</td>
      <td>${objEtatBadge(o.etat)}</td>
      <td>${esc(o.resp)}</td>
      <td style="font-size:var(--fs-sm)">${esc(o.delai)}</td>
      <td style="min-width:120px">${progBar(o.prog)}</td>
      <td style="font-size:var(--fs-xs)">${renderItemTraceMeta(o)}</td>
      <td style="white-space:nowrap">${renderTraceHistoryBtn('objectif', o.id)}<button type="button" class="btn bsm" data-cst-obj-edit="${o.id}">✏</button></td>
    </tr>`
    )
    .join('');

  return `<div data-page="cst-objectifs" class="xm-register xm-register--cst">
    <div class="card">
      <div class="ch">
        <span class="ct">Objectifs stratégiques</span>
        <button type="button" class="btn bsm bp" data-cst-obj-add>+ Ajouter</button>
      </div>
      <p class="cst-page-lead">Suivi des révisions, indicateurs, cibles et plans d'actions — historique complet</p>
      ${renderTraceToolbar('cst-objectifs', { responsableLabel: 'Responsable', statuts: ['En cours', 'À faire', 'Atteint', 'En retard'] })}
      <div class="cst-table-scroll">
        <table class="tbl xm-export-table"><thead><tr>
          <th>Objectif</th><th>Indicateur</th><th>Cible</th><th>État</th><th>Responsable</th><th>Échéance</th><th>Progression</th><th>Traçabilité</th><th></th>
        </tr></thead>
        <tbody>${rows || '<tr><td colspan="9">Aucun objectif</td></tr>'}</tbody></table>
      </div>
      <p class="cst-table-foot">${filtered.length} / ${all.length} objectifs</p>
    </div>
    ${renderModuleHistoryPanel('cst-objectifs')}
  </div>`;
}
