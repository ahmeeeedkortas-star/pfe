/**
 * Audits & Planning — liste unifiée (tab 0) + planning annuel (tab 1).
 */
import { seedAudits } from '../../data/audits.data.js';
import {
  esc,
  refreshAuditListe,
  getAudits,
  statBadge,
  typeColor,
  scoreLabel,
  scoreColor,
  MONTHS_FR,
  monthFromDate,
} from '../../components/audit/audit-utils.js';
import { installAuditCrud } from '../../components/audit/audit-crud.js';

let bound = false;

function filteredAudits() {
  const f = window.auditFilter || {};
  const q = (f.q || '').toLowerCase();
  return getAudits().filter((a) => {
    if (f.type && a.type !== f.type) return false;
    if (f.statut && a.statut !== f.statut) return false;
    if (
      q &&
      !a.ref.toLowerCase().includes(q) &&
      !a.dep.toLowerCase().includes(q) &&
      !a.type.toLowerCase().includes(q) &&
      !a.aud.toLowerCase().includes(q)
    )
      return false;
    return true;
  });
}

function buildKpiStrip(D) {
  const clos = D.filter((a) => a.statut === 'Clôturé');
  const enc = D.filter((a) => a.statut === 'En cours');
  const plan = D.filter((a) => a.statut === 'Planifié');
  const txClos = D.length ? Math.round((clos.length / D.length) * 100) : 0;
  const avgScore = clos.length
    ? Math.round(clos.reduce((s, a) => s + (a.score || 0), 0) / clos.length)
    : 0;
  const ecarts = D.reduce((s, a) => s + (a.ecarts || 0), 0);

  const kpis = [
    ['📊', D.length, 'Total', '#eff6ff', '#2563eb'],
    ['🏁', clos.length, 'Clôturés', '#f0fdf4', '#16a34a'],
    ['⚡', enc.length, 'En cours', '#fffbeb', '#d97706'],
    ['📅', plan.length, 'Planifiés', '#f8fafc', '#64748b'],
    ['📈', txClos + '%', 'Taux clôture', '#f5f3ff', '#7c3aed'],
    ['⭐', avgScore ? avgScore + '%' : '—', 'Score moy.', '#eff6ff', '#2563eb'],
    ['⚠', ecarts, 'Écarts', '#fef2f2', '#dc2626'],
  ];

  const barColor = txClos >= 80 ? '#16a34a' : txClos >= 50 ? '#f59e0b' : '#dc2626';
  const badge =
    txClos >= 80
      ? '✅ Objectif atteint'
      : txClos >= 50
        ? '⚠ En progression'
        : '❌ Insuffisant';
  const badgeBg = txClos >= 80 ? '#f0fdf4' : txClos >= 50 ? '#fffbeb' : '#fef2f2';
  const badgeC = txClos >= 80 ? '#065f46' : txClos >= 50 ? '#92400e' : '#991b1b';

  return `
    <div class="audit-kpi-row">${kpis
      .map(
        ([ic, v, l, bg, c]) =>
          `<div class="audit-kpi" style="background:${bg}">
            <span style="font-size:16px">${ic}</span>
            <div class="audit-kpi-val" style="color:${c}">${v}</div>
            <div class="audit-kpi-lbl">${l}</div>
          </div>`
      )
      .join('')}</div>
    <div class="audit-closure-bar">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <span style="font-weight:700;font-size:var(--reg-fs-sm);color:var(--navy)">Taux de clôture des audits</span>
        <span style="background:${badgeBg};color:${badgeC};padding:4px 10px;border-radius:6px;font-size:var(--reg-fs-xs);font-weight:700">${badge}</span>
      </div>
      <div class="audit-closure-track">
        <div class="audit-closure-fill" style="width:${txClos}%;background:linear-gradient(90deg,${barColor},${barColor}cc)"></div>
        <div class="audit-closure-marker" style="left:80%" title="Objectif 80%"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:var(--reg-fs-xs);color:var(--muted);margin-top:6px">
        <span>${clos.length} / ${D.length} audits clôturés</span>
        <span style="font-weight:700;color:${barColor}">${txClos}%</span>
        <span>Objectif : 80%</span>
      </div>
    </div>`;
}

