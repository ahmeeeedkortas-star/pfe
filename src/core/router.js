/**
 * Router — navigation async + lazy-load des chunks pages.
 */
import { renderPage, preloadModule, getModuleId, ensureModule, MODERN_PAGES } from './page-registry.js';
import { clInitView } from '../components/qhse/dynamic-checklist.js';
import { SEC_CHECKLIST_PAGES } from '../data/sec-checklist-configs.js';
import { animatePageSwap, isInteractivePage, staggerContent } from '../app/xm-motion.js';
import { reloadPage, clearContentMotionStyles, clearTableRowMotion } from './page-refresh.js';
import { syncSidebarActive } from './sidebar-sync.js';
import { resolvePageAlias } from './page-aliases.js';
import { MODULE_DEFAULT_PAGE } from './page-aliases.js';
import { enhanceV11Page, isV11Page, clearV11PageClasses } from '../patches/v11-ux-enhance.js';
import { bindDynamicFieldsInContainer } from './dynamic-lists.js';

let patched = false;
let navLock = false;

function showLoading() {
  const c = document.getElementById('content');
  if (!c || c.classList.contains('home-mode')) return;
  c.innerHTML = `<div class="card" style="margin:12px;text-align:center;padding:40px;color:var(--muted)">
    <div style="font-size:22px;margin-bottom:8px">⏳</div>
    <div style="font-size:11px">Chargement du module…</div>
  </div>`;
}

async function afterPagePaint(c, html, pageId) {
  if (html === null) c.innerHTML = window.pgSoon(pageId);
  requestAnimationFrame(() => {
    bindDynamicFieldsInContainer(c);
    if (String(pageId || '').startsWith('doc-')) {
      import('../pages/doc/doc-enhance.js').then((m) => m.bindDocPageAfterRender(pageId));
    }
    if (String(pageId || '').startsWith('5s-')) {
      import('../pages/fives/fives-v11.page.js').then((m) => m.bindFivesPageAfterRender(pageId));
    }
    if (pageId === 'settings') {
      import('../pages/settings/settings.page.js').then((m) => m.bindSettingsPage());
    }
  });
  let clKey = SEC_CHECKLIST_PAGES[pageId];
  if (clKey === '__custom__') clKey = window.currentCustomCL;
  if (clKey === '__instance__') clKey = window.currentCLKey;
  if (clKey && window.CL_DATA?.[clKey]) {
    requestAnimationFrame(() => clInitView(clKey, pageId));
  }
}

