/** Données initiales — plans d'urgence SST (spec v5). */
import { canAutoSeed } from '../core/empty-platform.js';

export function seedUrgenceData() {
  if (!canAutoSeed()) {
    if (!window.URG_PLANS) window.URG_PLANS = [];
    return;
  }
  if (!window.URG_PLANS) {
    window.URG_PLANS = [
      {
        id: 1,
        code: 'PU-INC-01',
        titre: "Plan d'incendie & évacuation incendie",
        type: 'Incendie',
        responsable: 'A. Hadj-Ali',
        version: 'V2',
        date: '01/01/2025',
        statut: 'Validé',
        approbateur: 'Dir. Général',
        objectif:
          "Définir les procédures d'intervention en cas d'incendie et protéger les personnes et les biens.",
        champ: 'Tous les bâtiments, ateliers, bureaux et zones de stockage XPERT-MECA.',
        procedures: [
          "Déclencher immédiatement l'alarme incendie",
          'Appeler le 18 (Pompiers) et 15 (SAMU)',
          "Guider l'évacuation vers les issues de secours",
          'Rejoindre le point de rassemblement Parking A',
          'Ne jamais utiliser les ascenseurs',
          'Prévenir le Responsable HSE',
          "Effectuer l'appel nominal par service",
          "Attendre l'autorisation des pompiers avant retour",
          "Remplir le registre d'évacuation",
        ],
        equipements: [
          ['Extincteurs à poudre ABC', '28 unités — vérifiés le 15/05/2026'],
          ['RIA (Robinets Incendie Armés)', '6 unités conformes'],
          ['Détecteurs de fumée', '42 unités testés'],
          ['Issues de secours balisées', '12 sorties — balisage LED autonome'],
          ['Point de rassemblement', 'Parking A côté Est — marquage sol jaune'],
          ["Plan d'évacuation affiché", 'Présent dans chaque zone — V2'],
        ],
      },
      {
        id: 2,
        code: 'PU-CHI-01',
        titre: 'Plan accident chimique',
        type: 'Chimique',
        responsable: 'A. Hadj-Ali',
        version: 'V1',
        date: '15/02/2025',
        statut: 'Validé',
        approbateur: 'HSE',
        objectif: 'Gérer les déversements et expositions aux produits chimiques.',
        champ: 'Zones stockage, utilisation et laboratoire.',
        procedures: ['Isoler la zone', 'Porter les EPI adaptés', 'Alerter HSE et fournisseur', 'Neutraliser si possible', 'Évacuer si nécessaire'],
        equipements: [['Kit déversement', '2 kits'], ['Douche oculaire', '4 postes'], ['FDS disponibles', 'Registre à jour']],
      },
      {
        id: 3,
        code: 'PU-ELE-01',
        titre: 'Plan accident électrique',
        type: 'Électrique',
        responsable: 'Maintenance',
        version: 'V1',
        date: '01/03/2025',
        statut: 'Validé',
        approbateur: 'HSE',
        objectif: 'Intervenir en sécurité sur accident ou arc électrique.',
        champ: 'Ateliers et locaux techniques.',
        procedures: ['Couper l’alimentation', 'Ne pas toucher la victime si contact', 'Appeler le 15', 'Prévenir HSE'],
        equipements: [['BAES', 'Testés mensuellement'], ['Extincteur CO2', '12 unités']],
      },
      {
        id: 4,
        code: 'PU-SIS-01',
        titre: 'Plan séisme',
        type: 'Séisme',
        responsable: 'HSE',
        version: 'V1',
        date: '01/04/2025',
        statut: 'En révision',
        approbateur: 'Dir. Général',
        objectif: 'Protéger le personnel en cas de séisme.',
        champ: 'Ensemble du site.',
        procedures: ['Se mettre à l’abri', 'Couper gaz/électricité si possible', 'Évacuer après la secousse', 'Point rassemblement'],
        equipements: [['Trousse urgence', 'Par zone'], ['Radio', '3 postes']],
      },
      {
        id: 5,
        code: 'PU-EVA-01',
        titre: "Plan d'évacuation générale",
        type: 'Évacuation',
        responsable: 'A. Hadj-Ali',
        version: 'V3',
        date: '01/01/2025',
        statut: 'Validé',
        approbateur: 'Dir. Général',
        objectif: "Organiser l'évacuation rapide et sécurisée du personnel.",
        champ: 'Site XPERT-MECA — tous bâtiments.',
        procedures: ['Alarme générale', 'Guider vers issues', 'Point rassemblement Parking A', 'Appel nominal'],
        equipements: [['Signalétique', 'Conforme'], ['Éclairage de secours', 'Autonomie > 1h']],
      },
    ];
  }

  if (!window.URG_EXERCICES) {
    window.URG_EXERCICES = [
      { id: 1, nom: 'Exercice incendie Bât. A', type: 'Incendie', date: '15/01/2025', resp: 'HSE', participants: 45, statut: 'Réalisé', resultat: 'Conforme', duree: '45 min', obs: '' },
      { id: 2, nom: 'Exercice évacuation générale', type: 'Évacuation', date: '20/03/2025', resp: 'HSE', participants: 120, statut: 'Réalisé', resultat: 'Observation', duree: '1h', obs: 'Retard point rassemblement' },
      { id: 3, nom: 'Formation 1ers secours', type: 'SST / PRAP', date: '10/06/2025', resp: 'Infirmière', participants: 12, statut: 'Planifié', resultat: '—', duree: '4h', obs: '' },
      { id: 4, nom: 'Exercice incendie Bât. B', type: 'Incendie', date: '15/09/2025', resp: 'HSE', participants: 60, statut: 'Planifié', resultat: '—', duree: '45 min', obs: '' },
      { id: 5, nom: 'Simulation urgence annuelle', type: 'Multi-risques', date: '20/11/2025', resp: 'HSE', participants: 150, statut: 'Planifié', resultat: '—', duree: '2h', obs: '' },
    ];
  }

  if (!window.URG_CONTACTS) {
    window.URG_CONTACTS = [
      { id: 1, nom: 'Pompiers SDIS', num: '18', cat: 'Urgence national', ic: '🚒', poste: '', email: '' },
      { id: 2, nom: 'SAMU', num: '15', cat: 'Urgence national', ic: '🚑', poste: '', email: '' },
      { id: 3, nom: 'Police / Gendarmerie', num: '17', cat: 'Urgence national', ic: '👮', poste: '', email: '' },
      { id: 4, nom: 'Urgences (Européen)', num: '112', cat: 'Urgence national', ic: '🆘', poste: '', email: '' },
      { id: 5, nom: 'A. Hadj-Ali — HSE', num: '06 12 34 56 78', cat: 'Interne', ic: '🛡', poste: 'Poste 101', email: 'a.hadjali@xpertmeca.com' },
      { id: 6, nom: 'Directeur Général', num: '06 98 76 54 32', cat: 'Interne', ic: '👤', poste: 'Poste 100', email: 'direction@xpertmeca.com' },
      { id: 7, nom: 'Infirmière de site', num: 'Poste 102', cat: 'Interne', ic: '🏥', poste: 'Poste 102', email: 'infirmerie@xpertmeca.com' },
      { id: 8, nom: 'Maintenance Urgence', num: 'Poste 210', cat: 'Interne', ic: '⚙', poste: 'Poste 210', email: 'maintenance@xpertmeca.com' },
      { id: 9, nom: 'Médecin du travail', num: '04 91 XX XX XX', cat: 'Médical', ic: '🩺', poste: '', email: 'medecin@sante-travail.fr' },
      { id: 10, nom: 'Centre Anti-Poison', num: '04 91 75 25 25', cat: 'Médical', ic: '🩺', poste: 'Urgences 24h/24', email: '' },
      { id: 11, nom: 'Fournisseur chimie', num: '0800 XXX XXX', cat: 'Externe', ic: '⚗', poste: 'Urgence produits', email: 'urgence@fournisseur.fr' },
    ];
  }

  if (window.urgSelectedPlan == null) window.urgSelectedPlan = window.URG_PLANS[0]?.id ?? null;
  if (window.urgTab == null) window.urgTab = 0;
}
