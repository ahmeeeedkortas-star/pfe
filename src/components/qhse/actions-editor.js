/**
 * Éditeur d'actions typées — workflows 8D / QRQC.
 */
import { getTypesBySet, getTypeMeta } from './action-types.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

function ensureActs(storeKey, seed = []) {
  const k = `${storeKey}_acts`;
  if (!window[k] || !Array.isArray(window[k])) {
    window[k] = seed.map((a) => ({ ...a }));
  }
  return window[k];
}

function resolveTypes(typeSet, allowedTypes) {
  const all = getTypesBySet(typeSet);
  if (!allowedTypes?.length) return all;
  return all.filter((t) => allowedTypes.includes(t.id));
}

let wfBound = false;

export function bindWorkflowActions() {
  if (wfBound) return;
  wfBound = true;

  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('[data-wf-add]');
    if (addBtn) {
      const key = addBtn.dataset.wfStore;
      const page = addBtn.dataset.wfPage;
      const list = ensureActs(key);
      const defaultType = addBtn.dataset.wfDefault || list[0]?.type || 'Corrective';
      list.push({
        id: Date.now(),
        action: '',
        type: defaultType,
        resp: '',
        delai: '',
        statut: 'À faire',
      });
      window.reloadPage?.(page) ?? window.goPage?.(page);
      return;
    }

    const delBtn = e.target.closest('[data-wf-del]');
    if (delBtn) {
      const key = delBtn.dataset.wfStore;
      const page = delBtn.dataset.wfPage;
      const idx = +delBtn.dataset.wfIdx;
      const list = window[`${key}_acts`];
      if (list && !Number.isNaN(idx)) list.splice(idx, 1);
      window.reloadPage?.(page) ?? window.goPage?.(page);
      return;
    }

    const syncBtn = e.target.closest('[data-wf-sync]');
    if (syncBtn) {
      syncWorkflowToRegistry(syncBtn.dataset.wfStore, syncBtn.dataset.wfTarget, syncBtn.dataset.wfRef);
      window.reloadPage?.(syncBtn.dataset.wfPage) ?? window.goPage?.(syncBtn.dataset.wfPage);
    }
  });

  document.addEventListener('change', (e) => {
    const sel = e.target.closest('[data-wf-type]');
    if (!sel) return;
    const key = sel.dataset.wfStore;
    const idx = +sel.dataset.wfIdx;
    const list = window[`${key}_acts`];
    if (list?.[idx]) list[idx].type = sel.value;
    window.reloadPage?.(sel.dataset.wfPage) ?? window.goPage?.(sel.dataset.wfPage);
  });
}

function syncWorkflowToRegistry(workflowKey, targetStore, ref) {
  const acts = window[`${workflowKey}_acts`] || [];
  const target = window[targetStore];
  if (!target) return;
  acts.forEach((a) => {
    if (!a.action?.trim()) return;
    const exists = target.some((t) => t.action === a.action && t.type === a.type);
    if (exists) return;
    const newId = Math.max(...target.map((x) => x.id), 0) + 1;
    target.unshift({
      id: newId,
      action: a.action.trim(),
      type: a.type,
      ref: ref || '—',
      resp: a.resp || '—',
      prio: 'Normale',
      fin: a.delai || '—',
      statut: 'À faire',
      prog: 0,
      desc: '',
    });
  });
  window.xmToast?.('Actions synchronisées', targetStore, 'check-circle', '#16a34a');
}

/**
 * @param {string} storeKey
 * @param {string} pageId
 * @param {{ title?: string, typeSet?: string, allowedTypes?: string[], defaultType?: string, optionalNote?: boolean, syncTarget?: string, syncRef?: string, seed?: object[] }} [opts]
 */
