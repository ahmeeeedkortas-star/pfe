/** Helpers import fichiers — module Documentation ISO. */

export const DOC_IMPORT_EXTENSIONS = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];

export const DOC_IMPORT_BADGES = {
  excel: { label: 'Excel', color: '#16a34a', bg: '#f0fdf4', border: '#86efac', icon: '📊' },
  word: { label: 'Word', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', icon: '📄' },
  pdf: { label: 'PDF', color: '#dc2626', bg: '#fef2f2', border: '#fca5a5', icon: '📕' },
  ppt: { label: 'PowerPoint', color: '#ea580c', bg: '#fff7ed', border: '#fed7aa', icon: '📽' },
};

export function getFileExtension(name) {
  return (
    String(name || '')
      .split('.')
      .pop()
      ?.toLowerCase() || ''
  );
}

export function isAcceptedImportExt(ext) {
  return DOC_IMPORT_EXTENSIONS.includes(ext);
}

export function getImportedType(ext) {
  if (ext === 'pdf') return 'pdf';
  if (ext === 'doc' || ext === 'docx') return 'word';
  if (ext === 'xls' || ext === 'xlsx') return 'excel';
  if (ext === 'ppt' || ext === 'pptx') return 'ppt';
  return 'other';
}

export function formatFileSize(bytes) {
  const n = Number(bytes) || 0;
  if (n < 1024) return `${n} o`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export function renderImportPreviewHtml(file) {
  const ext = getFileExtension(file.name);
  const type = getImportedType(ext);
  const badge = DOC_IMPORT_BADGES[type] || DOC_IMPORT_BADGES.pdf;
  const name = String(file.name)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');

  return `<div style="display:flex;align-items:center;gap:10px">
    <span style="font-size:10px;font-weight:700;background:${badge.color}18;color:${badge.color};padding:5px 12px;border-radius:20px;white-space:nowrap">${badge.icon} ${badge.label}</span>
    <div style="flex:1;min-width:0">
      <div style="font-size:11px;font-weight:700;color:#0f172a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${name}</div>
      <div style="font-size:10px;color:${badge.color};margin-top:2px">${formatFileSize(file.size)}</div>
    </div>
  </div>`;
}

/** Aperçu doc-read selon type importé. */
export function renderImportedContentView(d) {
  if (!d?.importedContent) return '';

  const id = String(d.id || '').replace(/"/g, '&quot;');
  const file = String(d.importedFile || 'fichier').replace(/</g, '&lt;');

  if (d.importedType === 'pdf') {
    return `<div class="doc-imported-view doc-imported-view--pdf" data-doc-imported="${id}" style="margin-bottom:12px">
      <iframe data-doc-imported-iframe="${id}" title="Aperçu PDF — ${file}" style="width:100%;height:600px;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc"></iframe>
    </div>`;
  }

  if (d.importedType === 'word' || d.importedType === 'excel' || d.importedType === 'ppt') {
    const icons = { word: '📄', excel: '📊', ppt: '📽' };
    const labels = { word: 'Word', excel: 'Excel', ppt: 'PowerPoint' };
    const icon = icons[d.importedType] || '📎';
    const label = labels[d.importedType] || 'Fichier';
    return `<div class="doc-imported-view doc-imported-view--office" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:24px;margin-bottom:12px;text-align:center">
      <div style="font-size:32px;margin-bottom:8px">${icon}</div>
      <div style="font-size:12px;font-weight:700;color:#0f172a;margin-bottom:4px">${file}</div>
      <p style="font-size:11px;color:#64748b;margin:0 0 14px">Aperçu non disponible dans le navigateur (${label})</p>
      <button type="button" onclick="docDownload('${id}')" class="btn bp bsm">⬇ Télécharger</button>
    </div>`;
  }

  return '';
}

export function renderImportedTypeBadge(importedType) {
  const badge = DOC_IMPORT_BADGES[importedType];
  if (!badge) return '';
  return `<span style="font-size:8px;font-weight:700;background:${badge.color}18;color:${badge.color};padding:2px 7px;border-radius:10px;margin-left:5px;vertical-align:middle;white-space:nowrap">${badge.icon} ${badge.label}</span>`;
}

export const IMPORT_ACCEPT_ATTR = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx';
