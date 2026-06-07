/**
 * Navigation sidebar — modules principaux uniquement (sous-pages via barre icônes).
 */
export const SIDEBAR_NAV = [
  { type: 'item', id: 'sb-accueil', label: 'Accueil', page: 'accueil', module: 'accueil' },
  { type: 'section', label: 'Modules' },
  { type: 'item', id: 'sb-rc', label: 'Réclamations', module: 'rc' },
  { type: 'item', id: 'sb-nc', label: 'Non-conformités', module: 'nc' },
  { type: 'item', id: 'sb-cst', label: 'Contexte & stratégie', module: 'cst' },
  { type: 'item', id: 'sb-audit', label: 'Audit ISO', module: 'audit', page: 'audit-tb' },
  { type: 'item', id: 'sb-doc', label: 'Documentation', module: 'doc', page: 'doc-biblio' },
  { type: 'item', id: 'sb-fives', label: 'Audits 5S', module: 'fives', page: '5s-tb' },
  { type: 'item', id: 'sb-sec', label: 'Sécurité SST', module: 'sec', page: 'sec-kpi' },
  { type: 'item', id: 'sb-env', label: 'Environnement', module: 'env', page: 'env-dash' },
  { type: 'section', label: 'Système' },
  { type: 'item', id: 'sb-users', label: 'Utilisateurs', icon: 'users', disabled: true },
  { type: 'item', id: 'sb-settings', label: 'Paramètres', icon: 'settings', page: 'settings' },
  { type: 'footer', id: 'sb-help', label: 'Aide', icon: 'help' },
];
