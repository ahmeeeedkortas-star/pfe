/** @legacy — données notifications (UI dans patches/notifications-ui.js) */
const NOTIFICATIONS = [
  { id: 1, type: 'critical', title: 'Objectif RC dépassé — T2 2026', body: '9 réclamations enregistrées. Objectif ≤ 2 RC / semestre.', time: 'Il y a 10 min', read: false, action: 'rc-kpi' },
  { id: 2, type: 'warning', title: 'NC Critique en attente — NC-001', body: 'Machine CN01 · Usinage · Délai dépassé depuis 1j.', time: 'Il y a 1h', read: false, action: 'nc-liste' },
  { id: 3, type: 'warning', title: 'RC-006 sans responsable affecté', body: 'Réclamation Critique Client B — Défaut matière lot 42.', time: 'Il y a 2h', read: false, action: 'rc-liste' },
  { id: 4, type: 'info', title: 'Audit interne planifié — Semaine 22', body: 'Audit ISO 9001 prévu du 26 au 28 mai 2026.', time: 'Hier', read: true, action: 'audit-plan' },
  { id: 5, type: 'success', title: 'NC-007 clôturée avec succès', body: 'Assemblage · Poste AS2 · Validé par Y. Reda.', time: 'Hier', read: true, action: 'nc-liste' },
  { id: 6, type: 'info', title: '8D RC-001 — Étape D4 à compléter', body: 'Analyse des causes racines en attente. Échéance : 20/05.', time: 'Il y a 2j', read: true, action: 'rc-8d' },
];

Object.assign(window, { NOTIFICATIONS });
