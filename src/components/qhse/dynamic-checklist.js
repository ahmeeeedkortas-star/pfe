/**
 * Checklists SST dynamiques — CL_DATA, scoring, persistance session, génération NC.
 */
import { SEC_CHECKLIST_CONFIGS, SEC_CHECKLIST_PAGES } from '../../data/sec-checklist-configs.js';
import { renderChecklistHeaderIcon } from '../icons/checklist-icons.js';
import { renderRepBtnContent } from '../icons/ui-helpers.js';
import { renderIcon } from '../icons/icon-render.js';
import { renderSecChecklistNav } from './sec-checklist-nav.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function todayFr() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

const CL_STORAGE_KEY = 'xm_cl_data';

function loadCLFromStorage() {
  if (window.__clStoreLoaded) return;
  try {
    const raw = localStorage.getItem(CL_STORAGE_KEY);
    if (raw) window.CL_DATA = JSON.parse(raw);
  } catch {
    /* ignore */
  }
  if (!window.CL_DATA) window.CL_DATA = {};
  window.__clStoreLoaded = true;
}

export function persistCLStore() {
  try {
    localStorage.setItem(CL_STORAGE_KEY, JSON.stringify(window.CL_DATA || {}));
  } catch {
    /* ignore */
  }
}

function ensureCLData() {
  loadCLFromStorage();
  if (!window.CL_DATA) window.CL_DATA = {};
  return window.CL_DATA;
}

function seedCustomInfo(meta) {
  if (meta.customInfo?.length) {
    return meta.customInfo.map((row) => ({
      label: String(row.label ?? ''),
      value: String(row.value ?? ''),
    }));
  }
  if (meta.infoFields?.length) {
    return meta.infoFields.map(([label, value]) => ({
      label: String(label ?? ''),
      value: String(value ?? ''),
    }));
  }
  return [];
}

const CL_FIELD_NAMES = [
  'inspecteur', 'dateInsp', 'lieuInsp', 'responsable', 'frequence', 'version',
  'reference', 'zone', 'effectif', 'materiel', 'entreprise', 'remarques',
];

/** @param {string} key @param {object[]} defaultItems @param {Record<string, unknown>} [meta] */
export function initCL(key, defaultItems, meta = {}) {
  const store = ensureCLData();
  if (!store[key]) {
    store[key] = {
      items: defaultItems.map((it) => ({
        n: it.n,
        label: it.label,
        rep: it.rep ?? null,
        obs: it.obs ?? '',
        critical: !!it.critical,
      })),
      inspecteur: String(meta.inspecteur || ''),
      dateInsp: String(meta.dateInsp || todayFr()),
      lieuInsp: String(meta.lieuInsp || ''),
      responsable: String(meta.responsable || ''),
      frequence: String(meta.frequence || ''),
      version: String(meta.version || ''),
      reference: String(meta.reference || meta.code || ''),
      zone: String(meta.zone || ''),
      effectif: String(meta.effectif || ''),
      materiel: String(meta.materiel || ''),
      entreprise: String(meta.entreprise || 'XPERT-MECA'),
      remarques: String(meta.remarques || ''),
      obsGlobal: '',
      statut: 'brouillon',
      savedAt: null,
      infoEdit: false,
      customInfo: seedCustomInfo(meta),
      title: meta.title,
      icon: meta.icon,
      code: meta.code,
      subtitle: meta.subtitle,
      gradient: meta.gradient,
      isCustom: !!meta.isCustom,
      isInstance: !!meta.isInstance,
      templateKey: meta.templateKey || null,
      instanceLabel: meta.instanceLabel || '',
      infoFieldsLocked: !!meta.infoFieldsLocked,
      createdAt: meta.createdAt || null,
    };
  } else if (!store[key].items?.length) {
    store[key].items = defaultItems.map((it) => ({
      n: it.n,
      label: it.label,
      rep: it.rep ?? null,
      obs: it.obs ?? '',
      critical: !!it.critical,
    }));
  }
  if (!store[key].customInfo?.length && meta.infoFields?.length) {
    store[key].customInfo = seedCustomInfo(meta);
    persistCLStore();
  }
  return store[key];
}

export function clScore(key) {
  const data = ensureCLData()[key];
  const items = data?.items || [];
  let oui = 0;
  let non = 0;
  let na = 0;
  for (const it of items) {
    if (it.rep === 'oui') oui++;
    else if (it.rep === 'non') non++;
    else if (it.rep === 'na') na++;
  }
  const scored = oui + non;
  const pct = scored > 0 ? Math.round((oui / scored) * 100) : 0;
  return { oui, non, na, total: items.length, pct };
}

export function clSyncFieldsFromDom(key) {
  const data = ensureCLData()[key];
  if (!data) return;
  for (const f of CL_FIELD_NAMES) {
    const el = document.getElementById(`cl-${f}-${key}`);
    if (el) data[f] = el.value;
  }
  data.obsGlobal = document.getElementById(`cl-obs-${key}`)?.value ?? data.obsGlobal;
  clSyncCustomInfoFromDom(key);
}

export function clSyncCustomInfoFromDom(key) {
  const data = ensureCLData()[key];
  if (!data) return;
  const root = document.getElementById(`cl-app-${key}`);
  if (!root) return;
  const rows = [];
  root.querySelectorAll('[data-cl-custom-row]').forEach((row, i) => {
    const label =
      row.querySelector('[data-cl-custom-label]')?.value?.trim() ??
      row.querySelector('.cl-info-locked-label')?.textContent?.trim() ??
      data.customInfo?.[i]?.label ??
      '';
    const value = row.querySelector('[data-cl-custom-value]')?.value?.trim() ?? '';
    if (label || value) rows.push({ label, value });
  });
  if (rows.length) {
    data.customInfo = rows;
    if (data.isInstance && data.templateKey) {
      const cfg = SEC_CHECKLIST_CONFIGS[data.templateKey];
      const nameField = cfg?.instanceNameField;
      const nameRow = rows.find((r) => r.label === nameField);
      if (nameRow?.value) {
        data.instanceLabel = nameRow.value;
        const base = cfg?.title || data.title;
        data.title = `${base} — ${nameRow.value}`;
      }
    }
  }
}

