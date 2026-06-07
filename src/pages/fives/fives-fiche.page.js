/**
 * Fiche résultat 5S — détail zone + checklist du dernier audit.
 */
import { getFivesAudit, getFivesTemplate } from '../../data/fives-store.js';
import { getFivesZoneLabel } from '../../data/fives-zones.data.js';
import { esc, ensureFives, kpiColor, kpiBadgeClass } from '../../components/fives/fives-utils.js';
import { renderFivesChecklistRows, renderFivesKpiBar } from '../../components/fives/fives-checklist.js';

export function renderFivesFiche() {
  ensureFives();
  const zoneId = window.fivesZoneId;
  const auditId = window.fivesAuditId;
  const audit = auditId ? getFivesAudit(auditId) : null;
  const zr = audit?.zoneResults?.[zoneId];

  if (!zoneId || !zr) {
    return `
    <div class="card" style="text-align:center;padding:32px">
      <p style="margin-bottom:12px">Sélectionnez une zone depuis le tableau de bord ou lancez un audit.</p>
      <button type="button" class="btn bp" data-fives-start-audit>+ Nouvel audit</button>
      <button type="button" class="btn" onclick="goPage('fives-kpi')" style="margin-left:8px">← KPI</button>
    </div>`;
  }

  const template = getFivesTemplate();

  return `
  <div style="margin-bottom:10px">
    <button type="button" class="btn" onclick="goPage('fives-kpi')">← Tableau de bord</button>
    <button type="button" class="btn bp" onclick="window.fivesAuditId='${esc(audit.id)}';window.fivesZoneId='${esc(zoneId)}';goPage('fives-audit')">✏ Continuer l'audit</button>
  </div>
  <div style="display:grid;grid-template-columns:280px 1fr;gap:12px">
    <div class="card" style="margin:0">
      <div style="font-size:10px;color:#f59e0b;font-weight:700;font-family:monospace">${esc(audit.id)}</div>
      <div style="font-size:17px;font-weight:800;margin:6px 0">${esc(getFivesZoneLabel(zoneId))}</div>
      <div style="font-size:11px;color:#64748b;margin-bottom:12px">${esc(audit.date)} · ${esc(audit.auditor)}</div>
      <div style="text-align:center;padding:14px;background:#fffbeb;border-radius:10px;border:1px solid #fde68a">
        <div style="font-size:32px;font-weight:800;color:${kpiColor(zr.kpi)}">${zr.kpi}%</div>
        <span class="badge ${kpiBadgeClass(zr.atteint)}">${zr.atteint ? 'Objectif atteint' : 'À améliorer'}</span>
      </div>
      <div style="margin-top:12px;font-size:10px"><strong>Points forts</strong><p style="color:#64748b;margin:4px 0">${esc(zr.pointsForts || '—')}</p></div>
      <div style="font-size:10px"><strong>Axes</strong><p style="color:#64748b;margin:4px 0">${esc(zr.axes || '—')}</p></div>
    </div>
    <div class="card" style="margin:0">
      <div class="ct" style="margin-bottom:10px">Checklist — résultats</div>
      ${renderFivesKpiBar(zr.responses || [])}
      <table class="tbl"><thead><tr>
        <th>N°</th><th>Critère</th><th style="width:80px;text-align:center">Résultat</th><th>Obs.</th>
      </tr></thead>
      <tbody>${template
        .map((it) => {
          const r = (zr.responses || []).find((x) => x.itemId === it.id);
          const rep = r?.rep;
          return `<tr style="background:${rep === 'c' ? '#f0fdf4' : rep === 'nc' ? '#fef2f2' : ''}">
          <td style="text-align:center;color:#94a3b8;font-size:10px">${it.n}</td>
          <td style="font-size:11px">${esc(it.label)}</td>
          <td style="text-align:center;font-weight:700;color:${rep === 'c' ? '#16a34a' : rep === 'nc' ? '#dc2626' : '#94a3b8'}">${rep === 'c' ? 'Conforme' : rep === 'nc' ? 'Non-conf.' : '—'}</td>
          <td style="font-size:10px;color:#64748b">${esc(r?.obs || '')}</td>
        </tr>`;
        })
        .join('')}</tbody></table>
    </div>
  </div>`;
}
