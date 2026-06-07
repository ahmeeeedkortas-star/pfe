/**
 * Paramètres trimestriels RC — pièces livrées (dénominateur 5.4.1).
 */
const STORAGE_KEY = 'xm_rc_trimestre_meta';

const DEFAULTS = {
  '2026-T1': { piecesLivrees: 28000, label: 'Jan–Mar 2026' },
  '2026-T2': { piecesLivrees: 32000, label: 'Avr–Jun 2026' },
  '2026-T3': { piecesLivrees: 30000, label: 'Jul–Sep 2026' },
  '2026-T4': { piecesLivrees: 35000, label: 'Oct–Déc 2026' },
};

function read() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function write(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent('rc-trimestre-updated'));
}

export function trimestreKey(year, trimestre) {
  return `${year}-${trimestre}`;
}

export function getTrimestreMeta(year, trimestre) {
  const key = trimestreKey(year, trimestre);
  const saved = read()[key];
  const def = DEFAULTS[key] || { piecesLivrees: 10000, label: trimestre };
  return {
    piecesLivrees: saved?.piecesLivrees != null ? Number(saved.piecesLivrees) : def.piecesLivrees,
    label: def.label || trimestre,
  };
}

export function saveTrimestreMeta(year, trimestre, piecesLivrees) {
  const key = trimestreKey(year, trimestre);
  const all = read();
  all[key] = { piecesLivrees: Number(piecesLivrees), updatedAt: new Date().toISOString() };
  write(all);
}

/** Trimestre courant selon la date du jour */
export function currentTrimestre(date = new Date()) {
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  const t = m <= 3 ? 'T1' : m <= 6 ? 'T2' : m <= 9 ? 'T3' : 'T4';
  return { year: y, trimestre: t };
}