function buildDetailPanel(a) {
  if (!a) {
    return `<div class="card audit-detail-empty"><p style="color:var(--muted)">Sélectionnez un audit dans la liste.</p></div>`;
  }
  const sc = scoreColor(a.score);
  const sl = scoreLabel(a.score);
  const tc = typeColor(a.type);
  const info = [
    ['Date', a.date || '—'],
    ['Date fin', a.dateFin || '—'],
    ['Auditeur', a.aud],
    ['Département', a.dep],
    ['Périodicité', a.periodicite],
    ['Écarts', String(a.ecarts ?? 0)],
  ];
  const actions =
    (a.actions || []).length > 0
      ? a.actions
          .map(
            (act, i) =>
              `<div class="audit-action-item"><span class="audit-action-num">${i + 1}</span>${esc(act)}</div>`
          )
          .join('')
      : '<p style="font-size:var(--reg-fs-sm);color:var(--muted)">Aucune action corrective.</p>';

  return `<div class="card audit-detail-panel" style="margin-bottom:0">
    <div class="audit-detail-head" style="background:linear-gradient(135deg,${tc},${tc}99)">
      <div>
        <div style="font-size:18px;font-weight:800">${esc(a.ref)} — ${esc(a.type)}</div>
        <div style="font-size:var(--reg-fs-sm);opacity:.9;margin-top:4px">${esc(a.dep)} · ${esc(a.scope || '')}</div>
      </div>
      <div style="text-align:right">
        <div style="font-size:28px;font-weight:800;font-family:monospace">${a.score != null ? a.score + '%' : '—'}</div>
        <div style="font-size:var(--reg-fs-xs);opacity:.9">${sl}</div>
      </div>
    </div>
    <div style="padding:14px 16px">
      <div style="margin-bottom:14px">
        <div style="display:flex;justify-content:space-between;font-size:var(--reg-fs-sm);margin-bottom:6px">
          <span style="font-weight:600">Avancement</span>
          <span style="font-weight:800;color:${tc}">${a.prog ?? 0}%</span>
        </div>
        <div style="height:8px;background:#e5e7eb;border-radius:5px;overflow:hidden">
          <div style="height:100%;width:${a.prog ?? 0}%;background:${tc};border-radius:5px"></div>
        </div>
      </div>
      <div class="audit-info-grid">${info
        .map(
          ([k, v]) =>
            `<div class="audit-info-cell"><div class="fl">${k}</div><div style="font-weight:600;font-size:var(--reg-fs-sm)">${esc(v)}</div></div>`
        )
        .join('')}</div>
      ${a.obs ? `<div class="audit-obs-box"><div class="fl" style="margin-bottom:6px">Observations</div>${esc(a.obs)}</div>` : ''}
      <div class="audit-actions-box"><div class="fl" style="margin-bottom:8px">Actions correctives</div>${actions}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;padding-top:12px;border-top:1px solid var(--border)">
        <button type="button" class="btn bsm" data-audit-edit="${esc(a.id)}">✏ Modifier</button>
        <button type="button" class="btn bsm" data-audit-nav="audit-check">✓ Checklist</button>
        <button type="button" class="btn bsm bp" data-audit-nav="audit-rapport">📄 Rapport</button>
        <span class="badge ${statBadge(a.statut)}">${esc(a.statut)}</span>
      </div>
    </div>
  </div>`;
}

