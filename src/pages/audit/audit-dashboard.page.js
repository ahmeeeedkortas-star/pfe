/**
 * Tableau de bord Audit — vue légère (sans interface KPI dédiée).
 */
import { buildAuditKpiModel, computeAuditNotifications, daysUntil } from './audit-store.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;');
}

export function renderAuditDashboard() {
  const m = buildAuditKpiModel();
  const notifs = computeAuditNotifications();

  const stats = [
    ['Planifiés / total', `${m.total - m.done - m.late} / ${m.total}`, '#2563eb'],
    ['Terminés', String(m.done), '#16a34a'],
    ['En retard', String(m.late), '#dc2626'],
    ['NC ouvertes', String(m.ncOpen), '#b91c1c'],
  ]
    .map(
      ([lbl, val, c]) =>
        `<div class="audit-stat-pill"><div class="audit-stat-pill__val" style="color:${c}">${esc(val)}</div><div class="audit-stat-pill__lbl">${esc(lbl)}</div></div>`
    )
    .join('');

  const notifHtml = notifs.length
    ? notifs
        .slice(0, 6)
        .map(
          (n) =>
            `<div class="audit-notif audit-notif--${n.level}" role="button" tabindex="0" onclick="goPage('${n.page}')"><strong>${esc(n.titre)}</strong><span>${esc(n.detail)}</span></div>`
        )
        .join('')
    : '<p class="xm-empty-hint">Aucune alerte pour le moment.</p>';

  const upcoming = m.upcoming
    .slice(0, 5)
    .map((a) => {
      const d = daysUntil(a.dateDebut);
      const lbl = d === 0 ? "Aujourd'hui" : d === 1 ? 'Demain' : `J+${d}`;
      return `<div class="audit-upcoming-row"><span>${esc(a.ref)} · ${esc(a.processus)}</span><span class="badge ${d <= 3 ? 'br' : 'by'}">${lbl}</span></div>`;
    })
    .join('');

  return `<div class="content xm-v11-surface audit-dash-lite" data-page="audit-tb">
    <div class="filter-bar"><div class="filter-bar-body">
      <button type="button" class="btn bsm bp" onclick="auditNew()">+ Planifier un audit</button>
      <button type="button" class="btn bsm" onclick="goPage('audit-planning')">Planning</button>
      <button type="button" class="btn bsm" onclick="goPage('audit-constats')">Constats</button>
      <button type="button" class="btn bsm" onclick="auditRefreshNotifications()">Actualiser alertes</button>
    </div></div>

    <div class="audit-dash-stats">${stats}</div>

    <div class="audit-dash-split">
      <section class="card">
        <div class="ch"><span class="ct">Alertes</span>${notifs.length ? `<span class="badge br">${notifs.length}</span>` : ''}</div>
        <div class="audit-notif-list">${notifHtml}</div>
      </section>
      <section class="card">
        <div class="ch"><span class="ct">Prochains audits</span></div>
        ${upcoming || '<p class="xm-empty-hint">Aucun audit à venir sur 14 jours.</p>'}
      </section>
    </div>
  </div>`;
}
