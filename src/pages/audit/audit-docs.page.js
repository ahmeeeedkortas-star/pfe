/**
 * Documents Audit & Qualité — registre + visionneuse (comme sec-docs).
 */
import { seedAuditDocs } from '../../data/audit-docs.data.js';
import { renderKpiCardCenter } from '../../components/icons/ui-helpers.js';

const AUDIT_CATS = [
  'Toutes',
  'Qualité',
  'Audit',
  'Amélioration',
  'Direction',
  'Formation',
  'Réglementation',
  'Sécurité',
  'Environnement',
];

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
  return window.auditDocTypeIcon?.(type) || '📄';
}

function docColor(type) {
  return window.auditDocTypeColor?.(type) || '#2563eb';
}

function listPanel(docs, rows, sel, f) {
  return `<div>
    <div class="card" style="padding:12px 16px;margin-bottom:10px;display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <button type="button" class="btn bp bsm" data-audit-doc-add>+ Nouveau document</button>
    </div>
    <div class="card">
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;align-items:center">
        <select class="sel" data-audit-doc-filter="cat">${AUDIT_CATS.map((c) => `<option${f.cat === c || (!f.cat && c === 'Toutes') ? ' selected' : ''}>${esc(c)}</option>`).join('')}</select>
        <select class="sel" data-audit-doc-filter="statut"><option value="">Tous</option><option${f.statut === 'Validé' ? ' selected' : ''}>Validé</option><option${f.statut === 'En révision' ? ' selected' : ''}>En révision</option><option${f.statut === 'Archivé' ? ' selected' : ''}>Archivé</option></select>
        <input class="sel" data-audit-doc-filter="q" placeholder="Rechercher code, nom, auteur…" value="${esc(f.q)}" style="flex:1;min-width:160px;font-size:var(--fs-base)">
        <button type="button" class="btn bsm" data-audit-doc-clear>Effacer</button>
        <span style="font-size:var(--fs-sm);color:var(--muted)">${rows.length} résultat(s)</span>
      </div>
      ${rows
        .map((d) => {
          const active = d.id === sel?.id;
          return `<div data-audit-doc-row="${d.id}" class="audit-doc-row${active ? ' audit-doc-row--sel' : ''}">
          <span style="font-size:24px">${docIcon(d.type)}</span>
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:var(--fs-base)">${esc(d.nom)}</div>
            <div style="font-size:var(--fs-sm);color:var(--muted);margin-top:2px">${esc(d.code)} · ${esc(d.version)} · <span class="badge ${statBadge(d.statut)}">${esc(d.statut)}</span></div>
          </div>
          ${active ? `<button type="button" class="btn bp bsm" data-audit-doc-consult="${d.id}">📖 Consulter</button>` : '<span style="color:var(--muted)">›</span>'}
        </div>`;
        })
        .join('')}
    </div>
  </div>`;
}

