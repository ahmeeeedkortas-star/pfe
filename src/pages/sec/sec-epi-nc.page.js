/**
 * Non-conformités EPI — registre.
 */
import { esc, renderEpiKpiRow, renderNcHistoryRows, renderPageShell } from '../../components/sec/sec-epi-ui.js';
import { getEmployees, getNcList, initSecEpiStore } from '../../data/sec-epi.store.js';
import { renderXmDynamicSelect } from '../../core/dynamic-lists.js';
import { bindSecEpi } from './sec-epi-bind.js';

export { bindSecEpi };

export function renderSecEpiNc() {
  initSecEpiStore();
  const ncHist = getNcList();
  const prefill = window._epiNcPrefill;
  const empOpts = getEmployees()
    .map(
      (e) =>
        `<option value="${esc(e.nom)}" data-emp-id="${esc(e.id)}"${prefill?.empId === e.id ? ' selected' : ''}>${esc(e.nom)}</option>`
    )
    .join('');

  const body = `
    ${renderEpiKpiRow()}
    <div class="sec-epi-nc-layout">
      <div class="card sec-epi-nc-form">
        <div class="ch"><span class="ct">Nouvelle non-conformité EPI</span></div>
        <form data-epi-nc-form class="fgrid sec-epi-nc-grid">
          <div class="fg full"><label class="fl">Employé concerné</label><select class="fi" name="emp" required>${empOpts}</select></div>
          ${renderXmDynamicSelect({ id: 'epi-nc-type', listKey: 'sec.epiTypes', label: 'Type', selected: prefill?.type || '' })}
          <div class="fg full"><label class="fl">Description</label>
            <textarea class="fi" name="desc" rows="3" required placeholder="Décrire la non-conformité…">${esc(prefill?.desc || '')}</textarea>
          </div>
          <div class="fg full"><button type="submit" class="btn btn-danger bsm sec-epi-nc-submit">Déclarer la NC EPI</button></div>
        </form>
      </div>
      <div class="card sec-epi-hist-card sec-epi-hist-card--grow">
        <div class="ch"><span class="ct">Registre des NC EPI (${ncHist.length})</span></div>
        <div class="sec-epi-table-wrap">
          <table class="tbl sec-epi-nc-tbl">
            <thead><tr>
              <th>N° NC</th><th>Date</th><th>Employé</th><th>Type</th><th>Description</th><th>Par</th><th>Statut</th><th></th>
            </tr></thead>
            <tbody>${renderNcHistoryRows(ncHist)}</tbody>
          </table>
        </div>
      </div>
    </div>`;

  return renderPageShell(
    'sec-epi-nc',
    'Non-conformités EPI',
    'Non-conformités EPI',
    'Registre et déclaration des NC liées aux équipements de protection',
    body,
    '<button type="button" class="btn bsm" data-nav="sec-epi">← Suivi EPI</button>'
  );
}
