/**
 * Icônes SVG sur toutes les interfaces — ICONS modules, topbar, toasts.
 */
import { ICON_PATHS, PAGE_ICON } from '../components/icons/xm-icons.js';
import { renderPageTitle, stripEmoji, TOAST_ICON } from '../components/icons/ui-helpers.js';
import { renderIcon } from '../components/icons/icon-render.js';
import { normalizeNavIconItem } from '../config/icon-tokens.js';
import { BRAND_COLORS } from '../config/brand-colors.js';

const ALL_MODULE_ICONS = {
  rc: [
    { id: 'rc-liste', icon: 'list', lb: 'Liste', bg: '#E6F1FB', c: '#185FA5' },
    { id: 'rc-new', icon: 'plus', lb: 'Nouvelle', bg: '#EAF3DE', c: '#3B6D11' },
    { id: 'rc-fiche', icon: 'file', lb: 'Fiche', bg: '#FAEEDA', c: '#854F0B' },
    { id: 'rc-8d', icon: 'layers', lb: 'Traitement 8D', bg: '#E6F1FB', c: '#185FA5' },
    { id: 'rc-actions', icon: 'refresh', lb: 'Actions', bg: '#EAF3DE', c: '#3B6D11' },
    { id: 'rc-kpi', icon: 'chart-pie', lb: 'KPI', bg: '#E6F1FB', c: '#185FA5' },
  ],
  nc: [
    { id: 'nc-liste', icon: 'list', lb: 'Liste NC', bg: '#E6F1FB', c: '#185FA5' },
    { id: 'nc-new', icon: 'plus', lb: 'Nouvelle NC', bg: '#EAF3DE', c: '#3B6D11' },
    { id: 'nc-fiche', icon: 'file', lb: 'Fiche', bg: '#FAEEDA', c: '#854F0B' },
    { id: 'nc-qrqc', icon: 'zap', lb: 'QRQC', bg: '#FCEBEB', c: '#A32D2D' },
    { id: 'nc-actions', icon: 'refresh', lb: 'Actions', bg: '#EAF3DE', c: '#3B6D11' },
    { id: 'nc-kpi', icon: 'chart-pie', lb: 'KPI', bg: '#E6F1FB', c: '#185FA5' },
    { id: 'nc-rapport', icon: 'file', lb: 'Rapport QRQC', lbShort: 'QRQC/mois', bg: '#FCEBEB', c: '#A32D2D' },
  ],
  audit: [
    { id: 'audit-tb', icon: 'grid', lb: 'Tableau de bord', bg: '#EFF6FF', c: '#1E40AF' },
    { id: 'audit-planning', icon: 'calendar', lb: 'Planning', bg: '#F0FDF4', c: '#166534' },
    { id: 'audit-liste', icon: 'clipboard', lb: 'Audits', bg: '#EAF3DE', c: '#3B6D11' },
    { id: 'audit-checklist', icon: 'check-circle', lb: 'Checklists', bg: '#F5F3FF', c: '#5B21B6' },
    { id: 'audit-constats', icon: 'alert', lb: 'Constats', bg: '#FEF2F2', c: '#DC2626' },
    { id: 'audit-actions', icon: 'zap', lb: 'Actions correctives', bg: '#FEF3C7', c: '#92400E' },
    { id: 'audit-docs', icon: 'file', lb: 'Documents & rapports', bg: '#EFF6FF', c: '#1E40AF' },
    { id: 'audit-auditeurs', icon: 'users', lb: 'Auditeurs', bg: '#F5F3FF', c: '#5B21B6' },
    { id: 'audit-config', icon: 'settings', lb: 'Configuration', bg: '#F8FAFC', c: '#475569' },
  ],
  doc: [
    { id: 'doc-tb', icon: 'grid', lb: 'Tableau de bord', lbShort: 'Tbord', bg: '#E6F1FB', c: '#185FA5' },
    { id: 'doc-biblio', icon: 'folder', lb: 'Bibliothèque', lbShort: 'Documents', bg: '#FCEBEB', c: '#A32D2D' },
    { id: 'doc-create', icon: 'plus', lb: 'Nouveau document', lbShort: 'Nouveau', bg: '#EAF3DE', c: '#3B6D11' },
    { id: 'doc-history', icon: 'clock', lb: 'Historique & versions', lbShort: 'Historique', bg: '#FAEEDA', c: '#854F0B' },
  ],
  fives: [
    { id: '5s-tb', icon: 'grid', lb: 'Tableau de bord 5S', lbShort: 'Tbord', bg: '#F0FDF4', c: '#166534' },
    { id: '5s-audit', icon: 'calendar', lb: 'Audits & Planning', lbShort: 'Audits', bg: '#EFF6FF', c: '#1E40AF' },
    { id: '5s-checklist', icon: 'clipboard', lb: 'Checklists', lbShort: 'Checklists', bg: '#F5F3FF', c: '#5B21B6' },
    { id: '5s-ecarts', icon: 'alert', lb: 'Écarts', lbShort: 'Écarts', bg: '#FEF2F2', c: '#DC2626' },
    { id: '5s-actions', icon: 'zap', lb: "Plans d'actions", lbShort: 'Actions', bg: '#FEF3C7', c: '#92400E' },
    { id: '5s-zones', icon: 'building', lb: 'Zones', lbShort: 'Zones', bg: '#F0FDF4', c: '#166534' },
    { id: '5s-responsables', icon: 'users', lb: 'Responsables', lbShort: 'Resp.', bg: '#F5F3FF', c: '#5B21B6' },
    { id: '5s-rapports', icon: 'file', lb: 'Rapports', lbShort: 'Rapports', bg: '#EFF6FF', c: '#1E40AF' },
    { id: '5s-exports', icon: 'download', lb: 'Exports', lbShort: 'Exports', bg: '#FFFBEB', c: '#92400E' },
  ],
  sec: [
    { id: 'sec-kpi', icon: 'chart-pie', lb: 'KPI & Tableau', bg: '#F5F3FF', c: '#5B21B6' },
    { id: 'sec-risques', icon: 'alert', lb: 'Risques SST', bg: '#FFF3E0', c: '#C2410C' },
    { id: 'sec-checklists', icon: 'clipboard', lb: 'Checklists', bg: '#EAF3DE', c: '#3B6D11' },
    { id: 'sec-accidents', icon: 'siren', lb: 'Accidents', bg: '#FCEBEB', c: '#A32D2D' },
    { id: 'sec-urgence', icon: 'flame', lb: 'Plan urgence', bg: '#FFF3E0', c: '#C2410C' },
    { id: 'sec-actions', icon: 'refresh', lb: 'Actions', bg: '#E6F1FB', c: '#185FA5' },
  ],
  env: [
    { id: 'env-dash', icon: 'grid', lb: 'KPI & Tableau', bg: '#E6F1FB', c: '#185FA5' },
    { id: 'env-aspects', icon: 'leaf', lb: 'Aspects env.', bg: '#E6F7EE', c: '#166534' },
    { id: 'env-objectifs', icon: 'target', lb: 'Objectifs', bg: '#EFF6FF', c: '#1E40AF' },
    { id: 'env-dechets', icon: 'recycle', lb: 'Déchets', bg: '#FEF3C7', c: '#92400E' },
    { id: 'env-conso', icon: 'gauge', lb: 'Consommations', bg: '#EDE9FE', c: '#6D28D9' },
    { id: 'env-incidents', icon: 'siren', lb: 'Incidents env.', bg: '#FEF2F2', c: '#991B1B' },
    { id: 'env-chimiques', icon: 'flask', lb: 'Prod. chimiques', bg: '#FEE2E2', c: '#991B1B' },
    { id: 'env-actions', icon: 'refresh', lb: 'Actions', bg: '#EAF3DE', c: '#3B6D11' },
  ],
};

