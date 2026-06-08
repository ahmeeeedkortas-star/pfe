/** Données — module Contexte & Stratégie (SMI). */
import { canAutoSeed } from '../core/empty-platform.js';
import { calcCriticite, calcRiskNivFromCriticite } from '../components/cst/cst-utils.js';
import {
  loadCstFromStorage,
  migrateCstDocsSeed,
  normalizeCstRevue,
  persistCstData,
} from '../pages/cst/cst-store.js';

export const CST_CONTEXTE_SEED = {
  mission:
    'Concevoir et fabriquer des machines et équipements industriels sur mesure, en garantissant la satisfaction client et la performance QHSE.',
  vision: 'Être le partenaire de référence des industriels régionaux en solutions mécaniques intégrées.',
  perimetre:
    "Conception (BE), usinage CN, assemblage, contrôle qualité, maintenance et SAV des équipements fabriqués — sites XPERT MECA (Algérie). Exclusions : activités hors périmètre certifié indiquées au manuel SMI.",
  activites: 'Ingénierie, production, logistique, qualité, sécurité, environnement, achats et ressources humaines.',
  dateCreation: '01/01/2024',
  dateMaj: '01/05/2026',
};

export const CST_SWOT_META_SEED = {
  processus: ['Fabrication', "Bureau d'études", 'Qualité', 'Achats', 'Maintenance', 'Assemblage', 'Logistique'],
  categories: ['Ressources humaines', 'Processus', 'Marché', 'Technologie', 'Fournisseurs', 'Qualité', 'Sécurité'],
};

function swotItem(texte, processus = '', categorie = '', createdAt = '2026-01-01') {
  return { id: `sw-${Math.random().toString(36).slice(2, 9)}`, texte, processus, categorie, createdAt };
}

export const CST_SWOT_SEED = {
  forces: [
    'Expertise technique machines spéciales',
    "Bureau d'études intégré",
    'Équipe qualifiée et expérimentée',
    'Bonne réputation sur le marché régional',
  ],
  faiblesses: [
    'Retards sur certaines livraisons clients',
    'Standardisation limitée des processus',
    "Manque d'automatisation en production",
    'Dépendance à quelques fournisseurs critiques',
  ],
  opportunites: [
    'Digitalisation des processus qualité',
    'Ouverture vers de nouveaux marchés export',
    "Forte demande en solutions d'automatisation",
    'Partenariats stratégiques avec intégrateurs',
  ],
  menaces: [
    'Concurrence internationale accrue',
    'Fluctuation des prix des matières premières',
    'Retards et ruptures chez les fournisseurs',
    'Évolution rapide des technologies concurrentes',
  ],
};

export const CST_PESTEL_SEED = [
  {
    id: 'PST-001',
    facteur: 'Politique',
    ic: '🏛',
    col: '#2563eb',
    analyse:
      'Stabilité réglementaire favorable aux PME industrielles ; incitations à la modernisation des équipements.',
    impact: '+',
    action: 'Veille législative trimestrielle — mise à jour registre conformité.',
  },
  {
    id: 'PST-002',
    facteur: 'Économique',
    ic: '💰',
    col: '#000080',
    analyse:
      "Inflation modérée sur l'acier ; pression sur les marges clients automobile et aéronautique.",
    impact: '—',
    action: 'Renégociation contrats cadres — scénarios de coûts sur 12 mois.',
  },
  {
    id: 'PST-003',
    facteur: 'Social',
    ic: '👥',
    col: '#f59e0b',
    analyse:
      'Pénurie de profils CN qualifiés ; attentes élevées en matière de conditions de travail.',
    impact: '—',
    action: 'Plan de recrutement et formation interne — partenariat CFA.',
  },
  {
    id: 'PST-004',
    facteur: 'Technologique',
    ic: '⚙',
    col: '#7c3aed',
    analyse:
      "Montée de l'industrie 4.0 et des solutions robotisées sur les lignes d'assemblage.",
    impact: '+',
    action: 'Feuille de route digitalisation — pilote GMAO atelier CN.',
  },
  {
    id: 'PST-005',
    facteur: 'Environnemental',
    ic: '🌿',
    col: '#000080',
    analyse:
      'Renforcement des exigences clients sur bilan carbone et gestion des déchets.',
    impact: '—',
    action: 'Audit aspects environnementaux — objectif réduction kWh/machine.',
  },
  {
    id: 'PST-006',
    facteur: 'Légal',
    ic: '⚖',
    col: '#dc2626',
    analyse:
      'Évolution normes ISO 9001/14001/45001 ; obligations déclaratives renforcées.',
    impact: '—',
    action: 'Revue annuelle conformité légale — mise à jour DUERP et registres.',
  },
];