function fichePanel(sel) {
  if (!sel) return '<div class="card"><p style="color:var(--muted)">Sélectionnez un document.</p></div>';
  const col = docColor(sel.type);
  const steps = ['Rédaction', 'Révision', 'Approbation', 'Publication'];
  const si = sel.statut === 'Validé' ? 3 : sel.statut === 'En révision' ? 1 : 0;
  const workflow = steps
    .map((s, i) => {
      const on = i <= si;
      return `<div style="text-align:center;flex:1"><div style="width:32px;height:32px;border-radius:50%;margin:0 auto 6px;background:${on ? col : '#e5e7eb'};color:${on ? '#fff' : 'var(--muted)'};font-size:var(--fs-sm);display:flex;align-items:center;justify-content:center;font-weight:700">${i + 1}</div><div style="font-size:var(--fs-xs);color:${on ? 'var(--navy)' : 'var(--muted)'}">${s}</div></div>`;
    })
    .join('');
  return `<div class="card audit-doc-fiche">
    <div style="text-align:center;margin-bottom:14px"><span style="font-size:48px">${docIcon(sel.type)}</span>
      <div style="font-weight:800;font-size:var(--fs-lg);margin-top:8px">${esc(sel.nom)}</div>
      <div style="font-size:var(--fs-sm);color:var(--muted)">${esc(sel.code)} · ${esc(sel.version)}</div>
      <span class="badge ${statBadge(sel.statut)}" style="margin-top:8px">${esc(sel.statut)}</span></div>
    <div class="audit-info-grid" style="margin-bottom:12px">${[
      ['Code', sel.code],
      ['Catégorie', sel.cat],
      ['Auteur', sel.auteur],
      ['Approbateur', sel.approbateur],
      ['Date', sel.date],
      ['Pages', sel.pages],
    ]
      .map(
        ([k, v]) =>
          `<div class="audit-info-cell"><div class="fl">${k}</div><div style="font-weight:600;font-size:var(--fs-sm)">${esc(v)}</div></div>`
      )
      .join('')}</div>
    <p class="audit-doc-desc">${esc(sel.desc)}</p>
    <div style="display:flex;gap:6px;margin-bottom:14px">${workflow}</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button type="button" class="btn bp bsm" data-audit-doc-consult="${sel.id}">📖 Consulter</button>
      <button type="button" class="btn bsm" data-audit-doc-edit="${sel.id}">✏ Modifier</button>
      <button type="button" class="btn bsm bg2" data-audit-doc-validate="${sel.id}">✓ Valider</button>
    </div>
  </div>`;
}

function contentPanel(sel) {
  if (!sel) return '';
  const col = docColor(sel.type);
  const sections = (sel.content || [])
    .map(
      (s, i) =>
        `<div style="margin-bottom:18px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <span style="width:28px;height:28px;border-radius:50%;background:${col};color:#fff;font-size:var(--fs-sm);display:flex;align-items:center;justify-content:center;font-weight:700">${i + 1}</span>
        <span style="font-weight:700;font-size:var(--fs-base);color:var(--navy)">${esc(s.h)}</span>
      </div>
      <div style="font-size:var(--fs-base);line-height:1.55;white-space:pre-line;color:var(--text);padding-left:38px">${esc(s.t)}</div>
    </div>`
    )
    .join('');
  return `<div class="card" style="padding:0;overflow:hidden" data-page="audit-docs">
    <div style="background:linear-gradient(135deg,${col},${col}99);padding:16px 18px;color:#fff">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap">
        <div><div style="font-size:var(--fs-lg);font-weight:800">${esc(sel.nom)}</div>
        <div style="font-size:var(--fs-sm);opacity:.9;margin-top:4px">${esc(sel.code)} · ${esc(sel.version)}</div></div>
        <span class="badge" style="background:rgba(255,255,255,.2);color:#fff">${esc(sel.statut)}</span>
      </div>
      <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
        <button type="button" class="btn bsm" data-audit-doc-list-mode style="background:rgba(255,255,255,.2);color:#fff;border:none">← Fiche</button>
        <button type="button" class="btn bsm" data-audit-doc-edit="${sel.id}" style="background:rgba(255,255,255,.15);color:#fff;border:none">Modifier</button>
      </div>
    </div>
    <div style="padding:18px">
      <p class="audit-doc-desc" style="margin-bottom:16px">${esc(sel.desc)}</p>
      ${sections || '<p style="color:var(--muted)">Aucune section.</p>'}
    </div>
  </div>`;
}