const CLEAN_TITLES = {
  'sec-kpi': ['Tableau de bord & KPI Sécurité', 'Indicateurs ISO 45001 · XPERT MECA · Mai 2026', ''],
  'sec-tb': ['Tableau de bord & KPI Sécurité', 'Indicateurs ISO 45001 · XPERT MECA · Mai 2026', ''],
  'sec-risques': ['Gestion des Risques SST', 'Évaluation & maîtrise — ISO 45001', ''],
  'sec-checklists': ['Checklists Sécurité', 'Inspection périodique — 6 checklists actives', ''],
  'sec-cl-epi': ['Checklist EPI', 'Contrôle des équipements de protection — saisie manuelle', ''],
  'sec-accidents': ['Accidents & Incidents', 'Registre · Analyse · QRQC', ''],
  'nc-rapport': ['Rapport QRQC mensuel', 'Dashboard · NC · actions correctives · KPI ISO', ''],
  'sec-urgence': ["Plans d'Urgence", 'Registre · Exercices · Contacts', ''],
  'sec-actions': ['Actions Sécurité SST', 'Suivi Kanban / Liste', ''],
  'doc-tb': ['Documentation QHSE', 'Tableau de bord — KPI & alertes', ''],
  'doc-biblio': ['Bibliothèque documentaire', 'Registre — Procédures · Instructions · Enregistrements', ''],
  'doc-create': ['Nouveau document', 'Création — code auto · version V1', ''],
  'doc-read': ['Fiche document', 'Consultation · métadonnées · contenu', ''],
  'doc-edit': ['Modifier le document', 'Éditeur intégré · versions', ''],
  'doc-history': ['Historique & versions', 'Recherche · comparaison · révisions', ''],
  'doc-kpi': ['Indicateurs documentaires', 'KPI · conformité · délais', ''],
  '5s-tb': ['Dashboard 5S', 'Suivi et amélioration continue des zones de production', ''],
  '5s-planning': ['Planification des audits 5S', 'Calendrier · Assignation · Suivi', ''],
  '5s-audit': ['Audits 5S', 'Liste et suivi des audits · Scores · Rapports', ''],
  '5s-checklist': ['Checklist 5S', 'Évaluation par zone · Scoring automatique · Écarts', ''],
  '5s-kpi': ['Résultats & KPI 5S', 'Indicateurs · Évolution · Zones · Objectifs', ''],
  '5s-ecarts': ['Écarts & Non-conformités', 'Identification · Gravité · Suivi de résolution', ''],
  '5s-actions': ["Plans d'actions 5S", 'Actions correctives et préventives · Suivi', ''],
  '5s-suivi': ['Suivi des actions 5S', 'Progression · Avancement · Clôture', ''],
  '5s-zones': ['Gestion des zones 5S', 'Configuration · Scoring · Responsables', ''],
  '5s-responsables': ['Responsables 5S', 'Gestion des intervenants · Zones assignées', ''],
  '5s-rapports': ['Rapports 5S', "Synthèse · Export · Rapports d'audit", ''],
  '5s-exports': ['Exports 5S', 'Export Excel · PDF · Données complètes', ''],
  'rc-liste': ['Réclamations Clients', 'Liste et suivi', ''],
  'nc-liste': ['Non-Conformités', 'Liste et suivi', ''],
  'env-dash': ['Tableau de bord Environnement', "Vue d'ensemble — Indicateurs clés ISO 14001", ''],
  'env-conso': ['Consommations', 'Électricité · Eau · Air · Carburant — ISO 14001', ''],
  'env-objectifs': ['Objectifs environnementaux', 'Planification · Suivi · Résultats ISO 14001 §6.2', ''],
  'env-incidents': ['Incidents environnementaux', 'Identification · Traitement · Actions correctives', ''],
  'audit-liste': ['Tous les audits', 'Registre complet · Filtres · Kanban / Liste', ''],
  'audit-planning': ['Planning des audits', 'Programme annuel · Calendrier · Gantt', ''],
  'audit-checklist': ['Checklists ISO', 'Référentiels ISO 9001 · 14001 · 45001', ''],
  'audit-constats': ["Constats d'audit", 'NC · Axes d\'amélioration (AC)', ''],
  'audit-actions': ['Actions correctives', 'Suivi des actions · Délais · Progression', ''],
  'audit-docs': ['Documents & Preuves', 'Pièces jointes · Rapports · Enregistrements', ''],
  'audit-auditeurs': ['Gestion des auditeurs', 'Liste dynamique · Habilitations', ''],
  'audit-config': ["Configuration", "Référentiels · Types d'audit · Paramètres", ''],
  accueil: ['Tableau de bord global', "Vue d'ensemble — Mai 2026", ''],
};

