/**
 * Helpers — module Contexte & Stratégie.
 */
import {
  renderXmDynamicSelect,
  bindXmDynamicSelect,
  readXmDynamicSelect,
} from '../../core/dynamic-lists.js';

export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

export function cstToast(msg, color = '#2563eb') {
  if (window.xmToast) window.xmToast(msg, '', 'check-circle', color);
  else if (typeof window.toast === 'function') window.toast(msg);
  else console.log('[CST]', msg);
}

export function cstRefresh(pageId) {
  if (window.reloadPage) window.reloadPage(pageId);
  else if (window.goPage) window.goPage(pageId);
}

export function cstField(id, label, val = '', type = 'text', opts = {}) {
  const v = esc(val);
  if (type === 'textarea') {
    return `<div class="fg full"><label class="fl" for="${esc(id)}">${label}</label><textarea class="fi" id="${esc(id)}" rows="${opts.rows || 3}">${v}</textarea></div>`;
  }
  if (type === 'select') {
    const optsHtml = (opts.options || [])
      .map((o) => {
        const valOpt = typeof o === 'string' ? o : o.v;
        const lbl = typeof o === 'string' ? o : o.l || o.v;
        return `<option value="${esc(valOpt)}"${String(val) === String(valOpt) ? ' selected' : ''}>${esc(lbl)}</option>`;
      })
      .join('');
    return `<div class="fg${opts.full ? ' full' : ''}"><label class="fl" for="${esc(id)}">${label}</label><select class="fi" id="${esc(id)}">${optsHtml}</select></div>`;
  }
  const extra = type === 'number' ? ` type="number" min="${opts.min ?? 0}" max="${opts.max ?? 100}"` : type === 'date' ? ' type="date"' : '';
  return `<div class="fg${opts.full ? ' full' : ''}"><label class="fl" for="${esc(id)}">${label}</label><input class="fi" id="${esc(id)}"${extra} value="${v}"></div>`;
}

export function cstG(fieldA, fieldB) {
  return `<div class="cst-field-grid">${fieldA}${fieldB}</div>`;
}

export function cstSec(n, title) {
  return `<div class="cst-sec"><span class="cst-sec-num">${n}</span><span class="cst-sec-title">${title}</span></div>`;
}

/**
 * Modal CST — gradient header 620px, overlay, data-cst-* triggers.
 * saveAttrs / deleteAttrs : objet { entity, id?, ... } sérialisé en data-* sur les boutons.
 */
export function cstModal(title, subtitle, colFrom, colTo, bodyHtml, saveAttrs = {}, deleteAttrs = null) {
  const saveData = Object.entries(saveAttrs)
    .map(([k, v]) => ` data-cst-${k}="${esc(v)}"`)
    .join('');
  const delBtn = deleteAttrs
    ? `<button type="button" class="btn bsm" style="color:var(--red)" data-cst-delete${Object.entries(deleteAttrs)
        .map(([k, v]) => ` data-cst-${k}="${esc(v)}"`)
        .join('')}>Supprimer</button>`
    : '<span></span>';
  return `<div id="cst_modal_overlay" class="xm-modal-overlay cst-modal-overlay" data-cst-modal>
    <div class="xm-modal-card cst-modal-card" style="max-width:620px">
      <div class="cst-modal-gradient" style="background:linear-gradient(135deg,${colFrom},${colTo})">
        <div class="cst-modal-head">
          <div><div class="cst-modal-title">${esc(title)}</div><div class="cst-modal-sub">${esc(subtitle)}</div></div>
          <button type="button" class="btn bsm cst-modal-close-btn" data-cst-modal-close>✕</button>
        </div>
      </div>
      <div class="cst-modal-body">${bodyHtml}</div>
      <div class="cst-modal-foot">
        ${delBtn}
        <div style="display:flex;gap:8px">
          <button type="button" class="btn bsm" data-cst-modal-close>Annuler</button>
          <button type="button" class="btn bsm bp" data-cst-save${saveData}>Enregistrer</button>
        </div>
      </div>
    </div>
  </div>`;
}

export function closeCstModal() {
  document.getElementById('cst_modal_overlay')?.remove();
}

