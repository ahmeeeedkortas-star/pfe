/**
 * Historique global — traçabilité module Contexte & Stratégie.
 */
import { seedCst, getCstDocs } from '../../data/cst.data.js';
import { esc } from '../../components/cst/cst-utils.js';
import { getArchivedCstDocs } from './cst-document-iso.js';

const MODULE_LABELS = {
  'cst-swot': 'Contexte & SWOT',
  'cst-pestel': 'PESTEL',
  'cst-parties': 'Parties intéressées',
  'cst-risques': 'Risques',
  'cst-objectifs': 'Objectifs',
  'cst-changements': 'Changements',
  'cst-revue': 'Revue de direction',
  'cst-politique': 'Politique QHSE',
  'cst-actions': 'Plan d\'actions',
  'cst-docs': 'Documentation SMI',
};

export function renderCstHistory() {
  seedCst();
  const audit = window.CST_AUDIT_TRAIL || [];
  const docs = getCstDocs();
  const archived = getArchivedCstDocs();

  const docHistory = [];
  docs.forEach((d) => {
    (d.history || []).forEach((h) => docHistory.push({ doc: d, h }));
    (d.auditTrail || []).forEach((a) => docHistory.push({ doc: d, a, kind: 'audit' }));
  });
  docHistory.sort((a, b) => {
    const da = a.h?.date || a.a?.date || '';
    const db = b.h?.date || b.a?.date || '';
    return db.localeCompare(da);
  });

  const auditRows = audit
    .map(
      (e) => `<tr>
    <td style="font-size:10px;color:#64748b;white-space:nowrap">${esc(e.date)} ${esc(e.time || '')}</td>
    <td style="font-size:10px"><span style="background:#eff6ff;color:#2563eb;padding:2px 8px;border-radius:12px;font-weight:700">${esc(MODULE_LABELS[e.module] || e.module)}</span></td>
    <td style="font-size:10px">${esc(e.entity)}</td>
    <td style="font-size:10px;font-weight:600">${esc(e.action)}</td>
    <td style="font-size:10px">${esc(e.user)}</td>
    <td style="font-size:10px;color:#64748b;max-width:240px">${esc(e.details || '—')}</td>
  </tr>`
    )
    .join('');

  const revRows = (docs || [])
    .flatMap((d) =>
      (d.history || []).map(
        (h) => `<tr>
      <td><div style="font-weight:700;font-size:11px">${esc(d.nom)}</div><div style="font-size:9px;color:#94a3b8">${esc(d.code)}</div></td>
      <td><span style="background:#eff6ff;color:#2563eb;padding:2px 8px;border-radius:5px;font-size:10px;font-weight:700">${esc(h.v)}</span></td>
      <td style="font-size:10px;color:#64748b">${esc(h.date)}</td>
      <td style="font-size:10px">${esc(h.auteur)}</td>
      <td style="font-size:10px">${esc(h.motif)}</td>
      <td><button type="button" class="btn bsm" onclick="window.cst_doc_sel='${d.id}';goPage('cst-doc-read')">👁</button></td>
    </tr>`
      )
    )
    .join('');

  const archiveRows = archived
    .map(
      (d) => `<tr style="opacity:0.9">
    <td><div style="font-weight:700;font-size:11px">${esc(d.nom)}</div><div style="font-size:9px;color:#94a3b8">${esc(d.code)}</div></td>
    <td style="font-size:10px">${esc(d.version)}</td>
    <td><span style="background:#fef2f2;color:#dc2626;padding:2px 8px;border-radius:12px;font-size:9px;font-weight:700">${esc(d.statut)}</span></td>
    <td style="font-size:10px;color:#64748b">${esc(d.dateArchivage || d.dateMaj)}</td>
    <td style="font-size:10px">${esc(d.auteur || '—')}</td>
    <td><button type="button" class="btn bsm" onclick="window.cst_doc_sel='${d.id}';goPage('cst-doc-read')">👁 Consulter</button></td>
  </tr>`
    )
    .join('');

  return `<div data-page="cst-history" class="xm-register xm-register--cst">
    <div class="card" style="margin-bottom:14px;padding:14px 16px;background:linear-gradient(135deg,#fffbeb,#fef3c7);border:1px solid #fde68a">
      <div style="font-size:12px;font-weight:700;color:#92400e;margin-bottom:4px">Suivi des modifications — Conformité ISO 7.5</div>
      <div style="font-size:11px;color:#78350f">Visibilité totale sur les mises à jour : date, utilisateur, historique des versions et détails des changements.</div>
    </div>
    <div class="card" style="margin-bottom:14px">
      <div class="ch"><span class="ct">Journal d'audit du module CST</span><button type="button" class="btn bsm" onclick="goPage('cst-docs')">📁 Documentation SMI</button></div>
      <table class="tbl"><thead><tr><th>Date</th><th>Module</th><th>Entité</th><th>Action</th><th>Utilisateur</th><th>Détails</th></tr></thead>
      <tbody>${auditRows || '<tr><td colspan="6" style="text-align:center;color:var(--muted)">Aucune modification enregistrée</td></tr>'}</tbody></table>
    </div>
    <div class="g2" style="gap:14px">
      <div class="card">
        <div class="ch"><span class="ct">Historique des versions documentaires</span></div>
        <table class="tbl"><thead><tr><th>Document</th><th>Version</th><th>Date</th><th>Auteur</th><th>Motif</th><th></th></tr></thead>
        <tbody>${revRows || '<tr><td colspan="6" style="color:var(--muted)">—</td></tr>'}</tbody></table>
      </div>
      <div class="card">
        <div class="ch"><span class="ct">Documents archivés / obsolètes</span></div>
        <table class="tbl"><thead><tr><th>Document</th><th>Version</th><th>Statut</th><th>Date</th><th>Auteur</th><th></th></tr></thead>
        <tbody>${archiveRows || '<tr><td colspan="6" style="text-align:center;color:var(--muted)">Aucun document archivé</td></tr>'}</tbody></table>
      </div>
    </div>
  </div>`;
}