export function applyAllModuleIcons() {
  if (!window.ICONS) window.ICONS = {};
  Object.assign(window.ICONS, ALL_MODULE_ICONS);
  for (const mod of Object.keys(window.ICONS)) {
    window.ICONS[mod] = window.ICONS[mod].map((it) => ({
      ...it,
      icon: it.icon || PAGE_ICON[it.id],
    }));
  }
}

export function applyCleanTitles() {
  if (!window.TITLES) return;
  Object.assign(window.TITLES, CLEAN_TITLES);
  for (const id of Object.keys(window.TITLES)) {
    if (window.TITLES[id]?.[0]) {
      window.TITLES[id][0] = stripEmoji(window.TITLES[id][0]);
    }
  }
}

function patchSetTopbar() {
  const prev = window.setTopbar;
  if (!prev || window.setTopbar.__xmIcons) return;

  window.setTopbar = function setTopbarXm(pageId) {
    prev(pageId);
    const t = window.TITLES?.[pageId];
    const modTitle = document.getElementById('mod-title');
    const modSub = document.getElementById('mod-sub');
    const topTitle = document.getElementById('t-title');
    if (pageId === 'accueil') {
      if (modTitle) modTitle.textContent = '';
      if (modSub) modSub.textContent = '';
      if (topTitle) topTitle.textContent = stripEmoji(t?.[0] || 'Tableau de bord global');
      return;
    }
    if (t?.[0] && modTitle) {
      modTitle.innerHTML = renderPageTitle(pageId, t[0]);
    }
    if (t?.[0] && topTitle) {
      topTitle.textContent = stripEmoji(t[0]);
    }
  };
  window.setTopbar.__xmIcons = true;
}

