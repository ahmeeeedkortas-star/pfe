/**
 * Module 5S — navigation, titres et données initiales.
 */
import { seedFivesStore } from '../data/fives-store.js';

export function patchFivesModule() {
  seedFivesStore();

  if (window.ICONS) {
    /* Surchargé par icons-global.js — applyAllModuleIcons */
  }

  const fivesTitles = {
    '5s': ['5S – Gestion & Amélioration Continue', "Suivi · Évaluation · Plans d'actions", ''],
    '5s-tb': ['🟢 Dashboard 5S', 'Suivi et amélioration continue des zones de production', ''],
    '5s-audit': ['📅 Audits & Planning 5S', 'Calendrier · Planification · Suivi · Auditeurs', ''],
    '5s-planning': ['📅 Audits & Planning 5S', 'Calendrier · Planification · Suivi · Auditeurs', ''],
    '5s-checklist': ['📋 Checklist 5S', 'Évaluation par zone · Scoring automatique · Écarts', ''],
    '5s-kpi': ['📊 Résultats & KPI 5S', 'Indicateurs · Évolution · Zones · Objectifs', ''],
    '5s-ecarts': ['⚠ Écarts & Non-conformités', 'Identification · Gravité · Suivi de résolution', ''],
    '5s-actions': ["⚡ Plans d'actions 5S", 'Kanban · Priorités · Drag & drop · Suivi', ''],
    '5s-suivi': ['↺ Suivi des actions 5S', 'Progression · Avancement · Clôture', ''],
    '5s-zones': ['🏭 Gestion des zones 5S', 'Configuration · Scoring · Responsables', ''],
    '5s-responsables': ['👥 Responsables 5S', 'Gestion des intervenants · Zones assignées', ''],
    '5s-rapports': ["◻ Rapports 5S", "Synthèse · Export · Rapports d'audit", ''],
    '5s-exports': ['📤 Exports 5S', 'Export Excel · PDF · Données complètes', ''],
    'fives-kpi': ['🟢 Dashboard 5S', 'Alias moderne', ''],
    'fives-audit': ['📅 Audits & Planning 5S', 'Alias moderne', ''],
    'fives-planning': ['📅 Audits & Planning 5S', 'Alias moderne', ''],
    'fives-checklist': ['📋 Checklist 5S', 'Alias moderne', ''],
    'fives-actions': ["⚡ Plans d'actions 5S", 'Alias moderne', ''],
    'env-5s': ['Audits 5S', '(module 5S)', ''],
  };

  if (window.TITLES) Object.assign(window.TITLES, fivesTitles);
}
