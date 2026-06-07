/**
 * Données EPI — suivi par employé (ISO 45001).
 */
export const EPI_REQUIS = [
  { id: 'casque', label: 'Casque de sécurité' },
  { id: 'lunettes', label: 'Lunettes de protection' },
  { id: 'gants', label: 'Gants de protection' },
  { id: 'chaussures', label: 'Chaussures de sécurité' },
  { id: 'auditif', label: 'Protection auditive' },
];

const REQ_COUNT = EPI_REQUIS.length;

export const SEC_EPI_EMPLOYEES = [
  {
    id: 'EMP-0001',
    nom: 'Mohamed Ali',
    poste: 'Opérateur CNC',
    dep: 'Usinage',
    tel: '06 12 34 56 78',
    email: 'm.ali@xpertmeca.fr',
    embauche: '15/03/2022',
    epi: [
      { id: 'casque', attribue: '12/01/2025', renouvellement: '12/01/2027', statut: 'Conforme' },
      { id: 'lunettes', attribue: '12/01/2025', renouvellement: '12/01/2027', statut: 'Conforme' },
      { id: 'gants', attribue: '05/02/2025', renouvellement: '05/02/2026', statut: 'Conforme' },
      { id: 'chaussures', attribue: '10/03/2024', renouvellement: '10/03/2026', statut: 'Conforme' },
      { id: 'auditif', attribue: '12/01/2025', renouvellement: '12/01/2027', statut: 'Conforme' },
    ],
  },
  {
    id: 'EMP-0089',
    nom: 'Fatima Benali',
    poste: 'Soudeuse',
    dep: 'Assemblage',
    tel: '06 98 76 54 32',
    email: 'f.benali@xpertmeca.fr',
    embauche: '02/06/2021',
    epi: [
      { id: 'casque', attribue: '20/11/2024', renouvellement: '20/11/2026', statut: 'Conforme' },
      { id: 'lunettes', attribue: '20/11/2024', renouvellement: '20/11/2026', statut: 'Conforme' },
      { id: 'gants', attribue: '01/04/2025', renouvellement: '15/06/2025', statut: 'À renouveler' },
      { id: 'chaussures', attribue: '10/01/2024', renouvellement: '10/01/2026', statut: 'Conforme' },
    ],
  },
  {
    id: 'EMP-0201',
    nom: 'Karim Ouali',
    poste: 'Cariste',
    dep: 'Logistique',
    tel: '06 11 22 33 44',
    email: 'k.ouali@xpertmeca.fr',
    embauche: '08/09/2023',
    epi: [],
  },
  {
    id: 'EMP-0156',
    nom: 'Sara Meziane',
    poste: 'Contrôle qualité',
    dep: 'Qualité',
    tel: '06 55 44 33 22',
    email: 's.meziane@xpertmeca.fr',
    embauche: '11/01/2024',
    epi: [
      { id: 'lunettes', attribue: '11/01/2024', renouvellement: '11/01/2026', statut: 'Conforme' },
      { id: 'gants', attribue: '11/01/2024', renouvellement: '11/01/2026', statut: 'Conforme' },
      { id: 'chaussures', attribue: '11/01/2024', renouvellement: '11/01/2026', statut: 'Conforme' },
    ],
  },
  {
    id: 'EMP-0034',
    nom: 'Youssef Hamdi',
    poste: 'Technicien maintenance',
    dep: 'Maintenance',
    tel: '06 77 88 99 00',
    email: 'y.hamdi@xpertmeca.fr',
    embauche: '20/05/2019',
    epi: [
      { id: 'casque', attribue: '01/02/2025', renouvellement: '01/02/2027', statut: 'Conforme' },
      { id: 'lunettes', attribue: '01/02/2025', renouvellement: '01/02/2027', statut: 'Conforme' },
      { id: 'gants', attribue: '01/02/2025', renouvellement: '01/02/2027', statut: 'Conforme' },
      { id: 'chaussures', attribue: '01/02/2025', renouvellement: '01/02/2027', statut: 'Conforme' },
      { id: 'auditif', attribue: '01/02/2025', renouvellement: '01/02/2027', statut: 'Conforme' },
    ],
  },
  {
    id: 'EMP-0198',
    nom: 'Nadia Cherif',
    poste: 'Opératrice assemblage',
    dep: 'Assemblage',
    tel: '06 66 55 44 33',
    email: 'n.cherif@xpertmeca.fr',
    embauche: '14/07/2022',
    epi: [
      { id: 'casque', attribue: '10/05/2023', renouvellement: '10/05/2025', statut: 'Expiré' },
      { id: 'lunettes', attribue: '14/07/2022', renouvellement: '14/07/2024', statut: 'Expiré' },
    ],
  },
  {
    id: 'EMP-0112',
    nom: 'Rachid Boudiaf',
    poste: 'Opérateur presse',
    dep: 'Assemblage',
    tel: '06 44 33 22 11',
    email: 'r.boudiaf@xpertmeca.fr',
    embauche: '03/04/2020',
    epi: [
      { id: 'casque', attribue: '03/04/2024', renouvellement: '03/04/2026', statut: 'Conforme' },
      { id: 'lunettes', attribue: '03/04/2024', renouvellement: '03/04/2026', statut: 'Conforme' },
      { id: 'gants', attribue: '01/05/2026', renouvellement: '10/06/2026', statut: 'À renouveler' },
      { id: 'chaussures', attribue: '03/04/2024', renouvellement: '03/04/2026', statut: 'Conforme' },
    ],
  },
  {
    id: 'EMP-0067',
    nom: 'Leïla Mansouri',
    poste: 'Responsable HSE',
    dep: 'QHSE',
    tel: '06 22 11 00 99',
    email: 'l.mansouri@xpertmeca.fr',
    embauche: '10/01/2018',
    photo: 'https://api.dicebear.com/7.x/initials/svg?seed=LM&backgroundColor=1e40af',
    epi: [
      { id: 'casque', attribue: '10/01/2025', renouvellement: '10/01/2027', statut: 'Conforme' },
      { id: 'lunettes', attribue: '10/01/2025', renouvellement: '10/01/2027', statut: 'Conforme' },
      { id: 'gants', attribue: '10/01/2025', renouvellement: '10/01/2027', statut: 'Conforme' },
      { id: 'chaussures', attribue: '10/01/2025', renouvellement: '10/01/2027', statut: 'Conforme' },
      { id: 'auditif', attribue: '10/01/2025', renouvellement: '10/01/2027', statut: 'Conforme' },
    ],
  },
  {
    id: 'EMP-0175',
    nom: 'Thomas Girard',
    poste: 'Magasinier',
    dep: 'Logistique',
    tel: '06 88 77 66 55',
    email: 't.girard@xpertmeca.fr',
    embauche: '22/11/2023',
    epi: [
      { id: 'chaussures', attribue: '22/11/2023', renouvellement: '22/11/2025', statut: 'Conforme' },
      { id: 'gants', attribue: '22/11/2023', renouvellement: '22/11/2025', statut: 'Conforme' },
    ],
  },
  {
    id: 'EMP-0041',
    nom: 'Amina Khelifi',
    poste: 'Peintre industrielle',
    dep: 'Finition',
    tel: '06 33 44 55 66',
    email: 'a.khelifi@xpertmeca.fr',
    embauche: '06/08/2021',
    epi: [
      { id: 'casque', attribue: '06/08/2024', renouvellement: '06/08/2026', statut: 'Conforme' },
      { id: 'lunettes', attribue: '06/08/2024', renouvellement: '06/08/2026', statut: 'Conforme' },
      { id: 'gants', attribue: '06/08/2024', renouvellement: '06/08/2026', statut: 'Conforme' },
      { id: 'chaussures', attribue: '06/08/2024', renouvellement: '06/08/2026', statut: 'Conforme' },
      { id: 'auditif', attribue: '06/08/2024', renouvellement: '20/06/2026', statut: 'À renouveler' },
    ],
  },
  {
    id: 'EMP-0220',
    nom: 'Philippe Martin',
    poste: 'Chef d\'équipe usinage',
    dep: 'Usinage',
    tel: '06 99 88 77 66',
    email: 'p.martin@xpertmeca.fr',
    embauche: '12/02/2017',
    epi: [
      { id: 'casque', attribue: '12/02/2025', renouvellement: '12/02/2027', statut: 'Conforme' },
      { id: 'lunettes', attribue: '12/02/2025', renouvellement: '12/02/2027', statut: 'Conforme' },
      { id: 'gants', attribue: '12/02/2025', renouvellement: '12/02/2027', statut: 'Conforme' },
      { id: 'chaussures', attribue: '12/02/2025', renouvellement: '12/02/2027', statut: 'Conforme' },
      { id: 'auditif', attribue: '12/02/2025', renouvellement: '12/02/2027', statut: 'Conforme' },
    ],
  },
  {
    id: 'EMP-0093',
    nom: 'Hassan El Amrani',
    poste: 'Stagiaire production',
    dep: 'Assemblage',
    tel: '06 12 00 11 22',
    email: 'h.elamrani@xpertmeca.fr',
    embauche: '01/03/2026',
    epi: [],
  },
];

