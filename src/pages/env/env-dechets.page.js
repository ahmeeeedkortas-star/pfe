/**
 * env-dechets — Registre des déchets (ISO 14001).
 */
import {
  seedEnvDechets, getDechets, addDechet, updateDechet, deleteDechet,
  DECHET_TYPES, DECHET_ZONES, DECHET_STATUTS, DECHET_UNITES, DECHET_PRESTAS,
} from '../../data/env-dechets.store.js';

function esc(s) { return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

const TYPE_COLORS = { Métalliques: '#64748b', 'Huiles usagées': '#0284c7', Cartons: '#f59e0b', Plastiques: '#06b6d4', Dangereux: '#dc2626', DEEE: '#7c3aed', Autres: '#94a3b8' };
const STATUT_BADGE = { Enlevé: 'bg3', 'En attente': 'by', 'Non conforme': 'br' };

const ENV_GREEN = '#16a34a';

let bound = false;

function getFilter() { return window._decFilter || {}; }
function setFilter(k, v) { window._decFilter = { ...(window._decFilter || {}), [k]: v }; }

function filtered() {
  const f = getFilter();
  const q = (f.q || '').toLowerCase();
  return getDechets().filter((d) => {
    if (f.type && d.type !== f.type) return false;
    if (f.stat && d.s !== f.stat) return false;
    if (f.zone && d.zone !== f.zone) return false;
    if (q && ![d.id, d.type, d.desc, d.zone, d.presta || ''].join(' ').toLowerCase().includes(q)) return false;
    return true;
  });
}

function buildKpiStrip() {
  const D = getDechets();
  const totalKg = D.reduce((s, d) => s + (d.unite === 'kg' ? d.qte : d.qte * 0.85), 0);
  const valorKg = D.filter((d) => d.s === 'Enlevé').reduce((s, d) => s + (d.unite === 'kg' ? d.qte : d.qte * 0.85), 0);
  const recycPct = totalKg > 0 ? Math.round((valorKg / totalKg) * 100) : 0;
  const nonConf = D.filter((d) => d.s === 'Non conforme').length;
  const kpis = [
    ['♻', 'Total déchets', totalKg.toFixed(0) + ' kg', '#64748b', '#f8fafc'],
    ['✅', 'Valorisés', valorKg.toFixed(0) + ' kg', ENV_GREEN, '#f0fdf4'],
    ['📊', 'Taux recyclage', recycPct + '%', '#0284c7', '#eff6ff'],
    ['⚠', 'Non conformes', nonConf, '#dc2626', '#fef2f2'],
  ];
  return `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:13px">
    ${kpis.map(([ic, l, v, c, bg]) => `
    <div style="background:${bg};border:1px solid ${c}30;border-radius:11px;padding:12px;display:flex;align-items:center;gap:10px">
      <span style="font-size:20px">${ic}</span>
      <div>
        <div style="font-size:22px;font-weight:800;color:${c};line-height:1">${esc(String(v))}</div>
        <div style="font-size:10px;font-weight:600;color:${c};opacity:.8;margin-top:1px">${esc(l)}</div>
      </div>
    </div>`).join('')}
  </div>`;
}

function buildFilterBar(rows) {
  const f = getFilter();
  const D = getDechets();
  const zones = [...new Set(D.map((d) => d.zone))];
  return `<div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:11px 14px;margin-bottom:12px;box-shadow:0 1px 4px rgba(0,0,0,.04)">
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <div style="display:flex;align-items:center;gap:6px;background:#f8fafc;border:1.5px solid ${f.q ? ENV_GREEN : '#e2e8f0'};border-radius:8px;padding:5px 10px;flex:1;min-width:180px">
        <span style="color:#94a3b8">🔍</span>
        <input data-dec-filter="q" placeholder="Rechercher type, zone, prestataire…" value="${esc(f.q || '')}"
          style="border:none;background:transparent;font-size:11px;color:#0f172a;outline:none;width:100%;font-family:'Inter',sans-serif">
        ${f.q ? `<button data-dec-clear-q style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:13px;padding:0">✕</button>` : ''}
      </div>
      <select class="sel" data-dec-filter="type">
        <option value="">♻ Type : Tous</option>
        ${DECHET_TYPES.map((t) => `<option value="${esc(t)}"${f.type === t ? ' selected' : ''}>${esc(t)}</option>`).join('')}
      </select>
      <select class="sel" data-dec-filter="zone">
        <option value="">🏭 Zone : Toutes</option>
        ${zones.map((z) => `<option value="${esc(z)}"${f.zone === z ? ' selected' : ''}>${esc(z)}</option>`).join('')}
      </select>
      <select class="sel" data-dec-filter="stat">
        <option value="">📋 Statut : Tous</option>
        ${DECHET_STATUTS.map((s) => `<option value="${esc(s)}"${f.stat === s ? ' selected' : ''}>${esc(s)}</option>`).join('')}
      </select>
      ${(f.q || f.type || f.zone || f.stat) ? `<button data-dec-clear-filter class="btn bsm" style="background:#fef2f2;color:#dc2626;border-color:#fca5a5">✕ Effacer</button>` : ''}
      <span style="font-size:10px;color:#94a3b8">${rows.length}/${D.length}</span>
      <button data-dec-new style="background:linear-gradient(135deg,#92400e,${ENV_GREEN});color:#fff;border:none;border-radius:8px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;margin-left:auto">+ Nouveau déchet</button>
    </div>
  </div>`;
}

function buildTable(rows) {
  return `<div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.04)">
    <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-family:'Inter',sans-serif">
        <thead><tr style="background:#f8fafc;border-bottom:1.5px solid #e2e8f0">
          ${['ID', 'Date', 'Type', 'Description', 'Quantité', 'Zone', 'Stockage', 'Enlèvement', 'Prestataire', 'Statut', ''].map((h) => `<th style="padding:9px 12px;font-size:10px;font-weight:700;color:#64748b;text-align:left;white-space:nowrap;text-transform:uppercase;letter-spacing:.04em">${esc(h)}</th>`).join('')}
        </tr></thead>
        <tbody>
          ${rows.length ? rows.map((d) => {
            const tc = TYPE_COLORS[d.type] || '#94a3b8';
            return `<tr onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background=''">
              <td style="font-weight:700;font-size:10px;color:#f59e0b;font-family:monospace">${esc(d.id)}</td>
              <td style="font-size:10px;color:#94a3b8">${esc(d.d)}</td>
              <td><span style="padding:2px 8px;border-radius:20px;font-size:8.5px;font-weight:700;background:${tc}22;color:${tc};border:1px solid ${tc}44">${esc(d.type)}</span></td>
              <td style="font-size:10.5px">${esc(d.desc)}</td>
              <td style="font-weight:700;font-family:monospace;font-size:11px">${esc(d.qte)} ${esc(d.unite)}</td>
              <td style="font-size:10px">${esc(d.zone)}</td>
              <td style="text-align:center;font-size:15px">${d.stockOk ? '<span style="color:#16a34a">✓</span>' : '<span style="color:#dc2626">✗</span>'}</td>
              <td style="font-size:10px;color:#94a3b8">${d.enlev ? esc(d.enlev) : '—'}</td>
              <td style="font-size:10px">${esc(d.presta || '—')}</td>
              <td><span class="badge ${STATUT_BADGE[d.s] || 'bgr'}" style="font-size:8.5px">${esc(d.s)}</span></td>
              <td>
                <button data-dec-edit="${esc(d.id)}" class="btn bsm" title="Modifier">✏</button>
                <button data-dec-delete="${esc(d.id)}" class="btn bsm" style="color:#dc2626;border-color:#fecaca;margin-left:4px" title="Supprimer">🗑</button>
              </td>
            </tr>`;
          }).join('') : '<tr><td colspan="11" style="text-align:center;padding:24px;color:#94a3b8">Aucun déchet enregistré</td></tr>'}
        </tbody>
      </table>
    </div>
  </div>`;
}

function buildModal(dechet) {
  const isNew = !dechet;
  const d = dechet || { type: '', desc: '', qte: 0, unite: 'kg', zone: '', stockOk: true, enlev: '', presta: '', s: 'En attente', d: new Date().toISOString().slice(0, 10) };
  return `<div id="dec-modal-overlay" style="position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:1000;display:flex;align-items:center;justify-content:center">
    <div style="background:#fff;border-radius:14px;padding:24px;width:480px;max-width:95vw;box-shadow:0 8px 40px rgba(0,0,0,.18)">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
        <h2 style="font-size:15px;font-weight:700;margin:0">${isNew ? '+ Nouveau déchet' : `✏ Modifier ${esc(d.id)}`}</h2>
        <button data-dec-modal-close style="background:none;border:none;cursor:pointer;font-size:18px;color:#94a3b8">✕</button>
      </div>
      <form data-dec-form id="dec-form">
        <input type="hidden" name="id" value="${esc(d.id || '')}">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div><label class="fl">Date *</label><input class="fi" type="date" name="d" value="${esc(d.d)}" required></div>
          <div><label class="fl">Type *</label>
            <select class="fi" name="type" required>
              <option value="">— Choisir —</option>
              ${DECHET_TYPES.map((t) => `<option value="${esc(t)}"${d.type === t ? ' selected' : ''}>${esc(t)}</option>`).join('')}
            </select>
          </div>
          <div style="grid-column:1/-1"><label class="fl">Description *</label><input class="fi" name="desc" value="${esc(d.desc)}" required placeholder="Ex. Copeaux usinage CN01"></div>
          <div><label class="fl">Quantité *</label><input class="fi" type="number" name="qte" value="${esc(d.qte)}" min="0" step="0.1" required></div>
          <div><label class="fl">Unité</label>
            <select class="fi" name="unite">
              ${DECHET_UNITES.map((u) => `<option${d.unite === u ? ' selected' : ''}>${esc(u)}</option>`).join('')}
            </select>
          </div>
          <div><label class="fl">Zone *</label>
            <select class="fi" name="zone" required>
              <option value="">— Choisir —</option>
              ${DECHET_ZONES.map((z) => `<option value="${esc(z)}"${d.zone === z ? ' selected' : ''}>${esc(z)}</option>`).join('')}
            </select>
          </div>
          <div><label class="fl">Prestataire</label>
            <select class="fi" name="presta">
              <option value="">—</option>
              ${DECHET_PRESTAS.map((p) => `<option value="${esc(p)}"${d.presta === p ? ' selected' : ''}>${esc(p)}</option>`).join('')}
            </select>
          </div>
          <div><label class="fl">Date enlèvement</label><input class="fi" type="date" name="enlev" value="${esc(d.enlev || '')}"></div>
          <div><label class="fl">Statut</label>
            <select class="fi" name="s">
              ${DECHET_STATUTS.map((s) => `<option${d.s === s ? ' selected' : ''}>${esc(s)}</option>`).join('')}
            </select>
          </div>
          <div style="display:flex;align-items:center;gap:8px;padding-top:18px">
            <input type="checkbox" id="dec-stockok" name="stockOk" value="1" ${d.stockOk ? 'checked' : ''} style="width:16px;height:16px">
            <label for="dec-stockok" class="fl" style="margin:0">Stockage conforme</label>
          </div>
        </div>
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:18px;padding-top:14px;border-top:1px solid #f1f5f9">
          <button type="button" data-dec-modal-close class="btn">Annuler</button>
          <button type="submit" class="btn bp" style="background:${ENV_GREEN};border-color:${ENV_GREEN}">${isNew ? '+ Enregistrer' : '✓ Sauvegarder'}</button>
        </div>
      </form>
    </div>
  </div>`;
}

function openModal(dechet) {
  document.getElementById('dec-modal-root')?.remove();
  const root = document.createElement('div');
  root.id = 'dec-modal-root';
  root.innerHTML = buildModal(dechet);
  document.body.appendChild(root);
}

function closeModal() {
  document.getElementById('dec-modal-root')?.remove();
}

function refreshDechets() {
  const rows = filtered();
  const el = document.querySelector('[data-page="env-dechets"]');
  if (!el) return;
  el.innerHTML = `${buildKpiStrip()}${buildFilterBar(rows)}${buildTable(rows)}`;
}

export function renderEnvDechets() {
  seedEnvDechets();
  if (!bound) { bindEnvDechets(); bound = true; }
  const rows = filtered();
  return `<div class="env-page" data-page="env-dechets">
    ${buildKpiStrip()}
    ${buildFilterBar(rows)}
    ${buildTable(rows)}
  </div>`;
}

function bindEnvDechets() {
  document.addEventListener('input', (e) => {
    const fi = e.target.closest('[data-dec-filter="q"]');
    if (fi && fi.closest('[data-page="env-dechets"]')) {
      setFilter('q', fi.value);
      refreshDechets();
    }
  });

  document.addEventListener('change', (e) => {
    const fi = e.target.closest('[data-dec-filter]');
    if (fi && fi.closest('[data-page="env-dechets"]')) {
      setFilter(fi.dataset.decFilter, fi.value);
      refreshDechets();
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-dec-clear-filter]')) {
      window._decFilter = {};
      refreshDechets();
      return;
    }
    const clearQ = e.target.closest('[data-dec-clear-q]');
    if (clearQ && clearQ.closest('[data-page="env-dechets"]')) {
      setFilter('q', '');
      refreshDechets();
      return;
    }
    if (e.target.closest('[data-dec-new]')) {
      openModal(null);
      return;
    }
    const editBtn = e.target.closest('[data-dec-edit]');
    if (editBtn) {
      const id = editBtn.dataset.decEdit;
      const d = getDechets().find((x) => x.id === id);
      if (d) openModal(d);
      return;
    }
    const delBtn = e.target.closest('[data-dec-delete]');
    if (delBtn) {
      const id = delBtn.dataset.decDelete;
      if (confirm(`Supprimer le déchet ${id} ?`)) {
        deleteDechet(id);
        refreshDechets();
      }
      return;
    }
    if (e.target.closest('[data-dec-modal-close]')) {
      closeModal();
      return;
    }
    if (e.target.id === 'dec-modal-overlay') {
      closeModal();
      return;
    }
  });

  document.addEventListener('submit', (e) => {
    const form = e.target.closest('[data-dec-form]');
    if (!form) return;
    e.preventDefault();
    const fd = new FormData(form);
    const item = {
      d: fd.get('d'),
      type: fd.get('type'),
      desc: fd.get('desc'),
      qte: parseFloat(fd.get('qte')) || 0,
      unite: fd.get('unite'),
      zone: fd.get('zone'),
      presta: fd.get('presta') || '',
      enlev: fd.get('enlev') || null,
      s: fd.get('s'),
      stockOk: !!fd.get('stockOk'),
    };
    const existingId = fd.get('id');
    if (existingId) {
      updateDechet(existingId, item);
    } else {
      addDechet(item);
    }
    closeModal();
    refreshDechets();
  });
}
