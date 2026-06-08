/**
 * CRUD — module Contexte & Stratégie (délégation data-cst-*).
 */
import { seedCst } from '../../data/cst.data.js';
import {
  esc,
  cstToast,
  cstRefresh,
  cstModal,
  cstField,
  cstG,
  cstSec,
  closeCstModal,
  PESTEL_DEFAULTS,
  cstCreatableSelect,
  readCreatableSelect,
  bindCreatableSelect,
  calcCriticite,
  calcRiskNivFromCriticite,
} from './cst-utils.js';
import { renderXmDynamicSelect, bindDynamicFieldsInContainer } from '../../core/dynamic-lists.js';
import { cstAfterMutation } from '../../pages/cst/cst-store.js';
import {
  getCstCurrentUser,
  initNewEntity,
  recordEntityRevision,
  recordSingletonRevision,
} from './cst-entity-revisions.js';
import { bindCstTraceUi } from './cst-trace-ui.js';

function afterCstModal() {
  setTimeout(() => {
    const o = document.getElementById('cst_modal_overlay');
    if (o) bindDynamicFieldsInContainer(o);
  }, 50);
}
import { renderRichEditorHtml, getRichEditorHtml, bindRichEditor } from './cst-rich-editor.js';
import { downloadCstCsv, printCstTable } from './cst-export.js';
import { bindPolitiqueActions, handlePolitiqueModalSave } from './cst-politique-actions.js';
import {
  getCstSwot,
  getCstSwotMeta,
  getCstContexte,
  getCstPestel,
  getCstParties,
  getCstRisques,
  getCstObjectifs,
  getCstChangements,
  getCstRevues,
  getCstActions,
  getCstDocs,
  getCstPolitique,
} from '../../data/cst.data.js';
import { exportCstSwotCsv } from '../../pages/cst/cst-swot.page.js';
import { exportCstPartiesCsv } from '../../pages/cst/cst-parties.page.js';
import { exportCstRisquesCsv } from '../../pages/cst/cst-risques.page.js';

const SWOT_KEYS = ['forces', 'faiblesses', 'opportunites', 'menaces'];
const SWOT_LABELS = { forces: 'Force', faiblesses: 'Faiblesse', opportunites: 'Opportunité', menaces: 'Menace' };

const RISK_CATS = ['Commercial', 'Fournisseur', 'Qualité', 'RH', 'Informatique', 'Sécurité', 'Environnement'];
const OPP_CATS = ['Commercial', 'Technologique', 'Partenariat', 'Marché', 'Innovation', 'Opportunité'];

function nextId(prefix, items, pad = 3) {
  const nums = items.map((x) => parseInt(String(x.id).replace(/\D/g, ''), 10)).filter((n) => !Number.isNaN(n));
  const max = nums.length ? Math.max(...nums) : 0;
  return `${prefix}-${String(max + 1).padStart(pad, '0')}`;
}

function todayCst() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

function ensureSwotMetaValue(kind, value) {
  if (!value) return;
  const meta = getCstSwotMeta();
  const list = kind === 'processus' ? meta.processus : meta.categories;
  if (!list.includes(value)) list.push(value);
}

function swotForm(item = null, key = '') {
  return (
    cstField('cst_swot_txt', `Texte — ${SWOT_LABELS[key] || 'élément'}`, item?.texte || '', 'textarea', { rows: 3 }) +
    cstCreatableSelect('cst_swot_proc', 'Type de processus', item?.processus || '', 'cst.swot.processus') +
    cstCreatableSelect('cst_swot_cat', 'Catégorie', item?.categorie || '', 'cst.swot.categories')
  );
}

/* ── Contexte organisme ── */
export function cstContexteEdit() {
  const ctx = getCstContexte();
  const body =
    cstField('cst_ctx_mission', 'Mission', ctx.mission || '', 'textarea', { rows: 3 }) +
    cstField('cst_ctx_vision', 'Vision', ctx.vision || '', 'textarea', { rows: 2 }) +
    cstField('cst_ctx_perimetre', 'Périmètre SMI', ctx.perimetre || '', 'textarea', { rows: 3 }) +
    cstField('cst_ctx_activites', 'Activités couvertes', ctx.activites || '', 'textarea', { rows: 2 }) +
    cstG(
      cstField('cst_ctx_dc', 'Date de création', ctx.dateCreation || '', 'text'),
      cstField('cst_ctx_dm', 'Date de mise à jour', ctx.dateMaj || todayCst(), 'text')
    );
  document.body.insertAdjacentHTML(
    'beforeend',
    cstModal('Contexte de l\'organisme', 'Mission · Vision · Périmètre', '#185FA5', '#2563eb', body, { entity: 'contexte' })
  );
}

/* ── SWOT ── */
export function cstSwotAdd(key) {
  if (!SWOT_KEYS.includes(key)) return;
  const body = swotForm(null, key);
  document.body.insertAdjacentHTML(
    'beforeend',
    cstModal(`Ajouter — ${SWOT_LABELS[key]}`, 'Analyse SWOT', '#000066', '#000080', body, { entity: 'swot', key })
  );
  bindCreatableSelect('cst_swot_proc');
  bindCreatableSelect('cst_swot_cat');
}

export function cstSwotEdit(key, itemId) {
  const items = getCstSwot()[key] || [];
  const item = items.find((x) => x.id === itemId);
  if (!item) return;
  const body = swotForm(item, key);
  document.body.insertAdjacentHTML(
    'beforeend',
    cstModal(`Modifier — ${SWOT_LABELS[key]}`, 'Analyse SWOT', '#000066', '#000080', body, { entity: 'swot', key, id: itemId })
  );
  bindCreatableSelect('cst_swot_proc');
  bindCreatableSelect('cst_swot_cat');
}

