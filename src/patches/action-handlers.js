/**
 * Corrige les handlers d'actions (RC / NC / SEC / ENV) pour un rafraîchissement fiable.
 * Types alignés ISO 9001:2015 §10.2 — correctives / préventives facultatives.
 */
import { reloadPage } from '../core/page-refresh.js';
import { getTypesForStore } from '../components/qhse/action-types.js';

function typesForModal(store) {
  if (store === 'SEC_ACTIONS') {
    return ['Technique', 'Formation', 'Documentation', 'Inspection', 'Équipement', 'Exercice', 'Administratif'];
  }
  if (store === 'ENV_ACTIONS') {
    return ['Technique', 'Optimisation', 'Opérationnel', 'Formation', 'Audit', 'Documentation', 'Administratif'];
  }
  return getTypesForStore(store).map((t) => t.id);
}

function typesForEdit(store, currentType) {
  const base = typesForModal(store);
  if (currentType && !base.includes(currentType)) return [currentType, ...base];
  return base;
}

const ISO_HINT =
  '<p style="font-size:10px;color:#64748b;margin:0;line-height:1.4">Les actions correctives et préventives ne sont pas obligatoires (ISO 9001:2015 §10.2).</p>';

export function patchActionHandlers() {
  window.reloadPage = reloadPage;

  window.changeStatut = function changeStatut(store, id, newStatut, page) {
    const arr = window[store];
    const item = arr?.find((a) => a.id === id);
    if (item) {
      item.statut = newStatut;
      if (newStatut === 'Clôturée') item.prog = 100;
      if (newStatut === 'À faire') item.prog = 0;
    }
    reloadPage(page);
  };

  window.deleteAction = function deleteAction(store, id, page) {
    const arr = window[store];
    const idx = arr?.findIndex((a) => a.id === id) ?? -1;
    if (idx >= 0) arr.splice(idx, 1);
    reloadPage(page);
  };

  window.showAddActionModal = function showAddActionModal(store, page) {
    const overlay = document.createElement('div');
    overlay.id = 'act-modal';
    overlay.style.cssText =
      'position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9999;display:flex;align-items:center;justify-content:center;font-family:Inter,sans-serif';
    const refs =
      store === 'RC_ACTIONS'
        ? (window.RC_DATA || []).map((r) => r.n)
        : store === 'NC_ACTIONS'
          ? (window.NC_DATA || []).map((r) => r.n)
          : ['Risque', 'Accident', 'Checklist', 'Plan urgence'];
    const types = typesForModal(store);
    const resps = ['KORTAS.A', 'M. Karim', 'Y. Reda', 'A. Ali', 'S. Yassine', 'HSE', 'RH'];
    const isoNote = store === 'RC_ACTIONS' || store === 'NC_ACTIONS' ? ISO_HINT : '';
    overlay.innerHTML = `<div style="background:#fff;border-radius:14px;width:520px;max-width:96vw;box-shadow:0 20px 60px rgba(0,0,0,.2);overflow:hidden">
    <div style="background:var(--navy);padding:16px 20px;display:flex;align-items:center;justify-content:space-between">
      <div style="font-size:13px;font-weight:700;color:#fff">➕ Nouvelle action</div>
      <button onclick="document.getElementById('act-modal').remove()" style="background:none;border:none;color:rgba(255,255,255,.7);cursor:pointer;font-size:18px;line-height:1">✕</button>
    </div>
    <div style="padding:20px;display:flex;flex-direction:column;gap:12px">
      ${isoNote}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div style="grid-column:1/-1"><label style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Action <span style="color:var(--red)">*</span></label><input id="na-action" class="fi" placeholder="Titre de l'action…"></div>
        <div><label style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Type d'action</label><select id="na-type" class="fi">${types.map((t) => `<option>${t}</option>`).join('')}</select></div>
        <div><label style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Référence</label><select id="na-ref" class="fi"><option value="">—</option>${refs.map((r) => `<option>${r}</option>`).join('')}</select></div>
        <div><label style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Responsable</label><select id="na-resp" class="fi">${resps.map((r) => `<option>${r}</option>`).join('')}</select></div>
        <div><label style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Priorité</label><select id="na-prio" class="fi"><option>Haute</option><option>Critique</option><option>Normale</option></select></div>
        <div><label style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Date fin prévue</label><input id="na-fin" class="fi" type="date" value="2026-05-31"></div>
        <div style="grid-column:1/-1"><label style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Description</label><textarea id="na-desc" class="fi" placeholder="Détails de l'action…" style="min-height:60px"></textarea></div>
      </div>
      <div style="display:flex;justify-content:flex-end;gap:8px;padding-top:8px;border-top:1px solid var(--border)">
        <button onclick="document.getElementById('act-modal').remove()" class="btn">Annuler</button>
        <button class="btn bp" onclick="confirmAddAction('${store}','${page}')">✓ Ajouter l'action</button>
      </div>
    </div>
  </div>`;
    document.body.appendChild(overlay);
    document.getElementById('na-action')?.focus();
  };

  window.openEditAction = function openEditAction(id) {
    const stores = ['RC_ACTIONS', 'NC_ACTIONS', 'SEC_ACTIONS', 'ENV_ACTIONS'];
    let item = null;
    let store = null;
    let page = null;
    const storePageMap = {
      RC_ACTIONS: 'rc-actions',
      NC_ACTIONS: 'nc-actions',
      SEC_ACTIONS: 'sec-actions',
      ENV_ACTIONS: 'env-actions',
    };
    for (const s of stores) {
      const arr = window[s];
      if (arr) {
        const found = arr.find((a) => a.id === id);
        if (found) {
          item = found;
          store = s;
          page = storePageMap[s];
          break;
        }
      }
    }
    if (!item) return;
    const overlay = document.createElement('div');
    overlay.id = 'edit-modal';
    overlay.style.cssText =
      'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9999;display:flex;align-items:center;justify-content:center;font-family:Inter,sans-serif;backdrop-filter:blur(2px)';
    const types = typesForEdit(store, item.type);
    const resps = ['KORTAS.A', 'M. Karim', 'Y. Reda', 'A. Ali', 'S. Yassine', 'HSE', 'RH', 'Maintenance', 'Logistique'];
    const prios = ['Critique', 'Haute', 'Normale'];
    const statuts = ['À faire', 'En cours', 'En retard', 'Clôturée'];
    overlay.innerHTML = `<div style="background:#fff;border-radius:14px;width:540px;max-width:96vw;box-shadow:0 24px 64px rgba(0,0,0,.22);overflow:hidden;animation:slideUp .2s ease">
    <div style="background:linear-gradient(135deg,#1e3a8a,#1e40af);padding:16px 20px;display:flex;align-items:center;justify-content:space-between">
      <div>
        <div style="font-size:13px;font-weight:700;color:#fff">✏ Modifier l'action</div>
        <div style="font-size:10px;color:rgba(255,255,255,.6);margin-top:2px">ID #${item.id} · ${item.ref || '—'}</div>
      </div>
      <button onclick="document.getElementById('edit-modal').remove()" style="background:rgba(255,255,255,.15);border:none;color:#fff;cursor:pointer;font-size:16px;line-height:1;border-radius:6px;padding:5px 8px">✕</button>
    </div>
    <div style="padding:20px;display:flex;flex-direction:column;gap:12px;max-height:75vh;overflow-y:auto">
      <div>
        <label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Action *</label>
        <input id="ea-action" class="fi" value="${String(item.action).replace(/"/g, '&quot;')}">
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div>
          <label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Type d'action</label>
          <select id="ea-type" class="fi">${types.map((t) => `<option${t === item.type ? ' selected' : ''}>${t}</option>`).join('')}</select>
        </div>
        <div>
          <label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Priorité</label>
          <select id="ea-prio" class="fi">${prios.map((p) => `<option${p === item.prio ? ' selected' : ''}>${p}</option>`).join('')}</select>
        </div>
        <div>
          <label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Responsable</label>
          <select id="ea-resp" class="fi">${resps.map((r) => `<option${r === item.resp ? ' selected' : ''}>${r}</option>`).join('')}</select>
        </div>
        <div>
          <label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Statut</label>
          <select id="ea-statut" class="fi">${statuts.map((s) => `<option${s === item.statut ? ' selected' : ''}>${s}</option>`).join('')}</select>
        </div>
        <div>
          <label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Date fin</label>
          <input id="ea-fin" class="fi" type="text" placeholder="JJ/MM/AA" value="${item.fin || ''}">
        </div>
        <div>
          <label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Progression</label>
          <div style="display:flex;align-items:center;gap:8px">
            <input id="ea-prog" type="range" min="0" max="100" value="${item.prog}" style="flex:1;accent-color:#2563eb" oninput="document.getElementById('ea-prog-val').textContent=this.value+'%'">
            <span id="ea-prog-val" style="font-size:11px;font-weight:700;color:#1e40af;min-width:32px">${item.prog}%</span>
          </div>
        </div>
      </div>
      <div>
        <label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Description</label>
        <textarea id="ea-desc" class="fi" style="min-height:70px">${item.desc || ''}</textarea>
      </div>
    </div>
    <div style="padding:14px 20px;border-top:1px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center">
      <button onclick="deleteAction('${store}',${item.id},'${page}');document.getElementById('edit-modal').remove()"
        style="font-size:10.5px;color:#dc2626;background:#fef2f2;border:1px solid #fecaca;border-radius:7px;padding:6px 12px;cursor:pointer;font-family:'Inter',sans-serif">🗑 Supprimer</button>
      <div style="display:flex;gap:8px">
        <button onclick="document.getElementById('edit-modal').remove()" class="btn">Annuler</button>
        <button onclick="saveEditAction('${store}',${item.id},'${page}')"
          style="background:linear-gradient(135deg,#1e40af,#2563eb);color:#fff;border:none;border-radius:8px;padding:7px 18px;font-size:11px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;box-shadow:0 2px 8px rgba(37,99,235,.35)">
          ✓ Enregistrer
        </button>
      </div>
    </div>
  </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
    document.getElementById('ea-action')?.focus();
  };

  window.confirmAddAction = function confirmAddAction(store, page) {
    const action = document.getElementById('na-action')?.value?.trim();
    if (!action) {
      document.getElementById('na-action').style.borderColor = 'var(--red)';
      return;
    }
    const arr = window[store];
    if (!arr) return;
    const newId = Math.max(...arr.map((a) => a.id), 0) + 1;
    const finRaw = document.getElementById('na-fin')?.value;
    const finFmt = finRaw ? `${finRaw.slice(8)}/${finRaw.slice(5, 7)}` : '—';
    arr.unshift({
      id: newId,
      action,
      type: document.getElementById('na-type').value,
      ref: document.getElementById('na-ref')?.value || '—',
      resp: document.getElementById('na-resp').value,
      prio: document.getElementById('na-prio').value,
      fin: finFmt,
      statut: 'À faire',
      prog: 0,
      source: document.getElementById('na-ref')?.value || '—',
      desc: document.getElementById('na-desc')?.value || '',
    });
    document.getElementById('act-modal')?.remove();
    reloadPage(page);
  };

  window.saveEditAction = function saveEditAction(store, id, page) {
    const arr = window[store];
    const item = arr?.find((a) => a.id === id);
    if (!item) return;
    const action = document.getElementById('ea-action')?.value?.trim();
    if (!action) {
      document.getElementById('ea-action').style.borderColor = 'var(--red)';
      return;
    }
    item.action = action;
    item.type = document.getElementById('ea-type').value;
    item.prio = document.getElementById('ea-prio').value;
    item.resp = document.getElementById('ea-resp').value;
    item.statut = document.getElementById('ea-statut').value;
    item.fin = document.getElementById('ea-fin').value;
    item.prog = parseInt(document.getElementById('ea-prog').value, 10) || 0;
    item.desc = document.getElementById('ea-desc').value;
    if (item.statut === 'Clôturée') item.prog = 100;
    document.getElementById('edit-modal')?.remove();
    reloadPage(page);
  };
}
