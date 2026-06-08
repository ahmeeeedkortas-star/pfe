/**
 * Actions documentaires ISO — module Contexte & Stratégie.
 */
import { cstToast, cstRefresh } from '../../components/cst/cst-utils.js';
import {
  getFileExtension,
  getImportedType,
  IMPORT_ACCEPT_ATTR,
  isAcceptedImportExt,
  renderImportPreviewHtml,
  renderImportedContentView,
} from '../doc/doc-import-utils.js';
import {
  approveCstDocument,
  archiveCstDocument,
  buildNewCstDoc,
  prepareCstRevision,
} from './cst-document-iso.js';
import { initNewEntity } from '../../components/cst/cst-entity-revisions.js';
import {
  cstAfterMutation,
  getCstDocById,
  nextCstDocCode,
  nextCstDocId,
  todayCst,
} from './cst-store.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

export function cstDocDownload(id, versionIndex) {
  const d = getCstDocById(id);
  if (!d) return;

  let content = d.content;
  let importedContent = d.importedContent;
  let importedFile = d.importedFile;
  let titre = d.nom || d.titre;

  if (versionIndex !== undefined && d.versionSnapshots?.[versionIndex]) {
    const snap = d.versionSnapshots[versionIndex];
    content = snap.content;
    importedContent = snap.importedContent;
    importedFile = snap.importedFile;
    titre = `${titre} — ${snap.version}`;
  }

  if (importedContent && importedFile) {
    const a = document.createElement('a');
    a.href = importedContent;
    a.download = importedFile;
    a.click();
    return;
  }

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(titre)}</title>
    <style>body{font-family:Inter,Arial,sans-serif;padding:40px;line-height:1.7;color:#0f172a}</style></head>
    <body><h1>${esc(titre)}</h1>${content || '<p>—</p>'}</body></html>`;
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${d.code || d.id}-${String(titre).replace(/[^\w.-]+/g, '_').slice(0, 40)}.html`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

export function cstDocArchive(id) {
  const d = getCstDocById(id);
  if (!d) return;
  if (d.statut === 'Archivé') return;
  if (!confirm(`Archiver « ${d.nom} » ?\nLe document restera consultable dans les archives.`)) return;
  archiveCstDocument(id, d.approbateur || d.auteur, 'Archivage manuel');
  cstToast('Document archivé', '#64748b');
  cstRefresh(window.STATE?.page || 'cst-docs');
}

export function cstDocApprove(id) {
  const d = getCstDocById(id);
  if (!d) return;
  const comment = prompt("Commentaire d'approbation (optionnel) :", '') || '';
  const res = approveCstDocument(id, d.approbateur || d.auteur, comment);
  if (!res.ok) {
    cstToast(res.msg || 'Approbation impossible', '#dc2626');
    return;
  }
  cstToast(`${d.version} approuvée et en vigueur`, '#000080');
  cstRefresh(window.STATE?.page || 'cst-doc-read');
}

export function cstDocBumpVersion(id, type) {
  const d = getCstDocById(id);
  if (!d) return;
  const motif = prompt('Motif de la révision :', type === 'major' ? 'Révision majeure' : 'Modification mineure');
  if (motif === null) return;
  const next = prepareCstRevision(id, type, motif);
  if (!next) return;
  cstToast(`Révision préparée — ${next}`, '#2563eb');
  cstRefresh('cst-doc-read');
}

export function cstDocViewVersion(id, versionIndex) {
  const d = getCstDocById(id);
  if (!d?.versionSnapshots?.[versionIndex]) return;
  window.__cstDocVersionPreview = d.versionSnapshots[versionIndex];
  window.cst_doc_sel = id;
  cstRefresh('cst-doc-read');
}

export function cstDocClearVersionPreview() {
  window.__cstDocVersionPreview = null;
}

export function cstOpenImportModal(revueId = null) {
  const isRevue = !!revueId;
  const title = isRevue ? 'Importer un document de revue' : 'Importer un document SMI';
  const types = isRevue
    ? ['Compte rendu', 'Présentation', 'Analyse performance', 'Plan d\'actions', 'Rapport audit', 'KPI', 'Autre']
    : ['Procédure', 'Politique', 'Manuel', 'Instruction', 'Enregistrement', 'Formulaire', 'Plan'];

  const typeOpts = types.map((t) => `<option value="${esc(t)}">${esc(t)}</option>`).join('');

  const html = `<div class="fg full"><label class="fl">Fichier (PDF, Word, Excel, PowerPoint)</label>
    <input type="file" class="fi" id="cst_import_file" accept="${IMPORT_ACCEPT_ATTR}">
    <div id="cst_import_preview" style="margin-top:8px"></div></div>
    <div class="cst-field-grid">
      <div class="fg"><label class="fl" for="cst_import_nom">Titre</label><input class="fi" id="cst_import_nom"></div>
      <div class="fg"><label class="fl" for="cst_import_code">Code</label><input class="fi" id="cst_import_code" placeholder="Auto"></div>
    </div>
    <div class="cst-field-grid">
      <div class="fg"><label class="fl" for="cst_import_type">Type</label><select class="fi" id="cst_import_type">${typeOpts}</select></div>
      <div class="fg"><label class="fl" for="cst_import_ver">Version</label><input class="fi" id="cst_import_ver" value="V1.0"></div>
    </div>
    <div class="fg full"><label class="fl" for="cst_import_auteur">Auteur / Responsable</label><input class="fi" id="cst_import_auteur" value="Utilisateur"></div>
    <div class="fg full"><label class="fl" for="cst_import_desc">Description</label><textarea class="fi" id="cst_import_desc" rows="2"></textarea></div>
    <input type="hidden" id="cst_import_revue" value="${esc(revueId || '')}">`;

  document.body.insertAdjacentHTML(
    'beforeend',
    `<div id="cst_modal_overlay" class="xm-modal-overlay cst-modal-overlay" data-cst-modal>
      <div class="xm-modal-card cst-modal-card" style="max-width:620px">
        <div class="cst-modal-gradient">
          <div class="cst-modal-head">
            <div><div class="cst-modal-title">${title}</div><div class="cst-modal-sub">ISO 7.5 — Informations documentées</div></div>
            <button type="button" class="btn bsm cst-modal-close-btn" data-cst-import-close>✕</button>
          </div>
        </div>
        <div class="cst-modal-body">${html}</div>
        <div class="cst-modal-foot">
          <span></span>
          <div style="display:flex;gap:8px">
            <button type="button" class="btn bsm" data-cst-import-close>Annuler</button>
            <button type="button" class="btn bsm bp" data-cst-import-submit>Importer</button>
          </div>
        </div>
      </div>
    </div>`
  );

  const fileInput = document.getElementById('cst_import_file');
  fileInput?.addEventListener('change', () => {
    const f = fileInput.files?.[0];
    const preview = document.getElementById('cst_import_preview');
    if (!f || !preview) return;
    preview.innerHTML = renderImportPreviewHtml(f);
    const nom = document.getElementById('cst_import_nom');
    if (nom && !nom.value) {
      nom.value = f.name.replace(/\.[^.]+$/, '');
    }
  });
}

function closeImportModal() {
  document.getElementById('cst_modal_overlay')?.remove();
}

function submitCstImport() {
  const file = document.getElementById('cst_import_file')?.files?.[0];
  if (!file) {
    cstToast('Choisissez un fichier', '#dc2626');
    return;
  }
  const ext = getFileExtension(file.name);
  if (!isAcceptedImportExt(ext)) {
    alert('Formats acceptés : PDF, Word, Excel, PowerPoint');
    return;
  }

  const nom = document.getElementById('cst_import_nom')?.value?.trim();
  if (!nom) {
    cstToast('Le titre est obligatoire', '#dc2626');
    return;
  }

  const type = document.getElementById('cst_import_type')?.value || 'Procédure';
  const code = document.getElementById('cst_import_code')?.value?.trim() || nextCstDocCode(type);
  const version = document.getElementById('cst_import_ver')?.value?.trim() || 'V1.0';
  const auteur = document.getElementById('cst_import_auteur')?.value?.trim() || 'Utilisateur';
  const desc = document.getElementById('cst_import_desc')?.value?.trim() || '';
  const revueId = document.getElementById('cst_import_revue')?.value?.trim() || null;
  if (!revueId) {
    cstToast('Import réservé aux comptes rendus de revue', '#dc2626');
    return;
  }
  const now = todayCst();
  const id = nextCstDocId();

  const meta = {
    nom,
    type,
    code,
    version,
    auteur,
    desc,
    statut: 'Brouillon',
    motif: 'Import fichier',
    source: revueId ? 'revue' : 'cst-docs',
    revueId,
  };

  const reader = new FileReader();
  reader.onload = () => {
    const doc = buildNewCstDoc(meta, id, now);
    doc.importedFile = file.name;
    doc.importedType = getImportedType(ext);
    doc.importedContent = reader.result;
    doc.history[0].motif = 'Import fichier';

    const rev = (window.CST_REVUES || []).find((r) => r.id === revueId);
    if (rev) {
      rev.documents = rev.documents || [];
      rev.documents.push(doc);
      initNewEntity(doc);
    }
    cstAfterMutation('cst-revue', 'document-revue', `${revueId}/${id}`, 'Import compte rendu', `${nom} (${file.name})`, auteur);

    closeImportModal();
    cstToast('Pièce jointe ajoutée à la revue', '#000080');
    window.cst_selectedRev = revueId;
    window.cst_revueTab = 4;
    cstRefresh('cst-revue');
  };
  reader.onerror = () => cstToast('Erreur de lecture du fichier', '#dc2626');
  reader.readAsDataURL(file);
}

export function cstRevueDocDownload(revueId, docId) {
  const rev = (window.CST_REVUES || []).find((r) => r.id === revueId);
  const d = rev?.documents?.find((x) => String(x.id) === String(docId));
  if (!d?.importedContent || !d.importedFile) return;
  const a = document.createElement('a');
  a.href = d.importedContent;
  a.download = d.importedFile;
  a.click();
}

export function mountCstImportedPreviews() {
  document.querySelectorAll('[data-cst-imported]').forEach((el) => {
    const id = el.dataset.cstImported;
    const d = getCstDocById(id);
    if (d?.importedType === 'pdf') {
      const iframe = el.querySelector(`[data-cst-imported-iframe="${id}"]`);
      if (iframe && d.importedContent) iframe.src = d.importedContent;
    }
  });
}

let bound = false;

export function installCstDocumentActions() {
  if (bound) return;
  bound = true;

  window.cstDocDownload = cstDocDownload;
  window.cstDocArchive = cstDocArchive;
  window.cstDocApprove = cstDocApprove;
  window.cstDocBumpVersion = cstDocBumpVersion;
  window.cstDocViewVersion = cstDocViewVersion;
  window.cstDocClearVersionPreview = cstDocClearVersionPreview;
  window.cstOpenImportModal = cstOpenImportModal;
  window.cstRevueDocDownload = cstRevueDocDownload;
  window.mountCstImportedPreviews = mountCstImportedPreviews;
  window.renderCstImportedContentView = (d) => {
    if (!d) return '';
    const id = String(d.id);
    const html = renderImportedContentView({ ...d, id });
    return html
      .replace(/docDownload\('/g, `cstDocDownload('`)
      .replace(/data-doc-imported/g, 'data-cst-imported')
      .replace(/data-doc-imported-iframe/g, 'data-cst-imported-iframe');
  };

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-cst-import-close]') || (e.target.id === 'cst_modal_overlay' && e.target.closest('[data-cst-modal]'))) {
      if (document.getElementById('cst_import_file')) {
        closeImportModal();
        return;
      }
    }
    if (e.target.closest('[data-cst-import-submit]')) {
      submitCstImport();
      return;
    }
    const revImport = e.target.closest('[data-cst-revue-doc-import]');
    if (revImport) {
      cstOpenImportModal(revImport.dataset.cstRevueDocImport);
      return;
    }
    const revDl = e.target.closest('[data-cst-revue-doc-dl]');
    if (revDl) {
      cstRevueDocDownload(revDl.dataset.cstRevueDocDl, revDl.dataset.cstRevueDocId);
      return;
    }
  });
}

export function syncRevueDocToStore(doc, revueId) {
  const rev = (window.CST_REVUES || []).find((r) => r.id === revueId);
  if (!rev) return;
  const idx = (rev.documents || []).findIndex((x) => String(x.id) === String(doc.id));
  if (idx >= 0) rev.documents[idx] = { ...doc };
  persistCstData();
}
