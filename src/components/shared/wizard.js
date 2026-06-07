/**
 * Assistant multi-étapes (wizard) — barre de progression, validation par étape.
 */
const WIZARD_STORAGE_PREFIX = 'xm_wizard_draft_';

export function saveWizardDraft(key, data) {
  try {
    sessionStorage.setItem(WIZARD_STORAGE_PREFIX + key, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export function loadWizardDraft(key) {
  try {
    const raw = sessionStorage.getItem(WIZARD_STORAGE_PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearWizardDraft(key) {
  sessionStorage.removeItem(WIZARD_STORAGE_PREFIX + key);
}

/**
 * @param {HTMLElement} root élément [data-xm-wizard]
 * @param {{ steps: { id: string, title: string, validate?: () => Record<string, string> | null }[], onComplete?: () => void, draftKey?: string }} config
 */
export function initWizard(root, config) {
  if (!root || root.dataset.xmWizardBound) return;
  root.dataset.xmWizardBound = '1';

  const steps = root.querySelectorAll('[data-wizard-step]');
  const bar = root.querySelector('[data-wizard-progress]');
  const btnPrev = root.querySelector('[data-wizard-prev]');
  const btnNext = root.querySelector('[data-wizard-next]');
  const btnSubmit = root.querySelector('[data-wizard-submit]');
  let current = 0;

  function showStep(idx) {
    current = Math.max(0, Math.min(idx, steps.length - 1));
    steps.forEach((el, i) => {
      el.hidden = i !== current;
    });
    if (bar) {
      const pct = steps.length > 1 ? Math.round((current / (steps.length - 1)) * 100) : 100;
      bar.style.width = `${pct}%`;
    }
    root.querySelectorAll('[data-wizard-step-label]').forEach((el, i) => {
      el.classList.toggle('active', i === current);
      el.classList.toggle('done', i < current);
    });
    if (btnPrev) btnPrev.hidden = current === 0;
    if (btnNext) btnNext.hidden = current >= steps.length - 1;
    if (btnSubmit) btnSubmit.hidden = current < steps.length - 1;
  }

  function collectDraft() {
    const data = {};
    root.querySelectorAll('input, select, textarea').forEach((el) => {
      if (!el.name) return;
      if (el.type === 'checkbox') data[el.name] = el.checked;
      else if (el.type === 'file') return;
      else data[el.name] = el.value;
    });
    if (config.draftKey) saveWizardDraft(config.draftKey, data);
    return data;
  }

  function restoreDraft() {
    if (!config.draftKey) return;
    const data = loadWizardDraft(config.draftKey);
    if (!data) return;
    Object.entries(data).forEach(([name, value]) => {
      const el = root.querySelector(`[name="${name}"]`);
      if (el && el.type !== 'file') el.value = value;
    });
  }

  restoreDraft();
  showStep(0);

  btnPrev?.addEventListener('click', () => {
    collectDraft();
    showStep(current - 1);
  });

  btnNext?.addEventListener('click', () => {
    const stepCfg = config.steps[current];
    if (stepCfg?.validate) {
      const errors = stepCfg.validate();
      if (errors && Object.keys(errors).length) {
        const form = root.querySelector('form') || root;
        import('./form-validation.js').then(({ applyFormErrors }) => applyFormErrors(form, errors));
        return;
      }
    }
    collectDraft();
    showStep(current + 1);
  });

  root.addEventListener('input', () => collectDraft());

  root.querySelector('form')?.addEventListener('submit', (e) => {
    if (current < steps.length - 1) {
      e.preventDefault();
      btnNext?.click();
    } else if (config.draftKey) {
      clearWizardDraft(config.draftKey);
    }
  });

  return { showStep, collectDraft };
}

export function renderWizardChrome(stepTitles) {
  const labels = stepTitles
    .map(
      (t, i) =>
        `<span class="xm-wizard-step-label${i === 0 ? ' active' : ''}" data-wizard-step-label>${t}</span>`
    )
    .join('');
  return `
  <div class="xm-wizard-head">
    <div class="xm-wizard-steps">${labels}</div>
    <div class="xm-wizard-track"><div class="xm-wizard-bar" data-wizard-progress style="width:0%"></div></div>
  </div>
  <div class="xm-wizard-nav">
    <button type="button" class="btn" data-wizard-prev hidden>← Précédent</button>
    <button type="button" class="btn bp" data-wizard-next>Suivant →</button>
    <button type="submit" class="btn btn-danger" data-wizard-submit hidden>Valider</button>
  </div>`;
}
