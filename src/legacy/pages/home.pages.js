/** @legacy — Accueil d'origine : mosaïque photo + modules dégradés */
import { renderHomePhotoMosaic, renderHomeIsoBar } from '../../config/home-photos.js';
import { renderHomeModuleIcon, renderHomeKpiIcon } from '../../components/icons/home-module-icons.js';
import { BRAND_LOGO_URL, BRAND_NAME, BRAND_TAGLINE } from '../../config/brand.js';
import { isEmptyPlatform } from '../../core/empty-platform.js';
import { HOME_MODULES, getHomeModuleBadge } from '../../config/home-modules.js';

const empty = isEmptyPlatform();

const homeKpis = empty
  ? [
      ['0', 'À traiter', 'siren', '#f87171', 'rgba(248,113,113,.15)'],
      ['0', 'À traiter', 'clock', '#fb923c', 'rgba(251,146,60,.12)'],
      ['—', 'Objectif 90 %', 'check-circle', '#4ade80', 'rgba(74,222,128,.12)'],
      ['—', 'En cours', 'calendar', '#94a3b8', 'rgba(148,163,184,.12)'],
    ]
  : [
      ['3', 'À traiter', 'siren', '#f87171', 'rgba(248,113,113,.15)'],
      ['8', 'À traiter', 'clock', '#fb923c', 'rgba(251,146,60,.12)'],
      ['94%', 'Objectif : 90 %', 'check-circle', '#4ade80', 'rgba(74,222,128,.12)'],
      ['Mai 2026', 'En cours', 'calendar', '#94a3b8', 'rgba(148,163,184,.12)'],
    ];

const kpiLabels = ['Alertes critiques', 'Actions en retard', 'Conformité globale', 'Période active'];

function renderKpiRow() {
  return homeKpis
    .map(
      ([v, hint, ic, c, bg], i) => `
    <div class="xm-home-kpi" style="background:${bg};border:1px solid ${c}40;animation-delay:${0.1 + i * 0.05}s">
      <span style="color:${c}">${renderHomeKpiIcon(ic, 18)}</span>
      <div>
        <div style="font-size:15px;font-weight:700;color:${c};line-height:1;font-family:monospace">${v}</div>
        <div style="font-size:9px;color:rgba(255,255,255,.5);margin-top:2px">${kpiLabels[i]}${hint ? ` · ${hint}` : ''}</div>
      </div>
    </div>`
    )
    .join('');
}

function renderModules() {
  return HOME_MODULES.map((m, i) => {
    const badge = getHomeModuleBadge(m.badgeKey, empty);
    return `
    <div class="hmod" role="button" tabindex="0"
      onclick="goModule('${m.mod}')"
      onkeydown="if(event.key==='Enter')goModule('${m.mod}')"
      style="animation-delay:${0.15 + i * 0.04}s">
      <div class="hmod-wrap" style="background:${m.bg};box-shadow:${m.shadow}">
        <div class="hmod-shine" aria-hidden="true"></div>
        ${badge != null ? `<span class="hmod-badge" style="background:${m.bc}">${badge}</span>` : ''}
        ${renderHomeModuleIcon(m.mod, 46)}
      </div>
      <span class="hmod-title">${m.label}</span>
      <span class="hmod-sub">${m.sub}</span>
    </div>`;
  }).join('');
}

export default {
  accueil: () => `
<div class="home-wrap home-wrap--classic home-wrap--photo">

  <div class="home-bg home-bg--photos" aria-hidden="true">
    ${renderHomePhotoMosaic()}
    <div class="home-bg__overlay"></div>
  </div>

  <div class="home-content">

    <header class="home-header-panel">
      <div class="home-brand-row">
        <img class="home-logo" src="${BRAND_LOGO_URL}" alt="${BRAND_NAME}">
        <div>
          <div class="home-brand-name">${BRAND_NAME}</div>
          <div class="home-brand-tag">${BRAND_TAGLINE}</div>
          <div class="home-brand-lead">Notre expérience fait la différence</div>
        </div>
      </div>
      <p class="home-brand-desc">Plateforme SMI · QHSE · ISO 9001 · ISO 14001 · ISO 45001</p>
      ${renderHomeIsoBar()}
      <div class="home-kpi-row">${renderKpiRow()}</div>
    </header>

    <p class="home-section-title">Modules du système de management</p>

    <div class="home-modules-grid">${renderModules()}</div>

    <p class="home-footer-line">${BRAND_NAME} · Ingénierie mécanique &amp; automatisation · Responsable QHSE : KORTAS.A</p>

  </div>
</div>`,
};