function patchXmToast() {
  const prev = window.xmToast;
  if (!prev || window.xmToast.__xmIcons) return;

  window.xmToast = function xmToastXm(msg, sub = '', icon = 'check-circle', color = BRAND_COLORS.red) {
    const iconName = TOAST_ICON[icon] || (ICON_PATHS[icon] ? icon : 'check-circle');
    const root = document.getElementById('xm-toast');
    if (!root) {
      prev(msg, sub, icon, color);
      return;
    }
    const el = document.createElement('div');
    el.className = 'xm-toast-item';
    el.innerHTML = `
      <span class="xm-toast-item__ic" style="color:${color}">${renderIcon(iconName, { size: 20, stroke: 2.2 })}</span>
      <div style="flex:1;min-width:0">
        <div style="font-weight:700;font-size:12px;color:var(--navy)">${msg}</div>
        ${sub ? `<div style="font-size:10px;color:var(--muted);margin-top:2px">${sub}</div>` : ''}
      </div>`;
    el.style.borderLeft = `3px solid ${color}`;
    root.appendChild(el);
    setTimeout(() => {
      el.classList.add('is-out');
      setTimeout(() => el.remove(), 320);
    }, 3200);
  };
  window.xmToast.__xmIcons = true;
}

export function installGlobalIcons() {
  applyAllModuleIcons();
  applyCleanTitles();
  patchSetTopbar();
  patchXmToast();
}
