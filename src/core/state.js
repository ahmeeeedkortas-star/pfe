/**
 * État global de l'application (store léger).
 * À terme : remplacer par un store réactif (Pinia, Zustand, etc.).
 */
export const appState = {
  module: 'accueil',
  page: 'accueil',
  currentRC: null,
  d8Step: 4,
  qrqcStep: 2,
  auditStep: 2,
  rcTab: 'info',
  ncTab: 'info',
  ficheTab: 'info',
};

/** Compatibilité legacy — une seule référence STATE partagée. */
export function bindLegacyState() {
  if (window.STATE && window.STATE !== appState) {
    Object.assign(appState, window.STATE);
  }
  window.STATE = appState;
}