export function renderAuditDocs() {
  seedAuditDocs();
  const docs = window.AUDIT_DOCS || [];
  const f = window.AUDIT_DOC_FILTER || { cat: '', statut: '', q: '' };
  const mode = window.AUDIT_DOC_VIEWMODE || 'list';
  const rows = docs.filter((d) => {
    if (f.cat && f.cat !== 'Toutes' && d.cat !== f.cat) return false;
    if (f.statut && d.statut !== f.statut) return false;
    if (f.q) {
      const q = f.q.toLowerCase();
      if (![d.code, d.nom, d.cat, d.auteur].join(' ').toLowerCase().includes(q)) return false;
    }
    return true;
  });
  const sel = rows.find((d) => d.id === window.AUDIT_DOC_SELECTED) || rows[0];
  if (sel && sel.id !== window.AUDIT_DOC_SELECTED) window.AUDIT_DOC_SELECTED = sel.id;

  const valid = docs.filter((d) => d.statut === 'Validé').length;
  const revision = docs.filter((d) => d.statut === 'En révision').length;
  const archived = docs.filter((d) => d.statut === 'Archivé').length;

  const kpi = `<div class="audit-kpi-row" style="grid-template-columns:repeat(4,1fr);margin-bottom:12px">
    ${renderKpiCardCenter('Total', docs.length, 'var(--navy)', 'folder')}
    ${renderKpiCardCenter('Validés', valid, 'var(--green)', 'check-circle')}
    ${renderKpiCardCenter('En révision', revision, 'var(--orange)', 'refresh')}
    ${renderKpiCardCenter('Archivés', archived, '#94a3b8', 'file')}
  </div>`;

  if (mode === 'content') return `<div data-page="audit-docs">${kpi}${contentPanel(sel)}</div>`;
  return `<div data-page="audit-docs" class="xm-register xm-register--audit">${kpi}<div class="g23 audit-g23">${listPanel(docs, rows, sel, f)}${fichePanel(sel)}</div></div>`;
}

export function bindAuditDocsDelegation(root) {
  if (!root || root.dataset.auditDocBound) return;
  root.dataset.auditDocBound = '1';
  root.addEventListener('click', (e) => {
    if (e.target.closest('[data-audit-doc-add]')) {
      window.auditDocAdd?.();
      return;
    }
    const row = e.target.closest('[data-audit-doc-row]');
    if (row && !e.target.closest('[data-audit-doc-consult]')) {
      window.auditDocView?.(Number(row.dataset.auditDocRow));
      return;
    }
    const consult = e.target.closest('[data-audit-doc-consult]');
    if (consult) window.auditDocConsulter?.(Number(consult.dataset.auditDocConsult));
    if (e.target.closest('[data-audit-doc-list-mode]')) window.auditDocSetListMode?.();
    const edit = e.target.closest('[data-audit-doc-edit]');
    if (edit) window.auditDocEdit?.(Number(edit.dataset.auditDocEdit));
    const val = e.target.closest('[data-audit-doc-validate]');
    if (val) window.auditDocValidate?.(Number(val.dataset.auditDocValidate));
    if (e.target.closest('[data-audit-doc-clear]')) {
      window.AUDIT_DOC_FILTER = { cat: '', statut: '', q: '' };
      window.reloadPage?.('doc-liste') ?? window.goPage?.('doc-liste');
    }
  });
  root.addEventListener('change', (e) => {
    const el = e.target.closest('[data-audit-doc-filter]');
    if (!el) return;
    window.AUDIT_DOC_FILTER = window.AUDIT_DOC_FILTER || {};
    window.AUDIT_DOC_FILTER[el.dataset.auditDocFilter] = el.value;
    window.reloadPage?.('audit-docs') ?? window.goPage?.('audit-docs');
  });
  root.addEventListener('input', (e) => {
    const el = e.target.closest('[data-audit-doc-filter="q"]');
    if (!el) return;
    window.AUDIT_DOC_FILTER = window.AUDIT_DOC_FILTER || {};
    window.AUDIT_DOC_FILTER.q = el.value;
    clearTimeout(root._auditDocQ);
    root._auditDocQ = setTimeout(() => window.reloadPage?.('doc-liste') ?? window.goPage?.('doc-liste'), 300);
  });
}
