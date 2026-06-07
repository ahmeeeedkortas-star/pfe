/**
 * Registre accidents & incidents — workflow 5 étapes, 5 Pourquoi, actions (UI moderne).
 */
import { seedSstAccidents } from '../../data/sst-accidents.data.js';
import { renderIcon } from '../../components/icons/icon-render.js';
import {
  esc,
  fmtDate,
  graviteStyle,
  statutBadgeClass,
  refreshAccidents,
  accToast,
  ACC_STEPS,
  DEPTS,
} from '../../components/sst/acc-utils.js';

function exportAccidentsCsv() {
  const header = 'ID;Type;Date;Heure;Employé;Département;Blessure;Gravité;Arrêt;Jours;Statut';
  const lines = window.acc_data.map((a) =>
    [a.id, a.type, a.date, a.heure, a.employe, a.dept, a.blessure, a.gravite, a.arret, a.jours, a.statut]
      .map((x) => `"${String(x).replace(/"/g, '""')}"`)
      .join(';')
  );
  const blob = new Blob(['\ufeff' + [header, ...lines].join('\n')], { type: 'text/csv;charset=utf-8' });
  const el = document.createElement('a');
  el.href = URL.createObjectURL(blob);
  el.download = `accidents-${new Date().toISOString().slice(0, 10)}.csv`;
  el.click();
  URL.revokeObjectURL(el.href);
}

function buildAccWorkflowBar(a) {
  const step = a.step || 1;
  return `<div class="acc-wf-timeline">${ACC_STEPS.map((lbl, i) => {
    const n = i + 1;
    const done = n < step;
    const active = n === step;
    return `<div class="acc-wf-step${done ? ' is-done' : ''}${active ? ' is-active' : ''}" data-acc-wf-step="${n}" data-acc-id="${esc(a.id)}" style="cursor:pointer">
      <div class="acc-wf-step-dot">${done ? '✓' : n}</div>
      <div class="acc-wf-step-lbl">${esc(lbl)}</div>
    </div>`;
  }).join('')}</div>`;
}

let bound = false;

function filteredAccidents() {
  const f = window._accFilter || {};
  const q = (f.q || '').toLowerCase();
  return window.acc_data.filter((a) => {
    if (f.stat && a.statut !== f.stat) return false;
    if (f.grav && a.gravite !== f.grav) return false;
    if (f.dept && a.dept !== f.dept) return false;
    if (
      q &&
      !a.employe.toLowerCase().includes(q) &&
      !a.id.toLowerCase().includes(q) &&
      !a.blessure.toLowerCase().includes(q) &&
      !a.dept.toLowerCase().includes(q)
    )
      return false;
    return true;
  });
}

function buildAccTimeline(rows) {
  const sel = window.acc_sel;
  if (!rows.length) {
    return `<div class="acc-empty-state">${renderIcon('alert', { size: 40 })}<p>Aucun dossier ne correspond aux filtres.</p></div>`;
  }
  return `<div class="acc-timeline">${rows
    .map((a, i) => {
      const gc = graviteStyle(a.gravite);
      const sc = statutBadgeClass(a.statut);
      const isSel = a.id === sel;
      return `<div class="acc-timeline-item" style="animation-delay:${Math.min(i * 0.05, 0.35)}s">
        <div class="acc-timeline-dot" style="color:${gc.tc}"></div>
        <article class="acc-incident-card${isSel ? ' is-selected' : ''}" data-acc-select="${esc(a.id)}">
          <div class="acc-incident-head">
            <span class="acc-incident-id">${esc(a.id)}</span>
            <span class="acc-grav-badge" style="background:${gc.bg};color:${gc.tc};border:1px solid ${gc.bc}">${esc(a.gravite)}</span>
          </div>
          <h3 class="acc-incident-emp">${esc(a.employe)}</h3>
          <div class="acc-incident-meta">
            <span>${fmtDate(a.date)} · ${esc(a.heure)}</span>
            <span>${esc(a.dept)}</span>
            <span>${esc(a.blessure)}</span>
          </div>
          <div class="acc-incident-tags">
            <span class="badge ${a.type === 'Accident' ? 'br' : 'bb'}">${esc(a.type)}</span>
            <span class="badge ${sc}">${esc(a.statut)}</span>
            ${a.arret === 'Oui' ? `<span class="badge br">${a.jours}j arrêt</span>` : ''}
          </div>
        </article>
      </div>`;
    })
    .join('')}</div>`;
}