export const CST_PARTIES_SEED = [
  {
    id: 'PI-001',
    nom: 'Clients',
    besoin: 'Qualité, respect des délais, SAV réactif',
    exigences: 'ISO 9001, IATF selon contrats, délais OTIF, traçabilité matière',
    influence: 'Élevé',
    com: 'Réunions trimestrielles, enquêtes satisfaction, CRM',
    sat: 5,
    createdAt: '01/01/2026',
  },
  {
    id: 'PI-002',
    nom: 'Employés',
    besoin: 'Sécurité, formation, évolution de carrière',
    exigences: 'ISO 45001, DUERP à jour, habilitations, dialogue social',
    influence: 'Élevé',
    com: "Réunions d'équipe, intranet, affichage atelier",
    sat: 4,
    createdAt: '15/01/2026',
  },
  {
    id: 'PI-003',
    nom: 'Actionnaires',
    besoin: 'Rentabilité, performance et croissance',
    exigences: 'Indicateurs SMI, revue de direction, ROI projets stratégiques',
    influence: 'Élevé',
    com: 'Rapports mensuels, revues de direction',
    sat: 4,
    createdAt: '01/01/2026',
  },
  {
    id: 'PI-004',
    nom: 'Fournisseurs',
    besoin: 'Relations durables, paiements dans les délais',
    exigences: 'Évaluation fournisseurs, exigences matière, délais approvisionnement',
    influence: 'Moyen',
    com: 'Réunions annuelles, évaluations fournisseurs',
    sat: 3,
    createdAt: '01/01/2026',
  },
  {
    id: 'PI-005',
    nom: 'Autorités',
    besoin: 'Conformité réglementaire, respect des lois',
    exigences: 'Déclarations légales, registres environnement, visites conformité',
    influence: 'Élevé',
    com: 'Déclarations, audits externes, visites inspection',
    sat: 4,
    createdAt: '01/01/2026',
  },
  {
    id: 'PI-006',
    nom: 'Communauté locale',
    besoin: 'Protection environnement, emploi local',
    exigences: 'ISO 14001, gestion déchets, bruit et rejets maîtrisés',
    influence: 'Moyen',
    com: 'Réunions publiques, journées portes ouvertes',
    sat: 4,
    createdAt: '01/01/2026',
  },
];

function normalizeRisqueRow(r) {
  const gravite = r.gravite ?? r.proba ?? 1;
  const occurrence = r.occurrence ?? r.impact ?? 1;
  const criticite = r.criticite ?? calcCriticite(gravite, occurrence);
  return {
    ...r,
    enjeux: r.enjeux || r.desc || '',
    gravite,
    occurrence,
    criticite,
    niv: r.niv || calcRiskNivFromCriticite(criticite),
    cause: r.cause || '',
    consequence: r.consequence || '',
    responsable: r.responsable || '',
    datePrevue: r.datePrevue || '',
    dateRealisation: r.dateRealisation || '',
    evalEfficacite: r.evalEfficacite || '',
    validationEfficacite: r.validationEfficacite || '',
    createdAt: r.createdAt || '01/01/2026',
  };
}

