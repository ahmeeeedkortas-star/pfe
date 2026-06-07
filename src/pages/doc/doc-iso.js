/**
 * Moteur workflow documentaire ISO 9001 / 14001 / 45001.
 */
import {
  bumpVersionMajor,
  bumpVersionMinor,
  normalizeDocument,
  persistDocData,
  todayFr,
} from './doc-store.js';

export const ISO_WORKFLOW_STEPS = [
  { id: 1, label: 'Création', icon: '📝' },
  { id: 2, label: 'Révision', icon: '🔄' },
  { id: 3, label: 'Approbation', icon: '✅' },
  { id: 4, label: 'Publication', icon: '📢' },
  { id: 5, label: 'Distribution', icon: '📤' },
  { id: 6, label: 'Mise à jour', icon: '✏' },
  { id: 7, label: 'Archivage', icon: '🗄' },
];

export const ISO_STATUSES = ['Brouillon', 'En révision', 'Approuvé', 'Obsolète', 'Archivé'];

const LEGACY_STATUS_MAP = {
  Validé: 'Approuvé',
  Actif: 'Approuvé',
  'En validation': 'En révision',
};

export function mapLegacyStatus(statut) {
  return LEGACY_STATUS_MAP[statut] || statut;
}

export function isActiveDocument(d) {
  return d && d.statut === 'Approuvé' && d.isCurrent !== false;
}

export function isObsoleteOrArchived(d) {
  return d && (d.statut === 'Obsolète' || d.statut === 'Archivé');
}

export function canEditDocument(d) {
  if (!d) return false;
  return !isObsoleteOrArchived(d);
}

export function canDeleteDocument(d) {
  if (!d) return false;
  return d.statut !== 'Archivé' && d.statut !== 'Obsolète';
}

export function addAuditEntry(doc, action, user, comment = '') {
  doc.auditTrail = doc.auditTrail || [];
  doc.auditTrail.unshift({
    step: doc.wfStep || 1,
    action,
    user: user || doc.auteur || '—',
    date: todayFr(),
    comment,
  });
}

export function createVersionSnapshot(doc, motif = 'Publication version') {
  doc.versionSnapshots = doc.versionSnapshots || [];
  doc.versionSnapshots.unshift({
    version: doc.version,
    content: doc.content,
    importedFile: doc.importedFile,
    importedType: doc.importedType,
    importedContent: doc.importedContent,
    date: doc.dateMaj || todayFr(),
    auteur: doc.auteur || doc.resp,
    motif,
    approvedBy: doc.approbateur || doc.validatedBy,
    approvedAt: doc.dateApprobation || doc.dateMaj,
  });
}

export function markObsoleteSiblings(doc) {
  if (!doc.code) return;
  (window.DOC_DATA || []).forEach((other) => {
    if (other.id === doc.id) return;
    if (other.code !== doc.code) return;
    if (other.statut !== 'Approuvé') return;
    other.statut = 'Obsolète';
    other.isCurrent = false;
    other.dateMaj = todayFr();
    addAuditEntry(other, 'Rendu obsolète', doc.approbateur || doc.resp, `Remplacé par ${doc.version}`);
  });
}

export function submitForReview(id, user) {
  const d = (window.DOC_DATA || []).find((x) => x.id === id);
  if (!d || !canEditDocument(d)) return { ok: false, msg: 'Document non modifiable' };
  d.statut = 'En révision';
  d.wfStep = 2;
  d.dateRevision = todayFr();
  d.dateMaj = todayFr();
  addAuditEntry(d, 'Soumis en révision', user, 'Document transmis pour révision');
  persistDocData();
  return { ok: true };
}

export function advanceWorkflow(id, user) {
  const d = (window.DOC_DATA || []).find((x) => x.id === id);
  if (!d || isObsoleteOrArchived(d)) return { ok: false, msg: 'Document verrouillé' };

  const step = Math.min((d.wfStep || 1) + 1, 7);
  d.wfStep = step;
  d.dateMaj = todayFr();

  if (step === 2) d.statut = 'En révision';
  if (step === 3) d.statut = 'En révision';
  if (step >= 4 && step < 7) d.statut = 'En révision';

  addAuditEntry(d, `Étape ${step} — ${ISO_WORKFLOW_STEPS[step - 1]?.label}`, user);
  persistDocData();
  return { ok: true, step };
}

