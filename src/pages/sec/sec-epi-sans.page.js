/**
 * Employés sans EPI.
 */
import { esc, employeeAvatar, renderEpiKpiRow, renderPageShell } from '../../components/sec/sec-epi-ui.js';
import { statutEmployeEpi } from '../../data/sec-epi.data.js';
import { getEmployees, initSecEpiStore } from '../../data/sec-epi.store.js';
import { bindSecEpi } from './sec-epi-bind.js';

export { bindSecEpi };

export function renderSecEpiSans() {
  initSecEpiStore();
  const list = getEmployees().filter((e) => !(e.epi?.length));
  const rows = list
    .map(
      (emp) => `<tr>
      <td>${employeeAvatar(emp, 'sm')}</td>
      <td><strong>${esc(emp.nom)}</strong></td>
      <td class="sec-epi-td-mat">${esc(emp.id)}</td>
      <td>${esc(emp.poste)}</td>
      <td>${esc(emp.dep)}</td>
      <td><span class="sec-epi-badge sec-epi-badge--rouge">${esc(statutEmployeEpi(emp).label)}</span></td>
      <td class="sec-epi-td-actions">
        <button type="button" class="btn bsm bp" data-epi-select="${esc(emp.id)}">Attribuer</button>
        <button type="button" class="btn bsm br" data-epi-alert="${esc(emp.id)}">NC</button>
      </td>
    </tr>`
    )
    .join('');

  const body = `
    ${renderEpiKpiRow()}
    <div class="card sec-epi-table-card">
      <div class="ch"><span class="ct">${list.length} employé(s) sans aucun EPI attribué</span></div>
      <div class="sec-epi-table-wrap">
        <table class="tbl sec-epi-main-tbl">
          <thead><tr>
            <th>Photo</th><th>Nom</th><th>Matricule</th><th>Poste</th><th>Département</th><th>Statut</th><th>Actions</th>
          </tr></thead>
          <tbody>${rows || '<tr><td colspan="7" class="sec-epi-empty-cell">Aucun employé sans EPI</td></tr>'}</tbody>
        </table>
      </div>
    </div>`;

  return renderPageShell(
    'sec-epi-sans',
    'Employés sans EPI',
    'Employés sans EPI',
    'Effectifs sans équipement attribué — action corrective requise',
    body,
    '<button type="button" class="btn bsm" data-nav="sec-epi">← Suivi EPI</button>'
  );
}
