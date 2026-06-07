/**
 * KPI RC — tableau de bord + objectifs qualité.
 */
import {
  renderObjectifsPanel,
  renderKpiStrip,
  renderKpiTabs,
} from '../../components/kpi/kpi-shell.js';
import {
  renderRcAlertBanner,
  renderRcChartsRow,
  renderRcClientsTable,
  renderRcDashboardHeader,
  renderRcMetricCards,
  renderRcPareto,
  renderRcTrimestreGrid,
} from '../../components/kpi/rc-kpi-dashboard.js';
import {
  computeRcDashboard,
  computeRcKpisTrimestre,
  getRcYears,
  getTrimestreObjectifCards,
  RC_OBJ,
  TRIMESTRE_PERIODES,
  TRIMESTRES,
} from '../../data/rc-kpi.data.js';
import { currentTrimestre } from '../../data/rc-trimestre.store.js';

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}
function fmt(n, d = 1) {
  return Number(n).toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
}

function buildObjectifsRows(k) {
  return [
    {
      label: 'Taux de réclamations clients',
      objectif: `≤ ${RC_OBJ.maxRcTrimestre} RC / trimestre`,
      valeur: `${k.n} RC`,
      ok: k.ok.volumeTrimestre,
      hint: `Période : ${esc(k.trimestre)} ${k.year} (${esc(k.label)})`,
    },
    {
      label: 'Temps moyen de traitement',
      objectif: `≤ ${RC_OBJ.tempsMoyenJours} jours`,
      valeur: `${fmt(k.tempsMoyen, 1)} j`,
      ok: k.ok.tempsMoyen,
    },
    {
      label: 'Taux de clôture dans les délais',
      objectif: `≥ ${RC_OBJ.tauxClotureDelais} %`,
      valeur: `${k.tauxClotureDelais} %`,
      ok: k.ok.tauxClotureDelais,
      hint: `RC clôturées en ≤ ${RC_OBJ.tempsMoyenJours} jours.`,
    },
    {
      label: 'Taux de réclamations répétitives',
      objectif: `≤ ${RC_OBJ.tauxRepetitives} %`,
      valeur: `${k.repetitives.taux} % (${k.repetitives.count} RC)`,
      ok: k.ok.tauxRepetitives,
    },
  ];
}

function renderPeriodToolbar(year, trimestre, mode) {
  const years = getRcYears();
  if (!years.includes(year)) years.unshift(year);

  return `<div class="rc-kpi-toolbar card">
    <div class="rc-kpi-toolbar-inner">
      <div class="rc-kpi-toolbar-label">
        <span class="rc-kpi-toolbar-title">${mode === 'objectifs' ? 'Période des objectifs' : 'Filtrer la période'}</span>
        <span class="rc-kpi-toolbar-hint">Calcul automatique selon les dates des RC</span>
      </div>
      <div class="rc-kpi-toolbar-fields">
        <label class="rc-kpi-field">
          <span>Année</span>
          <select class="sel rc-kpi-sel" data-rc-kpi-annee>
            ${years.map((y) => `<option value="${y}"${y === year ? ' selected' : ''}>${y}</option>`).join('')}
          </select>
        </label>
        <label class="rc-kpi-field">
          <span>Trimestre</span>
          <select class="sel rc-kpi-sel" data-rc-kpi-trimestre>
            ${TRIMESTRES.map(
              (t) =>
                `<option value="${t}"${t === trimestre ? ' selected' : ''}>${t} · ${esc(TRIMESTRE_PERIODES[t])}</option>`
            ).join('')}
          </select>
        </label>
      </div>
    </div>
  </div>`;
}

function panelDashboard(d, year, trimCards, tab) {
  const lastUpdate = new Date().toLocaleDateString('fr-FR');
  return `<section class="kpi-panel rc-kpi-dash"${tab !== 'dashboard' ? ' hidden' : ''}>
    ${renderRcDashboardHeader(d.per, lastUpdate, year, d.trimestre)}
    ${renderRcAlertBanner(d.alert)}
    ${renderRcMetricCards(d)}
    ${renderRcChartsRow(d, year)}
    <div class="g2 rc-kpi-lower" style="gap:12px">
      ${renderRcTrimestreGrid(year, trimCards)}
      ${renderRcPareto(d)}
    </div>
    <div class="rc-kpi-clients">${renderRcClientsTable(d.clients)}</div>
  </section>`;
}

