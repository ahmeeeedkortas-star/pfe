/**
 * Extensions CRUD Audit — listes dynamiques, checklists, rapports, constats NC/AC.
 */
import {
  parseAuditFrDate,
  buildAuditReportHtml,
  downloadAuditReportWord,
  printAuditReport,
  computeAuditNotifications,
  migrateAuditConstats,
} from './audit-store.js';
import {
  renderXmDynamicSelect,
  bindXmDynamicSelect,
  readXmDynamicSelect,
  getDynamicList,
  bindXmDynamicFields,
} from '../../core/dynamic-lists.js';

const bindAuditFormDynamicFields = bindXmDynamicFields;

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function auditModal(title, body, saveFn, deleteFn) {
  const old = document.getElementById('audit-modal');
  if (old) old.remove();
  const ov = document.createElement('div');
  ov.id = 'audit-modal';
  ov.className = 'xm-modal-overlay';
  const delBtn = deleteFn
    ? `<button type="button" class="btn btn-danger" onclick="${deleteFn}">Supprimer</button>`
    : '<span></span>';
  ov.innerHTML = `<div class="xm-modal xm-modal--wide">
    <div class="xm-modal__head"><span class="xm-modal__title">${title}</span>
      <button type="button" class="xm-modal__close" onclick="document.getElementById('audit-modal').remove()">✕</button></div>
    <div class="xm-modal__body">${body}</div>
    <div class="xm-modal__foot">${delBtn}
      <div style="display:flex;gap:8px;margin-left:auto">
        <button type="button" class="btn" onclick="document.getElementById('audit-modal').remove()">Annuler</button>
        <button type="button" class="btn bp" onclick="${saveFn}">Enregistrer</button>
      </div>
    </div>
  </div>`;
  ov.addEventListener('click', (e) => {
    if (e.target === ov) ov.remove();
  });
  document.body.appendChild(ov);
}


