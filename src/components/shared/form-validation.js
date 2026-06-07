/**
 * Validation formulaires (sans dépendance React) — messages clairs.
 */
export function validateRequired(fields) {
  /** @type {Record<string, string>} */
  const errors = {};
  for (const { name, value, label } of fields) {
    if (value == null || String(value).trim() === '') {
      errors[name] = `${label || name} est obligatoire.`;
    }
  }
  return errors;
}

export function applyFormErrors(form, errors) {
  form.querySelectorAll('.xm-field-error').forEach((el) => el.remove());
  form.querySelectorAll('.fi.xm-invalid, .sel.xm-invalid').forEach((el) => el.classList.remove('xm-invalid'));
  for (const [name, msg] of Object.entries(errors)) {
    const field = form.querySelector(`[name="${name}"], [data-field="${name}"]`);
    if (!field) continue;
    field.classList.add('xm-invalid');
    const hint = document.createElement('div');
    hint.className = 'xm-field-error';
    hint.textContent = msg;
    hint.setAttribute('role', 'alert');
    field.closest('.fg, .rc-new-projet, .fgrid > div')?.appendChild(hint);
  }
  const first = form.querySelector('.xm-invalid');
  first?.focus();
  return Object.keys(errors).length === 0;
}

export function clearFormErrors(form) {
  form.querySelectorAll('.xm-field-error').forEach((el) => el.remove());
  form.querySelectorAll('.xm-invalid').forEach((el) => el.classList.remove('xm-invalid'));
}
