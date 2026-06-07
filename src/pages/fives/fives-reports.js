/**
 * Rapports d'audit 5S — aperçu, PDF, Word, Excel.
 */
import { persistFivesV11 } from './fives-persist.js';
import { calcZoneScores, ensureClMeta, getClItemMeta, getClResponse } from './fives-checklist-store.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function scoreColor(v) {
  if (v >= 80) return '#16a34a';
  if (v >= 60) return '#f59e0b';
  return '#dc2626';
}

const PILLARS = [
  { key: 'S1', zKey: 'S', label: '1S — Seiri (Trier)' },
  { key: 'S2', zKey: 'T', label: '2S — Seiton (Ranger)' },
  { key: 'S3', zKey: 'N', label: '3S — Seiso (Nettoyer)' },
  { key: 'S4', zKey: 'S4', label: '4S — Seiketsu (Standardiser)' },
  { key: 'S5', zKey: 'S5', label: '5S — Shitsuke (Maintenir)' },
];

function collectPhotos(zoneId) {
  const meta = window.SS5_CL_META?.[zoneId];
  if (!meta?.items) return [];
  const CL = window.SS5_CL_TEMPLATE || {};
  const photos = [];
  Object.entries(meta.items).forEach(([key, val]) => {
    if (!val?.photo) return;
    const [pk, n] = key.split('-');
    const item = CL[pk]?.items?.find((it) => String(it.n) === n);
    photos.push({
      url: val.photo,
      caption: item?.label || key,
      pillar: pk,
    });
  });
  return photos;
}

export function getAuditReportData(auditId) {
  const a = (window.SS5_AUDITS || []).find((x) => x.id === auditId);
  if (!a) return null;
  const Z = (window.SS5_ZONES || []).find((z) => z.zone === a.zone) || {};
  const zoneId = Z.id;
  const CL = window.SS5_CL_TEMPLATE || {};
  const meta = zoneId ? ensureClMeta(zoneId) : { pointsForts: '', axes: '', sectionNotes: {} };

  const pillars = PILLARS.map((p) => {
    const sec = CL[p.key];
    const label = sec?.title || p.label;
    const items = (sec?.items || []).map((it) => {
      const rep = zoneId ? getClResponse(zoneId, p.key, it.n) : '—';
      const im = zoneId ? getClItemMeta(zoneId, p.key, it.n) : {};
      return { ...it, rep: rep || '—', remark: im.remark || '', photo: im.photo || '' };
    });
    const scored = items.filter((i) => i.rep === 'oui' || i.rep === 'non');
    const ok = items.filter((i) => i.rep === 'oui').length;
    const pct = scored.length ? Math.round((ok / scored.length) * 100) : Z[p.zKey] || 0;
    const sectionNote = meta.sectionNotes?.[p.key] || '';
    return { ...p, label, items, pct, sectionNote };
  });

  const scores = zoneId ? calcZoneScores(zoneId) : { global: a.score ?? 0 };
  const ecarts = (window.SS5_ECARTS || []).filter((e) => e.zone === a.zone).slice(0, 12);
  const actions = (window.SS5_ACTIONS || []).filter((x) => x.zone === a.zone).slice(0, 8);
  const photos = zoneId ? collectPhotos(zoneId) : [];

  return {
    audit: a,
    zone: Z,
    pillars,
    ecarts,
    actions,
    photos,
    pointsForts: meta.pointsForts || a.reportMeta?.pointsForts || '',
    axes: meta.axes || a.reportMeta?.axes || '',
    score: a.score ?? scores.global ?? 0,
  };
}

