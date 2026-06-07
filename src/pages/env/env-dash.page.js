/**
 * env-dash — Tableau de bord environnemental ISO 14001.
 */
import { seedEnvAspects } from '../../data/env-aspects.data.js';
import { seedEnvDechets, getDechets } from '../../data/env-dechets.store.js';
import { seedEnvConso, getConso, CONSO_OBJECTIFS, moisLabel } from '../../data/env-conso.store.js';
import { seedEnvActions, getEnvActions } from '../../data/env-actions.store.js';

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function refreshDash() {
  const el = document.getElementById('content');
  if (el) el.innerHTML = renderEnvDash();
}

function buildKpiCards() {
  const dechets = getDechets();
  const totalKg = dechets.reduce((s, d) => s + (d.unite === 'kg' ? d.qte : d.qte * 0.85), 0);
  const valorKg = dechets.filter((d) => d.s === 'Enlevé').reduce((s, d) => s + (d.unite === 'kg' ? d.qte : d.qte * 0.85), 0);
  const recyclagePct = totalKg > 0 ? Math.round((valorKg / totalKg) * 100) : 0;

  const conso = getConso();
  const last = conso[0] || {};
  const prev = conso[1] || {};
  const elecEvol = prev.electricite ? ((last.electricite - prev.electricite) / prev.electricite * 100).toFixed(1) : 0;
  const eauEvol = prev.eau ? ((last.eau - prev.eau) / prev.eau * 100).toFixed(1) : 0;

  const actions = getEnvActions();
  const actCritiques = actions.filter((a) => a.prio === 'Critique' && a.statut !== 'Clôturée').length;
  const actRetard = actions.filter((a) => a.statut === 'En retard').length;

  const aspects = window.ENV_ASPECTS_DATA || [];
  const aspCritiques = aspects.filter((a) => a.niv === 'Critique').length;
  const conformite = aspects.length
    ? Math.round((aspects.filter((a) => a.s === 'Maîtrisé').length / aspects.length) * 100)
    : 0;

  const kpis = [
    { ic: '♻', label: 'Déchets valorisés', val: `${valorKg.toFixed(0)} kg`, sub: `${recyclagePct}% recyclage`, c: '#16a34a', bg: '#f0fdf4' },
    { ic: '⚡', label: 'Électricité', val: `${(last.electricite || 0).toLocaleString('fr')} kWh`, sub: `${parseFloat(elecEvol) <= 0 ? '↓' : '↑'} ${Math.abs(elecEvol)}% vs mois préc.`, c: '#7c3aed', bg: '#f5f3ff' },
    { ic: '💧', label: 'Eau', val: `${(last.eau || 0)} m³`, sub: `${parseFloat(eauEvol) <= 0 ? '↓' : '↑'} ${Math.abs(eauEvol)}% vs mois préc.`, c: '#0284c7', bg: '#eff6ff' },
    { ic: '🌿', label: 'Conformité', val: `${conformite}%`, sub: `${aspCritiques} aspect(s) critique(s)`, c: conformite >= 80 ? '#16a34a' : '#f59e0b', bg: conformite >= 80 ? '#f0fdf4' : '#fffbeb' },
    { ic: '🎯', label: 'Actions actives', val: `${actions.filter((a) => a.statut === 'En cours').length}`, sub: `${actRetard} en retard · ${actCritiques} critiques`, c: actRetard > 0 ? '#dc2626' : '#16a34a', bg: actRetard > 0 ? '#fef2f2' : '#f0fdf4' },
  ];

  return `<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:16px">
    ${kpis.map(({ ic, label, val, sub, c, bg }) => `
    <div style="background:${bg};border:1px solid ${c}30;border-radius:11px;padding:13px;position:relative;overflow:hidden">
      <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${c}"></div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:7px">
        <span style="font-size:16px">${ic}</span>
        <span style="font-size:9.5px;color:${c};font-weight:700;text-transform:uppercase;letter-spacing:.04em">${esc(label)}</span>
      </div>
      <div style="font-size:22px;font-weight:800;color:${c};line-height:1">${esc(val)}</div>
      <div style="font-size:9.5px;color:${c};opacity:.7;margin-top:3px">${esc(sub)}</div>
    </div>`).join('')}
  </div>`;
}