export function clAddCustomInfoRow(key, page) {
  const data = ensureCLData()[key];
  if (!data) return;
  data.customInfo = data.customInfo || [];
  data.customInfo.push({ label: '', value: '' });
  data.infoEdit = true;
  const cfg = window.__clCfg?.(key, page);
  if (cfg && clRefreshInfoPanel(key, page, cfg)) return;
  if (typeof window.refreshSecChecklist === 'function') window.refreshSecChecklist(page);
}

export function clAddChecklistItem(key, page) {
  const data = ensureCLData()[key];
  if (!data) return;
  const maxN = data.items.reduce((m, it) => Math.max(m, it.n), 0);
  data.items.push({ n: maxN + 1, label: 'Nouveau point de contrôle', rep: null, obs: '', critical: false });
  persistCLStore();
  if (typeof window.refreshSecChecklist === 'function') window.refreshSecChecklist(page);
  else if (typeof window.goPage === 'function') window.goPage(page);
}

export function clRemoveCustomInfoRow(key, page, index) {
  const data = ensureCLData()[key];
  if (!data?.customInfo) return;
  data.customInfo.splice(index, 1);
  data.infoEdit = true;
  const cfg = window.__clCfg?.(key, page);
  if (cfg && clRefreshInfoPanel(key, page, cfg)) return;
  if (typeof window.refreshSecChecklist === 'function') window.refreshSecChecklist(page);
}

export function clSyncItemLabelsFromDom(key) {
  const data = ensureCLData()[key];
  if (!data) return;
  const root = document.getElementById(`cl-app-${key}`);
  if (!root) return;
  root.querySelectorAll('[data-cl-item-label]').forEach((inp) => {
    const n = Number(inp.dataset.clN);
    const it = data.items.find((x) => x.n === n);
    if (it) it.label = inp.value;
  });
}

export function clField(key, fieldName, value) {
  const data = ensureCLData()[key];
  if (data && fieldName in data) data[fieldName] = value;
}

export function clRefreshInfoPanel(key, page, cfg) {
  const root = document.getElementById(`cl-app-${key}`);
  const data = ensureCLData()[key];
  if (!root || !data || !cfg) return false;
  const infoRoot = root.querySelector('[data-cl-info-root]');
  if (!infoRoot) return false;
  infoRoot.innerHTML = renderInfoSection(key, page, cfg, data);
  return true;
}

export function clToggleEdit(key, page) {
  const data = ensureCLData()[key];
  if (!data) return;
  clSyncFieldsFromDom(key);
  data.infoEdit = !data.infoEdit;
  const cfg = window.__clCfg?.(key, page);
  if (cfg && clRefreshInfoPanel(key, page, cfg)) return;
  if (typeof window.refreshSecChecklist === 'function') window.refreshSecChecklist(page);
  else if (typeof window.goPage === 'function') window.goPage(page);
}

export function clSaveInfo(key, page) {
  clSyncFieldsFromDom(key);
  clSyncItemLabelsFromDom(key);
  const data = ensureCLData()[key];
  if (data) data.infoEdit = false;
  persistCLStore();
  const toast = window.xmToast;
  if (toast) toast('Informations enregistrées', '', '💾', '#2563eb');
  const cfg = window.__clCfg?.(key, page);
  if (cfg && clRefreshInfoPanel(key, page, cfg)) return;
  if (typeof window.refreshSecChecklist === 'function') window.refreshSecChecklist(page);
  else if (typeof window.goPage === 'function') window.goPage(page);
}

const REP_STYLES = {
  oui: { bg: '#dcfce7', border: 'var(--green)', color: 'var(--green)' },
  non: { bg: '#fee2e2', border: 'var(--red)', color: 'var(--red)' },
  na: { bg: '#f1f5f9', border: '#94a3b8', color: '#64748b' },
};

function rowVisual(rep) {
  if (rep === 'oui') return { bg: '#f0fdf4', state: renderIcon('check-circle', { size: 18, stroke: 2.2 }) };
  if (rep === 'non') return { bg: '#fef2f2', state: renderIcon('x-circle', { size: 18, stroke: 2.2 }) };
  if (rep === 'na') return { bg: '#f8fafc', state: renderIcon('minus', { size: 18, stroke: 2.2 }) };
  return { bg: '', state: '' };
}

function globalResultLabel(score) {
  if (score.non > 0) {
    return {
      label: `<span class="xm-section-title">${renderIcon('x-circle', { size: 16 })} Non-conforme</span>`,
      bg: '#fef2f2',
      border: '#fecaca',
    };
  }
  if (score.pct >= 90) {
    return {
      label: `<span class="xm-section-title">${renderIcon('check-circle', { size: 16 })} Conforme</span>`,
      bg: '#f0fdf4',
      border: '#bbf7d0',
    };
  }
  if (score.pct >= 70) {
    return {
      label: `<span class="xm-section-title">${renderIcon('alert', { size: 16 })} Observation</span>`,
      bg: '#fff7ed',
      border: '#fed7aa',
    };
  }
  return {
    label: `<span class="xm-section-title">${renderIcon('x-circle', { size: 16 })} Non-conforme</span>`,
    bg: '#fef2f2',
    border: '#fecaca',
  };
}

