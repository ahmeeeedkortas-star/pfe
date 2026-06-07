/**
 * env-conso — Suivi des consommations (ISO 14001).
 */
import {
  seedEnvConso,
  getConso,
  addConso,
  updateConso,
  deleteConso,
  CONSO_OBJECTIFS,
  moisLabel,
} from '../../data/env-conso.store.js';
import { envKpiPills, envFilterBar, envCard } from '../../components/env/env-module-nav.js';
import { renderIcon } from '../../components/icons/icon-render.js';

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

const ENV_GREEN = '#16a34a';
let bound = false;

function getFilter() {
  return window._consoFilter || {};
}
function setFilter(k, v) {
  window._consoFilter = { ...(window._consoFilter || {}), [k]: v };
}

function filtered() {
  const f = getFilter();
  const q = (f.q || '').toLowerCase();
  return getConso()
    .slice()
    .sort((a, b) => (b.mois || '').localeCompare(a.mois || ''))
    .filter((r) => {
      if (f.annee && !(r.mois || '').startsWith(f.annee)) return false;
      if (q && ![r.id, r.mois, moisLabel(r.mois), r.notes || ''].join(' ').toLowerCase().includes(q))
        return false;
      return true;
    });
}

function pctVsObj(val, key) {
  const obj = CONSO_OBJECTIFS[key];
  if (!obj?.val) return 0;
  return Math.round((val / obj.val) * 100);
}

function buildResourceKpis() {
  const last = getConso().slice().sort((a, b) => b.mois.localeCompare(a.mois))[0] || {};
  const keys = [
    ['electricite', '#7c3aed', '#f5f3ff'],
    ['eau', '#0284c7', '#eff6ff'],
    ['air', '#16a34a', '#f0fdf4'],
    ['carburant', '#f59e0b', '#fffbeb'],
  ];
  return `<div class="env-conso-grid">
    ${keys
      .map(([k, c, bg]) => {
        const o = CONSO_OBJECTIFS[k];
        const val = last[k] ?? 0;
        const pct = pctVsObj(val, k);
        const ok = pct <= 100;
        return `<div class="env-conso-card" style="background:${bg};border-color:${c}40;color:${c}">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;opacity:.85">${esc(o.label)}</div>
          <div style="font-size:24px;font-weight:800;margin:6px 0">${val.toLocaleString('fr')} <span style="font-size:12px;font-weight:600">${esc(o.unite)}</span></div>
          <div style="font-size:11px">Objectif : ${o.val.toLocaleString('fr')} ${esc(o.unite)} · <strong>${pct}%</strong></div>
          <div class="env-progress" style="margin-top:10px">
            <div class="env-progress-bar"><span style="width:${Math.min(pct, 100)}%;background:${ok ? c : '#dc2626'}"></span></div>
          </div>
        </div>`;
      })
      .join('')}
  </div>`;
}

function buildChart() {
  const rows = getConso()
    .slice()
    .sort((a, b) => a.mois.localeCompare(b.mois))
    .slice(-8);
  if (!rows.length) return '<p class="reg-meta">Aucune donnée</p>';

  const maxEl = Math.max(...rows.map((c) => c.electricite), 1);
  const maxEau = Math.max(...rows.map((c) => c.eau), 1);

  return `<div style="position:relative;height:140px;padding:4px 4px 24px">
    <div style="display:flex;align-items:flex-end;gap:8px;height:120px">
      ${rows
        .map(
          (d) => `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
        <div style="display:flex;align-items:flex-end;gap:3px;height:100px;width:100%;justify-content:center">
          <div title="Électricité" style="width:12px;height:${(d.electricite / maxEl) * 92}px;background:#7c3aed;border-radius:4px 4px 0 0"></div>
          <div title="Eau" style="width:12px;height:${(d.eau / maxEau) * 70}px;background:#0284c7;border-radius:4px 4px 0 0"></div>
        </div>
        <div style="font-size:9px;color:#64748b">${esc(moisLabel(d.mois).slice(0, 6))}</div>
      </div>`
        )
        .join('')}
    </div>
    <div style="display:flex;gap:14px;justify-content:center;font-size:10px;margin-top:8px">
      <span><span style="display:inline-block;width:10px;height:10px;background:#7c3aed;border-radius:2px;margin-right:4px"></span>Électricité</span>
      <span><span style="display:inline-block;width:10px;height:10px;background:#0284c7;border-radius:2px;margin-right:4px"></span>Eau</span>
    </div>
  </div>`;
}

