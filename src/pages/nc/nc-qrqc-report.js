/**
 * Rapport QRQC mensuel — agrégation données + export HTML/PDF.
 * Conformité maîtrise des non-conformités (ISO 9001 / 14001 / 45001).
 */
import { computeNcDashboard, NC_KPI_OBJ } from '../../data/nc-kpi.data.js';
import { NC_OBJ } from '../../data/nc-kpi-objectives.data.js';
import { getNcData } from '../../data/nc.data.js';
import { MOIS_LABELS } from '../../data/nc-date.utils.js';
import { initNcRepository } from '../../data/nc-repository.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function fmt(n, dec = 1) {
  return Number(n).toLocaleString('fr-FR', {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  });
}

function gravColor(g) {
  if (g === 'Critique') return '#dc2626';
  if (g === 'Majeure') return '#f59e0b';
  return '#16a34a';
}

function statColor(s) {
  if (s === 'Clôturé') return '#16a34a';
  if (s === 'En cours') return '#2563eb';
  return '#ea580c';
}

/** @param {number} year @param {number} month 1-12 */
export function buildQrqcMonthlyReport(year, month) {
  initNcRepository();
  const data = getNcData();
  const d = computeNcDashboard(data, { year, per: 'mensuel', month });
  const periodLabel = `${MOIS_LABELS[month - 1]} ${year}`;
  const generatedAt = new Date().toLocaleString('fr-FR');

  const actionsAll = d.actionsScope || [];
  const actionsOpen = d.actionsOuvertes || [];
  const actionsClosed = actionsAll.filter((a) => a.statut === 'Clôturée');

  const objectifs = [
    {
      label: 'NC mineures',
      objectif: `≤ ${NC_OBJ.maxMineuresMois} / mois`,
      valeur: String(d.moisObj.mineures),
      ok: d.moisObj.okMineures,
    },
    {
      label: 'NC majeures',
      objectif: `≤ ${NC_OBJ.maxMajeuresMois} / mois`,
      valeur: String(d.moisObj.majeures),
      ok: d.moisObj.okMajeures,
    },
    {
      label: 'Délai moyen traitement',
      objectif: `≤ ${NC_KPI_OBJ.delaiMoyenJours} j`,
      valeur: `${fmt(d.delaiMoyen)} j`,
      ok: d.okDelai,
    },
    {
      label: 'Taux récurrence NC',
      objectif: `≤ ${NC_KPI_OBJ.tauxRecurrenceMax} %`,
      valeur: `${d.repetitives.taux} %`,
      ok: d.okRecurrence,
    },
    {
      label: 'Taux clôture NC',
      objectif: '100 %',
      valeur: `${d.tauxCloture} %`,
      ok: d.tauxCloture >= 80,
    },
    {
      label: 'Efficacité actions',
      objectif: '≥ 80 %',
      valeur: `${d.efficacite} %`,
      ok: d.efficacite >= 80,
    },
  ];

  return {
    year,
    month,
    periodLabel,
    generatedAt,
    dashboard: d,
    ncs: d.scoped,
    actionsOpen,
    actionsClosed,
    actionsAll,
    objectifs,
    conformiteGlobale: objectifs.every((o) => o.ok),
  };
}

function renderKpiGrid(report) {
  const d = report.dashboard;
  const kpis = [
    ['Total NC', d.total, '#0284c7'],
    ['Critiques', d.critiques, '#dc2626'],
    ['Majeures', d.majeures, '#f59e0b'],
    ['Mineures', d.mineures, '#16a34a'],
    ['Clôturées', d.closed, '#16a34a'],
    ['En cours', d.ouvertes, '#ea580c'],
    ['Taux clôture', `${d.tauxCloture}%`, '#0284c7'],
    ['Actions ouvertes', d.actionsOuvertes.length, '#1e40af'],
  ];
  return `<div class="kpi-grid">${kpis
    .map(
      ([l, v, c]) => `<div class="kpi-card" style="border-top:3px solid ${c}">
      <div class="kpi-val" style="color:${c}">${esc(v)}</div>
      <div class="kpi-lbl">${esc(l)}</div>
    </div>`
    )
    .join('')}</div>`;
}

function renderObjectifsTable(objectifs) {
  return `<table class="tbl">
    <thead><tr><th>Indicateur</th><th>Objectif</th><th>Résultat</th><th>Conformité</th></tr></thead>
    <tbody>${objectifs
      .map(
        (o) => `<tr>
      <td>${esc(o.label)}</td>
      <td>${esc(o.objectif)}</td>
      <td style="font-weight:700">${esc(o.valeur)}</td>
      <td style="color:${o.ok ? '#16a34a' : '#dc2626'};font-weight:700">${o.ok ? '✓ Conforme' : '✕ Écart'}</td>
    </tr>`
      )
      .join('')}</tbody>
  </table>`;
}