function buildNewForm() {
  const ns = window.acc_newStep || 1;
  const stepLabels = ['Informations', 'Analyse des causes', 'Actions correctives', 'Pièces jointes'];
  const stepBar = stepLabels
    .map((l, i) => {
      const n = i + 1;
      const done = n < ns;
      const active = n === ns;
      const line = i > 0 ? `<div style="flex:1;height:3px;background:${done ? 'var(--blue)' : '#e5e7eb'};margin-top:12px"></div>` : '';
      return (
        line +
        `<div style="display:flex;flex-direction:column;align-items:center">
          <div class="reg-step-dot" data-acc-new-step="${n}" style="background:${done || active ? 'var(--blue)' : '#e5e7eb'};color:#fff;border-color:var(--blue)">${done ? '✓' : n}</div>
          <div class="reg-step-lbl" style="color:${active ? 'var(--blue)' : 'var(--muted)'};font-weight:${active ? '700' : '400'}">${l}</div>
        </div>`
      );
    })
    .join('');

  let body = '';
  if (ns === 1) {
    body = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div class="fg"><label class="fl">Employé *</label><input class="fi" id="na_emp" placeholder="Nom complet"></div>
      <div class="fg"><label class="fl">Matricule</label><input class="fi" id="na_mat" placeholder="OP-CN-2209"></div>
      <div class="fg"><label class="fl">Département *</label><select class="fi" id="na_dept">${DEPTS.map((d) => `<option>${esc(d)}</option>`).join('')}</select></div>
      <div class="fg"><label class="fl">Fonction</label><input class="fi" id="na_fonc" placeholder="Opérateur CN"></div>
      <div class="fg"><label class="fl">Type *</label><select class="fi" id="na_type"><option>Accident de travail</option><option>Incident</option><option>Presque-accident</option></select></div>
      <div class="fg"><label class="fl">Gravité *</label><select class="fi" id="na_grav"><option>Légère</option><option>Moyenne</option><option>Grave</option><option>Mortelle</option></select></div>
      <div class="fg"><label class="fl">Date *</label><input class="fi" type="date" id="na_date" value="${new Date().toISOString().split('T')[0]}"></div>
      <div class="fg"><label class="fl">Heure</label><input class="fi" type="time" id="na_heure" value="08:00"></div>
      <div class="fg"><label class="fl">Avec arrêt?</label><select class="fi" id="na_arret"><option value="Non">Non</option><option value="Oui">Oui</option></select></div>
      <div class="fg"><label class="fl">Jours perdus</label><input class="fi" type="number" id="na_jours" value="0" min="0"></div>
      <div class="fg" style="grid-column:1/-1"><label class="fl">Lieu *</label><input class="fi" id="na_lieu" placeholder="Atelier Usinage, Poste CN05"></div>
      <div class="fg" style="grid-column:1/-1"><label class="fl">Type blessure *</label><input class="fi" id="na_blessure" placeholder="Coupure main gauche"></div>
      <div class="fg" style="grid-column:1/-1"><label class="fl">Description *</label><textarea class="fi" rows="4" id="na_desc" placeholder="Déroulement de l'événement…"></textarea></div>
      <div class="fg"><label class="fl">Témoins</label><input class="fi" id="na_temoins"></div>
      <div class="fg"><label class="fl">Premiers soins</label><select class="fi" id="na_soins"><option>Non</option><option>Oui — sur site</option><option>Hospitalisation</option></select></div>
    </div>`;
  } else if (ns === 2) {
    body = `<p class="reg-meta" style="margin-bottom:12px">Méthode des 5 Pourquoi — identifier la cause racine</p>
    ${[1, 2, 3, 4].map((i) => `<div class="fg" style="margin-bottom:10px"><label class="fl">Pourquoi ${i}${i === 1 ? ' *' : ''}</label><input class="fi" id="na_p${i}" placeholder="Pourquoi ${i}…"></div>`).join('')}
    <div class="fg"><label class="fl" style="color:var(--red)">Cause racine *</label><textarea class="fi" rows="3" id="na_cr" placeholder="Cause profonde…"></textarea></div>`;
  } else if (ns === 3) {
    body = `<p class="reg-meta" style="margin-bottom:12px">Actions correctives (au moins une)</p>
    <div id="na_actions_list">
      <div class="acc-action-row"><input class="fi" value="Installer protection machine CN" placeholder="Action"><input class="fi" value="HSE" placeholder="Resp."><input class="fi" type="date" value="2025-05-31"></div>
      <div class="acc-action-row"><input class="fi" value="Former opérateurs à la consignation" placeholder="Action"><input class="fi" value="RH + HSE" placeholder="Resp."><input class="fi" type="date" value="2025-06-15"></div>
    </div>
    <button type="button" class="btn bsm" data-acc-add-action-row style="width:100%;margin-top:8px">+ Ajouter une action</button>`;
  } else {
    body = `<div style="border:2px dashed var(--border);border-radius:10px;padding:24px;text-align:center;background:#fafbfc;margin-bottom:14px">
      <div style="font-size:32px;margin-bottom:10px">📎</div>
      <div style="font-weight:600;margin-bottom:6px">Pièces jointes</div>
      <div class="reg-meta">Photos, rapport médical, témoignages (JPG, PDF)</div>
      <button type="button" class="btn bsm" style="margin-top:12px">Parcourir</button>
    </div>
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:9px;padding:12px;text-align:center;font-weight:600;color:#065f46">Dossier prêt à être enregistré</div>`;
  }

  return `
    <div class="reg-panel-head">
      <div>
        <div class="reg-panel-title">Déclarer un accident / incident</div>
        <div class="reg-meta">Étape ${ns}/${stepLabels.length} — ${stepLabels[ns - 1]}</div>
      </div>
      <button type="button" class="btn bsm" data-acc-cancel-new>✕</button>
    </div>
    <div class="reg-step-bar">${stepBar}</div>
    <div class="reg-panel-body">${body}</div>
    <div style="padding:12px 18px;border-top:1px solid var(--border);display:flex;gap:8px">
      ${ns > 1 ? `<button type="button" class="btn bsm" data-acc-new-step="${ns - 1}">← Précédent</button>` : '<span></span>'}
      <div style="flex:1"></div>
      ${ns < 4 ? `<button type="button" class="btn bsm bp" data-acc-new-step="${ns + 1}">Suivant : ${stepLabels[ns]} →</button>` : `<button type="button" class="btn bsm bg2" data-acc-save-new>Enregistrer la déclaration</button>`}
    </div>`;
}

