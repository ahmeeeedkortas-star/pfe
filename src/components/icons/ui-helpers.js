/**
 * Helpers d'icônes pour les interfaces (KPI, titres, onglets, boutons).
 */
import { renderIcon, renderIconTile } from './icon-render.js';
import { PAGE_ICON } from './xm-icons.js';

/** Emoji toast → icône SVG */
export const TOAST_ICON = {
  '✓': 'check-circle',
  '✅': 'check-circle',
  '⚠': 'alert',
  '⚠️': 'alert',
  'ℹ': 'info',
  'ℹ️': 'info',
  '💾': 'save',
  '📷': 'file',
  '🗑': 'x',
  '📋': 'clipboard',
  '🚨': 'siren',
};

/**
 * Carte KPI avec tuile SVG (bandeaux de listes / dashboards).
 */
function kpiCountAttr(value) {
  const t = String(value ?? '').trim();
  return /^\d+$/.test(t) ? ' data-count-up' : '';
}

export function renderKpiStatCard(label, value, color, iconName, nav) {
  const bg = color.startsWith('var(') ? `color-mix(in srgb, ${color} 12%, white)` : `${color}18`;
  const click = nav
    ? ` data-nav="${nav}" style="cursor:pointer" role="button" tabindex="0"`
    : '';
  return `<div class="xm-kpi-stat"${click}>
    ${renderIconTile(iconName, { bg, color, size: 40 })}
    <div class="xm-kpi-stat__body">
      <div class="xm-kpi-stat__value" style="color:${color}"${kpiCountAttr(value)}>${value}</div>
      <div class="xm-kpi-stat__label">${label}</div>
    </div>
  </div>`;
}

/** Carte KPI centrée (grille 4 colonnes type sec-kpi). */
export function renderKpiCardCenter(label, value, color, iconName, nav) {
  const bg = color.startsWith('var(') ? `color-mix(in srgb, ${color} 10%, white)` : `${color}14`;
  const click = nav
    ? ` role="button" tabindex="0" data-nav="${nav}" style="cursor:pointer"`
    : '';
  return `<div class="card xm-kpi-card-center"${click}>
    <div class="xm-kpi-card-center__icon">${renderIconTile(iconName, { bg, color, size: 41 })}</div>
    <div class="xm-kpi-card-center__value" style="color:${color}"${kpiCountAttr(value)}>${value}</div>
    <div class="xm-kpi-card-center__label">${label}</div>
  </div>`;
}

/** Bandeau KPI compact (fond coloré léger). */
export function renderKpiBanner(label, value, color, iconName, bgTint) {
  const bg = bgTint || `color-mix(in srgb, ${color} 8%, white)`;
  return `<div class="xm-kpi-banner" style="background:${bg}">
    ${renderIconTile(iconName, { bg: '#fff', color, size: 34 })}
    <div class="xm-kpi-banner__value" style="color:${color}">${value}</div>
    <div class="xm-kpi-banner__label">${label}</div>
  </div>`;
}

/** Onglet avec icône. */
export function renderTabBtn(label, iconName, active, dataAttr) {
  const attr = dataAttr ? ` ${dataAttr}` : '';
  return `<button type="button" class="btn bsm xm-tab-btn${active ? ' bp' : ''}"${attr}>
    <span class="xm-tab-btn__ic">${renderIcon(iconName, { size: 16, stroke: 2 })}</span>
    <span>${label}</span>
  </button>`;
}

/** Titre de page avec icône (mod-topbar). */
export function renderPageTitle(pageId, titleText) {
  const icon = PAGE_ICON[pageId] || 'grid';
  const clean = stripEmoji(titleText);
  return `<span class="xm-page-title">
    ${renderIconTile(icon, { bg: '#eff6ff', color: '#2563eb', size: 32 })}
    <span>${clean}</span>
  </span>`;
}

export function stripEmoji(text) {
  return String(text || '')
    .replace(/^[\s]*(?:[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]|[\uD800-\uDBFF][\uDC00-\uDFFF])+\s*/gu, '')
    .trim();
}

export function iconForPage(pageId) {
  return PAGE_ICON[pageId] || 'grid';
}

export const REP_BTN_ICON = { oui: 'check', non: 'x', na: 'minus' };

/** Bouton réponse checklist OUI / NON / N/A */
export function renderRepBtnContent(val) {
  return renderIcon(REP_BTN_ICON[val] || 'minus', { size: 20, stroke: 2.5 });
}

export function renderInlineIcon(iconName, size = 16) {
  return `<span class="xm-inline-ic">${renderIcon(iconName, { size, stroke: 2 })}</span>`;
}
