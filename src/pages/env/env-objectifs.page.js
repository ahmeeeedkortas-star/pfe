/**
 * env-objectifs — Objectifs environnementaux ISO 14001 §6.2
 */
import {
  seedEnvObjectifs,
  getObjectifs,
  addObjectif,
  updateObjectif,
  deleteObjectif,
  calcObjectifProgress,
} from '../../data/env-objectifs.store.js';
import { envKpiPills, envFilterBar, envCard } from '../../components/env/env-module-nav.js';
import { renderIcon } from '../../components/icons/icon-render.js';

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

export const OBJ_STATUTS = ['En cours', 'Atteint', 'En retard'];
const ENV_GREEN = '#16a34a';
let bound = false;

function parseFrDate(s) {
  if (!s) return null;
  const p = String(s).split('/');
  if (p.length !== 3) return null;
  return new Date(+p[2], +p[1] - 1, +p[0]);
}

function isOverdue(o) {
  if (o.statut === 'Atteint') return false;
  const d = parseFrDate(o.echeance);
  return d && d < new Date() && calcObjectifProgress(o) < 100;
}

function effectiveStatut(o) {
  if (o.statut === 'Atteint') return 'Atteint';
  if (isOverdue(o)) return 'En retard';
  return o.statut || 'En cours';
}

function getFilter() {
  return window._objFilter || {};
}
function setFilter(k, v) {
  window._objFilter = { ...(window._objFilter || {}), [k]: v };
}

function filtered() {
  const f = getFilter();
  const q = (f.q || '').toLowerCase();
  return getObjectifs().filter((o) => {
    const st = effectiveStatut(o);
    if (f.statut && st !== f.statut) return false;
    if (q && ![o.id, o.titre, o.resp, o.indicateur].join(' ').toLowerCase().includes(q)) return false;
    return true;
  });
}

function progressColor(pct) {
  if (pct >= 100) return '#16a34a';
  if (pct >= 50) return '#f59e0b';
  return '#dc2626';
}

function statutBadge(st) {
  const map = { Atteint: 'bg3', 'En cours': 'bb', 'En retard': 'br' };
  return map[st] || 'bgr';
}

function buildKpis() {
  const D = getObjectifs();
  const stats = { total: D.length, cours: 0, atteints: 0, retard: 0 };
  D.forEach((o) => {
    const st = effectiveStatut(o);
    if (st === 'Atteint') stats.atteints++;
    else if (st === 'En retard') stats.retard++;
    else stats.cours++;
  });
  return envKpiPills([
    ['Total', stats.total, '#0284c7', '#eff6ff'],
    ['En cours', stats.cours, '#f59e0b', '#fffbeb'],
    ['Atteints', stats.atteints, '#16a34a', '#f0fdf4'],
    ['En retard', stats.retard, '#dc2626', '#fef2f2'],
  ]);
}

function buildFilterBar(rows) {
  const f = getFilter();
  return envFilterBar(`
    ${renderIcon('search', { size: 16 })}
    <input class="fi" data-obj-filter="q" placeholder="Objectif, responsable…" value="${esc(f.q || '')}" style="flex:1;min-width:160px">
    <select class="sel" data-obj-filter="statut">
      <option value="">Tous statuts</option>
      ${OBJ_STATUTS.map((s) => `<option value="${s}"${f.statut === s ? ' selected' : ''}>${s}</option>`).join('')}
    </select>
    <span style="font-size:11px;color:#94a3b8">${rows.length} objectif(s)</span>
    <button type="button" class="btn bp" data-obj-new style="margin-left:auto;background:${ENV_GREEN};border-color:${ENV_GREEN}">+ Nouvel objectif</button>
  `);
}

