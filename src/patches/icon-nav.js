/**
 * Icônes SVG pour la barre de navigation module (remplace caractères/emoji).
 */
import { PAGE_ICON } from '../components/icons/xm-icons.js';
import { renderIcon, renderIconTile } from '../components/icons/icon-render.js';

function iconKeyForItem(it) {
  return it.icon || PAGE_ICON[it.id] || 'grid';
}

export function patchIconNav() {
  const prev = window.buildIconNav;
  if (!prev || window.buildIconNav.__xmPatched) return;

  window.buildIconNav = function buildIconNavXm(mod, activeId) {
    const icons = window.ICONS?.[mod] || [];
    const nav = document.getElementById('icon-nav');
    if (!nav) return;

    if (mod === 'accueil' || window.STATE?.page === 'accueil' || window.STATE?.module === 'accueil') {
      nav.style.display = 'none';
      nav.hidden = true;
      return;
    }

    nav.hidden = false;
    nav.style.display = 'flex';
    nav.classList.toggle('icon-nav--cst', mod === 'cst');
    nav.classList.toggle('icon-nav--odoo', false);
    const compact = mod === 'cst';
    const odoo = false;
    let h = '';
    icons.forEach((it, i) => {
      const active = it.id === activeId;
      const key = iconKeyForItem(it);
      const label = it.lbShort || it.lb;
      h += `<div class="ini${active ? ' active' : ''}${compact ? ' ini--compact' : ''}${odoo ? ' ini--odoo' : ''}" onclick="goPage('${it.id}')" title="${it.lb}">
        <div class="ini-ic">${odoo ? '' : renderIconTile(key, { bg: it.bg, color: it.c, active, size: compact ? 36 : 41 })}</div>
        <div class="ini-lb">${label}</div>
      </div>`;
      if (!compact && !odoo && i < icons.length - 1) h += '<div class="ini-sep"></div>';
    });
    nav.innerHTML = h;
  };
  window.buildIconNav.__xmPatched = true;
}

/** Enrichit ICONS avec clés `icon` pour les modules. */
/** Logo topbar en SVG. */
function svgOnly(html) {
  return html.match(/<svg[\s\S]*<\/svg>/)?.[0] || '';
}

export function applyShellBrandIcons() {
  const searchIco = document.querySelector('.t-search > span');
  if (searchIco && !searchIco.dataset.xmIcon) {
    searchIco.dataset.xmIcon = '1';
    searchIco.innerHTML = svgOnly(renderIcon('search', { size: 16, stroke: 2 }));
    searchIco.style.display = 'inline-flex';
    searchIco.style.color = 'var(--muted)';
  }
}

export function enrichIconsMeta() {
  if (!window.ICONS) return;
  for (const mod of Object.keys(window.ICONS)) {
    window.ICONS[mod] = window.ICONS[mod].map((it) => ({
      ...it,
      icon: it.icon || PAGE_ICON[it.id],
    }));
  }
}
