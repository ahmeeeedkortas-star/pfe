/**
 * Nouvelle non-conformité — formulaire moderne.
 */
import { addNcProjet, getNcProjets } from '../../data/nc-projets.store.js';
import { NC_DEPARTEMENTS } from '../../data/nc-departements.js';
import { NC_CAUSES_RACINES, NC_STADES_DETECTION } from '../../data/nc-causes.js';
import {
  NC_ATTACHMENT_LIMITS,
  addNcAttachments,
  readFilesAsAttachments,
} from '../../data/nc-attachments.store.js';
import { formatNcDate, getNcData, nextNcNumber } from '../../data/nc.data.js';
import { createNc, initNcRepository } from '../../data/nc-repository.js';
import { enhanceNcNewWizard } from '../../patches/nc-wizard.js';
import { renderXmDynamicSelect, bindDynamicFieldsInContainer } from '../../core/dynamic-lists.js';

const DELAI_PRESETS = [
  { days: 1, label: '1 jour' },
  { days: 2, label: '2 jours' },
  { days: 3, label: '3 jours' },
  { days: 5, label: '5 jours' },
  { days: 7, label: '7 jours' },
  { days: 10, label: '10 jours' },
  { days: 15, label: '15 jours' },
];

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function formatDelai(days) {
  const n = Math.max(1, Math.min(365, Number(days)));
  return `${n}j`;
}

export function renderNcNew() {
  const nextNum = nextNcNumber(getNcData());

  return `<div data-page="nc-new" class="rc-new-page xm-v11-surface">
    <div class="card rc-new-card">
      <div class="rc-new-head">
        <div>
          <h1 class="rc-new-title">Nouvelle non-conformité</h1>
          <p class="rc-new-sub">Numéro attribué : <strong>${esc(nextNum)}</strong> · Date du jour</p>
        </div>
      </div>

      <form class="rc-new-form" data-nc-new-form novalidate>
        <div class="fgrid rc-new-grid">
          ${renderXmDynamicSelect({ id: 'ncn-projet', listKey: 'nc.projects', label: 'Projet', required: true, emptyOption: '— Choisir —' })}

          ${renderXmDynamicSelect({ id: 'ncn-dep', listKey: 'nc.departments', label: 'Département', selected: NC_DEPARTEMENTS[0], required: true })}

          ${renderXmDynamicSelect({ id: 'ncn-resp', listKey: 'global.responsibles', label: 'Responsable', emptyOption: '— Optionnel —' })}

          ${renderXmDynamicSelect({ id: 'ncn-grav', listKey: 'nc.gravity', label: 'Gravité', selected: 'Majeure', required: true })}

          ${renderXmDynamicSelect({ id: 'ncn-stade', listKey: 'nc.detection', label: 'Stade de détection', selected: NC_STADES_DETECTION[1] || '' })}

          ${renderXmDynamicSelect({ id: 'ncn-cause', listKey: 'nc.rootCauses', label: 'Cause racine', emptyOption: '— À définir —' })}

          <div class="fg rc-new-delai">
            <label class="fl">Délai de traitement</label>
            <select class="fi" name="delai-preset" data-ncn-delai-preset>
              ${DELAI_PRESETS.map((p) => `<option value="${p.days}">${p.label}</option>`).join('')}
              <option value="custom">Personnalisé…</option>
            </select>
            <div class="rc-new-delai-custom" data-ncn-delai-custom hidden>
              <input class="fi" type="number" min="1" max="365" step="1" data-ncn-delai-days value="3" placeholder="Nombre de jours">
              <span class="rc-new-delai-unit">jours ouvrés</span>
            </div>
          </div>

          <div class="fg full">
            <label class="fl">Description <span class="req">*</span></label>
            <textarea class="fi" name="description" data-ncn-desc rows="4" placeholder="Nature de la non-conformité, impact, références…" required></textarea>
          </div>

          <div class="fg full">
            <label class="fl">Action immédiate</label>
            <input class="fi" name="action" placeholder="Ex. Mise en écart, arrêt ligne…">
          </div>

          <div class="fg full rc-new-attachments">
            <label class="fl">Pièces jointes</label>
            <div class="rc-new-upload">
              <input type="file" class="rc-new-file-input" data-ncn-files multiple accept="image/*,.pdf,.doc,.docx,.xls,.xlsx">
              <p class="rc-new-hint">Photos, PDF, documents — max ${NC_ATTACHMENT_LIMITS.maxFiles} fichiers · 2 Mo chacun</p>
              <ul class="rc-new-file-list" data-ncn-file-list></ul>
            </div>
          </div>
        </div>

        <div class="rc-new-foot">
          <button type="button" class="btn" data-nav="nc-liste">Annuler</button>
          <button type="button" class="btn" data-ncn-save-draft>Sauvegarder brouillon</button>
          <button type="button" class="btn bp" data-ncn-save-qrqc>Enregistrer &amp; QRQC</button>
          <button type="submit" class="btn btn-danger">Déclarer la NC</button>
        </div>
      </form>
    </div>
  </div>`;
}

