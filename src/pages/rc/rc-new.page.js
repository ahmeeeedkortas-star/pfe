/**
 * Nouvelle réclamation client — formulaire avec listes dynamiques.
 */
import { addRcClient, getRcClients } from '../../data/rc-clients.store.js';
import { addRcProjet, getRcProjets } from '../../data/rc-projets.store.js';
import { RC_DEPARTEMENTS } from '../../data/rc-departements.js';
import { createRc8dDefaults } from '../../data/rc-8d-defaults.js';
import { formatRcDate, getRcData, nextRcNumber } from '../../data/rc.data.js';
import { createRc } from '../../data/rc-repository.js';
import { renderXmDynamicSelect, bindDynamicFieldsInContainer } from '../../core/dynamic-lists.js';

const DELAI_PRESETS = [
  { days: 1, label: '1 jour' },
  { days: 2, label: '2 jours' },
  { days: 3, label: '3 jours' },
  { days: 5, label: '5 jours' },
  { days: 7, label: '7 jours' },
  { days: 10, label: '10 jours' },
  { days: 15, label: '15 jours' },
  { days: 20, label: '20 jours' },
  { days: 30, label: '30 jours' },
];

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function formatDelai(days) {
  const n = Math.max(1, Math.min(365, Number(days)));
  return `${n}j`;
}

export function renderRcNew() {
  const nextNum = nextRcNumber(getRcData());

  return `<div data-page="rc-new" class="rc-new-page xm-v11-surface">
    <div class="card rc-new-card">
      <div class="rc-new-head">
        <div>
          <h1 class="rc-new-title">Nouvelle réclamation client</h1>
          <p class="rc-new-sub">Numéro attribué : <strong>${esc(nextNum)}</strong> · Date du jour</p>
        </div>
      </div>

      <form class="rc-new-form" data-rc-new-form novalidate>
        <div class="fgrid rc-new-grid">
          ${renderXmDynamicSelect({ id: 'rcn-projet', listKey: 'rc.projects', label: 'Projet', required: true, emptyOption: '— Choisir —' })}
          ${renderXmDynamicSelect({ id: 'rcn-client', listKey: 'rc.clients', label: 'Client', required: true, emptyOption: '— Choisir —' })}
          ${renderXmDynamicSelect({ id: 'rcn-dep', listKey: 'rc.departments', label: 'Département', selected: RC_DEPARTEMENTS[0], required: true })}
          ${renderXmDynamicSelect({ id: 'rcn-resp', listKey: 'global.responsibles', label: 'Responsable', emptyOption: '— Optionnel —' })}
          ${renderXmDynamicSelect({ id: 'rcn-grav', listKey: 'rc.gravity', label: 'Gravité', selected: 'Majeure', required: true })}

          <div class="fg rc-new-delai">
            <label class="fl">Délai de traitement</label>
            <select class="fi" name="delai-preset" data-rcn-delai-preset>
              ${DELAI_PRESETS.map((p) => `<option value="${p.days}">${p.label}</option>`).join('')}
              <option value="custom">Personnalisé…</option>
            </select>
            <div class="rc-new-delai-custom" data-rcn-delai-custom hidden>
              <input class="fi" type="number" min="1" max="365" step="1" data-rcn-delai-days value="5" placeholder="Nombre de jours">
              <span class="rc-new-delai-unit">jours ouvrés</span>
            </div>
          </div>

          <div class="fg full">
            <label class="fl">Titre de la réclamation <span class="req">*</span></label>
            <input class="fi" name="titre" data-rcn-titre placeholder="Résumé du problème signalé…" required>
          </div>

          <div class="fg full">
            <label class="fl">Email client (diffusion rapport 8D)</label>
            <input class="fi" type="email" name="emailClient" data-rcn-email placeholder="client@exemple.com">
          </div>

          <div class="fg full">
            <label class="fl">Description détaillée</label>
            <textarea class="fi" name="description" rows="4" placeholder="Symptômes, impact, contexte…"></textarea>
          </div>
        </div>

        <div class="rc-new-foot">
          <button type="button" class="btn" data-nav="rc-liste">Annuler</button>
          <button type="submit" class="btn bp">Créer la réclamation</button>
        </div>
      </form>
    </div>
  </div>`;
}

function getFormDelai(root) {
  const preset = root.querySelector('[data-rcn-delai-preset]')?.value;
  if (preset === 'custom') {
    const days = parseInt(root.querySelector('[data-rcn-delai-days]')?.value, 10);
    return formatDelai(Number.isNaN(days) ? 5 : days);
  }
  return formatDelai(preset);
}

function resolveRcFields() {
  const projet = window.readXmDynamicSelect?.('rcn-projet', 'rc.projects');
  const client = window.readXmDynamicSelect?.('rcn-client', 'rc.clients');
  if (projet) addRcProjet(projet);
  if (client) addRcClient(client);
  return {
    projet: projet || '',
    client: client || '',
    departement: window.readXmDynamicSelect?.('rcn-dep', 'rc.departments') || '',
    responsable: window.readXmDynamicSelect?.('rcn-resp', 'global.responsibles') || '',
    gravite: window.readXmDynamicSelect?.('rcn-grav', 'rc.gravity') || '',
  };
}

export function bindRcNew() {
  if (window.__rcNewBound) return;
  window.__rcNewBound = true;

  requestAnimationFrame(() => {
    const page = document.querySelector('[data-page="rc-new"]');
    if (page) bindDynamicFieldsInContainer(page);
  });

  document.addEventListener('change', (e) => {
    if (!e.target.matches('[data-rcn-delai-preset]')) return;
    const root = e.target.closest('[data-page="rc-new"]');
    const custom = root?.querySelector('[data-rcn-delai-custom]');
    if (custom) custom.hidden = e.target.value !== 'custom';
  });

  document.addEventListener('submit', (e) => {
    const form = e.target.closest('[data-rc-new-form]');
    if (!form) return;
    e.preventDefault();
    const root = form.closest('[data-page="rc-new"]');
    const titre = form.querySelector('[data-rcn-titre]')?.value?.trim();
    if (!titre) {
      window.xmToast?.('Le titre est obligatoire', '', 'alert', '#dc2626');
      return;
    }
    const f = resolveRcFields();
    if (!f.projet || !f.client) {
      window.xmToast?.('Projet et client obligatoires', '', 'alert', '#dc2626');
      return;
    }
    const desc = form.querySelector('[name="description"]')?.value?.trim() || '';
    const emailClient = form.querySelector('[data-rcn-email]')?.value?.trim() || '';
    const rc = {
      n: nextRcNumber(getRcData()),
      d: formatRcDate(),
      p: f.projet,
      cl: f.client,
      dep: f.departement || RC_DEPARTEMENTS[0],
      g: f.gravite || 'Majeure',
      s: 'Ouvert',
      r: f.responsable || 'Non assigné',
      dl: getFormDelai(root),
      titre,
      obj: titre,
      desc,
      prog: 0,
      ...createRc8dDefaults({ d2What: titre, emailClient }),
    };
    createRc(rc);
    window.xmToast?.('Réclamation créée', rc.n, 'check-circle', '#16a34a');
    window.goPage?.('rc-liste');
  });
}
