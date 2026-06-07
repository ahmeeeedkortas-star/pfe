/**
 * Renouvellements EPI à venir.
 */
import { esc, renderEpiKpiRow, renderPageShell } from '../../components/sec/sec-epi-ui.js';
import { epiLabel, joursAvantRenouvellement, labelRenouvellement } from '../../data/sec-epi.data.js';
import { getEmployees, initSecEpiStore } from '../../data/sec-epi.store.js';
import { bindSecEpi } from './sec-epi-bind.js';

export { bindSecEpi };

export function renderSecEpiRenouv() {
  initSecEpiStore();
  const rows = [];
  getEmployees().forEach((emp) => {
    (emp.epi || []).forEach((e) => {
      const j = joursAvantRenouvellement(e.renouvellement);
      if (j != null && j <= 90) {
        rows.push({ emp, epi: e, jours: j });
      }
    });
  });
  rows.sort((a, b) => a.jours - b.jours);

  const tbody = rows
    .map((r) => {
      const tone = r.jours < 0 ? 'rouge' : r.jours <= 30 ? 'orange' : 'vert';
      return `<tr>
        <td>${esc(r.emp.nom)}</td>
        <td class="sec-epi-td-mat">${esc(r.emp.id)}</td>
        <td>${esc(epiLabel(r.epi.id))}</td>
        <td class="sec-epi-muted">${esc(r.epi.renouvellement)}</td>
        <td><span class="sec-epi-badge sec-epi-badge--${tone}">${esc(labelRenouvellement(r.jours))}</span></td>
        <td><span class="sec-epi-pill sec-epi-pill--${r.epi.statut === 'Expiré' ? 'ko' : r.epi.statut === 'À renouveler' ? 'warn' : 'ok'}">${esc(r.epi.statut)}</span></td>
        <td class="sec-epi-td-actions">
          <button type="button" class="btn bsm bp" data-epi-renew="${esc(r.emp.id)}" data-epi-type="${esc(r.epi.id)}">Renouveler</button>
          <button type="button" class="btn bsm" data-epi-select="${esc(r.emp.id)}">Fiche</button>
        </td>
      </tr>`;
    })
    .join('');

  const body = `
    ${renderEpiKpiRow()}
    <div class="card sec-epi-table-card">
      <div class="ch"><span class="ct">Échéances sous 90 jours (${rows.length})</span></div>
      <div class="sec-epi-table-wrap">
        <table class="tbl sec-epi-main-tbl">
          <thead><tr>
            <th>Employé</th><th>Matricule</th><th>EPI</th><th>Date renouv.</th><th>Délai</th><th>Statut EPI</th><th>Actions</th>
          </tr></thead>
          <tbody>${tbody || '<tr><td colspan="7" class="sec-epi-empty-cell">Aucun renouvellement prévu</td></tr>'}</tbody>
        </table>
      </div>
    </div>`;

  return renderPageShell(
    'sec-epi-renouv',
    'Renouvellements à venir',
    'Renouvellements à venir',
    'Planification des renouvellements EPI — fenêtre 90 jours',
    body,
    '<button type="button" class="btn bsm" data-nav="sec-epi">← Suivi EPI</button>'
  );
}