export function buildAuditReportHtml(auditId) {
  const data = getAuditReportData(auditId);
  if (!data) return '<p>Audit introuvable</p>';
  const { audit: a, zone: Z, pillars, ecarts, actions, photos, pointsForts, axes, score } = data;
  const col = scoreColor(score);

  const pilRows = pillars
    .map((p) => {
      const itemRows = p.items
        .map((it) => {
          const badge =
            it.rep === 'oui'
              ? '<span class="ss5-rpt-ok">Conforme</span>'
              : it.rep === 'non'
                ? '<span class="ss5-rpt-nok">Écart</span>'
                : it.rep === 'na'
                  ? '<span class="ss5-rpt-na">N/A</span>'
                  : '<span class="ss5-rpt-na">—</span>';
          const remark = it.remark ? `<div class="ss5-rpt-remark">Remarque : ${esc(it.remark)}</div>` : '';
          const photo = it.photo
            ? `<div class="ss5-rpt-photo-inline"><img src="${esc(it.photo)}" alt=""></div>`
            : '';
          return `<tr>
            <td>${String(it.n).padStart(2, '0')}</td>
            <td>${it.critical ? '<strong>!</strong> ' : ''}${esc(it.label)}${remark}${photo}</td>
            <td>${badge}</td>
          </tr>`;
        })
        .join('');
      const secNote = p.sectionNote
        ? `<p class="ss5-rpt-section-note"><em>Section : ${esc(p.sectionNote)}</em></p>`
        : '';
      return `<section class="ss5-rpt-pillar">
      <div class="ss5-rpt-pillar-head" style="border-left:4px solid ${scoreColor(p.pct)}">
        <strong>${esc(p.label)}</strong>
        <span style="color:${scoreColor(p.pct)};font-weight:800">${p.pct}%</span>
      </div>
      ${secNote}
      <table class="ss5-rpt-table"><thead><tr><th>#</th><th>Critère / remarques / photos</th><th>Résultat</th></tr></thead>
      <tbody>${itemRows}</tbody></table>
    </section>`;
    })
    .join('');

  const photoGallery = photos.length
    ? `<section class="ss5-rpt-gallery"><h2>Photos terrain</h2>
      <div class="ss5-rpt-gallery-grid">${photos
        .map(
          (ph) =>
            `<figure><img src="${esc(ph.url)}" alt=""><figcaption>${esc(ph.caption)} (${esc(ph.pillar)})</figcaption></figure>`
        )
        .join('')}</div></section>`
    : '';

  return `<!doctype html><html lang="fr"><head><meta charset="utf-8">
    <title>Rapport 5S — ${esc(a.id)}</title>
    <style>
      body{font-family:Inter,'Segoe UI',system-ui,sans-serif;margin:0;padding:32px 40px;color:#0f172a;line-height:1.55;background:#fff}
      .ss5-rpt-header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #166534;padding-bottom:16px;margin-bottom:24px}
      .ss5-rpt-brand{font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:.08em}
      .ss5-rpt-title{font-size:22px;font-weight:800;margin:6px 0 0}
      .ss5-rpt-score{font-size:42px;font-weight:800;color:${col}}
      .ss5-rpt-meta{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px}
      .ss5-rpt-meta div{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px 12px;font-size:11px}
      .ss5-rpt-meta strong{display:block;font-size:10px;color:#64748b;margin-bottom:4px}
      .ss5-rpt-block{background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:12px;margin-bottom:16px;font-size:12px}
      .ss5-rpt-pillar{margin-bottom:22px;page-break-inside:avoid}
      .ss5-rpt-pillar-head{display:flex;justify-content:space-between;padding:8px 12px;background:#f8fafc;border-radius:6px;margin-bottom:8px;font-size:12px}
      .ss5-rpt-table{width:100%;border-collapse:collapse;font-size:11px}
      .ss5-rpt-table th,.ss5-rpt-table td{border:1px solid #e2e8f0;padding:8px 10px;text-align:left;vertical-align:top}
      .ss5-rpt-table th{background:#f1f5f9;font-weight:700}
      .ss5-rpt-ok{color:#16a34a;font-weight:700}.ss5-rpt-nok{color:#dc2626;font-weight:700}.ss5-rpt-na{color:#94a3b8}
      .ss5-rpt-remark{font-size:10px;color:#64748b;margin-top:4px}
      .ss5-rpt-photo-inline img{max-width:120px;max-height:80px;border-radius:6px;margin-top:6px}
      .ss5-rpt-gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
      .ss5-rpt-gallery-grid img{width:100%;height:auto;border-radius:8px;border:1px solid #e2e8f0}
      .ss5-rpt-gallery figcaption{font-size:9px;color:#64748b;margin-top:4px}
      .ss5-rpt-side{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:20px}
      .ss5-rpt-side ul{font-size:11px}
      @media print{body{padding:16px}}
    </style></head><body>
    <div class="ss5-rpt-header">
      <div>
        <div class="ss5-rpt-brand">XPERT-MECA · QHSE Platform</div>
        <h1 class="ss5-rpt-title">Rapport d'audit 5S</h1>
        <div style="font-size:12px;color:#64748b;margin-top:6px">${esc(a.id)} · ${esc(a.zone)}</div>
      </div>
      <div style="text-align:right">
        <div class="ss5-rpt-score">${score}%</div>
        <div style="font-size:11px;color:#64748b">Score global</div>
      </div>
    </div>
    <div class="ss5-rpt-meta">
      <div><strong>Date</strong>${esc(a.date)}</div>
      <div><strong>Auditeur</strong>${esc(a.auditeur)}</div>
      <div><strong>Statut</strong>${esc(a.statut)}</div>
      <div><strong>Responsable zone</strong>${esc(Z.resp || '—')}</div>
      <div><strong>Département</strong>${esc(Z.dep || '—')}</div>
      <div><strong>Dernier audit</strong>${esc(Z.lastAudit || '—')}</div>
    </div>
    ${pointsForts ? `<div class="ss5-rpt-block"><strong>Points forts</strong><p style="margin:6px 0 0">${esc(pointsForts)}</p></div>` : ''}
    ${axes ? `<div class="ss5-rpt-block" style="background:#fffbeb;border-color:#fde68a"><strong>Axes d'amélioration</strong><p style="margin:6px 0 0">${esc(axes)}</p></div>` : ''}
    ${pilRows}
    ${photoGallery}
    <div class="ss5-rpt-side">
      <div><h3>Écarts</h3>${ecarts.length ? `<ul>${ecarts.map((e) => `<li>${esc(e.ecart)} <em>(${esc(e.statut)})</em></li>`).join('')}</ul>` : '<p>Aucun</p>'}</div>
      <div><h3>Actions</h3>${actions.length ? `<ul>${actions.map((x) => `<li>${esc(x.action)} — ${esc(x.statut)}</li>`).join('')}</ul>` : '<p>Aucune</p>'}</div>
    </div>
    <p style="margin-top:32px;font-size:10px;color:#94a3b8;text-align:center">Généré le ${new Date().toLocaleString('fr-FR')} — Module 5S QHSE</p>
  </body></html>`;
}

export function ss5OpenReportPreview(auditId) {
  const html = buildAuditReportHtml(auditId);
  const w = window.open('', '_blank');
  if (!w) {
    window.xmToast?.('Autorisez les popups pour l’aperçu', '', 'alert', '#dc2626');
    return;
  }
  w.document.write(html);
  w.document.close();
}

export function ss5ExportAuditPdf(auditId) {
  const html = buildAuditReportHtml(auditId);
  const w = window.open('', '_blank');
  if (!w) {
    window.xmToast?.('Autorisez les popups pour le PDF', '', 'alert', '#dc2626');
    return;
  }
  w.document.write(html);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 400);
  window.xmToast?.('Export PDF', 'Choisissez « Enregistrer en PDF » à l’impression', 'file', '#2563eb');
}

export function ss5ExportAuditWord(auditId) {
  const html = buildAuditReportHtml(auditId);
  const blob = new Blob([html], { type: 'application/msword' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `rapport-5s-${auditId}.doc`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 500);
}

export function ss5ExportAuditsExcel() {
  const rows = window.SS5_AUDITS || [];
  const header = 'ID;Date;Zone;Auditeur;Score;Statut';
  const body = rows
    .map((a) =>
      [a.id, a.date, a.zone, a.auditeur, a.score ?? '', a.statut]
        .map((c) => `"${String(c).replace(/"/g, '""')}"`)
        .join(';')
    )
    .join('\n');
  const blob = new Blob(['\ufeff' + header + '\n' + body], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `audits-5s-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  window.xmToast?.('Export Excel', 'Fichier CSV téléchargé', 'download', '#16a34a');
}

export function installFivesReports() {
  if (!window.__ss5ExportLegacy && typeof window.ss5Export === 'function') {
    window.__ss5ExportLegacy = window.ss5Export;
  }

  window.ss5ViewRapport = function ss5ViewRapport(id) {
    window.ss5SelectReport?.(id);
  };
  window.ss5OpenReportPreview = ss5OpenReportPreview;
  window.ss5ExportAuditPdf = ss5ExportAuditPdf;
  window.ss5ExportAuditWord = ss5ExportAuditWord;
  window.ss5ExportAuditsExcel = ss5ExportAuditsExcel;

  window.ss5Export = function ss5Export(type, auditId) {
    if (type === 'pdf' && auditId) {
      ss5ExportAuditPdf(auditId);
      return;
    }
    if (type === 'pdf') {
      const first = (window.SS5_AUDITS || []).find((a) => a.statut === 'Réalisé' && a.score != null);
      if (first) ss5ExportAuditPdf(first.id);
      else window.xmToast?.('Aucun audit réalisé à exporter', '', 'alert', '#dc2626');
      return;
    }
    if (type === 'csv' || type === 'excel') {
      ss5ExportAuditsExcel();
      return;
    }
    window.__ss5ExportLegacy?.(type);
  };
}