export const CST_RISQUES_SEED = [
  {
    id: 'RSQ-001',
    enjeux: "Perte d'un client stratégique automobile",
    cat: 'Commercial',
    gravite: 5,
    occurrence: 2,
    niv: 'Élevé',
    statut: 'Actif',
    action: 'Plan de fidélisation — revue trimestrielle compte clé.',
    cause: 'Concurrence prix, retards livraison',
    consequence: 'Baisse CA, surcharge capacité',
    responsable: 'Dir. Commercial',
    datePrevue: '30/09/2026',
    dateRealisation: '',
    evalEfficacite: '',
    validationEfficacite: '',
    createdAt: '01/01/2026',
  },
  {
    id: 'RSQ-002',
    desc: "Rupture d'approvisionnement acier",
    cat: 'Fournisseur',
    proba: 3,
    impact: 4,
    niv: 'Élevé',
    statut: 'Actif',
    action: 'Double sourcing — stock sécurité 4 semaines.',
  },
  {
    id: 'RSQ-003',
    desc: 'Non-renouvellement certification ISO 9001',
    cat: 'Qualité',
    proba: 1,
    impact: 5,
    niv: 'Moyen',
    statut: 'Maîtrisé',
    action: 'Pré-audit interne T4 — correction écarts mineurs.',
  },
  {
    id: 'RSQ-004',
    desc: 'Départ de compétences clés BE/CN',
    cat: 'RH',
    proba: 3,
    impact: 3,
    niv: 'Moyen',
    statut: 'Actif',
    action: 'Documentation savoir-faire — plan succession postes clés.',
  },
  {
    id: 'RSQ-005',
    desc: 'Cyberattaque / perte de données techniques',
    cat: 'Informatique',
    proba: 2,
    impact: 4,
    niv: 'Élevé',
    statut: 'Actif',
    action: 'Sauvegardes quotidiennes — sensibilisation phishing.',
  },
  {
    id: 'OPP-001',
    desc: 'Marché automatisation industrielle en croissance',
    cat: 'Opportunité',
    proba: 4,
    impact: 5,
    niv: 'Élevé',
    statut: 'Suivi',
    action: 'Étude faisabilité cellule robotisée — business plan Q3.',
  },
  {
    id: 'OPP-002',
    desc: 'Export vers nouveaux marchés Maghreb',
    cat: 'Opportunité',
    proba: 3,
    impact: 4,
    niv: 'Moyen',
    statut: 'Suivi',
    action: 'Prospection commerciale — conformité export.',
  },
];

export const CST_OBJECTIFS_SEED = [
  {
    id: 1,
    objectif: 'Réduire les NC internes',
    indicateur: 'Taux de NC',
    cible: '-30%',
    etat: 'En cours',
    resp: 'K. Saïd',
    delai: '31/12/2026',
    prog: 60,
  },
  {
    id: 2,
    objectif: 'Améliorer la satisfaction client',
    indicateur: 'Satisfaction (%)',
    cible: '≥ 90%',
    etat: 'En cours',
    resp: 'M. Ahmed',
    delai: '31/12/2026',
    prog: 70,
  },
  {
    id: 3,
    objectif: 'Réduire les accidents du travail',
    indicateur: 'TF (Taux de fréquence)',
    cible: '-50%',
    etat: 'En cours',
    resp: 'A. Mohamed',
    delai: '31/12/2026',
    prog: 55,
  },
  {
    id: 4,
    objectif: 'Réduire la consommation énergétique',
    indicateur: 'kWh / machine',
    cible: '-15%',
    etat: 'En cours',
    resp: 'K. Saïd',
    delai: '31/12/2026',
    prog: 40,
  },
  {
    id: 5,
    objectif: 'Atteindre 100 % de recyclage déchets',
    indicateur: 'Taux de recyclage',
    cible: '100%',
    etat: 'En cours',
    resp: 'Y. Ahmed',
    delai: '31/12/2026',
    prog: 65,
  },
];

export const CST_CHANGEMENTS_SEED = [
  {
    id: 'CHG-001',
    changement: 'Nouveau produit robotisé sur ligne assemblage',
    origine: 'Commercial',
    impact: 'Processus, Compétences',
    niveau: 'Élevé',
    statut: 'En cours',
    delai: '20/06/2026',
  },
  {
    id: 'CHG-002',
    changement: 'Changement logiciel CAO SolidWorks → nouvelle version',
    origine: 'Méthodes',
    impact: 'Formation, Processus',
    niveau: 'Moyen',
    statut: 'En cours',
    delai: '15/07/2026',
  },
  {
    id: 'CHG-003',
    changement: 'Nouveau fournisseur acier certifié',
    origine: 'Achats',
    impact: 'Qualité, Coût',
    niveau: 'Moyen',
    statut: 'Validé',
    delai: '01/07/2026',
  },
  {
    id: 'CHG-004',
    changement: 'Réaménagement atelier usinage',
    origine: 'Production',
    impact: 'Sécurité, Organisation',
    niveau: 'Élevé',
    statut: 'En cours',
    delai: '25/06/2026',
  },
  {
    id: 'CHG-005',
    changement: 'Mise à jour exigences ISO 14001:2015',
    origine: 'QHSE',
    impact: 'Documentation, Processus',
    niveau: 'Moyen',
    statut: 'Planifié',
    delai: '30/06/2026',
  },
];

