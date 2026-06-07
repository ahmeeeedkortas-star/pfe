/**
 * Enregistrement des listes exportables (CSV / PDF) — tous modules QHSE.
 */
import { getFivesAudits, getFivesActions } from '../data/fives-store.js';
import { getAudits } from '../components/audit/audit-utils.js';
import {
  seedCst,
  getCstParties,
  getCstRisques,
  getCstObjectifs,
  getCstActions,
  getCstPestel,
  getCstSwot,
  getCstContexte,
} from '../data/cst.data.js';
import { seedEnvAspects } from '../data/env-aspects.data.js';
import { seedSstAccidents } from '../data/sst-accidents.data.js';
import { listRc } from '../data/rc-repository.js';
import { listNc } from '../data/nc-repository.js';

function col(label, key, get) {
  return get ? { label, get } : { label, key };
}

function flatSwot() {
  seedCst();
  const sw = getCstSwot();
  const quads = [
    ['Forces', 'forces'],
    ['Faiblesses', 'faiblesses'],
    ['Opportunités', 'opportunites'],
    ['Menaces', 'menaces'],
  ];
  const rows = [];
  for (const [label, key] of quads) {
    for (const it of sw[key] || []) {
      const item = typeof it === 'string' ? { texte: it } : it;
      rows.push({
        quadrant: label,
        texte: item.texte,
        processus: item.processus || '',
        categorie: item.categorie || '',
        createdAt: item.createdAt || '',
      });
    }
  }
  return rows;
}

