/**
 * Liste des checklists par équipement (extincteur, pharmacie, véhicule).
 */
import { SEC_CHECKLIST_CONFIGS, SEC_CHECKLIST_PAGES } from '../../data/sec-checklist-configs.js';
import {
  INSTANCE_ADD_LABELS,
  FIXED_INFO_CODES,
  createChecklistInstance,
  deleteChecklistInstance,
  listInstances,
} from '../../data/sec-checklist-instances.js';
import { clScore } from '../../components/qhse/dynamic-checklist.js';
import { renderChecklistHeaderIcon } from '../../components/icons/checklist-icons.js';
import { renderSecChecklistNav } from '../../components/qhse/sec-checklist-nav.js';
import { renderIcon } from '../../components/icons/icon-render.js';
import { ensureSecData } from '../../data/sec-metrics.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function templateKeyFromPage(pageId) {
  const mapped = SEC_CHECKLIST_PAGES[pageId];
  return mapped && mapped !== '__custom__' && mapped !== '__instance__' && mapped !== '__registre__'
    ? mapped
    : null;
}

function statutStyle(statut, pct, non) {
  if (statut === 'Validé' || statut === 'validé') {
    return { bg: '#f0fdf4', bc: '#bbf7d0', c: 'var(--green)', label: 'Validé' };
  }
  if (non > 0) {
    return { bg: '#fff7ed', bc: '#fed7aa', c: 'var(--orange)', label: 'NC détectées' };
  }
  if (pct >= 70) {
    return { bg: '#eff6ff', bc: '#bfdbfe', c: 'var(--blue)', label: 'En cours' };
  }
  return { bg: '#f9fafb', bc: '#e5e7eb', c: 'var(--muted)', label: 'À faire' };
}

function instanceCard(key, cfg, data, score) {
  const st = statutStyle(data.statut, score.pct, score.non);
  const label = esc(data.instanceLabel || data.title || key);
  const sub = (data.customInfo || [])
    .filter((r) => r.value)
    .slice(0, 2)
    .map((r) => `${esc(r.label)}: ${esc(r.value)}`)
    .join(' · ');

  return `<div class="card cl-inst-card">
    <div class="cl-inst-card__bar" style="background:${cfg.gradient}"></div>
    <div class="cl-inst-card__head" style="background:${cfg.gradient}">
      ${renderChecklistHeaderIcon(data.templateKey || key, 22)}
      <div class="cl-inst-card__title">${label}</div>
      <div class="cl-inst-card__pct">${score.pct}%</div>
    </div>
    <div class="cl-inst-card__body">
      ${sub ? `<div class="cl-inst-card__meta">${sub}</div>` : ''}
      <span class="badge" style="background:${st.bg};color:${st.c};border:1px solid ${st.bc}">${st.label}</span>
      <div class="cl-inst-card__scores">
        <span><b style="color:var(--green)">${score.oui}</b> OK</span>
        <span><b style="color:var(--red)">${score.non}</b> NC</span>
        <span><b>${score.total}</b> pts</span>
      </div>
      <div class="cl-inst-card__actions">
        <button type="button" class="btn bp bsm" style="flex:1" data-cl-open="${esc(key)}">${score.pct > 0 ? 'Continuer' : 'Contrôler'}</button>
        <button type="button" class="btn bsm br" data-cl-del-inst="${esc(key)}" title="Supprimer">✕</button>
      </div>
    </div>
  </div>`;
}

export function installChecklistInstanceHelpers() {
  window.openNewInstanceModal = openNewInstanceModal;
}

export function openNewInstanceModal(templateKey) {
  const cfg = SEC_CHECKLIST_CONFIGS[templateKey];
  if (!cfg) return;

  document.getElementById('cl-inst-modal')?.remove();
  const fields = (cfg.infoFields || [])
    .map(
      ([label, def]) =>
        `<div class="fg full">
          <label class="fl">${esc(label)}</label>
          <input class="fi" data-cl-inst-field data-label="${esc(label)}" value="${esc(FIXED_INFO_CODES.has(def) ? def : '')}" placeholder="${esc(label)}">
        </div>`
    )
    .join('');

  const wrap = document.createElement('div');
  wrap.id = 'cl-inst-modal';
  wrap.className = 'cl-inst-modal-backdrop';
  wrap.innerHTML = `<div class="card cl-inst-modal" role="dialog">
    <div class="ch"><span class="ct">+ Nouvelle checklist — ${esc(cfg.title)}</span></div>
    <p style="font-size:11px;color:var(--muted);margin:0 0 10px">Les libellés sont figés ; renseignez les informations de cet équipement.</p>
    <form class="fgrid" style="gap:8px" id="cl-inst-form">${fields}</form>
    <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px">
      <button type="button" class="btn" data-cl-inst-cancel>Annuler</button>
      <button type="button" class="btn bp" data-cl-inst-save data-template="${esc(templateKey)}">Enregistrer</button>
    </div>
  </div>`;

  document.body.appendChild(wrap);

  wrap.addEventListener('click', (e) => {
    if (e.target === wrap || e.target.closest('[data-cl-inst-cancel]')) wrap.remove();
    if (e.target.closest('[data-cl-inst-save]')) {
      const values = {};
      wrap.querySelectorAll('[data-cl-inst-field]').forEach((inp) => {
        values[inp.dataset.label] = inp.value;
      });
      const res = createChecklistInstance(templateKey, values);
      wrap.remove();
      if (res.ok) {
        window.currentCLKey = res.key;
        window.xmToast?.('Checklist enregistrée', res.label, 'check-circle', '#16a34a');
        if (typeof window.goPage === 'function') window.goPage('sec-cl-instance');
        else if (typeof window.reloadPage === 'function') window.reloadPage(`sec-cl-${templateKey}`);
      }
    }
  });
}

