/** @legacy — Accueil harmonisé sidebar navy + contenu blanc */
import { renderHomeIsoBar } from '../../config/home-photos.js';
import { renderHomeModuleIcon, renderHomeKpiIcon } from '../../components/icons/home-module-icons.js';
import { BRAND_LOGO_URL, BRAND_NAME, BRAND_TAGLINE } from '../../config/brand.js';
import { isEmptyPlatform } from '../../core/empty-platform.js';
import { HOME_MODULES, getHomeModuleBadge } from '../../config/home-modules.js';

const empty = isEmptyPlatform();

const homeKpis = empty
  ? [
      ['0', 'À traiter', 'siren', '#ef4444', '#fef2f2'],
      ['0', 'À traiter', 'clock', '#f97316', '#fff7ed'],
      ['—', 'Objectif 90 %', 'check-circle', '#16a34a', '#f0fdf4'],
      ['—', 'En cours', 'calendar', '#64748b', '#f8fafc'],
    ]
  : [
      ['3', 'À traiter', 'siren', '#ef4444', '#fef2f2'],
      ['8', 'À traiter', 'clock', '#f97316', '#fff7ed'],
      ['94%', 'Objectif : 90 %', 'check-circle', '#16a34a', '#f0fdf4'],
      ['Mai 2026', 'En cours', 'calendar', '#64748b', '#f8fafc'],
    ];

const kpiLabels = ['Alertes critiques', 'Actions en retard', 'Conformité globale', 'Période active'];

function renderKpiRow() {
  return homeKpis
    .map(
      ([v, hint, ic, accent, bg], i) => `
    <div class="home-kpi-card" style="--kpi-accent:${accent};--kpi-bg:${bg};animation-delay:${0.1 + i * 0.05}s">
      <span class="home-kpi-card__ic">${renderHomeKpiIcon(ic, 18)}</span>
      <div>
        <div class="home-kpi-card__val">${v}</div>
        <div class="home-kpi-card__lbl">${kpiLabels[i]}${hint ? ` · ${hint}` : ''}</div>
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
      style="--mod-accent:${m.bc};animation-delay:${0.15 + i * 0.04}s">
      <div class="hmod-card">
        ${badge != null ? `<span class="hmod-badge">${badge}</span>` : ''}
        <div class="hmod-icon-wrap" style="background:${m.bg};box-shadow:${m.shadow}">
          ${renderHomeModuleIcon(m.mod, 42)}
        </div>
        <span class="hmod-title">${m.label}</span>
        <span class="hmod-sub">${m.sub}</span>
        <span class="hmod-arrow">Accéder →</span>
      </div>
    </div>`;
  }).join('');
}

export default {
  accueil: () => `
<div class="home-wrap home-wrap--unified">

  <div class="home-bg home-bg--unified" aria-hidden="true">
    <div class="home-bg__blob home-bg__blob--navy"></div>
    <div class="home-bg__blob home-bg__blob--soft"></div>
  </div>

  <div class="home-content">

    <header class="home-hero">
      <div class="home-hero-brand">
        <img class="home-hero-logo" src="${BRAND_LOGO_URL}" alt="${BRAND_NAME}">
        <div>
          <h1 class="home-hero-title">${BRAND_NAME}</h1>
          <p class="home-hero-tagline">${BRAND_TAGLINE}</p>
          <p class="home-hero-motto">Notre expérience fait la différence</p>
        </div>
      </div>
      <p class="home-hero-desc">Plateforme SMI · QHSE · ISO 9001 · ISO 14001 · ISO 45001</p>
      ${renderHomeIsoBar()}
      <div class="home-kpi-row">${renderKpiRow()}</div>
    </header>

    <p class="home-section-label">Modules du système de management</p>

    <div class="home-modules-grid">${renderModules()}</div>

    <footer class="home-footer">${BRAND_NAME} · Ingénierie mécanique &amp; automatisation · Responsable QHSE : KORTAS.A</footer>

  </div>
</div>`,
};
