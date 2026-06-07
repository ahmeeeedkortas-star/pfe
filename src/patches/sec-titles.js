/**
 * Supprime les boutons topbar dupliqués (déjà présents dans le contenu des pages).
 */
export function patchSecTitles() {
  if (!window.TITLES) return;

  const emptyTopbar = [
    'sec-kpi',
    'sec-tb',
    'sec-risques',
    'sec-checklists',
    'sec-cl-registre',
    'sec-accidents',
    'sec-urgence',
    'sec-actions',
    'doc-liste',
    'sec-cl-ext',
    'sec-cl-phar',
    'sec-cl-sst',
    'sec-cl-veh',
    'sec-cl-epi',
    'sec-cl-evaq',
    'sec-cl-custom',
    'env-aspects',
    'audit-plan',
  ];

  for (const id of emptyTopbar) {
    if (window.TITLES[id]) window.TITLES[id][2] = '';
  }
}
