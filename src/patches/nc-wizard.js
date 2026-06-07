/**
 * Wizard — formulaire nouvelle NC (3 étapes + brouillon session).
 */
import { initWizard, renderWizardChrome } from '../components/shared/wizard.js';
import { validateRequired } from '../components/shared/form-validation.js';

export function enhanceNcNewWizard() {
  const form = document.querySelector('[data-nc-new-form]');
  if (!form || form.dataset.wizardReady) return;
  const grid = form.querySelector('.rc-new-grid');
  if (!grid) return;
  form.dataset.wizardReady = '1';

  const parts = [...grid.querySelectorAll(':scope > .fg, :scope > .fg.full')];
  const s1 = parts.slice(0, 4);
  const s2 = parts.slice(4, 10);
  const s3 = parts.slice(10);

  form.querySelector('.rc-new-foot')?.remove();

  const wrap = document.createElement('div');
  wrap.setAttribute('data-xm-wizard', '1');
  wrap.innerHTML = renderWizardChrome(['Identification', 'Analyse', 'Pièces & validation']);

  [s1, s2, s3].forEach((nodes, i) => {
    const step = document.createElement('div');
    step.dataset.wizardStep = '';
    if (i > 0) step.hidden = true;
    nodes.forEach((n) => step.appendChild(n));
    wrap.appendChild(step);
  });

  wrap.insertAdjacentHTML(
    'beforeend',
    `<div class="xm-wizard-nav">
      <button type="button" class="btn" data-wizard-prev hidden>← Précédent</button>
      <button type="button" class="btn" data-nav="nc-liste">Annuler</button>
      <button type="button" class="btn bp" data-wizard-next>Suivant →</button>
      <button type="button" class="btn" data-ncn-save-qrqc data-wizard-submit hidden>Enregistrer &amp; QRQC</button>
      <button type="submit" class="btn btn-danger" data-wizard-submit hidden>Déclarer la NC</button>
    </div>`
  );

  grid.replaceWith(wrap);

  initWizard(form, {
    draftKey: 'nc-new',
    steps: [
      {
        id: 'id',
        title: 'Identification',
        validate: () => {
          const root = form.closest('[data-page="nc-new"]');
          const projet =
            root?.querySelector('[data-ncn-projet]')?.value ||
            root?.querySelector('[data-ncn-projet-new]')?.value;
          return validateRequired([
            { name: 'projet', value: projet, label: 'Projet' },
            { name: 'departement', value: form.querySelector('[name="departement"]')?.value, label: 'Département' },
            { name: 'gravite', value: form.querySelector('[name="gravite"]')?.value, label: 'Gravité' },
          ]);
        },
      },
      {
        id: 'analyse',
        title: 'Analyse',
        validate: () =>
          validateRequired([
            { name: 'description', value: form.querySelector('[name="description"]')?.value, label: 'Description' },
          ]),
      },
      { id: 'pj', title: 'Pièces' },
    ],
  });
}

export function installNcWizard() {
  const tryEnhance = () => {
    if (window.STATE?.page === 'nc-new') enhanceNcNewWizard();
  };
  document.addEventListener('xm-content-updated', tryEnhance);
  tryEnhance();
}
