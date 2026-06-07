/**
 * Interactions module 5S — checklist, audits, actions, modèle.
 */
import {
  loadFivesStore,
  getFivesTemplate,
  getFivesAudit,
  addFivesAudit,
  saveZoneAuditResult,
  addTemplateRow,
  updateTemplateRow,
  removeTemplateRow,
  addFivesAction,
  updateFivesAction,
  deleteFivesAction,
  persistFivesStore,
} from '../../data/fives-store.js';
import { readResponsesFromDom } from './fives-checklist.js';
import { refreshFives } from './fives-utils.js';

function toast(msg, color = '#16a34a') {
  if (window.xmToast) window.xmToast(msg, '', '✓', color);
}

function openModal(title, body, footer = '') {
  const old = document.getElementById('fives-modal');
  if (old) old.remove();
  const el = document.createElement('div');
  el.id = 'fives-modal';
  el.innerHTML = `
  <div id="fives_modal_overlay" style="position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:9000;display:flex;align-items:center;justify-content:center;padding:16px">
    <div style="background:#fff;border-radius:12px;max-width:480px;width:100%;box-shadow:0 20px 50px rgba(0,0,0,.2);font-family:Inter,sans-serif">
      <div style="padding:14px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;font-weight:700">${title}</div>
      <div style="padding:16px">${body}</div>
      ${footer ? `<div style="padding:12px 16px;border-top:1px solid #e2e8f0;display:flex;gap:8px;justify-content:flex-end">${footer}</div>` : ''}
    </div>
  </div>`;
  document.body.appendChild(el);
}

function closeModal() {
  document.getElementById('fives-modal')?.remove();
}

