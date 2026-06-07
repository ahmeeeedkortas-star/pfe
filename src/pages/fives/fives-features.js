/**
 * 5S — checklist éditable, validation audit, notifications, persistance.
 */
import { persistFivesV11 } from './fives-persist.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

const PILLAR_META = [
  { key: 'S1', lb: '1S — Seiri' },
  { key: 'S2', lb: '2S — Seiton' },
  { key: 'S3', lb: '3S — Seiso' },
  { key: 'S4', lb: '4S — Seiketsu' },
  { key: 'S5', lb: '5S — Shitsuke' },
];

export function ss5Notify(title, sub, type = 'info') {
  const colors = { info: '#2563eb', success: '#16a34a', warn: '#f59e0b', error: '#dc2626' };
  window.xmToast?.(title, sub, type === 'success' ? 'check-circle' : 'info', colors[type] || colors.info);
  if (window.pushNotif) {
    window.pushNotif({ titre: title, msg: sub, type: type === 'error' ? 'critical' : type === 'warn' ? 'warning' : 'info' });
  }
}

function wrapPersist(fn) {
  return function (...args) {
    const r = fn.apply(this, args);
    persistFivesV11();
    return r;
  };
}

function buildTemplateEditorBody() {
  const CL = window.SS5_CL_TEMPLATE || {};
  return PILLAR_META.map((p) => {
    const items = CL[p.key]?.items || [];
    const rows = items
      .map((it) => {
        const pk = JSON.stringify(p.key);
        const nk = JSON.stringify(it.n);
        return `<tr>
          <td style="width:36px"><input class="fi" style="width:32px;padding:4px" value="${it.n}" onchange="ss5ClTplRenumber(${pk},${nk},parseInt(this.value,10))"></td>
          <td><input class="fi" value="${esc(it.label)}" oninput="ss5ClTplLabel(${pk},${nk},this.value)"></td>
          <td style="text-align:center"><input type="checkbox" ${it.critical ? 'checked' : ''} onchange="ss5ClTplCritical(${pk},${nk},this.checked)"></td>
          <td style="width:40px"><button type="button" class="btn bsm" style="color:#dc2626" onclick="ss5ClTplRemove(${pk},${nk})">✕</button></td>
        </tr>`;
      })
      .join('');
    return `<div class="ss5-tpl-pillar">
      <div style="font-size:12px;font-weight:700;color:#166534;margin:12px 0 8px">${p.lb}</div>
      <table class="tbl" style="font-size:11px"><thead><tr><th>#</th><th>Critère</th><th>Crit.</th><th></th></tr></thead><tbody>${rows}</tbody></table>
      <button type="button" class="btn bsm" style="margin-top:6px" onclick="ss5ClTplAdd(${JSON.stringify(p.key)})">+ Ajouter une question</button>
    </div>`;
  }).join('');
}