function getFormDelai(root) {
  const preset = root.querySelector('[data-ncn-delai-preset]')?.value;
  if (preset === 'custom') {
    const days = parseInt(root.querySelector('[data-ncn-delai-days]')?.value, 10);
    return formatDelai(Number.isNaN(days) ? 3 : days);
  }
  return formatDelai(preset);
}

function resolveProjet() {
  const v = window.readXmDynamicSelect?.('ncn-projet', 'nc.projects');
  if (v) addNcProjet(v);
  return v || '';
}

function resolveNcFields(root) {
  return {
    projet: resolveProjet(),
    departement: window.readXmDynamicSelect?.('ncn-dep', 'nc.departments') || '',
    responsable: window.readXmDynamicSelect?.('ncn-resp', 'global.responsibles') || root.querySelector('[name="responsable"]')?.value?.trim() || '',
    gravite: window.readXmDynamicSelect?.('ncn-grav', 'nc.gravity') || '',
    stade: window.readXmDynamicSelect?.('ncn-stade', 'nc.detection') || '',
    cause: window.readXmDynamicSelect?.('ncn-cause', 'nc.rootCauses') || '',
  };
}

function renderPendingFiles(listEl, files) {
  if (!listEl) return;
  if (!files.length) {
    listEl.innerHTML = '';
    return;
  }
  listEl.innerHTML = files
    .map(
      (f, i) =>
        `<li class="rc-new-file-item"><span>📎 ${f.name}</span> <button type="button" class="btn bsm" data-ncn-file-rm="${i}">Retirer</button></li>`
    )
    .join('');
}

export function bindNcNew() {
  if (window.__ncNewBound) return;
  window.__ncNewBound = true;
  requestAnimationFrame(() => {
    enhanceNcNewWizard();
    const page = document.querySelector('[data-page="nc-new"]');
    if (page) bindDynamicFieldsInContainer(page);
  });

  document.addEventListener('change', async (e) => {
    if (e.target.matches('[data-ncn-files]')) {
      const root = e.target.closest('[data-page="nc-new"]');
      const listEl = root?.querySelector('[data-ncn-file-list]');
      const pending = root.__ncPendingFiles || [];
      const added = await readFilesAsAttachments(e.target.files);
      root.__ncPendingFiles = [...pending, ...added].slice(0, NC_ATTACHMENT_LIMITS.maxFiles);
      renderPendingFiles(listEl, root.__ncPendingFiles);
      e.target.value = '';
      return;
    }
    if (!e.target.matches('[data-ncn-delai-preset]')) return;
    const root = e.target.closest('[data-page="nc-new"]');
    const custom = root?.querySelector('[data-ncn-delai-custom]');
    if (custom) custom.hidden = e.target.value !== 'custom';
  });

  document.addEventListener('click', (e) => {
    const rm = e.target.closest('[data-ncn-file-rm]');
    if (rm) {
      const root = rm.closest('[data-page="nc-new"]');
      const idx = parseInt(rm.getAttribute('data-ncn-file-rm'), 10);
      root.__ncPendingFiles = (root.__ncPendingFiles || []).filter((_, i) => i !== idx);
      renderPendingFiles(root.querySelector('[data-ncn-file-list]'), root.__ncPendingFiles);
      return;
    }

    const projBtn = e.target.closest('[data-ncn-projet-save]');
    if (!projBtn) return;
    const root = projBtn.closest('[data-page="nc-new"]');
    const code = root?.querySelector('[data-ncn-projet-new]')?.value?.trim();
    if (!code) {
      window.xmToast?.('Saisissez le code projet', '', 'alert', '#dc2626');
      return;
    }
    const res = addNcProjet(code);
    if (res.ok) {
      const sel = root.querySelector('[data-ncn-projet]');
      if (sel && !Array.from(sel.options).some((o) => o.value === res.name)) {
        const opt = document.createElement('option');
        opt.value = res.name;
        opt.textContent = res.name;
        sel.appendChild(opt);
      }
      sel.value = res.name;
      root.querySelector('[data-ncn-projet-new]').value = '';
      window.xmToast?.('Projet enregistré', res.name, 'check-circle', '#16a34a');
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-ncn-save-qrqc]')) {
      e.preventDefault();
      const root = e.target.closest('[data-page="nc-new"]');
      const form = root?.querySelector('[data-nc-new-form]');
      if (form) saveNcFromForm(form, root, { goQrqc: true });
      return;
    }
    if (e.target.closest('[data-ncn-save-draft]')) {
      e.preventDefault();
      const root = e.target.closest('[data-page="nc-new"]');
      window._ncDraft = collectNcDraft(root);
      window.xmToast?.('Brouillon enregistré', 'Session locale', 'save', '#2563eb');
    }
  });

  document.addEventListener('submit', (e) => {
    const form = e.target.closest('[data-nc-new-form]');
    if (!form) return;
    e.preventDefault();
    const root = form.closest('[data-page="nc-new"]');
    saveNcFromForm(form, root, { goQrqc: false });
  });
}

