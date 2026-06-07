/**
 * Module Documentation — intégration React (SMI documentaire), IDs qhse_v11.
 */
import { DOC_PAGE_IDS } from '../pages/doc/doc-mount.page.js';

export function patchDocModule() {
  import('../documentation/embed.tsx').catch(() => {});

  const docTitles = {
    'doc-tb': ['Documentation QHSE', 'Tableau de bord — KPI & alertes', ''],
    'doc-biblio': ['Bibliothèque documentaire', 'Registre — Procédures · Instructions · Enregistrements', ''],
    'doc-create': ['Nouveau document', 'Création — code auto · version V1', ''],
    'doc-history': ['Historique & versions', 'Recherche · comparaison', ''],
    'doc-read': ['Fiche document', 'Consultation · métadonnées · contenu', ''],
    'doc-edit': ['Modifier le document', 'Éditeur intégré · versions', ''],
    'doc-kpi': ['Indicateurs documentaires', 'KPI · conformité · délais', ''],
    'doc-dash': ['Documentation QHSE', 'Tableau de bord — indicateurs documentaires', ''],
    'doc-liste': ['Bibliothèque documentaire', 'Registre central QHSE', ''],
    'doc-recherche': ['Recherche & filtres', 'Recherche intelligente', ''],
    'doc-validation': ['Bibliothèque documentaire', 'Registre — Procédures · Instructions · Enregistrements', ''],
    'doc-new': ['Nouveau document', 'Création et workflow', ''],
    'doc-admin': ['Documentation QHSE', 'Tableau de bord — KPI & alertes', ''],
  };

  if (window.TITLES) Object.assign(window.TITLES, docTitles);

  if (window.ICONS?.doc) {
    /* Surcharge via config/modules.js (ids v11) */
  }

  void DOC_PAGE_IDS;
}
