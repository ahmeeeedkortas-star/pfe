/**
 * CRUD documents SST — buildDocForm, addDocSection, visionneuse.
 */
import { seedSstDocs } from '../../data/sec-docs.data.js';

const TI = {
  Procédure: '📋',
  Instruction: '📝',
  Plan: '🗺',
  Fiche: '🗃',
  Checklist: '✅',
  Affichage: '📢',
  Formulaire: '📄',
  Guide: '📖',
};
const TC = {
  Procédure: '#2563eb',
  Instruction: '#7c3aed',
  Plan: '#dc2626',
  Fiche: '#059669',
  Checklist: '#c2410c',
  Affichage: '#0284c7',
  Formulaire: '#92400e',
  Guide: '#065f46',
};

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function refreshDocs() {
  if (typeof window.reloadPage === 'function') window.reloadPage('sec-docs');
  else if (typeof window.goPage === 'function') window.goPage('sec-docs');
}

export function docModal(title, body, onSave, onDelete) {
  document.getElementById('doc-modal')?.remove();
  const o = document.createElement('div');
  o.id = 'doc-modal';
  o.style.cssText =
    'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9999;display:flex;align-items:center;justify-content:center;font-family:var(--font)';
  o.innerHTML = `<div style="background:#fff;border-radius:14px;width:660px;max-width:96vw;overflow:hidden">
    <div style="background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:14px 18px;color:#fff;font-weight:700;font-size:13px">${esc(title)}</div>
    <div style="padding:18px;max-height:70vh;overflow-y:auto">${body}</div>
    <div style="padding:12px 18px;border-top:1px solid #f1f5f9;display:flex;gap:8px;justify-content:flex-end">
      ${onDelete ? '<button type="button" data-doc-del style="margin-right:auto;color:#dc2626;background:#fef2f2;border:1px solid #fecaca;padding:6px 12px;border-radius:7px;cursor:pointer">Supprimer</button>' : ''}
      <button type="button" data-doc-close class="btn">Annuler</button>
      <button type="button" data-doc-save style="background:#2563eb;color:#fff;border:none;padding:7px 18px;border-radius:8px;font-weight:700;cursor:pointer">Enregistrer</button>
    </div>
  </div>`;
  document.body.appendChild(o);
  o.querySelectorAll('[data-doc-close]').forEach((b) => b.addEventListener('click', () => o.remove()));
  o.addEventListener('click', (e) => {
    if (e.target === o) o.remove();
  });
  o.querySelector('[data-doc-save]')?.addEventListener('click', () => {
    onSave();
    o.remove();
  });
  o.addEventListener('click', (e) => {
    if (e.target.closest('[data-doc-rm-sec]')) e.target.closest('.doc-section-row')?.remove();
  });
  if (onDelete) o.querySelector('[data-doc-del]')?.addEventListener('click', () => { onDelete(); o.remove(); });
}

function fld(id, label, val) {
  return `<div><label style="font-size:10px;font-weight:700;color:#64748b;display:block;margin-bottom:4px">${esc(label)}</label><input id="${id}" class="fi" value="${esc(val)}"></div>`;
}

function nextId(arr) {
  return arr.length ? Math.max(...arr.map((x) => x.id)) + 1 : 1;
}

export function collectDocSections() {
  return [...document.querySelectorAll('.doc-section-row')]
    .map((row) => ({
      h: row.querySelector('.doc-sec-title')?.value?.trim() || '',
      t: row.querySelector('.doc-sec-body')?.value?.trim() || '',
    }))
    .filter((s) => s.h || s.t);
}

export function addDocSection(title = '', body = '') {
  const list = document.getElementById('doc-sections-list');
  if (!list) return;
  const row = document.createElement('div');
  row.className = 'doc-section-row';
  row.style.cssText = 'border:1px solid var(--border);border-radius:8px;padding:10px;margin-bottom:8px';
  row.innerHTML = `<input class="fi doc-sec-title" placeholder="Titre section" value="${esc(title)}" style="width:100%;margin-bottom:6px;font-weight:700">
    <textarea class="fi doc-sec-body" placeholder="Contenu…" style="width:100%;min-height:70px;resize:vertical">${esc(body)}</textarea>
    <button type="button" class="btn bsm" data-doc-rm-sec style="margin-top:6px;color:var(--red)">Supprimer section</button>`;
  row.querySelector('[data-doc-rm-sec]')?.addEventListener('click', () => row.remove());
  list.appendChild(row);
  row.querySelector('.doc-sec-title')?.focus();
}

