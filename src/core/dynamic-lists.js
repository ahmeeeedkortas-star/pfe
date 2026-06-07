/**
 * Listes dynamiques QHSE — création / modification / suppression inline, persistance locale.
 */
import { DYNAMIC_LIST_REGISTRY } from './dynamic-lists-registry.js';

export { DYNAMIC_LIST_REGISTRY };

const STORAGE_PREFIX = 'qhse_dl_';

function escAttr(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

function escHtml(s) {
  return escAttr(s);
}

function loadStored(key) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String) : null;
  } catch {
    return null;
  }
}

function saveStored(key, items) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(items));
  } catch {
    /* quota */
  }
}

function syncWindowKey(key, items) {
  const cfg = DYNAMIC_LIST_REGISTRY[key];
  if (!cfg?.windowKey) return;
  window[cfg.windowKey] = [...items];
}

/* ── Syncs métier ── */

export function syncAuditAuditorsList(names) {
  const cols = ['#2563eb', '#16a34a', '#7c3aed', '#0891b2', '#dc2626', '#ea580c'];
  const prev = window.AUDIT_AUDITEURS || [];
  window.AUDIT_AUDITEURS = names.map((nom, i) => {
    const found = prev.find((a) => a.nom === nom);
    if (found) return found;
    return {
      id: `AUDR-${String(i + 1).padStart(3, '0')}`,
      nom,
      poste: 'Auditeur',
      dep: '—',
      qualif: [],
      audits: 0,
      tauxConf: 0,
      col: cols[i % cols.length],
    };
  });
}

export function syncFivesZonesList(names) {
  const prev = window.SS5_ZONES || [];
  window.SS5_ZONES = names.map((zone, i) => {
    const found = prev.find((z) => z.zone === zone);
    if (found) return found;
    return {
      id: `Z${String(i + 1).padStart(2, '0')}`,
      zone,
      resp: '—',
      S: 0,
      T: 0,
      N: 0,
      S4: 0,
      S5: 0,
    };
  });
}

export function syncFivesRespsList(names) {
  const prev = window.SS5_RESPS || [];
  window.SS5_RESPS = names.map((nom, i) => {
    const found = prev.find((r) => r.nom === nom);
    if (found) return found;
    return { id: `R${i + 1}`, nom, zones: 0, audits: 0 };
  });
}

function seedAuditorsFromWindow() {
  const fromData = (window.AUDIT_AUDITEURS || []).map((a) => a.nom).filter(Boolean);
  const stored = loadStored('audit.auditors');
  const merged = [...new Set([...(stored || []), ...fromData])];
  if (merged.length) {
    saveStored('audit.auditors', merged);
    syncAuditAuditorsList(merged);
  }
  return merged;
}

function seedFivesZones() {
  const fromData = (window.SS5_ZONES || []).map((z) => z.zone).filter(Boolean);
  const stored = loadStored('fives.zones');
  const merged = [...new Set([...(stored || []), ...fromData])];
  if (merged.length) {
    saveStored('fives.zones', merged);
    syncFivesZonesList(merged);
  }
  return merged;
}

function seedFivesResps() {
  const fromData = (window.SS5_RESPS || []).map((r) => r.nom).filter(Boolean);
  const stored = loadStored('fives.responsibles');
  const merged = [...new Set([...(stored || []), ...fromData])];
  if (merged.length) {
    saveStored('fives.responsibles', merged);
    syncFivesRespsList(merged);
  }
  return merged;
}

