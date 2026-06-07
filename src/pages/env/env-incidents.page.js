/**
 * env-incidents — Registre incidents environnementaux (structure alignée accidents SST).
 */
import {
  seedEnvIncidents,
  getIncidents,
  addIncident,
  updateIncident,
  deleteIncident,
  INC_GRAVITES,
  INC_STATUTS,
  INC_TYPES,
} from '../../data/env-incidents.store.js';
import { renderIcon } from '../../components/icons/icon-render.js';
import {
  esc,
  envGraviteStyle,
  envStatutBadge,
  refreshEnvIncidents,
  envIncToast,
  ENV_INC_STEPS,
  ENV_ZONES,
} from '../../components/env/env-inc-utils.js';

const ENV_GREEN = '#16a34a';
let bound = false;

function getData() {
  return getIncidents();
}

function filtered() {
  const f = window._envIncFilter || {};
  const q = (f.q || '').toLowerCase();
  return getData().filter((i) => {
    if (f.statut && i.statut !== f.statut) return false;
    if (f.gravite && i.gravite !== f.gravite) return false;
    if (f.type && i.type !== f.type) return false;
    if (
      q &&
      ![i.id, i.description, i.zone, i.type, i.resp, i.declarePar || ''].join(' ').toLowerCase().includes(q)
    )
      return false;
    return true;
  });
}

function buildWfBar(inc) {
  const step = inc.step || 1;
  return `<div class="acc-wf-timeline">${ENV_INC_STEPS.map((lbl, idx) => {
    const n = idx + 1;
    const done = n < step;
    const active = n === step;
    return `<div class="acc-wf-step${done ? ' is-done' : ''}${active ? ' is-active' : ''}" data-env-wf-step="${n}" data-env-id="${esc(inc.id)}">
      <div class="acc-wf-step-dot">${done ? '✓' : n}</div>
      <div class="acc-wf-step-lbl">${esc(lbl)}</div>
    </div>`;
  }).join('')}</div>`;
}

function buildTimeline(rows) {
  const sel = window.env_inc_sel;
  if (!rows.length) {
    return `<div class="acc-empty-state">${renderIcon('siren', { size: 40 })}<p>Aucun incident ne correspond aux filtres.</p></div>`;
  }
  return `<div class="acc-timeline">${rows
    .map((inc, i) => {
      const gc = envGraviteStyle(inc.gravite);
      const sc = envStatutBadge(inc.statut);
      const isSel = inc.id === sel;
      return `<div class="acc-timeline-item" style="animation-delay:${Math.min(i * 0.05, 0.35)}s">
        <div class="acc-timeline-dot" style="color:${gc.tc}"></div>
        <article class="acc-incident-card${isSel ? ' is-selected' : ''}" data-env-select="${esc(inc.id)}">
          <div class="acc-incident-head">
            <span class="acc-incident-id">${esc(inc.id)}</span>
            <span class="acc-grav-badge" style="background:${gc.bg};color:${gc.tc};border:1px solid ${gc.bc}">${esc(inc.gravite)}</span>
          </div>
          <h3 class="acc-incident-emp">${esc(inc.description)}</h3>
          <div class="acc-incident-meta">
            <span>${esc(inc.date)}${inc.heure ? ` · ${esc(inc.heure)}` : ''}</span>
            <span>${esc(inc.zone)}</span>
            <span>${esc(inc.resp)}</span>
          </div>
          <div class="acc-incident-tags">
            <span class="badge bb">${esc(inc.type)}</span>
            <span class="badge ${sc}">${esc(inc.statut)}</span>
          </div>
        </article>
      </div>`;
    })
    .join('')}</div>`;
}

