/**
 * Configuration des modules QHSE et navigation par icônes.
 */
export const MODULE_IDS = ['rc', 'nc', 'cst', 'audit', 'doc', 'fives', 'sec', 'env'];

export const ICONS = {
  rc: [
    { id: 'rc-liste', ic: '≡', lb: 'Liste', bg: '#E6F1FB', c: '#185FA5' },
    { id: 'rc-new', ic: '+', lb: 'Nouvelle', bg: '#EAF3DE', c: '#3B6D11' },
    { id: 'rc-fiche', ic: '◻', lb: 'Fiche', bg: '#FAEEDA', c: '#854F0B' },
    { id: 'rc-8d', ic: '◈', lb: 'Traitement 8D', bg: '#E6F1FB', c: '#185FA5' },
    { id: 'rc-actions', ic: '↺', lb: 'Actions', bg: '#EAF3DE', c: '#3B6D11' },
    { id: 'rc-kpi', ic: '◉', lb: 'KPI', bg: '#E6F1FB', c: '#185FA5' },
  ],
  nc: [
    { id: 'nc-liste', ic: '≡', lb: 'Liste NC', bg: '#E6F1FB', c: '#185FA5' },
    { id: 'nc-new', ic: '+', lb: 'Nouvelle NC', bg: '#EAF3DE', c: '#3B6D11' },
    { id: 'nc-fiche', ic: '◻', lb: 'Fiche', bg: '#FAEEDA', c: '#854F0B' },
    { id: 'nc-qrqc', ic: '⚡', lb: 'QRQC', bg: '#FCEBEB', c: '#A32D2D' },
    { id: 'nc-actions', ic: '↺', lb: 'Actions', bg: '#EAF3DE', c: '#3B6D11' },
    { id: 'nc-kpi', ic: '◉', lb: 'KPI', bg: '#E6F1FB', c: '#185FA5' },
    { id: 'nc-rapport', ic: '◻', lb: 'Rapport QRQC', lbShort: 'QRQC/mois', bg: '#FCEBEB', c: '#A32D2D' },
  ],
  cst: [
    { id: 'cst-tb', ic: '⊞', lb: 'Tableau de bord SMI', lbShort: 'Tbord', bg: '#E6F1FB', c: '#185FA5' },
    { id: 'cst-swot', ic: '⬡', lb: 'Contexte & SWOT', lbShort: 'Contexte', bg: '#F0FDF4', c: '#166534' },
    { id: 'cst-pestel', ic: '⊕', lb: 'Analyse PESTEL', lbShort: 'PESTEL', bg: '#F5F3FF', c: '#5B21B6' },
    { id: 'cst-parties', ic: '👥', lb: 'Parties intéressées', lbShort: 'Parties', bg: '#FFF7ED', c: '#9A3412' },
    { id: 'cst-risques', ic: '⚠', lb: 'Risques & Opportunités', lbShort: 'Risques', bg: '#FEF2F2', c: '#991B1B' },
    { id: 'cst-objectifs', ic: '🎯', lb: 'Objectifs stratégiques', lbShort: 'Objectifs', bg: '#EFF6FF', c: '#1E40AF' },
    { id: 'cst-revue', ic: '📋', lb: 'Revue de direction', lbShort: 'Revue', bg: '#EDE9FE', c: '#6D28D9' },
    { id: 'cst-politique', ic: '📜', lb: 'Politique QHSE', lbShort: 'Politique', bg: '#F0FDF4', c: '#166534' },
    { id: 'cst-actions', ic: '⚡', lb: "Plan d'actions strat.", lbShort: 'Actions', bg: '#FEF3C7', c: '#92400E' },
  ],
  audit: [
    { id: 'audit-tb', ic: '⊞', lb: 'Tableau de bord', bg: '#EFF6FF', c: '#1E40AF' },
    { id: 'audit-planning', ic: '📅', lb: 'Planning', bg: '#F0FDF4', c: '#166534' },
    { id: 'audit-liste', ic: '📋', lb: 'Audits', bg: '#EAF3DE', c: '#3B6D11' },
    { id: 'audit-checklist', ic: '✓', lb: 'Checklists', bg: '#F5F3FF', c: '#5B21B6' },
    { id: 'audit-constats', ic: '⚠', lb: 'Constats', bg: '#FEF2F2', c: '#DC2626' },
    { id: 'audit-actions', ic: '⚡', lb: 'Actions correctives', bg: '#FEF3C7', c: '#92400E' },
    { id: 'audit-docs', ic: '📄', lb: 'Documents & rapports', bg: '#EFF6FF', c: '#1E40AF' },
    { id: 'audit-auditeurs', ic: '👥', lb: 'Auditeurs', bg: '#F5F3FF', c: '#5B21B6' },
    { id: 'audit-config', ic: '⚙', lb: 'Configuration', bg: '#F8FAFC', c: '#475569' },
  ],
  doc: [
    { id: 'doc-tb', ic: '⊞', lb: 'Tableau de bord', lbShort: 'Tbord', bg: '#E6F1FB', c: '#185FA5' },
    { id: 'doc-biblio', ic: '📁', lb: 'Bibliothèque', lbShort: 'Documents', bg: '#FCEBEB', c: '#A32D2D' },
    { id: 'doc-create', ic: '+', lb: 'Nouveau document', lbShort: 'Nouveau', bg: '#EAF3DE', c: '#3B6D11' },
    { id: 'doc-history', ic: '🕐', lb: 'Historique & versions', lbShort: 'Historique', bg: '#FAEEDA', c: '#854F0B' },
  ],
  fives: [
    { id: '5s-tb', ic: '⊞', lb: 'Tableau de bord', lbShort: 'Tbord', bg: '#F0FDF4', c: '#166534' },
    { id: '5s-audit', ic: '📅', lb: 'Audits & Planning', lbShort: 'Audits', bg: '#EFF6FF', c: '#1E40AF' },
    { id: '5s-checklist', ic: '📋', lb: 'Checklists', lbShort: 'Checklists', bg: '#F5F3FF', c: '#5B21B6' },
    { id: '5s-ecarts', ic: '⚠', lb: 'Écarts', lbShort: 'Écarts', bg: '#FEF2F2', c: '#DC2626' },
    { id: '5s-actions', ic: '⚡', lb: "Plans d'actions", lbShort: 'Actions', bg: '#FEF3C7', c: '#92400E' },
    { id: '5s-zones', ic: '🏭', lb: 'Zones', lbShort: 'Zones', bg: '#F0FDF4', c: '#166534' },
    { id: '5s-responsables', ic: '👥', lb: 'Responsables', lbShort: 'Resp.', bg: '#F5F3FF', c: '#5B21B6' },
    { id: '5s-rapports', ic: '◻', lb: 'Rapports', lbShort: 'Rapports', bg: '#EFF6FF', c: '#1E40AF' },
    { id: '5s-exports', ic: '📤', lb: 'Exports', lbShort: 'Exports', bg: '#FFFBEB', c: '#92400E' },
  ],
  sec: [
    { id: 'sec-tb', ic: '⊞', lb: 'Tableau bord', bg: '#FCEBEB', c: '#A32D2D' },
    { id: 'sec-risques', ic: '⚠', lb: 'Risques SST', bg: '#FFF3E0', c: '#C2410C' },
    { id: 'sec-checklists', ic: '✓', lb: 'Checklists', bg: '#EAF3DE', c: '#3B6D11' },
    { id: 'sec-accidents', ic: '🚨', lb: 'Accidents', bg: '#FCEBEB', c: '#A32D2D' },
    { id: 'sec-urgence', ic: '🔥', lb: 'Plan urgence', bg: '#FFF3E0', c: '#C2410C' },
    { id: 'sec-actions', ic: '↺', lb: 'Actions', bg: '#E6F1FB', c: '#185FA5' },
    { id: 'sec-kpi', ic: '◉', lb: 'KPI Séc.', bg: '#F5F3FF', c: '#5B21B6' },
  ],
  env: [
    { id: 'env-dash', ic: '⊞', lb: 'KPI & Tableau', bg: '#E6F1FB', c: '#185FA5' },
    { id: 'env-aspects', ic: '🌿', lb: 'Aspects env.', bg: '#E6F7EE', c: '#166534' },
    { id: 'env-objectifs', ic: '🎯', lb: 'Objectifs', bg: '#EFF6FF', c: '#1E40AF' },
    { id: 'env-dechets', ic: '♻', lb: 'Déchets', bg: '#FEF3C7', c: '#92400E' },
    { id: 'env-conso', ic: '⚡', lb: 'Consommations', bg: '#EDE9FE', c: '#6D28D9' },
    { id: 'env-incidents', ic: '🚨', lb: 'Incidents env.', bg: '#FEF2F2', c: '#991B1B' },
    { id: 'env-chimiques', ic: '⚗', lb: 'Prod. chimiques', bg: '#FEE2E2', c: '#991B1B' },
    { id: 'env-actions', ic: '↺', lb: 'Actions', bg: '#EAF3DE', c: '#3B6D11' },
  ],
};

/** Résout le module parent à partir d'un id de page. */
export function resolveModule(pageId) {
  if (pageId === 'accueil') return 'accueil';
  const prefix = pageId.split('-')[0];
  if (MODULE_IDS.includes(prefix)) return prefix;
  if (pageId.startsWith('env')) return 'env';
  return prefix;
}
