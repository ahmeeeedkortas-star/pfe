/**
 * KPI ISO 5.4 — Réclamations clients (calcul automatique par trimestre).
 */
import { getRcData } from './rc.data.js';

/** Objectifs cibles (SMQ) */
export const RC_OBJ = {
  /** Nombre max RC / trimestre */
  maxRcTrimestre: 2,
  /** 5.4.2 — jours */
  tempsMoyenJours: 5,
  /** 5.4.3 — % clôturées dans le délai */
  tauxClotureDelais: 80,
  /** 5.4.4 — % */
  tauxRepetitives: 15,
  /** Nombre max RC / mois (graphique évolution) */
  maxRcMois: 1,
  /** Semestre (bandeau alerte) */
  maxRcSemestre: 2,
  /** Satisfaction client cible % */
  satisfactionMin: 90,
};

export const TRIMESTRES = ['T1', 'T2', 'T3', 'T4'];
export const MOIS_LABELS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
export const TRIMESTRE_PERIODES = {
  T1: 'Jan–Mar',
  T2: 'Avr–Jun',
  T3: 'Jul–Sep',
  T4: 'Oct–Déc',
};
export const TRIMESTRE_MOIS = {
  T1: [1, 2, 3],
  T2: [4, 5, 6],
  T3: [7, 8, 9],
  T4: [10, 11, 12],
};

/** Années présentes dans les RC + année courante */
export function getRcYears() {
  const years = new Set([new Date().getFullYear()]);
  getRcData().forEach((rc) => {
    const p = parseRcDate(rc.d);
    if (p?.year) years.add(p.year);
  });
  return [...years].sort((a, b) => b - a);
}

export function parseRcDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return null;
  const parts = dateStr.split('/').map((x) => parseInt(x, 10));
  if (parts.length < 3) return null;
  const [day, month, year] = parts;
  const trimestre = month <= 3 ? 'T1' : month <= 6 ? 'T2' : month <= 9 ? 'T3' : 'T4';
  return { day, month, year, trimestre };
}

export function filterRcByTrimestre(data, year, trimestre) {
  return data.filter((rc) => {
    const p = parseRcDate(rc.d);
    return p && p.year === year && p.trimestre === trimestre;
  });
}

export function filterRcByYear(data, year) {
  return data.filter((rc) => {
    const p = parseRcDate(rc.d);
    return p && p.year === year;
  });
}

/** Filtre selon la vue Mensuel / Trimestre / Annuel */
export function filterRcByPeriod(data, year, per, trimestre, mois) {
  if (per === 'annuel') return filterRcByYear(data, year);
  if (per === 'trimestre') return filterRcByTrimestre(data, year, trimestre);
  return data.filter((rc) => {
    const p = parseRcDate(rc.d);
    return p && p.year === year && p.month === mois;
  });
}

function aggregateRc(data) {
  const byStatus = {};
  const byGrav = {};
  const byMonth = {};
  const byClient = {};
  const byMotif = {};

  data.forEach((rc) => {
    byStatus[rc.s] = (byStatus[rc.s] || 0) + 1;
    byGrav[rc.g] = (byGrav[rc.g] || 0) + 1;
    const p = parseRcDate(rc.d);
    if (p) {
      byMonth[MOIS_LABELS[p.month - 1]] = (byMonth[MOIS_LABELS[p.month - 1]] || 0) + 1;
    }
    byClient[rc.cl] = byClient[rc.cl] || { count: 0, critique: 0, jours: [] };
    byClient[rc.cl].count += 1;
    if (rc.g === 'Critique') byClient[rc.cl].critique += 1;
    byClient[rc.cl].jours.push(joursTraitementRc(rc));
    const m = normalizeMotif(rc.obj);
    byMotif[m] = (byMotif[m] || 0) + 1;
  });

  return { byStatus, byGrav, byMonth, byClient, byMotif };
}

