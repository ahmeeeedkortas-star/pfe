/**
 * Post-rendu Documentation — éditeur, listes dynamiques, autosave, aperçu import.
 */
import { bindRichEditor } from '../../components/cst/cst-rich-editor.js';
import { bindDynamicFieldsInContainer } from '../../core/dynamic-lists.js';
import { scheduleDocAutosave } from './doc-actions.js';
import { getDocById } from './doc-store.js';
import { renderImportedContentView } from './doc-import-utils.js';

const DOC_EDITOR_PAGES = new Set(['doc-create', 'doc-edit']);

function bindDocImportedPreview() {
  const id = window.doc_sel;
  const d = getDocById(id);
  const preview = window.__docVersionPreview;

  const slot = document.getElementById(`doc-imported-slot-${id}`);
  if (!slot) return;

  if (preview?.importedContent) {
    slot.innerHTML = renderImportedContentView({ ...d, ...preview, id });
    if (preview.importedType === 'pdf') {
      const iframe = document.querySelector(`[data-doc-imported-iframe="${id}"]`);
      if (iframe) iframe.src = preview.importedContent;
    }
    return;
  }

  if (!d?.importedContent) return;

  slot.innerHTML = renderImportedContentView(d);

  if (d.importedType === 'pdf') {
    const iframe = document.querySelector(`[data-doc-imported-iframe="${id}"]`);
    if (iframe) iframe.src = d.importedContent;
  }

  const contentEl = document.getElementById(`doc-content-${id}`);
  if (contentEl && (d.importedType === 'pdf' || d.importedType === 'word' || d.importedType === 'excel' || d.importedType === 'ppt')) {
    contentEl.style.display = 'none';
  }
}

export function bindDocPageAfterRender(pageId) {
  const root = document.getElementById('content');
  if (!root) return;

  bindRichEditor();
  bindDynamicFieldsInContainer(root);

  if (pageId === 'doc-read') {
    requestAnimationFrame(() => bindDocImportedPreview());
  }

  if (!DOC_EDITOR_PAGES.has(pageId)) return;

  const editorId =
    pageId === 'doc-create'
      ? window.__docEditorId || 'doc-editor-new'
      : window.doc_sel
        ? `doc-editor-${window.doc_sel}`
        : null;
  const el = editorId ? document.getElementById(editorId) : null;
  if (!el) return;

  const docId = pageId === 'doc-edit' ? window.doc_sel : null;
  const onInput = () => scheduleDocAutosave(editorId, docId);
  el.addEventListener('input', onInput);
  el.addEventListener('blur', onInput);
}

/** @deprecated — lecture via renderDocReadPage */
export function enhanceDocReadHtml(html) {
  return html;
}