export const SEC_EPI_CONTROLES = [
  { id: 'CTL-001', d: '18/05/2026', emp: 'Mohamed Ali', empId: 'EMP-0001', resultat: 'Conforme', items: '5/5', observation: 'RAS', par: 'HSE' },
  { id: 'CTL-002', d: '15/05/2026', emp: 'Fatima Benali', empId: 'EMP-0089', resultat: 'Non conforme', items: '4/5', observation: 'Gants non portés en zone soudure', par: 'Chef atelier' },
  { id: 'CTL-003', d: '10/05/2026', emp: 'Nadia Cherif', empId: 'EMP-0198', resultat: 'Non conforme', items: '2/5', observation: 'Casque et lunettes expirés', par: 'HSE' },
];

export const EPI_NC_TYPES = [
  'Absence d\'EPI',
  'EPI inadapté',
  'EPI endommagé',
  'EPI non renouvelé',
  'Non-port des EPI',
];

export const SEC_EPI_NC_HISTORY = [
  { n: 'EPI-NC-001', d: '15/05/2026', emp: 'Karim Ouali', type: 'Absence d\'EPI', desc: 'Pas de chaussures de sécurité en zone logistique', par: 'HSE', s: 'Ouverte' },
  { n: 'EPI-NC-002', d: '12/05/2026', emp: 'Nadia Cherif', type: 'EPI non renouvelé', desc: 'Casque périmé — renouvellement en cours', par: 'Chef atelier', s: 'En cours' },
  { n: 'EPI-NC-003', d: '08/05/2026', emp: 'Fatima Benali', type: 'EPI endommagé', desc: 'Gants de soudure déchirés', par: 'HSE', s: 'Fermée' },
];