export function approveDocument(id, approver, comment = '') {
  const d = (window.DOC_DATA || []).find((x) => x.id === id);
  if (!d || isObsoleteOrArchived(d)) return { ok: false, msg: 'Document non approuvable' };

  const hadPriorApproval = d.statut === 'Approuvé';
  const versionChanged =
    d._pendingVersion && d._pendingVersion !== d.version;

  if (!hadPriorApproval || versionChanged) {
    createVersionSnapshot(
      d,
      d._pendingMotif || (hadPriorApproval ? 'Nouvelle version approuvée' : 'Approbation initiale')
    );
  }

  if (versionChanged && d._pendingVersion) {
    d.history = d.history || [];
    const alreadyLogged = d.history.some((h) => h.v === d._pendingVersion);
    if (!alreadyLogged) {
      d.history.unshift({
        v: d._pendingVersion,
        date: todayFr(),
        auteur: d.auteur || d.resp,
        motif: d._pendingMotif || 'Révision approuvée',
      });
    }
    d.version = d._pendingVersion;
    delete d._pendingVersion;
    delete d._pendingMotif;
  } else if (!hadPriorApproval) {
    d.history = d.history || [];
    const alreadyLogged = d.history.some((h) => h.v === d.version);
    if (!alreadyLogged) {
      d.history.unshift({
        v: d.version,
        date: todayFr(),
        auteur: d.auteur || d.resp,
        motif: 'Approbation initiale',
      });
    }
  }

  d.statut = 'Approuvé';
  d.wfStep = 5;
  d.isCurrent = true;
  d.approbateur = approver || d.approbateur || d.resp;
  d.validatedBy = d.approbateur;
  d.dateApprobation = todayFr();
  d.dateRevision = todayFr();
  d.dateMaj = todayFr();

  markObsoleteSiblings(d);
  addAuditEntry(d, 'Approbation & publication', d.approbateur, comment || 'Version en vigueur');
  persistDocData();
  return { ok: true };
}

export function rejectDocument(id, user, comment = '') {
  const d = (window.DOC_DATA || []).find((x) => x.id === id);
  if (!d) return { ok: false };
  d.statut = 'Brouillon';
  d.wfStep = 1;
  d.dateMaj = todayFr();
  addAuditEntry(d, 'Rejeté', user, comment || 'Retour en brouillon');
  persistDocData();
  return { ok: true };
}

export function archiveDocumentIso(id, user, reason = '') {
  const d = (window.DOC_DATA || []).find((x) => x.id === id);
  if (!d || d.statut === 'Archivé') return { ok: false };
  d.statut = 'Archivé';
  d.isCurrent = false;
  d.wfStep = 7;
  d.dateArchivage = todayFr();
  d.dateMaj = todayFr();
  addAuditEntry(d, 'Archivage', user, reason || 'Document archivé');
  persistDocData();
  return { ok: true };
}

export function prepareRevision(id, bumpType = 'minor', motif = '') {
  const d = (window.DOC_DATA || []).find((x) => x.id === id);
  if (!d || !canEditDocument(d)) return null;

  const nextVer =
    bumpType === 'major' ? bumpVersionMajor(d.version) : bumpVersionMinor(d.version);
  d._pendingVersion = nextVer;
  d._pendingMotif = motif || (bumpType === 'major' ? 'Révision majeure' : 'Modification mineure');
  d.statut = 'En révision';
  d.wfStep = 2;
  d.dateRevision = todayFr();
  d.dateMaj = todayFr();
  addAuditEntry(d, 'Révision initiée', d.auteur, `${d.version} → ${nextVer}`);
  persistDocData();
  return nextVer;
}

export function migrateAllDocuments() {
  window.DOC_DATA = (window.DOC_DATA || []).map((doc) => normalizeDocument(doc));
  persistDocData();
}

export function getWorkflowDocs() {
  return (window.DOC_DATA || []).filter(
    (d) => d.statut === 'Brouillon' || d.statut === 'En révision'
  );
}

export function getObsoleteDocs() {
  return (window.DOC_DATA || []).filter((d) => d.statut === 'Obsolète' || d.statut === 'Archivé');
}

export function getActiveDocs() {
  return (window.DOC_DATA || []).filter((d) => isActiveDocument(d));
}