export const CST_REVUES_SEED = [
  {
    id: 'REV-2026-01',
    date: '15/05/2026',
    president: 'Directeur Général',
    participants: 8,
    statut: 'Terminée',
    entrees: [
      'Performance des processus',
      'Résultats des audits internes et externes',
      'État des actions correctives et préventives',
      'Risques et opportunités (matrice SMI)',
      'Satisfaction client et réclamations',
      'Performance QHSE (qualité, sécurité, environnement)',
      'Conformité légale et réglementaire',
      'Changements organisationnels et techniques',
    ],
    decisions: [
      'Renforcer le programme de formation sécurité',
      "Investir dans l'automatisation de l'atelier CN",
      'Améliorer la communication interne (newsletter mensuelle)',
      'Développer le marché export Maghreb',
    ],
    actions: [
      {
        action: 'Lancer programme formation sécurité renforcée',
        resp: 'A. Hadj-Ali',
        delai: '30/06/2026',
        statut: 'En cours',
      },
      {
        action: 'Étude automatisation atelier CN — chiffrage investissement',
        resp: 'Dir. Technique',
        delai: '31/07/2026',
        statut: 'En cours',
      },
      {
        action: 'Newsletter mensuelle interne — 1ère édition',
        resp: 'RH',
        delai: '01/06/2026',
        statut: 'Clôturée',
      },
    ],
  },
];

export const CST_ACTIONS_SEED = [
  {
    id: 'ACT-001',
    action: 'Mettre en place le double sourcing acier',
    origine: 'Risque RSQ-002',
    resp: 'K. Saïd',
    delai: '30/06/2026',
    priorite: 'Élevée',
    statut: 'En cours',
    prog: 60,
  },
  {
    id: 'ACT-002',
    action: 'Renforcer le contrôle qualité réception',
    origine: 'Revue de direction',
    resp: 'M. Ahmed',
    delai: '15/07/2026',
    priorite: 'Élevée',
    statut: 'En cours',
    prog: 45,
  },
  {
    id: 'ACT-003',
    action: 'Former les opérateurs aux consignes sécurité',
    origine: 'Objectif sécurité',
    resp: 'A. Mohamed',
    delai: '30/06/2026',
    priorite: 'Élevée',
    statut: 'En cours',
    prog: 70,
  },
  {
    id: 'ACT-004',
    action: 'Améliorer le tri et le recyclage des déchets',
    origine: 'Objectif environnement',
    resp: 'Y. Ahmed',
    delai: '31/08/2026',
    priorite: 'Moyenne',
    statut: 'À faire',
    prog: 0,
  },
  {
    id: 'ACT-005',
    action: 'Réduire les délais de livraison clients',
    origine: 'Objectif qualité',
    resp: 'K. Saïd',
    delai: '30/09/2026',
    priorite: 'Moyenne',
    statut: 'En retard',
    prog: 20,
  },
  {
    id: 'ACT-006',
    action: 'Déployer outil GMAO maintenance',
    origine: 'Plan stratégique SMI',
    resp: 'Dir. Tech.',
    delai: '31/12/2026',
    priorite: 'Élevée',
    statut: 'Planifié',
    prog: 0,
  },
];

