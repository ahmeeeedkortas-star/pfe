/**
 * Rapport projet — réclamations clients.
 */
import { getRcData } from './rc.data.js';

export const RC_PROJECT_META = {
  M077: { libelle: 'Carter transmission', client: 'Client A' },
  M078: { libelle: 'Boîtier hydraulique', client: 'Client B' },
  M079: { libelle: 'Support moteur', client: 'Client C' },
  M080: { libelle: 'Ensemble visserie', client: 'Client C' },
  M076: { libelle: 'Flasque palier', client: 'Client A' },
};

export function listRcProjects() {
  const fromData = [...new Set(getRcData().map((r) => r.p))];
  return [...new Set([...fromData, ...Object.keys(RC_PROJECT_META)])].sort();
}

export function computeRcProjectReport(projectId) {
  const meta = RC_PROJECT_META[projectId] || { libelle: projectId, client: '—' };
  const rcs = getRcData().filter((r) => r.p === projectId);
  const rcRefs = new Set(rcs.map((x) => x.n));
  const actions = (window.RC_ACTIONS || []).filter((a) => rcRefs.has(a.ref));
  const delaiMoy =
    rcs.length > 0
      ? rcs.filter((x) => x.dl && x.dl !== '—').length
      : 0;

  return {
    projectId,
    meta,
    rcs,
    actions,
    totalRc: rcs.length,
    rcOuvertes: rcs.filter((x) => x.s !== 'Clôturée').length,
    critiques: rcs.filter((x) => x.g === 'Critique').length,
    actionsTotal: actions.length,
    actionsCloturees: actions.filter((a) => a.statut === 'Clôturée').length,
    delaiSuivi: delaiMoy,
  };
}