function progressColor(pct) {
  if (pct >= 90) return 'var(--green)';
  if (pct >= 70) return 'var(--orange)';
  return 'var(--red)';
}

function scoreQualityLabel(score) {
  if (score.non > 0 && score.pct < 100) {
    return { text: score.pct >= 70 ? 'À améliorer' : 'Non-conforme', color: score.pct >= 70 ? '#ea580c' : '#dc2626' };
  }
  if (score.pct >= 90) return { text: 'Excellent', color: '#16a34a' };
  if (score.pct >= 70) return { text: 'À améliorer', color: '#ea580c' };
  return { text: 'Non-conforme', color: '#dc2626' };
}

function donutSvg(pct, color, sublabel = 'Conformité') {
  const r = 42;
  const c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  return `<svg width="130" height="130" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="${r}" fill="none" stroke="#e5e7eb" stroke-width="10"/>
    <circle cx="60" cy="60" r="${r}" fill="none" stroke="${color}" stroke-width="10"
      stroke-dasharray="${c}" stroke-dashoffset="${off}" transform="rotate(-90 60 60)" stroke-linecap="round"/>
    <text x="60" y="54" text-anchor="middle" font-size="20" font-weight="800" fill="#0f172a" font-family="Inter,sans-serif">${pct}%</text>
    <text x="60" y="70" text-anchor="middle" font-size="9" fill="#64748b" font-family="Inter,sans-serif">${esc(sublabel)}</text>
  </svg>`;
}

function setRepBtnVisual(btn, active) {
  const val = btn.dataset.clVal;
  const s = REP_STYLES[val];
  if (!s) return;
  btn.style.background = active ? s.bg : '#f8fafc';
  btn.style.borderColor = active ? s.border : '#e5e7eb';
  btn.style.color = active ? s.color : 'var(--muted)';
  btn.setAttribute('aria-pressed', active ? 'true' : 'false');
}

function renderNcPanelHtml(nonList) {
  if (!nonList.length) {
    return '<div class="sec-cl-nc-ok">Aucune NC détectée</div>';
  }
  return nonList
    .map(
      (it) =>
        `<div class="sec-cl-nc-item">
        <div><strong>#${it.n}</strong> ${esc(it.label)}${it.critical ? ' <span class="sec-cl-critique">CRITIQUE</span>' : ''}</div>
        ${it.obs ? `<div class="sec-cl-nc-obs">${esc(it.obs)}</div>` : ''}
      </div>`
    )
    .join('');
}

/** Met à jour une ligne sans recharger la page. */
export function clPaintRow(key, n) {
  const data = ensureCLData()[key];
  const it = data?.items?.find((x) => x.n === n);
  const tr = document.querySelector(`#cl-app-${key} [data-cl-n="${n}"]`);
  if (!it || !tr) return;

  const { bg, state } = rowVisual(it.rep);
  tr.style.background = bg;
  const stateEl = tr.querySelector('[data-cl-state]');
  if (stateEl) stateEl.innerHTML = state;

  tr.querySelectorAll('[data-cl-rep]').forEach((btn) => {
    setRepBtnVisual(btn, it.rep === btn.dataset.clVal);
  });
}

let clPainting = false;

/** Met à jour scores, barre, panneau droit, boutons. */
export function clPaintSummary(key, page) {
  const root = document.getElementById(`cl-app-${key}`);
  if (!root || clPainting) return;
  clPainting = true;

  const score = clScore(key);
  const gr = globalResultLabel(score);
  const barColor = progressColor(score.pct);
  const data = ensureCLData()[key];

  const setText = (sel, text) => {
    root.querySelectorAll(sel).forEach((el) => {
      el.textContent = text;
    });
  };

  setText('[data-cl-pct]', `${score.pct}%`);
  setText('[data-cl-oui-total]', `${score.oui}/${score.total}`);
  setText('[data-cl-nc-count]', String(score.non));
  setText('[data-cl-badge-oui]', `${score.oui} OK`);
  setText('[data-cl-badge-non]', `${score.non} NC`);
  setText('[data-cl-badge-na]', `${score.na} N/A`);
  const pending = score.total - score.oui - score.non - score.na;
  setText('[data-cl-badge-pending]', pending > 0 ? `${pending} à remplir` : '');
  root.querySelectorAll('[data-cl-badge-pending]').forEach((el) => {
    el.style.display = pending > 0 ? '' : 'none';
  });
  setText('[data-cl-side-oui]', String(score.oui));
  setText('[data-cl-side-non]', String(score.non));
  setText('[data-cl-side-na]', String(score.na));

  root.querySelectorAll('[data-cl-progress]').forEach((bar) => {
    bar.style.width = `${score.pct}%`;
    bar.style.background = barColor;
  });

  const grEl = root.querySelector('[data-cl-global-result]');
  if (grEl) {
    grEl.innerHTML = gr.label;
    grEl.style.background = gr.bg;
    grEl.style.borderColor = gr.border;
  }

  const ql = scoreQualityLabel(score);
  setText('[data-cl-score-label]', ql.text);
  root.querySelectorAll('[data-cl-score-label]').forEach((el) => {
    el.style.color = ql.color;
  });
  setText('[data-cl-global-pct]', `${score.pct}%`);

  const donut = root.querySelector('[data-cl-donut]');
  if (donut) donut.innerHTML = donutSvg(score.pct, barColor, ql.text);

  const ncPanel = root.querySelector('[data-cl-nc-panel]');
  if (ncPanel) {
    const nonList = (data.items || []).filter((it) => it.rep === 'non');
    ncPanel.innerHTML = renderNcPanelHtml(nonList);
  }

  const genBtn = root.querySelector('[data-cl-gen-nc]');
  if (genBtn) {
    genBtn.style.display = score.non > 0 ? '' : 'none';
    if (score.non > 0) {
      genBtn.innerHTML = `${renderIcon('alert', { size: 16 })} Générer NC (${score.non})`;
    }
  }

  clPainting = false;
}

