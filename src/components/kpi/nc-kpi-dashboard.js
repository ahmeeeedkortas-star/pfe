/**
 * Tableau de bord NC — visuel simple (maquette ISO).
 */
import { renderDonutChart, renderBarChart } from '../nc/nc-kpi-charts.js';
import { NC_OBJ } from '../../data/nc-kpi-objectives.data.js';
import { NC_KPI_OBJ } from '../../data/nc-kpi.data.js';
import { MOIS_LABELS } from '../../data/rc-date.utils.js';

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

export function renderNcDashboardHeader(d, lastUpdate) {
  const periods = [
    ['mensuel', 'Mensuel'],
    ['trimestre', 'Trimestre'],
    ['annuel', 'Annuel'],
  ];
  const perLabel =
    d.per === 'trimestre'
      ? `${d.trimestre} ${d.year}`
      : d.per === 'annuel'
        ? `Année ${d.year}`
        : `${MOIS_LABELS[d.month - 1]} ${d.year}`;
  return `<div class="rc-kpi-dash-head card">
    <div>
      <div class="rc-kpi-dash-title">Tableau de bord KPI — Non-conformités</div>
      <div class="rc-kpi-dash-sub">ISO 9001 · Suivi QRQC · ${esc(perLabel)} · MAJ ${esc(lastUpdate)}</div>
    </div>
    <div class="rc-kpi-dash-actions">
      <div class="rc-kpi-per-toggle" role="group">
        ${periods
          .map(
            ([id, label]) =>
              `<button type="button" class="rc-kpi-per-btn${d.per === id ? ' active' : ''}" data-nc-kpi-per="${id}">${label}</button>`
          )
          .join('')}
      </div>
      <button type="button" class="btn bsm" data-nav="nc-rapport">📄 Rapport QRQC</button>
      <button type="button" class="btn bsm" data-nc-kpi-print>📥 Exporter PDF</button>
    </div>
  </div>`;
}

export function renderNcAlertBanner(alert) {
  if (!alert?.show) return '';
  return `<div class="rc-kpi-alert" data-nc-kpi-alert>
    <span style="font-size:20px">⚠️</span>
    <div style="flex:1">
      <span style="font-weight:700">${esc(alert.label)} · </span>
      <span>${esc(alert.detail)}</span>
    </div>
    <button type="button" class="rc-kpi-alert-close" data-nc-kpi-alert-close aria-label="Fermer">✕</button>
  </div>`;
}

export function renderNcMetricCards(d) {
  const cards = [
    ['Total NC', String(d.total), 'var(--blue)', '📋', `Cumul période · ${d.yearTotal} sur ${d.year}`],
    ['Critiques', String(d.critiques), 'var(--red)', '🚨', 'Traitement urgent'],
    ['Clôturées', String(d.closed), 'var(--green)', '✅', `Taux : ${d.tauxCloture}%`],
    ['En cours', String(d.ouvertes), 'var(--orange)', '⏳', 'Suivi actif'],
    [
      'Mineures (mois)',
      String(d.moisObj.mineures),
      d.moisObj.okMineures ? 'var(--green)' : '#dc2626',
      '🟢',
      `Obj. ≤ ${NC_OBJ.maxMineuresMois}/mois`,
    ],
    [
      'Majeures (mois)',
      String(d.moisObj.majeures),
      d.moisObj.okMajeures ? 'var(--green)' : '#dc2626',
      '🟠',
      `Obj. ≤ ${NC_OBJ.maxMajeuresMois}/mois`,
    ],
    [
      'Délai moyen traitement',
      `${d.delaiMoyen.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} j`,
      d.okDelai ? 'var(--green)' : '#dc2626',
      '⏱',
      `Objectif ≤ ${NC_KPI_OBJ.delaiMoyenJours} j`,
    ],
    [
      'Taux récurrence NC',
      `${d.repetitives.taux}%`,
      d.okRecurrence ? 'var(--green)' : '#c2410c',
      '🔁',
      `Objectif ≤ ${NC_KPI_OBJ.tauxRecurrenceMax}%`,
    ],
    ['Actions ouvertes', String(d.actionsOuvertes.length), '#1e40af', '🎯', 'À réaliser'],
  ];
  return `<div class="rc-kpi-metrics">${cards
    .map(
      ([l, v, c, ic, sub]) => `<div class="rc-kpi-metric-card" style="--rc-accent:${c}">
        <div class="rc-kpi-metric-top"><span>${ic}</span></div>
        <div class="rc-kpi-metric-val" style="color:${c}">${esc(v)}</div>
        <div class="rc-kpi-metric-lbl">${esc(l)}</div>
        <div class="rc-kpi-metric-sub">${esc(sub)}</div>
      </div>`
    )
    .join('')}</div>`;
}

