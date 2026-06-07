/**
 * Analyse PESTEL — suivi des révisions ISO.
 */
import { seedCst, getCstPestel } from '../../data/cst.data.js';
import { esc, impactDisplay } from '../../components/cst/cst-utils.js';
import { applyTraceFilters } from '../../components/cst/cst-entity-revisions.js';
import {
  getTraceFilter,
  renderItemTraceMeta,
  renderModuleHistoryPanel,
  renderTraceHistoryBtn,
  renderTraceToolbar,
} from '../../components/cst/cst-trace-ui.js';

function filterPestel(list) {
  const q = (window.xm_cst_pestel_q || '').toLowerCase();
  let items = list;
  if (q) {
    items = items.filter((p) =>
      [p.facteur, p.analyse, p.action, p.impact].join(' ').toLowerCase().includes(q)
    );
  }
  return applyTraceFilters(items, getTraceFilter('cst-pestel'), { statutField: 'impact' });
}

export function renderCstPestel() {
  seedCst();
  const all = getCstPestel();
  const filtered = filterPestel(all);
  const rows = filtered
    .map(
      (p) => `<tr>
      <td style="font-weight:700">${esc(p.ic)} ${esc(p.facteur)}</td>
      <td style="font-size:var(--fs-sm)">${esc(p.analyse)}</td>
      <td>${impactDisplay(p.impact)}</td>
      <td style="font-size:var(--fs-sm)">${esc(p.action)}</td>
      <td style="font-size:var(--fs-xs)">${renderItemTraceMeta(p)}</td>
      <td style="white-space:nowrap">
        ${renderTraceHistoryBtn('pestel', p.id)}
        <button type="button" class="btn bsm" data-cst-pestel-edit="${esc(p.id)}">✏</button>
      </td>
    </tr>`
    )
    .join('');

  return `<div data-page="cst-pestel" class="xm-register xm-register--cst">
    <div class="card">
      <div class="ch">
        <span class="ct">Analyse PESTEL</span>
        <button type="button" class="btn bsm bp" data-cst-pestel-add>+ Ajouter</button>
      </div>
      <p class="cst-page-lead">Suivi des mises à jour — dates de révision, auteurs et versions successives</p>
      ${renderTraceToolbar('cst-pestel', { responsableLabel: 'Auteur modification', statuts: ['+', '—', '~'] })}
      <div class="cst-table-scroll">
        <table class="tbl xm-export-table"><thead><tr><th>Facteur</th><th>Analyse</th><th>Impact</th><th>Action / Réponse</th><th>Traçabilité</th><th></th></tr></thead>
        <tbody>${rows || '<tr><td colspan="6">Aucun facteur</td></tr>'}</tbody></table>
      </div>
      <p class="cst-table-foot">${filtered.length} / ${all.length} facteurs</p>
    </div>
    ${renderModuleHistoryPanel('cst-pestel')}
  </div>`;
}
