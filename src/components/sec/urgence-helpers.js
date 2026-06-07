/**
 * CRUD plans d'urgence SST — modales et rafraîchissement page.
 */
import { seedUrgenceData } from '../../data/sec-urgence.data.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function refreshUrgence() {
  if (typeof window.reloadPage === 'function') window.reloadPage('sec-urgence');
  else if (typeof window.goPage === 'function') window.goPage('sec-urgence');
}

function urgLbl(label, input) {
  return `<div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;display:block;margin-bottom:4px">${esc(label)}</label>${input}</div>`;
}

function urgInp(id, val, type = 'text') {
  return `<input id="${id}" class="fi" value="${esc(val)}" type="${type}">`;
}

function urgSel(id, opts, cur) {
  return `<select id="${id}" class="fi">${opts.map((o) => `<option${o === cur ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select>`;
}

function urgTa(id, val) {
  return `<textarea id="${id}" class="fi" style="min-height:60px">${esc(val)}</textarea>`;
}

function urgG2(items) {
  return `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">${items
    .map(([l, inp, full]) => `<div${full ? ' style="grid-column:1/-1"' : ''}>${urgLbl(l, inp)}</div>`)
    .join('')}</div>`;
}

export function urgModal(title, body, onSave, onDelete) {
  document.getElementById('urg-modal')?.remove();
  const o = document.createElement('div');
  o.id = 'urg-modal';
  o.style.cssText =
    'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9999;display:flex;align-items:center;justify-content:center;font-family:var(--font);backdrop-filter:blur(2px)';
  const wrap = document.createElement('div');
  wrap.innerHTML = `<div style="background:#fff;border-radius:14px;width:540px;max-width:96vw;box-shadow:0 24px 64px rgba(0,0,0,.22);overflow:hidden">
    <div style="background:linear-gradient(135deg,#7f1d1d,#dc2626);padding:14px 18px;display:flex;justify-content:space-between;align-items:center">
      <div style="font-size:13px;font-weight:700;color:#fff">${esc(title)}</div>
      <button type="button" data-urg-close style="background:rgba(255,255,255,.15);border:none;color:#fff;cursor:pointer;font-size:16px;border-radius:6px;padding:3px 8px">✕</button>
    </div>
    <div style="padding:18px;max-height:65vh;overflow-y:auto">${body}</div>
    <div style="padding:12px 18px;border-top:1px solid #f1f5f9;display:flex;justify-content:flex-end;gap:8px;flex-wrap:wrap">
      ${onDelete ? '<button type="button" data-urg-delete style="font-size:10.5px;color:#dc2626;background:#fef2f2;border:1px solid #fecaca;border-radius:7px;padding:6px 12px;cursor:pointer;margin-right:auto">🗑 Supprimer</button>' : ''}
      <button type="button" data-urg-close class="btn">Annuler</button>
      <button type="button" data-urg-save style="background:linear-gradient(135deg,#7f1d1d,#dc2626);color:#fff;border:none;border-radius:8px;padding:7px 18px;font-size:11px;font-weight:700;cursor:pointer">✓ Enregistrer</button>
    </div>
  </div>`;
  o.appendChild(wrap.firstElementChild);
  document.body.appendChild(o);
  o.querySelectorAll('[data-urg-close]').forEach((b) => b.addEventListener('click', () => o.remove()));
  o.addEventListener('click', (e) => {
    if (e.target === o) o.remove();
  });
  o.querySelector('[data-urg-save]')?.addEventListener('click', () => {
    onSave();
    o.remove();
  });
  if (onDelete) {
    o.querySelector('[data-urg-delete]')?.addEventListener('click', () => {
      onDelete();
      o.remove();
    });
  }
}

function nextId(arr) {
  return arr.length ? Math.max(...arr.map((x) => x.id)) + 1 : 1;
}

const PLAN_TYPES = ['Incendie', 'Évacuation', 'Chimique', 'Séisme', 'Électrique'];
const PLAN_STATUTS = ['Validé', 'En révision', 'Brouillon'];

function collectUrgProcedures() {
  return [...document.querySelectorAll('.urg-proc-inp')]
    .map((i) => i.value.trim())
    .filter(Boolean);
}

function collectUrgEquipements() {
  return [...document.querySelectorAll('.urg-equip-row')]
    .map((row) => {
      const inputs = row.querySelectorAll('input');
      const nom = inputs[0]?.value?.trim();
      const etat = inputs[1]?.value?.trim();
      return nom ? [nom, etat || '—'] : null;
    })
    .filter(Boolean);
}

function urgProcEquipHtml(p) {
  const procs = (p?.procedures?.length ? p.procedures : ['']).map(
    (t) =>
      `<div style="display:flex;gap:6px;margin-bottom:6px"><input class="fi urg-proc-inp" style="flex:1" value="${esc(t)}"><button type="button" class="btn bsm" data-urg-rm-proc>✕</button></div>`
  );
  const equips = (p?.equipements?.length ? p.equipements : [['', '']]).map(
    ([nom, etat]) =>
      `<div class="urg-equip-row" style="display:grid;grid-template-columns:1fr 1fr auto;gap:6px;margin-bottom:6px">
      <input class="fi" placeholder="Équipement" value="${esc(nom || '')}">
      <input class="fi" placeholder="État / emplacement" value="${esc(etat || '')}">
      <button type="button" class="btn bsm" data-urg-rm-equip>✕</button></div>`
  );
  return `<div style="margin-top:14px;padding-top:12px;border-top:1px solid #f1f5f9">
    <div style="font-size:10px;font-weight:700;color:#64748b;margin-bottom:8px">PROCÉDURES (étapes ordonnées)</div>
    <div id="urg-proc-list">${procs.join('')}</div>
    <button type="button" class="btn bsm" data-urg-add-proc style="margin-bottom:12px">+ Ajouter une étape</button>
    <div style="font-size:10px;font-weight:700;color:#64748b;margin-bottom:8px">ÉQUIPEMENTS D'URGENCE</div>
    <div id="urg-equip-list">${equips.join('')}</div>
    <button type="button" class="btn bsm" data-urg-add-equip>+ Ajouter un équipement</button>
  </div>`;
}

function bindUrgPlanModalExtras(modalRoot) {
  modalRoot.addEventListener('click', (e) => {
    if (e.target.closest('[data-urg-add-proc]')) {
      const list = modalRoot.querySelector('#urg-proc-list');
      const d = document.createElement('div');
      d.style.cssText = 'display:flex;gap:6px;margin-bottom:6px';
      d.innerHTML = `<input class="fi urg-proc-inp" style="flex:1" placeholder="Étape…"><button type="button" class="btn bsm" data-urg-rm-proc>✕</button>`;
      list?.appendChild(d);
    }
    if (e.target.closest('[data-urg-rm-proc]')) e.target.closest('div')?.remove();
    if (e.target.closest('[data-urg-add-equip]')) {
      const list = modalRoot.querySelector('#urg-equip-list');
      const d = document.createElement('div');
      d.className = 'urg-equip-row';
      d.style.cssText = 'display:grid;grid-template-columns:1fr 1fr auto;gap:6px;margin-bottom:6px';
      d.innerHTML = `<input class="fi" placeholder="Équipement"><input class="fi" placeholder="État"><button type="button" class="btn bsm" data-urg-rm-equip>✕</button>`;
      list?.appendChild(d);
    }
    if (e.target.closest('[data-urg-rm-equip]')) e.target.closest('.urg-equip-row')?.remove();
  });
}

/** Modal plan 4 sections (alias spec urgPlanModal). */
export function urgPlanModal(title, plan, isNew, onSave, onDelete) {
  const p = plan || {};
  const body =
    urgG2([
      ['Code', urgInp('up-code', p.code || 'PU-NEW-01'), false],
      ['Titre', urgInp('up-titre', p.titre || ''), true],
      ['Type', urgSel('up-type', PLAN_TYPES, p.type || 'Incendie'), false],
      ['Responsable', urgInp('up-resp', p.responsable || 'HSE'), false],
      ['Version', urgInp('up-ver', p.version || 'V1'), false],
      ['Date', urgInp('up-date', p.date || new Date().toLocaleDateString('fr-FR')), false],
      ['Statut', urgSel('up-stat', PLAN_STATUTS, p.statut || 'Brouillon'), false],
      ['Approbateur', urgInp('up-appr', p.approbateur || '—'), false],
      ['Objectif', urgTa('up-obj', p.objectif || ''), true],
      ['Champ application', urgTa('up-champ', p.champ || ''), true],
    ]) + urgProcEquipHtml(p);

  document.getElementById('urg-modal')?.remove();
  const o = document.createElement('div');
  o.id = 'urg-modal';
  o.style.cssText =
    'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9999;display:flex;align-items:center;justify-content:center;font-family:var(--font);backdrop-filter:blur(2px)';
  const wrap = document.createElement('div');
  wrap.innerHTML = `<div style="background:#fff;border-radius:14px;width:780px;max-width:96vw;box-shadow:0 24px 64px rgba(0,0,0,.22);overflow:hidden">
    <div style="background:linear-gradient(135deg,#7f1d1d,#dc2626);padding:14px 18px;display:flex;justify-content:space-between;align-items:center">
      <div style="font-size:13px;font-weight:700;color:#fff">${esc(title)}</div>
      <button type="button" data-urg-close style="background:rgba(255,255,255,.15);border:none;color:#fff;cursor:pointer;font-size:16px;border-radius:6px;padding:3px 8px">✕</button>
    </div>
    <div style="padding:18px;max-height:70vh;overflow-y:auto">${body}</div>
    <div style="padding:12px 18px;border-top:1px solid #f1f5f9;display:flex;justify-content:flex-end;gap:8px;flex-wrap:wrap">
      ${onDelete ? '<button type="button" data-urg-delete style="font-size:10.5px;color:#dc2626;background:#fef2f2;border:1px solid #fecaca;border-radius:7px;padding:6px 12px;cursor:pointer;margin-right:auto">Supprimer</button>' : ''}
      <button type="button" data-urg-close class="btn">Annuler</button>
      <button type="button" data-urg-save style="background:linear-gradient(135deg,#7f1d1d,#dc2626);color:#fff;border:none;border-radius:8px;padding:7px 18px;font-size:11px;font-weight:700;cursor:pointer">Enregistrer</button>
    </div>
  </div>`;
  o.appendChild(wrap.firstElementChild);
  document.body.appendChild(o);
  bindUrgPlanModalExtras(o);
  o.querySelectorAll('[data-urg-close]').forEach((b) => b.addEventListener('click', () => o.remove()));
  o.addEventListener('click', (e) => {
    if (e.target === o) o.remove();
  });
  o.querySelector('[data-urg-save]')?.addEventListener('click', () => {
    onSave();
    o.remove();
    if (document.getElementById('up-stat')?.value === 'Validé') {
      window.confettiBurst?.(window.innerWidth / 2, window.innerHeight / 3, 24);
    }
  });
  if (onDelete) {
    o.querySelector('[data-urg-delete]')?.addEventListener('click', () => {
      onDelete();
      o.remove();
    });
  }
}

export function urgViewPlan(id) {
  seedUrgenceData();
  window.urgSelectedPlan = id;
  window.urgTab = 0;
  refreshUrgence();
}

function readPlanForm() {
  return {
    code: document.getElementById('up-code')?.value,
    titre: document.getElementById('up-titre')?.value,
    type: document.getElementById('up-type')?.value,
    responsable: document.getElementById('up-resp')?.value,
    version: document.getElementById('up-ver')?.value,
    date: document.getElementById('up-date')?.value,
    statut: document.getElementById('up-stat')?.value,
    approbateur: document.getElementById('up-appr')?.value,
    objectif: document.getElementById('up-obj')?.value,
    champ: document.getElementById('up-champ')?.value,
    procedures: collectUrgProcedures(),
    equipements: collectUrgEquipements(),
  };
}

export function urgAddPlan() {
  seedUrgenceData();
  urgPlanModal("+ Nouveau plan d'urgence", {}, true, () => {
    const id = nextId(window.URG_PLANS);
    window.URG_PLANS.push({ id, ...readPlanForm() });
    window.urgSelectedPlan = id;
    window.xmToast?.('Plan créé', readPlanForm().procedures.length + ' procédures', 'check-circle', '#dc2626');
    refreshUrgence();
  });
}

export function urgEditPlan(id) {
  seedUrgenceData();
  const p = window.URG_PLANS.find((x) => x.id === id);
  if (!p) return;
  urgPlanModal('Modifier — ' + p.code, p, false, () => {
    Object.assign(p, readPlanForm());
    window.xmToast?.('Plan modifié', '', 'check-circle', '#dc2626');
    refreshUrgence();
  }, () => urgDelPlan(id));
}

export function urgDelPlan(id) {
  if (!confirm('Supprimer ce plan ?')) return;
  const idx = window.URG_PLANS.findIndex((x) => x.id === id);
  if (idx >= 0) window.URG_PLANS.splice(idx, 1);
  if (window.urgSelectedPlan === id) {
    window.urgSelectedPlan = window.URG_PLANS[0]?.id ?? null;
  }
  window.xmToast?.('Plan supprimé', '', '🗑', '#dc2626');
  refreshUrgence();
}

export function urgAddExercice() {
  seedUrgenceData();
  urgModal(
    '+ Nouvel exercice',
    urgG2([
      ['Nom', urgInp('ue-nom', ''), true],
      ['Type', urgSel('ue-type', ['Incendie', 'Évacuation', 'SST / PRAP', 'Multi-risques'], 'Incendie'), false],
      ['Date', urgInp('ue-date', ''), false],
      ['Responsable', urgInp('ue-resp', 'HSE'), false],
      ['Participants', urgInp('ue-part', '0', 'number'), false],
      ['Statut', urgSel('ue-stat', ['Planifié', 'Réalisé'], 'Planifié'), false],
    ]),
    () => {
      window.URG_EXERCICES.push({
        id: nextId(window.URG_EXERCICES),
        nom: document.getElementById('ue-nom').value,
        type: document.getElementById('ue-type').value,
        date: document.getElementById('ue-date').value,
        resp: document.getElementById('ue-resp').value,
        participants: parseInt(document.getElementById('ue-part').value, 10) || 0,
        statut: document.getElementById('ue-stat').value,
        resultat: '—',
        duree: '',
        obs: '',
      });
      window.xmToast?.('Exercice ajouté', '', '📅', '#dc2626');
      window.urgTab = 1;
      refreshUrgence();
    }
  );
}

export function urgEditExercice(id) {
  seedUrgenceData();
  const e = window.URG_EXERCICES.find((x) => x.id === id);
  if (!e) return;
  urgModal(
    'Modifier exercice',
    urgG2([
      ['Nom', urgInp('ue-nom', e.nom), true],
      ['Type', urgSel('ue-type', ['Incendie', 'Évacuation', 'SST / PRAP', 'Multi-risques'], e.type), false],
      ['Date', urgInp('ue-date', e.date), false],
      ['Responsable', urgInp('ue-resp', e.resp), false],
      ['Participants', urgInp('ue-part', String(e.participants), 'number'), false],
      ['Statut', urgSel('ue-stat', ['Planifié', 'Réalisé'], e.statut), false],
      ['Résultat', urgInp('ue-res', e.resultat), false],
    ]),
    () => {
      Object.assign(e, {
        nom: document.getElementById('ue-nom').value,
        type: document.getElementById('ue-type').value,
        date: document.getElementById('ue-date').value,
        resp: document.getElementById('ue-resp').value,
        participants: parseInt(document.getElementById('ue-part').value, 10) || 0,
        statut: document.getElementById('ue-stat').value,
        resultat: document.getElementById('ue-res').value,
      });
      window.xmToast?.('Exercice modifié', '', '✏', '#dc2626');
      refreshUrgence();
    },
    () => {
      const i = window.URG_EXERCICES.findIndex((x) => x.id === id);
      if (i >= 0) window.URG_EXERCICES.splice(i, 1);
      window.xmToast?.('Exercice supprimé', '', '🗑', '#dc2626');
      refreshUrgence();
    }
  );
}

export function urgEditContact(id) {
  seedUrgenceData();
  const isNew = !id;
  const c = isNew ? { nom: '', num: '', cat: 'Interne', ic: '📞' } : window.URG_CONTACTS.find((x) => x.id === id);
  if (!c && !isNew) return;
  urgModal(
    isNew ? '+ Contact urgence' : 'Modifier contact',
    urgG2([
      ['Nom', urgInp('uc-nom', c?.nom || ''), true],
      ['Numéro', urgInp('uc-num', c?.num || ''), false],
      ['Catégorie', urgSel('uc-cat', ['Urgence national', 'Interne', 'Externe', 'Médical'], c?.cat || 'Interne'), false],
    ]),
    () => {
      const row = {
        nom: document.getElementById('uc-nom').value,
        num: document.getElementById('uc-num').value,
        cat: document.getElementById('uc-cat').value,
        ic: c?.ic || '📞',
      };
      if (isNew) {
        window.URG_CONTACTS.push({ id: nextId(window.URG_CONTACTS), ...row });
      } else {
        Object.assign(c, row);
      }
      window.xmToast?.('Contact enregistré', '', '📞', '#dc2626');
      window.urgTab = 2;
      refreshUrgence();
    },
    isNew
      ? null
      : () => {
          const i = window.URG_CONTACTS.findIndex((x) => x.id === id);
          if (i >= 0) window.URG_CONTACTS.splice(i, 1);
          window.xmToast?.('Contact supprimé', '', '🗑', '#dc2626');
          refreshUrgence();
        }
  );
}

export function installUrgenceHelpers() {
  seedUrgenceData();
  Object.assign(window, {
    urgModal,
    urgPlanModal,
    urgViewPlan,
    urgAddPlan,
    urgEditPlan,
    urgDelPlan,
    urgAddExercice,
    urgEditExercice,
    urgEditContact,
  });
}
