/**
 * Actions globales — module Documentation ISO.
 */
import { getRichEditorHtml } from '../../components/cst/cst-rich-editor.js';
import { readXmDynamicSelect } from '../../core/dynamic-lists.js';
import {
  advanceWorkflow,
  approveDocument,
  archiveDocumentIso,
  prepareRevision,
  rejectDocument,
  submitForReview,
} from './doc-iso.js';
import {
  bumpVersionMajor,
  bumpVersionMinor,
  getDocById,
  nextDocCode,
  nextDocId,
  normalizeDocument,
  persistDocData,
  todayFr,
} from './doc-store.js';
import {
  getFileExtension,
  getImportedType,
  IMPORT_ACCEPT_ATTR,
  isAcceptedImportExt,
  renderImportPreviewHtml,
} from './doc-import-utils.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function collectMetaFromForm(prefix, existing = null) {
  const titre = document.getElementById(`${prefix}titre`)?.value?.trim();
  const code = document.getElementById(`${prefix}code`)?.value?.trim() || existing?.code;
  const type =
    readXmDynamicSelect(`${prefix}type`, 'doc.types') ||
    document.getElementById(`${prefix}type`)?.value ||
    existing?.type;
  const processus =
    readXmDynamicSelect(`${prefix}proc`, 'doc.processes') ||
    document.getElementById(`${prefix}proc`)?.value ||
    existing?.processus;
  const service =
    readXmDynamicSelect(`${prefix}service`, 'doc.zones') ||
    document.getElementById(`${prefix}service`)?.value ||
    existing?.service ||
    existing?.zone;
  const version = document.getElementById(`${prefix}version`)?.value?.trim() || existing?.version || 'V1.0';
  const auteur =
    readXmDynamicSelect(`${prefix}auteur`, 'global.responsibles') ||
    document.getElementById(`${prefix}auteur`)?.value?.trim() ||
    existing?.auteur;
  const approbateur =
    readXmDynamicSelect(`${prefix}approbateur`, 'global.responsibles') ||
    document.getElementById(`${prefix}approbateur`)?.value?.trim() ||
    existing?.approbateur;
  const resp = auteur || existing?.resp;
  const desc = document.getElementById(`${prefix}desc`)?.value?.trim() || '';
  const dateRevision = document.getElementById(`${prefix}date-revision`)?.value?.trim() || todayFr();
  return {
    titre,
    code,
    type,
    processus,
    service,
    zone: service,
    version,
    auteur,
    approbateur,
    resp,
    desc,
    dateRevision,
  };
}

function getEditorHtml(editorId) {
  if (editorId && document.getElementById(editorId)) {
    return getRichEditorHtml(editorId);
  }
  const legacy =
    document.getElementById('new-doc-editor') ||
    document.querySelector('[contenteditable][id^="doc-editor-"]');
  return legacy?.innerHTML?.trim() || '<p></p>';
}

function buildNewDocMeta(meta, id, now, editorId) {
  const code = meta.code || nextDocCode(meta.type);
  return normalizeDocument({
    id,
    code,
    titre: meta.titre,
    type: meta.type || 'Instruction',
    processus: meta.processus || 'Qualité',
    service: meta.service || 'Direction',
    zone: meta.service || 'Direction',
    version: meta.version,
    statut: 'Brouillon',
    dateCreation: now,
    dateRevision: meta.dateRevision || now,
    dateMaj: now,
    resp: meta.resp || 'KORTAS.A',
    auteur: meta.auteur || meta.resp || 'KORTAS.A',
    approbateur: meta.approbateur || null,
    desc: meta.desc,
    content: getEditorHtml(editorId),
    wfStep: 1,
    validatedBy: null,
    isCurrent: false,
    history: [
      {
        v: meta.version,
        date: now,
        auteur: meta.auteur || meta.resp || 'KORTAS.A',
        motif: 'Création initiale',
      },
    ],
    auditTrail: [
      {
        step: 1,
        action: 'Création',
        user: meta.auteur || meta.resp || 'KORTAS.A',
        date: now,
        comment: 'Document créé',
      },
    ],
    versionSnapshots: [],
  });
}