function buildTable(rows) {
  const body = rows.length
    ? rows
        .map((o) => {
          const pct = calcObjectifProgress(o);
          const col = progressColor(pct);
          const st = effectiveStatut(o);
          return `<tr>
          <td><span class="env-id">${esc(o.id)}</span></td>
          <td><strong>${esc(o.titre)}</strong></td>
          <td>${esc(o.indicateur)}</td>
          <td>${o.ciblePct > 0 ? '+' : ''}${o.ciblePct}%</td>
          <td style="font-family:monospace">${o.valInit}</td>
          <td style="font-family:monospace;color:${col}">${o.valActuelle}</td>
          <td style="font-family:monospace">${o.valCible}</td>
          <td><div class="env-progress"><div class="env-progress-bar"><span style="width:${pct}%;background:${col}"></span></div><span class="env-progress-pct" style="color:${col}">${pct}%</span></div></td>
          <td>${esc(o.echeance)}</td>
          <td>${esc(o.resp)}</td>
          <td><span class="badge ${statutBadge(st)}">${esc(st)}</span></td>
          <td>
            <button type="button" class="btn bsm" data-obj-edit="${esc(o.id)}">✏</button>
            <button type="button" class="btn bsm" data-obj-del="${esc(o.id)}" style="color:#dc2626;margin-left:4px">🗑</button>
          </td>
        </tr>`;
        })
        .join('')
    : '<tr><td colspan="12" style="text-align:center;padding:28px;color:#94a3b8">Aucun objectif</td></tr>';

  return envCard(
    'Objectifs environnementaux — ISO 14001 §6.2',
    `<div class="env-tbl-wrap"><table class="env-tbl">
      <thead><tr>${['ID', 'Objectif', 'Indicateur', 'Cible', 'Val. init.', 'Val. actuelle', 'Val. cible', 'Progression', 'Échéance', 'Responsable', 'Statut', ''].map((h) => `<th>${h}</th>`).join('')}</tr></thead>
      <tbody>${body}</tbody>
    </table></div>`,
    `<button type="button" class="btn bp" data-obj-new style="background:${ENV_GREEN};border-color:${ENV_GREEN}">+ Nouvel objectif</button>`
  );
}

function buildModal(obj) {
  const isNew = !obj;
  const o = obj || {
    titre: '',
    indicateur: '',
    ciblePct: 0,
    valInit: 0,
    valActuelle: 0,
    valCible: 0,
    echeance: '',
    resp: 'HSE Manager',
    statut: 'En cours',
    notes: '',
  };
  return `<div id="obj-modal-overlay" style="position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:1000;display:flex;align-items:center;justify-content:center">
    <div style="background:#fff;border-radius:14px;padding:24px;width:520px;max-width:95vw;max-height:90vh;overflow:auto">
      <h2 style="margin:0 0 14px;font-size:16px">${isNew ? '+ Nouvel objectif' : `✏ ${esc(o.id)}`}</h2>
      <form data-obj-form>
        <input type="hidden" name="id" value="${esc(o.id || '')}">
        <label class="fl">Objectif *</label><input class="fi" name="titre" value="${esc(o.titre)}" required>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px">
          <div><label class="fl">Indicateur</label><input class="fi" name="indicateur" value="${esc(o.indicateur)}"></div>
          <div><label class="fl">Cible (%)</label><input class="fi" type="number" name="ciblePct" value="${o.ciblePct ?? 0}"></div>
          <div><label class="fl">Valeur initiale</label><input class="fi" type="number" name="valInit" value="${o.valInit ?? 0}"></div>
          <div><label class="fl">Valeur actuelle</label><input class="fi" type="number" name="valActuelle" value="${o.valActuelle ?? 0}"></div>
          <div><label class="fl">Valeur cible</label><input class="fi" type="number" name="valCible" value="${o.valCible ?? 0}"></div>
          <div><label class="fl">Échéance (JJ/MM/AAAA)</label><input class="fi" name="echeance" value="${esc(o.echeance)}" placeholder="31/12/2026"></div>
          <div><label class="fl">Responsable</label><input class="fi" name="resp" value="${esc(o.resp)}"></div>
          <div><label class="fl">Statut</label><select class="fi" name="statut">${OBJ_STATUTS.map((s) => `<option${o.statut === s ? ' selected' : ''}>${s}</option>`).join('')}</select></div>
        </div>
        <label class="fl" style="margin-top:8px">Notes</label><textarea class="fi" name="notes" rows="2">${esc(o.notes)}</textarea>
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:14px">
          <button type="button" class="btn" data-obj-modal-close>Annuler</button>
          <button type="submit" class="btn bp" style="background:${ENV_GREEN};border-color:${ENV_GREEN}">Enregistrer</button>
        </div>
      </form>
    </div>
  </div>`;
}

