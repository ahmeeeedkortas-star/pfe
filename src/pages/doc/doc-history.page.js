/**
 * Historique global — modifications et traçabilité ISO.
 */
import { getObsoleteDocs } from './doc-iso.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

export function renderDocHistoryPage() {
  const D = window.DOC_DATA || [];
  const allHistory = [];
  const allAudit = [];

  D.forEach((d) => {
    (d.history || []).forEach((h) => allHistory.push({ doc: d, h, kind: 'revision' }));
    (d.auditTrail || []).forEach((a) => allAudit.push({ doc: d, a, kind: 'audit' }));
  });

  allHistory.sort(
    (a, b) =>
      new Date(b.h.date.split('/').reverse().join('-')) -
      new Date(a.h.date.split('/').reverse().join('-'))
  );
  allAudit.sort(
    (a, b) =>
      new Date(b.a.date.split('/').reverse().join('-')) -
      new Date(a.a.date.split('/').reverse().join('-'))
  );

  const obsolete = getObsoleteDocs();

  const historyRows = allHistory
    .map(
      ({ doc: d, h }) => `<tr>
    <td>
      <div style="font-size:11px;font-weight:700;color:#0f172a">${esc(d.titre)}</div>
      <div style="font-size:9.5px;color:#94a3b8">${esc(d.code || d.id)}</div>
    </td>
    <td style="font-size:10px;color:#64748b">${esc(d.type)}</td>
    <td><span style="background:#eff6ff;color:#2563eb;padding:2px 8px;border-radius:5px;font-size:10px;font-weight:700">${esc(h.v)}</span></td>
    <td style="font-size:10.5px;color:#64748b;white-space:nowrap">${esc(h.date)}</td>
    <td style="font-size:10.5px">${esc(h.auteur)}</td>
    <td style="font-size:10.5px;max-width:200px">${esc(h.motif)}</td>
    <td><button type="button" onclick="window.doc_sel='${d.id}';goPage('doc-read')" class="btn bsm">👁</button></td>
  </tr>`
    )
    .join('');

  const auditRows = allAudit
    .slice(0, 50)
    .map(
      ({ doc: d, a }) => `<tr>
    <td style="font-size:10px;color:#64748b">${esc(a.date)}</td>
    <td>
      <div style="font-size:10.5px;font-weight:600">${esc(d.titre)}</div>
      <div style="font-size:9px;color:#94a3b8">${esc(d.code || d.id)}</div>
    </td>
    <td style="font-size:10px">${esc(a.action)}</td>
    <td style="font-size:10px">${esc(a.user)}</td>
    <td style="font-size:10px;color:#64748b">${esc(a.comment || '—')}</td>
  </tr>`
    )
    .join('');

  const obsoleteRows = obsolete
    .map(
      (d) => `<tr style="opacity:0.85">
    <td>
      <div style="font-size:11px;font-weight:700;color:#0f172a">${esc(d.titre)}</div>
      <div style="font-size:9.5px;color:#94a3b8">${esc(d.code || d.id)}</div>
    </td>
    <td style="font-size:10px">${esc(d.version)}</td>
    <td><span style="background:#fef2f2;color:#dc2626;padding:2px 8px;border-radius:12px;font-size:9px;font-weight:700">${esc(d.statut)}</span></td>
    <td style="font-size:10px;color:#64748b">${esc(d.dateArchivage || d.dateMaj)}</td>
    <td><button type="button" onclick="window.doc_sel='${d.id}';goPage('doc-read')" class="btn bsm">👁 Consulter</button></td>
  </tr>`
    )
    .join('');

  return `
  <div class="card" style="margin-bottom:12px;padding:0;overflow:hidden">
    <div class="ch" style="padding:12px 15px">
      <span class="ct">🕐 Historique des révisions</span>
      <span style="font-size:10px;color:#94a3b8">${allHistory.length} entrées</span>
    </div>
    <div style="overflow-x:auto">
      <table class="tbl">
        <thead><tr><th>Document</th><th>Type</th><th>Version</th><th>Date</th><th>Auteur</th><th>Motif</th><th></th></tr></thead>
        <tbody>${historyRows || '<tr><td colspan="7" style="text-align:center;padding:20px;color:#94a3b8">Aucune révision</td></tr>'}</tbody>
      </table>
    </div>
  </div>

  <div class="card" style="margin-bottom:12px;padding:0;overflow:hidden">
    <div class="ch" style="padding:12px 15px">
      <span class="ct">📋 Journal de traçabilité</span>
      <span style="font-size:10px;color:#94a3b8">${allAudit.length} actions</span>
    </div>
    <div style="overflow-x:auto">
      <table class="tbl">
        <thead><tr><th>Date</th><th>Document</th><th>Action</th><th>Utilisateur</th><th>Commentaire</th></tr></thead>
        <tbody>${auditRows || '<tr><td colspan="5" style="text-align:center;padding:20px;color:#94a3b8">Aucune action</td></tr>'}</tbody>
      </table>
    </div>
  </div>

  <div class="card" style="padding:0;overflow:hidden;background:#f8fafc">
    <div class="ch" style="padding:12px 15px">
      <span class="ct">🗄 Documents obsolètes & archivés</span>
      <span style="font-size:10px;color:#94a3b8">${obsolete.length} document(s) — consultation seule</span>
    </div>
    <div style="overflow-x:auto">
      <table class="tbl">
        <thead><tr><th>Document</th><th>Version</th><th>Statut</th><th>Date</th><th></th></tr></thead>
        <tbody>${obsoleteRows || '<tr><td colspan="5" style="text-align:center;padding:20px;color:#94a3b8">Aucun document archivé</td></tr>'}</tbody>
      </table>
    </div>
  </div>`;
}
