/**
 * Tableau de bord Audit — vue d'ensemble SMQ.
 */
import { seedAudits } from '../../data/audits.data.js';
import { esc, getAudits, statBadge, typeColor, scoreColor } from '../../components/audit/audit-utils.js';
import { renderKpiCardCenter } from '../../components/icons/ui-helpers.js';

export function renderAuditTb() {
  seedAudits();
  const D = getAudits();
  const clos = D.filter((a) => a.statut === 'Clôturé').length;
  const enc = D.filter((a) => a.statut === 'En cours').length;
  const plan = D.filter((a) => a.statut === 'Planifié').length;
  const tx = D.length ? Math.round((clos / D.length) * 100) : 0;
  const ecarts = D.reduce((s, a) => s + (a.ecarts || 0), 0);
  const scored = D.filter((a) => a.score != null);
  const avg = scored.length ? Math.round(scored.reduce((s, a) => s + a.score, 0) / scored.length) : '—';

  const recent = [...D]
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .slice(0, 6)
    .map(
      (a) => `<tr data-nav="audit-liste" style="cursor:pointer" title="Ouvrir Audits & Planning">
      <td><span style="font-weight:800;color:${typeColor(a.type)}">${esc(a.ref)}</span></td>
      <td>${esc(a.type)}</td>
      <td>${esc(a.dep)}</td>
      <td style="font-size:var(--fs-sm)">${esc(a.date)}</td>
      <td><span class="badge ${statBadge(a.statut)}">${esc(a.statut)}</span></td>
      <td style="font-weight:700;color:${scoreColor(a.score)}">${a.score != null ? a.score + '%' : '—'}</td>
      <td style="font-weight:600">${a.ecarts ?? 0}</td>
    </tr>`
    )
    .join('');

  const links = [
    ['audit-liste', 'Audits & Planning', 'list', '#3B6D11'],
    ['audit-checklist', 'Checklist', 'check-circle', '#3B6D11'],
    ['audit-constats', 'Constats', 'alert', '#DC2626'],
    ['doc-liste', 'Documentation', 'folder', '#A32D2D'],
  ]
    .map(
      ([id, lb, ic, c]) =>
        `<button type="button" class="btn bsm" data-nav="${id}" style="border-color:${c}30;color:${c}">${lb}</button>`
    )
    .join('');

  return `<div data-page="audit-tb" class="xm-register xm-register--audit">
    <div class="audit-kpi-row" style="grid-template-columns:repeat(5,1fr);margin-bottom:14px">
      ${renderKpiCardCenter('Audits', D.length, 'var(--blue)', 'list', 'audit-liste')}
      ${renderKpiCardCenter('Clôturés', clos, 'var(--green)', 'check-circle', 'audit-liste')}
      ${renderKpiCardCenter('En cours', enc, 'var(--orange)', 'refresh', 'audit-liste')}
      ${renderKpiCardCenter('Taux clôture', tx + '%', tx >= 80 ? 'var(--green)' : 'var(--orange)', 'chart-pie', 'audit-liste')}
      ${renderKpiCardCenter('Écarts', ecarts, 'var(--red)', 'alert', 'audit-liste')}
    </div>
    <div class="card" style="margin-bottom:12px">
      <div class="ch"><span class="ct">Accès rapide</span></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">${links}</div>
    </div>
    <div class="g23">
      <div class="card">
        <div class="ch"><span class="ct">Audits récents</span><button type="button" class="btn bsm bp" data-nav="audit-liste">Tout voir →</button></div>
        <table class="tbl"><thead><tr><th>Réf.</th><th>Type</th><th>Dép.</th><th>Date</th><th>Statut</th><th>Score</th><th>Écarts</th></tr></thead>
        <tbody>${recent}</tbody></table>
      </div>
      <div class="card">
        <div class="ch"><span class="ct">Synthèse</span></div>
        <div class="drow"><span class="dk">Planifiés</span><span style="font-weight:700">${plan}</span></div>
        <div class="drow"><span class="dk">Score moyen (réalisés)</span><span style="font-weight:800;color:var(--blue)">${avg}${avg !== '—' ? '%' : ''}</span></div>
        <div class="drow"><span class="dk">Objectif clôture</span><span style="font-weight:700;color:${tx >= 80 ? 'var(--green)' : 'var(--red)'}">80% (${tx}%)</span></div>
        <button type="button" class="btn bp" style="width:100%;margin-top:14px" data-nav="audit-liste">Ouvrir Audits & Planning</button>
        <button type="button" class="btn bsm" style="width:100%;margin-top:8px" data-nav="audit-cloture">Clôture annuelle →</button>
      </div>
    </div>
  </div>`;
}