function openModal(obj) {
  document.getElementById('obj-modal-root')?.remove();
  const root = document.createElement('div');
  root.id = 'obj-modal-root';
  root.innerHTML = buildModal(obj);
  document.body.appendChild(root);
}

function closeModal() {
  document.getElementById('obj-modal-root')?.remove();
}

function pageBody() {
  const rows = filtered();
  return `${renderEnvModuleNav('env-objectifs')}
    ${envPageHeader('Objectifs environnementaux', 'Planification · Suivi · Résultats ISO 14001', 'target', `<button type="button" class="btn bp" data-obj-new style="background:${ENV_GREEN};border-color:${ENV_GREEN}">+ Nouvel objectif</button>`)}
    ${buildKpis()}
    ${buildFilterBar(rows)}
    ${buildTable(rows)}`;
}

function refresh() {
  const el = document.querySelector('[data-page="env-objectifs"]');
  if (el) el.innerHTML = pageBody();
}

export function renderEnvObjectifs() {
  seedEnvObjectifs();
  if (!bound) {
    bindEnvObjectifs();
    bound = true;
  }
  return `<div class="env-page" data-page="env-objectifs">${pageBody()}</div>`;
}

function bindEnvObjectifs() {
  document.addEventListener('input', (e) => {
    const fi = e.target.closest('[data-obj-filter="q"]');
    if (fi?.closest('[data-page="env-objectifs"]')) {
      setFilter('q', fi.value);
      refresh();
    }
  });
  document.addEventListener('change', (e) => {
    const fi = e.target.closest('[data-obj-filter]');
    if (fi?.closest('[data-page="env-objectifs"]')) {
      setFilter(fi.dataset.objFilter, fi.value);
      refresh();
    }
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-page="env-objectifs"]') && !e.target.closest('#obj-modal-root')) return;
    if (e.target.closest('[data-obj-new]')) {
      openModal(null);
      return;
    }
    const edit = e.target.closest('[data-obj-edit]');
    if (edit) {
      const o = getObjectifs().find((x) => x.id === edit.dataset.objEdit);
      if (o) openModal(o);
      return;
    }
    const del = e.target.closest('[data-obj-del]');
    if (del && confirm(`Supprimer ${del.dataset.objDel} ?`)) {
      deleteObjectif(del.dataset.objDel);
      refresh();
      return;
    }
    if (e.target.closest('[data-obj-modal-close]') || e.target.id === 'obj-modal-overlay') closeModal();
  });
  document.addEventListener('submit', (e) => {
    const form = e.target.closest('[data-obj-form]');
    if (!form) return;
    e.preventDefault();
    const fd = new FormData(form);
    const item = {
      titre: fd.get('titre'),
      indicateur: fd.get('indicateur'),
      ciblePct: +fd.get('ciblePct') || 0,
      valInit: +fd.get('valInit') || 0,
      valActuelle: +fd.get('valActuelle') || 0,
      valCible: +fd.get('valCible') || 0,
      echeance: fd.get('echeance'),
      resp: fd.get('resp'),
      statut: fd.get('statut'),
      notes: fd.get('notes') || '',
    };
    const id = fd.get('id');
    if (id) updateObjectif(id, item);
    else addObjectif(item);
    closeModal();
    refresh();
  });
}