async function loadCustomList(key) {
  switch (key) {
    case 'auditAuditors': {
      const stored = loadStored('audit.auditors');
      if (stored?.length) {
        syncAuditAuditorsList(stored);
        return stored;
      }
      const seeded = seedAuditorsFromWindow();
      return seeded.length ? seeded : [...DYNAMIC_LIST_REGISTRY['audit.auditors'].defaults];
    }
    case 'fivesZones': {
      const stored = loadStored('fives.zones');
      if (stored?.length) {
        syncFivesZonesList(stored);
        return stored;
      }
      const seeded = seedFivesZones();
      return seeded.length ? seeded : [...DYNAMIC_LIST_REGISTRY['fives.zones'].defaults];
    }
    case 'fivesResps': {
      const stored = loadStored('fives.responsibles');
      if (stored?.length) {
        syncFivesRespsList(stored);
        return stored;
      }
      const seeded = seedFivesResps();
      return seeded.length ? seeded : [...DYNAMIC_LIST_REGISTRY['fives.responsibles'].defaults];
    }
    case 'ncProjects': {
      const { getNcProjets } = await import('../data/nc-projets.store.js');
      return getNcProjets();
    }
    case 'rcProjects': {
      const { getRcProjets } = await import('../data/rc-projets.store.js');
      return getRcProjets();
    }
    case 'rcClients': {
      const { getRcClients } = await import('../data/rc-clients.store.js');
      return getRcClients();
    }
    case 'cstSwotProc': {
      const { getCstSwotMeta } = await import('../data/cst.data.js');
      const meta = getCstSwotMeta();
      window.__cstSwotMetaCache = meta;
      return [...(meta.processus || [])];
    }
    case 'cstSwotCat': {
      const { getCstSwotMeta } = await import('../data/cst.data.js');
      const meta = getCstSwotMeta();
      window.__cstSwotMetaCache = meta;
      return [...(meta.categories || [])];
    }
    default:
      return [];
  }
}

function applyCustomSet(key, items) {
  const clean = [...new Set(items.map((s) => String(s).trim()).filter(Boolean))];
  saveStored(key, clean);
  const cfg = DYNAMIC_LIST_REGISTRY[key];
  if (!cfg?.custom) return clean;

  switch (cfg.custom) {
    case 'auditAuditors':
      syncAuditAuditorsList(clean);
      break;
    case 'fivesZones':
      syncFivesZonesList(clean);
      break;
    case 'fivesResps':
      syncFivesRespsList(clean);
      break;
    case 'ncProjects':
      import('../data/nc-projets.store.js').then((m) => {
        try {
          localStorage.setItem('xm_nc_projets', JSON.stringify(clean));
          window.dispatchEvent(new CustomEvent('nc-projets-updated'));
        } catch {
          /* ignore */
        }
      });
      break;
    case 'rcProjects':
      import('../data/rc-projets.store.js').then(() => {
        try {
          localStorage.setItem('xm_rc_projets', JSON.stringify(clean));
          window.dispatchEvent(new CustomEvent('rc-projets-updated'));
        } catch {
          /* ignore */
        }
      });
      break;
    case 'rcClients':
      import('../data/rc-clients.store.js').then(() => {
        try {
          localStorage.setItem('xm_rc_clients', JSON.stringify(clean));
          window.dispatchEvent(new CustomEvent('rc-clients-updated'));
        } catch {
          /* ignore */
        }
      });
      break;
    case 'cstSwotProc':
    case 'cstSwotCat':
      import('../data/cst.data.js').then((m) => {
        const meta = m.getCstSwotMeta();
        if (cfg.custom === 'cstSwotProc') meta.processus = clean;
        else meta.categories = clean;
      });
      break;
    default:
      break;
  }
  return clean;
}

/**
 * @param {string} key
 * @returns {string[]}
 */
function getCustomListSync(key) {
  const cfg = DYNAMIC_LIST_REGISTRY[key];
  if (!cfg?.custom) return [];
  switch (cfg.custom) {
    case 'auditAuditors':
      return seedAuditorsFromWindow();
    case 'fivesZones':
      return seedFivesZones();
    case 'fivesResps':
      return seedFivesResps();
    case 'ncProjects':
      try {
        const raw = localStorage.getItem('xm_nc_projets');
        return raw ? JSON.parse(raw) : [];
      } catch {
        return [];
      }
    case 'rcProjects':
      try {
        const raw = localStorage.getItem('xm_rc_projets');
        return raw ? JSON.parse(raw) : [];
      } catch {
        return [];
      }
    case 'rcClients':
      try {
        const raw = localStorage.getItem('xm_rc_clients');
        return raw ? JSON.parse(raw) : [];
      } catch {
        return [];
      }
  }
  if (cfg.custom === 'cstSwotProc' || cfg.custom === 'cstSwotCat') {
    return window.__cstSwotMetaCache?.[cfg.custom === 'cstSwotProc' ? 'processus' : 'categories'] || [];
  }
  return [];
}