/** Indicateurs clés : département, délai, récurrence */
export function renderNcKpiIndicators(d) {
  const deptBars = d.parDepartement.map((row) => ({
    label: row.dep,
    value: row.taux,
    display: `${row.taux}%`,
    color: row.taux >= 40 ? '#dc2626' : row.taux >= 25 ? '#ea580c' : '#2563eb',
  }));

  return `<div class="card" style="margin-top:12px;padding:14px">
    <div class="ch"><span class="ct">Indicateurs qualité — période sélectionnée</span></div>
    <div class="g2" style="gap:14px;margin-top:8px">
      <div>
        <div class="ct" style="font-size:11px;margin-bottom:8px">Taux de non-conformité par département</div>
        <p class="kpi-muted" style="margin:0 0 8px">Part des NC du département sur le total de la période (%).</p>
        ${
          deptBars.length
            ? renderBarChart(deptBars, {
                max: Math.max(100, ...deptBars.map((b) => b.value)),
                height: 100,
                unit: '%',
              })
            : '<p class="kpi-muted">Aucune NC sur cette période.</p>'
        }
      </div>
      <div class="nc-kpi-indicators-side">
        <div class="nc-kpi-indicator-box" style="border-color:${d.okDelai ? '#bbf7d0' : '#fecaca'}">
          <div class="nc-kpi-indicator-label">Délai moyen de traitement</div>
          <div class="nc-kpi-indicator-val" style="color:${d.okDelai ? 'var(--green)' : '#dc2626'}">
            ${d.delaiMoyen.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} j
          </div>
          <div class="kpi-muted">Objectif ≤ ${NC_KPI_OBJ.delaiMoyenJours} jours</div>
        </div>
        <div class="nc-kpi-indicator-box" style="border-color:${d.okRecurrence ? '#bbf7d0' : '#fde68a'}">
          <div class="nc-kpi-indicator-label">Taux de récurrence NC</div>
          <div class="nc-kpi-indicator-val" style="color:${d.okRecurrence ? 'var(--green)' : '#c2410c'}">
            ${d.repetitives.taux}%
          </div>
          <div class="kpi-muted">${d.repetitives.count} NC répétitive(s) · obj. ≤ ${NC_KPI_OBJ.tauxRecurrenceMax}%</div>
          ${
            d.repetitives.motifs[0]
              ? `<div class="kpi-muted" style="margin-top:6px">Motif fréquent : « ${esc(d.repetitives.motifs[0].motif)} »</div>`
              : ''
          }
        </div>
      </div>
    </div>
  </div>`;
}

export function renderNcChartsRow(d) {
  const statusColors = {
    'En cours': '#dc2626',
    Ouvert: '#ea580c',
    Clôturé: '#16a34a',
    _default: '#94a3b8',
  };
  const gravColors = {
    Critique: '#dc2626',
    Majeure: '#f59e0b',
    Mineure: '#22c55e',
    _default: '#94a3b8',
  };

  const monthItems = MOIS_LABELS.map((m) => {
    const maj = d.byMonthMajeures[m] || 0;
    const min = d.byMonthMineures[m] || 0;
    const over = maj > NC_OBJ.maxMajeuresMois || min > NC_OBJ.maxMineuresMois;
    return {
      label: m,
      value: d.byMonth[m] || 0,
      display: d.byMonth[m] ?? '—',
      color: over ? '#dc2626' : (d.byMonth[m] || 0) > 0 ? '#16a34a' : '#e5e7eb',
    };
  });

  return `<div class="rc-kpi-charts-row">
    <div class="card rc-kpi-chart-card">
      <div class="ch">
        <span class="ct">📈 Évolution mensuelle des NC — ${d.year}</span>
      </div>
      <p class="kpi-muted" style="margin:0 0 8px">Obj. mineures ≤ ${NC_OBJ.maxMineuresMois}/mois · majeures ≤ ${NC_OBJ.maxMajeuresMois}/mois</p>
      ${renderBarChart(monthItems, {
        max: Math.max(NC_OBJ.maxMajeuresMois + 2, ...monthItems.map((i) => i.value), 4),
        height: 110,
      })}
    </div>
    <div class="card rc-kpi-chart-card" style="padding:14px">
      <div class="ch"><span class="ct">Répartition NC</span></div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        ${renderDonutChart('Statut', d.byStatus, statusColors)}
        ${renderDonutChart('Gravité', d.byGrav, gravColors)}
      </div>
    </div>
  </div>`;
}

