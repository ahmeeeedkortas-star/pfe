/** Registre documentaire Audit & Qualité (8 documents). */
import { canAutoSeed } from '../core/empty-platform.js';

export const AUDIT_DOCS_SEED = [
  {
    id: 1,
    code: 'QUA-PR-001',
    nom: 'Procédure de maîtrise des documents',
    cat: 'Qualité',
    type: 'Procédure',
    version: 'V3',
    auteur: 'KORTAS.A',
    date: '01/01/2025',
    statut: 'Validé',
    approbateur: 'Dir. Qualité',
    taille: '1,2 Mo',
    pages: 8,
    desc: 'Définit les règles de création, révision, approbation et diffusion des documents du SMQ.',
    content: [
      { h: "1. OBJET & DOMAINE D'APPLICATION", t: 'Cette procédure s\'applique à l\'ensemble des documents du système de management de la qualité.' },
      { h: '2. RESPONSABILITÉS', t: 'Le responsable qualité pilote le registre. Les process owners rédigent et proposent les révisions.' },
      { h: '3. PROCÉDURE DE CRÉATION', t: 'Identification du besoin, rédaction, revue technique, approbation et diffusion contrôlée.' },
      { h: '4. RÉVISION ET MISE À JOUR', t: 'Révision planifiée ou à l\'occasion d\'un changement significatif. Archivage des versions obsolètes.' },
    ],
  },
  {
    id: 2,
    code: 'QUA-PR-002',
    nom: 'Maîtrise des enregistrements',
    cat: 'Qualité',
    type: 'Procédure',
    version: 'V2',
    auteur: 'Y. Reda',
    date: '15/03/2025',
    statut: 'Validé',
    approbateur: 'Dir. Qualité',
    taille: '980 Ko',
    pages: 6,
    desc: 'Conservation, accessibilité et lisibilité des enregistrements qualité.',
    content: [
      { h: '1. OBJET', t: 'Assurer la traçabilité des activités qualité.' },
      { h: '2. DURÉE DE CONSERVATION', t: 'Selon matrice légale et exigences clients.' },
    ],
  },
  {
    id: 3,
    code: 'AUD-PR-001',
    nom: "Procédure d'audit interne",
    cat: 'Audit',
    type: 'Procédure',
    version: 'V4',
    auteur: 'KORTAS.A',
    date: '10/01/2025',
    statut: 'Validé',
    approbateur: 'Dir. Qualité',
    taille: '1,5 Mo',
    pages: 12,
    desc: 'Planification, préparation, réalisation et suivi des audits internes ISO 9001.',
    content: [
      { h: '1. PLANIFICATION', t: 'Programme annuel basé sur les risques et résultats précédents.' },
      { h: '2. PRÉPARATION', t: 'Checklist, périmètre, notification des audités.' },
      { h: '3. RÉALISATION', t: 'Entretiens, constats, classification NC / observations.' },
      { h: '4. RAPPORT', t: 'Rédaction sous 5 jours ouvrés, diffusion et plan d\'actions.' },
      { h: '5. SUIVI', t: 'Vérification de l\'efficacité des actions correctives.' },
    ],
  },
  {
    id: 4,
    code: 'AUD-IN-001',
    nom: 'Instruction — Qualification des auditeurs',
    cat: 'Audit',
    type: 'Instruction',
    version: 'V1',
    auteur: 'Y. Reda',
    date: '20/02/2025',
    statut: 'Validé',
    approbateur: 'Resp. Qualité',
    taille: '420 Ko',
    pages: 4,
    desc: 'Critères de compétence et maintien des habilitations auditeur interne.',
    content: [{ h: 'COMPÉTENCES', t: 'Formation initiale 16h, audit en binôme, évaluation annuelle.' }],
  },
  {
    id: 5,
    code: 'NC-PR-001',
    nom: 'Traitement des non-conformités',
    cat: 'Qualité',
    type: 'Procédure',
    version: 'V5',
    auteur: 'KORTAS.A',
    date: '05/04/2025',
    statut: 'Validé',
    approbateur: 'Dir. Qualité',
    taille: '1,1 Mo',
    pages: 9,
    desc: 'Détection, analyse, traitement et clôture des NC produit et processus.',
    content: [
      { h: '1. DÉTECTION', t: 'Tout collaborateur peut déclarer une NC.' },
      { h: '2. ANALYSE', t: '5 Pourquoi, 5M ou 8D selon gravité.' },
      { h: '3. TRAITEMENT', t: 'Actions immédiates et correctives.' },
      { h: '4. CLÔTURE', t: 'Vérification efficacité par le responsable qualité.' },
    ],
  },
  {
    id: 6,
    code: 'REV-CR-001',
    nom: 'Compte-rendu revue de direction 2025',
    cat: 'Direction',
    type: 'Enregistrement',
    version: 'V1',
    auteur: 'Direction',
    date: '28/02/2025',
    statut: 'Validé',
    approbateur: 'DG',
    taille: '2,3 Mo',
    pages: 18,
    desc: 'Synthèse des performances SMQ, audits, NC, actions et orientations stratégiques.',
    content: [{ h: 'DÉCISIONS', t: 'Renforcement audits processus critiques, objectif taux clôture 80%.' }],
  },
  {
    id: 7,
    code: 'HAB-FO-001',
    nom: 'Fiche habilitation auditeurs internes',
    cat: 'Formation',
    type: 'Formulaire',
    version: 'V2',
    auteur: 'RH Qualité',
    date: '01/06/2025',
    statut: 'En révision',
    approbateur: 'Resp. Qualité',
    taille: '180 Ko',
    pages: 2,
    desc: 'Registre des habilitations auditeurs avec périmètres et dates de validité.',
    content: [{ h: 'REGISTRE', t: 'KORTAS.A, Y. Reda, M. Karim — habilitations en cours de renouvellement.' }],
  },
  {
    id: 8,
    code: 'AME-PL-001',
    nom: "Plan d'amélioration continue 2025",
    cat: 'Amélioration',
    type: 'Plan',
    version: 'V1',
    auteur: 'KORTAS.A',
    date: '15/01/2025',
    statut: 'Validé',
    approbateur: 'Dir. Qualité',
    taille: '890 Ko',
    pages: 5,
    desc: 'Objectifs qualité, sécurité et environnement — indicateurs et jalons 2025.',
    content: [{ h: 'OBJECTIFS', t: 'Taux clôture audits 80%, réduction NC récurrentes, formation auditeurs.' }],
  },
];

export function seedAuditDocs() {
  if (!canAutoSeed()) {
    if (!window.AUDIT_DOCS) window.AUDIT_DOCS = [];
    if (window.AUDIT_DOC_SELECTED == null) window.AUDIT_DOC_SELECTED = null;
    if (!window.AUDIT_DOC_VIEWMODE) window.AUDIT_DOC_VIEWMODE = 'list';
    if (!window.AUDIT_DOC_FILTER) window.AUDIT_DOC_FILTER = { cat: '', statut: '', q: '' };
    return;
  }
  if (!window.AUDIT_DOCS?.length) {
    window.AUDIT_DOCS = AUDIT_DOCS_SEED.map((d) => ({
      ...d,
      content: (d.content || []).map((s) => ({ ...s })),
    }));
  }
  if (window.AUDIT_DOC_SELECTED == null) window.AUDIT_DOC_SELECTED = window.AUDIT_DOCS[0]?.id ?? 1;
  if (!window.AUDIT_DOC_VIEWMODE) window.AUDIT_DOC_VIEWMODE = 'list';
  if (!window.AUDIT_DOC_FILTER) window.AUDIT_DOC_FILTER = { cat: '', statut: '', q: '' };
}
