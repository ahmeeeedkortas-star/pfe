/**
 * Bundle CST pour qhse.html (IIFE — pas de modules ES dans le monolithe).
 */
import { seedCst } from './data/cst.data.js';
import { installCstCrud } from './components/cst/cst-crud.js';
import { renderCstTb } from './pages/cst/cst-tb.page.js';
import { renderCstSwot } from './pages/cst/cst-swot.page.js';
import { renderCstPestel } from './pages/cst/cst-pestel.page.js';
import { renderCstParties } from './pages/cst/cst-parties.page.js';
import { renderCstRisques } from './pages/cst/cst-risques.page.js';
import { renderCstObjectifs } from './pages/cst/cst-objectifs.page.js';
import { renderCstChangements } from './pages/cst/cst-changements.page.js';
import { renderCstRevue } from './pages/cst/cst-revue.page.js';
import { renderCstPolitique } from './pages/cst/cst-politique.page.js';
import { renderCstActions } from './pages/cst/cst-actions.page.js';
import { renderCstDocs } from './pages/cst/cst-docs.page.js';

const CST_ICONS = [
  { id: 'cst-tb', ic: '⊞', lb: 'Tableau de bord SMI', bg: '#E6F1FB', c: '#185FA5' },
  { id: 'cst-swot', ic: '⬡', lb: 'Analyse SWOT', bg: '#F0FDF4', c: '#166534' },
  { id: 'cst-pestel', ic: '⊕', lb: 'Analyse PESTEL', bg: '#F5F3FF', c: '#5B21B6' },
  { id: 'cst-parties', ic: '👥', lb: 'Parties intéressées', bg: '#FFF7ED', c: '#9A3412' },
  { id: 'cst-risques', ic: '⚠', lb: 'Risques & Opportunités', bg: '#FEF2F2', c: '#991B1B' },
  { id: 'cst-objectifs', ic: '🎯', lb: 'Objectifs stratégiques', bg: '#EFF6FF', c: '#1E40AF' },
  { id: 'cst-changements', ic: '↺', lb: 'Gestion changements', bg: '#FFFBEB', c: '#92400E' },
  { id: 'cst-revue', ic: '📋', lb: 'Revue de direction', bg: '#EDE9FE', c: '#6D28D9' },
  { id: 'cst-politique', ic: '📜', lb: 'Politique QHSE', bg: '#F0FDF4', c: '#166534' },
  { id: 'cst-actions', ic: '⚡', lb: "Plan d'actions strat.", bg: '#FEF3C7', c: '#92400E' },
  { id: 'cst-docs', ic: '📄', lb: 'Documentation SMI', bg: '#FCEBEB', c: '#A32D2D' },
];

const CST_TITLES = {
  'cst-tb': ['Tableau de bord SMI', "Contexte & Stratégie — Vue d'ensemble", ''],
  'cst-swot': ['Analyse SWOT', 'Forces · Faiblesses · Opportunités · Menaces', ''],
  'cst-pestel': ['Analyse PESTEL', 'Facteurs macro-environnementaux', ''],
  'cst-parties': ['Parties intéressées', 'Besoins · Influence · Satisfaction', ''],
  'cst-risques': ['Risques & Opportunités', 'Registre SMI — Évaluation', ''],
  'cst-objectifs': ['Objectifs stratégiques', 'Indicateurs · Cibles 2026', ''],
  'cst-changements': ['Gestion des changements', 'Planification · Validation', ''],
  'cst-revue': ['Revue de direction', 'Entrées · Décisions · Actions', ''],
  'cst-politique': ['Politique QHSE', 'Engagement de la direction', ''],
  'cst-actions': ["Plan d'actions stratégique", 'Suivi · Priorités · Avancement', ''],
  'cst-docs': ['Documentation SMI', 'Procédures · Politiques · Enregistrements', ''],
};

const CST_PAGES = {
  'cst-tb': () => renderCstTb(),
  'cst-swot': () => renderCstSwot(),
  'cst-pestel': () => renderCstPestel(),
  'cst-parties': () => renderCstParties(),
  'cst-risques': () => renderCstRisques(),
  'cst-objectifs': () => renderCstObjectifs(),
  'cst-changements': () => renderCstChangements(),
  'cst-revue': () => renderCstRevue(),
  'cst-politique': () => renderCstPolitique(),
  'cst-actions': () => renderCstActions(),
  'cst-docs': () => renderCstDocs(),
};

function cstRefresh(pageId) {
  const fn = window.PAGES?.[pageId];
  if (typeof fn === 'function') {
    document.getElementById('content').innerHTML = fn();
  }
}

window.QHSE_CST_INIT = function qhseCstInit() {
  seedCst();
  if (!window.PAGES) window.PAGES = {};
  Object.assign(window.PAGES, CST_PAGES);
  if (!window.ICONS) window.ICONS = {};
  window.ICONS.cst = CST_ICONS;
  if (!window.TITLES) window.TITLES = {};
  Object.assign(window.TITLES, CST_TITLES);
  window.cstRefresh = cstRefresh;
  installCstCrud();
  const content = document.getElementById('content');
  if (content && !content.dataset.cstNavBound) {
    content.dataset.cstNavBound = '1';
    content.addEventListener('click', (e) => {
      const nav = e.target.closest('[data-nav]');
      if (nav?.dataset?.nav && typeof window.goPage === 'function') window.goPage(nav.dataset.nav);
    });
  }
};
