/**
 * Store EPI — persistance localStorage + CRUD.
 */
import {
  EPI_REQUIS,
  SEC_EPI_EMPLOYEES as DEFAULT_EMPLOYEES,
  SEC_EPI_NC_HISTORY as DEFAULT_NC,
  SEC_EPI_CONTROLES as DEFAULT_CONTROLES,
  joursAvantRenouvellement,
} from './sec-epi.data.js';
import { canAutoSeed } from '../core/empty-platform.js';

const KEY_EMP = 'xm_sec_epi_employees';
const KEY_NC = 'xm_sec_epi_nc';
const KEY_CTL = 'xm_sec_epi_controles';

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function write(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent('sec-epi-updated'));
}

export function initSecEpiStore() {
  if (!canAutoSeed()) {
    window.SEC_EPI_EMPLOYEES = read(KEY_EMP) || [];
    window.SEC_EPI_NC = read(KEY_NC) || [];
    window.SEC_EPI_CONTROLES = read(KEY_CTL) || [];
    return;
  }
  if (!window.SEC_EPI_EMPLOYEES) {
    const saved = read(KEY_EMP);
    window.SEC_EPI_EMPLOYEES = saved?.length ? saved : structuredClone(DEFAULT_EMPLOYEES);
  }
  if (!window.SEC_EPI_NC) {
    const savedNc = read(KEY_NC);
    window.SEC_EPI_NC = savedNc?.length ? savedNc : structuredClone(DEFAULT_NC);
  }
  if (!window.SEC_EPI_CONTROLES) {
    const savedCtl = read(KEY_CTL);
    window.SEC_EPI_CONTROLES = savedCtl?.length ? savedCtl : structuredClone(DEFAULT_CONTROLES);
  }
  normalizeAllEpiStatuts();
}

function persistEmployees() {
  write(KEY_EMP, window.SEC_EPI_EMPLOYEES);
}

function persistNc() {
  write(KEY_NC, window.SEC_EPI_NC);
}

export function getEmployees() {
  initSecEpiStore();
  return window.SEC_EPI_EMPLOYEES;
}

export function getNcList() {
  initSecEpiStore();
  return window.SEC_EPI_NC;
}

export function getControles() {
  initSecEpiStore();
  return window.SEC_EPI_CONTROLES;
}

function persistControles() {
  write(KEY_CTL, window.SEC_EPI_CONTROLES);
}

