/**
 * Pont de compatibilité : expose les APIs utilisées par les templates HTML inline (onclick).
 * À supprimer progressivement au profit de data-action + délégation d'événements.
 */
import { appState } from '../core/state.js';

export function installLegacyBridge(api) {
  const globals = {
    STATE: appState,
    goHome: api.goHome,
    goModule: api.goModule,
    goPage: api.goPage,
    switchTab: api.switchTab,
    PAGES: api.pages,
    ICONS: api.icons,
    TITLES: api.titles,
    RC_DATA: api.rcData,
    NC_DATA: api.ncData,
    changeStatut: api.changeStatut,
    updateProg: api.updateProg,
    deleteAction: api.deleteAction,
    showAddActionModal: api.showAddActionModal,
    confirmAddAction: api.confirmAddAction,
    openEditAction: api.openEditAction,
    saveEditAction: api.saveEditAction,
    badgeG: api.badgeG,
    badgeS: api.badgeS,
    filterRC: api.filterRC,
    filterNC: api.filterNC,
    timelineHTML: api.timelineHTML,
    renderChecklistNav: api.renderChecklistNav,
    toggleNotif: api.toggleNotif,
    readNotif: api.readNotif,
    markAllRead: api.markAllRead,
    doSearch: api.doSearch,
    searchKeydown: api.searchKeydown,
    clearSearch: api.clearSearch,
    closeSearch: api.closeSearch,
    execSearch: api.execSearch,
    setSearchIdx: api.setSearchIdx,
    pgSoon: api.pgSoon,
    envModal: api.envModal,
    envActEdit: api.envActEdit,
    envAddEnvAction: api.envAddEnvAction,
    envEditEnvAction: api.envEditEnvAction,
    envDelItem: api.envDelItem,
  };

  Object.assign(window, globals);
}