function buildRightPanel() {
  if (window.acc_view === 'new') return buildNewForm();
  if (!window.acc_sel) {
    return `<div class="acc-empty-state" style="padding:64px 24px">
      ${renderIcon('alert', { size: 48 })}
      <div class="reg-panel-title" style="margin-top:12px">Sélectionner un dossier</div>
      <div class="reg-meta" style="max-width:320px;margin:8px auto 20px">Choisissez un incident dans la timeline pour consulter causes, actions, analyses et pièces jointes.</div>
      <button type="button" class="btn bp" data-acc-new>+ Déclarer un accident</button>
    </div>`;
  }
  const a = window.acc_data.find((x) => x.id === window.acc_sel);
  if (!a) return '';
  const gc = graviteStyle(a.gravite);
  const step = a.step || 1;
  const tab = window.acc_detailTab || 'info';

  const tabs = [
    ['info', 'Informations'],
    ['causes', 'Analyse 5P'],
    ['actions', 'Actions'],
    ['files', 'Fichiers'],
  ];
  const tabBar = tabs
    .map(
      ([t, l]) =>
        `<div class="reg-tab${tab === t ? ' active' : ''}" data-acc-tab="${t}">${l}</div>`
    )
    .join('');

  let tabContent = '';
  if (tab === 'info') {
    tabContent = `
      <div class="acc-section-card">
        <h4>${renderIcon('users', { size: 16 })} Personnes concernées</h4>
        ${[
          ['Employé', a.employe],
          ['Matricule', a.matricule],
          ['Fonction', a.fonction],
          ['Ancienneté', a.anciennete],
          ['Département', a.dept],
          ['Témoins', a.temoins],
        ]
          .map(
            ([k, v]) =>
              `<div class="drow" style="padding:5px 0"><span class="dk">${k}</span><span style="font-weight:600;font-size:12px">${esc(v)}</span></div>`
          )
          .join('')}
      </div>
      <div class="acc-section-card">
        <h4>${renderIcon('clipboard', { size: 16 })} Circonstances</h4>
        ${[
          ['Date & Heure', `${fmtDate(a.date)} — ${a.heure}`],
          ['Lieu', a.lieu],
          ['Blessure', a.blessure],
          ['Gravité', a.gravite],
          ['Avec arrêt', a.arret === 'Oui' ? `Oui — ${a.jours} jour(s)` : a.arret],
          ['Premiers soins', a.soins],
        ]
          .map(
            ([k, v]) =>
              `<div class="drow" style="padding:5px 0"><span class="dk">${k}</span><span style="font-weight:600;font-size:12px">${esc(v)}</span></div>`
          )
          .join('')}
        <div style="margin-top:10px;padding:12px;background:#fff;border-radius:8px;border:1px solid #e2e8f0">
          <div class="fl" style="margin-bottom:6px">Description</div>
          <div style="font-size:12px;line-height:1.55">${esc(a.desc)}</div>
        </div>
      </div>`;
  } else if (tab === 'causes') {
    tabContent = `
      <div class="acc-section-card">
      <h4>${renderIcon('zap', { size: 16 })} Analyse — 5 Pourquoi</h4>
      ${a.pourquoi
        .map(
          (p, i) =>
            `<div class="pourquoi-block${i === a.pourquoi.length - 1 ? ' last' : ''}">
              <div class="fl" style="margin-bottom:4px;color:${i === a.pourquoi.length - 1 ? 'var(--red)' : 'var(--blue)'}">Pourquoi ${i + 1}</div>
              <div style="font-weight:500">${esc(p)}</div>
            </div>`
        )
        .join('')}
      <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:9px;padding:12px;margin-top:8px">
        <div class="fl" style="color:var(--red);margin-bottom:6px">Cause racine</div>
        <div style="font-weight:600;color:#991b1b;font-size:12px">${esc(a.causeRacine)}</div>
      </div>
      </div>`;
  } else if (tab === 'actions') {
    tabContent = `<div class="acc-section-card"><h4>${renderIcon('zap', { size: 16 })} Actions correctives</h4>` +
      a.actions
        .map(
          (act, i) => `
        <div class="acc-action-card">
          <div style="display:flex;justify-content:space-between;gap:8px;margin-bottom:8px">
            <span style="font-weight:600;flex:1">${esc(act.titre)}</span>
            <span class="badge ${act.statut === 'Clôturé' ? 'bg3' : act.statut === 'En cours' ? 'bb' : 'bgr'}">${esc(act.statut)}</span>
          </div>
          <div class="reg-meta" style="display:flex;justify-content:space-between;margin-bottom:8px"><span>${esc(act.resp)}</span><span>${fmtDate(act.delai)}</span></div>
          ${act.statut !== 'Clôturé' ? `<button type="button" class="btn bsm" style="width:100%;background:#f0fdf4;border-color:#bbf7d0;color:var(--green)" data-acc-close-action="${i}">Marquer clôturé</button>` : '<div style="text-align:center;color:var(--green);font-weight:600;font-size:12px">✓ Action clôturée</div>'}
        </div>`
        )
        .join('') + `</div><button type="button" class="btn bsm bp" data-acc-add-action style="width:100%">+ Ajouter une action</button>`;
  } else {
    tabContent = `
      <div class="acc-section-card">
        <h4>${renderIcon('file', { size: 16 })} Documents et preuves</h4>
        <div style="border:2px dashed #e2e8f0;border-radius:10px;padding:22px;text-align:center;background:#fafbfc;margin-bottom:12px">
          ${renderIcon('file', { size: 32 })}
          <div style="font-weight:600;margin-top:8px">Déposer vos fichiers</div>
          <div class="reg-meta" style="margin-top:6px">Photos, rapports, témoignages</div>
        </div>
      ${[
        ['photo_accident.jpg', 'Photo', '120 Ko', 'chart'],
        ['rapport_medical.pdf', 'Rapport', '240 Ko', 'file'],
      ]
        .map(
          ([n, t, s, ic]) =>
            `<div class="acc-file-card">
            ${renderIcon(ic, { size: 22 })}
            <div style="flex:1"><div style="font-weight:500">${esc(n)}</div><div class="reg-meta">${esc(t)} · ${esc(s)}</div></div>
            <button type="button" class="btn bsm">Voir</button>
          </div>`
        )
        .join('')}
      </div>`;
  }

  const isClosed = a.statut === 'Clôturé';
  const wfNav = !isClosed
    ? `<div style="padding:10px 18px;border-bottom:1px solid var(--border);display:flex;gap:8px">
        <button type="button" class="btn bsm" data-acc-wf-step="${Math.max(1, step - 1)}" data-acc-id="${esc(a.id)}" ${step <= 1 ? 'disabled' : ''}>← Précédent</button>
        <div style="flex:1"></div>
        ${step < 5 ? `<button type="button" class="btn bsm bp" data-acc-wf-step="${step + 1}" data-acc-id="${esc(a.id)}">${step === 4 ? 'Valider & clôturer →' : `Étape : ${ACC_STEPS[step]} →`}</button>` : ''}
      </div>`
    : `<div style="padding:10px 18px;background:#f0fdf4;border-bottom:1px solid #bbf7d0;text-align:center;font-weight:600;color:var(--green)">Dossier clôturé — <button type="button" class="btn bsm" data-acc-wf-step="3" data-acc-id="${esc(a.id)}" style="margin-left:6px">Rouvrir</button></div>`;

  return `
    <div class="reg-panel-head">
      <div>
        <div class="reg-panel-title">${esc(a.id)} — ${esc(a.employe)}</div>
        <div class="reg-meta">${esc(a.dept)} · ${fmtDate(a.date)} · ${esc(a.heure)}</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <span class="niv-pill" style="background:${gc.bg};color:${gc.tc};border:1px solid ${gc.bc}">${esc(a.gravite)}</span>
        <span class="badge ${statutBadgeClass(a.statut)}">${esc(a.statut)}</span>
        <button type="button" class="btn bsm" style="color:var(--red);border-color:#fecaca" data-acc-delete="${esc(a.id)}">Supprimer</button>
      </div>
    </div>
    ${buildAccWorkflowBar(a)}
    ${wfNav}
    <div class="reg-tabs">${tabBar}</div>
    <div class="reg-panel-body">${tabContent}</div>
    <div style="padding:12px 18px;border-top:1px solid var(--border);display:flex;gap:8px;position:sticky;bottom:0;background:var(--white)">
      <button type="button" class="btn bsm" style="flex:1" data-acc-toast="draft">Brouillon</button>
      <button type="button" class="btn bsm bp" style="flex:1" data-acc-toast="save">Enregistrer</button>
      <button type="button" class="btn bsm" style="flex:1;background:#fef2f2;color:var(--red);border-color:#fecaca" data-acc-toast="pdf">PDF</button>
    </div>`;
}

