import { installDocActions } from './doc-actions.js';
import { renderDocBiblioPage } from './doc-biblio.page.js';
import { renderDocCreatePage } from './doc-create.page.js';
import { renderDocEditPage } from './doc-edit.page.js';
import { renderDocHistoryPage } from './doc-history.page.js';
import { renderDocReadPage } from './doc-read.page.js';
import { renderDocWorkflowPage } from './doc-workflow.page.js';
import { migrateAllDocuments } from './doc-iso.js';
import { bindDocPageAfterRender } from './doc-enhance.js';
import { v11_doc_valid } from '../../modules-v11/generated/index.js';
import { loadDocDataFromStorage, persistDocData } from './doc-store.js';

export function ensureDocV11Data() {
  if (!window.doc_filter) window.doc_filter = { type: '', proc: '', zone: '', statut: '', q: '' };
  if (!window.doc_view) window.doc_view = 'grid';
  if (!window.doc_sel) window.doc_sel = 'DOC-001';

  if (loadDocDataFromStorage()) {
    migrateAllDocuments();
    return;
  }
  if (window.DOC_DATA?.length) {
    migrateAllDocuments();
    return;
  }

  window.DOC_DATA = [
    {
      id: 'DOC-001',
      code: 'MQ-001',
      titre: 'Manuel Qualité XPERT-MECA',
      type: 'Manuel Qualité',
      processus: 'Management',
      service: 'Direction',
      zone: 'Direction',
      version: 'V3.0',
      statut: 'Approuvé',
      dateCreation: '01/01/2024',
      dateRevision: '15/03/2026',
      dateMaj: '15/03/2026',
      dateApprobation: '15/03/2026',
      resp: 'KORTAS.A',
      auteur: 'KORTAS.A',
      approbateur: 'Direction',
      desc: 'Manuel du système de management intégré (ISO 9001, 14001, 45001)',
      content: '<h1>Manuel Qualité</h1><p>Contenu du manuel qualité.</p>',
      wfStep: 5,
      validatedBy: 'Direction',
      isCurrent: true,
      history: [{ v: 'V3.0', date: '15/03/2026', auteur: 'KORTAS.A', motif: 'Révision annuelle' }],
      auditTrail: [
        { step: 1, action: 'Création', user: 'KORTAS.A', date: '01/01/2024', comment: 'Création initiale' },
        { step: 3, action: 'Approbation & publication', user: 'Direction', date: '15/03/2026', comment: 'Version en vigueur' },
      ],
      versionSnapshots: [],
    },
    {
      id: 'DOC-002',
      code: 'PR-AUD-002',
      titre: 'Procédure Audit Interne',
      type: 'Procédure',
      processus: 'Qualité',
      service: 'Qualité',
      zone: 'Qualité',
      version: 'V2.1',
      statut: 'Approuvé',
      dateCreation: '10/02/2024',
      dateRevision: '14/03/2026',
      dateMaj: '14/03/2026',
      dateApprobation: '14/03/2026',
      resp: 'KORTAS.A',
      auteur: 'KORTAS.A',
      approbateur: 'KORTAS.A',
      desc: 'Procédure audit interne qualité ISO 9001',
      content: '<h1>Procédure Audit Interne</h1><p>Contenu de la procédure.</p>',
      wfStep: 5,
      validatedBy: 'KORTAS.A',
      isCurrent: true,
      history: [{ v: 'V2.1', date: '14/03/2026', auteur: 'KORTAS.A', motif: 'Ajout grille évaluation' }],
      auditTrail: [
        { step: 1, action: 'Création', user: 'KORTAS.A', date: '10/02/2024', comment: 'Création initiale' },
        { step: 3, action: 'Approbation & publication', user: 'KORTAS.A', date: '14/03/2026', comment: 'Version en vigueur' },
      ],
      versionSnapshots: [],
    },
    {
      id: 'DOC-003',
      code: 'IT-CNC-003',
      titre: 'Instruction Réglage CN01',
      type: 'Instruction',
      processus: 'Usinage',
      service: 'Atelier CNC',
      zone: 'Atelier CNC',
      version: 'V1.0',
      statut: 'En révision',
      dateCreation: '20/04/2026',
      dateRevision: '20/04/2026',
      dateMaj: '20/04/2026',
      resp: 'M. Karim',
      auteur: 'M. Karim',
      approbateur: 'KORTAS.A',
      desc: 'Instruction de travail réglage machine CNC',
      content: '<h1>Instruction Réglage</h1><p>Contenu instruction.</p>',
      wfStep: 3,
      validatedBy: null,
      isCurrent: false,
      history: [{ v: 'V1.0', date: '20/04/2026', auteur: 'M. Karim', motif: 'Création initiale' }],
      auditTrail: [
        { step: 1, action: 'Création', user: 'M. Karim', date: '20/04/2026', comment: 'Document créé' },
        { step: 2, action: 'Soumis en révision', user: 'M. Karim', date: '20/04/2026', comment: 'En attente approbation' },
      ],
      versionSnapshots: [],
    },
  ];
  persistDocData();
}

export function installDocV11Crud() {
  ensureDocV11Data();
  installDocActions();
}

function wrap(fn) {
  return () => {
    ensureDocV11Data();
    return fn();
  };
}

export function renderDocV11Create() {
  ensureDocV11Data();
  return renderDocCreatePage();
}

export function renderDocV11Edit() {
  ensureDocV11Data();
  return renderDocEditPage();
}

export function renderDocV11Read() {
  ensureDocV11Data();
  return renderDocReadPage();
}

export const renderDocV11Biblio = wrap(renderDocBiblioPage);

export function renderDocV11Workflow() {
  ensureDocV11Data();
  return renderDocWorkflowPage();
}

export const renderDocV11History = wrap(renderDocHistoryPage);
export const renderDocV11Valid = wrap(v11_doc_valid);

export function bindDocV11Page(pageId) {
  bindDocPageAfterRender(pageId);
}