export function getDynamicList(key) {
  const cfg = DYNAMIC_LIST_REGISTRY[key];
  if (!cfg) return [];

  if (cfg.custom) {
    const stored = loadStored(key);
    if (stored?.length) {
      applyCustomSet(key, stored);
      return stored;
    }
    const synced = getCustomListSync(key);
    if (synced.length) {
      applyCustomSet(key, synced);
      return synced;
    }
    return [...cfg.defaults];
  }

  const stored = loadStored(key);
  if (stored?.length) {
    syncWindowKey(key, stored);
    return stored;
  }

  const fromWin = cfg.windowKey && window[cfg.windowKey]?.length ? [...window[cfg.windowKey]] : null;
  const list = fromWin?.length ? fromWin : [...cfg.defaults];
  saveStored(key, list);
  syncWindowKey(key, list);
  return list;
}

/** Précharge les listes custom async (à appeler au boot). */
export async function preloadCustomDynamicLists() {
  const customKeys = Object.entries(DYNAMIC_LIST_REGISTRY)
    .filter(([, c]) => c.custom)
    .map(([k]) => k);
  for (const key of customKeys) {
    const items = await loadCustomList(DYNAMIC_LIST_REGISTRY[key].custom);
    if (items.length) {
      const stored = loadStored(key);
      const merged = [...new Set([...items, ...(stored || [])])];
      applyCustomSet(key, merged);
    }
  }
}

/**
 * @param {string} key
 * @param {string[]} items
 */
export function setDynamicList(key, items) {
  const clean = [...new Set(items.map((s) => String(s).trim()).filter(Boolean))];
  if (DYNAMIC_LIST_REGISTRY[key]?.custom) return applyCustomSet(key, clean);
  saveStored(key, clean);
  syncWindowKey(key, clean);
  return clean;
}

export function addDynamicItem(key, value) {
  const v = String(value || '').trim();
  if (!v) return getDynamicList(key);
  const list = getDynamicList(key);
  if (!list.includes(v)) list.push(v);
  return setDynamicList(key, list);
}

export function updateDynamicItem(key, index, value) {
  const list = getDynamicList(key);
  const v = String(value || '').trim();
  if (index < 0 || index >= list.length || !v) return list;
  list[index] = v;
  return setDynamicList(key, list);
}

export function removeDynamicItem(key, index) {
  const list = getDynamicList(key);
  if (index < 0 || index >= list.length) return list;
  if (!confirm(`Retirer « ${list[index]} » de la liste ?`)) return list;
  list.splice(index, 1);
  return setDynamicList(key, list);
}

/**
 * @param {{ id: string, listKey: string, label: string, selected?: string, required?: boolean, emptyOption?: string }} opts
 */
export function renderXmDynamicSelect(opts) {
  const { id, listKey, label, selected = '', required = false, emptyOption = '' } = opts;
  const items = getDynamicList(listKey);
  const empty = emptyOption
    ? `<option value=""${!selected ? ' selected' : ''}>${escHtml(emptyOption)}</option>`
    : '';
  const optsHtml = items
    .map((item) => `<option value="${escAttr(item)}"${item === selected ? ' selected' : ''}>${escHtml(item)}</option>`)
    .join('');
  const req = required ? ' <span style="color:#dc2626">*</span>' : '';
  return `<div class="xm-dyn-field" data-list-key="${escAttr(listKey)}">
    <label class="fl" for="${escAttr(id)}">${escHtml(label)}${req}</label>
    <div class="xm-dyn-row">
      <select id="${escAttr(id)}" class="fi xm-dyn-select"${required ? ' required' : ''}>
        ${empty}${optsHtml}
        <option value="__new__">+ Ajouter…</option>
      </select>
      <button type="button" class="btn bsm xm-dyn-manage" data-list-key="${escAttr(listKey)}" data-select-id="${escAttr(id)}" title="Gérer la liste">⚙</button>
    </div>
    <input type="text" id="${escAttr(id)}_new" class="fi xm-dyn-new" placeholder="Saisir une nouvelle valeur…" style="display:none" autocomplete="off">
  </div>`;
}