export function registerListExports() {
  window.XM_LIST_EXPORTS = {
    rc: {
      filename: 'reclamations-clients.csv',
      pdfTitle: 'Réclamations clients',
      getItems: () => listRc({ includeArchived: false, pageSize: 0 }).items,
      columns: [
        col('N°', 'n'),
        col('Date', 'd'),
        col('Projet', 'p'),
        col('Client', 'cl'),
        col('Objet', 'obj'),
        col('Gravité', 'g'),
        col('Statut', 's'),
        col('Responsable', 'r'),
      ],
    },
    nc: {
      filename: 'non-conformites.csv',
      pdfTitle: 'Non-conformités',
      getItems: () => listNc({ includeArchived: false, pageSize: 0 }).items,
      columns: [
        col('N°', 'n'),
        col('Date', 'd'),
        col('Projet', 'p'),
        col('Description', 'desc'),
        col('Gravité', 'g'),
        col('Statut', 's'),
        col('Responsable', 'r'),
      ],
    },
    'rc-actions': {
      filename: 'actions-rc.csv',
      pdfTitle: 'Actions — Réclamations clients',
      getItems: () => window.RC_ACTIONS || [],
      columns: [
        col('Action', 'action'),
        col('RC', 'ref'),
        col('Type', 'type'),
        col('Responsable', 'resp'),
        col('Échéance', 'fin'),
        col('Statut', 'statut'),
        col('Prog.', 'prog', (r) => `${r.prog}%`),
      ],
    },
    'nc-actions': {
      filename: 'actions-nc.csv',
      pdfTitle: 'Actions — Non-conformités',
      getItems: () => window.NC_ACTIONS || [],
      columns: [
        col('Action', 'action'),
        col('NC', 'ref'),
        col('Type', 'type'),
        col('Responsable', 'resp'),
        col('Échéance', 'fin'),
        col('Statut', 'statut'),
      ],
    },
    fives: {
      filename: 'audits-5s.csv',
      pdfTitle: 'Audits 5S',
      getItems: () => getFivesAudits(),
      columns: [
        col('ID', 'id'),
        col('Date', 'date'),
        col('Période', 'period'),
        col('Auditeur', 'auditor'),
        col('Statut', 'statut'),
      ],
    },
    'fives-actions': {
      filename: 'actions-5s.csv',
      pdfTitle: "Plans d'actions 5S",
      getItems: () => getFivesActions(),
      columns: [
        col('Action', 'action'),
        col('Priorité', 'prio'),
        col('Responsable', 'resp'),
        col('Échéance', 'echeance'),
        col('Statut', 'statut'),
      ],
    },
    audit: {
      filename: 'audits.csv',
      pdfTitle: 'Audits internes',
      getItems: () => getAudits(),
      columns: [
        col('Réf.', 'ref'),
        col('Type', 'type'),
        col('Département', 'dep'),
        col('Auditeur', 'aud'),
        col('Statut', 'statut'),
        col('Score', 'score'),
      ],
    },
    swot: {
      filename: 'contexte-swot.csv',
      pdfTitle: 'Contexte & SWOT',
      getItems: () => {
        seedCst();
        const ctx = getCstContexte();
        return [
          { section: 'Mission', texte: ctx.mission },
          { section: 'Vision', texte: ctx.vision },
          { section: 'Périmètre', texte: ctx.perimetre },
          ...flatSwot().map((r) => ({
            section: r.quadrant,
            texte: r.texte,
            processus: r.processus,
            categorie: r.categorie,
          })),
        ];
      },
      columns: [
        col('Section', 'section'),
        col('Contenu', 'texte'),
        col('Processus', 'processus'),
        col('Catégorie', 'categorie'),
      ],
    },
    'cst-parties': {
      filename: 'parties-interessees.csv',
      pdfTitle: 'Parties intéressées',
      getItems: () => {
        seedCst();
        return getCstParties();
      },
      columns: [
        col('Partie', 'nom'),
        col('Besoins', 'besoin'),
        col('Exigences', 'exigences'),
        col('Influence', 'influence'),
        col('Communication', 'com'),
        col('Satisfaction', 'sat'),
      ],
    },
    'cst-risques': {
      filename: 'risques-opportunites.csv',
      pdfTitle: 'Risques & opportunités',
      getItems: () => {
        seedCst();
        return getCstRisques();
      },
      columns: [
        col('ID', 'id'),
        col('Enjeux', 'enjeux'),
        col('Catégorie', 'cat'),
        col('Gravité/Opp.', 'gravite'),
        col('Occurrence', 'occurrence'),
        col('Criticité', 'criticite'),
        col('Niveau', 'niv'),
        col('Responsable', 'responsable'),
        col('Statut', 'statut'),
      ],
    },
    'cst-objectifs': {
      filename: 'objectifs-strategiques.csv',
      pdfTitle: 'Objectifs stratégiques',
      getItems: () => {
        seedCst();
        return getCstObjectifs();
      },
      columns: [
        col('Objectif', 'objectif'),
        col('Indicateur', 'indicateur'),
        col('Cible', 'cible'),
        col('État', 'etat'),
        col('Responsable', 'resp'),
        col('Échéance', 'delai'),
        col('Prog.', 'prog', (r) => `${r.prog}%`),
      ],
    },
    'cst-pestel': {
      filename: 'pestel.csv',
      pdfTitle: 'Analyse PESTEL',
      getItems: () => {
        seedCst();
        return getCstPestel();
      },
      columns: [
        col('Facteur', 'facteur'),
        col('Analyse', 'analyse'),
        col('Impact', 'impact'),
        col('Action', 'action'),
      ],
    },
    'cst-actions': {
      filename: 'actions-strategiques.csv',
      pdfTitle: "Plan d'actions stratégique",
      getItems: () => {
        seedCst();
        return getCstActions();
      },
      columns: [
        col('ID', 'id'),
        col('Action', 'action'),
        col('Origine', 'origine'),
        col('Responsable', 'resp'),
        col('Échéance', 'delai'),
        col('Priorité', 'priorite'),
        col('Statut', 'statut'),
      ],
    },
    'env-aspects': {
      filename: 'aspects-environnementaux.csv',
      pdfTitle: 'Aspects environnementaux',
      getItems: () => {
        seedEnvAspects();
        return window.ENV_ASPECTS_DATA || [];
      },
      columns: [
        col('ID', 'id'),
        col('Aspect', 'aspect'),
        col('Activité', 'activite'),
        col('Impact', 'impact'),
        col('Gravité', 'g'),
        col('Fréquence', 'f'),
        col('Contrôle', 'c'),
        col('Statut', 's'),
      ],
    },
    'sec-accidents': {
      filename: 'accidents-sst.csv',
      pdfTitle: 'Accidents & incidents SST',
      getItems: () => {
        seedSstAccidents();
        return window.acc_data || [];
      },
      columns: [
        col('ID', 'id'),
        col('Type', 'type'),
        col('Date', 'date'),
        col('Employé', 'employe'),
        col('Département', 'dept'),
        col('Gravité', 'gravite'),
        col('Statut', 'statut'),
      ],
    },
  };

  window.xmExportList = (prefix) => {
    const cfg = window.XM_LIST_EXPORTS?.[prefix];
    if (!cfg) {
      window.xmToast?.('Export non configuré pour cette page', '', '⚠', '#f59e0b');
      return;
    }
    import('../components/shared/export-csv.js').then(({ exportRowsToCsv }) => {
      exportRowsToCsv(cfg.filename, cfg.getItems(), cfg.columns);
    });
  };

  window.xmPrintList = (prefix) => {
    const cfg = window.XM_LIST_EXPORTS?.[prefix];
    const title = cfg?.pdfTitle || 'Export QHSE';
    import('../components/shared/export-csv.js').then(({ printPageAsPdf }) => printPageAsPdf(title));
  };
}