function renderNcTable(ncs) {
  if (!ncs.length) {
    return '<p class="muted">Aucune non-conformité enregistrée sur cette période.</p>';
  }
  return `<table class="tbl">
    <thead><tr><th>N°</th><th>Date</th><th>Projet</th><th>Département</th><th>Gravité</th><th>Statut</th><th>Responsable</th><th>Description</th></tr></thead>
    <tbody>${ncs
      .map(
        (nc) => `<tr>
      <td style="font-weight:700">${esc(nc.n)}</td>
      <td>${esc(nc.d)}</td>
      <td>${esc(nc.p || '—')}</td>
      <td>${esc(nc.dep || '—')}</td>
      <td style="color:${gravColor(nc.g)};font-weight:700">${esc(nc.g)}</td>
      <td style="color:${statColor(nc.s)};font-weight:600">${esc(nc.s)}</td>
      <td>${esc(nc.r || '—')}</td>
      <td style="max-width:220px">${esc(nc.desc || '—')}</td>
    </tr>`
      )
      .join('')}</tbody>
  </table>`;
}

function renderActionsTable(actions, emptyMsg) {
  if (!actions.length) return `<p class="muted">${esc(emptyMsg)}</p>`;
  return `<table class="tbl">
    <thead><tr><th>Action</th><th>Type</th><th>NC liée</th><th>Responsable</th><th>Statut</th><th>Échéance</th><th>Priorité</th></tr></thead>
    <tbody>${actions
      .map(
        (a) => `<tr>
      <td style="font-weight:600">${esc(a.action)}</td>
      <td>${esc(a.type || '—')}</td>
      <td>${esc(a.ref || '—')}</td>
      <td>${esc(a.resp || '—')}</td>
      <td style="color:${a.statut === 'En retard' ? '#dc2626' : a.statut === 'Clôturée' ? '#16a34a' : '#ea580c'};font-weight:600">${esc(a.statut)}</td>
      <td>${esc(a.fin || '—')}</td>
      <td>${esc(a.prio || '—')}</td>
    </tr>`
      )
      .join('')}</tbody>
  </table>`;
}

function renderDeptBars(parDepartement) {
  if (!parDepartement?.length) return '<p class="muted">Aucune donnée par département.</p>';
  return parDepartement
    .map(
      (row) => `<div class="hbar">
      <span class="hbar-lbl">${esc(row.dep)}</span>
      <div class="hbar-track"><div class="hbar-fill" style="width:${row.taux}%">${row.taux}% (${row.count})</div></div>
    </div>`
    )
    .join('');
}

function renderCauseBars(causesSorted) {
  if (!causesSorted?.length) return '<p class="muted">Causes racines non renseignées.</p>';
  return causesSorted
    .slice(0, 6)
    .map(
      (c) => `<div class="hbar">
      <span class="hbar-lbl">${esc(c.label)}</span>
      <div class="hbar-track"><div class="hbar-fill purple" style="width:${Math.max(c.pct, 8)}%">${c.pct}% (${c.count})</div></div>
    </div>`
    )
    .join('');
}

const REPORT_CSS = `
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',Inter,Arial,sans-serif;font-size:12px;line-height:1.55;color:#0f172a;padding:32px 40px;background:#fff}
  h1{font-size:22px;font-weight:800;color:#0f172a;margin-bottom:4px}
  h2{font-size:14px;font-weight:800;color:#0284c7;margin:20px 0 10px;padding-bottom:6px;border-bottom:2px solid #e2e8f0}
  .header{background:linear-gradient(135deg,#f0f9ff,#fff);border:1px solid #bae6fd;border-left:4px solid #0284c7;border-radius:10px;padding:18px 22px;margin-bottom:20px}
  .sub{font-size:11px;color:#64748b;margin-top:4px}
  .badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700}
  .badge-ok{background:#f0fdf4;color:#16a34a;border:1px solid #86efac}
  .badge-ko{background:#fef2f2;color:#dc2626;border:1px solid #fca5a5}
  .kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:12px 0}
  .kpi-card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;text-align:center}
  .kpi-val{font-size:20px;font-weight:800;line-height:1.1}
  .kpi-lbl{font-size:9px;color:#64748b;font-weight:600;text-transform:uppercase;margin-top:4px}
  .tbl{width:100%;border-collapse:collapse;font-size:10.5px;margin-top:8px}
  .tbl th{background:#f1f5f9;padding:8px 10px;text-align:left;font-size:9px;text-transform:uppercase;letter-spacing:.04em;color:#64748b;border-bottom:2px solid #e2e8f0}
  .tbl td{padding:8px 10px;border-bottom:1px solid #f1f5f9;vertical-align:top}
  .tbl tr:nth-child(even) td{background:#fafbfc}
  .muted{color:#94a3b8;font-size:11px;padding:8px 0}
  .hbar{display:flex;align-items:center;gap:10px;margin-bottom:8px}
  .hbar-lbl{width:110px;font-size:10px;font-weight:600;flex-shrink:0}
  .hbar-track{flex:1;height:18px;background:#f1f5f9;border-radius:5px;overflow:hidden}
  .hbar-fill{height:100%;background:#0284c7;border-radius:5px;font-size:9px;font-weight:700;color:#fff;padding:0 8px;display:flex;align-items:center;min-width:36px}
  .hbar-fill.purple{background:#7c3aed}
  .cols{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  .foot{margin-top:24px;padding:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:9px;color:#64748b}
  .iso-ref{font-size:10px;color:#0369a1;font-weight:600;margin-top:8px}
  @media print{body{padding:16px}h2{break-after:avoid}.tbl{break-inside:auto}}
`;

