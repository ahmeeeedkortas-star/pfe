/**
 * Audits 5S — interface unifiée Planning + Audits + calendrier.
 */
import {
  esc,
  parseFrDate,
  scoreColor,
  statutBadge,
  getAuditors,
  filterAudits,
} from './fives-utils.js';

const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

function kpiCards(audits) {
  const avg = Math.round(
    audits.filter((a) => a.score).reduce((s, a) => s + a.score, 0) /
      Math.max(audits.filter((a) => a.score).length, 1)
  );
  const items = [
    ['Total audits', audits.length, '#ea580c', '#fff7ed'],
    ['Réalisés', audits.filter((a) => a.statut === 'Réalisé').length, '#16a34a', '#f0fdf4'],
    ['Planifiés', audits.filter((a) => a.statut === 'Planifié').length, '#2563eb', '#eff6ff'],
    ['En retard', audits.filter((a) => a.statut === 'En retard').length, '#dc2626', '#fef2f2'],
    ['Score moyen', `${avg}%`, '#7c3aed', '#f5f3ff'],
  ];
  return items
    .map(
      ([label, val, col, bg]) =>
        `<div class="ss5-kpi" style="--ss5-kpi:${col};--ss5-kpi-bg:${bg}">
          <span class="ss5-kpi__lbl">${label}</span>
          <span class="ss5-kpi__val">${val}</span>
        </div>`
    )
    .join('');
}

function renderTableRows(filtered) {
  return filtered
    .map((a) => {
      const id = esc(a.id);
      const aid = JSON.stringify(a.id);
      const zoneResp = (window.SS5_ZONES || []).find((z) => z.zone === a.zone)?.resp || '—';
      let actions = '';
      if (a.statut === 'Planifié' || a.statut === 'En retard') {
        actions += `<button type="button" class="ss5-btn ss5-btn--primary ss5-btn--sm" data-ss5-audit-start="${id}">▶ Démarrer</button>`;
      }
      if (a.statut === 'Réalisé') {
        actions += `<button type="button" class="ss5-btn ss5-btn--sm" data-ss5-audit-report="${id}">Rapport</button>`;
      } else {
        actions += `<button type="button" class="ss5-btn ss5-btn--sm" data-ss5-audit-eval="${id}">Évaluer</button>`;
      }
      actions += `<button type="button" class="ss5-btn ss5-btn--sm" data-ss5-audit-edit="${id}">Modifier</button>`;
      if (a.statut !== 'Réalisé') {
        actions += `<button type="button" class="ss5-btn ss5-btn--sm ss5-btn--danger" data-ss5-audit-validate="${id}">Valider</button>`;
      }
      actions += `<button type="button" class="ss5-btn ss5-btn--sm ss5-btn--ghost" data-ss5-audit-delete="${id}">Supprimer</button>`;
      actions += `<button type="button" class="ss5-btn ss5-btn--sm ss5-btn--ghost" data-ss5-audit-detail="${id}">Détails</button>`;

      return `<tr data-audit-id="${id}">
        <td><code class="ss5-code">${id}</code></td>
        <td>${esc(a.date)}</td>
        <td><strong>${esc(a.zone)}</strong></td>
        <td>${esc(a.auditeur)}</td>
        <td>${esc(zoneResp)}</td>
        <td style="color:${scoreColor(a.score)};font-weight:700">${a.score != null ? `${a.score}%` : '—'}</td>
        <td>${statutBadge(a.statut)}</td>
        <td><div class="ss5-row-actions">${actions}</div></td>
      </tr>`;
    })
    .join('');
}