export function renderSecAccidents() {
  seedSstAccidents();
  const f = window._accFilter || {};
  const rows = filteredAccidents();
  const totalAcc = window.acc_data.filter((a) => a.type === 'Accident').length;
  const avecArret = window.acc_data.filter((a) => a.arret === 'Oui').length;
  const joursTotal = window.acc_data.reduce((s, a) => s + (+a.jours || 0), 0);
  const incidents = window.acc_data.filter((a) => a.type === 'Incident').length;
  const countLabel =
    rows.length < window.acc_data.length
      ? `${rows.length}/${window.acc_data.length} dossier(s)`
      : `${window.acc_data.length} dossier(s)`;

  if (!bound) {
    bindSecAccidents();
    bound = true;
  }

  window.accRefresh = refreshAccidents;
  window.accNewView = () => {
    window.acc_view = 'new';
    window.acc_newStep = 1;
    refreshAccidents();
  };

  const kpis = [
    ['alert', totalAcc, 'Accidents', '#fef2f2', '#dc2626'],
    ['zap', incidents, 'Incidents', '#fff7ed', '#ea580c'],
    ['calendar', avecArret, 'Avec arrêt', '#fef2f2', '#b91c1c'],
    ['chart', joursTotal, 'Jours perdus', '#fff7ed', '#c2410c'],
    ['chart', '2.45', 'TF', '#eff6ff', '#2563eb'],
    ['hardhat', window.jsaDays ?? 12, 'Jours sans AT', '#f0fdf4', '#16a34a'],
  ];

  return `
  <div class="xm-register sec-sst-modern" data-page="sec-accidents">
    <div class="acc-layout">
      <div class="acc-left">
        <header class="acc-hero">
          <div class="acc-hero-inner">
            <div>
              <h2>${renderIcon('alert', { size: 20 })} Accidents & incidents</h2>
              <p>Enquêtes · 5 Pourquoi · Actions correctives</p>
            </div>
            <div class="acc-hero-actions">
              <button type="button" class="btn bsm bp" data-acc-new>+ Déclarer</button>
              <button type="button" class="btn bsm" data-acc-export>Export CSV</button>
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
          <input class="fi" data-acc-filter="q" placeholder="Employé, dossier, blessure…" value="${esc(f.q || '')}" style="flex:1;min-width:140px">
          <select class="sel" data-acc-filter="stat">
            <option value="">Tous statuts</option>
            ${['Ouvert', 'En cours', 'Clôturé'].map((s) => `<option value="${s}"${f.stat === s ? ' selected' : ''}>${s}</option>`).join('')}
          </select>
          <select class="sel" data-acc-filter="grav">
            <option value="">Toutes gravités</option>
            ${['Légère', 'Moyenne', 'Grave', 'Mortelle'].map((g) => `<option value="${g}"${f.grav === g ? ' selected' : ''}>${g}</option>`).join('')}
          </select>
          <select class="sel" data-acc-filter="dept">
            <option value="">Tous départements</option>
            ${DEPTS.map((d) => `<option value="${d}"${f.dept === d ? ' selected' : ''}>${d}</option>`).join('')}
          </select>
          <button type="button" class="btn bsm" data-acc-clear-filter>Effacer</button>
          <span class="reg-meta" id="acc_cnt" style="margin-left:auto">${esc(countLabel)}</span>
        </div>
        <div class="acc-list-scroll">${buildAccTimeline(rows)}</div>
      </div>
      <div class="acc-right" id="acc_right">${buildRightPanel()}</div>
    </div>
  </div>`;
}

