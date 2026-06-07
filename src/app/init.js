/**
 * Bootstrap de l'application QHSE.
 */
import { mountSidebar, bindSidebar, bindSidebarHover } from '../components/layout/Sidebar.js';
import { installLegacyBridge } from './bridge.js';
import { bindShellEvents } from './shell-events.js';
import { bindContentNavigation } from './content-nav.js';
import { patchRouter } from '../core/router.js';
import { installQhseHelpers } from '../components/qhse/index.js';
import { bindLegacyState } from '../core/state.js';
import { installXmMotion } from './xm-motion.js';
import { canAutoSeed, initEmptyWindowGlobals } from '../core/empty-platform.js';

async function loadLegacy() {
  if (!canAutoSeed()) initEmptyWindowGlobals();
  window.PAGES = {};
  installQhseHelpers();
  await import('../legacy/core.js');
  const { stripLegacyDemoData } = await import('../patches/legacy-empty-data.js');
  stripLegacyDemoData();
  const { ICONS: CONFIG_ICONS } = await import('../config/modules.js');
  if (window.ICONS) Object.assign(window.ICONS, CONFIG_ICONS);
  bindLegacyState();
  await import('../legacy/pg-soon.js');
  await import('../legacy/env-helpers.js');
  await import('../legacy/notifications.js');
  stripLegacyDemoData();
  const { installNotificationsUi } = await import('../patches/notifications-ui.js');
  installNotificationsUi();
  await import('../legacy/search.js');
  const { patchFilterRC } = await import('../patches/rc-filter.js');
  const { patchFilterNC } = await import('../patches/nc-filter.js');
  const { installSecChecklistRefresh } = await import('../pages/sec/sec-checklist.page.js');
  const { installChecklistInstanceHelpers, bindChecklistInstancesList } = await import(
    '../pages/sec/sec-checklist-instances.page.js'
  );
  const { bindSecChecklistRegistre } = await import('../pages/sec/sec-checklist-registre.page.js');
  const { patchSecTitles } = await import('../patches/sec-titles.js');
  const { patchSecModule } = await import('../patches/sec-module.js');
  const { patchDocModule } = await import('../patches/doc-module.js');
  const { patchFivesModule } = await import('../patches/fives-module.js');
  const { patchAuditModule } = await import('../patches/audit-module.js');
  const { installFivesCrud } = await import('../components/fives/fives-crud.js');
  const { installDocV11Crud } = await import('../pages/doc/doc-v11.page.js');
  const { installFivesV11Crud } = await import('../pages/fives/fives-v11.page.js');
  const { installDynamicLists } = await import('../core/dynamic-lists.js');
  const { installAuditV11Crud } = await import('../pages/audit/audit-v11.page.js');
  const { installPlatformEnhancements } = await import('../patches/platform-enhancements.js');
  const { installNcWizard } = await import('../patches/nc-wizard.js');
  const { initNcRepository } = await import('../data/nc-repository.js');
  const { initRcRepository } = await import('../data/rc-repository.js');
  const { patchCstModule } = await import('../patches/cst-module.js');
  const { patchIconNav, enrichIconsMeta, applyShellBrandIcons } = await import('../patches/icon-nav.js');
  const { installBrandShell } = await import('../patches/brand-shell.js');
  const { installUrgenceHelpers } = await import('../components/sec/urgence-helpers.js');
  const { installDocHelpers } = await import('../components/sec/doc-helpers.js');
  const { installCstCrud } = await import('../components/cst/cst-crud.js');
  const { installPagesProxy } = await import('../core/page-refresh.js');
  patchFilterRC();
  patchFilterNC();
  installSecChecklistRefresh();
  installChecklistInstanceHelpers();
  bindChecklistInstancesList();
  bindSecChecklistRegistre();
  patchSecModule();
  patchDocModule();
  patchFivesModule();
  patchAuditModule();
  installFivesCrud();
  installDocV11Crud();
  installFivesV11Crud();
  installDynamicLists();
  installAuditV11Crud();
  const { installModuleDynamicForms } = await import('../patches/module-dynamic-forms.js');
  installModuleDynamicForms();
  initNcRepository();
  initRcRepository();
  stripLegacyDemoData();
  installPlatformEnhancements();
  const { registerListExports } = await import('../patches/list-export-registry.js');
  registerListExports();
  installNcWizard();
  patchCstModule();
  enrichIconsMeta();
  patchIconNav();
  installBrandShell();
  applyShellBrandIcons();
  const { installGlobalIcons } = await import('../patches/icons-global.js');
  installGlobalIcons();
  patchSecTitles();
  installUrgenceHelpers();
  installDocHelpers();
  installCstCrud();
  installPagesProxy();
}

export async function initApp() {
  await loadLegacy();
  installXmMotion();
  patchRouter();
  const { patchActionHandlers } = await import('../patches/action-handlers.js');
  patchActionHandlers();
  const { installRcBroadcast } = await import('../pages/rc/rc-broadcast.js');
  installRcBroadcast();

  const { goHome, goModule, goPage } = window;

  installLegacyBridge({
    goHome,
    goModule,
    goPage,
    pages: window.PAGES,
    icons: window.ICONS,
    titles: window.TITLES,
    rcData: window.RC_DATA,
    ncData: window.NC_DATA,
    changeStatut: window.changeStatut,
    updateProg: window.updateProg,
    deleteAction: window.deleteAction,
    showAddActionModal: window.showAddActionModal,
    confirmAddAction: window.confirmAddAction,
    openEditAction: window.openEditAction,
    saveEditAction: window.saveEditAction,
    badgeG: window.badgeG,
    badgeS: window.badgeS,
    filterRC: window.filterRC,
    filterNC: window.filterNC,
    timelineHTML: window.timelineHTML,
    renderChecklistNav: window.renderChecklistNav,
    toggleNotif: window.toggleNotif,
    readNotif: window.readNotif,
    markAllRead: window.markAllRead,
    doSearch: window.doSearch,
    searchKeydown: window.searchKeydown,
    clearSearch: window.clearSearch,
    closeSearch: window.closeSearch,
    execSearch: window.execSearch,
    setSearchIdx: window.setSearchIdx,
    pgSoon: window.pgSoon,
    envModal: window.envModal,
    envActEdit: window.envActEdit,
    envAddEnvAction: window.envAddEnvAction,
    envEditEnvAction: window.envEditEnvAction,
    envDelItem: window.envDelItem,
  });

  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    const nav = ({ module, page }) => {
      if (page === 'accueil' || module === 'accueil') {
        goHome();
        return;
      }
      if (page) goPage(page);
      else if (module) goModule(module);
      else goHome();
    };
    mountSidebar(sidebar, { onNavigate: nav });
    bindSidebar(sidebar, { onNavigate: nav });
    bindSidebarHover(sidebar);
  }

  bindShellEvents({ goHome, goPage });
  bindContentNavigation({ goPage });

  await goHome();
}