/** Tableau de bord global (période sélectionnée) */
export function computeRcDashboard(year, per, trimestre, mois) {
  const all = getRcData();
  const data = filterRcByPeriod(all, year, per, trimestre, mois);
  const agg = aggregateRc(data);
  const n = data.length;
  const closed = data.filter((r) => r.s === 'Clôturée');
  const ouvertes = data.filter((r) => r.s !== 'Clôturée');
  const critiques = data.filter((r) => r.g === 'Critique');
  const repetitives = computeTauxRcRepetitives(data);
  const joursList = data.map(joursTraitementRc);
  const tempsMoyen = joursList.length ? joursList.reduce((a, b) => a + b, 0) / joursList.length : 0;
  const tauxCloture = n ? Math.round((closed.length / n) * 100) : 0;
  const closedDelais = closed.filter((r) => joursTraitementRc(r) <= RC_OBJ.tempsMoyenJours);
  const tauxClotureDelais = closed.length
    ? Math.round((closedDelais.length / closed.length) * 100)
    : 0;
  const satisfaction = Math.round(
    Math.min(98, Math.max(60, 100 - repetitives.taux * 0.4 - Math.max(0, tempsMoyen - RC_OBJ.tempsMoyenJours) * 3))
  );

  let prevLabel = '';
  let prevCount = 0;
  if (per === 'trimestre') {
    const idx = TRIMESTRES.indexOf(trimestre);
    if (idx > 0) {
      prevLabel = `${TRIMESTRES[idx - 1]} ${year}`;
      prevCount = filterRcByTrimestre(all, year, TRIMESTRES[idx - 1]).length;
    } else {
      prevLabel = `T4 ${year - 1}`;
      prevCount = filterRcByTrimestre(all, year - 1, 'T4').length;
    }
  } else if (per === 'annuel') {
    prevLabel = `${year - 1}`;
    prevCount = filterRcByYear(all, year - 1).length;
  } else {
    const pm = mois > 1 ? mois - 1 : 12;
    const py = mois > 1 ? year : year - 1;
    prevLabel = `${MOIS_LABELS[pm - 1]} ${py}`;
    prevCount = filterRcByPeriod(all, py, 'mensuel', trimestre, pm).length;
  }

  const pareto = Object.entries(agg.byMotif)
    .map(([motif, occ]) => ({ motif, occ }))
    .sort((a, b) => b.occ - a.occ)
    .slice(0, 5);
  const maxOcc = pareto[0]?.occ || 1;
  pareto.forEach((p) => {
    p.pct = Math.round((p.occ / n) * 100) || 0;
    p.bar = Math.round((p.occ / maxOcc) * 100);
  });
  const top2Pct = pareto.slice(0, 2).reduce((s, p) => s + p.pct, 0);

  const clients = Object.entries(agg.byClient)
    .map(([cl, v]) => ({
      cl,
      rc: v.count,
      critique: v.critique,
      delai: v.jours.length ? (v.jours.reduce((a, b) => a + b, 0) / v.jours.length).toFixed(1).replace('.', ',') + ' j' : '—',
      statut: v.critique >= 2 ? 'Critique' : v.count >= 3 ? 'Élevé' : v.critique ? 'Moyen' : 'OK',
    }))
    .sort((a, b) => b.rc - a.rc);

  const monthsForChart =
    per === 'trimestre'
      ? TRIMESTRE_MOIS[trimestre].map((m) => MOIS_LABELS[m - 1])
      : per === 'mensuel'
        ? [MOIS_LABELS[mois - 1]]
        : MOIS_LABELS.slice(0, 6);

  const alertTrim = per === 'trimestre' ? trimestre : currentTrimestreFromData(all, year);
  const alertCount = filterRcByTrimestre(all, year, alertTrim).length;
  const depassement = Math.max(0, alertCount - RC_OBJ.maxRcTrimestre);

  return {
    year,
    per,
    trimestre,
    mois,
    data,
    n,
    closed: closed.length,
    ouvertes: ouvertes.length,
    critiques: critiques.length,
    tempsMoyen,
    tauxCloture,
    tauxClotureDelais,
    repetitives,
    satisfaction,
    agg,
    prevLabel,
    prevCount,
    pareto,
    top2Pct,
    clients,
    monthsForChart,
    alert: {
      show: alertCount > RC_OBJ.maxRcTrimestre,
      trimestre: alertTrim,
      count: alertCount,
      depassement,
      label: `OBJECTIF DÉPASSÉ — ${alertTrim} ${year}`,
      detail: `${alertCount} RC enregistrées · Objectif ≤ ${RC_OBJ.maxRcTrimestre} RC/trimestre · Dépassement : +${depassement}`,
    },
    ok: {
      volume: n <= RC_OBJ.maxRcTrimestre,
      tempsMoyen: tempsMoyen <= RC_OBJ.tempsMoyenJours,
      tauxCloture: tauxCloture >= RC_OBJ.tauxClotureDelais,
      repetitives: repetitives.taux <= RC_OBJ.tauxRepetitives,
      satisfaction: satisfaction >= RC_OBJ.satisfactionMin,
    },
  };
}

function currentTrimestreFromData(data, year) {
  const now = new Date();
  if (year === now.getFullYear()) {
    const m = now.getMonth() + 1;
    return m <= 3 ? 'T1' : m <= 6 ? 'T2' : m <= 9 ? 'T3' : 'T4';
  }
  const counts = TRIMESTRES.map((t) => ({
    t,
    c: filterRcByTrimestre(data, year, t).length,
  }));
  return counts.sort((a, b) => b.c - a.c)[0]?.t || 'T2';
}