function buildFilterBar(rows) {
  const f = getFilter();
  const years = [...new Set(getConso().map((r) => (r.mois || '').slice(0, 4)).filter(Boolean))].sort().reverse();
  return envFilterBar(`
    ${renderIcon('search', { size: 16 })}
    <input class="fi" data-conso-filter="q" placeholder="Rechercher mois, ID…" value="${esc(f.q || '')}" style="flex:1;min-width:160px">
    <select class="sel" data-conso-filter="annee">
      <option value="">Année : toutes</option>
      ${years.map((y) => `<option value="${y}"${f.annee === y ? ' selected' : ''}>${y}</option>`).join('')}
    </select>
    ${f.q || f.annee ? `<button type="button" class="btn bsm" data-conso-clear>✕ Effacer</button>` : ''}
    <span style="font-size:11px;color:#94a3b8;margin-left:auto">${rows.length} ligne(s)</span>
    <button type="button" class="btn bp" data-conso-new style="background:${ENV_GREEN};border-color:${ENV_GREEN}">+ Nouvelle saisie</button>
  `);
}

function buildTable(rows) {
  const body = rows.length
    ? rows
        .map((r) => {
          const elPct = pctVsObj(r.electricite, 'electricite');
          return `<tr>
          <td><span class="env-id">${esc(r.id)}</span></td>
          <td><strong>${esc(moisLabel(r.mois))}</strong></td>
          <td style="font-family:monospace">${(r.electricite || 0).toLocaleString('fr')} kWh</td>
          <td style="font-family:monospace">${r.eau || 0} m³</td>
          <td style="font-family:monospace">${(r.air || 0).toLocaleString('fr')} m³</td>
          <td style="font-family:monospace">${r.carburant || 0} L</td>
          <td><span style="color:${elPct > 100 ? '#dc2626' : '#16a34a'};font-weight:700">${elPct}%</span> objectif élec.</td>
          <td style="font-size:11px;color:#64748b">${esc(r.notes || '—')}</td>
          <td>
            <button type="button" class="btn bsm" data-conso-edit="${esc(r.id)}">✏</button>
            <button type="button" class="btn bsm" data-conso-del="${esc(r.id)}" style="color:#dc2626;margin-left:4px">🗑</button>
          </td>
        </tr>`;
        })
        .join('')
    : '<tr><td colspan="9" style="text-align:center;padding:28px;color:#94a3b8">Aucune consommation</td></tr>';

  return envCard(
    'Historique mensuel — ISO 14001 §9.1',
    `<div class="env-tbl-wrap"><table class="env-tbl">
      <thead><tr>${['ID', 'Mois', 'Électricité', 'Eau', 'Air comprimé', 'Carburant', 'Vs objectif', 'Notes', ''].map((h) => `<th>${h}</th>`).join('')}</tr></thead>
      <tbody>${body}</tbody>
    </table></div>`
  );
}

function buildModal(row) {
  const isNew = !row;
  const d = row || { mois: new Date().toISOString().slice(0, 7), electricite: 0, eau: 0, air: 0, carburant: 0, notes: '' };
  return `<div id="conso-modal-overlay" class="modal-overlay" style="position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:1000;display:flex;align-items:center;justify-content:center">
    <div style="background:#fff;border-radius:14px;padding:24px;width:480px;max-width:95vw;box-shadow:0 12px 40px rgba(0,0,0,.15)">
      <h2 style="margin:0 0 16px;font-size:16px">${isNew ? '+ Saisie consommations' : `✏ ${esc(d.id)}`}</h2>
      <form data-conso-form>
        <input type="hidden" name="id" value="${esc(d.id || '')}">
        <label class="fl">Mois *</label><input class="fi" type="month" name="mois" value="${esc(d.mois)}" required>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px">
          <div><label class="fl">Électricité (kWh)</label><input class="fi" type="number" name="electricite" value="${d.electricite ?? 0}" min="0"></div>
          <div><label class="fl">Eau (m³)</label><input class="fi" type="number" name="eau" value="${d.eau ?? 0}" min="0" step="0.1"></div>
          <div><label class="fl">Air comprimé (m³)</label><input class="fi" type="number" name="air" value="${d.air ?? 0}" min="0"></div>
          <div><label class="fl">Carburant (L)</label><input class="fi" type="number" name="carburant" value="${d.carburant ?? 0}" min="0"></div>
        </div>
        <label class="fl" style="margin-top:10px">Notes</label><textarea class="fi" name="notes" rows="2">${esc(d.notes)}</textarea>
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px">
          <button type="button" class="btn" data-conso-modal-close>Annuler</button>
          <button type="submit" class="btn bp" style="background:${ENV_GREEN};border-color:${ENV_GREEN}">Enregistrer</button>
        </div>
      </form>
    </div>
  </div>`;
}

