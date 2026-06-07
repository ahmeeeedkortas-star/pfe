/**
 * Checklist 5S — évaluation, édition template, scores, remarques, photos.
 */
import { persistFivesV11 } from './fives-persist.js';
import { calcZoneScores, ensureClMeta, getClItemMeta, setClResponse } from './fives-checklist-store.js';
import { renderFivesChecklistToolbar } from './fives-checklist-toolbar.js';
import { renderIcon } from '../../components/icons/icon-render.js';

const PILLARS = [
  { key: 'S1', defaultLb: '1S – Seiri', defaultSub: 'Trier', col: '#2563eb' },
  { key: 'S2', defaultLb: '2S – Seiton', defaultSub: 'Ranger', col: '#16a34a' },
  { key: 'S3', defaultLb: '3S – Seiso', defaultSub: 'Nettoyer', col: '#7c3aed' },
  { key: 'S4', defaultLb: '4S – Seiketsu', defaultSub: 'Standardiser', col: '#f59e0b' },
  { key: 'S5', defaultLb: '5S – Shitsuke', defaultSub: 'Maintenir', col: '#dc2626' },
];

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function pillarLabel(pk) {
  const sec = window.SS5_CL_TEMPLATE?.[pk];
  return sec?.title || PILLARS.find((p) => p.key === pk)?.defaultLb || pk;
}

function pillarSub(pk) {
  const sec = window.SS5_CL_TEMPLATE?.[pk];
  return sec?.subtitle || PILLARS.find((p) => p.key === pk)?.defaultSub || '';
}