function parseFrDate(s) {
  const p = String(s || '').split('/');
  if (p.length < 3) return null;
  return new Date(parseInt(p[2], 10), parseInt(p[1], 10) - 1, parseInt(p[0], 10));
}

export function joursAvantRenouvellement(dateStr) {
  const d = parseFrDate(dateStr);
  if (!d) return null;
  const diff = Math.ceil((d - new Date()) / 86400000);
  return diff;
}

export function labelRenouvellement(jours) {
  if (jours == null) return '—';
  if (jours < 0) return `Expiré (${Math.abs(jours)}j)`;
  if (jours === 0) return "Aujourd'hui";
  return `J-${jours}`;
}

export function statutEmployeEpi(emp) {
  const n = emp.epi?.length || 0;
  const hasExpired = (emp.epi || []).some(
    (e) => e.statut === 'Expiré' || (joursAvantRenouvellement(e.renouvellement) ?? 1) < 0
  );
  const hasRenew = (emp.epi || []).some((e) => e.statut === 'À renouveler');

  if (n === 0 || hasExpired) {
    return { code: 'aucun', label: 'Rouge', cls: 'br', tone: 'rouge', filter: n === 0 ? 'Aucun' : 'Expiré' };
  }
  if (n < REQ_COUNT || hasRenew) {
    return { code: 'incomplet', label: 'Orange', cls: 'by', tone: 'orange', filter: 'Incomplet' };
  }
  return { code: 'complet', label: 'Vert', cls: 'bg3', tone: 'vert', filter: 'Complet' };
}

export function prochainRenouvellement(emp) {
  let min = null;
  let minJ = Infinity;
  (emp.epi || []).forEach((e) => {
    const j = joursAvantRenouvellement(e.renouvellement);
    if (j != null && j < minJ) {
      minJ = j;
      min = e.renouvellement;
    }
  });
  return { date: min, jours: minJ === Infinity ? null : minJ };
}

export function getSecEpiEmployees() {
  if (window.SEC_EPI_EMPLOYEES?.length) return window.SEC_EPI_EMPLOYEES;
  return SEC_EPI_EMPLOYEES;
}

export function getSecEpiNcHistory() {
  if (window.SEC_EPI_NC?.length) return window.SEC_EPI_NC;
  return SEC_EPI_NC_HISTORY;
}

export function computeEpiStats(employees = getSecEpiEmployees()) {
  const total = employees.length;
  let complet = 0;
  let incomplet = 0;
  let aucun = 0;
  let aRenouveler = 0;

  employees.forEach((emp) => {
    const st = statutEmployeEpi(emp);
    if (st.code === 'complet') complet += 1;
    else if (st.code === 'incomplet') incomplet += 1;
    else aucun += 1;

    (emp.epi || []).forEach((e) => {
      const j = joursAvantRenouvellement(e.renouvellement);
      if (j != null && j >= 0 && j <= 30) aRenouveler += 1;
    });
  });

  return { total, complet, incomplet, aucun, aRenouveler };
}

export function epiLabel(id) {
  return EPI_REQUIS.find((e) => e.id === id)?.label || id;
}
