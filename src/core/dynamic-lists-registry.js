/**
 * Registre des listes dynamiques par module (clés + valeurs par défaut).
 */
import { NC_DEPARTEMENTS } from '../data/nc-departements.js';
import { NC_CAUSES_RACINES, NC_STADES_DETECTION } from '../data/nc-causes.js';
import { RC_DEPARTEMENTS } from '../data/rc-departements.js';

const AUDIT_DEFAULT_PROCESSES = [
  'Production',
  'Achat',
  'Développement',
  'Qualité',
  'Commercial',
  'RH',
  'Environnement',
  'Sécurité',
];

/** @typedef {{ windowKey?: string, label: string, defaults: string[], custom?: string }} ListConfig */

/** @type {Record<string, ListConfig>} */
export const DYNAMIC_LIST_REGISTRY = {
  /* ── Global ── */
  'global.responsibles': {
    windowKey: 'XM_RESPONSIBLES',
    label: 'Responsables',
    defaults: ['KORTAS.A', 'HSE Manager', 'HSE Officer', 'M. Karim', 'Ahmed Trabelsi'],
  },

  /* ── Audit ── */
  'audit.types': {
    windowKey: 'AUDIT_TYPES',
    label: "Types d'audit",
    defaults: ['ISO 9001', 'ISO 14001', 'ISO 45001', 'Interne'],
  },
  'audit.processes': {
    windowKey: 'AUDIT_PROCESSES',
    label: 'Processus',
    defaults: [...AUDIT_DEFAULT_PROCESSES],
  },
  'audit.auditors': { label: 'Auditeurs', defaults: [], custom: 'auditAuditors' },
  'audit.criticality': {
    windowKey: 'AUDIT_CRITICALITY',
    label: 'Criticité',
    defaults: ['Critique', 'Majeure', 'Mineure'],
  },
  'audit.norms': {
    windowKey: 'AUDIT_NORMS',
    label: 'Normes checklist',
    defaults: ['ISO 9001', 'ISO 14001', 'ISO 45001'],
  },
  'audit.docTypes': {
    windowKey: 'AUDIT_DOC_TYPES',
    label: 'Types de document',
    defaults: ['Rapport', 'Checklist', 'Preuve', 'Programme', 'Autre'],
  },
  'audit.actionStatus': {
    windowKey: 'AUDIT_ACTION_STATUS',
    label: 'Statut action',
    defaults: ['À faire', 'En cours', 'Terminée', 'Annulée'],
  },
  'audit.planStatus': {
    windowKey: 'AUDIT_PLAN_STATUS',
    label: 'Statut audit',
    defaults: ['Planifié', 'En cours', 'Terminé', 'En retard'],
  },

  /* ── NC ── */
  'nc.projects': { label: 'Projets NC', defaults: [], custom: 'ncProjects' },
  'nc.departments': {
    windowKey: 'NC_DEPARTEMENTS_LIST',
    label: 'Départements',
    defaults: [...NC_DEPARTEMENTS],
  },
  'nc.gravity': {
    windowKey: 'NC_GRAVITY_LIST',
    label: 'Gravité',
    defaults: ['Critique', 'Majeure', 'Mineure'],
  },
  'nc.status': {
    windowKey: 'NC_STATUS_LIST',
    label: 'Statut NC',
    defaults: ['Ouvert', 'En cours', 'Clôturé'],
  },
  'nc.detection': {
    windowKey: 'NC_DETECTION_LIST',
    label: 'Stade de détection',
    defaults: [...NC_STADES_DETECTION],
  },
  'nc.rootCauses': {
    windowKey: 'NC_CAUSES_LIST',
    label: 'Causes racines',
    defaults: [...NC_CAUSES_RACINES],
  },

  /* ── RC ── */
  'rc.projects': { label: 'Projets RC', defaults: [], custom: 'rcProjects' },
  'rc.clients': { label: 'Clients', defaults: [], custom: 'rcClients' },
  'rc.departments': {
    windowKey: 'RC_DEPARTEMENTS_LIST',
    label: 'Départements',
    defaults: [...RC_DEPARTEMENTS],
  },
  'rc.gravity': {
    windowKey: 'RC_GRAVITY_LIST',
    label: 'Gravité',
    defaults: ['Critique', 'Majeure', 'Mineure'],
  },
  'rc.priority': {
    windowKey: 'RC_PRIORITY_LIST',
    label: 'Priorité',
    defaults: ['Critique', 'Haute', 'Normale'],
  },

  /* ── 5S ── */
  'fives.zones': { label: 'Zones 5S', defaults: [], custom: 'fivesZones' },
  'fives.auditors': {
    windowKey: 'FIVES_AUDITORS',
    label: 'Auditeurs 5S',
    defaults: ['HSE Manager', 'HSE Officer', 'KORTAS.A', 'Sami Gharbi', 'Karim Ben Salah'],
  },
  'fives.responsibles': { label: 'Responsables 5S', defaults: [], custom: 'fivesResps' },
  'fives.gravity': {
    windowKey: 'FIVES_GRAVITY',
    label: 'Gravité écart',
    defaults: ['Majeure', 'Moyenne', 'Mineure'],
  },
  'fives.priority': {
    windowKey: 'FIVES_PRIORITY',
    label: 'Priorité',
    defaults: ['Normale', 'Haute', 'Critique'],
  },
  'fives.actionTypes': {
    windowKey: 'FIVES_ACTION_TYPES',
    label: "Type d'action",
    defaults: ['Corrective', 'Préventive', 'Amélioration'],
  },
  'fives.auditStatus': {
    windowKey: 'FIVES_AUDIT_STATUS',
    label: 'Statut audit 5S',
    defaults: ['Planifié', 'Réalisé', 'En retard'],
  },
  'fives.ecartStatus': {
    windowKey: 'FIVES_ECART_STATUS',
    label: 'Statut écart',
    defaults: ['Ouvert', 'En cours', 'Clôturé'],
  },
  'fives.actionStatus': {
    windowKey: 'FIVES_ACTION_STATUS',
    label: 'Statut action 5S',
    defaults: ['À faire', 'En cours', 'En retard', 'Clôturée'],
  },

  /* ── Documentation ── */
  'doc.types': {
    windowKey: 'DOC_TYPES_LIST',
    label: 'Type de document',
    defaults: ['Procédure', 'Instruction', 'Politique', 'Manuel Qualité', 'Processus', 'Formulaire', 'Enregistrement', 'Document technique'],
  },
  'doc.categories': {
    windowKey: 'DOC_CATEGORIES_LIST',
    label: 'Catégorie',
    defaults: ['Qualité', 'Sécurité', 'Environnement', 'SST', 'Production'],
  },
  'doc.processes': {
    windowKey: 'DOC_PROCESSES_LIST',
    label: 'Processus',
    defaults: ['Management', 'Qualité', 'Usinage', 'Maintenance', 'Achats'],
  },
  'doc.zones': {
    windowKey: 'DOC_ZONES_LIST',
    label: 'Zone',
    defaults: ['Direction', 'Atelier CNC', 'Qualité', 'Magasin', 'Maintenance'],
  },
  'doc.status': {
    windowKey: 'DOC_STATUS_LIST',
    label: 'Statut document',
    defaults: ['Brouillon', 'En révision', 'Approuvé', 'Obsolète', 'Archivé'],
  },
  'sec.docTypes': {
    windowKey: 'SEC_DOC_TYPES',
    label: 'Type document SST',
    defaults: ['Procédure', 'Instruction', 'Plan', 'Fiche', 'Checklist', 'Affichage', 'Formulaire', 'Guide'],
  },

  /* ── SST / EPI ── */
  'sec.epiTypes': {
    windowKey: 'SEC_EPI_TYPES',
    label: 'Types EPI',
    defaults: ['Casque', 'Gants', 'Lunettes', 'Chaussures', 'Harnais', 'Autre'],
  },

  /* ── CST ── */
  'cst.swot.processus': { label: 'Processus SWOT', defaults: [], custom: 'cstSwotProc' },
  'cst.swot.categories': { label: 'Catégories SWOT', defaults: [], custom: 'cstSwotCat' },
  'cst.risk.categories': {
    windowKey: 'CST_RISK_CATS',
    label: 'Catégories risques',
    defaults: ['Commercial', 'Fournisseur', 'Qualité', 'RH', 'Informatique', 'Sécurité', 'Environnement'],
  },
  'cst.opp.categories': {
    windowKey: 'CST_OPP_CATS',
    label: "Catégories opportunités",
    defaults: ['Commercial', 'Technologique', 'Partenariat', 'Marché', 'Innovation', 'Opportunité'],
  },
  'cst.pestel.types': {
    windowKey: 'CST_PESTEL_TYPES',
    label: 'Facteurs PESTEL',
    defaults: ['Politique', 'Économique', 'Social', 'Technologique', 'Environnemental', 'Légal'],
  },
  'cst.docTypes': {
    windowKey: 'CST_DOC_TYPES',
    label: 'Types document CST',
    defaults: ['Procédure', 'Politique', 'Manuel', 'Instruction', 'Enregistrement', 'Plan', 'Formulaire'],
  },
};
