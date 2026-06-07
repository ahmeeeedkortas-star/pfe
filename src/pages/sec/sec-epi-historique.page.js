/**
 * Historique EPI — contrôles + NC.
 */
import { esc, renderEpiKpiRow, renderNcHistoryRows, renderPageShell } from '../../components/sec/sec-epi-ui.js';
import { getControles, getEmployees, getNcList, initSecEpiStore } from '../../data/sec-epi.store.js';
import { bindSecEpi } from './sec-epi-bind.js';

export { bindSecEpi };

export function renderSecEpiHistorique() {
  initSecEpiStore();
  const filter = window._epiHistFilter || {};
  const employees = getEmployees();
  const empOpts = `<option value="">Tous les employés</option>${employees
    .map((e) => `<option value="${esc(e.id)}"${filter.empId === e.id ? ' selected' : ''}>${esc(e.nom)}</option>`)
    .join('')}`;

  let controles = getControles();
  let ncHist = getNcList();
  if (filter.empId) {
    const emp = employees.find((e) => e.id === filter.empId);
    controles = controles.filter((c) => c.empId === filter.empId || c.emp === emp?.nom);
    ncHist = ncHist.filter((n) => n.emp === emp?.nom);
  }

  const ctlRows = controles
    .map((c) => {
      const ok = c.resultat === 'Conforme';
      return `<tr>
        <td>${esc(c.id)}</td>
        <td class="sec-epi-muted">${esc(c.d)}</td>
        <td>${esc(c.emp)}</td>
        <td><span class="sec-epi-badge sec-epi-badge--${ok ? 'vert' : 'rouge'}">${esc(c.resultat)}</span></td>
        <td>${esc(c.items)}</td>
        <td class="sec-epi-desc">${esc(c.observation)}</td>
        <td>${esc(c.par)}</td>
      </tr>`;
    })
    .join('');

  const body = `
    ${renderEpiKpiRow()}
    <div class="card" style="padding:10px 14px;margin-bottom:12px;display:flex;gap:8px;align-items:center;flex-wrap:wrap">
      <label class="fl" style="margin:0">Filtrer par employé</label>
      <select class="sel" id="epi-hist-emp">${empOpts}</select>
      <button type="button" class="btn bsm" id="epi-hist-clear">Réinitialiser</button>
    </div>
    <div class="card sec-epi-hist-card">
      <div class="ch"><span class="ct">Historique des contrôles</span></div>
      <div class="sec-epi-table-wrap">
        <table class="tbl sec-epi-main-tbl">
          <thead><tr>
            <th>N°</th><th>Date</th><th>Employé</th><th>Résultat</th><th>Items vérifiés</th><th>Observation</th><th>Par</th>
          </tr></thead>
          <tbody>${ctlRows || '<tr><td colspan="7" class="sec-epi-empty-cell">Aucun contrôle</td></tr>'}</tbody>
        </table>
      </div>
    </div>
    <div class="card sec-epi-hist-card">
      <div class="ch"><span class="ct">Historique des non-conformités EPI</span></div>
      <div class="sec-epi-table-wrap">
        <table class="tbl sec-epi-nc-tbl">
          <thead><tr>
            <th>N° NC</th><th>Date</th><th>Employé</th><th>Type</th><th>Description</th><th>Par</th><th>Statut</th><th></th>
          </tr></thead>
          <tbody>${renderNcHistoryRows(ncHist)}</tbody>
        </table>
      </div>
    </div>`;

  return renderPageShell(
    'sec-epi-historique',
    'Historique',
    'Historique EPI',
    'Journal des contrôles et non-conformités',
    body,
    '<button type="button" class="btn bsm" data-nav="sec-epi">← Suivi EPI</button>'
  );
}

export function bindSecEpiHistorique() {
  bindSecEpi();
  if (window.__secEpiHistBound) return;
  window.__secEpiHistBound = true;

  document.addEventListener('change', (e) => {
    if (e.target.id !== 'epi-hist-emp') return;
    const v = e.target.value;
    window._epiHistFilter = v ? { empId: v } : null;
    window.reloadPage?.('sec-epi-historique');
  });

  document.addEventListener('click', (e) => {
    if (e.target.id === 'epi-hist-clear') {
      window._epiHistFilter = null;
      window.reloadPage?.('sec-epi-historique');
    }
  });
}
