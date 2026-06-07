/**
 * Store Contexte & Stratégie — persistance localStorage et traçabilité ISO.
 */
const CST_STORAGE_KEY = 'qhse_cst_data_v1';

const LEGACY_STATUS_MAP = {
  Validé: 'Approuvé',
  Actif: 'Approuvé',
  'En validation': 'En révision',
};

export const CST_ISO_STATUSES = ['Brouillon', 'En révision', 'Approuvé', 'Obsolète', 'Archivé'];

export const CST_STATUS_COLORS = {
  Approuvé: '#16a34a',
  'En révision': '#f59e0b',
  Obsolète: '#dc2626',
  Archivé: '#64748b',
  Brouillon: '#94a3b8',
  Validé: '#16a34a',
};

export function todayCst() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

export function nowTimeCst() {
  return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

export function normalizeCstDocument(doc) {
  if (!doc) return doc;
  const d = { ...doc };
  if (LEGACY_STATUS_MAP[d.statut]) d.statut = LEGACY_STATUS_MAP[d.statut];
  d.nom = d.nom || d.titre || '';
  d.titre = d.titre || d.nom;
  if (!d.code) d.code = `CST-DOC-${d.id}`;
  if (!d.version) d.version = 'V1.0';
  if (!d.auteur) d.auteur = d.resp || 'Utilisateur';
  if (!d.dateMaj) d.dateMaj = d.date || todayCst();
  if (!d.dateCreation) d.dateCreation = d.dateMaj;
  if (!d.dateRevision) d.dateRevision = d.dateMaj;
  if (d.isCurrent === undefined) d.isCurrent = d.statut === 'Approuvé';
  d.auditTrail = d.auditTrail || [];
  d.versionSnapshots = d.versionSnapshots || [];
  d.history = d.history || [];
  d.wfStep = d.wfStep || (d.statut === 'Approuvé' ? 5 : 1);
  return d;
}

export function normalizeCstRevue(rev) {
  if (!rev) return rev;
  const r = { ...rev };
  r.documents = (r.documents || []).map((d) => normalizeCstDocument({ ...d, source: 'revue', revueId: r.id }));
  return r;
}

export function getCstDocById(id) {
  return (window.CST_DOCS || []).find((x) => String(x.id) === String(id));
}

export function nextCstDocId() {
  const list = window.CST_DOCS || [];
  let max = 0;
  list.forEach((d) => {
    const n = parseInt(String(d.id), 10);
    if (!Number.isNaN(n)) max = Math.max(max, n);
  });
  return max + 1;
}

export function nextCstDocCode(type = 'DOC') {
  const prefix = String(type || 'DOC')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 4)
    .toUpperCase() || 'DOC';
  const list = window.CST_DOCS || [];
  let max = 0;
  list.forEach((d) => {
    const m = String(d.code || '').match(new RegExp(`^${prefix}-(\\d+)$`, 'i'));
    if (m) max = Math.max(max, parseInt(m[1], 10));
  });
  return `${prefix}-${String(max + 1).padStart(3, '0')}`;
}

function serializeCstPayload() {
  return {
    CST_SWOT: window.CST_SWOT,
    CST_SWOT_META: window.CST_SWOT_META,
    CST_CONTEXTE: window.CST_CONTEXTE,
    CST_PESTEL: window.CST_PESTEL,
    CST_PARTIES: window.CST_PARTIES,
    CST_RISQUES: window.CST_RISQUES,
    CST_OBJECTIFS: window.CST_OBJECTIFS,
    CST_CHANGEMENTS: window.CST_CHANGEMENTS,
    CST_REVUES: window.CST_REVUES,
    CST_ACTIONS: window.CST_ACTIONS,
    CST_DOCS: window.CST_DOCS,
    CST_POLITIQUE: window.CST_POLITIQUE,
    CST_AUDIT_TRAIL: window.CST_AUDIT_TRAIL,
    cst_selectedRev: window.cst_selectedRev,
    cst_docsTab: window.cst_docsTab,
    cst_revueTab: window.cst_revueTab,
    cst_riskTab: window.cst_riskTab,
    cst_docsView: window.cst_docsView,
  };
}

export function persistCstData() {
  try {
    localStorage.setItem(CST_STORAGE_KEY, JSON.stringify(serializeCstPayload()));
  } catch {
    /* quota */
  }
}

export function loadCstFromStorage() {
  try {
    const raw = localStorage.getItem(CST_STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object') return false;

    const keys = [
      'CST_SWOT',
      'CST_SWOT_META',
      'CST_CONTEXTE',
      'CST_PESTEL',
      'CST_PARTIES',
      'CST_RISQUES',
      'CST_OBJECTIFS',
      'CST_CHANGEMENTS',
      'CST_REVUES',
      'CST_ACTIONS',
      'CST_DOCS',
      'CST_POLITIQUE',
      'CST_AUDIT_TRAIL',
    ];

    keys.forEach((k) => {
      if (data[k] !== undefined) window[k] = data[k];
    });

    if (window.CST_DOCS?.length) {
      window.CST_DOCS = window.CST_DOCS.map(normalizeCstDocument);
    }
    if (window.CST_REVUES?.length) {
      window.CST_REVUES = window.CST_REVUES.map(normalizeCstRevue);
    }
    if (!window.CST_AUDIT_TRAIL) window.CST_AUDIT_TRAIL = [];

    if (data.cst_selectedRev != null) window.cst_selectedRev = data.cst_selectedRev;
    if (data.cst_docsTab != null) window.cst_docsTab = data.cst_docsTab;
    if (data.cst_revueTab != null) window.cst_revueTab = data.cst_revueTab;
    if (data.cst_riskTab != null) window.cst_riskTab = data.cst_riskTab;
    if (data.cst_docsView != null) window.cst_docsView = data.cst_docsView;

    persistCstData();
    return true;
  } catch {
    return false;
  }
}

export function logCstAudit({ module, entity, entityId, action, user, details }) {
  window.CST_AUDIT_TRAIL = window.CST_AUDIT_TRAIL || [];
  window.CST_AUDIT_TRAIL.unshift({
    id: `aud-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    date: todayCst(),
    time: nowTimeCst(),
    module: module || 'cst',
    entity: entity || '—',
    entityId: entityId != null ? String(entityId) : '—',
    action: action || 'Modification',
    user: user || 'Utilisateur',
    details: details || '',
  });
  if (window.CST_AUDIT_TRAIL.length > 500) {
    window.CST_AUDIT_TRAIL = window.CST_AUDIT_TRAIL.slice(0, 500);
  }
}

export function cstAfterMutation(module, entity, entityId, action, details, user) {
  persistCstData();
  logCstAudit({ module, entity, entityId, action, user, details });
}

export function migrateCstDocsSeed() {
  if (!window.CST_DOCS?.length) return;
  window.CST_DOCS = window.CST_DOCS.map((d) => {
    const norm = normalizeCstDocument(d);
    if (!norm.history.length && norm.statut === 'Approuvé') {
      norm.history = [
        {
          v: norm.version,
          date: norm.dateMaj,
          auteur: norm.auteur,
          motif: 'Migration données existantes',
        },
      ];
    }
    return norm;
  });
}