/* ── PESTEL ── */
function pestelForm(p = null) {
  return (
    cstSec(1, 'Facteur PESTEL') +
    cstG(
      renderXmDynamicSelect({ id: 'cst_p_facteur', listKey: 'cst.pestel.types', label: 'Facteur', selected: p?.facteur || 'Politique' }),
      cstField('cst_p_impact', 'Impact', p?.impact || '—', 'select', { options: ['+', '—', '~'] })
    ) +
    cstField('cst_p_analyse', 'Analyse', p?.analyse || '', 'textarea') +
    cstField('cst_p_action', 'Action / Réponse', p?.action || '', 'textarea')
  );
}

export function cstPestelAdd() {
  document.body.insertAdjacentHTML(
    'beforeend',
    cstModal('Nouveau facteur PESTEL', 'Analyse macro-environnementale', '#5B21B6', '#7c3aed', pestelForm(), {
      entity: 'pestel',
    })
  );
  afterCstModal();
}

export function cstPestelEdit(id) {
  const p = getCstPestel().find((x) => x.id === id);
  if (!p) return;
  document.body.insertAdjacentHTML(
    'beforeend',
    cstModal('Modifier PESTEL', p.facteur, '#5B21B6', '#7c3aed', pestelForm(p), { entity: 'pestel', id }, { entity: 'pestel', id })
  );
}

/* ── Parties ── */
function partieForm(p = null) {
  return (
    cstSec(1, 'Partie intéressée') +
    cstField('cst_pi_nom', 'Nom', p?.nom || '') +
    cstG(
      cstField('cst_pi_inf', 'Influence', p?.influence || 'Moyen', 'select', {
        options: ['Élevé', 'Moyen', 'Faible'],
      }),
      cstField('cst_pi_sat', 'Satisfaction (1-5)', p?.sat ?? 3, 'number', { min: 1, max: 5 })
    ) +
    cstField('cst_pi_besoin', 'Besoins / Attentes', p?.besoin || '', 'textarea') +
    cstField('cst_pi_exig', 'Exigences', p?.exigences || '', 'textarea') +
    cstField('cst_pi_com', 'Communication', p?.com || '', 'textarea')
  );
}

export function cstPartieAdd() {
  document.body.insertAdjacentHTML(
    'beforeend',
    cstModal('Nouvelle partie intéressée', 'Parties prenantes SMI', '#9A3412', '#ea580c', partieForm(), {
      entity: 'partie',
    })
  );
}

export function cstPartieEdit(id) {
  const p = getCstParties().find((x) => x.id === id);
  if (!p) return;
  document.body.insertAdjacentHTML(
    'beforeend',
    cstModal('Modifier partie', p.nom, '#9A3412', '#ea580c', partieForm(p), { entity: 'partie', id }, { entity: 'partie', id })
  );
}

/* ── Risques ── */
function risqueForm(r = null) {
  const isOpp = window.cst_riskTab === 1 || r?.cat === 'Opportunité';
  const catKey = isOpp ? 'cst.opp.categories' : 'cst.risk.categories';
  const statuts = isOpp ? ['Suivi', 'En cours', 'Réalisé'] : ['Actif', 'En cours', 'Maîtrisé', 'Clos'];
  const grav = r?.gravite ?? r?.proba ?? 3;
  const occ = r?.occurrence ?? r?.impact ?? 3;
  const gravLabel = isOpp ? 'Opportunité (1-5)' : 'Gravité (1-5)';
  return (
    cstSec(1, 'Identification') +
    cstField('cst_r_enjeux', 'Enjeux', r?.enjeux || r?.desc || '', 'textarea') +
    cstG(
      renderXmDynamicSelect({ id: 'cst_r_cat', listKey: catKey, label: 'Catégorie', selected: r?.cat || '' }),
      cstField('cst_r_statut', 'Statut', r?.statut || statuts[0], 'select', { options: statuts })
    ) +
    cstField('cst_r_cause', 'Cause', r?.cause || '', 'textarea', { rows: 2 }) +
    cstField('cst_r_conseq', 'Conséquence', r?.consequence || '', 'textarea', { rows: 2 }) +
    cstSec(2, 'Évaluation') +
    cstG(
      cstField('cst_r_grav', gravLabel, grav, 'number', { min: 1, max: 5 }),
      cstField('cst_r_occ', 'Occurrence (1-5)', occ, 'number', { min: 1, max: 5 })
    ) +
    `<p class="cst-form-hint">Criticité calculée automatiquement = Gravité/Opp. × Occurrence</p>` +
    cstSec(3, 'Traitement') +
    cstField('cst_r_resp', 'Responsable', r?.responsable || '') +
    cstG(
      cstField('cst_r_dprev', 'Date prévue de réalisation', r?.datePrevue || ''),
      cstField('cst_r_dreal', 'Date de réalisation', r?.dateRealisation || '')
    ) +
    cstG(
      cstField('cst_r_eval', 'Évaluation de l\'efficacité', r?.evalEfficacite || '', 'textarea', { rows: 2 }),
      cstField('cst_r_valid', 'Validation de l\'efficacité', r?.validationEfficacite || '', 'textarea', { rows: 2 })
    ) +
    cstField('cst_r_action', 'Mesure / Action', r?.action || '', 'textarea')
  );
}

export function cstRisqueAdd() {
  const sub = window.cst_riskTab === 1 ? 'Opportunité' : 'Risque';
  document.body.insertAdjacentHTML(
    'beforeend',
    cstModal(`Nouveau ${sub}`, 'Risques & opportunités', '#991B1B', '#dc2626', risqueForm(), { entity: 'risque' })
  );
  afterCstModal();
}

export function cstRisqueEdit(id) {
  const r = getCstRisques().find((x) => x.id === id);
  if (!r) return;
  document.body.insertAdjacentHTML(
    'beforeend',
    cstModal('Modifier', r.id, '#991B1B', '#dc2626', risqueForm(r), { entity: 'risque', id }, { entity: 'risque', id })
  );
}