export function patchRouter() {
  if (patched) return;
  patched = true;

  window.PAGES = window.PAGES || {};

  window.goHome = async function goHome() {
    if (navLock) return;
    navLock = true;
    try {
      STATE.module = 'accueil';
      STATE.page = 'accueil';
      const iconNav = document.getElementById('icon-nav');
      if (iconNav) {
        iconNav.style.display = 'none';
        iconNav.hidden = true;
      }
      const modTop = document.getElementById('mod-topbar');
      if (modTop) {
        modTop.style.display = 'none';
        modTop.hidden = true;
      }
      window.setTopbar('accueil');
      const c = document.getElementById('content');
      c.classList.add('home-mode');
      c.classList.remove('sst-mode', 'is-interactive-page', 'actions-mode', 'cst-mode', 'xm-v11-surface', 'xm-v11-ready');
      clearV11PageClasses();
      clearContentMotionStyles(c);
      const mainEl = document.getElementById('main');
      if (mainEl) delete mainEl.dataset.module;
      if (window.acc_view) window.acc_view = 'list';
      if (window.sst_selectedId !== undefined) window.sst_selectedId = null;

      await ensureModule('accueil');
      c.innerHTML = window.PAGES['accueil']();
      syncSidebarActive({ module: 'accueil', page: 'accueil' });
      preloadModule('rc');
      preloadModule('nc');
    } catch (err) {
      console.error('[router] goHome', err);
    } finally {
      navLock = false;
    }
  };

  window.goModule = function goModule(mod) {
    STATE.module = mod;
    const mainSwitch = document.getElementById('main');
    if (mainSwitch) {
      mainSwitch.classList.add('is-module-switching');
      window.setTimeout(() => mainSwitch.classList.remove('is-module-switching'), 280);
    }
    document.getElementById('content').classList.remove('home-mode');
    const modTop = document.getElementById('mod-topbar');
    if (modTop) {
      modTop.style.display = '';
      modTop.hidden = false;
    }
    const iconNavMod = document.getElementById('icon-nav');
    if (iconNavMod) iconNavMod.hidden = false;
    const mainEl = document.getElementById('main');
    if (mainEl) mainEl.dataset.module = mod === 'accueil' ? '' : mod;
    preloadModule(mod);
    const icons = window.ICONS[mod];
    if (icons) {
      const firstIconPage = icons[0]?.id;
      const fallbackPage = MODULE_DEFAULT_PAGE[mod] || firstIconPage;
      const targetPage = fallbackPage || firstIconPage;
      window.buildIconNav(mod, targetPage);
      window.goPage(targetPage);
      syncSidebarActive({ module: mod });
    } else {
      document.getElementById('icon-nav').style.display = 'none';
      window.setTopbar('accueil');
      document.getElementById('content').innerHTML = window.pgSoon(mod);
    }
  };

  window.goPage = async function goPage(pageId) {
    if (navLock) return;
    navLock = true;

    try {
      pageId = resolvePageAlias(pageId);
      if (pageId === 'accueil') {
        navLock = false;
        await window.goHome();
        return;
      }
      const prevPage = STATE.page;
      const wasDocPage = false;
      const willBeDocPage = false;
      const samePageRefresh = STATE.page === pageId;
      STATE.page = pageId;
      if (pageId === 'settings') {
        const iconNavSettings = document.getElementById('icon-nav');
        if (iconNavSettings) {
          iconNavSettings.hidden = true;
          iconNavSettings.style.display = 'none';
        }
      }
      const mod = pageId === 'settings'
        ? 'settings'
        : pageId.startsWith('sec-cl-')
        ? 'sec'
        : pageId.startsWith('env-')
          ? 'env'
          : pageId.startsWith('5s-') || pageId.startsWith('fives-')
            ? 'fives'
            : pageId.startsWith('doc-')
              ? 'doc'
              : pageId.startsWith('audit-')
                ? 'audit'
                : pageId.split('-')[0];
      STATE.module = mod;

      if (window.ICONS?.[mod]) {
        window.buildIconNav(mod, pageId.startsWith('sec-cl-') ? 'sec-checklists' : pageId);
      }
      window.setTopbar(pageId);
      const modTop = document.getElementById('mod-topbar');
      if (modTop) {
        modTop.style.display = '';
        modTop.hidden = false;
      }
      const iconNavGo = document.getElementById('icon-nav');
      if (iconNavGo && pageId !== 'settings') {
        iconNavGo.hidden = false;
        iconNavGo.style.display = '';
      }
      const c = document.getElementById('content');
      const mainEl = document.getElementById('main');
      if (mainEl) mainEl.dataset.module = mod;

      c.classList.remove('doc-mode');
      document.body.classList.remove('doc-module-active');

      if (isV11Page(pageId)) {
        c.classList.add('xm-v11-surface');
        document.body.classList.add('xm-v11-active');
      } else {
        clearV11PageClasses();
      }

      c.classList.remove('home-mode', 'sst-mode', 'actions-mode', 'cst-mode');
      if (pageId === 'sec-risques' || pageId === 'sec-accidents' || pageId === 'env-aspects')
        c.classList.add('sst-mode');
      c.classList.toggle(
        'sec-cl-mode',
        pageId === 'sec-checklists' || pageId.startsWith('sec-cl-')
      );
      if (pageId === 'rc-actions' || pageId === 'nc-actions' || pageId === 'sec-actions' || pageId === 'env-actions')
        c.classList.add('actions-mode');
      if (pageId.startsWith('cst-')) c.classList.add('cst-mode');
      c.classList.toggle(
        'env-mode',
        pageId.startsWith('env-') || pageId === 'env-dash' || pageId === 'env-kpi'
      );

      const moduleId = getModuleId(pageId);
      const known = pageId in MODERN_PAGES || typeof window.PAGES[pageId] === 'function';
      if (moduleId && !known) showLoading();

      if (isInteractivePage(pageId)) {
        c.classList.add('is-interactive-page');
      } else {
        c.classList.remove('is-interactive-page');
      }

      let html;
      if (samePageRefresh && (isInteractivePage(pageId) || pageId.startsWith('cst-'))) {
        await reloadPage(pageId);
        html = c.innerHTML;
      } else {
        html = await animatePageSwap(c, () => renderPage(pageId), pageId);
      }
      await afterPagePaint(c, html, pageId);
      if (pageId === 'cst-politique') {
        const { bindPolitiqueActions } = await import('../components/cst/cst-politique-actions.js');
        bindPolitiqueActions();
        c.style.pointerEvents = '';
      }
      if (isV11Page(pageId)) enhanceV11Page(c);
      syncSidebarActive({ module: mod, page: pageId });
      clearContentMotionStyles(c);
      clearTableRowMotion(c);
      if (isV11Page(pageId)) staggerContent(c);
      c.style.pointerEvents = '';

      STATE.rcTab = 'info';
      STATE.ncTab = 'info';
      STATE.ficheTab = 'info';
    } catch (err) {
      console.error('[router]', pageId, err);
      const c = document.getElementById('content');
      const moduleId = STATE?.module;
      const fallbackPage = moduleId ? MODULE_DEFAULT_PAGE[moduleId] : null;
      if (fallbackPage && fallbackPage !== pageId) {
        try {
          const fallbackHtml = await renderPage(fallbackPage);
          if (c) c.innerHTML = fallbackHtml;
          STATE.page = fallbackPage;
          if (moduleId && window.ICONS?.[moduleId]) window.buildIconNav(moduleId, fallbackPage);
          syncSidebarActive({ module: moduleId, page: fallbackPage });
          return;
        } catch (fallbackErr) {
          console.error('[router] fallback failed', fallbackPage, fallbackErr);
        }
      }
      if (c) {
        c.innerHTML = `<div class="card" style="margin:16px;color:var(--red)">Erreur de chargement : ${String(err.message).replace(/</g, '&lt;')}</div>`;
      }
    } finally {
      navLock = false;
    }
  };

  window.switchTab = async function switchTab(tabId, groupId) {
    if (navLock) return;
    if (groupId === 'rc') STATE.rcTab = tabId;
    else if (groupId === 'nc') STATE.ncTab = tabId;
    else STATE.ficheTab = tabId;

    navLock = true;
    try {
      const c = document.getElementById('content');
      if (isInteractivePage(STATE.page)) {
        await reloadPage(STATE.page);
      } else {
        const html = await animatePageSwap(c, () => renderPage(STATE.page), STATE.page);
        await afterPagePaint(c, html, STATE.page);
      }
      if (c) {
        if (isInteractivePage(STATE.page)) c.classList.add('is-interactive-page');
        c.style.pointerEvents = '';
      }
    } catch (err) {
      console.error('[router] switchTab', err);
    } finally {
      navLock = false;
    }
  };
}
