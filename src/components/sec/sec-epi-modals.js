/**
 * Modales formulaires EPI.
 */
import {
  EPI_REQUIS,
  addEmployee,
  addEpiToEmployee,
  availableEpiTypes,
  formatToday,
  fromInputDate,
  toInputDate,
  updateEmployee,
  updateEpiItem,
} from '../../data/sec-epi.store.js';
import { epiLabel } from '../../data/sec-epi.data.js';

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

export function modalShell(title, body, foot = '') {
  return `<div class="sec-epi-modal-backdrop" data-epi-modal-backdrop>
    <div class="sec-epi-modal card" role="dialog">
      <div class="sec-epi-modal-head">
        <strong>${esc(title)}</strong>
        <button type="button" class="sec-epi-modal-close" data-epi-modal-close aria-label="Fermer">✕</button>
      </div>
      <div class="sec-epi-modal-body">${body}</div>
      ${foot ? `<div class="sec-epi-modal-foot">${foot}</div>` : ''}
    </div>
  </div>`;
}

export function renderEmployeeForm(emp = null) {
  const isEdit = !!emp;
  return modalShell(
    isEdit ? 'Modifier l\'employé' : 'Ajouter un employé',
    `<form data-epi-emp-form data-emp-id="${esc(emp?.id || '')}" class="fgrid" style="gap:8px">
      <div class="fg full"><label class="fl">Nom complet *</label><input class="fi" name="nom" value="${esc(emp?.nom)}" required></div>
      <div class="fg"><label class="fl">Poste</label><input class="fi" name="poste" value="${esc(emp?.poste)}"></div>
      <div class="fg"><label class="fl">Département</label><input class="fi" name="dep" value="${esc(emp?.dep)}"></div>
      <div class="fg"><label class="fl">Téléphone</label><input class="fi" name="tel" value="${esc(emp?.tel)}"></div>
      <div class="fg"><label class="fl">Email</label><input class="fi" name="email" type="email" value="${esc(emp?.email)}"></div>
      <div class="fg"><label class="fl">Date embauche</label><input class="fi" name="embauche" value="${esc(emp?.embauche || formatToday())}" placeholder="jj/mm/aaaa"></div>
    </form>`,
    `<button type="button" class="btn" data-epi-modal-close>Annuler</button>
     <button type="button" class="btn bp" data-epi-emp-save>${isEdit ? 'Enregistrer' : 'Ajouter'}</button>`
  );
}

export function renderEpiAssignForm(emp) {
  const types = availableEpiTypes(emp);
  const today = formatToday();
  const in2y = new Date();
  in2y.setFullYear(in2y.getFullYear() + 2);
  const ren = `${String(in2y.getDate()).padStart(2, '0')}/${String(in2y.getMonth() + 1).padStart(2, '0')}/${in2y.getFullYear()}`;

  return modalShell(
    `Attribuer un EPI — ${emp.nom}`,
    `<form data-epi-assign-form data-emp-id="${esc(emp.id)}" class="fgrid" style="gap:8px">
      <div class="fg full">
        <label class="fl">Type d'EPI *</label>
        <select class="fi" name="epiType" required>
          ${types.length ? types.map((t) => `<option value="${t.id}">${esc(t.label)}</option>`).join('') : '<option value="">— Tous attribués —</option>'}
        </select>
      </div>
      <div class="fg"><label class="fl">Date attribution</label><input class="fi" type="date" name="attribue" value="${toInputDate(today)}"></div>
      <div class="fg"><label class="fl">Date renouvellement</label><input class="fi" type="date" name="renouvellement" value="${toInputDate(ren)}"></div>
    </form>`,
    `<button type="button" class="btn" data-epi-modal-close>Annuler</button>
     <button type="button" class="btn bp" data-epi-epi-save ${types.length ? '' : 'disabled'}>Attribuer</button>`
  );
}