/* ── Objectifs ── */
function objForm(o = null) {
  return (
    cstSec(1, 'Objectif') +
    cstField('cst_o_obj', 'Objectif', o?.objectif || '', 'textarea') +
    cstG(cstField('cst_o_ind', 'Indicateur', o?.indicateur || ''), cstField('cst_o_cible', 'Cible 2026', o?.cible || '')) +
    cstG(
      cstField('cst_o_resp', 'Responsable', o?.resp || ''),
      cstField('cst_o_delai', 'Échéance', o?.delai || '', 'text')
    ) +
    cstField('cst_o_etat', 'État', o?.etat || 'En cours', 'select', {
      options: ['En cours', 'À faire', 'Atteint', 'En retard'],
    }) +
    cstSec(2, 'Avancement') +
    cstField('cst_o_prog', 'Progression (%)', o?.prog ?? 0, 'number', { min: 0, max: 100 })
  );
}

export function cstObjAdd() {
  document.body.insertAdjacentHTML(
    'beforeend',
    cstModal('Nouvel objectif', 'Objectifs stratégiques', '#1E40AF', '#2563eb', objForm(), { entity: 'objectif' })
  );
}

export function cstObjEdit(id) {
  const o = getCstObjectifs().find((x) => x.id === +id || x.id === id);
  if (!o) return;
  document.body.insertAdjacentHTML(
    'beforeend',
    cstModal('Modifier objectif', o.objectif, '#1E40AF', '#2563eb', objForm(o), { entity: 'objectif', id: o.id }, { entity: 'objectif', id: o.id })
  );
}

/* ── Changements ── */
function chgForm(c = null) {
  return (
    cstSec(1, 'Identification') +
    cstField('cst_c_chg', 'Changement', c?.changement || '', 'textarea') +
    cstField('cst_c_orig', 'Origine', c?.origine || '') +
    cstSec(2, 'Évaluation') +
    cstG(
      cstField('cst_c_niv', 'Niveau', c?.niveau || 'Moyen', 'select', { options: ['Élevé', 'Moyen', 'Faible'] }),
      cstField('cst_c_stat', 'Statut', c?.statut || 'Planifié', 'select', {
        options: ['Planifié', 'En cours', 'Validé', 'Annulé'],
      })
    ) +
    cstG(cstField('cst_c_impact', 'Impact potentiel', c?.impact || ''), cstField('cst_c_delai', 'Échéance', c?.delai || ''))
  );
}

export function cstChgAdd() {
  document.body.insertAdjacentHTML(
    'beforeend',
    cstModal('Nouveau changement', 'Gestion des changements', '#92400E', '#f59e0b', chgForm(), { entity: 'changement' })
  );
}

export function cstChgEdit(id) {
  const c = getCstChangements().find((x) => x.id === id);
  if (!c) return;
  document.body.insertAdjacentHTML(
    'beforeend',
    cstModal('Modifier changement', c.id, '#92400E', '#f59e0b', chgForm(c), { entity: 'changement', id }, { entity: 'changement', id })
  );
}

/* ── Revue ── */
function revueDecisionsHtml(decisions = []) {
  const rows = (decisions.length ? decisions : ['']).map(
    (d, i) =>
      `<div class="cst-dec-row"><input class="fi rev-dec-input" type="text" value="${esc(d)}" placeholder="Décision ${i + 1}"></div>`
  );
  return `<div id="rev-decs-list">${rows.join('')}</div><button type="button" class="btn bsm" id="cst-rev-add-dec" style="margin-top:8px">+ Ajouter une décision</button>`;
}

function revueForm(rev = null) {
  return (
    cstSec(1, 'Identification') +
    cstG(cstField('cst_rev_id', 'Code revue', rev?.id || 'REV-2026-02'), cstField('cst_rev_date', 'Date', rev?.date || '')) +
    cstG(
      cstField('cst_rev_pres', 'Président', rev?.president || 'Directeur Général'),
      cstField('cst_rev_part', 'Participants', rev?.participants ?? 8, 'number', { min: 1, max: 30 })
    ) +
    cstField('cst_rev_stat', 'Statut', rev?.statut || 'Planifiée', 'select', {
      options: ['Planifiée', 'En cours', 'Terminée'],
    }) +
    cstSec(2, 'Décisions') +
    revueDecisionsHtml(rev?.decisions || [])
  );
}

function bindRevueDecisionsBtn() {
  setTimeout(() => {
    document.getElementById('cst-rev-add-dec')?.addEventListener('click', () => {
      const list = document.getElementById('rev-decs-list');
      if (!list) return;
      list.insertAdjacentHTML(
        'beforeend',
        `<div class="cst-dec-row"><input class="fi rev-dec-input" type="text" placeholder="Nouvelle décision"></div>`
      );
    });
  }, 60);
}

export function cstRevueAdd() {
  document.body.insertAdjacentHTML(
    'beforeend',
    cstModal('Nouvelle revue de direction', 'Revue SMI', '#4c1d95', '#7c3aed', revueForm(), { entity: 'revue' })
  );
  bindRevueDecisionsBtn();
}

/* ── Actions ── */
function actionForm(a = null) {
  return (
    cstSec(1, 'Action') +
    cstField('cst_a_act', 'Description', a?.action || '', 'textarea') +
    cstField('cst_a_orig', 'Origine', a?.origine || '') +
    cstSec(2, 'Suivi') +
    cstG(cstField('cst_a_resp', 'Responsable', a?.resp || ''), cstField('cst_a_delai', 'Échéance', a?.delai || '')) +
    cstG(
      cstField('cst_a_prio', 'Priorité', a?.priorite || 'Moyenne', 'select', { options: ['Élevée', 'Moyenne', 'Basse'] }),
      cstField('cst_a_stat', 'Statut', a?.statut || 'Planifié', 'select', {
        options: ['Planifié', 'À faire', 'En cours', 'En retard', 'Clôturée'],
      })
    ) +
    cstField('cst_a_prog', 'Avancement (%)', a?.prog ?? 0, 'number', { min: 0, max: 100 })
  );
}