export function renderNcStadeAndCauses(d) {
  const stadeBars = d.stades
    .filter((s) => s.pct > 0)
    .map((s) => [s.label, `${s.pct}%`, '#2563eb', s.pct]);

  const causeBars = d.causesSorted.slice(0, 5).map((c) => [c.label, `${c.pct}%`, '#7c3aed', c.pct]);

  return `<div class="g2" style="gap:12px;margin-top:12px">
    <div class="card" style="padding:14px">
      <div class="ch"><span class="ct">Stade de détection</span></div>
      ${stadeBars.length ? renderHBarList(stadeBars) : '<p class="kpi-muted">Aucune donnée</p>'}
      <p class="kpi-muted" style="margin:10px 0 0;padding:8px;background:#f0fdf4;border-radius:6px;border:1px solid #bbf7d0">
        ${d.pctInterne}% détectées en interne · ${d.pctLivraison}% à la livraison
      </p>
    </div>
    <div class="card" style="padding:14px">
      <div class="ch"><span class="ct">Causes racines</span></div>
      ${causeBars.length ? renderHBarList(causeBars) : '<p class="kpi-muted">Renseignez la cause sur chaque NC</p>'}
      ${
        d.topCause
          ? `<p class="kpi-muted" style="margin:10px 0 0;padding:8px;background:#eff6ff;border-radius:6px;border:1px solid #bfdbfe">
        Action prioritaire : traiter « ${esc(d.topCause.label)} » (${d.topCause.pct}%)
      </p>`
          : ''
      }
    </div>
  </div>`;
}

function renderHBarList(items) {
  return items
    .map(
      ([label, pct, color, raw]) => `
    <div class="nc-kpi-hbar">
      <span class="nc-kpi-hbar-lbl">${esc(label)}</span>
      <div class="nc-kpi-hbar-track">
        <div class="nc-kpi-hbar-fill" style="width:${raw}%;background:${color}">${esc(pct)}</div>
      </div>
    </div>`
    )
    .join('');
}

export function renderNcActionsTable(actions, title = 'Actions à réaliser') {
  if (!actions.length) {
    return `<div class="card" style="margin-top:12px;padding:14px">
      <div class="ch"><span class="ct">${esc(title)}</span></div>
      <p class="kpi-muted">Aucune action en attente.</p>
    </div>`;
  }
  const rows = actions
    .map(
      (a) => `<tr>
      <td style="font-weight:500">${esc(a.action)}</td>
      <td>${esc(a.type)}</td>
      <td>${esc(a.ref)}</td>
      <td>${esc(a.resp)}</td>
      <td><span class="badge ${a.statut === 'En retard' ? 'br' : 'by'}">${esc(a.statut)}</span></td>
      <td style="font-size:10px;color:var(--muted)">${esc(a.fin || '—')}</td>
    </tr>`
    )
    .join('');
  return `<div class="card" style="margin-top:12px">
    <div class="ch"><span class="ct">${esc(title)}</span> <span class="badge br" style="margin-left:6px">${actions.length}</span></div>
    <table class="tbl">
      <thead><tr><th>Action</th><th>Type</th><th>NC</th><th>Responsable</th><th>Statut</th><th>Échéance</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`;
}