function buildListeTab(rows, sel, f) {
  const cards = rows
    .map((a) => {
      const active = a.id === sel?.id;
      const tc = typeColor(a.type);
      return `<div class="audit-card${active ? ' audit-card--sel' : ''}" data-audit-select="${esc(a.id)}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
          <span style="font-weight:800;color:${tc};font-family:monospace">${esc(a.ref)}</span>
          <span class="badge ${statBadge(a.statut)}" style="font-size:9px">${esc(a.statut)}</span>
        </div>
        <div style="font-weight:600;font-size:var(--reg-fs-sm);margin:6px 0 2px">${esc(a.type)}</div>
        <div style="font-size:var(--reg-fs-xs);color:var(--muted)">${esc(a.dep)} · ${esc(a.aud)}</div>
        <div style="display:flex;align-items:center;gap:8px;margin-top:10px">
          <div style="flex:1;height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden">
            <div style="height:100%;width:${a.prog ?? 0}%;background:${tc}"></div>
          </div>
          <span style="font-size:var(--reg-fs-xs);font-weight:700;color:${scoreColor(a.score)}">${a.score != null ? a.score + '%' : '—'}</span>
        </div>
      </div>`;
    })
    .join('');

  const total = getAudits().length;
  return `<div class="g23 audit-g23">
    <div>
      <div class="audit-section-head">
        <span class="ct">📋 Registre des audits (${total})</span>
        <button type="button" class="btn bp bsm" data-audit-add>+ Nouvel audit</button>
      </div>
      <div class="card" style="padding:10px 14px;margin-bottom:10px">
        <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
          <select class="sel" data-audit-filter="type">
            <option value="">Type : Tous</option>
            ${['Interne', 'ISO 9001', 'Sécurité', 'Environnement', 'Fournisseur']
              .map((t) => `<option value="${t}"${f.type === t ? ' selected' : ''}>${t}</option>`)
              .join('')}
          </select>
          <select class="sel" data-audit-filter="statut">
            <option value="">Statut : Tous</option>
            ${['Planifié', 'En cours', 'Clôturé']
              .map((s) => `<option value="${s}"${f.statut === s ? ' selected' : ''}>${s}</option>`)
              .join('')}
          </select>
          <input class="sel" data-audit-filter="q" placeholder="Rechercher ref, dép., auditeur…" value="${esc(f.q)}" style="flex:1;min-width:160px">
          <button type="button" class="btn bsm" data-audit-clear>Effacer</button>
          <span style="font-size:var(--reg-fs-xs);color:var(--muted)">${rows.length} audit(s)</span>
        </div>
      </div>
      <div class="audit-card-list">${cards || '<p style="color:var(--muted);padding:12px">Aucun audit.</p>'}</div>
    </div>
    <div id="audit_detail">${buildDetailPanel(sel)}</div>
  </div>`;
}

const MONTHS_SHORT = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

function buildPlanningLegend() {
  const types = ['ISO 9001', 'Interne', 'Sécurité', 'Environnement', 'Fournisseur'];
  const stats = [
    ['Clôturé', '#16a34a'],
    ['En cours', '#2563eb'],
    ['Planifié', '#94a3b8'],
  ];
  return `<div class="audit-plan-legend">
    ${types.map((t) => `<span class="audit-legend-pill" style="--pill-c:${typeColor(t)}">${esc(t)}</span>`).join('')}
    <span class="audit-legend-sep"></span>
    ${stats.map(([l, c]) => `<span class="audit-legend-dot"><i style="background:${c}"></i>${l}</span>`).join('')}
  </div>`;
}