function buildNewForm() {
  const ns = window.env_inc_newStep || 1;
  const stepLabels = ['Informations', 'Description & impacts', 'Causes & actions', 'Pièces jointes'];
  const stepBar = stepLabels
    .map((l, i) => {
      const n = i + 1;
      const done = n < ns;
      const active = n === ns;
      const line =
        i > 0
          ? `<div style="flex:1;height:3px;background:${done ? ENV_GREEN : '#e5e7eb'};margin-top:12px"></div>`
          : '';
      return (
        line +
        `<div style="display:flex;flex-direction:column;align-items:center">
          <div class="reg-step-dot" data-env-new-step="${n}" style="background:${done || active ? ENV_GREEN : '#e5e7eb'};color:#fff;border-color:${ENV_GREEN}">${done ? '✓' : n}</div>
          <div class="reg-step-lbl" style="color:${active ? ENV_GREEN : 'var(--muted)'};font-weight:${active ? '700' : '400'}">${l}</div>
        </div>`
      );
    })
    .join('');

  let body = '';
  if (ns === 1) {
    body = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div class="fg"><label class="fl">Date *</label><input class="fi" id="ni_date" value="${new Date().toLocaleDateString('fr-FR')}"></div>
      <div class="fg"><label class="fl">Heure</label><input class="fi" id="ni_heure" type="time" value="08:00"></div>
      <div class="fg"><label class="fl">Type *</label><select class="fi" id="ni_type">${INC_TYPES.map((t) => `<option>${esc(t)}</option>`).join('')}</select></div>
      <div class="fg"><label class="fl">Gravité *</label><select class="fi" id="ni_grav">${INC_GRAVITES.map((g) => `<option>${esc(g)}</option>`).join('')}</select></div>
      <div class="fg"><label class="fl">Zone *</label><select class="fi" id="ni_zone">${ENV_ZONES.map((z) => `<option>${esc(z)}</option>`).join('')}</select></div>
      <div class="fg"><label class="fl">Responsable *</label><input class="fi" id="ni_resp" value="HSE"></div>
      <div class="fg"><label class="fl">Déclarant</label><input class="fi" id="ni_decl" placeholder="Nom"></div>
      <div class="fg"><label class="fl">Échéance traitement</label><input class="fi" id="ni_delai" placeholder="JJ/MM/AAAA"></div>
      <div class="fg" style="grid-column:1/-1"><label class="fl">Résumé *</label><input class="fi" id="ni_desc" placeholder="Description courte de l'incident"></div>
    </div>`;
  } else if (ns === 2) {
    body = `
      <div class="fg"><label class="fl">Description détaillée *</label><textarea class="fi" rows="4" id="ni_descDet" placeholder="Circonstances, constats, mesures prises sur le moment…"></textarea></div>
      <div class="fg" style="margin-top:10px"><label class="fl">Impacts environnementaux *</label><textarea class="fi" rows="3" id="ni_impacts" placeholder="Sol, eau, air, déchets, consommations…"></textarea></div>`;
  } else if (ns === 3) {
    body = `<p class="reg-meta" style="margin-bottom:10px">Causes identifiées (une par ligne)</p>
      <div class="fg"><textarea class="fi" rows="2" id="ni_causes" placeholder="Cause 1&#10;Cause 2"></textarea></div>
      <div class="fg" style="margin-top:10px"><label class="fl" style="color:var(--red)">Cause racine *</label><textarea class="fi" rows="2" id="ni_cr"></textarea></div>
      <p class="reg-meta" style="margin:14px 0 8px">Actions immédiates</p>
      <div id="ni_imm_list"><div class="acc-action-row"><input class="fi" placeholder="Action immédiate"><input class="fi" value="HSE" placeholder="Resp."><input class="fi" placeholder="JJ/MM/AAAA"></div></div>
      <button type="button" class="btn bsm" data-env-add-imm-row style="width:100%;margin:6px 0 12px">+ Action immédiate</button>
      <p class="reg-meta" style="margin-bottom:8px">Actions correctives / préventives</p>
      <div id="ni_corr_list"><div class="acc-action-row"><input class="fi" placeholder="Action corrective"><input class="fi" value="HSE" placeholder="Resp."><input class="fi" placeholder="JJ/MM/AAAA"></div></div>
      <button type="button" class="btn bsm" data-env-add-corr-row style="width:100%">+ Action corrective</button>`;
  } else {
    body = `<div style="border:2px dashed var(--border);border-radius:10px;padding:24px;text-align:center;background:#fafbfc;margin-bottom:14px">
      ${renderIcon('file', { size: 32 })}
      <div style="font-weight:600;margin-top:10px">Pièces jointes & preuves</div>
      <div class="reg-meta" style="margin-top:6px">Photos, rapports, analyses (référence fichier)</div>
      <input class="fi" id="ni_files" style="margin-top:12px" placeholder="photo.jpg, rapport.pdf">
    </div>
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:9px;padding:12px;text-align:center;font-weight:600;color:#065f46">Prêt à enregistrer l'incident</div>`;
  }

  return `
    <div class="reg-panel-head">
      <div>
        <div class="reg-panel-title">Déclarer un incident environnemental</div>
        <div class="reg-meta">Étape ${ns}/${stepLabels.length} — ${stepLabels[ns - 1]}</div>
      </div>
      <button type="button" class="btn bsm" data-env-cancel-new>✕</button>
    </div>
    <div class="reg-step-bar">${stepBar}</div>
    <div class="reg-panel-body">${body}</div>
    <div style="padding:12px 18px;border-top:1px solid var(--border);display:flex;gap:8px">
      ${ns > 1 ? `<button type="button" class="btn bsm" data-env-new-step="${ns - 1}">← Précédent</button>` : '<span></span>'}
      <div style="flex:1"></div>
      ${ns < 4 ? `<button type="button" class="btn bsm bp" style="background:${ENV_GREEN};border-color:${ENV_GREEN}" data-env-new-step="${ns + 1}">Suivant →</button>` : `<button type="button" class="btn bsm bg2" data-env-save-new>Enregistrer</button>`}
    </div>`;
}

