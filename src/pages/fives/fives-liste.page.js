/**
 * Liste des sessions d'audit 5S (bi-hebdomadaires).
 */
import { getFivesAudits } from '../../data/fives-store.js';
import { FIVES_ZONES } from '../../data/fives-zones.data.js';
import { esc, ensureFives, kpiColor, refreshFives } from '../../components/fives/fives-utils.js';
import { renderMiniToolbar } from '../../components/shared/list-toolbar-mini.js';

export function renderFivesListe() {
  ensureFives();
  const audits = [...getFivesAudits()].reverse();
  const fQ = (window.s5FQ || '').toLowerCase();
  const F = audits.filter(
    (a) => !fQ || [a.id, a.auditor, a.period, a.date].join(' ').toLowerCase().includes(fQ)
  );

  return `
  <div data-page="fives-liste">
  ${renderMiniToolbar('fives', `<button type="button" class="btn bsm" onclick="goPage('fives-kpi')">📊 KPI</button><button type="button" class="btn bsm bp" data-fives-start-audit>+ Audit</button>`)}
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:11px 14px;margin-bottom:12px">
    <input class="fi" placeholder="Rechercher…" value="${esc(window.s5FQ || '')}"
      oninput="window.s5FQ=this.value;window.refreshFivesListe&&window.refreshFivesListe()" style="width:100%">
  </div>
  <div class="card">
    <table class="tbl">
      <thead><tr>
        <th>ID</th><th>Date</th><th>Période</th><th>Auditeur</th><th>Zones notées</th><th>KPI global</th><th>Statut</th><th></th>
      </tr></thead>
      <tbody>${F.length
        ? F.map((a) => {
            const zonesDone = FIVES_ZONES.filter((z) => a.zoneResults?.[z.id]?.kpi != null);
            const avg =
              zonesDone.length > 0
                ? Math.round(zonesDone.reduce((s, z) => s + a.zoneResults[z.id].kpi, 0) / zonesDone.length)
                : null;
            return `<tr data-fives-audit-id="${esc(a.id)}" style="cursor:pointer">
          <td style="font-weight:700;color:#f59e0b;font-family:monospace;font-size:10px">${esc(a.id)}</td>
          <td style="font-size:10px">${esc(a.date)}</td>
          <td style="font-size:10px">${esc(a.period || '—')}</td>
          <td style="font-size:10px">${esc(a.auditor)}</td>
          <td style="text-align:center">${zonesDone.length}/${FIVES_ZONES.length}</td>
          <td style="font-weight:800;color:${kpiColor(avg)}">${avg != null ? `${avg}%` : '—'}</td>
          <td><span class="badge ${a.statut === 'terminé' ? 'bg3' : 'bgr'}">${esc(a.statut)}</span></td>
          <td><button type="button" class="btn bsm" onclick="event.stopPropagation();window.fivesAuditId='${esc(a.id)}';goPage('fives-audit')">Auditer</button></td>
        </tr>`;
          }).join('')
        : `<tr><td colspan="8" style="text-align:center;padding:28px;color:#94a3b8">Aucun audit — créez une session bi-hebdomadaire.</td></tr>`}
      </tbody>
    </table>
  </div>`;
}

export function bindFivesListe() {
  window.refreshFivesListe = () => refreshFives('fives-liste');
}
