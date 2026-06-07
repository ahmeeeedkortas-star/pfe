/**
 * Audit v11 — données métier, processus, KPI, notifications, rapports.
 */
export const AUDIT_DEFAULT_PROCESSES = [
  'Production',
  'Achat',
  'Développement',
  'Qualité',
  'Commercial',
  'RH',
  'Environnement',
  'Sécurité',
];

export function ensureAuditProcesses() {
  if (!window.AUDIT_PROCESSES?.length) {
    window.AUDIT_PROCESSES = [...AUDIT_DEFAULT_PROCESSES];
  }
  return window.AUDIT_PROCESSES;
}

export function addAuditProcess(name) {
  const n = String(name || '').trim();
  if (!n) return false;
  const list = ensureAuditProcesses();
  if (!list.includes(n)) list.push(n);
  return true;
}

export function getAuditProcesses() {
  return ensureAuditProcesses();
}

export function parseAuditFrDate(str) {
  if (!str) return null;
  const p = String(str).split(/[/.-]/);
  if (p.length < 3) return null;
  const d = parseInt(p[0], 10);
  const m = parseInt(p[1], 10) - 1;
  let y = parseInt(p[2], 10);
  if (y < 100) y += 2000;
  const dt = new Date(y, m, d);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

export function formatAuditFrDate(dt) {
  if (!dt) return '—';
  return `${String(dt.getDate()).padStart(2, '0')}/${String(dt.getMonth() + 1).padStart(2, '0')}/${dt.getFullYear()}`;
}

export function isoToFr(iso) {
  if (!iso) return '';
  const p = iso.split('-');
  if (p.length !== 3) return iso;
  return `${p[2]}/${p[1]}/${p[0]}`;
}

export function daysUntil(dateStr) {
  const d = parseAuditFrDate(dateStr);
  if (!d) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  return Math.round((d - now) / 86400000);
}

export function migrateAuditConstats() {
  const C = window.AUDIT_CONSTATS || [];
  window.AUDIT_CONSTATS = C.map((c) => {
    let type = c.type;
    if (type === 'OBS' || type === 'BP') type = 'AC';
    const delai = c.delai || c.echeance || '';
    return { ...c, type, delai };
  });
}

export function buildAuditKpiModel() {
  const P = window.AUDIT_PLANS || [];
  const C = window.AUDIT_CONSTATS || [];
  const A = window.AUDIT_ACTIONS || [];
  const H = window.AUDIT_KPI_HIST || [];

  const done = P.filter((a) => a.statut === 'Terminé').length;
  const late = P.filter((a) => a.statut === 'En retard' || daysUntil(a.dateDebut) < 0).length;
  const scores = P.filter((a) => a.score != null).map((a) => +a.score);
  const tauxConf = scores.length ? Math.round(scores.reduce((s, v) => s + v, 0) / scores.length) : 0;
  const nc = C.filter((c) => c.type === 'NC').length;
  const ac = C.filter((c) => c.type === 'AC').length;
  const ncOpen = C.filter((c) => c.type === 'NC' && c.statut !== 'Clôturé').length;
  const actionsClosed = A.filter((a) => a.statut === 'Terminée').length;
  const tauxCloture = A.length ? Math.round((actionsClosed / A.length) * 100) : 0;

  const byProc = {};
  getAuditProcesses().forEach((p) => {
    byProc[p] = { audits: 0, nc: 0, ac: 0, scoreSum: 0, scoreN: 0 };
  });
  P.forEach((a) => {
    const k = a.processus || 'Autre';
    if (!byProc[k]) byProc[k] = { audits: 0, nc: 0, ac: 0, scoreSum: 0, scoreN: 0 };
    byProc[k].audits++;
    if (a.score != null) {
      byProc[k].scoreSum += +a.score;
      byProc[k].scoreN++;
    }
  });
  C.forEach((c) => {
    const k = c.processus || 'Autre';
    if (!byProc[k]) byProc[k] = { audits: 0, nc: 0, ac: 0, scoreSum: 0, scoreN: 0 };
    if (c.type === 'NC') byProc[k].nc++;
    if (c.type === 'AC') byProc[k].ac++;
  });

  const upcoming = P.filter((a) => {
    const d = daysUntil(a.dateDebut);
    return d != null && d >= 0 && d <= 14 && a.statut !== 'Terminé';
  }).sort((a, b) => (daysUntil(a.dateDebut) ?? 99) - (daysUntil(b.dateDebut) ?? 99));

  return {
    total: P.length,
    done,
    late,
    tauxConf,
    nc,
    ac,
    ncOpen,
    tauxCloture,
    hist: H,
    byProc,
    upcoming,
  };
}

export function computeAuditNotifications() {
  const P = window.AUDIT_PLANS || [];
  const A = window.AUDIT_ACTIONS || [];
  const items = [];

  P.forEach((a) => {
    const d = daysUntil(a.dateDebut);
    if (d == null) return;
    if (d < 0 && a.statut !== 'Terminé') {
      items.push({
        id: `N-AUD-LATE-${a.id}`,
        level: 'danger',
        titre: `Audit en retard — ${a.ref}`,
        detail: `${a.titre} (${Math.abs(d)} j)`,
        page: 'audit-planning',
      });
    } else if (d <= 7 && d >= 0 && a.statut === 'Planifié') {
      items.push({
        id: `N-AUD-SOON-${a.id}`,
        level: d <= 3 ? 'warning' : 'info',
        titre: `Audit à venir — ${a.ref}`,
        detail: `Dans ${d} jour(s) — ${a.processus}`,
        page: 'audit-planning',
      });
    }
  });

  A.forEach((act) => {
    const d = daysUntil(act.echeance);
    if (d != null && d < 0 && act.statut !== 'Terminée') {
      items.push({
        id: `N-ACT-LATE-${act.id}`,
        level: 'warning',
        titre: `Action en retard — ${act.id}`,
        detail: act.action?.slice(0, 50) || '',
        page: 'audit-actions',
      });
    }
  });

  window.AUDIT_NOTIFICATIONS = items;
  return items;
}

export function auditProcessSelectOptions(selected = '') {
  const procs = getAuditProcesses();
  const opts = procs
    .map((p) => `<option value="${escAttr(p)}"${p === selected ? ' selected' : ''}>${escAttr(p)}</option>`)
    .join('');
  return `${opts}<option value="__new__">+ Nouveau processus…</option>`;
}

export function escAttr(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

export function readAuditProcessSelect(id) {
  const sel = document.getElementById(id);
  if (!sel) return '';
  if (sel.value === '__new__') {
    const v = document.getElementById(`${id}_new`)?.value?.trim();
    if (v) addAuditProcess(v);
    return v;
  }
  return sel.value;
}

export function bindAuditProcessSelect(id) {
  setTimeout(() => {
    const sel = document.getElementById(id);
    const inp = document.getElementById(`${id}_new`);
    if (!sel || !inp) return;
    const toggle = () => {
      const isNew = sel.value === '__new__';
      inp.style.display = isNew ? 'block' : 'none';
      if (!isNew) inp.value = '';
    };
    sel.addEventListener('change', toggle);
    toggle();
  }, 40);
}

export function buildAuditReportHtml(auditId, draftHtml) {
  const a = (window.AUDIT_PLANS || []).find((x) => x.id === auditId);
  const C = (window.AUDIT_CONSTATS || []).filter((c) => c.auditId === auditId);
  const Acts = (window.AUDIT_ACTIONS || []).filter((x) => x.auditId === auditId);
  const clId = window.auditSelCL;
  const cl = (window.AUDIT_CHECKLISTS || []).find((x) => x.id === clId);
  const clData = window.AUDIT_CL_DATA?.[clId] || {};

  const checklistRows = (cl?.items || [])
    .map((it) => {
      const r = clData[it.n] || '—';
      return `<tr><td>${it.n}</td><td>${it.section}</td><td>${it.exig}</td><td>${it.desc}</td><td>${r}</td></tr>`;
    })
    .join('');

  const constatRows = C.map(
    (c) =>
      `<tr><td>${c.id}</td><td>${c.type}</td><td>${c.desc}</td><td>${c.gravite}</td><td>${c.statut}</td><td>${c.resp}</td><td>${c.delai || '—'}</td></tr>`
  ).join('');

  const actionRows = Acts.map(
    (act) =>
      `<tr><td>${act.id}</td><td>${act.action}</td><td>${act.resp}</td><td>${act.echeance}</td><td>${act.prog}%</td><td>${act.statut}</td></tr>`
  ).join('');

  const body =
    draftHtml ||
    `<p>Rapport d'audit généré automatiquement — conformité ISO 9001 / 14001 / 45001.</p>
    <h2>Synthèse</h2>
    <p><strong>Audit:</strong> ${a?.titre || '—'} · <strong>Processus:</strong> ${a?.processus || '—'} · <strong>Score:</strong> ${a?.score ?? '—'}%</p>
    <h2>Résultats checklist</h2>
    <table border="1" cellpadding="6" cellspacing="0" style="width:100%;border-collapse:collapse">
    <tr><th>#</th><th>Section</th><th>Exig.</th><th>Point</th><th>Résultat</th></tr>${checklistRows || '<tr><td colspan="5">Aucune donnée</td></tr>'}
    </table>
    <h2>Constats (NC / AC)</h2>
    <table border="1" cellpadding="6" cellspacing="0" style="width:100%;border-collapse:collapse">
    <tr><th>ID</th><th>Type</th><th>Description</th><th>Criticité</th><th>Statut</th><th>Resp.</th><th>Délai</th></tr>${constatRows || '<tr><td colspan="7">Aucun</td></tr>'}
    </table>
    <h2>Actions correctives</h2>
    <table border="1" cellpadding="6" cellspacing="0" style="width:100%;border-collapse:collapse">
    <tr><th>ID</th><th>Action</th><th>Resp.</th><th>Échéance</th><th>Prog.</th><th>Statut</th></tr>${actionRows || '<tr><td colspan="6">Aucune</td></tr>'}
    </table>
    <h2>Signatures</h2>
    <p>Auditeur: ${a?.auditeur || '—'} · Responsable: ${a?.resp || '—'} · Date: ${formatAuditFrDate(new Date())}</p>`;

  return `<!doctype html><html><head><meta charset="utf-8"><title>Rapport ${escAttr(a?.ref || auditId)}</title>
  <style>body{font-family:Inter,Arial,sans-serif;padding:28px;color:#0f172a;font-size:12px} h1{font-size:22px} h2{font-size:15px;margin-top:18px;color:#0c4a6e} table{font-size:11px}</style></head>
  <body><h1>Rapport d'audit QHSE</h1><p style="color:#64748b">${a?.ref || ''} — ${a?.type || ''}</p>${body}</body></html>`;
}

export function downloadAuditReportWord(auditId, html) {
  const doc = buildAuditReportHtml(auditId, html);
  const blob = new Blob([doc], { type: 'application/msword;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `rapport-audit-${auditId || 'draft'}.doc`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function printAuditReport(auditId, html) {
  const w = window.open('', '_blank', 'width=1024,height=800');
  if (!w) {
    window.xmToast?.('Autorisez les popups pour imprimer / PDF', '', '⚠', '#dc2626');
    return;
  }
  w.document.write(buildAuditReportHtml(auditId, html));
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 250);
}
