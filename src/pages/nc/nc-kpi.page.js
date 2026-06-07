/**
 * KPI NC — objectifs + tableau de bord.
 */
import { renderObjectifsPanel, renderKpiStrip, renderKpiTabs } from '../../components/kpi/kpi-shell.js';
import {
  renderNcActionsTable,
  renderNcAlertBanner,
  renderNcChartsRow,
  renderNcDashboardHeader,
  renderNcKpiIndicators,
  renderNcMetricCards,
  renderNcStadeAndCauses,
} from '../../components/kpi/nc-kpi-dashboard.js';
import { computeNcDashboard, getNcYears, NC_KPI_OBJ } from '../../data/nc-kpi.data.js';
import { NC_OBJECTIF_REPETITIVES } from '../../data/nc-project-report.data.js';
import { NC_OBJ, getNcMonthlyObjectivesStatus } from '../../data/nc-kpi-objectives.data.js';
import { getNcData } from '../../data/nc.data.js';

function fmt(n, d = 1) {
  return Number(n).toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
}

function buildObjectifs(data, d) {
  const mois = getNcMonthlyObjectivesStatus(data);
  const ouv = data.filter((r) => r.s !== 'Clôturé').length;
  return [
    {
      label: 'NC majeures',
      objectif: `≤ ${NC_OBJ.maxMajeuresMois} / mois`,
      valeur: `${mois.majeures} (${mois.periodLabel})`,
      ok: mois.okMajeures,
    },
    {
      label: 'NC mineures',
      objectif: `≤ ${NC_OBJ.maxMineuresMois} / mois`,
      valeur: `${mois.mineures} (${mois.periodLabel})`,
      ok: mois.okMineures,
      hint: mois.critiques ? `${mois.critiques} critique(s) hors objectif` : '',
    },
    {
      label: 'Délai moyen de traitement',
      objectif: `≤ ${NC_KPI_OBJ.delaiMoyenJours} jours`,
      valeur: `${fmt(d.delaiMoyen, 1)} j`,
      ok: d.okDelai,
    },
    {
      label: 'Taux de récurrence NC',
      objectif: `≤ ${NC_KPI_OBJ.tauxRecurrenceMax} %`,
      valeur: `${d.repetitives.taux} % (${d.repetitives.count} NC)`,
      ok: d.okRecurrence,
      hint: d.repetitives.motifs[0] ? `Motif : « ${d.repetitives.motifs[0].motif} »` : '',
    },
    {
      label: 'NC ouvertes',
      objectif: 'Suivi actif',
      valeur: `${ouv} / ${data.length}`,
      ok: ouv <= Math.max(data.length * 0.75, 1),
    },
  ];
}