function renderCalendar(filtered) {
  const now = new Date();
  const year = window.ss5AudCalYear ?? now.getFullYear();
  const month = window.ss5AudCalMonth ?? now.getMonth();
  const first = new Date(year, month, 1);
  const startDay = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const byDay = {};
  filtered.forEach((a) => {
    const d = parseFrDate(a.date);
    if (!d || d.getMonth() !== month || d.getFullYear() !== year) return;
    const key = d.getDate();
    if (!byDay[key]) byDay[key] = [];
    byDay[key].push(a);
  });

  const headers = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
    .map((d) => `<div class="ss5-cal__head">${d}</div>`)
    .join('');

  let cells = '';
  for (let i = 0; i < startDay; i++) cells += '<div class="ss5-cal__cell ss5-cal__cell--empty"></div>';
  for (let day = 1; day <= daysInMonth; day++) {
    const items = byDay[day] || [];
    const isToday =
      day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
    const events = items
      .map((a) => {
        const st = a.statut === 'Réalisé' ? 'ok' : a.statut === 'En retard' ? 'late' : 'plan';
        return `<button type="button" class="ss5-cal__event ss5-cal__event--${st}" data-ss5-audit-detail="${esc(a.id)}" title="${esc(a.zone)} — ${esc(a.auditeur)}">${esc(a.zone)}</button>`;
      })
      .join('');
    cells += `<div class="ss5-cal__cell${isToday ? ' is-today' : ''}">
      <span class="ss5-cal__day">${day}</span>
      <div class="ss5-cal__events">${events}</div>
    </div>`;
  }

  return `<div class="ss5-cal">
    <div class="ss5-cal__nav">
      <button type="button" class="ss5-btn ss5-btn--sm" data-ss5-cal-prev>‹</button>
      <strong>${MONTHS[month]} ${year}</strong>
      <button type="button" class="ss5-btn ss5-btn--sm" data-ss5-cal-next>›</button>
      <button type="button" class="ss5-btn ss5-btn--sm ss5-btn--ghost" data-ss5-cal-today>Aujourd'hui</button>
    </div>
    <div class="ss5-cal__grid">${headers}${cells}</div>
  </div>`;
}

function renderAuditeursPanel() {
  const auditors = getAuditors();
  const rows = auditors
    .map((name) => {
      const count = (window.SS5_AUDITS || []).filter((a) => a.auditeur === name).length;
      const planned = (window.SS5_AUDITS || []).filter(
        (a) => a.auditeur === name && a.statut === 'Planifié'
      ).length;
      return `<tr>
        <td><strong>${esc(name)}</strong></td>
        <td>${count}</td>
        <td>${planned}</td>
        <td><button type="button" class="ss5-btn ss5-btn--sm" data-ss5-filter-auditor="${esc(name)}">Voir audits</button></td>
      </tr>`;
    })
    .join('');

  return `<div class="card ss5-panel">
    <div class="ss5-panel__head">
      <h3>Auditeurs</h3>
      <button type="button" class="ss5-btn ss5-btn--primary ss5-btn--sm" data-ss5-new-resp>+ Ajouter auditeur</button>
    </div>
    <table class="tbl ss5-tbl">
      <thead><tr><th>Nom</th><th>Total audits</th><th>Planifiés</th><th></th></tr></thead>
      <tbody>${rows || '<tr><td colspan="4">Aucun auditeur</td></tr>'}</tbody>
    </table>
  </div>`;
}

function renderZonesPanel() {
  const zones = window.SS5_ZONES || [];
  const rows = zones
    .map((z) => {
      const audits = (window.SS5_AUDITS || []).filter((a) => a.zone === z.zone).length;
      return `<tr>
        <td><strong>${esc(z.zone)}</strong></td>
        <td>${esc(z.dep)}</td>
        <td>${esc(z.resp)}</td>
        <td>${z.score}%</td>
        <td>${audits}</td>
        <td>
          <button type="button" class="ss5-btn ss5-btn--sm" data-ss5-zone-edit="${esc(z.id)}">Modifier</button>
          <button type="button" class="ss5-btn ss5-btn--sm" data-ss5-filter-zone="${esc(z.zone)}">Audits</button>
        </td>
      </tr>`;
    })
    .join('');

  return `<div class="card ss5-panel">
    <div class="ss5-panel__head">
      <h3>Zones auditées</h3>
      <button type="button" class="ss5-btn ss5-btn--primary ss5-btn--sm" data-ss5-new-zone>+ Nouvelle zone</button>
    </div>
    <table class="tbl ss5-tbl">
      <thead><tr><th>Zone</th><th>Dép.</th><th>Responsable</th><th>Score</th><th>Audits</th><th></th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`;
}

