/**
 * Consultation document — ISO (versions, workflow, traçabilité).
 */
import { ISO_WORKFLOW_STEPS } from './doc-iso.js';
import { DOC_STATUS_COLORS } from './doc-store.js';
import { getDocById } from './doc-store.js';
import { renderImportedTypeBadge } from './doc-import-utils.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

const TYPE_COLORS = {
  'Manuel Qualité': '#1e40af',
  Procédure: '#16a34a',
  Processus: '#7c3aed',
  Instruction: '#c2410c',
  Formulaire: '#0891b2',
  Enregistrement: '#b45309',
  Politique: '#0369a1',
  'Document technique': '#374151',
};

export function renderDocReadPage() {
  const d = getDocById(window.doc_sel);
  if (!d) {
    return '<div class="card"><div style="padding:40px;text-align:center">Document introuvable</div></div>';
  }

  const preview = window.__docVersionPreview;
  const isPreview = !!preview;
  const isLocked = d.statut === 'Obsolète' || d.statut === 'Archivé';
  const col = TYPE_COLORS[d.type] || '#0284c7';
  const sc = DOC_STATUS_COLORS[d.statut] || '#94a3b8';
  const wfStep = d.wfStep || 1;
  const displayVersion = isPreview ? preview.version : d.version;
  const displayContent = isPreview ? preview.content : d.content;

  const wfBar = ISO_WORKFLOW_STEPS.map((s, i) => {
    const active = i + 1 <= wfStep;
    const color = active ? '#0284c7' : '#e2e8f0';
    return `<div style="flex:1;text-align:center;padding:6px 4px;background:${active ? '#f0f9ff' : '#f8fafc'};border-radius:6px;border:1px solid ${color}">
      <div style="font-size:14px">${s.icon}</div>
      <div style="font-size:8px;font-weight:700;color:${active ? '#0284c7' : '#94a3b8'}">${s.label}</div>
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
      <td><button type="button" onclick="docViewVersion('${d.id}',${i})" class="btn bsm">👁</button>
          <button type="button" onclick="docDownload('${d.id}',${i})" class="btn bsm">⬇</button></td>
    </tr>`
    )
    .join('');

  const auditRows = (d.auditTrail || [])
    .slice(0, 12)
    .map(
      (a) => `<tr>
      <td style="font-size:10px;color:#64748b">${esc(a.date)}</td>
      <td style="font-size:10px">${esc(a.action)}</td>
      <td style="font-size:10px">${esc(a.user)}</td>
      <td style="font-size:10px;color:#64748b">${esc(a.comment || '—')}</td>
    </tr>`
    )
    .join('');

  const metaRows = [
    ['Code', d.code || d.id],
    ['Type', d.type],
    ['Processus', d.processus],
    ['Service', d.service || d.zone],
    ['Version en vigueur', displayVersion + (isPreview ? ' (aperçu)' : d.isCurrent !== false && d.statut === 'Approuvé' ? ' ✓' : '')],
    ['Statut', d.statut],
    ['Auteur', d.auteur || d.resp],
    ['Approbateur', d.approbateur || d.validatedBy || '—'],
    ['Créé le', d.dateCreation || '—'],
    ['Révision', d.dateRevision || d.dateMaj],
    ['Mis à jour', d.dateMaj],
    ['Approuvé le', d.dateApprobation || '—'],
    ['Archivé le', d.dateArchivage || '—'],
  ]
    .map(
      ([l, v]) => `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f5f9;font-size:10.5px">
      <span style="color:#94a3b8">${l}</span>
      <span style="font-weight:600;color:#0f172a;text-align:right;max-width:140px">${esc(v)}</span>
    </div>`
    )
    .join('');

  const lockBanner = isLocked
    ? `<div style="background:#fef2f2;border:1px solid #fca5a5;border-radius:8px;padding:10px 14px;margin-bottom:12px;font-size:11px;color:#dc2626">
        ⚠ Document ${d.statut} — consultation seule. Non utilisable comme document actif.
      </div>`
    : '';

  const previewBanner = isPreview
    ? `<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:10px 14px;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:11px;color:#92400e">Aperçu version archivée ${preview.version}</span>
        <button type="button" onclick="window.__docVersionPreview=null;goPage('doc-read')" class="btn bsm">← Version actuelle</button>
      </div>`
    : '';

  const actionBtns = isLocked
    ? `<button type="button" onclick="docDownload('${d.id}')" class="btn bsm">⬇ Télécharger</button>`
    : `<button type="button" onclick="docOpenEdit('${d.id}')" class="btn bp bsm">✏ Modifier</button>
       <button type="button" onclick="docDownload('${d.id}')" class="btn bsm">⬇ Télécharger</button>
       <button type="button" onclick="docSubmitReview('${d.id}')" class="btn bsm" style="background:#eff6ff;color:#2563eb;border-color:#93c5fd">📤 Soumettre</button>
       <button type="button" onclick="docValidate('${d.id}')" class="btn bsm" style="background:#f0fdf4;color:#16a34a;border-color:#86efac">✅ Approuver</button>
       <button type="button" onclick="docArchive('${d.id}')" class="btn bsm" style="background:#fffbeb;color:#92400e;border-color:#fde68a">📦 Archiver</button>
       <button type="button" onclick="docDelete('${d.id}')" class="btn bsm" style="background:#fef2f2;color:#dc2626;border-color:#fca5a5">🗑 Supprimer</button>`;

  return `
  ${lockBanner}${previewBanner}
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap">
    <button type="button" onclick="goPage('doc-biblio')" class="btn bsm">← Retour</button>
    <div style="flex:1;min-width:200px">
      <div style="font-size:14px;font-weight:800;color:#0f172a">${esc(d.titre)}${renderImportedTypeBadge(d.importedType)}</div>
      <div style="font-size:10px;color:#94a3b8">${esc(d.code || d.id)} · ${esc(d.type)} · ${esc(displayVersion)}</div>
    </div>
    <span style="font-size:10px;font-weight:700;background:${sc}18;color:${sc};padding:4px 12px;border-radius:20px">${esc(d.statut)}</span>
    ${actionBtns}
  </div>

  <div class="card" style="margin-bottom:12px;padding:10px">
    <div style="display:flex;gap:6px;align-items:stretch;overflow-x:auto">${wfBar}</div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 280px;gap:14px">
    <div>
      <div class="card" style="margin-bottom:12px">
        <div style="background:${col};border-radius:8px;padding:12px 16px;margin:-15px -15px 14px;display:flex;align-items:center;justify-content:space-between">
          <div>
            <div style="font-size:11px;color:rgba(255,255,255,.7)">${esc(d.type)} · ${esc(d.processus)}</div>
            <div style="font-size:15px;font-weight:800;color:#fff">${esc(d.titre)}</div>
          </div>
          <div style="text-align:right">
            <span style="background:rgba(255,255,255,.2);color:#fff;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700">${esc(displayVersion)}</span>
            <div style="font-size:9px;color:rgba(255,255,255,.6);margin-top:4px">📅 ${esc(d.dateMaj)}</div>
          </div>
        </div>
        ${d.importedFile && !isPreview ? `
        <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:12px;margin-bottom:12px;display:flex;align-items:center;gap:10px">
          <span style="font-size:24px">📎</span>
          <div style="flex:1">
            <div style="font-size:11px;font-weight:700;color:#0f172a">${esc(d.importedFile)}</div>
            <div style="font-size:9.5px;color:#16a34a">Fichier importé · ${esc((d.importedType || '').toUpperCase())}</div>
          </div>
          <button type="button" onclick="docDownload('${d.id}')" class="btn bp bsm">⬇ Télécharger</button>
        </div>` : ''}
        <div id="doc-imported-slot-${d.id}"></div>
        <div style="font-size:12px;line-height:1.9;color:#374151;padding:4px" id="doc-content-${d.id}">
          ${displayContent || '<p style="color:#94a3b8;font-style:italic">Aucun contenu rédigé</p>'}
        </div>
      </div>

      <div class="card" style="margin-bottom:12px">
        <div class="ch"><span class="ct">🕐 Historique des révisions</span></div>
        <table class="tbl"><thead><tr><th>Version</th><th>Date</th><th>Auteur</th><th>Motif</th></tr></thead>
        <tbody>${versionRows || '<tr><td colspan="4" style="text-align:center;color:#94a3b8">Aucune révision</td></tr>'}</tbody></table>
      </div>

      ${snapshotRows ? `<div class="card" style="margin-bottom:12px">
        <div class="ch"><span class="ct">📦 Versions archivées (snapshots)</span></div>
        <table class="tbl"><thead><tr><th>Version</th><th>Date</th><th>Auteur</th><th>Motif</th><th></th></tr></thead>
        <tbody>${snapshotRows}</tbody></table>
      </div>` : ''}

      <div class="card">
        <div class="ch"><span class="ct">📋 Journal de traçabilité</span></div>
        <table class="tbl"><thead><tr><th>Date</th><th>Action</th><th>Utilisateur</th><th>Commentaire</th></tr></thead>
        <tbody>${auditRows || '<tr><td colspan="4" style="text-align:center;color:#94a3b8">Aucune entrée</td></tr>'}</tbody></table>
      </div>
    </div>

    <div>
      <div class="card" style="margin-bottom:12px">
        <div class="ct" style="margin-bottom:10px">ℹ Informations documentées</div>
        ${metaRows}
      </div>
      <div class="card">
        <div class="ct" style="margin-bottom:10px">⚡ Actions</div>
        <div style="display:flex;flex-direction:column;gap:6px">
          ${isLocked ? '' : `<button type="button" onclick="docOpenEdit('${d.id}')" class="btn bp bsm" style="justify-content:flex-start;gap:8px">✏ Modifier</button>`}
          <button type="button" onclick="docDownload('${d.id}')" class="btn bsm" style="justify-content:flex-start;gap:8px">⬇ Télécharger</button>
          <button type="button" onclick="docPrint('${d.id}')" class="btn bsm" style="justify-content:flex-start;gap:8px">🖨 Imprimer</button>
          <button type="button" onclick="docExportWord('${d.id}')" class="btn bsm" style="justify-content:flex-start;gap:8px">📄 Export Word</button>
          ${isLocked ? '' : `<button type="button" onclick="goPage('doc-workflow')" class="btn bsm" style="justify-content:flex-start;gap:8px">⇄ Workflow</button>`}
        </div>
      </div>
    </div>
  </div>`;
}
