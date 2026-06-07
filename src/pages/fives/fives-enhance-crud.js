/**
 * 5S — formulaires avec listes dynamiques.
 */
import {
  renderXmDynamicSelect,
  bindXmDynamicFields,
  readXmDynamicSelect,
  getDynamicList,
} from '../../core/dynamic-lists.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function ss5ModalLite(title, body, saveFn, deleteFn) {
  const old = document.getElementById('ss5-modal');
  if (old) old.remove();
  const ov = document.createElement('div');
  ov.id = 'ss5-modal';
  ov.className = 'xm-modal-overlay';
  const delBtn = deleteFn
    ? `<button type="button" class="btn btn-danger" onclick="${deleteFn}">Supprimer</button>`
    : '<span></span>';
  ov.innerHTML = `<div class="xm-modal xm-modal--wide">
    <div class="xm-modal__head"><span class="xm-modal__title">${title}</span>
      <button type="button" class="xm-modal__close" onclick="document.getElementById('ss5-modal').remove()">✕</button></div>
    <div class="xm-modal__body">${body}</div>
    <div class="xm-modal__foot">${delBtn}
      <div style="display:flex;gap:8px;margin-left:auto">
        <button type="button" class="btn" onclick="document.getElementById('ss5-modal').remove()">Annuler</button>
        <button type="button" class="btn bp" onclick="${saveFn}">Enregistrer</button>
      </div>
    </div>
  </div>`;
  ov.addEventListener('click', (e) => {
    if (e.target === ov) ov.remove();
  });
  document.body.appendChild(ov);
}