/** Cartes objectifs trimestriels (année) */
export function getTrimestreObjectifCards(year) {
  const all = getRcData();
  const now = new Date();
  return TRIMESTRES.map((t) => {
    const count = filterRcByTrimestre(all, year, t).length;
    const isFuture =
      year > now.getFullYear() ||
      (year === now.getFullYear() &&
        TRIMESTRES.indexOf(t) > TRIMESTRES.indexOf(currentTrimestreFromData(all, year)));
    const hasData = count > 0;
    const seuil = RC_OBJ.maxRcTrimestre;
    let statut = 'À venir';
    let color = '#9ca3af';
    let badge = 'bgr';
    if (!isFuture || hasData) {
      if (count <= seuil) {
        statut = count === 0 ? 'Conforme' : 'Conforme';
        color = '#16a34a';
        badge = 'bg3';
      } else {
        statut = 'Dépassé';
        color = count > seuil * 2 ? '#dc2626' : '#ea580c';
        badge = count > seuil * 2 ? 'br' : 'bo';
      }
    }
    const scaleMax = Math.max(seuil * 3, count, 1);
    const pct = Math.min(100, (count / scaleMax) * 100);
    const markerPct = (seuil / scaleMax) * 100;
    return {
      trimestre: t,
      period: TRIMESTRE_PERIODES[t],
      count: isFuture && !hasData ? null : count,
      statut,
      color,
      badge,
      pct,
      markerPct,
      seuil,
    };
  });
}

function parseDelaiJours(dl) {
  if (!dl || dl === '—') return null;
  const m = String(dl).match(/(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

/** Jours de traitement (réel ou estimé) */
export function joursTraitementRc(rc) {
  if (rc.joursTraitement != null) return Number(rc.joursTraitement);
  if (rc.s === 'Clôturée') return 4;
  const prevu = parseDelaiJours(rc.dl);
  return prevu ?? 7;
}

function normalizeMotif(obj) {
  const s = String(obj || '')
    .toLowerCase()
    .replace(/[^a-zàâäéèêëïîôùûü0-9\s]/gi, ' ')
    .trim();
  return s.split(/\s+/).slice(0, 3).join(' ') || 'autre';
}

/** 5.4.4 — Taux réclamations répétitives (sur le périmètre du trimestre) */
export function computeTauxRcRepetitives(data) {
  const total = data.length;
  if (!total) return { count: 0, taux: 0, motifs: [] };

  const byMotif = {};
  data.forEach((rc) => {
    const key = normalizeMotif(rc.obj);
    if (!byMotif[key]) byMotif[key] = [];
    byMotif[key].push(rc);
  });

  const repIds = new Set();
  const motifs = [];
  Object.entries(byMotif).forEach(([motif, list]) => {
    if (list.length > 1) {
      list.forEach((rc) => repIds.add(rc.n));
      motifs.push({ motif, count: list.length });
    }
  });

  return {
    count: repIds.size,
    taux: Math.round((repIds.size / total) * 100),
    motifs: motifs.sort((a, b) => b.count - a.count),
  };
}

/**
 * Calcul automatique des 4 KPI pour un trimestre donné.
 * @param {number} year
 * @param {'T1'|'T2'|'T3'|'T4'} trimestre
 */
export function computeRcKpisTrimestre(year, trimestre) {
  const all = getRcData();
  const data = filterRcByTrimestre(all, year, trimestre);
  const n = data.length;

  const repetitives = computeTauxRcRepetitives(data);

  const closed = data.filter((r) => r.s === 'Clôturée');
  const joursList = data.map(joursTraitementRc);
  const tempsMoyen =
    joursList.length > 0
      ? joursList.reduce((a, b) => a + b, 0) / joursList.length
      : 0;

  const closedDelais = closed.filter((r) => joursTraitementRc(r) <= RC_OBJ.tempsMoyenJours);
  const tauxClotureDelais = closed.length
    ? Math.round((closedDelais.length / closed.length) * 100)
    : data.length === 0
      ? 100
      : 0;

  const byMonth = {};
  data.forEach((rc) => {
    const p = parseRcDate(rc.d);
    if (p) {
      const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
      const m = months[p.month - 1];
      if (m) byMonth[m] = (byMonth[m] || 0) + 1;
    }
  });

  return {
    year,
    trimestre,
    label: TRIMESTRE_PERIODES[trimestre] || trimestre,
    data,
    n,
    tempsMoyen,
    tauxClotureDelais,
    repetitives,
    closed: closed.length,
    ouvertes: data.filter((r) => r.s !== 'Clôturée').length,
    byMonth,
    ok: {
      volumeTrimestre: n <= RC_OBJ.maxRcTrimestre,
      tempsMoyen: tempsMoyen <= RC_OBJ.tempsMoyenJours,
      tauxClotureDelais: tauxClotureDelais >= RC_OBJ.tauxClotureDelais,
      tauxRepetitives: repetitives.taux <= RC_OBJ.tauxRepetitives,
    },
  };
}

/** Compte RC par trimestre pour une année (tableau de bord) */
export function countRcParTrimestre(year) {
  const all = getRcData();
  return TRIMESTRES.map((t) => ({
    trimestre: t,
    count: filterRcByTrimestre(all, year, t).length,
  }));
}
