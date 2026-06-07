/**
 * Métriques projet — NC, rebuts, pertes de temps, taux de non-qualité.
 */
import { getNcData } from './nc.data.js';
import { getNcProjets } from './nc-projets.store.js';
import { getProjectMeta, NC_PROJECT_META } from './nc-project-meta.store.js';

export { NC_PROJECT_META };

const DEFAULT_REBUTS = { Critique: 12, Majeure: 6, Mineure: 2 };
const DEFAULT_HEURES = { Critique: 8, Majeure: 4, Mineure: 1.5 };

export function ncRebuts(nc) {
  return nc.rebuts ?? DEFAULT_REBUTS[nc.g] ?? 5;
}

export function ncHeuresPerte(nc) {
  return nc.heuresPerte ?? DEFAULT_HEURES[nc.g] ?? 3;
}

export function listProjects() {
  const fromMeta = Object.keys(NC_PROJECT_META || {});
  return [...new Set([...getNcProjets(), ...fromMeta])].sort();
}

/**
 * @param {string} projectId - ex. M077
 */
export function computeNcProjectReport(projectId) {
  const meta = getProjectMeta(projectId);
  const ncs = getNcData().filter((r) => r.p === projectId);
  const ncRefs = new Set(ncs.map((n) => n.n));
  const actions = (window.NC_ACTIONS || []).filter((a) => ncRefs.has(a.ref));

  let totalRebuts = 0;
  let totalHeures = 0;
  const ncRows = ncs.map((nc) => {
    const rebuts = ncRebuts(nc);
    const heures = ncHeuresPerte(nc);
    totalRebuts += rebuts;
    totalHeures += heures;
    return { ...nc, rebuts, heures };
  });

  const fab = meta.piecesFabriquees || 0;
  const tauxNonQualite = fab > 0 ? (totalRebuts / fab) * 100 : 0;
  const tauxPerteTemps =
    meta.heuresPlanifiees > 0 ? (totalHeures / meta.heuresPlanifiees) * 100 : 0;
  const actionsCloturees = actions.filter((a) => a.statut === 'Clôturée').length;
  const coutEstime = Math.round(totalHeures * 85); // €/h indicatif

  return {
    projectId,
    meta,
    ncs: ncRows,
    actions,
    totalNc: ncs.length,
    ncOuvertes: ncs.filter((n) => n.s !== 'Clôturé').length,
    totalRebuts,
    totalHeures,
    tauxNonQualite,
    tauxPerteTemps,
    actionsTotal: actions.length,
    actionsCloturees,
    coutEstime,
    piecesConformes: Math.max(0, fab - totalRebuts),
  };
}

export const NC_OBJECTIF_REPETITIVES = 10;

function normalizeNcMotif(desc) {
  const s = String(desc || '')
    .toLowerCase()
    .replace(/[^a-zàâäéèêëïîôùûü0-9\s]/gi, ' ')
    .trim();
  return s.split(/\s+/).slice(0, 4).join(' ') || 'autre';
}

export function computeTauxNcRepetitives(data) {
  const total = data.length;
  if (!total) return { count: 0, taux: 0, motifs: [] };
  const byMotif = {};
  data.forEach((nc) => {
    const key = normalizeNcMotif(nc.desc);
    if (!byMotif[key]) byMotif[key] = [];
    byMotif[key].push(nc);
  });
  const repIds = new Set();
  const motifs = [];
  Object.entries(byMotif).forEach(([motif, list]) => {
    if (list.length > 1) {
      list.forEach((nc) => repIds.add(nc.n));
      motifs.push({ motif, count: list.length });
    }
  });
  return {
    count: repIds.size,
    taux: Math.round((repIds.size / total) * 100),
    motifs: motifs.sort((a, b) => b.count - a.count),
  };
}

/** Agrégats globaux pour la page KPI */
export function computeGlobalNcQualityKpis() {
  const data = getNcData();
  const repetitives = computeTauxNcRepetitives(data);
  const projects = listProjects();
  let totalFab = 0;
  let totalRebut = 0;
  let totalHeuresPlan = 0;
  let totalHeuresPerte = 0;
  const byProject = projects.map((p) => {
    const r = computeNcProjectReport(p);
    totalFab += r.meta.piecesFabriquees || 0;
    totalRebut += r.totalRebuts;
    totalHeuresPlan += r.meta.heuresPlanifiees || 0;
    totalHeuresPerte += r.totalHeures;
    return r;
  });
  const tauxNonQualite = totalFab > 0 ? (totalRebut / totalFab) * 100 : 0;
  const tauxPerteTemps = totalHeuresPlan > 0 ? (totalHeuresPerte / totalHeuresPlan) * 100 : 0;
  return {
    byProject,
    totalFab,
    totalRebut,
    totalHeuresPlan,
    totalHeuresPerte,
    tauxNonQualite,
    tauxPerteTemps,
    projectsConfigured: byProject.filter((r) => r.meta.piecesFabriquees > 0).length,
    projectsTotal: projects.length,
    repetitives,
    totalNc: data.length,
  };
}
