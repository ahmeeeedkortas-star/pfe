/**
 * Suivi EPI par employé — page principale.
 */
import { renderIcon } from '../../components/icons/icon-render.js';
import {
  esc,
  renderDetailPanel,
  renderEmployeeTableRows,
  renderEpiKpiRow,
  renderNcHistoryRows,
  renderPageShell,
} from '../../components/sec/sec-epi-ui.js';
import { EPI_NC_TYPES, epiLabel, labelRenouvellement, prochainRenouvellement, statutEmployeEpi } from '../../data/sec-epi.data.js';
import { formatToday, getEmployees, getNcList, initSecEpiStore, toInputDate } from '../../data/sec-epi.store.js';
import { bindSecEpi, filteredEmployees } from './sec-epi-bind.js';

export { bindSecEpi };

function collectRenouvellements(employees) {
  const renouvellements = [];
  employees.forEach((emp) => {
    (emp.epi || []).forEach((e) => {
      const j = prochainRenouvellement({ epi: [e] }).jours;
      if (j != null && j <= 30) {
        renouvellements.push({ empId: emp.id, empNom: emp.nom, epiId: e.id, epi: epiLabel(e.id), jours: j });
      }
    });
  });
  renouvellements.sort((a, b) => a.jours - b.jours);
  return renouvellements;
}

