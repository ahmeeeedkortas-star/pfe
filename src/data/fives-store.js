/**
 * Persistance module 5S — template, audits, résultats par zone, actions.
 */
import { FIVES_CHECKLIST_TEMPLATE_SEED } from './fives-checklist-template.data.js';
import { FIVES_ZONES } from './fives-zones.data.js';
import { canAutoSeed } from '../core/empty-platform.js';

export const FIVES_STORAGE_KEY = 'xm_fives_data';
export const FIVES_KPI_GOAL = 80;
export const FIVES_AUDIT_INTERVAL_DAYS = 14;

function todayFr() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

function parseFrDate(s) {
  const m = String(s || '').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  return new Date(+m[3], +m[2] - 1, +m[1]);
}

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function nextAuditId(audits) {
  const n = (audits?.length || 0) + 1;
  return `AUD5S-${String(n).padStart(3, '0')}`;
}

function seedTemplateItems() {
  return FIVES_CHECKLIST_TEMPLATE_SEED.map((it, i) => ({
    id: `cl-${i + 1}`,
    n: i + 1,
    pillar: it.pillar,
    label: it.label,
  }));
}

function defaultStore() {
  return {
    template: seedTemplateItems(),
    audits: [],
    actions: [],
  };
}

let loaded = false;

export function loadFivesStore() {
  if (loaded && window.FIVES_STORE) return window.FIVES_STORE;
  try {
    const raw = localStorage.getItem(FIVES_STORAGE_KEY);
    if (raw) {
      window.FIVES_STORE = JSON.parse(raw);
    }
  } catch {
    /* ignore */
  }
  if (!window.FIVES_STORE?.template?.length) {
    window.FIVES_STORE = canAutoSeed() ? defaultStore() : { template: [], audits: [], actions: [] };
    persistFivesStore();
  }
  if (!window.FIVES_STORE.audits) window.FIVES_STORE.audits = [];
  if (!window.FIVES_STORE.actions) window.FIVES_STORE.actions = [];
  loaded = true;
  return window.FIVES_STORE;
}

export function persistFivesStore() {
  try {
    localStorage.setItem(FIVES_STORAGE_KEY, JSON.stringify(window.FIVES_STORE || {}));
  } catch {
    /* ignore */
  }
}

export function getFivesTemplate() {
  return loadFivesStore().template;
}

export function getFivesAudits() {
  return loadFivesStore().audits;
}

export function getFivesActions() {
  return loadFivesStore().actions;
}

/** @param {{ conformes: number, nonConformes: number, total: number, kpi: number, atteint: boolean }} */
export function calcZoneKpi(responses) {
  let conformes = 0;
  let nonConformes = 0;
  for (const r of responses || []) {
    if (r.rep === 'c') conformes++;
    else if (r.rep === 'nc') nonConformes++;
  }
  const scored = conformes + nonConformes;
  const kpi = scored > 0 ? Math.round((conformes / scored) * 100) : 0;
  return {
    conformes,
    nonConformes,
    total: (responses || []).length,
    scored,
    kpi,
    atteint: scored > 0 && kpi >= FIVES_KPI_GOAL,
  };
}

export function buildZoneResponsesFromTemplate(template, savedMap = {}) {
  return template.map((it) => ({
    itemId: it.id,
    rep: savedMap[it.id]?.rep ?? null,
    obs: savedMap[it.id]?.obs ?? '',
  }));
}

export function getLatestZoneResult(zoneId) {
  const audits = [...getFivesAudits()].sort((a, b) => {
    const da = parseFrDate(a.date) || new Date(0);
    const db = parseFrDate(b.date) || new Date(0);
    return db - da;
  });
  for (const audit of audits) {
    const zr = audit.zoneResults?.[zoneId];
    if (zr?.kpi != null) return { audit, zoneResult: zr };
  }
  return null;
}

export function getZoneKpiMap() {
  const map = {};
  for (const z of FIVES_ZONES) {
    const latest = getLatestZoneResult(z.id);
    map[z.id] = {
      zoneId: z.id,
      label: z.label,
      kpi: latest?.zoneResult?.kpi ?? null,
      atteint: latest?.zoneResult?.atteint ?? false,
      auditId: latest?.audit?.id,
      date: latest?.audit?.date,
      pointsForts: latest?.zoneResult?.pointsForts || '',
      axes: latest?.zoneResult?.axes || '',
    };
  }
  return map;
}

export function getGlobalKpi() {
  const map = getZoneKpiMap();
  const vals = Object.values(map).filter((v) => v.kpi != null);
  if (!vals.length) return { kpi: 0, atteint: false, zonesOk: 0, zonesTotal: FIVES_ZONES.length };
  const avg = Math.round(vals.reduce((s, v) => s + v.kpi, 0) / vals.length);
  const zonesOk = vals.filter((v) => v.atteint).length;
  return {
    kpi: avg,
    atteint: avg >= FIVES_KPI_GOAL,
    zonesOk,
    zonesTotal: FIVES_ZONES.length,
    zonesAudited: vals.length,
  };
}

export function addFivesAudit({ date, auditor, period, comment }) {
  const store = loadFivesStore();
  const audit = {
    id: nextAuditId(store.audits),
    date: date || todayFr(),
    auditor: auditor || '',
    period: period || '',
    comment: comment || '',
    statut: 'brouillon',
    zoneResults: {},
    createdAt: new Date().toISOString(),
  };
  store.audits.push(audit);
  persistFivesStore();
  return audit;
}

export function getFivesAudit(id) {
  return getFivesAudits().find((a) => a.id === id) || null;
}

