/**
 * CRUD audits — modales add/edit (sans script inline dans le HTML).
 */
import { seedAudits } from '../../data/audits.data.js';
import { esc, auditToast, refreshAuditListe, getAudits } from './audit-utils.js';

const TYPES = ['Interne', 'ISO 9001', 'Sécurité', 'Environnement', 'Fournisseur'];
const STATUTS = ['Planifié', 'En cours', 'Clôturé'];
const PRIOS = ['Haute', 'Normale', 'Basse'];

function nextAuditId(D) {
  const n = D.length + 1;
  return 'AUD-' + String(n).padStart(3, '0');
}

function nextRef(D) {
  const nums = D.map((a) => parseInt(String(a.ref).replace(/\D/g, ''), 10)).filter((x) => !Number.isNaN(x));
  const max = nums.length ? Math.max(...nums) : 0;
  return 'A' + String(max + 1).padStart(2, '0');
}

function auditModalHtml(a) {
  const isEdit = !!a;
  return `<div id="audit_modal_overlay" class="xm-modal-overlay" data-audit-modal>
    <div class="xm-modal-card" style="max-width:560px">
      <div class="ch"><span class="ct">${isEdit ? 'Modifier l\'audit' : 'Nouvel audit'}</span>
        <button type="button" class="btn bsm" data-audit-modal-close>✕</button>
      </div>
      <div class="fgrid">
        <div class="fg"><label class="fl">Référence</label><input class="fi" id="aud_f_ref" value="${esc(a?.ref || '')}"></div>
        <div class="fg"><label class="fl">Type</label><select class="fi" id="aud_f_type">${TYPES.map((t) => `<option${a?.type === t ? ' selected' : ''}>${t}</option>`).join('')}</select></div>
        <div class="fg"><label class="fl">Département</label><input class="fi" id="aud_f_dep" value="${esc(a?.dep || '')}"></div>
        <div class="fg"><label class="fl">Auditeur</label><input class="fi" id="aud_f_aud" value="${esc(a?.aud || '')}"></div>
        <div class="fg"><label class="fl">Date début</label><input class="fi" type="date" id="aud_f_date" value="${esc(a?.date || '')}"></div>
        <div class="fg"><label class="fl">Date fin</label><input class="fi" type="date" id="aud_f_datefin" value="${esc(a?.dateFin || '')}"></div>
        <div class="fg"><label class="fl">Statut</label><select class="fi" id="aud_f_statut">${STATUTS.map((s) => `<option${a?.statut === s ? ' selected' : ''}>${s}</option>`).join('')}</select></div>
        <div class="fg"><label class="fl">Priorité</label><select class="fi" id="aud_f_prio">${PRIOS.map((p) => `<option${a?.priorite === p ? ' selected' : ''}>${p}</option>`).join('')}</select></div>
        <div class="fg"><label class="fl">Périodicité</label><input class="fi" id="aud_f_per" value="${esc(a?.periodicite || 'Annuelle')}"></div>
        <div class="fg"><label class="fl">Périmètre</label><input class="fi" id="aud_f_scope" value="${esc(a?.scope || '')}"></div>
        <div class="fg"><label class="fl">Score (%)</label><input class="fi" type="number" min="0" max="100" id="aud_f_score" value="${a?.score ?? ''}" placeholder="—"></div>
        <div class="fg"><label class="fl">Avancement (%)</label><input class="fi" type="number" min="0" max="100" id="aud_f_prog" value="${a?.prog ?? 0}"></div>
        <div class="fg"><label class="fl">Écarts</label><input class="fi" type="number" min="0" id="aud_f_ecarts" value="${a?.ecarts ?? 0}"></div>
        <div class="fg full"><label class="fl">Observations</label><textarea class="fi" id="aud_f_obs" rows="2">${esc(a?.obs || '')}</textarea></div>
        <div class="fg full"><label class="fl">Actions (une par ligne)</label><textarea class="fi" id="aud_f_actions" rows="3">${esc((a?.actions || []).join('\n'))}</textarea></div>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:14px;padding-top:12px;border-top:1px solid var(--border)">
        ${isEdit ? `<button type="button" class="btn bsm" style="color:var(--red)" data-audit-delete="${esc(a.id)}">Supprimer</button>` : '<span></span>'}
        <div style="display:flex;gap:8px">
          <button type="button" class="btn bsm" data-audit-modal-close>Annuler</button>
          <button type="button" class="btn bsm bp" data-audit-save="${esc(a?.id || '')}">Enregistrer</button>
        </div>
      </div>
    </div>
  </div>`;
}