function buildPlanningTab(D) {
  const year = new Date().getFullYear();
  const byMonth = Array.from({ length: 12 }, () => []);
  D.forEach((a) => {
    const mi = monthFromDate(a.date);
    if (mi >= 0) byMonth[mi].push(a);
  });

  const grid = MONTHS_SHORT.map((name, mi) => {
    const items = byMonth[mi];
    const itemsHtml = items
      .map((a) => {
        const tc = typeColor(a.type);
        const stBg =
          a.statut === 'Clôturé' ? '#f0fdf4' : a.statut === 'En cours' ? '#eff6ff' : '#f8fafc';
        const stCol =
          a.statut === 'Clôturé' ? '#16a34a' : a.statut === 'En cours' ? '#2563eb' : '#64748b';
        return `<div class="audit-plan-audit" data-audit-select="${esc(a.id)}" data-audit-tab="0" style="border-left:3px solid ${tc}">
          <div class="audit-plan-audit-ref" style="color:${tc}">${esc(a.ref)} · ${esc(a.type)}</div>
          <div class="audit-plan-audit-meta">${esc(a.dep)} · ${esc(a.aud)}</div>
          <span class="audit-plan-statut" style="background:${stBg};color:${stCol}">${esc(a.statut)}</span>
        </div>`;
      })
      .join('');
    return `<div class="audit-month-cell">
      <div class="audit-month-title">
        <span>${name}</span>
        ${items.length ? `<span class="audit-month-count">${items.length}</span>` : ''}
      </div>
      ${itemsHtml || '<div class="audit-month-empty">—</div>'}
    </div>`;
  }).join('');

  const timeline = [...D]
    .sort((a, b) => String(a.date).localeCompare(String(b.date)))
    .map((a) => {
      const dot =
        a.statut === 'Clôturé' ? '#16a34a' : a.statut === 'En cours' ? '#2563eb' : '#94a3b8';
      const tc = typeColor(a.type);
      return `<div class="audit-tl-row" data-audit-select="${esc(a.id)}" data-audit-tab="0">
        <div class="audit-tl-dot" style="background:${dot}"></div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;justify-content:space-between;gap:8px">
            <span style="font-weight:700;font-size:var(--reg-fs-sm)">${esc(a.ref)} — ${esc(a.type)}</span>
            <span style="font-size:var(--reg-fs-xs);color:var(--muted)">${esc(a.date)}</span>
          </div>
          <div style="font-size:var(--reg-fs-xs);color:var(--muted);margin:2px 0 6px">${esc(a.dep)} · ${esc(a.aud)}</div>
          <div style="height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden">
            <div style="height:100%;width:${a.prog ?? 0}%;background:${tc}"></div>
          </div>
        </div>
      </div>`;
    })
    .join('');

  const types = {};
  D.forEach((a) => {
    types[a.type] = (types[a.type] || 0) + 1;
  });
  const maxT = Math.max(...Object.values(types), 1);
  const typeBars = Object.entries(types)
    .map(([t, n]) => {
      const c = typeColor(t);
      const w = Math.round((n / maxT) * 100);
      return `<div style="margin-bottom:8px">
        <div style="display:flex;justify-content:space-between;font-size:var(--reg-fs-xs);margin-bottom:4px">
          <span style="font-weight:600">${esc(t)}</span><span>${n}</span>
        </div>
        <div style="height:6px;background:#e5e7eb;border-radius:4px"><div style="height:100%;width:${w}%;background:${c};border-radius:4px"></div></div>
      </div>`;
    })
    .join('');

  const clos = D.filter((a) => a.statut === 'Clôturé').length;
  const enc = D.filter((a) => a.statut === 'En cours').length;
  const plan = D.filter((a) => a.statut === 'Planifié').length;
  const tx = D.length ? Math.round((clos / D.length) * 100) : 0;

  return `<div class="audit-plan-layout">
    <div class="card" style="margin-bottom:12px">
      <div class="audit-section-head" style="margin-bottom:10px">
        <span class="ct">🗓️ Planning annuel — ${year}</span>
        <button type="button" class="btn bp bsm" data-audit-plan>+ Planifier</button>
      </div>
      ${buildPlanningLegend()}
      <div class="audit-month-grid">${grid}</div>
    </div>
    <div class="g23">
      <div class="card">
        <div class="ct" style="margin-bottom:12px">Timeline</div>
        <div class="audit-timeline">${timeline}</div>
      </div>
      <div>
        <div class="card" style="margin-bottom:12px">
          <div class="ct" style="margin-bottom:10px">Répartition par type</div>
          ${typeBars}
        </div>
        <div class="card">
          <div class="ct" style="margin-bottom:10px">Avancement global</div>
          ${[
            ['Clôturés', clos, '#16a34a'],
            ['En cours', enc, '#2563eb'],
            ['Planifiés', plan, '#94a3b8'],
          ]
            .map(
              ([l, v, c]) =>
                `<div class="drow"><span class="dk">${l}</span><span style="font-weight:800;color:${c}">${v}</span></div>`
            )
            .join('')}
          <div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--border);text-align:center">
            <div style="font-size:22px;font-weight:800;color:${tx >= 80 ? '#16a34a' : '#f59e0b'}">${tx}%</div>
            <div class="reg-meta">Taux de clôture</div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

export function renderAuditListe() {
  seedAudits();
  installAuditCrud();
  const D = getAudits();
  const tab = window.auditTab || 0;
  const f = window.auditFilter || {};
  const rows = filteredAudits();
  let sel = rows.find((a) => a.id === window.auditSelected) || rows[0];
  if (sel && sel.id !== window.auditSelected) window.auditSelected = sel.id;

  if (!bound) {
    bindAuditListe();
    bound = true;
  }

  window.auditRefresh = refreshAuditListe;

  const tabs = [
    ['Liste des audits', 0],
    ['Planning annuel', 1],
  ]
    .map(
      ([lbl, n]) =>
        `<button type="button" class="audit-tab${tab === n ? ' audit-tab--on' : ''}" data-audit-tab-switch="${n}">${lbl}</button>`
    )
    .join('');

  const body = tab === 1 ? buildPlanningTab(D) : buildListeTab(rows, sel, f);

  setTimeout(() => {
    const det = document.getElementById('audit_detail');
    if (det && tab === 0) det.innerHTML = buildDetailPanel(sel);
  }, 0);

  return `
  <div class="xm-register xm-register--audit" data-page="audit-liste">
    ${buildKpiStrip(D)}
    <div class="audit-tab-bar">${tabs}</div>
    ${body}
  </div>`;
}

function bindAuditListe() {
  document.addEventListener('click', (e) => {
    const root = e.target.closest('[data-page="audit-liste"]');
    if (!root) return;

    const tabSw = e.target.closest('[data-audit-tab-switch]');
    if (tabSw) {
      window.auditTab = +tabSw.dataset.auditTabSwitch;
      refreshAuditListe();
      return;
    }

    const sel = e.target.closest('[data-audit-select]');
    if (sel) {
      window.auditSelected = sel.dataset.auditSelect;
      if (sel.dataset.auditTab != null) window.auditTab = +sel.dataset.auditTab;
      refreshAuditListe();
      return;
    }

    const nav = e.target.closest('[data-audit-nav]');
    if (nav) {
      window.goPage?.(nav.dataset.auditNav);
      return;
    }

    if (e.target.closest('[data-audit-clear]')) {
      window.auditFilter = { type: '', statut: '', q: '' };
      refreshAuditListe();
    }
  });

  document.addEventListener('change', (e) => {
    if (!e.target.closest('[data-page="audit-liste"]')) return;
    const fl = e.target.closest('[data-audit-filter]');
    if (!fl) return;
    window.auditFilter = window.auditFilter || {};
    window.auditFilter[fl.dataset.auditFilter] = fl.value;
    refreshAuditListe();
  });

  document.addEventListener('input', (e) => {
    const fl = e.target.closest('[data-audit-filter="q"]');
    if (!fl?.closest('[data-page="audit-liste"]')) return;
    window.auditFilter = window.auditFilter || {};
    window.auditFilter.q = fl.value;
    clearTimeout(window._auditQTimer);
    window._auditQTimer = setTimeout(refreshAuditListe, 280);
  });
}