/** Filtre barre avec liste dynamique */
export function renderXmDynamicFilterSelect(opts) {
  const { id, listKey, label, selected = 'Tous', allLabel = 'Tous' } = opts;
  const items = getDynamicList(listKey);
  const optsHtml = items
    .map((item) => `<option value="${escAttr(item)}"${item === selected ? ' selected' : ''}>${escHtml(item)}</option>`)
    .join('');
  return `<span class="xm-dyn-filter-wrap" data-list-key="${escAttr(listKey)}">
    <select id="${escAttr(id)}" class="filter-sel xm-dyn-filter" data-list-key="${escAttr(listKey)}">
      <option value="${escAttr(allLabel)}">${escHtml(label)} : ${escHtml(allLabel)}</option>
      ${optsHtml}
    </select>
    <button type="button" class="btn bsm xm-dyn-manage xm-dyn-manage--inline" data-list-key="${escAttr(listKey)}" data-select-id="${escAttr(id)}" title="Gérer">⚙</button>
  </span>`;
}

export function bindXmDynamicSelect(selectId) {
  setTimeout(() => {
    const sel = document.getElementById(selectId);
    const inp = document.getElementById(`${selectId}_new`);
    if (!sel || !inp) return;
    const toggle = () => {
      const isNew = sel.value === '__new__';
      inp.style.display = isNew ? 'block' : 'none';
      if (isNew) inp.focus();
      else inp.value = '';
    };
    sel.removeEventListener('change', sel._xmDynToggle);
    sel._xmDynToggle = toggle;
    sel.addEventListener('change', toggle);
    toggle();
  }, 30);
}

export function bindXmDynamicFields(ids) {
  ids.forEach((id) => bindXmDynamicSelect(id));
}

export function readXmDynamicSelect(selectId, listKey) {
  const sel = document.getElementById(selectId);
  if (!sel) return '';
  if (sel.value === '__new__') {
    const v = document.getElementById(`${selectId}_new`)?.value?.trim();
    if (!v) return '';
    addDynamicItem(listKey, v);
    return v;
  }
  return sel.value;
}

function refreshSelectOptions(selectId, listKey, selected) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  const items = getDynamicList(listKey);
  const cur = selected ?? sel.value;
  const hasEmpty = sel.querySelector('option[value=""]');
  const emptyOpt = hasEmpty ? '<option value=""></option>' : '';
  sel.innerHTML =
    emptyOpt +
    items.map((item) => `<option value="${escAttr(item)}">${escHtml(item)}</option>`).join('') +
    '<option value="__new__">+ Ajouter…</option>';
  if (items.includes(cur)) sel.value = cur;
  else if (cur && cur !== '__new__') {
    addDynamicItem(listKey, cur);
    sel.value = cur;
  } else if (items.length) sel.value = items[0];
  bindXmDynamicSelect(selectId);
}

