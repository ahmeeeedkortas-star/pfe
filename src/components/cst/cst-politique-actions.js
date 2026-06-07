/**
 * Actions page Politique QHSE — handlers robustes (capture + API globale).
 */
import { getCstPolitique } from '../../data/cst.data.js';
import { esc, cstToast, cstRefresh, cstModal, closeCstModal } from './cst-utils.js';
import { getRichEditorHtml } from './cst-rich-editor.js';
import { printCstTable } from './cst-export.js';
import { cstAfterMutation } from '../../pages/cst/cst-store.js';
import { getCstCurrentUser, recordSingletonRevision } from './cst-entity-revisions.js';

function todayCst() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

function nextRevisionTag(cur) {
  const m = String(cur || 'V00').match(/(\d+)/);
  const n = m ? parseInt(m[1], 10) + 1 : 1;
  return `V${String(n).padStart(2, '0')}`;
}

export function setPolitiqueSaveState(text, tone = 'muted') {
  const el = document.getElementById('cst-pol-autosave-state');
  if (!el) return;
  el.textContent = text;
  el.dataset.tone = tone;
}

function renderPolitiquePrintHtml(pol) {
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(pol.titre || 'Politique QHSE')}</title>
  <style>
    body{font-family:Inter,Arial,sans-serif;padding:24px;color:#0f172a}
    h1{font-size:24px;margin:0 0 6px} .sub{color:#64748b;margin-bottom:14px}
    .meta{font-size:12px;color:#334155;margin-bottom:14px}
    table{border-collapse:collapse;width:100%} td,th{border:1px solid #cbd5e1;padding:8px}
    img{max-width:100%;height:auto}
  </style></head><body>
  <h1>${esc(pol.titre || 'Politique QHSE')}</h1>
  <div class="sub">${esc(pol.sousTitre || '')}</div>
  <div class="meta">Version ${esc(pol.revision || 'V01')} · Mise à jour ${esc(pol.dateMiseAJour || '')}</div>
  <div>${pol.contenuHtml || ''}</div>
  </body></html>`;
}

export function savePolitique({ publish = false, silent = false, refresh = true } = {}) {
  try {
    const prev = getCstPolitique() || {};
    const snap = { ...prev, contenuHtml: prev.contenuHtml };
    const editorHtml = getRichEditorHtml('cst_pol_inline_editor') || prev.contenuHtml || '';
    const now = todayCst();
    const user = getCstCurrentUser();
    const nextRev = publish ? nextRevisionTag(prev.revision) : prev.revision || 'V01';
    const revisions = Array.isArray(prev.revisions) ? [...prev.revisions] : [];
    if (publish) {
      revisions.unshift({ version: nextRev, date: now, statut: 'Validée', note: 'Publication depuis éditeur', auteur: user });
    }
    window.CST_POLITIQUE = {
      ...prev,
      contenuHtml: editorHtml,
      updatedBy: user,
      texte: editorHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 700),
      dateMiseAJour: now,
      dernierePublication: publish ? now : prev.dernierePublication || prev.dateSignature || '—',
      statut: publish ? 'Publié' : prev.statut || 'Brouillon',
      revision: nextRev,
      revisions,
    };
    recordSingletonRevision(window.CST_POLITIQUE, snap, user, publish ? `Publication ${nextRev}` : 'Enregistrement');
    setPolitiqueSaveState(publish ? `Version ${nextRev} publiée` : `Sauvegarde ${now}`, 'ok');
    cstAfterMutation(
      'cst-politique',
      'politique',
      'POL-QSE',
      publish ? 'Publication' : 'Enregistrement',
      publish ? `Version ${nextRev} publiée` : 'Contenu mis à jour'
    );
    if (!silent) cstToast(publish ? 'Version publiée' : 'Politique enregistrée', '#16a34a');
    if (refresh) cstRefresh('cst-politique');
    return true;
  } catch (err) {
    console.error('[cst-politique] save', err);
    cstToast('Erreur enregistrement', '#dc2626');
    return false;
  }
}

export function publishPolitique() {
  return savePolitique({ publish: true, refresh: true });
}

export function addPolitiqueSignature() {
  const prev = getCstPolitique() || {};
  const nom = prompt('Nom du signataire :');
  if (!nom) return;
  const role = prompt('Fonction / rôle :') || '';
  const signatures = Array.isArray(prev.signatures) ? [...prev.signatures] : [];
  signatures.unshift({ nom: nom.trim(), role: role.trim(), date: todayCst() });
  window.CST_POLITIQUE = {
    ...prev,
    signataire: prev.signataire || nom.trim(),
    dateSignature: todayCst(),
    signatures,
  };
  cstToast('Signature ajoutée', '#16a34a');
  cstRefresh('cst-politique');
}

export function addPolitiqueAxe() {
  const prev = getCstPolitique() || {};
  const titre = prompt("Titre de l'axe :");
  if (!titre) return;
  const texte = prompt('Description :') || '';
  const ic = prompt('Icône (emoji) :', '📌') || '📌';
  const axes = Array.isArray(prev.axes) ? [...prev.axes] : [];
  axes.push({ titre: titre.trim(), texte: texte.trim(), ic: ic.trim() });
  window.CST_POLITIQUE = { ...prev, axes, dateMiseAJour: todayCst() };
  cstToast('Axe ajouté', '#16a34a');
  cstRefresh('cst-politique');
}

export function deletePolitiqueAxe(idx) {
  const prev = getCstPolitique() || {};
  const axes = Array.isArray(prev.axes) ? [...prev.axes] : [];
  const n = Number(idx);
  if (!Number.isInteger(n) || n < 0 || n >= axes.length) return;
  axes.splice(n, 1);
  window.CST_POLITIQUE = { ...prev, axes, dateMiseAJour: todayCst() };
  cstToast('Axe supprimé', '#dc2626');
  cstRefresh('cst-politique');
}

export function focusPolitiqueEditor() {
  const el = document.getElementById('cst_pol_inline_editor');
  const wrap = document.querySelector('[data-page="cst-politique"]');
  wrap?.classList.add('cst-pol-editing');
  el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => el?.focus(), 80);
}

export function openPolitiqueMetaModal() {
  const p = getCstPolitique() || {};
  const body = `
    <div class="cst-field-grid" style="display:grid;gap:10px">
      <label class="fl">Titre<input class="fi" id="cst_pol_meta_titre" value="${esc(p.titre || '')}"></label>
      <label class="fl">Sous-titre<input class="fi" id="cst_pol_meta_sub" value="${esc(p.sousTitre || '')}"></label>
      <label class="fl">Date création<input class="fi" id="cst_pol_meta_dc" value="${esc(p.dateCreation || '')}"></label>
      <label class="fl">Date mise à jour<input class="fi" id="cst_pol_meta_dm" value="${esc(p.dateMiseAJour || '')}"></label>
      <label class="fl">Version<input class="fi" id="cst_pol_meta_rev" value="${esc(p.revision || 'V01')}"></label>
      <label class="fl">Signataire<input class="fi" id="cst_pol_meta_sign" value="${esc(p.signataire || '')}"></label>
    </div>`;
  document.body.insertAdjacentHTML(
    'beforeend',
    cstModal('Informations document', 'Métadonnées politique', '#14532d', '#16a34a', body, { entity: 'politique-meta' })
  );
}

export function savePolitiqueMetaFromModal() {
  const prev = getCstPolitique() || {};
  window.CST_POLITIQUE = {
    ...prev,
    titre: document.getElementById('cst_pol_meta_titre')?.value?.trim() || prev.titre,
    sousTitre: document.getElementById('cst_pol_meta_sub')?.value?.trim() || prev.sousTitre,
    dateCreation: document.getElementById('cst_pol_meta_dc')?.value?.trim() || prev.dateCreation,
    dateMiseAJour: document.getElementById('cst_pol_meta_dm')?.value?.trim() || todayCst(),
    revision: document.getElementById('cst_pol_meta_rev')?.value?.trim() || prev.revision,
    signataire: document.getElementById('cst_pol_meta_sign')?.value?.trim() || prev.signataire,
  };
  closeCstModal();
  cstToast('Informations mises à jour', '#16a34a');
  cstRefresh('cst-politique');
}

export function exportPolitiqueWord() {
  const pol = getCstPolitique() || {};
  const doc = renderPolitiquePrintHtml(pol);
  const blob = new Blob([doc], { type: 'application/msword;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `politique-qhse-${(pol.revision || 'V01').toLowerCase()}.doc`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(a.href);
  cstToast('Export Word terminé', '#16a34a');
}

export function exportPolitiquePdf() {
  printCstTable('Politique QHSE — XPERT MECA');
}

export function printPolitiqueDocument() {
  const pol = getCstPolitique() || {};
  const w = window.open('', '_blank', 'width=1024,height=740');
  if (!w) {
    cstToast('Popup bloquée — autorisez les popups', '#dc2626');
    return;
  }
  w.document.open();
  w.document.write(renderPolitiquePrintHtml(pol));
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 200);
}

function handlePolitiqueClick(e) {
  const t = e.target;
  if (!t?.closest) return;

  const metaBtn = t.closest('[data-cst-pol-meta]');
  if (metaBtn) {
    e.preventDefault();
    e.stopPropagation();
    openPolitiqueMetaModal();
    return;
  }

  const saveBtn = t.closest('[data-cst-pol-save]');
  if (saveBtn) {
    e.preventDefault();
    e.stopPropagation();
    const isMetaOnly = saveBtn.dataset.cstPolMeta === '1';
    if (isMetaOnly) openPolitiqueMetaModal();
    else savePolitique({ publish: false, refresh: true });
    return;
  }

  const pubBtn = t.closest('[data-cst-pol-publish]');
  if (pubBtn) {
    e.preventDefault();
    e.stopPropagation();
    publishPolitique();
    return;
  }

  const wordBtn = t.closest('[data-cst-pol-export-word]');
  if (wordBtn) {
    e.preventDefault();
    e.stopPropagation();
    exportPolitiqueWord();
    return;
  }

  const pdfBtn = t.closest('[data-cst-pol-export-pdf]');
  if (pdfBtn) {
    e.preventDefault();
    e.stopPropagation();
    exportPolitiquePdf();
    return;
  }

  const printBtn = t.closest('[data-cst-pol-print]');
  if (printBtn) {
    e.preventDefault();
    e.stopPropagation();
    printPolitiqueDocument();
    return;
  }

  const signBtn = t.closest('[data-cst-pol-add-signature]');
  if (signBtn) {
    e.preventDefault();
    e.stopPropagation();
    addPolitiqueSignature();
    return;
  }

  const editBtn = t.closest('[data-cst-pol-edit-toggle], [data-cst-politique-edit]');
  if (editBtn) {
    e.preventDefault();
    e.stopPropagation();
    focusPolitiqueEditor();
    return;
  }

  const axeBtn = t.closest('[data-cst-pol-add-axe]');
  if (axeBtn) {
    e.preventDefault();
    e.stopPropagation();
    addPolitiqueAxe();
    return;
  }

  const delAxe = t.closest('[data-cst-pol-del-axe]');
  if (delAxe) {
    e.preventDefault();
    e.stopPropagation();
    deletePolitiqueAxe(delAxe.getAttribute('data-cst-pol-del-axe'));
    return;
  }
}

let autosaveTimer = null;

function handlePolitiqueInput(e) {
  const editor = e.target.closest?.('#cst_pol_inline_editor');
  if (!editor) return;
  setPolitiqueSaveState('Sauvegarde...', 'pending');
  if (autosaveTimer) clearTimeout(autosaveTimer);
  autosaveTimer = setTimeout(() => {
    savePolitique({ publish: false, silent: true, refresh: false });
  }, 700);
}

let bound = false;

export function bindPolitiqueActions() {
  if (bound) return;
  bound = true;

  document.addEventListener('click', handlePolitiqueClick, true);
  document.addEventListener('input', handlePolitiqueInput, true);

  window.cstPolSave = () => savePolitique({ publish: false, refresh: true });
  window.cstPolPublish = () => publishPolitique();
  window.cstPolFocusEditor = () => focusPolitiqueEditor();
  window.cstPolAddAxe = () => addPolitiqueAxe();
  window.cstPolAddSignature = () => addPolitiqueSignature();
  window.cstPolExportPdf = () => exportPolitiquePdf();
  window.cstPolExportWord = () => exportPolitiqueWord();
  window.cstPolPrint = () => printPolitiqueDocument();
  window.cstPolOpenMeta = () => openPolitiqueMetaModal();
}

export function handlePolitiqueModalSave(btn) {
  if (btn?.dataset?.cstEntity === 'politique-meta') {
    savePolitiqueMetaFromModal();
    return true;
  }
  return false;
}
