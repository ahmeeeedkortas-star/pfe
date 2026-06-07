/**
 * Agrégats live pour le tableau de bord SST (sec-kpi).
 */
import { SEC_CHECKLIST_CONFIGS } from './sec-checklist-configs.js';
import { initCL, clScore } from '../components/qhse/dynamic-checklist.js';
import { seedSecBaseline } from './sec-baseline.data.js';
import { ensureChecklistInstances, listInstances } from './sec-checklist-instances.js';

export function ensureSecData() {
  seedSecBaseline();
  if (!window.SEC_ACTIONS) window.SEC_ACTIONS = [];
  if (!window.acc_data) window.acc_data = [];
  if (!window.sst_risks) window.sst_risks = [];
  if (!window.URG_EXERCICES) window.URG_EXERCICES = [];
  if (!window.CL_DATA) window.CL_DATA = {};

  ensureChecklistInstances();
  for (const [key, cfg] of Object.entries(SEC_CHECKLIST_CONFIGS)) {
    if (!window.CL_DATA[key]?.items?.length) {
      initCL(key, cfg.items, {
        title: cfg.title,
        icon: cfg.icon,
        code: cfg.code,
        subtitle: cfg.subtitle,
        gradient: cfg.gradient,
        reference: cfg.code,
        frequence: cfg.subtitle?.split('·')[1]?.trim() || '',
        infoFields: cfg.infoFields,
      });
    }
  }
}

export function getSecKpiMetrics() {
  ensureSecData();
  const acts = window.SEC_ACTIONS || [];
  const accs = window.acc_data || [];
  const risks = window.sst_risks || [];
  const exs = window.URG_EXERCICES || [];
  const clData = window.CL_DATA || {};

  const doneActs = acts.filter((a) => a.statut === 'Clôturée').length;
  const retardActs = acts.filter((a) => a.statut === 'En retard').length;
  const accidents = accs.filter((a) => a.type === 'Accident').length;
  const incidents = accs.filter((a) => a.type === 'Incident').length;
  const pa = accs.filter((a) => a.type === 'Presque-Accident' || a.type === 'PA').length;
  const critRisks = risks.filter((r) => (r.g || 0) * (r.f || 0) >= 16 || (r.g >= 4 && r.f >= 3)).length;
  const totalActs = acts.length;
  const pctConf = totalActs ? Math.round((doneActs / totalActs) * 100) : 0;

  let clValidated = 0;
  let clTotal = 0;
  const clCards = [];

  for (const [key, cfg] of Object.entries(SEC_CHECKLIST_CONFIGS)) {
    if (cfg.multiInstance) {
      const insts = listInstances(key);
      clTotal += insts.length;
      let hubPct = 0;
      let hubNon = 0;
      insts.forEach(({ key: instKey, data }) => {
        const score = clScore(instKey);
        hubPct += score.pct;
        hubNon += score.non;
        if (data?.statut === 'validé' || score.pct >= 90) clValidated++;
      });
      const avgPct = insts.length ? Math.round(hubPct / insts.length) : 0;
      clCards.push({
        key: `hub_${key}`,
        cfg,
        score: { pct: avgPct, non: hubNon, oui: 0, total: cfg.items.length },
        statut: insts.length ? `${insts.length} équipement(s)` : 'Aucun',
        page: `sec-cl-${key}`,
        isHub: true,
      });
      continue;
    }

    const data = clData[key];
    const score = data ? clScore(key) : { pct: 0, non: 0, oui: 0, total: cfg.items.length };
    clTotal++;
    if (data?.statut === 'validé' || score.pct >= 90) clValidated++;
    const statut =
      data?.statut === 'validé'
        ? 'Validé'
        : score.non > 0
          ? 'NC'
          : score.pct >= 70
            ? 'En cours'
            : 'À faire';
    clCards.push({ key, cfg, score, statut, page: `sec-cl-${key}` });
  }

  for (const k of Object.keys(clData)) {
    if (k.startsWith('custom_') && clData[k]?.isCustom) {
      const score = clScore(k);
      clTotal++;
      if (clData[k].statut === 'validé') clValidated++;
      clCards.push({
        key: k,
        cfg: {
          title: clData[k].title || 'Checklist personnalisée',
          icon: clData[k].icon || '📋',
          code: clData[k].code || k,
          gradient: clData[k].gradient || 'linear-gradient(135deg,#1e40af,#2563eb)',
        },
        score,
        statut: clData[k].statut === 'validé' ? 'Validé' : 'Custom',
        page: 'sec-cl-custom',
      });
    }
  }

  const exDone = exs.filter((e) => e.statut === 'Réalisé').length;
  const actsTodo = acts.filter((a) => a.statut === 'À faire').length;
  const actsProg = acts.filter((a) => a.statut === 'En cours').length;
  const jsa = window.jsaDays ?? 12;
  const monthCounts = [0, 0, 1, 0, 2, 1, 0, 0, 1, 0, 0, 1];
  accs.forEach((a) => {
    const p = (a.date || '').split('/');
    if (p.length >= 2) {
      const m = parseInt(p[1], 10) - 1;
      if (m >= 0 && m < 12) monthCounts[m]++;
    }
  });

  return {
    acts,
    accs,
    risks,
    exs,
    doneActs,
    retardActs,
    accidents,
    incidents,
    pa,
    critRisks,
    pctConf,
    clValidated,
    clTotal,
    clCards,
    exDone,
    monthCounts,
    joursArret: accs.reduce((s, a) => s + (Number(a.jours) || Number(a.joursArrêt) || 0), 0),
    actsTodo,
    actsProg,
    jsa,
    tf: accidents ? (accidents / Math.max(accs.length, 1)).toFixed(2) : '0',
    tg: accidents ? '0.18' : '0',
  };
}
