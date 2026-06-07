/**
 * Calcul tableau de bord NC — données réelles.
 */
import { getNcData } from './nc.data.js';
import { MOIS_LABELS, parseNcDate } from './nc-date.utils.js';
import { NC_OBJ, countNcByGraviteForMonth } from './nc-kpi-objectives.data.js';
import { NC_CAUSES_RACINES, NC_STADES_DETECTION } from './nc-causes.js';
import { computeTauxNcRepetitives, NC_OBJECTIF_REPETITIVES } from './nc-project-report.data.js';

/** Objectifs indicateurs KPI NC */
export const NC_KPI_OBJ = {
  delaiMoyenJours: 3,
  tauxRecurrenceMax: NC_OBJECTIF_REPETITIVES,
};

/** Parse délai « 3j », « 5 jours », etc. */
export function parseDelaiJours(dl) {
  if (!dl || dl === '—') return null;
  const m = String(dl).match(/(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

/** Délai moyen de traitement (jours) sur les NC de la période */
export function computeDelaiMoyenTraitement(ncs) {
  const days = ncs
    .map((nc) => {
      if (nc.joursTraitement != null) return Number(nc.joursTraitement);
      if (nc.s === 'Clôturé' && nc.prog === 100) return parseDelaiJours(nc.dl);
      return parseDelaiJours(nc.dl);
    })
    .filter((n) => n != null && !Number.isNaN(n));
  if (!days.length) return 0;
  return days.reduce((a, b) => a + b, 0) / days.length;
}

/** Part des NC par département (% du total période) */
export function computeTauxNcParDepartement(ncs) {
  const total = ncs.length;
  if (!total) return [];
  const byDep = {};
  ncs.forEach((nc) => {
    const dep = nc.dep || 'Non renseigné';
    byDep[dep] = (byDep[dep] || 0) + 1;
  });
  return Object.entries(byDep)
    .map(([dep, count]) => ({
      dep,
      count,
      taux: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

export function getNcYears(data = getNcData()) {
  const years = new Set([new Date().getFullYear()]);
  data.forEach((nc) => {
    const p = parseNcDate(nc.d);
    if (p?.year) years.add(p.year);
  });
  return [...years].sort((a, b) => b - a);
}

function filterByYear(data, year) {
  return data.filter((nc) => {
    const p = parseNcDate(nc.d);
    return p && p.year === year;
  });
}

function filterByMonth(data, year, month) {
  return data.filter((nc) => {
    const p = parseNcDate(nc.d);
    return p && p.year === year && p.month === month;
  });
}

/** @param {'mensuel'|'trimestre'|'annuel'} per */
export function filterNcByPeriod(data, year, per, trimestre, month) {
  if (per === 'annuel') return filterByYear(data, year);
  if (per === 'trimestre') {
    const tMap = { T1: [1, 2, 3], T2: [4, 5, 6], T3: [7, 8, 9], T4: [10, 11, 12] };
    const months = tMap[trimestre] || [];
    return data.filter((nc) => {
      const p = parseNcDate(nc.d);
      return p && p.year === year && months.includes(p.month);
    });
  }
  return filterByMonth(data, year, month);
}

export function computeNcDashboard(data = getNcData(), opts = {}) {
  const year = opts.year ?? new Date().getFullYear();
  const per = opts.per ?? 'mensuel';
  const trimestre = opts.trimestre ?? 'T2';
  const month = opts.month ?? new Date().getMonth() + 1;

  const scoped = filterNcByPeriod(data, year, per, trimestre, month);
  const yearData = filterByYear(data, year);

  const byStatus = {};
  const byGrav = {};
  const byMonth = {};
  const byMonthMineures = {};
  const byMonthMajeures = {};
  const byStade = {};
  const byCause = {};

  yearData.forEach((nc) => {
    byStatus[nc.s] = (byStatus[nc.s] || 0) + 1;
    byGrav[nc.g] = (byGrav[nc.g] || 0) + 1;
    const p = parseNcDate(nc.d);
    if (p) {
      const m = MOIS_LABELS[p.month - 1];
      byMonth[m] = (byMonth[m] || 0) + 1;
      if (nc.g === 'Mineure') byMonthMineures[m] = (byMonthMineures[m] || 0) + 1;
      if (nc.g === 'Majeure') byMonthMajeures[m] = (byMonthMajeures[m] || 0) + 1;
    }
    const stade = nc.stade || 'Fabrication';
    byStade[stade] = (byStade[stade] || 0) + 1;
    const cause = nc.causeRacine || 'Autre';
    byCause[cause] = (byCause[cause] || 0) + 1;
  });

  const total = scoped.length;
  const critiques = scoped.filter((n) => n.g === 'Critique').length;
  const majeures = scoped.filter((n) => n.g === 'Majeure').length;
  const mineures = scoped.filter((n) => n.g === 'Mineure').length;
  const closed = scoped.filter((n) => n.s === 'Clôturé').length;
  const ouvertes = scoped.filter((n) => n.s !== 'Clôturé').length;
  const tauxCloture = total ? Math.round((closed / total) * 100) : 0;

  const moisObj = countNcByGraviteForMonth(data, year, month);
  const actions = window.NC_ACTIONS || [];
  const ncRefs = new Set(scoped.map((n) => n.n));
  const actionsScope = actions.filter((a) => ncRefs.has(a.ref));
  const actionsOuvertes = actionsScope.filter((a) => a.statut !== 'Clôturée');
  const actionsDone = actionsScope.filter((a) => a.statut === 'Clôturée').length;
  const efficacite =
    actionsScope.length > 0 ? Math.round((actionsDone / actionsScope.length) * 100) : 0;

  const stadeTotal = Object.values(byStade).reduce((s, v) => s + v, 0) || 1;
  const interne = ['Réception', 'Fabrication', 'Assemblage', 'Contrôle final'].reduce(
    (s, k) => s + (byStade[k] || 0),
    0
  );
  const pctInterne = Math.round((interne / stadeTotal) * 100);
  const pctLivraison = Math.round(((byStade.Livraison || 0) / stadeTotal) * 100);

  const causesSorted = NC_CAUSES_RACINES.map((label) => ({
    label,
    count: byCause[label] || 0,
    pct: Math.round(((byCause[label] || 0) / (yearData.length || 1)) * 100),
  }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);

  const topCause = causesSorted[0];

  const delaiMoyen = computeDelaiMoyenTraitement(scoped);
  const repetitives = computeTauxNcRepetitives(scoped);
  const parDepartement = computeTauxNcParDepartement(scoped);
  const okDelai = delaiMoyen <= NC_KPI_OBJ.delaiMoyenJours;
  const okRecurrence = repetitives.taux <= NC_KPI_OBJ.tauxRecurrenceMax;

  return {
    year,
    per,
    trimestre,
    month,
    scoped,
    total,
    yearTotal: yearData.length,
    critiques,
    majeures,
    mineures,
    closed,
    ouvertes,
    tauxCloture,
    moisObj,
    okObj: moisObj.okMineures && moisObj.okMajeures,
    byStatus,
    byGrav,
    byMonth,
    byMonthMineures,
    byMonthMajeures,
    byStade,
    causesSorted,
    topCause,
    stades: NC_STADES_DETECTION.map((s) => ({
      label: s,
      pct: Math.round(((byStade[s] || 0) / stadeTotal) * 100),
    })),
    pctInterne,
    pctLivraison,
    actionsOuvertes,
    actionsScope,
    efficacite,
    delaiMoyen,
    okDelai,
    repetitives,
    okRecurrence,
    parDepartement,
    alert:
      !moisObj.okMineures || !moisObj.okMajeures
        ? {
            show: true,
            label: 'Objectif mensuel dépassé',
            detail: `Mineures : ${moisObj.mineures}/${NC_OBJ.maxMineuresMois} · Majeures : ${moisObj.majeures}/${NC_OBJ.maxMajeuresMois}`,
          }
        : critiques > 0
          ? {
              show: true,
              label: `${critiques} NC critique(s)`,
              detail: 'Traitement urgent requis',
            }
          : null,
  };
}