export function clRefreshUI(key, page) {
  const data = ensureCLData()[key];
  if (!data) return;
  data.items.forEach((it) => clPaintRow(key, it.n));
  clPaintSummary(key, page);
}

export function clSetRep(key, n, val, page) {
  const data = ensureCLData()[key];
  const it = data?.items?.find((x) => x.n === n);
  if (!it) return;

  clSyncFieldsFromDom(key);
  it.rep = it.rep === val ? null : val;
  persistCLStore();

  const root = document.getElementById(`cl-app-${key}`);
  if (root) {
    clPaintRow(key, n);
    clPaintSummary(key, page);
    return;
  }

  if (typeof window.refreshSecChecklist === 'function') {
    window.refreshSecChecklist(page);
  } else if (typeof window.goPage === 'function') {
    window.goPage(page);
  }
}

export function clSetObs(key, n, val) {
  const it = ensureCLData()[key]?.items?.find((x) => x.n === n);
  if (it) {
    it.obs = val;
    persistCLStore();
  }
}

function nextNcId() {
  const rows = window.NC_DATA || [];
  let max = 0;
  for (const r of rows) {
    const m = /^NC-(\d+)$/i.exec(r.n || '');
    if (m) max = Math.max(max, parseInt(m[1], 10));
  }
  return `NC-${String(max + 1).padStart(3, '0')}`;
}

export function clSave(key, page, statusVal) {
  clSyncFieldsFromDom(key);
  const data = ensureCLData()[key];
  data.statut = statusVal;
  data.savedAt = new Date().toISOString();
  clSyncItemLabelsFromDom(key);
  persistCLStore();
  const toast = window.xmToast;
  const confetti = window.confettiBurst;
  if (statusVal === 'validé') {
    const btn = document.querySelector(`[data-cl-save][data-cl-status="validé"]`);
    const r = btn?.getBoundingClientRect();
    if (r && confetti) confetti(r.left + r.width / 2, r.top + r.height / 2);
    if (toast) toast('Checklist validée', todayFr(), '✅', '#16a34a');
    else alert(`Checklist validée — ${todayFr()}`);
  } else if (toast) {
    toast('Brouillon enregistré', todayFr(), '💾', '#2563eb');
  } else {
    alert(`Brouillon enregistré — ${todayFr()}`);
  }
  const root = document.getElementById(`cl-app-${key}`);
  if (root) clPaintSummary(key, page);
  else if (typeof window.goPage === 'function') window.goPage(page);
}

export function clGenNC(key, page) {
  clSyncFieldsFromDom(key);
  const data = ensureCLData()[key];
  if (!window.NC_DATA) window.NC_DATA = [];
  const nonItems = (data.items || []).filter((it) => it.rep === 'non');
  if (!nonItems.length) {
    if (window.xmToast) window.xmToast('Aucune NC à créer', 'Aucun point NON', 'ℹ️', '#6b7a99');
    else alert('Aucun point non conforme à déclarer.');
    return;
  }
  for (const it of nonItems) {
    const desc = [it.label, it.obs].filter(Boolean).join(' — ');
    window.NC_DATA.unshift({
      n: nextNcId(),
      d: todayFr(),
      p: 'Checklist SST',
      dep: 'Sécurité',
      poste: page,
      g: it.critical ? 'Critique' : 'Majeure',
      s: 'Ouvert',
      r: data.inspecteur || 'HSE',
      dl: '3j',
      desc,
      prog: 0,
    });
  }
  if (window.xmToast) {
    window.xmToast(`${nonItems.length} NC créée(s)`, 'Module Non-Conformités', '⚠️', '#dc2626');
  } else {
    alert(`${nonItems.length} NC créée(s) depuis la checklist.`);
  }
  if (typeof window.goPage === 'function') window.goPage('nc-liste');
}

function repBtnHtml(clKey, page, n, val) {
  return `<button type="button" class="xm-cl-rep-btn" data-cl-rep data-cl-key="${clKey}" data-cl-n="${n}" data-cl-val="${val}" data-cl-page="${page}"
    title="${val.toUpperCase()}" aria-pressed="false">${renderRepBtnContent(val)}</button>`;
}

/**
 * @param {string} clKey
 * @param {string} page
 * @param {import('../../data/sec-checklist-configs.js').SEC_CHECKLIST_CONFIGS[key]} cfg
 */
function infoCard(label, value) {
  return `<div class="cl-info-card">
    <div class="cl-info-label">${esc(label)}</div>
    <div class="cl-info-value">${esc(value)}</div>
  </div>`;
}

function renderCustomInfoEditRows(clKey, page, data) {
  const rows = data.customInfo?.length ? data.customInfo : [{ label: '', value: '' }];
  const locked = !!data.infoFieldsLocked;
  return rows
    .map((row, i) => {
      if (locked) {
        return `<div class="cl-info-custom-row cl-info-custom-row--locked" data-cl-custom-row data-cl-custom-i="${i}">
          <span class="cl-info-locked-label">${esc(row.label)}</span>
          <input class="fi" data-cl-custom-value value="${esc(row.value)}" placeholder="Saisir…">
        </div>`;
      }
      return `<div class="cl-info-custom-row" data-cl-custom-row data-cl-custom-i="${i}">
        <input class="fi" data-cl-custom-label value="${esc(row.label)}" placeholder="Libellé (ex. Employé)">
        <input class="fi" data-cl-custom-value value="${esc(row.value)}" placeholder="Valeur">
        <button type="button" class="btn bsm br" data-cl-custom-rm data-cl-key="${clKey}" data-cl-page="${page}" data-cl-custom-i="${i}" title="Supprimer">✕</button>
      </div>`;
    })
    .join('');
}

