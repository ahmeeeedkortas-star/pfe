/**
 * Édition document — éditeur riche ISO.
 */
import { renderRichEditorHtml } from '../../components/cst/cst-rich-editor.js';
import { getDocById } from './doc-store.js';
import { IMPORT_ACCEPT_ATTR } from './doc-import-utils.js';
import { renderDocMetaFields } from './doc-meta-fields.js';
import { renderDocCreatePage } from './doc-create.page.js';

export function renderDocEditPage() {
  const id = window.doc_sel;
  const d = getDocById(id);
  if (!d) return renderDocCreatePage();
  if (d.statut === 'Obsolète' || d.statut === 'Archivé') {
    return `<div class="card" style="padding:32px;text-align:center">
      <div style="font-size:32px;margin-bottom:12px">🔒</div>
      <h2 style="font-size:16px;margin-bottom:8px">Document non modifiable</h2>
      <p style="font-size:12px;color:#64748b;margin-bottom:16px">Statut : ${d.statut} — conservé pour traçabilité ISO</p>
      <button type="button" onclick="goPage('doc-read')" class="btn bp bsm">← Consulter</button>
    </div>`;
  }

  const editorId = `doc-editor-${id}`;
  window.__docEditorId = editorId;

  return `
  <div class="doc-page">
    <div class="doc-page-header">
      <button type="button" onclick="window.doc_sel='${id}';goPage('doc-read')" class="btn bsm doc-btn-back">← Annuler</button>
      <div class="doc-page-title-wrap">
        <h1 class="doc-page-title">Modifier — ${d.titre}</h1>
        <p class="doc-page-sub">${d.code || d.id} · ${d.version} · ${d.statut}</p>
      </div>
      <div class="doc-page-actions">
        <span id="doc-autosave-hint" class="doc-autosave-hint">Sauvegarde auto activée</span>
        <button type="button" onclick="docSaveEdit('${id}')" class="btn bp bsm doc-btn-save">✓ Enregistrer</button>
      </div>
    </div>

    <div class="doc-editor-layout">
      <div class="doc-editor-main">
        ${renderRichEditorHtml(editorId, d.content || '<p>Commencez à rédiger…</p>')}
        <div class="doc-import-bar" style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:10px;padding:10px;background:#f8fafc;border-radius:8px">
          <label class="doc-import-link btn bsm" style="cursor:pointer">
            📎 Importer fichier
            <input type="file" accept="${IMPORT_ACCEPT_ATTR},.txt,.html,.htm" onchange="docImportFile(this,'${id}')" style="display:none">
          </label>
          <button type="button" onclick="docBumpMinor('${id}')" class="btn bsm" title="Version mineure V1.0 → V1.1">+ Mineure</button>
          <button type="button" onclick="docBumpMajor('${id}')" class="btn bsm" title="Version majeure V1.x → V2.0">+ Majeure</button>
        </div>
      </div>
      <aside class="doc-meta-panel card">
        <div class="ct doc-meta-panel-title">ℹ Propriétés ISO</div>
        ${renderDocMetaFields('edit-', d)}
        <div class="doc-meta-field">
          <label class="doc-meta-label">Motif de révision</label>
          <input id="edit-revision-motif" class="fi" placeholder="Ex : Mise à jour procédure…" style="width:100%">
        </div>
        <div class="doc-meta-actions">
          <button type="button" onclick="docSaveEdit('${id}')" class="btn bp bsm doc-btn-save" style="width:100%;justify-content:center">✓ Enregistrer les modifications</button>
        </div>
      </aside>
    </div>
  </div>`;
}