function actionCards(list, prefix, incId) {
  return (list || [])
    .map(
      (act, idx) => `
    <div class="acc-action-card">
      <div style="display:flex;justify-content:space-between;gap:8px;margin-bottom:8px">
        <span style="font-weight:600;flex:1">${esc(act.titre)}</span>
        <span class="badge ${act.statut === 'Clôturé' ? 'bg3' : act.statut === 'En cours' ? 'bb' : 'bgr'}">${esc(act.statut)}</span>
      </div>
      <div class="reg-meta" style="display:flex;justify-content:space-between;margin-bottom:8px"><span>${esc(act.resp)}</span><span>${esc(act.delai)}</span></div>
      ${act.statut !== 'Clôturé' ? `<button type="button" class="btn bsm" style="width:100%;background:#f0fdf4;border-color:#bbf7d0;color:var(--green)" data-env-close-action="${prefix}" data-env-action-idx="${idx}" data-env-id="${esc(incId)}">Marquer clôturé</button>` : '<div style="text-align:center;color:var(--green);font-weight:600;font-size:12px">✓ Clôturée</div>'}
    </div>`
    )
    .join('');
}

function buildRightPanel() {
  if (window.env_inc_view === 'new') return buildNewForm();
  if (!window.env_inc_sel) {
    return `<div class="acc-empty-state" style="padding:64px 24px">
      ${renderIcon('siren', { size: 48 })}
      <div class="reg-panel-title" style="margin-top:12px">Sélectionner un incident</div>
      <div class="reg-meta" style="max-width:320px;margin:8px auto 20px">Choisissez un dossier pour consulter l'analyse, les actions et les pièces jointes.</div>
      <button type="button" class="btn bp" style="background:${ENV_GREEN};border-color:${ENV_GREEN}" data-env-new>+ Déclarer un incident</button>
    </div>`;
  }

  const inc = getData().find((x) => x.id === window.env_inc_sel);
  if (!inc) return '';
  const gc = envGraviteStyle(inc.gravite);
  const step = inc.step || 1;
  const tab = window.env_inc_tab || 'info';

  const tabs = [
    ['info', 'Informations'],
    ['desc', 'Description'],
    ['causes', 'Causes'],
    ['impacts', 'Impacts'],
    ['actions', 'Actions'],
    ['files', 'Fichiers'],
    ['suivi', 'Suivi'],
  ];
  const tabBar = tabs
    .map(([t, l]) => `<div class="reg-tab${tab === t ? ' active' : ''}" data-env-tab="${t}">${l}</div>`)
    .join('');

  let tabContent = '';
  if (tab === 'info') {
    tabContent = `
      <div class="acc-section-card">
        <h4>${renderIcon('clipboard', { size: 16 })} Informations générales</h4>
        ${[
          ['ID', inc.id],
          ['Date', `${inc.date}${inc.heure ? ` — ${inc.heure}` : ''}`],
          ['Type', inc.type],
          ['Zone', inc.zone],
          ['Gravité', inc.gravite],
          ['Statut', inc.statut],
          ['Responsable', inc.resp],
          ['Déclarant', inc.declarePar || '—'],
          ['Échéance', inc.delai || '—'],
        ]
          .map(
            ([k, v]) =>
              `<div class="drow" style="padding:5px 0"><span class="dk">${k}</span><span style="font-weight:600;font-size:12px">${esc(v)}</span></div>`
          )
          .join('')}
      </div>`;
  } else if (tab === 'desc') {
    tabContent = `
      <div class="acc-section-card">
        <h4>${renderIcon('file', { size: 16 })} Description</h4>
        <div style="padding:12px;background:#fff;border-radius:8px;border:1px solid #e2e8f0;margin-bottom:10px">
          <div class="fl" style="margin-bottom:6px">Résumé</div>
          <div style="font-size:12px;line-height:1.55;font-weight:600">${esc(inc.description)}</div>
        </div>
        <div style="padding:12px;background:#fff;border-radius:8px;border:1px solid #e2e8f0">
          <div class="fl" style="margin-bottom:6px">Description détaillée</div>
          <div style="font-size:12px;line-height:1.55">${esc(inc.descDetaillee || '—')}</div>
        </div>
      </div>`;
  } else if (tab === 'causes') {
    tabContent = `
      <div class="acc-section-card">
        <h4>${renderIcon('zap', { size: 16 })} Causes identifiées</h4>
        <ul style="margin:0;padding-left:18px;font-size:12px;line-height:1.6">
          ${(inc.causes || []).map((c) => `<li>${esc(c)}</li>`).join('') || '<li class="reg-meta">—</li>'}
        </ul>
        <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:9px;padding:12px;margin-top:12px">
          <div class="fl" style="color:var(--red);margin-bottom:6px">Cause racine</div>
          <div style="font-weight:600;color:#991b1b;font-size:12px">${esc(inc.causeRacine || '—')}</div>
        </div>
      </div>`;
  } else if (tab === 'impacts') {
    tabContent = `
      <div class="acc-section-card">
        <h4>${renderIcon('leaf', { size: 16 })} Impacts environnementaux</h4>
        <div style="font-size:12px;line-height:1.6;padding:12px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0">${esc(inc.impacts || '—')}</div>
      </div>`;
  } else if (tab === 'actions') {
    tabContent = `
      <div class="acc-section-card">
        <h4>${renderIcon('zap', { size: 16 })} Actions immédiates</h4>
        ${actionCards(inc.actionsImmediates, 'imm', inc.id) || '<p class="reg-meta">Aucune action immédiate</p>'}
      </div>
      <div class="acc-section-card">
        <h4>${renderIcon('refresh', { size: 16 })} Actions correctives & préventives</h4>
        ${actionCards(inc.actions, 'corr', inc.id) || '<p class="reg-meta">Aucune action corrective</p>'}
        <button type="button" class="btn bsm bp" data-env-add-corr data-env-id="${esc(inc.id)}" style="width:100%;margin-top:8px;background:${ENV_GREEN};border-color:${ENV_GREEN}">+ Ajouter une action</button>
      </div>`;
  } else if (tab === 'files') {
    tabContent = `
      <div class="acc-section-card">
        <h4>${renderIcon('file', { size: 16 })} Pièces jointes & preuves</h4>
        <div style="border:2px dashed #e2e8f0;border-radius:10px;padding:22px;text-align:center;background:#fafbfc;margin-bottom:12px">
          ${renderIcon('file', { size: 32 })}
          <div style="font-weight:600;margin-top:8px">Références documents</div>
        </div>
        ${(inc.fichiers || []).length
          ? inc.fichiers
              .map(
                (n) =>
                  `<div class="acc-file-card">
            ${renderIcon('file', { size: 22 })}
            <div style="flex:1"><div style="font-weight:500">${esc(n)}</div></div>
            <button type="button" class="btn bsm">Voir</button>
          </div>`
              )
              .join('')
          : '<p class="reg-meta">Aucune pièce jointe</p>'}
      </div>`;
  } else {
    const v = inc.validation || {};
    tabContent = `
      <div class="acc-section-card">
        <h4>${renderIcon('check-circle', { size: 16 })} Validations & suivi</h4>
        ${[
          ['Validé par', v.validePar || '—'],
          ['Date validation', v.dateValidation || '—'],
          ['Commentaire', v.commentaire || '—'],
          ['Étape workflow', `${ENV_INC_STEPS[(inc.step || 1) - 1] || '—'} (${inc.step || 1}/5)`],
        ]
          .map(
            ([k, val]) =>
              `<div class="drow" style="padding:5px 0"><span class="dk">${k}</span><span style="font-weight:600;font-size:12px">${esc(val)}</span></div>`
          )
          .join('')}
      </div>
      ${inc.notes ? `<div class="acc-section-card"><h4>Notes</h4><p style="margin:0;font-size:12px">${esc(inc.notes)}</p></div>` : ''}`;
  }

  const isClosed = inc.statut === 'Clôturé';
  const wfNav = !isClosed
    ? `<div style="padding:10px 18px;border-bottom:1px solid var(--border);display:flex;gap:8px">
        <button type="button" class="btn bsm" data-env-wf-step="${Math.max(1, step - 1)}" data-env-id="${esc(inc.id)}" ${step <= 1 ? 'disabled' : ''}>← Précédent</button>
        <div style="flex:1"></div>
        ${step < 5 ? `<button type="button" class="btn bsm bp" style="background:${ENV_GREEN};border-color:${ENV_GREEN}" data-env-wf-step="${step + 1}" data-env-id="${esc(inc.id)}">${step === 4 ? 'Valider & clôturer →' : `Étape : ${ENV_INC_STEPS[step]} →`}</button>` : ''}
      </div>`
    : `<div style="padding:10px 18px;background:#f0fdf4;border-bottom:1px solid #bbf7d0;text-align:center;font-weight:600;color:var(--green)">Incident clôturé</div>`;

  return `
    <div class="reg-panel-head">
      <div>
        <div class="reg-panel-title">${esc(inc.id)}</div>
        <div class="reg-meta">${esc(inc.zone)} · ${esc(inc.date)} · ${esc(inc.type)}</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <span class="niv-pill" style="background:${gc.bg};color:${gc.tc};border:1px solid ${gc.bc}">${esc(inc.gravite)}</span>
        <span class="badge ${envStatutBadge(inc.statut)}">${esc(inc.statut)}</span>
        <button type="button" class="btn bsm" style="color:var(--red);border-color:#fecaca" data-env-delete="${esc(inc.id)}">Supprimer</button>
      </div>
    </div>
    ${buildWfBar(inc)}
    ${wfNav}
    <div class="reg-tabs">${tabBar}</div>
    <div class="reg-panel-body">${tabContent}</div>
    <div style="padding:12px 18px;border-top:1px solid var(--border);display:flex;gap:8px;position:sticky;bottom:0;background:var(--white)">
      <button type="button" class="btn bsm" style="flex:1" data-env-toast="draft">Brouillon</button>
      <button type="button" class="btn bsm bp" style="flex:1;background:${ENV_GREEN};border-color:${ENV_GREEN}" data-env-toast="save">Enregistrer</button>
      ${inc.statut !== 'Clôturé' ? `<button type="button" class="btn bsm bg2" style="flex:1" data-env-close="${esc(inc.id)}">Clôturer</button>` : ''}
    </div>`;
}