function renderInfoSection(clKey, page, cfg, data) {
  if (data.infoEdit) {
    const fields = [
      ['inspecteur', 'Inspecteur', data.inspecteur],
      ['dateInsp', 'Date inspection', data.dateInsp],
      ['lieuInsp', 'Lieu', data.lieuInsp],
      ['responsable', 'Responsable', data.responsable],
      ['frequence', 'Fréquence', data.frequence],
      ['version', 'Version', data.version],
      ['reference', 'Référence', data.reference],
      ['zone', 'Zone', data.zone],
      ['effectif', 'Effectif', data.effectif],
      ['materiel', 'Matériel', data.materiel],
      ['entreprise', 'Entreprise', data.entreprise],
    ];
    const locked = !!data.infoFieldsLocked;
    return `<div class="cl-info-edit-grid">
      <div class="cl-info-section-title">${locked ? 'Informations équipement (libellés figés)' : 'Informations terrain (saisie libre)'}</div>
      <div class="cl-info-custom-list">${renderCustomInfoEditRows(clKey, page, data)}</div>
      ${locked ? '' : `<button type="button" class="btn bsm" data-cl-info-add data-cl-key="${clKey}" data-cl-page="${page}">+ Ajouter une information</button>`}
      ${locked ? '' : `<div class="cl-info-section-title" style="margin-top:10px">Compléments inspection</div>`}
      ${locked
        ? ''
        : fields
            .map(
              ([f, label, val]) =>
                `<div class="cl-info-field"><label class="fl">${label}</label>
            <input id="cl-${f}-${clKey}" class="fi" value="${esc(val)}"
              data-cl-field data-cl-key="${clKey}" data-cl-field-name="${f}"></div>`
            )
            .join('')}
      <div class="cl-info-actions">
        <button type="button" class="btn bp" data-cl-save-info data-cl-key="${clKey}" data-cl-page="${page}">Enregistrer</button>
        <button type="button" class="btn" data-cl-toggle-edit data-cl-key="${clKey}" data-cl-page="${page}">Annuler</button>
      </div>
    </div>`;
  }

  const customCards = (data.customInfo || [])
    .filter((row) => row.label || row.value)
    .map((row) => infoCard(row.label, row.value))
    .join('');

  const filled = [
    ['Responsable', data.responsable || 'HSE'],
    ['Fréquence', data.frequence || 'Mensuelle'],
    ['Version', data.version || 'V1'],
    ['Référence', data.reference || data.code || ''],
    ['Entreprise', data.entreprise || 'XPERT-MECA'],
    ['Zone', data.zone],
    ['Effectif', data.effectif],
    ['Matériel', data.materiel],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => infoCard(k, v))
    .join('');

  const cards = `${customCards}${filled}`;
  const grouped =
    cards ||
    `<div class="cl-info-empty">Aucune information — cliquez sur Modifier pour saisir les données à la main.</div>`;

  return `<div class="cl-info-panel">
    <div class="cl-info-grid">${grouped}</div>
    <div class="sec-cl-fields-row">
      <div><div class="sec-cl-field-lbl">${renderIcon('users', { size: 14 })} Inspecteur</div>
        <input id="cl-inspecteur-${clKey}" class="fi" value="${esc(data.inspecteur)}" placeholder="Nom de l'inspecteur"
          data-cl-field data-cl-key="${clKey}" data-cl-field-name="inspecteur"></div>
      <div><div class="sec-cl-field-lbl">${renderIcon('calendar', { size: 14 })} Date inspection</div>
        <input id="cl-dateInsp-${clKey}" class="fi" value="${esc(data.dateInsp)}" data-cl-field data-cl-key="${clKey}" data-cl-field-name="dateInsp"></div>
      <div><div class="sec-cl-field-lbl">${renderIcon('map-pin', { size: 14 })} Lieu / Zone</div>
        <input id="cl-lieuInsp-${clKey}" class="fi" value="${esc(data.lieuInsp)}" placeholder="Atelier, zone…"
          data-cl-field data-cl-key="${clKey}" data-cl-field-name="lieuInsp"></div>
    </div>
  </div>`;
}

function buildChecklistRows(clKey, page, data) {
  return data.items
    .map((it) => {
      const { bg, state } = rowVisual(it.rep);
      const num = String(it.n).padStart(2, '0');
      const labelCell = data.infoEdit
        ? `<input class="fi sec-cl-row-obs" style="font-weight:500" value="${esc(it.label)}"
            data-cl-item-label data-cl-key="${clKey}" data-cl-n="${it.n}">`
        : `<div class="sec-cl-row-label">${esc(it.label)}${it.critical ? '<span class="sec-cl-critique">CRITIQUE</span>' : ''}</div>`;
      return `<div class="sec-cl-row" data-cl-n="${it.n}" style="background:${bg || '#fff'}">
        <span class="sec-cl-row-num">${num}</span>
        <div>${labelCell}</div>
        <div class="sec-cl-row-reps">
          ${repBtnHtml(clKey, page, it.n, 'oui')}
          ${repBtnHtml(clKey, page, it.n, 'non')}
          ${repBtnHtml(clKey, page, it.n, 'na')}
        </div>
        <input class="fi sec-cl-row-obs" value="${esc(it.obs)}" placeholder="Observation…"
          data-cl-obs data-cl-key="${clKey}" data-cl-n="${it.n}">
        <div class="sec-cl-row-state" data-cl-state>${state}</div>
      </div>`;
    })
    .join('');
}

