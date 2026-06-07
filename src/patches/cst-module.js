/**
 * Navigation module Contexte & Stratégie — items actifs.
 */
import { seedCst } from '../data/cst.data.js';

export function patchCstModule() {
  seedCst();

  if (window.ICONS) {
    window.ICONS.cst = [
      { id: 'cst-tb', ic: '⊞', icon: 'grid', lb: 'Tableau de bord SMI', lbShort: 'Tbord', bg: '#E6F1FB', c: '#185FA5' },
      { id: 'cst-swot', ic: '⬡', icon: 'layers', lb: 'Contexte & SWOT', lbShort: 'Contexte', bg: '#F0FDF4', c: '#166534' },
      { id: 'cst-pestel', ic: '⊕', icon: 'globe', lb: 'Analyse PESTEL', lbShort: 'PESTEL', bg: '#F5F3FF', c: '#5B21B6' },
      { id: 'cst-parties', ic: '👥', icon: 'users', lb: 'Parties intéressées', lbShort: 'Parties', bg: '#FFF7ED', c: '#9A3412' },
      { id: 'cst-risques', ic: '⚠', icon: 'alert', lb: 'Risques & Opportunités', lbShort: 'Risques', bg: '#FEF2F2', c: '#991B1B' },
      { id: 'cst-objectifs', ic: '🎯', icon: 'target', lb: 'Objectifs stratégiques', lbShort: 'Objectifs', bg: '#EFF6FF', c: '#1E40AF' },
      { id: 'cst-revue', ic: '📋', icon: 'clipboard', lb: 'Revue de direction', lbShort: 'Revue', bg: '#EDE9FE', c: '#6D28D9' },
      { id: 'cst-politique', ic: '📜', icon: 'file', lb: 'Politique QHSE', lbShort: 'Politique', bg: '#F0FDF4', c: '#166534' },
      { id: 'cst-actions', ic: '⚡', icon: 'zap', lb: "Plan d'actions strat.", lbShort: 'Actions', bg: '#FEF3C7', c: '#92400E' },
    ];
  }

  const cstTitles = {
    'cst-tb': ['Tableau de bord SMI', 'Contexte & Stratégie · Vue d\'ensemble', ''],
    'cst-swot': ['Contexte & SWOT', 'Organisme · Périmètre · Forces · Faiblesses · Opportunités · Menaces', ''],
    'cst-pestel': ['Analyse PESTEL', 'Facteurs macro-environnementaux', ''],
    'cst-parties': ['Parties intéressées', 'Besoins · Influence · Satisfaction', ''],
    'cst-risques': ['Risques & Opportunités', 'Registre SMI — Évaluation', ''],
    'cst-objectifs': ['Objectifs stratégiques', 'Indicateurs · Cibles 2026', ''],
    'cst-revue': ['Revue de direction', 'Entrées · Décisions · Actions · Documents', ''],
    'cst-politique': [
      'Politique QHSE',
      'Engagement de la direction',
      `<button type="button" class="btn bsm bp" data-cst-politique-edit onclick="window.goPage?.('cst-politique');setTimeout(()=>window.cstPolFocusEditor?.(),120)">✏ Modifier la politique</button>`,
    ],
    'cst-actions': ["Plan d'actions stratégique", 'Suivi · Priorités · Avancement', ''],
  };

  if (window.TITLES) Object.assign(window.TITLES, cstTitles);
}
