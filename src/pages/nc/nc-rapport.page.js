/**
 * Rapport projet — NC, actions, rebuts, perte de temps, taux de non-qualité.
 */
import { badgeGravity, badgeStatus } from '../../components/ui/Badge.js';
import { renderKpiStatCard } from '../../components/icons/ui-helpers.js';
import { renderIcon } from '../../components/icons/icon-render.js';
import { badgeClassForType } from '../../components/qhse/action-types.js';
import {
  computeNcProjectReport,
  listProjects,
} from '../../data/nc-project-report.data.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function fmtNum(n, dec = 1) {
  return Number(n).toLocaleString('fr-FR', {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  });
}

export function renderNcRapport() {
  const projects = listProjects();
  if (!window.ncRapportProjet && projects[0]) window.ncRapportProjet = projects[0];
  const pid = projects.includes(window.ncRapportProjet) ? window.ncRapportProjet : projects[0];
  const r = computeNcProjectReport(pid);

  const opts = projects
    .map((p) => {
      const lib = computeNcProjectReport(p).meta.libelle;
      return `<option value="${esc(p)}"${p === pid ? ' selected' : ''}>${esc(p)}${lib && lib !== p ? ` — ${esc(lib)}` : ''}</option>`;
    })
    .join('');

  const ncTable =
    r.ncs.length === 0
      ? '<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:16px">Aucune NC sur ce projet.</td></tr>'
      : r.ncs
          .map(
            (nc) => `<tr>
        <td><span class="link" data-nav="nc-fiche">${esc(nc.n)}</span></td>
        <td style="font-size:10px;color:var(--muted)">${esc(nc.d)}</td>
        <td>${esc(nc.dep)}${nc.causeRacine ? ` · ${esc(nc.causeRacine)}` : ''}</td>
        <td>${badgeGravity(nc.g)}</td>
        <td>${badgeStatus(nc.s)}</td>
        <td style="text-align:right;font-weight:600">${nc.rebuts} p.</td>
        <td style="text-align:right;font-weight:600;color:var(--red)">${fmtNum(nc.heures)} h</td>
      </tr>`
          )
          .join('');

  const actionsAFaire = r.actions.filter((a) => a.statut !== 'Clôturée');
  const actAFaireTable =
    actionsAFaire.length === 0
      ? '<p class="kpi-muted" style="padding:12px">Aucune action en attente pour ce projet.</p>'
      : `<table class="tbl">
        <thead><tr><th>Action à faire</th><th>Type</th><th>NC</th><th>Responsable</th><th>Statut</th><th>Échéance</th></tr></thead>
        <tbody>${actionsAFaire
          .map(
            (a) => `<tr>
        <td style="font-weight:600">${esc(a.action)}</td>
        <td><span class="badge ${badgeClassForType(a.type)}">${esc(a.type)}</span></td>
        <td>${esc(a.ref)}</td>
        <td>${esc(a.resp)}</td>
        <td><span class="badge ${a.statut === 'En retard' ? 'br' : 'by'}">${esc(a.statut)}</span></td>
        <td>${esc(a.fin || '—')}</td>
      </tr>`
          )
          .join('')}</tbody></table>`;

  const causesMap = {};
  r.ncs.forEach((nc) => {
    const c = nc.causeRacine || 'Non renseignée';
    causesMap[c] = (causesMap[c] || 0) + 1;
  });
  const causesSorted = Object.entries(causesMap).sort((a, b) => b[1] - a[1]);
  const causesHtml =
    causesSorted.length === 0
      ? '<p class="kpi-muted" style="padding:12px">Renseignez la cause racine sur chaque NC (formulaire ou fiche).</p>'
      : causesSorted
          .map(([label, count]) => {
            const pct = Math.round((count / Math.max(r.ncs.length, 1)) * 100);
            return `<div class="nc-kpi-hbar" style="margin-bottom:8px">
        <span class="nc-kpi-hbar-lbl">${esc(label)}</span>
        <div class="nc-kpi-hbar-track">
          <div class="nc-kpi-hbar-fill" style="width:${pct}%;background:#7c3aed">${pct}% (${count})</div>
        </div>
      </div>`;
          })
          .join('');

  return `<div data-page="nc-rapport" class="nc-rapport-page">
    <div class="card nc-rapport-toolbar no-print">
      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center">
        <label class="fl" style="margin:0">Projet</label>
        <select class="sel" data-nc-rapport-projet style="min-width:240px">${opts}</select>
        <button type="button" class="btn bsm" data-nav="nc-liste">← Liste NC</button>
        <button type="button" class="btn bsm" data-nav="nc-kpi">KPI globaux</button>
        <button type="button" class="btn bsm bp" data-nc-rapport-print>${renderIcon('file', { size: 14 })} Imprimer / PDF</button>
      </div>
    </div>

    <div class="card nc-rapport-header">
      <div>
        <div class="nc-rapport-title">Rapport qualité — Projet ${esc(pid)}</div>
        <div class="nc-rapport-sub">${esc(r.meta.libelle)} · ${esc(r.meta.client)} · Généré le ${new Date().toLocaleDateString('fr-FR')}</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:9px;margin-bottom:12px">
      ${renderKpiStatCard('NC sur projet', r.totalNc, 'var(--blue)', 'alert')}
      ${renderKpiStatCard('NC ouvertes', r.ncOuvertes, 'var(--orange)', 'unlock')}
      ${renderKpiStatCard('Actions à faire', actionsAFaire.length, '#1e40af', 'list')}
      ${renderKpiStatCard('Actions clôturées', `${r.actionsCloturees}/${r.actionsTotal}`, 'var(--green)', 'check-circle')}
    </div>

    <div class="g2" style="gap:12px;margin-bottom:12px">
      <div class="card" style="padding:14px">
        <div class="ch"><span class="ct">Actions à réaliser</span> <span class="badge br">${actionsAFaire.length}</span></div>
        ${actAFaireTable}
        <p style="margin-top:10px"><button type="button" class="btn bsm bp" data-nav="nc-actions">Gérer toutes les actions →</button></p>
      </div>
      <div class="card" style="padding:14px">
        <div class="ch"><span class="ct">Causes racines — projet ${esc(pid)}</span></div>
        ${causesHtml}
      </div>
    </div>

    <div class="card" style="margin-bottom:12px">
      <div class="ch"><span class="ct">Non-conformités du projet</span></div>
      <table class="tbl">
        <thead><tr><th>N°</th><th>Date</th><th>Département / Cause</th><th>Gravité</th><th>Statut</th><th style="text-align:right">Rebuts</th><th style="text-align:right">Temps perdu</th></tr></thead>
        <tbody>${ncTable}</tbody>
      </table>
    </div>

    <p class="nc-rapport-foot">Rapport projet XPERT MECA — NC, actions à réaliser et causes racines (ISO 9001).</p>
  </div>`;
}

let bound = false;
export function bindNcRapport() {
  if (bound) return;
  bound = true;

  document.addEventListener('change', (e) => {
    const sel = e.target.closest('[data-nc-rapport-projet]');
    if (!sel) return;
    window.ncRapportProjet = sel.value;
    window.reloadPage?.('nc-rapport') ?? window.goPage?.('nc-rapport');
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-nc-rapport-print]')) {
      window.print();
      return;
    }
  });

  window.addEventListener('nc-project-meta-updated', () => {
    if (window.STATE?.page === 'nc-rapport') window.reloadPage?.('nc-rapport');
  });
}