export function docCreate() {
  const meta = collectMetaFromForm('new-');
  if (!meta.titre) {
    window.xmToast?.('Le titre est obligatoire', '', 'alert', '#dc2626');
    return;
  }

  const mode = window.docCreateMode || 'create';
  const id = nextDocId();
  const now = todayFr();
  const editorId = window.__docEditorId || 'doc-editor-new';

  if (mode === 'import') {
    const file =
      document.getElementById('import-file-new')?.files?.[0] || window.__docImportFile;
    if (!file) {
      window.xmToast?.('Choisissez un fichier à importer', '', 'alert', '#dc2626');
      return;
    }
    const ext = getFileExtension(file.name);
    if (!isAcceptedImportExt(ext)) {
      alert(
        'Format non accepté. Formats autorisés : PDF, Word, Excel, PowerPoint (.ppt/.pptx)'
      );
      return;
    }

    const newDoc = buildNewDocMeta(meta, id, now, editorId);
    newDoc.importedFile = file.name;
    newDoc.importedType = getImportedType(ext);
    newDoc.importedContent = null;
    newDoc.history[0].motif = 'Import fichier';

    const reader = new FileReader();
    reader.onload = () => {
      newDoc.importedContent = reader.result;
      window.DOC_DATA = window.DOC_DATA || [];
      window.DOC_DATA.push(newDoc);
      window.doc_sel = id;
      persistDocData();
      sessionStorage.removeItem('doc_draft_new');
      window.__docImportFile = null;
      window.xmToast?.('Document importé', id, 'check-circle', '#16a34a');
      window.goPage?.('doc-read');
    };
    reader.onerror = () => {
      window.xmToast?.('Erreur de lecture du fichier', file.name, 'alert', '#dc2626');
    };
    reader.readAsDataURL(file);
    return;
  }

  const d = buildNewDocMeta(meta, id, now, editorId);
  window.DOC_DATA = window.DOC_DATA || [];
  window.DOC_DATA.push(d);
  window.doc_sel = id;
  persistDocData();
  sessionStorage.removeItem('doc_draft_new');
  window.xmToast?.('Document créé', id, 'check-circle', '#16a34a');
  window.goPage?.('doc-read');
}

export function docSaveEdit(id) {
  const d = getDocById(id);
  if (!d) return;
  if (d.statut === 'Obsolète' || d.statut === 'Archivé') {
    window.xmToast?.('Modification impossible', 'Document obsolète ou archivé', 'alert', '#dc2626');
    return;
  }

  const meta = collectMetaFromForm('edit-', d);
  const editorId = `doc-editor-${id}`;
  const newContent = getEditorHtml(editorId);
  const versionChanged = meta.version !== d.version;
  const motif = document.getElementById('edit-revision-motif')?.value?.trim() || 'Révision';

  d.titre = meta.titre || d.titre;
  d.code = meta.code || d.code;
  d.type = meta.type || d.type;
  d.processus = meta.processus || d.processus;
  d.service = meta.service || d.service;
  d.zone = meta.service || d.zone;
  d.resp = meta.resp || d.resp;
  d.auteur = meta.auteur || d.auteur;
  d.approbateur = meta.approbateur || d.approbateur;
  d.desc = meta.desc;
  d.content = newContent;
  d.dateMaj = todayFr();
  d.dateRevision = meta.dateRevision || d.dateRevision;

  if (versionChanged) {
    d._pendingVersion = meta.version;
    d._pendingMotif = motif;
    d.statut = 'En révision';
    d.wfStep = 2;
    d.auditTrail = d.auditTrail || [];
    d.auditTrail.unshift({
      step: 2,
      action: 'Révision enregistrée',
      user: meta.auteur || d.auteur,
      date: d.dateMaj,
      comment: motif,
    });
  }

  window.doc_sel = id;
  persistDocData();
  window.xmToast?.('Document enregistré', id, 'check-circle', '#16a34a');
  window.goPage?.('doc-read');
}

export function docValidate(id) {
  const d = getDocById(id);
  if (!d) return;
  const approver = d.approbateur || d.resp || 'KORTAS.A';
  const comment = prompt('Commentaire d\'approbation (optionnel) :', '') || '';
  const res = approveDocument(id, approver, comment);
  if (!res.ok) {
    window.xmToast?.('Approbation impossible', res.msg || '', 'alert', '#dc2626');
    return;
  }
  window.xmToast?.('Document approuvé', `${d.version} en vigueur`, 'check-circle', '#16a34a');
  window.reloadPage?.(window.STATE?.page || 'doc-biblio');
}

export function docAdvanceWorkflow(id) {
  const d = getDocById(id);
  if (!d) return;
  const user = d.auteur || d.resp || '—';
  const res = advanceWorkflow(id, user);
  if (!res.ok) {
    window.xmToast?.('Workflow bloqué', res.msg || '', 'alert', '#dc2626');
    return;
  }
  window.xmToast?.('Workflow avancé', `Étape ${res.step}/7`, 'refresh', '#2563eb');
  window.reloadPage?.(window.STATE?.page || 'doc-workflow');
}

export function docSubmitReview(id) {
  const d = getDocById(id);
  if (!d) return;
  const res = submitForReview(id, d.auteur || d.resp);
  if (!res.ok) {
    window.xmToast?.('Soumission impossible', res.msg || '', 'alert', '#dc2626');
    return;
  }
  window.xmToast?.('Soumis en révision', d.code || d.id, 'refresh', '#2563eb');
  window.reloadPage?.('doc-workflow');
}

