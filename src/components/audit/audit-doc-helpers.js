/**
 * CRUD documents Audit — réutilise buildDocForm / docModal partagés.
 */
import { seedAuditDocs } from '../../data/audit-docs.data.js';
import { buildDocForm, collectDocSections, docModal } from '../sec/doc-helpers.js';

const TI = {
  Procédure: '📋',
  Instruction: '📝',
  Plan: '🗺',
  Enregistrement: '🗃',
  Formulaire: '📄',
  Guide: '📖',
};
const TC = {
  Procédure: '#2563eb',
  Instruction: '#7c3aed',
  Plan: '#dc2626',
  Enregistrement: '#059669',
  Formulaire: '#92400e',
  Guide: '#065f46',
};

function refresh() {
  window.reloadPage?.('doc-liste') ?? window.goPage?.('doc-liste');
}

function nextId(arr) {
  return arr.length ? Math.max(...arr.map((x) => x.id)) + 1 : 1;
}

export function auditDocView(id) {
  seedAuditDocs();
  window.AUDIT_DOC_SELECTED = id;
  window.AUDIT_DOC_VIEWMODE = 'list';
  refresh();
}

export function auditDocConsulter(id) {
  seedAuditDocs();
  window.AUDIT_DOC_SELECTED = id;
  window.AUDIT_DOC_VIEWMODE = 'content';
  refresh();
}

export function auditDocSetListMode() {
  window.AUDIT_DOC_VIEWMODE = 'list';
  refresh();
}

export function auditDocValidate(id) {
  const d = window.AUDIT_DOCS?.find((x) => x.id === id);
  if (!d) return;
  d.statut = 'Validé';
  window.confettiBurst?.(window.innerWidth / 2, window.innerHeight / 3, 20);
  window.xmToast?.('Document validé', d.code, 'check-circle', '#16a34a');
  refresh();
}

export function auditDocArchive(id) {
  const d = window.AUDIT_DOCS?.find((x) => x.id === id);
  if (!d) return;
  d.statut = 'Archivé';
  window.xmToast?.('Document archivé', d.code, 'folder', '#64748b');
  refresh();
}

export function auditDocAdd() {
  seedAuditDocs();
  docModal('+ Nouveau document audit', buildDocForm({ cat: 'Qualité' }), () => {
    const id = nextId(window.AUDIT_DOCS);
    window.AUDIT_DOCS.push({
      id,
      code: document.getElementById('dd-code').value,
      nom: document.getElementById('dd-nom').value,
      cat: document.getElementById('dd-cat').value,
      type: document.getElementById('dd-type').value,
      version: document.getElementById('dd-ver').value,
      auteur: document.getElementById('dd-aut').value,
      date: new Date().toLocaleDateString('fr-FR'),
      statut: document.getElementById('dd-stat').value,
      approbateur: '—',
      taille: '—',
      pages: parseInt(document.getElementById('dd-pages').value, 10) || 0,
      desc: document.getElementById('dd-desc').value,
      content: collectDocSections(),
    });
    window.AUDIT_DOC_SELECTED = id;
    window.xmToast?.('Document créé', '', 'check-circle', '#2563eb');
    refresh();
  });
}

export function auditDocEdit(id) {
  seedAuditDocs();
  const d = window.AUDIT_DOCS.find((x) => x.id === id);
  if (!d) return;
  docModal('Modifier — ' + d.code, buildDocForm(d), () => {
    Object.assign(d, {
      code: document.getElementById('dd-code').value,
      nom: document.getElementById('dd-nom').value,
      cat: document.getElementById('dd-cat').value,
      type: document.getElementById('dd-type').value,
      version: document.getElementById('dd-ver').value,
      auteur: document.getElementById('dd-aut').value,
      statut: document.getElementById('dd-stat').value,
      pages: parseInt(document.getElementById('dd-pages').value, 10) || 0,
      desc: document.getElementById('dd-desc').value,
      content: collectDocSections(),
    });
    window.xmToast?.('Document modifié', '', 'check-circle', '#2563eb');
    refresh();
  }, () => {
    const i = window.AUDIT_DOCS.findIndex((x) => x.id === id);
    if (i >= 0) window.AUDIT_DOCS.splice(i, 1);
    window.AUDIT_DOC_SELECTED = window.AUDIT_DOCS[0]?.id ?? null;
    window.xmToast?.('Document supprimé', '', 'x', '#dc2626');
    refresh();
  });
}

export function installAuditDocHelpers() {
  seedAuditDocs();
  Object.assign(window, {
    auditDocView,
    auditDocConsulter,
    auditDocSetListMode,
    auditDocAdd,
    auditDocEdit,
    auditDocValidate,
    auditDocArchive,
    auditDocTypeIcon: (t) => TI[t] || '📄',
    auditDocTypeColor: (t) => TC[t] || '#2563eb',
  });
}