export function enhanceAuditV11Crud() {
  migrateAuditConstats();
  computeAuditNotifications();
  getDynamicList('audit.types');
  getDynamicList('audit.processes');
  getDynamicList('audit.auditors');

  window.auditNew = function auditNewEnhanced() {
    const today = new Date().toISOString().slice(0, 10);
    const auds = getDynamicList('audit.auditors');
    const firstAud = auds[0] || '';
    auditModal(
      'Nouvel audit',
      `<div class="xm-form-grid">
        <div class="xm-form-full"><label class="fl">Titre *</label><input id="an-titre" class="fi" placeholder="Ex: Audit ISO 9001 — Production" style="width:100%"></div>
        ${renderXmDynamicSelect({ id: 'an-type', listKey: 'audit.types', label: "Type d'audit", selected: getDynamicList('audit.types')[0] })}
        ${renderXmDynamicSelect({ id: 'an-proc', listKey: 'audit.processes', label: 'Processus audité', selected: getDynamicList('audit.processes')[0], required: true })}
        ${renderXmDynamicSelect({ id: 'an-aud', listKey: 'audit.auditors', label: 'Auditeur', selected: firstAud })}
        <div><label class="fl">Zone / service</label><input id="an-zone" class="fi" placeholder="Atelier, bureau…" style="width:100%"></div>
        <div><label class="fl">Date prévue *</label><input id="an-date" type="date" class="fi" value="${today}"></div>
        <div class="xm-form-full"><label class="fl">Responsable zone</label><input id="an-resp" class="fi" placeholder="Nom du responsable" style="width:100%"></div>
      </div>`,
      `(function(){
        var t=document.getElementById("an-titre").value.trim();
        if(!t){alert("Titre obligatoire");return;}
        var type=window.readXmDynamicSelect("an-type","audit.types");
        var proc=window.readXmDynamicSelect("an-proc","audit.processes");
        var aud=window.readXmDynamicSelect("an-aud","audit.auditors");
        if(!proc){alert("Processus obligatoire");return;}
        if(!aud){alert("Auditeur obligatoire");return;}
        var d=document.getElementById("an-date").value;
        var n="AUD-2026-"+String((window.AUDIT_PLANS.length+1)).padStart(3,"0");
        var ref=(type||"AUD").replace(/\\s+/g,"").replace("ISO","ISO").substring(0,8)+"-"+new Date().getFullYear()+"-"+String(window.AUDIT_PLANS.length+1).padStart(3,"0");
        window.AUDIT_PLANS.unshift({id:n,ref:ref,titre:t,type:type||"Interne",
          processus:proc,zone:document.getElementById("an-zone").value||"—",
          statut:"Planifié",dateDebut:d?d.split("-").reverse().join("/"):"-",dateFin:d?d.split("-").reverse().join("/"):"-",
          auditeur:aud,resp:document.getElementById("an-resp").value||"—",
          score:null,prog:0,wfStep:1,notes:""});
        document.getElementById("audit-modal").remove();
        reloadPage("audit-planning");
        xmToast("Audit planifié",t.substring(0,35),"📅","#0284c7");
        if(window.computeAuditNotifications)window.computeAuditNotifications();
      })()`
    );
    bindAuditFormDynamicFields(['an-type', 'an-proc', 'an-aud']);
  };

  window.auditNewConstat = function auditNewConstatEnhanced() {
    const types = ['NC', 'AC'];
    const audits = window.AUDIT_PLANS || [];
    const today = new Date().toISOString().slice(0, 10);
    auditModal(
      "Nouveau constat",
      `<div class="xm-form-grid">
        <div><label class="fl">Type</label><select id="ac-ty" class="fi"><option>NC</option><option>AC</option></select></div>
        <div><label class="fl">Audit lié</label><select id="ac-aud" class="fi"><option value="">— Aucun —</option>${audits.map((a) => `<option value="${esc(a.id)}">${esc(a.ref)}</option>`).join('')}</select></div>
        <div style="grid-column:1/-1"><label class="fl">Description *</label><textarea id="ac-d" class="fi" rows="2" style="width:100%"></textarea></div>
        ${renderXmDynamicSelect({ id: 'ac-p', listKey: 'audit.processes', label: 'Processus' })}
        ${renderXmDynamicSelect({ id: 'ac-g', listKey: 'audit.criticality', label: 'Criticité', selected: 'Majeure' })}
        <div><label class="fl">Responsable</label><input id="ac-r" class="fi" style="width:100%"></div>
        <div><label class="fl">Délai traitement</label><input id="ac-del" type="date" class="fi" value="${today}"></div>
        <div><label class="fl">Référence ISO</label><input id="ac-ref" class="fi" placeholder="ISO 9001 §10.2" style="width:100%"></div>
      </div>`,
      `(function(){
        var d=document.getElementById("ac-d").value.trim();if(!d){alert("Description obligatoire");return;}
        var ty=document.getElementById("ac-ty").value;
        var proc=window.readXmDynamicSelect("ac-p","audit.processes");
        var grav=window.readXmDynamicSelect("ac-g","audit.criticality");
        var prefix=ty==="NC"?"NC":"AC";
        var n=prefix+"-2026-"+String((window.AUDIT_CONSTATS.filter(function(c){return c.type===ty;}).length+1)).padStart(3,"0");
        var del=document.getElementById("ac-del").value;
        window.AUDIT_CONSTATS.unshift({
          id:n,auditId:document.getElementById("ac-aud").value||null,type:ty,processus:proc||"—",desc:d,
          gravite:grav||"Majeure",statut:"Ouvert",
          dateDetect:new Date().toLocaleDateString("fr-FR"),
          resp:document.getElementById("ac-r").value||"—",
          ref:document.getElementById("ac-ref").value||"",
          delai:del?del.split("-").reverse().join("/"):""
        });
        document.getElementById("audit-modal").remove();
        reloadPage("audit-constats");
        xmToast("Constat enregistré",d.substring(0,40),"⚠","#dc2626");
      })()`
    );
    bindAuditFormDynamicFields(['ac-p', 'ac-g']);
  };

  window.auditManageProcesses = function auditManageProcesses() {
    window.openXmListManager('audit.processes');
  };

  window.auditManageTypes = function auditManageTypes() {
    window.openXmListManager('audit.types');
  };

  window.auditManageAuditors = function auditManageAuditors() {
    window.openXmListManager('audit.auditors');
  };

  window.auditNewAction = function auditNewActionEnhanced() {
    const constats = (window.AUDIT_CONSTATS || []).filter((c) => c.statut !== 'Clôturé');
    const today = new Date().toISOString().slice(0, 10);
    const firstAud = getDynamicList('audit.auditors')[0] || '';
    auditModal(
      'Nouvelle action corrective',
      `<div class="xm-form-grid">
        <div class="xm-form-full"><label class="fl">Action *</label><input id="aa-a" class="fi" placeholder="Description…" style="width:100%"></div>
        <div class="xm-form-full"><label class="fl">Constat lié</label><select id="aa-c" class="fi"><option value="">— Aucun —</option>${constats.map((c) => `<option value="${esc(c.id)}">${esc(c.id)} — ${esc(c.desc.slice(0, 40))}</option>`).join('')}</select></div>
        ${renderXmDynamicSelect({ id: 'aa-r', listKey: 'audit.auditors', label: 'Responsable', selected: firstAud })}
        <div><label class="fl">Échéance</label><input id="aa-e" type="date" class="fi" value="${today}"></div>
      </div>`,
      `(function(){
        var a=document.getElementById("aa-a").value.trim();if(!a){alert("Action obligatoire");return;}
        var e=document.getElementById("aa-e").value;
        var cid=document.getElementById("aa-c").value;
        var resp=window.readXmDynamicSelect("aa-r","audit.auditors");
        var n="ACT-AUD-"+String((window.AUDIT_ACTIONS.length+1)).padStart(3,"0");
        window.AUDIT_ACTIONS.unshift({
          id:n,constatId:cid||null,
          auditId:cid?(window.AUDIT_CONSTATS.find(function(c){return c.id===cid;})||{}).auditId:null,
          action:a,resp:resp||"—",
          echeance:e?e.split("-").reverse().join("/"):"-",
          prog:0,statut:"À faire"
        });
        document.getElementById("audit-modal").remove();
        reloadPage("audit-actions");
        xmToast("Action créée",a.substring(0,35),"⚡","#0284c7");
      })()`
    );
    bindAuditFormDynamicFields(['aa-r']);
  };

  window.auditNewAuditeur = function auditNewAuditeurEnhanced() {
    auditModal(
      'Nouvel auditeur',
      `<div class="xm-form-grid">
        <div class="xm-form-full"><label class="fl">Nom *</label><input id="aau-n" class="fi" style="width:100%"></div>
        <div><label class="fl">Poste</label><input id="aau-p" class="fi" value="Auditeur"></div>
        <div><label class="fl">Département</label><input id="aau-d" class="fi" placeholder="Qualité, HSE…"></div>
      </div>`,
      `(function(){
        var n=document.getElementById("aau-n").value.trim();if(!n){alert("Nom obligatoire");return;}
        window.addDynamicItem("audit.auditors",n);
        var cols=["#2563eb","#16a34a","#7c3aed","#0891b2","#dc2626","#ea580c"];
        var id="AUDR-"+String((window.AUDIT_AUDITEURS.length+1)).padStart(3,"0");
        if(!window.AUDIT_AUDITEURS.find(function(a){return a.nom===n;})){
          window.AUDIT_AUDITEURS.push({id:id,nom:n,poste:document.getElementById("aau-p").value||"Auditeur",dep:document.getElementById("aau-d").value||"—",qualif:[],audits:0,tauxConf:0,col:cols[window.AUDIT_AUDITEURS.length%cols.length]});
        }
        document.getElementById("audit-modal").remove();
        reloadPage("audit-auditeurs");
        xmToast("Auditeur ajouté",n,"✓","#16a34a");
      })()`
    );
  };

  window.auditEditChecklist = function auditEditChecklist(clId) {
    const cl = (window.AUDIT_CHECKLISTS || []).find((x) => x.id === clId);
    if (!cl) return;
    window.auditSelCL = clId;
    const items = cl.items || [];
    const rows = items
      .map(
        (it, i) =>
          `<tr data-cl-item="${i}">
            <td><input class="fi" style="width:36px" id="cli-n-${i}" value="${it.n}"></td>
            <td><input class="fi" id="cli-sec-${i}" value="${esc(it.section)}"></td>
            <td><input class="fi" style="width:56px" id="cli-ex-${i}" value="${esc(it.exig)}"></td>
            <td><input class="fi" id="cli-d-${i}" value="${esc(it.desc)}"></td>
            <td><button type="button" class="btn bsm" onclick="auditRemoveChecklistItem(${i})">−</button></td>
          </tr>`
      )
      .join('');
    auditModal(
      `Éditer checklist — ${cl.titre}`,
      `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">
        <div style="grid-column:1/-1"><label class="fl">Titre</label><input id="cl-ed-t" class="fi" value="${esc(cl.titre)}" style="width:100%"></div>
        <div><label class="fl">Norme</label><select id="cl-ed-n" class="fi"><option${cl.norme === 'ISO 9001' ? ' selected' : ''}>ISO 9001</option><option${cl.norme === 'ISO 14001' ? ' selected' : ''}>ISO 14001</option><option${cl.norme === 'ISO 45001' ? ' selected' : ''}>ISO 45001</option></select></div>
        <div><label class="fl">Version</label><input id="cl-ed-v" class="fi" value="${esc(cl.version)}"></div>
      </div>
      <button type="button" class="btn bsm bp" onclick="auditAddChecklistItemRow()">+ Ligne question</button>
      <div style="overflow-x:auto;margin-top:8px;max-height:320px">
        <table class="tbl"><thead><tr><th>#</th><th>Section</th><th>Exig.</th><th>Question / critère</th><th></th></tr></thead>
        <tbody id="cl-ed-items">${rows}</tbody></table>
      </div>`,
      `(function(){
        var c=window.AUDIT_CHECKLISTS.find(function(x){return x.id==="${clId}"});if(!c)return;
        c.titre=document.getElementById("cl-ed-t").value;
        c.norme=document.getElementById("cl-ed-n").value;
        c.version=document.getElementById("cl-ed-v").value;
        var tbody=document.getElementById("cl-ed-items");
        var rows=[...tbody.querySelectorAll("tr[data-cl-item]")];
        c.items=rows.map(function(tr,i){
          return {
            n:parseInt(document.getElementById("cli-n-"+i)?.value)||i+1,
            section:document.getElementById("cli-sec-"+i)?.value||"",
            exig:document.getElementById("cli-ex-"+i)?.value||"",
            desc:document.getElementById("cli-d-"+i)?.value||"",
            statut:null
          };
        });
        document.getElementById("audit-modal").remove();
        reloadPage("audit-checklist");
        xmToast("Checklist enregistrée","","✓","#16a34a");
      })()`
    );
    window.__auditClEditId = clId;
    window.__auditClEditItems = items.length;
  };

  window.auditAddChecklistItemRow = function () {
    const tbody = document.getElementById('cl-ed-items');
    if (!tbody) return;
    const i = tbody.querySelectorAll('tr[data-cl-item]').length;
    tbody.insertAdjacentHTML(
      'beforeend',
      `<tr data-cl-item="${i}"><td><input class="fi" style="width:36px" id="cli-n-${i}" value="${i + 1}"></td>
      <td><input class="fi" id="cli-sec-${i}" value="Nouvelle section"></td>
      <td><input class="fi" style="width:56px" id="cli-ex-${i}"></td>
      <td><input class="fi" id="cli-d-${i}" value=""></td>
      <td><button type="button" class="btn bsm" onclick="auditRemoveChecklistItem(${i})">−</button></td></tr>`
    );
  };

  window.auditRemoveChecklistItem = function (idx) {
    const cl = (window.AUDIT_CHECKLISTS || []).find((x) => x.id === window.auditSelCL);
    if (!cl) return;
    cl.items.splice(idx, 1);
    window.auditEditChecklist(cl.id);
  };

  const origNewCl = window.auditNewChecklist;
  window.auditNewChecklist = function () {
    auditModal(
      '+ Nouvelle checklist',
      `<div style="display:grid;gap:10px">
        <div><label class="fl">Titre *</label><input id="acl-t" class="fi" style="width:100%"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div><label class="fl">Norme</label><select id="acl-n" class="fi"><option>ISO 9001</option><option>ISO 14001</option><option>ISO 45001</option></select></div>
          <div><label class="fl">Version</label><input id="acl-v" class="fi" value="2026-01"></div>
        </div>
      </div>`,
      `(function(){
        var t=document.getElementById("acl-t").value.trim();if(!t){alert("Titre obligatoire");return;}
        var n="CL-"+String((window.AUDIT_CHECKLISTS.length+1)).padStart(3,"0");
        window.AUDIT_CHECKLISTS.push({id:n,titre:t,norme:document.getElementById("acl-n").value,version:document.getElementById("acl-v").value,items:[
          {n:1,section:"1. Exigence",exig:"1.1",desc:"Point de contrôle à vérifier",statut:null}
        ]});
        document.getElementById("audit-modal").remove();
        window.auditSelCL=n;
        reloadPage("audit-checklist");
        setTimeout(function(){auditEditChecklist(n);},200);
      })()`
    );
  };

  window.auditGenerateReport = function (auditId) {
    const aid = auditId || window.auditSelAudit || (window.AUDIT_PLANS || [])[0]?.id;
    if (!aid) {
      window.xmToast?.('Sélectionnez un audit', '', '⚠', '#dc2626');
      return;
    }
    const html = buildAuditReportHtml(aid, window.AUDIT_REPORT_DRAFT?.[aid] || '');
    const id = `DOC-AUD-${String((window.AUDIT_DOCS_LIST || []).length + 1).padStart(3, '0')}`;
    window.AUDIT_DOCS_LIST = window.AUDIT_DOCS_LIST || [];
    window.AUDIT_DOCS_LIST.unshift({
      id,
      auditId: aid,
      nom: `Rapport ${aid}`,
      type: 'Rapport',
      date: new Date().toLocaleDateString('fr-FR'),
      auteur: 'Système QHSE',
      statut: 'Brouillon',
      contenuHtml: html,
    });
    window.AUDIT_REPORT_DRAFT = window.AUDIT_REPORT_DRAFT || {};
    window.AUDIT_REPORT_DRAFT[aid] = html;
    window.xmToast?.('Rapport généré', id, '📄', '#16a34a');
    reloadPage('audit-docs');
  };

  window.auditOpenReportEditor = function (docId) {
    const doc = (window.AUDIT_DOCS_LIST || []).find((d) => d.id === docId);
    if (!doc) return;
    const aid = doc.auditId;
    const initial = doc.contenuHtml || buildAuditReportHtml(aid, '');
    auditModal(
      `Éditer rapport — ${doc.nom}`,
      `<p style="font-size:var(--fs-xs);color:var(--muted)">Modifiez le contenu avant validation / export PDF.</p>
      <div id="audit-report-editor" class="fi" contenteditable="true" style="min-height:280px;padding:12px;border:1px solid var(--border);border-radius:8px">${initial.replace(/<\/body>[\s\S]*/, '').replace(/[\s\S]*<body>/, '')}</div>`,
      `(function(){
        var html=document.getElementById("audit-report-editor").innerHTML;
        var d=window.AUDIT_DOCS_LIST.find(function(x){return x.id==="${docId}"});if(d){d.contenuHtml=html;d.statut="Validé";}
        window.AUDIT_REPORT_DRAFT=window.AUDIT_REPORT_DRAFT||{};window.AUDIT_REPORT_DRAFT["${aid}"]=html;
        document.getElementById("audit-modal").remove();
        reloadPage("audit-docs");
        xmToast("Rapport validé","","✓","#16a34a");
      })()`
    );
  };

  window.auditExportReportPdf = function (auditId) {
    const aid = auditId || window.auditSelAudit;
    const draft = window.AUDIT_REPORT_DRAFT?.[aid];
    printAuditReport(aid, draft);
  };

  window.auditExportReportWord = function (auditId) {
    const aid = auditId || window.auditSelAudit;
    downloadAuditReportWord(aid, window.AUDIT_REPORT_DRAFT?.[aid]);
  };

  window.auditRefreshNotifications = function () {
    const items = computeAuditNotifications();
    window.xmToast?.(`${items.length} notification(s) audit actives`, '', '🔔', '#0284c7');
    reloadPage(window.STATE?.page || 'audit-tb');
  };

  const origExport = window.auditExport;
  window.auditExport = function (type) {
    if (type === 'pdf' || type === 'report') {
      window.auditExportReportPdf(window.auditSelAudit);
      return;
    }
    origExport?.(type);
  };

  window.auditEdit = function auditEditEnhanced(id) {
    const a = (window.AUDIT_PLANS || []).find((x) => x.id === id);
    if (!a) return;
    const statuts = ['Planifié', 'En cours', 'Terminé', 'En retard'];
    const dParsed = parseAuditFrDate(a.dateDebut);
    const dateIso = dParsed
      ? `${dParsed.getFullYear()}-${String(dParsed.getMonth() + 1).padStart(2, '0')}-${String(dParsed.getDate()).padStart(2, '0')}`
      : '';
    auditModal(
      `Modifier — ${a.ref}`,
      `<div class="xm-form-grid">
        <div class="xm-form-full"><label class="fl">Titre</label><input id="ae-t" class="fi" value="${esc(a.titre)}" style="width:100%"></div>
        ${renderXmDynamicSelect({ id: 'ae-type', listKey: 'audit.types', label: "Type d'audit", selected: a.type })}
        ${renderXmDynamicSelect({ id: 'ae-proc', listKey: 'audit.processes', label: 'Processus', selected: a.processus })}
        ${renderXmDynamicSelect({ id: 'ae-aud', listKey: 'audit.auditors', label: 'Auditeur', selected: a.auditeur })}
        <div><label class="fl">Statut</label><select id="ae-s" class="fi">${statuts.map((s) => `<option${s === a.statut ? ' selected' : ''}>${s}</option>`).join('')}</select></div>
        <div><label class="fl">Date prévue</label><input id="ae-date" type="date" class="fi" value="${dateIso || ''}"></div>
        <div><label class="fl">Progression %</label><input id="ae-p" type="number" min="0" max="100" class="fi" value="${a.prog}"></div>
        <div class="xm-form-full"><label class="fl">Notes</label><textarea id="ae-n" class="fi" rows="2" style="width:100%">${esc(a.notes)}</textarea></div>
      </div>`,
      `(function(){
        var x=window.AUDIT_PLANS.find(function(a){return a.id==="${id}"});if(!x)return;
        x.titre=document.getElementById("ae-t").value;
        x.type=window.readXmDynamicSelect("ae-type","audit.types")||x.type;
        x.processus=window.readXmDynamicSelect("ae-proc","audit.processes")||x.processus;
        x.auditeur=window.readXmDynamicSelect("ae-aud","audit.auditors")||x.auditeur;
        x.statut=document.getElementById("ae-s").value;
        var d=document.getElementById("ae-date").value;
        if(d){var p=d.split("-");x.dateDebut=p[2]+"/"+p[1]+"/"+p[0];x.dateFin=x.dateDebut;}
        x.prog=parseInt(document.getElementById("ae-p").value)||0;
        if(x.prog===100&&x.statut!=="Terminé")x.statut="Terminé";
        x.notes=document.getElementById("ae-n").value;
        if(x.statut==="Terminé")x.wfStep=5;
        document.getElementById("audit-modal").remove();
        reloadPage(window.STATE?.page||"audit-planning");
        xmToast("Audit mis à jour","${id}","✓","#16a34a");
        if(window.computeAuditNotifications)window.computeAuditNotifications();
      })()`
    );
    bindAuditFormDynamicFields(['ae-type', 'ae-proc', 'ae-aud']);
  };

  window.auditClSetComment = function (clId, itemN, val) {
    const cl = (window.AUDIT_CHECKLISTS || []).find((x) => x.id === clId);
    const it = cl?.items?.find((i) => i.n === itemN);
    if (it) it.preuve = val;
    if (!window.AUDIT_CL_DATA[clId]) window.AUDIT_CL_DATA[clId] = {};
    window.AUDIT_CL_DATA[clId][`_c_${itemN}`] = val;
  };

  window.auditGenerateConstatsFromChecklist = function (clId) {
    const data = window.AUDIT_CL_DATA?.[clId] || {};
    const cl = (window.AUDIT_CHECKLISTS || []).find((x) => x.id === clId);
    if (!cl) return;
    let n = 0;
    (cl.items || []).forEach((it) => {
      if (data[it.n] !== 'NC') return;
      const exists = (window.AUDIT_CONSTATS || []).some(
        (c) => c.type === 'NC' && c.desc === it.desc && c.processus === (window.auditSelAudit ? '' : '')
      );
      if (exists) return;
      const id = `NC-2026-${String((window.AUDIT_CONSTATS || []).length + 1).padStart(3, '0')}`;
      window.AUDIT_CONSTATS.unshift({
        id,
        auditId: window.auditSelAudit || null,
        type: 'NC',
        processus: '—',
        desc: it.desc,
        gravite: 'Majeure',
        statut: 'Ouvert',
        dateDetect: new Date().toLocaleDateString('fr-FR'),
        resp: '—',
        ref: it.exig ? `ISO ${cl.norme?.replace('ISO ', '')} §${it.exig}` : '',
        delai: '',
      });
      n++;
    });
    window.xmToast?.(`${n} constat(s) NC généré(s)`, '', '⚠', '#dc2626');
    reloadPage('audit-constats');
  };
}