export function cstActionAdd() {
  document.body.insertAdjacentHTML(
    'beforeend',
    cstModal('Nouvelle action stratégique', "Plan d'actions", '#92400E', '#f59e0b', actionForm(), { entity: 'action' })
  );
}

export function cstActionEdit(id) {
  const a = getCstActions().find((x) => x.id === id);
  if (!a) return;
  document.body.insertAdjacentHTML(
    'beforeend',
    cstModal('Modifier action', a.id, '#92400E', '#f59e0b', actionForm(a), { entity: 'action', id }, { entity: 'action', id })
  );
}

/* ── Politique QHSE ── */
function politiqueAxeFields(axes = []) {
  return [0, 1, 2, 3]
    .map((i) => {
      const ax = axes[i] || {};
      return (
        `<div class="cst-pol-form-axe" style="margin-bottom:10px;padding-bottom:10px;border-bottom:1px dashed var(--border)">
        ${cstG(
          cstField(`cst_pol_ax${i}_t`, `Axe ${i + 1} — titre`, ax.titre || ''),
          cstField(`cst_pol_ax${i}_ic`, 'Icône', ax.ic || '', 'text')
        )}
        ${cstField(`cst_pol_ax${i}_txt`, 'Engagement', ax.texte || '', 'textarea', { rows: 2 })}
      </div>`
      );
    })
    .join('');
}

function politiqueForm(p = null) {
  const pol = p || getCstPolitique();
  const revLines = (pol.revisions || [])
    .map((r) => `${r.version}|${r.date}|${r.statut}|${r.note}`)
    .join('\n');
  return (
    cstSec(1, 'Document') +
    cstField('cst_pol_titre', 'Titre', pol.titre || '') +
    cstField('cst_pol_sub', 'Sous-titre', pol.sousTitre || '') +
    cstG(
      cstField('cst_pol_dc', 'Date de création', pol.dateCreation || ''),
      cstField('cst_pol_dm', 'Date de mise à jour', pol.dateMiseAJour || todayCst())
    ) +
    cstSec(2, 'Contenu (éditeur)') +
    renderRichEditorHtml('cst_pol_html', pol.contenuHtml || pol.texte ? `<p>${esc(pol.texte)}</p>` : '') +
    cstSec(3, 'Signature & historique') +
    cstG(
      cstField('cst_pol_sign', 'Signataire', pol.signataire || ''),
      cstField('cst_pol_rev', 'Révision (ex. V03)', pol.revision || '')
    ) +
    cstField('cst_pol_date', 'Date de signature', pol.dateSignature || '') +
    cstField(
      'cst_pol_revs',
      'Révisions (version|date|statut|note — une par ligne)',
      revLines,
      'textarea',
      { rows: 4 }
    )
  );
}

function parsePolitiqueRevisions(text) {
  return String(text || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [version, date, statut, ...noteParts] = line.split('|');
      return {
        version: (version || '').trim(),
        date: (date || '').trim(),
        statut: (statut || 'Archivée').trim(),
        note: noteParts.join('|').trim() || '—',
      };
    });
}

function nextRevisionTag(cur) {
  const m = String(cur || 'V00').match(/(\d+)/);
  const n = m ? parseInt(m[1], 10) + 1 : 1;
  return `V${String(n).padStart(2, '0')}`;
}

export function cstPolitiqueEdit() {
  const p = getCstPolitique();
  document.body.insertAdjacentHTML(
    'beforeend',
    cstModal('Modifier la politique QHSE', 'Engagement de la direction', '#000066', '#000080', politiqueForm(p), {
      entity: 'politique',
    })
  );
  bindRichEditor();
}

/* ── Docs ── */
function docForm(d = null) {
  return (
    cstG(cstField('cst_d_nom', 'Nom', d?.nom || ''), cstField('cst_d_type', 'Type', d?.type || 'Procédure', 'select', {
      options: ['Procédure', 'Politique', 'Manuel', 'Instruction', 'Enregistrement', 'Formulaire', 'Plan'],
    })) +
    cstG(cstField('cst_d_code', 'Code', d?.code || ''), cstField('cst_d_ver', 'Version', d?.version || 'V1.0')) +
    cstG(
      cstField('cst_d_auteur', 'Auteur', d?.auteur || 'Utilisateur'),
      cstField('cst_d_stat', 'Statut', d?.statut || 'Brouillon', 'select', {
        options: ['Brouillon', 'En révision', 'Approuvé'],
      })
    ) +
    cstField('cst_d_desc', 'Description', d?.desc || '', 'textarea', { full: true })
  );
}

export function cstDocAdd() {
  document.body.insertAdjacentHTML(
    'beforeend',
    cstModal('Nouveau document', 'Documentation SMI', '#A32D2D', '#dc2626', docForm(), { entity: 'doc' })
  );
}

export function cstDocEdit(id) {
  const d = getCstDocs().find((x) => x.id === +id);
  if (!d) return;
  document.body.insertAdjacentHTML(
    'beforeend',
    cstModal('Modifier document', d.nom, '#A32D2D', '#dc2626', docForm(d), { entity: 'doc', id: d.id }, { entity: 'doc', id: d.id })
  );
}

function collectRevueDecisions() {
  return [...document.querySelectorAll('.rev-dec-input')]
    .map((el) => el.value.trim())
    .filter(Boolean);
}