export function renderFivesAuditsPage() {
  const AUD = window.SS5_AUDITS || [];
  const view = window.ss5AudView || 'liste';
  const tab = window.ss5AudTab || 'tous';
  const filtered = filterAudits(AUD);
  const zones = [...new Set(AUD.map((a) => a.zone))].sort();
  const auditors = getAuditors();

  const zOpts = zones.map((z) => `<option value="${esc(z)}"${window.ss5AudFZ === z ? ' selected' : ''}>${esc(z)}</option>`).join('');
  const aOpts = auditors.map((a) => `<option value="${esc(a)}"${window.ss5AudFA === a ? ' selected' : ''}>${esc(a)}</option>`).join('');
  const sOpts = ['Planifié', 'Réalisé', 'En retard']
    .map((s) => `<option value="${s}"${window.ss5AudFS === s ? ' selected' : ''}>${s}</option>`)
    .join('');

  const tabs = [
    ['tous', 'Tous'],
    ['planifies', 'Planifiés'],
    ['realises', 'Réalisés'],
    ['retard', 'En retard'],
  ]
    .map(
      ([id, lb]) =>
        `<button type="button" class="ss5-tab${tab === id ? ' is-active' : ''}" data-ss5-aud-tab="${id}">${lb}</button>`
    )
    .join('');

  const views = [
    ['liste', 'Liste'],
    ['calendrier', 'Calendrier'],
    ['auditeurs', 'Auditeurs'],
    ['zones', 'Zones'],
  ]
    .map(
      ([id, lb]) =>
        `<button type="button" class="ss5-view-tab${view === id ? ' is-active' : ''}" data-ss5-aud-view="${id}">${lb}</button>`
    )
    .join('');

  let body = '';
  if (view === 'calendrier') body = renderCalendar(filtered);
  else if (view === 'auditeurs') body = renderAuditeursPanel();
  else if (view === 'zones') body = renderZonesPanel();
  else {
    body = `<div class="card ss5-panel">
      <table class="tbl ss5-tbl">
        <thead><tr><th>ID</th><th>Date</th><th>Zone</th><th>Auditeur</th><th>Resp. zone</th><th>Score</th><th>Statut</th><th>Actions</th></tr></thead>
        <tbody>${renderTableRows(filtered) || '<tr><td colspan="8" style="text-align:center;padding:24px;color:#94a3b8">Aucun audit</td></tr>'}</tbody>
      </table>
    </div>`;
  }

  return `<div class="fives-page content" id="ss5-audits-root">
    <header class="ss5-page-hero">
      <div>
        <h2 class="ss5-page-hero__title">Audits & Planning 5S</h2>
        <p class="ss5-page-hero__sub">Planification · suivi · calendrier · auditeurs · zones</p>
      </div>
      <div class="ss5-page-hero__actions">
        <button type="button" class="ss5-btn ss5-btn--primary" data-ss5-new-audit>+ Planifier un audit</button>
        <button type="button" class="ss5-btn" data-ss5-export-excel>Exporter</button>
        <button type="button" class="ss5-btn" data-ss5-export-print>Imprimer</button>
      </div>
    </header>

    <div class="ss5-kpi-row">${kpiCards(AUD)}</div>

    <div class="ss5-toolbar">
      <div class="ss5-tabs">${tabs}</div>
      <div class="ss5-view-tabs">${views}</div>
    </div>

    <div class="ss5-filter-bar">
      <div class="ss5-filter-search">
        <input type="search" class="fi" placeholder="Rechercher zone, auditeur, ID…" value="${esc(window.ss5AudFQ || '')}" data-ss5-aud-search>
      </div>
      <select class="fi ss5-filter-sel" data-ss5-aud-filter="zone">
        <option value="Tous">Toutes zones</option>${zOpts}
      </select>
      <select class="fi ss5-filter-sel" data-ss5-aud-filter="statut">
        <option value="Tous">Tous statuts</option>${sOpts}
      </select>
      <select class="fi ss5-filter-sel" data-ss5-aud-filter="auditeur">
        <option value="Tous">Tous auditeurs</option>${aOpts}
      </select>
      <button type="button" class="ss5-btn ss5-btn--ghost ss5-btn--sm" data-ss5-aud-reset>Reset</button>
      <span class="ss5-filter-count">${filtered.length} résultat${filtered.length > 1 ? 's' : ''}</span>
    </div>

    ${body}
  </div>`;
}
