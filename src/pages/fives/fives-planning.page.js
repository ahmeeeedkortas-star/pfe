/**
 * Planning audits 5S — fréquence toutes les 2 semaines par zone.
 */
import { FIVES_ZONE_GROUPS } from '../../data/fives-zones.data.js';
import { getNextAuditDue, FIVES_AUDIT_INTERVAL_DAYS } from '../../data/fives-store.js';
import { esc, ensureFives } from '../../components/fives/fives-utils.js';

function weekLabels() {
  const now = new Date();
  const labels = [];
  for (let i = -2; i <= 3; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i * 7);
    const w = getWeekNumber(d);
    labels.push({ key: `S${w}`, label: `Sem. ${w}` });
  }
  return labels;
}

function getWeekNumber(d) {
  const onejan = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d - onejan) / 86400000 + onejan.getDay() + 1) / 7);
}

export function renderFivesPlanning() {
  ensureFives();
  const weeks = weekLabels();

  const rows = FIVES_ZONE_GROUPS.map((g) => {
    const zoneRows = g.zones
      .map((z) => {
        const due = getNextAuditDue(z.id);
        const cells = weeks
          .map((w, wi) => {
            if (wi === 2) {
              return `<td class="fives-plan-cell fives-plan-done" title="Dernier audit : ${esc(due.lastDate || '—')}">✓</td>`;
            }
            if (wi === 3 && due.due) {
              return `<td class="fives-plan-cell fives-plan-due">${esc(due.nextDate)}</td>`;
            }
            if (wi === 3) {
              return `<td class="fives-plan-cell">${esc(due.nextDate)}</td>`;
            }
            return `<td class="fives-plan-cell" style="color:#e2e8f0">—</td>`;
          })
          .join('');
        return `<tr>
        <td style="font-size:11px;font-weight:600;padding:8px 12px">${esc(z.label)}</td>
        ${cells}
        <td style="font-size:10px;color:#64748b;text-align:center">${due.lastDate ? esc(due.lastDate) : '—'}</td>
        <td style="font-size:10px;text-align:center;font-weight:600;color:${due.due ? '#dc2626' : '#16a34a'}">${esc(due.nextDate)}</td>
      </tr>`;
      })
      .join('');
    return `
    <tr style="background:#f8fafc"><td colspan="${weeks.length + 3}" style="font-size:10px;font-weight:800;color:#64748b;padding:8px 12px;text-transform:uppercase">${esc(g.label)}</td></tr>
    ${zoneRows}`;
  }).join('');

  return `
  <div style="margin-bottom:10px">
    <button type="button" class="btn" onclick="goPage('fives-kpi')">← Tableau de bord</button>
    <button type="button" class="btn bp" data-fives-start-audit style="margin-left:8px">+ Nouvel audit</button>
  </div>
  <div class="card">
    <div class="ct" style="margin-bottom:8px">Planning des audits 5S</div>
    <p style="font-size:11px;color:#64748b;margin:0 0 12px">Fréquence : <strong>toutes les ${FIVES_AUDIT_INTERVAL_DAYS} jours</strong> par zone. Prochaine échéance calculée depuis le dernier audit enregistré.</p>
    <div style="overflow-x:auto">
      <table class="tbl">
        <thead><tr>
          <th>Zone</th>
          ${weeks.map((w) => `<th class="fives-plan-cell">${esc(w.label)}</th>`).join('')}
          <th>Dernier audit</th>
          <th>Prochaine échéance</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </div>`;
}