export const CST_DOCS_SEED = [
  {
    id: 1,
    nom: 'Politique QHSE',
    type: 'Politique',
    code: 'POL-QSE-001',
    version: '03',
    date: '01/01/2026',
    statut: 'Validé',
  },
  {
    id: 2,
    nom: 'Manuel SMI',
    type: 'Manuel',
    code: 'MAN-SMI-001',
    version: '02',
    date: '15/12/2025',
    statut: 'Validé',
  },
  {
    id: 3,
    nom: 'Procédure revue de direction',
    type: 'Procédure',
    code: 'PR-SMI-008',
    version: '02',
    date: '10/12/2025',
    statut: 'Validé',
  },
  {
    id: 4,
    nom: 'Gestion des risques et opportunités',
    type: 'Procédure',
    code: 'PR-SMI-004',
    version: '04',
    date: '20/01/2026',
    statut: 'Validé',
  },
  {
    id: 5,
    nom: 'Gestion des changements',
    type: 'Procédure',
    code: 'PR-SMI-006',
    version: '03',
    date: '05/02/2026',
    statut: 'Validé',
  },
  {
    id: 6,
    nom: 'Cartographie des processus',
    type: 'Politique',
    code: 'POL-QSE-002',
    version: '01',
    date: '01/03/2026',
    statut: 'En révision',
  },
  {
    id: 7,
    nom: 'Instruction audit interne',
    type: 'Instruction',
    code: 'IN-AUD-001',
    version: '02',
    date: '10/04/2026',
    statut: 'Validé',
  },
  {
    id: 8,
    nom: 'Registre parties intéressées',
    type: 'Enregistrement',
    code: 'ENR-SMI-001',
    version: '01',
    date: '15/04/2026',
    statut: 'Validé',
  },
];

export const CST_POLITIQUE_SEED = {
  titre: 'Politique QHSE',
  sousTitre: 'Engagement de la direction — XPERT MECA',
  texte:
    "La direction de XPERT MECA s'engage à fournir des machines et équipements conformes aux exigences clients, à assurer la sécurité des personnes, à protéger l'environnement et à améliorer en permanence l'efficacité du système de management intégré.",
  contenuHtml:
    "<h2>Engagement de la direction</h2><p>La direction de <strong>XPERT MECA</strong> s'engage à fournir des machines et équipements conformes aux exigences clients, à assurer la sécurité des personnes, à protéger l'environnement et à améliorer en permanence l'efficacité du système de management intégré.</p><h3>Axes QHSE</h3><ul><li><strong>Qualité</strong> — Satisfaire les exigences clients et améliorer en continu nos processus.</li><li><strong>Sécurité</strong> — Prévenir les accidents et protéger la santé de nos collaborateurs.</li><li><strong>Environnement</strong> — Réduire notre empreinte et respecter la réglementation.</li><li><strong>Amélioration</strong> — Piloter la performance SMI par des objectifs mesurables.</li></ul>",
  dateCreation: '10/01/2024',
  dateMiseAJour: '01/01/2026',
  axes: [
    { titre: 'Qualité', ic: '🏆', texte: 'Satisfaire les exigences clients et améliorer en continu nos processus.' },
    { titre: 'Sécurité', ic: '🛡', texte: 'Prévenir les accidents et protéger la santé de nos collaborateurs.' },
    { titre: 'Environnement', ic: '🌿', texte: 'Réduire notre empreinte et respecter la réglementation environnementale.' },
    { titre: 'Amélioration', ic: '📈', texte: 'Piloter la performance SMI par des objectifs mesurables.' },
  ],
  signataire: 'Directeur Général',
  dateSignature: '01/01/2026',
  dernierePublication: '01/01/2026',
  statut: 'Publié',
  signatures: [
    { nom: 'Directeur Général', role: 'Approbateur', date: '01/01/2026' },
    { nom: 'Responsable QHSE', role: 'Visa qualité', date: '01/01/2026' },
  ],
  revision: 'V03',
  revisions: [
    { version: 'V03', date: '01/01/2026', statut: 'Validée', note: 'Mise à jour objectifs 2026' },
    { version: 'V02', date: '15/06/2025', statut: 'Archivée', note: 'Intégration ISO 45001' },
    { version: 'V01', date: '10/01/2024', statut: 'Archivée', note: 'Création politique unifiée' },
  ],
};