export function nextControleId() {
  const nums = getControles()
    .map((c) => parseInt(String(c.id).replace(/\D/g, ''), 10))
    .filter((n) => !Number.isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  return `CTL-${String(next).padStart(3, '0')}`;
}

export function addControle(row) {
  getControles().unshift(row);
  persistControles();
  return { ok: true };
}

export function formatToday() {
  const n = new Date();
  return `${String(n.getDate()).padStart(2, '0')}/${String(n.getMonth() + 1).padStart(2, '0')}/${n.getFullYear()}`;
}

/** dd/mm/yyyy depuis input date yyyy-mm-dd */
export function fromInputDate(val) {
  if (!val) return formatToday();
  const [y, m, d] = val.split('-');
  return `${d}/${m}/${y}`;
}

/** yyyy-mm-dd pour input date */
export function toInputDate(fr) {
  const p = String(fr || '').split('/');
  if (p.length < 3) return '';
  return `${p[2]}-${p[1].padStart(2, '0')}-${p[0].padStart(2, '0')}`;
}

export function computeEpiItemStatut(renouvellement) {
  const j = joursAvantRenouvellement(renouvellement);
  if (j == null) return 'Conforme';
  if (j < 0) return 'Expiré';
  if (j <= 30) return 'À renouveler';
  return 'Conforme';
}

function normalizeAllEpiStatuts() {
  window.SEC_EPI_EMPLOYEES.forEach((emp) => {
    (emp.epi || []).forEach((e) => {
      e.statut = computeEpiItemStatut(e.renouvellement);
    });
  });
}

export function nextEmployeeId() {
  const nums = getEmployees()
    .map((e) => parseInt(String(e.id).replace(/\D/g, ''), 10))
    .filter((n) => !Number.isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  return `EMP-${String(next).padStart(4, '0')}`;
}

export function nextNcId() {
  const nums = getNcList()
    .map((n) => parseInt(String(n.n).replace(/\D/g, ''), 10))
    .filter((x) => !Number.isNaN(x));
  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  return `EPI-NC-${String(next).padStart(3, '0')}`;
}

export function addEmployee(data) {
  const emp = {
    id: data.id || nextEmployeeId(),
    nom: data.nom?.trim(),
    poste: data.poste?.trim() || '—',
    dep: data.dep?.trim() || '—',
    tel: data.tel?.trim() || '',
    email: data.email?.trim() || '',
    embauche: data.embauche || formatToday(),
    photo: data.photo?.trim() || '',
    epi: [],
  };
  if (!emp.nom) return { ok: false, error: 'Nom requis' };
  getEmployees().push(emp);
  persistEmployees();
  return { ok: true, emp };
}

export function updateEmployee(id, patch) {
  const emp = getEmployees().find((e) => e.id === id);
  if (!emp) return { ok: false };
  Object.assign(emp, patch);
  persistEmployees();
  return { ok: true, emp };
}

export function deleteEmployee(id) {
  const list = getEmployees();
  const i = list.findIndex((e) => e.id === id);
  if (i < 0) return { ok: false };
  list.splice(i, 1);
  persistEmployees();
  return { ok: true };
}

export function addEpiToEmployee(empId, { id, attribue, renouvellement }) {
  const emp = getEmployees().find((e) => e.id === empId);
  if (!emp) return { ok: false };
  if ((emp.epi || []).some((e) => e.id === id)) return { ok: false, error: 'EPI déjà attribué' };
  const item = {
    id,
    attribue: attribue || formatToday(),
    renouvellement: renouvellement || formatToday(),
    statut: 'Conforme',
  };
  item.statut = computeEpiItemStatut(item.renouvellement);
  emp.epi = emp.epi || [];
  emp.epi.push(item);
  persistEmployees();
  return { ok: true, item };
}

export function updateEpiItem(empId, epiId, patch) {
  const emp = getEmployees().find((e) => e.id === empId);
  const item = emp?.epi?.find((e) => e.id === epiId);
  if (!item) return { ok: false };
  Object.assign(item, patch);
  if (patch.renouvellement) item.statut = computeEpiItemStatut(item.renouvellement);
  persistEmployees();
  return { ok: true, item };
}

export function removeEpiFromEmployee(empId, epiId) {
  const emp = getEmployees().find((e) => e.id === empId);
  if (!emp?.epi) return { ok: false };
  emp.epi = emp.epi.filter((e) => e.id !== epiId);
  persistEmployees();
  return { ok: true };
}

/** Renouvelle un EPI (+2 ans par défaut) */
export function renewEpi(empId, epiId, years = 2) {
  const emp = getEmployees().find((e) => e.id === empId);
  const item = emp?.epi?.find((e) => e.id === epiId);
  if (!item) return { ok: false };
  const now = new Date();
  item.attribue = formatToday();
  const ren = new Date(now);
  ren.setFullYear(ren.getFullYear() + years);
  item.renouvellement = `${String(ren.getDate()).padStart(2, '0')}/${String(ren.getMonth() + 1).padStart(2, '0')}/${ren.getFullYear()}`;
  item.statut = computeEpiItemStatut(item.renouvellement);
  persistEmployees();
  return { ok: true, item };
}

export function addNc(nc) {
  getNcList().unshift(nc);
  persistNc();
  return { ok: true };
}

export function updateNcStatus(n, status) {
  const row = getNcList().find((x) => x.n === n);
  if (!row) return { ok: false };
  row.s = status;
  persistNc();
  return { ok: true };
}

export function deleteNc(n) {
  const list = getNcList();
  const i = list.findIndex((x) => x.n === n);
  if (i < 0) return { ok: false };
  list.splice(i, 1);
  persistNc();
  return { ok: true };
}

export function availableEpiTypes(emp) {
  const have = new Set((emp.epi || []).map((e) => e.id));
  return EPI_REQUIS.filter((t) => !have.has(t.id));
}

export { EPI_REQUIS };