function panelSynthese(k, year, trimestre, tab) {
  return `<section class="kpi-panel rc-kpi-obj"${tab !== 'synthese' ? ' hidden' : ''}>
    ${renderObjectifsPanel(
      buildObjectifsRows(k),
      `Indicateurs de performance — ${esc(trimestre)} ${year}`
    )}
    ${renderKpiStrip([
      {
        label: 'Réclamations clients',
        value: String(k.n),
        color: k.ok.volumeTrimestre ? '#185FA5' : '#dc2626',
        sub: `Objectif ≤ ${RC_OBJ.maxRcTrimestre}`,
      },
      {
        label: 'Temps moyen',
        value: `${fmt(k.tempsMoyen, 1)} j`,
        color: k.ok.tempsMoyen ? 'var(--navy)' : '#ea580c',
      },
      {
        label: 'Clôture délais',
        value: `${k.tauxClotureDelais} %`,
        color: k.ok.tauxClotureDelais ? 'var(--green)' : '#b91c1c',
      },
      {
        label: 'Répétitives',
        value: `${k.repetitives.taux} %`,
        color: k.ok.tauxRepetitives ? 'var(--green)' : '#c2410c',
      },
    ])}
    ${
      k.n > 0
        ? `<div class="card rc-kpi-rc-list">
        <div class="ch"><span class="ct">Réclamations du trimestre (${k.n})</span></div>
        <table class="tbl"><thead><tr><th>N°</th><th>Date</th><th>Client</th><th>Statut</th><th>Objet</th></tr></thead><tbody>
          ${k.data
            .map(
              (r) =>
                `<tr><td>${esc(r.n)}</td><td>${esc(r.d)}</td><td>${esc(r.cl)}</td><td>${esc(r.s)}</td><td>${esc(r.obj)}</td></tr>`
            )
            .join('')}
        </tbody></table>
      </div>`
        : ''
    }
  </section>`;
}

export function renderRcKpi() {
  if (!window.rcKpiTab) window.rcKpiTab = 'dashboard';
  if (!window.rcKpiPer) window.rcKpiPer = 'trimestre';
  const cur = currentTrimestre();
  const years = getRcYears();
  if (!window.rcKpiAnnee || !years.includes(Number(window.rcKpiAnnee))) {
    window.rcKpiAnnee = years[0] ?? cur.year;
  }
  if (!window.rcKpiTrimestre) window.rcKpiTrimestre = cur.trimestre;
  if (!window.rcKpiMois) window.rcKpiMois = new Date().getMonth() + 1;

  const year = Number(window.rcKpiAnnee);
  const trimestre = window.rcKpiTrimestre;
  const mois = Number(window.rcKpiMois);
  const per = window.rcKpiPer;
  const tab = window.rcKpiTab;

  const d = computeRcDashboard(year, per, trimestre, mois);
  const k = computeRcKpisTrimestre(year, trimestre);
  const trimCards = getTrimestreObjectifCards(year);

  return `<div data-page="rc-kpi" class="kpi-page kpi-page--rc rc-kpi-page">
    <div class="rc-kpi-hero">
      <div class="rc-kpi-hero-text">
        <h1 class="rc-kpi-hero-title">KPI Réclamations clients</h1>
        <p class="rc-kpi-hero-sub">Suivi des objectifs qualité · ISO 9001</p>
      </div>
      <button type="button" class="btn bsm bp" data-nav="rc-liste">Liste RC</button>
    </div>
    ${renderKpiTabs(
      [
        ['dashboard', 'Tableau de bord'],
        ['synthese', 'Objectifs & KPI'],
      ],
      tab,
      'data-rc-kpi-tab'
    )}
    ${tab === 'synthese' ? renderPeriodToolbar(year, trimestre, 'objectifs') : renderPeriodToolbar(year, trimestre, 'dashboard')}
    ${panelDashboard(d, year, trimCards, tab)}
    ${panelSynthese(k, year, trimestre, tab)}
  </div>`;
}

let bound = false;

export function bindRcKpi() {
  if (bound) return;
  bound = true;

  document.addEventListener('click', (e) => {
    const tabBtn = e.target.closest('[data-rc-kpi-tab]');
    if (tabBtn) {
      window.rcKpiTab = tabBtn.getAttribute('data-rc-kpi-tab');
      window.reloadPage?.('rc-kpi');
      return;
    }
    const perBtn = e.target.closest('[data-rc-kpi-per]');
    if (perBtn) {
      window.rcKpiPer = perBtn.getAttribute('data-rc-kpi-per');
      window.reloadPage?.('rc-kpi');
      return;
    }
    if (e.target.closest('[data-rc-kpi-alert-close]')) {
      const el = e.target.closest('[data-rc-kpi-alert]');
      if (el) el.style.display = 'none';
      return;
    }
    if (e.target.closest('[data-rc-kpi-print]')) {
      window.print();
    }
  });

  document.addEventListener('change', (e) => {
    if (e.target.matches('[data-rc-kpi-annee]')) {
      window.rcKpiAnnee = Number(e.target.value);
      window.reloadPage?.('rc-kpi');
    }
    if (e.target.matches('[data-rc-kpi-trimestre]')) {
      window.rcKpiTrimestre = e.target.value;
      window.reloadPage?.('rc-kpi');
    }
  });
}