export function influenceBadge(influence) {
  const m = { Élevé: 'br', Moyen: 'by', Faible: 'bg3' };
  return `<span class="badge ${m[influence] || 'bb'}">${esc(influence)}</span>`;
}

export function riskLevelBadge(niv) {
  const m = { Élevé: 'br', Moyen: 'by', Faible: 'bg3' };
  return `<span class="badge ${m[niv] || 'bb'}">${esc(niv)}</span>`;
}

export function cstStatutBadge(statut) {
  const m = {
    Actif: 'br',
    'En cours': 'bb',
    Maîtrisé: 'bg3',
    Clos: 'bg3',
    Suivi: 'by',
    Réalisé: 'bg3',
    Validé: 'bg3',
    Planifié: 'by',
    Annulé: 'br',
    'En retard': 'br',
    'À faire': 'by',
    Clôturée: 'bg3',
    Terminée: 'bg3',
    'En révision': 'by',
    Approuvé: 'bg3',
    Archivé: 'bb',
    Obsolète: 'br',
    Brouillon: 'by',
  };
  return `<span class="badge ${m[statut] || 'bb'}">${esc(statut)}</span>`;
}

export function objEtatBadge(etat) {
  const m = { 'En cours': 'bb', 'À faire': 'by', Atteint: 'bg3', 'En retard': 'br' };
  return `<span class="badge ${m[etat] || 'bb'}">${esc(etat)}</span>`;
}

export function prioriteBadge(p) {
  const colors = { Élevée: '#dc2626', Moyenne: '#f59e0b', Basse: '#16a34a' };
  const c = colors[p] || '#64748b';
  return `<span class="badge" style="background:${c}18;color:${c};border:1px solid ${c}40">${esc(p)}</span>`;
}

export function progBar(prog, opts = {}) {
  const p = Math.min(100, Math.max(0, +prog || 0));
  let col = '#2563eb';
  if (opts.enRetard) col = '#dc2626';
  else if (p >= 80) col = '#16a34a';
  else if (p < 50) col = '#f59e0b';
  return `<div class="cst-prog-wrap"><div class="cst-prog-track"><div class="cst-prog-fill" style="width:${p}%;background:${col}"></div></div><span class="cst-prog-pct">${p}%</span></div>`;
}

export function starsHtml(sat) {
  const n = Math.min(5, Math.max(0, +sat || 0));
  return Array.from({ length: 5 }, (_, i) => `<span class="cst-star" style="color:${i < n ? '#f59e0b' : '#e2e8f0'}">★</span>`).join('');
}

export function impactDisplay(impact) {
  if (impact === '+') return '<span class="cst-impact cst-impact--up">↑</span>';
  if (impact === '~') return '<span class="cst-impact cst-impact--mid">→</span>';
  return '<span class="cst-impact cst-impact--down">↓</span>';
}

export function scoreColor(n) {
  const v = +n;
  if (v >= 4) return '#dc2626';
  if (v >= 3) return '#f59e0b';
  return '#16a34a';
}

export function docTypeBadge(type) {
  const colors = {
    Procédure: '#2563eb',
    Politique: '#16a34a',
    Manuel: '#16a34a',
    Instruction: '#7c3aed',
    Enregistrement: '#f59e0b',
    Plan: '#64748b',
    Formulaire: '#64748b',
  };
  const c = colors[type] || '#64748b';
  return `<span class="badge" style="background:${c}18;color:${c};border:1px solid ${c}35">${esc(type)}</span>`;
}

export const PESTEL_DEFAULTS = {
  Politique: { ic: '🏛', col: '#2563eb' },
  Économique: { ic: '💰', col: '#16a34a' },
  Social: { ic: '👥', col: '#f59e0b' },
  Technologique: { ic: '⚙', col: '#7c3aed' },
  Environnemental: { ic: '🌿', col: '#16a34a' },
  Légal: { ic: '⚖', col: '#dc2626' },
};

export const DOCS_TAB_TYPES = [
  ['Procédure'],
  ['Politique', 'Manuel'],
  ['Instruction'],
  ['Enregistrement'],
  ['Plan', 'Formulaire'],
];

