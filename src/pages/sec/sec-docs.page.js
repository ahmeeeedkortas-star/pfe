/**
 * Page Documents SST — registre + visionneuse (docViewMode list | content).
 */
import { seedSstDocs } from '../../data/sec-docs.data.js';
import { renderKpiCardCenter } from '../../components/icons/ui-helpers.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function statBadge(s) {
  if (s === 'Validé') return 'bg3';
  if (s === 'En révision') return 'by';
  return 'bgr';
}

function docIcon(type) {
  return window.docTypeIcon?.(type) || '📄';
}

function docColor(type) {
  return window.docTypeColor?.(type) || '#2563eb';
}

function listPanel(docs, rows, sel, f) {
  const cats = ['Toutes', ...new Set(docs.map((d) => d.cat))];
  return `<div>
    <div class="card" style="padding:10px 14px;margin-bottom:10px;display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <button type="button" class="btn bp bsm" data-doc-add>+ Nouveau document</button>
    </div>
    <div class="card">
      <div style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:10px;align-items:center">
        <select class="sel" data-doc-filter="cat">${cats.map((c) => `<option${f.cat === c || (!f.cat && c === 'Toutes') ? ' selected' : ''}>${esc(c)}</option>`).join('')}</select>
        <select class="sel" data-doc-filter="statut"><option>Tous</option><option${f.statut === 'Validé' ? ' selected' : ''}>Validé</option><option${f.statut === 'En révision' ? ' selected' : ''}>En révision</option><option${f.statut === 'Archivé' ? ' selected' : ''}>Archivé</option></select>
        <input class="sel" data-doc-filter="q" placeholder="Rechercher…" value="${esc(f.q)}" style="flex:1;min-width:120px">
        <button type="button" class="btn bsm" data-doc-clear>Effacer</button>
        <span style="font-size:10px;color:var(--muted)">${rows.length} résultat(s)</span>
      </div>
      ${rows
        .map((d) => {
          const active = d.id === sel?.id;
          return `<div data-doc-row="${d.id}" style="padding:11px 12px;border-bottom:1px solid var(--border);cursor:pointer;background:${active ? '#eff6ff' : 'transparent'};display:flex;align-items:center;gap:10px">
          <span style="font-size:22px">${docIcon(d.type)}</span>
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:11px">${esc(d.nom)}</div>
            <div style="font-size:9px;color:var(--muted)">${esc(d.code)} · ${esc(d.version)} · <span class="badge ${statBadge(d.statut)}">${esc(d.statut)}</span></div>
          </div>
          ${active ? `<button type="button" class="btn bp bsm" data-doc-consult="${d.id}">Consulter</button>` : '<span style="color:var(--muted)">›</span>'}
        </div>`;
        })
        .join('')}
    </div>
  </div>`;
}

function fichePanel(sel) {
  if (!sel) return '<div class="card"><p style="color:var(--muted)">Sélectionnez un document.</p></div>';
  const steps = ['Rédaction', 'Révision', 'Approbation', 'Publication'];
  const si = sel.statut === 'Validé' ? 3 : sel.statut === 'En révision' ? 1 : 0;
  const workflow = steps
    .map((s, i) => {
      const on = i <= si;
      return `<div style="text-align:center;flex:1"><div style="width:28px;height:28px;border-radius:50%;margin:0 auto 4px;background:${on ? docColor(sel.type) : '#e5e7eb'};color:${on ? '#fff' : 'var(--muted)'};font-size:11px;display:flex;align-items:center;justify-content:center;font-weight:700">${i + 1}</div><div style="font-size:8px;color:${on ? 'var(--navy)' : 'var(--muted)'}">${s}</div></div>`;
    })
    .join('');
  return `<div class="card">
    <div style="text-align:center;margin-bottom:12px"><span style="font-size:40px">${docIcon(sel.type)}</span>
      <div style="font-weight:800;font-size:14px;margin-top:6px">${esc(sel.nom)}</div>
      <div style="font-size:10px;color:var(--muted)">${esc(sel.code)} · ${esc(sel.version)}</div>
      <span class="badge ${statBadge(sel.statut)}" style="margin-top:6px">${esc(sel.statut)}</span></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:10px;margin-bottom:10px">
      ${[['Catégorie', sel.cat], ['Auteur', sel.auteur], ['Date', sel.date], ['Approbateur', sel.approbateur], ['Taille', sel.taille], ['Pages', sel.pages]].map(([k, v]) => `<div><span style="color:var(--muted)">${k}</span><br><b>${esc(v)}</b></div>`).join('')}
    </div>
    <p style="font-size:11px;background:#eff6ff;border-left:3px solid var(--blue);padding:10px;border-radius:6px;margin-bottom:10px">${esc(sel.desc)}</p>
    <div style="display:flex;gap:4px;margin-bottom:12px">${workflow}</div>
    <div style="display:flex;gap:7px;flex-wrap:wrap">
      <button type="button" class="btn bp bsm" data-doc-consult="${sel.id}">Consulter</button>
      <button type="button" class="btn bsm" data-doc-edit="${sel.id}">Modifier</button>
      <button type="button" class="btn bsm bg2" data-doc-validate="${sel.id}">Valider</button>
      <button type="button" class="btn bsm" data-doc-archive="${sel.id}">Archiver</button>
    </div>
  </div>`;
}

