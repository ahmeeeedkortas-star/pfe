/**
 * Rendu HTML des icônes SVG XPERT-MECA.
 */
import { ICON_PATHS } from './xm-icons.js';
import { ICON_SIZE, ICON_STROKE, ICON_TILE_NAV } from '../../config/icon-tokens.js';

function svgInner(name) {
  return ICON_PATHS[name] || ICON_PATHS.chart;
}

function sizeClass(size) {
  if (size <= ICON_SIZE.xs) return 'xm-icon--xs';
  if (size <= ICON_SIZE.sm) return 'xm-icon--sm';
  if (size <= ICON_SIZE.md) return 'xm-icon--md';
  if (size >= ICON_SIZE.lg) return 'xm-icon--lg';
  return 'xm-icon--md';
}

/**
 * Icône SVG inline (trait uniforme via CSS).
 * @param {string} name
 * @param {{ size?: number, className?: string, stroke?: number }} [opts]
 */
export function renderIcon(name, opts = {}) {
  const size = opts.size ?? ICON_SIZE.md;
  const extra = opts.className ? ` ${opts.className}` : '';
  const cls = `xm-icon ${sizeClass(size)}${extra}`;
  const stroke = opts.stroke ?? ICON_STROKE;
  return `<span class="${cls.trim()}" style="width:${size}px;height:${size}px" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${svgInner(name)}</svg>
  </span>`;
}

/**
 * Tuile barre d’icônes module (couleurs harmonisées ; actif en CSS).
 */
export function renderIconTile(name, { bg, color, active = false, size = ICON_SIZE.tile } = {}) {
  const tileBg = bg ?? ICON_TILE_NAV.bg;
  const tileColor = color ?? ICON_TILE_NAV.color;
  const iconSize = Math.round(size * 0.52);
  return `<div class="xm-icon-tile${active ? ' is-active' : ''}" style="--tile-bg:${tileBg};--tile-color:${tileColor};width:${size}px;height:${size}px">
    ${renderIcon(name, { size: iconSize })}
  </div>`;
}

/**
 * Icône sidebar (fond discret).
 */
export function renderSidebarIcon(name, { active = false, size = ICON_SIZE.md } = {}) {
  return `<span class="xm-icon-sidebar${active ? ' is-active' : ''}">${renderIcon(name, { size })}</span>`;
}

/**
 * Logo compact topbar / sidebar head.
 */
export function renderBrandMark(size = 38) {
  return `<span class="xm-brand-mark" style="width:${size}px;height:${size}px">${renderIcon('brand', { size: Math.round(size * 0.55), stroke: 2.5 })}</span>`;
}