/** HTML autonome pour téléchargement / impression */
export function generateQrqcReportHtml(report) {
  const d = report.dashboard;
  const confBadge = report.conformiteGlobale
    ? '<span class="badge badge-ok">✓ Objectifs mensuels atteints</span>'
    : '<span class="badge badge-ko">⚠ Écarts objectifs détectés</span>';

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8">
<title>Rapport QRQC — ${esc(report.periodLabel)}</title>
<style>${REPORT_CSS}</style></head><body>
  <div class="header">
    <h1>⚡ Rapport QRQC mensuel</h1>
    <div class="sub">XPERT MECA · Période : <strong>${esc(report.periodLabel)}</strong> · Généré le ${esc(report.generatedAt)}</div>
    <div class="iso-ref">Maîtrise des non-conformités — ISO 9001 · ISO 14001 · ISO 45001</div>
    <div style="margin-top:10px">${confBadge}</div>
  </div>

  <h2>1. Tableau de bord — Indicateurs clés</h2>
  ${renderKpiGrid(report)}
  ${d.alert?.show ? `<p class="muted" style="color:#dc2626;font-weight:600">⚠ ${esc(d.alert.label)} : ${esc(d.alert.detail)}</p>` : ''}

  <h2>2. Conformité aux objectifs qualité</h2>
  ${renderObjectifsTable(report.objectifs)}

  <h2>3. Non-conformités du mois (${report.ncs.length})</h2>
  ${renderNcTable(report.ncs)}

  <h2>4. Actions correctives & préventives</h2>
  <p class="muted" style="margin-bottom:8px"><strong>${report.actionsOpen.length}</strong> action(s) ouverte(s) · <strong>${report.actionsClosed.length}</strong> clôturée(s) sur la période</p>
  <h3 style="font-size:12px;font-weight:700;margin:12px 0 6px;color:#ea580c">Actions à réaliser</h3>
  ${renderActionsTable(report.actionsOpen, 'Aucune action en attente sur cette période.')}
  <h3 style="font-size:12px;font-weight:700;margin:16px 0 6px;color:#16a34a">Actions clôturées</h3>
  ${renderActionsTable(report.actionsClosed, 'Aucune action clôturée sur cette période.')}

  <h2>5. Analyse — Départements & causes racines</h2>
  <div class="cols">
    <div>
      <p style="font-size:10px;font-weight:700;margin-bottom:8px">Répartition par département</p>
      ${renderDeptBars(d.parDepartement)}
    </div>
    <div>
      <p style="font-size:10px;font-weight:700;margin-bottom:8px">Causes racines (année ${d.year})</p>
      ${renderCauseBars(d.causesSorted)}
    </div>
  </div>

  <h2>6. Synthèse QRQC</h2>
  <table class="tbl">
    <tbody>
      <tr><td style="font-weight:600;width:40%">Délai moyen de traitement</td><td>${fmt(d.delaiMoyen)} jours (obj. ≤ ${NC_KPI_OBJ.delaiMoyenJours} j)</td></tr>
      <tr><td style="font-weight:600">Taux de récurrence</td><td>${d.repetitives.taux}% — ${d.repetitives.count} NC répétitive(s)</td></tr>
      <tr><td style="font-weight:600">Détection interne</td><td>${d.pctInterne}% des NC détectées en interne</td></tr>
      <tr><td style="font-weight:600">Efficacité du plan d'actions</td><td>${d.efficacite}% des actions clôturées</td></tr>
      ${d.topCause ? `<tr><td style="font-weight:600">Cause prioritaire</td><td>${esc(d.topCause.label)} (${d.topCause.pct}%)</td></tr>` : ''}
    </tbody>
  </table>

  <div class="foot">
    Document généré automatiquement par la plateforme QHSE XPERT MECA — Rapport QRQC ${esc(report.periodLabel)}.<br>
    Ce rapport constitue un enregistrement de maîtrise des non-conformités et des actions associées.
    Distribution contrôlée — version du ${esc(report.generatedAt)}.
  </div>
</body></html>`;
}

export function downloadQrqcReport(year, month) {
  const report = buildQrqcMonthlyReport(year, month);
  const html = generateQrqcReportHtml(report);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const m = String(month).padStart(2, '0');
  a.href = url;
  a.download = `QRQC-${year}-${m}.html`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
  return report;
}

export function printQrqcReport(year, month) {
  const report = buildQrqcMonthlyReport(year, month);
  const html = generateQrqcReportHtml(report);
  const w = window.open('', '_blank');
  if (!w) return false;
  w.document.write(html);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 400);
  return true;
}