function openModal(row) {
  document.getElementById('conso-modal-root')?.remove();
  const root = document.createElement('div');
  root.id = 'conso-modal-root';
  root.innerHTML = buildModal(row);
  document.body.appendChild(root);
}

function closeModal() {
  document.getElementById('conso-modal-root')?.remove();
}

function pageBody() {
  const rows = filtered();
  const D = getConso();
  const latest = D.length ? [...D].sort((a, b) => b.mois.localeCompare(a.mois))[0] : null;
  const kpis = [
    ['Mois enregistrés', D.length, '#0284c7', '#eff6ff'],
    ['Dernier mois', latest ? moisLabel(latest.mois) : '—', '#16a34a', '#f0fdf4'],
    ['Lignes filtrées', rows.length, '#7c3aed', '#f5f3ff'],
    ['Alertes objectif', Object.keys(CONSO_OBJECTIFS).filter((k) => pctVsObj((D[0] || {})[k], k) > 100).length, '#dc2626', '#fef2f2'],
  ];
  return `${envKpiPills(kpis)}
    ${buildResourceKpis()}
    <div class="env-chart-row">
      ${envCard('Évolution — 8 derniers mois', buildChart())}
      ${envCard('Objectifs mensuels', `<ul style="margin:0;padding:0;list-style:none;font-size:12px">
        ${Object.entries(CONSO_OBJECTIFS)
          .map(
            ([k, o]) =>
              `<li style="padding:8px 0;border-bottom:1px solid #f1f5f9;display:flex;justify-content:space-between"><span>${esc(o.label)}</span><strong>${o.val.toLocaleString('fr')} ${esc(o.unite)}</strong></li>`
          )
          .join('')}
      </ul>`)}
    </div>
    ${buildFilterBar(rows)}
    ${buildTable(rows)}`;
}

function refresh() {
  const el = document.querySelector('[data-page="env-conso"]');
  if (el) el.innerHTML = pageBody();
}

export function renderEnvConso() {
  seedEnvConso();
  if (!bound) {
    bindEnvConso();
    bound = true;
  }
  return `<div class="env-page" data-page="env-conso">${pageBody()}</div>`;
}

function bindEnvConso() {
  document.addEventListener('input', (e) => {
    const fi = e.target.closest('[data-conso-filter="q"]');
    if (fi?.closest('[data-page="env-conso"]')) {
      setFilter('q', fi.value);
      refresh();
    }
  });
  document.addEventListener('change', (e) => {
    const fi = e.target.closest('[data-conso-filter]');
    if (fi?.closest('[data-page="env-conso"]')) {
      setFilter(fi.dataset.consoFilter, fi.value);
      refresh();
    }
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-page="env-conso"]') && !e.target.closest('#conso-modal-root')) return;
    if (e.target.closest('[data-conso-clear]')) {
      window._consoFilter = {};
      refresh();
      return;
    }
    if (e.target.closest('[data-conso-new]')) {
      openModal(null);
      return;
    }
    const edit = e.target.closest('[data-conso-edit]');
    if (edit) {
      const r = getConso().find((x) => x.id === edit.dataset.consoEdit);
      if (r) openModal(r);
      return;
    }
    const del = e.target.closest('[data-conso-del]');
    if (del && confirm(`Supprimer ${del.dataset.consoDel} ?`)) {
      deleteConso(del.dataset.consoDel);
      refresh();
      return;
    }
    if (e.target.closest('[data-conso-modal-close]') || e.target.id === 'conso-modal-overlay') closeModal();
  });
  document.addEventListener('submit', (e) => {
    const form = e.target.closest('[data-conso-form]');
    if (!form) return;
    e.preventDefault();
    const fd = new FormData(form);
    const item = {
      mois: fd.get('mois'),
      electricite: +fd.get('electricite') || 0,
      eau: +fd.get('eau') || 0,
      air: +fd.get('air') || 0,
      carburant: +fd.get('carburant') || 0,
      notes: fd.get('notes') || '',
    };
    const id = fd.get('id');
    if (id) updateConso(id, item);
    else addConso(item);
    closeModal();
    refresh();
  });
}
