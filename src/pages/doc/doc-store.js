/**
 * Store Documentation QHSE — persistance et helpers ISO.
 */
const DOC_STORAGE_KEY = 'qhse_doc_data_v1';

export function todayFr() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

export function nextDocId() {
  const list = window.DOC_DATA || [];
  let max = 0;
  list.forEach((doc) => {
    const n = parseInt(String(doc.id).replace(/\D/g, ''), 10);
    if (!Number.isNaN(n)) max = Math.max(max, n);
  });
  return `DOC-${String(max + 1).padStart(3, '0')}`;
}

export function nextDocCode(type = 'DOC') {
  const prefix = String(type || 'DOC')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 4)
    .toUpperCase() || 'DOC';
  const list = window.DOC_DATA || [];
  let max = 0;
  list.forEach((doc) => {
    const m = String(doc.code || '').match(new RegExp(`^${prefix}-(\\d+)$`, 'i'));
    if (m) max = Math.max(max, parseInt(m[1], 10));
  });
  return `${prefix}-${String(max + 1).padStart(3, '0')}`;
}

export function getDocById(id) {
  return (window.DOC_DATA || []).find((x) => x.id === id);
}

export function getDocsByCode(code) {
  return (window.DOC_DATA || []).filter((x) => x.code === code);
}

export function persistDocData() {
  try {
    localStorage.setItem(DOC_STORAGE_KEY, JSON.stringify(window.DOC_DATA || []));
  } catch {
    /* quota */
  }
}

export function loadDocDataFromStorage() {
  try {
    const raw = localStorage.getItem(DOC_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length) {
      window.DOC_DATA = parsed.map((d) => normalizeDocument(d));
      persistDocData();
      return true;
    }
  } catch {
    /* ignore */
  }
  return false;
}

const LEGACY_STATUS_MAP = {
  Validé: 'Approuvé',
  Actif: 'Approuvé',
  'En validation': 'En révision',
};

export function normalizeDocument(doc) {
  if (!doc) return doc;
  const d = { ...doc };
  if (LEGACY_STATUS_MAP[d.statut]) d.statut = LEGACY_STATUS_MAP[d.statut];
  if (!d.code) d.code = d.id;
  if (!d.service) d.service = d.zone || 'Direction';
  if (!d.approbateur) d.approbateur = d.validatedBy || null;
  if (!d.dateRevision) d.dateRevision = d.dateMaj || d.dateCreation;
  if (d.isCurrent === undefined) d.isCurrent = d.statut === 'Approuvé';
  d.auditTrail = d.auditTrail || [];
  d.versionSnapshots = d.versionSnapshots || [];
  d.history = d.history || [];
  return d;
}

export function bumpVersion(ver) {
  return bumpVersionMinor(ver);
}

export function bumpVersionMinor(ver) {
  const m = String(ver || 'V1.0').match(/V?(\d+)\.(\d+)/i);
  if (!m) return 'V1.1';
  return `V${m[1]}.${parseInt(m[2], 10) + 1}`;
}

export function bumpVersionMajor(ver) {
  const m = String(ver || 'V1.0').match(/V?(\d+)\.(\d+)/i);
  if (!m) return 'V2.0';
  return `V${parseInt(m[1], 10) + 1}.0`;
}

export const DOC_TYPE_ICONS = {
  'Manuel Qualité': 'book',
  Procédure: 'clipboard',
  Processus: 'refresh',
  Instruction: 'file-text',
  Formulaire: 'table',
  Enregistrement: 'folder',
  Politique: 'shield',
  'Document technique': 'settings',
};

export const DOC_STATUS_COLORS = {
  Approuvé: '#16a34a',
  'En révision': '#f59e0b',
  Obsolète: '#dc2626',
  Archivé: '#64748b',
  Brouillon: '#94a3b8',
  /* legacy */
  Validé: '#16a34a',
  Actif: '#2563eb',
  'En validation': '#f59e0b',
};

export const DOC_TYPES_ISO = [
  'Procédure',
  'Instruction',
  'Formulaire',
  'Politique',
  'Manuel Qualité',
  'Enregistrement',
  'Processus',
  'Document technique',
];