function handleSave(btn) {
  const entity = btn.dataset.cstEntity;
  const id = btn.dataset.cstId;
  const key = btn.dataset.cstKey;

  if (handlePolitiqueModalSave(btn)) return;

  if (entity === 'contexte') {
    const ctx = getCstContexte();
    const snap = { ...ctx };
    ctx.mission = document.getElementById('cst_ctx_mission')?.value?.trim() || '';
    ctx.vision = document.getElementById('cst_ctx_vision')?.value?.trim() || '';
    ctx.perimetre = document.getElementById('cst_ctx_perimetre')?.value?.trim() || '';
    ctx.activites = document.getElementById('cst_ctx_activites')?.value?.trim() || '';
    ctx.dateCreation = document.getElementById('cst_ctx_dc')?.value?.trim() || ctx.dateCreation;
    ctx.dateMaj = document.getElementById('cst_ctx_dm')?.value?.trim() || todayCst();
    ctx.updatedBy = getCstCurrentUser();
    recordSingletonRevision(ctx, snap, getCstCurrentUser(), 'Modification contexte organisme');
    cstAfterMutation('cst-swot', 'contexte', '—', 'Enregistrement', 'Mission, vision et périmètre', getCstCurrentUser());
    closeCstModal();
    cstToast('Contexte enregistré', '#000080');
    cstRefresh('cst-swot');
    return;
  }

  if (entity === 'swot' && key) {
    const val = document.getElementById('cst_swot_txt')?.value?.trim();
    if (!val) {
      cstToast('Saisissez un texte', '#dc2626');
      return;
    }
    const processus = readCreatableSelect('cst_swot_proc');
    const categorie = readCreatableSelect('cst_swot_cat');
    ensureSwotMetaValue('processus', processus);
    ensureSwotMetaValue('categories', categorie);
    const row = {
      id: id || `SW-${key}-${Date.now()}`,
      texte: val,
      processus,
      categorie,
      createdAt: todayCst(),
    };
    const list = getCstSwot()[key];
    if (id) {
      const ex = list.find((x) => x.id === id);
      if (ex) {
        const snap = { ...ex };
        Object.assign(ex, { ...row, id: ex.id, createdAt: ex.createdAt || row.createdAt });
        recordEntityRevision(ex, snap, getCstCurrentUser(), 'Modification SWOT');
        cstAfterMutation('cst-swot', 'swot', id, 'Modification', val.slice(0, 80), getCstCurrentUser());
      }
      cstToast('Élément SWOT mis à jour', '#000080');
    } else {
      initNewEntity(row);
      list.push(row);
      cstAfterMutation('cst-swot', 'swot', row.id, 'Création', val.slice(0, 80), getCstCurrentUser());
      cstToast('Élément SWOT ajouté', '#000080');
    }
    closeCstModal();
    cstRefresh('cst-swot');
    return;
  }

  if (entity === 'pestel') {
    const facteur = readCreatableSelect('cst_p_facteur') || document.getElementById('cst_p_facteur')?.value;
    const def = PESTEL_DEFAULTS[facteur] || { ic: '📌', col: '#64748b' };
    const row = {
      facteur,
      ic: def.ic,
      col: def.col,
      analyse: document.getElementById('cst_p_analyse')?.value?.trim() || '',
      impact: document.getElementById('cst_p_impact')?.value || '—',
      action: document.getElementById('cst_p_action')?.value?.trim() || '',
    };
    const D = getCstPestel();
    if (id) {
      const p = D.find((x) => x.id === id);
      if (p) {
        const snap = { ...p };
        Object.assign(p, row);
        recordEntityRevision(p, snap, getCstCurrentUser(), 'Révision PESTEL');
        cstAfterMutation('cst-pestel', 'pestel', id, 'Modification', facteur, getCstCurrentUser());
      }
      cstToast('PESTEL mis à jour', '#000080');
    } else {
      const nid = nextId('PST', D);
      const item = initNewEntity({ id: nid, ...row });
      D.push(item);
      cstAfterMutation('cst-pestel', 'pestel', nid, 'Création', facteur, getCstCurrentUser());
      cstToast('Facteur PESTEL ajouté', '#000080');
    }
    closeCstModal();
    cstRefresh('cst-pestel');
    return;
  }

  if (entity === 'partie') {
    const row = {
      nom: document.getElementById('cst_pi_nom')?.value?.trim(),
      influence: document.getElementById('cst_pi_inf')?.value,
      sat: +document.getElementById('cst_pi_sat')?.value || 3,
      besoin: document.getElementById('cst_pi_besoin')?.value?.trim() || '',
      exigences: document.getElementById('cst_pi_exig')?.value?.trim() || '',
      com: document.getElementById('cst_pi_com')?.value?.trim() || '',
      createdAt: todayCst(),
    };
    if (!row.nom) {
      cstToast('Nom requis', '#dc2626');
      return;
    }
    const D = getCstParties();
    if (id) {
      const p = D.find((x) => x.id === id);
      if (p) {
        const snap = { ...p };
        Object.assign(p, { ...row, createdAt: p.createdAt || row.createdAt });
        recordEntityRevision(p, snap, getCstCurrentUser(), 'Modification besoins/attentes');
        cstAfterMutation('cst-parties', 'partie', id, 'Modification', row.nom, getCstCurrentUser());
      }
      cstToast('Partie mise à jour', '#000080');
    } else {
      const nid = nextId('PI', D);
      const item = initNewEntity({ id: nid, ...row });
      D.push(item);
      cstAfterMutation('cst-parties', 'partie', nid, 'Création', row.nom, getCstCurrentUser());
      cstToast('Partie ajoutée', '#000080');
    }
    closeCstModal();
    cstRefresh('cst-parties');
    return;
  }

  if (entity === 'risque') {
    const gravite = +document.getElementById('cst_r_grav')?.value || 1;
    const occurrence = +document.getElementById('cst_r_occ')?.value || 1;
    const criticite = calcCriticite(gravite, occurrence);
    const cat = readCreatableSelect('cst_r_cat') || document.getElementById('cst_r_cat')?.value;
    const isOpp = cat === 'Opportunité' || window.cst_riskTab === 1;
    const row = {
      enjeux: document.getElementById('cst_r_enjeux')?.value?.trim() || '',
      cat,
      gravite,
      occurrence,
      criticite,
      niv: calcRiskNivFromCriticite(criticite),
      statut: document.getElementById('cst_r_statut')?.value,
      cause: document.getElementById('cst_r_cause')?.value?.trim() || '',
      consequence: document.getElementById('cst_r_conseq')?.value?.trim() || '',
      responsable: document.getElementById('cst_r_resp')?.value?.trim() || '',
      datePrevue: document.getElementById('cst_r_dprev')?.value?.trim() || '',
      dateRealisation: document.getElementById('cst_r_dreal')?.value?.trim() || '',
      evalEfficacite: document.getElementById('cst_r_eval')?.value?.trim() || '',
      validationEfficacite: document.getElementById('cst_r_valid')?.value?.trim() || '',
      action: document.getElementById('cst_r_action')?.value?.trim() || '',
      createdAt: todayCst(),
    };
    if (!row.enjeux) {
      cstToast('Enjeux requis', '#dc2626');
      return;
    }
    const D = getCstRisques();
    if (id) {
      const r = D.find((x) => x.id === id);
      if (r) {
        const snap = { ...r };
        Object.assign(r, { ...row, createdAt: r.createdAt || row.createdAt });
        recordEntityRevision(r, snap, getCstCurrentUser(), 'Révision évaluation risque');
        cstAfterMutation('cst-risques', 'risque', id, 'Modification', row.enjeux.slice(0, 80), getCstCurrentUser());
      }
      cstToast('Élément mis à jour', '#000080');
    } else {
      const prefix = isOpp ? 'OPP' : 'RSQ';
      const nid = nextId(prefix, D.filter((x) => x.id.startsWith(prefix)));
      const item = initNewEntity({ id: nid, ...row });
      D.push(item);
      cstAfterMutation('cst-risques', 'risque', nid, 'Création', row.enjeux.slice(0, 80), getCstCurrentUser());
      cstToast('Élément ajouté', '#000080');
    }
    closeCstModal();
    cstRefresh('cst-risques');
    return;
  }

  if (entity === 'objectif') {
    const row = {
      objectif: document.getElementById('cst_o_obj')?.value?.trim() || '',
      indicateur: document.getElementById('cst_o_ind')?.value?.trim() || '',
      cible: document.getElementById('cst_o_cible')?.value?.trim() || '',
      resp: document.getElementById('cst_o_resp')?.value?.trim() || '',
      delai: document.getElementById('cst_o_delai')?.value?.trim() || '',
      etat: document.getElementById('cst_o_etat')?.value,
      prog: +document.getElementById('cst_o_prog')?.value || 0,
    };
    const D = getCstObjectifs();
    if (id) {
      const o = D.find((x) => String(x.id) === String(id));
      if (o) {
        const snap = { ...o };
        Object.assign(o, row);
        recordEntityRevision(o, snap, getCstCurrentUser(), 'Révision objectif/indicateur');
        cstAfterMutation('cst-objectifs', 'objectif', id, 'Modification', row.objectif.slice(0, 80), getCstCurrentUser());
      }
      cstToast('Objectif mis à jour', '#000080');
    } else {
      const nid = D.length ? Math.max(...D.map((x) => +x.id)) + 1 : 1;
      const item = initNewEntity({ id: nid, ...row });
      D.push(item);
      cstAfterMutation('cst-objectifs', 'objectif', nid, 'Création', row.objectif.slice(0, 80), getCstCurrentUser());
      cstToast('Objectif ajouté', '#000080');
    }
    closeCstModal();
    cstRefresh('cst-objectifs');
    return;
  }

  if (entity === 'changement') {
    const row = {
      changement: document.getElementById('cst_c_chg')?.value?.trim() || '',
      origine: document.getElementById('cst_c_orig')?.value?.trim() || '',
      niveau: document.getElementById('cst_c_niv')?.value,
      statut: document.getElementById('cst_c_stat')?.value,
      impact: document.getElementById('cst_c_impact')?.value?.trim() || '',
      delai: document.getElementById('cst_c_delai')?.value?.trim() || '',
    };
    const D = getCstChangements();
    if (id) {
      const c = D.find((x) => x.id === id);
      if (c) Object.assign(c, row);
      cstAfterMutation('cst-changements', 'changement', id, 'Modification', row.changement.slice(0, 80));
      cstToast('Changement mis à jour', '#000080');
    } else {
      const nid = nextId('CHG', D);
      D.push({ id: nid, ...row });
      cstAfterMutation('cst-changements', 'changement', nid, 'Création', row.changement.slice(0, 80));
      cstToast('Changement ajouté', '#000080');
    }
    closeCstModal();
    cstRefresh('cst-changements');
    return;
  }

  if (entity === 'revue') {
    const revId = document.getElementById('cst_rev_id')?.value?.trim();
    const row = {
      id: revId,
      date: document.getElementById('cst_rev_date')?.value?.trim() || '',
      president: document.getElementById('cst_rev_pres')?.value?.trim() || '',
      participants: +document.getElementById('cst_rev_part')?.value || 0,
      statut: document.getElementById('cst_rev_stat')?.value,
      entrees: getCstRevues()[0]?.entrees || [],
      decisions: collectRevueDecisions(),
      actions: [],
      documents: [],
    };
    const D = getCstRevues();
    initNewEntity(row);
    D.push(row);
    window.cst_selectedRev = revId;
    cstAfterMutation('cst-revue', 'revue', revId, 'Création', `Revue ${revId}`, getCstCurrentUser());
    closeCstModal();
    cstToast('Revue créée', '#000080');
    cstRefresh('cst-revue');
    return;
  }

  if (entity === 'action') {
    const row = {
      action: document.getElementById('cst_a_act')?.value?.trim() || '',
      origine: document.getElementById('cst_a_orig')?.value?.trim() || '',
      resp: document.getElementById('cst_a_resp')?.value?.trim() || '',
      delai: document.getElementById('cst_a_delai')?.value?.trim() || '',
      priorite: document.getElementById('cst_a_prio')?.value,
      statut: document.getElementById('cst_a_stat')?.value,
      prog: +document.getElementById('cst_a_prog')?.value || 0,
    };
    const D = getCstActions();
    if (id) {
      const a = D.find((x) => x.id === id);
      if (a) Object.assign(a, row);
      cstAfterMutation('cst-actions', 'action', id, 'Modification', row.action.slice(0, 80));
      cstToast('Action mise à jour', '#000080');
    } else {
      const nid = nextId('ACT', D);
      D.push({ id: nid, ...row });
      cstAfterMutation('cst-actions', 'action', nid, 'Création', row.action.slice(0, 80));
      cstToast('Action ajoutée', '#000080');
    }
    closeCstModal();
    cstRefresh('cst-actions');
    return;
  }

  if (entity === 'politique') {
    const revisions = parsePolitiqueRevisions(document.getElementById('cst_pol_revs')?.value);
    const contenuHtml = getRichEditorHtml('cst_pol_html');
    const prev = getCstPolitique();
    window.CST_POLITIQUE = {
      ...prev,
      titre: document.getElementById('cst_pol_titre')?.value?.trim() || 'Politique QHSE',
      sousTitre: document.getElementById('cst_pol_sub')?.value?.trim() || '',
      contenuHtml,
      texte: contenuHtml.replace(/<[^>]+>/g, ' ').slice(0, 500),
      dateCreation: document.getElementById('cst_pol_dc')?.value?.trim() || prev.dateCreation,
      dateMiseAJour: document.getElementById('cst_pol_dm')?.value?.trim() || todayCst(),
      signataire: document.getElementById('cst_pol_sign')?.value?.trim() || '',
      dateSignature: document.getElementById('cst_pol_date')?.value?.trim() || '',
      revision: document.getElementById('cst_pol_rev')?.value?.trim() || '',
      revisions: revisions.length ? revisions : prev.revisions,
    };
    cstAfterMutation('cst-politique', 'politique', 'POL-QSE', 'Enregistrement', 'Métadonnées politique');
    closeCstModal();
    cstToast('Politique enregistrée', '#000080');
    cstRefresh('cst-politique');
    return;
  }

  if (entity === 'doc') {
    const now = todayCst();
    const row = {
      nom: document.getElementById('cst_d_nom')?.value?.trim() || '',
      titre: document.getElementById('cst_d_nom')?.value?.trim() || '',
      type: document.getElementById('cst_d_type')?.value,
      code: document.getElementById('cst_d_code')?.value?.trim() || '',
      version: document.getElementById('cst_d_ver')?.value?.trim() || 'V1.0',
      statut: document.getElementById('cst_d_stat')?.value,
      auteur: document.getElementById('cst_d_auteur')?.value?.trim() || 'Utilisateur',
      desc: document.getElementById('cst_d_desc')?.value?.trim() || '',
      date: now,
      dateMaj: now,
    };
    const D = getCstDocs();
    if (id) {
      const d = D.find((x) => String(x.id) === String(id));
      if (d) {
        Object.assign(d, row);
        normalizeCstDocument(d);
        cstAfterMutation('cst-docs', 'document', id, 'Modification', row.nom);
      }
      cstToast('Document mis à jour', '#000080');
    } else {
      const nid = nextCstDocId();
      const newDoc = normalizeCstDocument({
        id: nid,
        ...row,
        dateCreation: now,
        history: [{ v: row.version, date: now, auteur: row.auteur, motif: 'Création' }],
        auditTrail: [],
        versionSnapshots: [],
      });
      D.push(newDoc);
      cstAfterMutation('cst-docs', 'document', nid, 'Création', row.nom);
      cstToast('Document ajouté', '#000080');
    }
    closeCstModal();
    cstRefresh('cst-docs');
  }
}

