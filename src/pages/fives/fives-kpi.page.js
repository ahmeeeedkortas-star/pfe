/**
 * Tableau de bord 5S — type Power BI (KPI, zones, évolution, planning, audits).
 */
import { FIVES_ZONE_GROUPS, FIVES_ZONES } from '../../data/fives-zones.data.js';
import {
  getGlobalKpi,
  getZoneKpiMap,
  getFivesAudits,
  getFivesActions,
  FIVES_KPI_GOAL,
  getNextAuditDue,
} from '../../data/fives-store.js';
import { esc, ensureFives, kpiColor, kpiBadgeClass } from '../../components/fives/fives-utils.js';
import { renderMiniToolbar } from '../../components/shared/list-toolbar-mini.js';

function donutSvg(pct, color) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  return `<svg width="88" height="88" viewBox="0 0 88 88" aria-hidden="true">
    <circle cx="44" cy="44" r="${r}" fill="none" stroke="#e2e8f0" stroke-width="10"/>
    <circle cx="44" cy="44" r="${r}" fill="none" stroke="${color}" stroke-width="10" stroke-dasharray="${c}" stroke-dashoffset="${off}" transform="rotate(-90 44 44)" stroke-linecap="round"/>
    <text x="44" y="48" text-anchor="middle" font-size="16" font-weight="800" fill="${color}">${pct}%</text>
  </svg>`;
}

function evolutionSeries(audits) {
  const sorted = [...audits]
    .filter((a) => a.statut === 'terminé')
    .slice(-6);
  return sorted.map((a) => {
    const zones = FIVES_ZONES.filter((z) => a.zoneResults?.[z.id]?.kpi != null);
    const avg = zones.length
      ? Math.round(zones.reduce((s, z) => s + a.zoneResults[z.id].kpi, 0) / zones.length)
      : 0;
    return { label: a.period || a.id, kpi: avg };
  });
}