function collectNcDraft(root) {
  const form = root?.querySelector('[data-nc-new-form]');
  if (!form) return {};
  const f = resolveNcFields(root);
  return {
    projet: f.projet,
    departement: f.departement,
    gravite: f.gravite,
    responsable: f.responsable,
    description: form.querySelector('[data-ncn-desc]')?.value,
  };
}

function saveNcFromForm(form, root, { goQrqc }) {
  const desc = form.querySelector('[data-ncn-desc]')?.value?.trim();
  if (!desc) {
    form.querySelector('[data-ncn-desc]')?.focus();
    window.xmToast?.('La description est obligatoire', '', 'alert', '#dc2626');
    return;
  }

  const fields = resolveNcFields(root);
  if (!fields.projet) {
    window.xmToast?.('Choisissez ou ajoutez un projet', '', 'alert', '#dc2626');
    return;
  }

  initNcRepository();
  const data = getNcData();

  const nc = {
    n: nextNcNumber(data),
    d: formatNcDate(),
    p: fields.projet,
    dep: fields.departement || NC_DEPARTEMENTS[0],
    g: fields.gravite || 'Majeure',
    s: goQrqc ? 'En cours' : 'Ouvert',
    r: fields.responsable || 'Non assigné',
    dl: getFormDelai(root),
    desc,
    prog: 0,
    rebuts: 0,
    heuresPerte: 0,
  };

  const action = form.querySelector('[name="action"]')?.value?.trim();
  if (action) nc.actionImmediate = action;

  if (fields.stade) nc.stade = fields.stade;
  if (fields.cause) nc.causeRacine = fields.cause;

  createNc(nc);

  const pending = root.__ncPendingFiles || [];
  if (pending.length) {
    addNcAttachments(nc.n, pending);
    root.__ncPendingFiles = [];
  }

  if (goQrqc) {
    window.STATE = window.STATE || {};
    window.STATE.currentNcId = nc.n;
    window.STATE.qrqcStep = 1;
    window[`qrqcData_${nc.n}`] = {
      detectedBy: nc.r,
      dateDetect: nc.d,
      poste: nc.dep,
      desc: nc.desc,
      qty: nc.rebuts || 0,
    };
    window.xmToast?.('NC créée — QRQC', nc.n, 'zap', '#ea580c');
    window.goPage?.('nc-qrqc');
    return;
  }

  window.xmToast?.('NC déclarée', nc.n, 'check-circle', '#16a34a');
  window.goPage?.('nc-liste');
}
