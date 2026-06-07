/**
 * Contrôles des EPI — historique des inspections.
 */
import { esc, renderEpiKpiRow, renderPageShell } from '../../components/sec/sec-epi-ui.js';
import { getControles, initSecEpiStore } from '../../data/sec-epi.store.js';
import { bindSecEpi } from './sec-epi-bind.js';

export { bindSecEpi };

export function renderSecEpiControles() {
  initSecEpiStore();
  const controles = getControles();
  const rows = controles
    .map((c) => {
      const ok = c.resultat === 'Conforme';
      return `<tr>
        <td><strong>${esc(c.id)}</strong></td>
        <td class="sec-epi-muted">${esc(c.d)}</td>
        <td>${esc(c.emp)}</td>
        <td><span class="sec-epi-badge sec-epi-badge--${ok ? 'vert' : 'rouge'}">${esc(c.resultat)}</span></td>
        <td>${esc(c.items)}</td>
        <td class="sec-epi-desc">${esc(c.observation)}</td>
        <td>${esc(c.par)}</td>
        <td class="sec-epi-td-actions">
          ${c.empId ? `<button type="button" class="btn bsm" data-epi-select="${esc(c.empId)}">Fiche</button>` : ''}
        </td>
      </tr>`;
    })
    .join('');

  const body = `
    ${renderEpiKpiRow()}
    <div class="card sec-epi-table-card">
      <div class="ch sec-epi-hist-head">
        <span class="ct">Historique des contrôles (${controles.length})</span>
        <div style="display:flex;gap:6px">
          <button type="button" class="btn bsm bp" data-nav="sec-epi">Contrôle rapide</button>
          <button type="button" class="btn bsm" data-nav="sec-cl-epi">Checklist CH-EPI-001</button>
        </div>
      </div>
      <div class="sec-epi-table-wrap">
        <table class="tbl sec-epi-main-tbl">
          <thead><tr>
            <th>N° contrôle</th><th>Date</th><th>Employé</th><th>Résultat</th><th>Items</th><th>Observation</th><th>Contrôleur</th><th></th>
          </tr></thead>
          <tbody>${rows || '<tr><td colspan="8" class="sec-epi-empty-cell">Aucun contrôle enregistré</td></tr>'}</tbody>
        </table>
      </div>
    </div>`;

  return renderPageShell(
    'sec-epi-controles',
    'Contrôles des EPI',
    'Contrôles des EPI',
    'Suivi des inspections et contrôles terrain',
    body,
    '<button type="button" class="btn bsm" data-nav="sec-epi">← Suivi EPI</button>'
  );
}
