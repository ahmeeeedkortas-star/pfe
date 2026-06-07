/**
 * Création document — éditeur riche + import ISO.
 */
import { renderRichEditorHtml } from '../../components/cst/cst-rich-editor.js';
import { IMPORT_ACCEPT_ATTR } from './doc-import-utils.js';
import { renderDocMetaFields } from './doc-meta-fields.js';

export function renderDocCreatePage() {
  const mode = window.docCreateMode || 'create';
  const draft = sessionStorage.getItem('doc_draft_new') || '<p>Commencez à rédiger votre document ici…</p>';
  const editorId = 'doc-editor-new';
  window.__docEditorId = editorId;

  return `
  <div class="doc-page">
    <div class="doc-page-header">
      <button type="button" onclick="goPage('doc-biblio')" class="btn bsm doc-btn-back">← Retour</button>
      <div class="doc-page-title-wrap">
        <h1 class="doc-page-title">Nouveau document</h1>
        <p class="doc-page-sub">Maîtrise documentaire ISO · éditeur intégré · sauvegarde automatique</p>
      </div>
      <div class="doc-page-actions">
        <span id="doc-autosave-hint" class="doc-autosave-hint">Brouillon local actif</span>
        <button type="button" onclick="docCreate()" class="btn bp bsm doc-btn-save">✓ Enregistrer</button>
      </div>
    </div>

    <div class="doc-mode-tabs">
      <button type="button" class="doc-mode-tab${mode === 'create' ? ' active' : ''}" onclick="docSetCreateMode('create')">✏ Rédiger</button>
      <button type="button" class="doc-mode-tab${mode === 'import' ? ' active' : ''}" onclick="docSetCreateMode('import')">📎 Importer fichier</button>
    </div>

    <div class="doc-editor-layout">
      <div class="doc-editor-main">
        ${
          mode === 'import'
            ? `
        <div class="doc-import-zone" id="import-zone-new">
          <div style="font-size:36px;margin-bottom:8px">📎</div>
          <div style="font-size:13px;font-weight:700;color:#0f172a;margin-bottom:4px">Importer un document existant</div>
          <div style="font-size:11px;color:#64748b;margin-bottom:12px">PDF · Word · Excel · PowerPoint — métadonnées + fichier associé</div>
          <label class="btn bp bsm" style="cursor:pointer">
            Choisir un fichier
            <input type="file" id="import-file-new" accept="${IMPORT_ACCEPT_ATTR}" onchange="docShowImport(this)" style="display:none">
          </label>
          <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px">
            <span style="font-size:10px;font-weight:700;background:#f0fdf4;color:#16a34a;padding:5px 12px;border-radius:20px;border:1px solid #86efac">📊 Excel</span>
            <span style="font-size:10px;font-weight:700;background:#eff6ff;color:#2563eb;padding:5px 12px;border-radius:20px;border:1px solid #bfdbfe">📄 Word</span>
            <span style="font-size:10px;font-weight:700;background:#fef2f2;color:#dc2626;padding:5px 12px;border-radius:20px;border:1px solid #fca5a5">📕 PDF</span>
            <span style="font-size:10px;font-weight:700;background:#fff7ed;color:#ea580c;padding:5px 12px;border-radius:20px;border:1px solid #fed7aa">📽 PowerPoint</span>
          </div>
          <div id="import-preview" style="display:none;margin-top:14px;padding:12px;border:1px solid #86efac;border-radius:8px;text-align:left"></div>
        </div>
        ${renderRichEditorHtml(editorId, '<p><em>Notes complémentaires (optionnel).</em></p>')}`
            : renderRichEditorHtml(editorId, draft)
        }
      </div>
      <aside class="doc-meta-panel card">
        <div class="ct doc-meta-panel-title">ℹ Propriétés ISO</div>
        ${renderDocMetaFields('new-')}
        <div style="font-size:10px;color:#64748b;margin:8px 0;padding:8px;background:#f8fafc;border-radius:8px">
          Statut initial : <strong>Brouillon</strong> · Workflow 7 étapes après création
        </div>
        <div class="doc-meta-actions">
          ${
            mode === 'import'
              ? `<button type="button" onclick="docCreateFromImport()" class="btn bp bsm doc-btn-save" style="width:100%;justify-content:center">✓ Créer depuis import</button>`
              : `<button type="button" onclick="docCreate()" class="btn bp bsm doc-btn-save" style="width:100%;justify-content:center">✓ Enregistrer le document</button>`
          }
        </div>
      </aside>
    </div>
  </div>`;
}

export const DOC_CREATE_EDITOR_ID = 'doc-editor-new';
