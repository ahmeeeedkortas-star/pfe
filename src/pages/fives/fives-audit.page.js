/**
 * Audit 5S — checklist Conforme / Non-conforme par zone, KPI auto.
 */
import { FIVES_ZONE_GROUPS } from '../../data/fives-zones.data.js';
import {
  getFivesTemplate,
  getFivesAudit,
  buildZoneResponsesFromTemplate,
} from '../../data/fives-store.js';
import { esc, ensureFives, kpiColor } from '../../components/fives/fives-utils.js';
import {
  renderFivesChecklistRows,
  renderFivesKpiBar,
} from '../../components/fives/fives-checklist.js';

export function renderFivesAudit() {
  ensureFives();
  const auditId = window.fivesAuditId;
  const audit = auditId ? getFivesAudit(auditId) : null;

  if (!audit) {
    return `
    <div class="card" style="text-align:center;padding:32px">
      <div style="font-size:28px;margin-bottom:8px">📋</div>
      <p style="font-size:13px;margin-bottom:14px">Aucun audit en cours. Créez un audit bi-hebdomadaire.</p>
      <button type="button" class="btn bp" data-fives-start-audit>+ Nouvel audit 5S</button>
      <button type="button" class="btn" onclick="goPage('fives-liste')" style="margin-left:8px">← Liste</button>
    </div>`;
  }

  const zoneId = window.fivesZoneId || FIVES_ZONE_GROUPS[0].zones[0].id;
  window.fivesZoneId = zoneId;
  const template = getFivesTemplate();
  const saved = audit.zoneResults?.[zoneId];
  const savedMap = Object.fromEntries((saved?.responses || []).map((r) => [r.itemId, r]));
  const responses = buildZoneResponsesFromTemplate(template, savedMap);

  const zoneTabs = FIVES_ZONE_GROUPS.map((g) => {
    const tabs = g.zones
      .map((z) => {
        const zr = audit.zoneResults?.[z.id];
        const kpi = zr?.kpi;
        const cls = z.id === zoneId ? 'active' : kpi != null ? (kpi >= 80 ? 'ok' : 'warn') : '';
        const badge = kpi != null ? ` ${kpi}%` : '';
        return `<button type="button" class="fives-zone-tab ${cls}" data-fives-zone-tab="${esc(z.id)}">${esc(z.label)}${badge}</button>`;
      })
      .join('');
    return `<div style="margin-bottom:6px"><div style="font-size:9px;font-weight:700;color:#94a3b8;text-transform:uppercase;margin-bottom:4px">${esc(g.label)}</div><div class="fives-zone-tabs">${tabs}</div></div>`;
  }).join('');

  return `
  <div style="margin-bottom:10px;display:flex;flex-wrap:wrap;gap:8px;align-items:center">
    <button type="button" class="btn" onclick="goPage('fives-liste')">← Audits</button>
    <button type="button" class="btn" onclick="goPage('fives-kpi')">📊 Tableau de bord</button>
    <span style="font-size:11px;color:#64748b;margin-left:auto">${esc(audit.id)} · ${esc(audit.date)} · ${esc(audit.auditor)}</span>
  </div>
  <div class="card" style="margin-bottom:12px">
    <div class="ct" style="margin-bottom:10px">Sélection de la zone</div>
    ${zoneTabs}
  </div>
  ${renderFivesKpiBar(responses)}
  <div style="font-size:10px;color:#64748b;margin-bottom:6px">KPI en direct : <span data-fives-live-kpi></span></div>
  <div class="card">
    <div class="ch"><span class="ct">Checklist 5S — notation Conforme / Non-conforme</span>
      <button type="button" class="btn bsm" onclick="goPage('fives-checklist')">⚙ Modifier le modèle</button>
    </div>
    <div style="overflow-x:auto">
      <table class="tbl" style="margin:0">
        <thead><tr>
          <th style="width:36px">N°</th><th>Critère</th>
          <th style="width:72px;text-align:center">Conforme</th>
          <th style="width:72px;text-align:center">Non-conf.</th>
          <th>Observation</th>
        </tr></thead>
        <tbody>${renderFivesChecklistRows(template, responses, { zoneKey: zoneId })}</tbody>
      </table>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px;padding-top:12px;border-top:1px solid var(--border)">
      <div>
        <label style="font-size:10px;font-weight:700;color:#64748b">Points forts</label>
        <textarea id="f5-points-forts" class="fi" rows="2" style="width:100%;margin-top:4px">${esc(saved?.pointsForts || '')}</textarea>
      </div>
      <div>
        <label style="font-size:10px;font-weight:700;color:#64748b">Axes d'amélioration</label>
        <textarea id="f5-axes" class="fi" rows="2" style="width:100%;margin-top:4px">${esc(saved?.axes || '')}</textarea>
      </div>
    </div>
    <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
      <button type="button" class="btn bp" data-fives-save-zone>💾 Enregistrer cette zone</button>
      <button type="button" class="btn" onclick="goPage('fives-actions')">Plans d'actions →</button>
    </div>
  </div>`;
}
