/**
 * Page Rapport QRQC mensuel — aperçu, téléchargement, impression PDF.
 */
import {
  buildQrqcMonthlyReport,
  downloadQrqcReport,
  printQrqcReport,
} from './nc-qrqc-report.js';
import { MOIS_LABELS } from '../../data/nc-date.utils.js';
import { getNcYears } from '../../data/nc-kpi.data.js';
import { getNcData } from '../../data/nc.data.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

export function renderNcQrqcRapport() {
  const now = new Date();
  const year = window.ncQrqcYear ?? now.getFullYear();
  const month = window.ncQrqcMonth ?? now.getMonth() + 1;
  const report = buildQrqcMonthlyReport(year, month);
  const d = report.dashboard;

  const years = getNcYears(getNcData());
  if (!years.includes(year)) years.unshift(year);

  const monthOpts = MOIS_LABELS.map(
    (m, i) => `<option value="${i + 1}"${i + 1 === month ? ' selected' : ''}>${m}</option>`
  ).join('');
  const yearOpts = years.map((y) => `<option value="${y}"${y === year ? ' selected' : ''}>${y}</option>`).join('');

  const kpiCards = [
    ['Total NC', d.total, '#0284c7'],
    ['Critiques', d.critiques, '#dc2626'],
    ['Clôturées', d.closed, '#16a34a'],
    ['En cours', d.ouvertes, '#ea580c'],
    ['Taux clôture', `${d.tauxCloture}%`, '#0284c7'],
    ['Actions ouvertes', d.actionsOuvertes.length, '#1e40af'],
  ]
    .map(
      ([l, v, c]) => `<div class="card" style="padding:14px;text-align:center;border-top:3px solid ${c}">
      <div style="font-size:22px;font-weight:800;color:${c}">${esc(v)}</div>
      <div style="font-size:10px;color:#64748b;font-weight:600;margin-top:4px">${esc(l)}</div>
    </div>`
    )
    .join('');

  const objRows = report.objectifs
    .map(
      (o) => `<tr>
    <td style="font-weight:600">${esc(o.label)}</td>
    <td>${esc(o.objectif)}</td>
    <td style="font-weight:700">${esc(o.valeur)}</td>
    <td><span class="badge" style="background:${o.ok ? '#f0fdf4' : '#fef2f2'};color:${o.ok ? '#16a34a' : '#dc2626'};border:1px solid ${o.ok ? '#86efac' : '#fca5a5'}">${o.ok ? '✓ Conforme' : '✕ Écart'}</span></td>
  </tr>`
    )
    .join('');

  const ncRows =
    report.ncs.length === 0
      ? '<tr><td colspan="7" style="text-align:center;color:#94a3b8;padding:16px">Aucune NC sur cette période</td></tr>'
      : report.ncs
          .map(
            (nc) => `<tr>
      <td style="font-weight:700">${esc(nc.n)}</td>
      <td>${esc(nc.d)}</td>
      <td>${esc(nc.dep)}</td>
      <td><span style="color:${nc.g === 'Critique' ? '#dc2626' : nc.g === 'Majeure' ? '#f59e0b' : '#16a34a'};font-weight:700">${esc(nc.g)}</span></td>
      <td>${esc(nc.s)}</td>
      <td>${esc(nc.r)}</td>
      <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(nc.desc)}</td>
    </tr>`
          )
          .join('');

  const actOpenRows =
    report.actionsOpen.length === 0
      ? '<tr><td colspan="6" style="text-align:center;color:#94a3b8">Aucune action en attente</td></tr>'
      : report.actionsOpen
          .map(
            (a) => `<tr>
      <td style="font-weight:600">${esc(a.action)}</td>
      <td>${esc(a.type)}</td>
      <td>${esc(a.ref)}</td>
      <td>${esc(a.resp)}</td>
      <td><span style="color:${a.statut === 'En retard' ? '#dc2626' : '#ea580c'};font-weight:600">${esc(a.statut)}</span></td>
      <td>${esc(a.fin || '—')}</td>
    </tr>`
          )
          .join('');

  const confBadge = report.conformiteGlobale
    ? '<span style="font-size:10px;font-weight:700;background:#f0fdf4;color:#16a34a;padding:4px 12px;border-radius:20px;border:1px solid #86efac">✓ Objectifs mensuels atteints</span>'
    : '<span style="font-size:10px;font-weight:700;background:#fef2f2;color:#dc2626;padding:4px 12px;border-radius:20px;border:1px solid #fca5a5">⚠ Écarts objectifs détectés</span>';

  return `<div data-page="nc-rapport" class="nc-rapport-page">
    <div class="card nc-rapport-toolbar no-print">
      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between">
        <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
          <label class="fl" style="margin:0">Période</label>
          <select class="sel" data-nc-qrqc-month>${monthOpts}</select>
          <select class="sel" data-nc-qrqc-year>${yearOpts}</select>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          <button type="button" class="btn bsm" data-nav="nc-kpi">📊 KPI</button>
          <button type="button" class="btn bsm" data-nav="nc-liste">≡ Liste NC</button>
          <button type="button" class="btn bsm" data-nav="nc-actions">↺ Actions</button>
          <button type="button" class="btn bsm bp" data-nc-qrqc-download>⬇ Télécharger</button>
          <button type="button" class="btn bsm bp" data-nc-qrqc-print>🖨 PDF / Imprimer</button>
        </div>
      </div>
    </div>

    <div class="card nc-rapport-header">
      <div>
        <div class="nc-rapport-title">⚡ Rapport QRQC mensuel — ${esc(report.periodLabel)}</div>
        <div class="nc-rapport-sub">Maîtrise des non-conformités · ISO 9001 / 14001 / 45001 · Généré le ${esc(report.generatedAt)}</div>
        <div style="margin-top:8px">${confBadge}</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-bottom:14px">
      ${kpiCards}
    </div>

    ${d.alert?.show ? `<div class="rc-kpi-alert no-print" style="margin-bottom:12px">
      <span>⚠️</span><div><strong>${esc(d.alert.label)}</strong> — ${esc(d.alert.detail)}</div>
    </div>` : ''}

    <div class="card" style="margin-bottom:12px">
      <div class="ch"><span class="ct">Objectifs qualité — ${esc(report.periodLabel)}</span></div>
      <table class="tbl"><thead><tr><th>Indicateur</th><th>Objectif</th><th>Résultat</th><th>Conformité</th></tr></thead>
      <tbody>${objRows}</tbody></table>
    </div>

    <div class="card" style="margin-bottom:12px">
      <div class="ch"><span class="ct">Non-conformités (${report.ncs.length})</span></div>
      <table class="tbl"><thead><tr><th>N°</th><th>Date</th><th>Département</th><th>Gravité</th><th>Statut</th><th>Resp.</th><th>Description</th></tr></thead>
      <tbody>${ncRows}</tbody></table>
    </div>

    <div class="card" style="margin-bottom:12px">
      <div class="ch"><span class="ct">Actions correctives à réaliser (${report.actionsOpen.length})</span></div>
      <table class="tbl"><thead><tr><th>Action</th><th>Type</th><th>NC</th><th>Responsable</th><th>Statut</th><th>Échéance</th></tr></thead>
      <tbody>${actOpenRows}</tbody></table>
    </div>

    <div class="g2" style="gap:12px;margin-bottom:12px">
      <div class="card" style="padding:14px">
        <div class="ch"><span class="ct">Répartition par département</span></div>
        ${
          d.parDepartement.length
            ? d.parDepartement
                .map(
                  (row) => `<div class="nc-kpi-hbar">
            <span class="nc-kpi-hbar-lbl">${esc(row.dep)}</span>
            <div class="nc-kpi-hbar-track"><div class="nc-kpi-hbar-fill" style="width:${row.taux}%">${row.taux}%</div></div>
          </div>`
                )
                .join('')
            : '<p class="kpi-muted">Aucune donnée</p>'
        }
      </div>
      <div class="card" style="padding:14px">
        <div class="ch"><span class="ct">Synthèse QRQC</span></div>
        <div style="font-size:11px;line-height:1.8">
          <div><strong>Délai moyen :</strong> ${d.delaiMoyen.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} j</div>
          <div><strong>Récurrence :</strong> ${d.repetitives.taux}% (${d.repetitives.count} NC)</div>
          <div><strong>Efficacité actions :</strong> ${d.efficacite}%</div>
          <div><strong>Détection interne :</strong> ${d.pctInterne}%</div>
          ${d.topCause ? `<div style="margin-top:8px;padding:8px;background:#eff6ff;border-radius:6px"><strong>Priorité :</strong> ${esc(d.topCause.label)} (${d.topCause.pct}%)</div>` : ''}
        </div>
      </div>
    </div>

    <p class="nc-rapport-foot">Rapport QRQC XPERT MECA — Dashboard, NC, actions correctives et KPI · Enregistrement maîtrise documentée ISO.</p>
  </div>`;
}

