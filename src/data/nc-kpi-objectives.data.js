/**
 * Objectifs mensuels NC (SMQ).
 */
import { getNcData } from './nc.data.js';
import { MOIS_LABELS, parseNcDate } from './nc-date.utils.js';

export const NC_OBJ = {
  maxMajeuresMois: 20,
  maxMineuresMois: 1,
};

export function countNcByGraviteForMonth(data, year, month) {
  let mineures = 0;
  let majeures = 0;
  let critiques = 0;
  data.forEach((nc) => {
    const p = parseNcDate(nc.d);
    if (!p || p.year !== year || p.month !== month) return;
    if (nc.g === 'Mineure') mineures += 1;
    else if (nc.g === 'Majeure') majeures += 1;
    else if (nc.g === 'Critique') critiques += 1;
  });
  return { mineures, majeures, critiques };
}

export function getNcMonthlyObjectivesStatus(data = getNcData(), refDate = new Date()) {
  const year = refDate.getFullYear();
  const month = refDate.getMonth() + 1;
  const counts = countNcByGraviteForMonth(data, year, month);
  return {
    year,
    month,
    periodLabel: `${MOIS_LABELS[month - 1]} ${year}`,
    ...counts,
    okMineures: counts.mineures <= NC_OBJ.maxMineuresMois,
    okMajeures: counts.majeures <= NC_OBJ.maxMajeuresMois,
  };
}