export function renderNcKpi() {
  if (!window.ncKpiTab) window.ncKpiTab = 'dashboard';
  const tab = window.ncKpiTab;
  const data = getNcData();
  const year = window.ncKpiYear ?? new Date().getFullYear();
  const per = window.ncKpiPer ?? 'mensuel';
  const trimestre = window.ncKpiTrimestre ?? 'T2';
  const month = window.ncKpiMonth ?? new Date().getMonth() + 1;

  const d = computeNcDashboard(data, { year, per, trimestre, month });
  const mois = d.moisObj;
  const lastUpdate = new Date().toLocaleDateString('fr-FR');
  const years = getNcYears(data);
  if (!years.includes(year)) years.unshift(year);

  const actionsAFaire = (window.NC_ACTIONS || []).filter((a) => a.statut !== 'Clôturée');

  const panelObj = `<section class="kpi-panel"${tab !== 'synthese' ? ' hidden' : ''}>
    ${renderObjectifsPanel(buildObjectifs(data, d), 'Objectifs — Non-conformités')}
    ${renderKpiStrip([
      { label: 'Majeures ce mois', value: String(mois.majeures), color: mois.okMajeures ? 'var(--green)' : '#dc2626', sub: `Obj. ≤ ${NC_OBJ.maxMajeuresMois}` },
      { label: 'Mineures ce mois', value: String(mois.mineures), color: mois.okMineures ? 'var(--green)' : '#dc2626', sub: `Obj. ≤ ${NC_OBJ.maxMineuresMois}` },
      { label: 'Délai moyen', value: `${fmt(d.delaiMoyen, 1)} j`, color: d.okDelai ? 'var(--green)' : '#dc2626', sub: `Obj. ≤ ${NC_KPI_OBJ.delaiMoyenJours} j` },
      { label: 'Récurrence', value: `${d.repetitives.taux}%`, color: d.okRecurrence ? 'var(--green)' : '#c2410c', sub: `Obj. ≤ ${NC_OBJECTIF_REPETITIVES}%` },
    ])}
    <p class="kpi-muted" style="margin-top:10px">
      <button type="button" class="btn bsm" data-nav="nc-actions">Gérer les actions →</button>
      <button type="button" class="btn bsm" data-nav="nc-liste" style="margin-left:6px">Liste NC →</button>
    </p>
  </section>`;

  const panelDash = `<section class="kpi-panel rc-kpi-dash"${tab !== 'dashboard' ? ' hidden' : ''}>
    <div class="rc-kpi-toolbar card" style="margin-bottom:10px">
      <div class="rc-kpi-toolbar-inner">
        <div class="rc-kpi-toolbar-label">
          <span class="rc-kpi-toolbar-title">Période</span>
        </div>
        <div class="rc-kpi-toolbar-fields">
          <label class="rc-kpi-field"><span>Année</span>
            <select class="sel rc-kpi-sel" data-nc-kpi-annee>
              ${years.map((y) => `<option value="${y}"${y === year ? ' selected' : ''}>${y}</option>`).join('')}
            </select>
          </label>
        </div>
      </div>
    </div>
    ${renderNcDashboardHeader(d, lastUpdate)}
    ${renderNcAlertBanner(d.alert)}
    ${renderNcMetricCards(d)}
    ${renderNcKpiIndicators(d)}
    ${renderNcChartsRow(d)}
    ${renderNcStadeAndCauses(d)}
    ${renderNcActionsTable(actionsAFaire)}
  </section>`;

  return `<div data-page="nc-kpi" class="kpi-page kpi-page--nc">
    <div class="kpi-page-head">
      <div>
        <h1 class="kpi-page-title">KPI Non-conformités</h1>
        <p class="kpi-page-sub">Indicateurs de performance — ISO 9001</p>
      </div>
      <div class="kpi-page-actions">
        <button type="button" class="btn bsm" data-nav="nc-rapport">📄 Rapport QRQC</button>
        <button type="button" class="btn bsm bp" data-nav="nc-liste">Liste NC</button>
        <button type="button" class="btn bsm bp" data-nav="nc-new">+ Nouvelle NC</button>
      </div>
    </div>
    ${renderKpiTabs(
      [
        ['dashboard', 'Tableau de bord'],
        ['synthese', 'Objectifs'],
      ],
      tab,
      'data-nc-kpi-tab'
    )}
    ${panelDash}
    ${panelObj}
  </div>`;
}

let bound = false;
export function bindNcKpi() {
  if (bound) return;
  bound = true;

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-nc-kpi-tab]')) {
      window.ncKpiTab = e.target.getAttribute('data-nc-kpi-tab');
      window.reloadPage?.('nc-kpi');
      return;
    }
    if (e.target.closest('[data-nc-kpi-per]')) {
      window.ncKpiPer = e.target.getAttribute('data-nc-kpi-per');
      window.reloadPage?.('nc-kpi');
      return;
    }
    if (e.target.closest('[data-nc-kpi-print]')) {
      window.print();
      return;
    }
    if (e.target.closest('[data-nc-kpi-alert-close]')) {
      const el = e.target.closest('[data-nc-kpi-alert]');
      if (el) el.remove();
    }
  });

  document.addEventListener('change', (e) => {
    if (e.target.matches('[data-nc-kpi-annee]')) {
      window.ncKpiYear = parseInt(e.target.value, 10);
      window.reloadPage?.('nc-kpi');
    }
  });
}