export function renderChecklistInstancesList(pageId) {
  ensureSecData();
  const templateKey = templateKeyFromPage(pageId);
  const cfg = templateKey ? SEC_CHECKLIST_CONFIGS[templateKey] : null;
  if (!templateKey || !cfg) {
    return '<div class="card"><p>Liste introuvable.</p><button type="button" class="btn" data-nav="sec-checklists">← Retour</button></div>';
  }

  const instances = listInstances(templateKey);
  const addLabel = INSTANCE_ADD_LABELS[templateKey] || 'un équipement';

  const cards = instances
    .map(({ key, data }) => instanceCard(key, cfg, data, clScore(key)))
    .join('');

  const empty = `<div class="card cl-inst-empty">
    <p>Aucune checklist enregistrée pour ce type.</p>
    <p style="font-size:11px;color:var(--muted)">Ajoutez ${addLabel} pour commencer un contrôle.</p>
  </div>`;

  const formPage = `sec-cl-${templateKey}`;

  return `<div class="sec-cl-page" data-page="cl-instances" data-template="${esc(templateKey)}">
    ${renderSecChecklistNav(formPage)}
    <header class="sec-cl-page-head">
      <h1>${esc(cfg.title)} — Équipements</h1>
      <p>${instances.length} enregistrement(s) · même grille de contrôle pour chaque équipement</p>
    </header>
    <div class="sec-cl-hero" style="background:${cfg.gradient}">
      <span class="sec-cl-hero-icon">${renderChecklistHeaderIcon(templateKey, 28)}</span>
      <div class="sec-cl-hero-text">
        <div class="sec-cl-hero-title">Gestion des équipements</div>
        <div class="sec-cl-hero-sub">${esc(cfg.code)} · ${esc(cfg.subtitle)}</div>
      </div>
      <div class="sec-cl-hero-kpis">
        <div class="sec-cl-hero-kpi"><div class="sec-cl-hero-kpi-val">${instances.length}</div><div class="sec-cl-hero-kpi-lbl">Fiches</div></div>
      </div>
    </div>
    <div class="sec-cl-card" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:14px">
      <button type="button" class="btn" data-nav="sec-checklists">← Checklists</button>
      <button type="button" class="btn bp" data-nav="${esc(formPage)}">${renderIcon('clipboard', { size: 14 })} Modèle / démo</button>
      <button type="button" class="btn" data-nav="sec-cl-registre">${renderIcon('file', { size: 14 })} Registre</button>
      <button type="button" class="btn bp" data-cl-add-inst="${esc(templateKey)}">+ Ajouter ${addLabel}</button>
    </div>
    <div class="cl-inst-grid">
      ${cards || empty}
      <div class="card cl-inst-add-card" data-cl-add-inst="${esc(templateKey)}" role="button" tabindex="0">
        <div style="font-size:28px;color:var(--muted)">+</div>
        <div style="font-weight:600;font-size:12px">Ajouter ${addLabel}</div>
      </div>
    </div>
  </div>`;
}

let bound = false;

export function bindChecklistInstancesList() {
  if (bound) return;
  bound = true;

  document.addEventListener('click', (e) => {
    const add = e.target.closest('[data-cl-add-inst]');
    if (add) {
      e.preventDefault();
      openNewInstanceModal(add.dataset.clAddInst);
      return;
    }

    const open = e.target.closest('[data-cl-open]');
    if (open) {
      e.preventDefault();
      window.currentCLKey = open.dataset.clOpen;
      window.goPage?.('sec-cl-instance');
      return;
    }

    const del = e.target.closest('[data-cl-del-inst]');
    if (del) {
      e.preventDefault();
      const key = del.dataset.clDelInst;
      const tk = window.CL_DATA?.[key]?.templateKey;
      if (deleteChecklistInstance(key).ok) {
        window.xmToast?.('Checklist supprimée', '', 'check-circle', '#6b7a99');
        window.reloadPage?.(tk ? `sec-cl-${tk}` : 'sec-checklists');
      }
    }
  });
}
