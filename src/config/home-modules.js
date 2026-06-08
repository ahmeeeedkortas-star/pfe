/**
 * Tuiles page d'accueil — icônes colorées (modèle d'origine).
 */
export const HOME_MODULES = [
  {
    mod: 'rc',
    label: 'Réclamations Clients',
    sub: 'ISO 9001 · 8D · Actions · KPI',
    badgeKey: 'rc',
    bc: '#dc2626',
    bg: 'linear-gradient(165deg,#1e3a8a 0%,#1d4ed8 60%,#2563eb 100%)',
    shadow: '0 8px 28px rgba(37,99,235,.45)',
  },
  {
    mod: 'nc',
    label: 'Non-Conformités',
    sub: 'QRQC · Actions · KPI',
    badgeKey: 'nc',
    bc: '#dc2626',
    bg: 'linear-gradient(165deg,#7f1d1d 0%,#b91c1c 60%,#dc2626 100%)',
    shadow: '0 8px 28px rgba(220,38,38,.45)',
  },
  {
    mod: 'cst',
    label: 'Contexte & Stratégie',
    sub: 'SWOT · Risques · Politique QHSE',
    badgeKey: null,
    bc: '#000080',
    bg: 'linear-gradient(165deg,#000050 0%,#000066 50%,#000080 100%)',
    shadow: '0 8px 28px rgba(0,0,128,.32)',
  },
  {
    mod: 'audit',
    label: 'Audit ISO',
    sub: 'Planning · Checklists · Constats',
    badgeKey: 'audit',
    bc: '#7c3aed',
    bg: 'linear-gradient(165deg,#5b21b6 0%,#7c3aed 55%,#a78bfa 100%)',
    shadow: '0 8px 28px rgba(124,58,237,.35)',
  },
  {
    mod: 'doc',
    label: 'Documentation',
    sub: 'Bibliothèque · Workflow · Validation',
    badgeKey: null,
    bc: '#475569',
    bg: 'linear-gradient(165deg,#1e293b 0%,#334155 50%,#64748b 100%)',
    shadow: '0 8px 28px rgba(51,65,85,.35)',
  },
  {
    mod: 'fives',
    label: 'Audits 5S',
    sub: 'Zones · KPI · Actions',
    badgeKey: 'fives',
    bc: '#d97706',
    bg: 'linear-gradient(165deg,#b45309 0%,#f59e0b 55%,#fbbf24 100%)',
    shadow: '0 8px 28px rgba(245,158,11,.35)',
  },
  {
    mod: 'sec',
    label: 'Sécurité SST',
    sub: 'ISO 45001 · Accidents · Checklists',
    badgeKey: 'sec',
    bc: '#991b1b',
    bg: 'linear-gradient(165deg,#7f1d1d 0%,#991b1b 50%,#b91c1c 100%)',
    shadow: '0 8px 28px rgba(153,27,27,.35)',
  },
  {
    mod: 'env',
    label: 'Environnement',
    sub: 'ISO 14001 · Aspects · Déchets',
    badgeKey: 'env',
    bc: '#16a34a',
    bg: 'linear-gradient(165deg,#047857 0%,#10b981 55%,#34d399 100%)',
    shadow: '0 8px 28px rgba(16,185,129,.35)',
  },
];

export function getHomeModuleBadge(key, empty) {
  if (empty || !key) return null;
  const map = { rc: 7, nc: 12, audit: 3, fives: 9, sec: 2, env: 3 };
  return map[key] ?? null;
}