export function enhanceFivesV11Crud() {
  getDynamicList('fives.zones');
  getDynamicList('fives.responsibles');

  window.ss5Modal = ss5ModalLite;

  window.ss5NewAudit = function ss5NewAuditDyn() {
    const today = new Date().toISOString().slice(0, 10);
    const zones = getDynamicList('fives.zones');
    ss5ModalLite(
      'Planifier un audit 5S',
      `<div class="xm-form-grid">
        ${renderXmDynamicSelect({ id: 's5a-z', listKey: 'fives.zones', label: 'Zone', selected: zones[0] || '', required: true })}
        <div><label class="fl">Date prévue *</label><input id="s5a-d" type="date" class="fi" value="${today}"></div>
        ${renderXmDynamicSelect({ id: 's5a-a', listKey: 'fives.auditors', label: 'Auditeur', selected: getDynamicList('fives.auditors')[0] })}
        ${renderXmDynamicSelect({ id: 's5a-s', listKey: 'fives.auditStatus', label: 'Statut', selected: 'Planifié' })}
      </div>`,
      `(function(){
        var z=window.readXmDynamicSelect("s5a-z","fives.zones");
        var d=document.getElementById("s5a-d").value;
        if(!z||!d){alert("Zone et date obligatoires");return;}
        var n="AUD5S-"+(String(Date.now()).slice(-4));
        window.SS5_AUDITS.unshift({id:n,date:d.split("-").reverse().join("/"),zone:z,
          auditeur:window.readXmDynamicSelect("s5a-a","fives.auditors"),
          score:null,statut:window.readXmDynamicSelect("s5a-s","fives.auditStatus")});
        document.getElementById("ss5-modal").remove();
        reloadPage("5s-audit");
        xmToast("Audit planifié",z,"📅","#2563eb");
      })()`
    );
    bindXmDynamicFields(['s5a-z', 's5a-a', 's5a-s']);
  };

  window.ss5NewEcart = function ss5NewEcartDyn() {
    const today = new Date().toISOString().slice(0, 10);
    ss5ModalLite(
      'Nouvel écart 5S',
      `<div class="xm-form-grid">
        ${renderXmDynamicSelect({ id: 's5e-z', listKey: 'fives.zones', label: 'Zone', required: true })}
        <div><label class="fl">Date</label><input id="s5e-d" type="date" class="fi" value="${today}"></div>
        <div class="xm-form-full"><label class="fl">Écart *</label><input id="s5e-ec" class="fi" placeholder="Description"></div>
        ${renderXmDynamicSelect({ id: 's5e-g', listKey: 'fives.gravity', label: 'Gravité', selected: 'Moyenne' })}
        ${renderXmDynamicSelect({ id: 's5e-r', listKey: 'fives.responsibles', label: 'Responsable' })}
        <div><label class="fl">Délai</label><input id="s5e-dl" type="date" class="fi"></div>
      </div>`,
      `(function(){
        var z=window.readXmDynamicSelect("s5e-z","fives.zones");
        var ec=document.getElementById("s5e-ec").value.trim();
        var d=document.getElementById("s5e-d").value;
        if(!z||!ec){alert("Zone et écart obligatoires");return;}
        var n="EC5S-"+(String(Date.now()).slice(-4));
        var dl=document.getElementById("s5e-dl").value;
        window.SS5_ECARTS.unshift({id:n,date:d?d.split("-").reverse().join("/"):new Date().toLocaleDateString("fr-FR"),
          zone:z,ecart:ec,gravite:window.readXmDynamicSelect("s5e-g","fives.gravity"),statut:"Ouvert",
          resp:window.readXmDynamicSelect("s5e-r","fives.responsibles"),dl:dl?dl.split("-").reverse().join("/"):"—"});
        document.getElementById("ss5-modal").remove();
        reloadPage("5s-ecarts");
        xmToast("Écart enregistré",ec.substring(0,40),"⚠","#dc2626");
      })()`
    );
    bindXmDynamicFields(['s5e-z', 's5e-g', 's5e-r']);
  };

  window.ss5NewAction = function ss5NewActionDyn() {
    const preS = window.ss5ActPresetStatus || 'À faire';
    ss5ModalLite(
      'Nouvelle action 5S',
      `<div class="xm-form-grid">
        <div class="xm-form-full"><label class="fl">Action *</label><input id="s5ac-a" class="fi"></div>
        ${renderXmDynamicSelect({ id: 's5ac-z', listKey: 'fives.zones', label: 'Zone', emptyOption: '— Aucune —' })}
        ${renderXmDynamicSelect({ id: 's5ac-p', listKey: 'fives.priority', label: 'Priorité' })}
        ${renderXmDynamicSelect({ id: 's5ac-t', listKey: 'fives.actionTypes', label: 'Type' })}
        ${renderXmDynamicSelect({ id: 's5ac-r', listKey: 'fives.responsibles', label: 'Responsable' })}
        <div><label class="fl">Échéance</label><input id="s5ac-f" type="date" class="fi"></div>
        ${renderXmDynamicSelect({ id: 's5ac-s', listKey: 'fives.actionStatus', label: 'Statut', selected: preS })}
      </div>`,
      `(function(){
        var a=document.getElementById("s5ac-a").value.trim();if(!a){alert("Action obligatoire");return;}
        var f=document.getElementById("s5ac-f").value;
        var z=window.readXmDynamicSelect("s5ac-z","fives.zones");
        var n="ACT5S-"+(String(Date.now()).slice(-4));
        window.SS5_ACTIONS.unshift({id:n,action:a,zone:z||"—",
          prio:window.readXmDynamicSelect("s5ac-p","fives.priority"),
          type:window.readXmDynamicSelect("s5ac-t","fives.actionTypes"),
          resp:window.readXmDynamicSelect("s5ac-r","fives.responsibles"),
          fin:f?f.split("-").reverse().join("/"):"—",
          statut:window.readXmDynamicSelect("s5ac-s","fives.actionStatus"),prog:0});
        document.getElementById("ss5-modal").remove();
        reloadPage("5s-actions");
        xmToast("Action créée",a.substring(0,35),"⚡","#7c3aed");
      })()`
    );
    bindXmDynamicFields(['s5ac-z', 's5ac-p', 's5ac-t', 's5ac-r', 's5ac-s']);
  };

  window.ss5NewZone = function ss5NewZoneDyn() {
    ss5ModalLite(
      'Nouvelle zone 5S',
      `<div class="xm-form-grid">
        <div class="xm-form-full"><label class="fl">Nom de zone *</label><input id="s5z-n" class="fi"></div>
        ${renderXmDynamicSelect({ id: 's5z-r', listKey: 'fives.responsibles', label: 'Responsable' })}
      </div>`,
      `(function(){
        var n=document.getElementById("s5z-n").value.trim();if(!n){alert("Nom obligatoire");return;}
        window.addDynamicItem("fives.zones",n);
        var resp=window.readXmDynamicSelect("s5z-r","fives.responsibles");
        var Z=window.SS5_ZONES||[];
        if(!Z.find(function(z){return z.zone===n;})){
          Z.push({id:"Z"+String(Z.length+1).padStart(2,"0"),zone:n,resp:resp||"—",S:0,T:0,N:0,S4:0,S5:0});
        }
        document.getElementById("ss5-modal").remove();
        reloadPage("5s-zones");
        xmToast("Zone ajoutée",n,"✓","#16a34a");
      })()`
    );
    bindXmDynamicFields(['s5z-r']);
  };

  window.ss5ManageLists = function (which) {
    const map = { zones: 'fives.zones', auditors: 'fives.auditors', resps: 'fives.responsibles' };
    window.openXmListManager(map[which] || 'fives.zones');
  };
}
