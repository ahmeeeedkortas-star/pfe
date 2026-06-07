/**
 * Palette plateforme QHSE — pilier Qualité / Environnement / SST + logo.
 */
export const BRAND_COLORS = {
  red: '#E21B24',
  redDark: '#B8151C',
  redLight: '#F04A52',
  redSoft: '#FEF2F2',
  black: '#0A1020',
  blackSoft: '#0F172A',
  charcoal: '#1E293B',
  graphite: '#334155',
  white: '#FFFFFF',
  surface: '#EEF2F8',
  surfaceMuted: '#E2E8F0',
  text: '#0F172A',
  textSecondary: '#475569',
  muted: '#64748B',
  border: '#D8E0EC',
  quality: '#3B82F6',
  qualityDark: '#2563EB',
  env: '#22C55E',
  envDark: '#16A34A',
  sst: '#F97316',
  sstDark: '#EA580C',
  /** Séries graphiques — Qualité, Env., SST, puis neutres */
  chart: ['#3B82F6', '#22C55E', '#F97316', '#0F172A', '#64748B', '#94A3B8'],
};

export function exposeBrandColors() {
  window.XM_BRAND_COLORS = BRAND_COLORS;
}
