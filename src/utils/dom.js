/** Échappe le HTML pour éviter les injections XSS dans les templates. */
export function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function $(id) {
  return document.getElementById(id);
}

export function setHtml(id, html) {
  const el = $(id);
  if (el) el.innerHTML = html;
}
