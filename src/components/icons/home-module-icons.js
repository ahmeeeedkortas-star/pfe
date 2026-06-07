/**
 * Icônes grandes pour la page d'accueil (modules QHSE) — fond sombre / dégradés.
 */
import { ICON_STROKE } from '../../config/icon-tokens.js';
import { renderIcon } from './icon-render.js';

const HOME_MODULE_SVG = {
  rc: `<g fill="none" stroke="rgba(255,255,255,.92)" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="17" cy="14" r="6" fill="rgba(255,255,255,.25)" stroke-width="1.8"/>
    <path d="M6 36c0-9 22-9 22 0" stroke-width="2"/>
    <rect x="26" y="6" width="18" height="13" rx="4" fill="rgba(255,255,255,.95)" stroke="rgba(255,255,255,.5)" stroke-width="1.5"/>
    <path d="M28 19 24 24h8" fill="rgba(255,255,255,.95)" stroke="none"/>
    <path d="M35 11v5M35 11h.01" stroke="#f04a52" stroke-width="2.5"/>
  </g>`,
  nc: `<g fill="none" stroke="rgba(255,255,255,.9)" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="20" cy="24" r="12" stroke-width="2" stroke-dasharray="4 3"/>
    <circle cx="20" cy="24" r="5" stroke-width="2"/>
    <circle cx="33" cy="13" r="9" fill="rgba(220,38,38,.9)" stroke="rgba(255,255,255,.6)" stroke-width="1.8"/>
    <path d="M29 8l8 8M37 8l-8 8" stroke="#fff" stroke-width="2.8"/>
  </g>`,
  audit: `<g fill="none" stroke="rgba(255,255,255,.9)" stroke-linecap="round" stroke-linejoin="round">
    <rect x="5" y="9" width="22" height="28" rx="3" stroke-width="2"/>
    <rect x="12" y="5" width="8" height="6" rx="2" stroke-width="1.8"/>
    <path d="M11 18l2 2 4-4M11 24l2 2 4-4" stroke-width="2"/>
    <circle cx="33" cy="30" r="8" stroke-width="2.2"/>
    <path d="M38 35l5 5" stroke-width="2.5"/>
  </g>`,
  sec: `<g fill="none" stroke="rgba(255,255,255,.92)" stroke-linecap="round" stroke-linejoin="round">
    <path d="M24 6C12 6 6 16 6 24h36C42 16 36 6 24 6z" fill="rgba(255,255,255,.2)" stroke-width="2"/>
    <rect x="4" y="24" width="40" height="7" rx="2" fill="rgba(255,255,255,.85)" stroke="none"/>
    <path d="M24 12v6M21 15h6" stroke="#f04a52" stroke-width="2.5"/>
  </g>`,
  env: `<g fill="none" stroke="rgba(255,255,255,.88)" stroke-linecap="round" stroke-linejoin="round">
    <path d="M24 40S6 30 6 16c0 0 10-10 22-6 10 4 16 14 14 24 0 0-8 10-24 10z" fill="rgba(255,255,255,.22)" stroke-width="2"/>
    <path d="M24 40c-2-8-8-14-12-18" stroke-width="2"/>
    <path d="M32 34l6-4" stroke-width="2"/>
  </g>`,
  doc: `<g fill="none" stroke="rgba(255,255,255,.92)" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 8h20v32H10z" stroke-width="2"/>
    <path d="M16 8V5h8v3" stroke-width="2"/>
    <path d="M14 18h12M14 24h12M14 30h8" stroke-width="2"/>
    <circle cx="34" cy="34" r="7" fill="rgba(255,255,255,.25)" stroke-width="2"/>
  </g>`,
  fives: `<g fill="none" stroke="rgba(255,255,255,.92)" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 38h32" stroke-width="2"/>
    <rect x="10" y="10" width="12" height="10" rx="2" stroke-width="2" fill="rgba(255,255,255,.2)"/>
    <rect x="26" y="14" width="12" height="10" rx="2" stroke-width="2" fill="rgba(255,255,255,.15)"/>
    <path d="M16 28l8-6 8 6" stroke-width="2"/>
    <path d="M24 8v4M22 10h4" stroke="#fde68a" stroke-width="2"/>
  </g>`,
  cst: `<g fill="none" stroke="rgba(255,255,255,.92)" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="24" cy="24" r="14" stroke-width="2"/>
    <circle cx="24" cy="24" r="8" stroke-width="1.8" opacity=".7"/>
    <circle cx="24" cy="24" r="2" fill="rgba(255,255,255,.9)" stroke="none"/>
    <path d="M24 10v6M24 38v6M10 24h6M38 24h6" stroke-width="2"/>
    <path d="M32 14l4-4M14 34l-4 4" stroke-width="2" stroke="#86efac"/>
  </g>`,
};

export function renderHomeModuleIcon(mod, size = 52) {
  const inner = HOME_MODULE_SVG[mod] || HOME_MODULE_SVG.rc;
  return `<span class="xm-home-mod-icon" style="width:${size}px;height:${size}px" aria-hidden="true">
    <svg viewBox="0 0 48 48" width="${size}" height="${size}">${inner}</svg>
  </span>`;
}

export function renderHomeKpiIcon(name, size = 18) {
  return renderIcon(name, { size, stroke: ICON_STROKE });
}