export function renderActionsEditor(storeKey, pageId, opts = {}) {
  const typeSet = opts.typeSet || 'qrqc';
  const types = resolveTypes(typeSet, opts.allowedTypes);
  const acts = ensureActs(storeKey, opts.seed || []);
  const title = opts.title || "Plan d'actions";
  const note = opts.optionalNote
    ? '<p class="wf-actions-note">Les actions correctives et préventives ne sont pas obligatoires (ISO 9001:2015 §10.2).</p>'
    : '';

  const rows = acts
    .map((a, i) => {
      const t = getTypeMeta(a.type);
      const typeOpts =
        types.length <= 1
          ? `<span class="wf-act-type-fixed">${esc(t.id)}</span>`
          : `<select class="fi wf-act-type-sel" data-wf-type data-wf-store="${esc(storeKey)}" data-wf-idx="${i}" data-wf-page="${esc(pageId)}">
          ${types.map((tp) => `<option value="${esc(tp.id)}"${tp.id === a.type ? ' selected' : ''}>${esc(tp.id)}</option>`).join('')}
        </select>`;
      return `
      <div class="wf-act-row" style="--wf-bg:${t.bg};--wf-border:${t.border}">
        <span class="wf-act-ic" title="${esc(t.norm)}">${t.icon}</span>
        <div class="wf-act-main">
          <input class="fi" value="${esc(a.action)}" placeholder="Description de l'action…"
            data-wf-input data-wf-store="${esc(storeKey)}" data-wf-idx="${i}">
          <div class="wf-act-meta">
            ${typeOpts}
            <input class="fi" value="${esc(a.resp)}" placeholder="Responsable"
              data-wf-resp data-wf-store="${esc(storeKey)}" data-wf-idx="${i}">
            <input class="fi" value="${esc(a.delai)}" placeholder="Échéance"
              data-wf-delai data-wf-store="${esc(storeKey)}" data-wf-idx="${i}">
          </div>
        </div>
        <button type="button" class="btn bsm wf-act-del" data-wf-del data-wf-store="${esc(storeKey)}" data-wf-page="${esc(pageId)}" data-wf-idx="${i}" aria-label="Supprimer">✕</button>
      </div>`;
    })
    .join('');

  const syncBlock =
    opts.syncTarget && opts.syncRef
      ? `<button type="button" class="btn bsm" data-wf-sync data-wf-store="${esc(storeKey)}" data-wf-target="${esc(opts.syncTarget)}" data-wf-ref="${esc(opts.syncRef)}" data-wf-page="${esc(pageId)}">↗ Registre actions</button>`
      : '';

  const defaultType = opts.defaultType || types[0]?.id || 'Corrective';

  return `
  <div class="card wf-actions-panel wf-actions-panel--modern">
    <div class="ch wf-actions-head">
      <span class="ct">${esc(title)}</span>
      <div class="wf-actions-head-btns">
        ${syncBlock}
        <button type="button" class="btn bp bsm" data-wf-add data-wf-store="${esc(storeKey)}" data-wf-page="${esc(pageId)}" data-wf-default="${esc(defaultType)}">+ Action</button>
      </div>
    </div>
    ${note}
    <div class="wf-type-legend">
      ${types.map((t) => `<span class="wf-type-pill" style="background:${t.bg};color:${t.color};border-color:${t.border}">${t.icon} ${esc(t.id)}</span>`).join('')}
    </div>
    ${rows || '<div class="wf-actions-empty">Aucune action — cliquez sur + Action (facultatif).</div>'}
  </div>`;
}

export function bindWorkflowInputs() {
  document.addEventListener('input', (e) => {
    const el = e.target;
    const key = el.dataset?.wfStore;
    const idx = el.dataset?.wfIdx;
    if (key == null || idx == null) return;
    const list = window[`${key}_acts`];
    if (!list?.[idx]) return;
    if (el.matches('[data-wf-input]')) list[idx].action = el.value;
    if (el.matches('[data-wf-resp]')) list[idx].resp = el.value;
    if (el.matches('[data-wf-delai]')) list[idx].delai = el.value;
  });
}