function readAuditForm() {
  const sc = document.getElementById('aud_f_score')?.value;
  const actions = document
    .getElementById('aud_f_actions')
    ?.value?.split('\n')
    .map((x) => x.trim())
    .filter(Boolean);
  return {
    ref: document.getElementById('aud_f_ref')?.value?.trim(),
    type: document.getElementById('aud_f_type')?.value,
    dep: document.getElementById('aud_f_dep')?.value?.trim(),
    aud: document.getElementById('aud_f_aud')?.value?.trim(),
    date: document.getElementById('aud_f_date')?.value || '',
    dateFin: document.getElementById('aud_f_datefin')?.value || null,
    statut: document.getElementById('aud_f_statut')?.value,
    priorite: document.getElementById('aud_f_prio')?.value,
    periodicite: document.getElementById('aud_f_per')?.value?.trim(),
    scope: document.getElementById('aud_f_scope')?.value?.trim(),
    score: sc === '' || sc == null ? null : +sc,
    prog: +document.getElementById('aud_f_prog')?.value || 0,
    ecarts: +document.getElementById('aud_f_ecarts')?.value || 0,
    obs: document.getElementById('aud_f_obs')?.value?.trim() || '',
    actions: actions || [],
    resp: document.getElementById('aud_f_aud')?.value?.trim() || '—',
  };
}

function closeAuditModal() {
  document.getElementById('audit_modal_overlay')?.remove();
}

function openAuditModal(preset = {}) {
  seedAudits();
  const D = getAudits();
  document.body.insertAdjacentHTML('beforeend', auditModalHtml(null));
  const refEl = document.getElementById('aud_f_ref');
  if (refEl && !refEl.value) refEl.value = preset.ref ?? nextRef(D);
  if (preset.statut) document.getElementById('aud_f_statut').value = preset.statut;
  if (preset.prog != null) document.getElementById('aud_f_prog').value = String(preset.prog);
  if (preset.score === null || preset.score === '') {
    const sc = document.getElementById('aud_f_score');
    if (sc) sc.value = '';
  }
}

export function auditAdd() {
  openAuditModal({ statut: 'En cours', prog: 0 });
}

/** Planifier un audit (statut Planifié par défaut). */
export function auditPlan() {
  openAuditModal({ statut: 'Planifié', prog: 0, score: null });
}

export function auditEdit(id) {
  seedAudits();
  const a = getAudits().find((x) => x.id === id);
  if (!a) return;
  document.body.insertAdjacentHTML('beforeend', auditModalHtml(a));
}

export function auditView(id) {
  window.auditSelected = id;
  refreshAuditListe();
}

export function bindAuditCrud() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-audit-add]')) {
      auditAdd();
      return;
    }
    if (e.target.closest('[data-audit-plan]')) {
      auditPlan();
      return;
    }
    const ed = e.target.closest('[data-audit-edit]');
    if (ed) {
      auditEdit(ed.dataset.auditEdit);
      return;
    }
    if (e.target.closest('[data-audit-modal-close]') || e.target.id === 'audit_modal_overlay') {
      closeAuditModal();
      return;
    }
    const save = e.target.closest('[data-audit-save]');
    if (save) {
      const data = readAuditForm();
      const D = getAudits();
      const id = save.dataset.auditSave;
      if (id) {
        const a = D.find((x) => x.id === id);
        if (a) Object.assign(a, data);
        auditToast('Audit mis à jour', '#16a34a');
        window.auditSelected = id;
      } else {
        const nid = nextAuditId(D);
        D.push({ id: nid, ...data });
        window.auditSelected = nid;
        auditToast('Audit créé', '#16a34a');
      }
      closeAuditModal();
      refreshAuditListe();
      return;
    }
    const del = e.target.closest('[data-audit-delete]');
    if (del && confirm('Supprimer cet audit ?')) {
      window.AUDITS_DATA = getAudits().filter((a) => a.id !== del.dataset.auditDelete);
      window.auditSelected = window.AUDITS_DATA[0]?.id;
      closeAuditModal();
      auditToast('Audit supprimé', '#dc2626');
      refreshAuditListe();
    }
  });
}

let crudBound = false;
export function installAuditCrud() {
  seedAudits();
  if (!crudBound) {
    bindAuditCrud();
    crudBound = true;
  }
  window.auditAdd = auditAdd;
  window.auditPlan = auditPlan;
  window.auditEdit = auditEdit;
  window.auditView = auditView;
}