export function renderDynChecklist(clKey, page, cfg, navOpts = {}) {
  const backPage = navOpts.backPage || 'sec-checklists';
  const backLabel = navOpts.backLabel || '← Retour';
  const formPageId = navOpts.formPage || page;
  const data = initCL(clKey, cfg.items, {
    title: cfg.title,
    icon: cfg.icon,
    code: cfg.code,
    subtitle: cfg.subtitle,
    gradient: cfg.gradient,
    reference: cfg.code,
    responsable: 'HSE',
    frequence: cfg.subtitle?.split('·')[1]?.trim() || 'Mensuelle',
    version: cfg.subtitle?.match(/V\d+/)?.[0] || 'V1',
    entreprise: 'XPERT-MECA',
    infoFields: cfg.infoFields,
  });
  const score = clScore(clKey);
  const gr = globalResultLabel(score);
  const barColor = progressColor(score.pct);
  const ql = scoreQualityLabel(score);
  const pending = score.total - score.oui - score.non - score.na;
  const nav = renderSecChecklistNav(formPageId);
  const rows = buildChecklistRows(clKey, page, data);
  const nonList = data.items.filter((it) => it.rep === 'non');
  const ncBlock = renderNcPanelHtml(nonList);
  const infoBlock = renderInfoSection(clKey, page, cfg, data);
  const displayTitle = data.title || cfg.title;
  const freqLabel = data.frequence || cfg.subtitle?.split('·')[1]?.trim() || 'Mensuelle';
  const draftBadge =
    data.statut === 'validé'
      ? '<span class="sec-cl-draft-badge" style="background:#dcfce7;color:#166534;border-color:#bbf7d0">validé</span>'
      : '<span class="sec-cl-draft-badge">brouillon</span>';

  const templateKey =
    data.templateKey ||
    (SEC_CHECKLIST_PAGES[page] && !String(SEC_CHECKLIST_PAGES[page]).startsWith('__')
      ? SEC_CHECKLIST_PAGES[page]
      : null) ||
    (SEC_CHECKLIST_CONFIGS[clKey] ? clKey : null);
  const equipBtn =
    templateKey && SEC_CHECKLIST_CONFIGS[templateKey]?.multiInstance
      ? `<button type="button" class="btn bsm" data-nav="sec-cl-${templateKey}-equip">${renderIcon('building', { size: 14 })} Équipements enregistrés</button>`
      : '';

  return `
<div class="sec-cl-page" id="cl-app-${clKey}" data-cl-page="${page}">
  ${nav}
  <header class="sec-cl-page-head">
    <h1>${esc(displayTitle)} — ${esc(cfg.code)}</h1>
    <p>Formulaire de remplissage · Inspection ${esc(freqLabel.toLowerCase())}</p>
  </header>
  <div class="sec-cl-hero" style="background:${cfg.gradient}">
    <span class="sec-cl-hero-icon">${renderChecklistHeaderIcon(clKey, 28)}</span>
    <div class="sec-cl-hero-text">
      <div class="sec-cl-hero-title">${esc(displayTitle)} — ${esc(cfg.code)}</div>
      <div class="sec-cl-hero-sub">${esc(cfg.subtitle)}</div>
    </div>
    <div class="sec-cl-hero-kpis">
      <div class="sec-cl-hero-kpi"><div class="sec-cl-hero-kpi-val" data-cl-pct>${score.pct}%</div><div class="sec-cl-hero-kpi-lbl">Score</div></div>
      <div class="sec-cl-hero-kpi"><div class="sec-cl-hero-kpi-val" data-cl-oui-total>${score.oui}/${score.total}</div><div class="sec-cl-hero-kpi-lbl">OK</div></div>
      <div class="sec-cl-hero-kpi sec-cl-hero-kpi--nc"><div class="sec-cl-hero-kpi-val" data-cl-nc-count>${score.non}</div><div class="sec-cl-hero-kpi-lbl">NC</div></div>
    </div>
  </div>
  <div class="sec-cl-main">
    <div class="sec-cl-col-left">
      <section class="sec-cl-card">
        <div class="sec-cl-card-head">
          <h2 class="sec-cl-card-title">${renderIcon('clipboard', { size: 18 })} Informations générales</h2>
          ${draftBadge}
          <button type="button" class="btn bsm" data-cl-toggle-edit data-cl-key="${clKey}" data-cl-page="${page}">${renderIcon('file', { size: 14 })} Modifier</button>
        </div>
        <div data-cl-info-root>${infoBlock}</div>
      </section>
      <section class="sec-cl-card">
        <div class="sec-cl-points-head">
          <h2 class="sec-cl-card-title">${renderIcon('check-circle', { size: 18 })} Points de contrôle</h2>
          <div class="sec-cl-badges">
            <span class="badge bg3" data-cl-badge-oui>${score.oui} OK</span>
            <span class="badge br" data-cl-badge-non>${score.non} NC</span>
            <span class="badge bgr" data-cl-badge-na>${score.na} N/A</span>
            <span class="badge" style="background:#fef9c3;color:#a16207" data-cl-badge-pending>${pending > 0 ? `${pending} à remplir` : ''}</span>
          </div>
        </div>
        <div class="sec-cl-progress"><div data-cl-progress style="width:${score.pct}%;background:${barColor}"></div></div>
        <div class="sec-cl-rows" id="cl-tbody-${clKey}">${rows}</div>
        <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
          ${data.infoFieldsLocked ? '' : `<button type="button" class="btn bsm" data-cl-add-item data-cl-key="${clKey}" data-cl-page="${page}">+ Point de contrôle</button>`}
        </div>
        <div class="sec-cl-footer-grid">
          <div>
            <div style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:8px">Résultat global</div>
            <div class="sec-cl-global-box" data-cl-global-result style="background:${gr.bg};border-color:${gr.border}">
              <div class="sec-cl-global-pct" data-cl-global-pct>${score.pct}%</div>
              <div data-cl-global-result-inner>${gr.label}</div>
              <div class="sec-cl-global-detail">${score.oui} OK · ${score.non} NC · ${score.na} N/A · ${pending} non renseigné${pending !== 1 ? 's' : ''}</div>
            </div>
          </div>
          <div>
            <div style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:8px">Observation générale</div>
            <textarea id="cl-obs-${clKey}" class="fi" rows="3" placeholder="Observations générales…">${esc(data.obsGlobal)}</textarea>
          </div>
        </div>
        <div class="sec-cl-actions" data-cl-actions>
          <button type="button" class="btn" data-nav="${esc(backPage)}">${esc(backLabel)}</button>
          ${equipBtn}
          <button type="button" class="btn" data-cl-save data-cl-key="${clKey}" data-cl-page="${page}" data-cl-status="brouillon">${renderIcon('save', { size: 16 })} Sauvegarder</button>
          <button type="button" class="btn" data-cl-gen-nc data-cl-key="${clKey}" data-cl-page="${page}"
            style="background:#fef2f2;color:var(--red);border-color:#fecaca;${score.non > 0 ? '' : 'display:none'}">${renderIcon('alert', { size: 16 })} Générer NC (${score.non})</button>
          <button type="button" class="btn bp" data-cl-save data-cl-key="${clKey}" data-cl-page="${page}" data-cl-status="validé">${renderIcon('check-circle', { size: 16 })} Valider &amp; Enregistrer</button>
        </div>
      </section>
    </div>
    <aside class="sec-cl-col-right">
      <div class="sec-cl-side-card">
        <h3 class="sec-cl-side-title">${renderIcon('chart', { size: 16 })} Score de conformité</h3>
        <div class="sec-cl-donut-wrap" data-cl-donut>${donutSvg(score.pct, barColor, ql.text)}</div>
        <div class="sec-cl-donut-label" data-cl-score-label style="color:${ql.color}">${ql.text}</div>
        <div class="sec-cl-side-counts">
          <span><b data-cl-side-oui style="color:#16a34a">${score.oui}</b> OK</span>
          <span><b data-cl-side-non style="color:#dc2626">${score.non}</b> NC</span>
          <span><b data-cl-side-na style="color:#94a3b8">${score.na}</b> N/A</span>
        </div>
      </div>
      <div class="sec-cl-side-card" style="text-align:left">
        <h3 class="sec-cl-side-title">${renderIcon('alert', { size: 16 })} Points non-conformes</h3>
        <div class="sec-cl-nc-list" data-cl-nc-panel>${ncBlock}</div>
      </div>
      <div class="sec-cl-side-card" style="text-align:left">
        <h3 class="sec-cl-side-title">${renderIcon('file', { size: 16 })} Photo / Document</h3>
        <div class="sec-cl-photo-zone" data-cl-photo>
          ${renderChecklistHeaderIcon(clKey, 32)}
          <p><strong>Ajouter une photo</strong><br>JPG, PNG, PDF acceptés</p>
        </div>
      </div>
    </aside>
  </div>
</div>`;
}