function buildConsoChart() {
  const conso = getConso().slice(0, 5).reverse();
  if (!conso.length) return '<div class="card" style="margin-bottom:0"><div class="reg-meta" style="text-align:center;padding:20px">Aucune donnée de consommation</div></div>';

  const maxEl = Math.max(...conso.map((c) => c.electricite), 1);
  const maxEau = Math.max(...conso.map((c) => c.eau), 1);
  const maxAir = Math.max(...conso.map((c) => c.air), 1);

  return `<div class="card" style="margin-bottom:0">
    <div class="ch"><span class="ct">📈 Consommations — 5 derniers mois</span>
      <button onclick="window.goPage('env-conso')" class="btn bsm">Détail →</button>
    </div>
    <div style="position:relative;height:110px;padding:4px 4px 20px">
      <div style="position:absolute;inset:4px 4px 20px">
        ${[0, 25, 50, 75, 100].map((p) => `<div style="position:absolute;left:0;right:0;bottom:${p}%;border-top:1px dashed #f1f5f9"></div>`).join('')}
      </div>
      <div style="display:flex;align-items:flex-end;gap:5px;height:100%;position:relative;z-index:1">
        ${conso.map((d) => `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px">
          <div style="display:flex;align-items:flex-end;gap:2px;height:90px">
            <div style="width:9px;height:${(d.electricite / maxEl) * 84}px;background:#7c3aed;border-radius:3px 3px 0 0;opacity:.85"></div>
            <div style="width:9px;height:${(d.eau / maxEau) * 60}px;background:#0284c7;border-radius:3px 3px 0 0;opacity:.85"></div>
            <div style="width:9px;height:${(d.air / maxAir) * 84}px;background:#16a34a;border-radius:3px 3px 0 0;opacity:.85"></div>
          </div>
          <div style="font-size:8px;color:#94a3b8">${moisLabel(d.mois).slice(0, 3)}</div>
        </div>`).join('')}
      </div>
    </div>
    <div style="display:flex;gap:12px;justify-content:center;font-size:9px">
      ${[['Élec', '#7c3aed'], ['Eau', '#0284c7'], ['Air', '#16a34a']].map(([l, c]) => `
      <div style="display:flex;align-items:center;gap:4px">
        <div style="width:9px;height:9px;background:${c};border-radius:2px"></div>${esc(l)}
      </div>`).join('')}
    </div>
  </div>`;
}