export function docReject(id) {
  const d = getDocById(id);
  if (!d) return;
  const comment = prompt('Motif du rejet :', '') || 'Retour en brouillon';
  rejectDocument(id, d.approbateur || d.resp, comment);
  window.xmToast?.('Document rejeté', 'Retour en brouillon', 'alert', '#f59e0b');
  window.reloadPage?.('doc-workflow');
}

export function docBumpVersion(id, type) {
  const d = getDocById(id);
  if (!d) return;
  const motif = prompt('Motif de la révision :', type === 'major' ? 'Révision majeure' : 'Modification mineure');
  if (motif === null) return;
  const next = prepareRevision(id, type, motif);
  if (!next) return;
  const verInput = document.getElementById('edit-version');
  if (verInput) verInput.value = next;
  window.xmToast?.('Version préparée', next, 'refresh', '#2563eb');
}

export function docArchive(id) {
  const d = getDocById(id);
  if (!d) return;
  if (d.statut === 'Archivé') return;
  if (
    !confirm(
      `Archiver le document « ${d.titre} » ?\nIl sera conservé à des fins de traçabilité (accès restreint).`
    )
  )
    return;
  archiveDocumentIso(id, d.approbateur || d.resp, 'Archivage manuel');
  window.xmToast?.('Document archivé', d.id, 'archive', '#64748b');
  window.reloadPage?.(window.STATE?.page || 'doc-biblio');
}

export function docDelete(id) {
  const d = getDocById(id);
  if (!d) return;
  if (d.statut === 'Archivé' || d.statut === 'Obsolète') {
    window.xmToast?.(
      'Suppression impossible',
      'Document conservé pour traçabilité ISO',
      'alert',
      '#dc2626'
    );
    return;
  }
  if (!confirm(`Supprimer définitivement « ${d.titre} » ?`)) return;
  window.DOC_DATA = (window.DOC_DATA || []).filter((x) => x.id !== id);
  persistDocData();
  window.xmToast?.('Document supprimé', id, 'trash', '#dc2626');
  window.goPage?.('doc-biblio');
}

export function docViewVersion(id, versionIndex) {
  const d = getDocById(id);
  if (!d) return;
  const snap = d.versionSnapshots?.[versionIndex];
  if (!snap) return;
  window.__docVersionPreview = snap;
  window.doc_sel = id;
  window.goPage?.('doc-read');
}

export function docDownload(id, versionIndex) {
  const d = getDocById(id);
  if (!d) return;

  let content = d.content;
  let importedContent = d.importedContent;
  let importedFile = d.importedFile;
  let titre = d.titre;

  if (versionIndex !== undefined && d.versionSnapshots?.[versionIndex]) {
    const snap = d.versionSnapshots[versionIndex];
    content = snap.content;
    importedContent = snap.importedContent;
    importedFile = snap.importedFile;
    titre = `${d.titre} — ${snap.version}`;
  }

  if (importedContent && importedFile) {
    const a = document.createElement('a');
    a.href = importedContent;
    a.download = importedFile;
    a.click();
    return;
  }

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(titre)}</title>
    <style>body{font-family:Inter,Arial,sans-serif;padding:40px;line-height:1.7;color:#0f172a} table{border-collapse:collapse;width:100%} td,th{border:1px solid #cbd5e1;padding:8px}</style></head>
    <body><h1>${esc(titre)}</h1>${content || ''}</body></html>`;
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${d.id}-${titre.replace(/[^\w.-]+/g, '_').slice(0, 40)}.html`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

export function docPrint(id) {
  const d = getDocById(id);
  if (!d) return;
  const snap = window.__docVersionPreview;
  const content = snap?.content || d.content;
  const w = window.open('', '_blank');
  if (!w) {
    window.xmToast?.('Autorisez les popups pour imprimer', '', 'alert', '#dc2626');
    return;
  }
  w.document.write(
    `<!doctype html><html><head><title>${esc(d.titre)}</title></head><body>${content || ''}</body></html>`
  );
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 300);
}

export function docExportWord(id) {
  const d = getDocById(id);
  if (!d) return;
  const snap = window.__docVersionPreview;
  const content = snap?.content || d.content;
  const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta charset="utf-8"></head><body>${content || ''}</body></html>`;
  const blob = new Blob([html], { type: 'application/msword' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${d.id}.doc`;
  a.click();
}

