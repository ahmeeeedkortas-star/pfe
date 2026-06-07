/**
 * Navigation module Sécurité SST — ordre ICONS, titres, redirection sec-tb → sec-kpi.
 */
export function patchSecModule() {
  if (window.ICONS?.sec) {
    window.ICONS.sec = [
      { id: 'sec-kpi', icon: 'chart-pie', lb: 'KPI & Tableau', bg: '#F5F3FF', c: '#5B21B6' },
      { id: 'sec-risques', icon: 'alert', lb: 'Risques', bg: '#FFF3E0', c: '#C2410C' },
      { id: 'sec-checklists', icon: 'clipboard', lb: 'Checklists', bg: '#EAF3DE', c: '#3B6D11' },
      { id: 'sec-accidents', icon: 'siren', lb: 'Accidents', bg: '#FCEBEB', c: '#A32D2D' },
      { id: 'sec-urgence', icon: 'flame', lb: 'Urgences', bg: '#FFF3E0', c: '#C2410C' },
      { id: 'sec-actions', icon: 'refresh', lb: 'Actions', bg: '#E6F1FB', c: '#185FA5' },
    ];
  }

  const secTitles = {
    'sec-kpi': ['Tableau de bord & KPI Sécurité', 'Indicateurs ISO 45001 · XPERT MECA · Mai 2026', ''],
    'sec-tb': ['Tableau de bord & KPI Sécurité', 'Indicateurs ISO 45001 · XPERT MECA · Mai 2026', ''],
    'sec-risques': ['Gestion des Risques SST', 'Évaluation & maîtrise — ISO 45001', ''],
    'sec-checklists': ['Checklists Sécurité', 'Inspection périodique — 6 checklists actives', ''],
    'sec-accidents': ['Accidents & Incidents', 'Registre · Analyse · QRQC', ''],
    'sec-urgence': ["Plans d'Urgence", 'Registre · Exercices · Contacts', ''],
    'sec-actions': ['Actions Sécurité SST', 'Suivi Kanban / Liste', ''],
  };

  if (window.TITLES) {
    Object.assign(window.TITLES, secTitles);
  }

  window.sstAddRisk = window.sstAddRisk || window.sstNewRisk;
  window.sstEditRisk = window.sstEditRisk || window.sstNewRisk;

  if (window.PAGES) {
    window.PAGES['sec-tb'] = () => window.PAGES['sec-kpi']?.() ?? '';
  }
}
