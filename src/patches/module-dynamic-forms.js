/**
 * Extension listes dynamiques — tous les modules (doc, sec, audit, CST).
 */
import {
  renderXmDynamicSelect,
  bindXmDynamicFields,
  readXmDynamicSelect,
  getDynamicList,
} from '../core/dynamic-lists.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

export function enhanceDocForms() {
  const orig = window.buildDocForm;
  if (!orig && !window.__docFormPatched) {
    import('../components/sec/doc-helpers.js').then((m) => {
      patchBuildDocForm(m.buildDocForm);
    });
    return;
  }
  if (typeof orig === 'function') patchBuildDocForm(orig);
}

function patchBuildDocForm(origBuild) {
  if (window.__docFormPatched) return;
  window.__docFormPatched = true;

  window.buildDocForm = function buildDocFormDynamic(d = {}) {
    const sections = (d.content || []).map((s) => ({ h: s.h, t: s.t }));
    if (!sections.length) sections.push({ h: '', t: '' });
    const secHtml = sections
      .map(
        (s) =>
          `<div class="doc-section-row" style="border:1px solid var(--border);border-radius:8px;padding:10px;margin-bottom:8px">
        <input class="fi doc-sec-title" value="${esc(s.h)}" placeholder="Titre" style="width:100%;margin-bottom:6px;font-weight:700">
        <textarea class="fi doc-sec-body" style="width:100%;min-height:70px">${esc(s.t)}</textarea>
        <button type="button" class="btn bsm" data-doc-rm-sec style="margin-top:6px;color:var(--red)">Supprimer section</button></div>`
      )
      .join('');

    const idBlock = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
      <div><label class="fl">Code</label><input id="dd-code" class="fi" value="${esc(d.code || 'SST-NEW-001')}"></div>
      <div><label class="fl">Nom</label><input id="dd-nom" class="fi" value="${esc(d.nom || '')}"></div>
      ${renderXmDynamicSelect({ id: 'dd-cat', listKey: 'doc.categories', label: 'Catégorie', selected: d.cat || 'Sécurité' })}
      ${renderXmDynamicSelect({ id: 'dd-type', listKey: 'sec.docTypes', label: 'Type', selected: d.type || 'Procédure' })}
      <div><label class="fl">Version</label><input id="dd-ver" class="fi" value="${esc(d.version || 'V1')}"></div>
      <div><label class="fl">Auteur</label><input id="dd-aut" class="fi" value="${esc(d.auteur || 'HSE')}"></div>
      ${renderXmDynamicSelect({ id: 'dd-stat', listKey: 'doc.status', label: 'Statut', selected: d.statut || 'En révision' })}
      <div><label class="fl">Pages</label><input id="dd-pages" class="fi" value="${String(d.pages ?? 0)}"></div>
    </div>`;

    return `<div style="font-size:11px;font-weight:700;color:var(--navy);margin-bottom:8px">1. Identification</div>
      ${idBlock}
      <div style="font-size:11px;font-weight:700;margin-bottom:6px">2. Description</div>
      <textarea id="dd-desc" class="fi" style="width:100%;min-height:60px;margin-bottom:14px">${esc(d.desc || '')}</textarea>
      <div style="font-size:11px;font-weight:700;margin-bottom:6px">3. Sections</div>
      <div id="doc-sections-list">${secHtml}</div>
      <button type="button" class="btn bsm bp" onclick="addDocSection()">+ Section</button>`;
  };

  const origAdd = window.docAdd;
  if (origAdd) {
    window.docAdd = function () {
      origAdd();
      setTimeout(() => bindXmDynamicFields(['dd-cat', 'dd-type', 'dd-stat']), 60);
    };
  }
  const origEdit = window.docEdit;
  if (origEdit) {
    window.docEdit = function (id) {
      origEdit(id);
      setTimeout(() => bindXmDynamicFields(['dd-cat', 'dd-type', 'dd-stat']), 60);
    };
  }
}

export function enhanceAuditExtraForms() {
  window.auditAddDoc = function auditAddDocDyn() {
    const audits = window.AUDIT_PLANS || [];
    window.auditModal(
      'Nouveau document',
      `<div class="xm-form-grid">
        <div class="xm-form-full"><label class="fl">Nom *</label><input id="adoc-n" class="fi" style="width:100%"></div>
        ${renderXmDynamicSelect({ id: 'adoc-t', listKey: 'audit.docTypes', label: 'Type', selected: 'Rapport' })}
        <div class="xm-form-full"><label class="fl">Audit lié</label><select id="adoc-a" class="fi"><option value="">— Aucun —</option>${audits.map((a) => `<option value="${esc(a.id)}">${esc(a.ref)}</option>`).join('')}</select></div>
      </div>`,
      `(function(){
        var n=document.getElementById("adoc-n").value.trim();if(!n){alert("Nom obligatoire");return;}
        var id="DOC-AUD-"+String((window.AUDIT_DOCS_LIST.length+1)).padStart(3,"0");
        window.AUDIT_DOCS_LIST=window.AUDIT_DOCS_LIST||[];
        window.AUDIT_DOCS_LIST.unshift({id:id,auditId:document.getElementById("adoc-a").value||null,nom:n,
          type:window.readXmDynamicSelect("adoc-t","audit.docTypes"),date:new Date().toLocaleDateString("fr-FR"),
          auteur:"—",statut:"Brouillon"});
        document.getElementById("audit-modal").remove();
        reloadPage("audit-docs");
        xmToast("Document ajouté",n,"📄","#16a34a");
      })()`
    );
    bindXmDynamicFields(['adoc-t']);
  };

  const origNewCl = window.auditNewChecklist;
  window.auditNewChecklist = function () {
    window.auditModal(
      'Nouvelle checklist',
      `<div class="xm-form-grid">
        <div class="xm-form-full"><label class="fl">Titre *</label><input id="acl-t" class="fi" style="width:100%"></div>
        ${renderXmDynamicSelect({ id: 'acl-n', listKey: 'audit.norms', label: 'Norme' })}
        <div><label class="fl">Version</label><input id="acl-v" class="fi" value="2026-01"></div>
      </div>`,
      `(function(){
        var t=document.getElementById("acl-t").value.trim();if(!t){alert("Titre obligatoire");return;}
        var n="CL-"+String((window.AUDIT_CHECKLISTS.length+1)).padStart(3,"0");
        window.AUDIT_CHECKLISTS.push({id:n,titre:t,norme:window.readXmDynamicSelect("acl-n","audit.norms"),
          version:document.getElementById("acl-v").value,items:[{n:1,section:"1. Exigence",exig:"1.1",desc:"Point de contrôle",statut:null}]});
        document.getElementById("audit-modal").remove();
        window.auditSelCL=n;
        reloadPage("audit-checklist");
        setTimeout(function(){auditEditChecklist(n);},200);
      })()`
    );
    bindXmDynamicFields(['acl-n']);
  };
}

export function installModuleDynamicForms() {
  enhanceDocForms();
  enhanceAuditExtraForms();

  import('../components/sec/doc-helpers.js').then((m) => {
    if (!window.__docFormPatched) patchBuildDocForm(m.buildDocForm);
  });
}