export function installFivesFeatures() {
  window.ss5Notify = ss5Notify;

  window.ss5ValidateAudit = function ss5ValidateAudit(id) {
    const a = (window.SS5_AUDITS || []).find((x) => x.id === id);
    if (!a) return;
    const Z = (window.SS5_ZONES || []).find((z) => z.zone === a.zone);
    if (Z?.score != null) a.score = Z.score;
    else if (!a.score) a.score = 75;
    a.statut = 'Réalisé';
    persistFivesV11();
    ss5Notify('Audit validé', `${a.id} — ${a.zone} · ${a.score}%`, 'success');
    window.reloadPage?.('5s-audit');
  };

  window.ss5DeleteAuditQuick = function ss5DeleteAuditQuick(id) {
    if (!confirm(`Supprimer l'audit ${id} ?`)) return;
    window.SS5_AUDITS = (window.SS5_AUDITS || []).filter((x) => x.id !== id);
    persistFivesV11();
    ss5Notify('Audit supprimé', id, 'warn');
    window.reloadPage?.(window.STATE?.page || '5s-audit');
  };

  window.ss5ClTplAdd = function ss5ClTplAdd(pk) {
    const CL = window.SS5_CL_TEMPLATE || {};
    if (!CL[pk]) CL[pk] = { items: [] };
    const max = CL[pk].items.reduce((m, it) => Math.max(m, it.n), 0);
    CL[pk].items.push({ n: max + 1, label: 'Nouveau critère', critical: false });
    persistFivesV11();
    window.ss5ClManageTemplate?.();
  };

  window.ss5ClTplRemove = function ss5ClTplRemove(pk, n) {
    const CL = window.SS5_CL_TEMPLATE || {};
    if (!CL[pk]) return;
    CL[pk].items = CL[pk].items.filter((it) => it.n !== n);
    CL[pk].items.forEach((it, i) => {
      it.n = i + 1;
    });
    persistFivesV11();
    window.ss5ClManageTemplate?.();
  };

  window.ss5ClTplLabel = function ss5ClTplLabel(pk, n, val) {
    const it = (window.SS5_CL_TEMPLATE?.[pk]?.items || []).find((x) => x.n === n);
    if (it) {
      it.label = val;
      persistFivesV11();
    }
  };

  window.ss5ClTplCritical = function ss5ClTplCritical(pk, n, checked) {
    const it = (window.SS5_CL_TEMPLATE?.[pk]?.items || []).find((x) => x.n === n);
    if (it) {
      it.critical = !!checked;
      persistFivesV11();
    }
  };

  window.ss5ClTplRenumber = function ss5ClTplRenumber(pk, oldN, newN) {
    const items = window.SS5_CL_TEMPLATE?.[pk]?.items;
    const it = items?.find((x) => x.n === oldN);
    if (it && newN > 0) {
      it.n = newN;
      items.sort((a, b) => a.n - b.n);
      persistFivesV11();
    }
  };

  window.ss5ClManageTemplate = function ss5ClManageTemplate() {
    window.ss5Modal?.(
      'Personnaliser la checklist 5S',
      `<p style="font-size:11px;color:#64748b;margin:0 0 12px">Ajoutez, modifiez ou supprimez des questions. Enregistrement automatique.</p>${buildTemplateEditorBody()}`,
      `document.getElementById('ss5-modal')?.remove();reloadPage('5s-checklist')`,
      null
    );
  };

  window.ss5ClManageSections = function ss5ClManageSections() {
    const CL = window.SS5_CL_TEMPLATE || {};
    const body = PILLAR_META.map((p) => {
      const sec = CL[p.key] || {};
      const pk = JSON.stringify(p.key);
      return `<div style="margin-bottom:12px">
        <div style="font-size:11px;font-weight:700;color:#166534;margin-bottom:6px">${p.lb}</div>
        <label class="fl">Titre section</label>
        <input class="fi" value="${esc(sec.title || p.lb)}" oninput="ss5ClSectionTitle(${pk},this.value)" style="width:100%;margin-bottom:6px">
        <label class="fl">Sous-titre</label>
        <input class="fi" value="${esc(sec.subtitle || '')}" oninput="ss5ClSectionSubtitle(${pk},this.value)" style="width:100%">
      </div>`;
    }).join('');
    window.ss5Modal?.(
      'Personnaliser les sections 5S',
      body,
      `document.getElementById('ss5-modal')?.remove();reloadPage('5s-checklist')`,
      null
    );
  };

  window.ss5ClSectionTitle = function ss5ClSectionTitle(pk, val) {
    if (!window.SS5_CL_TEMPLATE[pk]) window.SS5_CL_TEMPLATE[pk] = { items: [] };
    window.SS5_CL_TEMPLATE[pk].title = val;
    persistFivesV11();
  };

  window.ss5ClSectionSubtitle = function ss5ClSectionSubtitle(pk, val) {
    if (!window.SS5_CL_TEMPLATE[pk]) window.SS5_CL_TEMPLATE[pk] = { items: [] };
    window.SS5_CL_TEMPLATE[pk].subtitle = val;
    persistFivesV11();
  };

  const origClGenerateEcarts = window.ss5ClGenerateEcarts;
  window.ss5ClGenerateEcarts = function (zoneId) {
    origClGenerateEcarts?.(zoneId);
    persistFivesV11();
  };

  ['ss5NewAudit', 'ss5EditAudit', 'ss5NewEcart', 'ss5NewAction', 'ss5NewZone', 'ss5DeleteAudit', 'ss5DeleteAction'].forEach((name) => {
    const fn = window[name];
    if (typeof fn !== 'function') return;
    window[name] = function (...args) {
      const r = fn.apply(this, args);
      setTimeout(() => persistFivesV11(), 0);
      return r;
    };
  });

  const origValidate = window.ss5ValidateAudit;
  window.ss5ValidateAudit = function (id) {
    origValidate?.(id);
    persistFivesV11();
  };
}

export function enhanceFivesAuditHtml(html) {
  let out = html.replace(
    /<button onclick="ss5EditAudit\(([^)]+)\)" class="btn bsm">✏<\/button>/g,
    (_, id) =>
      `<button type="button" onclick="ss5StartAudit(${id})" class="btn bsm bp" title="Évaluer">📋</button>
       <button type="button" onclick="ss5ValidateAudit(${id})" class="btn bsm" style="background:#f0fdf4;color:#16a34a;border-color:#86efac" title="Valider">✓</button>
       <button onclick="ss5EditAudit(${id})" class="btn bsm">✏</button>
       <button type="button" onclick="ss5DeleteAuditQuick(${id})" class="btn bsm" style="color:#dc2626" title="Supprimer">🗑</button>`
  );
  out = out.replace(
    'onclick="ss5Export(\'pdf\')"',
    'onclick="ss5Export(\'pdf\',null)"'
  );
  out = out.replace(
    'onclick="ss5Export(\'csv\')"',
    'onclick="ss5Export(\'excel\')"'
  );
  if (!out.includes('fives-page')) {
    out = `<div class="fives-page">${out}</div>`;
  }
  return out;
}

export function enhanceFivesTbHtml(html) {
  return html
    .replace(/goPage\('5s-kpi'\)/g, "goPage('5s-tb')")
    .replace(/goPage\("5s-kpi"\)/g, 'goPage("5s-tb")')
    .replace(/goPage\('5s-suivi'\)/g, "goPage('5s-actions')")
    .replace(/goPage\('5s-planning'\)/g, "goPage('5s-audit')")
    .replace(/goPage\("5s-planning"\)/g, 'goPage("5s-audit")')
    .replace(/reloadPage\('5s-planning'\)/g, "reloadPage('5s-audit')")
    .replace(/reloadPage\("5s-planning"\)/g, 'reloadPage("5s-audit")');
}