export function docShowImport(input) {
  const file = input?.files?.[0];
  if (!file) return;

  const ext = getFileExtension(file.name);
  if (!isAcceptedImportExt(ext)) {
    alert('Format non accepté. Formats : PDF, Word, Excel, PowerPoint');
    if (input) input.value = '';
    window.__docImportFile = null;
    const preview = document.getElementById('import-preview');
    if (preview) preview.style.display = 'none';
    return;
  }

  const type = getImportedType(ext);
  const badge = { excel: ['#f0fdf4', '#86efac'], word: ['#eff6ff', '#bfdbfe'], pdf: ['#fef2f2', '#fca5a5'], ppt: ['#fff7ed', '#fed7aa'] };
  const colors = badge[type] || badge.pdf;
  const preview = document.getElementById('import-preview');
  if (preview) {
    preview.style.display = 'block';
    preview.style.background = colors[0];
    preview.style.borderColor = colors[1];
    preview.innerHTML = renderImportPreviewHtml(file);
  }

  window.__docImportFile = file;
  const titre = document.getElementById('new-titre');
  if (titre && !titre.value) titre.value = file.name.replace(/\.[^.]+$/, '');
  const code = document.getElementById('new-code');
  if (code && !code.value) {
    const base = file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9]/g, '-').slice(0, 12).toUpperCase();
    code.value = base || nextDocCode();
  }
}

export function docImportFile(input, docId) {
  const file = input?.files?.[0];
  if (!file) return;
  const d = getDocById(docId);
  if (!d) return;
  const ext = getFileExtension(file.name);
  if (!isAcceptedImportExt(ext) && ext !== 'txt' && ext !== 'html' && ext !== 'htm') {
    alert('Format non accepté.');
    input.value = '';
    return;
  }

  d.importedFile = file.name;
  d.importedType = getImportedType(ext);
  d.dateMaj = todayFr();

  if (ext === 'txt' || ext === 'html' || ext === 'htm') {
    const reader = new FileReader();
    reader.onload = () => {
      const editor = document.getElementById(`doc-editor-${docId}`);
      if (editor) editor.innerHTML = `<pre>${esc(reader.result)}</pre>`;
      persistDocData();
      window.xmToast?.('Contenu importé', file.name, 'check-circle', '#16a34a');
    };
    reader.readAsText(file);
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    d.importedContent = reader.result;
    persistDocData();
    window.xmToast?.('Fichier associé', file.name, 'paperclip', '#2563eb');
    window.reloadPage?.('doc-edit');
  };
  reader.readAsDataURL(file);
}

export function docCreateFromImport() {
  if (!window.__docImportFile) {
    window.xmToast?.('Choisissez un fichier', '', 'alert', '#dc2626');
    return;
  }
  window.docCreateMode = 'import';
  docCreate();
}

let docAutosaveTimer = null;

export function scheduleDocAutosave(editorId, docId) {
  clearTimeout(docAutosaveTimer);
  docAutosaveTimer = setTimeout(() => {
    const html = getRichEditorHtml(editorId);
    if (docId) {
      const d = getDocById(docId);
      if (d && d.statut !== 'Obsolète' && d.statut !== 'Archivé') {
        d.content = html;
        d.dateMaj = todayFr();
        persistDocData();
      }
    } else {
      sessionStorage.setItem('doc_draft_new', html);
    }
    const hint = document.getElementById('doc-autosave-hint');
    if (hint) {
      hint.textContent = `Enregistrement automatique — ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
    }
  }, 1800);
}

export function installDocActions() {
  window.docCreate = docCreate;
  window.docSaveEdit = docSaveEdit;
  window.docValidate = docValidate;
  window.docAdvanceWorkflow = docAdvanceWorkflow;
  window.docSubmitReview = docSubmitReview;
  window.docReject = docReject;
  window.docBumpVersion = docBumpVersion;
  window.docArchive = docArchive;
  window.docDelete = docDelete;
  window.docDownload = docDownload;
  window.docViewVersion = docViewVersion;
  window.docPrint = docPrint;
  window.docExportWord = docExportWord;
  window.docShowImport = docShowImport;
  window.docImportFile = docImportFile;
  window.docCreateFromImport = docCreateFromImport;
  window.scheduleDocAutosave = scheduleDocAutosave;
  window.docBumpMinor = (id) => docBumpVersion(id, 'minor');
  window.docBumpMajor = (id) => docBumpVersion(id, 'major');
  window.bumpVersionMinor = bumpVersionMinor;
  window.bumpVersionMajor = bumpVersionMajor;

  window.docOpen = function docOpen(id) {
    window.doc_sel = id;
    window.__docVersionPreview = null;
    window.goPage?.('doc-read');
  };

  window.docOpenEdit = function docOpenEdit(id) {
    const d = getDocById(id);
    if (d?.statut === 'Obsolète' || d?.statut === 'Archivé') {
      window.xmToast?.('Édition impossible', 'Document obsolète ou archivé', 'alert', '#dc2626');
      return;
    }
    window.doc_sel = id;
    window.goPage?.('doc-edit');
  };

  window.docSetCreateMode = function docSetCreateMode(mode) {
    window.docCreateMode = mode;
    window.reloadPage?.('doc-create');
  };
}