export function saveZoneAuditResult(auditId, zoneId, payload) {
  const audit = getFivesAudit(auditId);
  if (!audit) return null;
  const stats = calcZoneKpi(payload.responses);
  audit.zoneResults[zoneId] = {
    responses: payload.responses,
    kpi: stats.kpi,
    atteint: stats.atteint,
    conformes: stats.conformes,
    nonConformes: stats.nonConformes,
    pointsForts: payload.pointsForts || '',
    axes: payload.axes || '',
    comment: payload.comment || '',
    savedAt: new Date().toISOString(),
  };
  const allZones = FIVES_ZONES.every((z) => audit.zoneResults[z.id]?.kpi != null);
  if (allZones && audit.statut === 'brouillon') audit.statut = 'terminé';
  persistFivesStore();
  autoCreateActionsFromNc(auditId, zoneId, payload.responses);
  return audit.zoneResults[zoneId];
}

function autoCreateActionsFromNc(auditId, zoneId, responses) {
  const template = getFivesTemplate();
  const store = loadFivesStore();
  for (const r of responses || []) {
    if (r.rep !== 'nc') continue;
    const item = template.find((t) => t.id === r.itemId);
    const exists = store.actions.some(
      (a) => a.auditId === auditId && a.zoneId === zoneId && a.itemId === r.itemId && a.statut !== 'Clôturée'
    );
    if (exists) continue;
    store.actions.push({
      id: uid('ACT5S'),
      auditId,
      zoneId,
      itemId: r.itemId,
      action: `Écart 5S : ${item?.label || r.itemId}${r.obs ? ` — ${r.obs}` : ''}`,
      prio: 'Moyenne',
      resp: '',
      echeance: '',
      statut: 'À faire',
      createdAt: new Date().toISOString(),
    });
  }
  persistFivesStore();
}

export function addFivesAction(data) {
  const store = loadFivesStore();
  const act = {
    id: uid('ACT5S'),
    auditId: data.auditId || '',
    zoneId: data.zoneId || '',
    itemId: data.itemId || '',
    action: data.action || '',
    prio: data.prio || 'Moyenne',
    resp: data.resp || '',
    echeance: data.echeance || '',
    statut: data.statut || 'À faire',
    createdAt: new Date().toISOString(),
  };
  store.actions.push(act);
  persistFivesStore();
  return act;
}

export function updateFivesAction(id, patch) {
  const act = getFivesActions().find((a) => a.id === id);
  if (!act) return null;
  Object.assign(act, patch);
  persistFivesStore();
  return act;
}

export function deleteFivesAction(id) {
  const store = loadFivesStore();
  store.actions = store.actions.filter((a) => a.id !== id);
  persistFivesStore();
}

export function addTemplateRow(label = 'Nouveau critère', pillar = 'trier') {
  const store = loadFivesStore();
  const maxN = store.template.reduce((m, it) => Math.max(m, it.n), 0);
  const row = { id: uid('cl'), n: maxN + 1, pillar, label };
  store.template.push(row);
  persistFivesStore();
  return row;
}

export function updateTemplateRow(id, patch) {
  const row = getFivesTemplate().find((t) => t.id === id);
  if (!row) return null;
  Object.assign(row, patch);
  persistFivesStore();
  return row;
}

export function removeTemplateRow(id) {
  const store = loadFivesStore();
  store.template = store.template.filter((t) => t.id !== id);
  store.template.forEach((t, i) => {
    t.n = i + 1;
  });
  persistFivesStore();
}

export function renumberTemplate() {
  getFivesTemplate().forEach((t, i) => {
    t.n = i + 1;
  });
  persistFivesStore();
}

export function getNextAuditDue(zoneId) {
  const latest = getLatestZoneResult(zoneId);
  if (!latest?.audit?.date) return { due: true, nextDate: todayFr(), lastDate: null };
  const last = parseFrDate(latest.audit.date);
  if (!last) return { due: true, nextDate: todayFr(), lastDate: latest.audit.date };
  const next = new Date(last);
  next.setDate(next.getDate() + FIVES_AUDIT_INTERVAL_DAYS);
  const due = new Date() >= next;
  const nd = `${String(next.getDate()).padStart(2, '0')}/${String(next.getMonth() + 1).padStart(2, '0')}/${next.getFullYear()}`;
  return { due, nextDate: nd, lastDate: latest.audit.date };
}

export function seedFivesDemoData() {
  if (!canAutoSeed()) return;
  const store = loadFivesStore();
  if (store.audits.length > 0) return;
  const audit = addFivesAudit({
    date: '16/05/2026',
    auditor: 'Responsable QHSE',
    period: 'Sem. 19',
    comment: 'Audit bi-hebdomadaire',
  });
  audit.statut = 'terminé';
  const template = getFivesTemplate();
  const kpis = [92, 88, 85, 83, 87, 82, 90, 84, 78];
  FIVES_ZONES.forEach((z, i) => {
    const targetKpi = kpis[i] ?? 85;
    const responses = template.map((it, idx) => {
      const conforme = idx < Math.round((targetKpi / 100) * template.length);
      return { itemId: it.id, rep: conforme ? 'c' : 'nc', obs: conforme ? '' : 'À corriger' };
    });
    saveZoneAuditResult(audit.id, z.id, {
      responses,
      pointsForts: targetKpi >= 80 ? 'Bonne organisation' : '',
      axes: targetKpi < 80 ? 'Renforcer rangement et nettoyage' : '',
    });
  });
  persistFivesStore();
}

export function seedFivesStore() {
  loadFivesStore();
  seedFivesDemoData();
}