export function buildDocForm(d = {}) {
  const sections = (d.content || []).map((s) => ({ h: s.h, t: s.t }));
  if (!sections.length) sections.push({ h: '', t: '' });
  const secHtml = sections
    .map(
      (s) =>
        `<div class="doc-section-row" style="border:1px solid var(--border);border-radius:8px;padding:10px;margin-bottom:8px">
      <input class="fi doc-sec-title" value="${esc(s.h)}" placeholder="Titre" style="width:100%;margin-bottom:6px;font-weight:700">
      <textarea class="fi doc-sec-body" style="width:100%;min-height:70px">${esc(s.t)}</textarea>
      <button type="button" class="btn bsm" data-doc-rm-sec style="margin-top:6px;color:var(--red)">Supprimer section</button></div>`
    )
    .join('');
  return `<div style="font-size:11px;font-weight:700;color:var(--navy);margin-bottom:8px">1. Identification</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
      ${fld('dd-code', 'Code', d.code || 'SST-NEW-001')}
      ${fld('dd-nom', 'Nom', d.nom || '')}
      ${fld('dd-cat', 'Catégorie', d.cat || 'Sécurité')}
      ${fld('dd-type', 'Type', d.type || 'Procédure')}
      ${fld('dd-ver', 'Version', d.version || 'V1')}
      ${fld('dd-aut', 'Auteur', d.auteur || 'HSE')}
      ${fld('dd-stat', 'Statut', d.statut || 'En révision')}
      ${fld('dd-pages', 'Pages', String(d.pages ?? 0))}
    </div>
    <div style="font-size:11px;font-weight:700;margin-bottom:6px">2. Description</div>
    <textarea id="dd-desc" class="fi" style="width:100%;min-height:60px;margin-bottom:14px">${esc(d.desc || '')}</textarea>
    <div style="font-size:11px;font-weight:700;margin-bottom:6px">3. Sections de contenu</div>
    <div id="doc-sections-list">${secHtml}</div>
    <button type="button" class="btn bsm bp" onclick="addDocSection()">+ Ajouter une section</button>`;
}

export function docView(id) {
  seedSstDocs();
  window.docSelected = id;
  window.docViewMode = 'list';
  refreshDocs();
}

export function docConsulter(id) {
  seedSstDocs();
  window.docSelected = id;
  window.docViewMode = 'content';
  refreshDocs();
}

export function docSetListMode() {
  window.docViewMode = 'list';
  refreshDocs();
}

export function docValidate(id) {
  const d = window.SST_DOCS?.find((x) => x.id === id);
  if (!d) return;
  d.statut = 'Validé';
  window.confettiBurst?.(window.innerWidth / 2, window.innerHeight / 3, 20);
  window.xmToast?.('Document validé', d.code, 'check-circle', '#16a34a');
  refreshDocs();
}

export function docArchive(id) {
  const d = window.SST_DOCS?.find((x) => x.id === id);
  if (!d) return;
  d.statut = 'Archivé';
  window.xmToast?.('Document archivé', d.code, 'folder', '#64748b');
  refreshDocs();
}

export function docAdd() {
  seedSstDocs();
  docModal('+ Nouveau document', buildDocForm({}), () => {
    const id = nextId(window.SST_DOCS);
    window.SST_DOCS.push({
      id,
      code: document.getElementById('dd-code').value,
      nom: document.getElementById('dd-nom').value,
      cat: document.getElementById('dd-cat').value,
      type: document.getElementById('dd-type').value,
      version: document.getElementById('dd-ver').value,
      auteur: document.getElementById('dd-aut').value,
      date: new Date().toLocaleDateString('fr-FR'),
      statut: document.getElementById('dd-stat').value,
      approbateur: '—',
      taille: '—',
      pages: parseInt(document.getElementById('dd-pages').value, 10) || 0,
      desc: document.getElementById('dd-desc').value,
      content: collectDocSections(),
    });
    window.docSelected = id;
    window.xmToast?.('Document créé', '', 'check-circle', '#2563eb');
    refreshDocs();
  });
}

export function docEdit(id) {
  seedSstDocs();
  const d = window.SST_DOCS.find((x) => x.id === id);
  if (!d) return;
  docModal('Modifier — ' + d.code, buildDocForm(d), () => {
    Object.assign(d, {
      code: document.getElementById('dd-code').value,
      nom: document.getElementById('dd-nom').value,
      cat: document.getElementById('dd-cat').value,
      type: document.getElementById('dd-type').value,
      version: document.getElementById('dd-ver').value,
      auteur: document.getElementById('dd-aut').value,
      statut: document.getElementById('dd-stat').value,
      pages: parseInt(document.getElementById('dd-pages').value, 10) || 0,
      desc: document.getElementById('dd-desc').value,
      content: collectDocSections(),
    });
    window.xmToast?.('Document modifié', '', 'check-circle', '#2563eb');
    refreshDocs();
  }, () => {
    const i = window.SST_DOCS.findIndex((x) => x.id === id);
    if (i >= 0) window.SST_DOCS.splice(i, 1);
    window.docSelected = window.SST_DOCS[0]?.id ?? null;
    window.xmToast?.('Document supprimé', '', 'x', '#dc2626');
    refreshDocs();
  });
}

export function installDocHelpers() {
  seedSstDocs();
  Object.assign(window, {
    docView,
    docConsulter,
    docSetListMode,
    docAdd,
    docEdit,
    docValidate,
    docArchive,
    addDocSection,
    buildDocForm,
    collectDocSections,
    docTypeIcon: (t) => TI[t] || '📄',
    docTypeColor: (t) => TC[t] || '#2563eb',
  });
}