function handleDelete(btn) {
  const entity = btn.dataset.cstEntity;
  const id = btn.dataset.cstId;
  if (!confirm('Supprimer cet élément ?')) return;

  if (entity === 'pestel') {
    window.CST_PESTEL = getCstPestel().filter((x) => x.id !== id);
    cstRefresh('cst-pestel');
  } else if (entity === 'partie') {
    window.CST_PARTIES = getCstParties().filter((x) => x.id !== id);
    cstRefresh('cst-parties');
  } else if (entity === 'risque') {
    window.CST_RISQUES = getCstRisques().filter((x) => x.id !== id);
    cstRefresh('cst-risques');
  } else if (entity === 'objectif') {
    window.CST_OBJECTIFS = getCstObjectifs().filter((x) => String(x.id) !== String(id));
    cstRefresh('cst-objectifs');
  } else if (entity === 'changement') {
    window.CST_CHANGEMENTS = getCstChangements().filter((x) => x.id !== id);
    cstRefresh('cst-changements');
  } else if (entity === 'action') {
    window.CST_ACTIONS = getCstActions().filter((x) => x.id !== id);
    cstRefresh('cst-actions');
  } else if (entity === 'doc') {
    window.CST_DOCS = getCstDocs().filter((x) => String(x.id) !== String(id));
    cstAfterMutation('cst-docs', 'document', id, 'Suppression', '');
    cstRefresh('cst-docs');
  }
  closeCstModal();
  cstToast('Élément supprimé', '#dc2626');
}