function parseActionRows(listId) {
  const list = document.getElementById(listId);
  if (!list) return [];
  return [...list.querySelectorAll('.acc-action-row')]
    .map((row) => {
      const inputs = row.querySelectorAll('.fi');
      const titre = inputs[0]?.value?.trim();
      if (!titre) return null;
      return {
        titre,
        resp: inputs[1]?.value?.trim() || 'HSE',
        delai: inputs[2]?.value?.trim() || '',
        statut: 'Planifié',
      };
    })
    .filter(Boolean);
}

function saveNewIncident() {
  const item = {
    date: document.getElementById('ni_date')?.value || new Date().toLocaleDateString('fr-FR'),
    heure: document.getElementById('ni_heure')?.value || '',
    type: document.getElementById('ni_type')?.value || 'Fuite',
    gravite: document.getElementById('ni_grav')?.value || 'Mineure',
    zone: document.getElementById('ni_zone')?.value || ENV_ZONES[0],
    resp: document.getElementById('ni_resp')?.value || 'HSE',
    declarePar: document.getElementById('ni_decl')?.value || '',
    delai: document.getElementById('ni_delai')?.value || '',
    description: document.getElementById('ni_desc')?.value || 'Incident environnemental',
    descDetaillee: document.getElementById('ni_descDet')?.value || '',
    impacts: document.getElementById('ni_impacts')?.value || '',
    causes: (document.getElementById('ni_causes')?.value || '')
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean),
    causeRacine: document.getElementById('ni_cr')?.value || '',
    actionsImmediates: parseActionRows('ni_imm_list'),
    actions: parseActionRows('ni_corr_list'),
    fichiers: (document.getElementById('ni_files')?.value || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    statut: 'Ouvert',
    step: 1,
  };
  addIncident(item);
  const first = getData()[0];
  window.env_inc_view = 'list';
  window.env_inc_sel = first?.id || null;
  window.env_inc_newStep = 1;
  window.env_inc_tab = 'info';
  envIncToast(`Incident ${first?.id || ''} déclaré`);
  refreshEnvIncidents();
}

