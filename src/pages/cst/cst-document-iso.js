/**
 * Moteur documentaire ISO — module Contexte & Stratégie.
 */
import {
  cstAfterMutation,
  normalizeCstDocument,
  persistCstData,
  todayCst,
} from './cst-store.js';

function bumpVersionMinor(ver) {
  const m = String(ver || 'V1.0').match(/V?(\d+)\.(\d+)/i);
  if (!m) {
    const n = String(ver || '01').match(/^(\d+)$/);
    if (n) return String(parseInt(n[1], 10) + 1).padStart(2, '0');
    return 'V1.1';
  }
  return `V${m[1]}.${parseInt(m[2], 10) + 1}`;
}

function bumpVersionMajor(ver) {
  const m = String(ver || 'V1.0').match(/V?(\d+)\.(\d+)/i);
  if (!m) return 'V2.0';
  return `V${parseInt(m[1], 10) + 1}.0`;
}

export const CST_WORKFLOW_STEPS = [
  { id: 1, label: 'Création', icon: '📝' },
  { id: 2, label: 'Révision', icon: '🔄' },
  { id: 3, label: 'Approbation', icon: '✅' },
  { id: 4, label: 'Publication', icon: '📢' },
  { id: 5, label: 'Distribution', icon: '📤' },
  { id: 6, label: 'Mise à jour', icon: '✏' },
  { id: 7, label: 'Archivage', icon: '🗄' },
];

export function isActiveCstDocument(d) {
  return d && d.statut === 'Approuvé' && d.isCurrent !== false;
}

export function isObsoleteOrArchivedCst(d) {
  return d && (d.statut === 'Obsolète' || d.statut === 'Archivé');
}

export function canEditCstDocument(d) {
  return d && !isObsoleteOrArchivedCst(d);
}

export function addCstDocAudit(doc, action, user, comment = '') {
  doc.auditTrail = doc.auditTrail || [];
  doc.auditTrail.unshift({
    step: doc.wfStep || 1,
    action,
    user: user || doc.auteur || '—',
    date: todayCst(),
    comment,
  });
}

export function createCstVersionSnapshot(doc, motif = 'Publication version') {
  doc.versionSnapshots = doc.versionSnapshots || [];
  doc.versionSnapshots.unshift({
    version: doc.version,
    content: doc.content,
    importedFile: doc.importedFile,
    importedType: doc.importedType,
    importedContent: doc.importedContent,
    date: doc.dateMaj || todayCst(),
    auteur: doc.auteur,
    motif,
    approvedBy: doc.approbateur,
    approvedAt: doc.dateApprobation || doc.dateMaj,
  });
}

export function markObsoleteCstSiblings(doc) {
  if (!doc.code) return;
  (window.CST_DOCS || []).forEach((other) => {
    if (String(other.id) === String(doc.id)) return;
    if (other.code !== doc.code) return;
    if (other.statut !== 'Approuvé') return;
    other.statut = 'Obsolète';
    other.isCurrent = false;
    other.dateMaj = todayCst();
    addCstDocAudit(other, 'Rendu obsolète', doc.approbateur || doc.auteur, `Remplacé par ${doc.version}`);
  });
}