function bindSecAccidents() {
  document.addEventListener('click', (e) => {
    const root = e.target.closest('[data-page="sec-accidents"]');
    if (!root) return;

    const sel = e.target.closest('[data-acc-select]');
    if (sel) {
      window.acc_sel = sel.dataset.accSelect;
      window.acc_view = 'list';
      window.acc_detailTab = 'info';
      refreshAccidents();
      return;
    }

    if (e.target.closest('[data-acc-new]')) {
      window.accNewView?.();
      return;
    }

    if (e.target.closest('[data-acc-cancel-new]')) {
      window.acc_view = 'list';
      window.acc_newStep = 1;
      refreshAccidents();
      return;
    }

    const nstep = e.target.closest('[data-acc-new-step]');
    if (nstep) {
      window.acc_newStep = +nstep.dataset.accNewStep;
      refreshAccidents();
      return;
    }

    if (e.target.closest('[data-acc-save-new]')) {
      saveNewAccident();
      return;
    }

    if (e.target.closest('[data-acc-add-action-row]')) {
      const list = document.getElementById('na_actions_list');
      if (list) {
        const div = document.createElement('div');
        div.className = 'acc-action-row';
        div.innerHTML = `<input class="fi" placeholder="Action"><input class="fi" placeholder="Resp."><input class="fi" type="date" value="${new Date().toISOString().split('T')[0]}">`;
        list.appendChild(div);
      }
      return;
    }

    const tab = e.target.closest('[data-acc-tab]');
    if (tab) {
      window.acc_detailTab = tab.dataset.accTab;
      refreshAccidents();
      return;
    }

    const wf = e.target.closest('[data-acc-wf-step]');
    if (wf) {
      const a = window.acc_data.find((x) => x.id === wf.dataset.accId);
      if (!a) return;
      const step = +wf.dataset.accWfStep;
      a.step = step;
      if (step === 5) {
        a.statut = 'Clôturé';
        accToast(`Dossier ${a.id} clôturé`, '#16a34a');
      } else if (step >= 3 && a.statut === 'Ouvert') a.statut = 'En cours';
      refreshAccidents();
      return;
    }

    const closeAct = e.target.closest('[data-acc-close-action]');
    if (closeAct && window.acc_sel) {
      const a = window.acc_data.find((x) => x.id === window.acc_sel);
      const idx = +closeAct.dataset.accCloseAction;
      if (a?.actions[idx]) {
        a.actions[idx].statut = 'Clôturé';
        accToast('Action clôturée', '#16a34a');
        refreshAccidents();
      }
      return;
    }

    if (e.target.closest('[data-acc-add-action]') && window.acc_sel) {
      const a = window.acc_data.find((x) => x.id === window.acc_sel);
      if (a) {
        a.actions.push({
          titre: 'Nouvelle action',
          resp: 'HSE',
          delai: new Date().toISOString().split('T')[0],
          statut: 'Planifié',
        });
        window.acc_detailTab = 'actions';
        accToast('Action ajoutée', '#2563eb');
        refreshAccidents();
      }
      return;
    }

    const del = e.target.closest('[data-acc-delete]');
    if (del && confirm(`Supprimer le dossier ${del.dataset.accDelete} ?`)) {
      window.acc_data = window.acc_data.filter((x) => x.id !== del.dataset.accDelete);
      window.acc_sel = null;
      accToast('Dossier supprimé', '#dc2626');
      refreshAccidents();
      return;
    }

    if (e.target.closest('[data-acc-export]')) {
      exportAccidentsCsv();
      accToast('Export CSV téléchargé', '#16a34a');
      return;
    }

    const toast = e.target.closest('[data-acc-toast]');
    if (toast) {
      const m = {
        draft: ['Brouillon sauvegardé', '#6b7a99'],
        save: ['Dossier enregistré', '#16a34a'],
        pdf: ['Rapport PDF généré', '#16a34a'],
      };
      const [msg, c] = m[toast.dataset.accToast] || ['OK', '#2563eb'];
      accToast(msg, c);
      return;
    }

    if (e.target.closest('[data-acc-clear-filter]')) {
      window._accFilter = { q: '', stat: '', grav: '', dept: '' };
      refreshAccidents();
    }
  });

  document.addEventListener('change', (e) => {
    if (!e.target.closest('[data-page="sec-accidents"]')) return;
    const fl = e.target.closest('[data-acc-filter]');
    if (fl) {
      window._accFilter = window._accFilter || {};
      window._accFilter[fl.dataset.accFilter] = fl.value;
      refreshAccidents();
    }
  });
}