export function renderFivesChecklistPage() {
  const Z = window.SS5_ZONES || [];
  const selId = window.ss5ClZone || Z[0]?.id;
  const zObj = Z.find((z) => z.id === selId) || Z[0];
  if (!zObj) {
    return `<div class="fives-page content"><div class="card" style="padding:40px;text-align:center">Aucune zone 5S — créez une zone d'abord.</div></div>`;
  }

  window.ss5ClZone = zObj.id;
  if (!window.SS5_CL_DATA) window.SS5_CL_DATA = {};
  if (!window.SS5_CL_DATA[zObj.id]) window.SS5_CL_DATA[zObj.id] = {};
  ensureClMeta(zObj.id);

  const CL = window.SS5_CL_TEMPLATE || {};
  const D = window.SS5_CL_DATA[zObj.id];
  const meta = window.SS5_CL_META[zObj.id];
  const scores = calcZoneScores(zObj.id);
  const globalScore = scores.global;

  const zOpts = Z.map(
    (z) => `<option value="${esc(z.id)}"${z.id === selId ? ' selected' : ''}>${esc(z.zone)}</option>`
  ).join('');

  const pilBlocks = PILLARS.map((p) => {
    const pscore = scores.byPillar[p.key] ?? 0;
    const items = CL[p.key]?.items || [];
    const sectionNote = meta.sectionNotes?.[p.key] || '';

    const iRows = items
      .map((it) => {
        const rep = typeof D[p.key]?.[it.n] === 'object' ? D[p.key][it.n]?.rep : D[p.key]?.[it.n];
        const im = getClItemMeta(zObj.id, p.key, it.n);
        const isO = rep === 'oui';
        const isN = rep === 'non';
        const isA = rep === 'na';
        const photoHtml = im.photo
          ? `<img src="${esc(im.photo)}" alt="" class="ss5-cl-photo-thumb" onclick="ss5ClViewPhoto('${zObj.id}','${p.key}',${it.n})">`
          : '';

        return `<tr class="ss5-cl-row" data-rep="${rep || ''}" data-pillar="${p.key}" style="background:${isN ? '#fff9f9' : isO ? '#f9fff9' : '#fff'}">
          <td class="ss5-cl-num">${String(it.n).padStart(2, '0')}</td>
          <td class="ss5-cl-crit">${it.critical ? '<span class="ss5-cl-crit-badge">!</span>' : ''}${esc(it.label)}</td>
          <td class="ss5-cl-btns">
            <button type="button" class="ss5-cl-btn${isO ? ' is-on ok' : ''}" data-ss5-set data-zone="${esc(zObj.id)}" data-pk="${p.key}" data-n="${it.n}" data-val="oui">✓</button>
            <button type="button" class="ss5-cl-btn${isN ? ' is-on nok' : ''}" data-ss5-set data-zone="${esc(zObj.id)}" data-pk="${p.key}" data-n="${it.n}" data-val="non">✗</button>
            <button type="button" class="ss5-cl-btn${isA ? ' is-on na' : ''}" data-ss5-set data-zone="${esc(zObj.id)}" data-pk="${p.key}" data-n="${it.n}" data-val="na">N/A</button>
          </td>
          <td class="ss5-cl-remark">
            <input type="text" class="fi ss5-cl-remark-input" placeholder="Remarque…" value="${esc(im.remark)}"
              data-ss5-remark data-zone="${esc(zObj.id)}" data-pk="${p.key}" data-n="${it.n}">
          </td>
          <td class="ss5-cl-photo">
            ${photoHtml}
            <label class="ss5-cl-photo-add" title="Ajouter photo">
              ${renderIcon('file', { size: 14 })}
              <input type="file" accept="image/*" hidden data-ss5-photo data-zone="${esc(zObj.id)}" data-pk="${p.key}" data-n="${it.n}">
            </label>
          </td>
        </tr>`;
      })
      .join('');

    return `<section class="card ss5-cl-pillar" data-pillar="${p.key}" style="margin-bottom:12px">
      <div class="ss5-cl-pillar-head" style="--pillar-color:${p.col}">
        <div class="ss5-cl-pillar-badge">${p.key.replace('S', '')}S</div>
        <div class="ss5-cl-pillar-info">
          <div class="ss5-cl-pillar-title">${esc(pillarLabel(p.key))} — ${esc(pillarSub(p.key))}</div>
          <div class="ss5-cl-pillar-bar"><div class="ss5-cl-pillar-fill" data-score-fill="${p.key}" style="width:${pscore}%"></div></div>
        </div>
        <div class="ss5-cl-pillar-score" data-score-label="${p.key}">${pscore}%</div>
      </div>
      <div class="ss5-cl-section-note">
        <label class="fl">Note de section</label>
        <input type="text" class="fi" placeholder="Commentaire pour ce pilier 5S…" value="${esc(sectionNote)}"
          data-ss5-section-note data-zone="${esc(zObj.id)}" data-pk="${p.key}">
      </div>
      <table class="tbl ss5-cl-table">
        <thead><tr><th>#</th><th>Critère</th><th colspan="3" style="text-align:center">Réponse</th><th>Remarque</th><th>Photo</th></tr></thead>
        <tbody>${iRows || '<tr><td colspan="7" style="color:#94a3b8;text-align:center;padding:16px">Aucun critère — utilisez « Modifier checklist »</td></tr>'}</tbody>
      </table>
    </section>`;
  }).join('');

  return `<div class="fives-page content" id="ss5-checklist-root" data-zone-id="${esc(zObj.id)}">
    <div class="card ss5-cl-hero">
      <div class="ss5-cl-hero-text">
        <h2 class="ss5-cl-hero-title">Checklist 5S — Évaluation</h2>
        <p class="ss5-cl-hero-sub">Scores automatiques · remarques · photos · sauvegarde auto</p>
      </div>
      <div class="ss5-cl-hero-actions">
        <select class="fi ss5-cl-zone-select" id="ss5-cl-zone-select">${zOpts}</select>
        <div class="ss5-cl-global-score">
          <span id="ss5-global-score-val">${globalScore}</span>%
          <small>Score global</small>
        </div>
      </div>
    </div>

    <div class="ss5-cl-zones-bar" id="ss5-cl-zones-bar">
      <span class="ss5-cl-zones-bar__label">Zones 5S</span>
      <button type="button" class="ss5-btn ss5-btn--primary ss5-btn--sm" data-ss5-cl-zone-add>+ Nouvelle zone</button>
      <button type="button" class="ss5-btn ss5-btn--sm" data-ss5-cl-zone-edit>Modifier</button>
      <button type="button" class="ss5-btn ss5-btn--sm" data-ss5-cl-zone-rename>Renommer</button>
      <button type="button" class="ss5-btn ss5-btn--sm ss5-btn--danger" data-ss5-cl-zone-delete>Supprimer</button>
    </div>

    ${renderFivesChecklistToolbar(zObj.id)}

    <div class="card ss5-cl-summary-fields">
      <div><label class="fl">Points forts</label><textarea class="fi" id="ss5-points-forts" rows="2" placeholder="Éléments positifs observés…">${esc(meta.pointsForts)}</textarea></div>
      <div><label class="fl">Axes d'amélioration</label><textarea class="fi" id="ss5-axes" rows="2" placeholder="Pistes d'amélioration…">${esc(meta.axes)}</textarea></div>
    </div>

    ${pilBlocks}
  </div>`;
}