function migrateSwotList(items, quadKey, startIdx = 0) {
  return (items || []).map((item, i) => {
    if (item && typeof item === 'object' && item.texte != null) {
      return {
        id: item.id || `SW-${quadKey}-${startIdx + i + 1}`,
        texte: item.texte,
        processus: item.processus || '',
        categorie: item.categorie || '',
        createdAt: item.createdAt || '01/01/2026',
      };
    }
    return swotItem(String(item), '', '', '01/01/2026');
  });
}

function migrateSwotStore() {
  const sw = window.CST_SWOT || {};
  window.CST_SWOT = {
    forces: migrateSwotList(sw.forces, 'F'),
    faiblesses: migrateSwotList(sw.faiblesses, 'W'),
    opportunites: migrateSwotList(sw.opportunites, 'O'),
    menaces: migrateSwotList(sw.menaces, 'T'),
  };
}

export function seedCst() {
  if (!window.__cstStorageLoaded) {
    window.__cstStorageLoaded = true;
    if (loadCstFromStorage()) {
      if (!window.CST_AUDIT_TRAIL) window.CST_AUDIT_TRAIL = [];
      migrateCstDocsSeed();
    }
  }

  const ensurePolitiqueShape = () => {
    if (!window.CST_POLITIQUE) {
      const s = CST_POLITIQUE_SEED;
      window.CST_POLITIQUE = {
        ...s,
        axes: s.axes.map((a) => ({ ...a })),
        revisions: s.revisions.map((r) => ({ ...r })),
        signatures: s.signatures.map((sg) => ({ ...sg })),
      };
      return;
    }
    if (!Array.isArray(window.CST_POLITIQUE.axes)) window.CST_POLITIQUE.axes = [];
    if (!Array.isArray(window.CST_POLITIQUE.revisions)) window.CST_POLITIQUE.revisions = [];
    if (!Array.isArray(window.CST_POLITIQUE.signatures)) window.CST_POLITIQUE.signatures = [];
    if (!window.CST_POLITIQUE.contenuHtml) {
      window.CST_POLITIQUE.contenuHtml = window.CST_POLITIQUE.texte
        ? `<p>${window.CST_POLITIQUE.texte}</p>`
        : CST_POLITIQUE_SEED.contenuHtml;
    }
    window.CST_POLITIQUE.dateCreation = window.CST_POLITIQUE.dateCreation || CST_POLITIQUE_SEED.dateCreation;
    window.CST_POLITIQUE.dateMiseAJour = window.CST_POLITIQUE.dateMiseAJour || CST_POLITIQUE_SEED.dateMiseAJour;
    window.CST_POLITIQUE.statut = window.CST_POLITIQUE.statut || CST_POLITIQUE_SEED.statut;
    window.CST_POLITIQUE.dernierePublication =
      window.CST_POLITIQUE.dernierePublication || window.CST_POLITIQUE.dateSignature || CST_POLITIQUE_SEED.dernierePublication;
  };

  if (!canAutoSeed()) {
    if (!window.CST_SWOT) {
      window.CST_SWOT = { forces: [], faiblesses: [], opportunites: [], menaces: [] };
    }
    migrateSwotStore();
    if (!window.CST_SWOT_META) window.CST_SWOT_META = { processus: [], categories: [] };
    if (!window.CST_CONTEXTE) window.CST_CONTEXTE = { ...CST_CONTEXTE_SEED };
    if (!window.CST_PESTEL?.length) window.CST_PESTEL = [];
    if (!window.CST_PARTIES?.length) window.CST_PARTIES = [];
    if (!window.CST_RISQUES?.length) window.CST_RISQUES = [];
    else window.CST_RISQUES = window.CST_RISQUES.map(normalizeRisqueRow);
    if (!window.CST_OBJECTIFS?.length) window.CST_OBJECTIFS = [];
    if (!window.CST_CHANGEMENTS?.length) window.CST_CHANGEMENTS = [];
    if (!window.CST_REVUES?.length) window.CST_REVUES = [];
    if (!window.CST_ACTIONS?.length) window.CST_ACTIONS = [];
    if (!window.CST_DOCS?.length) window.CST_DOCS = [];
    if (!window.CST_AUDIT_TRAIL) window.CST_AUDIT_TRAIL = [];
    ensurePolitiqueShape();
    migrateCstDocsSeed();
    return;
  }
  if (!window.CST_SWOT) {
    window.CST_SWOT = {
      forces: migrateSwotList(CST_SWOT_SEED.forces, 'F'),
      faiblesses: migrateSwotList(CST_SWOT_SEED.faiblesses, 'W'),
      opportunites: migrateSwotList(CST_SWOT_SEED.opportunites, 'O'),
      menaces: migrateSwotList(CST_SWOT_SEED.menaces, 'T'),
    };
  } else {
    migrateSwotStore();
  }
  if (!window.CST_SWOT_META) {
    window.CST_SWOT_META = {
      processus: [...CST_SWOT_META_SEED.processus],
      categories: [...CST_SWOT_META_SEED.categories],
    };
  }
  if (!window.CST_CONTEXTE) {
    window.CST_CONTEXTE = { ...CST_CONTEXTE_SEED };
  }
  if (!window.CST_PESTEL?.length) window.CST_PESTEL = CST_PESTEL_SEED.map((x) => ({ ...x }));
  if (!window.CST_PARTIES?.length) window.CST_PARTIES = CST_PARTIES_SEED.map((x) => ({ ...x }));
  if (!window.CST_RISQUES?.length) window.CST_RISQUES = CST_RISQUES_SEED.map((x) => normalizeRisqueRow({ ...x }));
  else window.CST_RISQUES = window.CST_RISQUES.map(normalizeRisqueRow);
  if (!window.CST_OBJECTIFS?.length) window.CST_OBJECTIFS = CST_OBJECTIFS_SEED.map((x) => ({ ...x }));
  if (!window.CST_CHANGEMENTS?.length) window.CST_CHANGEMENTS = CST_CHANGEMENTS_SEED.map((x) => ({ ...x }));
  if (!window.CST_REVUES?.length) {
    window.CST_REVUES = CST_REVUES_SEED.map((r) =>
      normalizeCstRevue({
        ...r,
        entrees: [...r.entrees],
        decisions: [...r.decisions],
        actions: r.actions.map((a) => ({ ...a })),
        documents: [],
      })
    );
  } else {
    window.CST_REVUES = window.CST_REVUES.map(normalizeCstRevue);
  }
  if (!window.CST_ACTIONS?.length) window.CST_ACTIONS = CST_ACTIONS_SEED.map((x) => ({ ...x }));
  if (!window.CST_DOCS?.length) window.CST_DOCS = CST_DOCS_SEED.map((x) => ({ ...x }));
  if (!window.CST_AUDIT_TRAIL) window.CST_AUDIT_TRAIL = [];
  ensurePolitiqueShape();
  migrateCstDocsSeed();
  if (!localStorage.getItem('qhse_cst_data_v1')) persistCstData();
  if (window.cst_revueTab == null) window.cst_revueTab = 0;
  if (window.cst_docsTab == null) window.cst_docsTab = 0;
  if (window.cst_selectedRev == null) window.cst_selectedRev = 'REV-2026-01';
  if (window.cst_riskTab == null) window.cst_riskTab = 0;
  if (window.cst_docsView == null) window.cst_docsView = 'active';
}

export function getCstSwot() {
  seedCst();
  return window.CST_SWOT;
}

export function getCstSwotMeta() {
  seedCst();
  return window.CST_SWOT_META;
}

export function getCstContexte() {
  seedCst();
  return window.CST_CONTEXTE;
}

export function getCstPestel() {
  seedCst();
  return window.CST_PESTEL;
}

export function getCstParties() {
  seedCst();
  return window.CST_PARTIES;
}

export function getCstRisques() {
  seedCst();
  return window.CST_RISQUES;
}

export function getCstObjectifs() {
  seedCst();
  return window.CST_OBJECTIFS;
}

export function getCstChangements() {
  seedCst();
  return window.CST_CHANGEMENTS;
}

export function getCstRevues() {
  seedCst();
  return window.CST_REVUES;
}

export function getCstActions() {
  seedCst();
  return window.CST_ACTIONS;
}

export function getCstDocs() {
  seedCst();
  return window.CST_DOCS;
}

export function getCstPolitique() {
  seedCst();
  return window.CST_POLITIQUE;
}
