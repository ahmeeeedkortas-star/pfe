/**
 * Bibliothèque documentaire ISO — documents actifs et archivés.
 */
import { DOC_STATUS_COLORS } from './doc-store.js';
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

const DOC_ICONS = {
  'Manuel Qualité': '📘',
  Procédure: '📋',
  Processus: '🔄',
  Instruction: '📝',
  Formulaire: '📊',
  Enregistrement: '🗂',
  Politique: '🛡',
  'Document technique': '⚙',
};

const DOC_TYPES = [
  'Manuel Qualité',
  'Procédure',
  'Processus',
  'Instruction',
  'Formulaire',
  'Enregistrement',
  'Politique',
  'Document technique',
];

const ISO_STATUSES = ['Brouillon', 'En révision', 'Approuvé', 'Obsolète', 'Archivé'];

export function renderDocBiblioPage() {
  const D = window.DOC_DATA || [];
  const f = window.doc_filter || { type: '', proc: '', zone: '', statut: '', q: '' };
  const view = window.doc_view || 'grid';

  const F = D.filter((d) => {
    if (f.type && d.type !== f.type) return false;
    if (f.statut && d.statut !== f.statut) return false;
    if (f.q) {
      const q = f.q.toLowerCase();
      const hay = [d.id, d.code, d.titre, d.type, d.processus, d.zone, d.service, d.desc]
        .join(' ')
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const F_active = F.filter((d) => d.statut !== 'Archivé' && d.statut !== 'Obsolète');
  const F_obsolete = F.filter((d) => d.statut === 'Obsolète' || d.statut === 'Archivé');

  function gridCard(d, isArchive) {
    const col = TYPE_COLORS[d.type] || '#64748b';
    const sc = DOC_STATUS_COLORS[d.statut] || '#94a3b8';
    const ic = DOC_ICONS[d.type] || '📄';
    const cardBg = isArchive ? '#f1f5f9' : '#fff';
    const cardOp = isArchive ? '0.8' : '1';
    const canEdit = !isArchive;

    return `<div style="background:${cardBg};border:1px solid #e2e8f0;border-radius:12px;padding:14px;box-shadow:0 2px 8px rgba(0,0,0,.05);transition:.2s;cursor:pointer;opacity:${cardOp}" onclick="window.doc_sel='${d.id}';goPage('doc-read')" onmouseover="this.style.boxShadow='0 6px 20px rgba(0,0,0,.1)';this.style.transform='translateY(-1px)'" onmouseout="this.style.boxShadow='0 2px 8px rgba(0,0,0,.05)';this.style.transform='none'">
      <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:10px">
        <div style="width:40px;height:40px;border-radius:10px;background:${col}18;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">${ic}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:700;color:#0f172a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:2px">${esc(d.titre)}${renderImportedTypeBadge(d.importedType)}</div>
          <div style="font-size:9.5px;color:${col};font-weight:700">${esc(d.code || d.id)} · ${esc(d.type)}</div>
        </div>
      </div>
      <div style="font-size:10px;color:#64748b;margin-bottom:8px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">${esc(d.desc || '')}</div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:4px">
        <span style="font-size:9.5px;font-weight:700;background:${col}15;color:${col};padding:2px 8px;border-radius:20px">${esc(d.version)}${d.statut === 'Approuvé' && d.isCurrent !== false ? ' ✓' : ''}</span>
        <span style="font-size:9.5px;font-weight:700;background:${sc}15;color:${sc};padding:2px 8px;border-radius:20px">${esc(d.statut)}</span>
      </div>
      <div style="font-size:9px;color:#94a3b8;margin-bottom:10px">📅 ${esc(isArchive ? d.dateArchivage || d.dateMaj : d.dateMaj)} · 👤 ${esc(d.auteur || d.resp)}</div>
      <div style="display:flex;gap:5px;flex-wrap:wrap" onclick="event.stopPropagation()">
        <button type="button" onclick="window.doc_sel='${d.id}';goPage('doc-read')" class="btn bsm" style="flex:1">👁 Voir</button>
        ${canEdit ? `<button type="button" onclick="docOpenEdit('${d.id}')" class="btn bsm" style="flex:1;background:#f0fdf4;color:#16a34a;border-color:#86efac">✏ Éditer</button>` : ''}
        <button type="button" onclick="docDownload('${d.id}')" class="btn bsm">⬇</button>
        ${canEdit ? `<button type="button" onclick="docArchive('${d.id}')" class="btn bsm" style="background:#fffbeb;color:#92400e;border-color:#fde68a">📦</button>` : ''}
      </div>
    </div>`;
  }

  function renderList(items, isArchive) {
    if (!items.length) return '';
    if (view === 'grid') {
      return `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px">${items.map((d) => gridCard(d, isArchive)).join('')}</div>`;
    }
    const rows = items
      .map((d) => {
        const col = TYPE_COLORS[d.type] || '#64748b';
        const sc = DOC_STATUS_COLORS[d.statut] || '#94a3b8';
        const canEdit = !isArchive;
        return `<tr style="cursor:pointer;opacity:${isArchive ? 0.85 : 1}" onclick="window.doc_sel='${d.id}';goPage('doc-read')">
        <td><div style="font-size:11px;font-weight:700">${esc(d.titre)}</div><div style="font-size:9.5px;color:#94a3b8">${esc(d.code || d.id)}</div></td>
        <td><span style="background:${col}15;color:${col};padding:2px 8px;border-radius:20px;font-size:9.5px;font-weight:700">${esc(d.type)}</span></td>
        <td style="font-size:10.5px">${esc(d.processus)}</td>
        <td style="font-size:10px;font-weight:700">${esc(d.version)}</td>
        <td><span style="background:${sc}15;color:${sc};padding:2px 8px;border-radius:20px;font-size:9.5px;font-weight:700">${esc(d.statut)}</span></td>
        <td style="font-size:10.5px">${esc(d.auteur || d.resp)}</td>
        <td style="font-size:10px;color:#64748b">${esc(d.dateMaj)}</td>
        <td onclick="event.stopPropagation()">
          <button type="button" onclick="window.doc_sel='${d.id}';goPage('doc-read')" class="btn bsm">👁</button>
          ${canEdit ? `<button type="button" onclick="docOpenEdit('${d.id}')" class="btn bsm">✏</button>` : ''}
        </td>
      </tr>`;
      })
      .join('');
    return `<div class="card" style="padding:0;overflow:hidden"><table class="tbl"><thead><tr><th>Document</th><th>Type</th><th>Processus</th><th>Version</th><th>Statut</th><th>Auteur</th><th>Màj</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>`;
  }

  const typeOpts = DOC_TYPES.map(
    (t) => `<option value="${t}"${f.type === t ? ' selected' : ''}>${t}</option>`
  ).join('');
  const statOpts = ISO_STATUSES.map(
    (s) => `<option value="${s}"${f.statut === s ? ' selected' : ''}>${s}</option>`
  ).join('');

  return `
  <div class="card" style="margin-bottom:12px">
    <div class="ch">
      <span class="ct">📚 Bibliothèque documentaire</span>
      <div style="display:flex;gap:6px">
        <button type="button" onclick="window.doc_view='grid';reloadPage('doc-biblio')" class="btn bsm${view === 'grid' ? ' bp' : ''}">▦ Grille</button>
        <button type="button" onclick="window.doc_view='list';reloadPage('doc-biblio')" class="btn bsm${view === 'list' ? ' bp' : ''}">☰ Liste</button>
        <button type="button" onclick="goPage('doc-create')" class="btn bp bsm">+ Nouveau</button>
      </div>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px">
      <input id="doc-filter-q" class="fi" placeholder="Rechercher…" value="${esc(f.q)}" style="min-width:180px" oninput="window.doc_filter.q=this.value;reloadPage('doc-biblio')">
      <select class="sel" onchange="window.doc_filter.type=this.value;reloadPage('doc-biblio')"><option value="">Tous types</option>${typeOpts}</select>
      <select class="sel" onchange="window.doc_filter.statut=this.value;reloadPage('doc-biblio')"><option value="">Tous statuts</option>${statOpts}</select>
      ${f.q || f.type || f.statut ? `<button type="button" onclick="window.doc_filter={type:'',proc:'',zone:'',statut:'',q:''};reloadPage('doc-biblio')" class="btn bsm">✕ Effacer</button>` : ''}
    </div>
    <div style="font-size:10px;color:#64748b;margin-bottom:10px">${F_active.length} document(s) actif(s) · ${F_obsolete.length} obsolète(s)/archivé(s)</div>
  </div>

  <div style="margin-bottom:8px;font-size:11px;font-weight:700;color:#0f172a">Documents en vigueur</div>
  ${renderList(F_active, false) || '<div class="card" style="padding:24px;text-align:center;color:#94a3b8">Aucun document actif</div>'}

  ${F_obsolete.length ? `<div style="margin:20px 0 8px;font-size:11px;font-weight:700;color:#64748b">🗄 Versions obsolètes & archivées <span style="font-weight:400;font-size:10px">— consultation seule</span></div>${renderList(F_obsolete, true)}` : ''}`;
}