function contentPanel(sel) {
  if (!sel) return '';
  const col = docColor(sel.type);
  const sections = (sel.content || [])
    .map(
      (s, i) =>
        `<div style="margin-bottom:16px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
        <span style="width:26px;height:26px;border-radius:50%;background:${col};color:#fff;font-size:11px;display:flex;align-items:center;justify-content:center;font-weight:700">${i + 1}</span>
        <span style="font-weight:700;font-size:12px;color:var(--navy)">${esc(s.h)}</span>
      </div>
      <div style="font-size:11px;line-height:1.55;white-space:pre-line;color:var(--text);padding-left:34px">${esc(s.t)}</div>
    </div>`
    )
    .join('');
  return `<div class="card" style="padding:0;overflow:hidden">
    <div style="background:linear-gradient(135deg,${col},${col}99);padding:14px 16px;color:#fff">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
        <div><div style="font-size:15px;font-weight:800">${esc(sel.nom)}</div>
        <div style="font-size:10px;opacity:.85">${esc(sel.code)} · ${esc(sel.version)} · ${esc(sel.approbateur)}</div></div>
        <span class="badge" style="background:rgba(255,255,255,.2);color:#fff">${esc(sel.statut)}</span>
      </div>
      <div style="display:flex;gap:7px;margin-top:10px;flex-wrap:wrap">
        <button type="button" class="btn bsm" data-doc-list-mode style="background:rgba(255,255,255,.2);color:#fff;border:none">← Fiche</button>
        <button type="button" class="btn bsm" data-doc-edit="${sel.id}" style="background:rgba(255,255,255,.15);color:#fff;border:none">Modifier</button>
        <button type="button" class="btn bsm" data-doc-validate="${sel.id}" style="background:rgba(255,255,255,.2);color:#fff;border:none">Valider</button>
      </div>
    </div>
    <div style="padding:16px">
      <p style="font-size:11px;background:#eff6ff;border-left:3px solid ${col};padding:10px;border-radius:6px;margin-bottom:14px">${esc(sel.desc)}</p>
      ${sections || '<p style="color:var(--muted)">Aucune section de contenu.</p>'}
    </div>
  </div>`;
}

export function renderSecDocs() {
  seedSstDocs();
  const docs = window.SST_DOCS || [];
  const f = window.docFilter || { cat: '', statut: '', q: '' };
  const mode = window.docViewMode || 'list';
  let rows = docs.filter((d) => {
    if (f.cat && f.cat !== 'Toutes' && d.cat !== f.cat) return false;
    if (f.statut && f.statut !== 'Tous' && d.statut !== f.statut) return false;
    if (f.q) {
      const q = f.q.toLowerCase();
      if (![d.code, d.nom, d.cat, d.auteur].join(' ').toLowerCase().includes(q)) return false;
    }
    return true;
  });
  const sel = rows.find((d) => d.id === window.docSelected) || rows[0];
  if (sel && sel.id !== window.docSelected) window.docSelected = sel.id;

  const valid = docs.filter((d) => d.statut === 'Validé').length;
  const revision = docs.filter((d) => d.statut === 'En révision').length;
  const archived = docs.filter((d) => d.statut === 'Archivé').length;

  const kpi = `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px">
    ${renderKpiCardCenter('Total', docs.length, 'var(--navy)', 'folder')}
    ${renderKpiCardCenter('Validés', valid, 'var(--green)', 'check-circle')}
    ${renderKpiCardCenter('En révision', revision, 'var(--orange)', 'refresh')}
    ${renderKpiCardCenter('Archivés', archived, '#94a3b8', 'file')}
  </div>`;

  if (mode === 'content') {
    return kpi + contentPanel(sel);
  }

  return kpi + `<div class="g23">${listPanel(docs, rows, sel, f)}${fichePanel(sel)}</div>`;
}

export function bindSecDocsDelegation(root) {
  if (!root || root.dataset.docBound) return;
  root.dataset.docBound = '1';
  root.addEventListener('click', (e) => {
    if (e.target.closest('[data-doc-add]')) {
      window.docAdd?.();
      return;
    }
    const row = e.target.closest('[data-doc-row]');
    if (row && !e.target.closest('[data-doc-consult]')) {
      window.docView?.(Number(row.dataset.docRow));
      return;
    }
    const consult = e.target.closest('[data-doc-consult]');
    if (consult) window.docConsulter?.(Number(consult.dataset.docConsult));
    if (e.target.closest('[data-doc-list-mode]')) window.docSetListMode?.();
    const edit = e.target.closest('[data-doc-edit]');
    if (edit) window.docEdit?.(Number(edit.dataset.docEdit));
    const val = e.target.closest('[data-doc-validate]');
    if (val) window.docValidate?.(Number(val.dataset.docValidate));
    const arch = e.target.closest('[data-doc-archive]');
    if (arch) window.docArchive?.(Number(arch.dataset.docArchive));
    if (e.target.closest('[data-doc-clear]')) {
      window.docFilter = { cat: '', statut: '', q: '' };
      window.reloadPage?.('sec-docs') ?? window.goPage?.('sec-docs');
    }
  });
  root.addEventListener('change', (e) => {
    const el = e.target.closest('[data-doc-filter]');
    if (!el) return;
    window.docFilter = window.docFilter || {};
    window.docFilter[el.dataset.docFilter] = el.value;
    window.reloadPage?.('sec-docs') ?? window.goPage?.('sec-docs');
  });
  root.addEventListener('input', (e) => {
    const el = e.target.closest('[data-doc-filter="q"]');
    if (!el) return;
    window.docFilter = window.docFilter || {};
    window.docFilter.q = el.value;
    clearTimeout(root._docQ);
    root._docQ = setTimeout(() => window.reloadPage?.('sec-docs') ?? window.goPage?.('sec-docs'), 300);
  });
}