export function bindChecklistDelegation(contentEl) {
  if (!contentEl || contentEl.dataset.clBound) return;
  contentEl.dataset.clBound = '1';

  contentEl.addEventListener('click', (e) => {
    const rep = e.target.closest('[data-cl-rep]');
    if (rep) {
      e.preventDefault();
      clSetRep(rep.dataset.clKey, Number(rep.dataset.clN), rep.dataset.clVal, rep.dataset.clPage);
      return;
    }

    const save = e.target.closest('[data-cl-save]');
    if (save) {
      e.preventDefault();
      clSave(save.dataset.clKey, save.dataset.clPage, save.dataset.clStatus);
      return;
    }

    const gen = e.target.closest('[data-cl-gen-nc]');
    if (gen) {
      e.preventDefault();
      clGenNC(gen.dataset.clKey, gen.dataset.clPage);
      return;
    }

    const edit = e.target.closest('[data-cl-toggle-edit]');
    if (edit) {
      e.preventDefault();
      clToggleEdit(edit.dataset.clKey, edit.dataset.clPage);
      return;
    }

    const saveInfo = e.target.closest('[data-cl-save-info]');
    if (saveInfo) {
      e.preventDefault();
      clSaveInfo(saveInfo.dataset.clKey, saveInfo.dataset.clPage);
      return;
    }

    const infoAdd = e.target.closest('[data-cl-info-add]');
    if (infoAdd) {
      e.preventDefault();
      clSyncCustomInfoFromDom(infoAdd.dataset.clKey);
      clAddCustomInfoRow(infoAdd.dataset.clKey, infoAdd.dataset.clPage);
      return;
    }

    const infoRm = e.target.closest('[data-cl-custom-rm]');
    if (infoRm) {
      e.preventDefault();
      clSyncCustomInfoFromDom(infoRm.dataset.clKey);
      clRemoveCustomInfoRow(infoRm.dataset.clKey, infoRm.dataset.clPage, Number(infoRm.dataset.clCustomI));
      return;
    }

    const addItem = e.target.closest('[data-cl-add-item]');
    if (addItem) {
      e.preventDefault();
      clAddChecklistItem(addItem.dataset.clKey, addItem.dataset.clPage);
      return;
    }

    const photo = e.target.closest('[data-cl-photo]');
    if (photo) {
      e.preventDefault();
      if (window.xmToast) window.xmToast('Photo', 'À connecter au stockage', '📷', '#2563eb');
      else alert('Ajout photo — à connecter au stockage');
    }
  });

  contentEl.addEventListener('input', (e) => {
    const obs = e.target.closest('[data-cl-obs]');
    if (obs) clSetObs(obs.dataset.clKey, Number(obs.dataset.clN), obs.value);
    const fld = e.target.closest('[data-cl-field]');
    if (fld) clField(fld.dataset.clKey, fld.dataset.clFieldName, fld.value);
  });

  contentEl.addEventListener('change', (e) => {
    const fld = e.target.closest('[data-cl-field]');
    if (fld) clField(fld.dataset.clKey, fld.dataset.clFieldName, fld.value);
  });
}

