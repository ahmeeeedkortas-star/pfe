/**
 * Saisie manuelle — pièces fabriquées, heures planifiées (localStorage).
 */

/** Valeurs par défaut (écrasées par la saisie utilisateur) */
export const NC_PROJECT_META = {
  M077: { libelle: 'Carter transmission', client: 'Client A', piecesFabriquees: 12500, heuresPlanifiees: 420 },
  M078: { libelle: 'Boîtier hydraulique', client: 'Client B', piecesFabriquees: 8200, heuresPlanifiees: 310 },
  M079: { libelle: 'Support moteur', client: 'Client C', piecesFabriquees: 5400, heuresPlanifiees: 180 },
  M080: { libelle: 'Ensemble visserie', client: 'Client C', piecesFabriquees: 15600, heuresPlanifiees: 290 },
};

const STORAGE_KEY = 'xm_nc_project_meta';
const OBJECTIF_TAUX_NQ = 2; // % objectif taux de non-qualité

export function getObjectifTauxNonQualite() {
  return OBJECTIF_TAUX_NQ;
}

function readStore() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeStore(data) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent('nc-project-meta-updated'));
}

/** Métadonnées projet : défauts + saisie utilisateur */
export function getProjectMeta(projectId) {
  const base = NC_PROJECT_META[projectId] || {
    libelle: projectId,
    client: '—',
    piecesFabriquees: 0,
    heuresPlanifiees: 0,
  };
  const saved = readStore()[projectId];
  if (!saved) return { ...base };
  return {
    libelle: saved.libelle ?? base.libelle,
    client: saved.client ?? base.client,
    piecesFabriquees:
      saved.piecesFabriquees != null ? Number(saved.piecesFabriquees) : base.piecesFabriquees,
    heuresPlanifiees:
      saved.heuresPlanifiees != null ? Number(saved.heuresPlanifiees) : base.heuresPlanifiees,
  };
}

/**
 * @param {string} projectId
 * @param {{ libelle?: string, piecesFabriquees?: number, heuresPlanifiees?: number }} patch
 */
export function saveProjectMeta(projectId, patch) {
  const all = readStore();
  const prev = getProjectMeta(projectId);
  all[projectId] = {
    libelle: patch.libelle ?? prev.libelle,
    piecesFabriquees:
      patch.piecesFabriquees != null ? Number(patch.piecesFabriquees) : prev.piecesFabriquees,
    heuresPlanifiees:
      patch.heuresPlanifiees != null ? Number(patch.heuresPlanifiees) : prev.heuresPlanifiees,
    updatedAt: new Date().toISOString(),
  };
  writeStore(all);
}

export function resetProjectMeta(projectId) {
  const all = readStore();
  delete all[projectId];
  writeStore(all);
}
