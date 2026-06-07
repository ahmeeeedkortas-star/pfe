/**
 * Données checklist 5S — réponses, métadonnées, scores.
 */
import { persistFivesV11 } from './fives-persist.js';

const PILLAR_KEYS = ['S1', 'S2', 'S3', 'S4', 'S5'];
const ZKEYS = ['S', 'T', 'N', 'S4', 'S5'];

export function ensureClMeta(zoneId) {
  if (!window.SS5_CL_META) window.SS5_CL_META = {};
  if (!window.SS5_CL_META[zoneId]) {
    window.SS5_CL_META[zoneId] = { sectionNotes: {}, items: {}, pointsForts: '', axes: '' };
  }
  return window.SS5_CL_META[zoneId];
}

export function getClItemMeta(zoneId, pk, n) {
  const meta = ensureClMeta(zoneId);
  const key = `${pk}-${n}`;
  return meta.items[key] || { remark: '', photo: '' };
}

export function setClItemMeta(zoneId, pk, n, patch) {
  const meta = ensureClMeta(zoneId);
  const key = `${pk}-${n}`;
  meta.items[key] = { ...getClItemMeta(zoneId, pk, n), ...patch };
  persistFivesV11();
}

export function getClResponse(zoneId, pk, n) {
  const raw = window.SS5_CL_DATA?.[zoneId]?.[pk]?.[n];
  if (raw && typeof raw === 'object') return raw.rep ?? null;
  return raw ?? null;
}

export function setClResponse(zoneId, pk, n, val) {
  if (!window.SS5_CL_DATA) window.SS5_CL_DATA = {};
  if (!window.SS5_CL_DATA[zoneId]) window.SS5_CL_DATA[zoneId] = {};
  if (!window.SS5_CL_DATA[zoneId][pk]) window.SS5_CL_DATA[zoneId][pk] = {};
  const curr = getClResponse(zoneId, pk, n);
  window.SS5_CL_DATA[zoneId][pk][n] = curr === val ? null : val;
  persistFivesV11();
  return window.SS5_CL_DATA[zoneId][pk][n];
}

export function calcZoneScores(zoneId) {
  const CL = window.SS5_CL_TEMPLATE || {};
  const D = window.SS5_CL_DATA?.[zoneId] || {};
  const byPillar = {};
  const scores = PILLAR_KEYS.map((pk, i) => {
    const items = CL[pk]?.items || [];
    let t = 0;
    let ok = 0;
    items.forEach((it) => {
      t++;
      const rep = getClResponse(zoneId, pk, it.n);
      if (rep === 'oui') ok++;
    });
    const pct = t ? Math.round((ok / t) * 100) : 0;
    byPillar[pk] = pct;
    return pct;
  });
  const global = scores.length ? Math.round(scores.reduce((s, v) => s + v, 0) / scores.length) : 0;
  return { global, byPillar, scores };
}

export function applyScoresToZone(zoneId) {
  const Z = (window.SS5_ZONES || []).find((z) => z.id === zoneId);
  if (!Z) return null;
  const { global, byPillar, scores } = calcZoneScores(zoneId);
  Z.score = global;
  ZKEYS.forEach((zk, i) => {
    Z[zk] = scores[i];
  });
  Z.statut = global >= 80 ? 'Conforme' : 'Non conforme';
  Z.lastAudit = new Date().toLocaleDateString('fr-FR');
  persistFivesV11();
  return { global, byPillar };
}

export function syncAuditFromZone(zoneId) {
  const Z = (window.SS5_ZONES || []).find((z) => z.id === zoneId);
  if (!Z) return null;
  const meta = ensureClMeta(zoneId);
  let audit =
    (window.SS5_AUDITS || []).find((a) => a.zone === Z.zone && a.statut !== 'Réalisé') ||
    (window.SS5_AUDITS || []).find((a) => a.zone === Z.zone);
  if (!audit) {
    audit = {
      id: `AUD5S-${String(Date.now()).slice(-4)}`,
      date: new Date().toLocaleDateString('fr-FR'),
      zone: Z.zone,
      auditeur: 'HSE',
      score: Z.score,
      statut: 'Réalisé',
    };
    window.SS5_AUDITS = window.SS5_AUDITS || [];
    window.SS5_AUDITS.unshift(audit);
  }
  audit.score = Z.score;
  audit.statut = 'Réalisé';
  audit.reportMeta = {
    zoneId,
    pointsForts: meta.pointsForts,
    axes: meta.axes,
    generatedAt: new Date().toISOString(),
  };
  persistFivesV11();
  return audit;
}
