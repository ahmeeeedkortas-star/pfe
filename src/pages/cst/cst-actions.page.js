/**
 * Plan d'actions stratégique.
 */
import { seedCst, getCstActions } from '../../data/cst.data.js';
import { esc, prioriteBadge, cstStatutBadge, progBar } from '../../components/cst/cst-utils.js';
import { renderKpiCardCenter } from '../../components/icons/ui-helpers.js';
import { renderMiniToolbar } from '../../components/shared/list-toolbar-mini.js';

function filterActs(list) {
  const q = (window.xm_cst_actions_q || '').toLowerCase();
  if (!q) return list;
  return list.filter((a) =>
    [a.id, a.action, a.origine, a.resp, a.statut, a.priorite].join(' ').toLowerCase().includes(q)
  );
}

export function renderCstActions() {
  seedCst();
  const acts = getCstActions();
  const filtered = filterActs(acts);
  const clos = acts.filter((a) => a.statut === 'Clôturée').length;
  const retard = acts.filter((a) => a.statut === 'En retard').length;
  const avg =
    acts.length ? Math.round(acts.reduce((s, a) => s + (a.prog || 0), 0) / acts.length) : 0;

  const rows = filtered
    .map(
      (a) => `<tr>
      <td class="reg-id">${esc(a.id)}</td>
      <td style="font-weight:600">${esc(a.action)}</td>
      <td style="font-size:var(--fs-xs)">${esc(a.origine)}</td>
      <td>${esc(a.resp)}</td>
      <td style="font-size:var(--fs-sm)">${esc(a.delai)}</td>
      <td>${prioriteBadge(a.priorite)}</td>
      <td>${cstStatutBadge(a.statut)}</td>
      <td style="min-width:110px">${progBar(a.prog, { enRetard: a.statut === 'En retard' })}</td>
      <td><button type="button" class="btn bsm" data-cst-action-edit="${esc(a.id)}">✏</button></td>
    </tr>`
    )
    .join('');

  return `<div data-page="cst-actions" class="xm-register xm-register--cst">
    <div class="cst-kpi-row cst-kpi-row--4">
      ${renderKpiCardCenter('Total', acts.length, 'var(--blue)', 'list', null)}
      ${renderKpiCardCenter('Clôturées', clos, 'var(--green)', 'check-circle', null)}
      ${renderKpiCardCenter('En retard', retard, 'var(--red)', 'alert', null)}
      ${renderKpiCardCenter('Avancement moyen', avg + '%', avg >= 50 ? 'var(--green)' : 'var(--orange)', 'chart-pie', null)}
    </div>
    ${renderMiniToolbar('cst-actions', '', { pageId: 'cst-actions' })}
    <div class="card">
      <div class="ch"><span class="ct">Plan d&apos;actions stratégique</span><button type="button" class="btn bsm bp" data-cst-action-add>+ Nouvelle action</button></div>
      <div class="cst-table-scroll">
        <table class="tbl xm-export-table"><thead><tr><th>ID</th><th>Action</th><th>Origine</th><th>Responsable</th><th>Échéance</th><th>Priorité</th><th>Statut</th><th>Progression</th><th></th></tr></thead>
        <tbody>${rows}</tbody></table>
      </div>
    </div>
  </div>`;
}
