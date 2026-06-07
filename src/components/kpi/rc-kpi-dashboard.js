/**
 * Blocs visuels tableau de bord RC (maquette ISO).
 */
import { renderDonutChart, renderMonthlyRcChart } from '../nc/nc-kpi-charts.js';
import { RC_OBJ } from '../../data/rc-kpi.data.js';

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}
function fmt(n, d = 1) {
  return Number(n).toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
}

export function renderRcDashboardHeader(per, lastUpdate, year, trimestre) {
  const periods = [
    ['mensuel', 'Mensuel'],
    ['trimestre', 'Trimestre'],
    ['annuel', 'Annuel'],
  ];
  const perLabel =
    per === 'trimestre' ? `${trimestre} ${year}` : per === 'annuel' ? `Année ${year}` : `Mensuel ${year}`;
  return `<div class="rc-kpi-dash-head card">
    <div>
      <div class="rc-kpi-dash-title">Tableau de bord KPI — Réclamations clients</div>
      <div class="rc-kpi-dash-sub">ISO 9001 · Vue ${esc(perLabel)} · MAJ ${esc(lastUpdate)}</div>
    </div>
    <div class="rc-kpi-dash-actions">
      <div class="rc-kpi-per-toggle" role="group">
        ${periods
          .map(
            ([id, label]) =>
              `<button type="button" class="rc-kpi-per-btn${per === id ? ' active' : ''}" data-rc-kpi-per="${id}">${label}</button>`
          )
          .join('')}
      </div>
      <button type="button" class="btn bsm" data-rc-kpi-print>📥 Exporter PDF</button>
    </div>
  </div>`;
}

export function renderRcAlertBanner(alert) {
  if (!alert?.show) return '';
  return `<div class="rc-kpi-alert" data-rc-kpi-alert>
    <span style="font-size:20px">🚨</span>
    <div style="flex:1">
      <span style="font-weight:700">${esc(alert.label)} · </span>
      <span>${esc(alert.detail)}</span>
    </div>
    <button type="button" class="rc-kpi-alert-close" data-rc-kpi-alert-close aria-label="Fermer">✕</button>
  </div>`;
}

const CARD_DEFS = (d) => [
  ['Total RC', String(d.n), 'var(--blue)', '📋', d.prevLabel ? `vs ${d.prevCount} (${d.prevLabel})` : '', d.n > d.prevCount ? '↑' : d.n < d.prevCount ? '↓' : '→'],
  ['Ouvertes', String(d.ouvertes), 'var(--orange)', '🔓', 'En attente action', d.ouvertes > 0 ? '⚠' : '→'],
  ['Critiques', String(d.critiques), 'var(--red)', '🚨', 'Traitement urgent', d.critiques > 0 ? '!' : '→'],
  ['Clôturées', String(d.closed), 'var(--green)', '✅', `Taux : ${d.tauxCloture}%`, '→'],
  ['Délai moyen', `${fmt(d.tempsMoyen, 1)} j`, 'var(--navy)', '⏱', `Objectif ≤ ${RC_OBJ.tempsMoyenJours}j`, d.ok.tempsMoyen ? '→' : '↑'],
  ['Taux clôture', `${d.tauxCloture}%`, d.ok.tauxCloture ? 'var(--green)' : '#b91c1c', '📊', `Objectif ≥ ${RC_OBJ.tauxClotureDelais}%`, d.ok.tauxCloture ? '→' : '↓'],
  ['RC répétitives', `${d.repetitives.taux}%`, d.ok.repetitives ? 'var(--green)' : '#c2410c', '🔁', `Objectif ≤ ${RC_OBJ.tauxRepetitives}%`, d.ok.repetitives ? '→' : '↑'],
  ['Satisfaction', `${d.satisfaction}%`, d.ok.satisfaction ? 'var(--green)' : '#ea580c', '⭐', `Objectif ≥ ${RC_OBJ.satisfactionMin}%`, d.ok.satisfaction ? '→' : '↑'],
];

export function renderRcMetricCards(d) {
  return `<div class="rc-kpi-metrics">${CARD_DEFS(d)
    .map(([l, v, c, ic, sub, arrow]) => {
      const arrowColor =
        arrow === '↑' ? 'var(--red)' : arrow === '↓' ? 'var(--green)' : 'var(--muted)';
      return `<div class="rc-kpi-metric-card" style="--rc-accent:${c}">
        <div class="rc-kpi-metric-top">
          <span>${ic}</span>
          <span class="rc-kpi-metric-arrow" style="color:${arrowColor}">${arrow}</span>
        </div>
        <div class="rc-kpi-metric-val" style="color:${c}">${esc(v)}</div>
        <div class="rc-kpi-metric-lbl">${esc(l)}</div>
        <div class="rc-kpi-metric-sub">${esc(sub)}</div>
      </div>`;
    })
    .join('')}</div>`;
}