export function fivesStartNewAudit() {
  openModal(
    'Nouvel audit 5S',
    `
    <div style="display:grid;gap:10px">
      <label style="font-size:10px;font-weight:600;color:#64748b">Date</label>
      <input id="f5m-date" class="fi" placeholder="jj/mm/aaaa">
      <label style="font-size:10px;font-weight:600;color:#64748b">Période (ex. Sem. 20)</label>
      <input id="f5m-period" class="fi" placeholder="Sem. 20">
      <label style="font-size:10px;font-weight:600;color:#64748b">Auditeur</label>
      <input id="f5m-auditor" class="fi" value="Responsable QHSE">
    </div>`,
    `<button type="button" class="btn" data-fives-modal-close>Annuler</button>
     <button type="button" class="btn bp" data-fives-create-audit>Créer et auditer</button>`
  );
  const d = new Date();
  document.getElementById('f5m-date').value = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

function fivesCreateAudit() {
  const date = document.getElementById('f5m-date')?.value;
  const period = document.getElementById('f5m-period')?.value;
  const auditor = document.getElementById('f5m-auditor')?.value;
  const audit = addFivesAudit({ date, period, auditor });
  window.fivesAuditId = audit.id;
  window.fivesZoneId = window.fivesZoneId || 'usin-cnc';
  closeModal();
  toast('Audit créé');
  if (typeof window.goPage === 'function') window.goPage('fives-audit');
  else refreshFives('fives-audit');
}

export function fivesSaveZoneAudit() {
  const auditId = window.fivesAuditId;
  const zoneId = window.fivesZoneId;
  if (!auditId || !zoneId) return;
  const template = getFivesTemplate();
  const responses = readResponsesFromDom(zoneId, template);
  const pointsForts = document.getElementById('f5-points-forts')?.value || '';
  const axes = document.getElementById('f5-axes')?.value || '';
  saveZoneAuditResult(auditId, zoneId, { responses, pointsForts, axes });
  toast('Zone enregistrée', '#2563eb');
  refreshFives('fives-audit');
}

export function fivesAddTemplateRow() {
  addTemplateRow();
  refreshFives('fives-checklist');
}

export function fivesAddAction() {
  openModal(
    'Nouvelle action 5S',
    `
    <div style="display:grid;gap:10px">
      <input id="f5a-action" class="fi" placeholder="Description de l'action">
      <input id="f5a-resp" class="fi" placeholder="Responsable">
      <input id="f5a-echeance" class="fi" placeholder="Échéance (jj/mm/aaaa)">
      <select id="f5a-prio" class="sel"><option>Moyenne</option><option>Haute</option><option>Basse</option></select>
    </div>`,
    `<button type="button" class="btn" data-fives-modal-close>Annuler</button>
     <button type="button" class="btn bp" data-fives-save-action>Nouvelle</button>`
  );
}

function fivesSaveNewAction() {
  addFivesAction({
    action: document.getElementById('f5a-action')?.value,
    resp: document.getElementById('f5a-resp')?.value,
    echeance: document.getElementById('f5a-echeance')?.value,
    prio: document.getElementById('f5a-prio')?.value,
    zoneId: window.fivesZoneId || '',
    auditId: window.fivesAuditId || '',
  });
  closeModal();
  toast('Action ajoutée');
  refreshFives('fives-actions');
}

let bound = false;

export function installFivesCrud() {
  loadFivesStore();
  if (bound) return;
  bound = true;

  window.fivesStartNewAudit = fivesStartNewAudit;
  window.fivesSaveZoneAudit = fivesSaveZoneAudit;
  window.fivesAddTemplateRow = fivesAddTemplateRow;
  window.fivesAddAction = fivesAddAction;

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-fives-start-audit]')) {
      fivesStartNewAudit();
      return;
    }
    if (e.target.closest('[data-fives-create-audit]')) {
      fivesCreateAudit();
      return;
    }
    if (e.target.closest('[data-fives-modal-close]') || e.target.id === 'fives_modal_overlay') {
      closeModal();
      return;
    }
    if (e.target.closest('[data-fives-save-zone]')) {
      fivesSaveZoneAudit();
      return;
    }
    if (e.target.closest('[data-fives-add-template-row]')) {
      fivesAddTemplateRow();
      return;
    }
    if (e.target.closest('[data-fives-add-action]')) {
      fivesAddAction();
      return;
    }
    if (e.target.closest('[data-fives-save-action]')) {
      fivesSaveNewAction();
      return;
    }
    const delRow = e.target.closest('[data-fives-del-row]');
    if (delRow) {
      if (confirm('Supprimer cette ligne de la checklist standard ?')) {
        removeTemplateRow(delRow.dataset.fivesDelRow);
        refreshFives('fives-checklist');
      }
      return;
    }
    const repBtn = e.target.closest('[data-fives-rep]');
    if (repBtn) {
      const itemId = repBtn.dataset.fivesItem;
      const zoneKey = repBtn.dataset.fivesZone || '';
      const rep = repBtn.dataset.fivesRep;
      const row = repBtn.closest('tr');
      row?.querySelectorAll('.fives-rep-btn').forEach((b) => b.classList.remove('active', 'c', 'nc'));
      if (repBtn.classList.contains('active')) {
        repBtn.classList.remove('active', rep === 'c' ? 'c' : 'nc');
        if (row) row.style.background = '';
      } else {
        repBtn.classList.add('active', rep === 'c' ? 'c' : 'nc');
        if (row) row.style.background = rep === 'c' ? '#f0fdf4' : '#fef2f2';
      }
      const kpiEl = document.querySelector('[data-fives-live-kpi]');
      if (kpiEl && zoneKey) {
        const template = getFivesTemplate();
        const responses = readResponsesFromDom(zoneKey, template);
        import('../../data/fives-store.js').then(({ calcZoneKpi, FIVES_KPI_GOAL }) => {
          const s = calcZoneKpi(responses);
          kpiEl.innerHTML = `<span style="font-weight:800;color:${s.kpi >= FIVES_KPI_GOAL ? '#16a34a' : '#f59e0b'}">${s.kpi}%</span> · ${s.conformes} C / ${s.nonConformes} NC`;
        });
      }
      return;
    }
    const zoneTab = e.target.closest('[data-fives-zone-tab]');
    if (zoneTab) {
      window.fivesZoneId = zoneTab.dataset.fivesZoneTab;
      refreshFives('fives-audit');
      return;
    }
    const auditRow = e.target.closest('[data-fives-audit-id]');
    if (auditRow && !e.target.closest('button')) {
      window.fivesAuditId = auditRow.dataset.fivesAuditId;
      window.fivesZoneId = window.fivesZoneId || 'usin-cnc';
      if (typeof window.goPage === 'function') window.goPage('fives-audit');
      return;
    }
  });

  document.addEventListener('change', (e) => {
    const pillarSel = e.target.closest('[data-fives-pillar-select]');
    if (pillarSel) {
      updateTemplateRow(pillarSel.dataset.fivesPillarSelect, { pillar: pillarSel.value });
      return;
    }
  });

  document.addEventListener('input', (e) => {
    const lbl = e.target.closest('[data-fives-label]');
    if (lbl) {
      updateTemplateRow(lbl.dataset.fivesLabel, { label: lbl.value });
      persistFivesStore();
    }
  });
}
