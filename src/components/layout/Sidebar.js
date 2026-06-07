/**

 * Sidebar repliable — icônes par défaut, libellés au survol.

 */

import { SIDEBAR_NAV } from '../../config/navigation.js';

import { preloadModule } from '../../core/page-registry.js';

import { renderSidebarBrand } from '../brand/brand-markup.js';

import { renderSidebarIcon } from '../icons/icon-render.js';

import { SIDEBAR_ICON } from '../icons/xm-icons.js';



const CLOSE_DELAY_MS = 140;



/**

 * @param {HTMLElement} container

 * @param {{ onNavigate: (payload: { module?: string, page?: string }) => void }} handlers

 */

export function mountSidebar(container, { onNavigate }) {

  container.classList.add('sidebar', 'sidebar--minimal', 'sidebar--collapsed');

  container.setAttribute('aria-expanded', 'false');



  const head = renderSidebarBrand();

  const items = SIDEBAR_NAV.map((entry) => renderNavEntry(entry)).join('');

  const perf = `
    <div class="s-perf" aria-label="Performance globale">
      <div class="s-perf__card">
        <div class="s-perf__title">Performance globale</div>
        <div class="s-perf__ring" aria-hidden="true"><span class="s-perf__val">85%</span></div>
        <div class="s-perf__lbl">Conformité SMI</div>
        <div class="s-perf__trend">↑ +8 % vs mois dernier</div>
      </div>
    </div>`;

  container.innerHTML =
    head + `<nav class="s-nav" aria-label="Modules QHSE">${items}</nav>` + perf;

  container.classList.remove('sidebar--has-quote');
}



function resolveIcon(entry) {

  if (entry.icon) return entry.icon;

  if (entry.id && SIDEBAR_ICON[entry.id]) return SIDEBAR_ICON[entry.id];

  return 'grid';

}



function renderNavEntry(entry) {

  if (entry.type === 'section') {

    return `<div class="s-section" role="presentation">${entry.label}</div>`;

  }



  if (entry.type === 'footer') {

    const icon = renderSidebarIcon(resolveIcon(entry), { size: 18 });

    return `<button type="button" class="s-foot--item" title="${entry.label}" aria-label="${entry.label}">

      <span class="s-icon">${icon}</span>

      <span class="s-foot-label">${entry.label}</span>

    </button>`;

  }



  if (entry.type !== 'item') return '';



  const idAttr = entry.id ? ` id="${entry.id}"` : '';

  const disabled = entry.disabled ? ' aria-disabled="true" tabindex="-1"' : '';

  const dataMod = entry.module ? ` data-module="${entry.module}"` : '';

  const dataPage = entry.page ? ` data-page="${entry.page}"` : '';

  const icon = renderSidebarIcon(resolveIcon(entry), { size: 18 });

  const titleAttr = ` title="${entry.label.replace(/"/g, '&quot;')}"`;

  const aria = ` aria-label="${entry.label.replace(/"/g, '&quot;')}"`;



  return `<button type="button" class="s-item"${idAttr}${dataMod}${dataPage}${disabled}${titleAttr}${aria}>

    <span class="s-icon">${icon}</span>

    <span class="s-item-label">${entry.label}</span>

    <span class="s-item-chevron" aria-hidden="true">›</span>

  </button>`;

}



/**

 * @param {HTMLElement} container

 * @param {{ onNavigate: (payload: { module?: string, page?: string }) => void }} handlers

 */

export function bindSidebar(container, { onNavigate }) {

  container.addEventListener('click', (e) => {

    const item = e.target.closest('.s-item[data-module], .s-item[data-page]');

    if (!item || item.getAttribute('aria-disabled') === 'true') return;



    const page = item.dataset.page;

    const module = item.dataset.module;



    if (page) onNavigate({ page });

    else if (module) onNavigate({ module });

  });



  container.addEventListener('mouseover', (e) => {

    const item = e.target.closest('.s-item[data-module]');

    if (item?.dataset.module) preloadModule(item.dataset.module);

  });

}



/**

 * Ouverture au survol / focus, fermeture fluide à la sortie.

 * @param {HTMLElement} container

 */

export function bindSidebarHover(container) {

  let closeTimer = null;



  const expand = () => {

    if (closeTimer) {

      clearTimeout(closeTimer);

      closeTimer = null;

    }

    container.classList.add('is-expanded');

    container.setAttribute('aria-expanded', 'true');

  };



  const collapse = () => {

    closeTimer = setTimeout(() => {

      container.classList.remove('is-expanded');

      container.setAttribute('aria-expanded', 'false');

      closeTimer = null;

    }, CLOSE_DELAY_MS);

  };



  container.addEventListener('mouseenter', expand);

  container.addEventListener('mouseleave', collapse);

  container.addEventListener('focusin', expand);

  container.addEventListener('focusout', (e) => {

    if (!container.contains(e.relatedTarget)) collapse();

  });

}


