/**
 * Consultation document CST — versions, workflow, traçabilité ISO.
 */
import { seedCst } from '../../data/cst.data.js';
import { esc } from '../../components/cst/cst-utils.js';
import { CST_STATUS_COLORS } from './cst-store.js';
import { CST_WORKFLOW_STEPS } from './cst-document-iso.js';
import { getCstDocById } from './cst-store.js';
import { renderImportedTypeBadge } from '../doc/doc-import-utils.js';

export function renderCstDocRead() {
  seedCst();

  let d = getCstDocById(window.cst_doc_sel);

  if (!d && window.__cstRevueDocContext) {
    const rev = (window.CST_REVUES || []).find((r) => r.id === window.__cstRevueDocContext);
    d = rev?.documents?.find((x) => String(x.id) === String(window.cst_doc_sel));
  }

  if (!d) {
    return '<div class="card"><div style="padding:40px;text-align:center">Document introuvable — <button type="button" class="btn bsm" onclick="goPage(\'cst-docs\')">Retour bibliothèque</button></div></div>';
  }

  const preview = window.__cstDocVersionPreview;
  const isPreview = !!preview;
  const isLocked = d.statut === 'Obsolète' || d.statut === 'Archivé';
  const sc = CST_STATUS_COLORS[d.statut] || '#94a3b8';
  const wfStep = d.wfStep || 1;
  const displayVersion = isPreview ? preview.version : d.version;
  const displayContent = isPreview ? preview.content : d.content;

  const wfBar = CST_WORKFLOW_STEPS.map((s, i) => {
    const active = i + 1 <= wfStep;
    const color = active ? '#2563eb' : '#e2e8f0';
    return `<div style="flex:1;text-align:center;padding:6px 4px;background:${active ? '#eff6ff' : '#f8fafc'};border-radius:6px;border:1px solid ${color}">
      <div style="font-size:14px">${s.icon}</div>
      <div style="font-size:8px;font-weight:700;color:${active ? '#2563eb' : '#94a3b8'}">${s.label}</div>
    </div>`;
  }).join('<div style="width:8px;flex-shrink:0"></div>');

  const versionRows = (d.history || [])
    .map(
      (h) => `<tr>
      <td><span class="badge" style="background:#eff6ff;color:#2563eb">${esc(h.v)}</span></td>
      <td style="font-size:10.5px;color:#64748b">${esc(h.date)}</td>
      <td style="font-size:10.5px">${esc(h.auteur)}</td>
      <td style="font-size:10.5px">${esc(h.motif)}</td>
    </tr>`
    )
    .join('');

  const snapshotRows = (d.versionSnapshots || [])
    .map(
      (snap, i) => `<tr>
      <td><span class="badge" style="background:#f1f5f9;color:#64748b">${esc(snap.version)}</span></td>
      <td style="font-size:10.5px;color:#64748b">${esc(snap.date)}</td>
      <td style="font-size:10.5px">${esc(snap.auteur)}</td>
      <td style="font-size:10.5px">${esc(snap.motif)}</td>
      <td>
        <button type="button" onclick="cstDocViewVersion('${d.id}',${i})" class="btn bsm">👁</button>
        <button type="button" onclick="cstDocDownload('${d.id}',${i})" class="btn bsm">⬇</button>
      </td>
    </tr>`
    )
    .join('');

  const auditRows = (d.auditTrail || [])
    .slice(0, 15)
    .map(
      (a) => `<tr>
      <td style="font-size:10px;color:#64748b">${esc(a.date)}</td>
      <td style="font-size:10px">${esc(a.action)}</td>
      <td style="font-size:10px">${esc(a.user)}</td>
      <td style="font-size:10px;color:#64748b">${esc(a.comment || '—')}</td>
    </tr>`
    )
    .join('');

  const importedView = window.renderCstImportedContentView?.(d) || '';

  const actions = isLocked
    ? `<button type="button" onclick="cstDocDownload('${d.id}')" class="btn bsm">⬇ Télécharger</button>`
    : `<button type="button" onclick="cstDocApprove('${d.id}')" class="btn bsm bp">✅ Approuver</button>
       <button type="button" onclick="cstDocBumpVersion('${d.id}','minor')" class="btn bsm">🔄 Révision mineure</button>
       <button type="button" onclick="cstDocBumpVersion('${d.id}','major')" class="btn bsm">📈 Révision majeure</button>
       <button type="button" data-cst-doc-edit="${d.id}" class="btn bsm">✏ Modifier</button>
       <button type="button" onclick="cstDocDownload('${d.id}')" class="btn bsm">⬇ Télécharger</button>
       <button type="button" onclick="cstDocArchive('${d.id}')" class="btn bsm">📦 Archiver</button>`;

  return `<div data-page="cst-doc-read" class="xm-register xm-register--cst">
    ${isPreview ? `<div class="card" style="margin-bottom:12px;padding:10px 14px;background:#fffbeb;border-color:#fde68a">
      <span style="font-size:11px;font-weight:700;color:#92400e">Aperçu version ${esc(preview.version)}</span>
      <button type="button" class="btn bsm" style="margin-left:10px" onclick="cstDocClearVersionPreview();reloadPage('cst-doc-read')">Revenir à la version courante</button>
    </div>` : ''}
    <div class="card" style="margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap">
        <div>
          <div style="font-size:18px;font-weight:800;color:#0f172a">${esc(d.nom)}${renderImportedTypeBadge(d.importedType)}</div>
          <div style="font-size:11px;color:#64748b;margin-top:4px">${esc(d.code)} · ${esc(d.type)} · ${esc(displayVersion)}${!isPreview && d.statut === 'Approuvé' && d.isCurrent !== false ? ' ✓ en vigueur' : ''}</div>
        </div>
        <span style="font-size:10px;font-weight:700;background:${sc}18;color:${sc};padding:4px 12px;border-radius:20px">${esc(d.statut)}</span>
      </div>
      <div style="display:flex;gap:6px;margin-top:14px;flex-wrap:wrap">${actions}</div>
      <button type="button" class="btn bsm" style="margin-top:10px" onclick="goPage('cst-docs')">← Bibliothèque SMI</button>
    </div>
    <div class="g2" style="gap:14px">
      <div class="card">
        <div class="ch"><span class="ct">Cycle de vie ISO</span></div>
        <div style="display:flex;gap:4px;flex-wrap:wrap">${wfBar}</div>
        <div style="margin-top:14px;font-size:11px;color:#64748b;line-height:1.8">
          <div><strong>Auteur :</strong> ${esc(d.auteur)}</div>
          <div><strong>Approbateur :</strong> ${esc(d.approbateur || '—')}</div>
          <div><strong>Créé le :</strong> ${esc(d.dateCreation || '—')}</div>
          <div><strong>Mis à jour :</strong> ${esc(d.dateMaj || d.date)}</div>
          <div><strong>Approuvé le :</strong> ${esc(d.dateApprobation || '—')}</div>
          ${d.dateArchivage ? `<div><strong>Archivé le :</strong> ${esc(d.dateArchivage)}</div>` : ''}
          ${d.desc ? `<div style="margin-top:8px"><strong>Description :</strong> ${esc(d.desc)}</div>` : ''}
        </div>
      </div>
      <div class="card">
        <div class="ch"><span class="ct">Contenu</span></div>
        ${importedView}
        ${displayContent ? `<div class="cst-rich-preview" style="font-size:13px;line-height:1.7">${displayContent}</div>` : !importedView ? '<p style="color:var(--muted);font-size:12px">Aucun contenu éditable — document importé ou métadonnées seules.</p>' : ''}
      </div>
    </div>
    <div class="g2" style="gap:14px;margin-top:14px">
      <div class="card">
        <div class="ch"><span class="ct">Historique des versions</span></div>
        <table class="tbl"><thead><tr><th>Version</th><th>Date</th><th>Auteur</th><th>Motif</th></tr></thead>
        <tbody>${versionRows || '<tr><td colspan="4" style="color:var(--muted)">—</td></tr>'}</tbody></table>
      </div>
      <div class="card">
        <div class="ch"><span class="ct">Snapshots archivés</span></div>
        <table class="tbl"><thead><tr><th>Version</th><th>Date</th><th>Auteur</th><th>Motif</th><th></th></tr></thead>
        <tbody>${snapshotRows || '<tr><td colspan="5" style="color:var(--muted)">—</td></tr>'}</tbody></table>
      </div>
    </div>
    <div class="card" style="margin-top:14px">
      <div class="ch"><span class="ct">Journal des modifications (traçabilité)</span></div>
      <table class="tbl"><thead><tr><th>Date</th><th>Action</th><th>Utilisateur</th><th>Détail</th></tr></thead>
      <tbody>${auditRows || '<tr><td colspan="4" style="color:var(--muted)">Aucune entrée</td></tr>'}</tbody></table>
    </div>
  </div>`;
}
