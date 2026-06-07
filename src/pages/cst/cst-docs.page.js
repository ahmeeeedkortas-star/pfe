/**
 * Documentation SMI — bibliothèque ISO (actifs + archives).
 */
import { seedCst, getCstDocs } from '../../data/cst.data.js';
import { esc, docTypeBadge } from '../../components/cst/cst-utils.js';
import { CST_STATUS_COLORS } from './cst-store.js';
import { getArchivedCstDocs, getActiveCstDocs } from './cst-document-iso.js';
import { renderImportedTypeBadge } from '../doc/doc-import-utils.js';

const ISO_STATUSES = ['Brouillon', 'En révision', 'Approuvé', 'Obsolète', 'Archivé'];

function statusBadge(statut) {
  const col = CST_STATUS_COLORS[statut] || '#94a3b8';
  return `<span style="font-size:9.5px;font-weight:700;background:${col}18;color:${col};padding:2px 8px;border-radius:20px">${esc(statut)}</span>`;
}

function docRow(d, isArchive) {
  const canEdit = !isArchive;
  return `<tr style="${isArchive ? 'opacity:0.85' : ''}">
    <td style="font-weight:700">${esc(d.nom)}${renderImportedTypeBadge(d.importedType)}</td>
    <td>${docTypeBadge(d.type)}</td>
    <td><code style="font-size:var(--fs-xs)">${esc(d.code)}</code></td>
    <td>${esc(d.version)}${d.statut === 'Approuvé' && d.isCurrent !== false ? ' ✓' : ''}</td>
    <td style="font-size:var(--fs-sm)">${esc(isArchive ? d.dateArchivage || d.dateMaj : d.dateMaj || d.date)}</td>
    <td>${statusBadge(d.statut)}</td>
    <td style="font-size:var(--fs-xs)">${esc(d.auteur || '—')}</td>
    <td style="white-space:nowrap">
      <button type="button" class="btn bsm" onclick="window.cst_doc_sel='${d.id}';goPage('cst-doc-read')" title="Consulter">📖</button>
      ${canEdit ? `<button type="button" class="btn bsm" data-cst-doc-edit="${d.id}">✏</button>` : ''}
      <button type="button" class="btn bsm" onclick="cstDocDownload('${d.id}')" title="Télécharger">⬇</button>
      ${canEdit ? `<button type="button" class="btn bsm" onclick="cstDocArchive('${d.id}')" title="Archiver">📦</button>` : ''}
    </td>
  </tr>`;
}

export function renderCstDocs() {
  seedCst();
  const view = window.cst_docsView || 'active';
  const f = window.cst_docs_filter || { statut: '', type: '', q: '' };
  const all = getCstDocs();

  const filtered = all.filter((d) => {
    if (view === 'active' && (d.statut === 'Archivé' || d.statut === 'Obsolète')) return false;
    if (view === 'archive' && d.statut !== 'Archivé' && d.statut !== 'Obsolète') return false;
    if (f.statut && d.statut !== f.statut) return false;
    if (f.type && d.type !== f.type) return false;
    if (f.q) {
      const q = f.q.toLowerCase();
      const hay = [d.nom, d.code, d.type, d.auteur, d.desc].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const activeCount = getActiveCstDocs().length;
  const archiveCount = getArchivedCstDocs().length;

  const typeOpts = [...new Set(all.map((d) => d.type))].map((t) => `<option value="${esc(t)}"${f.type === t ? ' selected' : ''}>${esc(t)}</option>`).join('');
  const statOpts = ISO_STATUSES.map((s) => `<option value="${esc(s)}"${f.statut === s ? ' selected' : ''}>${esc(s)}</option>`).join('');

  const rows = filtered.map((d) => docRow(d, view === 'archive')).join('');

  return `<div data-page="cst-docs" class="xm-register xm-register--cst">
    <div class="card" style="margin-bottom:14px;padding:14px 16px;background:linear-gradient(135deg,#eff6ff,#f0f9ff);border:1px solid #bfdbfe">
      <div style="font-size:12px;font-weight:700;color:#1e40af;margin-bottom:4px">Maîtrise documentaire ISO 7.5</div>
      <div style="font-size:11px;color:#475569">Création · Révision · Approbation · Versions · Archivage · Traçabilité — ISO 9001 / 14001 / 45001</div>
    </div>
    <div class="card">
      <div class="ch">
        <span class="ct">Documentation SMI</span>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button type="button" class="btn bsm" data-cst-doc-import>📎 Importer</button>
          <button type="button" class="btn bsm bp" data-cst-doc-add>+ Nouveau</button>
        </div>
      </div>
      <div class="cst-tab-bar" style="margin-bottom:12px">
        <button type="button" class="cst-tab-btn${view === 'active' ? ' is-active' : ''}" onclick="window.cst_docsView='active';reloadPage('cst-docs')">Documents actifs (${activeCount})</button>
        <button type="button" class="cst-tab-btn${view === 'archive' ? ' is-active' : ''}" onclick="window.cst_docsView='archive';reloadPage('cst-docs')">Archives (${archiveCount})</button>
        <button type="button" class="cst-tab-btn" onclick="goPage('cst-history')">🕐 Historique & traçabilité</button>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px">
        <input class="fi" style="flex:1;min-width:180px" placeholder="Rechercher…" value="${esc(f.q)}" oninput="window.cst_docs_filter=Object.assign(window.cst_docs_filter||{},{q:this.value});reloadPage('cst-docs')">
        <select class="fi" style="width:140px" onchange="window.cst_docs_filter=Object.assign(window.cst_docs_filter||{},{type:this.value});reloadPage('cst-docs')">
          <option value="">Tous types</option>${typeOpts}
        </select>
        <select class="fi" style="width:140px" onchange="window.cst_docs_filter=Object.assign(window.cst_docs_filter||{},{statut:this.value});reloadPage('cst-docs')">
          <option value="">Tous statuts</option>${statOpts}
        </select>
      </div>
      <table class="tbl"><thead><tr>
        <th>Nom</th><th>Type</th><th>Code</th><th>Version</th><th>Date</th><th>Statut</th><th>Auteur</th><th></th>
      </tr></thead>
      <tbody>${rows || `<tr><td colspan="8" style="text-align:center;color:var(--muted)">${view === 'archive' ? 'Aucun document archivé' : 'Aucun document actif'}</td></tr>`}</tbody></table>
    </div>
  </div>`;
}