export function renderSecEpi() {
  initSecEpiStore();
  const employees = getEmployees();
  const selectedId = window.secEpiSelected || employees[0]?.id;
  const selected = employees.find((e) => e.id === selectedId);
  const filtered = filteredEmployees();
  const deps = [...new Set(employees.map((e) => e.dep))].sort();
  const postes = [...new Set(employees.map((e) => e.poste))].sort();
  const sansEpi = employees.filter((e) => statutEmployeEpi(e).code === 'aucun' && !(e.epi?.length));
  const renouvellements = collectRenouvellements(employees);
  const ncHist = getNcList();
  const prefill = window._epiNcPrefill;
  const empOpts = employees
    .map(
      (e) =>
        `<option value="${esc(e.nom)}" data-emp-id="${esc(e.id)}"${prefill?.empId === e.id ? ' selected' : ''}>${esc(e.nom)}</option>`
    )
    .join('');
  const f = window._epiFilter || {};
  const todayInput = toInputDate(formatToday());

  const body = `
    ${renderEpiKpiRow(employees)}
    <div class="sec-epi-layout">
      <div class="card sec-epi-table-card">
        <div class="sec-epi-filters">
          <div class="sec-epi-search">
            ${renderIcon('search', { size: 14 })}
            <input id="epi-fq" placeholder="Rechercher nom, matricule, poste…" value="${esc(f.q || '')}" data-epi-filter>
          </div>
          <select id="epi-f-dep" class="sel" data-epi-filter>
            <option value="Tous">Département : Tous</option>
            ${deps.map((d) => `<option${f.dep === d ? ' selected' : ''}>${esc(d)}</option>`).join('')}
          </select>
          <select id="epi-f-poste" class="sel" data-epi-filter>
            <option value="Tous">Poste : Tous</option>
            ${postes.map((p) => `<option${f.poste === p ? ' selected' : ''}>${esc(p)}</option>`).join('')}
          </select>
          <select id="epi-f-stat" class="sel" data-epi-filter>
            <option value="Tous">Statut : Tous</option>
            <option${f.stat === 'Complet' ? ' selected' : ''}>Complet</option>
            <option${f.stat === 'Incomplet' ? ' selected' : ''}>Incomplet</option>
            <option${f.stat === 'Aucun' ? ' selected' : ''}>Aucun</option>
            <option${f.stat === 'Expiré' ? ' selected' : ''}>Expiré</option>
          </select>
          <span id="epi-cnt" class="sec-epi-muted">${filtered.length} employé(s)</span>
        </div>
        <div class="sec-epi-table-wrap">
          <table class="tbl sec-epi-main-tbl">
            <thead><tr>
              <th>Photo</th><th>Nom</th><th>Matricule</th><th>Poste</th><th>Département</th>
              <th>EPI attrib./requis</th><th>Statut</th><th>Prochain renouv.</th><th>Actions</th>
            </tr></thead>
            <tbody id="epi-tbody">${renderEmployeeTableRows(filtered, selected?.id)}</tbody>
          </table>
        </div>
      </div>
      <div id="epi-detail-panel">${renderDetailPanel(selected)}</div>
    </div>

    <div class="sec-epi-widgets">
      <div class="card sec-epi-widget">
        <div class="ch"><span class="ct">Employés sans EPI</span> <span class="sec-epi-badge sec-epi-badge--rouge">${sansEpi.length}</span></div>
        <ul class="sec-epi-widget-list">
          ${sansEpi.length ? sansEpi.map((e) => `<li><span>${esc(e.nom)}</span><span class="sec-epi-widget-actions">
              <button type="button" class="btn bsm" data-epi-select="${esc(e.id)}">Voir</button>
              <button type="button" class="btn bsm br" data-epi-alert="${esc(e.id)}">Alerte</button>
            </span></li>`).join('') : '<li class="sec-epi-muted">Aucun employé sans EPI</li>'}
        </ul>
        <button type="button" class="btn bsm" data-nav="sec-epi-sans" style="margin-top:8px">Voir tout →</button>
      </div>
      <div class="card sec-epi-widget">
        <div class="ch"><span class="ct">Renouvellements à venir</span></div>
        <table class="tbl sec-epi-mini-tbl">
          <thead><tr><th>Employé</th><th>EPI</th><th>Échéance</th><th></th></tr></thead>
          <tbody>
            ${renouvellements.length ? renouvellements.slice(0, 6).map((r) => `<tr>
              <td>${esc(r.empNom)}</td><td>${esc(r.epi)}</td>
              <td><strong style="color:#1e40af">${esc(labelRenouvellement(r.jours))}</strong></td>
              <td><button type="button" class="btn bsm" data-epi-renew="${esc(r.empId)}" data-epi-type="${esc(r.epiId)}">↻</button></td>
            </tr>`).join('') : '<tr><td colspan="4" class="sec-epi-muted">Rien sous 30 jours</td></tr>'}
          </tbody>
        </table>
        <button type="button" class="btn bsm" data-nav="sec-epi-renouv" style="margin-top:8px">Voir tout →</button>
      </div>
      <div class="card sec-epi-nc-form" id="epi-nc-block">
        <div class="ch"><span class="ct">Déclarer une non-conformité EPI</span></div>
        <form data-epi-nc-form class="fgrid sec-epi-nc-grid">
          <div class="fg full"><label class="fl">Employé concerné</label><select class="fi" name="emp" required>${empOpts}</select></div>
          <div class="fg full"><label class="fl">Type</label>
            <select class="fi" name="type" required>
              ${EPI_NC_TYPES.map((t) => `<option value="${esc(t)}"${prefill?.type === t ? ' selected' : ''}>${esc(t)}</option>`).join('')}
            </select>
          </div>
          <div class="fg full"><label class="fl">Description</label>
            <textarea class="fi" name="desc" rows="2" required placeholder="Décrire la non-conformité…">${esc(prefill?.desc || '')}</textarea>
          </div>
          <div class="fg full"><button type="submit" class="btn btn-danger bsm sec-epi-nc-submit">Déclarer la NC EPI</button></div>
        </form>
        <button type="button" class="btn bsm" data-nav="sec-epi-nc" style="margin-top:6px">Registre NC →</button>
      </div>
      <div class="card sec-epi-widget">
        <div class="ch"><span class="ct">Checklist de contrôle rapide</span></div>
        <div class="fgrid" style="gap:8px;margin-bottom:8px">
          <div class="fg"><label class="fl">Date du contrôle</label><input type="date" class="fi" data-epi-check-date value="${todayInput}"></div>
          <div class="fg"><label class="fl">Employé</label><select class="fi" data-epi-check-emp>${empOpts}</select></div>
        </div>
        <div id="epi-check-items">
          ${['casque', 'lunettes', 'gants', 'chaussures', 'auditif']
            .map(
              (id) => `<div class="sec-epi-check-item" data-epi-check-item="${id}">
            <span>${esc(epiLabel(id))}</span>
            <div class="sec-epi-check-btns">
              <button type="button" data-epi-check-val="oui">Oui</button>
              <button type="button" data-epi-check-val="non">Non</button>
            </div>
          </div>`
            )
            .join('')}
        </div>
        <div class="fg full" style="margin-top:8px">
          <label class="fl">Observation</label>
          <textarea class="fi" data-epi-check-obs rows="2" placeholder="Commentaire du contrôleur…"></textarea>
        </div>
        <div class="sec-epi-check-actions">
          <button type="button" class="btn bsm bg3" data-epi-check-result="conforme">Conforme</button>
          <button type="button" class="btn bsm br" data-epi-check-result="nc">Non conforme → NC</button>
          <button type="button" class="btn bsm" data-epi-check-reset>Réinit.</button>
        </div>
      </div>
    </div>

    <div class="card sec-epi-hist-card">
      <div class="ch sec-epi-hist-head">
        <span class="ct">Historique des non-conformités EPI</span>
        <button type="button" class="btn bsm" data-nav="sec-epi-historique">Historique complet →</button>
      </div>
      <div class="sec-epi-table-wrap">
        <table class="tbl sec-epi-nc-tbl">
          <thead><tr>
            <th>N° NC</th><th>Date</th><th>Employé</th><th>Type</th><th>Description</th><th>Déclaré par</th><th>Statut</th><th></th>
          </tr></thead>
          <tbody id="epi-nc-tbody">${renderNcHistoryRows(ncHist.slice(0, 8))}</tbody>
        </table>
      </div>
    </div>`;

  const actions = `
    <button type="button" class="btn bsm bp" data-epi-add-emp>+ Employé</button>
    <button type="button" class="btn bsm" data-nav="sec-epi-controles">Contrôles</button>
    <button type="button" class="btn bsm" data-nav="sec-cl-epi">Checklist EPI</button>`;

  return renderPageShell(
    'sec-epi',
    'Suivi des EPI par employé',
    'Suivi des EPI par employé',
    'Attribution, conformité et renouvellement — ISO 45001 · données locales',
    body,
    actions
  );
}
