/**
 * Rapports 5S — liste, génération, aperçu intégré, exports.
 */
import { getAuditReportData, buildAuditReportHtml } from './fives-reports.js';
import { syncAuditFromZone } from './fives-checklist-store.js';

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

export function renderFivesRapportsPage() {
  const AUD = window.SS5_AUDITS || [];
  const realises = AUD.filter((a) => a.statut === 'Réalisé' && (a.score != null || a.score === 0));
  const selId = window.ss5ReportSel || realises[0]?.id;
  const preview = selId ? getAuditReportData(selId) : null;

  const cards = realises.length
    ? realises
        .map((a) => {
          const col = scoreColor(a.score || 0);
          const active = a.id === selId ? ' ss5-rpt-card--active' : '';
          return `<article class="card ss5-rpt-card${active}" data-audit-id="${esc(a.id)}" onclick="ss5SelectReport('${esc(a.id)}')">
            <div class="ss5-rpt-card-head">
              <div>
                <div class="ss5-rpt-card-title">Rapport — ${esc(a.zone)}</div>
                <div class="ss5-rpt-card-meta">${esc(a.id)} · ${esc(a.date)} · ${esc(a.auditeur)}</div>
              </div>
              <div class="ss5-rpt-card-score" style="color:${col}">${a.score ?? '—'}%</div>
            </div>
            <div class="ss5-rpt-card-bar"><div style="width:${a.score || 0}%;background:${col}"></div></div>
            <div class="ss5-rpt-card-actions" onclick="event.stopPropagation()">
              <button type="button" class="btn bsm" onclick="ss5SelectReport('${esc(a.id)}')">👁 Aperçu</button>
              <button type="button" class="btn bsm" onclick="ss5ExportAuditPdf('${esc(a.id)}')">📄 PDF</button>
              <button type="button" class="btn bsm" onclick="ss5ExportAuditWord('${esc(a.id)}')">📝 Word</button>
            </div>
          </article>`;
        })
        .join('')
    : `<div class="card" style="padding:32px;text-align:center;color:#64748b">
        <p style="font-size:14px;font-weight:600;margin-bottom:8px">Aucun rapport disponible</p>
        <p style="font-size:11px">Réalisez une checklist puis cliquez sur « Générer rapport » ou validez un audit.</p>
        <button type="button" class="btn bp bsm" style="margin-top:12px" onclick="goPage('5s-checklist')">📋 Aller aux checklists</button>
      </div>`;

  let previewHtml = '';
  if (preview) {
    const { audit: a, zone: Z, pillars, ecarts, actions, score, photos, pointsForts, axes } = preview;
    const col = scoreColor(score);
    previewHtml = `
      <div class="card ss5-rpt-preview" id="ss5-rpt-preview-pane">
        <div class="ss5-rpt-preview-head">
          <div>
            <h3 class="ss5-rpt-preview-title">${esc(a.zone)}</h3>
            <p class="ss5-rpt-preview-sub">${esc(a.id)} · ${esc(a.date)} · ${esc(a.auditeur)}</p>
          </div>
          <div class="ss5-rpt-preview-score" style="color:${col}">${score}%</div>
        </div>
        <div class="ss5-rpt-preview-actions">
          <button type="button" class="btn bp bsm" onclick="ss5OpenReportPreview(${JSON.stringify(a.id)})">⛶ Plein écran</button>
          <button type="button" class="btn bsm" onclick="ss5ExportAuditPdf(${JSON.stringify(a.id)})">📄 PDF</button>
          <button type="button" class="btn bsm" onclick="ss5ExportAuditWord(${JSON.stringify(a.id)})">📝 Word</button>
          <button type="button" class="btn bsm" onclick="ss5RegenerateReport(${JSON.stringify(a.id)})">🔄 Régénérer</button>
        </div>
        ${pointsForts ? `<div class="ss5-rpt-block"><strong>Points forts</strong><p>${esc(pointsForts)}</p></div>` : ''}
        ${axes ? `<div class="ss5-rpt-block"><strong>Axes d'amélioration</strong><p>${esc(axes)}</p></div>` : ''}
        <div class="ss5-rpt-pillars-grid">
          ${pillars
            .map(
              (p) => `
            <div class="ss5-rpt-mini-pillar">
              <div class="ss5-rpt-mini-head" style="color:${scoreColor(p.pct)}">${esc(p.label)} <span>${p.pct}%</span></div>
              <ul class="ss5-rpt-mini-list">
                ${p.items
                  .slice(0, 6)
                  .map((it) => {
                    const st =
                      it.rep === 'oui' ? '✓' : it.rep === 'non' ? '✗' : it.rep === 'na' ? '—' : '?';
                    return `<li><span>${st}</span> ${esc(it.label)}${it.remark ? ` <em>(${esc(it.remark)})</em>` : ''}</li>`;
                  })
                  .join('')}
                ${p.items.length > 6 ? `<li><em>+ ${p.items.length - 6} critères…</em></li>` : ''}
              </ul>
            </div>`
            )
            .join('')}
        </div>
        ${
          photos?.length
            ? `<div class="ss5-rpt-photos"><strong>Photos terrain</strong><div class="ss5-rpt-photo-grid">${photos
                .map(
                  (ph) =>
                    `<figure><img src="${esc(ph.url)}" alt=""><figcaption>${esc(ph.caption)}</figcaption></figure>`
                )
                .join('')}</div></div>`
            : ''
        }
        <div class="ss5-rpt-side-grid">
          <div><strong>Écarts (${ecarts.length})</strong><ul>${ecarts.map((e) => `<li>${esc(e.ecart)}</li>`).join('') || '<li>Aucun</li>'}</ul></div>
          <div><strong>Actions (${actions.length})</strong><ul>${actions.map((x) => `<li>${esc(x.action)}</li>`).join('') || '<li>Aucune</li>'}</ul></div>
        </div>
      </div>`;
  }

  return `<div class="fives-page content" id="ss5-rapports-root">
    <div class="card ss5-rpt-hero">
      <div>
        <h2 class="ss5-rpt-hero-title">Rapports d'audit 5S</h2>
        <p class="ss5-rpt-hero-sub">${realises.length} rapport(s) · génération automatique depuis les checklists</p>
      </div>
      <div class="ss5-rpt-hero-btns">
        <button type="button" class="btn bsm" style="background:rgba(255,255,255,.2);color:#fff;border-color:rgba(255,255,255,.35)" onclick="ss5ExportAllReportsPdf()">📄 PDF global</button>
        <button type="button" class="btn bp bsm" onclick="ss5Export('excel')">📊 Excel</button>
        <button type="button" class="btn bsm" onclick="ss5GenerateAllReports()">⚡ Générer tout</button>
      </div>
    </div>
    <div class="ss5-rpt-layout">
      <div class="ss5-rpt-list">${cards}</div>
      <div class="ss5-rpt-preview-col">${previewHtml || '<div class="card ss5-rpt-empty"><p>Sélectionnez un rapport pour l’aperçu</p></div>'}</div>
    </div>
  </div>`;
}

export function installFivesRapportsGlobals() {
  window.ss5SelectReport = function ss5SelectReport(id) {
    window.ss5ReportSel = id;
    window.reloadPage?.('5s-rapports');
  };

  window.ss5RegenerateReport = function ss5RegenerateReport(auditId) {
    const a = (window.SS5_AUDITS || []).find((x) => x.id === auditId);
    if (!a) return;
    const Z = (window.SS5_ZONES || []).find((z) => z.zone === a.zone);
    if (Z) syncAuditFromZone(Z.id);
    window.ss5Notify?.('Rapport régénéré', auditId, 'success');
    window.reloadPage?.('5s-rapports');
  };

  window.ss5GenerateAllReports = function ss5GenerateAllReports() {
    (window.SS5_ZONES || []).forEach((z) => {
      if (calcHasData(z.id)) syncAuditFromZone(z.id);
    });
    window.ss5Notify?.('Rapports générés', 'Toutes les zones avec données', 'success');
    window.reloadPage?.('5s-rapports');
  };

  window.ss5ExportAllReportsPdf = function ss5ExportAllReportsPdf() {
    const first = (window.SS5_AUDITS || []).find((a) => a.statut === 'Réalisé');
    if (first) window.ss5ExportAuditPdf?.(first.id);
  };
}

function calcHasData(zoneId) {
  const D = window.SS5_CL_DATA?.[zoneId];
  if (!D) return false;
  return Object.keys(D).some((pk) => Object.keys(D[pk] || {}).length > 0);
}