export function openXmListManager(listKey, selectIdToRefresh) {
  const cfg = DYNAMIC_LIST_REGISTRY[listKey];
  const title = cfg?.label || 'Liste';
  let items = [...getDynamicList(listKey)];

  const rows = () =>
    items
      .map(
        (item, i) =>
          `<div class="xm-dyn-mgr-row" data-idx="${i}">
            <input class="fi xm-dyn-mgr-inp" value="${escAttr(item)}" data-idx="${i}">
            <button type="button" class="btn bsm" data-action="remove" data-idx="${i}" title="Supprimer">✕</button>
          </div>`
      )
      .join('');

  const body = `<p class="xm-dyn-mgr-hint">Ajoutez, modifiez ou supprimez les options. Les changements s'appliquent à tous les formulaires du module.</p>
    <div id="xm-dyn-mgr-list" class="xm-dyn-mgr-list">${rows()}</div>
    <div class="xm-dyn-mgr-add">
      <input id="xm-dyn-mgr-new" class="fi" placeholder="Nouvelle entrée…">
      <button type="button" class="btn bsm bp" id="xm-dyn-mgr-add-btn">+ Ajouter</button>
    </div>`;

  const overlay = document.createElement('div');
  overlay.id = 'xm-dyn-mgr-modal';
  overlay.className = 'xm-modal-overlay';
  overlay.innerHTML = `<div class="xm-modal xm-modal--sm">
    <div class="xm-modal__head"><span class="xm-modal__title">Gérer — ${escHtml(title)}</span>
      <button type="button" class="xm-modal__close" aria-label="Fermer">✕</button></div>
    <div class="xm-modal__body">${body}</div>
    <div class="xm-modal__foot">
      <button type="button" class="btn" data-action="close">Fermer</button>
      <button type="button" class="btn bp" data-action="save">Enregistrer</button>
    </div>
  </div>`;

  const listEl = () => overlay.querySelector('#xm-dyn-mgr-list');

  const rerender = () => {
    const el = listEl();
    if (el) el.innerHTML = rows();
    bindMgrRows();
  };

  const bindMgrRows = () => {
    overlay.querySelectorAll('[data-action="remove"]').forEach((btn) => {
      btn.onclick = () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        items = removeDynamicItem(listKey, idx);
        rerender();
      };
    });
    overlay.querySelectorAll('.xm-dyn-mgr-inp').forEach((inp) => {
      inp.onchange = () => {
        const idx = parseInt(inp.getAttribute('data-idx'), 10);
        items = updateDynamicItem(listKey, idx, inp.value);
        rerender();
      };
    });
  };

  overlay.querySelector('#xm-dyn-mgr-add-btn').onclick = () => {
    const v = overlay.querySelector('#xm-dyn-mgr-new')?.value?.trim();
    if (!v) return;
    items = addDynamicItem(listKey, v);
    overlay.querySelector('#xm-dyn-mgr-new').value = '';
    rerender();
  };

  overlay.querySelector('[data-action="save"]').onclick = () => {
    overlay.querySelectorAll('.xm-dyn-mgr-inp').forEach((inp, i) => {
      if (items[i] !== undefined) items[i] = inp.value.trim();
    });
    setDynamicList(listKey, items);
    overlay.remove();
    if (selectIdToRefresh) refreshSelectOptions(selectIdToRefresh, listKey);
    window.xmToast?.('Liste mise à jour', title, '✓', '#16a34a');
  };

  overlay.querySelector('[data-action="close"]').onclick = () => overlay.remove();
  overlay.querySelector('.xm-modal__close').onclick = () => overlay.remove();
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });

  document.body.appendChild(overlay);
  bindMgrRows();
  overlay.querySelector('#xm-dyn-mgr-new')?.focus();
}

/** Lie tous les champs dynamiques présents dans un conteneur (après rendu page). */
export function bindDynamicFieldsInContainer(root) {
  const el = root || document.getElementById('content');
  if (!el) return;
  el.querySelectorAll('.xm-dyn-select').forEach((sel) => {
    if (sel.id) bindXmDynamicSelect(sel.id);
  });
}

export function installDynamicLists() {
  Object.keys(DYNAMIC_LIST_REGISTRY).forEach((key) => {
    if (!DYNAMIC_LIST_REGISTRY[key].custom) getDynamicList(key);
  });
  preloadCustomDynamicLists();

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.xm-dyn-manage');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const listKey = btn.getAttribute('data-list-key');
    const selectId = btn.getAttribute('data-select-id');
    if (listKey) openXmListManager(listKey, selectId || undefined);
  });

  window.getDynamicList = getDynamicList;
  window.setDynamicList = setDynamicList;
  window.addDynamicItem = addDynamicItem;
  window.renderXmDynamicSelect = renderXmDynamicSelect;
  window.renderXmDynamicFilterSelect = renderXmDynamicFilterSelect;
  window.bindXmDynamicSelect = bindXmDynamicSelect;
  window.bindXmDynamicFields = bindXmDynamicFields;
  window.readXmDynamicSelect = readXmDynamicSelect;
  window.openXmListManager = openXmListManager;
  window.bindDynamicFieldsInContainer = bindDynamicFieldsInContainer;
}