/** Applique l'état visuel initial des boutons après injection HTML. */
export function clInitView(key, page) {
  const data = ensureCLData()[key];
  if (!data) return;
  data.items.forEach((it) => clPaintRow(key, it.n));
  clPaintSummary(key, page);
}

let newClModalItems = [];

export function openNewCLModal() {
  newClModalItems = [{ label: '' }];
  document.getElementById('cl-new-modal')?.remove();
  const o = document.createElement('div');
  o.id = 'cl-new-modal';
  o.style.cssText =
    'position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9999;display:flex;align-items:center;justify-content:center;font-family:var(--font)';
  const renderItems = () =>
    newClModalItems
      .map(
        (it, i) =>
          `<div style="display:flex;gap:6px;margin-bottom:6px"><input class="fi" data-cl-new-item="${i}" value="${esc(it.label)}" placeholder="Point de contrôle" style="flex:1">
        <button type="button" class="btn bsm" data-cl-new-rm="${i}">✕</button></div>`
      )
      .join('');
  o.innerHTML = `<div style="background:#fff;border-radius:12px;width:480px;max-width:96vw;padding:18px">
    <motion-div style="font-weight:700;margin-bottom:12px">+ Nouvelle checklist personnalisée</motion-div>
    <div style="display:grid;gap:8px;margin-bottom:10px">
      <input id="cl-new-title" class="fi" placeholder="Titre">
      <input id="cl-new-code" class="fi" placeholder="Code (ex. CH-CUSTOM-001)">
    </motion-div>
    <div id="cl-new-items">${renderItems()}</div>
    <button type="button" class="btn bsm" data-cl-new-add style="margin:8px 0">+ Ligne</button>
    <div style="display:flex;gap:8px;justify-content:flex-end">
      <button type="button" class="btn" data-cl-new-cancel>Annuler</button>
      <button type="button" class="btn bp" data-cl-new-save>Créer</button>
    </motion-div>
  </div>`.replace(/<\/?motion-div>/gi, (m) => (m.startsWith('</') ? '</div>' : '<div'));
  document.body.appendChild(o);
  const sync = () => {
    o.querySelectorAll('[data-cl-new-item]').forEach((inp) => {
      const i = Number(inp.dataset.clNewItem);
      newClModalItems[i].label = inp.value;
    });
  };
  o.addEventListener('click', (e) => {
    if (e.target.closest('[data-cl-new-cancel]') || e.target === o) o.remove();
    if (e.target.closest('[data-cl-new-add]')) {
      sync();
      newClModalItems.push({ label: '' });
      o.querySelector('#cl-new-items').innerHTML = renderItems();
    }
    const rm = e.target.closest('[data-cl-new-rm]');
    if (rm) {
      sync();
      newClModalItems.splice(Number(rm.dataset.clNewRm), 1);
      o.querySelector('#cl-new-items').innerHTML = renderItems();
    }
    if (e.target.closest('[data-cl-new-save]')) {
      sync();
      saveNewCL();
      o.remove();
    }
  });
}

export function addNCLItem() {
  newClModalItems.push({ label: '' });
}

export function saveNewCL() {
  const title = document.getElementById('cl-new-title')?.value?.trim();
  const code = document.getElementById('cl-new-code')?.value?.trim() || 'CH-CUSTOM';
  if (!title) {
    window.xmToast?.('Titre requis', '', '⚠️', '#ea580c');
    return;
  }
  const key = 'custom_' + Date.now();
  const items = newClModalItems
    .filter((it) => it.label.trim())
    .map((it, i) => ({ n: i + 1, label: it.label.trim(), rep: null, obs: '', critical: false }));
  if (!items.length) {
    window.xmToast?.('Ajoutez au moins un point', '', '⚠️', '#ea580c');
    return;
  }
  initCL(key, items, {
    title,
    code,
    icon: '📋',
    subtitle: 'Checklist personnalisée',
    gradient: 'linear-gradient(135deg,#1e40af,#2563eb)',
    isCustom: true,
  });
  window.currentCustomCL = key;
  persistCLStore();
  window.xmToast?.('Checklist créée', code, '✅', '#16a34a');
  if (typeof window.goPage === 'function') window.goPage('sec-checklists');
}

export function deleteCL(key) {
  if (!window.CL_DATA?.[key]?.isCustom) return;
  if (!confirm('Supprimer cette checklist personnalisée ?')) return;
  delete window.CL_DATA[key];
  persistCLStore();
  window.xmToast?.('Checklist supprimée', '', '🗑', '#6b7a99');
  if (typeof window.goPage === 'function') window.goPage('sec-checklists');
}

export function installChecklistHelpers() {
  if (!window.CL_DATA) window.CL_DATA = {};
  window.renderChecklistNav = renderSecChecklistNav;
  Object.assign(window, {
    initCL,
    clScore,
    clSetRep,
    clSetObs,
    clField,
    clToggleEdit,
    clSaveInfo,
    clSave,
    clGenNC,
    clPaintRow,
    clPaintSummary,
    clRefreshUI,
    clInitView,
    renderDynChecklist,
    openNewCLModal,
    addNCLItem,
    saveNewCL,
    deleteCL,
  });
}