export function renderRcChartsRow(d, year) {
  const statusColors = {
    Ouvert: '#ea580c',
    'En traitement': '#2563eb',
    'En analyse': '#f59e0b',
    Clôturée: '#16a34a',
    _default: '#94a3b8',
  };
  const gravColors = {
    Critique: '#dc2626',
    Majeure: '#f97316',
    Mineure: '#22c55e',
    _default: '#94a3b8',
  };

  return `<div class="rc-kpi-charts-row">
    <div class="card rc-kpi-chart-card">
      <div class="ch">
        <span class="ct">📈 Évolution mensuelle des RC — ${year}</span>
        <span class="kpi-muted">Objectif ≤ ${RC_OBJ.maxRcMois} RC/mois</span>
      </div>
      ${renderMonthlyRcChart(d.agg.byMonth, d.monthsForChart, RC_OBJ.maxRcMois)}
      <div class="rc-kpi-chart-legend">
        <span><i class="rc-kpi-sq rc-kpi-sq--ok"></i>Conforme ≤${RC_OBJ.maxRcMois}</span>
        <span><i class="rc-kpi-sq rc-kpi-sq--ko"></i>Dépassé &gt;${RC_OBJ.maxRcMois}</span>
        <span><i class="rc-kpi-line"></i>Objectif</span>
      </div>
    </div>
    <div class="card rc-kpi-chart-card">
      <div class="ct" style="margin-bottom:10px">🥧 Répartition des RC</div>
      <div class="rc-kpi-donuts">
        ${d.n
          ? `${renderDonutChart('Statut', d.agg.byStatus, statusColors, 'RC')}
          <div class="rc-kpi-donut-sep"></div>
          ${renderDonutChart('Gravité', d.agg.byGrav, gravColors, 'RC')}`
          : '<p class="kpi-muted">Aucune RC sur la période.</p>'}
      </div>
    </div>
  </div>`;
}

export function renderRcTrimestreGrid(year, cards) {
  return `<div class="card">
    <div class="ch">
      <span class="ct">🎯 Objectifs trimestriels ${year}</span>
      <span class="kpi-muted">Objectif ≤ ${RC_OBJ.maxRcTrimestre} RC / trimestre</span>
    </div>
    <div class="rc-kpi-trim-grid">
      ${cards
        .map((c) => {
          const val = c.count == null ? '—' : String(c.count);
          return `<div class="rc-kpi-trim-card" style="border-top-color:${c.color}">
            <div class="rc-kpi-trim-id">${c.trimestre} ${year}</div>
            <div class="kpi-muted" style="font-size:9px;margin-bottom:6px">${c.period}</div>
            <div class="rc-kpi-trim-val" style="color:${c.color}">${val}</div>
            <div class="rc-kpi-trim-lbl">RC enregistrées</div>
            <div class="rc-kpi-trim-bar">
              <div class="rc-kpi-trim-fill" style="width:${c.pct}%;background:${c.color}"></div>
              <div class="rc-kpi-trim-marker" style="left:${Math.min(c.markerPct, 98)}%" title="Objectif ≤ ${c.seuil}"></div>
            </div>
            <span class="badge ${c.badge}" style="font-size:8.5px;margin-top:6px">${esc(c.statut)}</span>
          </div>`;
        })
        .join('')}
    </div>
  </div>`;
}

const PARETO_COLORS = ['#dc2626', '#ea580c', '#f59e0b', '#6366f1', '#06b6d4'];

export function renderRcPareto(d) {
  if (!d.pareto.length) {
    return `<div class="card"><div class="ct">📉 Analyse Pareto — Top défauts</div><p class="kpi-muted">—</p></div>`;
  }
  return `<div class="card">
    <div class="ct" style="margin-bottom:10px">📉 Analyse Pareto — Top défauts</div>
    <div class="rc-kpi-pareto">${d.pareto
      .map((p, i) => {
        const c = PARETO_COLORS[i] || '#94a3b8';
        return `<div class="rc-kpi-pareto-row">
          <span class="rc-kpi-pareto-lbl">${esc(p.motif)}</span>
          <div class="rc-kpi-pareto-bar-wrap">
            <div class="rc-kpi-pareto-track"><div class="rc-kpi-pareto-fill" style="width:${p.bar}%;background:${c}"></div></div>
            <span class="rc-kpi-pareto-n" style="color:${c}">${p.occ}</span>
          </div>
        </div>`;
      })
      .join('')}</div>
    <div class="rc-kpi-pareto-foot">
      <span class="kpi-muted">Pareto 80/20 : Top 2 motifs = <strong>${d.top2Pct}%</strong> des cas</span>
      <button type="button" class="btn bsm" data-nav="rc-liste">Liste RC →</button>
    </div>
  </div>`;
}

export function renderRcClientsTable(clients) {
  const badge = (s) =>
    s === 'Critique' ? 'br' : s === 'Élevé' ? 'bo' : s === 'Moyen' ? 'by' : 'bg3';
  return `<div class="card">
    <div class="ct" style="margin-bottom:10px">👥 RC par client — Classement</div>
    ${clients.length
      ? `<table class="tbl"><thead><tr><th>Client</th><th style="text-align:center">RC</th><th style="text-align:center">Critique</th><th>Délai moy.</th><th>Statut</th></tr></thead><tbody>
      ${clients
        .map(
          (c) => `<tr>
        <td style="font-weight:600">${esc(c.cl)}</td>
        <td style="text-align:center;font-weight:700">${c.rc}</td>
        <td style="text-align:center;font-weight:700;color:${c.critique > 0 ? 'var(--red)' : 'var(--green)'}">${c.critique}</td>
        <td style="font-family:monospace;font-size:10.5px">${esc(c.delai)}</td>
        <td><span class="badge ${badge(c.statut)}" style="font-size:9px">${esc(c.statut)}</span></td>
      </tr>`
        )
        .join('')}
    </tbody></table>`
      : '<p class="kpi-muted">—</p>'}
    <button type="button" class="btn" style="width:100%;margin-top:10px;font-size:11px" data-nav="rc-liste">📋 Voir toutes les RC →</button>
  </div>`;
}
