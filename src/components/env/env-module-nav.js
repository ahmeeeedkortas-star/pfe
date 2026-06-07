/**
 * Navigation horizontale module Environnement.
 */
import { renderIcon } from '../icons/icon-render.js';

export const ENV_NAV_ITEMS = [
  { pageId: 'env-dash', label: 'Tableau de bord', icon: 'grid' },
  { pageId: 'env-aspects', label: 'Aspects & Impacts', icon: 'leaf' },
  { pageId: 'env-objectifs', label: 'Objectifs', icon: 'target' },
  { pageId: 'env-conso', label: 'Consommations', icon: 'gauge' },
  { pageId: 'env-dechets', label: 'Déchets', icon: 'recycle' },
  { pageId: 'env-incidents', label: 'Incidents env.', icon: 'siren' },
  { pageId: 'env-actions', label: 'Plan d\'actions', icon: 'refresh' },
  { pageId: 'env-chimiques', label: 'Prod. chimiques', icon: 'flask' },
];

export function renderEnvModuleNav(activePageId) {
  return `<nav class="env-module-nav" aria-label="Module Environnement">
    ${ENV_NAV_ITEMS.map((item) => {
      const active = item.pageId === activePageId;
      return `<button type="button" class="env-nav-card${active ? ' is-active' : ''}" data-nav="${item.pageId}">
        <span class="env-nav-icon">${renderIcon(item.icon, { size: 16 })}</span>
        <span class="env-nav-label">${item.label}</span>
      </button>`;
    }).join('')}
  </nav>`;
}

/**
 * En-tête de page env (sans icône — le bandeau mod-topbar affiche déjà l’icône SVG).
 */
/**
 * En-tête de page (titre unique — mod-topbar masqué en CSS pour le module env).
 */
export function envPageHeader(title, subtitle, _iconName = null, actionHtml = '') {
  return `<header class="env-page-head" aria-label="${title}">
    <div class="env-page-head-text">
      <h1>${title}</h1>
      ${subtitle ? `<p>${subtitle}</p>` : ''}
    </div>
    ${actionHtml ? `<div class="env-page-head-actions">${actionHtml}</div>` : ''}
  </header>`;
}

export function envKpiPills(items) {
  return `<div class="env-kpi-strip">${items
    .map((row) => {
      const [label, val, color, bg] = row;
      const icon = row.length > 4 ? row[4] : null;
      const iconHtml = icon
        ? `<div class="env-kpi-pill-ic">${renderIcon(icon, { size: 14 })}</div>`
        : '';
      return `<div class="env-kpi-pill" style="background:${bg};border-color:${color}30;color:${color}">
          ${iconHtml}
          <div class="env-kpi-val">${val}</div>
          <div class="env-kpi-lbl">${label}</div>
        </div>`;
    })
    .join('')}</div>`;
}

export function envFilterBar(inner) {
  return `<div class="env-filter-bar">${inner}</div>`;
}

export function envCard(title, body, extraHead = '') {
  return `<section class="env-card">
    <div class="env-card-head"><h2>${title}</h2>${extraHead}</div>
    ${body}
  </section>`;
}

let envNavBound = false;

/** Navigation horizontale — délégation globale (une seule fois). */
export function bindEnvModuleNav() {
  if (envNavBound) return;
  envNavBound = true;
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.env-nav-card[data-nav]');
    if (!btn) return;
    const pageId = btn.dataset.nav;
    if (pageId && typeof window.goPage === 'function') window.goPage(pageId);
  });
}