/** Criticité = Gravité × Occurrence */
export function calcCriticite(gravite, occurrence) {
  return (+gravite || 0) * (+occurrence || 0);
}

export function calcRiskNivFromCriticite(criticite) {
  const s = +criticite || 0;
  if (s >= 15) return 'Élevé';
  if (s >= 8) return 'Moyen';
  return 'Faible';
}

export function parseCstDate(str) {
  if (!str) return null;
  const p = String(str).split(/[/.-]/);
  if (p.length < 3) return null;
  const d = parseInt(p[0], 10);
  const m = parseInt(p[1], 10) - 1;
  let y = parseInt(p[2], 10);
  if (y < 100) y += 2000;
  const dt = new Date(y, m, d);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

export function cstIsNew(item) {
  if (!item) return false;
  const now = new Date();
  const year = now.getFullYear();
  if (item.createdAt) {
    const d = parseCstDate(item.createdAt);
    if (d && d.getFullYear() === year) return true;
  }
  if (item.dateMaj || item.dateMiseAJour) {
    const d = parseCstDate(item.dateMaj || item.dateMiseAJour);
    if (d && d.getFullYear() === year) return true;
  }
  return false;
}

export function cstNewBadge(item, label = 'NEW') {
  if (!cstIsNew(item)) return '';
  return `<span class="cst-new-badge" title="Ajouté ou mis à jour cette année">${esc(label)}</span>`;
}

export function cstYearBadge(item) {
  if (!cstIsNew(item)) return '';
  return `<span class="cst-year-badge" title="Élément récent">Cette année</span>`;
}

export function cstToolbarActions(exportId) {
  return `<div class="cst-toolbar-actions">
    <input type="search" class="fi cst-search-input" placeholder="Rechercher…" data-cst-search="${esc(exportId)}" value="${esc(window[`cst_${exportId}Q`] || '')}">
    <button type="button" class="btn bsm" data-cst-export-csv="${esc(exportId)}">Excel</button>
    <button type="button" class="btn bsm" data-cst-export-pdf="${esc(exportId)}">PDF</button>
  </div>`;
}

/**
 * Select dynamique (listKey = ex. cst.swot.processus) ou liste inline legacy.
 */
export function cstCreatableSelect(id, label, value, optionsOrKey, placeholder = 'Sélectionner…') {
  if (
    typeof optionsOrKey === 'string' &&
    (optionsOrKey.includes('.') || optionsOrKey.startsWith('cst') || optionsOrKey.startsWith('global'))
  ) {
    return `<div class="fg full">${renderXmDynamicSelect({ id, listKey: optionsOrKey, label, selected: value || '' })}</div>`;
  }
  const opts = (optionsOrKey || [])
    .map((o) => `<option value="${esc(o)}"${value === o ? ' selected' : ''}>${esc(o)}</option>`)
    .join('');
  return `<div class="fg full">
    <label class="fl" for="${esc(id)}">${label}</label>
    <select class="fi" id="${esc(id)}">${opts}<option value="__new__">+ Créer…</option></select>
    <input class="fi cst-creatable-new" id="${esc(id)}_new" placeholder="${esc(placeholder)}" style="display:none;margin-top:6px">
  </div>`;
}

export function readCreatableSelect(id) {
  const field = document.getElementById(id)?.closest('.xm-dyn-field');
  const listKey = field?.dataset?.listKey;
  if (listKey) return readXmDynamicSelect(id, listKey);
  const sel = document.getElementById(id);
  if (!sel) return '';
  if (sel.value === '__new__') {
    return document.getElementById(`${id}_new`)?.value?.trim() || '';
  }
  return sel.value;
}

export function bindCreatableSelect(id) {
  const field = document.getElementById(id)?.closest('.xm-dyn-field');
  if (field?.dataset?.listKey) {
    bindXmDynamicSelect(id);
    return;
  }
  setTimeout(() => {
    const sel = document.getElementById(id);
    const inp = document.getElementById(`${id}_new`);
    if (!sel || !inp) return;
    const toggle = () => {
      const isNew = sel.value === '__new__';
      inp.style.display = isNew ? 'block' : 'none';
      if (!isNew) inp.value = '';
    };
    sel.addEventListener('change', toggle);
    toggle();
  }, 50);
}