export function renderFivesKpi() {
  ensureFives();
  const global = getGlobalKpi();
  const zoneMap = getZoneKpiMap();
  const audits = getFivesAudits();
  const actions = getFivesActions();
  const doneMonth = audits.filter((a) => a.statut === 'terminé').length;
  const nextDue = FIVES_ZONES.map((z) => getNextAuditDue(z.id)).find((d) => d.due) || getNextAuditDue(FIVES_ZONES[0].id);
  const openActions = actions.filter((a) => a.statut !== 'Clôturée').length;
  const lateActions = actions.filter((a) => a.statut === 'En retard').length;
  const okColor = global.atteint ? '#16a34a' : '#f59e0b';
  const evo = evolutionSeries(audits);
  const maxEvo = Math.max(80, ...evo.map((e) => e.kpi), global.kpi);

  const repart = {
    ok: FIVES_ZONES.filter((z) => (zoneMap[z.id].kpi ?? 0) >= 80).length,
    mid: FIVES_ZONES.filter((z) => (zoneMap[z.id].kpi ?? 0) >= 60 && (zoneMap[z.id].kpi ?? 0) < 80).length,
    low: FIVES_ZONES.filter((z) => zoneMap[z.id].kpi != null && (zoneMap[z.id].kpi ?? 0) < 60).length,
  };

  return `
  <div data-page="fives-kpi">
  ${renderMiniToolbar('fives', `<button type="button" class="btn bsm bp" data-fives-start-audit>+ Nouvel audit</button>`)}

  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:14px">
  ${[
    ['KPI global 5S', `${global.kpi}%`, okColor, global.atteint ? '✓ Objectif atteint' : `Objectif ≥ ${FIVES_KPI_GOAL}%`],
    ['Zones ≥ 80%', `${global.zonesOk}/${global.zonesTotal}`, '#16a34a', `${repart.ok} zone(s) conformes`],
    ['Audits ce mois', doneMonth, '#2563eb', 'Sessions terminées'],
    ['Prochain audit', nextDue.nextDate, '#7c3aed', nextDue.due ? '⚠ Dans les 14 j' : 'Planifié'],
    ['Actions ouvertes', openActions, '#dc2626', lateActions ? `Dont ${lateActions} en retard` : 'Plans d\'actions'],
  ]
    .map(
      ([l, v, c, sub]) => `
    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:14px">
      <div style="font-size:9px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:6px">${l}</div>
      <div style="font-size:24px;font-weight:800;color:${c}">${v}</div>
      <div style="font-size:9px;color:#94a3b8;margin-top:4px">${sub}</div>
    </div>`
    )
    .join('')}
  </div>

  <div style="display:grid;grid-template-columns:200px 1fr 280px;gap:12px;margin-bottom:12px">
    <div class="card" style="margin:0;text-align:center;padding:16px">
      <div class="ct" style="margin-bottom:10px">KPI global</div>
      ${donutSvg(global.kpi, okColor)}
      <div style="font-size:10px;color:#64748b;margin-top:8px">Cible : ≥ ${FIVES_KPI_GOAL}%</div>
    </div>
    <div class="card" style="margin:0">
      <div class="ch"><span class="ct">KPI par zone</span><button type="button" class="btn bsm" onclick="goPage('fives-audit')">Auditer →</button></div>
      ${FIVES_ZONES.map((z) => {
        const v = zoneMap[z.id];
        const kpi = v.kpi ?? 0;
        return `
      <div style="margin-bottom:8px;cursor:pointer" onclick="window.fivesZoneId='${esc(z.id)}';goPage('fives-audit')">
        <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:2px">
          <span style="font-weight:600">${esc(z.label)}</span>
          <span style="font-weight:800;color:${kpiColor(v.kpi)}">${v.kpi != null ? `${kpi}%` : '—'}</span>
        </div>
        <div style="height:8px;background:#f1f5f9;border-radius:4px;position:relative">
          <div style="width:${kpi}%;height:100%;background:${kpiColor(v.kpi)};border-radius:4px"></div>
          <div style="position:absolute;left:80%;top:-3px;bottom:-3px;width:2px;background:#dc2626;opacity:.45" title="80%"></div>
        </div>
      </div>`;
      }).join('')}
    </div>
    <div class="card" style="margin:0">
      <div class="ct" style="margin-bottom:10px">Répartition scores</div>
      ${[
        ['≥ 80%', repart.ok, '#16a34a'],
        ['60–79%', repart.mid, '#f59e0b'],
        ['< 60%', repart.low, '#dc2626'],
      ]
        .map(
          ([l, n, c]) => `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;font-size:10px">
        <span style="width:48px;color:#64748b">${l}</span>
        <div style="flex:1;height:8px;background:#f1f5f9;border-radius:4px"><div style="width:${(n / FIVES_ZONES.length) * 100}%;height:100%;background:${c};border-radius:4px"></div></div>
        <strong style="color:${c}">${n}</strong>
      </div>`
        )
        .join('')}
      ${evo.length ? `<div class="ct" style="margin:12px 0 8px">Évolution KPI global</div>
      <div style="display:flex;align-items:flex-end;gap:6px;height:72px">
        ${evo
          .map(
            (e) => `
        <div style="flex:1;text-align:center">
          <div style="height:${Math.round((e.kpi / maxEvo) * 60)}px;background:#f59e0b;border-radius:4px 4px 0 0;min-height:4px" title="${e.kpi}%"></div>
          <div style="font-size:8px;color:#94a3b8;margin-top:4px">${esc(e.label)}</div>
        </div>`
          )
          .join('')}
      </div>` : '<p style="font-size:10px;color:#94a3b8">Historique après 2+ audits terminés.</p>'}
    </div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
    <div class="card" style="margin:0">
      <div class="ch"><span class="ct">Suivi des audits 5S</span><button type="button" class="btn bsm" onclick="goPage('fives-liste')">Historique</button></div>
      <table class="tbl"><thead><tr><th>ID</th><th>Date</th><th>Période</th><th>Auditeur</th><th>Zones</th><th>KPI</th><th></th></tr></thead>
      <tbody>${[...audits].reverse().slice(0, 5).map((a) => {
        const zd = FIVES_ZONES.filter((z) => a.zoneResults?.[z.id]?.kpi != null);
        const avg = zd.length ? Math.round(zd.reduce((s, z) => s + a.zoneResults[z.id].kpi, 0) / zd.length) : null;
        return `<tr style="cursor:pointer" onclick="window.fivesAuditId='${esc(a.id)}';goPage('fives-audit')">
          <td style="font-weight:700;color:#f59e0b;font-size:10px">${esc(a.id)}</td>
          <td style="font-size:10px">${esc(a.date)}</td>
          <td style="font-size:10px">${esc(a.period || '—')}</td>
          <td style="font-size:10px">${esc(a.auditor)}</td>
          <td style="text-align:center">${zd.length}/${FIVES_ZONES.length}</td>
          <td style="font-weight:800;color:${kpiColor(avg)}">${avg != null ? `${avg}%` : '—'}</td>
          <td><span class="badge ${a.statut === 'terminé' ? 'bg3' : 'bgr'}">${esc(a.statut)}</span></td>
        </tr>`;
      }).join('') || '<tr><td colspan="7" style="text-align:center;padding:20px;color:#94a3b8">Aucun audit</td></tr>'}
      </tbody></table>
    </div>
    <div class="card" style="margin:0">
      <div class="ch"><span class="ct">Prochaines échéances (2 sem.)</span><button type="button" class="btn bsm" onclick="goPage('fives-planning')">Planning</button></div>
      <table class="tbl"><thead><tr><th>Zone</th><th>Dernier</th><th>Prochain</th></tr></thead>
      <tbody>${FIVES_ZONE_GROUPS.map((g) =>
        g.zones
          .map((z) => {
            const d = getNextAuditDue(z.id);
            return `<tr>
            <td style="font-size:10px;font-weight:600">${esc(z.label)}</td>
            <td style="font-size:10px">${esc(d.lastDate || '—')}</td>
            <td style="font-size:10px;font-weight:700;color:${d.due ? '#dc2626' : '#16a34a'}">${esc(d.nextDate)}</td>
          </tr>`;
          })
          .join('')
      ).join('')}</tbody></table>
    </div>
  </div>

  <div class="card">
    <div class="ch"><span class="ct">Résumé dernier audit par zone</span>
      <button type="button" class="btn bsm" onclick="goPage('fives-checklist')">Checklist standard</button>
      <button type="button" class="btn bsm" onclick="goPage('fives-actions')">Actions (${openActions})</button>
    </div>
    <table class="tbl"><thead><tr><th>Zone</th><th>Score</th><th>Statut</th><th>Points forts</th><th>Axes d'amélioration</th></tr></thead>
    <tbody>${FIVES_ZONES.map((z) => {
      const v = zoneMap[z.id];
      return `<tr style="cursor:pointer" onclick="window.fivesZoneId='${esc(z.id)}';window.fivesAuditId='${esc(v.auditId || '')}';goPage('fives-fiche')">
        <td style="font-weight:600">${esc(z.label)}</td>
        <td style="font-weight:800;color:${kpiColor(v.kpi)}">${v.kpi != null ? `${v.kpi}%` : '—'}</td>
        <td><span class="badge ${kpiBadgeClass(v.atteint)}">${v.kpi != null ? (v.atteint ? 'Atteint' : 'À améliorer') : '—'}</span></td>
        <td style="font-size:10px">${esc(v.pointsForts || '—')}</td>
        <td style="font-size:10px">${esc(v.axes || '—')}</td>
      </tr>`;
    }).join('')}</tbody></table>
  </div>
  </div>`;
}