export function approveCstDocument(id, approver, comment = '') {
  const d = (window.CST_DOCS || []).find((x) => String(x.id) === String(id));
  if (!d || isObsoleteOrArchivedCst(d)) return { ok: false, msg: 'Document non approuvable' };

  const hadPrior = d.statut === 'Approuvé';
  const versionChanged = d._pendingVersion && d._pendingVersion !== d.version;

  if (!hadPrior || versionChanged) {
    createCstVersionSnapshot(d, d._pendingMotif || (hadPrior ? 'Nouvelle version approuvée' : 'Approbation initiale'));
  }

  if (versionChanged && d._pendingVersion) {
    d.history = d.history || [];
    if (!d.history.some((h) => h.v === d._pendingVersion)) {
      d.history.unshift({
        v: d._pendingVersion,
        date: todayCst(),
        auteur: d.auteur,
        motif: d._pendingMotif || 'Révision approuvée',
      });
    }
    d.version = d._pendingVersion;
    delete d._pendingVersion;
    delete d._pendingMotif;
  } else if (!hadPrior) {
    d.history = d.history || [];
    if (!d.history.some((h) => h.v === d.version)) {
      d.history.unshift({
        v: d.version,
        date: todayCst(),
        auteur: d.auteur,
        motif: 'Approbation initiale',
      });
    }
  }

  d.statut = 'Approuvé';
  d.wfStep = 5;
  d.isCurrent = true;
  d.approbateur = approver || d.approbateur || d.auteur;
  d.dateApprobation = todayCst();
  d.dateRevision = todayCst();
  d.dateMaj = todayCst();
  d.date = d.dateMaj;

  markObsoleteCstSiblings(d);
  addCstDocAudit(d, 'Approbation & publication', d.approbateur, comment || 'Version en vigueur');
  cstAfterMutation('cst-docs', 'document', d.id, 'Approbation', `${d.nom} — ${d.version}`, d.approbateur);
  return { ok: true };
}

export function archiveCstDocument(id, user, reason = '') {
  const d = (window.CST_DOCS || []).find((x) => String(x.id) === String(id));
  if (!d || d.statut === 'Archivé') return { ok: false };
  d.statut = 'Archivé';
  d.isCurrent = false;
  d.wfStep = 7;
  d.dateArchivage = todayCst();
  d.dateMaj = todayCst();
  d.date = d.dateMaj;
  addCstDocAudit(d, 'Archivage', user, reason || 'Document archivé');
  cstAfterMutation('cst-docs', 'document', d.id, 'Archivage', reason || d.nom, user);
  return { ok: true };
}

export function prepareCstRevision(id, bumpType = 'minor', motif = '') {
  const d = (window.CST_DOCS || []).find((x) => String(x.id) === String(id));
  if (!d || !canEditCstDocument(d)) return null;

  const nextVer = bumpType === 'major' ? bumpVersionMajor(d.version) : bumpVersionMinor(d.version);
  d._pendingVersion = nextVer;
  d._pendingMotif = motif || (bumpType === 'major' ? 'Révision majeure' : 'Modification mineure');
  d.statut = 'En révision';
  d.wfStep = 2;
  d.dateRevision = todayCst();
  d.dateMaj = todayCst();
  d.date = d.dateMaj;
  addCstDocAudit(d, 'Révision initiée', d.auteur, `${d.version} → ${nextVer}`);
  persistCstData();
  return nextVer;
}

export function getActiveCstDocs() {
  return (window.CST_DOCS || []).filter((d) => isActiveCstDocument(d));
}

export function getArchivedCstDocs() {
  return (window.CST_DOCS || []).filter((d) => d.statut === 'Obsolète' || d.statut === 'Archivé');
}

export function buildNewCstDoc(meta, id, now) {
  return normalizeCstDocument({
    id,
    nom: meta.nom || meta.titre,
    titre: meta.nom || meta.titre,
    type: meta.type || 'Procédure',
    code: meta.code || `CST-${String(id).padStart(3, '0')}`,
    version: meta.version || 'V1.0',
    statut: meta.statut || 'Brouillon',
    auteur: meta.auteur || 'Utilisateur',
    approbateur: meta.approbateur || null,
    desc: meta.desc || '',
    date: now,
    dateCreation: now,
    dateMaj: now,
    dateRevision: now,
    content: meta.content || '',
    wfStep: 1,
    isCurrent: false,
    history: [
      {
        v: meta.version || 'V1.0',
        date: now,
        auteur: meta.auteur || 'Utilisateur',
        motif: meta.motif || 'Création',
      },
    ],
    auditTrail: [],
    versionSnapshots: [],
    source: meta.source || 'cst-docs',
    revueId: meta.revueId || null,
  });
}