const CST_SEARCH_PAGES = { swot: 'cst-swot', parties: 'cst-parties', risques: 'cst-risques' };

export function bindCstCrud() {
  bindRichEditor();
  bindPolitiqueActions();

  document.addEventListener('input', (e) => {
    const search = e.target.closest('[data-cst-search]');
    if (!search) return;
    const key = search.dataset.cstSearch;
    window[`cst_${key}Q`] = search.value;
    const page = CST_SEARCH_PAGES[key];
    if (page) cstRefresh(page);
  });

  document.addEventListener('click', (e) => {
    const csv = e.target.closest('[data-cst-export-csv]');
    if (csv) {
      const kind = csv.dataset.cstExportCsv;
      if (kind === 'swot') exportCstSwotCsv();
      else if (kind === 'parties') exportCstPartiesCsv();
      else if (kind === 'risques') exportCstRisquesCsv();
      return;
    }
    const pdf = e.target.closest('[data-cst-export-pdf]');
    if (pdf) {
      const titles = { swot: 'SWOT & Contexte', parties: 'Parties intéressées', risques: 'Risques & opportunités', politique: 'Politique QHSE' };
      printCstTable(titles[pdf.dataset.cstExportPdf] || 'Export CST');
      return;
    }
    if (e.target.closest('[data-cst-contexte-edit]')) {
      cstContexteEdit();
      return;
    }
    const swot = e.target.closest('[data-cst-swot-add]');
    if (swot) {
      cstSwotAdd(swot.dataset.cstSwotAdd);
      return;
    }
    const swotEd = e.target.closest('[data-cst-swot-edit]');
    if (swotEd) {
      cstSwotEdit(swotEd.dataset.cstSwotEdit, swotEd.dataset.cstSwotId);
      return;
    }
    if (e.target.closest('[data-cst-pestel-add]')) {
      cstPestelAdd();
      return;
    }
    const pe = e.target.closest('[data-cst-pestel-edit]');
    if (pe) {
      cstPestelEdit(pe.dataset.cstPestelEdit);
      return;
    }
    if (e.target.closest('[data-cst-partie-add]')) {
      cstPartieAdd();
      return;
    }
    const pie = e.target.closest('[data-cst-partie-edit]');
    if (pie) {
      cstPartieEdit(pie.dataset.cstPartieEdit);
      return;
    }
    if (e.target.closest('[data-cst-risque-add]')) {
      cstRisqueAdd();
      return;
    }
    const re = e.target.closest('[data-cst-risque-edit]');
    if (re) {
      cstRisqueEdit(re.dataset.cstRisqueEdit);
      return;
    }
    const rt = e.target.closest('[data-cst-risk-tab]');
    if (rt) {
      window.cst_riskTab = +rt.dataset.cstRiskTab;
      cstRefresh('cst-risques');
      return;
    }
    if (e.target.closest('[data-cst-obj-add]')) {
      cstObjAdd();
      return;
    }
    const oe = e.target.closest('[data-cst-obj-edit]');
    if (oe) {
      cstObjEdit(oe.dataset.cstObjEdit);
      return;
    }
    if (e.target.closest('[data-cst-chg-add]')) {
      cstChgAdd();
      return;
    }
    const ce = e.target.closest('[data-cst-chg-edit]');
    if (ce) {
      cstChgEdit(ce.dataset.cstChgEdit);
      return;
    }
    if (e.target.closest('[data-cst-revue-add]')) {
      cstRevueAdd();
      return;
    }
    const rs = e.target.closest('[data-cst-revue-select]');
    if (rs) {
      window.cst_selectedRev = rs.dataset.cstRevueSelect;
      cstRefresh('cst-revue');
      return;
    }
    const rtab = e.target.closest('[data-cst-revue-tab]');
    if (rtab) {
      window.cst_revueTab = +rtab.dataset.cstRevueTab;
      cstRefresh('cst-revue');
      return;
    }
    if (e.target.closest('[data-cst-action-add]')) {
      cstActionAdd();
      return;
    }
    const ae = e.target.closest('[data-cst-action-edit]');
    if (ae) {
      cstActionEdit(ae.dataset.cstActionEdit);
      return;
    }
    if (e.target.closest('[data-cst-doc-add]')) {
      cstDocAdd();
      return;
    }
    const de = e.target.closest('[data-cst-doc-edit]');
    if (de) {
      cstDocEdit(de.dataset.cstDocEdit);
      return;
    }
    const dt = e.target.closest('[data-cst-docs-tab]');
    if (dt) {
      window.cst_docsTab = +dt.dataset.cstDocsTab;
      cstRefresh('cst-docs');
      return;
    }
    if (e.target.closest('[data-cst-modal-close]') || e.target.id === 'cst_modal_overlay') {
      closeCstModal();
      return;
    }
    const save = e.target.closest('[data-cst-save]');
    if (save) {
      handleSave(save);
      return;
    }
    const del = e.target.closest('[data-cst-delete]');
    if (del) handleDelete(del);
  });
}

let crudBound = false;
export function installCstCrud() {
  seedCst();
  bindCstTraceUi();
  import('../../pages/cst/cst-document-actions.js').then((m) => m.installCstDocumentActions());
  if (!crudBound) {
    bindCstCrud();
    crudBound = true;
  }
  window.cstSwotAdd = cstSwotAdd;
  window.cstPestelAdd = cstPestelAdd;
  window.cstPestelEdit = cstPestelEdit;
  window.cstPartieAdd = cstPartieAdd;
  window.cstPartieEdit = cstPartieEdit;
  window.cstRisqueAdd = cstRisqueAdd;
  window.cstRisqueEdit = cstRisqueEdit;
  window.cstObjAdd = cstObjAdd;
  window.cstObjEdit = cstObjEdit;
  window.cstChgAdd = cstChgAdd;
  window.cstChgEdit = cstChgEdit;
  window.cstRevueAdd = cstRevueAdd;
  window.cstActionAdd = cstActionAdd;
  window.cstActionEdit = cstActionEdit;
  window.cstDocAdd = cstDocAdd;
  window.cstDocEdit = cstDocEdit;
  window.cstPolitiqueEdit = cstPolitiqueEdit;
  bindPolitiqueActions();
}
