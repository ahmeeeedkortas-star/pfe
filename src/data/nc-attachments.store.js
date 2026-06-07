/**
 * Pièces jointes NC — métadonnées + contenu en localStorage (navigateur).
 */
const STORAGE_KEY = 'xm_nc_attachments';
const MAX_FILES = 5;
const MAX_BYTES = 2 * 1024 * 1024;

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeAll(map) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function getNcAttachments(ncRef) {
  const all = readAll();
  return all[ncRef] || [];
}

export function saveNcAttachments(ncRef, files) {
  const all = readAll();
  all[ncRef] = files;
  writeAll(all);
}

export function addNcAttachments(ncRef, newFiles) {
  const current = getNcAttachments(ncRef);
  const merged = [...current, ...newFiles].slice(0, MAX_FILES);
  saveNcAttachments(ncRef, merged);
  return merged;
}

/** Lit des File et retourne des entrées sérialisables */
export function readFilesAsAttachments(fileList) {
  const files = Array.from(fileList || []);
  const valid = files.filter((f) => f.size <= MAX_BYTES);
  if (valid.length < files.length) {
    window.xmToast?.('Fichier trop volumineux', 'Max 2 Mo par fichier', 'alert', '#dc2626');
  }
  return Promise.all(
    valid.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () =>
            resolve({
              name: file.name,
              type: file.type || 'application/octet-stream',
              size: file.size,
              addedAt: new Date().toISOString(),
              dataUrl: reader.result,
            });
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
    )
  );
}

export const NC_ATTACHMENT_LIMITS = { maxFiles: MAX_FILES, maxBytes: MAX_BYTES };