let bound = false;

export function bindNcQrqcRapport() {
  installNcQrqcReportGlobals();
  if (bound) return;
  bound = true;

  document.addEventListener('change', (e) => {
    if (e.target.matches('[data-nc-qrqc-month]')) {
      window.ncQrqcMonth = parseInt(e.target.value, 10);
      window.reloadPage?.('nc-rapport');
    }
    if (e.target.matches('[data-nc-qrqc-year]')) {
      window.ncQrqcYear = parseInt(e.target.value, 10);
      window.reloadPage?.('nc-rapport');
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-nc-qrqc-download]')) {
      const year = window.ncQrqcYear ?? new Date().getFullYear();
      const month = window.ncQrqcMonth ?? new Date().getMonth() + 1;
      downloadQrqcReport(year, month);
      window.xmToast?.('Rapport téléchargé', `QRQC-${year}-${String(month).padStart(2, '0')}.html`, 'download', '#0284c7');
      return;
    }
    if (e.target.closest('[data-nc-qrqc-print]')) {
      const year = window.ncQrqcYear ?? new Date().getFullYear();
      const month = window.ncQrqcMonth ?? new Date().getMonth() + 1;
      if (!printQrqcReport(year, month)) {
        window.xmToast?.('Autorisez les popups', 'Pour imprimer ou exporter en PDF', 'alert', '#dc2626');
      }
    }
  });
}

/** Expose global pour appels depuis KPI */
export function installNcQrqcReportGlobals() {
  window.ncDownloadQrqcReport = downloadQrqcReport;
  window.ncPrintQrqcReport = printQrqcReport;
}