export function renderEnvIncidents() {
  seedEnvIncidents();
  if (!bound) {
    bindEnvIncidents();
    bound = true;
  }

  window.envIncNewView = () => {
    window.env_inc_view = 'new';
    window.env_inc_newStep = 1;
    refreshEnvIncidents();
  };

  const f = window._envIncFilter || {};
  const rows = filtered();
  const D = getData();
  const countLabel =
    rows.length < D.length ? `${rows.length}/${D.length} incident(s)` : `${D.length} incident(s)`;

  const kpis = [
    ['siren', D.length, 'Total', '#fef2f2', '#dc2626'],
    ['alert', D.filter((i) => i.statut === 'Ouvert').length, 'Ouverts', '#fdf2f8', '#be185d'],
    ['refresh', D.filter((i) => i.statut === 'En cours').length, 'En cours', '#fffbeb', '#d97706'],
    ['check-circle', D.filter((i) => i.statut === 'Clôturé').length, 'Clôturés', '#f0fdf4', '#16a34a'],
  ];

  return `
  <div class="env-page" data-page="env-incidents">
    <div class="xm-register sec-sst-modern env-inc-register" data-env-inc-root>
      <div class="acc-layout">
        <div class="acc-left">
          <header class="acc-hero env-inc-hero">
            <div class="acc-hero-inner">
              <div>
                <h2>${renderIcon('siren', { size: 20 })} Incidents environnementaux</h2>
                <p>Déclaration · Analyse · Actions · Validation ISO 14001</p>
              </div>
              <div class="acc-hero-actions">
                <button type="button" class="btn bsm bp" style="background:${ENV_GREEN};border-color:${ENV_GREEN}" data-env-new>+ Déclarer</button>
              </div>
            </div>
          </header>
          <div class="acc-kpi-strip">
            ${kpis
              .map(
                ([ic, v, l, bg, c]) =>
                  `<div class="acc-kpi-pill" style="background:${bg};color:${c}">
                    <div style="opacity:0.85;margin-bottom:2px">${renderIcon(ic, { size: 14 })}</div>
                    <div class="acc-kpi-pill-val">${v}</div>
                    <div class="acc-kpi-pill-lbl">${l}</div>
                  </div>`
              )
              .join('')}
          </div>
          <div class="acc-filters-modern">
            ${renderIcon('search', { size: 16 })}
            <input class="fi" data-env-inc-filter="q" placeholder="ID, zone, description…" value="${esc(f.q || '')}" style="flex:1;min-width:140px">
            <select class="sel" data-env-inc-filter="statut">
              <option value="">Tous statuts</option>
              ${INC_STATUTS.map((s) => `<option value="${s}"${f.statut === s ? ' selected' : ''}>${s}</option>`).join('')}
            </select>
            <select class="sel" data-env-inc-filter="gravite">
              <option value="">Toutes gravités</option>
              ${INC_GRAVITES.map((g) => `<option value="${g}"${f.gravite === g ? ' selected' : ''}>${g}</option>`).join('')}
            </select>
            <select class="sel" data-env-inc-filter="type">
              <option value="">Tous types</option>
              ${INC_TYPES.map((t) => `<option value="${t}"${f.type === t ? ' selected' : ''}>${t}</option>`).join('')}
            </select>
            <button type="button" class="btn bsm" data-env-inc-clear>Effacer</button>
            <span class="reg-meta" style="margin-left:auto">${esc(countLabel)}</span>
          </div>
          <div class="acc-list-scroll">${buildTimeline(rows)}</div>
        </div>
        <div class="acc-right" id="env_inc_right">${buildRightPanel()}</div>
      </div>
    </div>
  </div>`;
}