function buildDechetsDonut() {
  const dechets = getDechets();
  const types = {};
  dechets.forEach((d) => { types[d.type] = (types[d.type] || 0) + (d.unite === 'kg' ? d.qte : d.qte * 0.85); });
  const total = Object.values(types).reduce((s, v) => s + v, 0) || 1;
  const colors = { Métalliques: '#64748b', 'Huiles usagées': '#0284c7', Cartons: '#f59e0b', Plastiques: '#06b6d4', Dangereux: '#dc2626' };
  const pts = Object.entries(types).map(([k, v]) => [k, Math.round((v / total) * 100), colors[k] || '#94a3b8']);

  let offset = 0.25;
  const arcs = pts.map(([, pct, col]) => {
    const f = pct / 100;
    const arc = `<circle cx="44" cy="44" r="31" fill="none" stroke="${esc(col)}" stroke-width="12" stroke-dasharray="${2 * Math.PI * 31 * f} ${2 * Math.PI * 31}" stroke-dashoffset="${-2 * Math.PI * 31 * (offset - 0.25)}"/>`;
    offset += f;
    return arc;
  }).join('');

  const valorKg = dechets.filter((d) => d.s === 'Enlevé').reduce((s, d) => s + (d.unite === 'kg' ? d.qte : d.qte * 0.85), 0);
  const recyclagePct = total > 0 ? Math.round((valorKg / total) * 100) : 0;

  return `<div class="card" style="margin-bottom:0">
    <div class="ct" style="margin-bottom:10px">🥧 Déchets — ${(total / 1000).toFixed(2)} T</div>
    <div style="display:flex;align-items:center;gap:12px;justify-content:center">
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r="31" fill="none" stroke="#f1f5f9" stroke-width="12"/>
        ${arcs}
        <text x="44" y="41" text-anchor="middle" font-size="9" fill="#0f172a" font-weight="800" font-family="Inter,sans-serif">${recyclagePct}%</text>
        <text x="44" y="51" text-anchor="middle" font-size="7" fill="#94a3b8" font-family="Inter,sans-serif">valorisé</text>
      </svg>
      <div style="flex:1;display:flex;flex-direction:column;gap:4px">
        ${pts.slice(0, 5).map(([l, v, c]) => `
        <div style="display:flex;align-items:center;gap:5px">
          <div style="width:7px;height:7px;border-radius:50%;background:${esc(c)};flex-shrink:0"></div>
          <span style="font-size:9.5px;flex:1;color:#64748b">${esc(l)}</span>
          <span style="font-size:9.5px;font-weight:700;color:${esc(c)}">${v}%</span>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

function buildActionsTable() {
  const actions = getEnvActions().filter((a) => a.statut !== 'Clôturée').slice(0, 5);
  const sc = { 'À faire': 'bgr', 'En cours': 'by', 'En retard': 'br', 'Clôturée': 'bg3' };

  return `<div class="card" style="margin-bottom:0">
    <div class="ch">
      <span class="ct">🎯 Actions environnementales actives</span>
      <button onclick="window.goPage('env-actions')" class="btn bsm">Voir toutes →</button>
    </div>
    <table class="tbl">
      <thead><tr><th>Action</th><th>Resp.</th><th>Délai</th><th>Statut</th></tr></thead>
      <tbody>
        ${actions.length ? actions.map((a) => `<tr>
          <td style="font-size:10.5px;font-weight:500;max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(a.action)}</td>
          <td style="font-size:10px">${esc(a.resp)}</td>
          <td style="font-size:10px;color:#94a3b8">${esc(a.fin)}</td>
          <td><span class="badge ${sc[a.statut] || 'bgr'}" style="font-size:8.5px">${esc(a.statut)}</span></td>
        </tr>`).join('') : '<tr><td colspan="4" style="text-align:center;color:#94a3b8;padding:16px">Aucune action active</td></tr>'}
      </tbody>
    </table>
  </div>`;
}

function buildAspectsKpi() {
  const aspects = window.ENV_ASPECTS_DATA || [];
  const stats = { Critique: 0, Significatif: 0, Modéré: 0, Faible: 0 };
  aspects.forEach((a) => stats[a.niv] !== undefined ? stats[a.niv]++ : null);
  const maitrises = aspects.filter((a) => a.s === 'Maîtrisé').length;

  return `<div class="card" style="margin-bottom:0">
    <div class="ch">
      <span class="ct">🌿 Aspects environnementaux</span>
      <button onclick="window.goPage('env-aspects')" class="btn bsm">Gérer →</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
      ${[
        ['Critiques', stats.Critique, '#dc2626', '#fef2f2'],
        ['Significatifs', stats.Significatif, '#ea580c', '#fff7ed'],
        ['Modérés', stats.Modéré, '#f59e0b', '#fffbeb'],
        ['Maîtrisés', `${maitrises}/${aspects.length}`, '#16a34a', '#f0fdf4'],
      ].map(([l, v, c, bg]) => `
      <div style="background:${bg};border:1px solid ${c}30;border-radius:8px;padding:10px;text-align:center">
        <div style="font-size:20px;font-weight:800;color:${c}">${esc(String(v))}</div>
        <div style="font-size:9.5px;color:${c};font-weight:600">${esc(l)}</div>
      </div>`).join('')}
    </div>
  </div>`;
}

export function renderEnvDash() {
  seedEnvAspects();
  seedEnvDechets();
  seedEnvConso();
  seedEnvActions();
  return `<div class="env-page" data-page="env-dash">
    ${buildKpiCards()}
    <div style="display:grid;grid-template-columns:1.6fr 1fr;gap:12px;margin-bottom:12px">
      ${buildConsoChart()}
      ${buildDechetsDonut()}
    </div>
    <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:12px">
      ${buildActionsTable()}
      ${buildAspectsKpi()}
    </div>
  </div>`;
}