export function renderEpiEditForm(emp, epi) {
  return modalShell(
    `Modifier EPI — ${epiLabel(epi.id)}`,
    `<form data-epi-edit-form data-emp-id="${esc(emp.id)}" data-epi-id="${esc(epi.id)}" class="fgrid" style="gap:8px">
      <div class="fg"><label class="fl">Date attribution</label><input class="fi" type="date" name="attribue" value="${toInputDate(epi.attribue)}"></div>
      <div class="fg"><label class="fl">Date renouvellement</label><input class="fi" type="date" name="renouvellement" value="${toInputDate(epi.renouvellement)}"></div>
      <div class="fg full"><label class="fl">Statut</label>
        <select class="fi" name="statut">
          <option${epi.statut === 'Conforme' ? ' selected' : ''}>Conforme</option>
          <option${epi.statut === 'À renouveler' ? ' selected' : ''}>À renouveler</option>
          <option${epi.statut === 'Expiré' ? ' selected' : ''}>Expiré</option>
        </select>
      </div>
    </form>`,
    `<button type="button" class="btn" data-epi-modal-close>Annuler</button>
     <button type="button" class="btn bp" data-epi-epi-edit-save>Enregistrer</button>`
  );
}

export function mountModal(html) {
  closeModal();
  const wrap = document.createElement('div');
  wrap.innerHTML = html;
  const el = wrap.firstElementChild;
  document.body.appendChild(el);
  return el;
}

export function closeModal() {
  document.querySelector('[data-epi-modal-backdrop]')?.remove();
}

export function handleModalSave(e) {
  if (e.target.closest('[data-epi-emp-save]')) {
    const form = document.querySelector('[data-epi-emp-form]');
    const id = form?.dataset.empId;
    const payload = {
      nom: form.querySelector('[name="nom"]')?.value,
      poste: form.querySelector('[name="poste"]')?.value,
      dep: form.querySelector('[name="dep"]')?.value,
      tel: form.querySelector('[name="tel"]')?.value,
      email: form.querySelector('[name="email"]')?.value,
      embauche: form.querySelector('[name="embauche"]')?.value,
    };
    if (!payload.nom?.trim()) {
      window.xmToast?.('Nom requis', '', 'alert', '#dc2626');
      return true;
    }
    if (id) {
      updateEmployee(id, payload);
      window.xmToast?.('Employé mis à jour', payload.nom, 'check-circle', '#16a34a');
    } else {
      const res = addEmployee(payload);
      if (res.ok) {
        window.secEpiSelected = res.emp.id;
        window.xmToast?.('Employé ajouté', res.emp.nom, 'check-circle', '#16a34a');
      }
    }
    closeModal();
    window.reloadPage?.(document.querySelector('[data-epi-root]')?.dataset?.page || 'sec-epi');
    return true;
  }

  if (e.target.closest('[data-epi-epi-save]')) {
    const form = document.querySelector('[data-epi-assign-form]');
    const empId = form?.dataset.empId;
    const id = form.querySelector('[name="epiType"]')?.value;
    if (!id) return true;
    const res = addEpiToEmployee(empId, {
      id,
      attribue: fromInputDate(form.querySelector('[name="attribue"]')?.value),
      renouvellement: fromInputDate(form.querySelector('[name="renouvellement"]')?.value),
    });
    if (res.ok) {
      window.xmToast?.('EPI attribué', epiLabel(id), 'check-circle', '#16a34a');
      closeModal();
      window.reloadPage?.(document.querySelector('[data-epi-root]')?.dataset?.page || 'sec-epi');
    } else {
      window.xmToast?.(res.error || 'Erreur', '', 'alert', '#dc2626');
    }
    return true;
  }

  if (e.target.closest('[data-epi-epi-edit-save]')) {
    const form = document.querySelector('[data-epi-edit-form]');
    updateEpiItem(form.dataset.empId, form.dataset.epiId, {
      attribue: fromInputDate(form.querySelector('[name="attribue"]')?.value),
      renouvellement: fromInputDate(form.querySelector('[name="renouvellement"]')?.value),
      statut: form.querySelector('[name="statut"]')?.value,
    });
    window.xmToast?.('EPI mis à jour', '', 'check-circle', '#16a34a');
    closeModal();
    window.reloadPage?.(document.querySelector('[data-epi-root]')?.dataset?.page || 'sec-epi');
    return true;
  }
  return false;
}