function saveNewAccident() {
  const emp = (document.getElementById('na_emp')?.value || '').trim() || 'Employé';
  const typeRaw = document.getElementById('na_type')?.value || 'Accident de travail';
  const year = new Date().getFullYear();
  const prefix = typeRaw === 'Accident de travail' ? 'A' : 'I';
  const nb = String(
    window.acc_data.filter((a) => a.id.startsWith(`${prefix}-${year}`)).length + 1
  ).padStart(3, '0');
  const newId = `${prefix}-${year}-${nb}`;
  const pourquoi = [1, 2, 3, 4].map((i) => document.getElementById(`na_p${i}`)?.value || '').filter(Boolean);

  window.acc_data.unshift({
    id: newId,
    type: typeRaw === 'Accident de travail' ? 'Accident' : 'Incident',
    date: document.getElementById('na_date')?.value || new Date().toISOString().split('T')[0],
    heure: document.getElementById('na_heure')?.value || '08:00',
    employe: emp,
    matricule: document.getElementById('na_mat')?.value || '—',
    fonction: document.getElementById('na_fonc')?.value || '—',
    anciennete: '—',
    dept: document.getElementById('na_dept')?.value || 'Usinage',
    lieu: document.getElementById('na_lieu')?.value || '—',
    blessure: document.getElementById('na_blessure')?.value || '—',
    gravite: document.getElementById('na_grav')?.value || 'Légère',
    arret: document.getElementById('na_arret')?.value || 'Non',
    jours: +(document.getElementById('na_jours')?.value || 0),
    temoins: document.getElementById('na_temoins')?.value || '—',
    soins: document.getElementById('na_soins')?.value || 'Non',
    desc: document.getElementById('na_desc')?.value || '—',
    pourquoi: pourquoi.length ? pourquoi : ['À compléter'],
    causeRacine: document.getElementById('na_cr')?.value || '—',
    actions: [{ titre: 'Action à définir', resp: 'HSE', delai: new Date().toISOString().split('T')[0], statut: 'Planifié' }],
    statut: 'Ouvert',
    step: 1,
  });
  window.acc_view = 'list';
  window.acc_sel = newId;
  window.acc_newStep = 1;
  window.acc_detailTab = 'info';
  accToast(`Dossier ${newId} créé`, '#16a34a');
  refreshAccidents();
}