function bindEnvIncidents() {
  document.addEventListener('click', (e) => {
    const root = e.target.closest('[data-page="env-incidents"]');
    if (!root) return;

    const sel = e.target.closest('[data-env-select]');
    if (sel) {
      window.env_inc_sel = sel.dataset.envSelect;
      window.env_inc_view = 'list';
      window.env_inc_tab = 'info';
      refreshEnvIncidents();
      return;
    }

    if (e.target.closest('[data-env-new]')) {
      window.envIncNewView?.();
      return;
    }

    if (e.target.closest('[data-env-cancel-new]')) {
      window.env_inc_view = 'list';
      window.env_inc_newStep = 1;
      refreshEnvIncidents();
      return;
    }

    const nstep = e.target.closest('[data-env-new-step]');
    if (nstep) {
      window.env_inc_newStep = +nstep.dataset.envNewStep;
      refreshEnvIncidents();
      return;
    }

    if (e.target.closest('[data-env-save-new]')) {
      saveNewIncident();
      return;
    }

    if (e.target.closest('[data-env-add-imm-row]')) {
      const list = document.getElementById('ni_imm_list');
      if (list) {
        const div = document.createElement('div');
        div.className = 'acc-action-row';
        div.innerHTML = `<input class="fi" placeholder="Action"><input class="fi" value="HSE"><input class="fi" placeholder="JJ/MM/AAAA">`;
        list.appendChild(div);
      }
      return;
    }

    if (e.target.closest('[data-env-add-corr-row]')) {
      const list = document.getElementById('ni_corr_list');
      if (list) {
        const div = document.createElement('div');
        div.className = 'acc-action-row';
        div.innerHTML = `<input class="fi" placeholder="Action"><input class="fi" value="HSE"><input class="fi" placeholder="JJ/MM/AAAA">`;
        list.appendChild(div);
      }
      return;
    }

    const tab = e.target.closest('[data-env-tab]');
    if (tab) {
      window.env_inc_tab = tab.dataset.envTab;
      refreshEnvIncidents();
      return;
    }

    const wf = e.target.closest('[data-env-wf-step]');
    if (wf) {
      const inc = getData().find((x) => x.id === wf.dataset.envId);
      if (!inc) return;
      const step = +wf.dataset.envWfStep;
      updateIncident(inc.id, {
        step,
        ...(step === 5 ? { statut: 'Clôturé' } : {}),
        ...(step >= 3 && inc.statut === 'Ouvert' ? { statut: 'En cours' } : {}),
      });
      envIncToast(step === 5 ? 'Incident clôturé' : 'Étape mise à jour');
      refreshEnvIncidents();
      return;
    }

    const closeAct = e.target.closest('[data-env-close-action]');
    if (closeAct) {
      const inc = getData().find((x) => x.id === closeAct.dataset.envId);
      const idx = +closeAct.dataset.envActionIdx;
      const kind = closeAct.dataset.envCloseAction;
      if (inc) {
        const list = kind === 'imm' ? inc.actionsImmediates : inc.actions;
        if (list?.[idx]) {
          list[idx].statut = 'Clôturé';
          updateIncident(inc.id, { [kind === 'imm' ? 'actionsImmediates' : 'actions']: list });
          envIncToast('Action clôturée');
          refreshEnvIncidents();
        }
      }
      return;
    }

    if (e.target.closest('[data-env-add-corr]')) {
      const id = e.target.closest('[data-env-add-corr]').dataset.envId;
      const inc = getData().find((x) => x.id === id);
      if (inc) {
        inc.actions = inc.actions || [];
        inc.actions.push({ titre: 'Nouvelle action', resp: 'HSE', delai: '', statut: 'Planifié' });
        updateIncident(id, { actions: inc.actions });
        window.env_inc_tab = 'actions';
        refreshEnvIncidents();
      }
      return;
    }

    const closeInc = e.target.closest('[data-env-close]');
    if (closeInc) {
      updateIncident(closeInc.dataset.envClose, { statut: 'Clôturé', step: 5 });
      envIncToast('Incident clôturé');
      refreshEnvIncidents();
      return;
    }

    const del = e.target.closest('[data-env-delete]');
    if (del && confirm(`Supprimer ${del.dataset.envDelete} ?`)) {
      deleteIncident(del.dataset.envDelete);
      if (window.env_inc_sel === del.dataset.envDelete) window.env_inc_sel = null;
      envIncToast('Incident supprimé', '#dc2626');
      refreshEnvIncidents();
      return;
    }

    if (e.target.closest('[data-env-inc-clear]')) {
      window._envIncFilter = {};
      refreshEnvIncidents();
      return;
    }

    const toast = e.target.closest('[data-env-toast]');
    if (toast) {
      const m = { draft: 'Brouillon sauvegardé', save: 'Dossier enregistré' };
      envIncToast(m[toast.dataset.envToast] || 'OK');
    }
  });

  document.addEventListener('input', (e) => {
    const fi = e.target.closest('[data-env-inc-filter="q"]');
    if (fi?.closest('[data-page="env-incidents"]')) {
      window._envIncFilter = { ...(window._envIncFilter || {}), q: fi.value };
      refreshEnvIncidents();
    }
  });

  document.addEventListener('change', (e) => {
    const fl = e.target.closest('[data-env-inc-filter]');
    if (fl?.closest('[data-page="env-incidents"]')) {
      window._envIncFilter = { ...(window._envIncFilter || {}), [fl.dataset.envIncFilter]: fl.value };
      refreshEnvIncidents();
    }
  });
}
