/**
 * Composants UI partagés — module EPI.
 */
import { renderIcon, renderIconTile } from '../icons/icon-render.js';
import {
  EPI_REQUIS,
  computeEpiStats,
  epiLabel,
  labelRenouvellement,
  prochainRenouvellement,
  statutEmployeEpi,
} from '../../data/sec-epi.data.js';
import { getEmployees } from '../../data/sec-epi.store.js';

export function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

export function initials(nom) {
  return String(nom)
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function epiRatio(emp) {
  const n = emp.epi?.length || 0;
  return `${n}/${EPI_REQUIS.length}`;
}

export function employeeAvatar(emp, size = 'md') {
  const cls = size === 'sm' ? 'sec-epi-avatar sec-epi-avatar--sm' : 'sec-epi-avatar';
  if (emp?.photo) {
    return `<img class="${cls} sec-epi-avatar--img" src="${esc(emp.photo)}" alt="" loading="lazy">`;
  }
  return `<div class="${cls}" aria-hidden="true">${esc(initials(emp?.nom || '?'))}</div>`;
}

export function renderEpiBreadcrumb(leafLabel, leafPage = null) {
  const leaf = leafPage
    ? `<button type="button" class="sec-epi-crumb-link" data-nav="${esc(leafPage)}">${esc(leafLabel)}</button>`
    : `<span class="sec-epi-crumb-current">${esc(leafLabel)}</span>`;
  return `<nav class="sec-epi-breadcrumb" aria-label="Fil d'Ariane">
    <button type="button" class="sec-epi-crumb-link" data-nav="sec-kpi">Sécurité</button>
    <span class="sec-epi-crumb-sep">${renderIcon('chevron-right', { size: 12 })}</span>
    <button type="button" class="sec-epi-crumb-link" data-nav="sec-epi">EPI</button>
    <span class="sec-epi-crumb-sep">${renderIcon('chevron-right', { size: 12 })}</span>
    ${leaf}
  </nav>`;
}

export function renderEpiKpiCard(label, value, subtitle, color, iconName, nav) {
  const bg = color.startsWith('var(') ? `color-mix(in srgb, ${color} 12%, white)` : `${color}18`;
  const click = nav ? ` data-nav="${nav}" role="button" tabindex="0"` : '';
  return `<div class="sec-epi-kpi-card"${click}>
    ${renderIconTile(iconName, { bg, color, size: 42 })}
    <div class="sec-epi-kpi-card__body">
      <div class="sec-epi-kpi-card__value" style="color:${color}">${esc(value)}</div>
      <div class="sec-epi-kpi-card__label">${esc(label)}</div>
      ${subtitle ? `<div class="sec-epi-kpi-card__sub">${esc(subtitle)}</div>` : ''}
    </div>
  </div>`;
}

export function renderEpiKpiRow(employees = getEmployees()) {
  const stats = computeEpiStats(employees);
  const pctComplet = stats.total ? Math.round((stats.complet / stats.total) * 100) : 0;
  const pctActifs = stats.total
    ? Math.round(((stats.total - stats.aucun) / stats.total) * 100)
    : 0;
  return `<div class="sec-epi-kpi-row">
    ${renderEpiKpiCard('Total employés', String(stats.total), `${pctActifs}% actifs`, 'var(--blue)', 'users', 'sec-epi')}
    ${renderEpiKpiCard('EPI complets', String(stats.complet), `${pctComplet}% conformes`, 'var(--green)', 'check-circle', 'sec-epi')}
    ${renderEpiKpiCard('EPI incomplets', String(stats.incomplet), 'attribution partielle', 'var(--orange)', 'alert', 'sec-epi-sans')}
    ${renderEpiKpiCard('Sans EPI', String(stats.aucun), 'action requise', 'var(--red)', 'x-circle', 'sec-epi-sans')}
    ${renderEpiKpiCard('À renouveler', String(stats.aRenouveler), 'sous 30 jours', '#1e40af', 'clock', 'sec-epi-renouv')}
  </div>`;
}

export function renderEmployeeTableRows(employees, selectedId) {
  return employees
    .map((emp) => {
      const st = statutEmployeEpi(emp);
      const pr = prochainRenouvellement(emp);
      const sel = emp.id === selectedId;
      return `<tr class="sec-epi-row${sel ? ' sec-epi-row-selected' : ''}" data-epi-select="${esc(emp.id)}">
        <td class="sec-epi-td-photo">${employeeAvatar(emp, 'sm')}</td>
        <td class="sec-epi-td-name">${esc(emp.nom)}</td>
        <td class="sec-epi-td-mat">${esc(emp.id)}</td>
        <td>${esc(emp.poste)}</td>
        <td>${esc(emp.dep)}</td>
        <td class="sec-epi-td-ratio"><strong>${epiRatio(emp)}</strong></td>
        <td><span class="sec-epi-badge sec-epi-badge--${st.tone}">${esc(st.label)}</span></td>
        <td class="sec-epi-td-renouv">${pr.date ? `${esc(pr.date)}<br><span class="sec-epi-muted">${esc(labelRenouvellement(pr.jours))}</span>` : '—'}</td>
        <td class="sec-epi-td-actions">
          <button type="button" class="btn bsm bp" data-epi-select="${esc(emp.id)}">Voir</button>
        </td>
      </tr>`;
    })
    .join('');
}

export function renderDetailPanel(emp) {
  if (!emp) {
    return `<div class="card sec-epi-detail sec-epi-detail--empty">
      <p>Sélectionnez un employé dans le tableau.</p>
    </div>`;
  }

  const histQs = encodeURIComponent(JSON.stringify({ empId: emp.id }));
  const rows = (emp.epi || [])
    .map((e) => {
      const stCls =
        e.statut === 'Conforme' ? 'sec-epi-pill--ok' : e.statut === 'À renouveler' ? 'sec-epi-pill--warn' : 'sec-epi-pill--ko';
      return `<tr>
        <td>${esc(epiLabel(e.id))}</td>
        <td class="sec-epi-muted">${esc(e.attribue)}</td>
        <td class="sec-epi-muted">${esc(e.renouvellement)}</td>
        <td><span class="sec-epi-pill ${stCls}">${esc(e.statut)}</span></td>
        <td class="sec-epi-td-actions">
          <button type="button" class="btn bsm" data-epi-renew="${esc(emp.id)}" data-epi-type="${esc(e.id)}" title="Renouveler">↻</button>
          <button type="button" class="btn bsm" data-epi-edit-item="${esc(emp.id)}" data-epi-type="${esc(e.id)}">✎</button>
          <button type="button" class="btn bsm br" data-epi-remove="${esc(emp.id)}" data-epi-type="${esc(e.id)}">✕</button>
        </td>
      </tr>`;
    })
    .join('');

  return `<div class="card sec-epi-detail" data-epi-detail>
    <div class="sec-epi-detail-head">
      ${employeeAvatar(emp)}
      <div class="sec-epi-detail-info">
        <div class="sec-epi-detail-name">${esc(emp.nom)}</div>
        <div class="sec-epi-detail-meta">${esc(emp.id)} · ${esc(emp.poste)}</div>
        <div class="sec-epi-detail-meta">${esc(emp.dep)} · Embauche ${esc(emp.embauche)}</div>
        <div class="sec-epi-detail-meta">${esc(emp.tel)} · ${esc(emp.email)}</div>
      </div>
    </div>
    <div class="sec-epi-detail-actions">
      <button type="button" class="btn bsm bp" data-epi-add-item="${esc(emp.id)}">+ Attribuer EPI</button>
      <button type="button" class="btn bsm" data-epi-edit-emp="${esc(emp.id)}">Modifier</button>
      <button type="button" class="btn bsm br" data-epi-del-emp="${esc(emp.id)}">Supprimer</button>
      <button type="button" class="btn bsm" data-epi-alert="${esc(emp.id)}">Alerte NC</button>
    </div>
    <div class="sec-epi-detail-table-wrap">
      <table class="tbl sec-epi-detail-tbl">
        <thead><tr><th>EPI</th><th>Attribué</th><th>Renouvellement</th><th>Statut</th><th></th></tr></thead>
        <tbody>${rows || '<tr><td colspan="5" class="sec-epi-empty-cell">Aucun EPI attribué</td></tr>'}</tbody>
      </table>
    </div>
    <button type="button" class="btn bsm bp sec-epi-hist-btn" data-epi-hist="${esc(emp.id)}">Voir historique complet →</button>
    <button type="button" class="btn bsm" data-nav="sec-cl-epi" style="margin-top:6px;width:100%">Checklist contrôle EPI →</button>
  </div>`;
}

export function renderNcHistoryRows(ncHist) {
  return ncHist
    .map(
      (n) => `<tr>
    <td><strong>${esc(n.n)}</strong></td>
    <td class="sec-epi-muted">${esc(n.d)}</td>
    <td>${esc(n.emp)}</td>
    <td>${esc(n.type)}</td>
    <td class="sec-epi-desc">${esc(n.desc)}</td>
    <td>${esc(n.par)}</td>
    <td>
      <select class="sel sec-epi-sel-sm" data-epi-nc-status="${esc(n.n)}">
        <option${n.s === 'Ouverte' ? ' selected' : ''}>Ouverte</option>
        <option${n.s === 'En cours' ? ' selected' : ''}>En cours</option>
        <option${n.s === 'Fermée' ? ' selected' : ''}>Fermée</option>
      </select>
    </td>
    <td><button type="button" class="btn bsm br" data-epi-nc-del="${esc(n.n)}">✕</button></td>
  </tr>`
    )
    .join('');
}

export function renderPageShell(pageId, breadcrumbLeaf, title, subtitle, body, actions = '') {
  return `<div data-page="${esc(pageId)}" data-epi-root class="sec-epi-page">
    ${renderEpiBreadcrumb(breadcrumbLeaf)}
    <div class="sec-epi-page-head">
      <div>
        <h1 class="sec-epi-page-title">${esc(title)}</h1>
        <p class="sec-epi-page-sub">${esc(subtitle)}</p>
      </div>
      ${actions ? `<div class="sec-epi-page-actions">${actions}</div>` : ''}
    </div>
    ${body}
  </div>`;
}
